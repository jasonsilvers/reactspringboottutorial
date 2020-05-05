import React from 'react';
import './App.css';
import Students from "./student/Students";
import Grid from '@material-ui/core/Grid';

function App() {

    return (
        <Grid container direction="column" justify="center" alignItems="center" >
            <Students />
        </Grid>
    )
}

export default App;
