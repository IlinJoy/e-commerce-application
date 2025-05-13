import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import type { RoutePath } from '@/router/routes';
import { ROUTES } from '@/router/routes';
import { useRef, useState } from 'react';
import { SpriteIcon } from '../icon/icon';
import { useNavigate } from 'react-router';
import { useAuth } from '@/context/auth-context';

export function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const anchorElRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const { onLogout } = useAuth();

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
        <MenuItem onClick={onLogout}>Logout ➜</MenuItem>
      </Menu>
    </>
  );
}
