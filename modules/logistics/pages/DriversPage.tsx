"use client";

import { StatusTable } from "@/modules/shared/components/StatusTable";
import { useLocale } from "@/components/providers/LocaleProvider";

export function LogisticsDriversPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const rows = isPashto
    ? [
        { name: "احمد", license: "A-2234", phone: "+93 79 777 1122", status: "present" },
        { name: "زبير", license: "B-9921", phone: "+93 78 551 9900", status: "late" },
        { name: "عبدالرحمن", license: "C-2010", phone: "+93 79 200 3001", status: "absent" },
      ]
    : [
        { name: "احمد", license: "A-2234", phone: "+93 79 777 1122", status: "present" },
        { name: "زبیر", license: "B-9921", phone: "+93 78 551 9900", status: "late" },
        { name: "عبدالرحمن", license: "C-2010", phone: "+93 79 200 3001", status: "absent" },
      ];

  return (
    <StatusTable
      title={isPashto ? "د چلوونکو مديريت" : "مدیریت رانندگان"}
      description={isPashto ? "فعال چلوونکي، لایسنس او د شيفټ وضعيت." : "رانندگان فعال، لایسنس و وضعیت شیفت."}
      columns={isPashto ? ["نوم", "لایسنس", "تماس", "حالت"] : ["نام", "لایسنس", "تماس", "وضعیت"]}
      rows={rows}
    />
  );
}
