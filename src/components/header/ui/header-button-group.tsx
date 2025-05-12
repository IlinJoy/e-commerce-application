import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import type { NavigateFunction } from 'react-router';
import type { Dispatch, SetStateAction } from 'react';
import { HeaderMenu } from '../../header-menu/header-menu';

type HeaderMenuProps = {
  navigate: NavigateFunction;
  setAuth: Dispatch<SetStateAction<boolean>>;
  auth: boolean;
};

export function HeaderButtonGroup({ navigate, setAuth, auth }: HeaderMenuProps) {
  return (
    <Stack direction={'row'} sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
      <IconButton color="primary">
        <Badge badgeContent={9} color="warning">
          <ShoppingBagOutlined />
        </Badge>
      </IconButton>
      {auth && <HeaderMenu navigate={navigate} setAuth={setAuth} />}
    </Stack>
  );
}
