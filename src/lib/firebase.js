import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBx2ekIKPREpn3uU-WiJNCkbD2yOTOs1v0",
  authDomain: "dental-dash-studio.firebaseapp.com",
  projectId: "dental-dash-studio",
  storageBucket: "dental-dash-studio.firebasestorage.app",
  messagingSenderId: "20355523777",
  appId: "1:20355523777:web:e6e7569cb18ce40d22a040"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;