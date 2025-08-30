import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export function initFirebase() {
  if (getApps().length) return getApp();
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!apiKey || !authDomain || !projectId) return null; // allow optional config
  return initializeApp({ apiKey, authDomain, projectId });
}

export function getFirebaseAuth() {
  const app = initFirebase();
  if (!app) return null;
  return getAuth(app);
}

export function getFirestoreDb() {
  const app = initFirebase();
  if (!app) return null;
  return getFirestore(app);
}
