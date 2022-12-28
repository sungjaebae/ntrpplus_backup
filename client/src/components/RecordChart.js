import ApexChart from "react-apexcharts";
import { convertTimeToStr } from "../utils/Util";

const RecordChart = (props) => {
  const series = [{ name: "NTRP", data: props.data.reverse() }];
  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#21942c"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "당신의 NTRP 성장 과정",
      align: "left",
      style: {
        fontSize: "20px",
      },
    },
    xaxis: {
      type: "category",
      tickPlacement: "between",
      labels: {
        formatter: (value) => {
          return convertTimeToStr(value);
        },
      },
    },
    yaxis: {
      tickAmount: 12,
      min: 1,
      max: 7,
    },
  };
  return (
    <div>
      <ApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default RecordChart;
