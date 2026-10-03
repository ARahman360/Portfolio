"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { profile } from "@/data/portfolio";

/* Decorative barcode bars — deterministic so server and client render alike.
   Purely graphic: it encodes nothing and carries no number or ID. */
const BAR_WIDTHS = [2, 1, 3, 1, 2, 4, 1, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 2, 4, 1] as const;

/**
 * Hero visual: a lanyard ID badge that hangs from a strap and sways gently
 * (Lightswind template signature). It also tilts toward the cursor.
 * Shows /public/profile.png when it exists, otherwise a gradient monogram.
 *
 * The card states who the person is and what they are studying. It carries no
 * student number, employee number, graduation year or certification — those
 * would be invented, so they are deliberately absent.
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
        className="badge-card relative -mt-1.5 w-full rounded-[1.5rem] border border-line bg-card shadow-[0_30px_70px_-30px_rgb(0_0_0/0.55)] transition-transform duration-200 ease-out will-change-transform"
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

        {/* Circular portrait — hangs over the gradient header's bottom edge.
            Diameter and vertical offset both come from --badge-portrait in
            globals.css, so they scale together across breakpoints. */}
        <div className="badge-portrait-wrap absolute inset-x-0 flex justify-center">
          <div className="badge-portrait badge-portrait-ring relative rounded-full p-[3.5px]">
            <div className="relative size-full overflow-hidden rounded-full bg-card">
              {/* Monogram fallback — used whenever no portrait is present */}
              <span className="absolute inset-0 grid place-items-center text-2xl font-extrabold tracking-tight text-ink">
                {profile.monogram}
              </span>

              {photoOk && (
                <Image
                  src="/profile.png"
                  alt={profile.name}
                  fill
                  sizes="(min-width: 1024px) 152px, (min-width: 640px) 136px, 116px"
                  className={`object-cover object-top transition-opacity duration-500 ${
                    photoLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onError={() => setPhotoOk(false)}
                  onLoad={() => setPhotoLoaded(true)}
                />
              )}

              {/* Avatar affordance dot */}
              <span className="absolute right-0.5 bottom-0.5 size-3.5 rounded-full border-2 border-card bg-success" />
            </div>
          </div>
        </div>

        {/* Identity block */}
        {/* pt is derived from --badge-portrait in CSS so the larger
            portrait can never overlap the name. */}
        <div className="badge-identity px-5 pb-4 text-center">
          <h2 className="relative inline-block text-[1.35rem] font-extrabold tracking-tight">
            {/* Animated gradient text (CSS-driven, theme-aware, reduced-motion safe) */}
            <span className="badge-name">{profile.name}</span>
            <span className="badge-underline" aria-hidden="true" />
          </h2>

          {/* Student title — the pill carries the status of being a student */}
          <p className="mx-auto mt-2.5 inline-block rounded-full border border-line-strong bg-bg-soft px-3 py-0.5 text-[10px] font-semibold text-ink">
            {profile.headline}
          </p>

          {/* University — secondary, quieter than the name */}
          <p className="mx-auto mt-2 max-w-[17rem] text-[11px] leading-snug text-ink-dim">
            {profile.university}
          </p>

          <div className="mt-3.5 border-t border-line pt-3.5">
            {/* Meta grid */}
            <dl className="grid grid-cols-2 gap-x-3 gap-y-2.5 rounded-xl border border-line bg-bg-soft/60 p-3 text-left">
              <div className="min-w-0">
                <dt className="font-mono text-[8px] tracking-[0.18em] text-ink-faint uppercase">
                  Specialty
                </dt>
                <dd className="mt-0.5 text-[12px] leading-snug font-bold">{profile.specialty}</dd>
              </div>
              <div className="min-w-0">
                <dt className="font-mono text-[8px] tracking-[0.18em] text-ink-faint uppercase">
                  Location
                </dt>
                <dd className="mt-0.5 text-[12px] leading-snug font-bold">{profile.location}</dd>
              </div>
              <div className="col-span-2 min-w-0">
                <dt className="font-mono text-[8px] tracking-[0.18em] text-ink-faint uppercase">
                  Current Focus
                </dt>
                <dd className="mt-0.5 text-[12px] leading-snug font-bold">{profile.currentFocus}</dd>
              </div>
              <div className="col-span-2 min-w-0">
                <dt className="font-mono text-[8px] tracking-[0.18em] text-ink-faint uppercase">
                  Status
                </dt>
                <dd className="mt-0.5 flex items-center gap-1.5 text-[12px] leading-snug font-bold">
                  <span className="size-1.5 shrink-0 rounded-full bg-success" aria-hidden="true" />
                  {profile.availability}
                </dd>
              </div>
            </dl>
          </div>

          {/* Decorative barcode — graphic texture only, encodes nothing */}
          <div className="mt-3.5 px-1" aria-hidden="true">
            <div className="flex h-7 items-end justify-center gap-[3px] opacity-40">
              {BAR_WIDTHS.map((width, index) => (
                <span
                  key={`${width}-${index}`}
                  className="block h-full rounded-[1px] bg-ink"
                  style={{ width: `${width}px`, opacity: index % 5 === 0 ? 0.5 : 0.85 }}
                />
              ))}
            </div>
          </div>

          {/* Bottom identifier — real institution and field, no ID numbers */}
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 font-mono text-[8px] tracking-[0.14em] uppercase">
            <span className="font-bold text-ink">{profile.badgeFooter}</span>
            <span className="shrink-0 text-ink-faint">Industrial IT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
