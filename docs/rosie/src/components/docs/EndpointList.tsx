import type {ReactNode} from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type Endpoint = {
  method: Method;
  path: string;
  desc: string;
};

const methodClass: Record<Method, string> = {
  GET: styles.methodGet,
  POST: styles.methodPost,
  PUT: styles.methodPut,
  DELETE: styles.methodDelete,
};

export default function EndpointList({
  endpoints,
}: {
  endpoints: Endpoint[];
}): ReactNode {
  return (
    <div className={styles.endpointList}>
      {endpoints.map((ep) => (
        <div key={ep.method + ep.path} className={styles.endpointRow}>
          <span className={clsx(styles.method, methodClass[ep.method])}>
            {ep.method}
          </span>
          <code className={styles.endpointPath}>{ep.path}</code>
          <span className={styles.endpointDesc}>{ep.desc}</span>
        </div>
      ))}
    </div>
  );
}
