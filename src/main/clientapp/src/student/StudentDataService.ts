import axios from 'axios';
import {Student} from "../interface/api";

export const getAllStudents = () => axios.get<Student[]>("http://localhost:8080/api/v1/students");

export const addNewStudent = (student: any) => {
   return axios.post<boolean>("http://localhost:8080/api/v1/students", JSON.stringify(student), {
       headers: {
           'content-type': 'application/json'
       }
   });
}