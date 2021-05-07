import React, { Component } from 'react'
import { Header, Icon, Modal,Button } from 'semantic-ui-react'
import {TextField,Snackbar, DialogActions} from '@material-ui/core';
import {Grid} from 'semantic-ui-react';
import Selecter from './selecter';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green,red } from '@material-ui/core/colors';
import { Divider } from 'semantic-ui-react'
import DateTimePicker from './date_picker.js'
import MuiALert from '@material-ui/lab/Alert';
import axios from 'axios';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddSensor(props){
        const [componenteBase,setComponenteBase] = React.useState({
            produttore:"",
            nome:""
        });

        const handleComponenteBaseChange = (prop) => (event) => {
            setComponenteBase({ ...componenteBase, [prop]: event.target.value });
        };
        // Per il render guardare JSX + Material UI + Semantic UI React + eventuali componenti custom
        return (
           
                <Dialog   open={props.open}
                          centered={true} disableBackdropClick disableEscapeKeyDown  style={{zIndex:1}}>
                    <DialogTitle>Aggiungi nuovo Sensore</DialogTitle>
                    <DialogContent>
                    
                        <Modal.Description>
                        <Grid style={{zIndex:1}} padded>
                        
                            <Grid.Row columns={3}>
                                <Grid.Column >
                                    <TextField  id="produttoreSensore_textfield" label="Produttore" variant="outlined" 
                                                    helperText={"Produttore del componente"} style={{zIndex:2}}
                                                />
                                </Grid.Column>
                                <Grid.Column >
                                    <TextField  id="produttoreSensore_textfield" label="Produttore" variant="outlined" 
                                                    helperText={"Produttore del componente"} style={{zIndex:2}}
                                                />
                                </Grid.Column>
                                <Grid.Column >
                                    <TextField  id="produttoreSensore_textfield" label="Produttore" variant="outlined" 
                                                    helperText={"Produttore del componente"} style={{zIndex:2}}
                                                />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        </Modal.Description>
                    </DialogContent>
                    <DialogActions>
                        <Button negative >
                            Cancella
                        </Button>
                        <Button
                            onClick={() => {this.addOperation()}}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Salva'
                        />
                    </DialogActions>
                    
                </Dialog>
        )
}