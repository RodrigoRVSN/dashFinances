import dynamic from "next/dynamic";

import { ApexOptions } from "apexcharts";
import { name } from 'apexcharts/dist/locales/pt-br.json'
import { useAuth } from "../../../contexts/auth";


export const ChartDynamic = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Chart() {
  const { finances } = useAuth();

  const dates = finances.map((item) => new Date(item.created).toLocaleDateString("en", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }),
  );

  const amounts = finances.map((item) => item.amount);

  const series = [{ name: "series1", data: amounts }];

  const options: ApexOptions = {

    chart: {
      locales: [{ name }],
      defaultLocale: name,
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
