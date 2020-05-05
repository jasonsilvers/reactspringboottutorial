import React, {FunctionComponent, useEffect, useReducer} from 'react';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from "@material-ui/core/Avatar";
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import {Student} from "../interface/api";
import axios from "axios";
import {Grid} from "@material-ui/core";
import AddStudentModal from "./AddStudentModal";
import {getAllStudents} from './StudentDataService';

interface OwnProps {
}

type Props = OwnProps;

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 750,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
            paddingBottom: theme.spacing(4)
        },
        table: {
            minWidth: 650
        },
        title: {
            flex: '1 1 100%',
        },
        small: {
            width: theme.spacing(4),
            height: theme.spacing(4),
            fontSize: 12
        },
        spinner: {
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        }
    })
);

type State = {
    loading: boolean,
    error: boolean,
    errorMsg: string,
    data: Student[]
}

type Action =
    | { type: "SUCCESS"; payload: Student[] }
    | { type: "FAILURE"; payload: string };

const initialState = {
    loading: true,
    error: false,
    errorMsg: '',
    data: []
} as State

const reducer = (state: State, action: Action) => {
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

const Students: FunctionComponent<Props> = (props) => {

    // const [students, setStudent] = useState<Student[]>([] as Student[]);
    // const [error, setError] = useState(false);
    // const [fetching, setFetching] = useState(false);

    const [state, dispatch] = useReducer(reducer, initialState)

    const classes = useToolbarStyles();

    useEffect(() => {
        getAllStudents().then(result => {
            dispatch({type: 'SUCCESS', payload: result.data})
        }).catch(error => {
            dispatch({type: 'FAILURE', payload: error.message})
        });
    }, []);

    if (state.loading) {
        return (
            <div className={classes.spinner}>
                <CircularProgress/>
            </div>
        )
    }

    if (state.data.length > 0 && !state.loading) {
        return (
            <div className={classes.root}>
                <Grid container direction="row" justify="center" alignItems="center" spacing={2} >
                    <Grid item>
                        <h1 className={classes.title}>Students</h1>
                    </Grid>
                    <Grid item>
                        <Avatar>{state.data.length}</Avatar>
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label={"a dense table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell component="th" scope="row">Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Gender</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.data.map((student) => (
                                <TableRow hover key={student.studentId}>
                                    <TableCell><Avatar
                                        className={classes.small}>{`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}</Avatar></TableCell>
                                    <TableCell>{student.firstName} {student.lastName}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.gender}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <AddStudentModal />
            </div>
        );
    }

    if (state.error) {
        return (
            <p>There was an error. Please refresh and try again, {state.errorMsg}</p>
        )
    }

    return (
        <div>
            <p>No Students</p>
        </div>
    )
};

export default Students;
