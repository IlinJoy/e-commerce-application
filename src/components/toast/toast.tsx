import type { SnackbarCloseReason } from '@mui/material/Snackbar';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export type ToastProps = {
  message: string;
  isError?: boolean;
  isOpen: boolean;
  onClose: (_?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => void;
};

export function Toast({ message, isError, isOpen, onClose }: ToastProps) {
  return (
    <div>
      <Snackbar
        open={isOpen}
        autoHideDuration={5000}
        onClose={onClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert onClose={onClose} severity={isError ? 'error' : 'success'} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
