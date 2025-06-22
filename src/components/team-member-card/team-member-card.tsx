import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import styles from './team-member-card.module.scss';

type MemberProps = {
  name: string;
  role: string;
  background: string;
  github: string;
  avatar: string;
  contributions: string[];
};

export const TeamMemberCard = ({ member }: { member: MemberProps }) => {
  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <Avatar className={styles.avatar} alt={member.name} variant="square" src={member.avatar} />

        <div className={styles.topRowContent}>
          <div className={styles.nameWrapper}>
            <Typography variant="h2" className={styles.cardName}>
              {member.name}
            </Typography>
            <IconButton component="a" href={member.github} target="blank" rel="noopener noreferrer">
              <GitHubIcon />
            </IconButton>
          </div>
          <div className={styles.roleWrapper}>
            <Typography variant="h4" component="p" className={styles.role}>
              {member.role}
            </Typography>
            <Typography variant="body1" className={styles.background}>
              Background: <br /> {member.background}
            </Typography>
          </div>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <Typography variant="h5" component="p">
          Contribution:
        </Typography>
        <List>
          {member.contributions.map((item, index) => (
            <Typography component="li" key={index}>
              - {item}
            </Typography>
          ))}
        </List>
      </div>
    </div>
  );
  {
    /* </div>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <div className={styles.cardContent}>
            <div className={styles.cardTextWrapper}>
              <Typography variant="h5" className={styles.cardName}>
                {member.name}
              </Typography>

              <Typography variant="body1">
                role: <br /> <b>{member.role}</b>
              </Typography>
              <Typography variant="body1">
                Background: <br /> <b>{member.background}</b>
              </Typography>
            </div>
          </div>
          <Typography variant="h6" className={styles.cardContributionTitle}>
            Contribution:
          </Typography>
          <List dense>
            {member.contributions.map((item, index) => (
              <ListItem key={index} sx={{ py: 0 }}>
                - {item}
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card> */
  }
};
