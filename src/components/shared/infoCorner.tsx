import { headers } from "@/tailwind/global";
import { tv } from "tailwind-variants";
import { Btn, Avatar } from "@/components";
import Image from "next/image";
import Timer from "./timer";
import { useQuizContext } from "@/context/quizContext";

const classesInfoCorner = tv({
  slots: {
    container: "flex flex-col gap-4 h-full",
    infoContent:
      "text-base rounded-md bg-white overflow-hidden flex-grow gap-5",
    header: "aspect-video bg-gray-200 relative",
    body: "flex flex-col gap-5 p-5 pt-14 justify-center items-center relative",
    avatarLoc: "absolute -top-32",
    title:
      headers({ size: "2xl", color: "blue" }) + " text-center font-bold p-4",
    titleLine: "block w-[100px] h-[2px] bg-blue-light mx-auto mt-2",
    text:
      headers({ size: "lg", color: "blue" }) + " text-center font-light p-4",
    infoFooter: "h-auto flex gap-3",
  },
});

export default function InfoCorner() {
  const classes = classesInfoCorner();
  const { startTimer, setQuizStarted, quizStarted } = useQuizContext();
  return (
    <div className={classes.container()}>
      <div className={classes.infoContent()}>
        <div className={classes.header()}>
          <Image
            src="/images/city_scape.jpg"
            alt={"Cityscape of Kansstad"}
            fill
            style={{ objectFit: "cover" }}
          />
          <div className="absolute bg-blue-darkest/50 w-full h-full left-0 top-0" />
          <Timer type="quiz" />
        </div>

        <div className={classes.body()}>
          <div className={classes.avatarLoc()}>
            <Avatar
              src={`/avatars/avatar_3.png`}
              animation={true}
              alt="Avatar of Kansstad"
            />
          </div>
          {!quizStarted ? (
            <>
              <h2 className={classes.title()}>
                Welkom in Kansstad
                <span className={classes.titleLine()} />
              </h2>
              <p className={classes.text()}>
                We kunnen samen deze oude, ingedommelde stad omturnen tot een
                bruisende stad van de toekomst. Hoe? Met een beetje visie, een
                gezonde dosis goesting en een streepje innovatie. Geen tijd te
                verliezen dus, we gaan meteen aan de slag!
              </p>
            </>
          ) : (
            <>
              <h2 className={classes.title()}>
                Selecteer jouw kans
                <span className={classes.titleLine()} />
              </h2>
              <p className={classes.text()}>
                Ik heb een paar boeiende kansen voor jou gezien in onze buurt.
                Ik heb ze op de kaart aangeduid.{" "}
              </p>
              <p className={classes.text()}>
                Kijk eens rond en laat me weten welke kans jij met beide handen
                wilt grijpen.
              </p>
            </>
          )}

          {!quizStarted && (
            <Btn
              variant="primary"
              action={() => {
                startTimer();
                setQuizStarted(true);
              }}
              label="Spel starten"
            />
          )}
        </div>
      </div>
      <div className={classes.infoFooter()}>
        <Btn
          variant="secondary"
          action={() => console.log("More info")}
          label={"<"}
          square
        >
          <svg
            width="14"
            height="20"
            viewBox="0 0 14 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.03125 0C3.90625 0 1.875 1.28906 0.273438 3.59375C0 3.98438 0.078125 4.57031 0.507812 4.84375L2.1875 6.13281C2.57812 6.44531 3.16406 6.36719 3.47656 5.97656C4.45312 4.76562 5.19531 4.0625 6.71875 4.0625C7.92969 4.0625 9.41406 4.80469 9.41406 5.97656C9.41406 6.875 8.67188 7.30469 7.5 7.96875C6.09375 8.75 4.25781 9.72656 4.25781 12.1484V12.5C4.25781 13.0469 4.6875 13.4375 5.19531 13.4375H8.04688C8.55469 13.4375 8.98438 13.0469 8.98438 12.5V12.3047C8.98438 10.625 13.8672 10.5469 13.8672 6.01562C13.8672 2.61719 10.3125 0 7.03125 0ZM6.64062 14.6094C5.11719 14.6094 3.90625 15.8203 3.90625 17.3047C3.90625 18.7891 5.11719 20 6.64062 20C8.125 20 9.33594 18.7891 9.33594 17.3047C9.33594 15.8203 8.125 14.6094 6.64062 14.6094Z"
              fill="white"
            />
          </svg>
        </Btn>
        <Btn
          variant="secondary"
          action={() => console.log("More info")}
          label={">"}
          square
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.2578 0H17.3828C17.1484 0 16.9141 0.234375 16.9141 0.46875C16.9141 0.507812 16.9141 0.507812 16.9141 0.507812L17.0703 3.75C15.3125 1.64062 12.6562 0.3125 9.72656 0.3125C4.375 0.3125 0 4.6875 0.0390625 10.0391C0.0390625 15.3906 4.375 19.6875 9.72656 19.6875C12.2266 19.6875 14.4922 18.75 16.2109 17.2266C16.2891 17.1094 16.3672 16.9922 16.3672 16.875C16.3672 16.7188 16.2891 16.6016 16.2109 16.5234L14.8828 15.1953C14.8047 15.1172 14.6875 15.0781 14.5703 15.0781C14.4531 15.0781 14.3359 15.1172 14.2578 15.1953C13.0469 16.25 11.4453 16.875 9.72656 16.875C5.89844 16.875 2.85156 13.8281 2.85156 10C2.85156 6.21094 5.89844 3.125 9.72656 3.125C12.0703 3.125 14.1797 4.33594 15.4297 6.17188L11.4453 5.97656C11.4453 5.97656 11.4453 5.97656 11.4062 5.97656C11.1719 5.97656 10.9375 6.21094 10.9375 6.44531H10.9766V8.32031C10.9766 8.55469 11.1719 8.78906 11.4453 8.78906H19.2578C19.4922 8.78906 19.7266 8.55469 19.7266 8.32031V0.46875C19.7266 0.234375 19.4922 0 19.2578 0Z"
              fill="white"
            />
          </svg>
        </Btn>
        <Btn
          variant="secondary"
          action={() => console.log("More info")}
          label={">"}
          square
        >
          <svg
            width="25"
            height="20"
            viewBox="0 0 25 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.625 13.7109C8.20312 13.7109 6.25 15.1172 6.25 16.8359C6.25 18.5938 8.20312 19.9609 10.625 19.9609C13.0078 19.9609 15 18.5938 15 16.8359V16.6406L11.2891 13.7891C11.0547 13.75 10.8203 13.75 10.625 13.7109ZM24.7266 17.8906L15 10.3125V5.78125L17.8516 4.92188C18.3594 4.76562 18.75 4.29688 18.75 3.75V1.21094C18.7109 0.546875 18.1641 0 17.5 0C17.3438 0 17.2266 0 17.1094 0.0390625L13.3594 1.13281C12.8516 1.28906 12.5 1.79688 12.5 2.34375V8.39844L1.75781 0.117188C1.64062 0.0390625 1.52344 0 1.36719 0C1.17188 0 0.976562 0.078125 0.898438 0.234375L0.117188 1.21094C0.0390625 1.32812 0 1.44531 0 1.60156C0 1.79688 0.078125 1.95312 0.234375 2.07031L23.2031 19.8438C23.3203 19.9219 23.4375 20 23.5938 20C23.7891 20 23.9844 19.8828 24.1016 19.7266L24.8438 18.75C24.9219 18.6328 24.9609 18.5156 24.9609 18.3594C24.9609 18.1641 24.8828 18.0078 24.7266 17.8906Z"
              fill="white"
            />
          </svg>
        </Btn>
      </div>
    </div>
  );
}
