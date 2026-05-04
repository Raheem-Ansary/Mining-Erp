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
      className={`rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-sm ${className ?? ""}`}
    >
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          {title ? (
            <h2 className="text-base font-semibold text-zinc-900">{title}</h2>
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
