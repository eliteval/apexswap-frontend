import type { LinkProps } from 'next/link';
import NextLink from 'next/link';

const AnchorLink: React.FC<
  LinkProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
> = ({ href, ...props }) => {
  return (
    <NextLink href={href}>
      <a style={{	borderRadius: "0.5rem", marginRight: "0.125rem"}} {...props} />
    </NextLink>
  );
};

export default AnchorLink;
