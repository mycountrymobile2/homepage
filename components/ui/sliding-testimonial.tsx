"use client";

type Testimonial = {
  name: string;
  profession: string;
  description: string;
  avatar: string;
  company: string;
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: "Rachel Monroe",
    profession: "CX Manager · Finley Home Services",
    description:
      "The dashboard rewired how we run the floor. I spot a bottleneck mid-shift and coach the agent before it becomes a problem.",
    avatar:
      "https://i.pravatar.cc/80?img=47",
    company: "Finley",
  },
  {
    name: "Daniel Park",
    profession: "Head of Sales · NorthPeak Insurance",
    description:
      "HubSpot sync is the reason we stayed. Every call, note, and recording shows up on the contact — without anyone remembering to log it.",
    avatar: "https://i.pravatar.cc/80?img=12",
    company: "NorthPeak",
  },
  {
    name: "Miguel Castro",
    profession: "Ops Director · Cedarwood Legal",
    description:
      "The IVR builder took me an afternoon, not a project plan. Cut our average handle time 38% in 60 days.",
    avatar: "https://i.pravatar.cc/80?img=33",
    company: "Cedarwood",
  },
  {
    name: "Priya Nair",
    profession: "Support Lead · Vela Retail",
    description:
      "Zia covers every overflow call in Hindi and English. We stopped losing weekend leads overnight.",
    avatar: "https://i.pravatar.cc/80?img=26",
    company: "Vela",
  },
  {
    name: "Aisha Okafor",
    profession: "COO · Kairo Health",
    description:
      "Porting 40 numbers across three countries was the part I dreaded. It was done in a week, free.",
    avatar: "https://i.pravatar.cc/80?img=45",
    company: "Kairo",
  },
  {
    name: "Jonas Lindqvist",
    profession: "Head of RevOps · Lumen Digital",
    description:
      "Transcripts + sentiment scoring inside HubSpot deals turned every discovery call into searchable gold.",
    avatar: "https://i.pravatar.cc/80?img=59",
    company: "Lumen",
  },
];

export default function SlidingTestimonial({
  testimonials = DEFAULT_TESTIMONIALS,
}: {
  testimonials?: Testimonial[];
}) {
  const duplicated = [...testimonials, ...testimonials];

  return (
    <div className="w-full">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 mb-10 md:mb-12 text-center">
        <span className="eyebrow">Testimonials</span>
        <h2 className="section-h2 mt-4">
          What clients say{" "}
          <span className="bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
            after 90 days.
          </span>
        </h2>
        <p className="mt-4 max-w-2xl mx-auto font-inter text-[16px] md:text-[17px] text-slate-600 leading-[1.6]">
          Real teams, real numbers — from sales floors, CX desks, and support queues.
        </p>
      </div>

      <div
        className="x-slider-track relative flex overflow-x-auto md:overflow-hidden max-w-full shrink-0 snap-x snap-mandatory md:snap-none scroll-smooth"
        style={{
          maskImage:
            "linear-gradient(to left, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <div className="flex animate-x-slider gap-5 w-max py-4 px-[max(1rem,calc((100vw-380px)/2))] md:px-0">
          {duplicated.map((t, i) => (
            <article
              key={i}
              className="shrink-0 grow-0 snap-center md:snap-none w-[86vw] max-w-[380px] md:w-[460px] md:max-w-none lg:w-[560px] rounded-2xl bg-white border border-slate-200/70 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.12)] flex flex-col overflow-hidden"
            >
              <p className="px-5 py-5 md:px-6 md:py-6 text-pretty text-[15px] md:text-[22px] lg:text-[26px] font-light text-slate-900 leading-[1.4] md:leading-[1.35] tracking-tight">
                &ldquo;{t.description}&rdquo;
              </p>
              <div className="border-t border-slate-200/70 w-full flex items-center overflow-hidden">
                <div className="flex-1 flex gap-3 items-center px-5 py-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow"
                  />
                  <div className="flex flex-col gap-0 justify-center">
                    <h5 className="text-[14px] md:text-[15px] font-semibold text-slate-900">
                      {t.name}
                    </h5>
                    <p className="text-slate-500 text-[12px] md:text-[13px]">
                      {t.profession}
                    </p>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-200/80" />
                <div className="px-5 py-4 min-w-[120px] text-center">
                  <div className="font-outfit font-bold text-[18px] bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
                    {t.company}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
