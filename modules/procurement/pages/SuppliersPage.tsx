"use client";

import { StatusTable } from "@/modules/shared/components/StatusTable";
import { useLocale } from "@/components/providers/LocaleProvider";

export function ProcurementSuppliersPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const rows = [
    { name: "افغان ماشین", contact: "+93 79 221 1000", city: "کابل", status: "approved" },
    { name: "لوژستیک هریرود", contact: "+93 78 448 8821", city: "هرات", status: "approved" },
    { name: "تجهیزات پامیر", contact: "+93 79 114 3090", city: isPashto ? "مزار" : "مزار", status: "pending" },
  ];

  return (
    <StatusTable
      title={isPashto ? "د عرضه کوونکو فهرست" : "فهرست تامین‌کنندگان"}
      description={isPashto ? "منظور شوي، فعال او د اسنادو تر تعقيب لاندې عرضه کوونکي." : "تامین‌کنندگان فعال، تاییدشده و در حال تکمیل اسناد."}
      columns={isPashto ? ["نوم", "تماس", "ښار", "حالت"] : ["نام", "تماس", "شهر", "وضعیت"]}
      rows={rows}
    />
  );
}
