import Image from "next/image";
import { tv } from "tailwind-variants";

type AvatarProps = {
  src: string;
  animation?: boolean;
  alt: string;
};

const classesAvatar = tv({
  slots: {
    avatar:
      "w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg translate-y-[20%] overflow-hidden",
    avatarImage:
      "w-32 h-32 object-contain rounded-full border-4 border-white scale-100",
  },
  variants: {
    animation: {
      true: {
        avatar:
          "group-hover:rotate-360 group-hover:scale-105 transition-transform duration-300 group-hover:translate-y-[0%]",
      },
      false: {},
    },
  },
});

const Avatar = ({ src, animation, alt }: AvatarProps) => {
  const classes = classesAvatar({ animation: animation });
  return (
    <div className={classes.avatar()}>
      <Image
        src={src}
        alt={alt}
        width={300}
        height={300}
        className={classes.avatarImage()}
      />
    </div>
  );
};

export default Avatar;
