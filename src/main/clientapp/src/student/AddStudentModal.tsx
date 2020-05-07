import React, {FunctionComponent, useState} from 'react';
import {createStyles, Theme} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import AddStudentForm from "../forms/AddStudentForm";
import {TransitionProps} from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";

interface OwnProps {
    onSuccess: () => void,
}

type Props = OwnProps;

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) => {
        return createStyles({
            fab: {
                position: 'fixed',
                bottom: theme.spacing(2),
                right: theme.spacing(2),
            },
        });
    },
);


const AddStudentModal: FunctionComponent<Props> = (props) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true);
    }

    const handleSuccess = () => {
        setOpen(false);
        props.onSuccess();
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = (values: any) => {
        console.log(values);
    }

    return (
        <div>
            <Fab className={classes.fab} color="primary" aria-label="add" onClick={handleOpen}>
                <AddIcon/>
            </Fab>

            <Dialog open={open} TransitionComponent={Transition} onClose={handleClose}
                    aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
                <DialogTitle id="form-dialog-title">Add Student
                </DialogTitle>
                <DialogContent>
                    <AddStudentForm onSuccess={handleSuccess} />
                </DialogContent>
                {/*<DialogActions>*/}
                {/*    <Button onClick={handleClose} color="primary">*/}
                {/*        Cancel*/}
                {/*    </Button>*/}
                {/*    <Button onClick={handleClose} color="primary">*/}
                {/*        Ok*/}
                {/*    </Button>*/}
                {/*</DialogActions>*/}

            </Dialog>

        </div>
    );
};

export default AddStudentModal;
