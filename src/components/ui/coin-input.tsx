import { useEffect, useState, useRef, useMemo, useContext } from 'react';
import type { CoinTypes } from '@/types';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import { ChevronDown } from '@/components/icons/chevron-down';
import { useClickAway } from '@/lib/hooks/use-click-away';
import { useLockBodyScroll } from '@/lib/hooks/use-lock-body-scroll';
import { HookContext } from '@/lib/hooks/use-hook';

// dynamic import
const CoinSelectView = dynamic(
  () => import('@/components/ui/coin-select-view')
);

interface CoinInputTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isInbox?: boolean;
  onToggleTokens?: boolean;
  usdPrice?: number;
  defaultValue?: number;
  coinIndex?: number;
  showvalue?: number;
  tokenBalance?: number;
  // className?: string;
  onChangeTokenIndex?: (param: number) => void;
  onchangeAmount?: (param: string) => void;
  data?: object;
}

const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;

export default function CoinInput({
  label,
  isInbox = false,
  onToggleTokens,
  showvalue,
  tokenBalance,
  onChangeTokenIndex,
  onchangeAmount,
  data,
  defaultValue = 0,
  coinIndex = 0,
  usdPrice,
  // className,
  ...rest
}: CoinInputTypes) {
  const { coinslist, getCoinDecimals, getCoinName } = useContext(HookContext);

  let [value, setValue] = useState(defaultValue);
  let [selectedCoin, setSelectedCoin] = useState(coinslist[coinIndex]);
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
    var coinIndex = coinslist.findIndex(
      (element) => element.address == coin.address
    );
    onChangeTokenIndex(coinIndex);
    setVisibleCoinList(false);
  }

  const handleCloseCoinDialog = () => {
    setVisibleCoinList(false);
  }
  return (
    <>
      <div>
        <div className=" block min-h-[70px] rounded-t-[10px] px-4  transition-colors duration-200 dark:bg-[#4910BA]">
          <div className="mt-0.5 mb-0.5 flex min-h-[10px] flex-row justify-between">
            <span className="mt-2 mb-0.5 block min-h-[10px] text-xs text-gray-600 dark:text-white">
              {label}{' '}
            </span>
            {isInbox ? (
              <div className="flex flex-row gap-1">
                <div
                  className="mt-2 mb-0.5 block min-h-[10px] border-b border-b-white text-right text-xs text-gray-600 dark:text-white"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setValue(tokenBalance / 2);
                    onchangeAmount(tokenBalance / 2);
                  }}
                >
                  50%
                </div>
                <div
                  className="mt-2 mb-0.5 block min-h-[10px] border-b border-b-white text-right text-xs text-gray-600 dark:text-white"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setValue(tokenBalance);
                    onchangeAmount(tokenBalance);
                  }}
                >
                  Max
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex min-h-[60px] flex-row items-center justify-between">
            <button
              onClick={() => setVisibleCoinList(true)}
              className="flex min-w-[80px] items-center font-medium outline-none dark:text-gray-100"
            >
              {onToggleTokens
                ? coinslist[coinIndex]?.icon2
                : selectedCoin?.icon2}{' '}
              <span className="ltr:ml-2 rtl:mr-2">
                {onToggleTokens
                  ? coinslist[coinIndex]?.code
                  : selectedCoin?.code}
              </span>
              <ChevronDown className="ltr:ml-1.5 rtl:mr-1.5" />
            </button>
            <input
              type="text"
              value={isInbox ? value : showvalue?.toFixed(6)}
              placeholder="0.0"
              inputMode="decimal"
              // disabled={!isInbox}
              onChange={handleOnChange}
              className={cn(
                'h-[23px] w-1/2 rounded-[10px] border-0 px-4 text-right outline-none dark:bg-[#000B2F]/10 dark:focus:ring-0',
                // isInbox ? '' : ' bg-gray-100 text-gray-400'
              )}
            // style={{ padding: '0px' }}
            />
          </div>
        </div>
        <div className="py-auto block min-h-[28px] rounded-b-[10px] px-4 dark:bg-[#FFFFFF]">
          <div className="mb-1 flex flex-row justify-between">
            <span
              className="mt-1 text-black primary-font-family font-size-10 font-weight-500"
            >
              Balance: {tokenBalance?.toFixed(6)}
            </span>
            <div
              className="font-xs mt-1 text-right text-black primary-font-family font-size-10 font-weight-500"
            >
              {/* = ${showvalue ? Number(showvalue * usdPrice).toFixed(6) : usdPrice ? Number(value) * usdPrice : '0.00'} */}
              {isInbox && tokenBalance > 0
                ? `${Number((value / tokenBalance) * 100).toFixed(3)}%`
                : isInbox
                  ? '---'
                  : ''}
            </div>
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
                onClose={handleCloseCoinDialog}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

CoinInput.displayName = 'CoinInput';
