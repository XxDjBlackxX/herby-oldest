<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

interface Props {
  items: any[];
  class?: string;
}

const props = defineProps<Props>();

const firstRow = computed(() => props.items.slice(0, 5));
const secondRow = computed(() => props.items.slice(5, 10));
const thirdRow = computed(() => props.items.slice(10, 15));

const container = ref<HTMLElement | null>(null);
const scrollYProgress = ref(0);

let ticking = false;
const onScroll = () => {
  if (!container.value) return;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const rect = container.value!.getBoundingClientRect();
      const progress = -rect.top / (rect.height - window.innerHeight);
      scrollYProgress.value = Math.min(Math.max(progress, 0), 1);
      ticking = false;
    });
    ticking = true;
  }
};

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  const clamped = Math.min(Math.max(value, inMin), inMax);
  const ratio = (clamped - inMin) / (inMax - inMin);
  return outMin + ratio * (outMax - outMin);
}

const springOptions = { stiffness: 0.1, damping: 0.8 };

const translateXRaw = computed(() =>
  mapRange(scrollYProgress.value, 0, 1, 0, 1000),
);
const translateX = useSpring(translateXRaw, springOptions);
const translateXVal = computed(() => translateX.value);

const translateXReverseRaw = computed(() =>
  mapRange(scrollYProgress.value, 0, 1, 0, -1000),
);
const translateXReverse = useSpring(translateXReverseRaw, springOptions);
const translateXReverseVal = computed(() => translateXReverse.value);

const rotateXRaw = computed(() =>
  mapRange(scrollYProgress.value, 0, 0.2, 15, 0),
);
const rotateX = useSpring(rotateXRaw, springOptions);
const rotateXVal = computed(() => rotateX.value);

const opacityRaw = computed(() =>
  mapRange(scrollYProgress.value, 0, 0.2, 0.2, 1),
);
const opacity = useSpring(opacityRaw, springOptions);
const opacityVal = computed(() => opacity.value);

const rotateZRaw = computed(() =>
  mapRange(scrollYProgress.value, 0, 0.2, 20, 0),
);
const rotateZ = useSpring(rotateZRaw, springOptions);
const rotateZVal = computed(() => rotateZ.value);

const translateYRaw = computed(() =>
  mapRange(scrollYProgress.value, 0, 0.1, -100, 500),
);
const translateY = useSpring(translateYRaw, springOptions);
const translateYVal = computed(() => translateY.value);
</script>

<template>
  <div
    ref="container"
    :class="
      $cn(
        'w-screen overflow-hidden antialiased relative pt-[30vh]',
        props.class,
      )
    "
    style="perspective: 1000px; transform-style: preserve-3d"
  >
    <div class="absolute flex items-center justify-center w-full z-10">
      <span class="flex flex-col justify-center items-center container">
        <slot name="header" />
      </span>
    </div>
    <div
      :style="{
        transform:
          'rotateX(' +
          rotateXVal +
          'deg) rotateZ(' +
          rotateZVal +
          'deg) translateY(' +
          translateYVal +
          'px)',
        opacity: opacityVal,
        willChange: 'transform, opacity',
      }"
    >
      <!-- First Row -->
      <div class="flex flex-row-reverse space-x-reverse mb-20 w-full">
        <template v-for="(item, index) in firstRow" :key="index">
          <div
            :style="{ transform: `translateX(${translateXVal}px)` }"
            class="h-96 w-[30rem] relative flex-shrink-0"
          >
            <slot name="item" v-bind="item" />
          </div>
        </template>
      </div>
      <!-- Second Row -->
      <div class="flex flex-row mb-20">
        <template v-for="(item, index) in secondRow" :key="index">
          <div
            :style="{ transform: `translateX(${translateXReverseVal}px)` }"
            class="h-96 w-[30rem] relative flex-shrink-0"
          >
            <slot name="item" v-bind="item" />
          </div>
        </template>
      </div>
      <!-- Third Row -->
      <div class="flex flex-row-reverse space-x-reverse space-x-20">
        <template v-for="(item, index) in thirdRow" :key="index">
          <div
            :style="{ transform: `translateX(${translateXVal}px)` }"
            class="h-96 w-[30rem] relative flex-shrink-0"
          >
            <slot name="item" v-bind="item" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
