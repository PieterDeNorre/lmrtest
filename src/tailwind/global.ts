import { tv } from "tailwind-variants";

export const headers = tv({
  base: "font-sans",
  variants: {
    size: {
      base: "text-base",
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

export const gameContainers = tv({
  slots: {
    grid: "p-5 xl:p-0 grid grid-rows-[1fr_2fr] md:grid-cols-[1fr_2fr] h-full w-full gap-5",
    frame:
      "relative rounded-lg bg-blue h-full w-full relative overflow-hidden border-16 border-blue md:row-span-2 ",
  },
});

export const classesNails = tv({
  slots: {
    nail: "w-5 h-5 bg-grey rounded-full absolute border-2 border-grey-light inset-shadow-white",
  },
  variants: {
    nail: {
      topleft: {
        nail: "top-3 left-3",
      },
      topright: {
        nail: "top-3 right-3",
      },
      bottomleft: {
        nail: "bottom-3 left-3",
      },
      bottomright: {
        nail: "bottom-3 right-3",
      },
    },
  },
});
