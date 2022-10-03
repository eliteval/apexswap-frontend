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
import Orders from '@/components/swap/orders';
import MarketTrade from '@/components/swap/market-trade';
import MarketData from '@/components/swap/market-data';
import { ethers } from 'ethers';
import ERC20 from '@/abi/ERC20.json';
import WAVAX from '@/abi/WAVAX.json';
import VixRouter from '@/abi/VixRouter.json';
import { getDexName, getDexAddress } from '@/lib/utils/swap-utils';
import { HookContext } from '@/lib/hooks/use-hook';
import { WalletContext } from '@/lib/hooks/use-connect';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// Create your atoms and derivatives
var routingAtom, toSettingsAtom;
export function useRoutingAtom() {
  return { routingAtom };
}
export function useSettingsAtom() {
  return { toSettingsAtom };
}

const SwapPage: NextPageWithLayout = () => {
  const {
    coinslist,
    getCoinDecimals,
    getCoinName,
    getCoinIcon,
    getCoinCode,
    isNatativeToken,
    isWavax,
    addressForRoute,
  } = useContext(HookContext);
  const { address, disconnectWallet, balance, chainId, swtichNetwork } =
    useContext(WalletContext);

  const [marketData, setMarketData] = useState({});
  const swap_fee = 0.00045;

  const [tokenInIndex, setTokenInIndex] = useState(0); //avax
  const [tokenInPrice, setTokenInPrice] = useState(0);
  const [tokenIn, setTokenIn] = useState('');
  const [tokenInBalance, setTokenInBalance] = useState(0);

  const [tokenOutIndex, setTokenOutIndex] = useState(4); //USDC
  const [tokenOutPrice, setTokenOutPrice] = useState(0);
  const [tokenOut, setTokenOut] = useState('');
  const [tokenOutBalance, setTokenOutBalance] = useState(0);

  const [amountIn, setAmountIn] = useState(1);
  const [amountOut, setAmountOut] = useState(0);

  const [side, setSide] = useState('SELL');

  const [loading, setLoading] = useState(false);

  const [adapters, setAdapters] = useState([]);
  const [path, setPath] = useState([]);
  const [amounts, setAmounts] = useState([]);

  const [bestDex, setBestDex] = useState('');
  const [bestAmountOut, setBestAmountOut] = useState(0);

  const [tabIndex, setTabIndex] = useState(1);
  let [swch1, setSwch1] = useState(false);
  const [toggleCoin, setToggleCoin] = useState(false);

  const [smartroute, setSmartroute] = useState({});
  const [branches, setBranches] = useState([]);
  const [rouTes, setRouTes] = useState([]);
  const [routeSwaps, setRouteSwaps] = useState([]);
  const [finalToken, setFinalToken] = useState('');

  const [devenv] = useState(false);
  let [isExpertMode, setIsExpertMode] = useState(false);
  const getBalance = async (token_address: string) => {
    if (!address) return 0;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    if (isNatativeToken(token_address)) {
      let userAddress = await signer.getAddress();
      console.log('userAddress1 => ', userAddress);
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
  //set tokenin, tokeninbalance
  useEffect(() => {
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
    (async () => {
      var tokenout_address = coinslist[tokenOutIndex].address;
      setTokenOut(tokenout_address);
      var balance = await getBalance(tokenout_address);
      setTokenOutBalance(balance);
    })();
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
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (seconds % 5 == 0) query();
  }, [seconds]);

  useEffect(() => {
    if (tokenIn && tokenOut && amountIn) {
      query();
    }
  }, [tokenIn, tokenOut, amountIn]);

  //~qqqqqqqqqqq~~~ calculate branch
  useEffect(() => {
    if (!smartroute.bestRoute) return;
    var branches = [];
    smartroute.bestRoute.map((i_branch) => {
      var swaps = [];
      i_branch.swaps.map((i_swap) => {
        var swapExchanges = [];
        i_swap.swapExchanges.map((i_swapExchange) => {
          swapExchanges.push([
            getDexAddress(i_swapExchange.exchange),
            Math.floor(i_swapExchange.percent),
            0,
            0,
          ]);
        });
        swaps.push([i_swap.srcToken, i_swap.destToken, 0, 0, swapExchanges]);
      });
      var branch = [i_branch.percent, 0, 0, swaps];
      branches.push(branch);
    });
    // console.log(smartroute.bestRoute, '-------------->smartroute')
    // console.log(branches, '-------------->branches')
    setBranches(branches);
  }, [smartroute]);

  //query
  const query = async () => {
    var new_tokenIn = addressForRoute(tokenIn);
    var new_tokenOut = addressForRoute(tokenOut);
    console.log(tokenIn, new_tokenIn, tokenOut, new_tokenOut);
    if (
      (isNatativeToken(tokenIn) && isWavax(tokenOut)) ||
      (isNatativeToken(tokenOut) && isWavax(tokenIn))
    ) {
      setAdapters([]);
      setPath([]);
      setAmounts([]);
      setAmountOut(amountIn);
      return;
    }

    const getSmartRoute = async () => {
      try {
        var amount =
          side == 'SELL'
            ? ethers.utils
                .parseUnits(String(amountIn), getCoinDecimals(new_tokenIn))
                .toString()
            : ethers.utils
                .parseUnits(String(amountOut), getCoinDecimals(new_tokenOut))
                .toString();

        var payload = {
          srcToken: new_tokenIn,
          destToken: new_tokenOut,
          amount: amount,
          side: side,
          network: 43114,
        };
        console.log(payload);
        const params = new URLSearchParams(payload);

        let res = await axios.post(
          `http://198.211.100.213:8000/getRate?${params}`
        );

        let data = res.data;
        setSmartroute(data);
        console.log('smartRoute => ', data);

        if (side == 'SELL') {
          let destAmount = data.destAmount;
          destAmount = Number(
            ethers.utils.formatUnits(destAmount, getCoinDecimals(new_tokenOut))
          );
          console.log(destAmount);
          setAmountOut(destAmount);
        } else {
          let srcAmount = data.srcAmount;
          srcAmount = Number(
            ethers.utils.formatUnits(srcAmount, getCoinDecimals(new_tokenIn))
          );
          console.log(srcAmount);
          setAmountIn(srcAmount);
        }

        let routes = data.bestRoute;
        setRouTes(routes);
        if (data.destToken) {
          setFinalToken(data.destToken);
        }
        let swaps = [];
        let route_swaps = [];
        for (let i = 0; i < routes.length; i++) {
          for (let j = 0; j < routes[i].swaps.length; j++) {
            let swap = {
              destToken: routes[i].swaps[j].destToken,
              swapExchanges: routes[i].swaps[j].swapExchanges,
            };
            swaps.push(swap);
          }
          route_swaps.push(swaps);
          swaps = [];
        }
        setRouteSwaps(route_swaps);
      } catch (e) {
        console.log(e);
        setSmartroute({});
      }
    };
    await getSmartRoute();
    return;
  };

  const route = path.slice(1);
  // const percent = [100];
  const coin_in = path[0];
  const coin_out = path[path?.length - 1];

  const queryOld = async () => {
    try {
      var new_tokenIn = addressForRoute(tokenIn);
      var new_tokenOut = addressForRoute(tokenOut);
      const provider = new ethers.providers.JsonRpcProvider(
        'https://rpc.ankr.com/avalanche'
      );

      const vixrouterContract = new ethers.Contract(
        VixRouter.address,
        VixRouter.abi,
        provider
      );
      var parsed_amountIn = ethers.utils.parseUnits(
        String(amountIn),
        getCoinDecimals(new_tokenIn)
      );

      //query one dex
      let { amountOut, adapter } = await vixrouterContract.queryNoSplit(
        parsed_amountIn,
        new_tokenIn,
        new_tokenOut
      );
      amountOut = ethers.utils.formatUnits(
        amountOut,
        getCoinDecimals(new_tokenOut)
      );

      //findbestpath
      let { adapters, path, amounts } = await vixrouterContract.findBestPath(
        parsed_amountIn,
        new_tokenIn,
        new_tokenOut,
        2
      );
      setAdapters(adapters);
      setPath(path);
      setAmounts(amounts);
      var final_amount = Number(
        ethers.utils.formatUnits(
          amounts[amounts.length - 1],
          getCoinDecimals(new_tokenOut)
        )
      );
      setAmountOut(final_amount);
    } catch (e) {
      console.log('query', e);
    }
  };

  //swap
  const swap = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();

    const vixrouterContract = new ethers.Contract(
      VixRouter.address,
      VixRouter.abi,
      signer
    );

    //AVAX <-> WAVAX
    const wavaxContract = new ethers.Contract(WAVAX.address, WAVAX.abi, signer);
    if (isNatativeToken(tokenIn) && isWavax(tokenOut)) {
      await wavaxContract.deposit({
        value: ethers.utils.parseEther(String(amountIn)),
      });
      return;
    }
    if (isNatativeToken(tokenOut) && isWavax(tokenIn)) {
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

    var new_tokenIn = addressForRoute(tokenIn);
    var new_tokenOut = addressForRoute(tokenOut);
    var parsed_amountIn = ethers.utils.parseUnits(
      String(amountIn),
      getCoinDecimals(new_tokenIn)
    );

    //multihop
    var fee = swap_fee * 100000; //0.00045 -> 45
    if (isNatativeToken(tokenIn))
      await vixrouterContract.swapMultihopFromAvax(
        new_tokenIn,
        new_tokenOut,
        parsed_amountIn,
        branches,
        address,
        fee,
        {
          value: ethers.utils.parseEther(String(amountIn)),
        }
      );
    else if (isNatativeToken(tokenOut))
      await vixrouterContract.swapMultihopToAvax(
        new_tokenIn,
        new_tokenOut,
        parsed_amountIn,
        branches,
        address,
        fee
      );
    else
      await vixrouterContract.swapMultihop(
        new_tokenIn,
        new_tokenOut,
        parsed_amountIn,
        branches,
        address,
        fee
      );

    return;

    //findBestPath
    let { adapters, path, amounts } = await vixrouterContract.findBestPath(
      parsed_amountIn,
      new_tokenIn,
      new_tokenOut,
      4
    );
    setAdapters(adapters);
    setPath(path);
    setAmounts(amounts);

    //swap
    var parsed_amountOut = ethers.utils.parseEther('0');
    var _trade = [parsed_amountIn, parsed_amountOut, path, adapters];
    var _to = userAddress;
    var _fee = ethers.utils.parseEther('0');
    if (isNatativeToken(tokenIn))
      await vixrouterContract.swapNoSplitFromAVAX(_trade, _to, _fee, {
        value: ethers.utils.parseEther(String(amountIn)),
      });
    else if (isNatativeToken(tokenOut)) {
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

      <div
        className={`${
          isExpertMode ? 'grid xl:grid-cols-3' : 'flex justify-center'
        } mt-12 grid-cols-1 gap-16 xl:place-items-start `}
      >
        {/* Swap box */}
        <div className="mx-auto flex flex-col gap-3 rounded-[1px] outline outline-1 outline-offset-[16px] outline-[#0D0C52] xl:col-span-1">
          <div className="mx-auto flex w-1/2 flex-row items-center rounded-[6px] px-2 outline outline-1 outline-offset-[4px] outline-[#0D0C52]">
            <span className="primary-font-family font-size-14">
              Expert Mode
            </span>
            <Switch
              className="ml-2 grid grid-cols-1 place-items-center rounded-full border-2 border-[#FEB58D]"
              checked={isExpertMode}
              onChange={() => setIsExpertMode(!isExpertMode)}
            >
              <div
                className={cn(
                  isExpertMode
                    ? 'bg-brand dark:bg-transparent'
                    : 'bg-gray-200 dark:bg-transparent',
                  'relative inline-flex h-[12px] w-[28px] items-center rounded-full transition-colors duration-300'
                )}
              >
                <span
                  className={cn(
                    isExpertMode
                      ? 'bg-white ltr:translate-x-4 rtl:-translate-x-4 dark:bg-[#FEB58D]'
                      : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-[#FEB58D]',
                    'inline-block h-[10px] w-[10px] transform rounded-full bg-white duration-200'
                  )}
                />
              </div>
            </Switch>
            {/* <div className="myImg">hi</div> */}
          </div>

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
                    <button
                      className="primary-font-family font-size-14 inline-block rounded-t-lg py-4 text-gray-300 focus:border-b-3 focus:border-b-[#FEB58D] dark:hover:text-gray-200 dark:focus:text-white"
                      id="profile-tab"
                      data-tabs-target="#profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                      // autoFocus={true}
                      onClick={() => setTabIndex(1)}
                    >
                      Instant Swap
                    </button>
                  </li>
                  {/* <li className="" role="presentation">
                    <a href="/limit">
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
                    </a>
                  </li> */}
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
                    isInbox={side == 'SELL'}
                    usdPrice={tokenInPrice}
                    defaultValue={amountIn}
                    showvalue={amountIn}
                    coinIndex={tokenInIndex}
                    onChangeTokenIndex={(tokenIndex) => {
                      clearOutput();
                      setTokenInIndex(tokenIndex);
                    }}
                    onchangeAmount={(value) => {
                      setSide('SELL');
                      clearOutput();
                      setAmountIn(Number(value));
                    }}
                    tokenBalance={tokenInBalance}
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
                        className="h-auto w-3 font-bold"
                        style={{ color: '#FEB58D' }}
                      />
                    </Button>
                  </div>
                  <CoinInput
                    label={'To(Estimated)'}
                    isInbox={side == 'BUY'}
                    usdPrice={tokenOutPrice}
                    defaultValue={amountOut}
                    showvalue={amountOut}
                    coinIndex={tokenOutIndex}
                    onToggleTokens={toggleCoin}
                    onChangeTokenIndex={(tokenIndex) => {
                      clearOutput();
                      setTokenOutIndex(tokenIndex);
                    }}
                    onchangeAmount={(value) => {
                      setSide('BUY');
                      clearOutput();
                      setAmountOut(Number(value));
                    }}
                    tokenBalance={tokenOutBalance}
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
                    isInbox={true}
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
                  {/* <div className="text-center border flex flex-row justify-between gap-2">
                    <div className="border">Order Price</div>
                    <div className="border text-right">Expires in</div>
                  </div> */}
                </div>
              </div>

              <div className="my-4 flex flex-row justify-between text-[#FEB58D]">
                <div className="grid grid-cols-1 place-items-center">
                  <div className="flex items-center font-medium">
                    <span className="primary-font-family font-size-10 mr-2">
                      Slippage Tolerance
                    </span>
                    <div
                      className="mr-1 h-auto w-4"
                      onClick={() => {
                        openModal('SETTINGS');
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <Gear />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <span className="primary-font-family font-size-10">
                    {tolerance}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 xs:gap-[18px]">
              <TransactionInfo
                label={'Minimum Received'}
                value={`${Number(amountOut * (1 - swap_fee)).toFixed(
                  3
                )} ${getCoinName(tokenOut)}`}
              />
              {/* <TransactionInfo label={'Min. Received'} value={`${amountOut ? Number(amountOut * 0.99).toFixed(2) : 0} ${coinslist[tokenOutIndex].code}`} /> */}
              <div
                className={cn(
                  'flex items-center justify-between dark:text-gray-300'
                )}
              >
                <span className="primary-font-family font-size-10 font-medium">
                  {'Price Impact'}
                </span>
                <span className="primary-font-family font-size-10 text-[#EB5757]">
                  {`${Number(
                    (1 - smartroute.destUSD / smartroute.srcUSD) * 100
                  ).toFixed(4)}%`}
                </span>
              </div>
              {/* <TransactionInfo label={'TxSpeed'} value={txSpeed} />
              <TransactionInfo label={'Price Slippage'} value={tolerance} /> */}
              <TransactionInfo
                label={'Liquidity Provider Fee'}
                value={`${Number(amountIn * swap_fee).toFixed(5)} ${getCoinName(
                  tokenIn
                )}`}
              />
              {/* <TransactionInfo label={'Best Dex'} value={getDexName(bestDex) + " : " + Number(bestAmountOut).toFixed(6) + " " + getCoinName(tokenOut)} /> */}
            </div>
            {/* <div className="mt-6 flex flex-row justify-between ">
              <div className="grid grid-cols-1 place-items-center">
                <div className="text-sm">Route</div>
              </div>
              <div className="flex flex-row">
                <div
                  className="pr-5 text-sm"
                  onClick={() => {
                    if (adapters.length) openModal('ROUTING');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {adapters.length} steps in the route
                </div>
              </div>
            </div> */}

            {/* Button */}
            <div className="mt-5 grid grid-cols-1 place-items-center">
              {!address ? (
                // <Button
                //   size="mini"
                //   shape="pill"
                //   className="mt-1 h-[32px] w-[153px] py-1 px-3 primary-font-family font-size-14 bg-leanear-gradient"
                //   onClick={() => openModal('WALLET_CONNECT_VIEW')}
                // >
                //   <span>Connect Wallet</span>
                // </Button>

                <div className="swap-wallet-connect">
                  <ConnectButton />
                </div>
              ) : loading ? (
                <Button
                  size="mini"
                  shape="pill"
                  className="primary-font-family font-size-14 bg-leanear-gradient mt-1 h-[32px] w-[153px] py-1 px-3"
                >
                  <span>Loading ...</span>
                </Button>
              ) : tokenInBalance >= amountIn ? (
                <Button
                  size="mini"
                  shape="pill"
                  className="primary-font-family font-size-14 bg-leanear-gradient mt-1 h-[32px] w-[153px] py-1 px-3"
                  onClick={() => {
                    swap();
                  }}
                >
                  <span>SWAP</span>
                </Button>
              ) : (
                <Button
                  size="mini"
                  shape="pill"
                  className="primary-font-family font-size-14 bg-leanear-gradient mt-1 h-[32px] w-[153px] py-1 px-3"
                >
                  <span>Insufficient Balance</span>
                </Button>
              )}
            </div>
            <br></br>
            {/* Console */}
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
        {isExpertMode && (
          <div className="text-large rounded-[4px] text-center shadow-card outline outline-1 outline-offset-[16px] outline-[#0D0C52] md:block xl:col-span-2 ">
            {/* Market Data-Chart subPanel */}
            <div className="hidden md:block md:min-w-[709px] md:max-w-[709px] md:rounded-[10px] md:px-8 md:dark:bg-[#0D0C52]">
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

            {/* Routing Medium subPanel */}
            <div className="md:mt-4 md:block md:min-h-[114px] md:max-w-[709px] md:rounded-[10px] md:bg-[#0D0C52] md:pt-2 md:pb-6">
              <div className="py-4 px-8 text-left">
                <span className="primary-font-family font-size-14 font-weight-600">
                  Routing
                </span>
              </div>
              <div style={{ overflow: 'auto' }}>
                <div
                  className=" md:grid md:grid-cols-12 md:gap-2 "
                  // style={{ display: 'table', width: '100%' }}
                >
                  <div
                    className="coin-icon col-span-1 max-h-full sm:mx-auto md:flex md:items-start"
                    // style={{ display: 'table-cell', minWidth: '50px' }}
                  >
                    <div className="mx-3">{coinslist[tokenInIndex]?.icon}</div>
                  </div>

                  <div className=" col-span-10 max-h-full md:my-1">
                    {Array.isArray(rouTes)
                      ? rouTes.map((element, index) => (
                          <>
                            {index == 0 && (
                              <div className="col-span-1 flex justify-center md:hidden">
                                <img
                                  src="/down-arrow.svg"
                                  className="md:hidden"
                                  alt="Down Arrow"
                                />
                              </div>
                            )}
                            <div
                              key={index}
                              className="md:my-5 md:grid md:grid-cols-12 md:place-items-center"
                            >
                              <div className="col-span-1">
                                <div className="grid h-10 max-h-full grid-cols-1 place-items-center gap-2 tracking-tighter text-gray-600 dark:text-blue-400 md:h-20">
                                  <div className="flex flex-row">
                                    <span className=" max-w-full ">
                                      {element.percent}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div
                                className={`col-span-11 flex w-full items-center justify-center px-2 md:px-0 ${
                                  routeSwaps[index].length > 1
                                    ? 'justify-between'
                                    : 'justify-center'
                                }`}
                              >
                                {routeSwaps[index].map((ele, idx) => (
                                  <>
                                    <div
                                      key={idx}
                                      className={`route-box my-3 text-sm tracking-tighter text-gray-600 dark:text-blue-400 md:my-0 ${
                                        routeSwaps[index].length == 1
                                          ? 'one-route-box'
                                          : ''
                                      }`}
                                    >
                                      <div className="route-box-top flex items-center">
                                        {getCoinIcon(ele.destToken)}
                                        <p className="coin-code-name w-10 max-w-full px-2">
                                          {getCoinCode(ele.destToken)}
                                        </p>
                                      </div>
                                      {/* {item.dex.map((element, id) => ( */}
                                      <div className="route-box-bottom flex flex-col">
                                        {ele.swapExchanges.map((el, i) => (
                                          <div
                                            key={i}
                                            className="swap-exchange"
                                          >
                                            <div className="swap-exchange-name flex max-w-full justify-between text-center">
                                              {/* {getDexName(adapters[index])} */}
                                              <p>{el.exchange}</p>
                                              <p>{el.percent}%</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                      {/*  */}
                                    </div>
                                    {routeSwaps[index].length > 1 && (
                                      <div className="col-span-1 hidden md:block">
                                        <img
                                          src="/right-arrow.svg"
                                          alt="Right Arrow"
                                        />
                                      </div>
                                    )}
                                  </>
                                ))}
                              </div>
                              {/* <div className="col-span-1"></div> */}
                            </div>
                            <div className="col-span-1 flex justify-center md:hidden">
                              <img
                                src="/down-arrow.svg"
                                className="md:hidden"
                                alt="Down Arrow"
                              />
                            </div>
                          </>
                        ))
                      : null}
                  </div>

                  <div
                    className="coin-icon col-span-1 max-h-full sm:mx-auto md:flex md:items-start"
                    // style={{ display: 'table-cell', minWidth: '50px' }}
                  >
                    <div className="px-auto">{getCoinIcon(finalToken)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

SwapPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default SwapPage;
