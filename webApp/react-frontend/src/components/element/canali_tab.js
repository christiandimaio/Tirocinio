import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { Grid,Button } from 'semantic-ui-react';
import {FormControlLabel,Switch} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import CardExampleFluid from './canale_card.js';
import axios from 'axios';

export default class CanaliTab extends React.Component {
    constructor(props){
        super(props)
        this.state={
            canali:[]
        }
    }

    componentWillMount(){
        axios.get('/api/Stazione/'+this.props.nome_stazione+"/Canali")
        .then((response) => {
            console.log(response.data.item);
            this.setState({
                canali: response.data.items,
                stazione: response.data.stazione
                });
            
        })
    }

    
    render(){
        return(
            <React.Fragment>
            <Box display="flex" flexGrow={1} width={1} height={1}>
                        <CardExampleFluid stazione={this.state.stazione} canali={this.state.canali}/>
            </Box>
              
            </React.Fragment>
            
        );
    }
}