import React, {FunctionComponent, useEffect, useState} from 'react';
import {createStyles, Theme} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {TransitionProps} from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";
import EditStudentForm from "../forms/EditStudentForm";
import {Student} from "../../interface/api";

interface OwnProps {
    editStudentState: {
        open: boolean;
        student: Student;
    };
    onSuccess: () => void;
    closeModal: () => void
}

type Props = OwnProps;

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditStudentModal: FunctionComponent<Props> = ({editStudentState, onSuccess, closeModal}) => {


    const handleSuccess = () => {
        closeModal();
        onSuccess();
    }

    const handleClose = () => {
        closeModal()
    }

    return (
        <div>
            <Dialog open={editStudentState.open} TransitionComponent={Transition} onClose={handleClose}
                    aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
                <DialogTitle id="form-dialog-title">Edit Student
                </DialogTitle>
                <DialogContent>
                    <EditStudentForm student={editStudentState.student} onSuccess={handleSuccess} />
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default EditStudentModal;
