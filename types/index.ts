export type ShiftKind = "morning" | "night";

export type EmployeeStatus = "active" | "inactive";

export type AttendanceStatus = "present" | "absent" | "late";

export type LeaveStatus = "pending" | "approved" | "rejected";

export interface Employee {
  id: string;
  name: string;
  role: string;
  status: EmployeeStatus;
  phone: string;
  shift: ShiftKind;
}

export interface AttendanceRow {
  id: string;
  employeeId: string;
  employeeName: string;
  dateIso: string;
  checkInIso: string | null;
  checkOutIso: string | null;
  status: AttendanceStatus;
}

export interface LeaveRequestRow {
  id: string;
  employeeName: string;
  fromIso: string;
  toIso: string;
  reason: string;
  status: LeaveStatus;
  submittedIso: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  createdIso: string;
  kind: "info" | "warning" | "success";
}
