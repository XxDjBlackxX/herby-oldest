import { useCookie } from "nuxt/app";

export interface CookieOptions {
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: boolean | "lax" | "strict" | "none";
}

export function useCookies() {
  const getCookie = (name: string) => {
    const cookie = useCookie(name);
    return cookie.value;
  };

  const setCookie = (name: string, value: unknown, options?: CookieOptions) => {
    const cookie = useCookie(name, {
      default: () => value,
      ...options,
    });
    cookie.value = value;
    return cookie;
  };

  const removeCookie = (name: string) => {
    const cookie = useCookie(name);
    cookie.value = null;
  };

  const clearCookie = (name: string) => {
    removeCookie(name);
  };

  return { getCookie, setCookie, removeCookie, clearCookie };
}
