import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import routes from '@/config/routes';
import DashboardLayout from '@/layouts/_dashboard';
import Button from '@/components/ui/button';
import ActiveLink from '@/components/ui/links/active-link';
import AnchorLink from '@/components/ui/links/anchor-link';
import { RangeIcon } from '@/components/icons/range-icon';
import { ExportIcon } from '@/components/icons/export-icon';
import { OptionIcon } from '@/components/icons/option';
import { InfoCircle } from '@/components/icons/info-circle';
import { useModal } from '@/components/modal-views/context';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
// dynamic import
const Listbox = dynamic(() => import('@/components/ui/list-box'));

const tradeMenu = [
  {
    name: 'Trade',
    value: routes.swap,
  },
  {
    name: 'Liquidity',
    value: routes.liquidity,
  },
];

function ActiveNavLink({ href, title, isActive, className }: any) {
  return (
    <ActiveLink
      href={href}
      className={cn(
        'relative z-[1] inline-flex items-center py-1.5 px-3',
        className
      )}
      activeClassName="font-medium text-white"
    >
      <span>{title}</span>
      {isActive && (
        <motion.span
          className="absolute left-0 right-0 bottom-0 -z-[1] h-full w-full rounded-lg bg-brand shadow-large"
          layoutId="activeNavLinkIndicator"
        />
      )}
    </ActiveLink>
  );
}

export default function TradeContainer({ children }: React.PropsWithChildren<{}>) {
  const { openModal } = useModal();
  const router = useRouter();
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  const currentPath = tradeMenu.findIndex(
    (item) => item.value === router.pathname
  );
  let [selectedMenuItem, setSelectedMenuItem] = useState(tradeMenu[0]);
  function handleRouteOnSelect(path: string) {
    router.push(path);
  }
  useEffect(() => {
    setSelectedMenuItem(tradeMenu[currentPath]);
  }, [currentPath]);
  return (
    <div className="text-sm ">
      <div className="mx-auto mt-6 w-full max-w-lg rounded-lg border border-[#374151] bg-white p-5 shadow-card dark:bg-[#161B1D] xs:p-6 xs:pt-5">
        <nav className="mb-5 min-h-[40px] border-b border-dashed border-gray-200 pb-4 uppercase tracking-wider dark:border-gray-700 xs:mb-6 xs:pb-5 xs:tracking-wide">
          <div className="hidden items-center justify-between text-gray-600 dark:text-gray-400 sm:flex">
            {tradeMenu.map((item) => (
              <ActiveNavLink
                key={item.name}
                href={item.value}
                title={item.name}
                isActive={item.value === router.pathname}
              />
            ))}
            <AnchorLink
              href="/"
              className="inline-flex items-center gap-1.5 py-1.5 px-3"
            >
              Charts
              <ExportIcon className="h-auto w-2.5" />
            </AnchorLink>
          </div>
        </nav>
        <div className="w-[105%] flex flex-row justify-between">
          <div className="grid grid-cols-1 place-items-center">
            <div className="text-lg">
              Dex Aggregator
            </div>
          </div>
          <div className="pr-5 flex flex-row">
            <InfoCircle className="mr-3 h-auto w-4" style={{ cursor: "pointer" }} />
            <OptionIcon className="mr-1 h-auto w-4" onClick={() => { openModal('SETTINGS') }} style={{ cursor: "pointer" }} />
          </div>
        </div>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            initial="exit"
            animate="enter"
            exit="exit"
            variants={fadeInBottom('easeIn', 0.25)}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
