"use client";

import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code2,
  Copy,
  Rocket,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  color?: string;
  /** Icon shown in the front spotlight and back header */
  Icon?: LucideIcon;
  /** Per-feature icons on the back (cycles if shorter than features) */
  featureIcons?: LucideIcon[];
  /** Label on the bottom action pill */
  ctaLabel?: string;
}

export default function CardFlip({
  title = "Build MVPs Fast",
  subtitle = "Launch your idea in record time",
  description = "Copy, paste, customize—and launch your MVP faster than ever with our developer-first component library.",
  features = [
    "Copy & Paste Ready",
    "Developer-First",
    "MVP Optimized",
    "Zero Setup Required",
  ],
  color = "#ec4899",
  Icon = Rocket,
  featureIcons,
  ctaLabel = "Start Building",
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const fallbackIcons: LucideIcon[] = [Copy, Code2, Rocket, Zap];
  const icons =
    featureIcons && featureIcons.length > 0 ? featureIcons : fallbackIcons;

  return (
    <div
      style={{
        ["--primary" as any]: color ?? "#2563eb",
      }}
      className="group relative h-[360px] w-full max-w-[300px] [perspective:2000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          "relative h-full w-full",
          "[transform-style:preserve-3d]",
          "transition-all duration-700",
          isFlipped
            ? "[transform:rotateY(180deg)]"
            : "[transform:rotateY(0deg)]"
        )}
      >
        {/* Front of card */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[transform:rotateY(0deg)] [backface-visibility:hidden]",
            "overflow-hidden rounded-2xl",
            "bg-gradient-to-br from-white via-slate-50 to-slate-100",
            "border border-slate-200",
            "shadow-lg",
            "transition-all duration-700",
            "group-hover:shadow-xl",
            "group-hover:border-[color:var(--primary)]/30",
            isFlipped ? "opacity-0" : "opacity-100"
          )}
        >
          <div
            className="absolute inset-0 bg-gradient-to-br via-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, color-mix(in srgb, var(--primary) 6%, transparent), transparent, rgba(59,130,246,0.05))",
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center pt-20">
            <div className="relative flex h-[100px] w-[200px] flex-col items-center justify-center gap-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-3 w-full rounded-sm",
                    "animate-[flipcard-slide_2s_ease-in-out_infinite]",
                    "opacity-0"
                  )}
                  style={{
                    width: `${60 + ((i * 17) % 40)}%`,
                    animationDelay: `${i * 0.2}s`,
                    marginLeft: `${(i * 13) % 20}%`,
                    background:
                      "linear-gradient(to right, color-mix(in srgb, var(--primary) 20%, transparent), color-mix(in srgb, var(--primary) 30%, transparent), color-mix(in srgb, var(--primary) 20%, transparent))",
                  }}
                />
              ))}

              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={cn(
                    "h-12 w-12 rounded-xl",
                    "flex items-center justify-center",
                    "shadow-lg",
                    "animate-pulse",
                    "transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                  )}
                  style={{
                    background:
                      "linear-gradient(to bottom right, var(--primary), color-mix(in srgb, var(--primary) 90%, transparent), color-mix(in srgb, var(--primary) 80%, transparent))",
                    boxShadow:
                      "0 10px 24px -8px color-mix(in srgb, var(--primary) 40%, transparent)",
                  }}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 left-0 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <h3 className="text-lg leading-snug font-semibold tracking-tight text-zinc-900 transition-all duration-500 ease-out group-hover:translate-y-[-4px]">
                  {title}
                </h3>
                <p className="line-clamp-2 text-sm tracking-tight text-zinc-600 transition-all delay-[50ms] duration-500 ease-out group-hover:translate-y-[-4px]">
                  {subtitle}
                </p>
              </div>
              <Zap
                className="relative z-10 h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                style={{ color: "var(--primary)" }}
              />
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[transform:rotateY(180deg)] [backface-visibility:hidden]",
            "rounded-2xl p-5",
            "bg-gradient-to-br from-white via-slate-50 to-slate-100",
            "border border-slate-200",
            "shadow-lg",
            "flex flex-col",
            "transition-all duration-700",
            "group-hover:shadow-xl",
            "group-hover:border-[color:var(--primary)]/30",
            !isFlipped ? "opacity-0" : "opacity-100"
          )}
        >
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, color-mix(in srgb, var(--primary) 6%, transparent), transparent, rgba(59,130,246,0.05))",
            }}
          />

          <div className="relative z-10 flex-1 space-y-5">
            <div className="space-y-2">
              <div className="mb-2 flex items-center gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{
                    background:
                      "linear-gradient(to bottom right, var(--primary), color-mix(in srgb, var(--primary) 90%, transparent), color-mix(in srgb, var(--primary) 80%, transparent))",
                  }}
                >
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg leading-snug font-semibold tracking-tight text-zinc-900">
                  {title}
                </h3>
              </div>
              <p className="line-clamp-2 text-sm tracking-tight text-zinc-600">
                {description}
              </p>
            </div>

            <div className="space-y-2.5">
              {features.map((feature, index) => {
                const IconComponent = icons[index % icons.length];

                return (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-zinc-700 transition-all duration-500"
                    style={{
                      transform: isFlipped
                        ? "translateX(0)"
                        : "translateX(-10px)",
                      opacity: isFlipped ? 1 : 0,
                      transitionDelay: `${index * 100 + 200}ms`,
                    }}
                  >
                    <div
                      className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--primary) 12%, transparent)",
                      }}
                    >
                      <IconComponent
                        className="h-3 w-3"
                        style={{ color: "var(--primary)" }}
                      />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mt-auto border-t border-slate-200 pt-4">
            <div
              className={cn(
                "group/start relative",
                "flex items-center justify-between",
                "rounded-lg p-2.5",
                "transition-all duration-300",
                "bg-gradient-to-r from-slate-100 via-slate-100 to-slate-100",
                "hover:scale-[1.02] hover:cursor-pointer",
                "border border-transparent"
              )}
            >
              <span
                className="text-sm font-semibold text-zinc-900 transition-colors duration-300 group-hover/start:text-[color:var(--primary)]"
              >
                {ctaLabel}
              </span>
              <ArrowRight
                className="relative z-10 h-4 w-4 transition-all duration-300 group-hover/start:translate-x-1 group-hover/start:scale-110"
                style={{ color: "var(--primary)" }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes flipcard-slide {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          50% {
            transform: translateX(0);
            opacity: 0.8;
          }
          100% {
            transform: translateX(100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
