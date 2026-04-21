"use strict";(()=>{var e={};e.id=5321,e.ids=[5321],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},36942:(e,t,a)=>{a.r(t),a.d(t,{originalPathname:()=>_,patchFetch:()=>y,requestAsyncStorage:()=>h,routeModule:()=>m,serverHooks:()=>f,staticGenerationAsyncStorage:()=>g});var s={};a.r(s),a.d(s,{POST:()=>p});var o=a(49303),i=a(88716),r=a(60670),n=a(87070),c=a(91662),u=a(37532),d=a(90455);async function l(e){let t=(0,u.t)();if("create_post"===e.type){let{data:a,error:s}=await t.from("social_posts").insert({platform:e.platform,topic:e.topic,caption:e.caption,status:e.status||"draft",scheduled_time:e.scheduled_time||null}).select().single();return s?{success:!1,error:s.message}:{success:!0,post:a}}if("update_settings"===e.type){let a={};e.brand_voice&&(a.brand_voice=e.brand_voice),e.target_audience&&(a.target_audience=e.target_audience),e.post_frequency&&(a.post_frequency=e.post_frequency);let{data:s}=await t.from("social_settings").select("id").order("created_at",{ascending:!1}).limit(1).maybeSingle();return s?await t.from("social_settings").update(a).eq("id",s.id):await t.from("social_settings").insert(a),{success:!0}}if("delete_post"===e.type){let{error:a}=await t.from("social_posts").delete().eq("id",e.post_id);return a?{success:!1,error:a.message}:{success:!0}}if("update_post_status"===e.type){let{error:a}=await t.from("social_posts").update({status:e.status}).eq("id",e.post_id);return a?{success:!1,error:a.message}:{success:!0}}if("get_stats"===e.type){let{count:e}=await t.from("social_posts").select("*",{count:"exact",head:!0}),{count:a}=await t.from("social_posts").select("*",{count:"exact",head:!0}).eq("status","scheduled"),{count:s}=await t.from("social_posts").select("*",{count:"exact",head:!0}).eq("status","posted"),{count:o}=await t.from("social_posts").select("*",{count:"exact",head:!0}).eq("status","draft");return{success:!0,stats:{total:e,scheduled:a,posted:s,drafts:o}}}return{success:!1,error:"Unknown action"}}async function p(e){if(!await (0,d.n)(e))return(0,d.H)();try{let t;let a=new c.ZP({apiKey:process.env.OPENAI_API_KEY}),{message:s,history:o,userName:i}=await e.json();if(!s||"string"!=typeof s)return n.NextResponse.json({error:"Message is required"},{status:400});let r=(0,u.t)(),{data:d}=await r.from("social_settings").select("*").order("created_at",{ascending:!1}).limit(1).maybeSingle(),p=d?.brand_voice||"Professional, empowering, modern",m=d?.target_audience||"Job seekers and career switchers",h=d?.post_frequency||"daily",{data:g}=await r.from("social_posts").select("id, platform, topic, caption, status, scheduled_time").order("created_at",{ascending:!1}).limit(15),{count:f}=await r.from("social_posts").select("*",{count:"exact",head:!0}),{count:_}=await r.from("social_posts").select("*",{count:"exact",head:!0}).eq("status","scheduled"),y=g?.length?`

Recent posts (${f} total, ${_} scheduled):
${g.map(e=>`- [${e.platform}] "${e.topic}" — ${e.status}${e.scheduled_time?` (scheduled: ${e.scheduled_time})`:""} (id: ${e.id})`).join("\n")}`:"\n\nNo posts created yet.",w=`You are Aria, the AI social media manager for ResumeVault. You are professional, incredibly knowledgeable about social media, but also warm, supportive, and fun — like a best friend who happens to be a marketing genius.

YOUR PERSONALITY:
- You're confident but never arrogant. You hype up the user and their brand.
- You use a warm, encouraging tone. Sprinkle in occasional casual language like "girl let's get it", "okay love", "we got this", "bestie" — but stay professional when writing actual content.
- You celebrate wins and stay positive about setbacks. 
- You're direct and action-oriented. You don't just suggest — you DO things.
- You use emojis sparingly but effectively ✨

THE USER: ${i||"Boss"}

CURRENT SETTINGS:
- Brand voice: ${p}
- Target audience: ${m}
- Posting frequency: ${h}
${y}

YOUR CAPABILITIES — You can take real actions by including a JSON action block in your response:
When the user asks you to do something, DO IT by including an action block like this in your response:

[ACTION: {"type": "create_post", "platform": "instagram", "topic": "Resume Tips", "caption": "Your caption here...", "status": "draft"}]
<<<<<<< HEAD
=======
[ACTION: {"type": "create_post", "platform": "facebook", "topic": "Resume Tips", "caption": "Your caption here...", "status": "draft"}]
>>>>>>> 69ab86b (Save all local changes and resolve conflicts)
[ACTION: {"type": "create_post", "platform": "twitter", "topic": "Career Advice", "caption": "Tweet text", "status": "scheduled", "scheduled_time": "2026-04-10T14:00:00Z"}]
[ACTION: {"type": "update_settings", "post_frequency": "3x daily", "brand_voice": "New voice", "target_audience": "New audience"}]
[ACTION: {"type": "delete_post", "post_id": "uuid-here"}]
[ACTION: {"type": "update_post_status", "post_id": "uuid-here", "status": "scheduled"}]
[ACTION: {"type": "get_stats"}]

RULES:
- When asked to create a post, write a great caption and include the action block to actually create it.
- When asked to change posting frequency (like "I want to post 3 times a day"), update the settings.
- When asked about stats or performance, fetch and report them.
- You can include multiple actions in one response.
- Always explain what you did after taking an action.
- For scheduled posts, use ISO 8601 datetime format.
<<<<<<< HEAD
- Platforms: instagram, twitter, linkedin, tiktok, reddit, threads
=======
- Platforms: instagram, facebook, twitter, linkedin, youtube, pinterest, tiktok, reddit, threads
>>>>>>> 69ab86b (Save all local changes and resolve conflicts)
- Statuses: draft, scheduled, posted, failed`,b=[{role:"system",content:w},...Array.isArray(o)?o.slice(-20).map(e=>({role:e.role,content:e.content})):[],{role:"user",content:s}],k=await a.chat.completions.create({model:"gpt-4o-mini",messages:b,max_tokens:1500,temperature:.8}),v=k.choices[0]?.message?.content||"Sorry love, something went wrong on my end. Try again? \uD83D\uDC9C",A=/\[ACTION:\s*(\{[^}]+\})\]/g,T=[];for(;null!==(t=A.exec(v));)try{let e=JSON.parse(t[1]),a=await l(e);T.push({action:e.type,...a})}catch{T.push({error:"Failed to parse action"})}return v=v.replace(/\[ACTION:\s*\{[^}]+\}\]/g,"").trim(),n.NextResponse.json({reply:v,actions:T.length>0?T:void 0})}catch(e){return n.NextResponse.json({error:e instanceof Error?e.message:"Failed to get AI response"},{status:500})}}let m=new o.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/ai-chat/route",pathname:"/api/ai-chat",filename:"route",bundlePath:"app/api/ai-chat/route"},resolvedPagePath:"C:\\Users\\Johns\\resumevault-social-bot\\app\\api\\ai-chat\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:h,staticGenerationAsyncStorage:g,serverHooks:f}=m,_="/api/ai-chat/route";function y(){return(0,r.patchFetch)({serverHooks:f,staticGenerationAsyncStorage:g})}},90455:(e,t,a)=>{function s(e){return{user:{email:"",id:""}}}function o(){return new Response("Unauthorized",{status:401})}a.d(t,{H:()=>o,n:()=>s})},37532:(e,t,a)=>{a.d(t,{t:()=>o});var s=a(93701);function o(){let e="https://pldnkhadhewaxyukzdqz.supabase.co",t=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!e||!t)throw Error("Missing Supabase admin environment variables");return(0,s.eI)(e,t,{auth:{persistSession:!1,autoRefreshToken:!1}})}}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[8948,5972,3701,1662],()=>a(36942));module.exports=s})();