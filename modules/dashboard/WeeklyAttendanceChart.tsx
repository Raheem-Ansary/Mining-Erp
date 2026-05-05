"use client";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from "chart.js";
import { Line } from "react-chartjs-2";
import dayConfigured from "@/lib/dayjs";
import { weeklyAttendanceSeries } from "@/data/dashboard-summary";
import { formatAfghanDate, formatNumber } from "@/lib/format";
import { useLocale } from "@/components/providers/LocaleProvider";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export function WeeklyAttendanceChart() {
  const { locale } = useLocale();
  const unit = locale === "pashto" ? "کسان" : "نفر";
  const labels = Array.from({ length: 7 }, (_, i) =>
    formatAfghanDate(dayConfigured().subtract(6 - i, "day").toDate(), locale, {
      day: "numeric",
      month: "short",
    }),
  );
  const data = {
    labels,
    datasets: [
      {
        data: weeklyAttendanceSeries.map((x) => x.attendanceCount),
        fill: true,
        tension: 0.35,
        borderColor: "oklch(0.44 0.08 232)",
        backgroundColor: "oklch(0.92 0.03 80 / 0.45)",
        pointRadius: 3,
        pointBackgroundColor: "oklch(0.63 0.11 74)",
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
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `${formatNumber(Number(ctx.parsed.y), locale)} ${unit}`,
              },
            },
          },
          scales: {
            x: { grid: { display: false } },
            y: {
              beginAtZero: true,
              ticks: { callback: (v) => formatNumber(Number(v), locale) },
            },
          },
        }}
      />
    </div>
  );
}
