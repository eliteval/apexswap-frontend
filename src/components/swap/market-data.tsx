import { useRef, useEffect, useState, useContext } from 'react';
import { HookContext } from '@/lib/hooks/use-hook';
import CurrencySwapIcons from '@/components/ui/currency-swap-icons';
import cn from 'classnames';
import PairPriceChart from '@/components/swap/pair-price-chart';
import CurrencySwapIcons3 from '@/components/ui/currency-swap-icons3';
import Button from '@/components/ui/button';
import { ChartBar } from '@/components/icons/chart-bar-mini';
import { TrendingUp } from '@/components/icons/trending-up';
import { ArrowsRightLeft } from '@/components/icons/arrows-right-left';
// import { atom, useAtom } from 'jotai';

// // Create your atoms and derivatives
// var marketdataAtom;
// export function useMarketdataAtom() {
//   return { marketdataAtom };
// }

export default function MarketData({ ...props }) {
  const [hours, setHours] = useState('24');
  const [chartType, setChartType] = useState('chart1');
  var { marketData, token_address1, token_address2, token_index1, token_index2 } = props;
  const { getCoinIcon, getCoinCode } = useContext(HookContext);
  // marketdataAtom = atom({hours: hours})

  return (
    <>
      <div className="border-b border-b-[#5841D8]/20 md:flex md:flex-row md:justify-between">
        <div className=" flex items-end">
          {/* {getCoinIcon(token_address1)} */}
          {/* <span className="ml-4 text-base">{getCoinCode(token_address1)}/{getCoinCode(token_address2)}</span> */}
          {/* <CurrencySwapIcons
            from={getCoinCode(token_address1)}
            to={getCoinCode(token_address2)}
          /> */}
          <CurrencySwapIcons3 from={ token_index1} to={ token_index2} />
          <div className="mb-4 ml-2"><ArrowsRightLeft /></div>          
          {/* {marketData.currentPrice && <span className="ml-4 text-left text-lg font-semibold">
            $ {marketData.currentPrice}
          </span>}
          <div className="ml-4 flex h-full items-center">
            <div className="h-1/2 w-[5px] border-r border-r-[#374151]"></div>
          </div> */}
        </div>
        <div className="flex items-baseline">
          <div className="mr-3 mt-8 inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={cn(
                'bg-transparent py-1 px-2 text-sm font-medium ',
                hours === '1' ? 'border-b border-b-[#FEB58D] text-[#FAFAFA]' : 'text-[#BCBCBC]/50'
              )}
              onClick={() => {
                setHours('1');
              }}
            >
              1H
            </button>
            <button
              type="button"
              className={cn(
                'bg-transparent py-1 px-2 text-sm font-medium ',
                hours === '4' ? 'border-b border-b-[#FEB58D] text-[#FAFAFA]' : 'text-[#BCBCBC]/50'
              )}
              onClick={() => {
                setHours('4');
              }}
            >
              4H
            </button>
            <button
              type="button"
              className={cn(
                'bg-transparent py-1 px-2 text-sm font-medium ',
                hours === '24'
                  ? 'border-b border-b-[#FEB58D] text-[#FAFAFA]'
                  : 'text-[#BCBCBC]/50'
              )}
              onClick={() => {
                setHours('24');
              }}
            >
              1D
            </button>
            <button
              type="button"
              className={cn(
                'bg-transparent py-1 px-2 text-sm font-medium ',
                hours === '168'
                  ? 'border-b border-b-[#FEB58D] text-[#FAFAFA]'
                  : 'text-[#BCBCBC]/50'
              )}
              onClick={() => {
                setHours('168');
              }}
            >
              1W
            </button>
            <button
              type="button"
              className={cn(
                'bg-transparent py-1 px-2 text-sm font-medium ',
                hours === '720'
                  ? 'border-b border-b-[#FEB58D] text-[#FAFAFA]'
                  : 'text-[#BCBCBC]/50'
              )}
              onClick={() => {
                setHours('720');
              }}
            >
              1M
            </button>
            <button
              type="button"
              className={cn(
                'bg-transparent py-1 px-2 text-sm font-medium ',
                hours === '4320'
                  ? 'border-b border-b-[#FEB58D] text-[#FAFAFA]'
                  : 'text-[#BCBCBC]/50'
              )}
              onClick={() => {
                setHours('4320');
              }}
            >
              6M
            </button>
          </div>
          <Button
            // id="MyElement"
            size="mini"
            shape="circle"
            // fullWidth={true}
            // className="bg-gradient-to-r from-[#312e81] to-[#1e3a8a] mt-1 uppercase xs:tracking-widest"
            className={cn("mt-1 mr-3 bg-transparent border  rounded-full ",
              chartType==='chart1'?'border-[#FEB58D] text-[#FEB58D]':'border-[#BCBCBC]/50 text-[#BCBCBC]/50'
            )}
            style={{width: '18px', height: '18px'}}
            onClick={() => setChartType('chart1')}
          >
            <TrendingUp />
          </Button>
          <Button
            // id="MyElement"
            size="mini"
            shape="circle"
            // fullWidth={true}
            // className="bg-gradient-to-r from-[#312e81] to-[#1e3a8a] mt-1 uppercase xs:tracking-widest"
            className={cn("mt-1 bg-transparent border rounded-full ",
              chartType==='chart2'?'border-[#FEB58D] text-[#FEB58D]':'border-[#BCBCBC]/50 text-[#BCBCBC]/50'
            )}
            style={{width: '18px', height: '18px'}}
            onClick={() => setChartType('chart2')}
          >
            <ChartBar />
          </Button>
        </div>
        {/* <div className="sm:flex sm:flex-row">
          <div className="ml-4 flex items-center">

            <div className="flex flex-col">
              <span className="text-left text-xs text-[#8d8d8d]">
                24h Price Change(USD)
              </span>
              <div className="flex items-center">
                {marketData.price_change &&
                  <>  <span className="text-left text-sm">
                    ${Number(marketData.price_change).toFixed(3)}
                  </span>
                    <span
                      className={cn(
                        'text-xs',
                        marketData.price_change_p1 > 0
                          ? 'text-green-400'
                          : 'text-red-400'
                      )}
                    >{`(${marketData.price_change_p1}%)`}</span>
                  </>
                }
              </div>
            </div>

            <div className="flex flex-col pl-4">
              <span className="text-left text-xs text-[#8d8d8d]">
                Fully Dilluted Market Cap
              </span>
              <div className="flex items-center">
                {marketData.market_cap &&
                  <> <span className="text-left text-sm">
                    ${marketData.market_cap}
                  </span>

                    <span
                      className={cn(
                        'text-xs',
                        marketData.market_cap_change_p > 0
                          ? 'text-green-400'
                          : 'text-red-400'
                      )}
                    >
                      {`(${marketData.market_cap_change_p}%)`}
                    </span>
                  </>
                }
              </div>
            </div>
          </div>
          <div className="ml-4 flex items-center mt-2 sm:mt-0">

            <div className="flex flex-col">
              <span className="text-left text-xs text-[#8d8d8d]">
                Total Supply
              </span>
              {marketData.total_supply &&
                <span className="text-left text-sm">
                  ${marketData.total_supply}
                </span>}
            </div>

            <div className="flex flex-col pl-20 sm:pl-4">
              <span className="text-left text-xs text-[#8d8d8d]">
                Total Volume
              </span>
              {marketData.total_volume &&
                <span className="text-left text-sm">
                  ${marketData.total_volume}
                </span>}
            </div>
          </div>
        </div> */}
      </div>
      <div className="grid grid-cols-1 divide-x divide-[#374151] lg:grid-cols-3">
        <div className="grid grid-cols-1 divide-y divide-[#374151] lg:col-span-3">
          <div className="mb-8 ">
            <div className="text-left py-4">
              <span className="" style={{fontFamily: 'Poppins', fontSize:'36px', fontWeight: '600'}}>{marketData?.currentPrice}</span>
              <div className="flex flex-row">
                <span className={cn('mr-2 ', 
                    marketData?.price_change_p1>0?'text-[#6FCF97]':'text-[#EB5757]'
                  )} 
                  style={{fontFamily: 'Poppins', fontSize:'12px'}}
                >
                  {marketData?.price_change_p1>0?<span>+</span>:<span>-</span>}
                  <span>{marketData?.price_change_p1}%</span>
                </span>
                <span className="text-[#E0E0E0]" style={{fontFamily: 'Poppins', fontSize:'12px'}}>Past {hours} hours</span>
              </div>
            </div>
            <PairPriceChart
              tokenIn={token_address1}
              tokenOut={token_address2}
              hours={hours}
            />
          </div>
          {/* <div>
            <Orders />
          </div> */}
        </div>

        {/* Market Trades */}
        {/* <div className="lg:col-span-1 ">
          <MarketTrade />
        </div> */}
      </div>
    </>
  );
}
