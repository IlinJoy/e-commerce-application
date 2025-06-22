export const NAV_LINKS = {
  base: ['Home', 'Catalog', 'About'],
  auth: ['Login', 'Registration'],
};

export const ACCOUNT_LINKS = ['Profile', 'Addresses'] as const;
export const CART_ATTRIBUTES_NAMES = ['color', 'brand'];

export const headerScrollPref = {
  offset: 50,
  timeout: 50,
};

export const CLASSES = {
  disable: 'disable',
};

export const smallCardOffset = 208;

export const teamMembers = [
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

export const followImages = Array.from({ length: 6 }, (_, index) => `./images/follow-us-${index + 1}.png`);
