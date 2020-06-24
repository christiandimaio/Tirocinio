// Component per la gestione dell'inserimento operazioni della stazione, si basa su di un modal 

import React, { Component } from 'react'
import { Header, Icon, Modal,Button } from 'semantic-ui-react'
import {TextField,Snackbar} from '@material-ui/core';
import {Grid} from 'semantic-ui-react';
import Selecter from './utils/selecter';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green,red } from '@material-ui/core/colors';
import { Divider } from 'semantic-ui-react'
import DateTimePicker from './utils/date_picker.js'
import MuiALert from '@material-ui/lab/Alert';
import axios from 'axios';
var today = new Date();
export default class AddOperation extends Component {
    _isMounted=false;
    today=new Date();
    constructor(props){
        super(props);
        
        this.state={ 
            operationType:"Installazione",
            startOperationDate:today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate(),
            endOperationDate:today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate(),
            componentSerial:"",
            componentCheck:{
                verified:false,
                message:"*Campo Richiesto"
            },
            registration:{
                serverCall: false,
                state:false,
                message:""
            },
            component:{
                produttore:"",
                nome:"",
                larghezza:"",
                altezza:"",
                profondita:"",
            },
            componentCheckEnabled:false,
            operator:"",
            note:""
        }
    }
    

    componentWillReceiveProps(nextProps){
        if(nextProps.open!==this.props.open){
            //Verifica sè è stata chiamata la chiusura del modal 
            this.setState({modalOpen: nextProps.open });
          
        }
        }
    componentDidMount(){
        // Procedura invocata dopo componentWillMount, imposta un valore di default per le date di inizio e fine operazione
        // a data odierna
        this._isMounted=true

        if(this._isMounted){

            this.setState({startOperationDate:this.today.getFullYear()+"/"+(this.today.getMonth()+1)+"/"+this.today.getDate(),
                            endOperationDate:this.today.getFullYear()+"/"+(this.today.getMonth()+1)+"/"+this.today.getDate()})
        }

        //Invocazione chiamata alla web api per la lista degli operatori 
        axios.get("api/Operatori/selecter")
            .then((response) => {
                console.log(response.data);
                if(this._isMounted){
                    this.setState({
                        operatori_list: response.data.items
                    })
                }
            })
            .catch(() => {
                if(this._isMounted){
                    this.setState({database_operatori:["Default"]})
                }
                
            });
    }

    // Gestore evento : chiusura component
    handleClose = () => {
        // procedura chiamata alla richiesta di uscita dal modal, può avvenire in due casi:
        // 1) Premo il tasto cancella
        // 2) Premo su salva -> Tutto okay : si chiude il form
        //                   -> Qualcosa va storto : annullo la chiamata e resetto le variabili 
        let {registration} = this.state;
        console.log(registration.state)
        
        
        if (registration.serverCall){
            registration.serverCall=false;
            if (registration.state){
                registration.state=false;
                this.setState({registration})
                this.resetData()
                this.props.handleClose()
            }else{
                this.setState({registration})
            }
        }else{
            this.resetData()
            this.props.handleClose()
        }
    }

    resetData = () => {
        let {componentCheck} = this.state;
        componentCheck.verified = false;
        componentCheck.message = "*Campo Richiesto";

        let {component} = this.state;
        component.produttore = "";
        component.nome="";
        component.larghezza="";
        component.altezza ="";
        component.profondita = "";

        this.setState({
            operationType:"Installazione",
            startOperationDate:today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate(),
            endOperationDate:today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate(),
            componentSerial:"",
            componentCheckEnabled:false,
            operator:"",
            note:"",
            componentCheck,
            component
        })
        
    }

    // Gestore evento : modifica al tipo operazione component Selecter
    handleTipoOperazioneChange = (event) => {
        // Procedura che tiene traccia degli eventi di modifica sul selecter Tipo Operazione
        // Nel caso in cui si seleziona:
        //      Altro : La verifica del seriale non deve essere eseguita, imposto la verifica a true implicitamente
        //      Altrimenti : La verifica del seriale deve avvenire per poter registrare l'operazione
        if (event.target.value !== "Altro"){
            this.setState(state => (state.componentCheck.verified  = false));
            this.setState(state => (state.componentCheck.message  = "Verifica"));
            this.setState({componentCheckEnabled:false});
        }else{
            this.setState(state => (state.componentCheck.verified  = true));
            this.setState(state => (state.componentCheck.message  = "Non necessario"));
            this.setState({componentCheckEnabled:true});
        }
            this.setState({operationType:event.target.value});
            
    }

