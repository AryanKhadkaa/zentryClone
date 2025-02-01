import React, { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./button";
export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasUserClicked, setHasUserClicked] = useState();
  const [isLoading, setisLoading] = useState();
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef(null); // In react, you use a ref whenever you wan to target a specific DOM element, like the iframre or a div within whihc we want to play a video

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const handleMiniVideo = () => {
    setHasUserClicked(true);
    // currentIndex < totalVideos
    //   ? setCurrentIndex((prev) => prev + 1)
    //   : setCurrentIndex(0);
    setCurrentIndex((prev) => (prev % totalVideos) + 1);
  };

  const getVideoSrc = (idx) => `videos/hero-${idx}.mp4`;
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
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
                src={getVideoSrc((currentIndex % totalVideos) + 1)}
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
            loop
            muted
            id="next_video"
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
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            ></Button>
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-blue-75">
        G<b>a</b>ming
      </h1>
    </div>
  );
};
