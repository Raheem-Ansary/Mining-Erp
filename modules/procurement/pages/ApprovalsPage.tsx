"use client";

import { StatusTable } from "@/modules/shared/components/StatusTable";
import { useLocale } from "@/components/providers/LocaleProvider";

export function ProcurementApprovalsPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const rows = isPashto
    ? [
        { step: "تخنيکي بیاکتنه", owner: "د ساحې مدير", status: "approved" },
        { step: "مالي بیاکتنه", owner: "مالي مدير", status: "pending" },
        { step: "وروستۍ تایید", owner: "عمومي مدير", status: "pending" },
      ]
    : [
        { step: "بررسی فنی", owner: "مدیر ساحه", status: "approved" },
        { step: "بررسی مالی", owner: "مدیر مالی", status: "pending" },
        { step: "تایید نهایی", owner: "مدیر عمومی", status: "pending" },
      ];

  return (
    <StatusTable
      title={isPashto ? "د تاییدیو جریان" : "جریان تاییدیه‌ها"}
      description={isPashto ? "پړاوونه چې هره غوښتنه تر منظورۍ پورې وهي." : "مراحلی که هر درخواست تا تصویب نهایی طی می‌کند."}
      columns={isPashto ? ["مرحله", "مسئول", "حالت"] : ["مرحله", "مسئول", "وضعیت"]}
      rows={rows}
    />
  );
}
