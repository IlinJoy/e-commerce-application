import styles from './account-page.module.scss';
import { NavLink, Outlet } from 'react-router';
import { ACCOUNT_LINKS } from '@/utils/constants/ui';
import { FormWrapper } from '@/components/form-wrapper/form-wrapper';

export function AccountPage() {
  return (
    <FormWrapper>
      <div className={styles.tabBar}>
        {ACCOUNT_LINKS.map((element) => (
          <NavLink
            key={element}
            to={element === 'Profile' ? '' : element.toLowerCase()}
            end={element === 'Profile'}
            className={({ isActive }) => (isActive ? styles.activeTab : styles.tab)}
          >
            {element}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </FormWrapper>
  );
}
