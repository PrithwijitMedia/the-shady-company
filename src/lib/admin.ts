import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getAdminUser(
  email: string
) {

  const ref =
    doc(
      db,
      "users",
      email
    );

  const snap =
    await getDoc(ref);

  if (!snap.exists()) {
    return null;
  }

  return snap.data();
}