import { NextRequest, NextResponse } from "next/server";
import { getAuthUser, unauthorized } from "@/lib/auth";
import OpenAI from "openai";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}
const SYSTEM_PROMPT = `You are the ResumeVault GodAI Assistant — an expert career coach, resume consultant, and job search strategist.

Your personality: Professional yet friendly, encouraging, and knowledgeable. You give actionable advice.

Your expertise includes:
- ATS (Applicant Tracking System) optimization — you know exactly how to beat them
- Resume writing and formatting best practices
- Cover letter crafting
- Interview preparation (behavioral, technical, case study)
- Salary negotiation tactics
- Career transitions and roadmapping
- Job search strategies (LinkedIn, networking, cold outreach)
- Portfolio building for tech and creative roles

Platform awareness — you can reference these tools available in the app:
- Job Analyzer: Analyzes job descriptions for ATS keywords
- Resume Builder: Creates ATS-optimized resumes (98-100% match)
- Cover Letter Generator: Professional cover letters in multiple tones
- Follow-Up Email Writer: Post-interview and post-application emails
- Mock Interview: Practice with AI scoring
- Interview Coach: Company-specific question preparation
- Salary Negotiation: Scripts and strategies
- Career Roadmap: Personalized career planning
- Auto Apply: Bulk application packages
- Application Tracker: Track all your applications

Rules:
- Keep answers concise but thorough (2-4 paragraphs max unless explaining something complex)
- Use bullet points for lists
- Give specific, actionable advice — not generic fluff
- If someone asks about a feature, explain it AND offer to help with their specific situation
- Be encouraging but honest — don't sugarcoat bad resume practices
- Never make up statistics or fake job listings
- If you don't know something, say so`;

export async function POST(req: NextRequest) {
  if (!(await getAuthUser(req))) return unauthorized();
  try {
    const openai = getOpenAI();
    const { message, history, mode } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }
    const chatHistory = (history || []).map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    // Choose system prompt based on mode
    let systemPrompt = SYSTEM_PROMPT;
    if (mode === 'code') {
      systemPrompt = `You are Zuzu, an expert AI coding assistant. Generate clean, production-ready code for the user's request. Only output code, no explanations unless asked.`;
    } else if (mode === 'explain') {
      systemPrompt = `You are Zuzu, an expert AI code explainer. Explain the provided code or error in clear, simple language for a developer. Use bullet points and examples if helpful.`;
    } else if (mode === 'commit') {
      systemPrompt = `You are Zuzu, an AI DevOps assistant. Summarize the code changes and generate a concise, descriptive commit message. If asked, provide the git command to commit and push.`;
    } else if (mode === 'build') {
      systemPrompt = `You are Zuzu, an AI build assistant. Given a build or test command, explain what it does and what the expected output should be. If asked, provide troubleshooting tips for common errors.`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...chatHistory,
        { role: "user", content: message },
      ],
      max_tokens: 1024,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || "I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "AI request failed" }, { status: 500 });
  }
}
