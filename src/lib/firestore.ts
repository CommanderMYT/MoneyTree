import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestoreDb } from "./firebase";

const db = getFirestoreDb();

export async function saveUserData(userId: string, key: string, data: any) {
  if (!db) return;
  const docRef = doc(db, "users", userId);
  await setDoc(docRef, { [key]: data }, { merge: true });
}

export async function getUserData(userId: string, key: string) {
  if (!db) return null;
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data()[key];
  }
  return null;
}
