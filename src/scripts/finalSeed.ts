import fs from "fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
fs.readFileSync("./serviceAccountKey.json", "utf8")
);

initializeApp({
credential: cert(serviceAccount)
});

const db = getFirestore();

const IMG =
"https://drive.google.com/file/d/116LtfL5Ey458wwbQ5gfFM1OCBh29tW9n/view?usp=drive_link";

async function deleteCollection(name: string) {
const snap = await db.collection(name).get();

const batch = db.batch();

snap.docs.forEach(doc => {
batch.delete(doc.ref);
});

await batch.commit();
}

async function run() {

console.log("Cleaning database...");

await deleteCollection("pages");
await deleteCollection("products");
await deleteCollection("projects");
await deleteCollection("collections");
await deleteCollection("leads");

console.log("Creating settings...");

await db.collection("settings").doc("site").set({
companyName: "The Shady Company",
tagline: "Lighting that shapes atmosphere",
email: "[hello@theshadycompany.com](mailto:hello@theshadycompany.com)",
phone: "+91 9876543210",
address: "Kolkata, India",
instagram: "https://instagram.com",
whatsapp: "https://wa.me/919876543210"
});

await db.collection("settings").doc("navigation").set({
items: [
{ label: "Collections", href: "/collections" },
{ label: "Products", href: "/products" },
{ label: "Projects", href: "/projects" },
{ label: "About", href: "/about" },
{ label: "Contact", href: "/contact" }
]
});

await db.collection("settings").doc("footer").set({
copyright: "© The Shady Company",
links: [
{
label: "Instagram",
url: "https://instagram.com"
},
{
label: "WhatsApp",
url: "https://wa.me/919876543210"
}
]
});

console.log("Creating pages...");

await db.collection("pages").doc("home").set({
title: "Home",
slug: "home",
blocks: [
{
id: "hero_001",
type: "hero",
title: "Lighting That Shapes Atmosphere",
subtitle:
"Handcrafted statement lighting for homes, hospitality and commercial interiors."
},
{
id: "text_001",
type: "text",
content:
"The Shady Company designs lighting that transforms spaces into memorable experiences."
},
{
id: "split_001",
type: "split",
title: "Designed Around People",
content:
"Each piece is custom built with attention to ambience, architecture and craftsmanship.",
image: IMG,
imageLeft: true
},
{
id: "gallery_001",
type: "gallery",
title: "Featured Work",
images: [
{ url: IMG },
{ url: IMG },
{ url: IMG },
{ url: IMG }
]
},
{
id: "quote_001",
type: "quote",
quote:
"Light is not merely illumination — it is atmosphere.",
author:
"The Shady Company"
},
{
id: "collectionGrid_001",
type: "collectionGrid",
title: "Featured Collections"
},
{
id: "projectGrid_001",
type: "projectGrid",
title: "Recent Projects"
},
{
id: "cta_001",
type: "cta",
title: "Let's Build Something Beautiful",
buttonText: "Contact Us",
buttonLink: "/contact"
}
]
});

await db.collection("pages").doc("about").set({
title: "About",
slug: "about",
blocks: [
{
id: "hero_about",
type: "hero",
title: "Crafting Atmosphere Through Light",
subtitle:
"A design-led lighting studio."
},
{
id: "text_about",
type: "text",
content:
"We create bespoke lighting solutions for homes, restaurants, hotels and creative spaces."
}
]
});

const collections = [
"Pendant Lighting",
"Floor Lamps",
"Wall Lighting",
"Outdoor Lighting",
"Hospitality Lighting",
"Architectural Lighting"
];

for (let i = 0; i < collections.length; i++) {


const slug =
  collections[i]
    .toLowerCase()
    .replaceAll(" ", "-");

await db.collection("collections")
  .doc(slug)
  .set({
    name: collections[i],
    slug,
    description:
      `Premium ${collections[i]} collection.`,
    coverImage: IMG,
    featured: true,
    sortOrder: i + 1
  });


}

const products = [
"Aurora Pendant",
"Luna Pendant",
"Halo Floor Lamp",
"Nova Floor Lamp",
"Atlas Wall Light",
"Eclipse Wall Light",
"Orbit Pendant",
"Cascade Chandelier",
"Solstice Pendant",
"Linear Studio Light"
];

for (const p of products) {


const slug =
  p.toLowerCase()
   .replaceAll(" ", "-");

await db.collection("products")
  .doc(slug)
  .set({
    name: p,
    slug,
    description:
      "Handcrafted premium lighting fixture.",
    price: 14999,
    salePrice: 12999,
    collection:
      "pendant-lighting",
    featured: true,
    active: true,
    images: [IMG, IMG],
    specifications: [
      "Handcrafted",
      "Warm White",
      "Indoor Use"
    ]
  });


}

const projects = [
"Boutique Cafe Kolkata",
"Luxury Apartment",
"Creative Studio",
"Coastal Villa",
"Hotel Lobby",
"Restaurant Renovation"
];

for (const p of projects) {


const slug =
  p.toLowerCase()
   .replaceAll(" ", "-");

await db.collection("projects")
  .doc(slug)
  .set({
    title: p,
    slug,
    location: "India",
    client: "Confidential",
    year: 2025,
    featured: true,
    coverImage: IMG,
    images: [IMG, IMG, IMG],
    services: [
      "Lighting Design",
      "Fabrication",
      "Installation"
    ],
    description:
      "A showcase project demonstrating custom lighting solutions."
  });


}

const statuses = [
"new",
"contacted",
"quoted",
"won",
"lost"
];

for (let i = 0; i < 10; i++) {


await db.collection("leads")
  .add({

    name:
      `Demo Customer ${i + 1}`,

    email:
      `customer${i + 1}@example.com`,

    phone:
      `900000000${i}`,

    message:
      "Interested in a custom lighting solution.",

    productSlug:
      "aurora-pendant",

    type:
      "product",

    status:
      statuses[
        i % statuses.length
      ],

    quoteValue:
      25000 + (i * 5000),

    notes:
      "Demo lead",

    assignedTo:
      "Admin",

    createdAt:
      FieldValue.serverTimestamp(),

    updatedAt:
      FieldValue.serverTimestamp()

  });


}

console.log("Website demo data created.");
}

run();
