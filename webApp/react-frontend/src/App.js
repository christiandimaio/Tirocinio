import React from 'react';
import ReactDOM from 'react-dom';
import Sign_Up from './components/sign_up/sign_up';
import {Box,Grid} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
export default class App extends React.Component{

    render(){
        return(
            <Box display="flex" width={1} height={1}>
                <Grid container direction="row" alignItems="center" justify="center" style={{width:"50%",margin:"auto"}}>
                    <Grid item ><Sign_Up/></Grid>     
                </Grid>
            </Box>
            
       
        );
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))
