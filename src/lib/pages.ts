import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

import { db } from "./firebase";

export async function updatePage(
  id: string,
  data: any
) {

  await setDoc(

    doc(
      db,
      "pages",
      id
    ),

    data,

    {
      merge: true
    }

  );
}

export async function getPages() {

  const snapshot =
    await getDocs(
      collection(
        db,
        "pages"
      )
    );

  return snapshot.docs.map(
    doc => ({
      id: doc.id,
      ...doc.data()
    })
  );
}

export async function getPageById(
  id: string
) {

  const snapshot =
    await getDoc(
      doc(
        db,
        "pages",
        id
      )
    );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data()
  };
}