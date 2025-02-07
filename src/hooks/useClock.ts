import { useEffect, useState } from "react";

export default function useClock() {
  const [time, setTime] = useState<string>();
  const [date, setDate] = useState<string>();

  useEffect(() => {
    const tick = () => {
      const now = new Date();

      setTime(now.toLocaleTimeString("en-GB"));
      setDate(now.toLocaleDateString("en-GB"));
    };

    tick(); // initialize immediately
    const timerID = setInterval(tick, 1000); // update every second

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return { time, date };
}
