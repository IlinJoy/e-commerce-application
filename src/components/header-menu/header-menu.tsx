import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import type { RoutePath } from '@/router/routes';
import type { NavigateFunction } from 'react-router';
import type { Dispatch, SetStateAction } from 'react';
import { ROUTES } from '@/router/routes';
import { useRef, useState } from 'react';
import { SpriteIcon } from '../icon/icon';

type HeaderMenuProps = {
  navigate: NavigateFunction;
  setAuth: Dispatch<SetStateAction<boolean>>;
};

export function HeaderMenu({ navigate, setAuth }: HeaderMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const anchorElRef = useRef<HTMLButtonElement>(null);

  const handleLogout = () => {
    setAuth(false);
    handleNavigate(ROUTES.MAIN);
  };

  const handleNavigate = (route: RoutePath) => {
    setIsOpen(false);
    navigate(route.path);
  };

  return (
    <>
      <IconButton ref={anchorElRef} color="primary" onClick={() => setIsOpen(true)}>
        <SpriteIcon id="user" />
      </IconButton>
      <Menu anchorEl={anchorElRef.current} onClose={() => setIsOpen(false)} open={isOpen}>
        <MenuItem onClick={() => handleNavigate(ROUTES.ACCOUNT)}>Account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout ➜</MenuItem>
      </Menu>
    </>
  );
}
