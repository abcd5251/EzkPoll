import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";
import { firestore, storage } from "./firebase";

export const insertRow = async (table: string, paths: string[], data: any) => {
  const docRef = doc(firestore, table, ...paths);
   return setDoc(docRef, {
    ...data,
    timestamp: serverTimestamp()
   }, {merge: true});
}

export const upload = async (id: string, data: File) => {
  const imageRef = ref(storage, `resources/${id}`);
  await uploadBytes(imageRef, data)
  return getDownloadURL(imageRef)
}

export const list = async (table: string, sort: 'asc' | 'desc' = 'desc') => {
  const q = query(
    collection(firestore, table),
    orderBy("timestamp", sort)
  )
  const colSnap = await getDocs(q);
  const t: any[] = []
  colSnap.forEach((doc) => t.push(doc.data()))
  return t
}

export const get = async (table: string, paths: string[]) => {
  const docSnap = await getDoc(doc(firestore, table, ...paths));
  return docSnap.exists() ? docSnap.data() : {}
}

export default {insertRow, upload, list, get}