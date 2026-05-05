"use client";

import { StatusTable } from "@/modules/shared/components/StatusTable";
import { useLocale } from "@/components/providers/LocaleProvider";

export function LogisticsFuelPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const rows = [
    { vehicle: "KBL-4432", liters: "420L", date: "16 ثور", status: "approved" },
    { vehicle: "BLH-3201", liters: "310L", date: "14 ثور", status: "pending" },
  ];

  return (
    <StatusTable
      title={isPashto ? "د سوخت تعقيب" : "پیگیری سوخت"}
      description={isPashto ? "وروستي سوخت‌ګیرۍ او د تایید حالت." : "آخرین سوخت‌گیری‌ها و وضعیت تایید آنها."}
      columns={isPashto ? ["وسیله", "حجم", "نېټه", "حالت"] : ["وسیله", "حجم", "تاریخ", "وضعیت"]}
      rows={rows}
    />
  );
}
