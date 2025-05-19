import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import styles from './main-page.module.scss';
import { Navigation } from '@/components/header/ui/navigation/navigation';

export function MainPage() {
  return (
    <Container component={'section'}>
      <div className={styles.hero}>
        <div className={styles.contentWrapper}>
          <div className={styles.temp}>
            <Navigation />
          </div>
          {/* <Typography variant="caption">Beautiful & Elegant</Typography> */}
          <Typography variant="h1">Crafted with Nature</Typography>
          <Button disableElevation component={'a'} variant="contained" onClick={() => {}}>
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
