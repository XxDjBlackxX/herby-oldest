import { useApi } from "../composables/useApi";

export default function (
  url: string,
  options?: { params?: Record<string, string> },
): Promise<any> {
  const api = useApi();
  return api({
    method: "DELETE",
    params: options?.params,
    url,
  });
}
