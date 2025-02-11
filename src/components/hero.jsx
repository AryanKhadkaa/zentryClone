import React, { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasUserClicked, setHasUserClicked] = useState();
  const [isLoading, setisLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;

  const nextVideoRef = useRef(null); // In react, you use a ref whenever you wan to target a specific DOM element, like the iframre or a div within whihc we want to play a video

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const upcomingIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVideo = () => {
    setHasUserClicked(true);
    // currentIndex < totalVideos
    //   ? setCurrentIndex((prev) => prev + 1)
    //   : setCurrentIndex(0);
    setCurrentIndex(upcomingIndex);
  };

  // for the video animation on clicking the mini video player

  useGSAP(
    () => {
      if (hasUserClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  // for the on scroll trapezoidal clip path effect

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
        //markers: true, to better understand the positions of animations, visually see start and end points
      },
    });
  });

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) setisLoading(false);
  }, [loadedVideos]); // we check the loading or not with our loaded videos dependencies

  const getVideoSrc = (idx) => `videos/hero-${idx}.mp4`;
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] w-screen h-dvh overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rouded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVideo}
              className="transition-all duration-500 ease-in origin-center scale-50 hover:scale-100 opacity-0 hover:opacity-100 "
            >
              <video
                src={getVideoSrc(upcomingIndex)}
                ref={nextVideoRef}
                loop
                muted
                id="current-video"
                className="size-64 origin-center object-cover scale-125"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            // autoPlay
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 object-cover size-full object-center"
            onLoadedData={handleVideoLoad}
          ></video>
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font text-blue-100 hero-heading">
              redefi<b>n</b>e
            </h1>
            <p className="text-blue-100 font-robert-regular max-w-64 mb-5">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            {/* Button */}

            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            ></Button>
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};
