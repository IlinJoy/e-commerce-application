import type { SnackbarCloseReason } from '@mui/material/Snackbar';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { ToastInfo } from '@/context/toast-provider';

export type ToastProps = ToastInfo & {
  isOpen: boolean;
  onClose: (_?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => void;
};

export function Toast({ message, severity = 'success', isOpen, onClose }: ToastProps) {
  return (
    <div>
      <Snackbar
        open={isOpen}
        autoHideDuration={5000}
        onClose={onClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert onClose={onClose} severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
