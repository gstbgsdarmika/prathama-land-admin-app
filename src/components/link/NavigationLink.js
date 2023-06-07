import * as React from 'react';
import clsx from 'clsx';
import UnstyledLink from './UnstyledLink';
import { usePathname } from '../../utils/useLocation';

export default function NavigationLink({
  title, icon: Icon, to,
  className, childrenClassName, ...rest
}) {
  const pathName = usePathname();
  const isActive = pathName === to;
  return (
    <li>
      <UnstyledLink
        className={clsx('flex items-center p-2 text-white rounded-lg hover:bg-green-700 ', isActive && 'bg-green-700 ', className)}
        to={to}
        {...rest}
      >
        {Icon && <Icon className="w-6 h-6 text-white" />}
        <span className={clsx('ml-3', childrenClassName)}>{title}</span>
      </UnstyledLink>
    </li>
  );
}
