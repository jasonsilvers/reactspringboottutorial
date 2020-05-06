import React from 'react';
import './App.css';
import Students from "./student/Students";
import Grid from '@material-ui/core/Grid';
import {createMuiTheme, ThemeProvider, responsiveFontSizes  } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

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
            <div>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Students/>
                </Grid>
            </div>
        </ThemeProvider>

    )
}

export default App;
