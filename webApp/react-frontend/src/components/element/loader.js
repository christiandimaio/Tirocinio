import React,{ useState ,Component}  from 'react';
import {Box,Grid} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


export default class AnimatedLoader extends React.Component{
    constructor(props){
        super(props);
        
    }

    render(){
        const {properties} = this.props;
        return (
            <Backdrop  style={{zIndex:2,
                color: '#fff'}} open={properties.hidden} >
                <Grid spacing={2} container direction="column" justify="center" alignItems="center">
                <Grid item>
                    <CircularProgress color="secondary" />
                </Grid>
                <Grid item>
                    <h2>{properties.message}</h2>
                </Grid>

                </Grid>
            </Backdrop>

        );
    }
}
