import React from "react";
import { Hero } from "./components/hero";
import About from "./components/about";

const App = () => {
  return (
    <main className="relative min-h-screem w-screen overflow-x-hidden">
      <Hero />
      <About />
    </main>
  );
};

export default App;
