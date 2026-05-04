"use client";

import dayConfigured, { formatJalali, formatJalaliDateShort } from "@/lib/dayjs";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";

/** نمای مشترک تاریخ شمسی + ساعت محلی؛ ساعت با ارقام فارسی */
export const JalaliClock: FC<{ compact?: boolean }> = ({ compact }) => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setTick((x) => x + 1), 1000 * 60);
    return () => window.clearInterval(t);
  }, []);

  const { dateLong, dateShort, timeText } = useMemo(() => {
    void tick;
    const dateLong = formatJalali(dayConfigured(), "dddd، D MMMM YYYY");
    const dateShort = formatJalaliDateShort(dayConfigured());

    try {
      return {
        dateLong,
        dateShort,
        timeText: new Intl.DateTimeFormat("fa-AF", {
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h23",
        }).format(new Date()),
      };
    } catch {
      return {
        dateLong,
        dateShort,
        timeText: dayConfigured().format("HH:mm"),
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  if (compact) {
    return (
      <div className="text-end leading-tight" dir="rtl">
        <div className="text-xs text-zinc-500">{dateShort}</div>
        <div className="text-sm font-semibold text-zinc-900 tabular-nums" dir="ltr">
          {timeText}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm shadow-sm">
      <div className="text-xs text-zinc-500">تاریخ (شمسی)</div>
      <div className="mt-1 font-semibold text-zinc-900">{dateLong}</div>
      <div className="mt-2 text-xs text-zinc-500">ساعت محلی سیستم</div>
      <div className="mt-1 text-lg font-bold text-brand-950 tabular-nums" dir="ltr">
        {timeText}
      </div>
    </div>
  );
};
