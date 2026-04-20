"use client";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { authFetch } from "@/lib/auth-fetch";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIAssistant({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [greeted, setGreeted] = useState(false);
  const [mode, setMode] = useState<'chat' | 'code' | 'explain' | 'commit' | 'build'>("chat");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isOpen || greeted) return;
    setGreeted(true);
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    const user = localStorage.getItem("sb_user");
    const name = user ? JSON.parse(user).email?.split("@")[0] : "there";
    setMessages([
      {
        role: "assistant",
        content: `${greeting}, ${name}! I'm your ResumeVault AI Assistant — powered by GPT. I'm here to help you with anything job-search related:\n\n• Resume writing tips & ATS optimization\n• Interview preparation & mock questions\n• Cover letter advice\n• Salary negotiation strategies\n• Career guidance & job search tips\n• Explain any feature on this platform\n\nWhat can I help you with today?`,
      },
    ]);
  }, [isOpen, greeted]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await authFetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
          history: messages.slice(-10),
          mode,
        }),
      });
      const data = await res.json();

      if (res.status === 401) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Your session expired or you are not signed in. Please log in again, then try one more time.",
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Sorry, I couldn't process that. Try again!" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection issue — please try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#1e2d42] to-[#2a3f5f] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center group"
        title="AI Assistant"
      >
        <MessageCircle className="w-6 h-6 group-hover:hidden" />
        <Sparkles className="w-6 h-6 hidden group-hover:block" />
      </button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring" }}
      className="fixed bottom-6 right-6 z-50 flex h-[560px] w-[400px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border-4 border-fuchsia-500/60 bg-gradient-to-br from-violet-950 via-fuchsia-900 to-slate-950 shadow-2xl animate-pop"
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b-4 border-fuchsia-400/40 bg-gradient-to-r from-fuchsia-900 via-violet-900 to-slate-900 px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 via-fuchsia-400 to-violet-500 shadow-lg border-2 border-fuchsia-300 animate-bounce"
          >
            <Sparkles className="h-6 w-6 text-violet-900 drop-shadow" />
          </motion.div>
          <div>
            <h3 className="font-extrabold text-lg text-fuchsia-300 drop-shadow">Zuzu <span className="text-yellow-300">Super AI</span></h3>
            <p className="text-xs font-bold text-fuchsia-100 uppercase tracking-wider">Coding Copilot & Social Bot</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-fuchsia-200 hover:text-yellow-300 transition">
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2 px-4 py-2 border-b-2 border-fuchsia-400/30 bg-gradient-to-r from-fuchsia-950 via-violet-950 to-slate-950">
        {[
          { key: "chat", label: "Chat" },
          { key: "code", label: "Code" },
          { key: "explain", label: "Explain" },
          { key: "commit", label: "Commit" },
          { key: "build", label: "Build" },
        ].map((m) => (
          <motion.button
            key={m.key}
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.08 }}
            onClick={() => setMode(m.key as typeof mode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold tracking-wide uppercase transition border-2 focus:outline-none shadow-sm ${
              mode === m.key
                ? "bg-gradient-to-br from-yellow-400 via-fuchsia-500 to-violet-600 text-white border-yellow-300 shadow-lg animate-pop"
                : "bg-slate-950 text-fuchsia-200 border-fuchsia-700 hover:bg-fuchsia-950 hover:text-yellow-200"
            }`}
          >
            {m.label}
          </motion.button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-br from-fuchsia-950 via-violet-950 to-slate-950 p-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, type: "spring" }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-base leading-relaxed font-semibold shadow-lg ${
                  msg.role === "user"
                    ? "rounded-br-3xl bg-gradient-to-br from-yellow-400 via-fuchsia-500 to-violet-600 text-white border-2 border-yellow-200 animate-pop"
                    : "rounded-bl-3xl border-2 border-fuchsia-400 bg-gradient-to-br from-slate-900 via-violet-900 to-fuchsia-900 text-fuchsia-100"
                }`}
              >
                {msg.content.split(/(\*\*[^*]+\*\*)/g).map((part, idx) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <span key={idx} className="font-extrabold text-yellow-300 drop-shadow inline">{part.replace(/\*\*/g, "")}</span>
                  ) : (
                    <span key={idx}>{part}</span>
                  )
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex justify-start"
          >
            <div className="rounded-2xl rounded-bl-3xl border-2 border-fuchsia-400 bg-gradient-to-br from-slate-900 via-violet-900 to-fuchsia-900 px-4 py-2.5 text-base text-fuchsia-200 shadow-lg flex items-center gap-2 animate-pulse">
              <span className="flex gap-1">
                <span className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
              <span className="font-bold">Thinking...</span>
            </div>
          </motion.div>
        ) : null}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t-4 border-fuchsia-400/40 bg-gradient-to-r from-fuchsia-950 via-violet-950 to-slate-950 p-3">
        <div className="flex gap-2">
          <motion.input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder={
              mode === "chat"
                ? "Chat with Zuzu..."
                : mode === "code"
                ? "Describe the code you want..."
                : mode === "explain"
                ? "Paste code or error to explain..."
                : mode === "commit"
                ? "Describe your code changes..."
                : "Ask about build/test commands..."
            }
            className="flex-1 rounded-xl border-2 border-fuchsia-400 bg-gradient-to-br from-slate-900 via-violet-950 to-fuchsia-950 px-3 py-2.5 text-base text-yellow-200 outline-none placeholder:text-fuchsia-400 focus:border-yellow-300 focus:ring-2 focus:ring-fuchsia-400 font-semibold shadow-lg transition-all"
            disabled={loading}
            whileFocus={{ scale: 1.04, boxShadow: "0 0 0 4px #f4c54255" }}
          />
          <motion.button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.08 }}
            className="rounded-xl bg-gradient-to-br from-yellow-400 via-fuchsia-500 to-violet-600 px-3 py-2.5 text-white font-extrabold text-lg shadow-lg transition hover:from-yellow-300 hover:to-fuchsia-400 disabled:opacity-40 border-2 border-yellow-300 animate-pop"
          >
            <Send className="h-5 w-5 drop-shadow" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
