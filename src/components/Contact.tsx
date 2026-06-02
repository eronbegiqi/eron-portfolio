"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import MagneticButton from "./MagneticButton";

type FormState = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      project: (form.elements.namedItem("project") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "Something went wrong.");
      }

      setFormState("sent");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setFormState("error");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between border-b border-[#e8e8e8] pb-8 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.05]"
        >
          Let&apos;s Work
          <br />
          <span className="italic text-[#F59E0B]">Together.</span>
        </motion.h2>
        <span className="text-[11px] text-[#bbb] tracking-[0.18em] uppercase mt-2">
          Contact
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-[10px] tracking-[0.16em] uppercase text-[#aaa]"
              >
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                required
                disabled={formState === "sending" || formState === "sent"}
                className="rounded-none border-x-0 border-t-0 border-b border-[#e8e8e8] px-0 h-10 focus-visible:ring-0 focus-visible:border-[#F59E0B] transition-colors duration-200 placeholder:text-[#ccc] text-sm disabled:opacity-50"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-[10px] tracking-[0.16em] uppercase text-[#aaa]"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                disabled={formState === "sending" || formState === "sent"}
                className="rounded-none border-x-0 border-t-0 border-b border-[#e8e8e8] px-0 h-10 focus-visible:ring-0 focus-visible:border-[#F59E0B] transition-colors duration-200 placeholder:text-[#ccc] text-sm disabled:opacity-50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="project"
              className="text-[10px] tracking-[0.16em] uppercase text-[#aaa]"
            >
              Project type
            </Label>
            <Input
              id="project"
              name="project"
              placeholder="e.g. Website redesign, mobile app, brand identity..."
              disabled={formState === "sending" || formState === "sent"}
              className="rounded-none border-x-0 border-t-0 border-b border-[#e8e8e8] px-0 h-10 focus-visible:ring-0 focus-visible:border-[#F59E0B] transition-colors duration-200 placeholder:text-[#ccc] text-sm disabled:opacity-50"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="message"
              className="text-[10px] tracking-[0.16em] uppercase text-[#aaa]"
            >
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me about your project, timeline, and goals..."
              required
              disabled={formState === "sending" || formState === "sent"}
              className="rounded-none border-x-0 border-t-0 border-b border-[#e8e8e8] px-0 min-h-28 focus-visible:ring-0 focus-visible:border-[#F59E0B] transition-colors duration-200 resize-none placeholder:text-[#ccc] text-sm disabled:opacity-50"
            />
          </div>

          {/* Error message */}
          <AnimatePresence>
            {formState === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-red-500"
              >
                {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="pt-2">
            <MagneticButton strength={0.25} radius={120}>
              <motion.button
                type="submit"
                disabled={formState === "sending" || formState === "sent"}
                data-cursor=""
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
                className="w-full h-12 bg-[#111] text-white text-sm font-medium transition-all duration-250 disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-[#F59E0B] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                <span className="relative z-10 group-hover:text-[#111] transition-colors duration-150">
                  {formState === "sent"
                    ? "Message Sent ✓"
                    : formState === "sending"
                    ? "Sending..."
                    : "Send Message"}
                </span>
              </motion.button>
            </MagneticButton>
          </div>
        </motion.form>

        {/* Contact details */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="space-y-8 lg:pt-2"
        >
          {[
            {
              label: "Email",
              value: "eronbegiqi8@gmail.com",
              href: "mailto:eronbegiqi8@gmail.com",
            },
            {
              label: "LinkedIn",
              value: "linkedin.com/in/eronbegiqi",
              href: "#",
            },
          ].map(({ label, value, href }) => (
            <div key={label}>
              <p className="text-[10px] text-[#bbb] tracking-[0.16em] uppercase mb-1.5">
                {label}
              </p>
              <a
                href={href}
                data-cursor=""
                className="text-base hover:text-[#F59E0B] transition-colors duration-200"
              >
                {value}
              </a>
            </div>
          ))}

          <div>
            <p className="text-[10px] text-[#bbb] tracking-[0.16em] uppercase mb-1.5">
              Availability
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-[pulse-dot_2s_ease-in-out_infinite]" />
              <span className="text-base">Open to new projects</span>
            </div>
          </div>

          <p className="text-sm text-[#bbb] border-t border-[#e8e8e8] pt-8 leading-relaxed">
            Usually respond within 24 hours. Happy to discuss your project,
            no matter the scope or stage.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
