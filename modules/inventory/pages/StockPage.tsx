"use client";

import { StatusTable } from "@/modules/shared/components/StatusTable";
import { useLocale } from "@/components/providers/LocaleProvider";

export function InventoryStockPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const rows = isPashto
    ? [
        { item: "کنټرول شوي چاودېدونکي", category: "خوندیتوب", qty: "18", status: "pending" },
        { item: "صنعتي غوړي", category: "سوخت", qty: "210", status: "approved" },
        { item: "فلټر لرونکی ماسک", category: "HSE", qty: "45", status: "approved" },
        { item: "د خوندیتوب بوټان", category: "HSE", qty: "9", status: "rejected" },
      ]
    : [
        { item: "مواد انفجاری کنترول‌شده", category: "ایمنی", qty: "18", status: "pending" },
        { item: "روغن صنعتی", category: "سوخت", qty: "210", status: "approved" },
        { item: "ماسک فیلتر دار", category: "HSE", qty: "45", status: "approved" },
        { item: "کفش ایمنی", category: "HSE", qty: "9", status: "rejected" },
      ];

  return (
    <StatusTable
      title={isPashto ? "د ګودام موجودي" : "موجودی انبار"}
      description={isPashto ? "فعاله موجودي او هغه اقلام چې د بیا امر اړتیا لري." : "موجودی فعال و اقلام نیازمند سفارش مجدد."}
      columns={isPashto ? ["قلم", "کتګوري", "تعداد", "حالت"] : ["آیتم", "کتگوری", "تعداد", "وضعیت"]}
      rows={rows}
    />
  );
}
