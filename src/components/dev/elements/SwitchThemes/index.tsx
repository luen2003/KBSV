import { useEffect, useState } from "react";

import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function SwitchThemes() {
  const [theme, setTheme] = useState<string>("dark");
  const changeTheme: (theme: string) => void = setTheme;

  useEffect(() => {
    const th = document.body.getAttribute("data-theme");
    if (th) setTheme(th);
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div>
      <div className="flex gap-3">
        {theme === "light" ? (
          <MdDarkMode
            className="h-10 w-10 cursor-pointer"
            onClick={() => changeTheme("dark")}
          />
        ) : (
          <MdLightMode
            className="h-10 w-10 cursor-pointer"
            onClick={() => changeTheme("light")}
          />
        )}
      </div>
    </div>
  );
}
