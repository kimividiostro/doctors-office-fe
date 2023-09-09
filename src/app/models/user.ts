import { Doctor } from "./doctor"
import { Patient } from "./patient"

export interface User {
    role: 'visitor' | 'patient' | 'doctor' | 'manager'
    data?: Patient | Doctor
}