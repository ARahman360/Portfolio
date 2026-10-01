"use client";

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { AlertCircle, Check, Loader2, Mail, MapPin, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { linkedinHref, links, mailHref, profile } from "@/data/portfolio";

/* ------------------------------------------------------------------
   Contact form backend
   The form works client-side only for now. To start receiving messages:
   1. Create a form at https://formspree.io (or use Resend).
   2. Paste your form URL into FORM_ENDPOINT below.
   Until then the form validates input and shows an honest demo state.
------------------------------------------------------------------ */
const FORM_ENDPOINT = "";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues | "form", string>>;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Please write a message of at least 10 characters.";
  }

  return errors;
}

interface ContactRowProps {
  icon: ReactNode;
  label: string;
  href?: string;
  value: string;
  external?: boolean;
}

function ContactRow({ icon, label, href, value, external = false }: ContactRowProps) {
  const content = (
    <span className="min-w-0">
      <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">
        {label}
      </span>
      <span className="mt-0.5 block break-words text-sm text-ink">{value}</span>
    </span>
  );

  return (
    <li className="card flex items-center gap-3.5 px-4 py-3.5 transition-colors hover:border-brand/40">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-brand/20 bg-brand/10 text-brand-bright">
        {icon}
      </span>
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer noopener" : undefined}
          className="min-w-0 rounded-md transition-colors hover:text-brand-bright"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}

export default function Contact() {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => {
      if (!previous[name as keyof FormValues]) return previous;
      const next = { ...previous };
      delete next[name as keyof FormValues];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");

    try {
      if (FORM_ENDPOINT) {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error("Request failed");
      }
      // No endpoint configured: fall through to the demo success state.
      setStatus("sent");
    } catch {
      setErrors({ form: "Something went wrong. Please try again or email me directly." });
      setStatus("idle");
    }
  };

  const reset = () => {
    setValues({ name: "", email: "", message: "" });
    setErrors({});
    setStatus("idle");
  };

  const githubHandle = links.github.replace(/^https?:\/\//, "");

  return (
    <section id="contact" className="scroll-mt-24 border-t border-line/40 py-20 sm:py-24">
      <div className="shell">
        <SectionHeading icon={Send} title="Let's Connect" />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left — introduction and contact details */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="max-w-xl text-[15px] leading-7 text-ink-dim">{profile.contactIntro}</p>

              <ul className="mt-8 grid gap-3">
                {mailHref ? (
                  <ContactRow
                    icon={<Mail size={16} aria-hidden="true" />}
                    label="Email"
                    href={mailHref}
                    value={links.email}
                  />
                ) : null}

                <ContactRow
                  icon={<GithubIcon size={16} />}
                  label="GitHub"
                  href={links.github}
                  value={githubHandle}
                  external
                />

                {linkedinHref ? (
                  <ContactRow
                    icon={<LinkedinIcon size={16} />}
                    label="LinkedIn"
                    href={linkedinHref}
                    value="LinkedIn profile"
                    external
                  />
                ) : null}

                <ContactRow
                  icon={<MapPin size={16} aria-hidden="true" />}
                  label="Location"
                  value={profile.location}
                />
              </ul>
            </Reveal>
          </div>

          {/* Right — contact form */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              {status === "sent" ? (
                <div className="card p-6 text-center sm:p-8">
                  <span className="mx-auto grid size-12 place-items-center rounded-full border border-brand/30 bg-brand/10 text-brand-bright">
                    <Check size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    Thank you, {values.name.trim().split(" ")[0]}!
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-dim">
                    Your message passed validation. The form is not connected to a delivery
                    service yet, so nothing was sent — once a backend (Formspree or Resend) is
                    connected, messages will be delivered directly.
                  </p>
                  <button type="button" onClick={reset} className="btn btn-ghost mt-6">
                    Write another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8">
                  <h3 className="font-display text-lg font-semibold text-ink">Send a message</h3>
                  <p className="mt-1 text-sm text-ink-dim">
                    Internships, trainee roles or student projects — feel free to reach out.
                  </p>

                  <div className="mt-6 grid gap-5">
                    <div>
                      <label htmlFor="contact-name" className="mb-1.5 block text-sm text-ink-dim">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        className="field"
                        value={values.name}
                        onChange={handleChange}
                        aria-invalid={errors.name ? "true" : undefined}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                      />
                      {errors.name ? (
                        <p id="contact-name-error" className="mt-1.5 text-xs text-red-400">
                          {errors.name}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="mb-1.5 block text-sm text-ink-dim">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="field"
                        value={values.email}
                        onChange={handleChange}
                        aria-invalid={errors.email ? "true" : undefined}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                      />
                      {errors.email ? (
                        <p id="contact-email-error" className="mt-1.5 text-xs text-red-400">
                          {errors.email}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="mb-1.5 block text-sm text-ink-dim">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        placeholder="Tell me about the opportunity or project..."
                        className="field resize-y"
                        value={values.message}
                        onChange={handleChange}
                        aria-invalid={errors.message ? "true" : undefined}
                        aria-describedby={errors.message ? "contact-message-error" : undefined}
                      />
                      {errors.message ? (
                        <p id="contact-message-error" className="mt-1.5 text-xs text-red-400">
                          {errors.message}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {errors.form ? (
                    <p
                      role="alert"
                      className="mt-4 flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300"
                    >
                      <AlertCircle size={15} aria-hidden="true" />
                      {errors.form}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn btn-primary mt-6 w-full disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
