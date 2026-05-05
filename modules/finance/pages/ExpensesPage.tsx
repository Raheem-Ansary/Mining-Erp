"use client";

import { StatusTable } from "@/modules/shared/components/StatusTable";
import { useLocale } from "@/components/providers/LocaleProvider";

export function FinanceExpensesPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const rows = isPashto
    ? [
        { category: "لوژستیک تيل", amount: "AFN 1,420,000", date: "15 ثور", status: "approved" },
        { category: "د ماشین پرزې", amount: "AFN 910,000", date: "13 ثور", status: "pending" },
        { category: "اداري لګښتونه", amount: "AFN 270,000", date: "11 ثور", status: "approved" },
      ]
    : [
        { category: "سوخت لوجستیک", amount: "AFN 1,420,000", date: "15 ثور", status: "approved" },
        { category: "پرزه‌جات ماشین‌آلات", amount: "AFN 910,000", date: "13 ثور", status: "pending" },
        { category: "مصارف اداری", amount: "AFN 270,000", date: "11 ثور", status: "approved" },
      ];

  return (
    <StatusTable
      title={isPashto ? "د مصارفو ليست" : "لیست مصارف"}
      description={isPashto ? "منظور شوي او په بیاکتنه کې روان مصارف." : "مصارف منظورشده و موارد در حال بازبینی."}
      columns={isPashto ? ["بخش", "مقدار", "نېټه", "حالت"] : ["بخش", "مبلغ", "تاریخ", "وضعیت"]}
      rows={rows}
    />
  );
}
