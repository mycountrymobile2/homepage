"use client";

/**
 * MCM Homepage — single-file composition
 *
 * Every section (Header, Hero, TrustBar, PlatformOverview, CoreFive,
 * Capabilities, MeetZia, HowItWorks, Integrations, Testimonials, FAQ,
 * ClosingCTA, Footer) + the Reveal helper inlined into one file.
 *
 * Complex third-party widgets (3D globe, 3D Spline robot, flip-card,
 * sliding testimonial, AI chat card, integration hero) stay in
 * `components/ui/*` — they are imported below.
 *
 * Usage:
 *   // app/page.tsx
 *   import MCMHomepage from "@/MCMHomepage";
 *   export default function Page() { return <MCMHomepage />; }
 */

import { useEffect, useRef, useState, ReactNode } from "react";
import { GlobeCdn } from "@/components/ui/cobe-globe-cdn";
import AIChatCard from "@/components/ui/ai-chat";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import CardFlip from "@/components/ui/flip-card";
import IntegrationHero from "@/components/ui/integration-hero";
import SlidingTestimonial from "@/components/ui/sliding-testimonial";
import {
  UserPlus,
  Users,
  PhoneCall,
  Timer,
  Unlock,
  CreditCard,
  XCircle,
  Mail,
  Globe,
  LayoutTemplate,
  Rocket,
  Smartphone,
  Sparkles,
  BarChart3,
  Clock,
  type LucideIcon,
} from "lucide-react";

/* ---------------------------------------------------------------- */
/* Reveal — scroll-triggered fade/slide wrapper                     */
/* ---------------------------------------------------------------- */

function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
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
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  const Component = Tag as any;
  return (
    <Component
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}

/* ---------------------------------------------------------------- */
/* 01 — Header (mega menu on hover)                                 */
/* ---------------------------------------------------------------- */

type MenuItem = {
  title: string;
  description?: string;
  href: string;
};

type MenuColumn = {
  heading?: string;
  items: MenuItem[];
};

type MegaPanel =
  | {
      kind: "featured";
      featured: { eyebrow: string; title: string; description: string; href: string };
      items: MenuItem[];
    }
  | {
      kind: "columns";
      columns: MenuColumn[];
    }
  | {
      kind: "simple";
      items: MenuItem[];
    };

type TopNav = {
  label: string;
  panel: MegaPanel;
};

const NAV: TopNav[] = [
  {
    label: "Cloud Phone",
    panel: {
      kind: "featured",
      featured: {
        eyebrow: "Cloud Phone",
        title: "Business phone system with Zia AI on every line.",
        description: "The all-in-one business phone platform.",
        href: "/products/cloud-phone",
      },
      items: [
        { title: "Business Phone + Zia", description: "Unlimited calling with AI backstop.", href: "/products/cloud-phone/business-phone" },
        { title: "Customer Engagement", description: "Voice, SMS, social in one inbox.", href: "/products/cloud-phone/customer-engagement" },
        { title: "Personal AI Assistant", description: "Per-seat AI notes and CRM sync.", href: "/products/cloud-phone/personal-ai" },
        { title: "Business SMS & MMS", description: "Two-way texting, 10DLC-ready.", href: "/products/cloud-phone/sms-mms" },
        { title: "Team Chat", description: "Chat wired into your phone system.", href: "/products/cloud-phone/team-chat" },
        { title: "HD Video Meetings", description: "200-seat video with AI notes.", href: "/products/cloud-phone/video-meetings" },
        { title: "Online Fax", description: "HIPAA-ready digital fax.", href: "/products/cloud-phone/online-fax" },
        { title: "Website Chatbot", description: "Drop-in bot across 6+ channels.", href: "/products/cloud-phone/website-chatbot" },
        { title: "Hosted Phone System", description: "Extensions, IVR, hunt groups.", href: "/products/cloud-phone/phone-system" },
      ],
    },
  },
  {
    label: "Contact Center",
    panel: {
      kind: "featured",
      featured: {
        eyebrow: "Contact Center",
        title: "AI contact center built for scale.",
        description: "The AI-first contact center.",
        href: "/products/contact-center",
      },
      items: [
        { title: "Omnichannel Queue", description: "Voice, chat, social. One queue.", href: "/products/contact-center/omnichannel" },
        { title: "Outbound Dialer", description: "Power + predictive, USA-compliant.", href: "/products/contact-center/outbound-dialer" },
        { title: "Zia Agent Assist", description: "Live whisper on every call.", href: "/products/contact-center/agent-assist" },
        { title: "Zia Supervisor Assist", description: "AI-ranked floor view.", href: "/products/contact-center/supervisor-assist" },
        { title: "AI Interaction Analytics", description: "Every conversation scored.", href: "/products/contact-center/interaction-analytics" },
        { title: "Enterprise", description: "500+ seats, SSO, custom SLAs.", href: "/products/contact-center/enterprise" },
      ],
    },
  },
  {
    label: "Zia AI",
    panel: {
      kind: "featured",
      featured: {
        eyebrow: "MCM AI · Zia",
        title: "Meet the Zia family.",
        description: "Three AI agents. One voice.",
        href: "/products/ai",
      },
      items: [
        { title: "Zia AI Receptionist", description: "24/7 call answering in 32 languages.", href: "/products/ai/zia-receptionist" },
        { title: "Zia Virtual Assistant", description: "Per-seat AI for notes and CRM.", href: "/products/ai/zia-assistant" },
        { title: "Zia Conversation Expert", description: "Analytics at scale.", href: "/products/ai/zia-conversation" },
      ],
    },
  },
  {
    label: "Features",
    panel: {
      kind: "columns",
      columns: [
        {
          heading: "Core Features",
          items: [
            { title: "Call Recording", description: "Full-fidelity with keyword search.", href: "/features/call-recording" },
            { title: "Auto-attendant & IVR", description: "Visual IVR builder.", href: "/features/auto-attendant" },
            { title: "Supervisor Tools", description: "Barge, whisper, monitor.", href: "/features/supervisor-tools" },
          ],
        },
        {
          heading: "AI Features",
          items: [
            { title: "AI Receptionist", description: "24/7 live answering.", href: "/features/ai-receptionist" },
            { title: "AI Sentiment Analysis", description: "Real-time emotion scoring.", href: "/features/ai-sentiment" },
            { title: "AI Agent Assist", description: "Live coaching for agents.", href: "/features/ai-agent-assist" },
            { title: "Conversation Intelligence", description: "Gong-class, natively.", href: "/features/conversation-intelligence" },
          ],
        },
        {
          heading: "Numbers",
          items: [
            { title: "Toll-free Numbers", description: "800, 888, 877 in minutes.", href: "/features/toll-free-numbers" },
          ],
        },
      ],
    },
  },
  {
    label: "Solutions",
    panel: {
      kind: "columns",
      columns: [
        {
          heading: "By Industry",
          items: [
            { title: "Healthcare", description: "HIPAA-ready clinic phones.", href: "/solutions/healthcare" },
            { title: "Financial Services", description: "Compliant for FINRA + PCI.", href: "/solutions/finance" },
            { title: "Retail & eCom", description: "Omnichannel for DTC brands.", href: "/solutions/retail" },
            { title: "SaaS & Tech", description: "API-first phone for SaaS.", href: "/solutions/saas" },
            { title: "Logistics", description: "Multi-site dispatch.", href: "/solutions/logistics" },
          ],
        },
        {
          heading: "By Team",
          items: [
            { title: "Sales Teams", description: "Dialer + AI coaching.", href: "/solutions/sales-teams" },
            { title: "Support Teams", description: "One queue, every channel.", href: "/solutions/support-teams" },
            { title: "Remote Teams", description: "One number, every device.", href: "/solutions/remote-teams" },
            { title: "SMB Owner-Operators", description: "Zia is your front desk.", href: "/solutions/smb" },
            { title: "Enterprise IT", description: "SSO, SCIM, multi-site.", href: "/solutions/enterprise-it" },
          ],
        },
      ],
    },
  },
  {
    label: "Resources",
    panel: {
      kind: "simple",
      items: [
        { title: "Docs", description: "Product documentation.", href: "/docs" },
        { title: "API", description: "REST API + webhooks.", href: "/api" },
        { title: "Status", description: "Live service status.", href: "/status" },
        { title: "Blog", description: "Latest posts.", href: "/blog" },
        { title: "Contact", description: "Talk to a human.", href: "/contact" },
      ],
    },
  },
];

