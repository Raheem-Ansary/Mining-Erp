"use client";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Boxes,
  ClipboardCheck,
  Fuel,
  ShieldAlert,
  Truck,
  Users,
  UserCheck,
  UserX,
  Wallet,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { dashboardSummary } from "@/data/dashboard-summary";
import { formatCurrencyAFN, formatNumber, formatPercent } from "@/lib/format";
import { WeeklyAttendanceChart } from "./WeeklyAttendanceChart";
import { NotificationsPanel } from "./NotificationsPanel";
import { useLocale } from "@/components/providers/LocaleProvider";

function Stat({
  title,
  value,
  Icon,
  note,
}: {
  title: string;
  value: string;
  Icon: LucideIcon;
  note: string;
}) {
  const gradients = [
    "from-amber-500/10 to-amber-500/0",
    "from-emerald-500/10 to-emerald-500/0",
    "from-red-500/10 to-red-500/0",
    "from-sky-500/10 to-sky-500/0",
  ];
  return (
    <div className={`rounded-3xl border border-zinc-200/80 bg-linear-to-br p-5 shadow-sm shadow-zinc-900/8 ${gradients[value.length % gradients.length]}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm text-zinc-600">{title}</div>
          <div className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 tabular-nums">
            {value}
          </div>
          <div className="mt-2 text-xs leading-relaxed text-zinc-500">{note}</div>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-zinc-900 text-white shadow-sm shadow-zinc-900/15">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export function DashboardHome() {
  const { locale, t } = useLocale();
  const notifications =
    locale === "pashto"
      ? [
          {
            id: "n1",
            title: "د شپې شيفټ بیاکتنه",
            body: "د راتلونکې اوونۍ درې کارکوونکي باید خپل HSE کارتونه نوي کړي.",
            createdIso: "2026-05-03T04:05:00.000Z",
            kind: "warning" as const,
          },
          {
            id: "n2",
            title: "د پرزې راتګ",
            body: "د Dumper هایدرولیک فلټر فرمایش مرکزي ګودام ته ورسېد.",
            createdIso: "2026-05-02T12:42:00.000Z",
            kind: "info" as const,
          },
          {
            id: "n3",
            title: "د خوندیتوب راپور تایید شو",
            body: "د تېرې اوونۍ ثبت شوې واړه پېښې پرته له جدي حادثې تړل شوې دي.",
            createdIso: "2026-05-01T08:20:00.000Z",
            kind: "success" as const,
          },
          {
            id: "n4",
            title: "د روزنې یادونه",
            body: "د اپرېټرانو لپاره د ګاز مشعل کارونې ورکشاپ د روانې اوونۍ پنجشنبه دی.",
            createdIso: "2026-04-30T15:06:00.000Z",
            kind: "info" as const,
          },
        ]
      : [
          {
            id: "n1",
            title: "بازبینی شیفت شب",
            body: "سه نفر شیفت شب هفته آینده باید کارت HSE را تجدید کنند.",
            createdIso: "2026-05-03T04:05:00.000Z",
            kind: "warning" as const,
          },
          {
            id: "n2",
            title: "ورود قطعه یدکی",
            body: "سفارش فیلتر هیدرولیک Dumper به انبار مرکزی رسید.",
            createdIso: "2026-05-02T12:42:00.000Z",
            kind: "info" as const,
          },
          {
            id: "n3",
            title: "گزارش ایمنی تایید شد",
            body: "آمار حوادث جزئی ثبت‌شده در هفته گذشته بدون سانحه سنگین است.",
            createdIso: "2026-05-01T08:20:00.000Z",
            kind: "success" as const,
          },
          {
            id: "n4",
            title: "یادآوری آموزش",
            body: "کارگاه کار با گاز مشعل برای اپراتورها، پنجشنبه هفته جاری برگزار می‌شود.",
            createdIso: "2026-04-30T15:06:00.000Z",
            kind: "info" as const,
          },
        ];

  const copy =
    locale === "pashto"
      ? {
          heroTitle: "د اجرايوي مديريت مرکزي ډشبورډ",
          heroBody:
            "د بشري منابعو، مالي، تدارکاتو، لوژستیک او ګودام ټول مهم شاخصونه په يو ځای کې وڅارئ.",
          heroBadges: [
            "۳ فعاله ساحوي شيفټونه",
            "۷ بحراني توکي د تعقيب لاندې",
            "۹۶٪ د ورځني پلان بشپړوالی",
          ],
          opsTitle: "عملياتي تمرکز",
          opsCards: [
            { title: "مالي جريان", value: formatCurrencyAFN(4_430_000, locale), note: "خالص عملياتي ګټه تر دې شېبې", icon: Wallet },
            { title: "لوژستیک استول", value: "12", note: "نن ثبت شوي فعال انتقالات", icon: Truck },
            { title: "بحراني موجودي", value: "4", note: "هغه اقلام چې د بيا امر حد ته نږدې دي", icon: Boxes },
            { title: "سوخت څارنه", value: formatPercent(82, locale), note: "د اونۍ د سوخت مصرف د پلان په حدودو کې", icon: Fuel },
          ],
          departments: "د څانګو وضعيت",
          deptRows: [
            ["بشري منابع", "معاشات د تاييد وروستي پړاو کې", "94%"],
            ["مالي", "د مې مياشت د بودجې سوځېدنه تر پلان لاندې", "67%"],
            ["تدارکات", "۳ عاجلې غوښتنې د پېرود امر ته منتظرې دي", "81%"],
            ["لوژستیک", "د شپې شيفټ لپاره ۲ لارې ځنډ لري", "76%"],
            ["ګودام", "۴ اقلام د بيا تهيې لپاره سور نښه لري", "72%"],
          ],
          pipelineTitle: "د نن ورځې مهم اقدامونه",
          pipelineItems: [
            ["معاشات", "۲۳ فايلونه د CFO تاييد ته منتظر دي"],
            ["خريد", "د چاودېدونکو موادو لپاره عاجل RFQ پرانيستی دی"],
            ["مسير", "د بامیان بار وړلو دويمه دوره د ۱۴:۳۰ لپاره پلان شوې"],
          ],
          quickLinks: "مستقيم لاسرسی",
          links: [
            ["/dashboard/hr/overview", "HR ډشبورډ"],
            ["/dashboard/finance/overview", "مالي ډشبورډ"],
            ["/dashboard/procurement/overview", "تدارکاتي ډشبورډ"],
            ["/dashboard/logistics/overview", "لوژستیک ډشبورډ"],
            ["/dashboard/inventory/overview", "د ګودام ډشبورډ"],
          ],
        }
      : {
          heroTitle: "داشبورد مرکزی مدیریت اجرایی",
          heroBody:
            "شاخص‌های منابع بشری، مالی، تدارکات، لوجستیک و انبار را در یک نمای عملیاتی واحد دنبال کنید.",
          heroBadges: [
            "۳ شیفت ساحوی فعال",
            "۷ قلم بحرانی زیر پیگیری",
            "۹۶٪ تکمیل برنامه روز",
          ],
          opsTitle: "تمرکز عملیاتی",
          opsCards: [
            { title: "جریان مالی", value: formatCurrencyAFN(4_430_000, locale), note: "سود عملیاتی خالص تا این لحظه", icon: Wallet },
            { title: "ارسال لوجستیک", value: "12", note: "انتقالات فعال ثبت‌شده برای امروز", icon: Truck },
            { title: "موجودی بحرانی", value: "4", note: "اقلام نزدیک به نقطه سفارش مجدد", icon: Boxes },
            { title: "کنترل سوخت", value: formatPercent(82, locale), note: "مصرف هفتگی در محدوده پلان", icon: Fuel },
          ],
          departments: "وضعیت واحدها",
          deptRows: [
            ["منابع بشری", "معاشات در مرحله نهایی تایید", "94%"],
            ["مالی", "مصرف بودجه ماه ثور پایین‌تر از پلان", "67%"],
            ["تدارکات", "۳ درخواست عاجل منتظر تبدیل به PO", "81%"],
            ["لوجستیک", "۲ مسیر شیفت شب با تاخیر مواجه است", "76%"],
            ["انبار", "۴ قلم نیازمند تدارک مجدد علامت‌گذاری شده", "72%"],
          ],
          pipelineTitle: "اقدام‌های کلیدی امروز",
          pipelineItems: [
            ["معاشات", "۲۳ فایل منتظر تایید نهایی CFO"],
            ["خرید", "RFQ عاجل مواد انفجاری باز است"],
            ["مسیر", "دور دوم بارگیری بامیان برای ۱۴:۳۰ برنامه‌ریزی شده"],
          ],
          quickLinks: "دسترسی مستقیم",
          links: [
            ["/dashboard/hr/overview", "داشبورد HR"],
            ["/dashboard/finance/overview", "داشبورد مالی"],
            ["/dashboard/procurement/overview", "داشبورد تدارکات"],
            ["/dashboard/logistics/overview", "داشبورد لوجستیک"],
            ["/dashboard/inventory/overview", "داشبورد انبار"],
          ],
        };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] border border-zinc-200/80 bg-[linear-gradient(135deg,rgba(39,39,42,0.96),rgba(63,63,70,0.92)),radial-gradient(circle_at_top_right,rgba(250,204,21,0.28),transparent_30%)] p-6 text-white shadow-[0_24px_60px_-28px_rgba(24,24,27,0.55)]">
        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div>
            <div className="inline-flex rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white/75">
              ERP COMMAND CENTER
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight">{copy.heroTitle}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/75">{copy.heroBody}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {copy.heroBadges.map((badge) => (
                <div key={badge} className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-sm text-white/85">
                  {badge}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/7 p-5 backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white/85">{copy.pipelineTitle}</div>
              <ShieldAlert className="h-4.5 w-4.5 text-amber-300" />
            </div>
            <div className="mt-4 space-y-3">
              {copy.pipelineItems.map(([titleText, body]) => (
                <div key={titleText} className="rounded-2xl border border-white/10 bg-black/10 p-3">
                  <div className="text-sm font-semibold text-white">{titleText}</div>
                  <div className="mt-1 text-sm leading-relaxed text-white/70">{body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          title={t("overview.cards.employees")}
          value={formatNumber(dashboardSummary.totalEmployees, locale)}
          note={locale === "pashto" ? "د مرکزي دفتر او ساحوي واحدونو ټول پرسونل" : "مجموع پرسونل دفتر مرکزی و واحدهای ساحوی"}
          Icon={Users}
        />
        <Stat
          title={t("overview.cards.present")}
          value={formatNumber(dashboardSummary.presentToday, locale)}
          note={locale === "pashto" ? "تر دې ساعت پورې ثبت شوې حاضري" : "حضور ثبت‌شده تا این ساعت"}
          Icon={UserCheck}
        />
        <Stat
          title={t("overview.cards.absent")}
          value={formatNumber(dashboardSummary.absentToday, locale)}
          note={locale === "pashto" ? "غيرحاضر او د تأخير قضیې يوځای" : "غیبت و تاخیرهای نیازمند رسیدگی"}
          Icon={UserX}
        />
        <Stat
          title={t("overview.cards.openLeaves")}
          value={formatNumber(dashboardSummary.openLeaveRequests, locale)}
          note={locale === "pashto" ? "درخواستونه چې نهايي پرېکړې ته منتظر دي" : "درخواست‌های منتظر تصمیم نهایی"}
          Icon={ClipboardCheck}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {copy.opsCards.map((item) => (
          <Stat key={item.title} title={item.title} value={item.value} note={item.note} Icon={item.icon} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        <Card
          className="xl:col-span-3"
          title={t("overview.weekly")}
          action={
            <Link href="/dashboard/hr/attendance" className="text-sm font-medium text-brand-950 underline-offset-4 hover:underline">
              {t("common.viewDetails")}
            </Link>
          }
        >
          <WeeklyAttendanceChart />
        </Card>
        <Card className="xl:col-span-2" title={t("overview.notifications")}>
          <NotificationsPanel notifications={notifications} />
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title={copy.departments}>
          <div className="space-y-3">
            {copy.deptRows.map(([name, body, score]) => (
              <div key={name} className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold text-zinc-950">{name}</div>
                  <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-600">
                    {score}
                  </div>
                </div>
                <div className="mt-2 text-sm leading-relaxed text-zinc-600">{body}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title={copy.quickLinks}>
          <div className="space-y-3">
            {copy.links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between rounded-2xl border border-zinc-200/80 bg-zinc-50/80 px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
              >
                <span>{label}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
