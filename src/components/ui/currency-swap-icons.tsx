import { Bitcoin } from '@/components/icons/bitcoin';
import { Ethereum } from '@/components/icons/ethereum';
import { Tether } from '@/components/icons/tether';
import { Bnb } from '@/components/icons/bnb';
import { Usdc } from '@/components/icons/usdc';
import { Cardano } from '@/components/icons/cardano';
import { Doge } from '@/components/icons/doge';

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
  return (
    <div className="flex flex-row items-center">
      <div className="flex items-center">
        <div className="relative">{coinIcons[from]}</div>
        <div className="ltr:-ml-1.5 rtl:-mr-1.5">{coinIcons[to]}</div>
      </div>
      <div className="flex flex-col">
        <div className="pl-2 text-sm text-left font-medium uppercase text-black dark:text-white">
          <span>{from}</span><span className="text-gray-300">/{to}</span>
        </div>
        {/* <div className="px-1 text-[#8d8d8d] text-xs text-left mt-1 text-gray-900">Vol.${price}</div> */}
      </div>
    </div>
  );
}
