"use client";

import { StatusTable } from "@/modules/shared/components/StatusTable";
import { useLocale } from "@/components/providers/LocaleProvider";

export function InventoryInboundPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const rows = isPashto
    ? [
        { item: "مقاوم دستکشونه", qty: "120", date: "14 ثور", status: "approved" },
        { item: "هوايي فلټر", qty: "60", date: "13 ثور", status: "pending" },
      ]
    : [
        { item: "دستکش مقاوم", qty: "120", date: "14 ثور", status: "approved" },
        { item: "فیلتر هوا", qty: "60", date: "13 ثور", status: "pending" },
      ];

  return (
    <StatusTable
      title={isPashto ? "د اجناسو ورود" : "ورود اجناس"}
      description={isPashto ? "وروستي داخل شوي توکي او د تایید حالت." : "آخرین دریافت‌های انبار و وضعیت تایید آنها."}
      columns={isPashto ? ["قلم", "تعداد", "نېټه", "حالت"] : ["آیتم", "تعداد", "تاریخ", "وضعیت"]}
      rows={rows}
    />
  );
}
