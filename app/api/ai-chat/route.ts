import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getSupabaseAdmin } from "../../../lib/supabase-admin";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Fetch brand settings for context
    const supabase = getSupabaseAdmin();
    const { data: settings } = await supabase
      .from("social_settings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const brandVoice = settings?.brand_voice || "Professional, empowering, modern";
    const targetAudience = settings?.target_audience || "Job seekers and career switchers";

    // Fetch recent posts for context
    const { data: recentPosts } = await supabase
      .from("social_posts")
      .select("platform, topic, caption, status, scheduled_time")
      .order("created_at", { ascending: false })
      .limit(10);

    const postsContext = recentPosts?.length
      ? `\n\nRecent posts:\n${recentPosts.map((p) => `- [${p.platform}] ${p.topic} (${p.status})`).join("\n")}`
      : "";

    const systemPrompt = `You are an AI social media assistant for ResumeVault, a resume and career services platform. You help manage social media strategy, content creation, and engagement.

Brand voice: ${brandVoice}
Target audience: ${targetAudience}
${postsContext}

You can help with:
- Writing captions and posts for Instagram, Twitter, LinkedIn, and TikTok
- Social media strategy and scheduling advice
- Content calendar planning
- Hashtag suggestions
- Engagement tips and best practices
- Analyzing post performance

Keep responses concise and actionable. Use the brand voice in any content you create.`;

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...(Array.isArray(history)
        ? history.slice(-20).map((m: { role: string; content: string }) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          }))
        : []),
      { role: "user" as const, content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to get AI response" },
      { status: 500 }
    );
  }
}
