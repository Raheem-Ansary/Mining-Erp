import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Card({ title, action, children, className }: CardProps) {
  return (
    <section
      className={`rounded-3xl border border-zinc-200/80 bg-white/92 p-5 shadow-[0_18px_48px_-24px_rgba(24,24,27,0.22)] ${className ?? ""}`}
    >
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          {title ? (
            <h2 className="text-base font-semibold text-zinc-950">{title}</h2>
          ) : (
            <div />
          )}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
