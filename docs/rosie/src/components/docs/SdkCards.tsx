import type {ReactNode} from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

type SdkStatus = 'Stable' | 'Beta' | 'Coming Soon';

type Sdk = {
  lang: string;
  pkg: string;
  status: SdkStatus;
};

const statusClass: Record<SdkStatus, string> = {
  Stable: styles.sdkStable,
  Beta: styles.sdkBeta,
  'Coming Soon': styles.sdkSoon,
};

export default function SdkCards({sdks}: {sdks: Sdk[]}): ReactNode {
  return (
    <div className={styles.sdkGrid}>
      {sdks.map((sdk) => (
        <div key={sdk.lang} className={styles.sdkCard}>
          <div className={styles.sdkHeader}>
            <p className={styles.sdkLang}>{sdk.lang}</p>
            <span className={clsx(styles.sdkStatus, statusClass[sdk.status])}>
              {sdk.status}
            </span>
          </div>
          <div className={styles.sdkPkg}>{sdk.pkg}</div>
        </div>
      ))}
    </div>
  );
}