function MegaPanelContent({ panel }: { panel: MegaPanel }) {
  if (panel.kind === "featured") {
    return (
      <div className="grid grid-cols-12 gap-8 p-8">
        <a
          href={panel.featured.href}
          className="col-span-4 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-cyan-50 via-white to-violet-50 border border-slate-200/70 p-6 hover:border-violet-300 hover:shadow-lg transition-all group"
        >
          <div>
            <div className="font-inter text-xs font-semibold uppercase tracking-widest text-violet-600">
              {panel.featured.eyebrow}
            </div>
            <div className="mt-3 font-outfit text-xl font-bold text-slate-900 leading-snug text-balance">
              {panel.featured.title}
            </div>
            <p className="mt-3 font-inter text-sm text-slate-600 leading-relaxed">
              {panel.featured.description}
            </p>
          </div>
          <div className="mt-6 font-inter text-sm font-semibold text-violet-600 flex items-center gap-1">
            Explore overview
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </a>
        <div className="col-span-8 grid grid-cols-2 gap-x-6 gap-y-1">
          {panel.items.map((item) => (
            <MenuLink key={item.href} item={item} />
          ))}
        </div>
      </div>
    );
  }

  if (panel.kind === "columns") {
    const cols = panel.columns.length;
    const gridCols = cols === 2 ? "grid-cols-2" : cols === 3 ? "grid-cols-3" : "grid-cols-4";
    return (
      <div className={`grid ${gridCols} gap-8 p-8`}>
        {panel.columns.map((col) => (
          <div key={col.heading}>
            {col.heading && (
              <div className="mb-3 font-inter text-xs font-semibold uppercase tracking-widest text-slate-500">
                {col.heading}
              </div>
            )}
            <div className="flex flex-col gap-1">
              {col.items.map((item) => (
                <MenuLink key={item.href} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // simple
  return (
    <div className="p-4 min-w-[260px]">
      <div className="flex flex-col gap-1">
        {panel.items.map((item) => (
          <MenuLink key={item.href} item={item} compact />
        ))}
      </div>
    </div>
  );
}

function MenuLink({ item, compact = false }: { item: MenuItem; compact?: boolean }) {
  return (
    <a
      href={item.href}
      className="group rounded-xl px-3 py-2.5 hover:bg-slate-50 transition-colors"
    >
      <div className="font-inter text-sm font-semibold text-slate-900 group-hover:text-violet-600 transition-colors">
        {item.title}
      </div>
      {!compact && item.description && (
        <div className="mt-0.5 font-inter text-xs text-slate-500 leading-relaxed">
          {item.description}
        </div>
      )}
      {compact && item.description && (
        <div className="mt-0.5 font-inter text-xs text-slate-500">{item.description}</div>
      )}
    </a>
  );
}

function Header() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const openMenu = (idx: number) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveIdx(idx);
  };

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActiveIdx(null), 120);
  };

  const activePanel = activeIdx !== null ? NAV[activeIdx].panel : null;
  const isSimple = activePanel?.kind === "simple";

  return (
    <header
      className="fixed top-0 w-full z-50 border-b border-white/80 bg-white/55 backdrop-blur-3xl shadow-[0_8px_32px_rgba(15,23,42,0.08)]"
      onMouseLeave={scheduleClose}
    >
      <nav className="flex justify-between items-center h-20 max-w-[1280px] mx-auto w-full">
        <a href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-600 font-outfit">
          MyCountryMobile
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {NAV.map((entry, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={entry.label}
                type="button"
                onMouseEnter={() => openMenu(idx)}
                onFocus={() => openMenu(idx)}
                className={`relative px-3 py-2 font-inter text-sm font-medium tracking-tight transition-colors ${
                  isActive ? "text-violet-600" : "text-slate-600 hover:text-violet-600"
                }`}
              >
                {entry.label}
                <span
                  className={`absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-600 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors">
            Login
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-violet-600 text-white rounded-full text-sm font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all">
            Get Started
          </button>
        </div>
      </nav>

      {/* Mega menu panel */}
      <div
        className={`absolute left-0 right-0 top-full transition-all duration-200 ${
          activePanel
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
        onMouseEnter={() => activeIdx !== null && openMenu(activeIdx)}
        onMouseLeave={scheduleClose}
      >
        <div className={`mx-auto ${isSimple ? "max-w-xs" : "max-w-[1200px]"} px-4 pt-2 pb-6`}>
          <div className="rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/70 shadow-[0_24px_60px_rgba(15,23,42,0.12)] overflow-hidden">
            {activePanel && <MegaPanelContent panel={activePanel} />}
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------- */
/* 02 — Hero                                                        */
/* ---------------------------------------------------------------- */

function Hero() {
  useEffect(() => {
    const messages = document.querySelectorAll<HTMLElement>(
      ".hero-chat .message-entry"
    );
    const interval = window.setInterval(() => {
      messages.forEach((m, i) => {
        m.style.animation = "none";
        // trigger reflow
        void m.offsetWidth;
        m.style.animation = `message-slide-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${
          0.5 + i * 2.5
        }s forwards`;
      });
    }, 15000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="hero-section relative pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 min-h-[700px]">
          {/* Left column */}
          <div className="w-full lg:w-[45%] flex flex-col items-start z-10">
            <div className="flex items-center gap-2 h-10 px-4 rounded-full bg-white/70 backdrop-blur-md border border-white font-inter font-medium text-[14px] text-slate-800 shadow-sm hover:translate-y-[-2px] transition-transform cursor-pointer">
              <span>✨ AI receptionist (Zia) is now multilingual</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </div>

            <h1 className="mt-8 font-outfit text-[36px] md:text-[48px] lg:text-[56px] leading-[1.1] font-bold text-slate-900 tracking-[-0.02em]">
              The AI cloud contact center platform you can{" "}
              <span className="gradient-text-active">activate in minutes.</span>
            </h1>

            <p className="mt-6 font-inter text-[18px] md:text-[20px] leading-[1.5] text-slate-600 max-w-xl">
              Cloud phone and AI contact center on one login. Calls, chat, SMS, video, and an AI receptionist.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-[#A5F3FC] to-[#8B5CF6] text-white font-outfit font-semibold text-lg rounded-full shadow-[0_12px_24px_-8px_rgba(139,92,246,0.4)] hover:shadow-[0_16px_32px_-8px_rgba(139,92,246,0.5)] hover:-translate-y-1 transition-all active:scale-95">
                Start Free Trial
              </button>
              <button className="px-8 py-4 glass-panel text-slate-900 font-outfit font-semibold text-lg rounded-full hover:bg-white/80 transition-all">
                Book a Demo
              </button>
              <a className="ml-4 font-inter font-medium text-slate-900 hover:underline flex items-center gap-1 group" href="#">
                View Pricing
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>

            <p className="mt-4 font-inter text-[14px] text-slate-500 font-normal">
              No credit card. Cancel anytime.
            </p>

            <div className="mt-12 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 h-9 px-4 glass-panel rounded-full text-sm font-medium text-slate-700">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> 17,500+ teams
              </div>
              <div className="flex items-center gap-2 h-9 px-4 glass-panel rounded-full text-sm font-medium text-slate-700">
                <span className="w-2 h-2 rounded-full bg-green-400" /> 99.99% uptime
              </div>
              <div className="flex items-center gap-2 h-9 px-4 glass-panel rounded-full text-sm font-medium text-slate-700">
                <span
                  className="material-symbols-outlined text-yellow-400 text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>{" "}
                4.8/5 on G2
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="hero-chat w-full lg:w-[55%] relative h-[460px] md:h-[600px] mt-12 lg:mt-0">
            {/* Video tile: Sarah (top) */}
            <div className="absolute top-[2%] left-[4%] w-[42%] h-[38%] md:h-[46%] glass-panel rounded-3xl overflow-hidden tile-tilt-1 z-30 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Sarah · live"
                className="w-full h-full object-cover"
                src="/videos/sarah.gif"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/55 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 live-dot" />
                <span className="text-white text-[9px] font-bold tracking-wider">LIVE</span>
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg">
                <span className="text-white text-[10px] font-medium">Sarah J.</span>
                <span className="text-white/60 text-[9px] font-mono">02:41</span>
              </div>
            </div>

            {/* Video tile: Alex (bottom) */}
            <div className="absolute bottom-[16%] md:bottom-[2%] left-[4%] w-[42%] h-[40%] md:h-[46%] glass-panel rounded-3xl overflow-hidden tile-tilt-3 z-30 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Alex · live"
                className="w-full h-full object-cover"
                src="/videos/alex.gif"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/55 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 live-dot" />
                <span className="text-white text-[9px] font-bold tracking-wider">LIVE</span>
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg">
                <span className="text-white text-[10px] font-medium">Alex R.</span>
                <span className="text-white/60 text-[9px] font-mono">02:41</span>
              </div>
            </div>

            {/* Deconstructed chat */}
            <div className="absolute top-[10%] right-[0%] w-[55%] flex flex-col gap-4 z-20 pointer-events-none">
              <div
                className="message-entry message-glass p-4 rounded-3xl rounded-tl-sm w-[85%] self-end shadow-xl pointer-events-auto"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold text-slate-800">Saif S.</span>
                  <span className="text-[10px] text-slate-400">10:42 AM</span>
                </div>
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  I&apos;ve updated the API docs for multilingual routing.
                </p>
              </div>

              <div
                className="message-entry message-glass p-4 rounded-3xl rounded-tl-sm w-[95%] self-end shadow-xl pointer-events-auto border-violet-200/50"
                style={{ animationDelay: "3s" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold text-violet-600 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                    AI Receptionist
                  </span>
                  <span className="text-[10px] text-slate-400">10:43 AM</span>
                </div>
                <p className="text-[13px] text-slate-700 italic font-medium leading-relaxed">
                  Noted. I am now processing incoming calls in Spanish for EMEA regions.
                </p>
              </div>

              <div
                className="message-entry flex items-center gap-2 px-4 py-2 message-glass rounded-full w-fit shadow-md pointer-events-auto"
                style={{ animationDelay: "5s" }}
              >
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dot-1" />
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dot-2" />
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dot-3" />
                </div>
                <span className="text-[10px] font-medium text-slate-500">
                  Zia is drafting summary...
                </span>
              </div>
            </div>

            {/* Floating Zia recording chip */}
            <div className="absolute top-[0%] right-[2%] md:right-[10%] scale-[0.78] origin-top-right md:scale-100 z-50 float-slow">
              <div className="glass-panel px-5 py-3 rounded-2xl flex items-center gap-3 shadow-xl border-white/80">
                <span className="text-xl">🎙️</span>
                <div className="text-sm font-inter">
                  <p className="font-bold text-slate-900 leading-none">AI is recording</p>
                  <p className="text-[10px] text-slate-500 mt-1">Real-time summary enabled</p>
                </div>
              </div>
            </div>

            {/* Floating Auto-translate chip */}
            <div
              className="absolute bottom-[18%] left-[2%] right-auto md:bottom-[5%] md:left-auto md:right-[0%] scale-[0.78] origin-bottom-left md:origin-bottom-right md:scale-100 z-50 float-slow"
              style={{ animationDelay: "-3s" }}
            >
              <div className="glass-panel px-5 py-3 rounded-2xl flex items-center gap-3 shadow-xl border-white/80">
                <span className="text-xl">🌐</span>
                <div className="text-sm font-inter">
                  <p className="font-bold text-slate-900 leading-none">Auto-translate</p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    EN{" "}
                    <span className="material-symbols-outlined text-[10px] align-middle">
                      arrow_forward
                    </span>{" "}
                    ES
                  </p>
                </div>
              </div>
            </div>

            {/* Control bar */}
            <div className="absolute flex bottom-[2%] md:bottom-[10%] left-1/2 -translate-x-1/2 items-center h-11 md:h-14 px-3 md:px-5 glass-panel rounded-full shadow-2xl border-white/80 gap-2 md:gap-3 z-50 scale-[0.88] md:scale-100 origin-bottom md:origin-center">
              <button className="w-9 h-9 rounded-full bg-white/50 hover:bg-white flex items-center justify-center text-slate-600 transition-colors">
                <span className="material-symbols-outlined text-[20px]">mic</span>
              </button>
              <button className="w-9 h-9 rounded-full bg-white/50 hover:bg-white flex items-center justify-center text-slate-600 transition-colors">
                <span className="material-symbols-outlined text-[20px]">videocam</span>
              </button>
              <div className="w-px h-6 bg-slate-200 mx-1" />
              <button className="px-6 h-9 bg-rose-500 text-white font-bold rounded-full text-[13px] hover:bg-rose-600 shadow-lg shadow-rose-200 transition-all">
                Leave
              </button>
            </div>

            {/* Central glow orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400/20 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------------------------------------------------------------- */
/* 03 — TrustBar                                                    */
/* ---------------------------------------------------------------- */

const TRUST_PARTNERS = [
  { name: "Tigo", src: "https://www.mycountrymobile.com/wp-content/uploads/2024/10/Tigo-partner.png" },
  { name: "TM", src: "https://www.mycountrymobile.com/wp-content/uploads/2024/10/TM.png" },
  { name: "China Mobile", src: "https://www.mycountrymobile.com/wp-content/uploads/2024/10/china-mobile-partner.png" },
  { name: "PLDT", src: "https://www.mycountrymobile.com/wp-content/uploads/2024/10/PLDT.png" },
  { name: "Telekom Slovenije", src: "https://www.mycountrymobile.com/wp-content/uploads/2024/10/Telekom-Slovenije-partner.png" },
  { name: "Telin", src: "https://www.mycountrymobile.com/wp-content/uploads/2024/02/p6.webp" },
  { name: "MTT", src: "https://www.mycountrymobile.com/wp-content/uploads/2024/02/MTT-1.webp" },
  { name: "Reliance", src: "https://www.mycountrymobile.com/wp-content/uploads/2024/10/Relience.png" },
  { name: "Zain", src: "https://www.mycountrymobile.com/wp-content/uploads/2024/02/zain-2.webp" },
  { name: "DT", src: "https://www.mycountrymobile.com/wp-content/uploads/2024/02/p2.png" },
];
const TRUST_LOOP = [...TRUST_PARTNERS, ...TRUST_PARTNERS];

function TrustBar() {
  return (
    <section className="relative py-14 md:py-16 bg-white">
      <Reveal className="max-w-[1280px] mx-auto px-6 md:px-12 text-center">
        <p className="eyebrow mb-8">Trusted by global carriers & partners</p>
      </Reveal>

      <div
        className="relative flex overflow-hidden max-w-full"
        style={{
          maskImage:
            "linear-gradient(to left, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="flex animate-x-slider gap-10 md:gap-14 w-max items-center py-4">
          {TRUST_LOOP.map((p, i) => (
            <div
              key={i}
              className="shrink-0 h-7 md:h-9 flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition"
              title={p.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.name} className="max-h-full w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>

      <Reveal className="max-w-[1280px] mx-auto px-6 md:px-12 text-center mt-8">
        <p className="font-inter text-sm text-slate-500">
          From 5-person startups to 500-seat contact centers.
        </p>
      </Reveal>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 04 — PlatformOverview                                            */
/* ---------------------------------------------------------------- */

function PlatformOverview() {
  return (
    <section className="relative py-24 px-6 md:px-12 section-bg-soft-blue">
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="max-w-3xl mb-14">
          <span className="eyebrow">The platform</span>
          <h2 className="section-h2 mt-4">
            Cloud phone and AI contact center. One login.
          </h2>
          <p className="section-sub mt-4">
            Two products, one bill, one roadmap. Use one or both.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(180px,auto)] gap-4 md:gap-5">
          <Reveal className="md:col-span-7 md:row-span-2 relative rounded-3xl overflow-hidden min-h-[460px] md:min-h-[560px] shadow-[0_30px_80px_-20px_rgba(15,23,42,0.18)]">
            <div
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 35%, #fce7f3 70%, #fbcfe8 100%)",
              }}
            />
            <div className="absolute inset-0 -z-10 opacity-60 bg-[radial-gradient(ellipse_at_top_left,rgba(147,197,253,0.55),transparent_55%)]" />
            <div className="absolute inset-0 -z-10 opacity-60 bg-[radial-gradient(ellipse_at_bottom_right,rgba(244,114,182,0.45),transparent_55%)]" />

            <div className="relative h-full p-6 md:p-8 flex flex-col">
              <div className="max-w-sm">
                <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-600">
                  One workspace
                </span>
                <h3 className="mt-3 font-outfit text-[26px] md:text-[32px] font-bold text-slate-900 leading-[1.15] tracking-tight">
                  Your calls and conversations, side by side.
                </h3>
                <p className="mt-3 font-inter text-[14px] md:text-[15px] text-slate-700 leading-relaxed">
                  Answer a live call while your team keeps the thread moving — everything sits in one view.
                </p>
              </div>

              <div className="relative flex-1 mt-8 flex flex-col md:block gap-5">
                <Reveal
                  className="reveal-bottom relative md:absolute md:left-0 md:bottom-0 w-full max-w-[260px] md:w-[220px] mx-auto md:mx-0 rounded-[28px] bg-white/85 backdrop-blur-xl border border-white p-5 shadow-[0_24px_60px_-12px_rgba(59,130,246,0.35)] z-10"
                  delay={200}
                >
                  <div className="text-[10px] font-bold tracking-[0.18em] text-slate-500 uppercase text-center">
                    Active call
                  </div>
                  <div className="mt-4 mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 ring-4 ring-white flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    DP
                  </div>
                  <div className="mt-3 text-center text-slate-900 font-semibold text-[15px]">
                    David Park
                  </div>
                  <div className="text-center text-slate-500 text-[12px] font-mono mt-0.5">
                    04:32
                  </div>
                  <div className="mt-3 flex items-end justify-center gap-[3px] h-6">
                    {[10, 16, 22, 18, 12, 20, 14, 10, 16, 12].map((h, i) => (
                      <span
                        key={i}
                        className="wave-bar w-[3px] rounded-full bg-gradient-to-t from-blue-500 to-pink-400"
                        style={{ height: `${h}px`, animationDelay: `${i * 0.09}s` }}
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <button className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                      <span className="material-symbols-outlined text-[18px]">mic</span>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-300">
                      <span className="material-symbols-outlined text-[18px]">call_end</span>
                    </button>
                  </div>
                </Reveal>

                <Reveal className="reveal-right relative md:absolute md:right-0 md:top-0 md:bottom-0 md:left-[40%] h-[340px] md:h-auto rounded-[28px] bg-white/85 backdrop-blur-xl border border-white overflow-hidden shadow-[0_24px_60px_-12px_rgba(236,72,153,0.25)] flex flex-col">
                  <div className="px-4 py-3 border-b border-slate-200/70 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-violet-500 flex items-center justify-center text-white text-[11px] font-bold">
                      SM
                    </div>
                    <div>
                      <div className="text-[12px] font-semibold text-slate-900 leading-none">
                        Sarah Mitchell
                      </div>
                      <div className="text-[10px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active now
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 px-4 py-3 space-y-2 overflow-hidden">
                    <div className="chat-msg chat-msg-1">
                      <div className="inline-block max-w-[80%] rounded-2xl rounded-tl-sm bg-slate-100 border border-slate-200/70 px-3 py-2 text-[12px] text-slate-800">
                        Hi, I&apos;d like to schedule a consultation
                      </div>
                    </div>
                    <div className="chat-typing chat-typing-1 flex items-center gap-1 px-3 py-2 w-fit rounded-full bg-slate-100 border border-slate-200/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dot-1" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dot-2" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dot-3" />
                    </div>
                    <div className="chat-msg chat-msg-2 flex justify-end">
                      <div className="inline-block max-w-[80%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-blue-500 to-violet-500 text-white px-3 py-2 text-[12px] shadow-md shadow-blue-200">
                        Of course! I have availability tomorrow.
                      </div>
                    </div>
                    <div className="chat-msg chat-msg-3">
                      <div className="inline-block max-w-[75%] rounded-2xl rounded-tl-sm bg-slate-100 border border-slate-200/70 px-3 py-2 text-[12px] text-slate-800">
                        That works perfectly for me
                      </div>
                    </div>
                    <div className="chat-typing chat-typing-2 flex items-center gap-1 px-3 py-2 w-fit rounded-full bg-slate-100 border border-slate-200/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dot-1" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dot-2" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dot-3" />
                    </div>
                    <div className="chat-msg chat-msg-4 flex justify-end">
                      <div className="inline-block max-w-[80%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-blue-500 to-violet-500 text-white px-3 py-2 text-[12px] shadow-md shadow-blue-200">
                        Great! I&apos;ll send a calendar invite.
                      </div>
                    </div>
                  </div>

                  <div className="mx-3 mb-3 rounded-full bg-slate-100 border border-slate-200 px-4 py-2 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Type a message…</span>
                    <span className="material-symbols-outlined text-[16px] text-blue-500">send</span>
                  </div>
                </Reveal>
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-5 glass-panel rounded-3xl p-7 relative overflow-hidden cap-tile">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-300/40 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-500 flex items-center justify-center mb-5 shadow-lg shadow-cyan-200/60">
                <span
                  className="material-symbols-outlined text-white text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  call
                </span>
              </div>
              <h3 className="font-outfit text-[22px] font-bold text-slate-900 mb-2">
                Cloud Phone
              </h3>
              <p className="font-inter text-[14.5px] text-slate-700 leading-[1.6]">
                HD calling to 190+ countries. Virtual numbers in 100+. Shared SMS inboxes, video meetings, and mobile + desktop apps.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["HD voice", "SMS", "Video", "190+ countries"].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/70 border border-white/80 text-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-5 glass-panel rounded-3xl p-7 relative overflow-hidden cap-tile">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-violet-300/40 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center mb-5 shadow-lg shadow-violet-200/60">
                <span
                  className="material-symbols-outlined text-white text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_awesome
                </span>
              </div>
              <h3 className="font-outfit text-[22px] font-bold text-slate-900 mb-2">
                AI Contact Center
              </h3>
              <p className="font-inter text-[14.5px] text-slate-700 leading-[1.6]">
                Skill-based routing, predictive dialer, live coaching, and an omnichannel inbox on one thread per customer.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Routing", "Dialer", "Coaching", "Omnichannel"].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/70 border border-white/80 text-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 05 — CoreFive                                                    */
/* ---------------------------------------------------------------- */

function CoreFive() {
  return (
    <section className="relative py-24 px-6 md:px-12 section-bg-dots">
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="max-w-3xl mb-14">
          <span className="eyebrow">Core five</span>
          <h2 className="section-h2 mt-4">
            Five tools your agents open every morning.
          </h2>
          <p className="section-sub mt-4">The day-to-day.</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(160px,auto)] gap-4 md:gap-5">
          <Reveal className="md:col-span-8 md:row-span-2 relative rounded-3xl overflow-hidden p-7 md:p-8 bg-slate-50 border border-slate-200/70 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.12)] flex flex-col">
            <div className="absolute -bottom-44 -right-44 w-[540px] h-[540px] opacity-95 pointer-events-none">
              <div className="pointer-events-auto w-full h-full">
                <GlobeCdn
                  className="w-full h-full"
                  speed={0.01}
                  markerColor={[0.23, 0.51, 0.96]}
                  glowColor={[0.99, 0.82, 0.91]}
                />
              </div>
            </div>

            <div className="relative z-10 max-w-md">
              <h3 className="font-outfit text-[24px] md:text-[28px] font-bold text-slate-900 tracking-tight">
                Smart Call Routing
              </h3>
              <p className="mt-2 font-inter text-[14.5px] text-slate-600 leading-[1.6]">
                First-ring rules and skill-based queues — for high-velocity teams.
              </p>
            </div>

            <div className="relative flex-1 mt-6 flex flex-col gap-3 md:block">
              <div className="relative md:absolute md:top-0 md:left-0 self-start flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-md">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-pink-400 animate-ping opacity-75" />
                  <span className="relative w-2 h-2 rounded-full bg-pink-500" />
                </span>
                <span className="text-[11px] font-semibold text-slate-700">Inbound call</span>
              </div>

              <div className="relative md:absolute md:top-8 md:left-0 w-full max-w-[240px] md:w-[220px] rounded-2xl bg-white border border-slate-200/70 shadow-xl px-4 py-3 md:rotate-[-3deg] md:hover:rotate-0 md:hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                  <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500">
                    Rule · Billing
                  </span>
                </div>
                <div className="font-outfit font-semibold text-slate-900 text-[15px]">
                  Intent detection
                </div>
                <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="material-symbols-outlined text-[14px] text-blue-500">bolt</span>
                  Active · routes to Billing
                </div>
              </div>

              <div className="relative md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 w-full max-w-[270px] md:w-[270px] rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-pink-500 shadow-[0_18px_40px_-10px_rgba(139,92,246,0.45)] px-4 py-3 text-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/80">
                    Drag &amp; drop builder
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-white/80">
                    drag_indicator
                  </span>
                </div>
                <div className="font-outfit font-semibold text-[15px]">
                  No IT ticket required
                </div>
                <div className="mt-2.5 flex items-center gap-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={`h-1 flex-1 rounded-full ${i <= 3 ? "bg-white" : "bg-white/25"}`}
                    />
                  ))}
                  <span className="text-[10px] font-mono text-white/80 ml-1">3/4</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-4 md:row-span-2 relative rounded-3xl overflow-hidden p-7 bg-slate-50 border border-slate-200/70 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.12)] flex flex-col">
            <div className="absolute inset-x-0 top-[38%] flex items-center justify-center pointer-events-none">
              <div className="absolute w-40 h-40 rounded-full border border-slate-300/50" />
              <div className="absolute w-28 h-28 rounded-full border border-slate-300/60" />
              <div className="absolute w-16 h-16 rounded-full bg-slate-200/40 blur-xl" />
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-500 text-white text-[10px] font-bold tracking-wide uppercase shadow-md shadow-pink-200">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Live
              </div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                19 threads
              </span>
            </div>

            <div className="relative z-10 mt-5 space-y-2 flex-1">
              {[
                { icon: "call", name: "David Park", snippet: "Voice · 04:32", color: "text-blue-500", dot: "bg-blue-500" },
                { icon: "chat", name: "Sarah Mitchell", snippet: "WhatsApp · typing…", color: "text-emerald-500", dot: "bg-emerald-500" },
                { icon: "mail", name: "Alex Rodriguez", snippet: "Email · 2m ago", color: "text-violet-500", dot: "bg-slate-300" },
                { icon: "sms", name: "John Davis", snippet: "SMS · reply needed", color: "text-pink-500", dot: "bg-pink-500" },
              ].map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-xl bg-white/80 backdrop-blur border border-white px-2.5 py-2 shadow-sm"
                >
                  <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                    <span
                      className={`material-symbols-outlined text-[15px] ${t.color}`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {t.icon}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-semibold text-slate-900 truncate">{t.name}</div>
                    <div className="text-[10px] text-slate-500 truncate">{t.snippet}</div>
                  </div>
                  <span className={`w-1.5 h-1.5 rounded-full ${t.dot} shrink-0`} />
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-5">
              <h3 className="font-outfit text-[22px] font-bold text-slate-900 tracking-tight leading-tight">
                Unified Inbox
              </h3>
              <p className="mt-1.5 font-inter text-[13px] text-slate-600 leading-[1.55]">
                Voice, SMS, WhatsApp, email, and web chat on one thread.
              </p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-7 md:row-span-2 relative rounded-3xl overflow-hidden p-6 bg-slate-50 border border-slate-200/70 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.12)] flex flex-col">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200/80">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-500 text-[20px]">arrow_back</span>
                <h3 className="font-outfit text-[18px] md:text-[20px] font-bold text-slate-900 tracking-tight">
                  Call Intelligence
                </h3>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                AI Call Transcription
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-4 flex-1 min-h-0">
              <div className="flex flex-col min-h-0">
                <div className="text-[10px] font-bold tracking-[0.14em] text-slate-500 uppercase mb-2">
                  Transcript records
                </div>
                <div className="flex-1 space-y-2.5 overflow-hidden">
                  <div>
                    <div className="text-[10px] text-slate-500 mb-0.5">Customer</div>
                    <div className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-[12px] text-slate-800 leading-[1.5]">
                      what are the products of country mobile can you continue now
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 mb-0.5">Agent</div>
                    <div className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-[12px] text-slate-800 leading-[1.5]">
                      it sounds like you want to know that way I can provide you with the right information
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 mb-0.5">Customer</div>
                    <div className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-[12px] text-slate-800 leading-[1.5]">
                      thank you for confirming
                      <span className="inline-block ml-1 px-1.5 py-0.5 rounded bg-pink-100 text-pink-600 text-[9px] font-bold">
                        REDACTED
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col min-h-0">
                <div className="text-[10px] font-bold tracking-[0.14em] text-slate-500 uppercase mb-2">
                  Conversation insights
                </div>

                <div className="space-y-3 flex-1 overflow-hidden">
                  <div>
                    <div className="text-[9px] font-bold tracking-wider text-slate-500 uppercase mb-1">
                      Sentiment
                    </div>
                    <div className="rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[11px] font-semibold text-slate-700">Positive</span>
                      </div>
                      <div className="flex-1 h-1 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500" style={{ width: "82%" }} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">82%</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-bold tracking-wider text-slate-500 uppercase mb-1">
                      Call summary
                    </div>
                    <div className="rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2 text-[11px] text-slate-700 leading-[1.55]">
                      Customer asked about products from their plan; agent confirmed details and refund — 2–3 days ETA.
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-bold tracking-wider text-slate-500 uppercase mb-1">
                      Key topics
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {["billing", "refund", "plan", "confirmation"].map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-medium text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/80">
              <div className="text-[10px] font-bold tracking-[0.14em] text-slate-500 uppercase mb-2">
                Recording
              </div>
              <div className="rounded-full bg-white border border-slate-200 px-3 py-2 flex items-center gap-3">
                <button className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-pink-500 text-white flex items-center justify-center shadow-md shrink-0">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                </button>
                <span className="text-[11px] font-mono text-slate-500 shrink-0">0:00</span>
                <div className="flex-1 h-1 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-pink-500" style={{ width: "0%" }} />
                </div>
                <span className="text-[11px] font-mono text-slate-500 shrink-0">4:24</span>
                <button className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px] text-slate-500">download</span>
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-5 relative rounded-3xl overflow-hidden p-7 bg-slate-50 border border-slate-200/70 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.12)]">
            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-500 text-[18px]">monitoring</span>
                <h3 className="font-outfit text-[18px] font-bold text-slate-900">Live Analytics</h3>
              </div>
              <p className="mt-1.5 font-inter text-[13px] text-slate-600 leading-[1.55]">
                CSAT, FCR, AHT, SLA — updates by the second.
              </p>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <div className="text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-500">
                    SLA index
                  </div>
                  <div className="font-outfit text-[44px] md:text-[52px] font-bold bg-gradient-to-br from-blue-600 to-pink-500 bg-clip-text text-transparent leading-none">
                    98.4%
                  </div>
                </div>
                <div className="flex items-end gap-[3px] h-14">
                  {[40, 55, 48, 70, 62, 85, 72, 90].map((h, i) => (
                    <span
                      key={i}
                      className="w-[6px] rounded-t-md bg-gradient-to-t from-blue-400 to-pink-400"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-5 relative rounded-3xl overflow-hidden p-6 bg-slate-50 border border-slate-200/70 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.12)]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-pink-500 text-[18px]">hub</span>
              <h3 className="font-outfit text-[17px] font-bold text-slate-900">CRM Integrations</h3>
            </div>
            <div className="mt-1 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              4 connectors syncing
            </div>

            <div className="mt-4 space-y-2.5">
              {[
                { name: "HubSpot", pct: 92, color: "from-orange-400 to-pink-400" },
                { name: "Salesforce", pct: 78, color: "from-blue-400 to-cyan-400" },
                { name: "Zoho", pct: 64, color: "from-pink-400 to-violet-400" },
                { name: "Pipedrive", pct: 51, color: "from-violet-400 to-blue-400" },
              ].map((c) => (
                <div key={c.name}>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-slate-700">{c.name}</span>
                    <span className="font-mono text-slate-500">{c.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${c.color}`}
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 06 — Capabilities (horizontal scroll carousel, 16 tiles)         */
/* ---------------------------------------------------------------- */

type VizKind =
  | "ring" | "tree" | "dialpad" | "transcript" | "wave" | "ivr" | "bubble"
  | "camera" | "orb" | "queue" | "channels" | "equalizer" | "whisper"
  | "devices" | "nodes" | "roll";

type Capability = {
  num: string;
  title: string;
  body: string;
  icon: string;
  viz: VizKind;
  featured?: boolean;
};

const CAPS: Capability[] = [
  { num: "01", title: "Cloud phone system", body: "Unlimited inbound + outbound with intent routing.", icon: "call", viz: "ring" },
  { num: "02", title: "Cloud PBX", body: "Directory, dial plans, hunt groups on a visual canvas.", icon: "device_hub", viz: "tree" },
  { num: "03", title: "Extension calling", body: "3-digit extensions, intercom, paging, call park.", icon: "dialpad", viz: "dialpad" },
  { num: "04", title: "Voicemail + AI transcription", body: "Searchable transcripts in email + app.", icon: "voicemail", viz: "transcript" },
  { num: "05", title: "Call + screen recording", body: "Keyword search, PII redaction, custom retention.", icon: "mic", viz: "wave" },
  { num: "06", title: "IVR + auto-attendant", body: "Drag-and-drop menus, holiday routing, multilingual.", icon: "account_tree", viz: "ivr" },
  { num: "07", title: "Business SMS & MMS", body: "Two-way with media.", icon: "sms", viz: "bubble" },
  { num: "08", title: "HD video meetings", body: "200-seat rooms, AI notes, live translation.", icon: "videocam", viz: "camera" },
  { num: "09", title: "AI receptionist (Zia)", body: "Answers, qualifies, books, and summarizes every call.", icon: "auto_awesome", viz: "orb", featured: true },
  { num: "10", title: "Contact center + WFM", body: "ACD, skills queues, dialer, scheduling.", icon: "support_agent", viz: "queue" },
  { num: "11", title: "Omnichannel chatbot", body: "Web, WhatsApp, IG, FB, X, SMS, email — one thread.", icon: "chat", viz: "channels" },
  { num: "12", title: "AI sentiment + speech", body: "Every interaction scored and searchable.", icon: "graphic_eq", viz: "equalizer" },
  { num: "13", title: "AI Agent Assist", body: "Whisper coaching, inline response nudges.", icon: "psychology", viz: "whisper" },
  { num: "14", title: "Mobile + desktop apps", body: "iOS, Android, macOS, Windows.", icon: "devices", viz: "devices" },
  { num: "15", title: "Native integrations", body: "CRM, helpdesk, ticketing.", icon: "hub", viz: "nodes" },
  { num: "16", title: "Number porting", body: "Local, toll-free, international. Free.", icon: "phone_in_talk", viz: "roll" },
];

function Viz({ kind, featured }: { kind: VizKind; featured?: boolean }) {
  const base = featured
    ? "relative h-24 rounded-2xl bg-white/15 border border-white/20 overflow-hidden flex items-center justify-center"
    : "relative h-24 rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center";
  const line = featured ? "bg-white/70" : "bg-slate-400";
  const dim = featured ? "bg-white/30" : "bg-slate-300";
  const accent = featured ? "bg-white" : "bg-slate-600";

  switch (kind) {
    case "ring":
      return (
        <div className={base}>
          <div className="absolute w-10 h-10 rounded-full border border-slate-300 viz-ping" />
          <div className="absolute w-10 h-10 rounded-full border border-slate-300 viz-ping" style={{ animationDelay: "0.7s" }} />
          <div className="absolute w-10 h-10 rounded-full border border-slate-300 viz-ping" style={{ animationDelay: "1.4s" }} />
          <div className="relative w-9 h-9 rounded-full bg-white shadow flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px] text-slate-700" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
          </div>
        </div>
      );
    case "tree":
      return (
        <div className={base}>
          <svg viewBox="0 0 140 70" className="w-full h-full p-3" aria-hidden="true">
            <line x1="70" y1="14" x2="30" y2="52" stroke="#94a3b8" strokeWidth="1" className="viz-dash" />
            <line x1="70" y1="14" x2="70" y2="52" stroke="#94a3b8" strokeWidth="1" className="viz-dash" />
            <line x1="70" y1="14" x2="110" y2="52" stroke="#94a3b8" strokeWidth="1" className="viz-dash" />
            <circle cx="70" cy="14" r="5" className="fill-slate-600" />
            <circle cx="30" cy="54" r="4" className="fill-slate-400 viz-blink-1" />
            <circle cx="70" cy="54" r="4" className="fill-slate-400 viz-blink-2" />
            <circle cx="110" cy="54" r="4" className="fill-slate-400 viz-blink-3" />
          </svg>
        </div>
      );
    case "dialpad":
      return (
        <div className={base}>
          <div className="grid grid-cols-3 gap-1.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className={`w-4 h-4 rounded-md ${dim} ${["viz-blink-1", "viz-blink-2", "viz-blink-3", "viz-blink-4"][i % 4]}`}
              />
            ))}
          </div>
        </div>
      );
    case "transcript":
      return (
        <div className={base}>
          <div className="absolute inset-0 p-3 flex flex-col gap-1.5 justify-center">
            <div className={`h-1.5 w-3/4 rounded-full ${dim}`} />
            <div className={`h-1.5 w-1/2 rounded-full ${dim}`} />
            <div className={`h-1.5 w-2/3 rounded-full ${accent} viz-blink-1`} />
            <div className={`h-1.5 w-2/5 rounded-full ${dim}`} />
          </div>
        </div>
      );
    case "wave":
      return (
        <div className={base}>
          <div className="flex items-end gap-[3px] h-12">
            {[10, 24, 16, 34, 20, 40, 22, 32, 14, 28, 18, 36, 12, 26].map((h, i) => (
              <span
                key={i}
                className={`wave-bar w-[3px] rounded-full ${accent}`}
                style={{ height: `${h}px`, animationDelay: `${(i % 8) * 0.08}s` }}
              />
            ))}
          </div>
        </div>
      );
    case "ivr":
      return (
        <div className={base}>
          <div className="flex flex-col gap-1 items-center">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${accent}`} />
              <span className={`h-0.5 w-8 ${line} viz-blink-1`} />
              <span className={`w-5 h-2 rounded ${dim}`}>
                <span className="sr-only">1</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${dim}`} />
              <span className={`h-0.5 w-8 ${line} viz-blink-2`} />
              <span className={`w-5 h-2 rounded ${dim}`} />
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${dim}`} />
              <span className={`h-0.5 w-8 ${line} viz-blink-3`} />
              <span className={`w-5 h-2 rounded ${dim}`} />
            </div>
          </div>
        </div>
      );
    case "bubble":
      return (
        <div className={base}>
          <div className="flex flex-col gap-2 w-full px-4">
            <div className={`self-start rounded-xl rounded-tl-sm px-3 py-1.5 text-[10px] ${featured ? "bg-white/25 text-white" : "bg-white text-slate-700"} shadow-sm`}>
              Hi there
            </div>
            <div className="self-end flex items-center gap-1 rounded-full px-2 py-1 bg-slate-300">
              <span className="w-1 h-1 rounded-full bg-slate-500 viz-blink-1" />
              <span className="w-1 h-1 rounded-full bg-slate-500 viz-blink-2" />
              <span className="w-1 h-1 rounded-full bg-slate-500 viz-blink-3" />
            </div>
          </div>
        </div>
      );
    case "camera":
      return (
        <div className={base}>
          <div className="relative w-16 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px] text-slate-600 viz-bob" style={{ fontVariationSettings: "'FILL' 1" }}>
              videocam
            </span>
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-rose-500 viz-blink-1" />
          </div>
        </div>
      );
    case "orb":
      return (
        <div className="relative h-24 rounded-2xl bg-white/15 border border-white/20 overflow-hidden flex items-center justify-center">
          <div className="absolute w-12 h-12 rounded-full bg-white/30 blur-xl viz-ping" />
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-white to-white/60 shadow-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] text-violet-600" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
          </div>
          <span className="absolute top-3 right-4 text-white/90 text-[10px]">✦</span>
          <span className="absolute bottom-3 left-5 text-white/70 text-[9px]">✦</span>
        </div>
      );
    case "queue":
      return (
        <div className={base}>
          <div className="flex items-end gap-1.5 h-12">
            {[22, 34, 18, 40, 28, 44, 20].map((h, i) => (
              <span
                key={i}
                className={`w-2 rounded-t ${i === 3 ? accent : dim}`}
                style={{ height: `${h}px`, animation: `viz-bob 2.5s ease-in-out ${i * 0.15}s infinite` }}
              />
            ))}
          </div>
        </div>
      );
    case "channels":
      return (
        <div className={base}>
          <svg viewBox="0 0 140 70" className="w-full h-full p-2" aria-hidden="true">
            {[[16, 16], [16, 54], [124, 16], [124, 54]].map(([x, y], i) => (
              <line key={i} x1={x} y1={y} x2="70" y2="35" stroke="#94a3b8" strokeWidth="1" className="viz-dash" />
            ))}
            <circle cx="16" cy="16" r="4" className="fill-slate-400 viz-blink-1" />
            <circle cx="16" cy="54" r="4" className="fill-slate-400 viz-blink-2" />
            <circle cx="124" cy="16" r="4" className="fill-slate-400 viz-blink-3" />
            <circle cx="124" cy="54" r="4" className="fill-slate-400 viz-blink-4" />
            <circle cx="70" cy="35" r="6" className="fill-slate-700" />
          </svg>
        </div>
      );
    case "equalizer":
      return (
        <div className={base}>
          <div className="flex items-center gap-1 h-12">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <span
                key={i}
                className={`w-1.5 rounded-full ${accent}`}
                style={{ height: `${30 + Math.sin(i) * 10}px`, animation: `viz-bob 1.6s ease-in-out ${i * 0.1}s infinite` }}
              />
            ))}
          </div>
        </div>
      );
    case "whisper":
      return (
        <div className={base}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px] text-slate-600">person</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 viz-blink-1" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 viz-blink-2" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 viz-blink-3" />
            </div>
            <div className={`rounded-xl ${featured ? "bg-white/25" : "bg-white"} px-2 py-1 text-[9px] ${featured ? "text-white" : "text-slate-700"} shadow-sm`}>
              Try asking…
            </div>
          </div>
        </div>
      );
    case "devices":
      return (
        <div className={base}>
          <div className="flex items-end gap-2">
            <div className="w-7 h-12 rounded-md bg-white shadow-sm border border-slate-200 viz-bob" />
            <div className="w-14 h-10 rounded-md bg-white shadow-sm border border-slate-200 viz-bob" style={{ animationDelay: "0.3s" }} />
            <div className="w-5 h-8 rounded-md bg-white shadow-sm border border-slate-200 viz-bob" style={{ animationDelay: "0.6s" }} />
          </div>
        </div>
      );
    case "nodes":
      return (
        <div className={base}>
          <svg viewBox="0 0 140 70" className="w-full h-full p-3" aria-hidden="true">
            <line x1="20" y1="20" x2="70" y2="35" stroke="#94a3b8" strokeWidth="1" className="viz-dash" />
            <line x1="120" y1="20" x2="70" y2="35" stroke="#94a3b8" strokeWidth="1" className="viz-dash" />
            <line x1="20" y1="50" x2="70" y2="35" stroke="#94a3b8" strokeWidth="1" className="viz-dash" />
            <line x1="120" y1="50" x2="70" y2="35" stroke="#94a3b8" strokeWidth="1" className="viz-dash" />
            <rect x="14" y="14" width="12" height="12" rx="3" className="fill-slate-400" />
            <rect x="114" y="14" width="12" height="12" rx="3" className="fill-slate-400" />
            <rect x="14" y="44" width="12" height="12" rx="3" className="fill-slate-400" />
            <rect x="114" y="44" width="12" height="12" rx="3" className="fill-slate-400" />
            <circle cx="70" cy="35" r="7" className="fill-slate-700" />
          </svg>
        </div>
      );
    case "roll":
      return (
        <div className={base}>
          <div className="flex gap-1">
            {["+1", "+44", "+91"].map((prefix, i) => (
              <div key={prefix} className="relative w-10 h-10 rounded-lg bg-white shadow-sm overflow-hidden">
                <div
                  className="absolute inset-0 flex flex-col items-center justify-start pt-1 viz-roll"
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  {["+1", "+44", "+91", "+65", "+61", "+1"].map((p, j) => (
                    <span key={j} className="h-8 flex items-center justify-center font-mono text-[11px] text-slate-700 shrink-0">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  }
}

function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let raf = 0;
    const update = () => {
      if (window.innerWidth < 1024) {
        track.style.transform = "translate3d(0,0,0)";
        if (progressRef.current) progressRef.current.style.width = "6%";
        if (progressLabelRef.current) progressLabelRef.current.textContent = "01 / 16";
        return;
      }
      const rect = container.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollable = rect.height - viewportH;
      if (scrollable <= 0) return;
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      const progress = scrolled / scrollable;
      const viewportW = track.parentElement?.clientWidth ?? window.innerWidth;
      const maxTranslate = Math.max(0, track.scrollWidth - viewportW + 48);
      track.style.transform = `translate3d(-${progress * maxTranslate}px, 0, 0)`;

      if (progressRef.current) {
        progressRef.current.style.width = `${Math.max(6, progress * 100)}%`;
      }
      if (progressLabelRef.current) {
        const current = Math.min(16, Math.max(1, Math.round(progress * 15) + 1));
        progressLabelRef.current.textContent = `${String(current).padStart(2, "0")} / 16`;
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="capabilities" className="relative section-bg-grey">
      <div ref={containerRef} className="relative lg:h-[420vh]">
        <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 items-center py-12 lg:py-0">
          <div
            className="relative z-20 px-6 md:px-12 lg:px-0 lg:pr-4"
            style={{ paddingLeft: "max(1.5rem, calc((100vw - 1280px) / 2 + 3rem))" }}
          >
            <div className="max-w-[500px]">
              <Reveal>
                <span className="eyebrow">Capability library</span>
                <h2 className="section-h2 mt-4">
                  16 capabilities.
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
                    One platform.
                  </span>
                </h2>
                <p className="mt-5 font-inter text-[16px] md:text-[17px] text-slate-600 leading-[1.6] max-w-md">
                  No add-on invoices. Scroll to explore — availability by tier on /pricing.
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <div className="flex-1 max-w-[220px] h-1 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      ref={progressRef}
                      className="h-full bg-gradient-to-r from-blue-500 to-pink-500 transition-[width] duration-75"
                      style={{ width: "6%" }}
                    />
                  </div>
                  <span
                    ref={progressLabelRef}
                    className="text-[12px] font-mono text-slate-500 tabular-nums"
                  >
                    01 / 16
                  </span>
                </div>

                <a
                  href="#"
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold text-[14px] hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 group"
                >
                  See every capability by plan
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </a>
              </Reveal>
            </div>
          </div>

          <div className="relative overflow-x-auto lg:overflow-hidden min-w-0 snap-x snap-mandatory lg:snap-none">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-28 md:w-40 z-10 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/90 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#f8fafc] to-transparent" />

            <div
              ref={trackRef}
              className="flex gap-5 will-change-transform py-8 pl-[calc((100vw-260px)/2)] pr-[calc((100vw-260px)/2)] lg:pl-44 lg:pr-24"
              style={{ transform: "translate3d(0,0,0)" }}
            >
              {CAPS.map((cap) => (
                <article
                  key={cap.num}
                  className={`shrink-0 snap-center lg:snap-none w-[260px] md:w-[280px] lg:w-[300px] h-[380px] md:h-[400px] lg:h-[420px] rounded-3xl overflow-hidden relative group ${
                    cap.featured
                      ? "bg-gradient-to-br from-blue-500 via-violet-500 to-pink-500 text-white shadow-[0_20px_60px_-20px_rgba(139,92,246,0.55)]"
                      : "bg-white border border-slate-200/70 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.12)]"
                  }`}
                >
                  <div className="p-6 md:p-7 h-full flex flex-col">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-outfit text-[11px] font-bold tracking-[0.18em] ${
                          cap.featured ? "text-white/80" : "text-slate-400"
                        }`}
                      >
                        {cap.num}
                        {cap.featured && " · FEATURED"}
                      </span>
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          cap.featured ? "text-white/70" : "text-slate-400"
                        }`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {cap.icon}
                      </span>
                    </div>

                    <div className="mt-4">
                      <Viz kind={cap.viz} featured={cap.featured} />
                    </div>

                    <h4
                      className={`mt-auto font-outfit font-bold text-[22px] md:text-[24px] leading-tight tracking-tight ${
                        cap.featured ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {cap.title}
                    </h4>
                    <p
                      className={`mt-3 font-inter text-[13.5px] leading-[1.6] ${
                        cap.featured ? "text-white/85" : "text-slate-600"
                      }`}
                    >
                      {cap.body}
                    </p>

                    <div
                      className={`mt-5 inline-flex items-center gap-1 text-[12px] font-semibold ${
                        cap.featured ? "text-white" : "text-slate-700 group-hover:text-blue-600"
                      } transition-colors`}
                    >
                      Learn more
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 07 — MeetZia                                                     */
/* ---------------------------------------------------------------- */

const ZIA_ROBOT_SCENE_URL =
  "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const ZIA_BULLETS = [
  "Answers on the first ring, in the caller's language",
  "Books meetings, qualifies leads, warm-transfers with full context",
  "Writes the transcript, summary, and CRM task as the call ends",
];

function MeetZia() {
  return (
    <section className="relative py-20 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-x-4 md:inset-x-8 top-8 bottom-8 rounded-[2.5rem] overflow-hidden -z-10 bg-[#1a1330] shadow-[0_30px_80px_-30px_rgba(88,28,135,0.45)]">
        <div
          className="absolute inset-0 opacity-95"
          style={{
            background:
              "radial-gradient(ellipse 700px 420px at 82% 12%, rgba(167,139,250,0.45), transparent 60%), radial-gradient(ellipse 640px 420px at 12% 92%, rgba(244,114,182,0.35), transparent 60%), radial-gradient(ellipse 900px 520px at 50% 50%, rgba(59,130,246,0.22), transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div
          className="hidden lg:block absolute pointer-events-auto"
          style={{ right: "600px", bottom: "-250px", width: "320px", height: "500px" }}
        >
          <InteractiveRobotSpline scene={ZIA_ROBOT_SCENE_URL} className="w-full h-full" />
        </div>
      </div>

      <div className="relative max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-violet-400 animate-ping opacity-75" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-violet-400" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/80">
                AI spotlight
              </span>
            </div>

            <h2 className="section-h2-dark mt-5">
              Meet{" "}
              <span className="bg-gradient-to-r from-pink-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                Zia
              </span>
              {" "}— the AI receptionist that picks up when your team can&apos;t.
            </h2>

            <p className="mt-5 font-inter text-[16px] md:text-[17px] text-white/70 leading-[1.6]">
              Zia is MyCountryMobile&apos;s AI receptionist. She answers every call in parallel, qualifies the lead, books the meeting, and writes the CRM task — while your team keeps working.
            </p>

            <div className="mt-8 rounded-2xl p-5 bg-white/[0.04] border border-white/10 backdrop-blur-xl border-l-[3px] border-l-violet-400/70">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-violet-300 text-[18px]">schedule</span>
                <span className="font-inter font-semibold text-[11px] text-violet-300 tracking-[0.14em]">
                  SCENARIO · 9 AM TUESDAY
                </span>
              </div>
              <p className="font-inter text-[14.5px] text-white/75 leading-[1.7]">
                Every line is busy. A customer calls. Zia picks up on the first ring, asks the right questions, checks the calendar, and schedules. Your agent finds the task already in their queue.
              </p>
            </div>

            <ul className="mt-8 space-y-4">
              {ZIA_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-violet-500 shrink-0 flex items-center justify-center mt-0.5 shadow-lg shadow-violet-900/40">
                    <span
                      className="material-symbols-outlined text-white text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check
                    </span>
                  </span>
                  <span className="font-inter text-[15.5px] text-white/80 leading-[1.6]">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="relative flex justify-center lg:justify-end items-center min-h-[560px]">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 via-pink-500/20 to-blue-500/30 blur-[90px] pointer-events-none -z-0" />

            <AIChatCard className="w-full max-w-[460px] h-[560px]" />

            <div className="absolute -top-4 left-2 lg:-top-5 lg:-left-4 z-20 rounded-2xl px-4 py-2.5 bg-white/[0.1] border border-white/20 backdrop-blur-xl shadow-xl float-slow">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌐</span>
                <div>
                  <p className="font-outfit font-bold text-white text-[12px] leading-tight">
                    34 languages
                  </p>
                  <p className="font-inter text-[10px] text-white/60">Auto-detected</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 08 — HowItWorks                                                  */
/* ---------------------------------------------------------------- */

const HIW_STEPS: Array<{
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  color: string;
  Icon: LucideIcon;
  featureIcons: LucideIcon[];
  ctaLabel: string;
}> = [
  {
    title: "Sign up",
    subtitle: "Five-minute signup. Every plan unlocked.",
    description:
      "Create your account and get immediate access to every feature. No card required, no tier-gating at trial.",
    features: ["Account ready in 5 minutes", "All features unlocked", "No credit card", "Cancel anytime"],
    featureIcons: [Timer, Unlock, CreditCard, XCircle],
    Icon: UserPlus,
    color: "#3b82f6",
    ctaLabel: "Create account",
  },
  {
    title: "Invite your team & pick a number",
    subtitle: "Bulk invite. Numbers live instantly.",
    description:
      "Add teammates in bulk, provision local or toll-free numbers in 100+ countries, and build your IVR with drag-and-drop — no IT ticket.",
    features: ["Bulk team invites", "Numbers in 100+ countries", "Drag-and-drop IVR", "Same-second provisioning"],
    featureIcons: [Mail, Globe, LayoutTemplate, Rocket],
    Icon: Users,
    color: "#a855f7",
    ctaLabel: "Invite & pick",
  },
  {
    title: "Take your first call",
    subtitle: "Desktop, mobile, web. Zia covers overflow.",
    description:
      "Log in on any device, start taking calls, and let Zia answer anything your team can't. Analytics start flowing from the very first ring.",
    features: ["iOS · Android · macOS · Windows", "AI overflow (Zia)", "Live analytics", "First call in minutes"],
    featureIcons: [Smartphone, Sparkles, BarChart3, Clock],
    Icon: PhoneCall,
    color: "#ec4899",
    ctaLabel: "Go live",
  },
];

function HowItWorks() {
  return (
    <section className="relative py-24 px-6 md:px-12 section-bg-grid">
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="max-w-3xl mb-16">
          <span className="eyebrow">How it works</span>
          <h2 className="section-h2 mt-4">From signup to first call in three steps.</h2>
          <p className="section-sub mt-4">
            Median setup time: under 4 minutes. Hover each step to see what&apos;s inside.
          </p>
        </Reveal>

        <Reveal className="flex flex-wrap justify-center lg:justify-between items-center gap-8 lg:gap-6">
          {HIW_STEPS.map((s, i) => (
            <div key={s.title} className="flex items-center gap-4 lg:gap-6">
              <div className="relative w-[300px] shrink-0">
                <span className="absolute -top-3 -left-3 z-20 w-9 h-9 rounded-full bg-slate-900 text-white font-outfit font-bold text-[14px] flex items-center justify-center shadow-lg">
                  {i + 1}
                </span>
                <CardFlip
                  title={s.title}
                  subtitle={s.subtitle}
                  description={s.description}
                  features={s.features}
                  color={s.color}
                  Icon={s.Icon}
                  featureIcons={s.featureIcons}
                  ctaLabel={s.ctaLabel}
                />
              </div>
              {i < HIW_STEPS.length - 1 && (
                <span className="material-symbols-outlined hidden lg:block text-slate-400 text-[28px]">
                  arrow_forward
                </span>
              )}
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold text-[14px] hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 group"
          >
            Start Free Trial
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 09 — Integrations                                                */
/* ---------------------------------------------------------------- */

function Integrations() {
  return <IntegrationHero />;
}

/* ---------------------------------------------------------------- */
/* 10 — Testimonials                                                */
/* ---------------------------------------------------------------- */

const TESTIMONIAL_RESULTS = [
  { stat: "+24%", brand: "Finley", metric: "First Contact Resolution" },
  { stat: "11 hrs", brand: "NorthPeak", metric: "Per week returned to sales" },
  { stat: "−38%", brand: "Cedarwood", metric: "Average Handle Time" },
];

function Testimonials() {
  return (
    <section className="relative py-24 section-bg-soft-blue overflow-hidden">
      <SlidingTestimonial />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mt-14">
        <Reveal className="rounded-3xl p-6 md:p-8 bg-white border border-slate-200/70 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.12)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            {TESTIMONIAL_RESULTS.map((r, i) => (
              <div
                key={r.brand}
                className={`flex items-center justify-center md:justify-start gap-3 ${
                  i > 0 ? "md:border-l md:border-slate-200 md:pl-6" : ""
                }`}
              >
                <span className="font-outfit font-bold text-[32px] bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
                  {r.stat}
                </span>
                <div>
                  <p className="font-outfit font-semibold text-slate-900 text-[14px]">{r.brand}</p>
                  <p className="font-inter text-[12px] text-slate-500">{r.metric}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 font-inter font-semibold text-slate-900 hover:text-blue-600 transition-colors group"
          >
            Read 1,000+ verified reviews
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 11 — FAQ                                                         */
/* ---------------------------------------------------------------- */

const FAQS = [
  {
    q: "What is MyCountryMobile's cloud contact center platform?",
    a: "Cloud phone and AI contact center in one product. Calls, chat, SMS, video, analytics, and an AI receptionist — in one place.",
    open: true,
  },
  { q: "Do you offer a free trial?", a: "Yes — 14 days, full platform, no feature limits." },
  {
    q: "How fast can we go live?",
    a: "Same session. If you're porting existing numbers, that runs in the background for 5–10 business days — we provision temporary MCM numbers so your team is live today.",
  },
  { q: "Does the AI cost extra?", a: "No. Included on every plan." },
  {
    q: "Is it secure enough for regulated industries?",
    a: "Yes. Full compliance stack — see /security for the certificate list.",
  },
];

function FAQ() {
  return (
    <section className="relative py-24 px-6 md:px-12 bg-white">
      <div className="max-w-[900px] mx-auto">
        <Reveal className="mb-14 text-center">
          <span className="eyebrow">FAQ</span>
          <h2 className="section-h2 mt-4">The questions teams ask on the first call.</h2>
        </Reveal>

        <div className="space-y-4">
          {FAQS.map((item) => (
            <Reveal key={item.q}>
              <details className="faq-item glass-panel rounded-2xl group" name="faq" open={item.open}>
                <summary className="flex items-center justify-between gap-4 p-6 md:p-7">
                  <span className="font-outfit font-semibold text-slate-900 text-[17px] md:text-[18px] leading-snug">
                    {item.q}
                  </span>
                  <span className="faq-chev flex-shrink-0 w-8 h-8 rounded-full glass-soft flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-600 text-[20px]">expand_more</span>
                  </span>
                </summary>
                <div className="px-6 md:px-7 pb-6 md:pb-7 pt-0">
                  <p className="font-inter text-[15px] text-slate-700 leading-[1.7]">{item.a}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 12 — ClosingCTA                                                  */
/* ---------------------------------------------------------------- */

function ClosingCTA() {
  return (
    <section className="relative py-24 px-6 md:px-12 section-bg-mesh-soft">
      <div className="max-w-[1100px] mx-auto">
        <Reveal className="glass-panel rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-300/40 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-300/40 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="section-h2 max-w-3xl mx-auto">
              Try the platform.{" "}
              <span className="gradient-text-active">Be on a call by lunch.</span>
            </h2>
            <p className="mt-6 font-inter text-[18px] md:text-[20px] text-slate-600 leading-[1.5] max-w-2xl mx-auto">
              Same product, same support, same security — no matter which plan you pick.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-[#A5F3FC] to-[#8B5CF6] text-white font-outfit font-semibold text-lg rounded-full shadow-[0_12px_24px_-8px_rgba(139,92,246,0.4)] hover:shadow-[0_16px_32px_-8px_rgba(139,92,246,0.5)] hover:-translate-y-1 transition-all active:scale-95">
                Start Free Trial
              </button>
              <button className="px-8 py-4 glass-panel text-slate-900 font-outfit font-semibold text-lg rounded-full hover:bg-white/80 transition-all">
                Book a Demo
              </button>
              <a
                className="ml-2 font-inter font-medium text-slate-900 hover:underline flex items-center gap-1 group"
                href="#"
              >
                View Pricing
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
            </div>
            <p className="mt-6 font-inter text-[14px] text-slate-500">Port numbers free.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 13 — Footer                                                      */
/* ---------------------------------------------------------------- */

const FOOTER_PRODUCT = [
  "Cloud Phone System",
  "AI Contact Center Software",
  "AI Receptionist (Zia)",
  "Multi-Channel Messaging",
  "HD Video",
  "Workforce Management",
  "Smart Call Routing",
];
const FOOTER_SOLUTIONS = ["Retail", "Healthcare", "Financial Services", "Real Estate", "Legal", "Logistics"];
const FOOTER_RESOURCES = ["Docs", "API", "Status", "Changelog", "Blog"];
const FOOTER_COMPANY = ["About", "Customers", "Careers", "Press", "Contact"];
const FOOTER_LEGAL = ["Security", "Privacy", "Terms", "SLA", "HIPAA", "GDPR"];

function FooterLinkList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-outfit font-bold text-white text-[14px] mb-4 tracking-wide">{title}</h4>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item}>
            <a href="#" className="font-inter text-[14px] text-white/60 hover:text-white transition-colors">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative w-full rounded-t-[40px] bg-[#05070f] text-white overflow-hidden mt-8">
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 800px 400px at 80% 0%, rgba(139,92,246,0.18), transparent 60%), radial-gradient(ellipse 700px 400px at 10% 100%, rgba(236,72,153,0.14), transparent 60%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-8 pt-16 pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-violet-400 mb-2 font-outfit">
              MyCountryMobile
            </div>
            <p className="font-inter text-[15px] text-white/60">
              MyCountryMobile — cloud phone and AI contact center.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 py-12">
          <FooterLinkList title="Product" items={FOOTER_PRODUCT} />
          <FooterLinkList title="Solutions" items={FOOTER_SOLUTIONS} />
          <FooterLinkList title="Resources" items={FOOTER_RESOURCES} />
          <FooterLinkList title="Company" items={FOOTER_COMPANY} />
          <FooterLinkList title="Trust & Legal" items={FOOTER_LEGAL} />
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-[12px] text-white/40">© 2026 MyCountryMobile.</p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="LinkedIn"
            >
              <span className="material-symbols-outlined text-[18px]">link</span>
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="X"
            >
              <span className="material-symbols-outlined text-[18px]">alternate_email</span>
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="YouTube"
            >
              <span className="material-symbols-outlined text-[18px]">play_circle</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------- */
/* Default export — full page                                       */
/* ---------------------------------------------------------------- */

export default function MCMHomepage() {
  return (
    <>
      <Header />
      <Hero />
      <TrustBar />
      <PlatformOverview />
      <CoreFive />
      <Capabilities />
      <MeetZia />
      <HowItWorks />
      <Integrations />
      <Testimonials />
      <FAQ />
      <ClosingCTA />
      <Footer />
    </>
  );
}
