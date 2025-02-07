import { useEffect, useState } from "react";

function useDevice() {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
    }
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return {
    isMobile: !!(windowSize.width && windowSize.width <= 1024),
    windowSize
  };
}

export default useDevice;
