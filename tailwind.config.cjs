const { createThemes } = require("tw-colors");
const { designSystem } = require("./src/configs");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        mobile: "640px",
        // => @media (min-width: 640px) { ... }

        tablet: "768px",
        // => @media (min-width: 768px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        laptopM: "1280px",
        // => @media (min-width: 1280px) { ... }

        laptopL: "1440px",
        // => @media (min-width: 1440px) { ... }

        desktop: "1600px",

        desktopL: "1920px"
      },

      colors: designSystem.designSystemTW.common.colors,
      spacing: {
        ten: "0.625rem",
        px: "1px",
        0: "0",
        0.5: "0.125rem",
        1: "0.25rem",
        1.5: "0.375rem",
        2: "0.5rem",
        2.5: "0.625rem",
        3: "0.75rem",
        3.5: "0.875rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        14: "3.5rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
        52: "13rem",
        56: "14rem",
        60: "15rem",
        64: "16rem",
        72: "18rem",
        80: "20rem",
        96: "24rem",
        "1px": "0.06rem",
        "2px": "0.13rem",
        "3px": "0.19rem",
        "4px": "0.3rem",
        "5px": "0.3rem",
        "6px": "0.4rem",
        "8px": "0.5rem",
        "10px": "0.6rem",
        "12px": "0.8rem",
        "14px": "0.9rem",
        "15px": "0.9rem",
        "16px": "1rem",
        "18px": "1.1rem",
        "20px": "1.3rem",
        "24px": "1.5rem",
        "25px": "1.6rem",
        "28px": "1.8rem",
        "32px": "2rem",
        "36px": "2rem",
        "40px": "3rem",
        "44px": "3rem",
        "48px": "3rem",
        "50px": "3rem",
        "56px": "4rem",
        "64px": "4rem",
        "72px": "5rem",
        "75px": "5rem",
        "80px": "5rem",
        "90px": "6rem",
        "100px": "6rem",
        "17px": "1.0625rem",
        "19px": "1.1875rem",
        "22px": "1.375rem",
        "26px": "1.625rem",
        "30px": "1.875rem",
        "34px": "2.125rem",
        "38px": "2.375rem",
        "60px": "3.75rem",
        "70px": "4.375rem"
      },
      fontSize: {
        // [fontSize, lineHeight]
        ten: ["0.625rem", "0.75rem"], // 10px 12px
        xs: ["1.5rem", "2rem"], // ['24px', '32px'],
        xl: ["1.25rem", "1.875rem"], // ['20px', '30px'],
        lg: ["1.1rem", "1.75"], // ['18px', '28px'],
        md: ["1rem", "1.5"], // ['16px', '24px'],
        sm: ["0.75rem", "1.05rem"], // 12px 16.8px
        "14px": "0.9rem",
        "11px": "0.688rem",
        "8px": "0.5rem",
        "10px": "0.6rem",
        "9px": "0.5625rem",
        "40px": "2.5rem",
        "13px": "0.8125rem"
      },
      fontFamily: {
        roboto: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue, Arial', 'Noto Sans, sans-serif', "Apple Color Emoji", "Segoe UI Emoji", 'Segoe UI Symbol', "Noto Color Emoji"]
      },
      backgroundImage: {
        LinearLine: `linear-gradient(135deg, theme(colors.gray-010/65),theme(colors.gray-010/0))`
      }
    }
  },
  plugins: [
    createThemes(({ light, dark }) => ({
      light: light({ ...designSystem.designSystemTW.light.colors }),
      dark: dark({ ...designSystem.designSystemTW.dark.colors })
    })),
    require("tailwind-scrollbar")({ nocompatible: true })
  ]
};
