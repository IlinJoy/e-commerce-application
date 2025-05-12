import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { HeaderButtonGroup } from './ui/header-button-group';
import { Navigation } from './ui/navigation';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Logo } from './ui/logo';
import styles from './header.module.scss';

export function Header() {
  const [auth, setAuth] = useState(true);
  const navigate = useNavigate();

  return (
    <AppBar elevation={0} className={styles.bar}>
      <Container>
        <Toolbar disableGutters>
          <Logo navigate={navigate} />
          <Navigation auth={auth} />
          <HeaderButtonGroup navigate={navigate} auth={auth} setAuth={setAuth} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
