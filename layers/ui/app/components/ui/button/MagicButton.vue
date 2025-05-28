<script setup lang="ts">
import type { ButtonProps, ButtonEmits } from ".";
import { useNuxtApp } from "nuxt/app";

const { $cn, $onClick } = useNuxtApp();

interface Props extends ButtonProps {}
interface Emits extends ButtonEmits {}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  class: "",
  disabled: false,
  to: null,
  waiting: false,
});
const emits = defineEmits<Emits>();
</script>

<template>
  <div class="relative inline-block w-fit py-1">
    <div class="relative">
      <button
        :class="
          $cn(
            'transition-all flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-sm text-primary-foreground font-medium rounded-primary w-full relative disabled:opacity-50',
            props.class,
          )
        "
        type="button"
        @click="
          $onClick({
            to,
            external,
            disabled: props.as == 'span',
            callback: () => emits('click'),
          })
        "
      >
        <slot />
      </button>
    </div>
    <div class="absolute inset-0 pointer-events-none">
      <div
        id="style-AQliM"
        class="pointer-events-none absolute z-10 animate-magic-sparkle style-AQliM"
      >
        <svg
          style="filter: drop-shadow(rgb(96, 165, 250) 0px 0px 2px)"
          fill="none"
          viewBox="0 0 68 68"
          height="6"
          width="6"
          class="animate-spin-slow"
        >
          <path
            fill="white"
            d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
          ></path>
        </svg>
      </div>
      <div
        id="style-WCb99"
        class="pointer-events-none absolute z-10 animate-magic-sparkle style-WCb99"
      >
        <svg
          style="filter: drop-shadow(rgb(96, 165, 250) 0px 0px 2px)"
          fill="none"
          viewBox="0 0 68 68"
          height="9"
          width="9"
          class="animate-spin-slow"
        >
          <path
            fill="white"
            d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
          ></path>
        </svg>
      </div>
      <div
        id="style-dBNZV"
        class="pointer-events-none absolute z-10 animate-magic-sparkle style-dBNZV"
      >
        <svg
          style="filter: drop-shadow(rgb(96, 165, 250) 0px 0px 2px)"
          fill="none"
          viewBox="0 0 68 68"
          height="7"
          width="7"
          class="animate-spin-slow"
        >
          <path
            fill="white"
            d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
          ></path>
        </svg>
      </div>
      <div
        id="style-tiisO"
        class="pointer-events-none absolute z-10 animate-magic-sparkle style-tiisO"
      >
        <svg
          style="filter: drop-shadow(rgb(96, 165, 250) 0px 0px 2px)"
          fill="none"
          viewBox="0 0 68 68"
          height="6"
          width="6"
          class="animate-spin-slow"
        >
          <path
            fill="white"
            d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
          ></path>
        </svg>
      </div>
      <div
        id="style-re9B7"
        class="pointer-events-none absolute z-10 animate-magic-sparkle style-re9B7"
      >
        <svg
          style="filter: drop-shadow(rgb(96, 165, 250) 0px 0px 2px)"
          fill="none"
          viewBox="0 0 68 68"
          height="9"
          width="9"
          class="animate-spin-slow"
        >
          <path
            fill="white"
            d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
          ></path>
        </svg>
      </div>
      <div
        id="style-BKG4G"
        class="pointer-events-none absolute z-10 animate-magic-sparkle style-BKG4G"
      >
        <svg
          style="filter: drop-shadow(rgb(96, 165, 250) 0px 0px 2px)"
          fill="none"
          viewBox="0 0 68 68"
          height="5"
          width="5"
          class="animate-spin-slow"
        >
          <path
            fill="white"
            d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
          ></path>
        </svg>
      </div>
      <div
        id="style-NaoVe"
        class="pointer-events-none absolute z-10 animate-magic-sparkle style-NaoVe"
      >
        <svg
          style="filter: drop-shadow(rgb(96, 165, 250) 0px 0px 2px)"
          fill="none"
          viewBox="0 0 68 68"
          height="6"
          width="6"
          class="animate-spin-slow"
        >
          <path
            fill="white"
            d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
          ></path>
        </svg>
      </div>
      <div
        id="style-pwIlv"
        class="pointer-events-none absolute z-10 animate-magic-sparkle style-pwIlv"
      >
        <svg
          style="filter: drop-shadow(rgb(96, 165, 250) 0px 0px 2px)"
          fill="none"
          viewBox="0 0 68 68"
          height="9"
          width="9"
          class="animate-spin-slow"
        >
          <path
            fill="white"
            d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
          ></path>
        </svg>
      </div>
      <div
        id="style-QmcAd"
        class="pointer-events-none absolute z-10 animate-magic-sparkle style-QmcAd"
      >
        <svg
          style="filter: drop-shadow(rgb(96, 165, 250) 0px 0px 2px)"
          fill="none"
          viewBox="0 0 68 68"
          height="5"
          width="5"
          class="animate-spin-slow"
        >
          <path
            fill="white"
            d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
          ></path>
        </svg>
      </div>
      <div
        id="style-VG2eL"
        class="pointer-events-none absolute z-10 animate-magic-sparkle style-VG2eL"
      >
        <svg
          style="filter: drop-shadow(rgb(96, 165, 250) 0px 0px 2px)"
          fill="none"
          viewBox="0 0 68 68"
          height="9"
          width="9"
          class="animate-spin-slow"
        >
          <path
            fill="white"
            d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
#style-AQliM.style-AQliM {
  top: 1%;
  left: 99%;
}
#style-WCb99.style-WCb99 {
  top: 7%;
  left: 1%;
}
#style-dBNZV.style-dBNZV {
  top: 93%;
  left: 23%;
}
#style-tiisO.style-tiisO {
  top: 43%;
  left: 15%;
}
#style-re9B7.style-re9B7 {
  top: 93%;
  left: 9%;
}
#style-BKG4G.style-BKG4G {
  top: 21%;
  left: 88%;
}
#style-NaoVe.style-NaoVe {
  top: 99%;
  left: 95%;
}
#style-pwIlv.style-pwIlv {
  top: 64%;
  left: 99%;
}
#style-QmcAd.style-QmcAd {
  top: 14%;
  left: 45%;
}
#style-VG2eL.style-VG2eL {
  top: 2%;
  left: 48%;
}

@keyframes sparkle {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.animate-magic-sparkle {
  animation: sparkle 2s infinite;
}

.style-AQliM {
  animation-delay: 0.5s;
}
.style-WCb99 {
  animation-delay: 0.33s;
}
.style-dBNZV {
  animation-delay: 0.6s;
}
.style-tiisO {
  animation-delay: 0.9s;
}
.style-re9B7 {
  animation-delay: 1.2s;
}
.style-BKG4G {
  animation-delay: 1.5s;
}
.style-NaoVe {
  animation-delay: 1.8s;
}
.style-pwIlv {
  animation-delay: 1.9s;
}
.style-QmcAd {
  animation-delay: 1.4s;
}
.style-VG2eL {
  animation-delay: 1.7s;
}
</style>
