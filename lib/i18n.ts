import dari from "@/locales/dari.json";
import pashto from "@/locales/pashto.json";

export type Locale = "dari" | "pashto";

export const dictionaries = { dari, pashto } as const;

type Dict = typeof dari;

export function getValueByPath(obj: Dict, path: string): string {
  const result = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
  return typeof result === "string" ? result : path;
}
