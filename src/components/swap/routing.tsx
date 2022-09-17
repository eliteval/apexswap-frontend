import { useEffect, useState, useMemo, useContext } from 'react';
import { dexList } from '@/data/static/dex-list';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { atom, useAtom } from 'jotai';
import { useRoutingAtom } from '@/pages/swap';
import { HookContext } from '@/lib/hooks/use-hook';


export default function Routing({ ...props }) {
  const { coinslist } = useContext(HookContext);
  const { routingAtom } = useRoutingAtom();
  const adapters = routingAtom?.init.adapters;
  const path = routingAtom?.init.path;
  const routes = path.slice(1);
  const percent = [100];
  const coin_in = path[0];
  const coin_out = path[path?.length - 1];
  const inCoin = coinslist.filter(ele => ele.address.toLowerCase() == coin_in.toLowerCase());
  const outCoin = coinslist.filter(ele => ele.address.toLowerCase() == coin_out.toLowerCase());

  return (
    <div
      className="relative md:max-w-4xl z-50 mx-auto rounded-2xl border border-gray-200 bg-white px-1 pt-5 pb-7 dark:border-gray-700 dark:bg-light-dark sm:px-2 sm:pb-8 sm:pt-6vv"
      {...props}
    >
      <h2 className="mb-4 text-2xl font-medium uppercase text-gray-900 dark:text-white">
        Routing
      </h2>

      <div style={{ overflow: "auto" }}>
        <div className="grid grid-cols-12 gap-2 " style={{ display: "table", width: "100%" }}>

          <div className="h-[20%] max-h-full col-span-1" style={{ display: "table-cell", minWidth: "50px" }}>
            <div className="mx-3" style={{ position: "absolute", top: "50%" }}>
              {inCoin[0]?.icon}
            </div>
          </div>

          <div className="h-[20%] max-h-full col-span-10 grid grid-cols-1 place-items-center">
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
                <div className="flex items-center gap-4 ">
                  {routes?.map((element: string, index: number) => (
                    // 
                    <div key={index} className="mr-2">
                      {/* {element.map((item, id) => ( */}
                      <div className="h-36 max-h-full grid grid-cols-1 place-items-center tracking-tighter text-gray-600 dark:text-blue-400">
                        <div className="grid grid-cols-12 gap-1">
                          <div className="col-span-11 ">
                            <div className="grid grid-cols-1 gap-2 rounded-md p-2 outline outline-offset-2 outline-1">
                              <div className="flex items-center">
                                {coinslist.filter(ele => ele.address.toLowerCase() == element.toLowerCase())[0].icon}
                                <p className="w-10 max-w-full px-2 text-lg text-gray-900 dark:text-white">{coinslist.filter(ele => ele.address.toLowerCase() == element.toLowerCase())[0].code}</p>
                              </div>
                              {/* {item.dex.map((ele, id) => ( */}
                              <div className="flex flex-row rounded-md dark:bg-[#334155]">
                                <p className="ml-2 max-w-full text-center">{dexList.filter(ele => ele.address.toLowerCase() == adapters[index].toLowerCase())[0].dex}</p>
                                {/* <p className="w-20 max-w-full text-center">{`${'100'}%`}</p> */}
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
          </div>

          <div className="h-[20%] max-h-full col-span-1" style={{ display: "table-cell", minWidth: "50px" }}>
            <div className="mx-3" style={{ position: "absolute", top: "50%" }}>
              {outCoin[0]?.icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
