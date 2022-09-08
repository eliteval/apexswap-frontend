import Button from '@/components/ui/button';
import { InfoIcon } from '@/components/icons/info-icon';
import { Switch } from '@/components/ui/switch';
import cn from 'classnames';
import { useState } from 'react';
import { atom, useAtom } from 'jotai';

// Create your atoms and derivatives
var settingsAtom
export function useTextAtom() {
  return {settingsAtom};
}

export default function Settings({ ...props }) {
  let [txSpeed, setTxSpeed] = useState('');
  let [tolerance, setTolerance] = useState('');
  let [swch1, setSwch1] = useState(false);
  let [swch2, setSwch2] = useState(false);
  let [swch3, setSwch3] = useState(false);
  settingsAtom = atom({ txSpeed: txSpeed, tolerance: tolerance });

  return (
    <div
      className="relative z-50 mx-auto w-[440px] max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark"
      {...props}
    >
      <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white">
        Settings
      </h2>
      <p className="flex items-center gap-2 text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
        Default Transaction Speed(GWEI) <InfoIcon className="h-3 w-3" />
      </p>
      <div className="grid grid-cols-3 gap-2">
        <Button
          color="gray"
          className="dark:focus:bg-gradient-to-r dark:focus:from-cyan-400 dark:focus:to-blue-500 mb-5 max-h-8 w-full font-normal text-gray-600 hover:text-gray-900 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-white lg:mt-6"
          onClick={()=>{setTxSpeed('Standard')}}
        >
          <span className="flex items-center gap-2">
            Standard
          </span>
        </Button>
        <Button
          color="gray"
          className="dark:focus:bg-gradient-to-r dark:focus:from-cyan-400 dark:focus:to-blue-500 mb-5 max-h-8 w-full font-normal text-gray-600 hover:text-gray-900 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-white lg:mt-6"
          onClick={()=>{setTxSpeed('Fast')}}
        >
          <span className="flex items-center gap-2">
            Fast
          </span>
        </Button>
        <Button
          color="gray"
          className="dark:focus:bg-gradient-to-r dark:focus:from-cyan-400 dark:focus:to-blue-500 mb-5 max-h-8 w-full font-normal text-gray-600 hover:text-gray-900 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-white lg:mt-6"
          onClick={()=>{setTxSpeed('Instant')}}
        >
          <span className="flex items-center gap-2">
            Instant
          </span>
        </Button>
      </div>
      <p className="flex items-center gap-2 text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
        Slippage Tolerance <InfoIcon className="h-3 w-3" />
      </p>
      <div className="grid grid-cols-4 gap-2">
        <Button
          color="gray"
          className="dark:focus:bg-gradient-to-r dark:focus:from-cyan-400 dark:focus:to-blue-500 mb-5 max-h-8 w-full font-normal text-gray-600 hover:text-gray-900 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-white lg:mt-6"
          onClick={()=>{setTolerance('0.1%')}}
        >
          <span className="flex items-center gap-2">
            0.1%
          </span>
        </Button>
        <Button
          color="gray"
          className="dark:focus:bg-gradient-to-r dark:focus:from-cyan-400 dark:focus:to-blue-500 mb-5 max-h-8 w-full font-normal text-gray-600 hover:text-gray-900 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-white lg:mt-6"
          onClick={()=>{setTolerance('0.5%')}}
        >
          <span className="flex items-center gap-2">
            0.5%
          </span>
        </Button>
        <Button
          color="gray"
          className="dark:focus:bg-gradient-to-r dark:focus:from-cyan-400 dark:focus:to-blue-500 mb-5 max-h-8 w-full font-normal text-gray-600 hover:text-gray-900 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-white lg:mt-6"
          onClick={()=>{setTolerance('1.0%')}}
        >
          <span className="flex items-center gap-2">
            1.0%
          </span>
        </Button>
        <div>
          <input
            className="mb-5 max-h-8 w-full rounded-full border border-gray-200 py-1 text-sm text-gray-900 placeholder:text-gray-600 focus:border-gray-900 focus:outline-none ltr:pr-5 ltr:pl-11 rtl:pl-1 rtl:pr-1 dark:border-gray-600 dark:bg-light-dark dark:text-white dark:placeholder:text-gray-400 dark:focus:border-gray-500 sm:ltr:pl-4 sm:rtl:pr-4 xl:ltr:pl-6 xl:rtl:pr-6  md:h-9 md:px-4 lg:mt-6"
            placeholder={"  " + "%"}
            autoComplete="off"
            type="search"
          />
        </div>
      </div>
      {/* <p className="relative flex items-center justify-between gap-2 text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          Select1 <InfoIcon className="h-3 w-3" />
        </div>
        <Switch checked={swch1} onChange={() => setSwch1(!swch1)}>
          <div
            className={cn(
              swch1 ? 'bg-brand dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-500' : 'bg-gray-200 dark:bg-gray-700',
              'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300'
            )}
          >
            <span
              className={cn(
                swch1
                  ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-gray-700'
                  : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-gray-400',
                'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200'
              )}
            />
          </div>
        </Switch>
      </p>
      <p className="relative flex items-center justify-between gap-2 text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          Select2 <InfoIcon className="h-3 w-3" />
        </div>
        <Switch checked={swch2} onChange={() => setSwch2(!swch2)}>
          <div
            className={cn(
              swch2 ? 'bg-brand dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-500' : 'bg-gray-200 dark:bg-gray-700',
              'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300'
            )}
          >
            <span
              className={cn(
                swch2
                  ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-gray-700'
                  : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-gray-400',
                'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200'
              )}
            />
          </div>
        </Switch>
      </p>
      <p className="relative flex items-center justify-between gap-2 text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          Select3 <InfoIcon className="h-3 w-3" />
        </div>
        <Switch checked={swch3} onChange={() => setSwch3(!swch3)}>
          <div
            className={cn(
              swch3 ? 'bg-brand dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-500' : 'bg-gray-200 dark:bg-gray-700',
              'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300'
            )}
          >
            <span
              className={cn(
                swch3
                  ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-gray-700'
                  : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-gray-400',
                'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200'
              )}
            />
          </div>
        </Switch>
      </p> */}

    </div>
  );
}
