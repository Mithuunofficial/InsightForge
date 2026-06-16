import { auth } from '../firebase/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import type { User } from '../types';

export const registerUser = async (email: string, password: string, name: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await updateProfile(user, { displayName: name });
  return {
    id: user.uid,
    name,
    email: user.email || email,
  };
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  return {
    id: user.uid,
    name: user.displayName || user.email?.split('@')[0] || 'User',
    email: user.email || email,
  };
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

export const onAuthChanged = (callback: (user: User | null) => void): (() => void) => {
  return onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      callback({
        id: firebaseUser.uid,
        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
        email: firebaseUser.email || '',
      });
    } else {
      callback(null);
    }
  });
};
