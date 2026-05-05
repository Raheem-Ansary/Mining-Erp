"use client";

import { StatusTable } from "@/modules/shared/components/StatusTable";
import { useLocale } from "@/components/providers/LocaleProvider";

export function InventoryOutboundPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const rows = isPashto
    ? [
        { item: "صنعتي غوړي", qty: "40", date: "15 ثور", status: "approved" },
        { item: "د خوندیتوب خولۍ", qty: "24", date: "13 ثور", status: "approved" },
      ]
    : [
        { item: "روغن صنعتی", qty: "40", date: "15 ثور", status: "approved" },
        { item: "کلاه ایمنی", qty: "24", date: "13 ثور", status: "approved" },
      ];

  return (
    <StatusTable
      title={isPashto ? "د اجناسو خروج" : "خروج اجناس"}
      description={isPashto ? "توکي چې د عملیاتو او شيفټونو لپاره صادر شوي دي." : "اقلام صادرشده برای عملیات و شیفت‌های کاری."}
      columns={isPashto ? ["قلم", "تعداد", "نېټه", "حالت"] : ["آیتم", "تعداد", "تاریخ", "وضعیت"]}
      rows={rows}
    />
  );
}
