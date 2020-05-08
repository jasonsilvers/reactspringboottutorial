import React, {FunctionComponent, useEffect, useReducer, useState} from 'react';
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
import {Grid, Snackbar} from "@material-ui/core";
import AddStudentModal from "./AddStudentModal";
import {getAllStudents} from './StudentDataService';
import {useSnackbar} from "notistack";
import Button from "@material-ui/core/Button";
import CoursesModal from "./CoursesModal";
import {ShowCoursesState} from "../interface/state";
import {httpActionReducer, HttpState} from "../reducers/reducers.t";
import NoData from "../components/NoData";

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 1000,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
            paddingBottom: theme.spacing(4)
        },
        table: {
            minWidth: 800
        },
        head: {
            backgroundColor: "#e1f5fe",
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


const initialState: HttpState<Student> = {
    loading: true,
    error: false,
    errorMsg: '',
    data: []
};

const StudentsList: FunctionComponent<any> = () => {

    const [state, dispatch] = useReducer(httpActionReducer<Student>(), initialState);
    const {enqueueSnackbar} = useSnackbar();
    const [showCourses, setShowCourse] = useState<ShowCoursesState>({open: false, student: {} as Student});

    const classes = useToolbarStyles();

    useEffect(() => {
        fetchStudents();
    }, []);

    const onStudentAddSuccess = () => {
        fetchStudents()
        enqueueSnackbar("Student was added!", {variant: "success"});
    }

    const closeShowCoursesModal = () => {
        setShowCourse({...showCourses, open: false});
    }

    const handleShowCourses = (student: Student) => {
        setShowCourse({open: true, student: student})
    }

    const fetchStudents = () => {
        let message: string;
        getAllStudents().then(students => {
            dispatch({type: 'SUCCESS', payload: students})
        }).catch((error) => {
            if (error) {
                message = error.data.message;
                dispatch({type: 'FAILURE', payload: message})
            } else {
                message = 'Error Connecting to server'
                dispatch({type: 'FAILURE', payload: message});
            }
            enqueueSnackbar(message, {variant: "error"});
        });
    }

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
                <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
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
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.data.map((student) => (
                                <TableRow hover key={student.studentId}>
                                    <TableCell>
                                        <Avatar
                                            className={classes.small}>{`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{student.firstName} {student.lastName}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.gender}</TableCell>
                                    <TableCell padding="default">
                                        <Button variant="outlined" color="primary"
                                                onClick={() => handleShowCourses(student)}>
                                            View Courses
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <AddStudentModal onSuccess={onStudentAddSuccess}/>
                {showCourses.open ?
                    <CoursesModal showCourses={showCourses} closeModal={closeShowCoursesModal}></CoursesModal> :
                    null
                }
            </div>
        );
    }

    if (state.error) {
        return (
            <div>
                <p>{state.errorMsg}</p>
            </div>
        )
    }

    return (
        <div style={{paddingTop: 20}}>
            <NoData message={'No Students'}/>
            <AddStudentModal onSuccess={onStudentAddSuccess}/>
            <Snackbar/>
        </div>
    )
};

export default StudentsList;
