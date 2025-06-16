import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import styles from './hero-section.module.scss';
import { ROUTES } from '@/router/routes';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <Container component={'section'}>
      <div className={styles.hero}>
        <div className={styles.contentWrapper}>
          <Typography variant="caption">Beautiful & Elegant</Typography>
          <Typography variant="h1">Crafted with Nature</Typography>
          <Button
            disableElevation
            component={'a'}
            variant="contained"
            onClick={() => navigate(`/${ROUTES.CATALOG.path}`)}
          >
            Discover Now
          </Button>
        </div>
        <Typography variant="body1" component={'span'}>
          Discount 50% On Products & Free Shipping.
        </Typography>
      </div>
    </Container>
  );
}
