import { useState } from 'react';
import type { NextPageWithLayout } from '@/types';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import Button from '@/components/ui/button';
import { OptionIcon } from '@/components/icons/option';
import { InfoCircle } from '@/components/icons/info-circle';
import CoinInput from '@/components/ui/coin-input';
import TransactionInfo from '@/components/ui/transaction-info';
import { SwapIcon } from '@/components/icons/swap-icon';
import { ChevronDown } from '@/components/icons/chevron-down';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
// import CurrencySwapIcons from '@/components/ui/currency-swap-icons';
import AllTokens from '@/components/ui/all-tokens';
import { Listbox } from '@/components/ui/listbox';
import { Transition } from '@/components/ui/transition';
import NftDropDown from '@/components/nft/nft-dropdown';
import Image from '@/components/ui/image';
import ETH from '@/assets/images/coin/eth2.svg';
import Scrollbar from '@/components/ui/scrollbar';
import DashboardLayout from '@/layouts/_dashboard';
import Layout from '@/layouts/_layout';
import TradeContainer from '@/components/ui/trade';
import { useModal } from '@/components/modal-views/context';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

const sort1 = [
  { id: 1, name: 'All Types' },
  { id: 2, name: 'Limit' },
  { id: 3, name: 'Stop-Limit' },
];
function SortList() {
  const [selectedItem, setSelectedItem] = useState(sort1[0]);

  return (
    <div className="relative w-full">
      <Listbox value={selectedItem} onChange={setSelectedItem}>
        <Listbox.Button className=" flex h-full items-center rounded-lg bg-gray-100 px-4 text-xs text-gray-900 dark:bg-[#161b1d] dark:text-white">
          <div className="mr-2">{selectedItem.name}</div>
          <ChevronDown />
        </Listbox.Button>
        <Transition
          enter="ease-out duration-200"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 -translate-y-0"
          leaveTo="opacity-0 translate-y-2"
        >
          <Listbox.Options className="absolute w-[120px] left-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-large dark:bg-[#303030]">
            {sort1.map((item) => (
              <Listbox.Option key={item.id} value={item}>
                {({ selected }) => (
                  <div
                    className={`block cursor-pointer rounded-md px-3 py-2 text-xs font-medium text-gray-900 transition dark:text-white  ${
                      selected
                        ? 'my-1 bg-gray-100 dark:bg-gray-600'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.name}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}

const sort2 = [
  { id: 1, name: 'All Statuses' },
  { id: 2, name: 'Open' },
  { id: 3, name: 'Expired' },
  { id: 4, name: 'Failed' },
];
function SortList2() {
  const [selectedItem2, setSelectedItem2] = useState(sort2[0]);

  return (
    <div className="relative w-full">
      <Listbox value={selectedItem2} onChange={setSelectedItem2}>
        <Listbox.Button className=" flex h-full items-center rounded-lg bg-gray-100 px-4 text-xs text-gray-900 dark:bg-[#161b1d] dark:text-white">
          <div className="mr-2">{selectedItem2.name}</div>
          <ChevronDown />
        </Listbox.Button>
        <Transition
          enter="ease-out duration-200"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 -translate-y-0"
          leaveTo="opacity-0 translate-y-2"
        >
          <Listbox.Options className="absolute w-[120px] left-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-large dark:bg-[#303030]">
            {sort2.map((item) => (
              <Listbox.Option key={item.id} value={item}>
                {({ selected }) => (
                  <div
                    className={`block cursor-pointer rounded-md px-3 py-2 text-xs font-medium text-gray-900 transition dark:text-white  ${
                      selected
                        ? 'my-1 bg-gray-100 dark:bg-gray-600'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.name}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}

const SwapPage: NextPageWithLayout = () => {
  const { openModal } = useModal();
  let [selectedItem, setSelectedItem] = useState(sort1[0]);
  let [toggleCoin, setToggleCoin] = useState(false);
  let [baseToken, setBaseToken] = useState(null);
  let [targetToken, setTargetToken] = useState(null);
  var today = new Date();
  var date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  // const getBaseToken = () => {
  // setBaseToken(data);
  console.log('baseToken=>', baseToken);
  // };
  return (
    <>
      <NextSeo
        title="Apexswap - Trade"
        description="Apexswap - Avalanche DEX"
      />

      <div className="xl:grid-rows-7 grid grid-cols-1 gap-4 xl:grid-cols-4">
        {/* Swap box */}
        <div className="xl:col-span-1 xl:row-span-5 xl:row-start-1 xl:row-end-6">
          <TradeContainer>
            <div className=" dark:border-gray-800 xs:mb-2 xs:pb-6 ">
              <div className="my-4 flex w-[105%] flex-row justify-between">
                <div className="grid grid-cols-1 place-items-center">
                  <div className="font-medium">Dex Aggregator</div>
                </div>
                <div className="flex flex-row pr-5">
                  <InfoCircle
                    className="mr-3 h-auto w-4"
                    style={{ cursor: 'pointer' }}
                  />
                  <OptionIcon
                    className="mr-1 h-auto w-4"
                    onClick={() => {
                      openModal('SETTINGS');
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
              <div
              // className={cn(
              //   'relative flex gap-3',
              //   toggleCoin ? 'flex-col-reverse' : 'flex-col'
              // )}
              >
                <CoinInput
                  label={'You Pay'}
                  exchangeRate={1580}
                  defaultCoinIndex={1}
                  getCoinValue={(data) => {
                    console.log('From coin value:', data);
                    setBaseToken(data?.coin);
                  }}
                  data={baseToken}
                />
                <div className="grid grid-cols-1 place-items-center my-2">
                  <Button
                    size="mini"
                    color="info"
                    shape="circle"
                    variant="transparent"
                    className="uppercase xs:tracking-widest"
                    onClick={() => setToggleCoin(!toggleCoin)}
                  >
                    <SwapIcon className="h-auto w-3" />
                  </Button>
                </div>
                <CoinInput
                  label={'You Receive'}
                  disabled={true}
                  exchangeRate={1}
                  defaultCoinIndex={4}
                  getCoinValue={(data) => {
                    console.log('To coin value:', data);
                    setTargetToken(data);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 px-2 xs:gap-[18px]">
              <TransactionInfo label={'Min. Received'} value={'2450 USDC'} />
              <TransactionInfo label={'Rate'} value={'1580 ETH/USDC'} />
              <TransactionInfo label={'Price Slippage'} value={'1%'} />
              <TransactionInfo label={'Network Fee'} value={'0.5 USD'} />
            </div>
            <div className="mt-6 flex w-[105%] flex-row justify-between px-2">
              <div className="grid grid-cols-1 place-items-center">
                <div className="text-sm">Route</div>
              </div>
              <div className="flex flex-row">
                <div
                  className="pr-5 text-sm"
                  onClick={() => {
                    openModal('ROUTING');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  3 steps in the route
                </div>
              </div>
            </div>
            <Button
              size="large"
              id=""
              shape="rounded"
              fullWidth={true}
              className=" mt-3 uppercase dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-500 xs:mt-4 xs:tracking-widest"
            >
              SWAP
            </Button>
          </TradeContainer>
        </div>

        {/* Trading View */}
        <div className="xl:row-end-8 xl:row-span-7 text-large mt-5 w-full rounded-lg border border-[#374151] pb-5 text-center shadow-card dark:bg-[#161b1d] xs:mb-2 xs:pb-6 xl:col-span-3 xl:row-start-1">
          <div className="flex min-h-[50px] flex-row border-b border-b-[#374151]">
            <div className="flex w-1/6 items-center p-2">
              <Image src={ETH} alt="avatar" width={40} height={40} />
              <span className="ml-4 text-xl">Ethereum</span>
            </div>
            <div className=" flex">
              <div className="mr-4 flex items-center px-2">
                <div className="flex flex-col">
                  <span className="text-left text-lg font-semibold">
                    $1555.88
                  </span>
                  <span className="text-left text-xs text-green-400">
                    {0.31}%
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-1/3 w-[5px] border-l border-l-[#374151]"></div>
              </div>
              <div className="flex items-center px-4">
                <div className="flex flex-col">
                  <span className="text-left text-xs text-[#8d8d8d]">
                    24H Volume(USD)
                  </span>
                  <span className="text-left text-sm">${8511706592}</span>
                </div>
                <div className="flex flex-col pl-8">
                  <span className="text-left text-xs text-[#8d8d8d]">
                    Total Liquidity
                  </span>
                  <span className="text-left text-sm">${220390415.83}</span>
                </div>
                <div className="flex flex-col pl-8">
                  <span className="text-left text-xs text-[#8d8d8d]">
                    Fully Dilluted Market Cap
                  </span>
                  <span className="text-left text-sm">${190186857003}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 divide-x divide-[#374151] lg:grid-cols-4">
            <div className="grid grid-cols-1 divide-y divide-[#374151] lg:col-span-3">
              <div className="mb-2 min-h-[620px]">
                <AdvancedRealTimeChart
                  theme="dark"
                  height="97%"
                  width="100%"
                  symbol="ETHUSDC"
                  interval="1"
                ></AdvancedRealTimeChart>
              </div>
              <div className="">
                <div className="mt-6 w-full shrink">
                  <div className="mt-1 w-full shrink lg:flex lg:flex-row lg:justify-between">
                    <div className="flex max-w-[40%] shrink flex-row px-4">
                      <Button
                        size="mini"
                        color="primary"
                        shape="rounded"
                        variant="transparent"
                        className="text-sm xs:tracking-widest"
                      >
                        Active Orders(3)
                      </Button>
                      <Button
                        size="mini"
                        color="gray"
                        shape="rounded"
                        variant="ghost"
                        className="mx-1 text-sm xs:tracking-widest"
                      >
                        Order History
                      </Button>
                    </div>
                    <div className="flex shrink flex-row items-center px-4">
                      <div className=" flex flex-row items-center">
                        {/* <div className="text-xs mx-2">
                          All Types
                        </div>
                        <ChevronDown /> */}
                        {/* <NftDropDown /> */}
                        <SortList />
                      </div>
                      <div className="mx-5 flex flex-row items-center">
                        <SortList2 />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="text-center mt-20"> Please connect wallet.</div> */}
                <div className="mt-6 w-full px-8">
                  <table>
                    <thead>
                      <tr>
                        <th style={{textAlign: 'left'}}>Token Pair</th>
                        <th>Amount</th>
                        <th>Limit Price</th>
                        <th>Filled Price</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th style={{textAlign: 'right'}}>Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{textAlign: 'left'}}>ETH/USDC</td>
                        <td>1.3 ETH</td>
                        <td>1580</td>
                        <td>1588</td>
                        <td>completed</td>
                        <td>2022-9-3 1:27:46</td>
                        <td style={{textAlign: 'right'}}>0.0014 ETH</td>
                      </tr>
                      <tr>
                        <td style={{textAlign: 'left'}}>ETH/USDC</td>
                        <td>1.5 ETH</td>
                        <td>1580</td>
                        <td></td>
                        <td>pending</td>
                        <td>2022-9-3 1:27:46</td>
                        <td style={{textAlign: 'right'}}>0.0014 ETH</td>
                      </tr>
                      <tr>
                        <td style={{textAlign: 'left'}}>ETH/USDC</td>
                        <td>1.4 ETH</td>
                        <td>1580</td>
                        <td></td>
                        <td>pending</td>
                        <td>2022-9-3 1:27:46</td>
                        <td style={{textAlign: 'right'}}>0.0014 ETH</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 ">
              <div className="flex min-h-[50px] w-full items-center justify-around border-b border-b-[#374151]">
                {/* <div className="w-1/3"> */}
                <Button
                  size="mini"
                  color="gray"
                  shape="rounded"
                  variant="ghost"
                  className="mx-1 w-[90%] text-sm xs:tracking-widest"
                >
                  Favorites
                </Button>
                {/* </div>
                <div className="w-1/3"> */}
                <Button
                  size="mini"
                  color="gray"
                  shape="rounded"
                  variant="ghost"
                  className="mx-1 w-[90%] text-sm xs:tracking-widest"
                >
                  My Wallet
                </Button>
                {/* </div>
                <div className="w-1/3"> */}
                <Button
                  size="mini"
                  color="primary"
                  shape="rounded"
                  variant="transparent"
                  className="w-[90%] text-sm xs:tracking-widest"
                >
                  Market
                </Button>
                {/* </div> */}
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
            </div>
          </div>
        </div>

        {/* Orders */}
      </div>
    </>
  );
};

SwapPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default SwapPage;
