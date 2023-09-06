import { Specialization } from "./specialization";

export interface ExaminationsDTO {
    examinations: Examination[] 
}

export interface Examination {
    id: number,
    duration: string;
    price: number;
    type: string,
    specialization: Specialization;
}