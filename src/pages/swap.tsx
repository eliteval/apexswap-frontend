import { useEffect, useState, useMemo, useContext } from 'react';
import axios from 'axios';
import type { NextPageWithLayout } from '@/types';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import Button from '@/components/ui/button';
import { OptionIcon } from '@/components/icons/option';
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
import PairPriceChart from '@/components/swap/pair-price-chart';
import Orders from '@/components/swap/orders';
import MarketTrade from '@/components/swap/market-trade';
import MarketData from '@/components/swap/market-data';
import { ethers } from "ethers";
import ERC20 from "@/abi/ERC20.json";
import WAVAX from "@/abi/WAVAX.json";
import VixRouter from "@/abi/VixRouter.json";
import { getDexName } from '@/lib/utils/swap-utils';
import { HookContext } from '@/lib/hooks/use-hook';

// Create your atoms and derivatives
var routingAtom, toSettingsAtom;
export function useRoutingAtom() {
  return { routingAtom };
}
export function useSettingsAtom() {
  return { toSettingsAtom };
}

const SwapPage: NextPageWithLayout = () => {
  const { coinslist, getCoinDecimals, getCoinName, } = useContext(HookContext);

  const [marketData, setMarketData] = useState({})

  const [tokenInIndex, setTokenInIndex] = useState(0) //avax
  const [tokenInPrice, setTokenInPrice] = useState(0)
  const [tokenIn, setTokenIn] = useState("")
  const [tokenInBalance, setTokenInBalance] = useState(0)

  const [tokenOutIndex, setTokenOutIndex] = useState(4) //USDC
  const [tokenOutPrice, setTokenOutPrice] = useState(0)
  const [tokenOut, setTokenOut] = useState("")

  const [amountIn, setAmountIn] = useState(1)
  const [amountOut, setAmountOut] = useState(0)

  const [loading, setLoading] = useState(false)

  const [adapters, setAdapters] = useState([])
  const [path, setPath] = useState([])
  const [amounts, setAmounts] = useState([])

  const [toggleCoin, setToggleCoin] = useState(false);

  const [devenv] = useState(false)

  //set tokenin, tokeninbalance
  useEffect(() => {
    const getBalance = async (token_address: string) => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      if (token_address == "0x0000000000000000000000000000000000000000") {
        let userAddress = await signer.getAddress();
        const balance = await provider.getBalance(userAddress);
        return Number(ethers.utils.formatUnits(balance, getCoinDecimals(token_address)));
      } else {
        let userAddress = await signer.getAddress();

        const tokenContract = new ethers.Contract(token_address, ERC20.abi, signer);
        var balance = await tokenContract.balanceOf(userAddress);
        return Number(ethers.utils.formatUnits(balance, getCoinDecimals(token_address)));
      }
    }

    (async () => {
      var tokenin_address = coinslist[tokenInIndex].address
      setTokenIn(tokenin_address);
      var balance = await getBalance(tokenin_address);
      setTokenInBalance(balance)
    })()
  }, [tokenInIndex])
  //set tokenout
  useEffect(() => {
    setTokenOut(coinslist[tokenOutIndex].address);
  }, [tokenOutIndex])

  // marketdata, tokenIn Price
  useEffect(() => {
    const getPrice = async () => {
      var coingeckoid = coinslist[tokenInIndex].coinGeckoCoinsId

      try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coingeckoid}`);
        const currentPrice = data?.market_data.current_price.usd;
        const price_change = data?.market_data.price_change_24h_in_currency.usd;
        const price_change_p1 = data?.market_data.price_change_percentage_24h_in_currency.usd;
        const price_change_p7 = data?.market_data.price_change_percentage_7d_in_currency.usd;
        const market_cap = data?.market_data.market_cap.usd;
        const market_cap_change_p = data?.market_data.market_cap_change_percentage_24h_in_currency.usd;
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
        })
        setTokenInPrice(currentPrice);
      } catch (err) {
        setMarketData({})
        setTokenInPrice(0);
        console.error(err.message);
      }
    }

    const formatNumber = (n: any) => {
      var ranges = [
        { divider: 1e18, suffix: 'E' },
        { divider: 1e15, suffix: 'P' },
        { divider: 1e12, suffix: 'T' },
        { divider: 1e9, suffix: 'G' },
        { divider: 1e6, suffix: 'M' },
        { divider: 1e3, suffix: 'k' }
      ];
      for (var i = 0; i < ranges.length; i++) {
        if (n >= ranges[i].divider) {
          var number = n / ranges[i].divider;
          return (number.toFixed(2)).toString() + ranges[i].suffix;
        }
      }
      return n.toString();
    }

    getPrice();
  }, [tokenInIndex]);

  useEffect(() => {
    const getPrice = async () => {
      try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinslist[tokenOutIndex].coinGeckoCoinsId}`);
        const currentPrice = data?.market_data.current_price.usd;
        setTokenOutPrice(currentPrice);
      } catch (err) {
        console.error(err.message);
      }
    }
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
  }, [tokenIn, tokenOut, amountIn])

  //query
  const query = async () => {
    var new_tokenIn = tokenIn == "0x0000000000000000000000000000000000000000" ? "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7" : tokenIn;
    var new_tokenOut = tokenOut == "0x0000000000000000000000000000000000000000" ? "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7" : tokenOut;
    if ((tokenIn == "0x0000000000000000000000000000000000000000" && tokenOut == "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7") ||
      (tokenOut == "0x0000000000000000000000000000000000000000" && tokenIn == "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7")) {
      setAdapters([])
      setPath([])
      setAmounts([])
      setAmountOut(amountIn)
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/avalanche")

      const vixrouterContract = new ethers.Contract(VixRouter.address, VixRouter.abi, provider);
      var inamount = ethers.utils.parseUnits(String(amountIn), getCoinDecimals(new_tokenIn));

      //query one dex
      // let { amountOut, adapter } = await vixrouterContract.queryNoSplit(inamount, new_tokenIn, new_tokenOut);
      // amountOut = ethers.utils.formatUnits(amountOut, getCoinDecimals(new_tokenOut));
      // console.log("@@@@@@@@@ Query", amountIn, getCoinName(new_tokenIn), "=>", amountOut, getCoinName(new_tokenOut), " || ", getDexName(adapter))

      //findbestpath
      let { adapters, path, amounts } = await vixrouterContract.findBestPath(inamount, new_tokenIn, new_tokenOut, 4);
      setAdapters(adapters)
      setPath(path)
      setAmounts(amounts)
      // console.log('query, path, ', path)
      // console.log('query, amounts, ', amounts)
      routingAtom = atom({
        adapters: adapters,
        path: path
      })
      var final_amount = Number(ethers.utils.formatUnits(amounts[amounts.length - 1], getCoinDecimals(new_tokenOut)));
      setAmountOut(final_amount)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log('query', e)
    }
  }
  //swap
  const swap = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();


    //wrap,unwrap
    const wavaxContract = new ethers.Contract(WAVAX.address, WAVAX.abi, signer);
    if (tokenIn == "0x0000000000000000000000000000000000000000" && tokenOut == "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7") {
      await wavaxContract.deposit({ value: ethers.utils.parseEther(String(amountIn)) });
      return;
    }
    if ((tokenOut == "0x0000000000000000000000000000000000000000" && tokenIn == "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7")) {
      await wavaxContract.withdraw(ethers.utils.parseEther(String(amountIn)));
      return;
    }

    //approve for tokens
    if (tokenIn != "0x0000000000000000000000000000000000000000") {
      const tokenContract = new ethers.Contract(tokenIn, ERC20.abi, signer);
      var approved_amount = await tokenContract.allowance(userAddress, VixRouter.address);
      if (Number(ethers.utils.formatUnits(approved_amount, getCoinDecimals(tokenIn))) < amountIn) {
        if (devenv)
          var approving_amount = ethers.utils.parseUnits("9999999", getCoinDecimals(tokenIn));
        else
          var approving_amount = ethers.utils.parseUnits(String(amountIn), getCoinDecimals(tokenIn));
        await tokenContract.approve(VixRouter.address, approving_amount);
      }
    }

    //swap
    var new_tokenIn = tokenIn == "0x0000000000000000000000000000000000000000" ? "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7" : tokenIn;

    const vixrouterContract = new ethers.Contract(VixRouter.address, VixRouter.abi, signer);
    var parsed_amountIn = ethers.utils.parseUnits(String(amountIn), getCoinDecimals(new_tokenIn));
    var parsed_amountOut = ethers.utils.parseEther("0");
    var _trade = [parsed_amountIn, parsed_amountOut, path, adapters];
    var _to = userAddress;
    var _fee = ethers.utils.parseEther("0");
    if (tokenIn == "0x0000000000000000000000000000000000000000")
      await vixrouterContract.swapNoSplitFromAVAX(_trade, _to, _fee, { value: ethers.utils.parseEther(String(amountIn)) });
    else if (tokenOut == "0x0000000000000000000000000000000000000000") {
      await vixrouterContract.swapNoSplitToAVAX(_trade, _to, _fee);
    } else
      await vixrouterContract.swapNoSplit(_trade, _to, _fee);
  }

  const toggleTokens = () => {
    clearOutput();
    var dish = tokenInIndex;
    setTokenInIndex(tokenOutIndex);
    setTokenOutIndex(dish);
    setToggleCoin(!toggleCoin);
  }

  const clearOutput = async () => {
    setAmountOut(0)
    setAdapters([])
    setPath([])
    setAmounts([])
  }

  const { openModal } = useModal();

  return (
    <>
      <NextSeo
        title="Apexswap - Trade"
        description="Apexswap - Avalanche DEX"
      />
      <div className="xl:grid-rows-7 grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Swap box */}
        <div className="mx-auto xl:col-span-1 xl:row-span-5 xl:row-start-1 xl:row-end-6">
          <TradeContainer>
            <div className=" dark:border-gray-800 xs:mb-2 xs:pb-6 ">
              <div className="my-4 flex w-[105%] flex-row justify-between">
                <div className="grid grid-cols-1 place-items-center">
                  <div className="font-medium">Dex Aggregator</div>
                </div>
                <div className="flex flex-row pr-5">
                  <LoopIcon
                    className="mr-3 h-auto w-4"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      clearOutput()
                      query()
                    }}
                  />
                  <OptionIcon
                    className="mr-1 h-auto w-4"
                    onClick={() => {
                      openModal('SETTINGS');
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
              <div>
                <CoinInput
                  label={'You Pay'}
                  isInbox={true}
                  usdPrice={tokenInPrice}
                  defaultValue={amountIn}
                  showvalue={amountIn}
                  coinIndex={tokenInIndex}
                  onChangeTokenIndex={(tokenIndex) => { clearOutput(); setTokenInIndex(tokenIndex); }}
                  onchangeAmount={(value) => { clearOutput(); setAmountIn(Number(value)); }}
                  tokenInBalance={tokenInBalance}
                  onToggleTokens={toggleCoin}
                />
                <div className="grid grid-cols-1 place-items-center my-2">
                  <Button
                    size="mini"
                    color="info"
                    shape="circle"
                    variant="transparent"
                    className="uppercase xs:tracking-widest"
                    onClick={() => { toggleTokens() }}
                  >
                    <SwapIcon className="h-auto w-3" />
                  </Button>
                </div>
                <CoinInput
                  label={'You Receive'}
                  usdPrice={tokenOutPrice}
                  defaultValue={amountOut}
                  showvalue={amountOut}
                  coinIndex={tokenOutIndex}
                  onToggleTokens={toggleCoin}
                  onChangeTokenIndex={(tokenIndex) => { clearOutput(); setTokenOutIndex(tokenIndex); }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 px-2 xs:gap-[18px]">
              <TransactionInfo label={'Savings'} value={`~$${Number(tokenOutPrice * amountOut * 0.02).toFixed(3)}`} />
              {/* <TransactionInfo label={'Min. Received'} value={`${amountOut ? Number(amountOut * 0.99).toFixed(2) : 0} ${coinslist[tokenOutIndex].code}`} /> */}
              <TransactionInfo label={'Price'} value={`${(amountOut / amountIn).toFixed(2)} ${coinslist[tokenOutIndex]?.code}/${coinslist[tokenInIndex]?.code}`} />
              <TransactionInfo label={'TxSpeed'} value={txSpeed} />
              <TransactionInfo label={'Price Slippage'} value={tolerance} />
              <TransactionInfo label={'Network Fee'} value={'0.04$'} />
            </div>
            <div className="mt-6 flex w-[105%] flex-row justify-between px-2">
              <div className="grid grid-cols-1 place-items-center">
                <div className="text-sm">Route</div>
              </div>
              <div className="flex flex-row">
                <div
                  className="pr-5 text-sm"
                  onClick={() => {
                    if (adapters.length)
                      openModal('ROUTING');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {adapters.length} steps in the route
                </div>
              </div>
            </div>
            {loading ? <Button
              size="large"
              shape="rounded"
              fullWidth={true}
              className="mt-3 uppercase dark:bg-gradient-to-r dark:from-[#475569] dark:to-[#334155] xs:mt-4 xs:tracking-widest"
              disabled={true}
            >
              Loading ...
            </Button> : tokenInBalance >= amountIn ? <Button
              size="large"
              id=""
              shape="rounded"
              fullWidth={true}
              className="mt-3 uppercase bg-gradient-to-r from-[#312e81] to-[#1e3a8a]  xs:mt-4 xs:tracking-widest"
              onClick={() => { swap() }}
            >
              SWAP
            </Button> : <Button
              size="large"
              shape="rounded"
              fullWidth={true}
              className="mt-3 uppercase dark:bg-gradient-to-r dark:from-[#475569] dark:to-[#334155] xs:mt-4 xs:tracking-widest"
              disabled={true}
            >
              Insufficient Balance
            </Button>
            }
            <br></br>
            {devenv ? <div>
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
              <h1>adapters:{adapters.map((ele, i) => { return (i ? " ->" : "") + getDexName(ele) })}</h1>
              <h1>Coin path: {path.map((ele, i) => { return (i ? " ->" : "") + getCoinName(ele) })}</h1>
              <h1>
                amounts:
                {amounts.length}: {
                  amounts.map((ele, index) => { return " ->" + ethers.utils.formatUnits(ele, getCoinDecimals(path[index])) })
                }
              </h1>
            </div> : <></>}
          </TradeContainer>
        </div>

        {/* Rigth side */}
        <div className="xl:row-end-8 xl:row-span-7 text-large mt-6 w-full rounded-lg border border-[#374151] pb-5 text-center shadow-card dark:bg-[#161b1d] xs:mb-2 xs:pb-6 xl:col-span-3 xl:row-start-1">
          <div className="min-h-[50px] border-b border-b-[#374151]">
            <MarketData token_address={tokenIn} marketData={marketData} />
          </div>
          <div className="grid grid-cols-1 divide-x divide-[#374151] lg:grid-cols-3">
            <div className="grid grid-cols-1 divide-y divide-[#374151] lg:col-span-3">
              <div className="mb-2 min-h-[250px] lg:min-h-[500px]">
                <PairPriceChart tokenIn={tokenIn} tokenOut={tokenOut} />
              </div>
              <div>
                <Orders />
              </div>
            </div>

            {/* Market Trades */}
            {/* <div className="lg:col-span-1 ">
              <MarketTrade />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

SwapPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default SwapPage;
