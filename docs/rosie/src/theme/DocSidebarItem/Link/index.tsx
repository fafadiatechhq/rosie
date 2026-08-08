import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {isActiveSidebarItem} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type {Props} from '@theme/DocSidebarItem/Link';
import {
  BookOpen,
  ChevronRight,
  Code2,
  FileCode2,
  HelpCircle,
  Key,
  Layers,
  PlayCircle,
  Settings2,
  Webhook,
  type LucideIcon,
} from 'lucide-react';

import styles from './styles.module.css';

const ICONS: Record<string, LucideIcon> = {
  BookOpen,
  PlayCircle,
  Key,
  Layers,
  Settings2,
  Webhook,
  Code2,
  FileCode2,
  HelpCircle,
};

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: Props): ReactNode {
  const {href, label, className, autoAddBaseUrl, customProps} = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);
  const iconName =
    typeof customProps?.icon === 'string' ? customProps.icon : undefined;
  const Icon = iconName ? ICONS[iconName] : undefined;

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={label}>
      <Link
        className={clsx(
          'menu__link',
          styles.link,
          !isInternalLink && styles.menuExternalLink,
          {
            'menu__link--active': isActive,
          },
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}>
        {Icon && <Icon className={styles.icon} />}
        <span className={styles.linkLabel}>{label}</span>
        {isActive && <ChevronRight className={styles.chevron} />}
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
