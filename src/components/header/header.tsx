import Container from '@mui/material/Container';
import { HeaderButtonGroup } from './ui/header-button-group/header-button-group';
import { Navigation } from './ui/navigation/navigation';
import { useEffect, useState } from 'react';
import { Logo } from './ui/logo/logo';
import { CLASSES, headerScrollPref } from '@/utils/constants/ui';
import { throttle } from '@/utils/throttle';
import styles from './header.module.scss';
import clsx from 'clsx';
import { useLocation } from 'react-router';

export function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isFilledHeader, setIsFilledHeader] = useState(false);
  const { pathname } = useLocation();

  const toggleMenuHandler = () => setIsOpenMenu((show) => !show);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.scrollY;
      const newValue = scrollHeight > headerScrollPref.offset;

      if (newValue !== isFilledHeader) {
        setIsFilledHeader(newValue);
      }
    };

    const throttledHandler = throttle(handleScroll, headerScrollPref.timeout);
    window.addEventListener('scroll', throttledHandler);

    return () => {
      window.removeEventListener('scroll', throttledHandler);
    };
  }, [isFilledHeader]);

  useEffect(() => {
    document.body.classList.toggle(CLASSES.disable, isOpenMenu);
  }, [isOpenMenu]);

  useEffect(() => {
    setIsOpenMenu(false);
  }, [pathname]);

  return (
    <header className={clsx(styles.header, { [styles.filled]: isFilledHeader })}>
      <Container>
        <div className={styles.bar}>
          <Logo />
          <Navigation isOpenMenu={isOpenMenu} />
          <HeaderButtonGroup toggleMenuHandler={toggleMenuHandler} isOpenMenu={isOpenMenu} />
        </div>
      </Container>
    </header>
  );
}
