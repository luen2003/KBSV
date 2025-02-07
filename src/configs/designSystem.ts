import { v4 as mId } from "uuid";

interface IGroupDs {
  colors: Array<{
    id: string;
    key: string;
    info: Array<{ key: string; hex: string }>;
  }>;
}
interface IDesignSystemDev {
  common: IGroupDs;
  dark: IGroupDs;
  light: IGroupDs;
}

type IColorTW = Record<string, Record<string, string>>;

interface IDesignSystemTW {
  common: {
    colors: IColorTW;
  };
  dark: {
    colors: IColorTW;
  };
  light: {
    colors: IColorTW;
  };
}

const designSystemDev: IDesignSystemDev = {
  common: {
    colors: [
      {
        id: mId(),
        key: "common",
        info: []
      }
    ]
  },
  dark: {
    colors: [
      {
        id: mId(),
        key: "gray",
        info: [
          { key: "016", hex: "#CBCBCB" },
          { key: "015", hex: "#101828" },
          { key: "014", hex: "#000000" },
          { key: "013", hex: "#FFFFFF" },
          { key: "012", hex: "#D8D8D8" },
          { key: "011", hex: "#939090" },
          { key: "010", hex: "#D0D5DD" },
          { key: "009", hex: "#5F5F5F" },
          { key: "008", hex: "#3D3D3D" },
          { key: "007", hex: "#343434" },
          { key: "006", hex: "#2E2E2E" },
          { key: "005", hex: "#252525" },
          { key: "004", hex: "#212121" },
          { key: "003", hex: "#00000073" },
          { key: "002", hex: "#151515" },
          { key: "001", hex: "#080808" }
        ]
      },
      {
        id: mId(),
        key: "color",
        info: [
          { key: "whiteHeader", hex: "#FCFCFD" },
          { key: "white", hex: "#FCFCFD"},
          { key: "yellow20", hex: "#fbaf1733" },
          { key: "brown2", hex: "#372F20" },
          { key: "primary", hex: "#FBAF17" },
          { key: "brown", hex: "#533700" },
          { key: "orange", hex: "#FF9F0A" },
          { key: "yellow", hex: "#FFD60A" },
          { key: "green", hex: "#25B770" },
          { key: "green001", hex: "#25B770" },
          { key: "red", hex: "#FF453A" },
          { key: "red001", hex: "#FF453A" },
          { key: "blue", hex: "#1890FF" },
          { key: "blue2", hex: "#58F9F9" },
          { key: "pink", hex: "#FF00FF" },
          { key: "green20", hex: "rgba(37, 183, 112, 0.20)" },
          { key: "red20", hex: "rgba(255, 69, 58, 0.20)" },
          { key: "yellow20", hex: "rgba(251, 175, 23, 0.20)" },
          { key: "yellow10", hex: "rgba(251, 175, 23, 0.10)" },
          { key: "yellow60", hex: "rgba(255, 221, 153, 0.60)" },
          { key: "Textbutton", hex: "#1890ff" },
          { key: "head", hex: "#3A3223" },
          { key: "grey", hex: "#98A2B3"},
          { key: "black", hex: "#101828" },
        ]
      }
    ]
  },
  light: {
    colors: [
      {
        id: mId(),
        key: "gray",
        info: [
          { key: "018", hex: "#F9FAFB" },
          { key: "017", hex: "#98A2B3" },
          { key: "016", hex: "#CBCBCB" },
          { key: "015", hex: "#101828" },
          { key: "014", hex: "#001529" },
          { key: "013", hex: "#FFFFFF" },
          { key: "012", hex: "#475467" },
          { key: "011", hex: "#939090" },
          { key: "010", hex: "#D0D5DD" },
          { key: "009", hex: "#5F5F5F" },
          { key: "008", hex: "#000C17" },
          { key: "007", hex: "#343434" },
          { key: "006", hex: "#2E2E2E" },
          { key: "005", hex: "#252525" },
          { key: "004", hex: "#212121" },
          { key: "003", hex: "#00000073" },
          { key: "002", hex: "#001529" },
          { key: "001", hex: "#FFFFFF" }
        ]
      },
      {
        id: mId(),
        key: "color",
        info: [
          { key: "whiteHeader", hex: "#FCFCFD" },
          { key: "white", hex: "#FCFCFD"},
          { key: "yellow20", hex: "#fbaf1733" },
          { key: "brown2", hex: "#372F20" },
          { key: "primary", hex: "#F7B117" },
          { key: "brown", hex: "#533700" },
          { key: "orange", hex: "#FF9F0A" },
          { key: "yellow", hex: "#FFD60A" },
          { key: "green", hex: "#25B770" },
          { key: "green001", hex: "#25B770" },
          { key: "red", hex: "#FF453A" },
          { key: "red001", hex: "#FF453A" },
          { key: "blue", hex: "#1890FF" },
          { key: "blueActive", hex: "#3F4B56" },
          { key: "blue2", hex: "#58F9F9" },
          { key: "pink", hex: "#FF00FF" },
          { key: "green20", hex: "rgba(37, 183, 112, 0.20)" },
          { key: "red20", hex: "rgba(255, 69, 58, 0.20)" },
          { key: "yellow20", hex: "rgba(251, 175, 23, 0.20)" },
          { key: "yellow10", hex: "rgba(251, 175, 23, 0.10)" },
          { key: "yellow60", hex: "rgba(255, 221, 153, 0.60)" },
          { key: "grey", hex: "#98A2B3" },
          { key: "black", hex: "#101828" },
        ]
      }
    ]
  }
};

const makeGroupColors: ({ colors }: IGroupDs) => IColorTW = ({ colors }) => {
  if (colors.find((gr) => gr.info.length)) {
    return colors.reduce(
      (a1, v1) => ({
        ...a1,
        [v1.key]: v1.info.reduce((a2, v2) => ({ ...a2, [v2.key]: v2.hex }), {})
      }),
      {}
    );
  }
  return {};
};

const designSystemTW = () => {
  const common = {
    colors: makeGroupColors({ colors: designSystemDev.common.colors })
  };
  const dark = {
    colors: makeGroupColors({ colors: designSystemDev.dark.colors })
  };
  const light = {
    colors: makeGroupColors({ colors: designSystemDev.light.colors })
  };
  return {
    common,
    dark,
    light
  };
};

const designSystem = {
  designSystemDev,
  designSystemTW: designSystemTW() as IDesignSystemTW
};

export default designSystem;
