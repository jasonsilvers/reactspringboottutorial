import React from 'react';
import './App.css';
import StudentsList from "./student/StudentsList";
import Grid from '@material-ui/core/Grid';
import {createMuiTheme, ThemeProvider, responsiveFontSizes} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {SnackbarProvider} from 'notistack';

let theme = createMuiTheme({
    typography: {
        "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    }
});

theme = responsiveFontSizes(theme);

function App() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <SnackbarProvider maxSnack={3}>
                <div>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <StudentsList/>
                    </Grid>
                </div>
            </SnackbarProvider>
        </ThemeProvider>

    )
}

export default App;
