"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/40 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20";

type Fields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  website: string; // honeypot — hidden, must stay empty
};

const initialFields: Fields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(initialFields);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update =
    (key: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!res.ok) {
        throw new Error(data.error ?? "Could not send your message.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setFields(initialFields);
    setSubmitted(false);
    setError(null);
  };

  return (
    <div className="rounded-card border border-ink/[0.07] bg-white p-6 shadow-sm md:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease }}
            className="flex flex-col items-center py-10 text-center"
            role="status"
            aria-live="polite"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <h3 className="mt-5 font-display text-[22px] font-semibold tracking-tight text-ink">
              Message received
            </h3>
            <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-ink/60">
              Thanks! We&rsquo;ll be in touch shortly.
            </p>
            <button
              type="button"
              onClick={reset}
              className="btn-ghost mt-6"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            onSubmit={handleSubmit}
            noValidate={false}
            className="relative flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-[13px] font-medium text-ink/80"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  value={fields.name}
                  onChange={update("name")}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="company"
                  className="text-[13px] font-medium text-ink/80"
                >
                  Company Name
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Your company"
                  value={fields.company}
                  onChange={update("company")}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-[13px] font-medium text-ink/80"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={fields.email}
                  onChange={update("email")}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="phone"
                  className="text-[13px] font-medium text-ink/80"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91 ..."
                  value={fields.phone}
                  onChange={update("phone")}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-[13px] font-medium text-ink/80"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Leave your message"
                value={fields.message}
                onChange={update("message")}
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Honeypot — hidden from users, catches bots. */}
            <div className="absolute -left-[9999px]" aria-hidden>
              <label htmlFor="website">Leave this field empty</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={fields.website}
                onChange={update("website")}
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="btn-primary mt-1 w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sending ? "Sending…" : "Send Message"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
