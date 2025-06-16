import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import { TeamMemberCard } from '@/components/team-member-card/team-member-card';
import styles from './about-page.module.scss';

const teamMembers = [
  {
    name: 'Olga Indykova',
    role: 'Frontend Developer',
    background: 'chemist-technologist',
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
    background: 'graphic designer',
    github: 'https://github.com/ilinjoy',
    avatar: './images/mariya.jpg',
    contributions: [
      'Site Design',
      'Task Board Setup',
      'Routing Implementation',
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
    role: 'Backend Developer',
    background: 'philologist',
    github: 'https://github.com/yana-pavlova',
    avatar: './images/yana.jpg',
    contributions: ['CommerceTools Project and API Client Setup', 'Detailed Product Page Implementation'],
  },
];

export function AboutPage() {
  return (
    <Container component={'section'}>
      <div className={styles.container}>
        <div className={styles.wrapperTitle}>
          <Link href="https://rs.school" target="blank" rel="noopener">
            <Avatar src="./rss-logo.png" alt="rss-logo" sx={{ width: 100, height: 100, mx: 'auto', mb: 1 }} />
          </Link>
          <Typography variant="h6" className={styles.titleText}>
            WELCOME TO OUR STORE!<br></br>
            Here you can buy beautiful and elegant furniture for your home.<br></br>
            The team <b className={styles.teamName}>Frontend First</b> worked on the development of the site.<br></br>
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
