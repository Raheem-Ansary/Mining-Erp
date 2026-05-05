"use client";

import { StatusTable } from "@/modules/shared/components/StatusTable";
import { useLocale } from "@/components/providers/LocaleProvider";

export function LogisticsRoutesPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const rows = isPashto
    ? [
        { route: "مرکزي کان → پروسس", distance: "32km", status: "present" },
        { route: "کابل ګودام → عملياتي ساحه", distance: "18km", status: "late" },
        { route: "فابریکه → د صادراتو ساحه", distance: "46km", status: "present" },
      ]
    : [
        { route: "معدن مرکزی → کارخانه پروسس", distance: "32km", status: "present" },
        { route: "انبار کابل → ساحه عملیاتی", distance: "18km", status: "late" },
        { route: "کارخانه → ساحه صادرات", distance: "46km", status: "present" },
      ];

  return (
    <StatusTable
      title={isPashto ? "مسيرونه" : "مسیرها"}
      description={isPashto ? "فعاله لارې، واټن او ځنډونه." : "مسیرهای فعال، فاصله و وضعیت تاخیر."}
      columns={isPashto ? ["مسير", "واټن", "حالت"] : ["مسیر", "مسافت", "وضعیت"]}
      rows={rows}
    />
  );
}
