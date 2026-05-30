import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync(
    "./serviceAccountKey.json",
    "utf8"
  )
);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function run() {

  await db
    .collection("collections")
    .doc("pendant-lighting")
    .set({

      name:
        "Pendant Lighting",

      slug:
        "pendant-lighting",

      description:
        "Statement lighting for contemporary interiors.",

      coverImage:
        "REPLACE_WITH_DRIVE_URL",

      featured:
        true
    });

  await db
    .collection("collections")
    .doc("floor-lamps")
    .set({

      name:
        "Floor Lamps",

      slug:
        "floor-lamps",

      description:
        "Architectural floor lighting.",

      coverImage:
        "REPLACE_WITH_DRIVE_URL",

      featured:
        true
    });

  await db
    .collection("projects")
    .doc("boutique-cafe-kolkata")
    .set({

      title:
        "Boutique Café Kolkata",

      slug:
        "boutique-cafe-kolkata",

      description:
        "Custom lighting design for hospitality.",

      coverImage:
        "REPLACE_WITH_DRIVE_URL",

      featured:
        true
    });

  await db
    .collection("projects")
    .doc("private-residence")
    .set({

      title:
        "Private Residence",

      slug:
        "private-residence",

      description:
        "Luxury residential lighting installation.",

      coverImage:
        "REPLACE_WITH_DRIVE_URL",

      featured:
        true
    });

  await db
    .collection("pages")
    .doc("home")
    .update({

      blocks: [

        {
          id: "hero_001",
          type: "hero",
          title:
            "The Shady Company",
          subtitle:
            "Lighting that shapes atmosphere"
        },

        {
          id: "split_001",
          type: "split",
          title:
            "Crafted By Hand",
          content:
            "Every piece is built with attention to material, form and light.",
          image:
            "REPLACE_WITH_DRIVE_URL",
          imageLeft:
            true
        },

        {
          id: "quote_001",
          type: "quote",
          quote:
            "Light is not merely illumination. It is atmosphere."
        },

        {
          id: "gallery_001",
          type: "gallery",
          title:
            "Featured Work",
          images: []
        },

        {
          id: "collections_001",
          type: "collectionGrid",
          title:
            "Collections"
        },

        {
          id: "projects_001",
          type: "projectGrid",
          title:
            "Selected Projects"
        },

        {
          id: "cta_001",
          type: "cta",
          title:
            "Let's create something extraordinary.",
          buttonText:
            "Start a Project",
          buttonLink:
            "/contact"
        }
      ]
    });

  console.log(
    "Phase A complete."
  );
}

run();