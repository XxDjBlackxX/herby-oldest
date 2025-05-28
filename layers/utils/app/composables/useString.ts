import { useRuntimeConfig } from "nuxt/app";

export const useString = () => {
  const maskEmail = (email: string): string => {
    const [localPart, domain] = email.split("@");
    if (!localPart) return email;

    const maskedLocalPart = `${localPart.slice(0, 2)}${"*".repeat(localPart.length - 2)}`;
    return `${maskedLocalPart}@${domain}`;
  };

  function formatDuration(seconds = 1) {
    return new Date(1000 * seconds).toISOString().slice(14, 19);
  }

  function formatDownloadLink(link: string) {
    const runtimeConfig = useRuntimeConfig();
    const url = new URL(link);

    const args = url.pathname.slice(1).split("/");

    const path = args.slice(0, -1).join("%2F");
    const fileName = args.pop();

    return `${runtimeConfig.app.SERVER_URL}/v1/cdn/download/file/${path}/${fileName}`;
  }

  function getPreviewURL(input: File | string | null) {
    if (typeof input === "string") {
      return input;
    }
    return input instanceof File ? URL.createObjectURL(input) : null;
  }

  function formatPercentage(num: number) {
    return (num * 100).toString();
  }

  function percentageToDecimal(input: string): number {
    const num = parseFloat(input);
    return num / 100;
  }

  return {
    maskEmail,
    formatDuration,
    formatDownloadLink,
    getPreviewURL,
    formatPercentage,
    percentageToDecimal,
  };
};
