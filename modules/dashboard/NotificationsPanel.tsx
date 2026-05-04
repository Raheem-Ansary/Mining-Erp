import type { NotificationItem } from "@/types";
import { formatJalali } from "@/lib/dayjs";
import { Badge } from "@/components/ui/Badge";

function toneFor(kind: NotificationItem["kind"]) {
  if (kind === "warning") return "warning" as const;
  if (kind === "success") return "success" as const;
  return "info" as const;
}

export function NotificationsPanel({
  notifications,
}: {
  notifications: NotificationItem[];
}) {
  return (
    <div className="space-y-3">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm shadow-zinc-900/10"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="font-semibold text-zinc-900">{n.title}</div>
            <Badge tone={toneFor(n.kind)}>
              {n.kind === "warning"
                ? "هشدار"
                : n.kind === "success"
                  ? "مثبت"
                  : "اطلاع"}
            </Badge>
          </div>
          <div className="mt-2 text-sm leading-relaxed text-zinc-600">{n.body}</div>
          <div className="mt-3 text-xs text-zinc-400">
            {formatJalali(n.createdIso, "D MMMM YYYY — HH:mm")}
          </div>
        </div>
      ))}
    </div>
  );
}
