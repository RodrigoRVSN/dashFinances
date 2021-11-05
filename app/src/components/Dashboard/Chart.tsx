import dynamic from "next/dynamic";

import { ApexOptions } from "apexcharts";
import { IFinance } from "../../contexts/auth";

const ChartDynamic = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartProps {
  finances: IFinance[]
}

export default function Chart({ finances }: ChartProps) {
  const dates = finances.map((item) => item.created);
  const amounts = finances.map((item) => item.amount);

  const series = [{ name: "series1", data: amounts }];

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
      type: "datetime",
      axisBorder: {
        color: "#2a9d8f",
      },
      axisTicks: {
        color: "#2a9d8f",
      },
      categories: dates,
    },
    fill: {
      opacity: 0.3,
      type: "gradient",
      gradient: {
        shade: "dark",
        opacityFrom: 0.5,
        opacityTo: 0.3,
      },
    },
  };
  
  return (
    <ChartDynamic options={options} series={series} type="area" height={160} />
  );
}
