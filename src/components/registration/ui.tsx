"use client";

import React, { forwardRef, useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import clsx from "clsx";
import { FiAlertCircle, FiCheck, FiCheckCircle, FiCopy, FiInfo, FiLoader, FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { Fee } from "@/lib/types";
import { rupees } from "@/lib/format";

// Shared building blocks for ThynkX registration, teacher portal and student flow.
// Visual language follows the main site: black canvas, glass cards, #00BF62 accents, Clash Display headings.

export function Card({
  title,
  action,
  children,
  className,
  padded = true,
}: {
  title?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section className={clsx("rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]", padded && "p-5 sm:p-7", className)}>
      {(title || action) && (
        <div className={clsx("flex items-center justify-between gap-4", padded ? "mb-5" : "px-5 sm:px-7 pt-5 sm:pt-7 mb-4")}>
          {title && <h2 className="font-clash text-lg sm:text-xl font-semibold text-white">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const buttonClasses = (variant: ButtonVariant, size: "sm" | "md" | "lg", full?: boolean) =>
  clsx(
    "inline-flex items-center justify-center gap-2 rounded-full font-poppins font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer",
    size === "sm" && "h-9 px-4 text-xs",
    size === "md" && "h-11 px-6 text-sm",
    size === "lg" && "h-12 px-7 text-sm sm:text-base",
    variant === "primary" && "bg-[#00BF62] text-black hover:bg-[#00d86f] shadow-[0_0_24px_rgba(0,191,98,0.25)]",
    variant === "secondary" && "border border-white/20 bg-[#121514] text-white hover:border-[#00BF62]",
    variant === "ghost" && "text-slate-300 hover:text-[#00BF62]",
    variant === "danger" && "border border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20",
    full && "w-full",
  );

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: "sm" | "md" | "lg"; loading?: boolean; full?: boolean }
>(function Button({ variant = "primary", size = "md", loading, full, className, children, disabled, ...props }, ref) {
  return (
    <button ref={ref} className={clsx(buttonClasses(variant, size, full), className)} disabled={disabled || loading} {...props}>
      {loading && <FiLoader className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
});

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  full,
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  full?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={clsx(buttonClasses(variant, size, full), className)}>
      {children}
    </Link>
  );
}

export function Field({
  label,
  required,
  error,
  hint,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={clsx("block space-y-1.5", className)}>
      <span className="text-xs sm:text-[13px] font-medium text-slate-300">
        {label} {required && <span className="text-[#00BF62]">*</span>}
      </span>
      {children}
      {error ? (
        <span className="flex items-center gap-1.5 text-xs text-red-400">
          <FiAlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
        </span>
      ) : hint ? (
        <span className="block text-xs text-slate-500">{hint}</span>
      ) : null}
    </label>
  );
}

const inputBase =
  "w-full h-11 rounded-xl border bg-black/40 px-4 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-[#00BF62] focus:ring-2 focus:ring-[#00BF62]/20";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }>(function Input(
  { invalid, className, ...props },
  ref,
) {
  return <input ref={ref} className={clsx(inputBase, invalid ? "border-red-500/60" : "border-white/15", className)} {...props} />;
});

export const TextArea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }>(
  function TextArea({ invalid, className, ...props }, ref) {
    return <textarea ref={ref} className={clsx(inputBase, "h-auto py-3 min-h-24", invalid ? "border-red-500/60" : "border-white/15", className)} {...props} />;
  },
);

type SelectOption = { value: string; label: React.ReactNode; text: string; disabled?: boolean };

const textOf = (node: React.ReactNode): string => {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (React.isValidElement(node)) return textOf((node.props as { children?: React.ReactNode }).children);
  return "";
};

const readOptions = (children: React.ReactNode): SelectOption[] => {
  const out: SelectOption[] = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    const p = child.props as { value?: string | number; disabled?: boolean; children?: React.ReactNode };
    if (child.type === React.Fragment) out.push(...readOptions(p.children));
    else if (child.type === "option") {
      const text = textOf(p.children);
      out.push({ value: p.value !== undefined ? String(p.value) : text, label: p.children, text, disabled: p.disabled });
    }
  });
  return out;
};

/**
 * Themed dropdown with the same API as a native <select> (children are <option>s).
 * A hidden native <select> keeps the value, so `value/onChange` and react-hook-form `register` both work unchanged.
 */
export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }>(function Select(
  { invalid, className, children, value, defaultValue, disabled, id, "aria-label": ariaLabel, ...props },
  ref,
) {
  const options = readOptions(children);
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const [domValue, setDomValue] = useState(defaultValue !== undefined ? String(defaultValue) : "");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [pos, setPos] = useState<React.CSSProperties>({});
  const current = value !== undefined ? String(value) : domValue;
  const selected = options.find((o) => o.value === current) ?? options[0];

  const setSelectRef = useCallback(
    (el: HTMLSelectElement | null) => {
      selectRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    },
    [ref],
  );

  // Uncontrolled (react-hook-form): the hidden <select> is the source of truth, so pick up defaults and reset().
  // eslint-disable-next-line react-hooks/exhaustive-deps -- runs every render on purpose; guarded by the equality check
  useEffect(() => {
    if (value === undefined && selectRef.current && selectRef.current.value !== domValue) setDomValue(selectRef.current.value);
  });

  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const r = triggerRef.current?.getBoundingClientRect();
      if (!r) return;
      const below = window.innerHeight - r.bottom;
      const up = below < 240 && r.top > below;
      setPos({
        left: r.left,
        width: r.width,
        top: up ? undefined : r.bottom + 6,
        bottom: up ? window.innerHeight - r.top + 6 : undefined,
        maxHeight: Math.max(120, Math.min(288, (up ? r.top : below) - 16)),
      });
    };
    place();
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !listRef.current?.contains(t)) setOpen(false);
    };
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  useEffect(() => {
    if (open && active >= 0) listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const openList = () => {
    if (disabled) return;
    setActive(Math.max(0, options.findIndex((o) => o.value === current)));
    setOpen(true);
  };

  const choose = (opt: SelectOption) => {
    setOpen(false);
    triggerRef.current?.focus();
    const el = selectRef.current;
    if (!el || opt.disabled || opt.value === current) return;
    el.value = opt.value;
    if (value === undefined) setDomValue(opt.value);
    el.dispatchEvent(new Event("change", { bubbles: true }));
  };

  const step = (from: number, dir: 1 | -1) => {
    for (let i = from + dir; i >= 0 && i < options.length; i += dir) if (!options[i].disabled) return i;
    return from;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => step(i, e.key === "ArrowDown" ? 1 : -1));
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      setActive(e.key === "Home" ? step(-1, 1) : step(options.length, -1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (options[active]) choose(options[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
    } else if (e.key === "Tab") {
      setOpen(false);
    } else if (e.key.length === 1) {
      const k = e.key.toLowerCase();
      const order = options.map((_, i) => (active + 1 + i) % options.length);
      const hit = order.find((i) => !options[i].disabled && options[i].text.trim().toLowerCase().startsWith(k));
      if (hit !== undefined) setActive(hit);
    }
  };

  return (
    <div className={clsx("relative", className ?? "w-full")}>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        role="combobox"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        onBlur={() => {
          setOpen(false);
          // Let react-hook-form see the blur (onTouched validation) through the hidden select.
          selectRef.current?.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
        }}
        className={clsx(
          inputBase,
          "flex items-center justify-between gap-2 pr-3.5 text-left cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
          invalid ? "border-red-500/60" : open ? "border-[#00BF62] ring-2 ring-[#00BF62]/20" : "border-white/15 hover:border-white/30",
        )}
      >
        <span className={clsx("truncate", !selected?.value && "text-slate-400")}>{selected?.label}</span>
        <FiChevronDown className={clsx("w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200", open && "rotate-180 text-[#00BF62]")} />
      </button>
      <select
        ref={setSelectRef}
        {...props}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden
        onFocus={() => triggerRef.current?.focus()}
        className="sr-only"
      >
        {children}
      </select>
      {open &&
        createPortal(
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            style={{ position: "fixed", ...pos }}
            onMouseDown={(e) => e.preventDefault()}
            className="scroll-thin z-[1000] overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-[#0d110f]/95 backdrop-blur-xl p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] font-poppins"
          >
            {options.map((o, i) => {
              const isSelected = o.value === selected?.value;
              return (
                <li
                  key={`${o.value}-${i}`}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={o.disabled || undefined}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(o)}
                  className={clsx(
                    "flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                    o.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
                    i === active && !o.disabled && "bg-white/[0.07]",
                    isSelected ? "text-[#00BF62] font-medium" : "text-slate-200",
                  )}
                >
                  <span className="truncate">{o.label}</span>
                  {isSelected && <FiCheck className="w-4 h-4 shrink-0" />}
                </li>
              );
            })}
          </ul>,
          document.body,
        )}
    </div>
  );
});

export const PhoneInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }>(function PhoneInput(
  { invalid, className, ...props },
  ref,
) {
  return (
    <div className={clsx("flex h-11 rounded-xl border bg-black/40 overflow-hidden focus-within:border-[#00BF62] focus-within:ring-2 focus-within:ring-[#00BF62]/20", invalid ? "border-red-500/60" : "border-white/15", className)}>
      <span className="flex items-center px-3.5 text-sm text-slate-400 border-r border-white/10 bg-white/[0.03]">+91</span>
      <input ref={ref} type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={11} className="flex-1 bg-transparent px-3.5 text-sm text-white placeholder:text-slate-500 outline-none" {...props} />
    </div>
  );
});

