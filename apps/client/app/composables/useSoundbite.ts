import { useThrottleFn } from "@vueuse/core";

export const useSoundbite = (id: string) => {
  const del = useThrottleFn(async () => {
    const response = await deleteReq(`/soundbites/${id}`);
    return response.data.data;
  }, 300);
  const liking = useThrottleFn(async () => {
    const response = await getReq(`/soundbites/${id}/liking`);
    return response.data.data;
  }, 300);

  return {
    del,
    liking,
  };
};
