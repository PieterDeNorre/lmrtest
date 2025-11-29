import {tv} from 'tailwind-variants'

export const headers = tv({
  base: 'font-jakarta ',
  variants: {
    size: {
      sm: 'text-2xl ',
      md: 'text-4xl ',
      lg: 'text-6xl ',
    },
    color: {
      black: 'text-black ',
      white: 'text-white ',
      blue: 'text-blue-dark ',
      yellow: 'text-yellow ',
      grey: 'text-grey-light ',
      valid: 'text-valid ',
      error: 'text-error ',
    },
  },
})
