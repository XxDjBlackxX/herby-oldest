<template>
  <div
    class="flex max-sm:flex-col items-center justify-center sm:justify-between w-full gap-2"
  >
    <UiLinkPreview url="https://ytmp3.la/">
      {{
        $t("app.components.shared.tools.downloaderLinks.downloader", {
          company: "Youtube",
        })
      }}
    </UiLinkPreview>
    <UiLinkPreview url="https://clipr.xyz/">
      {{
        $t("app.components.shared.tools.downloaderLinks.downloader", {
          company: "Twitch",
        })
      }}
    </UiLinkPreview>
    <UiLinkPreview url="https://savetik.cc/">
      {{
        $t("app.components.shared.tools.downloaderLinks.downloader", {
          company: "Tiktok",
        })
      }}
    </UiLinkPreview>
  </div>
</template>
