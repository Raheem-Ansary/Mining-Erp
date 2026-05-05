"use client";

import { StatusTable } from "@/modules/shared/components/StatusTable";
import { useLocale } from "@/components/providers/LocaleProvider";

export function FinanceReportsPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const rows = isPashto
    ? [
        { report: "د ګټې او تاوان راپور", period: "1405/01", status: "approved" },
        { report: "بیلانس شیت", period: "1405/01", status: "approved" },
        { report: "د نغدو جريان", period: "1405/01", status: "pending" },
      ]
    : [
        { report: "سود و زیان", period: "1405/01", status: "approved" },
        { report: "ترازنامه", period: "1405/01", status: "approved" },
        { report: "جریان نقدی", period: "1405/01", status: "pending" },
      ];

  return (
    <StatusTable
      title={isPashto ? "مالي راپورونه" : "راپورهای مالی"}
      description={isPashto ? "راپورونه چې د مديريت، بودجې او حسابرسي لپاره چمتو دي." : "راپورهای آماده برای مدیریت، بودجه و حسابرسی."}
      columns={isPashto ? ["راپور", "موده", "حالت"] : ["راپور", "دوره", "وضعیت"]}
      rows={rows}
    />
  );
}
