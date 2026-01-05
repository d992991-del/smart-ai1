
// Fix: Consolidate modular Firebase imports and use type keyword to fix "no exported member" errors
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

// 在 Vite 中，process.env 已由 define 注入
const firebaseConfigRaw = process.env.FIREBASE_CONFIG;

if (firebaseConfigRaw && firebaseConfigRaw !== '{}') {
  try {
    const config = typeof firebaseConfigRaw === 'string' 
      ? JSON.parse(firebaseConfigRaw) 
      : firebaseConfigRaw;
    
    if (getApps().length === 0) {
      app = initializeApp(config);
    } else {
      app = getApps()[0];
    }
    
    if (app) {
      auth = getAuth(app);
      db = getFirestore(app);
    }
  } catch (error) {
    console.warn("Firebase 載入失敗，將自動進入展示模式:", error);
  }
}

export const getSafeAuth = (): Auth | null => auth;
export const getSafeDb = (): Firestore | null => db;
export const isFirebaseEnabled = (): boolean => !!auth && !!db;
