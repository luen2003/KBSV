import { Loader } from "@components/common";
import loadable from "@loadable/component";

export const Main = loadable(async () => await import("./Main"), {
  fallback: <Loader />
});

export const NotFound = loadable(async () => await import("./NotFound"), {
  fallback: <Loader />
});

export const Login = loadable(async () => await import("./login"), {
  fallback: <Loader />
});
