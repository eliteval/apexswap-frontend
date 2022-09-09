import Image from '@/components/ui/image';

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
    coinGeckoCoinsId: 'ethereum',
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
    coinGeckoCoinsId: 'bitcoin',
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
    name: 'SUSHIe',
    code: 'SUSHIe',
    address: '0x37B608519F91f70F2EeB0e5Ed9AF4061722e4F76',
    icon: <Image src={SUSHI} alt="Criptic" width='24px' height='24px' />,
    tradingviewcode: 'SUSHI',
    coinGeckoCoinsId: 'sushi',
    decimals: 18
  },
];
