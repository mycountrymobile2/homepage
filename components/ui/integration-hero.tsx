"use client";

import { Button } from "@/components/ui/button";
import React from "react";

// Row 1 — CRM & Helpdesk
const ICONS_ROW1 = [
  { name: "HubSpot", src: "https://cdn.simpleicons.org/hubspot/ff7a59" },
  { name: "Salesforce", src: "/logos/salesforce.png" },
  { name: "Zoho", src: "https://cdn.simpleicons.org/zoho/C8202C" },
  { name: "Pipedrive", src: "/logos/pipedrive.png" },
  { name: "Zendesk", src: "https://cdn.simpleicons.org/zendesk/03363D" },
  { name: "Freshdesk", src: "/logos/freshdesk.png" },
];

// Row 2 — Channels & Contacts
const ICONS_ROW2 = [
  { name: "WhatsApp Business", src: "https://cdn.simpleicons.org/whatsapp/25D366" },
  { name: "Instagram", src: "https://cdn.simpleicons.org/instagram/E4405F" },
  { name: "Messenger", src: "https://cdn.simpleicons.org/messenger/0084FF" },
  { name: "X (Twitter)", src: "https://cdn.simpleicons.org/x/000000" },
];

type Icon = { name: string; src: string };
const repeatedIcons = (icons: Icon[], repeat = 4): Icon[] =>
  Array.from({ length: repeat }).flatMap(() => icons);

export default function IntegrationHero() {
  return (
    <section className="relative py-24 md:py-28 overflow-hidden bg-white">
      {/* Dot grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative max-w-[1280px] mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-[12px] font-semibold rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm">
          ⚡ Integrations
        </span>
        <h2 className="section-h2">
          Integrate with the{" "}
          <span className="bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
            tools you already use
          </span>
        </h2>
        <p className="mt-5 font-inter text-[17px] md:text-[18px] text-slate-600 max-w-xl mx-auto leading-[1.6]">
          300+ native integrations — CRM, helpdesk, messaging, ticketing. No Zapier in the middle.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button className="h-11 px-6 rounded-full bg-slate-900 text-white hover:bg-slate-800">
            Browse all integrations
          </Button>
          <Button
            variant="outline"
            className="h-11 px-6 rounded-full border-slate-200 bg-white hover:bg-slate-50"
          >
            REST API docs
          </Button>
        </div>

        {/* Carousel */}
        <div className="mt-14 overflow-hidden relative pb-2">
          {/* Row 1 — CRM & Helpdesk */}
          <div className="flex gap-8 whitespace-nowrap animate-integ-scroll-left">
            {repeatedIcons(ICONS_ROW1, 4).map((icon, i) => (
              <div
                key={i}
                className="h-16 w-16 flex-shrink-0 rounded-2xl bg-white border border-slate-200/70 shadow-[0_6px_20px_-8px_rgba(15,23,42,0.12)] flex items-center justify-center"
                title={icon.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={icon.src}
                  alt={icon.name}
                  className="h-9 w-9 object-contain"
                />
              </div>
            ))}
          </div>

          {/* Row 2 — Channels & Contacts */}
          <div className="flex gap-8 whitespace-nowrap mt-6 animate-integ-scroll-right">
            {repeatedIcons(ICONS_ROW2, 6).map((icon, i) => (
              <div
                key={i}
                className="h-16 w-16 flex-shrink-0 rounded-2xl bg-white border border-slate-200/70 shadow-[0_6px_20px_-8px_rgba(15,23,42,0.12)] flex items-center justify-center"
                title={icon.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={icon.src}
                  alt={icon.name}
                  className="h-9 w-9 object-contain"
                />
              </div>
            ))}
          </div>

          {/* Fade overlays */}
          <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>

      <style jsx>{`
        @keyframes integ-scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes integ-scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-integ-scroll-left {
          animation: integ-scroll-left 30s linear infinite;
        }
        .animate-integ-scroll-right {
          animation: integ-scroll-right 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
