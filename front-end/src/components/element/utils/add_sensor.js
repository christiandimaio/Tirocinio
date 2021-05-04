import React, { Component } from 'react'
import { Header, Icon, Modal,Button } from 'semantic-ui-react'
import {TextField,Snackbar} from '@material-ui/core';
import {Grid} from 'semantic-ui-react';
import Selecter from './selecter';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green,red } from '@material-ui/core/colors';
import { Divider } from 'semantic-ui-react'
import DateTimePicker from './date_picker.js'
import MuiALert from '@material-ui/lab/Alert';
import axios from 'axios';

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
            <div style={{zIndex:1}}>
                <Modal   open={props.open}
                          centered={true} closeOnDimmerClick={false} style={{zIndex:1}}>
                    <Modal.Header>Aggiungi nuovo Sensore</Modal.Header>
                    <Modal.Content scrolling >
                    
                        <Modal.Description>
                        <Grid style={{zIndex:1}}>
                        
                            <Grid.Row columns={2}>
                                <Grid.Column width={6}>
                                    <TextField  id="produttoreSensore_textfield" label="Produttore" variant="outlined" 
                                                    helperText={"Produttore del componente"} 
                                                />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
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
                    </Modal.Actions>
                    
                </Modal>
        </div>
        )
}