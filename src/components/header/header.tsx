import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import styles from './header.module.scss';
import { HeaderButtonGroup } from './ui/header-button-group';
import { Navigation } from './ui/header-menu';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/router/routes';

export function Header() {
  const navigate = useNavigate();

  return (
    <AppBar elevation={0} className={styles.bar}>
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h5" component={'a'} onClick={() => void navigate(ROUTES.MAIN)} className={styles.logo}>
            UNICKO
          </Typography>
          <Navigation />
          <HeaderButtonGroup />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
