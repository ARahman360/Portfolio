"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { MousePointer2 } from "lucide-react";
import { profile } from "@/data/portfolio";
import { careerSummary } from "@/data/career";

/* Decorative barcode bars — deterministic so server and client render alike. */
const BAR_WIDTHS = [2, 1, 3, 1, 2, 4, 1, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 2, 4, 1] as const;

/**
 * Hero visual: a lanyard ID badge that hangs from a strap and sways gently
 * (Lightswind template signature). It also tilts toward the cursor.
 * Shows /public/profile.jpg when it exists, otherwise a gradient monogram.
 */
export default function ProfileVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [photoOk, setPhotoOk] = useState(true);
  const [photoLoaded, setPhotoLoaded] = useState(false);

  /* Tilt the badge toward the pointer (mouse only — touch stays static) */
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;

    const rect = wrap.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1200px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = "";
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="badge-sway w-full max-w-[23.5rem]"
    >
      {/* Lanyard strap + clip */}
      <div className="mx-auto flex w-full max-w-[13rem] flex-col items-center" aria-hidden="true">
        <span className="h-16 w-2.5 rounded-t-full bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-500 dark:from-zinc-600 dark:via-zinc-700 dark:to-zinc-800" />
        <span className="h-6 w-9 rounded-[5px] border border-zinc-400/70 bg-gradient-to-b from-zinc-200 to-zinc-300 shadow-sm dark:border-zinc-500/70 dark:from-zinc-600 dark:to-zinc-800">
          <span className="mx-auto mt-1.5 block h-1 w-3.5 rounded-full bg-zinc-400/80 dark:bg-zinc-500" />
        </span>
      </div>

      {/* Badge */}
      <div
        ref={cardRef}
        className="relative -mt-1.5 w-full rounded-[1.5rem] border border-line bg-card shadow-[0_30px_70px_-30px_rgb(0_0_0/0.55)] transition-transform duration-200 ease-out will-change-transform"
      >
        {/* Gradient header — rounded top only, NO overflow-hidden here so the
            portrait below can hang outside the header. */}
        <div className="relative h-28 rounded-t-[1.5rem] bg-gradient-to-br from-violet-600 via-violet-500 to-sky-400">
          <div className="dot-grid absolute inset-0 rounded-t-[1.5rem] opacity-25" aria-hidden="true" />
          <div
            className="absolute inset-0 rounded-t-[1.5rem] bg-[radial-gradient(130%_90%_at_50%_-25%,rgb(255_255_255/0.6),transparent_62%)]"
            aria-hidden="true"
          />
        </div>

        {/* Circular portrait — centred on the header's bottom edge.
            Positioned from the top (not -bottom-*) so it stays anchored to
            the h-36 header instead of the card's own bottom edge. */}
        <div className="absolute inset-x-0 top-[4.25rem] flex justify-center">
          <div className="relative size-[6.5rem] rounded-full bg-gradient-to-br from-violet-400 via-sky-300 to-emerald-300 p-[3px] shadow-xl">
            <div className="relative size-full overflow-hidden rounded-full bg-card">
              {/* Monogram fallback — visible until a real portrait loads */}
              <span className="absolute inset-0 grid place-items-center text-2xl font-extrabold tracking-tight text-ink">
                {profile.monogram}
              </span>

              {photoOk && (
                <Image
                  src="/profile.jpg"
                  alt="Portrait of Md Abdur Rahman"
                  fill
                  sizes="104px"
                  className={`object-cover object-top transition-opacity duration-500 ${
                    photoLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onError={() => setPhotoOk(false)}
                  onLoad={() => setPhotoLoaded(true)}
                />
              )}

              {/* Online status dot */}
              <span className="absolute right-0.5 bottom-0.5 size-3.5 rounded-full border-2 border-card bg-success" />
            </div>
          </div>
        </div>

        {/* Identity block */}
        {/* pt clears the portrait that hangs over the header edge
            (header is h-28 = 7rem; portrait ends ~10.75rem down) */}
        <div className="px-5 pt-[4.75rem] pb-4 text-center">
          <h2 className="relative inline-block text-[1.0625rem] font-extrabold tracking-tight">
            {profile.name}
            {/* Hand-drawn style underline (template detail) */}
            <svg
              aria-hidden="true"
              viewBox="0 0 220 12"
              preserveAspectRatio="none"
              className="absolute -bottom-1.5 left-0 h-2.5 w-full text-primary/80"
            >
              <path
                d="M2 8C22 2 40 2 62 5s42 4 64 1 40-7 92-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <sup className="ml-0.5 align-super text-[9px] font-bold text-ink-faint">®</sup>
          </h2>

          <p className="mx-auto mt-2.5 inline-block rounded-full border border-line-strong bg-bg-soft px-3 py-0.5 text-[10px] font-semibold text-ink">
            {profile.headline}
          </p>

          <div className="mt-3.5 border-t border-line pt-3.5">
            {/* Meta grid */}
            <dl className="grid grid-cols-2 gap-x-3 gap-y-2.5 rounded-xl border border-line bg-bg-soft/60 p-3 text-left">
              <div>
                <dt className="font-mono text-[8px] tracking-[0.18em] text-ink-faint uppercase">
                  Specialty
                </dt>
                <dd className="mt-0.5 text-[12px] leading-snug font-bold">{profile.specialty}</dd>
              </div>
              <div>
                <dt className="font-mono text-[8px] tracking-[0.18em] text-ink-faint uppercase">
                  Location
                </dt>
                <dd className="mt-0.5 text-[12px] leading-snug font-bold">{profile.location}</dd>
              </div>
              <div>
                <dt className="font-mono text-[8px] tracking-[0.18em] text-ink-faint uppercase">
                  Focus
                </dt>
                <dd className="mt-0.5 text-[12px] leading-snug font-bold">{careerSummary}</dd>
              </div>
              <div>
                <dt className="font-mono text-[8px] tracking-[0.18em] text-ink-faint uppercase">
                  Status
                </dt>
                <dd className="mt-0.5 flex items-center gap-1.5 text-[12px] leading-snug font-bold">
                  <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
                  Active
                </dd>
              </div>
            </dl>
          </div>

          {/* Barcode */}
          <div className="mt-3 rounded-lg border border-line bg-bg-soft px-3 py-2.5">
            <div className="flex h-8 items-end justify-center gap-[3px]" aria-hidden="true">
              {BAR_WIDTHS.map((width, index) => (
                <span
                  key={`${width}-${index}`}
                  className="block h-full rounded-[1px] bg-ink"
                  style={{ width: `${width}px`, opacity: index % 5 === 0 ? 0.5 : 0.85 }}
                />
              ))}
            </div>
          </div>

          {/* Badge serial row */}
          <div className="mt-2.5 flex items-center justify-between gap-3 font-mono text-[9px] tracking-[0.14em] uppercase">
            <span className="font-bold text-ink">{profile.badgeId}</span>
            <span className="text-ink-faint">Industrial IT</span>
          </div>

          {/* Interaction hint */}
          <p className="mt-3 flex items-center justify-center gap-1.5 font-mono text-[8px] tracking-[0.25em] text-ink-faint uppercase">
            <MousePointer2 size={10} aria-hidden="true" />
            Move the cursor over the card
          </p>
        </div>
      </div>
    </div>
  );
}
