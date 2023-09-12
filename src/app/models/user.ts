import { Doctor } from "./doctor"
import { Patient } from "./patient"

export type UserRole = 'visitor' | 'patient' | 'doctor' | 'manager'

export interface User {
    role: UserRole
    data?: Patient | Doctor
}