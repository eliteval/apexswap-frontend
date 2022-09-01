import Button from '@/components/ui/button';
import { InfoIcon } from '@/components/icons/info-icon';
import { Switch } from '@/components/ui/switch';
import cn from 'classnames';
import { useState } from 'react';
import Scrollbar from '@/components/ui/scrollbar';
import { nftData } from '@/data/static/single-nft';
import { coinList } from '@/data/static/coin-list';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';

export default function Routing({ ...props }) {
  // const { block_chains } = nftData;
  const breakpoint = useBreakpoint();
  const item1 = {
    coin: "ETH",
    dex: [
      ['DexA', 10],
      ['DexB', 20],
      ['DexC', 30],
    ]
  };
  const item2 = {
    coin: "USDT",
    dex: [
      ['DexD', 30],
      ['DexE', 40],
    ]
  };
  const item3 = {
    coin: "USDT",
    dex: [
      ['DexG', 30],
    ]
  };
  const route = [
    [item2, item1, item3],
    [item1, item3],
    [item1],
  ];
  const percent = [20, 10, 20,];
  const coin_in = 'ETH';
  const coin_out = 'USDC';
  const coins = coinList;
  const inCoin = coins.filter(ele => ele.code === coin_in);
  const outCoin = coins.filter(ele => ele.code === coin_out);
  // let [selectedCoin, setSelectedCoin] = useState(inCoin);

  return (
    <div
      className="relative z-50 mx-auto max-w-md rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-7 dark:border-gray-700 dark:bg-light-dark sm:px-7 sm:pb-8 sm:pt-6vv md:max-w-2xl"
      {...props}
    >
      <h2 className="mb-4 text-2xl font-medium uppercase text-gray-900 dark:text-white">
        Routing
      </h2>
      {/* {['xs', 'sm'].indexOf(breakpoint) !== -1 ? (<Scrollbar style={{ height: 'calc(100% - 32px)' }} >) : (<Scrollbar style={{ width: '100%' }} >)} */}

      <Scrollbar style={{ height: 'calc(100% - 32px)' }} >
        {/* {if(['xs', 'sm'].indexOf(breakpoint) !== -1) <Scrollbar style={{ width: '100%' }}>} */}

      </Scrollbar>

      <div style={{ overflow: "auto" }}>
        <div className="grid grid-cols-12 gap-2 " style={{ display: "table", width: "100%" }}>

          <div className="h-96 max-h-full col-span-1 grid grid-cols-1 place-items-center px-2" style={{ display: "table-cell", minWidth: "50px" }}>
            <div className="text-sm tracking-tighter text-gray-600 dark:text-blue-400" style={{ position: "absolute", top: "50%" }}>
              {inCoin[0]?.icon}
            </div>
          </div>

          <div className="h-96 max-h-full col-span-10 px-2 " style={{ display: "table-cell" }}>
            <div className="grid grid-cols-12">

              <div className="col-span-1 px-1 py-10">
                {percent?.map((percentage, index) => (
                  <div key={index} className="grid grid-cols-1 gap-2 place-items-center h-36 max-h-full tracking-tighter text-gray-600 dark:text-blue-400">
                    <div className="flex flex-row">
                      <p className="w-5 max-w-full ml-1">{percentage}%</p>
                      <p className="w-5 max-w-full px-3 ">{'>'}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-span-11 text-sm tracking-tighter text-gray-600 dark:text-blue-400 p-10">
                {route?.map((element, index) => (
                  <div key={index} className="flex items-center gap-4 ">
                    {element.map((item, id) => (
                      <div key={id} style={{ width: `${100 / element.length}%` }} className="h-36 max-h-full grid grid-cols-1 place-items-center tracking-tighter text-gray-600 dark:text-blue-400">
                        <div className="grid grid-cols-12 gap-1">
                          <div className="col-span-11 ">
                            <div className="grid grid-cols-1 gap-2 rounded-md p-2 outline outline-offset-2 outline-1">
                              <div className="flex items-center">
                                {coins.filter(ele => ele.code === item.coin)[0].icon}
                                <p className="w-10 max-w-full px-2 text-lg text-gray-900 dark:text-white">{item.coin}</p>
                              </div>
                              {item.dex.map((ele, id) => (
                                <div key={id} className="flex flex-row rounded-md dark:bg-[#334155]">
                                  <p className="w-10 max-w-full text-center">{ele[0]}</p>
                                  <p className="w-10 max-w-full text-center">{`${ele[1]}%`}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="col-span-1 grid grid-cols-1 place-items-center">
                            {/* <div className="grid grid-cols-1 place-items-center"> */}
                            <p className="w-10 max-w-full px-3 ">{'>'}</p>
                            {/* </div> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

            </div>
          </div>

          <div className="h-96 max-h-full col-span-1 grid grid-cols-1 place-items-center px-2" style={{ display: "table-cell" }}>
            <div className="text-sm tracking-tighter text-gray-600 dark:text-blue-400" style={{ position: "absolute", top: "50%" }}>
              {outCoin[0]?.icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
