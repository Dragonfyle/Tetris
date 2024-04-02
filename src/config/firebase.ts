export const firebaseConfig = {
  apiKey: import.process.env.VITE_FIREBASE_API_KEY,
  authDomain: import.process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.process.env.VITE_FIREBASE_PROJECT_ID,

  storageBucket: import.process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.process.env.VITE_FIREBASE_APP_ID,
};
