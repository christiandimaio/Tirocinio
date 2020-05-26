import React, { Component } from 'react'
import { Header, Icon, Modal,Button } from 'semantic-ui-react'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import {TextField,Box, FormControl,Snackbar} from '@material-ui/core';
import {Grid,Image} from 'semantic-ui-react';
import Selecter from '../element/selecter';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green,red } from '@material-ui/core/colors';
import { Divider } from 'semantic-ui-react'
import TransferList from '../element/transfer_list.js'
import MuiALert from '@material-ui/lab/Alert';
import axios from 'axios';
export default class AddNewStation extends Component {
    _isMounted = false;
    state = { modalOpen: false,
                codice_stazione:"",
                tipo_stazione:"Digitale",
                periodo_manutenzione:1,
                seriale_gps:null,
                latitudine:null,
                longitudine:null,
                altezza_lv_mare:0,
                responsabile_1:null,
                responsabile_2:null,
                responsabile_3:null,
                responsabile_4:null,
                note_aggiuntive:null,
                operatore_installazione:"",
                operatori_list:[],
                verifica_gps:{
                    risultato:false,
                    messaggio:"*Campo Richiesto"
                },
                registrazione:{
                    chiamata: false,
                    stato:false,
                    messaggio:""
                }
            }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => {
        if(this.state.registrazione.stato){
            this.setState({modalOpen:false});
            this.props.callReRender()
        }
        else{
            this.setState(state => (state.registrazione.chiamata  = false, state));
            this.setState({modalOpen:false});
            this.props.callReRender()
        }
    }
    
    
    handleLatitudineChange = (event) => this.setState({latitudine:event.target.value})
    
    handleLongitudineChange = (event) => this.setState({longitudine:event.target.value})

    handleCodiceStazioneChange = (event) => this.setState({codice_stazione:event.target.value})

    handleTipoStazioneChange = (event,name) => this.setState({tipo_stazione:event.target.value})
    
    handleSerialeGpsChange = (event) => this.setState({seriale_gps:event.target.value})

    handleAltezzaMareChange = (event,newValue) => this.setState({altezza_lv_mare:newValue})
    
    handleResponsabileChange = (event,name) => this.setState({[name]:event.target.value})
    
    handleOperatoreInstallazioneChange = (event,name) => this.setState({[name]:event.target.value})

    handleNotaChange = (event) => this.setState({note_aggiuntive:event.target.value})

