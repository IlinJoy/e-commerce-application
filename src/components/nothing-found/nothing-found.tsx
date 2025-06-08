import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import styles from './nothing-found.module.scss';
import Typography from '@mui/material/Typography';
import { ROUTES } from '@/router/routes';

type NothingFoundProps = {
  message?: string;
};

export function NothingFound({ message }: NothingFoundProps) {
  const navigate = useNavigate();

  const handleReset = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/${ROUTES.CATALOG.path}`, { replace: true });
  };

  return (
    <div className={styles.nothingFound}>
      <Typography component="div">
        Looks like we couldn't find anything here.
        <br />
        {message}
      </Typography>
      <Button onClick={() => handleReset()}>Go to catalog</Button>
    </div>
  );
}
