export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export interface Dataset {
  id: string;
  name: string;
  size: string;
  rowsCount: number;
  colsCount: number;
  uploadedAt: string;
  downloadUrl?: string;
}

export interface Report {
  id: string;
  date: string;
  customer: string;
  product: string;
  status: string;
  amount: number;
}
