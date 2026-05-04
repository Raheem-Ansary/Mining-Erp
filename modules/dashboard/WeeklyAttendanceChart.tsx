"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import dayConfigured, { formatJalaliDateShort } from "@/lib/dayjs";
import { weeklyAttendanceSeries } from "@/data/dashboard-summary";
import { formatNumber } from "@/lib/format";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

export function WeeklyAttendanceChart() {
  const labels = Array.from({ length: 7 }, (_, i) => {
    const d = dayConfigured().subtract(6 - i, "day");
    return formatJalaliDateShort(d);
  });

  const data = {
    labels,
    datasets: [
      {
        label: "تعداد حضور",
        data: weeklyAttendanceSeries.map((x) => x.attendanceCount),
        fill: true,
        tension: 0.35,
        borderColor: "oklch(0.38 0.11 246)",
        backgroundColor: "oklch(0.93 0.03 246 / 0.55)",
        pointRadius: 3,
      },
    ],
  };

  return (
    <div dir="ltr" className="h-64 w-full">
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: { top: 6, bottom: 0, left: 0, right: 0 },
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              rtl: false,
              callbacks: {
                label: (ctx) => `${formatNumber(Number(ctx.parsed.y))} نفر حضور ثبت‌شده`,
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: "oklch(0.9 0.01 260 / 0.8)",
              },
              ticks: {
                precision: 0,
                callback: (v) => formatNumber(Number(v)),
              },
            },
          },
        }}
      />
    </div>
  );
}
