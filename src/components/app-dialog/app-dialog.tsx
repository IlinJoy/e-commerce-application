import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import styles from './app-dialog.module.scss';
import IconButton from '@mui/material/IconButton';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

type AppDialogProps = {
  isOpen: boolean;
  title: string;
  text: string;
  onConfirm: () => void;
  onClose: () => void;
};

export function AppDialog({ isOpen, title, text, onConfirm, onClose }: AppDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className={styles.dialog}>
      <div className={styles.heading}>
        <Typography variant="h4" component="h2">
          {title}
        </Typography>
        <IconButton onClick={onClose}>
          <ClearOutlinedIcon />
        </IconButton>
      </div>
      <Typography>{text}</Typography>
      <div className={styles.buttonWrapper}>
        <Button className={styles.reset} onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleConfirm}>Clear Cart</Button>
      </div>
    </Dialog>
  );
}
