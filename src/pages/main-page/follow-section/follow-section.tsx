import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { followImages } from '@/utils/constants/ui';
import styles from './follow-section.module.scss';

export function FollowSection() {
  return (
    <Container component={'section'} className={styles.followUs}>
      <Typography component="p" className={styles.findText}>
        Find your perfect home accent!
      </Typography>
      <div className={styles.followUsContent}>
        <div>
          <Typography variant="h2">Follow Us</Typography>
          <Typography>Inspire and let yourself be inspired, from one unique piece to another.</Typography>
        </div>

        <div className={styles.imageWrapper}>
          {followImages.map((image, index) => (
            <img className={styles.image} key={image} src={image} alt={`follow-us-${index}`} />
          ))}
        </div>
      </div>
    </Container>
  );
}
