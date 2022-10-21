import Button from '@/components/ui/button';
import { Gear } from '@/components/icons/gear';
import { Gear2 } from '@/components/icons/gear2';
import { Globe } from '@/components/icons/globe';
import { WalletContext } from '@/lib/hooks/use-connect';
import { Menu } from '@/components/ui/menu';
import { Transition } from '@/components/ui/transition';
import ActiveLink from '@/components/ui/links/active-link';
import { ChevronForward } from '@/components/icons/chevron-forward';
import { PowerIcon } from '@/components/icons/power';
import { useModal } from '@/components/modal-views/context';
import { useContext } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function WalletConnect() {
  const { openModal } = useModal();
  const { address, disconnectWallet, balance, chainId, swtichNetwork } =
    useContext(WalletContext);
  return (
    <>
      {/* <div className="flex items-center gap-3 sm:gap-6 lg:gap-3">
          <div className="relative">
            {chainId == 43114 ? <Menu>
              <Menu.Button className="block h-10 w-[130px] text-sm overflow-hidden rounded-full border-2 border-solid border-white bg-gradient-to-r from-[#c62828] to-[#c62828] shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large dark:border-gray-700">
                Avalanche
              </Menu.Button>
            </Menu> : <Menu>
              <Menu.Button className="block h-10 w-[130px] text-sm overflow-hidden rounded-full border-2 border-solid border-white bg-gradient-to-r from-[#ab3c00] to-[#852504] shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large dark:border-gray-700"
                onClick={() => swtichNetwork()}
              >
                Wrong Network
              </Menu.Button>
            </Menu>}

          </div>

          <div className="relative">
            <Menu>
              <Menu.Button className="block h-10 w-[140px] text-sm overflow-hidden rounded-full border-2 border-solid border-white bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large dark:border-gray-700">
                {address.slice(0, 5)}{'...'}{address.slice(address.length - 4)}
              </Menu.Button>
              <Transition
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
              >
                <Menu.Items className="absolute -right-20 mt-3 w-72 origin-top-right rounded-lg bg-white shadow-large dark:bg-gray-900 sm:-right-14">
                  <Menu.Item>
                    <div className=" border-gray-200 px-6 py-5 dark:border-gray-700">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium -tracking-tighter text-gray-600 dark:text-gray-400">
                          Account
                        </span>
                        <span className="text-sm font-medium -tracking-tighter text-gray-600 dark:text-gray-400">
                          {address.slice(0, 6)}
                          {'...'}
                          {address.slice(address.length - 4)}
                        </span>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div className="border-b border-dashed border-gray-200 px-6 py-5 dark:border-gray-700">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium -tracking-tighter text-gray-600 dark:text-gray-400">
                          Balance
                        </span>
                        <span className="text-sm font-medium -tracking-tighter text-gray-600 dark:text-gray-400">
                          {Number(balance).toFixed(3)}
                        </span>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div className="p-3">
                      <div
                        className="flex cursor-pointer items-center gap-3 rounded-lg py-2.5 px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                        onClick={disconnectWallet}
                      >
                        <PowerIcon />
                        <span className="grow uppercase">Disconnect</span>
                      </div>
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

        </div> */}

      {/* <Button
        size="mini"
        shape="circle"
        className="primary-font-family fs-14 mt-1 rounded-full border-2 border-[#0D0C52] bg-transparent"
      >
        <Globe />
      </Button>
      <Button
        size="mini"
        shape="circle"
        className="primary-font-family fs-14 mt-1 rounded-full border-2 border-[#0D0C52] bg-transparent"
      >
        <Gear2 />
      </Button> */}

      {/* {!address ?
        <Button
          size="mini"
          shape="pill"
          className="mt-1 py-1 px-5 bg-transparent border-2 border-[#FEB58D] rounded-full primary-font-family fs-14"
          onClick={() => openModal('WALLET_CONNECT_VIEW')}
        >
          <span>Connect Wallet</span>
        </Button> : <Button
          size="mini"
          shape="pill"
          className="mt-1 py-1 px-5 bg-transparent border-2 border-[#FEB58D] rounded-full primary-font-family fs-14"
          onClick={disconnectWallet}
        >
          <span>{address.slice(0, 5)}{'...'}{address.slice(address.length - 4)}</span>        
        </Button>} */}

      <div className="header-wallet-connect">
        <ConnectButton chainStatus={'none'} accountStatus="address" />
      </div>
    </>
  );
}
