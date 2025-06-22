import { ROUTES } from '@/router/routes';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import styles from './not-found-page.module.scss';
import Container from '@mui/material/Container';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container component={'section'} className={styles.notFound}>
      <div className={styles.notFoundContent}>
        <div className={styles.description}>The page you're looking for doesn't exist or has been moved.</div>
        <Typography variant="h1" component="h2">
          Page Not Found
        </Typography>

        <Button onClick={() => navigate(`/${ROUTES.MAIN.path}`)}>Back to the main page</Button>
      </div>
      <div className={styles.notFoundImage}></div>
    </Container>
  );
}
