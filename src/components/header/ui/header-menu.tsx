import { Link, Stack } from '@mui/material';
import styles from '../header.module.scss';

const pages = ['Home', 'Catalog', 'About Us'];

export function HeaderMenu() {
  return (
    <Stack component={'nav'} direction={'row'} spacing={3}>
      {/* TODO replace with react-router links */}
      {pages.map((page) => (
        <Link key={page} href="#" className={styles.menu}>
          {page}
        </Link>
      ))}
    </Stack>
  );
}
