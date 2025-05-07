import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { HeaderMenu } from './header-menu';
import { HeaderButtonGroup } from './header-button-group';
import styles from './header-ui.module.css';

export function HeaderUi() {
  return (
    <AppBar elevation={0} className={styles.bar}>
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h5" component={'a'} href="#" className={styles.logo}>
            UNICKO
          </Typography>
          <HeaderMenu />
          <HeaderButtonGroup />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
