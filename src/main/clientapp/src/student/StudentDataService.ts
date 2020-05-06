import axios, {AxiosResponse} from 'axios';
import {Student} from "../interface/api";

const checkStatus = (response: AxiosResponse) => {
    console.log(response);
}

export const getAllStudents = () => axios.get<Student[]>("http://localhost:8080/api/v1/students")
    .then(response => {
        return Promise.resolve(response.data);
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