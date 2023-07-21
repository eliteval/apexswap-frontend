import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import type { NextPageWithLayout } from '@/types';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import Button from '@/components/ui/button';
import { Gear } from '@/components/icons/gear';
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
import MarketData from '@/components/swap/market-data';
import { ethers } from 'ethers';
import ERC20 from '@/abi/ERC20.json';
import WAVAX from '@/abi/WAVAX.json';
import VixRouter from '@/abi/VixRouter.json';
import Orderpool from '@/abi/Orderpool.json';
import { getDexName, getDexAddress } from '@/lib/utils/swap-utils';
import { HookContext } from '@/lib/hooks/use-hook';
import { WalletContext } from '@/lib/hooks/use-connect';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  useAccount,
  useBalance,
  useContract,
  useSigner,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi';

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
    isDevenv
  } = useContext(HookContext);
  // const { address, disconnectWallet, balance, chainId, swtichNetwork } =
  //   useContext(WalletContext);
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  const [isAddress, setIsAddress] = useState(false);

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

  const [tabIndex, setTabIndex] = useState(1);

  const [smartroute, setSmartroute] = useState({});
  const [branches, setBranches] = useState([]);
  const [rouTes, setRouTes] = useState([]);
  const [routeSwaps, setRouteSwaps] = useState([1, 2, 3]);
  const [isPS, setIsPS] = useState(true);

  let [isExpertMode, setIsExpertMode] = useState(false);

  const RPC_URL = 'https://api.avax.network/ext/bc/C/rpc';
  const getBalance = async (token_address: string) => {
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    if (isNatativeToken(token_address)) {
      const balance = await provider.getBalance(address);
      return Number(
        ethers.utils.formatUnits(balance, getCoinDecimals(token_address))
      );
    } else {
      const tokenContract = new ethers.Contract(
        token_address,
        ERC20.abi,
        provider
      );
      var balance = await tokenContract.balanceOf(address);
      return Number(
        ethers.utils.formatUnits(balance, getCoinDecimals(token_address))
      );
    }
  };
  //set tokenin, tokenout, and balances
  const tokenInBalanceData = useBalance({
    addressOrName: address,
    chainId: 43114,
    token: isNatativeToken(tokenIn) ? '' : tokenIn,
    watch: true,
  });
  useEffect(() => {
    setTokenInBalance(Number(tokenInBalanceData.data?.formatted));
  }, [tokenInBalanceData]);

  const tokenOutBalanceData = useBalance({
    addressOrName: address,
    chainId: 43114,
    token: isNatativeToken(tokenOut) ? '' : tokenOut,
    watch: true,
  });
  useEffect(() => {
    setTokenOutBalance(Number(tokenOutBalanceData.data?.formatted));
  }, [tokenOutBalanceData]);

  useEffect(() => {
    var tokenin_address = coinslist[tokenInIndex].address;
    setTokenIn(tokenin_address);
  }, [tokenInIndex]);

  useEffect(() => {
    var tokenout_address = coinslist[tokenOutIndex].address;
    setTokenOut(tokenout_address);
  }, [tokenOutIndex]);

  //change network
  useEffect(() => {
    if (chain) {
      if (chain?.id != 43114) {
        switchNetwork?.(43114);
      }
    }
  }, [chain, switchNetwork]);

  // marketdata, tokenIn Price
  useEffect(() => {
    const getPrice = async () => {
      var coingeckoid = coinslist[tokenInIndex].coinGeckoCoinsId;

      try {
        const { data } = await axios.get(
          `https://pro-api.coingecko.com/api/v3/coins/${coingeckoid}?x_cg_pro_api_key=CG-z6rw2MXcBssib265pRX4DhLq`
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
          `https://pro-api.coingecko.com/api/v3/coins/${coinslist[tokenOutIndex].coinGeckoCoinsId}?x_cg_pro_api_key=CG-z6rw2MXcBssib265pRX4DhLq`
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
  const [tolerance, setTolerance] = useState(1);
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

  //timer
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    (async () => {
      if (seconds % 30 == 0) {
        console.log('seconds', seconds);
        await refresh();
      }
    })();
  }, [seconds]);

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

  //refresh
  useEffect(() => {
    (async () => {
      await refresh();
    })();
  }, [tokenIn, tokenOut, amountIn, amountOut]);

  const refresh = async () => {
    const queryPS = async () => {
      var new_tokenIn = addressForRoute(tokenIn);
      var new_tokenOut = addressForRoute(tokenOut);
      console.log(
        '>>>>>>>> queryPS',
        amountIn,
        getCoinName(new_tokenIn),
        '->',
        getCoinName(new_tokenOut)
      );
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
            srcDecimals: getCoinDecimals(tokenIn),
            destDecimals: getCoinDecimals(tokenOut),
            side: side,
            network: 43114,
            excludeDirectContractMethods: 'false',
            otherExchangePrices: 'true',
            userAddress: '0x0000000000000000000000000000000000000000',
          };
          const params = new URLSearchParams(payload);
          let res = await axios.post(
            // `https://apiv1.apexswap.io/getRate?${params}`
            `https://api.paraswap.io/prices?${params}`
          );

          let data = res.data;
          // let data = res.data.priceRoute;
          setSmartroute(data);
          console.log('smartRoute => ', data);

          if (side == 'SELL') {
            let destAmount = data.destAmount;
            destAmount = Number(
              ethers.utils.formatUnits(
                destAmount,
                getCoinDecimals(new_tokenOut)
              )
            );
            setAmountOut(destAmount);
          } else {
            let srcAmount = data.srcAmount;
            srcAmount = Number(
              ethers.utils.formatUnits(srcAmount, getCoinDecimals(new_tokenIn))
            );
            setAmountIn(srcAmount);
          }

          let routes = data.bestRoute;
          setRouTes(routes);

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
          setLoading(false);
          return true;
        } catch (e) {
          console.log(
            'queryPS',
            e.message,
            amountIn,
            getCoinName(new_tokenIn),
            '->',
            getCoinName(new_tokenOut)
          );
          setSmartroute({});
          setLoading(false);
          return false;
        }
      };
      var xxx = await getSmartRoute();
      return xxx;
    };

    const queryRouter = async () => {
      try {
        var new_tokenIn = addressForRoute(tokenIn);
        var new_tokenOut = addressForRoute(tokenOut);
        console.log(
          '>>>>>>>> queryRouter',
          amountIn,
          getCoinName(new_tokenIn),
          '->',
          getCoinName(new_tokenOut)
        );

        const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

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
        // let { amountOut, adapter } = await vixrouterContract.queryNoSplit(
        //   parsed_amountIn,
        //   new_tokenIn,
        //   new_tokenOut
        // );
        // amountOut = ethers.utils.formatUnits(
        //   amountOut,
        //   getCoinDecimals(new_tokenOut)
        // );

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
        console.log(final_amount);
        setLoading(false);
        return true;
      } catch (e) {
        console.log(
          'queryRouter error',
          e.message,
          amountIn,
          getCoinName(new_tokenIn),
          '->',
          getCoinName(new_tokenOut)
        );
        setLoading(false);
        return false;
      }
    };

    if (!tokenIn || !tokenOut) return;
    setSeconds(1);
    setLoading(true);
    if (
      // if token is Apex
      // tokenIn == '0x2E768E86F691AFe8a6F9277bBCD9c570Ab868FC0' ||
      // tokenOut == '0x2E768E86F691AFe8a6F9277bBCD9c570Ab868FC0'

      1==1
    ) {
      await queryRouter();
      setIsPS(false);
    } else {
      await queryPS();
      setIsPS(true);
    }
  };

  //executeSwap
  const executeSwap = async () => {
    if (tokenInBalance == 0 || tokenInBalance < amountIn) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    // const signer = provider.getSigner();
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
        var approving_amount_str = (isDevenv) ? String('9999999') : String(amountIn);
        var approving_amount = ethers.utils.parseUnits(
          approving_amount_str,
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
    var expected_amountout = Number(
      amountOut * (1 - Number(tolerance) / 100)
    ).toFixed(getCoinDecimals(new_tokenOut));
    var parsed_amountOut = ethers.utils.parseUnits(
      String(expected_amountout),
      getCoinDecimals(new_tokenOut)
    );
    console.log(parsed_amountOut, expected_amountout);

    if (isPS) {
      //multihop
      console.log(
        '>>>>>>>swap PS: ',
        amountIn,
        getCoinName(new_tokenIn),
        '->',
        amountOut,
        getCoinName(new_tokenOut)
      );
      var fee = swap_fee * 100000; //0.00045 -> 45
      if (isNatativeToken(tokenIn)) {
        await vixrouterContract.swapMultihopFromAvax(
          new_tokenIn,
          new_tokenOut,
          parsed_amountIn,
          parsed_amountOut,
          branches,
          address,
          fee,
          {
            value: ethers.utils.parseEther(String(amountIn)),
          }
        );
      } else if (isNatativeToken(tokenOut))
        await vixrouterContract.swapMultihopToAvax(
          new_tokenIn,
          new_tokenOut,
          parsed_amountIn,
          parsed_amountOut,
          branches,
          address,
          fee
        );
      else
        await vixrouterContract.swapMultihop(
          new_tokenIn,
          new_tokenOut,
          parsed_amountIn,
          parsed_amountOut,
          branches,
          address,
          fee
        );
      console.log('reached here');
      return;
    } else {
      console.log(
        '>>>>>>>swap Router: ',
        amountIn,
        getCoinName(new_tokenIn),
        '->',
        amountOut,
        getCoinName(new_tokenOut)
      );

      //findBestPath
      // let { adapters, path, amounts } = await vixrouterContract.findBestPath(
      //   parsed_amountIn,
      //   new_tokenIn,
      //   new_tokenOut,
      //   2
      // );
      // setAdapters(adapters);
      // setPath(path);
      // setAmounts(amounts);

      //swap
      var parsed_amountOut = ethers.utils.parseEther('0');
      var _trade = [parsed_amountIn, parsed_amountOut, path, adapters];
      var _to = userAddress;
      var fee = swap_fee * 100000; //0.00045 -> 45
      if (isNatativeToken(tokenIn))
        await vixrouterContract.swapNoSplitFromAVAX(_trade, _to, fee, {
          value: ethers.utils.parseEther(String(amountIn)),
        });
      else if (isNatativeToken(tokenOut)) {
        await vixrouterContract.swapNoSplitToAVAX(_trade, _to, fee);
      } else await vixrouterContract.swapNoSplit(_trade, _to, fee);
    }
  };

  const toggleTokens = () => {
    clearOutput();
    var dish = tokenInIndex;
    setTokenInIndex(tokenOutIndex);
    setTokenOutIndex(dish);
  };

  const clearOutput = async () => {
    setAmountOut(0);
    setAdapters([]);
    setPath([]);
    setAmounts([]);
    setRouTes([]);
  };

  const { openModal } = useModal();

  //styles
  const [focusedInput, setFocusedInput] = useState(0); // 0 or 1

  //test
  const test = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

      const orderpoolContract = new ethers.Contract(
        Orderpool.address,
        Orderpool.abi,
        provider
      );
      var best = [0, 0]; //amountin, profit
      for (var i = 0; i <= 300; i = i + 5) {
        var parsed_amountIn = ethers.utils.parseUnits(String(i), 6);

        //query one dex
        let amountOut = await orderpoolContract.getBestAmountOut(
          parsed_amountIn,
          '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
          '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
          4
        );
        amountOut = Number(ethers.utils.formatUnits(amountOut, 6));
        var profit = amountOut - i;
        if (best[1] < profit) best = [i, profit];
        console.log(i, '-----------', amountOut - i);
      }
      console.log('best -----------', best);
    } catch (e) {
      console.log('query', e);
    }
  };
  useEffect(() => {
    (async () => {
      // await test();
    })();
  }, []);

  return (
    <>
      <NextSeo
        title="Apexswap - Trade"
        description="Apexswap - Avalanche DEX"
      />
      <div
        className={`${isExpertMode ? 'grid xl:grid-cols-3' : 'flex justify-center'
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
                {/* Market order */}
                <div
                  className={cn(
                    'relative flex flex-col gap-3',
                    tabIndex === 1 ? '' : 'hidden'
                  )}
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  {/* swap from */}
                  <CoinInput
                    label={'From'}
                    isInbox={side == 'SELL'}
                    showmax={focusedInput == 0}
                    usdPrice={tokenInPrice}
                    defaultValue={amountIn}
                    showvalue={amountIn}
                    coinIndex={tokenInIndex}
                    onChangeTokenIndex={(tokenIndex) => {
                      setTokenInIndex(tokenIndex);
                    }}
                    onchangeAmount={(value) => {
                      setSide('SELL');
                      clearOutput();
                      setAmountIn(Number(value));
                    }}
                    monFocus={() => setFocusedInput(0)}
                    tokenBalance={tokenInBalance}
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
                  {/* swap to */}
                  <CoinInput
                    label={'To(Estimated)'}
                    isInbox={side == 'BUY'}
                    showmax={focusedInput == 1}
                    monFocus={() => setFocusedInput(1)}
                    usdPrice={tokenOutPrice}
                    defaultValue={amountOut}
                    showvalue={amountOut}
                    coinIndex={tokenOutIndex}
                    onChangeTokenIndex={(tokenIndex) => {
                      setTokenOutIndex(tokenIndex);
                    }}
                    onchangeAmount={(value) => {
                      setSide('BUY');
                      setAmountIn(0);
                      setAmountOut(Number(value));
                    }}
                    tokenBalance={tokenOutBalance}
                  />
                </div>
              </div>

              {/* Settings */}
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
                    {tolerance} %
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
                    Math.max(
                      0,
                      (1 - smartroute.destUSD / smartroute.srcUSD) * 100
                    )
                  ).toFixed(4)}%`}
                </span>
              </div>
              <TransactionInfo
                label={'Liquidity Provider Fee'}
                value={`${Number(amountIn * swap_fee).toFixed(5)} ${getCoinName(
                  tokenIn
                )}`}
              />
            </div>

            {/* Button */}
            <div className="mt-5 grid grid-cols-1 place-items-center">
              {!isAddress ? (
                <div className="swap-wallet-connect">
                  <ConnectButton.Custom>
                    {({
                      account,
                      chain,
                      openAccountModal,
                      openChainModal,
                      openConnectModal,
                      authenticationStatus,
                      mounted,
                    }) => {
                      // Note: If your app doesn't use authentication, you
                      // can remove all 'authenticationStatus' checks
                      const ready =
                        mounted && authenticationStatus !== 'loading';
                      const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                          authenticationStatus === 'authenticated');

                      if (connected) {
                        setIsAddress(true);
                      }

                      return (
                        <div
                          {...(!ready && {
                            'aria-hidden': true,
                            style: {
                              opacity: 0,
                              pointerEvents: 'none',
                              userSelect: 'none',
                            },
                          })}
                        >
                          {(() => {
                            if (!connected) {
                              return (
                                <button
                                  onClick={openConnectModal}
                                  type="button"
                                >
                                  Connect Wallet
                                </button>
                              );
                            }
                          })()}
                        </div>
                      );
                    }}
                  </ConnectButton.Custom>
                </div>
              ) : tokenInBalance == 0 || tokenInBalance < amountIn ? (
                <Button
                  size="mini"
                  shape="pill"
                  className={`primary-font-family font-size-14 bg-leanear-gradient swap-balance disabled mt-1 h-[32px] w-[190px] py-1 px-3`}
                >
                  <span>Insufficient Balance</span>
                </Button>
              ) : (
                // ) : loading ? (
                //   <Button
                //     size="mini"
                //     shape="pill"
                //     className="primary-font-family font-size-14 bg-leanear-gradient mt-1 h-[32px] w-[153px] py-1 px-3"
                //   >
                //     <span>Loading ...</span>
                //   </Button>
                <Button
                  size="mini"
                  shape="pill"
                  className={`primary-font-family font-size-14 bg-leanear-gradient swap-balance mt-1 h-[32px] w-[153px] py-1 px-3 ${tokenInBalance == 0 || tokenInBalance < amountIn
                    ? 'disabled'
                    : ''
                    }`}
                  onClick={() => {
                    executeSwap();
                  }}
                >
                  <span>
                    {tokenInBalance == 0 || tokenInBalance < amountIn
                      ? 'Insufficient Balance'
                      : 'SWAP'}
                  </span>
                </Button>
              )}
            </div>
            <br></br>
          </TradeContainer>
        </div>

        {/* Rigth side */}
        {(isExpertMode || isDevenv) && (
          <div className="text-large rounded-[4px] text-center shadow-card outline outline-1 outline-offset-[16px] outline-[#0D0C52] md:block xl:col-span-2 ">
            {/* Console */}
            {isDevenv &&
              <div className='bg-[#5841D8] text-left'>
                <br></br>
                <h6>tokenInIndex: {tokenInIndex}</h6>
                <h6>tokenIn: {getCoinName(tokenIn)}</h6>
                <h6>amountIn: {amountIn}</h6>
                <hr></hr>
                <h6>tokenOutIndex: {tokenOutIndex}</h6>
                <h6>tokenOut: {getCoinName(tokenOut)}</h6>
                <h6>amountOut: {amountOut}</h6>
                <hr></hr>
                <h6>seconds: {seconds}</h6>
                <h6>side: {side}</h6>
                <h6>focusedInput: {focusedInput}</h6>
                <h6>tokenInBalance: {tokenInBalance}</h6>
                <h6>Price: {tokenInPrice * amountIn}</h6>
                <h6>Price: {tokenOutPrice}</h6>
                <hr></hr>
                <h6>
                  adapters:
                  {adapters.map((ele, i) => {
                    return (i ? ' ->' : '') + getDexName(ele);
                  })}
                </h6>
                <h6>
                  coinpath:{' '}
                  {path.map((ele, i) => {
                    return (i ? ' ->' : '') + getCoinName(ele);
                  })}
                </h6>
                <h6>
                  amounts:
                  {' '}
                  {amounts.map((ele, index) => {
                    return (
                      ' ->' +
                      ethers.utils.formatUnits(
                        ele,
                        getCoinDecimals(path[index])
                      )
                    );
                  })}
                </h6>
              </div>
            }
            {/* End Console */}

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
                <div className=" md:grid md:grid-cols-12 md:gap-2 ">
                  <div className="coin-icon col-span-1 max-h-full sm:mx-auto md:flex md:items-start">
                    <div className="mx-3">{getCoinIcon(tokenIn)}</div>
                  </div>
                  {isPS ? (
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
                                className={`col-span-11 flex w-full items-center justify-center px-2 md:px-0 ${routeSwaps[index].length > 1
                                  ? 'justify-between'
                                  : 'justify-center'
                                  }`}
                              >
                                {routeSwaps[index].map((ele, idx) => (
                                  <>
                                    <div
                                      key={idx}
                                      className={`route-box my-3 text-sm tracking-tighter text-gray-600 dark:text-blue-400 md:my-0 ${routeSwaps[index].length == 1
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
                                      <div className="route-box-bottom flex flex-col">
                                        {ele.swapExchanges.map((el, i) => (
                                          <div
                                            key={i}
                                            className="swap-exchange"
                                          >
                                            <div className="swap-exchange-name flex max-w-full justify-between text-center">
                                              <p>{el.exchange}</p>
                                              <p>{el.percent}%</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
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
                  ) : (
                    <div className=" col-span-10 max-h-full md:my-1">
                      <div className="col-span-1 flex justify-center md:hidden">
                        <img
                          src="/down-arrow.svg"
                          className="md:hidden"
                          alt="Down Arrow"
                        />
                      </div>
                      <div className="md:my-5 md:grid md:grid-cols-12 md:place-items-center">
                        <div className="col-span-1">
                          <div className="grid h-10 max-h-full grid-cols-1 place-items-center gap-2 tracking-tighter text-gray-600 dark:text-blue-400 md:h-20">
                            <div className="flex flex-row">
                              <span className=" max-w-full ">100%</span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`col-span-11 flex w-full items-center justify-center px-2 md:px-0 ${adapters.length > 1
                            ? 'justify-between'
                            : 'justify-center'
                            }`}
                        >
                          {adapters.map((adapter, idx) => (
                            <>
                              <div
                                key={idx}
                                className={`route-box my-3 text-sm tracking-tighter text-gray-600 dark:text-blue-400 md:my-0 ${adapters.length == 1 ? 'one-route-box' : ''
                                  }`}
                              >
                                <div className="route-box-top flex items-center">
                                  {getCoinIcon(path[idx + 1])}
                                  <p className="coin-code-name w-10 max-w-full px-2">
                                    {getCoinCode(path[idx + 1])}
                                  </p>
                                </div>
                                <div className="route-box-bottom flex flex-col">
                                  <div className="swap-exchange">
                                    <div className="swap-exchange-name flex max-w-full justify-between text-center">
                                      <p>{getDexName(adapter)}</p>
                                      <p>100%</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-1 hidden md:block">
                                <img src="/right-arrow.svg" alt="Right Arrow" />
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                      <div className="col-span-1 flex justify-center md:hidden">
                        <img
                          src="/down-arrow.svg"
                          className="md:hidden"
                          alt="Down Arrow"
                        />
                      </div>
                    </div>
                  )}

                  <div className="coin-icon col-span-1 max-h-full sm:mx-auto md:flex md:items-start">
                    <div className="px-auto">{getCoinIcon(tokenOut)}</div>
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
