import {
  doc,
  getDoc
} from "firebase/firestore";

import { db } from "./firebase";

export async function getSiteSettings() {

  const snap =
    await getDoc(
      doc(
        db,
        "settings",
        "site"
      )
    );

  return snap.exists()
    ? snap.data()
    : null;
}

export async function getNavigationSettings() {

  const snap =
    await getDoc(
      doc(
        db,
        "settings",
        "navigation"
      )
    );

  return snap.exists()
    ? snap.data()
    : null;
}

export async function getFooterSettings() {

  const snap =
    await getDoc(
      doc(
        db,
        "settings",
        "footer"
      )
    );

  return snap.exists()
    ? snap.data()
    : null;
}