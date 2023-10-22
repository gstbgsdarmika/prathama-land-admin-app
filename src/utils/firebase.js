import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDuADxNw-gRBbk3vHvrHftKEOCH7SxZYKw',
  authDomain: 'prathamaland-efb3b.firebaseapp.com',
  databaseURL: 'https://prathamaland-efb3b-default-rtdb.firebaseio.com',
  projectId: 'prathamaland-efb3b',
  storageBucket: 'prathamaland-efb3b.appspot.com',
  messagingSenderId: '182828979684',
  appId: '1:182828979684:web:5abb0434cb2ff8d86da3f1',
  measurementId: 'G-F8FQ58ERWV',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage(app);
export default firebaseApp;
