"use client";

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { AlertCircle, Check, Loader2, Mail, MapPin, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { linkedinHref, links, mailHref, profile } from "@/data/portfolio";

/* ------------------------------------------------------------------
   Contact form delivery — Formspree (React integration)
   Submissions are posted to the endpoint below via @formspree/react's useForm.
   To use a different form, create one at https://formspree.io and update the
   id below (the endpoint is derived from the same form URL).
------------------------------------------------------------------ */
const FORMSPREE_FORM_ID = "xnpnyevl";
const FORM_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

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

/* Formspree can return raw transport messages (e.g. "Failed to fetch");
   show friendly copy for those, its honest server message for the rest. */
function humanizeServerError(message: string): string {
  if (/fetch|network|failed|unknown error/i.test(message)) {
    return "Something went wrong while sending. Please try again or email me directly.";
  }
  return message;
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
    <li className="card flex items-center gap-3.5 px-4 py-3.5 transition-colors hover:border-primary/40">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer noopener" : undefined}
          className="min-w-0 rounded-md transition-colors hover:text-primary"
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
  const [submission, submitMessage, resetSubmission] = useForm(FORMSPREE_FORM_ID);

  const sending = submission.submitting;
  const sent = submission.succeeded;

  /* True when Formspree itself rejected a field (rendered via <ValidationError>). */
  const hasServerFieldError = (field: string) =>
    (submission.errors?.getFieldErrors(field).length ?? 0) > 0;

  /* Form-level failure: our own message, or Formspree's (humanized). */
  const serverFormError = submission.errors?.getFormErrors()[0];
  const formError =
    errors.form ?? (serverFormError ? humanizeServerError(serverFormError.message) : null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => {
      if (!previous[name as keyof FormValues]) return previous;
      const next = { ...previous };
      delete next[name as keyof FormValues];
      return next;
    });
    /* Drop stale Formspree errors while the visitor edits. */
    if (submission.errors) resetSubmission();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      event.preventDefault();
      return;
    }

    void submitMessage(event).catch(() => {
      resetSubmission();
      setErrors({ form: "Something went wrong. Please try again or email me directly." });
    });
  };

  const reset = () => {
    resetSubmission();
    setValues({ name: "", email: "", message: "" });
    setErrors({});
  };

  const githubHandle = links.github.replace(/^https?:\/\//, "");

  return (
    <section id="contact" className="scroll-mt-32 border-t border-line py-20 sm:py-24">
      <div className="shell">
        <SectionHeading
          title="Let's Connect"
          subtitle={profile.contactIntro}
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left — contact details */}
          <div className="lg:col-span-5">
            <Reveal>
              <ul className="grid gap-3">
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
              {sent ? (
                <div className="card p-6 text-center sm:p-8">
                  <span className="mx-auto grid size-12 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                    <Check size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    Thank you, {values.name.trim().split(" ")[0]}!
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-dim">
                    Your message has been delivered to my inbox — thanks for reaching out. I read
                    every message and will get back to you as soon as I can.
                  </p>
                  <button type="button" onClick={reset} className="btn btn-ghost mt-6">
                    Write another message
                  </button>
                </div>
              ) : (
                <form
                  action={FORM_ENDPOINT}
                  method="POST"
                  onSubmit={handleSubmit}
                  noValidate
                  className="card p-6 sm:p-8"
                >
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
                        aria-invalid={
                          errors.name || hasServerFieldError("name") ? "true" : undefined
                        }
                        aria-describedby={
                          errors.name || hasServerFieldError("name")
                            ? "contact-name-error"
                            : undefined
                        }
                      />
                      {errors.name && !hasServerFieldError("name") ? (
                        <p id="contact-name-error" className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                          {errors.name}
                        </p>
                      ) : null}
                      <ValidationError
                        field="name"
                        errors={submission.errors}
                        id="contact-name-error"
                        className="mt-1.5 text-xs text-red-500 dark:text-red-400"
                      />
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
                        aria-invalid={
                          errors.email || hasServerFieldError("email") ? "true" : undefined
                        }
                        aria-describedby={
                          errors.email || hasServerFieldError("email")
                            ? "contact-email-error"
                            : undefined
                        }
                      />
                      {errors.email && !hasServerFieldError("email") ? (
                        <p id="contact-email-error" className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                          {errors.email}
                        </p>
                      ) : null}
                      <ValidationError
                        field="email"
                        errors={submission.errors}
                        id="contact-email-error"
                        className="mt-1.5 text-xs text-red-500 dark:text-red-400"
                      />
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
                        aria-invalid={
                          errors.message || hasServerFieldError("message") ? "true" : undefined
                        }
                        aria-describedby={
                          errors.message || hasServerFieldError("message")
                            ? "contact-message-error"
                            : undefined
                        }
                      />
                      {errors.message && !hasServerFieldError("message") ? (
                        <p id="contact-message-error" className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                          {errors.message}
                        </p>
                      ) : null}
                      <ValidationError
                        field="message"
                        errors={submission.errors}
                        id="contact-message-error"
                        className="mt-1.5 text-xs text-red-500 dark:text-red-400"
                      />
                    </div>
                  </div>

                  {formError ? (
                    <p
                      role="alert"
                      className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400"
                    >
                      <AlertCircle size={15} aria-hidden="true" />
                      {formError}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn btn-primary mt-6 w-full disabled:cursor-wait disabled:opacity-70"
                  >
                    {sending ? (
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