export function Checkbox({ label, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: React.ReactNode; error?: string }) {
  return (
    <div className="space-y-1">
      <label className="flex items-start gap-3 cursor-pointer text-sm text-slate-300">
        <input type="checkbox" className="mt-0.5 w-4.5 h-4.5 accent-[#00BF62] cursor-pointer shrink-0" {...props} />
        <span>{label}</span>
      </label>
      {error && <span className="block text-xs text-red-400 pl-7">{error}</span>}
    </div>
  );
}

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span
              className={clsx(
                "flex items-center gap-2 h-9 pl-1.5 pr-3.5 rounded-full border text-xs sm:text-[13px] font-medium",
                done && "border-[#00BF62]/40 bg-[#00BF62]/10 text-[#00BF62]",
                active && "border-[#00BF62] bg-[#00BF62] text-black",
                !done && !active && "border-white/10 text-slate-400",
              )}
            >
              <span className={clsx("w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold", active ? "bg-black/15" : done ? "bg-[#00BF62]/20" : "bg-white/10")}>
                {done ? <FiCheck className="w-3.5 h-3.5" /> : i + 1}
              </span>
              <span className={clsx(!active && "hidden sm:inline")}>{label}</span>
            </span>
            {i < steps.length - 1 && <span className={clsx("w-4 sm:w-8 h-px", done ? "bg-[#00BF62]/50" : "bg-white/10")} />}
          </li>
        );
      })}
    </ol>
  );
}

