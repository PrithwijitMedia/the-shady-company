import fs from "fs";

import {
  initializeApp,
  cert
} from "firebase-admin/app";

import {
  getFirestore
} from "firebase-admin/firestore";

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

  console.log(
    "Starting Phase B..."
  );

  //
  // COLLECTIONS
  //

  await db
    .collection("collections")
    .doc("pendant-lighting")
    .set({

      name:
        "Pendant Lighting",

      slug:
        "pendant-lighting",

      description:
        "Statement lighting designed to define a space.",

      coverImage:
        "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link",

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
        "Architectural lighting for modern interiors.",

      coverImage:
        "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link",

      featured:
        true
    });

  await db
    .collection("collections")
    .doc("wall-lighting")
    .set({

      name:
        "Wall Lighting",

      slug:
        "wall-lighting",

      description:
        "Mood-defining handcrafted wall fixtures.",

      coverImage:
        "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link",

      featured:
        true
    });

  //
  // PRODUCTS
  //

  await db
    .collection("products")
    .doc("aurora-pendant")
    .set({

      name:
        "Aurora Pendant",

      slug:
        "aurora-pendant",

      collection:
        "pendant-lighting",

      featured:
        true,

      active:
        true,

      price:
        6500,

      description:
        "Handcrafted woven pendant lamp producing a warm ambient glow.",

      images: [

        "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link"

      ]
    });

  await db
    .collection("products")
    .doc("halo-pendant")
    .set({

      name:
        "Halo Pendant",

      slug:
        "halo-pendant",

      collection:
        "pendant-lighting",

      featured:
        true,

      active:
        true,

      price:
        8200,

      description:
        "Minimal contemporary pendant inspired by natural forms.",

      images: [

        "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link"

      ]
    });

  await db
    .collection("products")
    .doc("noir-floor")
    .set({

      name:
        "Noir Floor Lamp",

      slug:
        "noir-floor",

      collection:
        "floor-lamps",

      featured:
        true,

      active:
        true,

      price:
        9800,

      description:
        "Architectural floor lamp with dramatic ambient lighting.",

      images: [

        "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link"

      ]
    });

  await db
    .collection("products")
    .doc("luna-wall")
    .set({

      name:
        "Luna Wall Light",

      slug:
        "luna-wall",

      collection:
        "wall-lighting",

      featured:
        true,

      active:
        true,

      price:
        4200,

      description:
        "Soft indirect wall lighting inspired by moonlight.",

      images: [

        "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link"

      ]
    });

  //
  // PROJECTS
  //

  await db
    .collection("projects")
    .doc("boutique-cafe-kolkata")
    .set({

      title:
        "Boutique Café Kolkata",

      slug:
        "boutique-cafe-kolkata",

      featured:
        true,

      description:
        "Custom lighting design for a boutique hospitality space.",

      coverImage:
        "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link",

      images: [

        "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link",

        "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link",

        "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link"

      ]
    });

  await db
    .collection("projects")
    .doc("private-residence")
    .set({

      title:
        "Private Residence",

      slug:
        "private-residence",

      featured:
        true,

      description:
        "Ambient lighting design for a luxury residence.",

      coverImage:
        "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link",

      images: [

        "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link",

        "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link",

        "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link"

      ]
    });

  //
  // UPDATE HOMEPAGE
  //

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
            "Lighting that shapes atmosphere.",

          backgroundImage:
            "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link"
        },

        {
          id: "split_001",
          type: "split",

          title:
            "Crafted By Hand",

          content:
            "Every lighting piece is designed to transform a space into an experience.",

          image:
            "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link",

          imageLeft:
            true
        },

        {
          id: "quote_001",
          type: "quote",

          quote:
            "Light is not merely illumination. It is atmosphere.",

          author:
            "The Shady Company"
        },

        {
          id: "gallery_001",
          type: "gallery",

          title:
            "Featured Work",

          images: [

            {
              url:
                "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link",
              width:
                900,
              height:
                700
            },

            {
              url:
                "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link",
              width:
                700,
              height:
                900
            },

            {
              url:
                "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link",
              width:
                900,
              height:
                700
            },

            {
              url:
                "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link",
              width:
                700,
              height:
                900
            }

          ]
        },

        {
          id:
            "collections_001",

          type:
            "collectionGrid",

          title:
            "Collections"
        },

        {
          id:
            "projects_001",

          type:
            "projectGrid",

          title:
            "Selected Projects"
        },

        {
          id:
            "cta_001",

          type:
            "cta",

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
    "Phase B Complete."
  );
}

run()
  .then(() => process.exit())
  .catch((err) => {

    console.error(err);

    process.exit(1);
  });