import React, { Component } from 'react'
import { Header, Icon, Modal,Button } from 'semantic-ui-react'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import {TextField,Snackbar} from '@material-ui/core';
import {Grid,Image} from 'semantic-ui-react';
import Selecter from './selecter';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green,red } from '@material-ui/core/colors';
import { Divider } from 'semantic-ui-react'
import TransferList from './transfer_list.js'
import DateTimePicker from './date_picker.js'
import MuiALert from '@material-ui/lab/Alert';
import axios from 'axios';
export default class AddOperation extends Component {
    _isMounted=false;
    today=new Date();
    constructor(props){
        super(props);
       
        this.state={ 
            tipo_operazione:"Installazione",
            data_inizio_operazione:"",
            data_fine_operazione:"",
            seriale_componente:"",
            verifica_componente:{
                verificato:false,
                messaggio:"*Campo Richiesto"
            },
            registrazione:{
                chiamata: false,
                stato:false,
                messaggio:""
            },
            componente:{
                produttore:"",
                nome:"",
                larghezza:"",
                altezza:"",
                profondita:"",
            },
            disabilita_controllo_componente:false,
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

        if(this._isMounted){

            this.setState({data_inizio_operazione:this.today.getFullYear()+"/"+(this.today.getMonth()+1)+"/"+this.today.getDate(),
                            data_fine_operazione:this.today.getFullYear()+"/"+(this.today.getMonth()+1)+"/"+this.today.getDate()})
        }

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

    handleClose = () => {
        let {registrazione} = this.state;
        console.log(registrazione.stato)
        registrazione.chiamata=false;
        
        if (registrazione.stato){
            registrazione.stato=false;
            this.setState({registrazione})
            this.props.handleClose()
        }else{
            this.setState({registrazione})
        }
            
        
    }

    handleTipoOperazioneChange = (event,name) => {
        if (event.target.value != "Altro"){
            this.setState(state => (state.verifica_componente.verificato  = false, state));
            this.setState(state => (state.verifica_componente.messaggio  = "Verifica", state));
            this.setState({disabilita_controllo_componente:false});
        }else{
            this.setState(state => (state.verifica_componente.verificato  = true, state));
            this.setState(state => (state.verifica_componente.messaggio  = "Non necessario", state));
            this.setState({disabilita_controllo_componente:true});
        }
            this.setState({tipo_operazione:event.target.value});
            
    }

    handleSerialeChange = (event) => this.setState({seriale_componente:event.target.value})

    handleDateInzioOperazioniChange = (value) => {
        if(value instanceof Date && !isNaN(value)){
            this.setState({data_inizio_operazione:(value.getFullYear()+"/"+(value.getMonth()+1)+"/"+value.getDate())});
            this.setState({data_fine_operazione:(value.getFullYear()+"/"+(value.getMonth()+1)+"/"+value.getDate())});
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
        let {componente} = this.state;
        axios.get("api/Stazione/"+this.props.station_id+"/Componente/"+this.state.seriale_componente)
            .then((response) => {
                if((response.data.item != null)){
                    if (this.state.tipo_operazione == "Installazione"){
                        this.setState(state => (state.verifica_componente.verificato  = false, state));
                        this.setState(state => (state.verifica_componente.messaggio  = "Già installato!", state));
                    }else{
                        this.setState(state => (state.verifica_componente.verificato  = true, state));
                        this.setState(state => (state.verifica_componente.messaggio  = "Ok!", state));
                    }
                    componente.produttore = response.data.item.produttore;
                    componente.nome = response.data.item.nome;
                    componente.larghezza = response.data.item.larghezza_mm;
                    componente.altezza = response.data.item.altezza_mm;
                    componente.profondita = response.data.item.profondita_mm;
                    this.setState({componente});
                }else{
                    axios.get("api/Componente/"+this.state.seriale_componente)
                    .then((response) => {
                        
                        if(response.data.item != null){
                            if(this.state.tipo_operazione == "Installazione" && response.data.possible_to_install){
                                this.setState(state => (state.verifica_componente.verificato  = true, state));
                                this.setState(state => (state.verifica_componente.messaggio  = "Installabile!", state));
                            }else if(this.state.tipo_operazione != "Installazione" && response.data.possible_to_install){
                                this.setState(state => (state.verifica_componente.verificato  = false, state));
                                this.setState(state => (state.verifica_componente.messaggio  = "Non presente in stazione!", state));
                            }else{
                                this.setState(state => (state.verifica_componente.verificato  = false, state));
                                this.setState(state => (state.verifica_componente.messaggio  = "Installato in altra stazione!", state));
                            }
                            componente.produttore = response.data.item.produttore;
                            componente.nome = response.data.item.nome;
                            componente.larghezza = response.data.item.larghezza_mm;
                            componente.altezza = response.data.item.altezza_mm;
                            componente.profondita = response.data.item.profondita_mm;
                            this.setState({componente});
                        }else{
                            this.setState(state => (state.verifica_componente.verificato  = false, state));
                            this.setState(state => (state.verifica_componente.messaggio  = "Questo seriale non appartiene a nessun componente", state));
                        }

                    })
                    
                    
                }
                
            })
    }

    addOperation = () => {
        var info = this.state;
        if (info.tipo_operazione == "" || info.data_inizio_operazione == "" || info.data_fine_operazione == "" || !(info.verifica_componente.verificato) || 
            info.operatore_incaricato == "" || (info.seriale_componente == "" && info.tipo_operazione !="Altro")){
                this.setState(state => (state.registrazione.chiamata  = true, state));
                this.setState(state => (state.registrazione.stato  = false, state));
                this.setState(state => (state.registrazione.messaggio  = "Campi richiesti non inseriti!", state));
                return 
            }
        axios.post('/api/Stazione/'+this.props.station_id+'/Operazione', {
            tipo_operazione:info.tipo_operazione,
            data_inizio_operazione:info.data_inizio_operazione,
            data_fine_operazione:info.data_fine_operazione,
            seriale_componente:this.state.tipo_operazione != "Altro"?info.seriale_componente:"",
            operatore_incaricato:info.operatore_incaricato,
            note:info.note,
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
                                    properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Tipo Operazione",style:{flexGrow:1},value:this.state.tipo_operazione,
                                    customHandler:this.handleTipoOperazioneChange,helperText:"*Campo richiesto",name:"tipo_stazione",error:false}}
                                    items={[{"key":"Installazione","value":"Installazione"},{"key":"Manutenzione","value":"Manutenzione"},
                                            {"key":"Rimozione","value":"Rimozione"},{"key":"Altro","value":"Altro"}]}/>
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
                                            helperText={this.state.verifica_componente.messaggio} error={this.state.verifica_componente.verificato?false:true
                                            } value={this.state.disabilita_controllo_componente?"":this.state.seriale_componente}
                                            onChange={this.handleSerialeChange} disabled={this.state.disabilita_controllo_componente}>
                                        </TextField>
                                    </Grid.Column>
                                    <Grid.Column width={2} >
                                        <IconButton aria-label="delete" onClick={this.handleCheckComponenteSeriale} disabled={this.state.disabilita_controllo_componente}>
                                            <CheckCircleIcon fontSize="large" style={this.state.verifica_componente.verificato?{ color: green[500] }:{ color: red[500] }} />
                                        </IconButton>
                                    </Grid.Column>
                                    <Grid.Column  width={6} floated="right">
                                        <TextField disabled id="produttore_textfield" value={this.state.disabilita_controllo_componente?"":this.state.componente.produttore} label="Produttore" variant="standard"  fullWidth/>             
                                    </Grid.Column>
                            </Grid.Row>
                                <Grid.Row style={{paddingBottom:0,paddingTop:0}}>
                                    
                                    <Grid.Column width={6} floated="right">
                                        <TextField disabled id="nome_textfield" value={this.state.disabilita_controllo_componente?"":this.state.componente.nome} label="Nome Componente" variant="standard"  fullWidth
                                                        >
                                            </TextField>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{paddingBottom:0,paddingTop:0}}>
                                    <Grid.Column width={6} floated="right">
                                        <TextField  disabled id="larghezza_textfield" value={this.state.disabilita_controllo_componente?"":this.state.componente.larghezza} label="Larghezza (mm)" variant="standard"  fullWidth
                                        >
                                            </TextField>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{paddingBottom:0,paddingTop:0}}>
                                    <Grid.Column width={6} floated="right">
                                        <TextField disabled id="altezza_textfield" value={this.state.disabilita_controllo_componente?"":this.state.componente.altezza} label="Altezza (mm)" variant="standard"  fullWidth
                                                        >
                                            </TextField>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{paddingBottom:0,paddingTop:0}}>
                                    <Grid.Column width={6} floated="right">
                                        <TextField disabled id="profondita_textfield" value={this.state.disabilita_controllo_componente?"":this.state.componente.profondita} label="Profondità (mm)" variant="standard"  fullWidth
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
                                    customHandler:this.handleOperatoreIncaricatoChange,helperText:"*Campo richiesto",required:true,name:"Operatore",error:false}}
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
                                        onChange={this.handleNotaChange}
                                        value={this.state.note}
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
                            onClick={() => {this.addOperation()}}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Salva'
                        />
                    </Modal.Actions>
                    <div> 
                    {
                        this.state.registrazione.chiamata
                        ?<Snackbar open={this.state.registrazione.chiamata} autoHideDuration={500} onClose={this.handleClose}>
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
