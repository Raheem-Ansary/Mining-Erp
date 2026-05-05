"use client";

import { Card } from "@/components/ui/Card";
import { useLocale } from "@/components/providers/LocaleProvider";
import { KpiCards } from "@/modules/shared/components/KpiCards";
import { StatusTable } from "@/modules/shared/components/StatusTable";

export function HrOverviewPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";

  const kpis = isPashto
    ? [
        { label: "ټول کارکوونکي", value: 48, note: "مرکزي دفتر او ساحوي شيفټونه", tone: "slate" as const },
        { label: "د معاشاتو چمتووالی", value: "92%", note: "د مياشتې فايلونه تر وروستي کتنې پورې", tone: "emerald" as const },
        { label: "خلاصې رخصتۍ", value: 5, note: "۲ قضیې عاجلې پرېکړې ته اړتیا لري", tone: "amber" as const },
        { label: "روزنيز انطباق", value: "88%", note: "د HSE سندونه تازه شوي", tone: "sky" as const },
      ]
    : [
        { label: "کل کارکنان", value: 48, note: "دفتر مرکزی و شیفت‌های ساحوی", tone: "slate" as const },
        { label: "آمادگی معاشات", value: "92%", note: "فایل‌های ماه تا مرحله بازبینی نهایی", tone: "emerald" as const },
        { label: "رخصتی‌های باز", value: 5, note: "۲ مورد نیازمند تصمیم فوری", tone: "amber" as const },
        { label: "انطباق آموزشی", value: "88%", note: "تمدید اسناد HSE پیگیری شده", tone: "sky" as const },
      ];

  const approvals = isPashto
    ? [
        { item: "د مې معاشات", owner: "مريم نوري", due: "نن", status: "pending" },
        { item: "د شپې شيفټ اضافه کاري", owner: "فاطمه رسولي", due: "نن", status: "approved" },
        { item: "د خوندیتوب روزنه", owner: "نصير پارسا", due: "سبا", status: "pending" },
      ]
    : [
        { item: "معاشات ماه ثور", owner: "مریم نوری", due: "امروز", status: "pending" },
        { item: "اضافه‌کاری شیفت شب", owner: "فاطمه رسولی", due: "امروز", status: "approved" },
        { item: "آموزش ایمنی معدن", owner: "نصیر پارسا", due: "فردا", status: "pending" },
      ];

  const copy = isPashto
    ? {
        title: "د بشري منابعو عملياتي مرکز",
        body:
          "حاضري، معاشات، رخصتۍ او د استخدام فشار په يو ځای کې وګورئ تر څو د شيفټونو د کارکوونکو کمښت ژر تشخيص شي.",
        actionsTitle: "د ورځې مهم کارونه",
        actions: [
          "۲۳ د معاشاتو دوسیې د وروستي مالي تاييد لپاره تيارې دي",
          "۳ خالي بستونه د فیلډ اپرېشن لپاره د مرکې په پړاو کې دي",
          "د شپې شيفټ ۴ کارکوونکي د HSE د تجدید ورکشاپ ته اړتیا لري",
        ],
        splitTitle: "د کاري ځواک وېش",
        splitRows: [
          ["ساحوي عمليات", "27"],
          ["پروسس او فابریکه", "11"],
          ["اداري او ملاتړ", "10"],
        ],
      }
    : {
        title: "مرکز عملیاتی منابع بشری",
        body:
          "حضور، معاشات، رخصتی‌ها و فشار استخدام را در یک نمای واحد دنبال کنید تا کمبود نیروی شیفت‌ها سریع تشخیص شود.",
        actionsTitle: "اقدام‌های مهم امروز",
        actions: [
          "۲۳ دوسیه معاشات برای تایید نهایی مالی آماده است",
          "۳ بست خالی برای عملیات ساحوی در مرحله مصاحبه قرار دارد",
          "۴ کارمند شیفت شب نیازمند ورکشاپ تجدید HSE هستند",
        ],
        splitTitle: "ترکیب نیروی کار",
        splitRows: [
          ["عملیات ساحوی", "27"],
          ["پروسس و فابریکه", "11"],
          ["اداری و پشتیبانی", "10"],
        ],
      };

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-zinc-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(241,245,249,0.92))] p-6 shadow-[0_24px_60px_-28px_rgba(24,24,27,0.25)]">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">HR OVERVIEW</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">{copy.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600">{copy.body}</p>
      </section>

      <KpiCards items={kpis} />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <StatusTable
          title={copy.actionsTitle}
          description={isPashto ? "هغه موضوعات چې د نن ورځې کاري پرېکړې ته اړتیا لري." : "موضوعاتی که نیازمند تصمیم کاری در جریان روز هستند."}
          columns={isPashto ? ["موضوع", "مسئول", "مهلت", "حالت"] : ["موضوع", "مسئول", "مهلت", "وضعیت"]}
          rows={approvals}
        />
        <Card title={copy.splitTitle}>
          <div className="space-y-3">
            {copy.splitRows.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl border border-zinc-200/80 bg-zinc-50/80 px-4 py-3">
                <span className="text-sm font-medium text-zinc-700">{label}</span>
                <span className="text-lg font-semibold text-zinc-950">{value}</span>
              </div>
            ))}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
              {copy.actions[2]}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
