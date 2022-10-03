import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import type { NextPageWithLayout } from '@/types';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import Button from '@/components/ui/button';
import { Gear } from '@/components/icons/gear';
import { LoopIcon } from '@/components/icons/loop-icon';
import CoinInput from '@/components/ui/coin-input';
import TransactionInfo from '@/components/ui/transaction-info';
import { SwapIcon } from '@/components/icons/swap-icon';
import Layout from '@/layouts/_layout';
import TradeContainer from '@/components/ui/trade';
import { useModal } from '@/components/modal-views/context';
import { atom, useAtom } from 'jotai';
import { useTextAtom } from '@/components/swap/settings';
// import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';
import { Switch } from '@/components/ui/switch';
import { Link } from 'next/link';
import PairPriceChart from '@/components/swap/pair-price-chart';
import CurrencySwapIcons2 from '@/components/ui/currency-swap-icons2';
import Orders from '@/components/swap/orders';
import MarketTrade from '@/components/swap/market-trade';
import MarketData from '@/components/swap/market-data';
import { ethers } from 'ethers';
import ERC20 from '@/abi/ERC20.json';
import WAVAX from '@/abi/WAVAX.json';
import VixRouter from '@/abi/VixRouter.json';
import { getDexName } from '@/lib/utils/swap-utils';
import { HookContext } from '@/lib/hooks/use-hook';
import { Listbox } from '@/components/ui/listbox';
import { Transition } from '@/components/ui/transition';
import { ChevronDown } from '@/components/icons/chevron-down';
import { priceFeedData } from '../data/static/price-feed-retro';
import { ArrowsRightLeft } from '../components/icons/arrows-right-left';

// Create your atoms and derivatives
var routingAtom, toSettingsAtom;
export function useRoutingAtom() {
  return { routingAtom };
}
export function useSettingsAtom() {
  return { toSettingsAtom };
}

