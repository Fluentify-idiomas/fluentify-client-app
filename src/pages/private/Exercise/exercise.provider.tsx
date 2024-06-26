import { axiosInstance } from "@/api/axios";
import { ReactNode } from "react";
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

export interface DataReturned {
  moduleExercises: ExercisesInfo;
  level_id: number;
}

interface ResultData {
  error: any;
  module_info: any;
  level_id: number;
}

export function ExerciseProvider({ children }: Props) {
  async function getModuleExercises(module: number): Promise<ExercisesInfo> {
    const result = await axiosInstance.get(`/exercises/${module}`);
    const resultData: ResultData = result.data;

    return resultData.module_info;
  }

  return (
    <ExerciseContext.Provider
      value={{
        getModuleExercises,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}
