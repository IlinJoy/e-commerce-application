import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
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
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <div className={styles.cardContent}>
          <Avatar alt={member.name} variant="square" src={member.avatar} sx={{ width: 150, height: 200 }} />
          <div className={styles.cardTextWrapper}>
            <Typography variant="h5" className={styles.cardName}>
              {member.name}
              <IconButton component="a" href={member.github} target="blank" rel="noopener noreferrer">
                <GitHubIcon />
              </IconButton>
            </Typography>

            <Typography variant="body1">
              role: <br /> <b>{member.role}</b>
            </Typography>
            <Typography variant="body1">
              background: <br /> <b>{member.background}</b>
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
    </Card>
  );
};
