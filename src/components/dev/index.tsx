import { Loader } from "@components/common";
import loadable from "@loadable/component";

const Dev = loadable(async () => await import("./DevCom"), {
  fallback: <Loader />
});

export default Dev;
