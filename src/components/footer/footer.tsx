import Typography from '@mui/material/Typography';
import styles from './footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.infoBlock}>
          <Typography variant="h5" component="h3">
            Contact Us
          </Typography>
          <div className={styles.linkWrapper}>
            <Typography component="a" href="tel:+22218002628">
              +222-1800-2628
            </Typography>
            <Typography component="a" href="mailto:unikocompany@gmail.com">
              unikocompany@gmail.com
            </Typography>
            <Typography>268 St, South New York/NY 98944</Typography>
            <Typography>Daily 9:00 AM - 8:00 PM</Typography>
          </div>
        </div>

        <div>
          <Typography>Non-commercial project built for educational purposes.</Typography>
          <Typography>2025 Frontend First</Typography>
        </div>
      </div>
    </footer>
  );
}
