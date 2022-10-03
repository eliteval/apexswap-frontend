import { useState } from 'react';
import cn from 'classnames';
import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import DashboardLayout from '@/layouts/_dashboard';
import Layout from '@/layouts/_layout';
import Button from '@/components/ui/button';
import BridgeInput from '@/components/ui/bridge-input';
import { OptionIcon } from '@/components/icons/option';
import { InfoCircle } from '@/components/icons/info-circle';
import { SwapIcon } from '@/components/icons/swap-icon';
import { Listbox } from '@/components/ui/listbox';
import { Transition } from '@/components/ui/transition';
import NftDropDown from '@/components/nft/nft-dropdown';
// import ETH from '@/assets/images/coin/eth2.svg';
// import BNB from '@/assets/images/coin/bnb.svg';
import { Ethereum } from '@/components/icons/ethereum';
import { Bnb } from '@/components/icons/bnb';
import { Gear } from '@/components/icons/gear';
import Image from '@/components/ui/image';
import { ChevronDown } from '@/components/icons/chevron-down';
import TransactionInfo from '@/components/ui/transaction-info';
import { Plus } from '@/components/icons/plus';
import ActiveLink from '@/components/ui/links/active-link';
import TradeContainer from '@/components/ui/trade';

const sort = [
  { id: 1, icon: <Ethereum />, name: 'Ethereum Mainnet' },
  { id: 2, icon: <Bnb />, name: 'BinanceSmartChain Mainnet' },
];

function SortList() {
  const [selectedItem, setSelectedItem] = useState(sort[0]);

  return (
    <div className="relative w-full md:w-auto">
      <Listbox value={selectedItem} onChange={setSelectedItem}>
        <Listbox.Button className="flex h-11 w-full items-center rounded-2xl bg-gray-100 pr-4 text-sm text-gray-900 dark:bg-[#0f0f0e] dark:text-white ">
          <span className="px-2">{selectedItem.icon}</span>
          <span className="pr-2">{selectedItem.name}</span>
          <ChevronDown style={{ color: '#7676d1' }} />
        </Listbox.Button>
        <Transition
          enter="ease-out duration-200"
          // enterFrom=" translate-y-2"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 -translate-y-0"
          // leaveTo="opacity-0 translate-y-2"
        >
          <Listbox.Options className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-lg bg-white shadow-large dark:bg-[#303030]">
            {sort.map((item) => (
              <Listbox.Option key={item.id} value={item}>
                {({ selected }) => (
                  <div
                    className={`block cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition dark:text-white  ${
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
  { id: 1, icon: <Ethereum />, name: 'Ethereum Mainnet' },
  { id: 2, icon: <Bnb />, name: 'BinanceSamrtChain Mainnet' },
];

function SortList2() {
  const [selectedItem, setSelectedItem] = useState(sort2[1]);

  return (
    <div className="relative w-full md:w-auto">
      <Listbox value={selectedItem} onChange={setSelectedItem}>
        <Listbox.Button className="flex h-11 w-full items-center rounded-2xl bg-gray-100 pr-4 text-sm text-gray-900 dark:bg-[#0f0f0e] dark:text-white ">
          <span className="px-2">{selectedItem.icon}</span>
          <span className="pr-2">{selectedItem.name}</span>
          <ChevronDown style={{ color: '#7676d1' }} />
        </Listbox.Button>
        <Transition
          enter="ease-out duration-200"
          // enterFrom=" translate-y-2"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 -translate-y-0"
          // leaveTo="opacity-0 translate-y-2"
        >
          <Listbox.Options className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-lg bg-white shadow-large dark:bg-[#303030]">
            {sort.map((item) => (
              <Listbox.Option key={item.id} value={item}>
                {({ selected }) => (
                  <div
                    className={`block cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition dark:text-white  ${
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

const BridgePage: NextPageWithLayout = () => {
  let [toggleCoin, setToggleCoin] = useState(false);
  return (
    <>
      <NextSeo title="Bridge" description="Apexswap - Avalanche DEX" />
      {/* <TradeContainer> */}
      <div className="text-sm ">
        <div className=" mt-6 w-full max-w-lg rounded-lg border border-[#374151] bg-white  shadow-card dark:bg-[#161b1d] xs:p-4 xs:pt-5">
          <div className="mb-2 min-w-[400px] pb-1 xs:mb-2 xs:pb-2">
            <div className="my-4 flex flex-row justify-between">
              <div className="flex items-center">
                <div className="mr-2 font-medium">From</div>
                <SortList />
              </div>
              <div className="flex items-center">
                {/* <InfoCircle
                className="mr-3 h-auto w-4"
                style={{ cursor: 'pointer' }}
              />
              <OptionIcon
                className="mr-1 h-auto w-4"
                onClick={() => {
                  openModal('SETTINGS');
                }}
                style={{ cursor: 'pointer' }}
              /> */}
                {/* <Image src={nut} alt="avatar" width={30} height={30} /> */}
                <Gear />
              </div>
            </div>
            <div className="relative flex flex-col gap-3">
              <div
              // className={cn(
              //   'relative flex gap-3',
              //   toggleCoin ? 'flex-col-reverse' : 'flex-col'
              // )}
              >
                <BridgeInput
                  label={'Send:'}
                  exchangeRate={0.0}
                  defaultCoinIndex={0}
                  getCoinValue={(data) => console.log('From coin value:', data)}
                />
                <div className="my-2 grid grid-cols-1 place-items-center">
                  <Button
                    size="mini"
                    color="info"
                    shape="circle"
                    variant="transparent"
                    className=" uppercase xs:tracking-widest"
                    onClick={() => setToggleCoin(!toggleCoin)}
                  >
                    <SwapIcon className="h-auto w-3" />
                  </Button>
                </div>
                {/* <div className="flex flex-row justify-between"> */}
                <div className="flex items-center">
                  <div className="mr-6 font-medium">To</div>
                  <SortList2 />
                </div>
                {/* <div className="flex flex-row pr-5"></div>
              </div> */}
                <div className="mt-4">
                  <BridgeInput
                    label={'Receive(estimated):'}
                    exchangeRate={0.0}
                    defaultCoinIndex={1}
                    getCoinValue={(data) => console.log('To coin value:', data)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col gap-4 xs:gap-[18px]">
          <TransactionInfo label={'13.77 eth per btc'} value={'0%'} />
          <TransactionInfo
            label={'0.072631 Btc per ETH'}
            value={'Share of Pool'}
          />
        </div> */}
          <div className="mt-2 grid grid-cols-1 xs:mt-4">
            <Button
              size="large"
              id=""
              shape="rounded"
              fullWidth={true}
              className=" mt-3 uppercase dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-500 xs:mt-4 xs:tracking-widest"
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
      {/* </TradeContainer> */}
    </>
  );
};

BridgePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default BridgePage;
