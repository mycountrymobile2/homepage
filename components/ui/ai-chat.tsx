"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send, Headset, CalendarCheck, BadgeDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

type Action = { label: string; href: string; Icon: typeof Send };

type Msg = {
  sender: "ai" | "user";
  text: string;
  actions?: Action[];
};

const DEFAULT_ACTIONS: Action[] = [
  { label: "Contact us", href: "/contact", Icon: Headset },
  { label: "Book a demo", href: "/demo", Icon: CalendarCheck },
  { label: "View pricing", href: "/pricing", Icon: BadgeDollarSign },
];

export default function AIChatCard({ className }: { className?: string }) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      sender: "ai",
      text: "👋 Hi! I'm Zia — your AI receptionist. What brings you here today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ left: string; xs: number[]; duration: number; delay: number }>
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        xs: [Math.random() * 200 - 100, Math.random() * 200 - 100],
        duration: 5 + Math.random() * 3,
        delay: i * 0.5,
      }))
    );
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Great — here are the fastest ways to go further. Which one fits?",
          actions: DEFAULT_ACTIONS,
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-[440px] h-[540px] rounded-2xl overflow-hidden p-[2px]",
        className
      )}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-white/20"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <div
        className="relative flex flex-col w-full h-full rounded-2xl border border-white/25 overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.1) 100%)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          boxShadow:
            "0 30px 80px -20px rgba(139,92,246,0.35), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Soft glass glow blobs */}
        <motion.div
          className="absolute inset-0 opacity-60 pointer-events-none"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "radial-gradient(ellipse 400px 300px at 20% 10%, rgba(236,72,153,0.25), transparent 55%), radial-gradient(ellipse 400px 300px at 80% 90%, rgba(59,130,246,0.22), transparent 55%), radial-gradient(ellipse 500px 350px at 50% 50%, rgba(139,92,246,0.22), transparent 60%)",
            backgroundSize: "200% 200%",
          }}
        />
        {/* Top sheen */}
        <div
          className="absolute inset-x-0 top-0 h-24 pointer-events-none opacity-70"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.22), transparent)",
          }}
        />

        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/10"
            animate={{
              y: ["0%", "-140%"],
              x: p.xs,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
            style={{ left: p.left, bottom: "-10%" }}
          />
        ))}

        <div className="px-4 py-3 border-b border-white/15 relative z-10 flex items-center gap-2 bg-white/[0.04]">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 shadow-md shadow-violet-900/30 flex items-center justify-center ring-2 ring-white/15">
            <span className="text-[13px]">🤖</span>
          </div>
          <div className="flex flex-col leading-tight">
            <h2 className="text-[14px] font-semibold text-white">Zia</h2>
            <span className="text-[10px] text-emerald-300 flex items-center gap-1">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </span>
              Online
            </span>
          </div>
          <span className="ml-auto text-[10px] font-mono text-white/50 px-2 py-0.5 rounded-full bg-white/10 border border-white/15">
            AI · live
          </span>
        </div>

        <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 text-sm flex flex-col relative z-10">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={cn(
                "flex flex-col gap-2 max-w-[85%]",
                msg.sender === "ai" ? "self-start" : "self-end"
              )}
            >
              <div
                className={cn(
                  "px-3.5 py-2 rounded-2xl shadow-lg backdrop-blur-xl text-[13px] leading-[1.55] border",
                  msg.sender === "ai"
                    ? "bg-white/10 border-white/15 text-white rounded-tl-sm"
                    : "bg-white/85 border-white/70 text-slate-900 font-medium rounded-tr-sm"
                )}
              >
                {msg.text}
              </div>

              {msg.actions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {msg.actions.map((a) => (
                    <a
                      key={a.href}
                      href={a.href}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-br from-pink-500/90 to-violet-500/90 text-white text-[11.5px] font-semibold shadow-md shadow-violet-900/30 hover:opacity-90 active:scale-95 transition"
                    >
                      <a.Icon className="w-3.5 h-3.5" />
                      {a.label}
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              className="flex items-center gap-1 px-3 py-2 rounded-xl w-fit bg-white/10 self-start rounded-tl-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse [animation-delay:200ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse [animation-delay:400ms]" />
            </motion.div>
          )}
        </div>

        <div className="flex items-center gap-2 p-3 border-t border-white/15 relative z-10 bg-white/[0.04]">
          <input
            className="flex-1 px-4 py-2.5 text-[13px] bg-white/10 rounded-full border border-white/20 text-white placeholder-white/50 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-violet-400/60 focus:bg-white/15 transition"
            placeholder="Ask Zia anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="p-2.5 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 hover:opacity-90 active:scale-95 transition shadow-lg shadow-violet-900/40"
            aria-label="Send"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
