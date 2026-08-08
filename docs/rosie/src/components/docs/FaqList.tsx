import type {ReactNode} from 'react';

import styles from './styles.module.css';

type Faq = {q: string; a: string};

export default function FaqList({faqs}: {faqs: Faq[]}): ReactNode {
  return (
    <div className={styles.faqList}>
      {faqs.map((faq) => (
        <div key={faq.q} className={styles.faqItem}>
          <h3 className={styles.faqQuestion}>{faq.q}</h3>
          <p className={styles.faqAnswer}>{faq.a}</p>
        </div>
      ))}
    </div>
  );
}
