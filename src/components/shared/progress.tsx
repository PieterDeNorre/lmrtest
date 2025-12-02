import { tv } from "tailwind-variants";

const classesProgress = tv({
  slots: {
    container:
      "flex gap-3 items-center justify-center bg-blue-light p-2 shadow-blue-dark rounded-md px-3",
    progressBar: "w-40 h-5 bg-blue rounded-sm overflow-hidden",
    progress: "h-full bg-yellow transition-all duration-500",
    label: "text-white font-bold text-center text-sm",
  },
});

const Progress = ({
  amount,
  className,
  done,
}: {
  amount: number;
  className: string;
  done: number;
}) => {
  const classes = classesProgress();

  return (
    <div className={className}>
      <div className={classes.container()}>
        <div className={classes.progressBar()}>
          <div
            className={classes.progress()}
            style={{ width: `${(done / amount) * 100}%` }}
          />
        </div>
        <div className={classes.label()}>
          {done} / {amount}
        </div>
        <svg
          width="13"
          height="12"
          viewBox="0 0 13 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.125 7.71875C8.125 7.94727 7.92188 8.125 7.71875 8.125H5.28125C5.05273 8.125 4.875 7.94727 4.875 7.71875V6.5H0V10.1562C0 10.8164 0.558594 11.375 1.21875 11.375H11.7812C12.416 11.375 13 10.8164 13 10.1562V6.5H8.125V7.71875ZM11.7812 2.4375H9.75V1.21875C9.75 0.583984 9.16602 0 8.53125 0H4.46875C3.80859 0 3.25 0.583984 3.25 1.21875V2.4375H1.21875C0.558594 2.4375 0 3.02148 0 3.65625V5.6875H13V3.65625C13 3.02148 12.416 2.4375 11.7812 2.4375ZM8.125 2.4375H4.875V1.625H8.125V2.4375Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};
export default Progress;
