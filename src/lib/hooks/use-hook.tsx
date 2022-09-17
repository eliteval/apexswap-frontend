import { useEffect, useState, createContext, ReactNode } from 'react';
import { ethers } from 'ethers';
import Image from '@/components/ui/image';
import { coinList } from '@/data/static/coin-list';
import ERC20 from "@/abi/ERC20.json";


export const HookContext = createContext<any>({});

export const HookProvider = ({ children }: { children: ReactNode }) => {
  const [coinslist, setCoinsList] = useState<[] | undefined>(coinList);

  useEffect(() => {
  }, []);

  const addCoinToList = async (coin: string) => {
    try {
      const index = coinslist.findIndex(
        (item) => item.address.toLowerCase() === coin.address.toLowerCase()
      );
      if (index !== -1)
        return 'already exist';

      var newarr = [...coinslist];
      newarr.push(coin)
      setCoinsList(newarr)
    } catch (e) {
    }
  };

  const getCoinName = (address: string) => {
    const index = coinslist.findIndex(
      (item) => item.address.toLowerCase() === address.toLowerCase()
    );
    if (index !== -1) {
      return coinslist[index].name;
    } else {
      return "Unknown";
    }
  }

  const getCoinIcon = (address: string) => {
    const index = coinslist.findIndex(
      (item) => item.address.toLowerCase() === address.toLowerCase()
    );
    if (index !== -1) {
      return coinslist[index].icon;
    } else {
      return <img src="/assets/coins/unknown.png"  width='24px' height='24px' />;
    }
  }

  const getCoinCode = (address: string) => {
    const index = coinslist.findIndex(
      (item) => item.address.toLowerCase() === address.toLowerCase()
    );
    if (index !== -1) {
      return coinslist[index].code;
    } else {
      return "Unknown";
    }
  }

  const getCoinDecimals = (address: any) => {
    const index = coinslist.findIndex(
      (item) => item.address === address
    );
    if (index !== -1) {
      return coinslist[index].decimals;
    } else {
      return 18;
    }
  }

  return (
    <HookContext.Provider
      value={{
        coinslist,
        getCoinName,
        getCoinDecimals,
        getCoinIcon,
        getCoinCode,
        addCoinToList
      }}
    >
      {children}
    </HookContext.Provider>
  );
};
