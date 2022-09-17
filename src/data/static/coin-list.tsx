import Image from '@/components/ui/image';
import NextImage from 'next/image'

// import { Bitcoin } from '@/components/icons/bitcoin';
// import { Ethereum } from '@/components/icons/ethereum';
// import { Tether } from '@/components/icons/tether';
// import { Bnb } from '@/components/icons/bnb';
// import { Usdc } from '@/components/icons/usdc';
// import { Cardano } from '@/components/icons/cardano';
// import { Doge } from '@/components/icons/doge';
import Avalanche from '@/assets/images/coin/avalanche.png';
import Bitcoin from '@/assets/images/coin/bitcoin.png';
import DAI from '@/assets/images/coin/dai.png';
import Ethereum from '@/assets/images/coin/ethereum.png';
import MIM from '@/assets/images/coin/mim.png';
import SUSHI from '@/assets/images/coin/sushiswap.png';
import USDT from '@/assets/images/coin/tether.png';
import USDC from '@/assets/images/coin/usd-coin.png';
import JOE from '@/assets/images/coin/joe.png';
import sAVAX from '@/assets/images/coin/sAVAX.png';
import EGG from '@/assets/images/coin/EGG.png';
import GMX from '@/assets/images/coin/GMX.png';
import AAVEe from '@/assets/images/coin/AAVEe.png';
import ALPHAe from '@/assets/images/coin/ALPHAe.png';
import APE from '@/assets/images/coin/APE.png';
import BNB from '@/assets/images/coin/BNB.png';
import ELK from '@/assets/images/coin/ELK.png';
import BUSD from '@/assets/images/coin/BUSD.png';
import UNISWAP from '@/assets/images/coin/uniswap.png';
import LINK from '@/assets/images/coin/LINK.png';
import FRAX from '@/assets/images/coin/Frax.png';
import TUSD from '@/assets/images/coin/trueusd.png';
import GRT from '@/assets/images/coin/the-graph.png';
import USDD from '@/assets/images/coin/usdd.png';
import SNX from '@/assets/images/coin/synthetix-network-token.png';
import MKR from '@/assets/images/coin/maker.png';
import BAT from '@/assets/images/coin/basic-attention-token.png';
import CRV from '@/assets/images/coin/curve-dao-token.png';
import ONEINCH from '@/assets/images/coin/1inch.png';
import COMP from '@/assets/images/coin/compound.png';
import YFI from '@/assets/images/coin/yearn-finance.png';
import ZRX from '@/assets/images/coin/0x.png';
import SYN from '@/assets/images/coin/synapse.png';
import KNC from '@/assets/images/coin/kyber-network-crystal-v2.png';


