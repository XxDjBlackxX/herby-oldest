import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/components/**/*.{vue,js,ts}",
    "./modules/ui/components/**/*.{vue,js,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.4rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        primary: {
          foreground: "hsl(var(--primary-foreground))",
          50: "hsl(var(--primary-50))",
          100: "hsl(var(--primary-100))",
          200: "hsl(var(--primary-200))",
          300: "hsl(var(--primary-300))",
          400: "hsl(var(--primary-400))",
          500: "hsl(var(--primary-500))",
          600: "hsl(var(--primary-600))",
          700: "hsl(var(--primary-700))",
          800: "hsl(var(--primary-800))",
          900: "hsl(var(--primary-900))",
          950: "hsl(var(--primary-950))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--surface-100))",
          foreground: "hsl(var(--typography-100))",
          primary: "hsl(var(--primary-500))",
          "primary-foreground": "hsl(var(--primary-700))",
          accent: "hsl(var(--surface-300))",
          "accent-foreground": "hsl(var(--typography-100))",
          border: "hsl(var(--surface-400))",
          ring: "hsl(var(--surface-300))",
        },
        surface: {
          50: "hsl(var(--surface-50))",
          100: "hsl(var(--surface-100))",
          200: "hsl(var(--surface-200))",
          300: "hsl(var(--surface-300))",
          400: "hsl(var(--surface-400))",
          500: "hsl(var(--surface-500))",
          600: "hsl(var(--surface-600))",
          700: "hsl(var(--surface-700))",
          800: "hsl(var(--surface-800))",
          900: "hsl(var(--surface-900))",
          950: "hsl(var(--surface-950))",
        },
        typography: {
          50: "hsl(var(--typography-50))",
          100: "hsl(var(--typography-100))",
          200: "hsl(var(--typography-200))",
          300: "hsl(var(--typography-300))",
          400: "hsl(var(--typography-400))",
          500: "hsl(var(--typography-500))",
          600: "hsl(var(--typography-600))",
          700: "hsl(var(--typography-700))",
          800: "hsl(var(--typography-800))",
          900: "hsl(var(--typography-900))",
          950: "hsl(var(--typography-950))",
        },
      },
      borderRadius: {
        primary: "var(--radius)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        kanit: ["Kanit", "sans-serif"],
        prompt: ["Prompt", "sans-serif"],
        "chakra-petch": ["Chakra Petch", "sans-serif"],
        "ubuntu-mono": ["Ubuntu Mono", "sans-serif"],
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        bold: 700,
        mega: 700,
      },
      spacing: {
        'header': '66px',
      },
      height: {
        'header': '66px',
      },
      dropShadow: {
        "dark-lg": "0 0px 10px rgba(0, 0, 0, 0.5)",
        "light-lg": "0 0px 8px rgba(255, 255, 255, 0.7)",
        "dark-sm": "0 0px 10px rgba(0, 0, 0, 0.3)",
        "light-sm": "0 0px 8px rgba(255, 255, 255, 0.3)",
        "3xl": "0 35px 35px rgba(249, 116, 21)",
        "4xl": [
          "0 35px 35px rgba(249, 116, 21)",
          "0 45px 65px rgba(249, 116, 21)",
        ],
      },
      keyframes: {
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        overlayShow: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        overlayHide: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        contentShow: {
          "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(0.9)" },
          "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
        contentHide: {
          "0%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
          "100%": { opacity: 0, transform: "translate(-50%, -48%) scale(0.9)" },
        },
        slideDownAndFade: {
          from: { opacity: 0, transform: "translateY(-2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: "translateX(2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: "translateY(2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: "translateX(-2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        enterFromRight: {
          from: { opacity: 0, transform: "translateX(200px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        enterFromLeft: {
          from: { opacity: 0, transform: "translateX(-200px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        exitToRight: {
          from: { opacity: 1, transform: "translateX(0)" },
          to: { opacity: 0, transform: "translateX(200px)" },
        },
        exitToLeft: {
          from: { opacity: 1, transform: "translateX(0)" },
          to: { opacity: 0, transform: "translateX(-200px)" },
        },
        scaleIn: {
          from: { opacity: 0, transform: "rotateX(-10deg) scale(0.9)" },
          to: { opacity: 1, transform: "rotateX(0deg) scale(1)" },
        },
        scaleOut: {
          from: { opacity: 1, transform: "rotateX(0deg) scale(1)" },
          to: { opacity: 0, transform: "rotateX(-10deg) scale(0.95)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideIn: {
          from: {
            transform: "translateX(calc(100% + var(--viewport-padding)))",
          },
          to: { transform: "translateX(0)" },
        },
        swipeOut: {
          from: { transform: "translateX(var(--reka-toast-swipe-end-x))" },
          to: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--reka-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--reka-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: "var(--reka-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--reka-collapsible-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "overlay-show": "overlayShow 100ms ease-in-out",
        "overlay-hide": "overlayHide 100ms ease-in-out",
        "content-show": "contentShow 100ms ease-in-out",
        "content-hide": "contentHide 100ms ease-in-out",
        "slide-down-and-fade":
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-left-and-fade":
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up-and-fade":
          "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-right-and-fade":
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scaleIn 200ms ease",
        "scale-out": "scaleOut 200ms ease",
        "fade-in": "fadeIn 200ms ease",
        "fade-out": "fadeOut 200ms ease",
        "enter-from-left": "enterFromLeft 250ms ease",
        "enter-from-right": "enterFromRight 250ms ease",
        "exit-to-left": "exitToLeft 250ms ease",
        "exit-to-right": "exitToRight 250ms ease",
        hide: "hide 100ms ease-in",
        "slide-in": "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "swipe-out": "swipeOut 100ms ease-out",
        "accordion-down": "accordion-down 0.2s ease-in-out",
        "accordion-up": "accordion-up 0.2s ease-in-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
      },
      boxShadow: {
        "shading-down": "inset 0 -15px 80px rgba(0, 0, 0, 0.6)",
        "shading-up": "inset 0 20px 80px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animated"),
    require("tailwindcss-animate"),
    require("tailwindcss-bg-patterns"),
    require("@tailwindcss/line-clamp"),
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: (value) => ({
          perspective: value,
        }),
      });
    }),
  ],
};
