<template>
  <section
    class="bg-surface-50 relative place-items-center grid h-screen w-screen gap-4"
  >
    <div
      class="bg-primary-500 w-48 h-48 absolute animate-ping rounded-full delay-5s shadow-xl"
    ></div>
    <div
      class="bg-primary-400 w-32 h-32 absolute animate-ping rounded-full shadow-xl"
    ></div>
    <span class="z-[50]">
      <IconLogo :size="80" />
    </span>
  </section>
</template>
