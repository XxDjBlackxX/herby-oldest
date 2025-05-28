export const useUser = () => {
  const following = async (id: string) => {
    const response = await getReq(`/users/${id}/following`);

    return response.data.data;
  };

  return {
    following,
  };
};
