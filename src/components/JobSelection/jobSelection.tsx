"use client";
import { useQuizContext } from "@/context/quizContext";
import { gameContainers } from "../../tailwind/global";
import Image from "next/image";
import { JobLocations, InfoCorner } from "@/components";
import { motion } from "framer-motion";

export default function JobSelection() {
  const { quizStep } = useQuizContext();
  if (quizStep !== 1) return null;
  const classes = gameContainers();
  return (
    <div className={classes.grid()}>
      <motion.div
        className={classes.frame()}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }}
      >
        <InfoCorner />
      </motion.div>
      <motion.div
        className={classes.frame()}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }}
      >
        <Image src="/images/map.jpg" alt="Jobs" fill className="rounded-md" />
        <JobLocations />
      </motion.div>
    </div>
  );
}
