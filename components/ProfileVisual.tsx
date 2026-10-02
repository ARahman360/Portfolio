"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { MapPin, MousePointer2 } from "lucide-react";
import { experiences, profile } from "@/data/portfolio";

/* Decorative barcode bars — deterministic so server and client render alike. */
const BAR_WIDTHS = [2, 1, 3, 1, 2, 4, 1, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 2, 4, 1] as const;

/**
 * Hero visual: a lanyard ID badge (Lightswind template signature) that tilts
 * toward the cursor. Shows /public/profile.jpg when it exists, otherwise an
 * elegant gradient monogram.
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
    if (card) card.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="w-full max-w-sm"
      style={{ perspective: "1200px" }}
    >
      {/* Lanyard strap + clip */}
      <div className="mx-auto flex w-full max-w-[15rem] flex-col items-center" aria-hidden="true">
        <span className="h-14 w-2.5 rounded-full bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-500 dark:from-zinc-600 dark:to-zinc-800" />
        <span className="-mt-0.5 h-5 w-8 rounded-[4px] border border-zinc-400/70 bg-zinc-200 shadow-sm dark:border-zinc-500/70 dark:bg-zinc-700">
          <span className="mx-auto mt-1 block h-1 w-3 rounded-full bg-zinc-400/80 dark:bg-zinc-500" />
        </span>
      </div>

      {/* Badge */}
      <div
        ref={cardRef}
        className="relative -mt-1 w-full overflow-hidden rounded-[1.75rem] border border-line bg-card shadow-[0_30px_70px_-35px_rgb(0_0_0/0.5)] transition-transform duration-200 ease-out will-change-transform"
      >
        {/* Gradient header with portrait */}
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-violet-600 via-violet-500 to-sky-400">
          <div className="dot-grid absolute inset-0 opacity-30" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-20%,rgb(255_255_255/0.55),transparent_60%)]"
            aria-hidden="true"
          />

          {/* Circular portrait with gradient ring */}
          <div className="absolute inset-x-0 -bottom-14 flex justify-center">
            <div className="relative size-28 rounded-full bg-gradient-to-br from-violet-400 via-sky-300 to-emerald-300 p-[3px] shadow-xl">
              <div className="relative size-full overflow-hidden rounded-full bg-card">
                {/* Monogram fallback — visible until a real portrait loads */}
                <span className="absolute inset-0 grid place-items-center text-3xl font-extrabold tracking-tight text-ink">
                  {profile.monogram}
                </span>

                {photoOk && (
                  <Image
                    src="/profile.jpg"
                    alt="Portrait of Md Abdur Rahman"
                    fill
                    sizes="112px"
                    className={`object-cover object-top transition-opacity duration-500 ${
                      photoLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onError={() => setPhotoOk(false)}
                    onLoad={() => setPhotoLoaded(true)}
                  />
                )}

                {/* Online status dot */}
                <span className="absolute right-1 bottom-1 size-4 rounded-full border-2 border-card bg-success" />
              </div>
            </div>
          </div>
        </div>

        {/* Identity block */}
        <div className="px-6 pt-20 pb-6 text-center">
          <h2 className="text-xl font-extrabold tracking-tight">{profile.name}</h2>
          <p className="mx-auto mt-2 inline-block rounded-full border border-line-strong bg-bg-soft px-3.5 py-1 text-xs font-semibold text-ink">
            {profile.headline}
          </p>

          <div className="mt-5 border-t border-line pt-4">
            {/* Meta grid */}
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-left">
              <div>
                <dt className="font-mono text-[9px] tracking-[0.18em] text-ink-faint uppercase">
                  Specialty
                </dt>
                <dd className="mt-0.5 text-[13px] leading-snug font-bold">{profile.specialty}</dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] tracking-[0.18em] text-ink-faint uppercase">
                  Location
                </dt>
                <dd className="mt-0.5 flex items-center gap-1 text-[13px] leading-snug font-bold">
                  <MapPin size={12} className="shrink-0 text-primary" aria-hidden="true" />
                  {profile.location}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] tracking-[0.18em] text-ink-faint uppercase">
                  Studies
                </dt>
                <dd className="mt-0.5 text-[13px] leading-snug font-bold">{profile.university}</dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] tracking-[0.18em] text-ink-faint uppercase">
                  Experience
                </dt>
                <dd className="mt-0.5 flex items-center gap-1.5 text-[13px] leading-snug font-bold">
                  {experiences.length} roles
                  <span className="inline-block size-1.5 rounded-full bg-success" aria-hidden="true" />
                  <span className="sr-only">and currently active</span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Barcode strip */}
          <div className="mt-5 rounded-lg border border-line bg-bg-soft px-3 py-2.5">
            <div className="flex h-9 items-end justify-center gap-[3px]" aria-hidden="true">
              {BAR_WIDTHS.map((width, index) => (
                <span
                  key={`${width}-${index}`}
                  className="block h-full rounded-[1px] bg-ink"
                  style={{ width: `${width}px`, opacity: index % 5 === 0 ? 0.55 : 0.85 }}
                />
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between gap-3 font-mono text-[9px] tracking-[0.18em] text-ink-dim uppercase">
              <span>{profile.badgeId}</span>
              <span className="text-ink-faint">Industrial IT</span>
            </div>
          </div>

          {/* Interaction hint */}
          <p className="mt-4 flex items-center justify-center gap-2 font-mono text-[9px] tracking-[0.25em] text-ink-faint uppercase">
            <MousePointer2 size={11} aria-hidden="true" />
            Move the cursor over the card
          </p>
        </div>
      </div>
    </div>
  );
}
