import { useCookies } from "./useCookies";
import { useSessionStore } from "../stores/sessionStore";

export function useSession() {
  const cookies = useCookies();
  const sessionStore = useSessionStore();

  const login = (access_token: string): void => {
    cookies.setCookie("access_token", access_token, {
      maxAge: 5 * 24 * 3600,
      path: "/",
    });
  };

  const logout = (): void => {
    cookies.removeCookie("access_token");
    sessionStore.isLoggedIn = false;
    sessionStore.user = null;
  };

  const isAuthenticated = (): boolean => {
    return !!cookies.getCookie("access_token");
  };

  const getSession = () => {
    const token = cookies.getCookie("access_token");
    return { access_token: token, bearer: token ? `Bearer ${token}` : null };
  };

  return { login, logout, isAuthenticated, getSession, sessionStore };
}