const sort3 = [
  { id: 1, name: '10 Minutes' },
  { id: 2, name: '1 Hour' },
  { id: 3, name: '1 Day' },
  { id: 4, name: '3 Days' },
  { id: 5, name: '7 Days' },
  { id: 6, name: '30 Days' },
  { id: 7, name: '3 Months' },
];
function SortList3() {
  const [selectedItem, setSelectedItem] = useState(sort3[3]);

  return (
    <div className="relative w-full md:w-auto">
      <Listbox value={selectedItem} onChange={setSelectedItem}>
        <Listbox.Button className="flex w-full items-center rounded-lg bg-gray-100 pl-2 text-sm text-gray-900 dark:bg-transparent dark:text-white ">
          {/* <span className="px-2">{selectedItem.icon}</span> */}
          <span className="pr-2 primary-font-family font-size-10">{selectedItem.name}</span>
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
          <Listbox.Options className="absolute left-0 z-10 mt-2 w-full min-w-[78px] origin-top-right rounded-lg bg-white shadow-large dark:bg-[#303030]">
            {sort3.map((item) => (
              <Listbox.Option key={item.id} value={item}>
                {({ selected }) => (
                  <div
                    className={`block cursor-pointer rounded-md px-3 py-1 text-sm font-medium text-gray-900 transition dark:text-white primary-font-family font-size-10 
                      ${
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
const openOrdersHeader = ['Side', 'Size', 'Price', 'Date Created', 'Status'];
const openOrdersData = ['Buy', '1', 257939, '21/09/2022', 'Active'];

const LimitOrderPage: NextPageWithLayout = () => {
  const { coinslist, getCoinDecimals, getCoinName } = useContext(HookContext);

  const [marketData, setMarketData] = useState({});

  const [tokenInIndex, setTokenInIndex] = useState(0); //avax
  const [tokenInPrice, setTokenInPrice] = useState(0);
  const [tokenIn, setTokenIn] = useState('');
  const [tokenInBalance, setTokenInBalance] = useState(0);

  const [tokenOutIndex, setTokenOutIndex] = useState(4); //USDC
  const [tokenOutPrice, setTokenOutPrice] = useState(0);
  const [tokenOut, setTokenOut] = useState('');

  const [amountIn, setAmountIn] = useState(1);
  const [amountOut, setAmountOut] = useState(0);

  const [loading, setLoading] = useState(false);

  const [adapters, setAdapters] = useState([]);
  const [path, setPath] = useState([]);
  const [amounts, setAmounts] = useState([]);

  const [bestDex, setBestDex] = useState('');
  const [bestAmountOut, setBestAmountOut] = useState(0);

  const [tabIndex, setTabIndex] = useState(1);
  let [swch1, setSwch1] = useState(false);
  const [tableIndex, setTableIndex] = useState(1);
  const [toggleCoin, setToggleCoin] = useState(false);

  const [devenv] = useState(false);

  //set tokenin, tokeninbalance
  useEffect(() => {
    const getBalance = async (token_address: string) => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      if (token_address == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
        let userAddress = await signer.getAddress();
        const balance = await provider.getBalance(userAddress);
        return Number(
          ethers.utils.formatUnits(balance, getCoinDecimals(token_address))
        );
      } else {
        let userAddress = await signer.getAddress();

        const tokenContract = new ethers.Contract(
          token_address,
          ERC20.abi,
          signer
        );
        var balance = await tokenContract.balanceOf(userAddress);
        return Number(
          ethers.utils.formatUnits(balance, getCoinDecimals(token_address))
        );
      }
    };

    (async () => {
      var tokenin_address = coinslist[tokenInIndex].address;
      setTokenIn(tokenin_address);
      var balance = await getBalance(tokenin_address);
      setTokenInBalance(balance);
    })();
  }, [tokenInIndex]);
  //set tokenout
  useEffect(() => {
    setTokenOut(coinslist[tokenOutIndex].address);
  }, [tokenOutIndex]);

  // marketdata, tokenIn Price
  useEffect(() => {
    const getPrice = async () => {
      var coingeckoid = coinslist[tokenInIndex].coinGeckoCoinsId;

      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coingeckoid}`
        );
        const currentPrice = data?.market_data.current_price.usd;
        const price_change = data?.market_data.price_change_24h_in_currency.usd;
        const price_change_p1 =
          data?.market_data.price_change_percentage_24h_in_currency.usd;
        const price_change_p7 =
          data?.market_data.price_change_percentage_7d_in_currency.usd;
        const market_cap = data?.market_data.market_cap.usd;
        const market_cap_change_p =
          data?.market_data.market_cap_change_percentage_24h_in_currency.usd;
        const total_supply = data?.market_data.total_supply;
        const total_volume = data?.market_data.total_volume.usd;
        setMarketData({
          currentPrice: currentPrice.toFixed(3),
          price_change: price_change,
          price_change_p1: price_change_p1.toFixed(1),
          price_change_p7: price_change_p7.toFixed(1),
          market_cap: formatNumber(market_cap),
          market_cap_change_p: market_cap_change_p.toFixed(1),
          total_supply: formatNumber(total_supply),
          total_volume: formatNumber(total_volume),
        });
        setTokenInPrice(currentPrice);
      } catch (err) {
        setMarketData({});
        setTokenInPrice(0);
        console.error(err.message);
      }
    };

    const formatNumber = (n: any) => {
      var ranges = [
        { divider: 1e18, suffix: 'E' },
        { divider: 1e15, suffix: 'P' },
        { divider: 1e12, suffix: 'T' },
        { divider: 1e9, suffix: 'G' },
        { divider: 1e6, suffix: 'M' },
        { divider: 1e3, suffix: 'k' },
      ];
      for (var i = 0; i < ranges.length; i++) {
        if (n >= ranges[i].divider) {
          var number = n / ranges[i].divider;
          return number.toFixed(2).toString() + ranges[i].suffix;
        }
      }
      return n.toString();
    };

    getPrice();
  }, [tokenInIndex]);

  useEffect(() => {
    const getPrice = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinslist[tokenOutIndex].coinGeckoCoinsId}`
        );
        const currentPrice = data?.market_data.current_price.usd;
        setTokenOutPrice(currentPrice);
      } catch (err) {
        console.error(err.message);
      }
    };
    getPrice();
  }, [tokenOutIndex]);

  //Setting
  const { settingsAtom } = useTextAtom();
  const [txSpeed, setTxSpeed] = useState('Standard');
  const [tolerance, setTolerance] = useState('0.1%');
  toSettingsAtom = atom({ speed: txSpeed, tol: tolerance });

  useEffect(() => {
    if (settingsAtom?.init.txSpeed) {
      setTxSpeed(settingsAtom?.init.txSpeed);
    }
  }, [settingsAtom?.init.txSpeed]);
  useEffect(() => {
    if (settingsAtom?.init.tolerance) {
      setTolerance(settingsAtom?.init.tolerance);
    }
  }, [settingsAtom?.init.tolerance]);
  //~Setting

  //query
  useEffect(() => {
    if (tokenIn && tokenOut && amountIn) {
      query();
    }
  }, [tokenIn, tokenOut, amountIn]);

  //query
  const query = async () => {
    var new_tokenIn =
      tokenIn == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
        ? '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'
        : tokenIn;
    var new_tokenOut =
      tokenOut == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
        ? '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'
        : tokenOut;
    if (
      (tokenIn == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' &&
        tokenOut == '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7') ||
      (tokenOut == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' &&
        tokenIn == '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7')
    ) {
      setAdapters([]);
      setPath([]);
      setAmounts([]);
      setAmountOut(amountIn);
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        'https://rpc.ankr.com/avalanche'
      );

      const vixrouterContract = new ethers.Contract(
        VixRouter.address,
        VixRouter.abi,
        provider
      );
      var inamount = ethers.utils.parseUnits(
        String(amountIn),
        getCoinDecimals(new_tokenIn)
      );

      //query one dex
      let { amountOut, adapter } = await vixrouterContract.queryNoSplit(
        inamount,
        new_tokenIn,
        new_tokenOut
      );
      amountOut = ethers.utils.formatUnits(
        amountOut,
        getCoinDecimals(new_tokenOut)
      );
      console.log(
        '@@@@@@@@@ Query',
        amountIn,
        getCoinName(new_tokenIn),
        '=>',
        amountOut,
        getCoinName(new_tokenOut),
        ' || ',
        getDexName(adapter)
      );
      // setBestDex(adapter)
      // setBestAmountOut(amountOut)

      //findbestpath
      let { adapters, path, amounts } = await vixrouterContract.findBestPath(
        inamount,
        new_tokenIn,
        new_tokenOut,
        4
      );
      setAdapters(adapters);
      setPath(path);
      setAmounts(amounts);
      console.log(path);
      routingAtom = atom({
        adapters: adapters,
        path: path,
      });
      var final_amount = Number(
        ethers.utils.formatUnits(
          amounts[amounts.length - 1],
          getCoinDecimals(new_tokenOut)
        )
      );
      setAmountOut(final_amount);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log('query', e);
    }
  };
  //swap
  const swap = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();

    //wrap,unwrap
    const wavaxContract = new ethers.Contract(WAVAX.address, WAVAX.abi, signer);
    if (
      tokenIn == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' &&
      tokenOut == '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'
    ) {
      await wavaxContract.deposit({
        value: ethers.utils.parseEther(String(amountIn)),
      });
      return;
    }
    if (
      tokenOut == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' &&
      tokenIn == '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'
    ) {
      await wavaxContract.withdraw(ethers.utils.parseEther(String(amountIn)));
      return;
    }

    //approve for tokens
    if (tokenIn != '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      const tokenContract = new ethers.Contract(tokenIn, ERC20.abi, signer);
      var approved_amount = await tokenContract.allowance(
        userAddress,
        VixRouter.address
      );
      if (
        Number(
          ethers.utils.formatUnits(approved_amount, getCoinDecimals(tokenIn))
        ) < amountIn
      ) {
        if (devenv)
          var approving_amount = ethers.utils.parseUnits(
            '9999999',
            getCoinDecimals(tokenIn)
          );
        else
          var approving_amount = ethers.utils.parseUnits(
            String(amountIn),
            getCoinDecimals(tokenIn)
          );
        await tokenContract.approve(VixRouter.address, approving_amount);
      }
    }

    //swap
    var new_tokenIn =
      tokenIn == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
        ? '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'
        : tokenIn;

    const vixrouterContract = new ethers.Contract(
      VixRouter.address,
      VixRouter.abi,
      signer
    );
    var parsed_amountIn = ethers.utils.parseUnits(
      String(amountIn),
      getCoinDecimals(new_tokenIn)
    );
    var parsed_amountOut = ethers.utils.parseEther('0');
    var _trade = [parsed_amountIn, parsed_amountOut, path, adapters];
    var _to = userAddress;
    var _fee = ethers.utils.parseEther('0');
    if (tokenIn == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
      await vixrouterContract.swapNoSplitFromAVAX(_trade, _to, _fee, {
        value: ethers.utils.parseEther(String(amountIn)),
      });
    else if (tokenOut == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      await vixrouterContract.swapNoSplitToAVAX(_trade, _to, _fee);
    } else await vixrouterContract.swapNoSplit(_trade, _to, _fee);
  };

  const toggleTokens = () => {
    clearOutput();
    var dish = tokenInIndex;
    setTokenInIndex(tokenOutIndex);
    setTokenOutIndex(dish);
    setToggleCoin(!toggleCoin);
  };

  const clearOutput = async () => {
    setAmountOut(0);
    setAdapters([]);
    setPath([]);
    setAmounts([]);
  };

  const { openModal } = useModal();

  return (
    <>
      <NextSeo
        title="Apexswap - Trade"
        description="Apexswap - Avalanche DEX"
      />
      {/* Expert Mode */}
      <div className="mb-12 grid grid-cols-1 gap-16 xl:grid-cols-3">
        <div className="xl:col-span-1"></div>
        <div className="flex flex-row items-center xl:col-span-2 ">
          <div
            className="flex flex-row items-center rounded-[6px] px-2 outline outline-1 outline-offset-[4px] outline-[#0D0C52] margin-left-14"
          >
            <span className="primary-font-family font-size-14">
              Expert Mode
            </span>
            <Switch
              className="ml-2 grid grid-cols-1 place-items-center rounded-full border-2 border-[#FEB58D]"
              checked={swch1}
              onChange={() => setSwch1(!swch1)}
            >
              <div
                className={cn(
                  swch1
                    ? 'bg-brand dark:bg-transparent'
                    : 'bg-gray-200 dark:bg-transparent',
                  'relative inline-flex h-[12px] w-[28px] items-center rounded-full transition-colors duration-300'
                )}
              >
                <span
                  className={cn(
                    swch1
                      ? 'bg-white ltr:translate-x-4 rtl:-translate-x-4 dark:bg-[#FEB58D]'
                      : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-[#FEB58D]',
                    'inline-block h-[10px] w-[10px] transform rounded-full bg-white duration-200'
                  )}
                />
              </div>
            </Switch>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-16 xl:grid-cols-3 xl:place-items-center">
        {/* Swap box */}
        <div className="mx-auto xl:col-span-1">
          <TradeContainer>
            <div className=" border-b border-b-[#5841D8]/20 xs:mb-2 xs:mt-1">
              <div className="mb-4 border-b border-b-[#5841D8]/20 px-8">
                <ul
                  className="-mb-px flex flex-wrap justify-between text-center text-sm font-medium"
                  id="myTab"
                  data-tabs-toggle="#myTabContent"
                  role="tablist"
                >
                  <li className="" role="presentation">
                    <a href="/swap">
                      <button
                        className="dark:hover:text-[#FEB58D]200 inline-block rounded-t-lg py-4 text-gray-300 focus:border-b-3 focus:border-b-[#FEB58D] dark:focus:text-white primary-font-family font-size-14"
                        id="profile-tab"
                        data-tabs-target="#profile"
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                        // autoFocus
                        onClick={() => setTabIndex(1)}
                      >
                        Instant Swap
                      </button>
                    </a>
                  </li>
                  <li className="" role="presentation">
                    {/* <a href="/limit"> */}
                    <button
                      className="inline-block rounded-t-lg py-4 text-gray-300 focus:border-b-3 focus:border-b-[#FEB58D] dark:hover:text-gray-200 dark:focus:text-white primary-font-family font-size-14"
                      id="dashboard-tab"
                      data-tabs-target="#dashboard"
                      type="button"
                      role="tab"
                      aria-controls="dashboard"
                      aria-selected="false"
                      onClick={() => setTabIndex(2)}
                    >
                      Limit Order
                    </button>
                    {/* </a> */}
                  </li>
                </ul>
              </div>

              <div id="myTabContent">
                <div
                  className={cn(
                    'relative flex flex-col gap-3',
                    tabIndex === 1 ? '' : 'hidden'
                  )}
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  {/* <div> */}
                  <CoinInput
                    label={'From'}
                    isInbox={true}
                    usdPrice={tokenInPrice}
                    defaultValue={amountIn}
                    showvalue={amountIn}
                    coinIndex={tokenInIndex}
                    onChangeTokenIndex={(tokenIndex) => {
                      clearOutput();
                      setTokenInIndex(tokenIndex);
                    }}
                    onchangeAmount={(value) => {
                      clearOutput();
                      setAmountIn(Number(value));
                    }}
                    tokenInBalance={tokenInBalance}
                    onToggleTokens={toggleCoin}
                  />
                  <div className="absolute top-1/2 left-1/2 z-[1] my-2 -mt-4 -ml-4 grid grid-cols-1 place-items-center">
                    <Button
                      size="mini"
                      color="warning"
                      shape="circle"
                      variant="transparent"
                      className="uppercase xs:tracking-widest"
                      onClick={() => {
                        toggleTokens();
                      }}
                    >
                      <SwapIcon
                        className="h-auto w-3"
                        style={{ color: '#FEB58D' }}
                      />
                    </Button>
                  </div>
                  <CoinInput
                    label={'To(Estimated)'}
                    usdPrice={tokenOutPrice}
                    defaultValue={amountOut}
                    showvalue={amountOut}
                    coinIndex={tokenOutIndex}
                    onToggleTokens={toggleCoin}
                    onChangeTokenIndex={(tokenIndex) => {
                      clearOutput();
                      setTokenOutIndex(tokenIndex);
                    }}
                  />
                  {/* </div> */}
                </div>
                <div
                  className={cn(
                    'relative flex flex-col gap-3',
                    tabIndex === 2 ? '' : 'hidden'
                  )}
                  id="dashboard"
                  role="tabpanel"
                  aria-labelledby="dashboard-tab"
                >
                  <CoinInput
                    label={'From'}
                    isInbox={true}
                    usdPrice={tokenInPrice}
                    defaultValue={amountIn}
                    showvalue={amountIn}
                    coinIndex={tokenInIndex}
                    onChangeTokenIndex={(tokenIndex) => {
                      clearOutput();
                      setTokenInIndex(tokenIndex);
                    }}
                    onchangeAmount={(value) => {
                      clearOutput();
                      setAmountIn(Number(value));
                    }}
                    tokenInBalance={tokenInBalance}
                    onToggleTokens={toggleCoin}
                  />
                  <div className="absolute top-1/2 left-1/2 z-[1] my-2 -mt-4 -ml-4 grid grid-cols-1 place-items-center">
                    <Button
                      size="mini"
                      color="warning"
                      shape="circle"
                      variant="transparent"
                      className="uppercase xs:tracking-widest"
                      onClick={() => {
                        toggleTokens();
                      }}
                    >
                      <SwapIcon
                        className="h-auto w-3"
                        style={{ color: 'yellow' }}
                      />
                    </Button>
                  </div>
                  <CoinInput
                    label={'To(Estimated)'}
                    usdPrice={tokenOutPrice}
                    defaultValue={amountOut}
                    showvalue={amountOut}
                    coinIndex={tokenOutIndex}
                    onToggleTokens={toggleCoin}
                    onChangeTokenIndex={(tokenIndex) => {
                      clearOutput();
                      setTokenOutIndex(tokenIndex);
                    }}
                  />
                </div>
              </div>
              <div className="my-4 flex flex-row justify-between gap-1">
                <div className="flex flex-col items-start gap-2 rounded-[10px] border py-1 px-2 dark:border-[#5841D8]/50 dark:bg-[#1B0D6B]">
                  <span className="primary-font-family font-size-8">
                    Order Price
                  </span>
                  <div className="flex flex-row justify-between items-center">
                    <input
                      type="text"
                      inputMode="decimal"
                      className={cn(
                        'mr-4 h-[17px] w-[85px] rounded-[10px] border-0 px-4 text-right outline-none dark:bg-[#0D0C52] dark:focus:ring-0'
                      )}
                    />
                    <div className="flex flex-row primary-font-family font-size-12">
                      <span>USDC</span>
                      <div className="mt-1 ml-1"><ArrowsRightLeft /></div>                      
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 rounded-[10px] border py-1 px-2 dark:border-[#5841D8]/50 dark:bg-[#1B0D6B]">
                  <span className="primary-font-family font-size-8">
                    Expires in
                  </span>
                  <SortList3 />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 xs:gap-[18px]">
              <TransactionInfo
                label={'1 USDC cost'}
                value={`~$${Number(tokenOutPrice * amountOut * 0.02).toFixed(
                  3
                )}`}
              />
              <TransactionInfo
                label={'1 AVAX cost'}
                value={`${(amountOut / amountIn).toFixed(2)} ${
                  coinslist[tokenOutIndex]?.code
                }/${coinslist[tokenInIndex]?.code}`}
              />
            </div>
            {/* {loading ? (
              <Button
                size="large"
                shape="rounded"
                fullWidth={true}
                className="mt-3 uppercase dark:bg-gradient-to-r dark:from-[#475569] dark:to-[#334155] xs:mt-4 xs:tracking-widest"
                disabled={true}
              >
                Loading ...
              </Button>
            ) : tokenInBalance >= amountIn ? (
              <Button
                size="large"
                id=""
                shape="rounded"
                fullWidth={true}
                className="mt-3 bg-gradient-to-r from-[#312e81] to-[#1e3a8a] uppercase  xs:mt-4 xs:tracking-widest"
                onClick={() => {
                  swap();
                }}
              >
                SWAP
              </Button>
            ) : (
              <Button
                size="large"
                shape="rounded"
                fullWidth={true}
                className="mt-3 uppercase dark:bg-gradient-to-r dark:from-[#475569] dark:to-[#334155] xs:mt-4 xs:tracking-widest"
                disabled={true}
              >
                Insufficient Balance
              </Button>
            )} */}
            <div className="mt-5 grid grid-cols-1 place-items-center">
              <Button
                // id="MyElement"
                size="mini"
                shape="pill"
                // fullWidth={true}
                // className="bg-gradient-to-r from-[#312e81] to-[#1e3a8a] mt-1 uppercase xs:tracking-widest"
                className="mt-1 py-1 px-3 w-[153px] h-[32px] primary-font-family font-size-14 bg-leanear-gradient"
                style={{ }}
                onClick={() => openModal('WALLET_CONNECT_VIEW')}
              >
                <span>Connect Wallet</span>
              </Button>
            </div>
            <br></br>
            {devenv ? (
              <div>
                <br></br>
                <hr></hr>
                <h1>coinslist: {coinslist.length}</h1>
                <h1>tokenInIndex: {tokenInIndex}</h1>
                <h1>tokenIn: {tokenIn}</h1>
                <h1>tokenInBalance: {tokenInBalance}</h1>
                <h1>Amount: {amountIn}</h1>
                <h1>Price: {tokenInPrice}</h1>
                <hr></hr>
                <h1>tokenOutIndex: {tokenOutIndex}</h1>
                <h1>tokenOut: {getCoinName(tokenOut)}</h1>
                <h1>Amount: {amountOut}</h1>
                <h1>Price: {tokenOutPrice}</h1>
                <hr></hr>
                <h1>
                  adapters:
                  {adapters.map((ele, i) => {
                    return (i ? ' ->' : '') + getDexName(ele);
                  })}
                </h1>
                <h1>
                  Coin path:{' '}
                  {path.map((ele, i) => {
                    return (i ? ' ->' : '') + getCoinName(ele);
                  })}
                </h1>
                <h1>
                  amounts:
                  {amounts.length}:{' '}
                  {amounts.map((ele, index) => {
                    return (
                      ' ->' +
                      ethers.utils.formatUnits(
                        ele,
                        getCoinDecimals(path[index])
                      )
                    );
                  })}
                </h1>
              </div>
            ) : (
              <></>
            )}
          </TradeContainer>
        </div>

        {/* Rigth side */}
        <div className="text-large rounded-[4px] text-center shadow-card outline outline-1 outline-offset-[16px] outline-[#0D0C52] xl:col-span-2 ">
          {/* Market Data-Chart subPanel */}
          <div className="max-w-[709px] md:min-w-[709px] sm:min-h-[520px] rounded-[10px] px-8 dark:bg-[#0D0C52]">
            <div className="min-h-[50px] ">
              <MarketData
                token_address1={tokenIn}
                token_address2={tokenOut}
                token_index1={tokenInIndex}
                token_index2={tokenOutIndex}
                marketData={marketData}
              />
            </div>
          </div>

          {/* Open Orders subPanel */}
          <div className="mt-4 min-h-[114px] max-w-[709px] rounded-[10px] px-8 pt-2 pb-6 dark:bg-[#0D0C52]">
            <div
              className="mx-4 inline-flex gap-4 md:gap-12 rounded-md shadow-sm"
              role="group"
            >
              <button
                type="button"
                className={cn(
                  'bg-transparent pt-4 pb-2 text-sm text-[#BCBCBC] font-medium focus:z-10 focus:ring-gray-500 dark:hover:text-[#FEB58D] primary-font-family font-size-14',
                  tableIndex === 1 ? 'dark:text-[#FEB58D]' : ''
                )}
                onClick={() => {
                  setTableIndex(1);
                }}
              >
                Open Orders
              </button>
              <button
                type="button"
                className={cn(
                  'bg-transparent pt-4 pb-2 text-sm text-[#BCBCBC] font-medium focus:z-10 focus:ring-gray-500 dark:hover:text-[#FEB58D] primary-font-family font-size-14',
                  tableIndex === 2 ? 'dark:text-[#FEB58D]' : ''
                )}
                onClick={() => {
                  setTableIndex(2);
                }}
              >
                Active TWAP Orders
              </button>
              <button
                type="button"
                className={cn(
                  'bg-transparent pt-4 pb-2 text-sm text-[#BCBCBC] font-medium focus:z-10 focus:ring-gray-500 dark:hover:text-[#FEB58D] primary-font-family font-size-14',
                  tableIndex === 3 ? 'dark:text-[#FEB58D]' : ''
                )}
                onClick={() => {
                  setTableIndex(3);
                }}
              >
                Open History
              </button>
              <button
                type="button"
                className={cn(
                  'bg-transparent pt-4 pb-2 text-sm text-[#BCBCBC] font-medium focus:z-10 focus:ring-gray-500 dark:hover:text-[#FEB58D] primary-font-family font-size-14',
                  tableIndex === 4 ? 'dark:text-[#FEB58D]' : ''
                )}
                onClick={() => {
                  setTableIndex(4);
                }}
              >
                Trade History
              </button>
            </div>
            <div className="mt-2 h-[150px] overflow-y-auto rounded-[10px] border border-[#4910BA] bg-[#1B0D6B] py-2 px-4">
              <div className="border-b border-b-[#5841D8]/20 py-0.5">
                <div className="flex justify-between">
                  <div
                    className="flex flex-col justify-between primary-font-family font-size-12"
                  >
                    <span className="min-w-[110px] py-1 pr-2 text-left text-[#5841D8]">
                      Symbol
                    </span>
                    <CurrencySwapIcons2
                      from={tokenInIndex}
                      to={tokenOutIndex}
                    />
                  </div>
                  {openOrdersHeader.map((item, index) => (
                    <div key={index} className="flex flex-col justify-between">
                      <span
                        className="p-1 text-[#5841D8] primary-font-family font-size-12"
                      >
                        {item}
                      </span>
                      {index !== 4 ? (
                        <span
                          key={index}
                          className={cn(
                            'p-1 primary-font-family font-size-12',
                            index === 0 ? 'text-[#EB5757]' : 'text-white'
                          )}
                        >
                          {openOrdersData[index]}
                        </span>
                      ) : (
                        <button
                          className="py-0.5 px-1.5"
                          style={{
                            background: 'rgba(27, 13, 107, 0.5)',
                            border: '1px solid #4910BA',
                            borderRadius: '5px',
                          }}
                        >
                          <span
                            key={index}
                            className="text-[#6FCF97] primary-font-family font-size-12"
                          >
                            {openOrdersData[index]}
                          </span>
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="flex flex-col justify-between">
                    <span
                      className="py-1 pl-2 text-[#5841D8] primary-font-family font-size-12"
                    ></span>
                    <span
                      className="pt-2 pb-1 text-[#EB5757] cursor-pointer"
                      style={{ fontSize: '12px' }}
                    >&#10005;</span>
                  </div>
                </div>
                {/* <div className="flex justify-between"> */}
                {/* <span className="min-w-[110px] py-1 pr-2 text-[#5841D8] primary-font-family font-size-12"></span> */}
                {/* </div> */}
              </div>
              <div className="border-b border-b-[#5841D8]/20 py-0.5">
                <div className="flex justify-between">
                  <div
                    className="flex flex-col justify-between primary-font-family font-size-12"
                  >
                    <span className="min-w-[110px] py-1 pr-2 text-left text-[#5841D8]">
                      Symbol
                    </span>
                    <CurrencySwapIcons2
                      from={tokenInIndex}
                      to={tokenOutIndex}
                    />
                  </div>
                  {openOrdersHeader.map((item, index) => (
                    <div key={index} className="flex flex-col justify-between">
                      <span
                        className="p-1 text-[#5841D8] primary-font-family font-size-12"
                      >
                        {item}
                      </span>
                      {index !== 4 ? (
                        <span
                          key={index}
                          className={cn(
                            'p-1 primary-font-family font-size-12',
                            index === 0 ? 'text-[#EB5757]' : 'text-white'
                          )}
                        >
                          {openOrdersData[index]}
                        </span>
                      ) : (
                        <button
                          className="py-0.5 px-1.5"
                          style={{
                            background: 'rgba(27, 13, 107, 0.5)',
                            border: '1px solid #4910BA',
                            borderRadius: '5px',
                          }}
                        >
                          <span
                            key={index}
                            className="text-[#6FCF97] primary-font-family font-size-12"
                          >
                            {openOrdersData[index]}
                          </span>
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="flex flex-col justify-between">
                    <span
                      className="py-1 pl-2 text-[#5841D8] primary-font-family font-size-12"
                    ></span>
                    <span
                      className="pt-2 pb-1 text-[#EB5757] cursor-pointer"
                      style={{ fontSize: '12px' }}
                    >&#10005;</span>
                  </div>
                </div>
                {/* <div className="flex justify-between"> */}
                {/* <span className="min-w-[110px] py-1 pr-2 text-[#5841D8] primary-font-family font-size-10"></span> */}
                {/* </div> */}
              </div>
              <div className="border-b border-b-[#5841D8]/20 py-0.5">
                <div className="flex justify-between">
                  <div
                    className="flex flex-col justify-between primary-font-family font-size-12"
                  >
                    <span className="min-w-[110px] py-1 pr-2 text-left text-[#5841D8]">
                      Symbol
                    </span>
                    <CurrencySwapIcons2
                      from={tokenInIndex}
                      to={tokenOutIndex}
                    />
                  </div>
                  {openOrdersHeader.map((item, index) => (
                    <div key={index} className="flex flex-col justify-between">
                      <span
                        className="p-1 text-[#5841D8] primary-font-family font-size-12"
                      >
                        {item}
                      </span>
                      {index !== 4 ? (
                        <span
                          key={index}
                          className={cn(
                            'p-1 primary-font-family font-size-12',
                            index === 0 ? 'text-[#EB5757]' : 'text-white'
                          )}
                        >
                          {openOrdersData[index]}
                        </span>
                      ) : (
                        <button
                          className="py-0.5 px-1.5"
                          style={{
                            background: 'rgba(27, 13, 107, 0.5)',
                            border: '1px solid #4910BA',
                            borderRadius: '5px',
                          }}
                        >
                          <span
                            key={index}
                            className="text-[#6FCF97] primary-font-family font-size-12"
                          >
                            {openOrdersData[index]}
                          </span>
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="flex flex-col justify-between">
                    <span
                      className="py-1 pl-2 text-[#5841D8] primary-font-family font-size-12"
                    ></span>
                    <span
                      className="pt-2 pb-1 text-[#EB5757] cursor-pointer"
                      style={{ fontSize: '12px' }}
                    >&#10005;</span>
                  </div>
                </div>
                {/* <div className="flex justify-between"> */}
                {/* <span className="min-w-[110px] py-1 pr-2 text-[#5841D8] primary-font-family font-size-10"></span> */}
                {/* </div> */}
              </div>
              <div className="border-b border-b-[#5841D8]/20 py-0.5">
                <div className="flex justify-between">
                  <div
                    className="flex flex-col justify-between primary-font-family font-size-12"
                  >
                    <span className="min-w-[110px] py-1 pr-2 text-left text-[#5841D8]">
                      Symbol
                    </span>
                    <CurrencySwapIcons2
                      from={tokenInIndex}
                      to={tokenOutIndex}
                    />
                  </div>
                  {openOrdersHeader.map((item, index) => (
                    <div key={index} className="flex flex-col justify-between">
                      <span
                        className="p-1 text-[#5841D8] primary-font-family font-size-12"
                      >
                        {item}
                      </span>
                      {index !== 4 ? (
                        <span
                          key={index}
                          className={cn(
                            'p-1 primary-font-family font-size-12',
                            index === 0 ? 'text-[#EB5757]' : 'text-white'
                          )}
                        >
                          {openOrdersData[index]}
                        </span>
                      ) : (
                        <button
                          className="py-0.5 px-1.5"
                          style={{
                            background: 'rgba(27, 13, 107, 0.5)',
                            border: '1px solid #4910BA',
                            borderRadius: '5px',
                          }}
                        >
                          <span
                            key={index}
                            className="text-[#6FCF97] primary-font-family font-size-12"
                          >
                            {openOrdersData[index]}
                          </span>
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="flex flex-col justify-between">
                    <span
                      className="py-1 pl-2 text-[#5841D8] primary-font-family font-size-12"
                    ></span>
                    <span
                      className="pt-2 pb-1 text-[#EB5757] cursor-pointer"
                      style={{ fontSize: '12px' }}
                    >&#10005;</span>
                  </div>
                </div>
                {/* <div className="flex justify-between"> */}
                {/* <span className="min-w-[110px] py-1 pr-2 text-[#5841D8] primary-font-family font-size-10"></span> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

LimitOrderPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default LimitOrderPage;
