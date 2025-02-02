import React from "react";
import { Hero } from "./components/hero";

const App = () => {
  return (
    <main className="relative min-h-screem w-screen overflow-x-hidden">
      <Hero></Hero>
      <section className="min-h-screen bg-blue-500"></section>
    </main>
  );
};

export default App;
