import { AccountCircleOutlined, ShoppingBagOutlined } from '@mui/icons-material';
import { Badge, IconButton, Stack } from '@mui/material';

export function HeaderButtonGroup() {
  return (
    <Stack direction={'row'} sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
      <IconButton color="primary">
        <Badge badgeContent={9} color="warning">
          <ShoppingBagOutlined />
        </Badge>
      </IconButton>
      <IconButton color="primary">
        <AccountCircleOutlined />
      </IconButton>
    </Stack>
  );
}
