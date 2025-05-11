import type { RoutePath } from '@/router/routes';
import type { NavigateFunction } from 'react-router';
import type { Dispatch, SetStateAction } from 'react';
import { ROUTES } from '@/router/routes';
import { AccountCircleOutlined } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useRef, useState } from 'react';

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
        <AccountCircleOutlined />
      </IconButton>
      <Menu anchorEl={anchorElRef.current} onClose={() => setIsOpen(false)} open={isOpen}>
        <MenuItem onClick={() => handleNavigate(ROUTES.ACCOUNT)}>Account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout ➜</MenuItem>
      </Menu>
    </>
  );
}
