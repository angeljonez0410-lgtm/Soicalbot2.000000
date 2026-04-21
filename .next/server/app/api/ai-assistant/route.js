"use strict";(()=>{var e={};e.id=7388,e.ids=[7388],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},72837:(e,t,a)=>{a.r(t),a.d(t,{originalPathname:()=>f,patchFetch:()=>v,requestAsyncStorage:()=>m,routeModule:()=>d,serverHooks:()=>h,staticGenerationAsyncStorage:()=>g});var o={};a.r(o),a.d(o,{POST:()=>l});var r=a(49303),s=a(88716),n=a(60670),i=a(87070),u=a(90455),c=a(91662);let p=`You are the ResumeVault GodAI Assistant — an expert career coach, resume consultant, and job search strategist.

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
- If you don't know something, say so`;async function l(e){if(!await (0,u.n)(e))return(0,u.H)();try{let t=new c.ZP({apiKey:process.env.OPENAI_API_KEY}),{message:a,history:o,mode:r}=await e.json();if(!a||"string"!=typeof a)return i.NextResponse.json({error:"Message required"},{status:400});if(!process.env.OPENAI_API_KEY)return i.NextResponse.json({error:"OpenAI API key not configured"},{status:500});let s=(o||[]).map(e=>({role:e.role,content:e.content})),n=p;"code"===r?n="You are Zuzu, an expert AI coding assistant. Generate clean, production-ready code for the user's request. Only output code, no explanations unless asked.":"explain"===r?n="You are Zuzu, an expert AI code explainer. Explain the provided code or error in clear, simple language for a developer. Use bullet points and examples if helpful.":"commit"===r?n="You are Zuzu, an AI DevOps assistant. Summarize the code changes and generate a concise, descriptive commit message. If asked, provide the git command to commit and push.":"build"===r&&(n="You are Zuzu, an AI build assistant. Given a build or test command, explain what it does and what the expected output should be. If asked, provide troubleshooting tips for common errors.");let u=await t.chat.completions.create({model:"gpt-4o-mini",messages:[{role:"system",content:n},...s,{role:"user",content:a}],max_tokens:1024,temperature:.7}),l=u.choices[0]?.message?.content||"I couldn't generate a response. Please try again.";return i.NextResponse.json({reply:l})}catch{return i.NextResponse.json({error:"AI request failed"},{status:500})}}let d=new r.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/ai-assistant/route",pathname:"/api/ai-assistant",filename:"route",bundlePath:"app/api/ai-assistant/route"},resolvedPagePath:"C:\\Users\\Johns\\resumevault-social-bot\\app\\api\\ai-assistant\\route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:m,staticGenerationAsyncStorage:g,serverHooks:h}=d,f="/api/ai-assistant/route";function v(){return(0,n.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:g})}},90455:(e,t,a)=>{function o(e){return{user:{email:"",id:""}}}function r(){return new Response("Unauthorized",{status:401})}a.d(t,{H:()=>r,n:()=>o})}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),o=t.X(0,[8948,5972,1662],()=>a(72837));module.exports=o})();