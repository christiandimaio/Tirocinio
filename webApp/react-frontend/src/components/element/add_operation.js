import React, { Component } from 'react'
import { Header, Icon, Modal,Button } from 'semantic-ui-react'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import {TextField,Box, FormControl} from '@material-ui/core';
import {Grid,Image} from 'semantic-ui-react';
import Selecter from './selecter';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';
import { Divider } from 'semantic-ui-react'
import TransferList from './transfer_list.js'
import DateTimePicker from './date_picker.js'
import Paper from '@material-ui/core/Paper';
export default class AddOperation extends Component {
    _isMounted=false
    constructor(props){
        super(props);
        
    }
    state = { modalOpen:false,
        codice_stazione:"",
        tipo_stazione:"Digitale",
        periodo_manutenzione:null,
        seriale_gps:null,
        latitudine:null,
        longitudine:null,
        altezza_lv_mare:null,
        responsabile_1:null,
        responsabile_2:null,
        responsabile_3:null,
        responsabile_4:null,
        note_aggiuntive:null }

    componentWillReceiveProps(nextProps){
        if(nextProps.open!==this.props.open){
            //Perform some operation
            this.setState({modalOpen: nextProps.open });
          
        }
        }
    componentDidMount(){
        this._isMounted=true
    }
    handleClose = () => this.setState({ modalOpen: false })
    
    handleChange = (name,event) => this.setState({[name]:event.target.value})

    render() {
        
        return (
            <>
                <Modal   open={this.state.modalOpen}
                          centered={false} closeOnDimmerClick={false}>
                    <Modal.Header>Aggiungi nuova operazione per la stazione : {this.props.station_id}</Modal.Header>
                    <Modal.Content scrolling>
                    
                    <Modal.Description>
                        <Grid>
                            <Grid.Row  columns={3}>
                                <Grid.Column>
                                <Selecter
                                    properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Tipo Operazione",style:{flexGrow:1},value:"",
                                    customHandler:this.handleChange,helperText:"*Campo richiesto",name:"tipo_stazione",error:false}}
                                    items={["Installazione","Manutenzione","Rimozione"]}/>
                                </Grid.Column>
                                <Grid.Column >
                                    <DateTimePicker properties={{
                                                                    width:"90%",
                                                                    id:"data-nascita_picker",
                                                                    label:"Data Inizio Operazione",
                                                                    name:"data_nascita"
                                                                    }}
                                                        onChange={this.handleDateChange}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <DateTimePicker properties={{
                                                                    width:"90%",
                                                                    id:"data-nascita_picker",
                                                                    label:"Data Fine Operazione",
                                                                    name:"data_nascita"
                                                                    }}
                                                        onChange={this.handleDateChange}/>
                                </Grid.Column>
                            </Grid.Row>
                            <Divider horizontal>
                                <Header as='h4'>
                                    <Icon name='setting' />
                                    Selezione Componente
                                </Header>
                            </Divider>
                            <Grid.Row >
                                    <Grid.Column width={5}  >
                                    
                                            
                                                <TextField id="seriale_gps_textfield" label="N. Seriale GPS" variant="outlined" required 
                                                    helperText="*Campo Richiesto">
                                                    </TextField>
                                    </Grid.Column>
                                    <Grid.Column width={2} >
                                        <IconButton aria-label="delete" onClick={() => {this.setState({test:"OK"})}}>
                                            <CheckCircleIcon fontSize="large" style={{ color: green[500] }} />
                                        </IconButton>
                                    </Grid.Column>
                                    <Grid.Column  width={6} floated="right">
                                    <TextField id="codice_stazione_textfield" label="Latitudine (Gradi)" variant="outlined" required fullWidth
                                                    helperText="*Campo Richiesto, separatore: '.'">
                                                    </TextField>
                                    </Grid.Column>
                            </Grid.Row>
                            
                                <Grid.Row>
                                    
                                    <Grid.Column width={6} floated="right">
                                        <TextField id="codice_stazione_textfield" label="Latitudine (Gradi)" variant="outlined" required fullWidth
                                                        helperText="*Campo Richiesto, separatore: '.'">
                                            </TextField>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={6} floated="right">
                                        <TextField id="codice_stazione_textfield" label="Latitudine (Gradi)" variant="outlined" required fullWidth
                                                        helperText="*Campo Richiesto, separatore: '.'">
                                            </TextField>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={6} floated="right">
                                        <TextField id="codice_stazione_textfield" label="Latitudine (Gradi)" variant="outlined" required fullWidth
                                                        helperText="*Campo Richiesto, separatore: '.'">
                                            </TextField>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={6} floated="right">
                                        <TextField id="codice_stazione_textfield" label="Latitudine (Gradi)" variant="outlined" required fullWidth
                                                        helperText="*Campo Richiesto, separatore: '.'">
                                            </TextField>
                                    </Grid.Column>
                                </Grid.Row>
                            <Divider horizontal>
                                <Header as='h4'>
                                    <Icon name='user' />
                                    Operatore Incaricato
                                </Header>
                            </Divider>
                            <Grid.Row >
                                <Grid.Column width={6}>
                                    <Selecter
                                        properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Responsabile 1",style:{flexGrow:1},value:"",
                                        customHandler:this.handleChange,helperText:"*Campo richiesto",name:"tipo_stazione",error:false}}
                                        items={["Analogica","Digitale"]}/>
                                </Grid.Column>
                            </Grid.Row>
                            <Divider horizontal>
                                <Header as='h4'>
                                    <Icon name='sticky note outline' />
                                    Note Operazione
                                </Header>
                            </Divider>
                            <Grid.Row columns={1}>
                                <Grid.Column>
                                    <TextField
                                        variant="outlined"
                                        id="standard-multiline-static"
                                        label="Note"
                                        multiline
                                        rows={5}
                                        placeholder="Inserisci nota qui.."
                                        fullWidth
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => {this.props.handleClose()}}>
                            Cancella
                        </Button>
                        <Button
                            
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Salva'
                        />
                    </Modal.Actions>
                </Modal>
        </>
        )
    }
}
