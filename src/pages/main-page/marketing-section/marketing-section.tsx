import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from './marketing-section.module.scss';

export function MarketingSection() {
  return (
    <Container component={'section'} className={styles.marketing}>
      <div className={styles.marketingContent}>
        <Typography variant="h2">Express Your Style</Typography>
        <Typography variant="body1">
          Our curated collection of handcrafted wooden furniture is more than just functional decor — it's an expression
          of your unique taste. Why settle for mass-produced furniture when you can have a one-of-a-kind piece? View our
          collection today and bring timeless elegance into your home.
        </Typography>
      </div>
    </Container>
  );
}
