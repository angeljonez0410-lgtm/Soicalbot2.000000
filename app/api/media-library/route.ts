import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabase-admin";

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase.storage
      .from("social-media")
      .list("uploads", {
        limit: 100,
        sortBy: {
          column: "created_at",
          order: "desc",
        },
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const files = (data || []).map((file) => {
      const filePath = `uploads/${file.name}`;
      const { data: publicData } = supabase.storage
        .from("social-media")
        .getPublicUrl(filePath);

      return {
        name: file.name,
        filePath,
        publicUrl: publicData.publicUrl,
        createdAt: file.created_at,
      };
    });

    return NextResponse.json({ files });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch media library" },
      { status: 500 }
    );
  }
}
