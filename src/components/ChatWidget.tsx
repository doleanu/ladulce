"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  business,
  copy,
  mainQuickReplies,
  matchIntent,
  orderKindOptions,
  orderWhenOptions,
  quickReplies,
} from "@/lib/chatAssistant";

type Cta = { label: string; href: string };

type Message = {
  id: number;
  sender: "bot" | "user";
  text: string;
  quickReplies?: string[];
  cta?: Cta;
};

type OrderStep = null | "kind" | "when" | "name" | "done";

let nextId = 1;
function makeMessage(sender: Message["sender"], text: string, quickReplies?: string[], cta?: Cta): Message {
  return { id: nextId++, sender, text, quickReplies, cta };
}

function ChatBubbleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4.4 3.3A.6.6 0 0 1 3.6 19V6a1 1 0 0 1 1-1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M5 5 L19 19 M19 5 L5 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4 12 L20 4 L14 20 L11 13 L4 12 Z" fill="currentColor" />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState<OrderStep>(null);
  const [draft, setDraft] = useState({ kind: "", when: "", name: "" });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([makeMessage("bot", copy.greeting, mainQuickReplies)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function reply(text: string, quickReplies?: string[], cta?: Cta, delay = 550) {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, makeMessage("bot", text, quickReplies, cta)]);
    }, delay);
  }

  function respondToIntent(intent: ReturnType<typeof matchIntent>) {
    if (intent === "greeting") {
      reply(copy.greetingReply, mainQuickReplies);
      return;
    }
    if (intent === "hours") {
      reply(copy.hours, [quickReplies.order, quickReplies.menu]);
      return;
    }
    if (intent === "menu") {
      reply(copy.menu(), [quickReplies.order, quickReplies.hours]);
      return;
    }
    if (intent === "location") {
      reply(copy.location, [quickReplies.order, quickReplies.hours], {
        label: copy.mapsCta,
        href: business.maps,
      });
      return;
    }
    if (intent === "order") {
      setStep("kind");
      reply(copy.orderStart, [...orderKindOptions]);
      return;
    }
    reply(copy.unknownReply, mainQuickReplies);
  }

  function handleOrderStep(text: string) {
    if (step === "kind") {
      setDraft((d) => ({ ...d, kind: text }));
      setStep("when");
      reply(copy.askWhen(text), [...orderWhenOptions]);
      return;
    }
    if (step === "when") {
      setDraft((d) => ({ ...d, when: text }));
      setStep("name");
      reply(copy.askName);
      return;
    }
    if (step === "name") {
      const finalDraft = { ...draft, name: text };
      setStep("done");
      reply(copy.confirm(finalDraft.name, finalDraft.kind, finalDraft.when), undefined, {
        label: copy.callCta,
        href: business.tel,
      });
      return;
    }
  }

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, makeMessage("user", trimmed)]);
    setInput("");

    if (step && step !== "done") {
      handleOrderStep(trimmed);
      return;
    }

    respondToIntent(matchIntent(trimmed));
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-8 sm:right-8">
      {open && (
        <div
          className="mb-4 flex h-[32rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-[22px] bg-crema shadow-[5px_6px_0_var(--sombra)]"
          style={{ animation: "ink 0.35s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          <div className="flex items-center justify-between bg-espresso px-4 py-3.5 text-crema">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-terracota">
                <span className="font-display text-base font-semibold leading-none">LD</span>
              </div>
              <div>
                <p className="font-display text-sm font-semibold leading-tight">{copy.headerTitle}</p>
                <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-crema/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-pistacho" />
                  {copy.headerStatus}
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label={copy.closeLabel}
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 text-crema/80 transition-colors hover:bg-crema/10 hover:text-crema"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-paper px-4 py-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={
                    "max-w-[85%] rounded-[18px] px-3.5 py-2.5 text-sm leading-snug shadow-[2px_3px_0_var(--sombra)] " +
                    (m.sender === "user"
                      ? "rounded-br-sm bg-terracota text-crema"
                      : "rounded-bl-sm bg-crema text-espresso")
                  }
                >
                  {m.text}
                </div>
                {m.cta && (
                  <a
                    href={m.cta.href}
                    target={m.cta.href.startsWith("http") ? "_blank" : undefined}
                    rel={m.cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="mt-2 inline-block rounded-full bg-pistacho px-4 py-2 text-xs font-semibold text-espresso shadow-[2px_3px_0_var(--sombra)] transition-transform hover:-translate-y-0.5"
                  >
                    {m.cta.label}
                  </a>
                )}
                {m.quickReplies && (
                  <div className="mt-2 flex flex-wrap justify-start gap-1.5">
                    {m.quickReplies.map((qr) => (
                      <button
                        key={qr}
                        type="button"
                        onClick={() => handleSend(qr)}
                        className="rounded-full border-2 border-terracota px-3 py-1 text-xs font-semibold text-terracota transition-colors hover:bg-terracota hover:text-crema"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div className="flex items-center gap-1 rounded-[18px] rounded-bl-sm bg-crema px-3.5 py-2.5 shadow-[2px_3px_0_var(--sombra)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-espresso/40" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-espresso/40 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-espresso/40 [animation-delay:300ms]" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 bg-crema p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              placeholder={copy.inputPlaceholder}
              className="flex-1 rounded-full bg-paper px-4 py-2 text-sm text-espresso outline-none placeholder:text-espresso/50 focus:ring-2 focus:ring-terracota"
            />
            <button
              type="button"
              aria-label={copy.sendLabel}
              onClick={() => handleSend(input)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracota text-crema transition-colors hover:bg-[var(--terracota-deep)]"
            >
              <SendIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label={open ? copy.closeLabel : copy.openLabel}
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-terracota text-crema shadow-[4px_5px_0_var(--sombra)] transition-transform hover:-translate-y-1"
        style={{ transform: "rotate(-1.5deg)" }}
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <ChatBubbleIcon className="h-6 w-6" />}
      </button>
    </div>
  );
}
