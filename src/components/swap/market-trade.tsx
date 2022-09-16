import { useEffect, useState, useMemo } from 'react';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import Scrollbar from '@/components/ui/scrollbar';
import AllTokens from '@/components/ui/all-tokens';
import Button from '@/components/ui/button';


export default function MarketTrade({ ...props }) {
  return (
    <>
      <div className="flex min-h-[50px] w-full items-center justify-around border-b border-b-[#374151]">
        <Button
          size="mini"
          color="gray"
          shape="rounded"
          variant="ghost"
          className="mx-1 w-[90%] text-sm xs:tracking-widest"
        >
          Favorites
        </Button>
        <Button
          size="mini"
          color="gray"
          shape="rounded"
          variant="ghost"
          className="mx-1 w-[90%] text-sm xs:tracking-widest"
        >
          My Wallet
        </Button>
        <Button
          size="mini"
          color="primary"
          shape="rounded"
          variant="transparent"
          className="w-[90%] text-sm xs:tracking-widest"
        >
          Market
        </Button>
      </div>
      <div className="flex resize-y flex-col divide-y divide-[#374151]">
        <div className="text-xs">
          <ParamTab
            tabMenu={[
              {
                title: 'All Tokens',
                path: 'tokens',
              },
              {
                title: 'Imported',
                path: 'imported',
              },
              {
                title: 'DeFi',
                path: 'defi',
              },
            ]}
          >
            <Scrollbar style={{ height: 'calc(100% - 32px)' }}>
              <TabPanel className="h-[240px] max-h-[240px] focus:outline-none">
                <div className="flex flex-row">
                  <div className="w-3/5">
                    <div className="mb-2 text-xs text-gray-900 dark:text-white">
                      <div className="px-1">
                        <AllTokens
                          from={'ETH'}
                          to={'USDT'}
                          price={174655397.13}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-2/5">
                    <div className=" mb-2 flex flex-col">
                      <span className="pr-1 text-right text-sm dark:text-white">
                        ${273.815}
                      </span>
                      <div className="mt-1 px-1 text-right text-xs text-red-400 text-gray-900">
                        {-3.04}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="w-3/5">
                    <div className="mb-2 text-xs text-gray-900 dark:text-white">
                      <div className="px-1">
                        <AllTokens
                          from={'ETH'}
                          to={'USDT'}
                          price={174655397.13}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-2/5">
                    <div className=" mb-2 flex flex-col">
                      <span className="pr-1 text-right text-sm dark:text-white">
                        ${273.815}
                      </span>
                      <div className="mt-1 px-1 text-right text-xs text-red-400 text-gray-900">
                        {-3.04}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="w-3/5">
                    <div className="mb-2 text-xs text-gray-900 dark:text-white">
                      <div className="px-1">
                        <AllTokens
                          from={'ETH'}
                          to={'USDC'}
                          price={174655397.13}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-2/5">
                    <div className=" mb-2 flex flex-col">
                      <span className="pr-1 text-right text-sm dark:text-white">
                        ${273.815}
                      </span>
                      <div className="mt-1 px-1 text-right text-xs text-red-400 text-gray-900">
                        {-3.04}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="w-3/5">
                    <div className="mb-2 text-xs text-gray-900 dark:text-white">
                      <div className="px-1">
                        <AllTokens
                          from={'BTC'}
                          to={'USDT'}
                          price={174655397.13}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-2/5">
                    <div className=" mb-2 flex flex-col">
                      <span className="pr-1 text-right text-sm dark:text-white">
                        ${273.815}
                      </span>
                      <div className="mt-1 px-1 text-right text-xs text-red-400 text-gray-900">
                        {-3.04}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="w-3/5">
                    <div className="mb-2 text-xs text-gray-900 dark:text-white">
                      <div className="px-1">
                        <AllTokens
                          from={'ETH'}
                          to={'USDT'}
                          price={174655397.13}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-2/5">
                    <div className=" mb-2 flex flex-col">
                      <span className="pr-1 text-right text-sm dark:text-white">
                        ${273.815}
                      </span>
                      <div className="mt-1 px-1 text-right text-xs text-red-400 text-gray-900">
                        {-3.04}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="w-3/5">
                    <div className="mb-2 text-xs text-gray-900 dark:text-white">
                      <div className="px-1">
                        <AllTokens
                          from={'BTC'}
                          to={'USDT'}
                          price={174655397.13}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-2/5">
                    <div className=" mb-2 flex flex-col">
                      <span className="pr-1 text-right text-sm dark:text-white">
                        ${273.815}
                      </span>
                      <div className="mt-1 px-1 text-right text-xs text-red-400 text-gray-900">
                        {-3.04}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="w-3/5">
                    <div className="mb-2 text-xs text-gray-900 dark:text-white">
                      <div className="px-1">
                        <AllTokens
                          from={'BTC'}
                          to={'USDT'}
                          price={174655397.13}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-2/5">
                    <div className=" mb-2 flex flex-col">
                      <span className="pr-1 text-right text-sm dark:text-white">
                        ${273.815}
                      </span>
                      <div className="mt-1 px-1 text-right text-xs text-red-400 text-gray-900">
                        {-3.04}%
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </Scrollbar>
            <TabPanel className="h-[240px] max-h-[240px] focus:outline-none">
              <div className="space-y-6">
                <div className="block">
                  <div className="mb-2 text-xs text-gray-900 dark:text-white">
                    Imported
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel className="h-[240px] max-h-[240px] focus:outline-none">
              <div className="space-y-6">
                <div className="block">
                  <div className="mb-2 text-xs text-gray-900 dark:text-white">
                    DeFi
                  </div>
                </div>
              </div>
            </TabPanel>
          </ParamTab>
        </div>
        <div className="">
          <div className="w-full px-4 py-2 text-left">Market Trade</div>
          <div className="px-2 flex flex-row items-center pb-1">
            <div className="w-[35%] text-right text-xs text-stone-400">
              <span>Price</span>
              <span>(USD)</span>
            </div>
            <div className="w-[35%] text-right text-xs text-stone-400">
              Total(USD)
            </div>
            <div className="w-[30%] text-right text-xs text-stone-400">
              Time
            </div>
          </div>
          <Scrollbar style={{ height: 'calc(100% - 32px)' }}>
            <div className="h-[460px] max-h-[480px] flex w-full flex-col px-2">
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-green-400">
                  1555.809
                </div>
                <div className="w-[35%] text-right text-green-400">
                  2.97
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-red-400">
                  116.01
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-red-400">
                  232.47
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-red-400">
                  122.71
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-green-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-green-400">
                  232.26
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-green-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-green-400">
                  82.84
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-red-400">
                  132.62
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-red-400">
                  262.02
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-green-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-green-400">
                  212.53
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-red-400">
                  232.47
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-red-400">
                  232.47
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-red-400">
                  232.47
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:28:04
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-green-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-green-400">
                  232.47
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:28:04
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-red-400">
                  232.47
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:28:04
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-green-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-green-400">
                  232.47
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:28:04
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-red-400">
                  232.47
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:28:04
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-red-400">
                  232.47
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:28:04
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-green-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-green-400">
                  82.84
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-red-400">
                  132.62
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-red-400">
                  262.02
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.810
                </div>
                <div className="w-[35%] text-right text-red-400">
                  262.02
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.910
                </div>
                <div className="w-[35%] text-right text-red-400">
                  262.02
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.710
                </div>
                <div className="w-[35%] text-right text-red-400">
                  262.02
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.710
                </div>
                <div className="w-[35%] text-right text-red-400">
                  262.02
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.710
                </div>
                <div className="w-[35%] text-right text-red-400">
                  262.02
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.710
                </div>
                <div className="w-[35%] text-right text-red-400">
                  262.02
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-[35%] text-right text-red-400">
                  1555.710
                </div>
                <div className="w-[35%] text-right text-red-400">
                  262.02
                </div>
                <div className="w-[30%] text-right text-stone-400">
                  1:27:46
                </div>
              </div>
            </div>
          </Scrollbar>
        </div>
      </div>
    </>
  );
};
