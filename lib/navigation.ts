import {
  LayoutDashboard,
  Building2,
  UsersRound,
  CalendarClock,
  Palmtree,
  Banknote,
  BarChart3,
  Receipt,
  Wallet,
  FileText,
  PackageSearch,
  ShoppingCart,
  ClipboardCheck,
  Truck,
  Route,
  Fuel,
  UserSquare2,
  Boxes,
  ArrowDownToLine,
  ArrowUpFromLine,
  Tags,
  Warehouse,
  Gauge,
  type LucideIcon,
} from "lucide-react";
import type { ModuleId } from "@/lib/roles";

export type NavItem = {
  href: string;
  labelKey: string;
  icon: LucideIcon;
  moduleId: ModuleId;
};
export type NavGroup = { titleKey: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    titleKey: "sidebar.dashboard",
    items: [
      {
        href: "/dashboard/overview",
        labelKey: "sidebar.overview",
        icon: Gauge,
        moduleId: "overview",
      },
    ],
  },
  {
    titleKey: "sidebar.hr",
    items: [
      { href: "/dashboard/hr/overview", labelKey: "sidebar.hrOverview", icon: Building2, moduleId: "hr" },
      { href: "/dashboard/hr/employees", labelKey: "sidebar.employees", icon: UsersRound, moduleId: "hr" },
      { href: "/dashboard/hr/attendance", labelKey: "sidebar.attendance", icon: CalendarClock, moduleId: "hr" },
      { href: "/dashboard/hr/leaves", labelKey: "sidebar.leaves", icon: Palmtree, moduleId: "hr" },
      { href: "/dashboard/hr/payroll", labelKey: "sidebar.payroll", icon: Banknote, moduleId: "hr" },
      { href: "/dashboard/hr/performance", labelKey: "sidebar.performance", icon: BarChart3, moduleId: "hr" },
    ],
  },
  {
    titleKey: "sidebar.finance",
    items: [
      { href: "/dashboard/finance/overview", labelKey: "sidebar.financeOverview", icon: LayoutDashboard, moduleId: "finance" },
      { href: "/dashboard/finance/expenses", labelKey: "sidebar.expenses", icon: Receipt, moduleId: "finance" },
      { href: "/dashboard/finance/income", labelKey: "sidebar.income", icon: Wallet, moduleId: "finance" },
      { href: "/dashboard/finance/reports", labelKey: "sidebar.reports", icon: FileText, moduleId: "finance" },
      { href: "/dashboard/finance/budget", labelKey: "sidebar.budget", icon: BarChart3, moduleId: "finance" },
    ],
  },
  {
    titleKey: "sidebar.procurement",
    items: [
      { href: "/dashboard/procurement/overview", labelKey: "sidebar.procurementOverview", icon: LayoutDashboard, moduleId: "procurement" },
      { href: "/dashboard/procurement/requests", labelKey: "sidebar.purchaseRequests", icon: PackageSearch, moduleId: "procurement" },
      { href: "/dashboard/procurement/orders", labelKey: "sidebar.orders", icon: ShoppingCart, moduleId: "procurement" },
      { href: "/dashboard/procurement/suppliers", labelKey: "sidebar.suppliers", icon: UsersRound, moduleId: "procurement" },
      { href: "/dashboard/procurement/approvals", labelKey: "sidebar.approvals", icon: ClipboardCheck, moduleId: "procurement" },
    ],
  },
  {
    titleKey: "sidebar.logistics",
    items: [
      { href: "/dashboard/logistics/overview", labelKey: "sidebar.logisticsOverview", icon: LayoutDashboard, moduleId: "logistics" },
      { href: "/dashboard/logistics/transfers", labelKey: "sidebar.transfers", icon: Truck, moduleId: "logistics" },
      { href: "/dashboard/logistics/vehicles", labelKey: "sidebar.vehicles", icon: Truck, moduleId: "logistics" },
      { href: "/dashboard/logistics/routes", labelKey: "sidebar.routes", icon: Route, moduleId: "logistics" },
      { href: "/dashboard/logistics/fuel", labelKey: "sidebar.fuel", icon: Fuel, moduleId: "logistics" },
      { href: "/dashboard/logistics/drivers", labelKey: "sidebar.drivers", icon: UserSquare2, moduleId: "logistics" },
    ],
  },
  {
    titleKey: "sidebar.inventory",
    items: [
      { href: "/dashboard/inventory/overview", labelKey: "sidebar.inventoryOverview", icon: LayoutDashboard, moduleId: "inventory" },
      { href: "/dashboard/inventory/stock", labelKey: "sidebar.stock", icon: Boxes, moduleId: "inventory" },
      { href: "/dashboard/inventory/inbound", labelKey: "sidebar.inbound", icon: ArrowDownToLine, moduleId: "inventory" },
      { href: "/dashboard/inventory/outbound", labelKey: "sidebar.outbound", icon: ArrowUpFromLine, moduleId: "inventory" },
      { href: "/dashboard/inventory/categories", labelKey: "sidebar.categories", icon: Tags, moduleId: "inventory" },
      { href: "/dashboard/inventory/reports", labelKey: "sidebar.inventoryReports", icon: Warehouse, moduleId: "inventory" },
    ],
  },
];

export function getVisibleNavGroups(modules: ModuleId[]) {
  return navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => modules.includes(item.moduleId)),
    }))
    .filter((group) => group.items.length > 0);
}
