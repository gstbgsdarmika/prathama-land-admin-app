import { Link } from 'react-router-dom';
import * as React from 'react';

import clsxm from 'clsx';

/**
  @param to: string;
  @param children: React.ReactNode;
  @param openNewTab?: boolean;
  @param className?: string;
  @param nextLinkProps?: Omit<LinkProps, 'href'>;
 */
const UnstyledLink = React.forwardRef(
  ({
    children, to, openNewTab, className, nextLinkProps, ...rest
  }, ref) => {
    const isNewTab = openNewTab !== undefined
      ? openNewTab
      : to && !to.startsWith('/') && !to.startsWith('#');

    if (!isNewTab) {
      return (
        <Link to={to} ref={ref} className={className} {...rest} {...nextLinkProps}>
          {children}
        </Link>
      );
    }

    return (
      <a
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        href={to}
        {...rest}
        className={clsxm('cursor-newtab', className)}
      >
        {children}
      </a>
    );
  },
);

export default UnstyledLink;
