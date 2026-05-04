import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Users, UserCheck, UserX, Palmtree } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { dashboardSummary } from "@/data/dashboard-summary";
import { notificationsSeed } from "@/data/notifications";
import { formatNumber } from "@/lib/format";
import { WeeklyAttendanceChart } from "./WeeklyAttendanceChart";
import { NotificationsPanel } from "./NotificationsPanel";

function Stat({
  title,
  value,
  Icon,
}: {
  title: string;
  value: number;
  Icon: LucideIcon;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm text-zinc-600">{title}</div>
          <div className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 tabular-nums">
            {formatNumber(value)}
          </div>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-zinc-900 text-white">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="کل کارکنان" value={dashboardSummary.totalEmployees} Icon={Users} />
        <Stat title="حاضر امروز" value={dashboardSummary.presentToday} Icon={UserCheck} />
        <Stat title="غایب امروز" value={dashboardSummary.absentToday} Icon={UserX} />
        <Stat title="درخواست‌های مرخصی باز" value={dashboardSummary.openLeaveRequests} Icon={Palmtree} />
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        <Card
          className="xl:col-span-3"
          title="روند حضور هفتگی"
          action={
            <Link
              href="/dashboard/attendance"
              className="text-sm font-medium text-brand-950 underline-offset-4 hover:underline"
            >
              مشاهدهٔ جزئیات
            </Link>
          }
        >
          <WeeklyAttendanceChart />
        </Card>

        <Card className="xl:col-span-2" title="اعلان‌ها">
          <NotificationsPanel notifications={notificationsSeed} />
        </Card>
      </div>
    </div>
  );
}
