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
import { Listbox } from '@/components/ui/listbox';
import { Transition } from '@/components/ui/transition';
import DashboardLayout from '@/layouts/_dashboard';
import Layout from '@/layouts/_layout';
import TradeContainer from '@/components/ui/trade';
import { useModal } from '@/components/modal-views/context';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

const sort = [
  { id: 1, name: 'Hot' },
  { id: 2, name: 'APR' },
  { id: 3, name: 'Earned' },
  { id: 4, name: 'Total staked' },
  { id: 5, name: 'Latest' },
];

const SwapPage: NextPageWithLayout = () => {
  const { openModal } = useModal();
  let [selectedItem, setSelectedItem] = useState(sort[0]);
  let [toggleCoin, setToggleCoin] = useState(false);
  let [baseToken, setBaseToken] = useState({});
  let [targetToken, setTargetToken] = useState({});
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const getBaseToken = () => {
    // setBaseToken(data);
    console.log(baseToken);
  };
  return (
    <>
      <NextSeo
        title="Apexswap - Trade"
        description="Apexswap - Avalanche DEX"
      />

      <div className="grid gird-cols-1 md:grid-rows-7 md:grid-cols-3 gap-4">
        {/* Swap box */}
        <div className="row-span-6">
          <TradeContainer>
            <div className=" row-span-3 dark:border-gray-800 xs:mb-2 xs:pb-6 ">
              <div className="w-[105%] flex flex-row justify-between my-4">
                <div className="grid grid-cols-1 place-items-center">
                  <div className="font-medium">Dex Aggregator</div>
                </div>
                <div className="pr-5 flex flex-row">
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
                className={cn(
                  'relative flex gap-3',
                  toggleCoin ? 'flex-col-reverse' : 'flex-col'
                )}
              >
                <CoinInput
                  label={'You Pay'}
                  exchangeRate={1580}
                  defaultCoinIndex={0}
                  getCoinValue={(data) => {
                    console.log('From coin value:', data);
                    setBaseToken(data);
                  }}
                />
                <div className="grid grid-cols-1 place-items-center">
                  <Button
                    size="mini"
                    color="info"
                    shape="circle"
                    variant="transparent"
                    className=" mt-1 uppercase xs:tracking-widest"
                    onClick={() => setToggleCoin(!toggleCoin)}
                  >
                    <SwapIcon className="h-auto w-3" />
                  </Button>
                </div>
                <CoinInput
                  label={'You Receive'}
                  disabled={true}
                  exchangeRate={1}
                  defaultCoinIndex={1}
                  getCoinValue={(data) => {
                    console.log('To coin value:', data);
                    setTargetToken(data);
                  }}
                />
              </div>
            </div>
            <div className="px-2 flex flex-col gap-4 xs:gap-[18px]">
              <TransactionInfo label={'Min. Received'} value={'2450 USDC'} />
              <TransactionInfo label={'Rate'} value={'1580 ETH/USDC'} />
              <TransactionInfo label={'Price Slippage'} value={'1%'} />
              <TransactionInfo label={'Network Fee'} value={'0.5 USD'} />
            </div>
            <div className="px-2 mt-6 w-[105%] flex flex-row justify-between">
              <div className="grid grid-cols-1 place-items-center">
                <div className="text-sm">Route</div>
              </div>
              <div className="flex flex-row">
                <div
                  className="text-sm pr-5"
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
              className=" dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-500 mt-3 uppercase xs:mt-4 xs:tracking-widest"
            >
              SWAP
            </Button>
          </TradeContainer>
        </div>

        {/* Trading View */}
        <div className="w-full text-large text-center rounded-lg shadow-card dark:bg-[#161b1d] border border-[#374151] mt-5 pb-5 md:row-span-4 md:col-span-2 xs:mb-2 xs:pb-6">
          <AdvancedRealTimeChart
            theme="dark"
            autosize
            symbol="ETHUSDC"
            interval="1"
          ></AdvancedRealTimeChart>
        </div>

        {/* Orders */}
        <div className="w-full text-large shadow-card dark:bg-[#161b1d] rounded-lg border border-[#374151] mt-5 pb-5 md:row-span-3 md:col-span-2 xs:mb-2 xs:pb-6">
          <div className="pl-5 mt-2 p-2 text-lg">All Orders</div>
          <div className="mt-2 flex flex-row justify-between">
            <div className="px-4 flex flex-row">
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
            <div className="px-4 flex flex-row items-center">
              <div className="mx-5 flex flex-row items-center">
                <div className="text-xs xs:tracking-widest mx-2">
                  All Types
                  {/* <Listbox value={selectedItem} onChange={setSelectedItem}>
                    <div className="text-xs xs:tracking-widest mx-2">
                      {selectedItem.name}
                      <ChevronDown />
                    </div>
                    <Transition
                      enter="ease-out duration-200"
                      enterFrom="opacity-0 translate-y-2"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-2"
                      leaveTo="opacity-0 translate-y-2"
                    >
                      <Listbox.Options className="absolute left-0 z-10 mt-2 origin-top-right rounded-lg bg-white p-3 shadow-large dark:bg-light-dark">
                        {sort.map((item) => (
                          <Listbox.Option key={item.id} value={item}>
                            {({ selected }) => (
                              <div
                                className={`block cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-900 transition dark:text-white  ${
                                  selected
                                    ? 'my-1 bg-gray-100 dark:bg-dark'
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
                  </Listbox> */}
                </div>
                <ChevronDown />
              </div>
              <div className="mx-5 flex flex-row items-center">
                <div className="text-xs xs:tracking-widest mx-2">
                  All Statuses
                </div>
                <ChevronDown />
              </div>
            </div>
          </div>
          {/* <div className="text-center mt-20"> Please connect wallet.</div> */}
          <div className="mt-2 px-4">
            <table >
              <tr>
                <th>Token Pair</th>
                <th>Amount</th>
                <th>Limit Price</th>
                <th>Filled Price</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Fee</th>
              </tr>
              <tr>
                <td>ETH/USDC</td>
                <td>1.3 ETH</td>
                <td>1580</td>
                <td>1588</td>
                <td>completed</td>
                <td>{date + ' ' + time}</td>
                <td>0.0014 ETH</td>
              </tr>
              <tr>
                <td>ETH/USDC</td>
                <td>1.5 ETH</td>
                <td>1580</td>
                <td></td>
                <td>pending</td>
                <td>{date + ' ' + time}</td>
                <td>0.0014 ETH</td>
              </tr>
              <tr>
                <td>ETH/USDC</td>
                <td>1.4 ETH</td>
                <td>1580</td>
                <td></td>
                <td>pending</td>
                <td>{date + ' ' + time}</td>
                <td>0.0014 ETH</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

SwapPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default SwapPage;
