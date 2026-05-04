import type { LeaveRequestRow } from "@/types";

export const leaveRequestsSeed: LeaveRequestRow[] = [
  {
    id: "l1",
    employeeName: "احمد وحیدی",
    fromIso: "2026-05-08T03:30:00.000Z",
    toIso: "2026-05-10T03:29:59.999Z",
    reason: "بازدید خانواده در هرات",
    status: "pending",
    submittedIso: "2026-05-02T06:45:00.000Z",
  },
  {
    id: "l2",
    employeeName: "فاطمه رسولی",
    fromIso: "2026-04-29T03:30:00.000Z",
    toIso: "2026-04-29T03:29:59.999Z",
    reason: "وقت پزشکی",
    status: "approved",
    submittedIso: "2026-04-26T07:05:00.000Z",
  },
  {
    id: "l3",
    employeeName: "محمد کاظمی",
    fromIso: "2026-05-12T03:30:00.000Z",
    toIso: "2026-05-14T03:29:59.999Z",
    reason: "مرخصی استحقاقی",
    status: "pending",
    submittedIso: "2026-05-01T10:55:00.000Z",
  },
  {
    id: "l4",
    employeeName: "زهرا احمدزی",
    fromIso: "2026-04-15T03:30:00.000Z",
    toIso: "2026-04-16T03:29:59.999Z",
    reason: "کار شخصی اداری",
    status: "rejected",
    submittedIso: "2026-04-12T06:05:00.000Z",
  },
];
