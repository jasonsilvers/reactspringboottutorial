import React, {FunctionComponent, useEffect, useReducer} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import {ShowCoursesState} from "../interface/state";
import {getStudentsCourses} from "./StudentDataService";
import {StudentCourse} from "../interface/api";
import {httpActionReducer, HttpState} from "../reducers/reducers.t";
import CircularProgress from "@material-ui/core/CircularProgress";
import CourseList from "./CourseList";
import NoData from "../components/NoData";
import {useSnackbar} from "notistack";
import {Grid} from "@material-ui/core";

interface OwnProps {
    showCourses: ShowCoursesState;
    closeModal: () => void;
}


type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        spinner: {
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(10),
            },
        }
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const initialState: HttpState<StudentCourse> = {
    loading: true,
    error: false,
    errorMsg: '',
    data: []
};

const IsLoading: FunctionComponent<any> = () => {

    return (
        <Grid container direction="row" alignItems="center" justify="center">
            <div style={{padding: 20}}>
                <CircularProgress/>
            </div>
        </Grid>
    )
};

const CoursesModal: FunctionComponent<Props> = ({showCourses, closeModal}) => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(httpActionReducer<StudentCourse>(), initialState);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        console.log(showCourses.student)
        let message: string;
        getStudentsCourses(showCourses.student.studentId).then(result => {
            console.log(result);
            dispatch({type: "SUCCESS", payload: result});
        }).catch(error => {
            if (error) {
                message = error.data.message;
                dispatch({type: 'FAILURE', payload: message})
            } else {
                message = 'Error Connecting to server'
                dispatch({type: 'FAILURE', payload: message});
            }
            enqueueSnackbar(message, {variant: "error"});
        });

    }, [showCourses, enqueueSnackbar]);

    return (
        <Dialog fullScreen open={showCourses.open} onClose={closeModal} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={closeModal} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {showCourses.student.firstName} {showCourses.student.lastName}'s Courses
                    </Typography>
                </Toolbar>
            </AppBar>

            {state.loading ? <IsLoading/> : <CourseList courses={state.data}/>}
            {state.data.length === 0 && !state.loading ? <NoData message={'No Courses'}/> : null}
        </Dialog>
    );
};

export default CoursesModal;
