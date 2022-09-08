import { Bitcoin } from '@/components/icons/bitcoin';
import { Ethereum } from '@/components/icons/ethereum';
import { Tether } from '@/components/icons/tether';
import { Bnb } from '@/components/icons/bnb';
import { Usdc } from '@/components/icons/usdc';
import { Cardano } from '@/components/icons/cardano';
import { Doge } from '@/components/icons/doge';
import Avalanche from '@/assets/images/coin/avalanche.png';
import DAI from '@/assets/images/coin/dai.png';
import USDT from '@/assets/images/coin/tether.png';
import USDC from '@/assets/images/coin/usd-coin.png';
import SUSHI from '@/assets/images/coin/sushiswap.png';
import Image from '@/components/ui/image';


export const coinList = [
  {
    icon: <Image src={Avalanche} alt="Criptic" width='24px' height='24px' />,
    code: 'AVAX',
    name: 'Avalanche',
    address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    price: 18.95,
  },
  {
    icon: <Image src={DAI} alt="Criptic" width='24px' height='24px' />,
    code: 'DAI',
    name: 'DAI',
    address: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
    price: 1,
  },
  // {
  //   icon: <Image src={USDC} alt="Criptic" width='24px' height='24px' />,
  //   code: 'USDC',
  //   name: 'USDC',
  //   address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
  //   price: 1,
  // },
  // {
  //   icon: <Image src={USDT} alt="Criptic" width='24px' height='24px' />,
  //   code: 'USDT',
  //   name: 'USDT',
  //   address: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
  //   price: 1,
  // },
  {
    icon: <Image src={SUSHI} alt="Criptic" width='24px' height='24px' />,
    code: 'SUSHIe',
    name: 'SUSHIe',
    address: '0x37b608519f91f70f2eeb0e5ed9af4061722e4f76',
    price: 1.24,
  },
  // {
  //   icon: <Bitcoin />,
  //   code: 'BTC',
  //   name: 'Bitcoin',
  //   price: 19076.29,
  // },
  // {
  //   icon: <Ethereum />,
  //   code: 'ETH',
  //   name: 'Ethereum',
  //   price: 1053.28,
  // },
  // {
  //   icon: <Tether />,
  //   code: 'USDT',
  //   name: 'Tether USD',
  //   price: 0.999,
  // },
  // {
  //   icon: <Bnb />,
  //   code: 'BNB',
  //   name: 'Binance Coin',
  //   price: 214.96,
  // },
  // {
  //   icon: <Usdc />,
  //   code: 'USDC',
  //   name: 'USD Coin',
  //   price: 1.001,
  // },
  // {
  //   icon: <Cardano />,
  //   code: 'ADA',
  //   name: 'Cardano',
  //   price: 0.448,
  // },
  // {
  //   icon: <Doge />,
  //   code: 'DOGE',
  //   name: 'Doge Coin',
  //   price: 0.065,
  // },
];
