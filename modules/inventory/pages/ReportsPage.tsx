"use client";

import { StatusTable } from "@/modules/shared/components/StatusTable";
import { useLocale } from "@/components/providers/LocaleProvider";

export function InventoryReportsPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const rows = isPashto
    ? [
        { report: "د موجودۍ د کمښت راپور", period: "روانه اوونۍ", status: "approved" },
        { report: "د توکو دوران", period: "روانه مياشت", status: "pending" },
      ]
    : [
        { report: "گزارش کمبود موجودی", period: "هفته جاری", status: "approved" },
        { report: "گردش کالا", period: "ماه جاری", status: "pending" },
      ];

  return (
    <StatusTable
      title={isPashto ? "د ګودام راپور" : "راپور انبار"}
      description={isPashto ? "تحليلي راپورونه د موجودۍ، دوران او کمبود لپاره." : "گزارش‌های تحلیلی موجودی، گردش و کمبود."}
      columns={isPashto ? ["راپور", "موده", "حالت"] : ["راپور", "دوره", "وضعیت"]}
      rows={rows}
    />
  );
}
