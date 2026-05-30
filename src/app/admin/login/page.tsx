"use client";

import { loginWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  async function handleLogin() {

    try {

      await loginWithGoogle();

      router.push("/admin");

    } catch (error) {

      console.error(error);

    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">

      <div className="border rounded-xl p-8">

        <h1 className="text-3xl font-bold">
          The Shady Company
        </h1>

        <p className="mt-2">
          Admin Login
        </p>

        <button
          onClick={handleLogin}
          className="mt-6 border px-4 py-2 rounded"
        >
          Sign in with Google
        </button>

      </div>
    </main>
  );
}