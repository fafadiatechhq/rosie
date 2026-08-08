import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {ArrowRight} from 'lucide-react';

import styles from './styles.module.css';

type Step = {label: string; path: string};

export default function NextSteps({
  title = 'Next steps',
  items,
}: {
  title?: string;
  items: Step[];
}): ReactNode {
  return (
    <div className={styles.callout}>
      <h3 className={styles.calloutTitle}>{title}</h3>
      <ul className={styles.calloutList}>
        {items.map((item) => (
          <li key={item.path}>
            <Link to={item.path}>
              <ArrowRight />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
