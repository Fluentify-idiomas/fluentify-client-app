import { axiosInstance } from "@/api/axios";
import { ReactNode, useState } from "react";
import { ExerciseContext } from "./exercise.context";

interface Props {
  children: ReactNode;
}

export interface IExercise {
  exercise_id: number;
  text_content_en: string;
  text_content_pt_br: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  option5: string;
}

export interface TextsEnunciated {
  text_content_en: string;
  text_content_pt_br: string;
}

export interface ExercisesInfo {
  texts_enunciated: TextsEnunciated[],
  module_id: number;
  module_name: string;
  exercises: IExercise[]
}

interface ResultData {
  error: any;
  module_info: any;
}

export function ExerciseProvider({ children }: Props) {
  const [exercises, setExercises] = useState({} as ExercisesInfo);

  function seeData(): void {
    console.log(exercises);
  }

  async function getModuleExercises(module: number): Promise<ExercisesInfo> {
    const result = await axiosInstance.get(`/exercises/${module}`);
    const resultData: ResultData = result.data;

    setExercises(resultData.module_info);

    return resultData.module_info;
  }

  return (
    <ExerciseContext.Provider
      value={{
        getModuleExercises,
        seeData,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}
