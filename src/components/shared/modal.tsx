import { classesNails } from "@/tailwind/global";
import { motion } from "framer-motion";
import { tv } from "tailwind-variants";

const classesModal = tv({
  slots: {
    overlay:
      "fixed inset-0 bg-blue-darkest/70 flex items-center justify-center z-50 ",
    modal:
      "relative bg-white rounded-lg p-10 px-16 shadow-xl items-center flex flex-col gap-7 w-[372px] h-auto justify-center",
    modalText: "text-blue text-center",
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

const Modal = ({
  children,
  open,
}: {
  children: React.ReactNode;
  open: boolean;
}) => {
  const classes = classesModal();
  const nails = classesNails();
  if (!open) return null;
  return (
    <div className={classes.overlay()}>
      <motion.div
        className={classes.modal()}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }}
      >
        {children}
        <div className={nails.nail({ nail: "topleft" })} />
        <div className={nails.nail({ nail: "topright" })} />
        <div className={nails.nail({ nail: "bottomleft" })} />
        <div className={nails.nail({ nail: "bottomright" })} />
      </motion.div>
    </div>
  );
};

export default Modal;
