import { useEffect, useState } from "react";

interface SlideBannerProps {
  slides: ISlideBannerWithLink[];
  timeChange: number;
}

export interface ISlideBannerWithLink {
  srcFile: string;
  linkHref: string;
}

export default function SlideBanner({ slides, timeChange }: SlideBannerProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevCurrent) => (prevCurrent + 1) % slides.length);
    }, timeChange);

    return () => clearInterval(interval);
  }, [slides.length, timeChange]);

  return (
    <div className="overflow-auto h-full relative">
      <div
        className={`flex h-full transition ease-out duration-40`}
        style={{
          transform: `translateX(-${current * 100}%)`
        }}
      >
        {slides.map((s, index) => {
          return (
            <a
              href={s.linkHref}
              key={index}
              className="flex-shrink-0 w-full h-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="object-cover w-full h-full rounded-l-2xl cursor-pointer"
                src={s.srcFile}
                alt={`Slide ${index + 1}`}
              />
            </a>
          );
        })}
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides.map((s: any, i: number) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-3 h-3 cursor-pointer  ${
                i === current ? "bg-white" : "bg-gray-500"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
