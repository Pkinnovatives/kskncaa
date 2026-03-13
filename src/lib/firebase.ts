import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAVjgE9DSRsAgB9be_ICmO_sf_XBOczQkA",
  authDomain: "kskn-d36d3.firebaseapp.com",
  projectId: "kskn-d36d3",
  storageBucket: "kskn-d36d3.appspot.com",
  messagingSenderId: "756853898901",
  appId: "1:756853898901:web:476bf28e5318ca5078659c",
  measurementId: "G-Y7S72QGK9K"
};

// Initialize Firebase only if config is present, otherwise handle gracefully
// This allows the app to render the UI even without keys, though backend features won't work.
let app;
let db: any;
let storage: any;
let auth: any;
let analytics: any;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  storage = getStorage(app);
  auth = getAuth(app);
  analytics = getAnalytics(app);
  
} catch (error) {
  console.error("Firebase initialization error:", error);
  // Mock objects to prevent crashes
  db = {} as any;
  storage = {} as any;
  auth = {} as any;
  analytics = {} as any;
}

export { db, storage, auth, analytics };
