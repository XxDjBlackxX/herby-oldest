export const useImports = () => {
  const { t } = useI18n();
  const { pageStore } = usePage();
  const { sessionStore } = useSession();
  const { validateAndUpload: validateAndUploadFile } = useFile();
  const { $toast } = useNuxtApp();

  return {
    t,
    pageStore,
    sessionStore,
    validateAndUploadFile,
    toast: $toast,
    route: useRoute(),
    router: useRouter(),
    runtimeConfig: useRuntimeConfig(),
  };
};
