export interface Patient {
    id?: number;
    firstName: string,
    lastName: string,
    userName: string,
    password?: string,
    address: string,
    phone: string,
    email: string,
    profilePic: string | ArrayBuffer
}