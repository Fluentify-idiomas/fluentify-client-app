import { useContext } from "react";
import { ExerciseContext } from "./exercise.context";

export const useExercise = () => useContext(ExerciseContext);