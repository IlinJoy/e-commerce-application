import type { RoutePath } from '@/router/routes';
import type { NavigateFunction } from 'react-router';
import type { Dispatch, SetStateAction } from 'react';
import { ROUTES } from '@/router/routes';
import { AccountCircleOutlined } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState, type MouseEvent } from 'react';

type HeaderMenuProps = {
  navigate: NavigateFunction;
  setAuth: Dispatch<SetStateAction<boolean>>;
};

export function HeaderMenu({ navigate, setAuth }: HeaderMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setAuth(false);
    handleNavigate(ROUTES.MAIN);
  };

  const handleNavigate = (route: RoutePath) => {
    setAnchorEl(null);
    navigate(route.path);
  };

  return (
    <>
      <IconButton color="primary" onClick={handleOpen}>
        <AccountCircleOutlined />
      </IconButton>
      <Menu anchorEl={anchorEl} onClose={() => setAnchorEl(null)} open={!!anchorEl}>
        <MenuItem onClick={() => handleNavigate(ROUTES.ACCOUNT)}>Account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout ➜</MenuItem>
      </Menu>
    </>
  );
}
