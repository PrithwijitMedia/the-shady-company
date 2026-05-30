import admin from "firebase-admin";
import fs from "fs";

const serviceAccount = JSON.parse(
    fs.readFileSync(
        "./serviceAccountKey.json",
        "utf8"
    )
);

admin.initializeApp({
    credential:
        admin.credential.cert(
            serviceAccount
        )
});

const db =
    admin.firestore();

async function run() {

    console.log(
        "Upgrading schema..."
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
                    "+91xxxxxxxxxx",

                address:
                    "Kolkata, India",

                instagram:
                    "",

                whatsapp:
                    "",

                facebook:
                    ""

            },
            {
                merge: true
            }
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
            {
                merge: true
            }
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
                        url: ""
                    },

                    {
                        label:
                            "WhatsApp",
                        url: ""
                    }

                ]

            },
            {
                merge: true
            }
        );


    //
    // COLLECTIONS
    //

    const collections =
        await db
            .collection(
                "collections"
            )
            .get();

    for (
        const doc
        of collections.docs
    ) {


        await doc.ref.set(

            {

                featured: true,

                sortOrder: 1,

                coverImage: ""

            },

            {
                merge: true
            }

        );


    }

    //
    // PRODUCTS
    //

    const products =
        await db
            .collection(
                "products"
            )
            .get();

    for (
        const doc
        of products.docs
    ) {


        await doc.ref.set(

            {

                featured: true,

                active: true,

                salePrice: 0,

                specifications: []

            },

            {
                merge: true
            }

        );


    }

    //
    // PROJECTS
    //

    const projects =
        await db
            .collection(
                "projects"
            )
            .get();

    for (
        const doc
        of projects.docs
    ) {


        await doc.ref.set(

            {

                featured: true,

                client: "",

                services: [],

                images: []

            },

            {
                merge: true
            }

        );


    }

    console.log(
        "Schema Upgrade Complete"
    );
}

run()
    .then(() => process.exit())
    .catch((err) => {


        console.error(err);

        process.exit(1);


    });
