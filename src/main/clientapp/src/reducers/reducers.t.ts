import {Student} from "../interface/api";

export type HttpAction<T> =
    | { type: "SUCCESS"; payload: T[] }
    | { type: "FAILURE"; payload: string };

export type HttpState<T> = {
    loading: boolean,
    error: boolean,
    errorMsg: string,
    data: T[]
}

export const httpActionReducer = <T>() =>(state: HttpState<T>, action: HttpAction<T>): HttpState<T> => {
    switch (action.type) {
        case "SUCCESS": {
            return {
                loading: false,
                error: false,
                errorMsg: '',
                data: action.payload
            };
        }
        case "FAILURE": {
            return {
                loading: false,
                error: true,
                errorMsg: action.payload,
                data: []
            }
        }
        default:
            return state;
    }
}