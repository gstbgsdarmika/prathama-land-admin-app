import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../utils/firebase';

export const signOutUser = () => {
  const auth = getAuth(firebaseApp);
  return signOut(auth);
};
