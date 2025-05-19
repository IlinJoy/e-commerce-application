/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import { createContext, use, useCallback, useState } from 'react';
import { Toast } from '@/components/toast/toast';
import type { SnackbarCloseReason } from '@mui/material/Snackbar';

type ToastInfo = { message: string; isError?: boolean };

type ToastContextType = {
  showToast: (prop: ToastInfo) => void;
};

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export function ToastContextProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [toastInfo, setToastInfo] = useState<ToastInfo>({ message: '', isError: false });

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };

  const showToast = useCallback((info: ToastInfo) => {
    setIsOpen(true);
    setToastInfo(info);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast {...toastInfo} isOpen={isOpen} onClose={handleClose} />
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = use(ToastContext);
  if (!context) {
    throw new Error('Must be used within a ToastContext.Provider');
  }
  return context;
};
