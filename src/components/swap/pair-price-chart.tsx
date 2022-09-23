import { useRef, useEffect, useState, useContext } from 'react';
import { HookContext } from '@/lib/hooks/use-hook';
import cn from 'classnames';
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
import axios from 'axios';
// import { atom, useAtom } from 'jotai';
// import { useMarketdataAtom } from '@/components/swap/market-data';

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
}

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

interface PairPriceCharTypes {
  tokenIn: string;
  tokenOut: string;
  hours: string;
}

const options = {
  responsive: true,
  interaction: {
    intersect: false,
    mode: 'index',
  },
  plugins: {
    legend: false // Hide legend
  },
  scales: {
    x: {
      display: false
    },
    y: {
      display: false
    }
  }
};

export default function PairPriceChart({
  tokenIn,
  tokenOut,
  hours,
}: PairPriceCharTypes) {
  const { getCoinDecimals, getCoinName, } = useContext(HookContext);
  // const {marketdataAtom} = useMarketdataAtom();
  // let hours = marketdataAtom?.init.hours;
  
  const [timeprices1, setTimePrices1] = useState([]);
  const [timeprices2, setTimePrices2] = useState([]);
  const [bgStatus, setBgStatus] = useState(0);
  const [labels, setLables] = useState<string[]>([]);
  const [prices, setPrices] = useState<number[]>([]);

  var new_tokenIn = tokenIn == "0x0000000000000000000000000000000000000000" ? "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7" : tokenIn;
  var new_tokenOut = tokenOut == "0x0000000000000000000000000000000000000000" ? "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7" : tokenOut;

  useEffect(() => {
    const getPrice = async () => {
      try {
        const xhours = Number(hours);
        const to = Math.round(new Date().getTime() / 1000);
        const xHourAgo = (xhours: number) => {
          const date = new Date();
          const timeAgo = Math.round(
            date.setTime(date.getTime() - xhours * 60 * 60 * 1000) / 1000
          );
          return timeAgo;
        };

        const from = xHourAgo(xhours);
        const response1 = await axios.get(
          `https://api.coingecko.com/api/v3/coins/avalanche/contract/${new_tokenIn.toLowerCase()}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`
        );
        const response2 = await axios.get(
          `https://api.coingecko.com/api/v3/coins/avalanche/contract/${new_tokenOut.toLowerCase()}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`
        );
        setTimePrices1(response1?.data.prices);
        setTimePrices2(response2?.data.prices);
      } catch (err) {
        console.error(err.message);
      }
    };
    getPrice();
  }, [hours, new_tokenIn, new_tokenOut]);

  useEffect(() => {
    if (!timeprices1 || !timeprices2) return;
    var labels = [];
    var prices = [];

    let length = timeprices1.length < timeprices2.length ? timeprices1.length : timeprices2.length;
    for (let i = 0; i < length; i++) {
      let unix_timestamp = timeprices1[i][0];
      var date = new Date(unix_timestamp);
      var dateString =
        date.getFullYear() + '-' + (Number(date.getMonth()) + 1) + '-' + date.getDate();
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
    setLables(labels)

    for (let i = 0; i < length; i++) {
      let pairPrice = timeprices1[i][1] / timeprices2[i][1];
      prices.push(pairPrice);
    }
    setPrices(prices)

    setBgStatus(prices[prices.length - 1] - prices[0])

  }, [timeprices1, timeprices2]);


  const label = getCoinName(tokenIn) + ' / ' + getCoinName(tokenOut);
  const data = {
    labels,
    datasets: [
      {
        label: label,
        data: prices,
        borderColor: () => { let bgColor = bgStatus > 0 ? 'rgb(90, 242, 219)' : 'rgb(255, 99, 132)'; return bgColor },
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1,
        pointRadius: 0,
        fill: 'start',
        showLine: true,
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 500);
          if (bgStatus > 0) {
            gradient.addColorStop(0, 'rgba(90,232,219,0.2)');
            gradient.addColorStop(0.4, 'rgba(90,232,219,0.08)');
            gradient.addColorStop(0.8, 'rgba(90,232,219,0)');
            gradient.addColorStop(1, 'rgba(90,232,219,0)');
          } else {
            gradient.addColorStop(0, 'rgba(245,99,132,0.2)');
            gradient.addColorStop(0.4, 'rgba(245,99,132,0.08)');
            gradient.addColorStop(0.8, 'rgba(245,99,132,0)');
            gradient.addColorStop(1, 'rgba(245,99,132,0)');
          }
          return gradient;
        },
        borderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 3,
      },
    ],
  };

  return (
    <>
      {/* Timeframe button */}
      {/* <div className="mt-5 mb-2 flex flex-row-reverse">
        
      </div> */}
      
      {/* Chart */}
      <Line options={options} data={data} />
    </>
  );
}
