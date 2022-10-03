import type { CoinTypes } from '@/types';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import { ChevronDown } from '@/components/icons/chevron-down';
import { useClickAway } from '@/lib/hooks/use-click-away';
import { useLockBodyScroll } from '@/lib/hooks/use-lock-body-scroll';
import { coinList } from '@/data/static/coin-list';
import { Ethereum } from '@/components/icons/ethereum';
import { Bnb } from '@/components/icons/bnb';
import { Listbox } from '@/components/ui/listbox';
import { Transition } from '@/components/ui/transition';
// dynamic import
const CoinSelectView = dynamic(() =>
  import('@/components/ui/coin-select-view')
);

interface BridgeInputTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  disabled?: boolean;
  exchangeRate?: number;
  defaultCoinIndex?: number;
  logoSize?: number;
  // className?: string;
  getCoinValue: (param: { coin: string; value: string }) => void;
}

const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;

export default function BridgeInput({
  label,
  disabled,
  getCoinValue,
  defaultCoinIndex = 0,
  logoSize,
  exchangeRate,
  // className,
  ...rest
}: BridgeInputTypes) {
  let [focused, setFocused] = useState(false);
  let [value, setValue] = useState('');
  let [selectedCoin, setSelectedCoin] = useState(coinList[defaultCoinIndex]);
  let [coinIn, setCoinIn] = useState(coinList[defaultCoinIndex]);
  let [coinOut, setCoinOut] = useState(coinList[defaultCoinIndex]);
  let [visibleCoinList, setVisibleCoinList] = useState(false);
  const ratio = 12.8;
  const modalContainerRef = useRef<HTMLDivElement>(null);
  useClickAway(modalContainerRef, () => {
    setVisibleCoinList(false);
  });
  useLockBodyScroll(visibleCoinList);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(decimalPattern)) {
      setValue(event.target.value);
      let param = { coin: selectedCoin.code, value: event.target.value };
      getCoinValue && getCoinValue(param);
    }
  };
  function handleSelectedCoin(coin: CoinTypes) {
    setSelectedCoin(coin);
    !disabled? setCoinIn(coin) : setCoinOut(coin);
    setVisibleCoinList(false);
  }
  const sort = [
    { id: 1, icon: <Ethereum />, name: 'Ethereum Mainnet' },
    { id: 2, icon: <Bnb />, name: 'BinanceSmartChain Mainnet' },
  ];  
  function SortList() {
    const [selectedItem, setSelectedItem] = useState(sort[0]);
  
    return (
      <div className="relative w-full md:w-auto">
        <Listbox value={selectedItem} onChange={setSelectedItem}>
          <Listbox.Button className="flex h-11 w-full items-center rounded-2xl bg-gray-100 pr-4 text-sm text-gray-900 dark:bg-inherit dark:text-white ">
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
  
  return (
    <>
      {/* <div
        className={cn(
          'group flex min-h-[70px] rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:border-blue-400 dark:bg-[#000000]',
          className
        )}
      > */}
      <div className="dark:focus-within:border-blue-600 dark:focus-within:bg-[#0f0f0e] block px-4 min-h-[70px] rounded-2xl border border-gray-200  transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:bg-[#0f1112]">
        <div className="mt-0.5 mb-2 min-h-[10px] flex flex-row justify-between">
          <span className="mt-2 mb-0.5 min-h-[10px] block text-xs text-gray-600 dark:text-gray-400">{label} </span>
          <div className="mt-2 mb-0.5 min-h-[10px] block text-xs text-gray-600 text-right dark:text-gray-400 border-b border-b-gray-400">
            Max:0
          </div>
        </div>
        <div className="mt-1 mb-2 min-h-[10px] flex items-center justify-between">
          <span className="text-lg font-normal">0.0</span>
          <div className="font-sm text-gray-400 text-right">
            {/* <SortList /> */}
            <button
              onClick={() => setVisibleCoinList(true)}
              className="min-w-[80px] flex items-center font-medium outline-none dark:text-gray-100"
            >
              {selectedCoin?.icon}{' '}
              <span className="ltr:ml-2 rtl:mr-2">{selectedCoin?.code} </span>
              <ChevronDown className="ltr:ml-1.5 rtl:mr-1.5" />
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}

      <AnimatePresence>
        {visibleCoinList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-gray-700 bg-opacity-60 p-4 text-center backdrop-blur xs:p-5"
          >
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-full align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <motion.div
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              exit={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              ref={modalContainerRef}
              className="inline-block text-left align-middle"
            >
              <CoinSelectView
                onSelect={(selectedCoin) => handleSelectedCoin(selectedCoin)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

BridgeInput.displayName = 'BridgeInput';
