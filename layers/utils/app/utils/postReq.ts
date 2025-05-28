import { useApi } from "../composables/useApi";

export default function (
  url: string,
  data: Record<any, any> = {},
): Promise<any> {
  const api = useApi();
  return api({ method: "POST", url, data });
}
