import { tv } from "tailwind-variants";
import { headers } from "../tailwind/global";

const classesContainer = tv({
  slots: {
    container: 'absolute h-full w-full bg-blue-dark flex items-center justify-center',
    intro: headers({ size: 'md', color: 'yellow' }),
  },
});

export default function Home() {

  const classes = classesContainer();

  return (
    <>
      <div className={classes.container()}>
        <h1 className={classes.intro()}>Hello, World!</h1>
      </div>
    </>
  );
}
