"use client";

import { StatusTable } from "@/modules/shared/components/StatusTable";
import { useLocale } from "@/components/providers/LocaleProvider";

export function LogisticsVehiclesPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const rows = isPashto
    ? [
        { plate: "KBL-4432", type: "Dumper", driver: "احمد", fuel: "76%", status: "present" },
        { plate: "KBL-1990", type: "Truck", driver: "زبير", fuel: "42%", status: "late" },
        { plate: "BLH-3201", type: "Pickup", driver: "عبدالرحمن", fuel: "18%", status: "absent" },
      ]
    : [
        { plate: "KBL-4432", type: "Dumper", driver: "احمد", fuel: "76%", status: "present" },
        { plate: "KBL-1990", type: "Truck", driver: "زبیر", fuel: "42%", status: "late" },
        { plate: "BLH-3201", type: "Pickup", driver: "عبدالرحمن", fuel: "18%", status: "absent" },
      ];

  return (
    <StatusTable
      title="وسایط"
      description={isPashto ? "فعال، ځنډېدلي او سرویس ته اړ وسایط." : "نمای وسایط فعال، تاخیردار و نیازمند سرویس."}
      columns={isPashto ? ["پلاک", "ډول", "چلوونکی", "سوخت", "حالت"] : ["پلاک", "نوع", "راننده", "سوخت", "وضعیت"]}
      rows={rows}
    />
  );
}
