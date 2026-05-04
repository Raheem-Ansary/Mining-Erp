"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { employeesSeed } from "@/data/employees";
import type { Employee, EmployeeStatus, ShiftKind } from "@/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { employeeStatusLabel, shiftLabel } from "@/lib/labels";

function nextId(existing: Employee[]) {
  const n = existing.length + 1;
  return `e${n}-${Math.random().toString(36).slice(2, 6)}`;
}

export function EmployeesModule() {
  const [rows, setRows] = useState<Employee[]>(() => [...employeesSeed]);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Omit<Employee, "id"> & { id?: string }>({
    name: "",
    role: "",
    phone: "",
    status: "active",
    shift: "morning",
  });

  const isEditMode = Boolean(draft.id);

  function openCreate() {
    setDraft({
      name: "",
      role: "",
      phone: "",
      status: "active",
      shift: "morning",
    });
    setOpen(true);
  }

  function openEdit(emp: Employee) {
    setDraft({ ...emp });
    setOpen(true);
  }

  function save() {
    const id = draft.id ?? nextId(rows);
    const normalized: Employee = {
      id,
      name: draft.name.trim(),
      role: draft.role.trim(),
      phone: draft.phone.trim(),
      status: draft.status,
      shift: draft.shift as ShiftKind,
    };

    if (!normalized.name || !normalized.role || !normalized.phone) return;

    setRows((xs) =>
      draft.id && xs.some((e) => e.id === normalized.id)
        ? xs.map((e) => (e.id === normalized.id ? normalized : e))
        : [normalized, ...xs],
    );
    setOpen(false);
  }

  const statusTone = useMemo(
    (): Record<
      EmployeeStatus,
      "neutral" | "success" | "warning" | "danger" | "info"
    > => ({
      active: "success",
      inactive: "neutral",
    }),
    [],
  );

  return (
    <Card
      title="فهرست کارکنان"
      action={
        <Button onClick={openCreate} variant="secondary" className="gap-2">
          <Plus className="h-4 w-4" />
          افزودن کارمند
        </Button>
      }
    >
      <div className="overflow-auto rounded-xl border border-zinc-200">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-50 text-zinc-600">
            <tr className="text-right">
              <th className="px-4 py-3 font-medium">نام</th>
              <th className="px-4 py-3 font-medium">نقش</th>
              <th className="px-4 py-3 font-medium">شیفت</th>
              <th className="px-4 py-3 font-medium">وضعیت</th>
              <th className="px-4 py-3 font-medium">تلفن</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-white">
            {rows.map((e) => (
              <tr key={e.id} className="text-right hover:bg-zinc-50">
                <td className="px-4 py-3 font-semibold text-zinc-900">{e.name}</td>
                <td className="px-4 py-3 text-zinc-700">{e.role}</td>
                <td className="px-4 py-3 text-zinc-700">{shiftLabel[e.shift]}</td>
                <td className="px-4 py-3">
                  <Badge tone={statusTone[e.status]}>{employeeStatusLabel[e.status]}</Badge>
                </td>
                <td className="px-4 py-3 tabular-nums text-zinc-700" dir="ltr">
                  {e.phone}
                </td>
                <td className="px-4 py-3">
                  <Button variant="ghost" className="-my-2" onClick={() => openEdit(e)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={isEditMode ? "ویرایش کارمند" : "کارمند جدید"}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              انصراف
            </Button>
            <Button onClick={save}>ذخیره</Button>
          </>
        }
      >
        <div className="grid gap-3">
          <label className="grid gap-1 text-sm">
            <span className="text-zinc-700">نام</span>
            <input
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base outline-none ring-brand-950/25 focus-visible:ring"
              value={draft.name}
              onChange={(v) => setDraft((s) => ({ ...s, name: v.target.value }))}
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-zinc-700">نقش</span>
            <input
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base outline-none ring-brand-950/25 focus-visible:ring"
              value={draft.role}
              onChange={(v) => setDraft((s) => ({ ...s, role: v.target.value }))}
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-zinc-700">تلفن</span>
            <input
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base outline-none ring-brand-950/25 focus-visible:ring"
              dir="ltr"
              inputMode="tel"
              value={draft.phone}
              onChange={(v) => setDraft((s) => ({ ...s, phone: v.target.value }))}
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-sm">
              <span className="text-zinc-700">شیفت کاری</span>
              <select
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base outline-none ring-brand-950/25 focus-visible:ring"
                value={draft.shift}
                onChange={(v) =>
                  setDraft((s) => ({ ...s, shift: v.target.value as ShiftKind }))
                }
              >
                <option value="morning">{shiftLabel.morning}</option>
                <option value="night">{shiftLabel.night}</option>
              </select>
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-zinc-700">وضعیت همکاری</span>
              <select
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base outline-none ring-brand-950/25 focus-visible:ring"
                value={draft.status}
                onChange={(v) =>
                  setDraft((s) => ({ ...s, status: v.target.value as EmployeeStatus }))
                }
              >
                <option value="active">{employeeStatusLabel.active}</option>
                <option value="inactive">{employeeStatusLabel.inactive}</option>
              </select>
            </label>
          </div>
          <div className="text-xs leading-relaxed text-zinc-500">
            ورود تاریخچهٔ استخدام برای نسخهٔ بعد؛ در همین MVP داده‌ها فقط در همین نشست مرورگر باقی
            می‌ماند.
          </div>
        </div>
      </Modal>
    </Card>
  );
}
