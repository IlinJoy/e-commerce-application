import Container from '@mui/material/Container';
import { HeaderButtonGroup } from './ui/header-button-group/header-button-group';
import { Navigation } from './ui/navigation/navigation';
import { useEffect, useState } from 'react';
import { Logo } from './ui/logo/logo';
import styles from './header.module.scss';
import clsx from 'clsx';

export function Header() {
  //TODO заменить useContext
  const [auth, setAuth] = useState(true);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isFilledHeader, setIsFilledHeader] = useState(false);

  const toggleMenuHandler = () => setIsOpenMenu((show) => !show);
  const closeMenu = () => setIsOpenMenu(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.scrollY;
      const offset = 50;

      if (scrollHeight > offset && !isFilledHeader) {
        setIsFilledHeader(true);
      } else if (scrollHeight <= offset && isFilledHeader) {
        setIsFilledHeader(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFilledHeader]);

  useEffect(() => {
    const disable = 'disable';
    document.body.classList.toggle(disable, isOpenMenu);
  }, [isOpenMenu]);

  return (
    <header className={clsx(styles.header, { [styles.filled]: isFilledHeader })}>
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
