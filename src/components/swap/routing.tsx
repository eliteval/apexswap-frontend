import Button from '@/components/ui/button';
import { InfoIcon } from '@/components/icons/info-icon';
import { Switch } from '@/components/ui/switch';
import cn from 'classnames';
import { useState } from 'react';
import Scrollbar from '@/components/ui/scrollbar';
import { nftData } from '@/data/static/single-nft';
import { coinList } from '@/data/static/coin-list';
import { dexList } from '@/data/static/dex-list';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { atom, useAtom } from 'jotai';
import { useRoutingAtom } from '@/pages/swap';

export default function Routing({ ...props }) {
  const { routingAtom } = useRoutingAtom();
  console.log('routingAtom => ', routingAtom?.init);
  const adapters = routingAtom?.init.adapters;
  const path = routingAtom?.init.path;
  // const { block_chains } = nftData;
  const breakpoint = useBreakpoint();
  // const item1 = {
  //   coin: "AVAX",
  //   dex: [
  //     ['DexA', 10],
  //     ['DexB', 20],
  //     ['DexC', 30],
  //   ]
  // };
  // const item2 = {
  //   coin: "USDC",
  //   dex: [
  //     ['DexD', 30],
  //     ['DexE', 40],
  //   ]
  // };
  // const item3 = {
  //   coin: "DAIe",
  //   dex: [
  //     ['DexG', 30],
  //   ]
  // };

  // const routes = [
  //   ["0xd586E7F844cEa2F87f50152665BCbc2C279D8d70"],
  // ];
  const routes = path.slice(1);
  // const adapters = ["0x623DC9E82F055471B7675503e8deF05A35EBeA19"];
  
  const percent = [100];
  const coin_in = path[0];
  const coin_out = path[path?.length-1];
  const coins = coinList;
  const inCoin = coins.filter(ele => ele.address === coin_in);
  const outCoin = coins.filter(ele => ele.address === coin_out);
  console.log(outCoin[0]?.code);
  // let [selectedCoin, setSelectedCoin] = useState(inCoin);

  return (
    <div
      className="relative z-50 mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white px-1 pt-5 pb-7 dark:border-gray-700 dark:bg-light-dark sm:px-2 sm:pb-8 sm:pt-6vv md:max-w-2xl"
      {...props}
    >
      <h2 className="mb-4 text-2xl font-medium uppercase text-gray-900 dark:text-white">
        Routing
      </h2>
      {/* {['xs', 'sm'].indexOf(breakpoint) !== -1 ? (<Scrollbar style={{ height: 'calc(100% - 32px)' }} >) : (<Scrollbar style={{ width: '100%' }} >)} */}

      {/* <Scrollbar style={{ height: 'calc(100% - 32px)' }} > */}
        {/* {if(['xs', 'sm'].indexOf(breakpoint) !== -1) <Scrollbar style={{ width: '100%' }}>} */}

      {/* </Scrollbar> */}

      <div style={{ overflow: "auto" }}>
        <div className="grid grid-cols-12 gap-2 " style={{ display: "table", width: "100%" }}>

          <div className="h-96 max-h-full col-span-1" style={{ display: "table-cell", minWidth: "50px" }}>
            <div className="mx-3" style={{ position: "absolute", top: "50%" }}>
              {inCoin[0]?.icon}
            </div>
          </div>

          <div className="h-96 max-h-full col-span-10 grid grid-cols-1 place-items-center">
            <div className="grid grid-cols-12">

              <div className="col-span-2">
                {percent?.map((percentage, index) => (
                  <div key={index} className="grid grid-cols-1 gap-2 place-items-center h-36 max-h-full tracking-tighter text-gray-600 dark:text-blue-400">
                    <div className="flex flex-row">
                      <span className=" max-w-full ">{percentage}%</span>
                      <span className=" max-w-full px-1 ">{'>'}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-span-10 text-sm tracking-tighter text-gray-600 dark:text-blue-400">
                {routes?.map((element, index) => (
                  // 
                  <div key={index} className="flex items-center gap-4 ">
                    {/* {element.map((item, id) => ( */}
                      <div style={{ width: `${100 / routes.length}%` }} className="h-36 max-h-full grid grid-cols-1 place-items-center tracking-tighter text-gray-600 dark:text-blue-400">
                        <div className="grid grid-cols-12 gap-1">
                          <div className="col-span-11 ">
                            <div className="grid grid-cols-1 gap-2 rounded-md p-2 outline outline-offset-2 outline-1">
                              <div className="flex items-center">
                                {coins.filter(ele => ele.address === element)[0].icon}
                                <p className="w-10 max-w-full px-2 text-lg text-gray-900 dark:text-white">{coins.filter(ele => ele.address === element)[0].code}</p>
                              </div>
                              {/* {item.dex.map((ele, id) => ( */}
                                <div className="flex flex-row rounded-md dark:bg-[#334155]">
                                  <p className="w-10 max-w-full text-center">{dexList.filter(ele => ele.address === adapters[index])[0].dex}</p>
                                  <p className="w-10 max-w-full text-center">{`${''}%`}</p>
                                </div>
                              {/* ))} */}
                            </div>
                          </div>
                          <div className="col-span-1 grid grid-cols-1 place-items-center">
                            {/* <div className="grid grid-cols-1 place-items-center"> */}
                            <p className="w-10 max-w-full px-3 ">{'>'}</p>
                            {/* </div> */}
                          </div>
                        </div>
                      </div>
                    {/* ))} */}
                  </div>
                ))}
              </div>

            </div>
          </div>

          <div className="h-96 max-h-full col-span-1" style={{ display: "table-cell", minWidth: "50px" }}>
            <div className="mx-3" style={{ position: "absolute", top: "50%" }}>
              {outCoin[0]?.icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
