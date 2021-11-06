import dynamic from "next/dynamic";

import { ApexOptions } from "apexcharts";
import { useAuth } from "../../../contexts/auth";

export const ChartDynamic = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Chart() {
  const { finances } = useAuth();

  const dates = finances.map((item) => item.createdAt);
  const datesFormatted = [...new Set(dates)];

  const arraySum: number[] = [] as unknown as number[];
  datesFormatted.forEach((fin, index: number) => {
    let sum = 0;
    finances.forEach((item) => {
      if (fin === item.createdAt) {
        sum += item.amount
      }
    })
    arraySum[index] = sum;
  })

  const series = [{ name: "series1", data: arraySum }];
  const options: ApexOptions = {

    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: '#e1e1e6',
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      type: "category",
      axisBorder: {
        color: "#2a9d8f",
      },
      axisTicks: {
        color: "#2a9d8f",
      },
      categories: datesFormatted,

    },
    fill: {
      opacity: 0.3,
      type: "gradient",
      gradient: {
        shade: "dark",
        opacityFrom: 1,
        opacityTo: 0.9,
      },
    },
  };

  return (
    <ChartDynamic options={options} series={series} type="line" height={160} />
  );
}
