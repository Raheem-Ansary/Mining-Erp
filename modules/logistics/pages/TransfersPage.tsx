"use client";

import { StatusTable } from "@/modules/shared/components/StatusTable";
import { useLocale } from "@/components/providers/LocaleProvider";

export function LogisticsTransfersPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const rows = isPashto
    ? [
        { from: "کابل ګودام", to: "بامیان کان", load: "پرزې", status: "present" },
        { from: "کان", to: "فابریکه", load: "خام ډبره", status: "late" },
      ]
    : [
        { from: "انبار کابل", to: "معدن بامیان", load: "قطعات یدکی", status: "present" },
        { from: "معدن", to: "کارخانه", load: "سنگ خام", status: "late" },
      ];

  return (
    <StatusTable
      title="انتقالات"
      description={isPashto ? "د روانو انتقالاتو وضعيت له مبدا تر مقصد پورې." : "وضعیت انتقالات جاری از مبدا تا مقصد."}
      columns={isPashto ? ["مبدا", "مقصد", "بار", "حالت"] : ["مبدا", "مقصد", "بار", "وضعیت"]}
      rows={rows}
    />
  );
}
