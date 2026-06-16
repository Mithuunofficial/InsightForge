import { db } from '../firebase/firebase';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import type { User } from '../types';

export const saveUser = async (user: User): Promise<void> => {
  const userRef = doc(db, 'users', user.id);
  await setDoc(userRef, {
    name: user.name,
    email: user.email,
    createdAt: user.createdAt || new Date().toISOString(),
  }, { merge: true });
};

export const getUsers = async (): Promise<User[]> => {
  const usersCol = collection(db, 'users');
  const snapshot = await getDocs(usersCol);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as User));
};