    makeRequestInsert = () => {
        var info = this.state;
        if (info.codice_stazione == "" || info.tipo_stazione == "" || info.seriale_gps == "" || !(info.verifica_gps.risultato) || 
            !(info.latitudine.includes(".")) || info.latitudine == "" || !(info.longitudine.includes(".")) || info.longitudine == "" || 
            info.responsabile_1 == "" || info.operatore_installazione == ""){
                this.setState(state => (state.registrazione.chiamata  = true, state));
                this.setState(state => (state.registrazione.stato  = false, state));
                this.setState(state => (state.registrazione.messaggio  = "Campi richiesti non inseriti!", state));
                return 
            }
        axios.post('/api/Stazione', {
            codice_stazione:info.codice_stazione,
            tipo_stazione:info.tipo_stazione,
            periodo_manutenzione:info.periodo_manutenzione,
            seriale_gps:info.seriale_gps,
            latitudine:info.latitudine,
            longitudine:info.longitudine,
            altezza_lv_mare:info.altezza_lv_mare,
            responsabile_1:info.responsabile_1,
            responsabile_2:info.responsabile_2,
            responsabile_3:info.responsabile_3,
            responsabile_4:info.responsabile_4,
            note_aggiuntive:info.note_aggiuntive,
            operatore_installazione:info.operatore_installazione
          })
          .then((response) => {
            this.setState(state => (state.registrazione.chiamata  = true, state));
            
            if (response.data["operationCode"] != 200){
                this.setState(state => (state.registrazione.stato  = false, state));
                this.setState(state => (state.registrazione.messaggio  = response.data.message, state));
            
            }else{
                if(this._isMounted){
                    this.setState(state => (state.registrazione.stato  = true, state));
                this.setState(state => (state.registrazione.messaggio  = "Registrazione avvenuta con successo", state));
            
                }
            }
          })
    }
    handleCheckGpsSerial = () => {
        axios.get("api/Componente/Gps/"+this.state.seriale_gps)
            .then((response) => {
                console.log(response)
                if(response.data.operationCode == 404){
                    this.setState(state => (state.verifica_gps.risultato  = false, state));
                    this.setState(state => (state.verifica_gps.messaggio  = "Non trovato!", state));
                }else{
                    if((response.data.info.gps != null)){
                        if (response.data.possible_to_install){
                            this.setState(state => (state.verifica_gps.risultato  = true, state));
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
    render() {
        console.log(this.state)
        return (
            <>
                <Box display="flex" justifyContent="flex-end">
                    <Tooltip title="Add" aria-label="add" style={{zIndex:2}}>
                        <Fab onClick={this.handleOpen} style={{position:"relative"}} color="secondary" >
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Box>
                <Modal   open={this.state.modalOpen}
                        onClose={this.handleClose}  closeOnDimmerClick={false} centered={false}>
                    <Modal.Header>Crea una nuova stazione</Modal.Header>
                    <Modal.Content scrolling>
                    
                    <Modal.Description>
                        <Grid>
                        
                            <Grid.Row columns={4}>
                            <Grid.Column>
                            <TextField id="codice_stazione_textfield" value={this.state.codice_stazione} onChange={this.handleCodiceStazioneChange} label="Codice Stazione" variant="outlined" required fullWidth
                                    helperText="*Campo Richiesto">
                                    </TextField>
                            </Grid.Column>
                            <Grid.Column>
                            <Selecter
                                    properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Tipo Stazione",style:{flexGrow:1},value:"",
                                    customHandler:this.handleTipoStazioneChange,helperText:"*Campo richiesto",name:"tipo_stazione",required:true,error:false}}
                                    items={[{"key":"Analogica","value":"Analogica"},{"key":"Digitale","value":"Digitale"}]}/>
                            </Grid.Column>
                            <Grid.Column>
                                <Selecter
                                        properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Operatore Installazione",style:{flexGrow:1},value:"",
                                        required:true,helperText:"*Campo richiesto",
                                        customHandler:this.handleResponsabileChange,name:"operatore_installazione",error:false}}
                                        items={this.state.operatori_list}/>
                            </Grid.Column>
                            <Grid.Column>
                                <Typography id="discrete-slider-small-steps" gutterBottom>
                                        Mesi validità Manutenzione
                                </Typography>
                                <Slider
                                    defaultValue={1}
                                    getAriaValueText={(value) => {return '$(value)M'}}
                                    aria-labelledby="discrete-slider-small-steps"
                                    step={1}
                                    value={this.state.periodo_manutenzione}
                                    onChange={(e,newValue) => this.setState({periodo_manutenzione:newValue})}
                                    marks
                                    min={1}
                                    max={12}
                                    valueLabelDisplay="auto"
                                />
                            </Grid.Column>
                            </Grid.Row>
                            <Divider horizontal>
                                <Header as='h4'>
                                    <Icon name='info' />
                                    Informazioni Utili
                                </Header>
                            </Divider>
                            <Grid.Row columns={2}>
                                <Grid.Column width={11}>
                                    <Grid>
                                        <Grid.Row centered columns={1}>
                                            <h4>Localizzazione</h4>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={6}>
                                                <TextField id="seriale_gps_textfield" label="N. Seriale GPS" variant="outlined" required 
                                                    helperText={this.state.verifica_gps.messaggio} value={this.state.seriale_gps} error={this.state.verifica_gps.risultato?false:true} onChange={this.handleSerialeGpsChange}>
                                                    </TextField>
                                            </Grid.Column>
                                            <Grid.Column width={3}>
                                                <IconButton aria-label="delete" onClick={this.handleCheckGpsSerial}>
                                                    <CheckCircleIcon fontSize="large" style={this.state.verifica_gps.risultato?{ color: green[500] }:{ color: red[500] }} />
                                                </IconButton>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row columns={2}>
                                            <Grid.Column width={7}>
                                                <TextField id="codice_stazione_textfield" label="Latitudine (Gradi)" variant="outlined" required fullWidth
                                                    helperText="*Campo Richiesto, separatore: '.'" value={this.state.latitudine} onChange={this.handleLatitudineChange}>
                                                    </TextField>
                                            </Grid.Column>
                                            <Grid.Column width={7}>
                                                <TextField id="codice_stazione_textfield" label="Longitudine (Gradi)" variant="outlined" required fullWidth
                                                    helperText="*Campo Richiesto, separatore: '.'" value={this.state.longitudine} onChange={this.handleLongitudineChange}>
                                                    </TextField>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column> 
                                <Grid.Column width={5}>
                                    <Grid  style={{height:"100%"}}>
                                        <Grid.Row  columns={1} style={{height:"20%"}} textAlign='justified'>
                                            <Grid.Column textAlign='center' centered>
                                                <Typography id="vertical-slider" gutterBottom>
                                                    Altezza Lv. Mare (mt.)
                                                </Typography>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row columns={1} style={{height:"80%"}} textAlign='justified'>
                                            <Grid.Column textAlign='center' centered >
                                                <Slider
                                                    style={{maxHeight:"100%"}}
                                                    orientation="vertical"
                                                    defaultValue={0}
                                                    getAriaValueText={(value) => {return value+"mt."}}
                                                    aria-labelledby="discrete-slider-small-steps"
                                                    step={50}
                                                    marks
                                                    min={-100}
                                                    max={1000}
                                                    valueLabelDisplay="auto"
                                                    value = {this.state.altezza_lv_mare}
                                                    onChange={this.handleAltezzaMareChange}
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>   
                            </Grid.Row>
                            <Divider horizontal>
                                <Header as='h4'>
                                    <Icon name='user' />
                                    Responsabili
                                </Header>
                            </Divider>
                            <Grid.Row columns={4}>
                                <Grid.Column>
                                <Selecter
                                    properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Responsabile 1",style:{flexGrow:1},value:"",
                                    customHandler:this.handleResponsabileChange,helperText:"*Campo richiesto",required:true,name:"responsabile_1",error:false}}
                                    items={this.state.operatori_list}/>
                                </Grid.Column>
                                <Grid.Column>
                                <Selecter
                                    properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Responsabile 2",style:{flexGrow:1},value:"",
                                    customHandler:this.handleResponsabileChange,helperText:"",name:"responsabile_2",error:false}}
                                    items={this.state.operatori_list}/>
                                </Grid.Column>
                                <Grid.Column>
                                <Selecter
                                    properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Responsabile 3",style:{flexGrow:1},value:"",
                                    customHandler:this.handleResponsabileChange,helperText:"",name:"responsabile_3",error:false}}
                                    items={this.state.operatori_list}/>
                                </Grid.Column>
                                <Grid.Column>
                                <Selecter
                                    properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Responsabile 4",style:{flexGrow:1},value:"",
                                    customHandler:this.handleResponsabileChange,helperText:"",name:"responsabile_4",error:false}}
                                    items={this.state.operatori_list}/>
                                </Grid.Column>
                            </Grid.Row>
                            <Divider horizontal>
                                <Header as='h4'>
                                    <Icon name='sticky note outline' />
                                    Note aggiuntive
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
                                        value={this.state.note_aggiuntive}
                                        onChange={this.handleNotaChange}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => {this.handleClose()}}>
                            Cancella
                        </Button>
                        <Button
                            onClick={() => this.makeRequestInsert()}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Salva'
                        />
                    </Modal.Actions>
                    <div> 
                    {
                        this.state.registrazione.chiamata
                        ?<Snackbar open={this.state.registrazione.chiamata} autoHideDuration={2000} onClose={this.handleClose}>
                            <MuiALert elevation={9} variant="filled" severity={this.state.registrazione.stato?"success":"error"}>
                                {this.state.registrazione.messaggio}
                            </MuiALert>
                        </Snackbar>
                        :<div></div>
                    }   
                </div>
                </Modal>
        </>
        )
    }
}
