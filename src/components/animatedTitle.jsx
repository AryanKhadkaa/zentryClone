import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";

export const AnimatedTitle = ({ title }) => {
  //const AnimatedTitle = () => {};

  const containerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play non none reverse",
          markers: true,
        },
      });

      titleAnimation.to(".animated-word", {
        opacity: 1,
        transform: "translate3D(0,0,0) rotateY(0deg) rotateX(0deg)",
        ease: "power2.inOut",
        stagger: 0.02,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="animated-title">
      <div className="mt-5 animated-word special-font font-semibold px-2 mx-auto text-4xl md:text-[6rem] leading-[0.8] text-center">
        {/* {title.split("<br/>").map((line, idx) => {
        return <div>

            </div>
        })} */}
        DISC<b>O</b>VER THE WORLD'S LARGEST SHARED <b>A</b>DVENTURE
      </div>
    </div>
  );
};
AnimatedTitle;
