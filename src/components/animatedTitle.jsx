import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/scrollTrigger";
import { useEffect, useRef } from "react";
import clsx from "clsx";

export const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null); //to target the div for animation
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current, //trigger indicated that animation will happen/end based on the containerRef's position in the view port
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
          //markers: true,
        },
      });

      titleAnimation.to(".animated-word", {
        opacity: 1,
        transform: "translate3D(0,0,0) rotateY(0deg) rotateX(0deg)",
        ease: "power2.inOut",
        stagger: 0.02, // by giving stagger value, we delay each word by 0.02 seconds, giving that cascading effects
      });
    }, containerRef);
    return () => ctx.revert(); //clean up on unmount
  }, []);

  return (
    // <div ref={containerRef} className="animated-title">
    //   <div className="mt-5 animated-word special-font font-semibold px-2 mx-auto text-4xl md:text-[6rem] leading-[0.8] text-center">
    //     {/* {title.split("<br/>").map((line, idx) => {
    //     return <div>

    //         </div>
    //     })} */}
    //     DISC<b>O</b>VER THE WORLD'S LARGEST SHARED <b>A</b>DVENTURE
    //   </div>
    // </div>

    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {title.split("<br />").map((line, idx) => (
        <div
          key={idx}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, i) => (
            <span
              key={i}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            ></span>
          ))}
        </div>
      ))}
    </div>
  );
};
