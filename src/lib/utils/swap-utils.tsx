import { coinList } from '@/data/static/coin-list';
import { dexList } from '@/data/static/dex-list';

export const getCoinName = (address: string) => {
    const index = coinList.findIndex(
        (item) => item.address.toLowerCase() === address.toLowerCase()
    );
    if (index !== -1) {
        return coinList[index].name;
    } else {
        return "Unknown";
    }
}

export const getCoinDecimals = (address: any) => {
    const index = coinList.findIndex(
        (item) => item.address === address
    );
    if (index !== -1) {
        return coinList[index].decimals;
    } else {
        return 18;
    }
}

export const getDexName = (address: any) => {
    const index = dexList.findIndex(
        (item) => item.address.toLowerCase() === address.toLowerCase()
    );
    if (index !== -1) {
        return dexList[index].dex;
    } else {
        return "Unknown";
    }
}