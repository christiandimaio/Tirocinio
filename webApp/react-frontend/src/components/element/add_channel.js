// Component per la gestione dell'inserimento operazioni della stazione, si basa su di un modal 

import React, { Component } from 'react'
import { Header, Icon, Modal,Button, GridRow } from 'semantic-ui-react'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import {TextField,Snackbar,InputAdornment,OutlinedInput,FormControl,FormHelperText} from '@material-ui/core';
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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(3),
    float:"right"
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Seleziona Canale e Acquisitore', 'Informazioni Aggiuntive', 'Conferma'];
}

function getSensori(station_id){
    
}

function getAcquisitori(station_id){
    
    
    
}

        

function VerticalLinearStepper(props) {
  const today = new Date();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [dataCreazioneCanale,setData] = React.useState(today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate());
  const [serialeSensore,setSerialeSensore] = React.useState("");
  const [serialeAcquisitore,setSerialeAcquisitore] = React.useState("");
  const [numeroCanaleAcquisitore,setNumeroCanale] = React.useState(0);
  const [componenteSensore,setComponenteSensore] = React.useState("HHN");
  const [inclinazione,setInclinazione] = React.useState(0);
  const [azimuth,setAzimuth] = React.useState(0);
  const [profondita,setProfondita] = React.useState(0);
  const [campiInconpleti,attivaErrore] = React.useState(false);
  const [locationCode,setLocationCode] = React.useState("")

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleDataCreazioneCanale = (value) => {
    setData(value.getFullYear()+"/"+(value.getMonth()+1)+"/"+value.getDate());
  }

  const handleSensoreChange = (event,name) => {
    setSerialeSensore(event.target.value);
  }

  const handleAcquisitoreChange = (event,name) => {
    setSerialeAcquisitore(event.target.value);
  }

  const handleNumeroCanaleChange = (event) => {
    setNumeroCanale(event.target.value)
  }

  const handleComponenteSensoreChange = (event) => {
    setComponenteSensore(event.target.value)
  }

  const handleInclinazioneChange = (event) => {
    setInclinazione(event.target.value)
  }

  const handleAzimuthChange = (event) => {
    setAzimuth(event.target.value)
  }

  const handleProfonditaChange = (event) => {
    setProfondita(event.target.value)
  }

  const handleLocationCodeChange = (event) =>{
    setLocationCode(event.target.value)
  }

  const verificaForm = (step) => {
    switch(step){
      case 0:
        if (serialeSensore == "" || serialeAcquisitore == ""){
          return true
        }else{
          return false
        }
      case 1:
        if (locationCode == ""){
          return true
        }else{
          return false
        }
      default:
        return false
    }
  }

  const addCanale = () => {
    axios.post("api/Stazione/"+props.station_id+"/Canale",{
      seriale_sensore:serialeSensore,
      seriale_acquisitore:serialeAcquisitore,
      n_canale_acquisitore:numeroCanaleAcquisitore,
      componente_sensore:componenteSensore,
      inclinazione:inclinazione,
      azimuth:azimuth,
      data_creazione_canale:dataCreazioneCanale,
      profondita:profondita,
      location_code:locationCode
    })
  }


  const getStepContent = (step) =>{
    var sensori = [];
    var acquisitori = [];
    switch (step) {
        case 0:
            console.log(props.sensori)
            if (props.sensori.length > 0){
                props.sensori.map((sensore) => {
                    sensori.push({"key":sensore.componente.seriale,"value":sensore.componente.seriale})
                })
            }
            props.acquisitori.map((acquisitore) => {
               acquisitori.push({"key":acquisitore.componente.seriale,"value":acquisitore.componente.seriale})
            })
          return(
              <Grid padded>
                  <Grid.Row columns={3}>
                    <Grid.Column >
                        <Typography variant="h4" align="center">Acquisitore</Typography>
                    </Grid.Column>
                    <Grid.Column>
                        <Selecter
                          properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Seriale",style:{flexGrow:1},value:serialeAcquisitore,
                          customHandler:handleAcquisitoreChange
                          ,name:"tipo_stazione",error:false,helperText:"*Campo Richiesto",required:true}}
                          items={acquisitori}/>
                    </Grid.Column>
                    <Grid.Column>
                      <TextField variant="outlined" id="n_canale_textfield"  label="N. Canale" variant="outlined" value={numeroCanaleAcquisitore} fullWidth onChange={handleNumeroCanaleChange}/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={3}>
                    <Grid.Column verticalAlign="center" textAlign="center">
                        <Typography variant="h4" align="center">Sensore</Typography>
                    </Grid.Column>
                    <Grid.Column>
                    <Selecter
                      properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Seriale",style:{flexGrow:1},value:serialeSensore,
                      customHandler:handleSensoreChange,
                      name:"tipo_stazione",error:false,helperText:"*Campo Richiesto",required:true}}
                      items={sensori}/>
                    </Grid.Column>
                    <Grid.Column>
                        <TextField  id="profondita_textfield" label="Componente Sensore" variant="outlined" value={componenteSensore}  fullWidth onChange={handleComponenteSensoreChange}
                                />
                    </Grid.Column>
                  </Grid.Row>
              </Grid>
          );
        case 1:
          return (
              <Grid padded >
                <Grid.Row columns={1}>
                  <Grid.Column width={5}>
                    <TextField  id="profondita_textfield" label="Location Code" variant="outlined" value={locationCode}  fullWidth onChange={handleLocationCodeChange}
                                helperText="*Campo Richiesto" required/>

                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2} >
                    <Grid.Column width={5}>
                    <TextField  id="profondita_textfield" label="Inclinazione" variant="outlined" value={inclinazione}  fullWidth onChange={handleInclinazioneChange}
                                helperText="Espressa in gradi"/>
                    </Grid.Column>
                    <Grid.Column width={5}>
                    <TextField  id="profondita_textfield" label="Azimuth" variant="outlined" value={azimuth} fullWidth onChange={handleAzimuthChange}
                                helperText="Espresso in gradi">
                                                </TextField>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} >
                    <Grid.Column width={5} >
                    <TextField  id="profondita_textfield" label="Profondità" variant="outlined" value={profondita} fullWidth onChange={handleProfonditaChange}
                                helperText="Rispetto al piano della stazione Ex. -23" />
                                               
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} >
                    <Grid.Column width={5}>
                    <DateTimePicker properties={{
                                                  width:"100%",
                                                  id:"datafine_picker",
                                                  label:"Data Creazione Canale",
                                                  name:"data_fine_op"
                                                }}
                                  onChange={handleDataCreazioneCanale}/>
                    </Grid.Column>
                </Grid.Row>
              </Grid>
          );
        case 2:
          return (
              <Grid padded>
                <Grid.Row>
                  <Grid.Column>
                    <Typography variant="h4">{locationCode}</Typography>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                    <Grid.Column>
                        <Typography variant="h4">Acquisitore</Typography>
                    </Grid.Column>
                    <Grid.Column>
                      <Typography variant="h5">Seriale: {serialeAcquisitore}</Typography>
                    </Grid.Column>
                    <Grid.Column>
                      <Typography variant="h5">N. Canale: {numeroCanaleAcquisitore}</Typography>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                    <Grid.Column>
                      <Typography variant="h4">Sensore</Typography>
                    </Grid.Column>
                    <Grid.Column>
                      <Typography variant="h5">Seriale: {serialeSensore}</Typography>
                    </Grid.Column>
                    <Grid.Column>
                      <Typography variant="h5">Componente: {componenteSensore}</Typography>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                    <Grid.Column>
                     <Typography variant="h5">Inclinazione: {inclinazione}°</Typography>
                    </Grid.Column>
                    <Grid.Column>
                      <Typography variant="h5">Azimuth: {azimuth}°</Typography>
                    </Grid.Column>
                    <Grid.Column>
                        <Typography variant="h5">Profondità: {profondita} mt.</Typography>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Typography variant="h5">Data Creazione: {dataCreazioneCanale}</Typography>
                    </Grid.Column>
                  </Grid.Row>
                
              </Grid>
          );
        default:
          return 'Unknown step';
      }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
                <div>
                    {getStepContent(index)}
                </div>
                
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Indietro
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={verificaForm(activeStep)}
                  >
                    {activeStep === steps.length - 1 ? 'Conferma' : 'Avanti'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Hai completato tutti i passi, cliccando su Salva il nuovo canale verrà istanziato!</Typography>
          <Button
                            onClick={addCanale}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Salva'
                        />
        </Paper>
      )}
    </div>
  );
}

