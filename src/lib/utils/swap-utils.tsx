import { dexList } from '@/data/static/dex-list';

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

export const getDexAddress = (name: any) => {
    const index = dexList.findIndex(
        (item) => item.dex.toLowerCase() === name.toLowerCase()
    );
    if (index !== -1) {
        return dexList[index].address;
    } else {
        return "Unknown";
    }
}