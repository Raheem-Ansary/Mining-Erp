"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import { formatAfghanDate } from "@/lib/format";

export const JalaliClock: FC<{ compact?: boolean }> = ({ compact }) => {
  const [tick, setTick] = useState(0);
  const { locale } = useLocale();

  useEffect(() => {
    const timer = window.setInterval(() => setTick((x) => x + 1), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const { dateLong, timeText } = useMemo(() => {
    void tick;
    const localeCode = locale === "pashto" ? "ps-AF" : "fa-AF";
    const now = new Date();
    const dateLong = formatAfghanDate(now, locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    try {
      return {
        dateLong,
        timeText: new Intl.DateTimeFormat(localeCode, {
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h23",
        }).format(now),
      };
    } catch {
      return {
        dateLong,
        timeText: now.toLocaleTimeString(localeCode, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      };
    }
  }, [locale, tick]);

  if (compact) {
    return (
      <div className="text-end leading-tight" dir="rtl">
        <div className="text-xs font-medium text-zinc-600">{dateLong}</div>
        <div className="text-sm font-semibold text-zinc-900 tabular-nums" dir="ltr">
          {timeText}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white/90 px-5 py-3 text-sm shadow-sm shadow-zinc-900/5">
      <div className="font-semibold text-zinc-900">{dateLong}</div>
      <div className="mt-1 text-lg font-bold text-brand-950 tabular-nums" dir="ltr">
        {timeText}
      </div>
    </div>
  );
};