    // Gestore evento : modifica seriale componente
    handleSerialeChange = (event) => this.setState({componentSerial:event.target.value})

    // Gestore evento : modifica component DateTimePicker su stato data_inizio_operazione
    handleDateInzioOperazioniChange = (value) => {
        if(value instanceof Date && !isNaN(value)){
            this.setState({startOperationDate:(value.getFullYear()+"/"+(value.getMonth()+1)+"/"+value.getDate())});

            //Implicitamente setto anche data_fine_operazione per non avere stati incoerenti sul database
            this.setState({endOperationDate:(value.getFullYear()+"/"+(value.getMonth()+1)+"/"+value.getDate())});
        }
    }

    // Gestore evento : modifica component DateTimePicker su stato data_fine_operazione
    handleDateFineOperazioniChange = (value) => {
        if(value instanceof Date && !isNaN(value)){
            this.setState({endOperationDate:(value.getFullYear()+"/"+(value.getMonth()+1)+"/"+value.getDate())});
        }
    }

    // Gestore evento : modifica component Selecter su stato operatore incaricato
    handleOperatoreIncaricatoChange = (event) => this.setState({operator:event.target.value})

    // Gestore evento : modifica component TextArea su stato nota
    handleNotaChange = (event) => this.setState({note:event.target.value})

    // Gestore evento : click sul bottone "Verifica seriale"
    handleCheckComponenteSeriale = () => {
        let {component} = this.state;
        axios.get("api/Stazione/"+this.props.stationId+"/Componente/"+this.state.componentSerial)
            .then((response) => {
                if((response.data.operationCode !== 404)){
                    // Se la web api mi ritorna un componente verifico il tipo di operazione
                    if (this.state.operationType === "Installazione"){
                        this.setState(state => (state.componentCheck.verified  = false));
                        this.setState(state => (state.componentCheck.message  = "Già installato!"));
                    }else{
                        this.setState(state => (state.componentCheck.verified  = true));
                        this.setState(state => (state.componentCheck.message  = "Ok!"));
                    }
                    component.produttore = response.data.item.produttore;
                    component.nome = response.data.item.nome;
                    component.larghezza = response.data.item.larghezza_mm;
                    component.altezza = response.data.item.altezza_mm;
                    component.profondita = response.data.item.profondita_mm;
                    this.setState({component});
                }else{
                    // Se la web api non ritorna un componente significa che quel componente non è installato in quella stazione
                    //  procedo ad interrogare il database sull'effettiva presenza del componente in altre stazioni o in magazzino
                    axios.get("api/Componente/"+this.state.componentSerial)
                    .then((response) => {
                        
                        if(response.data.operationCode !== 404){
                            if(this.state.operationType === "Installazione" && response.data.possible_to_install){
                                this.setState(state => (state.componentCheck.verified  = true));
                                this.setState(state => (state.componentCheck.message  = "Installabile!"));
                            }else if(this.state.operationType !== "Installazione" && response.data.possible_to_install){
                                this.setState(state => (state.componentCheck.verified  = false));
                                this.setState(state => (state.componentCheck.message  = "Non presente in stazione!"));
                            }else{
                                this.setState(state => (state.componentCheck.verified  = false));
                                this.setState(state => (state.componentCheck.message  = "Installato in altra stazione!"));
                            }
                            component.produttore = response.data.item.produttore;
                            component.nome = response.data.item.nome;
                            component.larghezza = response.data.item.larghezza_mm;
                            component.altezza = response.data.item.altezza_mm;
                            component.profondita = response.data.item.profondita_mm;
                            this.setState({component});
                        }else{
                            this.setState(state => (state.componentCheck.verified  = false));
                            this.setState(state => (state.componentCheck.message  = "Questo seriale non appartiene a nessun componente"));
                        }

                    })
                    
                    
                }
                
            })
    }

