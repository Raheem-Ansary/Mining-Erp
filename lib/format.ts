import type { Locale } from "@/lib/i18n";

function localeCode(locale: Locale) {
  return locale === "pashto" ? "ps-AF" : "fa-AF";
}

function persianCalendarLocale(locale: Locale) {
  return `${localeCode(locale)}-u-ca-persian`;
}

export function formatNumber(value: number, locale: Locale = "dari") {
  return new Intl.NumberFormat(localeCode(locale)).format(value);
}

export function formatCurrencyAFN(value: number, locale: Locale = "dari") {
  return new Intl.NumberFormat(localeCode(locale), {
    style: "currency",
    currency: "AFN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number, locale: Locale = "dari") {
  return new Intl.NumberFormat(localeCode(locale), {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(value / 100);
}

export function formatAfghanDate(
  value: string | number | Date,
  locale: Locale = "dari",
  options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  },
) {
  const date = value instanceof Date ? value : new Date(value);
  try {
    return new Intl.DateTimeFormat(persianCalendarLocale(locale), options).format(date);
  } catch {
    return new Intl.DateTimeFormat(localeCode(locale), options).format(date);
  }
}
