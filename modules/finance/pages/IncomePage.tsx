"use client";

import { StatusTable } from "@/modules/shared/components/StatusTable";
import { useLocale } from "@/components/providers/LocaleProvider";

export function FinanceIncomePage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const rows = isPashto
    ? [
        { source: "د مسو کنسانتره پلور", amount: "AFN 4,800,000", date: "16 ثور", status: "approved" },
        { source: "د اوسپنې ډبرې پلور", amount: "AFN 2,950,000", date: "14 ثور", status: "approved" },
        { source: "د پروسس خدمتونه", amount: "AFN 1,100,000", date: "13 ثور", status: "pending" },
      ]
    : [
        { source: "فروش کنسانتره مس", amount: "AFN 4,800,000", date: "16 ثور", status: "approved" },
        { source: "فروش سنگ آهن", amount: "AFN 2,950,000", date: "14 ثور", status: "approved" },
        { source: "خدمات پروسس", amount: "AFN 1,100,000", date: "13 ثور", status: "pending" },
      ];

  return (
    <StatusTable
      title={isPashto ? "د عوايدو ثبت" : "ثبت عواید"}
      description={isPashto ? "ثبت شوې او د تایید لاندې عایداتي معاملې." : "معاملات عایدی ثبت‌شده و در حال تایید."}
      columns={isPashto ? ["سرچینه", "مقدار", "نېټه", "حالت"] : ["منبع", "مبلغ", "تاریخ", "وضعیت"]}
      rows={rows}
    />
  );
}
