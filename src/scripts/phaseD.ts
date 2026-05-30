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

async function upsert() {

  console.log(
    "Starting Phase D Final..."
  );

  //
  // SETTINGS
  //

  await db
    .collection("settings")
    .doc("site")
    .set(
      {
        companyName:
          "The Shady Company",

        tagline:
          "Lighting that shapes atmosphere",

        email:
          "hello@theshadycompany.com",

        phone:
          "+91XXXXXXXXXX",

        address:
          "Kolkata, India",

        instagram:
          "",

        whatsapp:
          "",

        facebook:
          ""
      },
      { merge: true }
    );

  await db
    .collection("settings")
    .doc("navigation")
    .set(
      {
        items: [
          {
            label:
              "Collections",
            href:
              "/collections"
          },
          {
            label:
              "Projects",
            href:
              "/projects"
          },
          {
            label:
              "Products",
            href:
              "/products"
          },
          {
            label:
              "Contact",
            href:
              "/contact"
          }
        ]
      },
      { merge: true }
    );

  await db
    .collection("settings")
    .doc("footer")
    .set(
      {
        copyright:
          "© The Shady Company",

        links: [
          {
            label:
              "Instagram",
            url:
              ""
          },
          {
            label:
              "WhatsApp",
            url:
              ""
          }
        ]
      },
      { merge: true }
    );

  //
  // ABOUT PAGE
  //

  await db
    .collection("pages")
    .doc("about")
    .set(
      {
        title:
          "About",

        blocks: [

          {
            id:
              "hero_about",

            type:
              "hero",

            title:
              "About The Shady Company",

            subtitle:
              "Designing atmosphere through light."
          },

          {
            id:
              "about_text",

            type:
              "text",

            content:
              "The Shady Company creates handcrafted lighting pieces, bespoke lampshades and immersive lighting experiences."
          }

        ]
      },
      { merge: true }
    );

  //
  // CONTACT PAGE
  //

  await db
    .collection("pages")
    .doc("contact")
    .set(
      {
        title:
          "Contact",

        blocks: [

          {
            id:
              "contact_hero",

            type:
              "hero",

            title:
              "Let's Create Something Extraordinary",

            subtitle:
              "Tell us about your project."
          }

        ]
      },
      { merge: true }
    );

  //
  // COLLECTIONS
  //

  const collections = [

    {
      id:
        "pendant-lighting",

      name:
        "Pendant Lighting",

      slug:
        "pendant-lighting",

      description:
        "Statement lighting for contemporary interiors.",

      featured:
        true,

      coverImage:
        ""
    },

    {
      id:
        "floor-lamps",

      name:
        "Floor Lamps",

      slug:
        "floor-lamps",

      description:
        "Architectural lighting for modern interiors.",

      featured:
        true,

      coverImage:
        ""
    },

    {
      id:
        "wall-lighting",

      name:
        "Wall Lighting",

      slug:
        "wall-lighting",

      description:
        "Mood-defining handcrafted fixtures.",

      featured:
        true,

      coverImage:
        ""
    }

  ];

  for (const item of collections) {

    await db
      .collection("collections")
      .doc(item.id)
      .set(
        item,
        { merge: true }
      );
  }

  //
  // PRODUCTS
  //

  const products = [

    {
      id:
        "aurora-pendant",

      name:
        "Aurora Pendant",

      slug:
        "aurora-pendant",

      collection:
        "pendant-lighting",

      price:
        6500,

      salePrice:
        null,

      featured:
        true,

      active:
        true,

      description:
        "Handcrafted woven pendant lamp.",

      specifications: [
        "Handcrafted",
        "Warm White",
        "Indoor Use"
      ],

      images: [],

      createdAt:
        Date.now()
    },

    {
      id:
        "halo-pendant",

      name:
        "Halo Pendant",

      slug:
        "halo-pendant",

      collection:
        "pendant-lighting",

      price:
        8200,

      salePrice:
        null,

      featured:
        true,

      active:
        true,

      description:
        "Minimal contemporary pendant.",

      specifications: [
        "Metal",
        "Warm White"
      ],

      images: [],

      createdAt:
        Date.now()
    }

  ];

  for (const item of products) {

    await db
      .collection("products")
      .doc(item.id)
      .set(
        item,
        { merge: true }
      );
  }

  //
  // PROJECTS
  //

  const projects = [

    {
      id:
        "boutique-cafe-kolkata",

      title:
        "Boutique Café Kolkata",

      slug:
        "boutique-cafe-kolkata",

      featured:
        true,

      location:
        "Kolkata",

      completedYear:
        2026,

      description:
        "Custom hospitality lighting project.",

      coverImage:
        "",

      images: []
    },

    {
      id:
        "private-residence",

      title:
        "Private Residence",

      slug:
        "private-residence",

      featured:
        true,

      location:
        "Kolkata",

      completedYear:
        2026,

      description:
        "Luxury residential lighting project.",

      coverImage:
        "",

      images: []
    }

  ];

  for (const item of projects) {

    await db
      .collection("projects")
      .doc(item.id)
      .set(
        item,
        { merge: true }
      );
  }

  //
  // LEADS CONFIG
  //

  await db
    .collection("settings")
    .doc("leads")
    .set(
      {
        enabled: true,

        statuses: [

          "new",
          "contacted",
          "quoted",
          "won",
          "lost"

        ]
      },
      { merge: true }
    );

  console.log(
    "Phase D Final Complete"
  );
}

upsert()
  .then(() => process.exit())
  .catch((err) => {

    console.error(err);

    process.exit(1);

  });