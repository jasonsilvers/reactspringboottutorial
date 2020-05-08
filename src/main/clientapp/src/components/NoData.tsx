import React, {FunctionComponent} from 'react';
import {Grid} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import Typography from "@material-ui/core/Typography";

interface OwnProps {
    message: string;
}

type Props = OwnProps;

const NoData: FunctionComponent<Props> = ({message}) => {

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
                <InboxIcon style={{fontSize: 85}} color="disabled"/>
            </Grid>
            <Grid item>
                <Typography variant="h5" color="textSecondary">{message}</Typography>
            </Grid>

        </Grid>
    );
};

export default NoData;
