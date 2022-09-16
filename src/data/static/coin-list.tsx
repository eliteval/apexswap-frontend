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
    code: 'WAVAX',
    name: 'WAVAX',
    address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    icon: <Image src={Avalanche} alt="Criptic" width='24px' height='24px' />,
    tradingviewcode: 'AVAX',
    coinGeckoCoinsId: 'avalanche-2',
    decimals: 18
  },
  {
    code: 'WETH.e',
    name: 'WETH.e',
    address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
    icon: <Image src={Ethereum} alt="Criptic" width='24px' height='24px' />,
    tradingviewcode: 'ETH',
    coinGeckoCoinsId: 'weth',
    decimals: 18
  },
  {
    code: 'USDT.e',
    name: 'USDT.e',
    address: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
    icon: <Image src={USDT} alt="Criptic" width='24px' height='24px' />,
    tradingviewcode: 'USDT',
    coinGeckoCoinsId: 'tether',
    decimals: 6
  },
  {
    code: 'USDC',
    name: 'USDC',
    address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    icon: <Image src={USDC} alt="Criptic" width='24px' height='24px' />,
    tradingviewcode: 'USDC',
    coinGeckoCoinsId: 'usd-coin',
    decimals: 6
  },
  {
    code: 'USDC.e',
    name: 'USDC.e',
    address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
    icon: <Image src={USDC} alt="Criptic" width='24px' height='24px' />,
    tradingviewcode: 'USDC',
    coinGeckoCoinsId: 'usd-coin',
    decimals: 6
  },
  {
    code: 'MIM',
    name: 'MIM',
    address: '0x130966628846BFd36ff31a822705796e8cb8C18D',
    icon: <Image src={MIM} alt="Criptic" width='24px' height='24px' />,
    tradingviewcode: 'MIM',
    coinGeckoCoinsId: 'magic-internet-money',
    decimals: 18
  },
  {
    code: 'WBTC.e',
    name: 'WBTC.e',
    address: '0x50b7545627a5162F82A992c33b87aDc75187B218',
    icon: <Image src={Bitcoin} alt="Criptic" width='24px' height='24px' />,
    tradingviewcode: 'BTC',
    coinGeckoCoinsId: 'wrapped-bitcoin',
    decimals: 8
  },
  {
    code: 'DAI.e',
    name: 'DAI.e',
    address: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
    icon: <Image src={DAI} alt="Criptic" width='24px' height='24px' />,
    tradingviewcode: 'DAI',
    coinGeckoCoinsId: 'dai',
    decimals: 18
  },
  {
    code: 'USDt',
    name: 'USDt',
    address: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
    icon: <Image src={USDT} alt="Criptic" width='24px' height='24px' />,
    tradingviewcode: 'USDT',
    coinGeckoCoinsId: 'tether',
    decimals: 6
  },

  //other tokens
  {
    name: 'BUSD.e',
    code: 'BUSD.e',
    address: '0x19860ccb0a68fd4213ab9d8266f7bbf05a8dde98',
    icon: <Image src={BUSD} alt="Criptic" width='24px' height='24px' />,
    tradingviewcode: 'BUSD',
    coinGeckoCoinsId: 'binance-usd',
    decimals: 18
  },
  {
    name: 'UNI.e',
    code: 'UNI.e',
    address: '0x8ebaf22b6f053dffeaf46f4dd9efa95d89ba8580',
    icon: <Image src={UNISWAP} alt="Criptic" width='24px' height='24px' />,
    tradingviewcode: 'UNISWAP',
    coinGeckoCoinsId: 'uniswap',
    decimals: 18
  },
  {
    name: 'LINK',
    code: 'LINK',
    address: '0x5947bb275c521040051d82396192181b413227a3',
    icon: <Image src={LINK} alt="Criptic" width='24px' height='24px' />,
    tradingviewcode: 'LINK',
    coinGeckoCoinsId: 'chainlink',
    decimals: 18
  },
  {
    name: 'FRAX',
    code: 'FRAX',
    address: '0xd24c2ad096400b6fbcd2ad8b24e7acbc21a1da64',
    icon: <Image src={FRAX} alt="Criptic" width='24px' height='24px' />,
    tradingviewcode: 'FRAX',
    coinGeckoCoinsId: 'FRAX',
    decimals: 18
  },
  {
    name: 'TUSD',
    code: 'TUSD',
    address: '0x1c20e891bab6b1727d14da358fae2984ed9b59eb',
    icon: <Image src={TUSD} alt="Criptic" width='24px' height='24px' />,
    tradingviewcode: 'TUSD',
    coinGeckoCoinsId: 'true-usd',
    decimals: 18
  },
  {
    name: 'GRT.e',
    code: 'GRT.e',
    address: '0x8a0cac13c7da965a312f08ea4229c37869e85cb9',
    icon: <Image src={GRT} alt="Criptic" width='24px' height='24px' />,

    coinGeckoCoinsId: 'the-graph',
    decimals: 18
  },
  {
    name: 'USDD',
    code: 'USDD',
    address: '0xcf799767d366d789e8B446981C2D578E241fa25c',
    icon: <Image src={USDD} alt="Criptic" width='24px' height='24px' />,

    coinGeckoCoinsId: 'USDD',
    decimals: 18
  },
  {
    name: 'SNX.e',
    code: 'SNX.e',
    address: '0xbec243c995409e6520d7c41e404da5deba4b209b',
    icon: <Image src={SNX} alt="Criptic" width='24px' height='24px' />,

    coinGeckoCoinsId: 'havven',
    decimals: 18
  },
  {
    name: 'MKR.e',
    code: 'MKR.e',
    address: '0x88128fd4b259552a9a1d457f435a6527aab72d42',
    icon: <Image src={MKR} alt="Criptic" width='24px' height='24px' />,

    coinGeckoCoinsId: 'maker',
    decimals: 18
  },
  {
    name: 'BAT.e',
    code: 'BAT.e',
    address: '0x98443b96ea4b0858fdf3219cd13e98c7a4690588',
    icon: <Image src={BAT} alt="Criptic" width='24px' height='24px' />,

    coinGeckoCoinsId: 'basic-attention-token',
    decimals: 18
  },
  {
    name: 'CRV.e',
    code: 'CRV.e',
    address: '0x249848beca43ac405b8102ec90dd5f22ca513c06',
    icon: <Image src={CRV} alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'curve-dao-token',
    decimals: 18
  },
  {
    name: '1INCH.e',
    code: '1INCH.e',
    address: '0xd501281565bf7789224523144fe5d98e8b28f267',
    icon: <Image src={ONEINCH} alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: '1inch',
    decimals: 18
  },
  {
    name: 'COMP.e ',
    code: 'COMP.e ',
    address: '0xc3048e19e76cb9a3aa9d77d8c03c29fc906e2437',
    icon: <Image src={COMP} alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'compound-governance-token',
    decimals: 18
  },
  {
    name: 'YFI.e',
    code: 'YFI.e',
    address: '0x9eaac1b23d935365bd7b542fe22ceee2922f52dc',
    icon: <Image src={YFI} alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'yearn-finance',
    decimals: 18
  },
  {
    name: 'ZRX.e ',
    code: 'ZRX.e ',
    address: '0x596fa47043f99a4e0f122243b841e55375cde0d2',
    icon: <Image src={ZRX} alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: '0x',
    decimals: 18
  },
  {
    name: 'SUSHIe',
    code: 'SUSHIe',
    address: '0x37B608519F91f70F2EeB0e5Ed9AF4061722e4F76',
    icon: <Image src={SUSHI} alt="Criptic" width='24px' height='24px' />,
    tradingviewcode: 'SUSHI',
    coinGeckoCoinsId: 'sushi',
    decimals: 18
  },
  {
    name: 'sAVAX',
    code: 'sAVAX',
    address: '0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE',
    icon: <Image src={sAVAX} alt="Criptic" width='24px' height='24px' />,
    tradingviewcode: 'AVAX',
    coinGeckoCoinsId: 'avalanche-2',
    decimals: 18
  },
  {
    name: 'EGG',
    code: 'EGG',
    address: '0x7761E2338B35bCEB6BdA6ce477EF012bde7aE611',
    icon: <Image src={EGG} alt="Criptic" width='24px' height='24px' />,

    coinGeckoCoinsId: 'chikn-egg',
    decimals: 18
  },
  {
    name: 'GMX',
    code: 'GMX',
    address: '0x62edc0692BD897D2295872a9FFCac5425011c661',
    icon: <Image src={GMX} alt="Criptic" width='24px' height='24px' />,

    coinGeckoCoinsId: 'gmx',
    decimals: 18
  },
  {
    name: 'AAVEe',
    code: 'AAVEe',
    address: '0x63a72806098Bd3D9520cC43356dD78afe5D386D9',
    icon: <Image src={AAVEe} alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'aave',
    decimals: 18
  },
  {
    name: 'ALPHAe',
    code: 'ALPHAe',
    address: '0x2147EFFF675e4A4eE1C2f918d181cDBd7a8E208f',
    icon: <Image src={ALPHAe} alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'alpha-finance',
    decimals: 18
  },
  {
    name: 'APE',
    code: 'APE',
    address: '0x0802d66f029c46E042b74d543fC43B6705ccb4ba',
    icon: <Image src={APE} alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'apecoin',
    decimals: 18
  },
  {
    name: 'BNB',
    code: 'BNB',
    address: '0x264c1383ea520f73dd837f915ef3a732e204a493',
    icon: <Image src={BNB} alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'bnb',
    decimals: 18
  },
  {
    name: 'ELK',
    code: 'ELK',
    address: '0xe1c110e1b1b4a1ded0caf3e42bfbdbb7b5d7ce1c',
    icon: <Image src={ELK} alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'elk-finance',
    decimals: 18
  },
  {
    name: 'KNC',
    code: 'KNC',
    address: '0x39fc9e94caeacb435842fadedecb783589f50f5f',
    icon: <Image src={KNC} alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'kyber-network-crystal',
    decimals: 18
  },
  {
    name: 'SYN',
    code: 'SYN',
    address: '0x1f1e7c893855525b303f99bdf5c3c05be09ca251',
    icon: <NextImage src="/assets/coins/synapse.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'synapse-2',
    decimals: 18
  },
  {
    name: 'UMA.e',
    code: 'UMA.e',
    address: '0x3bd2b1c7ed8d396dbb98ded3aebb41350a5b2339',
    icon: <Image src="/assets/coins/uma.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'uma',
    decimals: 18
  },
  {
    name: 'SPELL',
    code: 'SPELL',
    address: '0xce1bffbd5374dac86a2893119683f4911a2f7814',
    icon: <Image src="/assets/coins/spelltoken_32.webp" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'spell-token',
    decimals: 18
  },
  {
    name: 'ORBS',
    code: 'ORBS',
    address: '0x340fe1d898eccaad394e2ba0fc1f93d27c7b717a',
    icon: <Image src="/assets/coins/orbs_32.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'orbs',
    decimals: 18
  },
  {
    name: 'ANY',
    code: 'ANY',
    address: '0xb44a9b6905af7c801311e8f4e76932ee959c663c',
    icon: <Image src="/assets/coins/anyswap_32.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'anyswap',
    decimals: 18
  },
  {
    name: 'FXS',
    code: 'FXS',
    address: '0x214db107654ff987ad859f34125307783fc8e387',
    icon: <Image src="/assets/coins/fraxfinanceshare2_32.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'frax-share',
    decimals: 18
  },
  {
    name: 'STG',
    code: 'STG',
    address: '0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590',
    icon: <Image src="/assets/coins/fraxfinanceshare2_32.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'stargate-finance',
    decimals: 18
  },
  {
    name: 'SURE',
    code: 'SURE',
    address: '0x5fc17416925789e0852fbfcd81c490ca4abc51f9',
    icon: <Image src="/assets/coins/insure_32.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'insure',
    decimals: 18
  },
  {
    name: 'xJOE',
    code: 'xJOE',
    address: '0x57319d41f71e81f3c65f2a47ca4e001ebafd4f33',
    icon: <Image src="/assets/coins/xjoe_32.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'joe',
    decimals: 18
  },
  {
    name: 'JOE',
    code: 'JOE',
    address: '0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd',
    icon: <Image src="/assets/coins/traderjoe_32.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'joe',
    decimals: 18
  },
  {
    name: 'RISE',
    code: 'RISE',
    address: '0xc17c30e98541188614df99239cabd40280810ca3',
    icon: <Image src="/assets/coins/everrise_32.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'everrise',
    decimals: 18
  },
  {
    name: 'QI',
    code: 'QI',
    address: '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5',
    icon: <Image src="/assets/coins/benqi_32.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'benqi',
    decimals: 18
  },
  {
    name: 'SWAP.e',
    code: 'SWAP.e',
    address: '0xc7b5d72c836e718cda8888eaf03707faef675079',
    icon: <Image src="/assets/coins/trustswap_32.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'trustswap',
    decimals: 18
  },
  {
    name: 'BIFI',
    code: 'BIFI',
    address: '0xd6070ae98b8069de6b494332d1a1a81b6179d960',
    icon: <Image src="/assets/coins/beefy_32.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'beefy-finance',
    decimals: 18
  },
  {
    name: 'JADE',
    code: 'JADE',
    address: '0x80B010450fDAf6a3f8dF033Ee296E92751D603B3',
    icon: <Image src="/assets/coins/jadeprotocol_32.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'jade-protocol',
    decimals: 18
  },
  {
    name: 'sJADE',
    code: 'sJADE',
    address: '0x3D9eAB723df76808bB84c05b20De27A2e69EF293',
    icon: <Image src="/assets/coins/jadeprotocol_32.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'jade-protocol',
    decimals: 18
  },
  {
    name: 'RAI',
    code: 'RAI',
    address: '0x97cd1cfe2ed5712660bb6c14053c0ecb031bff7d',
    icon: <Image src="/assets/coins/raireflexindex_32.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'rai',
    decimals: 18
  },
  {
    name: 'WXT',
    code: 'WXT',
    address: '0xfcDe4A87b8b6FA58326BB462882f1778158B02F1',
    icon: <Image src="/assets/coins/nereuswirex_32.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'wirex',
    decimals: 18
  },
  {
    name: 'PENDLE',
    code: 'PENDLE',
    address: '0xfb98b335551a418cd0737375a2ea0ded62ea213b',
    icon: <Image src="/assets/coins/pendle_32.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'pendle',
    decimals: 18
  },
  {
    name: 'WALBT',
    code: 'WALBT',
    address: '0x9e037de681cafa6e661e6108ed9c2bd1aa567ecd',
    icon: <Image src="/assets/coins/allianceblocktoken_32.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'allianceblock',
    decimals: 18
  },
  {
    name: 'PNG',
    code: 'PNG',
    address: '0x60781c2586d68229fde47564546784ab3faca982',
    icon: <Image src="/assets/coins/pangolin_32.png" alt="Criptic" width='24px' height='24px' />,
    coinGeckoCoinsId: 'pangolin',
    decimals: 18
  },
];
