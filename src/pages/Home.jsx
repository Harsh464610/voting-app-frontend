import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Voting App</h1>
        <nav>
          <Link className="text-blue-600" to="/auth/login">Login</Link>
        </nav>
      </header>

      <section className="mt-8">
        <p className="text-gray-600">
          Welcome — start building features step by step. This scaffold uses React, Redux Toolkit, react-hook-form, axios, and Tailwind CSS (JS-only).
        </p>
      </section>
    </main>
  );
}
