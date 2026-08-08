import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {
  ArrowRight,
  Code2,
  Key,
  Layers,
  Settings2,
  Webhook,
  type LucideIcon,
} from 'lucide-react';

import styles from './styles.module.css';

const quickLinks: {
  label: string;
  desc: string;
  path: string;
  icon: LucideIcon;
}[] = [
  {
    label: 'Quickstart Guide',
    desc: 'Get your first crawl running in 2 minutes',
    path: '/docs/getting-started/quickstart',
    icon: ArrowRight,
  },
  {
    label: 'Collections',
    desc: 'Organise fetchers into logical groups',
    path: '/docs/concepts/collections',
    icon: Layers,
  },
  {
    label: 'Fetchers',
    desc: 'Configure crawl jobs with depth, scheduling & more',
    path: '/docs/concepts/fetchers',
    icon: Settings2,
  },
  {
    label: 'Authentication',
    desc: 'API keys, scopes, and security',
    path: '/docs/getting-started/authentication',
    icon: Key,
  },
  {
    label: 'Webhooks',
    desc: 'Real-time notifications for crawl events',
    path: '/docs/concepts/webhooks',
    icon: Webhook,
  },
  {
    label: 'REST API',
    desc: 'Full endpoint reference with examples',
    path: '/docs/api/rest',
    icon: Code2,
  },
];

export default function ExploreGrid(): ReactNode {
  return (
    <div className={styles.exploreGrid}>
      {quickLinks.map((link) => (
        <Link key={link.path} to={link.path} className={styles.exploreCard}>
          <div className={styles.exploreIcon}>
            <link.icon />
          </div>
          <div>
            <p className={styles.exploreTitle}>{link.label}</p>
            <p className={styles.exploreDesc}>{link.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
