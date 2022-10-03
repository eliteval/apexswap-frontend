import { useState, useEffect, useContext } from 'react';
import type { CoinTypes } from '@/types';
import { SearchIcon } from '@/components/icons/search';
import { useModal } from '@/components/modal-views/context';
import { HookContext } from '@/lib/hooks/use-hook';
import { ethers } from 'ethers';
import ERC20 from "@/abi/ERC20.json";
import Image from '@/components/ui/image';

interface CoinSelectViewTypes {
  onSelect: (selectedCoin: CoinTypes) => void;
  onClose: () => void;
}

export default function CoinSelectView({ onSelect, onClose }: CoinSelectViewTypes) {
  const { closeModal } = useModal();
  const { coinslist, addCoinToList } = useContext(HookContext);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [showingListData, setShowingListData] = useState(coinslist);
  const [loadingcoin, setloadingcoin] = useState(false);

  useEffect(() => {
    refresh();
  }, [searchKeyword, coinslist])

  const refresh = () => {
    if (searchKeyword.length > 0) {
      var vvvv = coinslist.filter(function (item) {
        const name = item.name;
        const address = item.address;
        return (
          name.match(searchKeyword) ||
          (name.toLowerCase().match(searchKeyword) && name) ||
          address.toLowerCase() == searchKeyword.toLowerCase()
        );
      });
      setShowingListData(vvvv)
    } else {
      setShowingListData(coinslist)
    }
  }

  function handleSelectedCoin(item: CoinTypes) {
    onSelect(item);
    closeModal();
  }
  function handleSelectedCoinOnKeyDown(
    event: React.KeyboardEvent<HTMLLIElement>,
    item: CoinTypes
  ) {
    if (event.code === 'Enter') {
      onSelect(item);
      closeModal();
    }
  }

  const handleInputChange = async (value: string) => {
    setSearchKeyword(value);
    if (ethers.utils.isAddress(value)) {
      setloadingcoin(true)
      try {
        const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/avalanche")
        const tokenContract = new ethers.Contract(value, ERC20.abi, provider);
        setloadingcoin(true)
        var name = await tokenContract.name();
        var code = await tokenContract.symbol();
        var decimals = await tokenContract.decimals();
        var icon = <Image src="/assets/coins/unknown.png"  width='24px' height='24px' />;
        addCoinToList({ name, code, decimals, icon, address: value })
        setloadingcoin(false)
      } catch (e) {
        console.log('not found')
        setloadingcoin(false)
      }
    }
  }

  return (
    <div className="w-full rounded-lg bg-white text-sm shadow-large dark:bg-dark xs:w-[400px] coin-dialog">
      <div className="coin-dialog-header relative">
        <h2 className="p-6 text-lg font-medium uppercase text-gray-900 dark:text-white text-center coin-dialog-header-title">
          Select a token
        </h2>
        <button className='close-btn' onClick={onClose}></button>
      </div>
      <div className="relative coin-search-container">
        <div className='relative'>
          <SearchIcon className="absolute left-6 h-full search-icon" />
          <input
            type="search"
            autoFocus={true}
            onChange={(e) => { handleInputChange(e.target.value) }}
            placeholder="Search name or paste address"
            className="coin-search-input w-full py-3.5 pl-14 pr-6 text-sm"
          />
        </div>
      </div>
      <div className='coin-divider'></div>
      <ul role="listbox" className="min-h-[200px] max-h-[500px]  py-3" style={{ overflow: "auto" }}>
        {loadingcoin ? <li className="px-6 py-20 text-center">
          <h3 className="mb-2 text-base">Wait a sec!</h3>
          <p className="text-gray-500">Fetching token information</p>
        </li> : showingListData.length > 0 ? (
          showingListData.map((item, index) => (
            <li
              key={index}
              role="listitem"
              tabIndex={index}
              onClick={() => handleSelectedCoin(item)}
              onKeyDown={(event) => handleSelectedCoinOnKeyDown(event, item)}
              className="flex cursor-pointer items-center gap-2 py-3 px-6 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900 coin-list-item"
            >
              {item.icon}
              <span className="">{item.name}</span>
            </li>
          ))
        ) : (
          // FIXME: need coin not found svg from designer
          <li className="px-6 py-20 text-center">
            <h3 className="mb-2 text-base">Ops! not found</h3>
            <p className="text-gray-500">Try another keyword for search</p>
          </li>
        )}
      </ul>
    </div>
  );
}
