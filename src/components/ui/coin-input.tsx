import type { CoinTypes } from '@/types';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import { ChevronDown } from '@/components/icons/chevron-down';
import { useClickAway } from '@/lib/hooks/use-click-away';
import { useLockBodyScroll } from '@/lib/hooks/use-lock-body-scroll';
import { coinList } from '@/data/static/coin-list';
// dynamic import
const CoinSelectView = dynamic(() =>
  import('@/components/ui/coin-select-view')
);

interface CoinInputTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isInbox?: boolean;
  onToggleTokens?: boolean;
  usdPrice?: number;
  defaultValue?: number;
  coinIndex?: number;
  showvalue?: number;
  tokenInBalance?: number;
  // className?: string;
  onChangeTokenIndex: (param: number) => void;
  onchangeAmount: (param: string) => void;
  data?: object;
}

const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;

export default function CoinInput({
  label,
  isInbox = false,
  onToggleTokens,
  showvalue,
  tokenInBalance,
  onChangeTokenIndex,
  onchangeAmount,
  data,
  defaultValue = 0,
  coinIndex = 0,
  usdPrice,
  // className,
  ...rest
}: CoinInputTypes) {
  let [focused, setFocused] = useState(false);
  let [value, setValue] = useState(defaultValue);
  let [selectedCoin, setSelectedCoin] = useState(coinList[coinIndex]);
  let [visibleCoinList, setVisibleCoinList] = useState(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  useClickAway(modalContainerRef, () => {
    setVisibleCoinList(false);
  });
  useLockBodyScroll(visibleCoinList);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(decimalPattern)) {
      setValue(event.target.value);
      let param = { coin: selectedCoin.code, value: event.target.value };
      onchangeAmount(event.target.value);
    }
  };
  function handleSelectedCoin(coin: CoinTypes) {
    setSelectedCoin(coin);
    var coinIndex = coinList.findIndex((element) => element.address == coin.address)
    onChangeTokenIndex(coinIndex);
    setVisibleCoinList(false);
  }
  return (
    <>
      <div className="dark:focus-within:border-blue-600 dark:focus-within:bg-[#0f0f0e] block px-4 min-h-[70px] rounded-lg border border-gray-200  transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:bg-[#0f1112]">
        <div className="mt-0.5 mb-0.5 min-h-[10px] flex flex-row justify-between">
          <span className="mt-2 mb-0.5 min-h-[10px] block text-xs text-gray-600 dark:text-gray-400">{label} </span>
          {isInbox ? <div className="mt-2 mb-0.5 min-h-[10px] block text-xs text-gray-600 text-right dark:text-gray-400 border-b border-b-gray-400" style={{ cursor: "pointer" }}
            onClick={() => setValue(tokenInBalance)}
          >
            Max
          </div> : <></>}

        </div>
        <div className="min-h-[60px] flex flex-row justify-between">
          <button
            onClick={() => setVisibleCoinList(true)}
            className="min-w-[80px] flex items-center font-medium outline-none dark:text-gray-100"
          >
            {onToggleTokens ? coinList[coinIndex]?.icon : selectedCoin?.icon}{' '}
            <span className="ltr:ml-2 rtl:mr-2">{onToggleTokens ? coinList[coinIndex]?.code : selectedCoin?.code}</span>
            <ChevronDown className="ltr:ml-1.5 rtl:mr-1.5" />
          </button>
          <input
            type="text"
            value={isInbox?value:showvalue?.toFixed(6)}
            placeholder="0.0"
            inputMode="decimal"
            disabled={!isInbox}
            onChange={handleOnChange}
            className={cn('w-full rounded-tr-lg rounded-br-lg border-0 text-right text-lg outline-none dark:focus:ring-0 dark:bg-inherit',
              isInbox
                ? ''
                : 'cursor-not-allowed bg-gray-100 text-gray-400'
            )}
            style={{ padding: '0px' }}
          />
        </div>
        <div className="mt-0.5 mb-2 min-h-[10px] flex flex-row justify-between">
          <span>{onToggleTokens ? coinList[coinIndex]?.name : selectedCoin?.name}</span>
          <div className="font-xs text-gray-400 text-right">
            = ${showvalue ? Number(showvalue * usdPrice).toFixed(6) : usdPrice ? Number(value) * usdPrice : '0.00'}
          </div>
        </div>
      </div>

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

CoinInput.displayName = 'CoinInput';
