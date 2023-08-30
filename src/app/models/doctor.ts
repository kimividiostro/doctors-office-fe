import { Specialization } from "./specialization"

export interface DoctorDTO {
    doctors: Doctor[]
}

export interface Doctor {
    id: number,
    userName: string,
    firstName: string,
    lastName: string,
    address: string,
    phone: string,
    email: string,
    profilePic: string,
    licenceNumber: string,
    officeDepartment: string,
    specialization: Specialization
}