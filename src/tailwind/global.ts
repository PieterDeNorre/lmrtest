import { tv } from "tailwind-variants";

export const headers = tv({
  base: "font-jakarta ",
  variants: {
    size: {
      base: "text-base ",
      sm: "text-sm ",
      md: "text-md ",
      lg: "text-lg ",
      xl: "text-xl ",
      "2xl": "text-2xl ",
      "3xl": "text-3xl ",
      "4xl": "text-4xl ",
      "5xl": "text-5xl ",
      "6xl": "text-6xl ",
    },
    color: {
      black: "text-black ",
      white: "text-white ",
      blue: "text-blue-dark ",
      yellow: "text-yellow ",
      grey: "text-grey-light ",
      valid: "text-valid ",
      error: "text-error ",
    },
  },
});
