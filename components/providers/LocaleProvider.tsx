"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, getValueByPath, type Locale } from "@/lib/i18n";

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("dari");

  useEffect(() => {
    const stored = window.localStorage.getItem("erp-locale");
    if (stored === "dari" || stored === "pashto") setLocaleState(stored);
  }, []);

  const setLocale = (value: Locale) => {
    setLocaleState(value);
    window.localStorage.setItem("erp-locale", value);
    document.documentElement.lang = value === "dari" ? "fa" : "ps";
    document.documentElement.dir = "rtl";
  };

  const contextValue = useMemo<LocaleContextType>(() => {
    return {
      locale,
      setLocale,
      t: (key: string) => getValueByPath(dictionaries[locale], key),
    };
  }, [locale]);

  return (
    <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