export const coinList = [
  //trusted tokens
  {
    code: 'AVAX',
    name: 'Avalanche',
    address: '0x0000000000000000000000000000000000000000',
    icon: <Image src={Avalanche}  width='24px' height='24px' />,
    tradingviewcode: 'AVAX',
    coinGeckoCoinsId: 'avalanche-2',
    decimals: 18
  },
  {
    code: 'WAVAX',
    name: 'Wrapped AvAX',
    address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    icon: <Image src="/assets/coins/wavax.png"  width='24px' height='24px' />,
    tradingviewcode: 'AVAX',
    coinGeckoCoinsId: 'avalanche-2',
    decimals: 18
  },
  {
    code: 'WETH.e',
    name: 'WETH.e',
    address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
    icon: <Image src={Ethereum}  width='24px' height='24px' />,
    tradingviewcode: 'ETH',
    coinGeckoCoinsId: 'weth',
    decimals: 18
  },
  {
    code: 'USDT.e',
    name: 'USDT.e',
    address: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
    icon: <Image src={USDT}  width='24px' height='24px' />,
    tradingviewcode: 'USDT',
    coinGeckoCoinsId: 'tether',
    decimals: 6
  },
  {
    code: 'USDC',
    name: 'USDC',
    address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    icon: <Image src={USDC}  width='24px' height='24px' />,
    tradingviewcode: 'USDC',
    coinGeckoCoinsId: 'usd-coin',
    decimals: 6
  },
  {
    code: 'USDC.e',
    name: 'USDC.e',
    address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
    icon: <Image src={USDC}  width='24px' height='24px' />,
    tradingviewcode: 'USDC',
    coinGeckoCoinsId: 'usd-coin',
    decimals: 6
  },
  // {
  //   code: 'MIM',
  //   name: 'MIM',
  //   address: '0x130966628846BFd36ff31a822705796e8cb8C18D',
  //   icon: <Image src={MIM}  width='24px' height='24px' />,
  //   tradingviewcode: 'MIM',
  //   coinGeckoCoinsId: 'magic-internet-money',
  //   decimals: 18
  // },
  {
    code: 'WBTC.e',
    name: 'WBTC.e',
    address: '0x50b7545627a5162F82A992c33b87aDc75187B218',
    icon: <Image src={Bitcoin}  width='24px' height='24px' />,
    tradingviewcode: 'BTC',
    coinGeckoCoinsId: 'wrapped-bitcoin',
    decimals: 8
  },
  {
    code: 'DAI.e',
    name: 'DAI.e',
    address: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
    icon: <Image src={DAI}  width='24px' height='24px' />,
    tradingviewcode: 'DAI',
    coinGeckoCoinsId: 'dai',
    decimals: 18
  },
  {
    code: 'USDt',
    name: 'USDt',
    address: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
    icon: <Image src={USDT}  width='24px' height='24px' />,
    tradingviewcode: 'USDT',
    coinGeckoCoinsId: 'tether',
    decimals: 6
  },

  //other tokens
  {
    name: 'BUSD.e',
    code: 'BUSD.e',
    address: '0x19860ccb0a68fd4213ab9d8266f7bbf05a8dde98',
    icon: <Image src={BUSD}  width='24px' height='24px' />,
    tradingviewcode: 'BUSD',
    coinGeckoCoinsId: 'binance-usd',
    decimals: 18
  },
  {
    name: 'UNI.e',
    code: 'UNI.e',
    address: '0x8ebaf22b6f053dffeaf46f4dd9efa95d89ba8580',
    icon: <Image src={UNISWAP}  width='24px' height='24px' />,
    tradingviewcode: 'UNISWAP',
    coinGeckoCoinsId: 'uniswap',
    decimals: 18
  },
  {
    name: 'LINK',
    code: 'LINK',
    address: '0x5947bb275c521040051d82396192181b413227a3',
    icon: <Image src={LINK}  width='24px' height='24px' />,
    tradingviewcode: 'LINK',
    coinGeckoCoinsId: 'chainlink',
    decimals: 18
  },
  {
    name: 'FRAX',
    code: 'FRAX',
    address: '0xd24c2ad096400b6fbcd2ad8b24e7acbc21a1da64',
    icon: <Image src={FRAX}  width='24px' height='24px' />,
    tradingviewcode: 'FRAX',
    coinGeckoCoinsId: 'FRAX',
    decimals: 18
  },
  {
    name: 'TUSD',
    code: 'TUSD',
    address: '0x1c20e891bab6b1727d14da358fae2984ed9b59eb',
    icon: <Image src={TUSD}  width='24px' height='24px' />,
    tradingviewcode: 'TUSD',
    coinGeckoCoinsId: 'true-usd',
    decimals: 18
  },
  {
    name: 'GRT.e',
    code: 'GRT.e',
    address: '0x8a0cac13c7da965a312f08ea4229c37869e85cb9',
    icon: <Image src={GRT}  width='24px' height='24px' />,

    coinGeckoCoinsId: 'the-graph',
    decimals: 18
  },
  {
    name: 'USDD',
    code: 'USDD',
    address: '0xcf799767d366d789e8B446981C2D578E241fa25c',
    icon: <Image src={USDD}  width='24px' height='24px' />,

    coinGeckoCoinsId: 'USDD',
    decimals: 18
  },
  {
    name: 'SNX.e',
    code: 'SNX.e',
    address: '0xbec243c995409e6520d7c41e404da5deba4b209b',
    icon: <Image src={SNX}  width='24px' height='24px' />,

    coinGeckoCoinsId: 'havven',
    decimals: 18
  },
  {
    name: 'MKR.e',
    code: 'MKR.e',
    address: '0x88128fd4b259552a9a1d457f435a6527aab72d42',
    icon: <Image src={MKR}  width='24px' height='24px' />,

    coinGeckoCoinsId: 'maker',
    decimals: 18
  },
  {
    name: 'BAT.e',
    code: 'BAT.e',
    address: '0x98443b96ea4b0858fdf3219cd13e98c7a4690588',
    icon: <Image src={BAT}  width='24px' height='24px' />,

    coinGeckoCoinsId: 'basic-attention-token',
    decimals: 18
  },
  {
    name: 'CRV.e',
    code: 'CRV.e',
    address: '0x249848beca43ac405b8102ec90dd5f22ca513c06',
    icon: <Image src={CRV}  width='24px' height='24px' />,
    coinGeckoCoinsId: 'curve-dao-token',
    decimals: 18
  },
  {
    name: '1INCH.e',
    code: '1INCH.e',
    address: '0xd501281565bf7789224523144fe5d98e8b28f267',
    icon: <Image src={ONEINCH}  width='24px' height='24px' />,
    coinGeckoCoinsId: '1inch',
    decimals: 18
  },
  {
    name: 'COMP.e ',
    code: 'COMP.e ',
    address: '0xc3048e19e76cb9a3aa9d77d8c03c29fc906e2437',
    icon: <Image src={COMP}  width='24px' height='24px' />,
    coinGeckoCoinsId: 'compound-governance-token',
    decimals: 18
  },
  {
    name: 'YFI.e',
    code: 'YFI.e',
    address: '0x9eaac1b23d935365bd7b542fe22ceee2922f52dc',
    icon: <Image src={YFI}  width='24px' height='24px' />,
    coinGeckoCoinsId: 'yearn-finance',
    decimals: 18
  },
  {
    name: 'ZRX.e ',
    code: 'ZRX.e ',
    address: '0x596fa47043f99a4e0f122243b841e55375cde0d2',
    icon: <Image src={ZRX}  width='24px' height='24px' />,
    coinGeckoCoinsId: '0x',
    decimals: 18
  },
  {
    name: 'SUSHIe',
    code: 'SUSHIe',
    address: '0x37B608519F91f70F2EeB0e5Ed9AF4061722e4F76',
    icon: <Image src={SUSHI}  width='24px' height='24px' />,
    tradingviewcode: 'SUSHI',
    coinGeckoCoinsId: 'sushi',
    decimals: 18
  },
  {
    name: 'sAVAX',
    code: 'sAVAX',
    address: '0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE',
    icon: <Image src={sAVAX}  width='24px' height='24px' />,
    tradingviewcode: 'AVAX',
    coinGeckoCoinsId: 'avalanche-2',
    decimals: 18
  },
  {
    name: 'EGG',
    code: 'EGG',
    address: '0x7761E2338B35bCEB6BdA6ce477EF012bde7aE611',
    icon: <Image src={EGG}  width='24px' height='24px' />,

    coinGeckoCoinsId: 'chikn-egg',
    decimals: 18
  },
  {
    name: 'GMX',
    code: 'GMX',
    address: '0x62edc0692BD897D2295872a9FFCac5425011c661',
    icon: <Image src={GMX}  width='24px' height='24px' />,

    coinGeckoCoinsId: 'gmx',
    decimals: 18
  },
  {
    name: 'AAVEe',
    code: 'AAVEe',
    address: '0x63a72806098Bd3D9520cC43356dD78afe5D386D9',
    icon: <Image src={AAVEe}  width='24px' height='24px' />,
    coinGeckoCoinsId: 'aave',
    decimals: 18
  },
  {
    name: 'ALPHAe',
    code: 'ALPHAe',
    address: '0x2147EFFF675e4A4eE1C2f918d181cDBd7a8E208f',
    icon: <Image src={ALPHAe}  width='24px' height='24px' />,
    coinGeckoCoinsId: 'alpha-finance',
    decimals: 18
  },
  {
    name: 'APE',
    code: 'APE',
    address: '0x0802d66f029c46E042b74d543fC43B6705ccb4ba',
    icon: <Image src={APE}  width='24px' height='24px' />,
    coinGeckoCoinsId: 'apecoin',
    decimals: 18
  },
  {
    name: 'BNB',
    code: 'BNB',
    address: '0x264c1383ea520f73dd837f915ef3a732e204a493',
    icon: <Image src={BNB}  width='24px' height='24px' />,
    coinGeckoCoinsId: 'bnb',
    decimals: 18
  },
  {
    name: 'ELK',
    code: 'ELK',
    address: '0xe1c110e1b1b4a1ded0caf3e42bfbdbb7b5d7ce1c',
    icon: <Image src={ELK}  width='24px' height='24px' />,
    coinGeckoCoinsId: 'elk-finance',
    decimals: 18
  },
  {
    name: 'KNC',
    code: 'KNC',
    address: '0x39fc9e94caeacb435842fadedecb783589f50f5f',
    icon: <Image src={KNC}  width='24px' height='24px' />,
    coinGeckoCoinsId: 'kyber-network-crystal',
    decimals: 18
  },
  {
    name: 'SYN',
    code: 'SYN',
    address: '0x1f1e7c893855525b303f99bdf5c3c05be09ca251',
    icon: <NextImage src="/assets/coins/synapse.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'synapse-2',
    decimals: 18
  },
  {
    name: 'UMA.e',
    code: 'UMA.e',
    address: '0x3bd2b1c7ed8d396dbb98ded3aebb41350a5b2339',
    icon: <Image src="/assets/coins/uma.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'uma',
    decimals: 18
  },
  {
    name: 'SPELL',
    code: 'SPELL',
    address: '0xce1bffbd5374dac86a2893119683f4911a2f7814',
    icon: <Image src="/assets/coins/spelltoken_32.webp"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'spell-token',
    decimals: 18
  },
  {
    name: 'ORBS',
    code: 'ORBS',
    address: '0x340fe1d898eccaad394e2ba0fc1f93d27c7b717a',
    icon: <Image src="/assets/coins/orbs_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'orbs',
    decimals: 18
  },
  {
    name: 'ANY',
    code: 'ANY',
    address: '0xb44a9b6905af7c801311e8f4e76932ee959c663c',
    icon: <Image src="/assets/coins/anyswap_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'anyswap',
    decimals: 18
  },
  {
    name: 'FXS',
    code: 'FXS',
    address: '0x214db107654ff987ad859f34125307783fc8e387',
    icon: <Image src="/assets/coins/fraxfinanceshare2_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'frax-share',
    decimals: 18
  },
  {
    name: 'STG',
    code: 'STG',
    address: '0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590',
    icon: <Image src="/assets/coins/stargate_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'stargate-finance',
    decimals: 18
  },
  {
    name: 'SURE',
    code: 'SURE',
    address: '0x5fc17416925789e0852fbfcd81c490ca4abc51f9',
    icon: <Image src="/assets/coins/insure_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'insure',
    decimals: 18
  },
  {
    name: 'xJOE',
    code: 'xJOE',
    address: '0x57319d41f71e81f3c65f2a47ca4e001ebafd4f33',
    icon: <Image src="/assets/coins/xjoe_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'joe',
    decimals: 18
  },
  {
    name: 'JOE',
    code: 'JOE',
    address: '0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd',
    icon: <Image src="/assets/coins/traderjoe_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'joe',
    decimals: 18
  },
  {
    name: 'RISE',
    code: 'RISE',
    address: '0xc17c30e98541188614df99239cabd40280810ca3',
    icon: <Image src="/assets/coins/everrise_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'everrise',
    decimals: 18
  },
  {
    name: 'QI',
    code: 'QI',
    address: '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5',
    icon: <Image src="/assets/coins/benqi_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'benqi',
    decimals: 18
  },
  {
    name: 'SWAP.e',
    code: 'SWAP.e',
    address: '0xc7b5d72c836e718cda8888eaf03707faef675079',
    icon: <Image src="/assets/coins/trustswap_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'trustswap',
    decimals: 18
  },
  {
    name: 'BIFI',
    code: 'BIFI',
    address: '0xd6070ae98b8069de6b494332d1a1a81b6179d960',
    icon: <Image src="/assets/coins/beefy_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'beefy-finance',
    decimals: 18
  },
  {
    name: 'JADE',
    code: 'JADE',
    address: '0x80B010450fDAf6a3f8dF033Ee296E92751D603B3',
    icon: <Image src="/assets/coins/jadeprotocol_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'jade-protocol',
    decimals: 18
  },
  {
    name: 'sJADE',
    code: 'sJADE',
    address: '0x3D9eAB723df76808bB84c05b20De27A2e69EF293',
    icon: <Image src="/assets/coins/jadeprotocol_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'jade-protocol',
    decimals: 18
  },
  {
    name: 'RAI',
    code: 'RAI',
    address: '0x97cd1cfe2ed5712660bb6c14053c0ecb031bff7d',
    icon: <Image src="/assets/coins/raireflexindex_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'rai',
    decimals: 18
  },
  {
    name: 'WXT',
    code: 'WXT',
    address: '0xfcDe4A87b8b6FA58326BB462882f1778158B02F1',
    icon: <Image src="/assets/coins/nereuswirex_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'wirex',
    decimals: 18
  },
  {
    name: 'PENDLE',
    code: 'PENDLE',
    address: '0xfb98b335551a418cd0737375a2ea0ded62ea213b',
    icon: <Image src="/assets/coins/pendle_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'pendle',
    decimals: 18
  },
  {
    name: 'WALBT',
    code: 'WALBT',
    address: '0x9e037de681cafa6e661e6108ed9c2bd1aa567ecd',
    icon: <Image src="/assets/coins/allianceblocktoken_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'allianceblock',
    decimals: 18
  },
  {
    name: 'PNG',
    code: 'PNG',
    address: '0x60781c2586d68229fde47564546784ab3faca982',
    icon: <Image src="/assets/coins/pangolin_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: 'pangolin',
    decimals: 18
  },
  //no coingecko
  {
    name: 'OOE',
    code: 'OOE',
    address: '0x0ebd9537a25f56713e34c45b38f421a1e7191469',
    icon: <Image src="/assets/coins/openocean_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'INSUR',
    code: 'INSUR',
    address: '0x544c42fbb96b39b21df61cf322b5edc285ee7429',
    icon: <Image src="/assets/coins/insurace_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'DYP',
    code: 'DYP',
    address: '0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17',
    icon: <Image src="/assets/coins/defiyieldprotocol_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'ZOO',
    code: 'ZOO',
    address: '0x1B88D7aD51626044Ec62eF9803EA264DA4442F32',
    icon: <Image src="/assets/coins/zookeeperfin_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'NFTD',
    code: 'NFTD',
    address: '0x9e3ca00f2d4a9e5d4f0add0900de5f15050812cf',
    icon: <Image src="/assets/coins/nfttrade_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'CLY',
    code: 'CLY',
    address: '0xec3492a2508ddf4fdc0cd76f31f340b30d1793e6',
    icon: <Image src="/assets/coins/colony_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'FRM',
    code: 'FRM',
    address: '0xE5CAeF4Af8780E59Df925470b050Fb23C43CA68C',
    icon: <Image src="/assets/coins/ferrumnetwork2_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'UNCL',
    code: 'UNCL',
    address: '0x7D86F1eafF29F076576b2Ff09CE3bcC7533fD2C5',
    icon: <Image src="/assets/coins/unicrypt-uncl_32.webp"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'ODDZ',
    code: 'ODDZ',
    address: '0xb0a6e056b587d0a85640b39b1cb44086f7a26a1e',
    icon: <Image src="/assets/coins/oddzfi2_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'ROOBEE',
    code: 'ROOBEE',
    address: '0x4036f3d9c45a20f44f0b8B85dD6CA33005fF9654',
    icon: <Image src="/assets/coins/roobeefin_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'KLO',
    code: 'KLO',
    address: '0xb27c8941a7df8958a1778c0259f76d1f8b711c35',
    icon: <Image src="/assets/coins/kalao_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'ACRE',
    code: 'ACRE',
    address: '0x00ee200df31b869a321b10400da10b561f3ee60d',
    icon: <Image src="/assets/coins/arablest_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'PRX',
    code: 'PRX',
    address: '0x08287930ca952673B02D3B70eEc2893Dd7846743',
    icon: <Image src="/assets/coins/parexmarket_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'SPORE',
    code: 'SPORE',
    address: '0x6e7f5c0b9f4432716bdd0a77a3601291b9d9e985',
    icon: <Image src="/assets/coins/sporeearth_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'TUS',
    code: 'TUS',
    address: '0xf693248F96Fe03422FEa95aC0aFbBBc4a8FdD172',
    icon: <Image src="/assets/coins/treasureunderthesea_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'MELT',
    code: 'MELT',
    address: '0x47eb6f7525c1aa999fbc9ee92715f5231eb1241d',
    icon: <Image src="/assets/coins/defrostfinance_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'VSO',
    code: 'VSO',
    address: '0x846d50248baf8b7ceaa9d9b53bfd12d7d7fbb25a',
    icon: <Image src="/assets/coins/verso_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'IME',
    code: 'IME',
    address: '0xf891214fdcf9cdaa5fdc42369ee4f27f226adad6',
    icon: <Image src="/assets/coins/imperiumempires_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'SHIBX',
    code: 'SHIBX',
    address: '0x440abbf18c54b2782a4917b80a1746d3a2c2cce1',
    icon: <Image src="/assets/coins/shibavax_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'ATL',
    code: 'ATL',
    address: '0x90fbe9dfe76f6ef971c7a297641dfa397099a13e',
    icon: <Image src="/assets/coins/atlantisloans2_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'DFIAT',
    code: 'DFIAT',
    address: '0xafe3d2a31231230875dee1fa1eef14a412443d22',
    icon: <Image src="/assets/coins/defiato_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'ETHM',
    code: 'ETHM',
    address: '0x55b1a124c04a54eefdefe5fa2ef5f852fb5f2f26',
    icon: <Image src="/assets/coins/ethereummeta_32.webp"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'WOW',
    code: 'WOW',
    address: '0xa384bc7cdc0a93e686da9e7b8c0807cd040f4e0b',
    icon: <Image src="/assets/coins/wowswap_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'ncash',
    code: 'ncash',
    address: '0xc69Eba65e87889f0805dB717Af06797055A0BA07',
    icon: <Image src="/assets/coins/nitronetwork_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'MORE',
    code: 'MORE',
    address: '0xd9d90f882cddd6063959a9d837b05cb748718a05',
    icon: <Image src="/assets/coins/moremoneyfi_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'SNOB',
    code: 'SNOB',
    address: '0xc38f41a296a4493ff429f1238e030924a1542e50',
    icon: <Image src="/assets/coins/snowball_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'BOOFI',
    code: 'BOOFI',
    address: '0xb00f1ad977a949a3ccc389ca1d1282a2946963b0',
    icon: <Image src="/assets/coins/boofinance_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'GAJ',
    code: 'GAJ',
    address: '0x595c8481c48894771ce8fade54ac6bf59093f9e8',
    icon: <Image src="/assets/coins/gajfinance_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'LESS',
    code: 'LESS',
    address: '0x4a4f77d74cf5fd4ea4ab71ba79988c055a5c27b2',
    icon: <Image src="/assets/coins/lesstokenftm_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'HERMES',
    code: 'HERMES',
    address: '0xb15f02f9da8cd1f99e9dd375f21dc96d25ddd82c',
    icon: <Image src="/assets/coins/hermesfinance_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'BLIZZ',
    code: 'BLIZZ',
    address: '0xb147656604217a03fe2c73c4838770df8d9d21b8',
    icon: <Image src="/assets/coins/blizz_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'AVXT',
    code: 'AVXT',
    address: '0x397bbd6a0e41bdf4c3f971731e180db8ad06ebc1',
    icon: <Image src="/assets/coins/avaxtars_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'BTC.b',
    code: 'BTC.b',
    address: '0x152b9d0FdC40C096757F570A51E494bd4b943E50',
    icon: <Image src="/assets/coins/bitcoinb_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'gOHM',
    code: 'gOHM',
    address: '0x321E7092a180BB43555132ec53AaA65a5bF84251',
    icon: <Image src="/assets/coins/governanceohm_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'YAK',
    code: 'YAK',
    address: '0x59414b3089ce2af0010e7523dea7e2b35d776ec7',
    icon: <Image src="/assets/coins/yieldyak_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'aAVAXb',
    code: 'aAVAXb',
    address: '0x6c6f910a79639dcc94b4feef59ff507c2e843929',
    icon: <Image src="/assets/coins/ankravaxbond_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'TIME',
    code: 'TIME',
    address: '0xb54f16fb19478766a268f172c9480f8da1a7c9c3',
    icon: <Image src="/assets/coins/wonderland-time_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'WSHARE',
    code: 'WSHARE',
    address: '0xe6d1aFea0B76C8f51024683DD27FA446dDAF34B6',
    icon: <Image src="/assets/coins/walrusfinanceshare_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'KITTY',
    code: 'KITTY',
    address: '0x788ae3b5d153d49f8db649aacba1857f744b739e',
    icon: <Image src="/assets/coins/kittyfinance_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'CAT',
    code: 'CAT',
    address: '0x094bfac9894d2a2a35771d0bd6d2447689190f32',
    icon: <Image src="/assets/coins/kittyfinancecat_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'H2O',
    code: 'H2O',
    address: '0x026187bdbc6b751003517bcb30ac7817d5b766f8',
    icon: <Image src="/assets/coins/defrostfinance_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'CREAM',
    code: 'CREAM',
    address: '0xae21d31a6494829a9e4b2b291f4984aae8121757',
    icon: <Image src="/assets/coins/icecreamfinance_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'PIGGY',
    code: 'PIGGY',
    address: '0x1a877b68bda77d78eea607443ccde667b31b0cdf',
    icon: <Image src="/assets/coins/piggyfinancest_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'PSHARE',
    code: 'PSHARE',
    address: '0xa5e2cfe48fe8c4abd682ca2b10fcaafe34b8774c',
    icon: <Image src="/assets/coins/piggyfinanceshare_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'CSHARE',
    code: 'CSHARE',
    address: '0x155f794b56353533e0afbf76e1b1fc57dfad5bd7',
    icon: <Image src="/assets/coins/icecreamfinance_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'PURCHASE',
    code: 'PURCHASE',
    address: '0xd1c3f94de7e5b45fa4edbba472491a9f4b166fc4',
    icon: <Image src="/assets/coins/avalaunch_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'WLRS',
    code: 'WLRS',
    address: '0x395908aeb53d33A9B8ac35e148E9805D34A555D3',
    icon: <Image src="/assets/coins/frozenwalrus_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'START',
    code: 'START',
    address: '0xf44fb887334fa17d2c5c0f970b5d320ab53ed557',
    icon: <Image src="/assets/coins/starterxyz_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'HSHARES',
    code: 'HSHARES',
    address: '0xfa4b6db72a650601e7bd50a0a9f537c9e98311b2',
    icon: <Image src="/assets/coins/hermesshares_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'xPTP',
    code: 'xPTP',
    address: '0x060556209E507d30f2167a101bFC6D256Ed2f3e1',
    icon: <Image src="/assets/coins/vectorxptp_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'ULX',
    code: 'ULX',
    address: '0xC685E8EDDC9f078666794CbfcD8D8351bac404eF',
    icon: <Image src="/assets/coins/ultronfoundation_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'JNS',
    code: 'JNS',
    address: '0x7A023A408F51c23760Eb31190fc731bc12B52954',
    icon: <Image src="/assets/coins/janusnetwork_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'TRYB',
    code: 'TRYB',
    address: '0x564a341df6c126f90cf3ecb92120fd7190acb401',
    icon: <Image src="/assets/coins/bilira_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'A4',
    code: 'A4',
    address: '0x9767203e89dcD34851240B3919d4900d3E5069f1',
    icon: <Image src="/assets/coins/a4finance_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'PEFI',
    code: 'PEFI',
    address: '0xe896cdeaac9615145c0ca09c8cd5c25bced6384c',
    icon: <Image src="/assets/coins/penguinfinance_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'OML',
    code: 'OML',
    address: '0x979fFD8eEd7a43629eA29581DF4Bfe2b3F224e47',
    icon: <Image src="/assets/coins/omlira_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'HON',
    code: 'HON',
    address: '0xed2b42d3c9c6e97e11755bb37df29b6375ede3eb',
    icon: <Image src="/assets/coins/heroesofnft_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'OH',
    code: 'OH',
    address: '0x937e077abaea52d3abf879c9b9d3f2ebd15baa21',
    icon: <Image src="/assets/coins/ohfinance_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'AVE',
    code: 'AVE',
    address: '0x78ea17559b3d2cf85a7f9c2c704eda119db5e6de',
    icon: <Image src="/assets/coins/avaware_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'CHRO',
    code: 'CHRO',
    address: '0xbf1230bb63bfD7F5D628AB7B543Bcefa8a24B81B',
    icon: <Image src="/assets/coins/chronicum_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'TEDDY',
    code: 'TEDDY',
    address: '0x094bd7b2d99711a1486fb94d4395801c6d0fddcc',
    icon: <Image src="/assets/coins/teddycash_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'ORBIT',
    code: 'ORBIT',
    address: '0x4bf5cd1AC6FfF12E88AEDD3c70EB4148F90F8894',
    icon: <Image src="/assets/coins/orbitlaunch_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'HCT',
    code: 'HCT',
    address: '0x45c13620b55c35a5f539d26e88247011eb10fdbd',
    icon: <Image src="/assets/coins/hurricaneswap_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'JPEG',
    code: 'JPEG',
    address: '0x6241af3817db48a7f9e19fd9446d78e50936d275',
    icon: <Image src="/assets/coins/jpegvault_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'CNR',
    code: 'CNR',
    address: '0x8d88e48465f30acfb8dac0b3e35c9d6d7d36abaf',
    icon: <Image src="/assets/coins/canary_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'BPT',
    code: 'BPT',
    address: '0x1111111111182587795eF1098ac7da81a108C97a',
    icon: <Image src="/assets/coins/boldpoint_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'VEE',
    code: 'VEE',
    address: '0x3709e8615e02c15b096f8a9b460ccb8ca8194e86',
    icon: <Image src="/assets/coins/veefinance_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'BLZZ',
    code: 'BLZZ',
    address: '0x0f34919404a290e71fc6a510cb4a6acb8d764b24',
    icon: <Image src="/assets/coins/blzz_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'SMRT',
    code: 'SMRT',
    address: '0xcc2f1d827b18321254223df4e84de399d9ff116c',
    icon: <Image src="/assets/coins/smartcoin_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'BETS',
    code: 'BETS',
    address: '0xc763f8570A48c4c00C80B76107cbE744dDa67b79',
    icon: <Image src="/assets/coins/betswirl_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'TRACTOR',
    code: 'TRACTOR',
    address: '0x542fa0b261503333b90fe60c78f2beed16b7b7fd',
    icon: <Image src="/assets/coins/tractorjoe_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'XCRS',
    code: 'XCRS',
    address: '0x70b4ae8eb7bd572fc0eb244cd8021066b3ce7ee4',
    icon: <Image src="/assets/coins/novax-xcrs_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'XSLR',
    code: 'XSLR',
    address: '0xe6ee049183b474ecf7704da3f6f555a1dcaf240f',
    icon: <Image src="/assets/coins/novax-xslr_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'XMTL',
    code: 'XMTL',
    address: '0x4c1057455747e3ee5871d374fdd77a304ce10989',
    icon: <Image src="/assets/coins/novax-xmtl_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'DEATH',
    code: 'DEATH',
    address: '0x6d923f688c7ff287dc3a5943caeefc994f97b290',
    icon: <Image src="/assets/coins/smartcoin_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'HUSKY',
    code: 'HUSKY',
    address: '0x65378b697853568da9ff8eab60c13e1ee9f4a654',
    icon: <Image src="/assets/coins/huskyavax_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: '$ALPHA',
    code: '$ALPHA',
    address: '0x325a98f258a5732c7b06555603f6af5bc1c17f0a',
    icon: <Image src="/assets/coins/alphanodes_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'aAVAXc',
    code: 'aAVAXc',
    address: '0xc3344870d52688874b06d844e0c36cc39fc727f6',
    icon: <Image src="/assets/coins/ankravaxrbc_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'bAVAX',
    code: 'bAVAX',
    address: '0xb2ac04b71888e17aa2c5102cf3d0215467d74100',
    icon: <Image src="/assets/coins/bAVAX_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'bDAI',
    code: 'bDAI',
    address: '0x6807ed4369d9399847f306d7d835538915fa749d',
    icon: <Image src="/assets/coins/bDAI_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'bUSDC',
    code: 'bUSDC',
    address: '0xc25ff1af397b76252d6975b4d7649b35c0e60f69',
    icon: <Image src="/assets/coins/bUSDC_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'bUSDT',
    code: 'bUSDT',
    address: '0x18cb11c9f2b6f45a7ac0a95efd322ed4cf9eeebf',
    icon: <Image src="/assets/coins/bUSDT_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'bWBTC',
    code: 'bWBTC',
    address: '0x81ccdd9e44c518caee2f720c43cd0853032a1779',
    icon: <Image src="/assets/coins/bWBTC_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'bWETH',
    code: 'bWETH',
    address: '0xccc9b2c9d96c33cecc064ddd444b132eff56e232',
    icon: <Image src="/assets/coins/bWETH_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'BLIGHT',
    code: 'BLIGHT',
    address: '0x350b3Ff32ab1b6BeaBec41aBCEbff682e0F37A3B',
    icon: <Image src="/assets/coins/empty-token.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'sBLIGHT ',
    code: 'sBLIGHT ',
    address: '0xa6772f1efedef231a3d92851470bd73316ddeaa9',
    icon: <Image src="/assets/coins/empty-token.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'sSPELL',
    code: 'sSPELL',
    address: '0x3ee97d514bbef95a2f110e6b9b73824719030f7a',
    icon: <Image src="/assets/coins/sspelltoken_32.webp"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'FITFI',
    code: 'FITFI',
    address: '0x714f020C54cc9D104B6F4f6998C63ce2a31D1888',
    icon: <Image src="/assets/coins/stepapp_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'SaAVAXb',
    code: 'SaAVAXb',
    address: '0x298c5c64eba94b8dd425582e4266a882db6d9848',
    icon: <Image src="/assets/coins/empty-token.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'SUSHI',
    code: 'SUSHI',
    address: '0x39cf1bd5f15fb22ec3d9ff86b0727afc203427cc',
    icon: <Image src="/assets/coins/empty-token.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'TSD',
    code: 'TSD',
    address: '0x4fbf0429599460d327bd5f55625e30e4fc066095',
    icon: <Image src="/assets/coins/teddy-tsd_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
  {
    name: 'WOO.e',
    code: 'WOO.e',
    address: '0xabc9547b534519ff73921b1fba6e672b5f58d083',
    icon: <Image src="/assets/coins/wootradenetwork_32.png"  width='24px' height='24px' />,
    coinGeckoCoinsId: '',
    decimals: 18
  },
];