export default class AddChannel extends Component {
    _isMounted=false;
    today=new Date();
    constructor(props){
        super(props);
       
        this.state={ 
            modalOpen:false,
            current: 0,
            sensori:[],
            acquisitori:[]
        }
    }
    
    handleOpen = () => {
        this.setState({modalOpen:true})
    }
    handleClose =() =>{
        this.setState({modalOpen:false})
    }

    componentDidUpdate(prevProps,prevState) {
        if (this.props.station_id !== prevProps.station_id) {
            axios.get("api/Stazione/"+this.props.station_id+"/Sensori")
            .then((response) => {
                console.log(response.data.items)
                this.setState({sensori:response.data.items}) 
                        
            })
            //Invocazione chiamata alla web api per la lista degli operatori 
            axios.get("api/Stazione/"+this.props.station_id+"/Acquisitori")
            .then((response) => {
                        this.setState({acquisitori:response.data.items}) 
            })
        }
    }


    componentWillMount(){
        // Procedura invocata dopo componentWillMount, imposta un valore di default per le date di inizio e fine operazione
        // a data odierna
        this._isMounted=true
        //Invocazione chiamata alla web api per la lista dei Sensori 
        
    }


    render() {
        
        // Per il render guardare JSX + Material UI + Semantic UI React + eventuali componenti custom
        return (
            <>
                <IconButton aria-label="delete" color="primary" onClick={this.handleOpen} >
                    <AddCircleIcon fontSize="large"/>
                </IconButton>
                <Modal   open={this.state.modalOpen}
                          centered={false} closeOnDimmerClick={false}>
                    <Modal.Header>Aggiungi Canale</Modal.Header>
                    <Modal.Content scrolling>
                    
                    <Modal.Description>
                        <VerticalLinearStepper station_id ={this.props.station_id} sensori={this.state.sensori} acquisitori={this.state.acquisitori}/>
                    </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => {this.handleClose()}}>
                            Cancella
                        </Button>
                        
                    </Modal.Actions>
                    {/* <div> 
                    {
                        this.state.registrazione.chiamata
                        ?<Snackbar open={this.state.registrazione.chiamata} autoHideDuration={500} onClose={this.handleClose}>
                            <MuiALert elevation={9} variant="filled" severity={this.state.registrazione.stato?"success":"error"}>
                                {this.state.registrazione.messaggio}
                            </MuiALert>
                        </Snackbar>
                        :<div></div>
                    }   
                </div> */}
                </Modal>
        </>
        )
    }
}