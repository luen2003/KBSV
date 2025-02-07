import { type ISlideBannerWithLink } from "@components/common/SlideBanner";
import type { Data } from "@types";

export const NAME_COMMON_SLICE = "STORE_COMMON";

export const LIST_THEME: Data.Theme[] = [
  { id: "light", name: "light" },
  { id: "dark", name: "dark" }
];

export const THEMES: {
  light: Data.Theme;
  dark: Data.Theme;
} = {
  light: { id: "light", name: "light" },
  dark: { id: "dark", name: "dark" }
};

export const LIST_LANGUAGES: Data.Language[] = [
  { id: "vi", name: "Vietnamese", image: "", code: 1 },
  { id: "en", name: "English", image: "", code: 2 }
];

export const LIST_BANNER_LOGIN: ISlideBannerWithLink[] = [
  {
    srcFile: "./banner/banner01.jpg",
    linkHref:
      "https://www.kbsec.com.vn/vi/san-pham.htm?utm_campaign=wts_banner_uudai&utm_medium=display&utm_source=referral&utm_content=&utm_term="
  },
  {
    srcFile: "./banner/banner02.jpg",
    linkHref:
      "https://www.kbsec.com.vn/vi/goi-san-pham-kb-s.htm?utm_campaign=wts_banner_s+&utm_medium=display&utm_source=referral&utm_content=&utm_term="
  },
  {
    srcFile: "./banner/banner03.jpg",
    linkHref:
      "https://giaithuong.kbsec.com.vn/?utm_campaign=wts_banner_giaithuong&utm_medium=display&utm_source=referral&utm_content=&utm_term="
  },
  {
    srcFile: "./banner/banner04.jpg",
    linkHref:
      "https://cafebuddy.com.vn/?utm_campaign=wts_banner_cafebuddy&utm_medium=display&utm_source=referral&utm_content=&utm_term="
  },
  {
    srcFile: "./banner/banner05.jpg",
    linkHref:
      "https://www.kbsec.com.vn/vi/prime.htm?utm_campaign=wts_banner_prime&utm_medium=display&utm_source=referral&utm_content=&utm_term="
  }
];

export const REGEX_VN =
  /[^a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]/g;

export const REGEX_ONLY_AZ09 = /[^a-zA-Z0-9]/g;
export const REGEX_ONLY_AZ09_VN = /[^a-zA-Z0-9\u00C0-\u1EF9]/g;
