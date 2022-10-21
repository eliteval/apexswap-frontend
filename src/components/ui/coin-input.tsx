import { useEffect, useState, useRef, useMemo, useContext } from 'react';
import type { CoinTypes } from '@/types';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import { ChevronDown } from '@/components/icons/chevron-down';
import { useClickAway } from '@/lib/hooks/use-click-away';
import { useLockBodyScroll } from '@/lib/hooks/use-lock-body-scroll';
import { HookContext } from '@/lib/hooks/use-hook';
import { coinList } from '@/data/static/coin-list';

// dynamic import
const CoinSelectView = dynamic(
  () => import('@/components/ui/coin-select-view')
);

interface CoinInputTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isInbox?: boolean;
  showmax?: boolean;
  usdPrice?: number;
  defaultValue?: number;
  coinIndex?: number;
  showvalue?: number;
  tokenBalance?: number;
  // className?: string;
  onChangeTokenIndex?: (param: number) => void;
  onchangeAmount?: (param: string) => void;
  monFocus?: () => void;
  data?: object;
}

const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;

export default function CoinInput({
  label,
  isInbox = false,
  showmax,
  showvalue,
  tokenBalance,
  onChangeTokenIndex,
  onchangeAmount,
  monFocus,
  data,
  defaultValue = 0,
  coinIndex = 0,
  usdPrice,
  // className,
  ...rest
}: CoinInputTypes) {
  const { coinslist, isNatativeToken, getCoinDecimals, getCoinName, isDevenv } =
    useContext(HookContext);

  const [value, setValue] = useState(defaultValue);
  const [selectedCoin, setSelectedCoin] = useState(coinslist[0]);
  const [coindecimal, setCoinDecimal] = useState(6);
  const [visibleCoinList, setVisibleCoinList] = useState(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   setValue(defaultValue)
  // }, [defaultValue]);
  useEffect(() => {
    setSelectedCoin(coinList[coinIndex])
  }, [coinIndex]);
  useEffect(() => {
    var decimal = getCoinDecimals(selectedCoin.address);
    setCoinDecimal(decimal)
  }, [selectedCoin]);
  useClickAway(modalContainerRef, () => {
    setVisibleCoinList(false);
  });
  useLockBodyScroll(visibleCoinList);
  const handleOnChange = (value: string, decimal?: number) => {
    value = value.replace(',', '.');
    if (String(value).match(decimalPattern)) {
      if (typeof decimal !== 'undefined') {
        onchangeAmount(Number(value).toFixed(decimal));
        setValue(Number(value).toFixed(decimal));
      }
      else {
        onchangeAmount(Number(value));
        setValue(value);
      }

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
  };

  const handleFocus = () => {
    monFocus();
  };
  return (
    <>
      <div>
        <div className=" block min-h-[70px] rounded-t-[10px] px-4  transition-colors duration-200 dark:bg-[#4910BA]">
          {isDevenv && <div className="mt-0.5 mb-0.5 min-h-[10px] flex justify-between bg-[#6910BA]">
            <h6>{coinIndex}</h6>
            <h6>{getCoinName(selectedCoin.address)}({coindecimal})</h6>
            <h6>{value}</h6>
          </div>}

          <div className="mt-0.5 mb-0.5 flex min-h-[10px] flex-row justify-between">
            <span className="mt-2 mb-0.5 block min-h-[10px] text-xs text-gray-600 dark:text-white">
              {label}{' '}
            </span>
          </div>
          <div className="flex min-h-[60px] flex-row items-center justify-between">
            <button
              onClick={() => setVisibleCoinList(true)}
              className="flex min-w-[80px] items-center font-medium outline-none dark:text-gray-100"
            >
              {coinslist[coinIndex]?.icon2}{' '}
              <span className="ltr:ml-2 rtl:mr-2">
                {coinslist[coinIndex]?.code}
              </span>
              <ChevronDown className="ltr:ml-1.5 rtl:mr-1.5" />
            </button>
            <input
              type="text"
              value={isInbox ? value : showvalue?.toFixed(6)}
              placeholder="0.0"
              inputMode="decimal"
              onChange={(e) => handleOnChange(e.target.value)}
              onClick={() => handleFocus()}
              className={cn(
                'h-[23px] w-1/2 rounded-[10px] border-0 px-4 text-right outline-none dark:bg-[#000B2F]/10 dark:focus:ring-0'
              )}
              style={{ height: '40px' }}
            />
          </div>
        </div>
        <div className="py-auto block min-h-[28px] rounded-b-[10px] px-4 dark:bg-[#FFFFFF]">
          <div className="flex flex-row items-center justify-between">
            <span className="primary-font-family font-size-10 font-weight-500 mt-1 text-black">
              Balance: {tokenBalance?.toFixed(6)}
            </span>
            <div className="font-xs primary-font-family font-size-10 font-weight-500 text-right text-black">
              {showmax ? (
                <div className="h-100 flex flex-row items-center gap-1">
                  <div
                    className="mr-2 block min-h-[10px] border-b border-b-dark text-right text-xs text-gray-600 dark:text-dark"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      handleOnChange(String(Number(tokenBalance) / 2), 6);
                    }}
                  >
                    50%
                  </div>
                  <div
                    className="block min-h-[10px] border-b border-b-dark text-right text-xs text-gray-600 dark:text-dark"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (isNatativeToken(selectedCoin.address)) {
                        handleOnChange(
                          String((Number(tokenBalance) - 0.01).toFixed(6))
                        );
                      }

                      else handleOnChange(String(Number(tokenBalance)));
                    }}
                  >
                    Max
                  </div>
                </div>
              ) : (
                <></>
              )}
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
