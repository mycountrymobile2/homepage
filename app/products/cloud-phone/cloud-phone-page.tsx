"use client";

/**
 * Cloud Phone — pillar page
 *
 * URL: /products/cloud-phone
 *
 * Section flow:
 *   01 Hero — live calling screen with AI transcript + headline + CTAs
 *   02 Opening paragraph — slate band, accent quote
 *   03 Bento features — 6 features in a non-uniform bento grid
 *   04 Zia AI on every line — dark band, asymmetric
 *   05 Compliance for USA outbound — light band, three pillars
 *   06 Testimonial — warm amber/rose
 *   07 Pricing callout — brand gradient strip
 *   08 FAQ — clean accordion
 *   09 Closing CTA — dark band
 *   10 Suite explorer — sub-product cards
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Phone,
  PhoneCall,
  PhoneOff,
  Voicemail,
  Disc,
  PhoneForwarded,
  Video as VideoIcon,
  Bot,
  Sparkles,
  ShieldCheck,
  Hash,
  ChevronDown,
  Check,
  Quote,
  MessagesSquare,
  Send,
  Printer,
  MessageCircle,
  Server,
  Users,
  Pause,
  MicOff,
  Mic,
  Volume2,
  ArrowLeftRight,
  Circle,
  Grid3x3,
  History,
  FileText,
  StickyNote,
  User,
} from "lucide-react";
import { Header, Footer } from "@/MCMHomepage";

/* ---------------------------------------------------------------- */
/* Reveal on scroll                                                  */
/* ---------------------------------------------------------------- */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bento-tile ${inView ? "in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Calling Screen with AI Live Transcript (Hero)                      */
/* ---------------------------------------------------------------- */

type TranscriptLine = {
  who: string;
  initials: string;
  isAgent: boolean;
  text: string;
  delay: number;
};

const TRANSCRIPT_LINES: TranscriptLine[] = [
  {
    who: "Sarah Mitchell",
    initials: "SM",
    isAgent: false,
    text: "Hi, calling about the enterprise plan.",
    delay: 0,
  },
  {
    who: "You",
    initials: "Y",
    isAgent: true,
    text: "Sure — we can onboard your team Monday.",
    delay: 1.4,
  },
  {
    who: "Sarah Mitchell",
    initials: "SM",
    isAgent: false,
    text: "Perfect. Will we get an account manager?",
    delay: 2.8,
  },
];

function TranscriptMessage({ line }: { line: TranscriptLine }) {
  const { who, initials, isAgent, text, delay } = line;
  return (
    <div
      className={`transcript-msg flex gap-2 ${isAgent ? "flex-row-reverse" : ""}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className={`h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 shadow-sm ${
          isAgent
            ? "bg-slate-900 text-white"
            : "bg-gradient-to-br from-cyan-500 to-violet-600 text-white"
        }`}
        aria-hidden="true"
      >
        {initials}
      </div>
      <div
        className={`max-w-[82%] rounded-2xl px-3 py-2 ${
          isAgent
            ? "bg-slate-900 text-white rounded-tr-sm"
            : "bg-slate-100 text-slate-800 rounded-tl-sm"
        }`}
      >
        <div
          className={`font-inter text-[10px] font-semibold mb-0.5 ${
            isAgent ? "text-slate-300" : "text-slate-500"
          }`}
        >
          {who}
        </div>
        <div className="font-inter text-[12.5px] leading-snug">{text}</div>
      </div>
    </div>
  );
}

function CallingScreen() {
  const callButtons: { Icon: typeof Pause; label: string; recording?: boolean }[] = [
    { Icon: Pause, label: "Hold" },
    { Icon: MicOff, label: "Mute" },
    { Icon: Volume2, label: "Speaker" },
    { Icon: ArrowLeftRight, label: "Transfer" },
    { Icon: Circle, label: "Record", recording: true },
    { Icon: Grid3x3, label: "DTMF" },
  ];

  const tabs: { Icon: typeof Pause; label: string; active?: boolean }[] = [
    { Icon: History, label: "Call History" },
    { Icon: FileText, label: "Transcript", active: true },
    { Icon: StickyNote, label: "Notes" },
    { Icon: User, label: "Contact Info" },
  ];

  return (
    <div className="relative w-full">
      {/* soft brand glow behind the card */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 30% 30%, rgba(34,211,238,0.22), transparent 60%), radial-gradient(ellipse 55% 50% at 75% 70%, rgba(139,92,246,0.18), transparent 60%)",
        }}
      />

      {/* Floating live pill */}
      <div className="absolute -top-3 right-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3 py-1.5 shadow-lg">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="font-inter text-[11px] font-semibold text-slate-700">
          Live · Zia AI Transcribing
        </span>
      </div>

      <div className="rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-900/5 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
          {/* LEFT — call controls */}
          <div className="bg-slate-50/60 border-b md:border-b-0 md:border-r border-slate-200 p-5">
            {/* Contact header */}
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 text-white font-outfit font-bold flex items-center justify-center text-sm shadow-md">
                SM
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-outfit font-semibold text-sm text-slate-900 truncate">
                  Sarah Mitchell
                </div>
                <div className="font-inter text-xs text-slate-500 truncate">
                  +1 (415) 555-0192
                </div>
              </div>
            </div>

            {/* Status + timer */}
            <div className="mt-4 flex items-center justify-between rounded-xl bg-white border border-slate-200 px-3 py-2">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="font-inter text-[11px] font-semibold text-emerald-700">
                  On Call
                </span>
              </div>
              <span className="font-mono text-xs font-semibold text-slate-700 tabular-nums">
                02:34
              </span>
            </div>

            {/* Buttons grid */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {callButtons.map(({ Icon, label, recording }) => (
                <button
                  key={label}
                  type="button"
                  className="group flex flex-col items-center gap-1.5 rounded-xl py-2.5 hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
                  aria-label={label}
                >
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm group-hover:text-slate-900 group-hover:shadow-md transition">
                    <Icon className="h-4 w-4" />
                    {recording && (
                      <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                    )}
                  </span>
                  <span className="font-inter text-[10px] font-medium text-slate-500">
                    {label}
                  </span>
                </button>
              ))}

              {/* Hangup spans full width */}
              <button
                type="button"
                className="col-span-3 mt-1 flex items-center justify-center gap-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white py-2.5 font-inter text-xs font-semibold transition-colors shadow-md shadow-rose-500/20"
                aria-label="End call"
              >
                <PhoneOff className="h-4 w-4" />
                End Call
              </button>
            </div>
          </div>

          {/* RIGHT — transcript */}
          <div className="flex flex-col">
            {/* Tabs */}
            <div className="flex items-center border-b border-slate-200 px-2 pt-2">
              {tabs.map(({ Icon, label, active }) => (
                <button
                  key={label}
                  type="button"
                  className={`relative flex flex-1 min-w-0 items-center justify-center gap-1.5 px-2 py-2 font-inter text-[11px] sm:text-xs font-semibold transition-colors ${
                    active ? "text-cyan-700" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate">{label}</span>
                  {active && (
                    <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600" />
                  )}
                </button>
              ))}
            </div>

            {/* Transcript header bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50/60 border-b border-slate-200">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-cyan-200 px-2.5 py-1">
                <Sparkles className="h-3 w-3 text-cyan-600" />
                <span className="font-inter text-[10.5px] font-semibold uppercase tracking-[0.12em] text-cyan-700">
                  Zia AI · Live
                </span>
              </div>
              <button
                type="button"
                className="font-inter text-[11px] font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 transition"
              >
                Stop
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 px-4 py-4 space-y-2.5 overflow-hidden">
              {TRANSCRIPT_LINES.map((line) => (
                <TranscriptMessage key={line.who + line.delay} line={line} />
              ))}
            </div>

            {/* Footer with audio bars */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-200 bg-white">
              <div className="flex items-center gap-2">
                <Mic className="h-3.5 w-3.5 text-slate-500" />
                <div className="flex items-end gap-[2px] h-3.5">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span
                      key={i}
                      className="wave-bar w-[2px] rounded-full bg-gradient-to-t from-cyan-400 to-violet-500"
                      style={{
                        height: `${30 + ((i * 17) % 70)}%`,
                        animationDelay: `${i * 0.06}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <span className="font-inter text-[10.5px] text-slate-500">
                Recording · End-to-end encrypted
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 01 — Hero                                                          */
/* ---------------------------------------------------------------- */

const TRUST_ITEMS = [
  "99.99% UPTIME",
  "USA NUMBERS",
  "STIR/SHAKEN",
  "ROBOCALL MITIGATION",
  "14-DAY TRIAL",
];

function HeroSection() {
  return (
    <section
      className="relative pt-32 pb-20 overflow-hidden"
      aria-labelledby="cloud-phone-h1"
    >
      {/* soft brand mesh */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 8% 0%, #cffafe 0%, transparent 50%), radial-gradient(ellipse 55% 45% at 92% 8%, #ede9fe 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 50% 100%, #fef3c7 0%, transparent 60%)",
          backgroundColor: "#fafbfc",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left — copy */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/70 backdrop-blur px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-700">
                MCM Cloud Phone
              </span>
            </div>

            <h1
              id="cloud-phone-h1"
              className="mt-5 font-outfit text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-slate-900 text-balance"
            >
              Cloud calling,{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-violet-600">
                reimagined.
              </span>
            </h1>

            <p className="mt-5 font-inter text-lg text-slate-600 leading-relaxed max-w-xl">
              Calling, video, messaging, and AI in one USA-compliant platform.
              Built for modern teams.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="/signup"
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-inter text-sm font-semibold px-5 py-3 transition-colors"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/demo"
                className="inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-inter text-sm font-semibold px-5 py-3 border border-slate-200 transition-colors"
              >
                Book a Demo
              </a>
            </div>
            <p className="mt-3 font-inter text-xs text-slate-500">
              14-day free trial · No credit card required.
            </p>

            {/* Trust bar */}
            <ul className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200/80 pt-5">
              {TRUST_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1.5 font-inter text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-500"
                >
                  <Check className="h-3 w-3 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — live calling screen with AI transcript */}
          <div className="lg:col-span-7 relative">
            <CallingScreen />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 02 — Opening paragraph                                            */
/* ---------------------------------------------------------------- */

function OpeningSection() {
  return (
    <section className="relative bg-slate-50 py-16">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="relative pl-8 border-l-4 border-violet-500">
            <Quote className="absolute -left-3 -top-2 h-6 w-6 bg-slate-50 text-violet-500" />
            <p className="font-outfit text-2xl lg:text-[28px] leading-[1.4] font-semibold text-slate-900 text-balance">
              Three phone vendors, three SLAs, zero accountability.{" "}
              <span className="text-slate-500 font-medium">
                MCM Cloud Phone replaces that patchwork with one compliant USA
                platform on one carrier-grade network.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 03 — Features bento                                               */
/* ---------------------------------------------------------------- */

function MiniWaveform() {
  return (
    <div className="flex items-end gap-[3px] h-12">
      {Array.from({ length: 28 }).map((_, i) => (
        <span
          key={i}
          className="wave-bar w-[3px] rounded-full bg-gradient-to-t from-emerald-400 to-cyan-500"
          style={{
            height: `${20 + ((i * 13) % 70)}%`,
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
}

function MiniIvr() {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-full">
      <defs>
        <linearGradient id="ivrLine" x1="0" x2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* trunk */}
      <line x1="100" y1="10" x2="100" y2="42" stroke="url(#ivrLine)" strokeWidth="1.5" />
      {/* branches */}
      <line x1="100" y1="42" x2="38" y2="78" stroke="url(#ivrLine)" strokeWidth="1.5" />
      <line x1="100" y1="42" x2="100" y2="78" stroke="url(#ivrLine)" strokeWidth="1.5" />
      <line x1="100" y1="42" x2="162" y2="78" stroke="url(#ivrLine)" strokeWidth="1.5" />

      <rect x="78" y="0" width="44" height="20" rx="6" fill="#fff7ed" stroke="#fcd34d" />
      <text x="100" y="13" textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="600">
        Welcome
      </text>

      {["Sales", "Support", "Billing"].map((label, i) => {
        const x = [38, 100, 162][i];
        return (
          <g key={label}>
            <rect x={x - 22} y={78} width="44" height="20" rx="6" fill="#fff" stroke="#fcd34d" />
            <text x={x} y="91" textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="600">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function MiniVideo() {
  const seats = [
    { bg: "from-cyan-400 to-blue-500", letter: "S" },
    { bg: "from-violet-400 to-fuchsia-500", letter: "A" },
    { bg: "from-amber-400 to-rose-500", letter: "M" },
    { bg: "from-emerald-400 to-teal-500", letter: "K" },
  ];
  return (
    <div className="flex -space-x-2">
      {seats.map((s, i) => (
        <div
          key={i}
          className={`av-bob h-9 w-9 rounded-full bg-gradient-to-br ${s.bg} text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow`}
          style={{ animationDelay: `${i * 0.25}s` }}
        >
          {s.letter}
        </div>
      ))}
      <div className="h-9 w-9 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold border-2 border-white">
        +28
      </div>
    </div>
  );
}

function FeatureBento() {
  return (
    <section className="relative bg-white py-20" aria-labelledby="features-h2">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 border border-cyan-200 px-2.5 py-1 font-inter text-[10.5px] font-semibold uppercase tracking-[0.14em] text-cyan-700">
              <Sparkles className="h-3 w-3" />
              The platform
            </span>
            <h2
              id="features-h2"
              className="mt-4 font-outfit text-3xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 text-balance"
            >
              Every phone feature you need on{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-violet-600">
                one seat.
              </span>
            </h2>
            <p className="mt-4 font-inter text-base text-slate-600 leading-relaxed">
              Call handling, extensions, voicemail, recording, IVR menus, video,
              and messaging. Nothing gated behind a consultant. Nothing bolted
              on later.
            </p>
          </div>
        </Reveal>

        {/* Bento grid — varied tile sizes, no uniform boxes */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[minmax(180px,auto)]">
          {/* Tile A — Unlimited USA calling (large) */}
          <Reveal className="md:col-span-7 md:row-span-2 relative overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-cyan-50/30 p-7">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-700">
                <PhoneCall className="h-5 w-5" />
              </span>
              <span className="font-inter text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">
                Calling
              </span>
            </div>
            <h3 className="font-outfit text-2xl font-bold text-slate-900 leading-tight tracking-tight">
              Unlimited USA calling with smart routing and local caller ID.
            </h3>
            <p className="mt-3 font-inter text-sm text-slate-600 leading-relaxed max-w-md">
              One USA number per seat. Carrier-grade routing across 38 POPs.
              Local caller ID matching — no flagged or spam-likely outbound.
            </p>

            {/* Bottom: stats column + live calls panel side-by-side on md+ */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-5 gap-4 items-stretch">
              {/* Stats — stacked on the left */}
              <div className="sm:col-span-2 grid grid-cols-3 sm:grid-cols-1 gap-3">
                <div className="rounded-xl bg-white border border-slate-200 px-3 py-3">
                  <div className="font-outfit text-2xl font-bold text-slate-900">38</div>
                  <div className="font-inter text-[11px] uppercase tracking-wide text-slate-500">
                    USA POPs
                  </div>
                </div>
                <div className="rounded-xl bg-white border border-slate-200 px-3 py-3">
                  <div className="font-outfit text-2xl font-bold text-slate-900">99.99%</div>
                  <div className="font-inter text-[11px] uppercase tracking-wide text-slate-500">
                    Uptime
                  </div>
                </div>
                <div className="rounded-xl bg-white border border-slate-200 px-3 py-3">
                  <div className="font-outfit text-2xl font-bold text-slate-900">∞</div>
                  <div className="font-inter text-[11px] uppercase tracking-wide text-slate-500">
                    USA minutes
                  </div>
                </div>
              </div>

              {/* Live USA call activity */}
              <div className="sm:col-span-3 relative rounded-2xl bg-white border border-slate-200 p-4 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-75 animate-ping" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-700">
                      Live calls
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-slate-500 tabular-nums">
                    1,284 now
                  </span>
                </div>

                <ul className="space-y-2 flex-1">
                  {[
                    { city: "New York, NY", duration: "04:21", offset: 0 },
                    { city: "Austin, TX", duration: "01:08", offset: 3 },
                    { city: "Seattle, WA", duration: "07:45", offset: 6 },
                    { city: "Miami, FL", duration: "02:13", offset: 2 },
                    { city: "Denver, CO", duration: "05:36", offset: 5 },
                  ].map(({ city, duration, offset }) => (
                    <li
                      key={city}
                      className="flex items-center gap-3 rounded-lg bg-slate-50/70 px-2.5 py-1.5"
                    >
                      <PhoneCall className="h-3.5 w-3.5 text-cyan-600 flex-shrink-0" />
                      <span className="font-inter text-[12px] font-semibold text-slate-800 flex-shrink-0 w-[100px] truncate">
                        {city}
                      </span>
                      <div className="flex items-end gap-[2px] h-3 flex-1 min-w-0">
                        {Array.from({ length: 18 }).map((_, i) => (
                          <span
                            key={i}
                            className="wave-bar w-[2px] rounded-full bg-gradient-to-t from-cyan-400 to-violet-500"
                            style={{
                              height: `${25 + ((i * 19 + offset * 7) % 75)}%`,
                              animationDelay: `${(i * 0.05 + offset * 0.1) % 1}s`,
                            }}
                          />
                        ))}
                      </div>
                      <span className="font-mono text-[11px] font-semibold text-slate-500 tabular-nums flex-shrink-0">
                        {duration}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* decorative glow */}
            <div
              className="absolute -right-6 -bottom-6 h-44 w-44 rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-500/10 blur-2xl"
              aria-hidden="true"
            />
          </Reveal>

          {/* Tile B — Extensions */}
          <Reveal
            className="md:col-span-5 relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6"
            delay={60}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
                <Hash className="h-4 w-4" />
              </span>
              <span className="font-inter text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Extensions
              </span>
            </div>
            <h3 className="font-outfit text-lg font-bold text-slate-900 leading-snug">
              Hunt groups, call park, intercom, paging.
            </h3>
            <p className="mt-2 font-inter text-sm text-slate-600 leading-relaxed">
              Extension dialing across every site. Page a warehouse from a
              receptionist. Park a call and pick it up at your desk.
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {["x101", "x102", "x103", "x104", "x205", "x301"].map((ext) => (
                <span
                  key={ext}
                  className="font-mono text-[11px] font-semibold rounded-md bg-slate-100 text-slate-700 px-2 py-1"
                >
                  {ext}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Tile C — AI Voicemail */}
          <Reveal
            className="md:col-span-5 relative overflow-hidden rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-white p-6"
            delay={120}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-700">
                <Voicemail className="h-4 w-4" />
              </span>
              <span className="font-inter text-xs font-semibold uppercase tracking-[0.14em] text-violet-700">
                Voicemail · AI
              </span>
            </div>
            <h3 className="font-outfit text-lg font-bold text-slate-900 leading-snug">
              Voicemail with AI transcripts, in your inbox.
            </h3>

            <div className="mt-4 space-y-1.5">
              {[
                { who: "Karen — ACME Co.", text: "Hi, calling about the Q2 invoice…" },
                { who: "Sam — Northwind", text: "Need to reschedule Thursday's call." },
                { who: "Dan — Fabrikam", text: "Just confirming the demo at 3pm." },
              ].map((m, i) => (
                <div
                  key={m.who}
                  className="tx-line rounded-lg bg-white border border-slate-200 px-3 py-2 text-[12px] leading-snug"
                  style={{ animationDelay: `${i * 1.6}s` }}
                >
                  <div className="font-inter text-[10.5px] font-semibold text-violet-600">
                    {m.who}
                  </div>
                  <div className="font-inter text-slate-600 truncate">{m.text}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Tile D — Call recording */}
          <Reveal
            className="md:col-span-4 relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-6"
            delay={180}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700">
                <Disc className="h-4 w-4" />
              </span>
              <span className="font-inter text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                Recording
              </span>
            </div>
            <h3 className="font-outfit text-lg font-bold text-slate-900 leading-snug">
              Full-fidelity, with keyword search.
            </h3>
            <div className="mt-5">
              <MiniWaveform />
            </div>
            <div className="mt-3 flex items-center justify-between font-inter text-[11px] text-slate-500">
              <span>00:42</span>
              <span className="font-semibold text-emerald-700">REC</span>
              <span>03:18</span>
            </div>
          </Reveal>

          {/* Tile E — IVR */}
          <Reveal
            className="md:col-span-4 relative overflow-hidden rounded-3xl border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-white p-6"
            delay={240}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-700">
                <PhoneForwarded className="h-4 w-4" />
              </span>
              <span className="font-inter text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
                IVR
              </span>
            </div>
            <h3 className="font-outfit text-lg font-bold text-slate-900 leading-snug">
              Multi-level auto-attendant, visually.
            </h3>
            <div className="mt-3 h-[110px]">
              <MiniIvr />
            </div>
          </Reveal>

          {/* Tile F — HD Video */}
          <Reveal
            className="md:col-span-4 relative overflow-hidden rounded-3xl border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-white p-6"
            delay={300}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/10 text-rose-700">
                <VideoIcon className="h-4 w-4" />
              </span>
              <span className="font-inter text-xs font-semibold uppercase tracking-[0.14em] text-rose-700">
                Video
              </span>
            </div>
            <h3 className="font-outfit text-lg font-bold text-slate-900 leading-snug">
              HD video meetings with AI summaries.
            </h3>
            <p className="mt-2 font-inter text-[13px] text-slate-600 leading-relaxed">
              Up to 200 seats. Auto-transcripts and AI-generated meeting notes.
            </p>
            <div className="mt-5">
              <MiniVideo />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 04 — Zia AI on every line                                         */
/* ---------------------------------------------------------------- */

function ZiaSection() {
  return (
    <section className="relative bg-slate-950 text-white py-20 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 40% 50% at 20% 30%, rgba(34,211,238,0.18), transparent 60%), radial-gradient(ellipse 50% 60% at 80% 80%, rgba(139,92,246,0.20), transparent 60%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left — copy */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 px-2.5 py-1 font-inter text-[10.5px] font-semibold uppercase tracking-[0.14em] text-cyan-300">
              <Bot className="h-3 w-3" />
              MCM AI · Zia
            </span>
            <h2 className="mt-4 font-outfit text-3xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-white text-balance">
              Zia, our AI Receptionist,{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-violet-300">
                on every line.
              </span>
            </h2>
            <p className="mt-4 font-inter text-base text-white/70 leading-relaxed">
              Zia sits on every MCM line. She answers, qualifies, books, and
              summarizes — with CRM write-back to HubSpot, Zoho, or Pipedrive.
            </p>

            <ul className="mt-7 space-y-3">
              {[
                "Answers in 32 languages, 24/7.",
                "Qualifies leads with your custom script.",
                "Books meetings into Google or Outlook.",
                "Writes back to your CRM after every call.",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                  <span className="font-inter text-sm text-white/85 leading-relaxed">
                    {line}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/products/ai/zia-receptionist"
                className="inline-flex items-center gap-1.5 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-inter text-sm font-semibold px-5 py-2.5 transition-colors"
              >
                Meet Zia
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/products/ai"
                className="font-inter text-sm font-semibold text-white/70 hover:text-white transition-colors"
              >
                The Zia family →
              </a>
            </div>
          </div>

          {/* Right — Zia card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 lg:p-8 shadow-2xl">
              {/* Live call header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center font-outfit text-white font-bold">
                    Z
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
                  </div>
                  <div>
                    <div className="font-inter text-sm font-semibold text-white">Zia · AI Receptionist</div>
                    <div className="font-inter text-[11px] text-white/50">Live call · +1 (415) 555-0182</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 font-inter text-[10px] font-semibold uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>

              {/* Transcript */}
              <div className="mt-6 space-y-3">
                <div className="flex gap-3">
                  <div className="shrink-0 h-7 w-7 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-white flex items-center justify-center text-[11px] font-bold">
                    Z
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-white/5 border border-white/10 px-3.5 py-2.5 font-inter text-[13px] text-white/85 leading-relaxed max-w-md">
                    Hi, you&apos;ve reached MyCountryMobile. How can I help you today?
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="rounded-2xl rounded-tr-sm bg-white/10 border border-white/10 px-3.5 py-2.5 font-inter text-[13px] text-white/90 leading-relaxed max-w-md">
                    I&apos;d like to demo your contact center for a 50-seat sales team.
                  </div>
                  <div className="shrink-0 h-7 w-7 rounded-full bg-slate-700 text-white flex items-center justify-center text-[11px] font-bold">
                    M
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="shrink-0 h-7 w-7 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-white flex items-center justify-center text-[11px] font-bold">
                    Z
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-white/5 border border-white/10 px-3.5 py-2.5 font-inter text-[13px] text-white/85 leading-relaxed max-w-md">
                    Booking a 30-minute slot with Account Executive Priya at 3pm
                    Thursday. I&apos;ll send the calendar invite and write a summary
                    to HubSpot.
                  </div>
                </div>
              </div>

              {/* CRM write-back footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="font-inter text-[11px] uppercase tracking-[0.14em] text-white/50">
                  Writing back to
                </div>
                <div className="flex items-center gap-2">
                  {["HubSpot", "Zoho", "Pipedrive"].map((crm) => (
                    <span
                      key={crm}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-2.5 py-1 font-inter text-[11px] font-semibold text-white/80"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      {crm}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 05 — Compliance                                                   */
/* ---------------------------------------------------------------- */

const COMPLIANCE = [
  {
    icon: ShieldCheck,
    eyebrow: "Outbound caller ID",
    title: "STIR/SHAKEN attestation on every call.",
    body: "Each outbound call is signed with full attestation, so your USA caller ID lands as 'verified', not 'spam likely'.",
  },
  {
    icon: PhoneForwarded,
    eyebrow: "Carrier reputation",
    title: "Robocall mitigation, handled by us.",
    body: "Carrier-grade mitigation, FCC database registration, and ongoing reputation monitoring — all included.",
  },
  {
    icon: Hash,
    eyebrow: "10DLC SMS",
    title: "10DLC registration through TCR.",
    body: "We register your brand and campaign with The Campaign Registry. The government fee is passed through at cost.",
  },
];

function ComplianceSection() {
  return (
    <section className="relative bg-white py-20" aria-labelledby="compliance-h2">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 border border-cyan-200 px-2.5 py-1 font-inter text-[10.5px] font-semibold uppercase tracking-[0.14em] text-cyan-700">
              <ShieldCheck className="h-3 w-3" />
              USA-compliant by default
            </span>
            <h2
              id="compliance-h2"
              className="mt-4 font-outfit text-3xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 text-balance"
            >
              Compliant for{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-violet-600">
                USA outbound.
              </span>
            </h2>
            <p className="mt-4 font-inter text-base text-slate-600 leading-relaxed">
              We do the regulatory plumbing so your team can dial. Robocall
              mitigation, attestation, and 10DLC — handled.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {COMPLIANCE.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal
                key={c.title}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6"
                delay={i * 80}
              >
                <span className="absolute top-5 right-5 font-mono text-[11px] font-semibold text-slate-300">
                  0{i + 1}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-700">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="mt-5 font-inter text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {c.eyebrow}
                </div>
                <h3 className="mt-1.5 font-outfit text-lg font-bold text-slate-900 leading-snug">
                  {c.title}
                </h3>
                <p className="mt-2 font-inter text-sm text-slate-600 leading-relaxed">
                  {c.body}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 06 — Testimonial                                                  */
/* ---------------------------------------------------------------- */

function TestimonialSection() {
  return (
    <section
      className="relative py-20 bg-gradient-to-br from-amber-50 via-rose-50/60 to-white"
      aria-label="Customer story"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="relative rounded-3xl bg-white border border-amber-100 shadow-[0_24px_60px_rgba(244,63,94,0.10)] p-8 lg:p-10">
            <Quote className="h-8 w-8 text-amber-400 mb-5" />
            <blockquote className="font-outfit text-xl lg:text-[26px] leading-[1.4] font-semibold text-slate-900 text-balance">
              &ldquo;We switched from three vendors to MCM in a weekend. Extensions,
              SMS, and video all work on one login — the team picked it up
              without any training.&rdquo;
            </blockquote>
            <div className="mt-7 flex items-center gap-4 pt-5 border-t border-slate-100">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white font-outfit font-bold">
                SL
              </div>
              <div className="flex-1">
                <div className="font-inter font-semibold text-slate-900">
                  Sara Lindqvist
                </div>
                <div className="font-inter text-sm text-slate-500">
                  Head of Ops · Norden Clinics
                </div>
              </div>
              <span className="hidden sm:inline-flex font-inter text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-600 bg-rose-50 border border-rose-100 rounded-full px-2.5 py-1">
                Unified platform
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 07 — Pricing callout                                              */
/* ---------------------------------------------------------------- */

function PricingCallout() {
  return (
    <section className="relative py-12">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-8 py-10 lg:px-12 lg:py-12">
            <div
              aria-hidden="true"
              className="absolute -top-20 -right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            />
            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="text-white">
                <div className="font-inter text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                  Pricing
                </div>
                <h3 className="mt-1 font-outfit text-2xl lg:text-3xl font-bold leading-tight text-balance">
                  Two plans to fit your team.
                </h3>
                <p className="mt-2 font-inter text-sm text-white/85">
                  14-day free trial · No credit card required · Cancel anytime
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/pricing"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-inter text-sm font-semibold px-5 py-3 transition-colors"
                >
                  See pricing
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/signup"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur border border-white/30 hover:bg-white/15 text-white font-inter text-sm font-semibold px-5 py-3 transition-colors"
                >
                  Start Free Trial
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 08 — FAQ                                                          */
/* ---------------------------------------------------------------- */

const FAQS = [
  {
    q: "Is MCM Cloud Phone USA-only?",
    a: "Cloud Phone is built for USA teams. It includes a USA local number and USA outbound. International outbound is available as a pay-as-you-go add-on.",
  },
  {
    q: "What comes with Cloud Phone?",
    a: "Calling, extensions, voicemail, recording, IVR, SMS, MMS, video meetings, and a HubSpot integration. See /pricing for the exact feature split across plans.",
  },
  {
    q: "Is progressive dialer included?",
    a: "Power and predictive dialers are included with the contact center tier. Progressive dialer is available on Enterprise.",
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-white py-20" aria-labelledby="faq-h2">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 font-inter text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-600">
            FAQ
          </span>
          <h2
            id="faq-h2"
            className="mt-4 font-outfit text-3xl lg:text-4xl font-bold leading-[1.1] tracking-tight text-slate-900"
          >
            Questions, answered.
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal
                key={f.q}
                delay={i * 60}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-outfit font-bold text-slate-900 text-base lg:text-lg">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 font-inter text-sm text-slate-600 leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 09 — Closing CTA                                                  */
/* ---------------------------------------------------------------- */

function ClosingCta() {
  return (
    <section className="relative bg-slate-950 text-white py-20 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(34,211,238,0.18), transparent 60%), radial-gradient(ellipse 60% 70% at 50% 100%, rgba(139,92,246,0.20), transparent 60%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <Reveal>
          <h2 className="font-outfit text-3xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-balance">
            Ready to switch to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-violet-300">
              one cloud phone?
            </span>
          </h2>
          <p className="mt-4 font-inter text-base text-white/70 leading-relaxed max-w-xl mx-auto">
            14-day free trial · No credit card required.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/signup"
              className="inline-flex items-center gap-1.5 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-inter text-sm font-semibold px-5 py-3 transition-colors"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/demo"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/15 text-white font-inter text-sm font-semibold px-5 py-3 transition-colors"
            >
              Book a Demo
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 10 — Suite explorer (internal links)                              */
/* ---------------------------------------------------------------- */

const SUITE = [
  {
    href: "/products/cloud-phone/business-phone",
    title: "Business Phone + Zia",
    description: "Unlimited USA calling with Zia AI built in.",
    icon: Phone,
  },
  {
    href: "/products/cloud-phone/customer-engagement",
    title: "Customer Engagement",
    description: "Voice, SMS, and social in one inbox.",
    icon: MessagesSquare,
  },
  {
    href: "/products/cloud-phone/personal-ai",
    title: "Personal AI Assistant",
    description: "Per-seat AI notes and CRM sync.",
    icon: Bot,
  },
  {
    href: "/products/cloud-phone/sms-mms",
    title: "Business SMS & MMS",
    description: "Two-way texting, 10DLC-ready.",
    icon: Send,
  },
  {
    href: "/products/cloud-phone/team-chat",
    title: "Team Chat",
    description: "Chat wired into your phone system.",
    icon: MessageCircle,
  },
  {
    href: "/products/cloud-phone/video-meetings",
    title: "HD Video Meetings",
    description: "200 seats with AI summaries.",
    icon: VideoIcon,
  },
  {
    href: "/products/cloud-phone/online-fax",
    title: "Online Fax",
    description: "HIPAA-ready digital fax.",
    icon: Printer,
  },
  {
    href: "/products/cloud-phone/website-chatbot",
    title: "Website Chatbot",
    description: "Drop-in bot across 6+ channels.",
    icon: MessageCircle,
  },
  {
    href: "/products/cloud-phone/phone-system",
    title: "Hosted Phone System",
    description: "Extensions, IVR, hunt groups.",
    icon: Server,
  },
];

function SuiteSection() {
  return (
    <section className="relative bg-slate-50 py-20" aria-labelledby="suite-h2">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-2.5 py-1 font-inter text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                <Users className="h-3 w-3" />
                Explore the suite
              </span>
              <h2
                id="suite-h2"
                className="mt-3 font-outfit text-3xl lg:text-4xl font-bold leading-[1.1] tracking-tight text-slate-900"
              >
                Nine products. One cloud phone.
              </h2>
            </div>
            <a
              href="/pricing"
              className="font-inter text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors"
            >
              See pricing →
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUITE.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.href} delay={i * 40}>
                <a
                  href={s.href}
                  className="group block rounded-2xl bg-white border border-slate-200 hover:border-violet-300 hover:shadow-[0_18px_44px_rgba(15,23,42,0.08)] transition-all p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-50 to-violet-50 text-violet-600 group-hover:from-cyan-100 group-hover:to-violet-100 transition-colors">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h3 className="mt-4 font-outfit text-base font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-1 font-inter text-sm text-slate-600 leading-relaxed">
                    {s.description}
                  </p>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Page                                                              */
/* ---------------------------------------------------------------- */

export default function CloudPhonePage() {
  return (
    <div className="min-h-screen bg-[#fafbfc]">
      <Header />
      <main>
        <HeroSection />
        <OpeningSection />
        <FeatureBento />
        <ZiaSection />
        <ComplianceSection />
        <TestimonialSection />
        <PricingCallout />
        <FaqSection />
        <ClosingCta />
        <SuiteSection />
      </main>
      <Footer />
    </div>
  );
}
