import { Stack } from '@mui/material';
import styles from '../header.module.scss';
import { NavLink } from 'react-router';
import clsx from 'clsx';

export function Navigation() {
  const pages = ['Home', 'Catalog', 'About Us'];
  return (
    <Stack component={'nav'} direction={'row'} spacing={3}>
      {pages.map((page) => (
        <NavLink
          key={page}
          to={page === 'Home' ? '/' : page.toLowerCase()}
          className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })}
        >
          {page}
        </NavLink>
      ))}
    </Stack>
  );
}
