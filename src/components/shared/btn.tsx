import { headers } from "@/tailwind/global";
import { tv } from "tailwind-variants";

type BtnProps = {
  children?: React.ReactNode;
  label?: string;
  action?: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "answer";
  size?: "sm" | "md" | "lg";
  square?: boolean;
  active?: boolean;
  disabled?: boolean;
  selected?: boolean;
  isCorrect?: boolean;
  className?: string;
};

const classesBtn = tv({
  slots: {
    container: "pb-[5px]",
    button: [
      "rounded-md transition-all duration-200 cursor-pointer ",
      "px-4 py-3",
      "border border-transparent",
    ],
    text: [headers({ size: "md" }), "font-bold transition-colors"],
  },
  variants: {
    variant: {
      primary: {
        button: [
          "bg-yellow hover:bg-yellow-dark",
          "shadow-yellow-dark hover:shadow-yellow",
        ],
        text: "text-blue-dark",
      },
      secondary: {
        button: [
          "bg-blue-dark hover:bg-blue-darkest",
          "shadow-blue-darkest hover:shadow-blue-dark",
        ],
        text: "text-white",
      },
      tertiary: {
        button: [
          "bg-white hover:bg-grey-light",
          "shadow-blue-light hover:shadow-yellow-dark",
          "border border-blue-light hover:border-yellow-dark",
        ],
        text: "text-blue-dark",
      },
      answer: {
        button: ["bg-blue-lighter hover:bg-blue-light", "px-5 py-4 h-full"],
        text: "text-blue-darkest",
      },
    },
    size: {
      sm: {
        button: "px-3 py-2 text-sm",
      },
      md: {
        button: "px-4 py-3",
      },
      lg: {
        button: "px-6 py-4 text-lg",
      },
    },
    square: {
      true: {
        button: "h-12 w-14 p-0 flex items-center justify-center",
      },
      false: {
        container: "w-full",
        button: "w-full",
      },
    },
    disabled: {
      true: {
        button: "opacity-50 cursor-not-allowed pointer-events-none",
      },
    },
    selected: {
      true: {
        button: "ring-2 ring-yellow bg-blue-light",
        text: "text-white",
      },
    },
    active: {
      true: {
        button: "shadow-none",
      },
    },
  },
  compoundVariants: [
    {
      variant: "answer",
      selected: true,
      class: {
        button: "bg-blue-light border border-green",
        text: "text-white",
      },
    },
    {
      variant: ["primary", "secondary"],
      square: true,
      class: {
        button: "p-2",
      },
    },
    {
      disabled: true,
      class: {
        button: "hover:bg-current hover:shadow-current",
      },
    },
  ],
  defaultVariants: {
    size: "md",
    disabled: false,
    selected: false,
    active: false,
  },
});

const Btn = ({
  children,
  label,
  action,
  variant,
  size,
  square,
  active = false,
  disabled = false,
  selected = false,
  className,
}: BtnProps) => {
  const classes = classesBtn({
    variant,
    size,
    square,
    active,
    disabled,
    selected,
  });
  return (
    <div className={classes.container() + (className ? ` ${className}` : "")}>
      <button className={classes.button()} onClick={() => action && action()}>
        {children ? children : <span className={classes.text()}>{label}</span>}
      </button>
    </div>
  );
};
export default Btn;
