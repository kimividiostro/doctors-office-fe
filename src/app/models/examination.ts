import { Specialization } from "./specialization";

export interface ExaminationsDTO {
    examinations: Examination[] 
}

export interface Examination {
    id?: number,
    durationInMinutes: number;
    price: number;
    type: string,
    specialization: Specialization;
    isPendingApproval?: boolean
}