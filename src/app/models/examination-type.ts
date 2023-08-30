import { Specialization } from "./specialization";

export interface ExaminationTypeDTO {
    examinationTypes: ExaminationType[] 
}

export interface ExaminationType {
    id: number,
    type: string,
    specialization: Specialization;
}