    // Gestore evento : click sul bottone "salva"
    addOperation = () => {
        var info = this.state;

        // Verifica sè tutti i campi richiesti sono inseriti e validi
        if (info.operationType === "" || info.startOperationDate === "" || info.endOperationDate === "" || !(info.componentCheck.verified) || 
            info.operator === "" || (info.componentSerial === "" && info.operationType !=="Altro")){
                this.setState(state => (state.registration.serverCall  = true));
                this.setState(state => (state.registration.state  = false));
                this.setState(state => (state.registration.message  = "Campi richiesti non inseriti!"));
                return 
            }
        axios.post('/api/Stazione/'+this.props.stationId+'/Operazione', {
            tipo_operazione:info.operationType,
            data_inizio_operazione:info.startOperationDate,
            data_fine_operazione:info.endOperationDate,
            seriale_componente:this.state.operationType !== "Altro"?info.componentSerial:"", //Nel caso in cui il tipo di operazione sia "Altro" il seriale va inviato vuoto
            operatore_incaricato:info.operator,
            note:info.note,
          })
          .then((response) => {
            console.log(response)
            // Codici di verifica :
            //      200 : Tutto okay
            if (response.data.operationCode !== 200){
                this.setState(state => (state.registration.state  = false));
                this.setState(state => (state.registration.message  = response.data.message));
            
            }else{
                this.setState(state => (state.registration.state  = true));
                this.setState(state => (state.registration.message  = "Registrazione avvenuta con successo"));
            }
            this.setState(state => (state.registration.serverCall  = true));
          })
         
    }

    render() {
        // Per il render guardare JSX + Material UI + Semantic UI React + eventuali componenti custom
        return (
            <>
                <Modal   open={this.state.modalOpen}
                          centered={false} closeOnDimmerClick={false}>
                    <Modal.Header>Aggiungi nuova operazione per la stazione : {this.props.stationId}</Modal.Header>
                    <Modal.Content scrolling>
                    
                    <Modal.Description>
                        <Grid>
                            <Grid.Row  columns={3}>
                                <Grid.Column>
                                <Selecter
                                    properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Tipo Operazione",style:{flexGrow:1},value:this.state.operationType,
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
                            <Grid.Row style={{paddingBottom:0}} >
                                    <Grid.Column width={5}  >   
                                        <TextField  id="componentSerial_textfield" label="N. Seriale Componente" variant="outlined" required 
                                            helperText={this.state.componentCheck.message} error={this.state.componentCheck.verified?false:true
                                            } value={this.state.componentCheckEnabled?"":this.state.componentSerial}
                                            onChange={this.handleSerialeChange} disabled={this.state.componentCheckEnabled}>
                                        </TextField>
                                    </Grid.Column>
                                    <Grid.Column width={2} >
                                        <IconButton aria-label="delete" onClick={this.handleCheckComponenteSeriale} disabled={this.state.componentCheckEnabled}>
                                            <CheckCircleIcon fontSize="large" style={this.state.componentCheck.verified?{ color: green[500] }:{ color: red[500] }} />
                                        </IconButton>
                                    </Grid.Column>
                                    <Grid.Column  width={6} floated="right">
                                        <TextField disabled id="produttore_textfield" value={this.state.componentCheckEnabled?"":this.state.component.produttore} label="Produttore" variant="standard"  fullWidth/>             
                                    </Grid.Column>
                            </Grid.Row>
                                <Grid.Row style={{paddingBottom:0,paddingTop:0}}>
                                    
                                    <Grid.Column width={6} floated="right">
                                        <TextField disabled id="nome_textfield" value={this.state.componentCheckEnabled?"":this.state.component.nome} label="Nome Componente" variant="standard"  fullWidth
                                                        >
                                            </TextField>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{paddingBottom:0,paddingTop:0}}>
                                    <Grid.Column width={6} floated="right">
                                        <TextField  disabled id="larghezza_textfield" value={this.state.componentCheckEnabled?"":this.state.component.larghezza} label="Larghezza (mm)" variant="standard"  fullWidth
                                        >
                                            </TextField>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{paddingBottom:0,paddingTop:0}}>
                                    <Grid.Column width={6} floated="right">
                                        <TextField disabled id="altezza_textfield" value={this.state.componentCheckEnabled?"":this.state.component.altezza} label="Altezza (mm)" variant="standard"  fullWidth
                                                        >
                                            </TextField>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{paddingBottom:0,paddingTop:0}}>
                                    <Grid.Column width={6} floated="right">
                                        <TextField disabled id="profondita_textfield" value={this.state.componentCheckEnabled?"":this.state.component.profondita} label="Profondità (mm)" variant="standard"  fullWidth
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
                                    properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Operatore",style:{flexGrow:1},value:this.state.operator,
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
                        <Button negative onClick={this.handleClose}>
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
                        this.state.registration.serverCall
                        ?<Snackbar open={this.state.registration.serverCall} autoHideDuration={500} onClose={this.handleClose}>
                            <MuiALert elevation={9} variant="filled" severity={this.state.registration.state?"success":"error"}>
                                {this.state.registration.message}
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
