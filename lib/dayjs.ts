import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import jalaliday from "jalaliday/dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import "dayjs/locale/fa";

dayjs.extend(localizedFormat);
dayjs.extend(jalaliday);
dayjs.locale("fa");
dayjs.calendar("jalali");

export default dayjs;

/** نمایش تاریخ شمسی به‌صورت رشتهٔ قابلٔ نمایش (برای SSR/CSR یکسان با همان تاریخ ورودی) */
export function formatJalali(date: string | Date | Dayjs, pattern = "D MMMM YYYY") {
  return dayjs(date).calendar("jalali").locale("fa").format(pattern);
}

export function formatJalaliDateShort(date: string | Date | Dayjs) {
  return dayjs(date).calendar("jalali").locale("fa").format("YYYY/MM/DD");
}

export function formatTime(date: string | Date | Dayjs) {
  return dayjs(date).format("HH:mm");
}
