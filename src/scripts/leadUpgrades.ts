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

  const leads =
    await db
      .collection(
        "leads"
      )
      .get();

  for (
    const lead
    of leads.docs
  ) {

    await lead.ref.set(

      {

        type:
          "general",

        productSlug:
          "",

        status:
          "new"

      },

      {
        merge: true
      }

    );

  }

  console.log(
    "Lead upgrade complete"
  );
}

run();