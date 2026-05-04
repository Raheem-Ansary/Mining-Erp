import type { NotificationItem } from "@/types";

export const notificationsSeed: NotificationItem[] = [
  {
    id: "n1",
    title: "بازبینی شیفت شب",
    body: "سه نفر شیفت شب هفته آینده باید کارت HSE را تجدید کنند.",
    createdIso: "2026-05-03T04:05:00.000Z",
    kind: "warning",
  },
  {
    id: "n2",
    title: "ورود قطعه یدکی",
    body: "سفارش فیلتر هیدرولیک Dumper به انبار مرکزی رسید.",
    createdIso: "2026-05-02T12:42:00.000Z",
    kind: "info",
  },
  {
    id: "n3",
    title: "گزارش ایمنی تایید شد",
    body: "آمار حوادث جزئی ثبت‌شده در هفته گذشته بدون سانحهٔ سنگین است.",
    createdIso: "2026-05-01T08:20:00.000Z",
    kind: "success",
  },
  {
    id: "n4",
    title: "یادآوری آموزش",
    body: "کارگاه «کار با گاز مشعل» برای اپراتورها، پنجشنبهٔ هفته جاری.",
    createdIso: "2026-04-30T15:06:00.000Z",
    kind: "info",
  },
];
