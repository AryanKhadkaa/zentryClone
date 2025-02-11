import React, { useRef } from "react";
import Button from "./button";
import { TiLocationArrow } from "react-icons/ti";

const Navbar = () => {
  const navContainerRef = useRef(null); //for animation
  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between py-4">
          <div className="flex items-ceter gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <Button
              id="product-button"
              title="Products"
              rightIcon={""}
              leftIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            ></Button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
