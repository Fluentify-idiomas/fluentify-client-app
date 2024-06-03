import { createContext } from "react";
import { ExercisesInfo } from "./exercise.provider";

interface IExercise {
  getModuleExercises: (module: number) => Promise<ExercisesInfo>;
}

export const ExerciseContext = createContext({} as IExercise);
