export interface Student {
    studentId: string;
    firstName: string;
    lastName: string;
    email : string;
    gender: Gender

}

export enum Gender {
    MALE,
    FEMALE
}