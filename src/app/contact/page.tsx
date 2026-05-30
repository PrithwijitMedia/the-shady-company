import { Suspense } from "react";

import ContactForm from "./ContactForm";

export default function ContactPage() {

  return (

    <Suspense
      fallback={
        <main className="max-w-4xl mx-auto px-8 py-32">
          Loading...
        </main>
      }
    >

      <ContactForm />

    </Suspense>

  );

}