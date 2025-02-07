import { Loader } from "@components/common";
import loadable from "@loadable/component";

const UIforDev = loadable(async () => await import("./UIforDevCom"), {
  fallback: <Loader />
});

export default UIforDev;
