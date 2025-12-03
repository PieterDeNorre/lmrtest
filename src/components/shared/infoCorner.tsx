import { headers } from "@/tailwind/global";
import { tv } from "tailwind-variants";
import { Btn, Avatar, Progress, IconsProvider } from "@/components";
import Image from "next/image";
import Timer from "./timer";
import { useQuizContext } from "@/context/quizContext";

const classesInfoCorner = tv({
  slots: {
    container: "flex flex-col gap-4 h-full",
    infoContent:
      "text-base rounded-md bg-white overflow-hidden flex-grow gap-5",
    header: "aspect-video bg-gray-200 relative",
    headerOverlay: "absolute bg-blue-darkest/50 w-full h-full left-0 top-0",
    headerStatus:
      "h-auto w-full absolute top-0 flex justify-between items-center p-2 gap-2",
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
  const { startTimer, setQuizStarted, quizStarted, quizStep } =
    useQuizContext();

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
          <div className={classes.headerOverlay()} />
          <div className={classes.headerStatus()}>
            <Timer />
            {quizStep > 1 && <Progress />}
          </div>
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
        <Btn variant="secondary" action={() => console.log("More info")} square>
          <IconsProvider icon="Questionmark" className="text-white" />
        </Btn>
        <Btn variant="secondary" action={() => console.log("More info")} square>
          <IconsProvider icon="ArrowRotate" className="text-white" />
        </Btn>
        <Btn variant="secondary" action={() => console.log("More info")} square>
          <IconsProvider icon="NoMusic" className="text-white" />
        </Btn>
      </div>
    </div>
  );
}
