<template>
  <component
    :is="icon"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth"
    :default-class="props.class"
  />
</template>

<script setup>
import * as lucideIcons from "lucide-vue-next";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: { type: Number, default: 16 },
  color: { type: String, default: "currentColor" },
  strokeWidth: { type: Number, default: 2 },
  class: { type: String, default: null },
});

const Soundbite = {
  name: "Soundbite",
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": props.strokeWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        width: props.size,
        height: props.size,
      },
      [
        h("path", { d: "M12 22v-4" }),
        h("path", {
          d: "M7 12c-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3 1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5 0 0 2.5.5 6-1-.5-1.5-3.5-3-5-3 1.5-1 4-4 4-6-2.5 0-5.5 1.5-7 3 0-2.5-.5-5-2-7-1.5 2-2 4.5-2 7-1.5-1.5-4.5-3-7-3 0 2 2.5 5 4 6",
        }),
      ],
    );
  },
};

const Kick = {
  name: "Kick",
  props: {
    size: {
      type: Number,
      default: 32,
    },
    strokeWidth: {
      type: Number,
      default: 2,
    },
  },
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 32 32",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": this.strokeWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        width: this.size,
        height: this.size,
      },
      [
        h("path", {
          d: "M23,31H9c-4.4,0-8-3.6-8-8V9c0-4.4,3.6-8,8-8h14c4.4,0,8,3.6,8,8v14C31,27.4,27.4,31,23,31z",
        }),
        h("path", {
          d: "M19.8,16l3.7-4.7C24.8,9.5,23.5,7,21.2,7c-0.9,0-1.7,0.4-2.3,1.1L14,15v-5c0-1.6-1.4-3-3.1-3C9.3,7,8,8.3,8,9.8 v12.4c0,1.6,1.3,2.8,2.9,2.8c1.6,0,3.1-1.4,3.1-3v-4l4.9,5.9c0.5,0.7,1.4,1.1,2.3,1.1c2.3,0,3.7-2.5,2.3-4.3L19.8,16z",
        }),
      ],
    );
  },
};

const Discord = {
  name: "Discord",
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 192 192",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": props.strokeWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        width: props.size,
        height: props.size,
      },
      [
        h("path", {
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "12",
          d: "m68 138-8 16c-10.19-4.246-20.742-8.492-31.96-15.8-3.912-2.549-6.284-6.88-6.378-11.548-.488-23.964 5.134-48.056 19.369-73.528 1.863-3.334 4.967-5.778 8.567-7.056C58.186 43.02 64.016 40.664 74 39l6 11s6-2 16-2 16 2 16 2l6-11c9.984 1.664 15.814 4.02 24.402 7.068 3.6 1.278 6.704 3.722 8.567 7.056 14.235 25.472 19.857 49.564 19.37 73.528-.095 4.668-2.467 8.999-6.379 11.548-11.218 7.308-21.769 11.554-31.96 15.8l-8-16m-68-8s20 10 40 10 40-10 40-10",
        }),
        h("ellipse", {
          cx: "71",
          cy: "101",
          fill: "currentColor",
          rx: "13",
          ry: "15",
        }),
        h("ellipse", {
          cx: "121",
          cy: "101",
          fill: "currentColor",
          rx: "13",
          ry: "15",
        }),
      ],
    );
  },
};

const icons = {
  ...lucideIcons,
  Soundbite,
  Discord,
  Kick,
};

const icon = computed(
  () => icons[props.name.slice(0, 1).toUpperCase() + props.name.slice(1)],
);
</script>
