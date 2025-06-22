import Typography from '@mui/material/Typography';
import { teamMembers } from '@/utils/constants/ui';
import GitHubIcon from '@mui/icons-material/GitHub';
import styles from './footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div>
          <Typography variant="h5" component="h3">
            Contact Us
          </Typography>

          <div className={styles.linkWrapper}>
            {teamMembers.map((member) => (
              <Typography component="a" href={member.github} className={styles.link}>
                <GitHubIcon />
                {member.name}
              </Typography>
            ))}
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