export function OtpInput({ value, onChange, invalid, autoFocus }: { value: string; onChange: (v: string) => void; invalid?: boolean; autoFocus?: boolean }) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length: 6 }, (_, i) => value[i] ?? "");

  const set = (i: number, d: string) => {
    const next = digits.slice();
    next[i] = d;
    onChange(next.join("").slice(0, 6));
  };

  return (
    <div className="flex gap-2 sm:gap-3 justify-center">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={d}
          autoFocus={autoFocus && i === 0}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          aria-label={`OTP digit ${i + 1}`}
          maxLength={1}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "");
            if (!v) return set(i, "");
            if (v.length > 1) {
              onChange(v.slice(0, 6));
              refs.current[Math.min(5, v.length)]?.focus();
              return;
            }
            set(i, v);
            refs.current[i + 1]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
            if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
            if (e.key === "ArrowRight" && i < 5) refs.current[i + 1]?.focus();
          }}
          onPaste={(e) => {
            const v = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
            if (v) {
              e.preventDefault();
              onChange(v);
              refs.current[Math.min(5, v.length)]?.focus();
            }
          }}
          className={clsx(
            "w-11 h-13 sm:w-14 sm:h-16 rounded-xl border bg-black/50 text-center font-clash text-xl sm:text-2xl font-semibold text-white outline-none focus:border-[#00BF62] focus:ring-2 focus:ring-[#00BF62]/25",
            invalid ? "border-red-500/60" : "border-white/15",
          )}
        />
      ))}
    </div>
  );
}

