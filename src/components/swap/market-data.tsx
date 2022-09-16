import { useEffect, useState, useMemo } from 'react';
import cn from 'classnames';
import { coinList } from '@/data/static/coin-list';
import { getCoinIcon, getCoinName } from '@/lib/utils/swap-utils';

export default function MarketData({ ...props }) {
  var { marketData, token_address } = props;
  const [tokenIn, setTokenIn] = useState("")


  return (
    <>
      <div className="flex flex-row" >
        <div className="flex items-center p-2">
          {getCoinIcon(token_address)}
          <span className="ml-4 text-xl">{getCoinName(token_address)}</span>
        </div>
        <div className=" flex">
          <div className="mr-4 flex items-center px-2">
            <div className="flex flex-col">
              <span className="text-left text-lg font-semibold">
                $ {marketData.currentPrice}
              </span>
              {/* <span className="text-left text-xs text-green-400">
                    {0.31}%
                  </span> */}
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-1/3 w-[5px] border-l border-l-[#374151]"></div>
          </div>
          <div className="flex items-center ml-4">
            <div className="flex flex-col">
              <span className="text-left text-xs text-[#8d8d8d]">
                24h Price Change(USD)
              </span>
              <div className="flex items-center">
                <span className="text-left text-sm">${Number(marketData.price_change).toFixed(3)}</span>
                <span className={cn("text-xs", marketData.price_change_p1 > 0 ? 'text-green-400' : 'text-red-400')}>{`(${marketData.price_change_p1}%)`}</span>
              </div>
            </div>
            <div className="flex flex-col pl-4">
              <span className="text-left text-xs text-[#8d8d8d]">
                Fully Dilluted Market Cap
              </span>
              <div className="flex items-center">
                <span className="text-left text-sm">${marketData.market_cap}</span>
                <span className={cn("text-xs",
                  (marketData.market_cap_change_p > 0 ? 'text-green-400' : 'text-red-400'))}>

                  {`(${marketData.market_cap_change_p}%)`}
                </span>
              </div>
            </div>
            <div className="flex flex-col pl-4">
              <span className="text-left text-xs text-[#8d8d8d]">
                Total Supply
              </span>
              <span className="text-left text-sm">${marketData.total_supply}</span>
            </div>
            <div className="flex flex-col pl-4">
              <span className="text-left text-xs text-[#8d8d8d]">
                Total Volume
              </span>
              <span className="text-left text-sm">${marketData.total_volume}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
