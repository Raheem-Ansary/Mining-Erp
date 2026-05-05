"use client";

import { StatusTable } from "@/modules/shared/components/StatusTable";
import { useLocale } from "@/components/providers/LocaleProvider";

export function ProcurementOrdersPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const rows = isPashto
    ? [
        { order: "PO-1001", supplier: "افغان ماشین", amount: "AFN 1,240,000", status: "approved" },
        { order: "PO-1002", supplier: "تجهیزات پامیر", amount: "AFN 820,000", status: "pending" },
      ]
    : [
        { order: "PO-1001", supplier: "شرکت افغان ماشین", amount: "AFN 1,240,000", status: "approved" },
        { order: "PO-1002", supplier: "تجهیزات پامیر", amount: "AFN 820,000", status: "pending" },
      ];

  return (
    <StatusTable
      title={isPashto ? "سپارښتنې" : "سفارشات"}
      description={isPashto ? "منظور شوي او د لېږد په حال کې پېرود امرونه." : "سفارشات تاییدشده و در حال پیگیری حمل."}
      columns={isPashto ? ["شمېره", "عرضه کوونکی", "مقدار", "حالت"] : ["شماره", "تامین‌کننده", "مبلغ", "وضعیت"]}
      rows={rows}
    />
  );
}
