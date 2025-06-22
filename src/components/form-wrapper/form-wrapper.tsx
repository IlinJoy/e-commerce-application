import type { ReactNode } from 'react';
import styles from './form-wrapper.module.scss';

type FormWrapperProps = {
  children: ReactNode;
};

export function FormWrapper({ children }: FormWrapperProps) {
  return (
    <div className={styles.page}>
      <div className={styles.formWrapper}>{children}</div>
      <div className={styles.background}></div>
    </div>
  );
}
