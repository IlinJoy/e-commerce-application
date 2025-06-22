import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import type { RoutePath } from '@/router/routes';
import { ROUTES } from '@/router/routes';
import { useEffect, useRef, useState } from 'react';
import { SpriteIcon } from '../icon/icon';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/use-auth';

export function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const anchorElRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const { onLogout } = useAuth();

  const handleNavigate = (route: RoutePath) => {
    setIsOpen(false);
    navigate(route.path);
  };

  const handleLogout = () => {
    onLogout();
    handleNavigate(ROUTES.MAIN);
  };

  useEffect(() => {
    if (isOpen) {
      const onScroll = () => setIsOpen(false);
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, [isOpen]);

  return (
    <>
      <IconButton ref={anchorElRef} color="primary" onClick={() => setIsOpen(true)}>
        <SpriteIcon id="user" />
      </IconButton>
      <Menu disableScrollLock anchorEl={anchorElRef.current} onClose={() => setIsOpen(false)} open={isOpen}>
        <MenuItem onClick={() => handleNavigate(ROUTES.ACCOUNT)}>Account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout ➜</MenuItem>
      </Menu>
    </>
  );
}
