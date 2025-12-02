"use client";
import { useQuizContext } from "@/context/quizContext";
import { gameContainers } from "../../tailwind/global";
import Image from "next/image";
import { MapLocations, InfoCorner } from "@/components";

export default function JobSelection() {
  const { quizStep } = useQuizContext();
  if (quizStep !== 1) return null;
  const classes = gameContainers();
  return (
    <div className={classes.grid()}>
      <div className={classes.frame()}>
        <InfoCorner />
      </div>
      <div className={classes.frame()}>
        <Image src="/images/map.jpg" alt="Jobs" fill className="rounded-md" />
        <MapLocations />
      </div>
    </div>
  );
}
