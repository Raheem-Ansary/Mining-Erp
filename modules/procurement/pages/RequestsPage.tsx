"use client";

import { StatusTable } from "@/modules/shared/components/StatusTable";
import { useLocale } from "@/components/providers/LocaleProvider";

export function ProcurementRequestsPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const rows = isPashto
    ? [
        { item: "هیدرولیک فلټر", requester: "عبدالرحمن", date: "15 ثور", status: "pending" },
        { item: "Dumper ټایر", requester: "زبير", date: "14 ثور", status: "approved" },
        { item: "صنعتي کیبل", requester: "فاطمه", date: "13 ثور", status: "rejected" },
      ]
    : [
        { item: "فیلتر هیدرولیک", requester: "عبدالرحمن", date: "15 ثور", status: "pending" },
        { item: "لاستیک Dumper", requester: "زبیر", date: "14 ثور", status: "approved" },
        { item: "کابل صنعتی", requester: "فاطمه", date: "13 ثور", status: "rejected" },
      ];

  return (
    <StatusTable
      title={isPashto ? "د پېرود غوښتنې" : "درخواست‌های خرید"}
      description={isPashto ? "هغه غوښتنې چې د RFQ يا PO ته د بدلېدو په تمه دي." : "درخواست‌هایی که در انتظار RFQ یا تبدیل به سفارش هستند."}
      columns={isPashto ? ["قلم", "غوښتونکی", "نېټه", "حالت"] : ["آیتم", "درخواست‌کننده", "تاریخ", "وضعیت"]}
      rows={rows}
    />
  );
}
