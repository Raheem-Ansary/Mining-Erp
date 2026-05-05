"use client";

import { KpiCards } from "@/modules/shared/components/KpiCards";
import { useLocale } from "@/components/providers/LocaleProvider";

export function FinanceBudgetPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";

  return (
    <KpiCards
      items={
        isPashto
          ? [
              { label: "کلنۍ بودجه", value: 96000000, currency: true, note: "مصوب بودجه", tone: "slate" },
              { label: "مصرف شوی", value: 64200000, currency: true, note: "تر اوسه ثبت شوی لګښت", tone: "amber" },
              { label: "پاتې بودجه", value: 31800000, currency: true, note: "د پاتې شيفټونو لپاره", tone: "emerald" },
              { label: "د مصرف کچه", value: "67%", note: "د پلان په حد کې", tone: "sky" },
            ]
          : [
              { label: "بودجه سالانه", value: 96000000, currency: true, note: "بودجه مصوب", tone: "slate" },
              { label: "مصرف شده", value: 64200000, currency: true, note: "هزینه ثبت‌شده تا امروز", tone: "amber" },
              { label: "باقیمانده", value: 31800000, currency: true, note: "برای شیفت‌ها و خریدهای باقی‌مانده", tone: "emerald" },
              { label: "درصد مصرف", value: "67%", note: "در محدوده پلان", tone: "sky" },
            ]
      }
    />
  );
}
