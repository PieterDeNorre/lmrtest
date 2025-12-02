import { headers } from "@/tailwind/global";
import { tv } from "tailwind-variants";

type BtnProps = {
  children?: React.ReactNode;
  label?: string;
  action?: () => void;
  variant?: "primary" | "secondary";
  square?: boolean;
};

const classesBtn = tv({
  slots: {
    container: "pb-[5px]",
    button: "px-4 py-3 rounded-md transition cursor-pointer group",
    text: headers({ size: "md" }) + " font-bold",
  },
  variants: {
    variant: {
      primary: {
        button:
          "bg-yellow hover:bg-yellow-dark shadow-yellow-dark hover:shadow-yellow ",
        text: "text-blue-dark",
      },
      secondary: {
        button:
          "bg-blue-dark hover:bg-blue-darkest shadow-blue-darkest hover:shadow-blue-dark",
        text: "text-white",
      },
    },
    square: {
      true: {
        button: "h-12 w-14 flex items-center justify-center",
      },
      false: {
        container: "w-full",
        button: "w-full",
      },
    },
  },
  defaultVariants: {},
});

const Btn = ({ children, label, action, variant, square }: BtnProps) => {
  const classes = classesBtn({ variant, square });
  return (
    <div className={classes.container()}>
      <button className={classes.button()} onClick={() => action && action()}>
        {children ? children : <span className={classes.text()}>{label}</span>}
      </button>
    </div>
  );
};
export default Btn;
