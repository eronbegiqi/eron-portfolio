"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "!<>-_\\/[]{}—=+*^?#░▒";

interface ScrambleTextProps {
  text: string;
  className?: string;
  trigger?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
}

export default function ScrambleText({
  text,
  className = "",
  trigger,
  as: Tag = "span",
  delay = 0,
}: ScrambleTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [output, setOutput] = useState(text);
  const active = trigger !== undefined ? trigger : inView;

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const total = text.length * 4;
    let rafId: number;
    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      if (elapsed < delay * 1000) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      frame++;
      setOutput(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (frame > i * 4) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      if (frame < total) rafId = requestAnimationFrame(tick);
      else setOutput(text);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, text, delay]);

  const Element = Tag as React.ElementType;
  return (
    <Element ref={ref} className={className}>
      {output}
    </Element>
  );
}
