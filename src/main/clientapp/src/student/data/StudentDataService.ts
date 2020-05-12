import axios from 'axios';
import {StudentCourse, Student} from "../../interface/api";

export const getAllStudents: () => Promise<Student[]> = () => axios.get<Student[]>("/api/v1/students")
    .then(response => {
        return Promise.resolve(response.data as Student[]);
    })
    .catch(error => {
        console.log(error.response);
        return Promise.reject(error.response)
    });

export const addNewStudent = (student: any) => {
    return axios.post<boolean>("/api/v1/students", JSON.stringify(student), {
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

export const updateStudent = (student: any, studentId: string) => {
    console.log(student)
    return axios.put(`/api/v1/students/${studentId}`, JSON.stringify(student), {
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => {
        return Promise.resolve(response.data);
    }).catch(error => {
        return Promise.reject(error.response);
    })
}

export const deleteStudent = (studentId: string) => {
    return axios.delete(`/api/v1/students/${studentId}`)
        .then(response => {
            console.log(response);
            return Promise.resolve(response.data);
        }).catch(error => {
            console.log(error);
            return Promise.reject(error.response);
        })
}

export const getStudentsCourses = (studentId: string): Promise<StudentCourse[]> => axios.get<StudentCourse[]>(`/api/v1/students/${studentId}/courses`)
    .then(response => {
        return Promise.resolve(response.data as StudentCourse[]);
    })
    .catch(error => {
        console.log(error.response);
        return Promise.reject(error.response)
    });