type Tone = "green" | "amber" | "red" | "gray" | "blue";

export function Badge({ tone = "gray", children, className }: { tone?: Tone; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 h-6 px-2.5 rounded-full text-[11px] font-semibold whitespace-nowrap border",
        tone === "green" && "border-[#00BF62]/40 bg-[#00BF62]/10 text-[#00BF62]",
        tone === "amber" && "border-amber-400/40 bg-amber-400/10 text-amber-300",
        tone === "red" && "border-red-400/40 bg-red-400/10 text-red-300",
        tone === "blue" && "border-sky-400/40 bg-sky-400/10 text-sky-300",
        tone === "gray" && "border-white/15 bg-white/5 text-slate-300",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PaymentBadge({ status }: { status: string }) {
  const map: Record<string, [Tone, string]> = {
    CAPTURED: ["green", "Paid"],
    CONFIRMED: ["green", "Paid"],
    FAILED: ["red", "Failed"],
    CREATED: ["amber", "Not completed"],
    DRAFT: ["amber", "Draft"],
    PAYMENT_PENDING: ["amber", "Payment pending"],
    CANCELLED: ["gray", "Cancelled"],
    EXPIRED: ["gray", "Expired"],
  };
  const [tone, label] = map[status] ?? ["gray", status];
  return <Badge tone={tone}>{label}</Badge>;
}

export function Alert({ tone = "info", title, children, className }: { tone?: "info" | "error" | "success" | "warning"; title?: string; children?: React.ReactNode; className?: string }) {
  const Icon = tone === "error" || tone === "warning" ? FiAlertCircle : tone === "success" ? FiCheckCircle : FiInfo;
  return (
    <div
      role={tone === "error" ? "alert" : undefined}
      className={clsx(
        "flex gap-3 rounded-2xl border px-4 py-3.5 text-sm",
        tone === "info" && "border-sky-400/20 bg-sky-400/5 text-sky-100",
        tone === "error" && "border-red-400/30 bg-red-400/10 text-red-200",
        tone === "success" && "border-[#00BF62]/30 bg-[#00BF62]/10 text-emerald-100",
        tone === "warning" && "border-amber-400/30 bg-amber-400/10 text-amber-100",
        className,
      )}
    >
      <Icon className="w-4.5 h-4.5 shrink-0 mt-0.5" />
      <div className="space-y-1">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className="leading-relaxed opacity-90">{children}</div>}
      </div>
    </div>
  );
}

export function InfoRows({ rows, className }: { rows: [React.ReactNode, React.ReactNode][]; className?: string }) {
  return (
    <dl className={clsx("divide-y divide-white/10", className)}>
      {rows.map(([k, v], i) => (
        <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-6 py-2.5 text-sm">
          <dt className="sm:w-44 shrink-0 text-slate-400">{k}</dt>
          <dd className="text-white font-medium break-words">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function FeeBreakdown({ fee }: { fee: Fee }) {
  const rows: [string, string, boolean?][] = [
    ["Registration fee (per student)", rupees(fee.feePerStudentPaise)],
    [`GST @ ${fee.gstPercent}%`, rupees(fee.gstPerStudentPaise)],
    ["Total per student (incl. GST)", rupees(fee.totalPerStudentPaise)],
    [`Total for ${fee.studentCount} students`, rupees(fee.subtotalPaise)],
    [`Payment gateway fee @ ${fee.gatewayFeePercent}%`, rupees(fee.gatewayFeePaise)],
  ];
  return (
    <div className="space-y-1">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-4 py-1.5 text-sm">
          <span className="text-slate-400">{k}</span>
          <span className="text-white tabular-nums">{v}</span>
        </div>
      ))}
      <div className="flex justify-between gap-4 pt-3 mt-2 border-t border-white/10">
        <span className="font-semibold text-white">Total payable</span>
        <span className="font-clash text-xl font-bold text-[#00BF62] tabular-nums">{rupees(fee.totalPaise)}</span>
      </div>
    </div>
  );
}

export function CopyButton({ value, label = "Copy", size = "sm" }: { value: string; label?: string; size?: "sm" | "md" }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      type="button"
      variant="secondary"
      size={size}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          /* clipboard blocked */
        }
      }}
    >
      {copied ? <FiCheck className="w-4 h-4 text-[#00BF62]" /> : <FiCopy className="w-4 h-4" />}
      {copied ? "Copied" : label}
    </Button>
  );
}

