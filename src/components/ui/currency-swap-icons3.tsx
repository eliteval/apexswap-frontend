import { Bitcoin } from '@/components/icons/bitcoin';
import { Ethereum } from '@/components/icons/ethereum';
import { Tether } from '@/components/icons/tether';
import { Bnb } from '@/components/icons/bnb';
import { Usdc } from '@/components/icons/usdc';
import { Cardano } from '@/components/icons/cardano';
import { Doge } from '@/components/icons/doge';
import { useRef, useEffect, useState, useContext } from 'react';
import { HookContext } from '@/lib/hooks/use-hook';

export type CoinList = 'BTC' | 'ETH' | 'USDT' | 'BNB' | 'USDC' | 'ADA' | 'DOGE';

const coinIcons: Record<CoinList, JSX.Element> = {
  BTC: <Bitcoin />,
  ETH: <Ethereum />,
  USDT: <Tether />,
  BNB: <Bnb />,
  USDC: <Usdc />,
  ADA: <Cardano />,
  DOGE: <Doge />,
};

interface CurrencySwapIconsProps {
  from: CoinList;
  to: CoinList;
  price: Number;
}

export default function CurrencySwapIcons({
  from,
  to,
  price,
}: CurrencySwapIconsProps) {
  const { coinslist, getCoinIcon, getCoinCode } = useContext(HookContext);
  return (
    <div className="flex flex-row items-center">
      <div className="flex items-center">
        <div className="relative">{coinslist[from]?.icon}</div>
        <div className="ltr:-ml-1.5 rtl:-mr-1.5">{coinslist[to]?.icon}</div>
      </div>
      <div className="mb-2">
        <div className="pl-2 text-left font-medium uppercase text-black dark:text-white">
          <span className="">{coinslist[from]?.code}</span><span className="text-gray-300 ">/{coinslist[to]?.code}</span>
        </div>
        {/* <div className="px-1 text-[#8d8d8d] text-xs text-left mt-1 text-gray-900">Vol.${price}</div> */}
      </div>
    </div>
  );
}
