import { ref, watch } from "vue";

export function useSpring(
  source: { value: number },
  options = { stiffness: 0.1, damping: 0.8 },
) {
  const value = ref(source.value);
  let velocity = 0;

  const animate = () => {
    const delta = source.value - value.value;
    velocity = velocity + delta * options.stiffness;
    velocity *= options.damping;
    value.value += velocity;

    if (Math.abs(delta) > 0.001 || Math.abs(velocity) > 0.001) {
      requestAnimationFrame(animate);
    } else {
      value.value = source.value;
    }
  };

  watch(
    source,
    () => {
      animate();
    },
    { immediate: true },
  );

  return value;
}
