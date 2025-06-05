import styles from './account-page.module.scss';
import { NavLink, Outlet } from 'react-router';
import { ACCOUNT_LINKS } from '@/utils/constants/ui';

export function AccountPage() {
  return (
    <>
      {ACCOUNT_LINKS.map((element) => (
        <NavLink key={element} to={element === 'Profile' ? '' : element.toLowerCase()}>
          {element}
        </NavLink>
      ))}
      <div className={styles.formWrapper}>
        <Outlet />
        <div className={styles.profileBg}></div>
      </div>
    </>
  );
}
