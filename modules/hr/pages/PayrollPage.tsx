"use client";

import { StatusTable } from "@/modules/shared/components/StatusTable";
import { useLocale } from "@/components/providers/LocaleProvider";

export function HrPayrollPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const rows = isPashto
    ? [
        { name: "احمد", role: "سرپرست", amount: "AFN 55,000", status: "approved" },
        { name: "عبدالرحمن", role: "اپراتور", amount: "AFN 42,000", status: "pending" },
        { name: "فاطمه", role: "HSE", amount: "AFN 48,000", status: "approved" },
        { name: "زبير", role: "چلوونکی", amount: "AFN 36,000", status: "pending" },
      ]
    : [
        { name: "احمد", role: "سرپرست", amount: "AFN 55,000", status: "approved" },
        { name: "عبدالرحمن", role: "اپراتور", amount: "AFN 42,000", status: "pending" },
        { name: "فاطمه", role: "HSE", amount: "AFN 48,000", status: "approved" },
        { name: "زبیر", role: "راننده", amount: "AFN 36,000", status: "pending" },
      ];

  return (
    <StatusTable
      title={isPashto ? "د معاشاتو مخکتنه" : "پیش‌نمایش معاشات"}
      description={isPashto ? "روانه بسته او د تایید په تمه معاشات." : "بسته جاری معاشات و موارد منتظر تایید."}
      columns={isPashto ? ["نوم", "دنده", "مقدار", "حالت"] : ["نام", "سمت", "مبلغ", "وضعیت"]}
      rows={rows}
    />
  );
}
