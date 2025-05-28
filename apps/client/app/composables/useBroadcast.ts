export const useBroadcast = (id: string) => {
  const trigger = async ({
    soundbite,
    target,
    action,
    orbit,
  }: {
    soundbite: string;
    target: "soundbite";
    action: "test" | "prod";
    orbit?: number;
  }) => {
    const response = await postReq(`/broadcast/${id}/trigger/${soundbite}`, {
      target,
      action,
      orbit,
    });
    return response.data.data;
  };

  return {
    trigger,
  };
};
