import type {ReactNode} from 'react';

import styles from './styles.module.css';

export default function Callout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): ReactNode {
  return (
    <div className={styles.callout}>
      <h3 className={styles.calloutTitle}>{title}</h3>
      <div className={styles.calloutBody}>{children}</div>
    </div>
  );
}
