<template>
  <div
    class="overflow-hidden group flex max-md:flex-col items-center justify-around px-5 gap-5 w-full md:min-h-[160px] md:py-5 max-md:p-10 shadow-lg rounded-primary border border-surface-300 bg-surface-100 aria-disabled:pointer-events-none aria-disabled:opacity-50"
  >
    <span>
      <slot name="icon" />
    </span>
    <UiSeparator class="md:hidden" />
    <span class="flex flex-col items-center gap-y-2 max-w-sm">
      <UiTypographyTitle class="text-center"
        ><slot name="title"
      /></UiTypographyTitle>
      <UiTypographyDesc class="text-center break-keep"
        ><slot name="description"
      /></UiTypographyDesc>
      <slot name="button" />
    </span>
  </div>
</template>
