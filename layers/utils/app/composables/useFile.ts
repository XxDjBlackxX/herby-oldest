import postReq from "../utils/postReq";

interface IUploadFileOptions {
  startTime?: string;
  duration?: string;
  type?: string;
  action?: "upload" | "trim-and-upload";
  childrens?: string[];
}

export const useFile = () => {
  const upload = async (file: File, options?: IUploadFileOptions) => {
    const formData = new FormData();
    formData.append("attachment", file);

    const queryParams = new URLSearchParams();

    if (options?.startTime) queryParams.append("startTime", options.startTime);
    if (options?.duration) queryParams.append("duration", options.duration);
    if (options?.type) queryParams.append("type", options.type);
    if (options?.action) queryParams.append("action", options.action);
    if (options?.childrens)
      queryParams.append("childrens", options.childrens.join(","));

    try {
      const response = await postReq(
        `/cdn/upload/file${queryParams.toString() ? `?${queryParams.toString()}` : ""}`,
        formData,
      );

      return response.data?.data;
    } catch {
      return false;
    }
  };

  function validateAndUpload(
    file: File | string | null,
    options?: IUploadFileOptions,
  ) {
    return file instanceof File ? upload(file, options) : false;
  }

  return { upload, validateAndUpload };
};
