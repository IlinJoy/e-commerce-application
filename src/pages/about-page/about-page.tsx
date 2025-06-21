import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import { TeamMemberCard } from '@/components/team-member-card/team-member-card';
import styles from './about-page.module.scss';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const teamMembers = [
  {
    name: 'Olga Indykova',
    role: 'Frontend Developer',
    background: 'chemist-technologist',
    github: 'https://github.com/olgaindykova',
    avatar: './images/olya.png',
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
    role: 'Team Lead, Frontend Developer',
    background: 'graphic designer',
    github: 'https://github.com/ilinjoy',
    avatar: './images/mariya.png',
    contributions: [
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
    avatar: './images/yana.png',
    contributions: ['CommerceTools Project and API Client Setup', 'Detailed Product Page Implementation'],
  },
];

export function AboutPage() {
  return (
    <>
      <Container component={'section'} className={styles.about}>
        <div className={styles.intro}>
          <div className={styles.introHeading}>
            <Typography variant="h2">Our Team</Typography>
            <Typography className={styles.description}>
              This website is a final project by the <b className={styles.teamName}>Frontend First</b> team. Through
              this project, we aimed to apply and showcase our skills in web development, including creating a
              user-friendly interface, and implementing various front-end technologies. We hope you enjoy browsing our
              site!
            </Typography>
            <KeyboardDoubleArrowDownIcon />
          </div>
          <Typography variant="caption" component="span">
            Frontend First
          </Typography>
        </div>

        <div className={styles.teamBackground} />

        <div className={styles.wrapperTeam}>
          {teamMembers.map((member) => (
            <TeamMemberCard member={member} />
          ))}
        </div>
      </Container>

      <Container className={styles.gratitude}>
        <Link className={styles.logoLink} href="https://rs.school" target="blank" rel="noopener">
          <Avatar src="./rss-logo.png" alt="rss-logo" sx={{ width: 60, height: 60 }} />
        </Link>
        <Typography variant="body2">
          Many thanks to{' '}
          <a className={styles.textLink} href="https://rs.school" target="_blank">
            RS School
          </a>{' '}
          and our wonderful mentor{' '}
          <a className={styles.textLink} href="https://github.com/spanb4" target="_blank">
            Dzmitry Yarmoshkin
          </a>
          , whose guidance and support have been incredibly helpful throughout our learning journey. We truly appreciate
          everything you've done to help us improve our skills.
        </Typography>
      </Container>
    </>
  );
}
