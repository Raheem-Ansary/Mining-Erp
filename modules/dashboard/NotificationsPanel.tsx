"use client";
import type { NotificationItem } from "@/types";
import { formatAfghanDate } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { useLocale } from "@/components/providers/LocaleProvider";

function toneFor(kind: NotificationItem["kind"]) {
  if (kind === "warning") return "warning" as const;
  if (kind === "success") return "success" as const;
  return "info" as const;
}

export function NotificationsPanel({ notifications }: { notifications: NotificationItem[] }) {
  const { locale } = useLocale();
  const labels = {
    warning: locale === "pashto" ? "اقدام ته اړتیا" : "نیازمند اقدام",
    success: locale === "pashto" ? "تایید شوی" : "تایید شده",
    info: locale === "pashto" ? "اطلاع" : "اطلاع",
  } as const;

  return (
    <div className="space-y-3">
      {notifications.map((n) => (
        <div key={n.id} className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm shadow-zinc-900/10">
          <div className="flex items-start justify-between gap-3">
            <div className="font-semibold text-zinc-900">{n.title}</div>
            <Badge tone={toneFor(n.kind)}>{labels[n.kind]}</Badge>
          </div>
          <div className="mt-2 text-sm leading-relaxed text-zinc-600">{n.body}</div>
          <div className="mt-3 text-xs text-zinc-400">
            {formatAfghanDate(n.createdIso, locale, {
              day: "numeric",
              month: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
