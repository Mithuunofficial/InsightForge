import { db } from '../firebase/firebase';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import type { Dataset } from '../types';

export const saveDataset = async (userId: string, dataset: Dataset): Promise<void> => {
  const datasetRef = doc(db, 'users', userId, 'datasets', dataset.id);
  await setDoc(datasetRef, {
    name: dataset.name,
    size: dataset.size,
    rowsCount: dataset.rowsCount,
    colsCount: dataset.colsCount,
    uploadedAt: dataset.uploadedAt || new Date().toISOString(),
    downloadUrl: dataset.downloadUrl || '',
  }, { merge: true });
};

export const getDatasets = async (userId: string): Promise<Dataset[]> => {
  const datasetsCol = collection(db, 'users', userId, 'datasets');
  const snapshot = await getDocs(datasetsCol);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Dataset));
};
