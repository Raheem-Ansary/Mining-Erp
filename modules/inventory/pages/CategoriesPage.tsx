"use client";

import { StatusTable } from "@/modules/shared/components/StatusTable";
import { useLocale } from "@/components/providers/LocaleProvider";

export function InventoryCategoriesPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const rows = isPashto
    ? [
        { category: "HSE", items: "12", status: "approved" },
        { category: "سوخت", items: "6", status: "approved" },
        { category: "پرزې", items: "24", status: "pending" },
      ]
    : [
        { category: "HSE", items: "12", status: "approved" },
        { category: "سوخت", items: "6", status: "approved" },
        { category: "قطعات", items: "24", status: "pending" },
      ];

  return (
    <StatusTable
      title={isPashto ? "کتګورۍ" : "کتگوری‌ها"}
      description={isPashto ? "د انبار د اقلامو ډلبندي او کثافت." : "دسته‌بندی اقلام انبار و تراکم هر دسته."}
      columns={isPashto ? ["کتګوري", "د اقلامو شمېر", "حالت"] : ["کتگوری", "تعداد آیتم", "وضعیت"]}
      rows={rows}
    />
  );
}
