<template>
  <div
    class="flex flex-col items-start w-full p-3 gap-1 bg-surface-200 border border-surface-300 rounded-primary"
  >
    <h4 class="text-lg font-bold text-typography-50">
      <slot name="title" />
    </h4>
    <p class="font-light text-sm text-typography-300">
      <slot name="description" />
    </p>
  </div>
</template>
