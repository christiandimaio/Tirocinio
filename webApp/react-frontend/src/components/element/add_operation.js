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
import axios from 'axios';
export default class AddOperation extends Component {
    _isMounted=false
    constructor(props){
        super(props);
        this.state={ 
            tipo_operazione:"Installazione",
            data_fine_operazione:"",
            data_inizio_operazione:"",
            seriale_componente:"",
            verifica_componente:{
                verificato:false,
                messaggio:"*Campo Richiesto"
            },
            componente:{
                produttore:"",
                nome:"",
                larghezza:"",
                altezza:"",
                profondita:"",
            },
            operatore_incaricato:"",
            note:""
        }
    }
    

    componentWillReceiveProps(nextProps){
        if(nextProps.open!==this.props.open){
            //Perform some operation
            this.setState({modalOpen: nextProps.open });
          
        }
        }
    componentDidMount(){
        this._isMounted=true
        axios.get("api/Operatori/selecter")
            .then((response) => {
                console.log(response.data);
                if(this._isMounted){
                    this.setState({
                        operatori_list: response.data.items
                    })
                }
            })
            .catch((error) => {
                if(this._isMounted){
                    this.setState({database_operatori:["Default"]})
                }
                
            });
    }
    handleClose = () => this.setState({ modalOpen: false })
    
    handleTipoOperazioneChange = (event,name) => this.setState({tipo_operazione:event.target.value})

    handleSerialeChange = (event) => this.setState({seriale_componente:event.target.value})

    handleDateInzioOperazioniChange = (value) => {
        if(value instanceof Date && !isNaN(value)){
            this.setState({data_inizio_operazione:(value.getFullYear()+"/"+(value.getMonth()+1)+"/"+value.getDate())});
        }
    }
    handleDateFineOperazioniChange = (value) => {
        if(value instanceof Date && !isNaN(value)){
            this.setState({data_fine_operazione:(value.getFullYear()+"/"+(value.getMonth()+1)+"/"+value.getDate())});
        }
    }

    handleOperatoreIncaricatoChange = (event) => this.setState({operatore_incaricato:event.target.value})

    handleNotaChange = (event) => this.setState({note:event.target.value})

    handleCheckComponenteSeriale = () => {
        axios.get("api/Stazione/"+this.props.station_id+"/Componente/"+this.state.seriale_componente)
            .then((response) => {
                console.log(response)
                if(response.data.operationCode == 404){
                    this.setState(state => (state.verifica_componente.verificato  = false, state));
                    this.setState(state => (state.verifica_componente.messaggio  = "Non trovato!", state));
                }else{
                    if((response.data.items != null)){
                        if (response.data.possible_to_install){
                            this.setState(state => (state.verifica_componente.verificato  = true, state));
                            this.setState(state => (state.verifica_gps.messaggio  = "Trovato! Installabile", state));
                        }else {
                            this.setState(state => (state.verifica_gps.risultato  = false, state));
                            this.setState(state => (state.verifica_gps.messaggio  = "Già installato presso altra stazione", state));
                        }
                    }else{
                        this.setState(state => (state.verifica_gps.risultato  = false, state));
                        this.setState(state => (state.verifica_gps.messaggio  = "Questo seriale non appartiene ad un GPS", state));
                    }
                }
            })
    }
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
                                    customHandler:this.handleTipoOperazioneChange,helperText:"*Campo richiesto",name:"tipo_stazione",error:false}}
                                    items={[{"key":"Installazione","value":"Installazione"},{"key":"Manutenzione","value":"Manutenzione"},
                                            {"key":"Rimozione","value":"Rimozione"}]}/>
                                </Grid.Column>
                                <Grid.Column >
                                    <DateTimePicker properties={{
                                                                    width:"90%",
                                                                    id:"datainizio_picker",
                                                                    label:"Data Inizio Operazione",
                                                                    name:"data_inizio_op"
                                                                    }}
                                                        onChange={this.handleDateInzioOperazioniChange}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <DateTimePicker properties={{
                                                                    width:"90%",
                                                                    id:"datafine_picker",
                                                                    label:"Data Fine Operazione",
                                                                    name:"data_fine_op"
                                                                    }}
                                                        onChange={this.handleDateFineOperazioniChange}/>
                                </Grid.Column>
                            </Grid.Row>
                            <Divider horizontal>
                                <Header as='h4'>
                                    <Icon name='setting' />
                                    Selezione Componente
                                </Header>
                            </Divider>
                            <Grid.Row style={{paddingBottom:0}} style={{paddingBottom:0}}>
                                    <Grid.Column width={5}  >   
                                        <TextField  id="seriale_componente_textfield" label="N. Seriale Componente" variant="outlined" required 
                                            helperText="*Campo Richiesto"  value={this.state.seriale_componente}
                                            onChange={this.handleSerialeChange}>
                                        </TextField>
                                    </Grid.Column>
                                    <Grid.Column width={2} >
                                        <IconButton aria-label="delete" onClick={() => {this.setState({test:"OK"})}}>
                                            <CheckCircleIcon fontSize="large" style={{ color: green[500] }} />
                                        </IconButton>
                                    </Grid.Column>
                                    <Grid.Column  width={6} floated="right">
                                        <TextField disabled id="produttore_textfield" label="Produttore" variant="standard"  fullWidth/>             
                                    </Grid.Column>
                            </Grid.Row>
                                <Grid.Row style={{paddingBottom:0,paddingTop:0}}>
                                    
                                    <Grid.Column width={6} floated="right">
                                        <TextField disabled id="nome_textfield" label="Nome Componente" variant="standard"  fullWidth
                                                        >
                                            </TextField>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{paddingBottom:0,paddingTop:0}}>
                                    <Grid.Column width={6} floated="right">
                                        <TextField  disabled id="larghezza_textfield" label="Larghezza (mm)" variant="standard"  fullWidth
                                        >
                                            </TextField>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{paddingBottom:0,paddingTop:0}}>
                                    <Grid.Column width={6} floated="right">
                                        <TextField disabled id="altezza_textfield" label="Altezza (mm)" variant="standard"  fullWidth
                                                        >
                                            </TextField>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{paddingBottom:0,paddingTop:0}}>
                                    <Grid.Column width={6} floated="right">
                                        <TextField disabled id="profondita_textfield" label="Profondità (mm)" variant="standard"  fullWidth
                                                        >
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
                                    properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Operatore",style:{flexGrow:1},value:"",
                                    customHandler:this.handleResponsabileChange,helperText:"*Campo richiesto",required:true,name:"Operatore",error:false}}
                                    items={this.state.operatori_list}/>
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
