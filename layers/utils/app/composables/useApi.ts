import axios from "axios";
import { useSession } from "./useSession";
import { useRuntimeConfig } from "nuxt/app";

export const useApi = () => {
  const runtimeConfig = useRuntimeConfig();
  const baseURL = `${runtimeConfig.app.SERVER_URL}/v1`;
  const session = useSession();

  return axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      Authorization: session.getSession().bearer,
    },
  });
};
