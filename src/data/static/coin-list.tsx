import { Bitcoin } from '@/components/icons/bitcoin';
import { Ethereum } from '@/components/icons/ethereum';
import { Tether } from '@/components/icons/tether';
import { Bnb } from '@/components/icons/bnb';
import { Usdc } from '@/components/icons/usdc';
import { Cardano } from '@/components/icons/cardano';
import { Doge } from '@/components/icons/doge';
import Avalanche from '@/assets/images/coin/avalanche.png';
import DAI from '@/assets/images/coin/dai.png';
import Image from '@/components/ui/image';


export const coinList = [
  {
    icon: <Image src={Avalanche} alt="Criptic" width='24px' height='24px' />,
    code: 'AVAX',
    name: 'Avalanche',
    address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    price: 20.29,
  },
  {
    icon: <Image src={DAI} alt="Criptic" width='24px' height='24px' />,
    code: 'DAI',
    name: 'DAI',
    address: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
    price: 1,
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
