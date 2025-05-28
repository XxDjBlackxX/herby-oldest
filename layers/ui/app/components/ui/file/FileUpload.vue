<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useNuxtApp, useRuntimeConfig } from "nuxt/app";
import { useVModel, useFileDialog } from "@vueuse/core";
import type { FileUploadProps, FileUploadEmits } from ".";
import { ViewportCard } from "../card";
import { Button } from "../button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
  DrawerHeader,
} from "../drawer";

const { getPreviewURL } = useString();
const { t } = useI18n();
const { $toast } = useNuxtApp();
const runtimeConfig = useRuntimeConfig();

const emits = defineEmits<FileUploadEmits>();
const props = withDefaults(defineProps<FileUploadProps>(), {
  accept: "image/*",
  variant: "entry",
  width: 100,
  height: 100,
});

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

const isOpen = ref(false);
const fileName = ref<string | undefined>(undefined);

const previewURL = computed(() => getPreviewURL(modelValue.value));

const maxFileSize = parseInt(runtimeConfig.app.FILE_SIZE_LIMIT || "100000");

const { open, onChange, reset } = useFileDialog({
  accept: props.accept,
});

onChange((files) => {
  const file = files?.[0];
  isOpen.value = false;

  if (!file) {
    reset();
    modelValue.value = null;
    return;
  }

  if (file.size >= maxFileSize) {
    $toast.error(t("layers.ui.index.file.fileUpload.toast.error"));
    reset();
    return;
  }

  $toast.success(t("layers.ui.index.file.fileUpload.toast.success"));
  fileName.value = file.name;
  modelValue.value = file;
});
</script>

<template>
  <!-- Drawer -->
  <Drawer v-model:open="isOpen">
    <!-- Trigger (Entry Variant) -->
    <DrawerTrigger
      v-if="props.variant === 'entry'"
      :style="{
        height: $formatSize(props.height),
        maxWidth: $formatSize(props.width),
      }"
      :class="
        $cn(
          'transition-all w-full overflow-hidden relative group rounded-primary border-2 border-dashed border-surface-300',
          props.class,
        )
      "
    >
      <NuxtImg
        v-if="previewURL"
        :src="previewURL"
        alt="File Upload"
        class="absolute inset-0 object-cover w-full h-full"
      />
      <div
        :class="
          $cn(
            'transition-all flex items-center justify-center w-full h-full cursor-pointer',
            previewURL
              ? 'absolute inset-0 opacity-0 hover:opacity-100 group-hover:bg-black/40 group-hover:bg-opacity-10 text-white'
              : 'bg-surface-100 group-hover:bg-surface-200',
          )
        "
      >
        <IconSquareArrowOutUpRight :size="30" class="transition-all" />
      </div>
    </DrawerTrigger>

    <!-- Drawer Content -->
    <DrawerContent class="flex flex-col items-start gap-y-5">
      <DrawerHeader>
        <template #title>
          <slot name="title" />
        </template>
      </DrawerHeader>
      <button
        type="button"
        class="container relative flex flex-col items-center justify-end p-3 mt-10 rounded-primary bg-gradient-to-tr from-surface-300 to-surface-400"
        @click="open()"
      >
        <div class="folder">
          <div class="front-side">
            <div class="tip"></div>
            <div class="cover"></div>
          </div>
          <div class="back-side cover"></div>
        </div>
        <Button as="span" class="justify-center w-full py-3">
          {{ $t("layers.ui.index.file.fileUpload.dialog.items.upload") }}
        </Button>
      </button>
      <DrawerDescription>
        <slot name="description" />
      </DrawerDescription>
    </DrawerContent>
  </Drawer>

  <!-- Card Variant -->
  <ViewportCard v-if="props.variant === 'card'" class="h-[60px]">
    <template #start>
      <div class="flex items-center h-full gap-2">
        <NuxtImg
          v-if="previewURL && props.accept !== 'audio/*'"
          :src="previewURL"
          alt="File Upload"
          class="object-cover w-[40px] h-[40px] rounded-primary bg-surface-300"
        />
        <IconMusic
          v-else-if="previewURL"
          class="w-[40px] h-[40px] rounded-primary p-2 bg-surface-300"
        />
        <div
          v-else
          class="transition-all flex items-center justify-center w-[40px] h-[40px] rounded-primary bg-surface-300"
        >
          <IconImages :size="16" />
        </div>
        <h6 class="font-medium max-w-20 truncate">
          {{ fileName ? fileName : previewURL.split("/").slice(3).join("/") }}
        </h6>
      </div>
    </template>
    <template #end>
      <Button
        v-if="previewURL && !waiting"
        variant="ghost"
        class="p-2"
        @click="emits('update:modelValue', null)"
      >
        <IconX :size="20" />
      </Button>
      <Button
        class="px-4 py-2 text-sm"
        :waiting="props.waiting"
        @click="isOpen = !isOpen"
      >
        {{ $t("layers.ui.index.file.fileUpload.button.select") }}
      </Button>
    </template>
  </ViewportCard>
</template>

<style scoped>
.container {
  --transition: 350ms;
  --folder-W: 120px;
  --folder-H: 80px;
  height: calc(var(--folder-H) * 1.7);
}

.folder {
  position: absolute;
  top: -20px;
  left: calc(50% - 60px);
  animation: float 2.5s infinite ease-in-out;
  transition: transform var(--transition) ease;
}

.folder:hover {
  transform: scale(1.05);
}

.folder .front-side,
.folder .back-side {
  position: absolute;
  transition: transform var(--transition);
  transform-origin: bottom center;
}

.folder .back-side::before,
.folder .back-side::after {
  content: "";
  display: block;
  background-color: white;
  opacity: 0.5;
  width: var(--folder-W);
  height: var(--folder-H);
  position: absolute;
  transform-origin: bottom center;
  border-radius: 15px;
  transition: transform 350ms;
}

.container:hover .back-side::before {
  transform: rotateX(-5deg) skewX(5deg);
}
.container:hover .back-side::after {
  transform: rotateX(-15deg) skewX(12deg);
}

.folder .front-side {
  z-index: 1;
}

.container:hover .front-side {
  transform: rotateX(-40deg) skewX(15deg);
}

.folder .tip {
  background: linear-gradient(135deg, #ff9a56, #ff6f56);
  width: 80px;
  height: 20px;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: -10px;
  z-index: 2;
}

.folder .cover {
  background: linear-gradient(135deg, #ffe563, #ffc663);
  width: var(--folder-W);
  height: var(--folder-H);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
