"use client";

import { StatusTable } from "@/modules/shared/components/StatusTable";
import { useLocale } from "@/components/providers/LocaleProvider";

export function HrPerformancePage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const rows = isPashto
    ? [
        { name: "احمد", score: "92", period: "1405/01", status: "approved" },
        { name: "فاطمه", score: "88", period: "1405/01", status: "approved" },
        { name: "زبير", score: "73", period: "1405/01", status: "pending" },
      ]
    : [
        { name: "احمد", score: "92", period: "1405/01", status: "approved" },
        { name: "فاطمه", score: "88", period: "1405/01", status: "approved" },
        { name: "زبیر", score: "73", period: "1405/01", status: "pending" },
      ];

  return (
    <StatusTable
      title={isPashto ? "د کړنې ارزونه" : "ارزیابی عملکرد"}
      description={isPashto ? "وروستۍ ارزونې او هغه موارد چې بیاکتنې ته اړتیا لري." : "آخرین امتیازهای ارزیابی و موارد نیازمند بازبینی."}
      columns={isPashto ? ["نوم", "نمره", "دوره", "حالت"] : ["نام", "نمره", "دوره", "وضعیت"]}
      rows={rows}
    />
  );
}
