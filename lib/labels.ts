import type {
  AttendanceStatus,
  EmployeeStatus,
  LeaveStatus,
  ShiftKind,
} from "@/types";

export const shiftLabel: Record<ShiftKind, string> = {
  morning: "شیفت صبح",
  night: "شیفت شب",
};

export const employeeStatusLabel: Record<EmployeeStatus, string> = {
  active: "فعال",
  inactive: "غیرفعال",
};

export const attendanceStatusLabel: Record<AttendanceStatus, string> = {
  present: "حاضر",
  absent: "غایب",
  late: "تأخیر",
};

export const leaveStatusLabel: Record<LeaveStatus, string> = {
  pending: "در انتظار",
  approved: "تایید شده",
  rejected: "رد شده",
};
