import fs from "fs";

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
  fs.readFileSync(
    "./serviceAccountKey.json",
    "utf8"
  )
);

console.log(
  "Project:",
  serviceAccount.project_id
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function seed() {

  console.log("Seeding Firestore...");

  //
  // SETTINGS
  //

  await db.collection("settings")
    .doc("site")
    .set({
      siteName: "The Shady Company",
      tagline: "Lighting that shapes atmosphere",
      logo: "",
      contactEmail: "hello@theshadycompany.com",
      phone: "+91xxxxxxxxxx",
      instagram: "",
      whatsapp: "",
    });

  //
  // HOME PAGE
  //

  await db.collection("pages")
    .doc("home")
    .set({

      title: "Home",
      slug: "home",

      blocks: [

        {
          id: "hero_001",
          type: "hero",
          title: "The Shady Company",
          subtitle:
            "Handcrafted lighting that shapes atmosphere."
        },

        {
          id: "text_001",
          type: "text",
          content:
            "We create bespoke lampshades, statement lighting pieces and ambient installations designed to transform spaces into experiences."
        },

        {
          id: "gallery_001",
          type: "gallery",
          title: "Featured Work",
          images: [

            "https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link",

            "https://drive.google.com/file/d/1NmYB3cU4WpArPODSIo55iFnZQTRY5rHM/view?usp=drive_link",

            "https://drive.google.com/file/d/1pYunTmOT-pD8hhImGIrnol51Xe21uYAU/view?usp=drive_link",

            "https://drive.google.com/file/d/12NntWS2uwRRTvM9QgzPp4cvPZgZMGl48/view?usp=drive_link"
          ]
        },

        {
          id: "text_002",
          type: "text",
          content:
            "From boutique cafés and hospitality projects to homes and creative studios, every piece is crafted with attention to material, light and emotion."
        },

        {
          id: "cta_001",
          type: "cta",
          title:
            "Let's bring your space to life",

          buttonText:
            "Get In Touch",

          buttonLink:
            "/contact"
        }
      ]
    });

  //
  // ABOUT PAGE
  //

  await db.collection("pages")
    .doc("about")
    .set({

      title: "About",
      slug: "about",

      blocks: [

        {
          id: "hero_about",
          type: "hero",
          title: "About The Shady Company",
          subtitle:
            "Crafting atmosphere through light."
        },

        {
          id: "about_text",
          type: "text",
          content:
            "The Shady Company creates handcrafted lighting solutions that blend craftsmanship, design and emotion."
        }
      ]
    });

  //
  // CONTACT PAGE
  //

  await db.collection("pages")
    .doc("contact")
    .set({

      title: "Contact",
      slug: "contact",

      blocks: [

        {
          id: "contact_text",
          type: "text",
          content:
            "Have a project in mind? We'd love to hear from you."
        }
      ]
    });

  //
  // COLLECTIONS
  //

  await db.collection("collections")
    .doc("bespoke")
    .set({

      name:
        "Bespoke Lighting",

      slug:
        "bespoke",

      description:
        "Custom crafted lighting solutions.",

      active: true,

      order: 1
    });

  //
  // PRODUCTS
  //

  await db.collection("products")
    .doc("aurora-pendant")
    .set({

      name:
        "Aurora Pendant",

      slug:
        "aurora-pendant",

      featured: true,

      active: true,

      price: 6500,

      collection:
        "bespoke",

      description:
        "Handcrafted woven pendant lamp producing a warm ambient glow.",

      images: [

        "https://drive.google.com/file/d/1peJQ5QAo1qYafwP_tWZ7evZPmKG3YHoJ/view?usp=drive_link"
      ]
    });

  await db.collection("products")
    .doc("noir-floor")
    .set({

      name:
        "Noir Floor Lamp",

      slug:
        "noir-floor",

      featured: true,

      active: true,

      price: 8500,

      collection:
        "bespoke",

      description:
        "Minimal floor lamp designed for contemporary interiors.",

      images: [

        "https://drive.google.com/file/d/19NhstTKTZ1fYEor02E3_XW2MtX0AtFAD/view?usp=drive_link"
      ]
    });

  //
  // PROJECTS
  //

  await db.collection("projects")
    .doc("cafe-ambient")
    .set({

      title:
        "Cafe Ambient Lighting",

      slug:
        "cafe-ambient",

      featured: true,

      description:
        "Custom lighting design for a boutique cafe.",

      images: [

        "https://drive.google.com/file/d/1iVjvJqWSWw-VSZ01refI-mONrMkKWhUI/view?usp=drive_link",

        "https://drive.google.com/file/d/1EuwoGScaYfcz-gyT-0isWi9JZ9xKgEHu/view?usp=drive_link",

        "https://drive.google.com/file/d/19e8auZv4u9AkFf9eWZw7vO6iB1iLztRt/view?usp=drive_link",

        "https://drive.google.com/file/d/1Mkz86DJ1hoFrMkKOxXJZXmrRwXqwufZV/view?usp=drive_link"
      ]
    });

  console.log("Seed complete.");
}

seed()
  .then(() => process.exit())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });