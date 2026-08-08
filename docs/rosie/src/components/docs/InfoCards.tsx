import type {ReactNode} from 'react';

import styles from './styles.module.css';

type InfoCard = {
  title: string;
  description: string;
  meta?: ReactNode;
};

export default function InfoCards({items}: {items: InfoCard[]}): ReactNode {
  return (
    <div className={styles.infoGrid}>
      {items.map((item) => (
        <div key={item.title} className={styles.infoCard}>
          <p className={styles.infoTitle}>{item.title}</p>
          {item.meta ? <p className={styles.infoMeta}>{item.meta}</p> : null}
          <p className={styles.infoBody}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
