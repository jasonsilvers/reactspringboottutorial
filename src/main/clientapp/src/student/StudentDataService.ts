import axios from 'axios';
import {StudentCourse, Student} from "../interface/api";

export const getAllStudents: () => Promise<Student[]> = () => axios.get<Student[]>("http://localhost:8080/api/v1/students")
    .then(response => {
        return Promise.resolve(response.data as Student[]);
    })
    .catch(error => {
        console.log(error.response);
        return Promise.reject(error.response)
    });

export const addNewStudent = (student: any) => {
    return axios.post<boolean>("http://localhost:8080/api/v1/students", JSON.stringify(student), {
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => {
        return Promise.resolve(response.data);
    }).catch(error => {
        console.log(error.response);
        return Promise.reject(error.response)
    });
}

export const getStudentsCourses = (studentId: string): Promise<StudentCourse[]> => axios.get<StudentCourse[]>(`http://localhost:8080/api/v1/students/${studentId}/courses`)
    .then(response => {
        return Promise.resolve(response.data as StudentCourse[]);
    })
    .catch(error => {
        console.log(error.response);
        return Promise.reject(error.response)
    });