import { useState } from "nuxt/app";

interface State {
  triggered: boolean;
  done: boolean;
  err: boolean;
}

interface MiddlewareState {
  authentication: State;
  config: State;
}

export const useMiddlewareState = () => {
  return useState<MiddlewareState>("middlewareState", () => ({
    authentication: {
      triggered: false,
      done: false,
      err: false,
    },
    config: {
      triggered: false,
      done: false,
      err: false,
    },
  }));
};
