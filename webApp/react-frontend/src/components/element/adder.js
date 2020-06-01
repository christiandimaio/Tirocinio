import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';


export default class Adder extends React.Component{
  
render(){
        return (
            <div>
            <Tooltip title="Add" aria-label="add" style={{zIndex:2}}>
                <Fab style={{position:"absolute",bottom:"3%",left:"19%"}} color="secondary" >
                <AddIcon />
                </Fab>
            </Tooltip>
            </div>
        );
    }
}