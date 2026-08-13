"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** stagger delay in ms */
  delay?: number;
  /** initial rotation while "unglued", e.g. -3 or 2 */
  rotate?: number;
  as?: "div" | "li" | "figure";
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  rotate = -2.5,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = {
    "--rd": `${delay}ms`,
    "--rr": `${rotate}deg`,
  } as CSSProperties;

  return (
    <Tag
      ref={ref as never}
      style={style}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