export function CodeHighlight({ label, value, children }: { label: string; value: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#00BF62]/50 bg-[#00BF62]/[0.06] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_40px_rgba(0,191,98,0.12)]">
      <div>
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        <p className="font-clash text-2xl sm:text-3xl font-bold tracking-wide text-[#00BF62] break-all">{value}</p>
      </div>
      <div className="flex gap-2 shrink-0">{children ?? <CopyButton value={value} label="Copy code" />}</div>
    </div>
  );
}

export function Spinner({ className }: { className?: string }) {
  return <FiLoader className={clsx("w-6 h-6 animate-spin text-[#00BF62]", className)} />;
}

export function LoadingBlock({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-sm text-slate-400">
      <Spinner />
      {label}
    </div>
  );
}

export function EmptyState({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="text-center py-14 px-6">
      <p className="font-clash text-lg text-white">{title}</p>
      {children && <div className="mt-2 text-sm text-slate-400">{children}</div>}
    </div>
  );
}

export function Pagination({ page, totalPages, total, pageSize, onPage, noun }: { page: number; totalPages: number; total: number; pageSize: number; onPage: (p: number) => void; noun: string }) {
  if (!total) return null;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 sm:px-7 py-4 border-t border-white/10 text-xs sm:text-sm text-slate-400">
      <span>
        Showing {from} to {to} of {total.toLocaleString("en-IN")} {noun}
      </span>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => onPage(page - 1)} aria-label="Previous page">
          <FiChevronLeft className="w-4 h-4" />
        </Button>
        <span className="px-2 text-white">
          {page} / {totalPages}
        </span>
        <Button variant="secondary" size="sm" disabled={page >= totalPages} onClick={() => onPage(page + 1)} aria-label="Next page">
          <FiChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

/** Horizontal-scrolling table wrapper with consistent header styling. */
export function Table({ head, children }: { head: React.ReactNode[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-y border-white/10 bg-white/[0.03] text-left text-xs uppercase tracking-wider text-slate-400">
            {head.map((h, i) => (
              <th key={i} className="px-4 sm:px-5 py-3 font-medium whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">{children}</tbody>
      </table>
    </div>
  );
}

export const Td = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <td className={clsx("px-4 sm:px-5 py-3.5 text-slate-200 whitespace-nowrap", className)}>{children}</td>
);

export function PageHeading({ title, subtitle, action }: { title: string; subtitle?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
      <div>
        <h1 className="font-clash text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-slate-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
