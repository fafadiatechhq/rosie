import type {ReactNode} from 'react';

import styles from './styles.module.css';

export default function StepHeading({
  n,
  children,
}: {
  n: number;
  children: ReactNode;
}): ReactNode {
  return (
    <h2 className={styles.stepHeading}>
      <span className={styles.stepNumber}>{n}</span>
      {children}
    </h2>
  );
}
