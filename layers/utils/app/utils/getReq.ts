import { useApi } from "../composables/useApi";

export default function (url: string): Promise<any> {
  const api = useApi();
  return api({ url });
}
