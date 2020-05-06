import React, {useState} from 'react';
import {Button} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

type Props = {
    message: string
}

function useSnackbar() {
    const [isOpen, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    function handleOpen(status: boolean, message: string) {
        setOpen(status)
        setSnackbarMessage(message)
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function SnackBar() {
        return <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={isOpen}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={snackbarMessage}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </div>

    }


    return [handleOpen, SnackBar] as const;

}

export default useSnackbar;