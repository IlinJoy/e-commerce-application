import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import styles from './about-page.module.scss';

const teamMembers = [
  {
    name: 'Olga Indykova',
    role: 'Junior Frontend Developer',
    bio: 'chemist-technologist',
    github: 'https://github.com/olgaindykova',
    avatar: './images/olya.jpg',
    contributions: [
      'Development Environment Configuration',
      'Input Validation',
      'Login Page Implementation',
      'Registration Page Implementation',
      'User Profile Page Implementation',
      'About Us Page Implementation',
      'Detailed Product Page Implementation',
    ],
  },
  {
    name: 'Mariya Ilina',
    role: 'Team Lead, Designer, Frontend Developer',
    bio: 'graphic designer',
    github: 'https://github.com/ilinjoy',
    avatar: './images/mariya.jpg',
    contributions: [
      'Site Design',
      'Task Board Setup',
      'Routing Implementation',
      'Evaluation Criteria for Header',
      'Login Page Implementation',
      'Registration Page Implementation',
      'User Profile Page Implementation',
      'Catalog Page Implementation',
      'Detailed Product Page Implementation',
      'Basket Page Implementation',
    ],
  },
  {
    name: 'Yana Pavlova',
    role: 'Junior Backend Developer',
    bio: 'philologist',
    github: 'https://github.com/yana-pavlova',
    avatar: './images/yana.jpg',
    contributions: ['CommerceTools Project and API Client Setup'],
  },
];

function TeamMemberCard({ member }: { member: (typeof teamMembers)[number] }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <div className={styles.cardContent}>
          <Avatar alt={member.name} variant="square" src={member.avatar} sx={{ width: 150, height: 200 }} />
          <div className={styles.cardTextWrapper}>
            <Typography variant="h5" className={styles.cartName}>
              {member.name}
              <IconButton component="a" href={member.github} target="blank" rel="noopener noreferrer">
                <GitHubIcon />
              </IconButton>
            </Typography>

            <Typography variant="body1">
              role: <br /> <b>{member.role}</b>
            </Typography>
            <Typography variant="body1">
              occupation: <br /> <b>{member.bio}</b>
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
}

export function AboutPage() {
  return (
    <Container component={'section'}>
      <div className={styles.container}>
        <div className={styles.wrapperTitle}>
          <Link href="https://rs.school" target="_blank" rel="noopener">
            <Avatar src="./rss-logo.png" alt="rss-logo" sx={{ width: 100, height: 100, mx: 'auto', mb: 1 }} />
          </Link>
          <Typography variant="h6" className={styles.titleText}>
            WELCOME TO OUR STORE!<br></br>
            Here you can buy beautiful and elegant furniture for your home.<br></br>
            The team <b className={styles.teamName}>Frontend First</b> worked on the development of the site.<br></br>
            Our team actually consists of two members since one of us got a job.<br></br>
            But we will show all three developers.
          </Typography>
        </div>

        <Typography variant="caption">TEAM MEMBERS</Typography>

        <div className={styles.wrapperTeam}>
          {teamMembers.map((member) => (
            <div key={member.name} className={styles.cardContainer}>
              <TeamMemberCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
