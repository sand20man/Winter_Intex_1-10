// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBzLW8p1QSPRL1DGMRRTHprivkMkoi98Eo',
  authDomain: 'movietitles-b987c.firebaseapp.com',
  projectId: 'movietitles-b987c',
  storageBucket: 'movietitles-b987c.firebasestorage.app',
  messagingSenderId: '847848694417',
  appId: '1:847848694417:web:a375daa619357ae3fe5530',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
