import type {ReactNode} from 'react';

import styles from './styles.module.css';

const stats = [
  {stat: '6', label: 'Fetcher Types'},
  {stat: '99.9%', label: 'Uptime SLA'},
  {stat: '< 200ms', label: 'API Latency'},
];

export default function StatCards(): ReactNode {
  return (
    <div className={styles.statGrid}>
      {stats.map((item) => (
        <div key={item.label} className={styles.statCard}>
          <p className={styles.statValue}>{item.stat}</p>
          <p className={styles.statLabel}>{item.label}</p>
        </div>
      ))}
    </div>
  );
}
