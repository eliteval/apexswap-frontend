// import Chart from "chart.js";
import { useRef, useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import Layout from '@/layouts/_layout';
import Chart from 'chart.js/auto';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// interface Props {
//   chartData: number[];
// }

// const MyChart = ({ chartData }: Props) => {
//   // helper function to format chart data since you do this twice
//   const formatData = (data: number[]): Chart.ChartData => ({
//     labels: ["a", "b", "c", "d", "e", "f", "g", "h"],
//     datasets: [{ data }]
//   });

//   // use a ref to store the chart instance since it it mutable
//   const chartRef = useRef<Chart | null>(null);

//   // callback creates the chart on the canvas element
//   const canvasCallback = (canvas: HTMLCanvasElement | null) => {
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (ctx) {
//       chartRef.current = new Chart(ctx, {
//         type: "radar",
//         data: formatData(chartData),
//         options: { responsive: true }
//       });
//     }
//   };

//   // effect to update the chart when props are updated
//   useEffect(() => {
//     // must verify that the chart exists
//     if (chartRef.current) {
//       chartRef.current.data = formatData(chartData);
//       chartRef.current.update();
//     }

//     // cleanup function - I had to remove this as it was causing errors
//     /*return () => {
//       chartRef.current?.destroy();
//     };*/
//   }, [chartData]);

//   return (
//     <div className="self-center ">
//       <div className="overflow-hidden">
//         <canvas ref={canvasCallback}></canvas>
//       </div>
//     </div>
//   );
// };

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.5,
      pointRadius: 0,
      fill: 'start',
      showLine: true,
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const ChartsPage: NextPageWithLayout = () => {
  // const [data, setData] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  // const onClick = () => {
  //     setData((prevData) => prevData.slice(1).concat(10 * Math.random()));
  // };
  return (
    <>
      <NextSeo title="Charts" description="Apexswap - Avalanche DEX" />
      <div>
        {/* <button onClick={onClick}>Change</button> */}
        <Line options={options} data={data} />;
      </div>
    </>
  );
};

ChartsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ChartsPage;
