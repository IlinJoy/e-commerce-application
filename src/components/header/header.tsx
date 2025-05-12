import Container from '@mui/material/Container';
import { HeaderButtonGroup } from './ui/header-button-group/header-button-group';
import { Navigation } from './ui/navigation/navigation';
import { useState } from 'react';
import { Logo } from './ui/logo/logo';
import styles from './header.module.scss';

export function Header() {
  //TODO заменить useContext
  const [auth, setAuth] = useState(true);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenuHandler = () => setIsOpenMenu((show) => !show);
  const closeMenu = () => setIsOpenMenu(false);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.bar}>
          <Logo />
          <Navigation auth={auth} isOpenMenu={isOpenMenu} closeMenu={closeMenu} />
          <HeaderButtonGroup
            auth={auth}
            setAuth={setAuth}
            toggleMenuHandler={toggleMenuHandler}
            isOpenMenu={isOpenMenu}
          />
        </div>
      </Container>
    </header>
  );
}
