import { storage } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadDataset = async (userId: string, file: File): Promise<string> => {
  const fileRef = ref(storage, `users/${userId}/datasets/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(fileRef, file);
  return await getDownloadURL(snapshot.ref);
};
