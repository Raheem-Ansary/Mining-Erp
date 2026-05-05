import type { Locale } from "@/lib/i18n";

export type ModuleId =
  | "overview"
  | "hr"
  | "finance"
  | "procurement"
  | "logistics"
  | "inventory";

export type UserRole =
  | "executive"
  | "hr_manager"
  | "finance_manager"
  | "procurement_lead"
  | "logistics_supervisor"
  | "inventory_keeper";

type LocalizedText<T = string> = { dari: T; pashto: T };

export type RoleDefinition = {
  id: UserRole;
  homePath: string;
  modules: ModuleId[];
  label: LocalizedText;
  description: LocalizedText;
  chip: LocalizedText;
};

export const defaultRole: UserRole = "executive";

export const roleDefinitions: RoleDefinition[] = [
  {
    id: "executive",
    homePath: "/dashboard/overview",
    modules: ["overview", "hr", "finance", "procurement", "logistics", "inventory"],
    label: {
      dari: "مدیر عمومی",
      pashto: "عمومي مدير",
    },
    description: {
      dari: "نمای کامل از عملیات معدن، منابع، مالی و زنجیره اکمالات",
      pashto: "د کان، مالي، بشري او اکمالاتي عملياتو بشپړ لید",
    },
    chip: {
      dari: "سطح اجرایی",
      pashto: "اجرایي کچه",
    },
  },
  {
    id: "hr_manager",
    homePath: "/dashboard/hr/overview",
    modules: ["hr"],
    label: {
      dari: "مدیر منابع بشری",
      pashto: "د بشري منابعو مدير",
    },
    description: {
      dari: "تمرکز روی نیروی انسانی، حضور، رخصتی و معاشات",
      pashto: "پر بشري ځواک، حاضري، رخصتۍ او معاشاتو تمرکز",
    },
    chip: {
      dari: "دسترسی HR",
      pashto: "د HR لاسرسی",
    },
  },
  {
    id: "finance_manager",
    homePath: "/dashboard/finance/overview",
    modules: ["finance"],
    label: {
      dari: "مدیر مالی",
      pashto: "مالي مدير",
    },
    description: {
      dari: "کنترل جریان نقدی، بودجه، عواید و گزارشات مالی",
      pashto: "د نغدو پيسو، بودجې، عوايدو او مالي راپورونو کنټرول",
    },
    chip: {
      dari: "دسترسی مالی",
      pashto: "مالي لاسرسی",
    },
  },
  {
    id: "procurement_lead",
    homePath: "/dashboard/procurement/overview",
    modules: ["procurement"],
    label: {
      dari: "مدیر تدارکات",
      pashto: "د تدارکاتو مدير",
    },
    description: {
      dari: "مدیریت درخواست‌ها، سفارشات، تامین‌کنندگان و تاییدیه‌ها",
      pashto: "د غوښتنو، فرمایشونو، عرضه کوونکو او تاییدیو مديريت",
    },
    chip: {
      dari: "دسترسی تدارکات",
      pashto: "د تدارکاتو لاسرسی",
    },
  },
  {
    id: "logistics_supervisor",
    homePath: "/dashboard/logistics/overview",
    modules: ["logistics"],
    label: {
      dari: "سرپرست لوجستیک",
      pashto: "د لوژستیک سرپرست",
    },
    description: {
      dari: "نظارت بر وسایط، سوخت، مسیرها و انتقالات عملیاتی",
      pashto: "پر وسایطو، تېلو، لارو او انتقالاتو نظارت",
    },
    chip: {
      dari: "دسترسی لوجستیک",
      pashto: "لوژستیک لاسرسی",
    },
  },
  {
    id: "inventory_keeper",
    homePath: "/dashboard/inventory/overview",
    modules: ["inventory"],
    label: {
      dari: "انباردار",
      pashto: "ګودام ساتونکی",
    },
    description: {
      dari: "کنترل موجودی، ورودی و خروجی انبار و اقلام بحرانی",
      pashto: "د موجودۍ، داخل او خارج توکو او بحراني اقلامو کنټرول",
    },
    chip: {
      dari: "دسترسی انبار",
      pashto: "د ګودام لاسرسی",
    },
  },
];

const roleMap = Object.fromEntries(roleDefinitions.map((role) => [role.id, role])) as Record<
  UserRole,
  RoleDefinition
>;

export function getRoleDefinition(role: UserRole) {
  return roleMap[role] ?? roleMap[defaultRole];
}

export function roleText<T>(locale: Locale, value: LocalizedText<T>) {
  return value[locale];
}
