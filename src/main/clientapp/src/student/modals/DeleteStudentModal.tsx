import React, {Dispatch, FunctionComponent, SetStateAction} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {deleteStudent} from "../data/StudentDataService";

interface OwnProps {
    deleteStudentState: {
        open: boolean;
        studentId: string;
    };
    closeModal: (refresh: boolean) => void;
}

type Props = OwnProps;

const DeleteStudentModal: FunctionComponent<Props> = ({deleteStudentState, closeModal}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        closeModal(false);
    };

    const handleDelete = () => {
        console.log(deleteStudentState.studentId)
        deleteStudent(deleteStudentState.studentId)
            .then(response => {
                console.log(response);
            }).catch(error => console.log(error)).finally(() => closeModal(true));
    }

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={deleteStudentState.open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Delete Student"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action cannot be reversed
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        CANCEL
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        DELETE
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteStudentModal;
