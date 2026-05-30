import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "./firebase";

export async function getProducts() {

  const snapshot =
    await getDocs(
      collection(
        db,
        "products"
      )
    );

  return snapshot.docs.map(
    doc => ({
      id: doc.id,
      ...doc.data()
    })
  );
}

export async function getProductBySlug(
  slug: string
) {

  const products =
    await getProducts();

  return products.find(
    (product: any) =>
      product.slug === slug
  );
}