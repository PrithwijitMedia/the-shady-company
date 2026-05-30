import {
  collection,
  getDocs,
  getDoc,
  doc
} from "firebase/firestore";

import { db }
from "./firebase";

export async function getCollections() {

  const snapshot =
    await getDocs(
      collection(
        db,
        "collections"
      )
    );

  return snapshot.docs.map(
    doc => ({
      id: doc.id,
      ...doc.data()
    })
  );
}

export async function getCollectionBySlug(
  slug: string
) {

  const snapshot =
    await getDocs(
      collection(
        db,
        "collections"
      )
    );

  const collections =
    snapshot.docs.map(
      doc => ({
        id: doc.id,
        ...doc.data()
      })
    );

  return collections.find(
    (c: any) =>
      c.slug === slug
  );
}