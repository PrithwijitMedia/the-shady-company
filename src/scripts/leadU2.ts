import admin from "firebase-admin";
import fs from "fs";

const serviceAccount =
  JSON.parse(
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

  const snapshot =
    await db
      .collection("leads")
      .get();

  for (
    const lead
    of snapshot.docs
  ) {

    await lead.ref.set(

      {

        quoteValue: 0,

        notes: "",

        assignedTo: "",

        updatedAt:
          admin.firestore.FieldValue.serverTimestamp()

      },

      {
        merge: true
      }

    );

  }

  console.log(
    "Pipeline upgrade complete"
  );
}

run();