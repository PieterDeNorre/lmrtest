import { tv } from "tailwind-variants";
import { headers } from "@/tailwind/global";
import Avatar from "../shared/avatar";
import { motion } from "framer-motion";

type LevelOptionProps = {
  avatar: string;
  level: string;
  description: string;
  levelIdx?: 0 | 1 | 2 | undefined;
  action: () => void;
};

const levelOptionClasses = tv({
  slots: {
    levelOptionContainer: [
      "relative flex flex-col items-center rounded-lg max-w-[292px]",
      " flex-grow cursor-pointer transition-transform duration-300 group",
    ],
    avatar: [
      "w-32 h-32 rounded-full bg-white flex items-center justify-center",
      "shadow-lg -translate-y-[20%] overflow-hidden group-hover:rotate-360",
      "transition-transform duration-300 group-hover:translate-y-[10%]",
    ],

    avatarImage: "w-32 h-32 object-contain rounded-full border-4 border-white",
    levelDescription:
      "overflow-hidden relative bg-white rounded-lg w-full flex flex-col gap-8 flex-grow flex items-center overflow-hidden pt-[40px] group-hover:shadow-xl transition-transform duration-300 group-hover:scale-105 -z-1",
    level:
      headers({ size: "2xl", color: "blue" }) +
      " text-center font-bold group-hover:text-black",
    titleLine:
      "block w-[100px] h-[2px] bg-blue-light mx-auto mt-2 group-hover:bg-white transition-colors duration-300",
    description:
      headers({ size: "base", color: "blue" }) +
      " text-center flex-grow px-5 font-light pb-10 z-1 group-hover:text-black transition-colors duration-300",
    levelColor:
      "w-full h-3 bg-teal-500 group-hover:h-full transition-all duration-300 absolute bottom-0 left-0 -z-1",
  },
  variants: {
    levelIdx: {
      0: {
        levelColor: "bg-teal-500",
      },
      1: {
        levelColor: "bg-yellow",
      },
      2: {
        levelColor: "bg-pink-dark",
      },
    },
  },
});

export default function LevelOption({
  avatar,
  level,
  description,
  levelIdx = 0,
  action,
}: LevelOptionProps) {
  const classes = levelOptionClasses({ levelIdx });

  return (
    <motion.button
      className={classes.levelOptionContainer()}
      onClick={() => setTimeout(action, 1000)}
      initial={{ opacity: 0, scale: 0, rotate: 360 }}
      animate={{ opacity: 1, scale: 1, rotate: -360 }}
      whileHover={{ scale: 1.05 }}
      transition={{
        duration: 0.5,
        delay: 0.1 * levelIdx,
        ease: [0, 0, 0.2, 1.01],
        damping: 10,
        stiffness: 100,
      }}
    >
      {avatar && (
        <Avatar
          src={`/avatars/avatar_${levelIdx}.png`}
          animation={true}
          alt={`Level ${level} avatar`}
        />
      )}
      <div className={classes.levelDescription()}>
        <h3 className={classes.level()}>
          {level}
          <span className={classes.titleLine()} />
        </h3>
        <div className={classes.description()}>{description}</div>
        <div className={classes.levelColor()} />
      </div>
    </motion.button>
  );
}
