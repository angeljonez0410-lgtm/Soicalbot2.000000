import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileExt = file.name.split(".").pop() || "png";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("social-media")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data } = supabase.storage
      .from("social-media")
      .getPublicUrl(filePath);

    await supabase.from("social_logs").insert({
      action: "Uploaded media",
      result: `Uploaded file ${filePath}`,
    });

    return NextResponse.json({
      success: true,
      filePath,
      publicUrl: data.publicUrl,
    });
  } catch {
    return NextResponse.json({ error: "Failed to upload media" }, { status: 500 });
  }
}
