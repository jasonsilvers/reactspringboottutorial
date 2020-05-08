export interface Student {
    studentId: string;
    firstName: string;
    lastName: string;
    email : string;
    gender: Gender

}

export interface StudentCourse {
    courseId: String;
    name: string;
    description: string;
    department: string;
    startDate: Date;
    endDate: Date
    teacher_name: string;
    grade: number;
}

export enum Gender {
    MALE,
    FEMALE
}