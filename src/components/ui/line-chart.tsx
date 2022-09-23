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
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { atom, useAtom } from 'jotai';
import { usePricesAtom } from '@/pages/swap';

const plugin = {
  id: 'custom_canvas_background_color',
  afterDraw: (chart) => {
    if (chart.tooltip?._active?.length) {
      let x = chart.tooltip._active[0].element.x;
      let yAxis = chart.scales.y;
      let ctx = chart.ctx;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, yAxis.top);
      ctx.lineTo(x, yAxis.bottom);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 99, 132, 0.5)';
      ctx.stroke();
      ctx.restore();
    }
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  plugin
);

const options = {
  responsive: true,
  interaction: {
    intersect: false,
    mode: 'index',
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        display: false,
      },
    },
  },
  // legend: {
  //   display: false,
  // },
};

interface LineChartTypes {
  timeprices1: object;
  timeprices2: object;
  interval: string;
  tokenIn: string;
  tokenOut: string;
}

export default function LineChart({
  timeprices1,
  timeprices2,
  interval,
  tokenIn,
  tokenOut,
}: LineChartTypes) {
  const labels = [];
  const prices = [];
  const intval = Number(interval);
  // console.log('interval => ', intval);
  console.log('timeprices1 => ', timeprices1);
  console.log('timeprices2 => ', timeprices2);
  if (timeprices1 && timeprices2) {
    let length =
      timeprices1.length < timeprices2.length
        ? timeprices1.length
        : timeprices2.length;
    console.log('length => ', length);
    for (let i = 0; i < length; i++) {
      let unix_timestamp = timeprices1[i][0];
      // console.log('unix_timestamp => ', unix_timestamp);
      var date = new Date(unix_timestamp);
      var dateString =
        date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
      // Hours part from the timestamp
      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = '0' + date.getMinutes();
      // Seconds part from the timestamp
      var seconds = '0' + date.getSeconds();

      // Will display time in 10:30:23 format
      var formattedTime =
        dateString +
        ' ' +
        hours +
        ':' +
        minutes.substr(-2) +
        ':' +
        seconds.substr(-2);
      labels.push(formattedTime);
    }

    for (let i = 0; i < length; i++) {
      let pairPrice = timeprices1[i][1] / timeprices2[i][1];
      prices.push(pairPrice);
    }
  }

  let bgStatus = prices[prices.length - 1] - prices[0];
  const label = tokenIn + ' / ' + tokenOut;
  const data = {
    labels,
    datasets: [
      {
        label: label,
        data: prices,
        borderColor: () => {
          let bgColor =
            bgStatus > 0 ? 'rgb(90, 242, 219)' : 'rgb(255, 99, 132)';
          return bgColor;
        },
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
        pointRadius: 0,
        fill: 'start',
        showLine: true,
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 250);
          if (bgStatus > 0) {
            gradient.addColorStop(0, 'rgba(90,232,219,0.45)');
            gradient.addColorStop(1, 'rgba(90,232,219,0.15)');
          } else {
            gradient.addColorStop(0, 'rgba(245,99,132,0.45)');
            gradient.addColorStop(1, 'rgba(245,99,132,0.15)');
          }
          return gradient;
        }, //background gradient color
        // borderColor: "#1f8ef1",
        borderWidth: 2,
        // borderDash: [],
        // borderDashOffset: 0.0,
        // pointBackgroundColor: "#1f8ef1",
        // pointBorderColor: "rgba(255,255,255,0)",
        // pointHoverBackgroundColor: "#1f8ef1",
        // pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 3,
      },
    ],
  };
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}
