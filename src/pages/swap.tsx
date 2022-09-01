import { useState } from 'react';
import type { NextPageWithLayout } from '@/types';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import Button from '@/components/ui/button';
import CoinInput from '@/components/ui/coin-input';
import TransactionInfo from '@/components/ui/transaction-info';
import { SwapIcon } from '@/components/icons/swap-icon';
import DashboardLayout from '@/layouts/_dashboard';
import Layout from '@/layouts/_layout';
import TradeContainer from '@/components/ui/trade';
import { useModal } from '@/components/modal-views/context';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

const SwapPage: NextPageWithLayout = () => {
  const { openModal } = useModal();
  let [toggleCoin, setToggleCoin] = useState(false);
  let [baseToken, setBaseToken] = useState({});
  let [targetToken, setTargetToken] = useState({});
  const getBaseToken = () => {
    // setBaseToken(data);
    console.log(baseToken);
  }
  return (
    <>
      <NextSeo
        title="Apexswap - Trade"
        description="Apexswap - Avalanche DEX"
      />

      {/* Swap box */}
      <div className="row-span-3">
        <TradeContainer>
          <div className="py-5 row-span-3 dark:border-gray-800 xs:mb-2 xs:pb-6 ">
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
                  // color="info"
                  shape="circle"
                  className="MyElement mt-1 uppercase xs:tracking-widest"
                  onClick={() => setToggleCoin(!toggleCoin)}
                >
                  <SwapIcon className="h-auto w-3" />
                </Button>
                {/* <Button
                    onClick={() => openModal('WALLET_CONNECT_VIEW')}
                    className="shadow-main hover:shadow-large"
                  >
                    CONNECT
                  </Button> */}
              </div>
              <CoinInput
                label={'You Receive'}
                exchangeRate={280}
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
              <div className="text-sm">
                Route
              </div>
            </div>
            <div className="flex flex-row">
              <div className="text-sm pr-5" onClick={() => { openModal('ROUTING') }} style={{ cursor: "pointer" }}>
                3 steps in the route
              </div>
            </div>
          </div>
          <Button
            size="large"
            id=""
            shape="rounded"
            fullWidth={true}
            className="MyElement mt-3 uppercase xs:mt-4 xs:tracking-widest"
          >
            SWAP
          </Button>
        </TradeContainer>
      </div>

      {/* Trading View */}
      <div className="w-full text-large text-center rounded-lg shadow-card dark:bg-[#161B1D] border border-[#374151] mt-5 pb-5 row-span-2 col-span-2 xs:mb-2 xs:pb-6">
        <AdvancedRealTimeChart theme="dark" autosize symbol="ETHUSDC" interval="1"></AdvancedRealTimeChart>
      </div>

      {/* Orders */}
      <div className="w-full text-large shadow-card dark:bg-[#161B1D] rounded-lg border border-[#374151] mt-5 pb-5 col-span-2 xs:mb-2 xs:pb-6">
        <div className="pl-5 mt-2 p-2 text-lg">
          All Orders
        </div>
        <div className="mt-2 flex flex-row justify-between">
          <div className="px-4 flex flex-row">
            <Button
              size="mini"
              color="warning"
              shape="rounded"
              // variant="transparent"
              className="text-sm xs:tracking-widest"
            >
              Active Orders(0)
            </Button>
            <Button
              size="mini"
              color="primary"
              shape="rounded"
              variant="transparent"
              className="mx-1 text-sm xs:tracking-widest"
            >
              Order History
            </Button>
          </div>
          <div className="px-4 flex flex-row items-center">
            <div className="mx-5 text-xs xs:tracking-widest">All Types</div>
            <div className="mx-5 text-xs xs:tracking-widest">All Statuses</div>
          </div>
        </div>
        <div className='text-center mt-10'> Please connect wallet.</div>
      </div>

    </>
  );
};

SwapPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default SwapPage;
