import { Bitcoin } from '@/components/icons/bitcoin';
import { Ethereum } from '@/components/icons/ethereum';
import { Tether } from '@/components/icons/tether';
import { Bnb } from '@/components/icons/bnb';
import { Usdc } from '@/components/icons/usdc';
import { Cardano } from '@/components/icons/cardano';
import { Doge } from '@/components/icons/doge';

export type CoinList2 = 'BTC' | 'ETH' | 'USDT' | 'BNB' | 'USDC' | 'ADA' | 'DOGE';

const coinIcons: Record<CoinList2, JSX.Element> = {
  BTC: <Bitcoin />,
  ETH: <Ethereum />,
  USDT: <Tether />,
  BNB: <Bnb />,
  USDC: <Usdc />,
  ADA: <Cardano />,
  DOGE: <Doge />,
};

interface AllTokensProps {
  from: CoinList2;
  to: CoinList2;
  price: Number;
}

export default function AllTokens({
  from,
  to,
  price,
}: AllTokensProps) {
  return (
    <div className="flex flex-row">
      <div className="flex items-center">
        <div className="relative">{coinIcons[from]}</div>
        {/* <div className="ltr:-ml-1.5 rtl:-mr-1.5">{coinIcons[to]}</div> */}
      </div>
      <div className="flex flex-col">
        <div className="px-1 text-sm text-left font-medium uppercase text-black dark:text-white">
          {from}-{to}
        </div>
        <div className="px-1 text-[#8d8d8d] text-xs text-left mt-1 text-gray-900">Vol.${price}</div>
      </div>
    </div>
  );
}
