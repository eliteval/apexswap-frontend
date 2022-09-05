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
import { useModal } from '@/components/modal-views/context';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
// dynamic import
const Listbox = dynamic(() => import('@/components/ui/list-box'));

const tradeMenu = [
  {
    name: 'Market',
    value: routes.swap,
  },
  // {
  //   name: 'Bridge',
  //   value: routes.bridge,
  // },
  {
    name: 'Limit',
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
      <div className=" mt-6 w-full max-w-lg rounded-lg border border-[#374151] bg-white  shadow-card dark:bg-[#161b1d] xs:p-4 xs:pt-5">
        <nav className="mb-2 min-h-[40px] border-gray-200 uppercase tracking-wider dark:border-gray-700 xs:mb-2 xs:tracking-wide">
          <div className="rounded-md p-1 bg-[#303030] hidden items-center text-gray-600 dark:text-gray-400 sm:flex">
            {tradeMenu.map((item) => (
              <ActiveNavLink
                key={item.name}
                href={item.value}
                title={item.name}
                isActive={item.value === router.pathname}                
              />
            ))}
          </div>
        </nav>
        
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

// #21282c