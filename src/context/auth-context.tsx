import { createContext } from 'react';

const authContext = createContext({
  token: '',
  onLogin: () => {},
  onLogout: () => {},
});
