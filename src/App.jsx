import React from "react";
import { Hero } from "./components/hero";
import About from "./components/about";
import Navbar from "./components/navbar";

const App = () => {
  return (
    <main className="bg-zinc-600 relative min-h-screem w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
    </main>
  );
};

export default App;
