<template>
  <span
    :style="{ width: $formatSize(size), height: $formatSize(size) }"
    :class="$cn(shadow ? 'ring-effect-shadow' : 'ring-effect')"
  >
    <i style="--clr: hsl(var(--primary))"></i>
    <i style="--clr: hsl(var(--primary-900))"></i>
    <i style="--clr: hsl(var(--primary-200))"></i>
  </span>
</template>

<script setup lang="ts">
defineProps({ size: { type: Number, default: 16 }, shadow: Boolean });
</script>

<style scoped>
.ring-effect {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ring-effect i {
  position: absolute;
  inset: 0;
  transition: 0.5s;
  border: 2px solid var(--clr);
}
* .ring-effect i:nth-child(1) {
  border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
  animation: animate 6s linear infinite;
}
.ring-effect i:nth-child(2) {
  border-radius: 41% 44% 56% 59%/38% 62% 63% 37%;
  animation: animate 4s linear infinite;
}
.ring-effect i:nth-child(3) {
  border-radius: 41% 44% 56% 59%/38% 62% 63% 37%;
  animation: animate2 10s linear infinite;
}

.ring-effect-shadow {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ring-effect-shadow i {
  position: absolute;
  inset: 0;
  transition: 0.5s;
  border: 2px solid var(--clr);
  filter: drop-shadow(0 0 20px var(--clr));
}
* .ring-effect-shadow i:nth-child(1) {
  border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
  animation: animate 6s linear infinite;
}
.ring-effect-shadow i:nth-child(2) {
  border-radius: 41% 44% 56% 59%/38% 62% 63% 37%;
  animation: animate 4s linear infinite;
}
.ring-effect-shadow i:nth-child(3) {
  border-radius: 41% 44% 56% 59%/38% 62% 63% 37%;
  animation: animate2 10s linear infinite;
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes animate2 {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
