"use client";

import Image from "next/image";
import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { heroInterests, profile } from "@/data/portfolio";

/**
 * Hero visual: shows /public/profile.jpg when it exists, otherwise falls
 * back to an elegant "AR." monogram card. Drop your portrait at
 * public/profile.jpg and it will appear automatically.
 */
export default function ProfileVisual() {
  const [photoOk, setPhotoOk] = useState(true);
  const [photoLoaded, setPhotoLoaded] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {/* Portrait / monogram panel */}
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl border border-line/80 bg-surface">
        {/* Decorative layers (always behind the photo) */}
        <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgb(47_129_247_/_0.18),transparent_65%)]"
          aria-hidden="true"
        />

        {/* Corner brackets */}
        <span className="absolute left-4 top-4 size-6 border-l border-t border-brand/50" aria-hidden="true" />
        <span className="absolute right-4 top-4 size-6 border-r border-t border-brand/50" aria-hidden="true" />
        <span className="absolute bottom-4 left-4 size-6 border-b border-l border-brand/50" aria-hidden="true" />
        <span className="absolute bottom-4 right-4 size-6 border-b border-r border-brand/50" aria-hidden="true" />

        {/* Monogram fallback */}
        <div className="absolute inset-0 grid place-items-center p-6">
          <div className="text-center">
            <span className="text-gradient block font-display text-7xl font-bold tracking-tight sm:text-8xl">
              {profile.monogram}.
            </span>
            <span className="mt-4 block font-mono text-[10px] uppercase tracking-[0.35em] text-ink-faint">
              Industrial IT · Finland
            </span>
          </div>
        </div>

        {/* Real portrait — rendered only when the file loads successfully */}
        {photoOk && (
          <>
            <Image
              src="/profile.jpg"
              alt="Portrait of Md Abdur Rahman"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className={`object-cover object-top transition-opacity duration-500 ${photoLoaded ? "opacity-100" : "opacity-0"}`}
              onError={() => setPhotoOk(false)}
              onLoad={() => setPhotoLoaded(true)}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night via-night/60 to-transparent"
              aria-hidden="true"
            />
          </>
        )}
      </div>

      {/* University info card */}
      <div className="card flex items-center gap-3 p-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-brand/25 bg-brand/10 text-brand">
          <GraduationCap size={20} aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold leading-snug text-ink">{profile.university}</p>
          <p className="mt-0.5 text-xs text-ink-dim">{profile.degree}</p>
        </div>
      </div>

      {/* Interest list */}
      <ul className="grid gap-2.5 px-1">
        {heroInterests.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 text-sm text-ink-dim">
            <span className="grid size-7 shrink-0 place-items-center rounded-md border border-brand/20 bg-brand/10 text-brand-bright">
              <Icon size={14} aria-hidden="true" />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
