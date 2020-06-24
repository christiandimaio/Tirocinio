
import React, { Component } from 'react'
import { Modal,Button } from 'semantic-ui-react'
import {TextField,Tooltip} from '@material-ui/core';
import {Grid} from 'semantic-ui-react';
import Selecter from './utils/selecter';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DateTimePicker from './utils/date_picker.js'
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



        
// Componente Hook per la gestione dello stepper con i vari form 
// Pros:
//  Attributi:
//            1) stationId : codice stazione
//            2) sensors : lista dei sensori disponibili nella stazione
//            3) dataloggers : lista degli acquisitori disponibili nella stazione
function VerticalLinearStepper(props) {
  const today = new Date();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [channelCreationDate,setData] = React.useState(today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate());
  const [sensorSerial,setSensorSerial] = React.useState("");
  const [dataloggerSerial,setDataloggerSerial] = React.useState("");
  const [dataloggerChannelNumber,setDataloggerChannelNumber] = React.useState(0);
  const [sensorComponent,setSensorComponent] = React.useState("HHN");
  const [inclination,setInclination] = React.useState(0);
  const [azimuth,setAzimuth] = React.useState(0);
  const [depth,setDepth] = React.useState(0);

  const [locationCode,setLocationCode] = React.useState("")

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleChannelCreationDate = (value) => {
    setData(value.getFullYear()+"/"+(value.getMonth()+1)+"/"+value.getDate());
  }

  const handleSensorChange = (event) => {
    setSensorSerial(event.target.value);
  }

  const handleDataloggerChange = (event) => {
    setDataloggerSerial(event.target.value);
  }

  const handleChannelNumberChange = (event) => {
    setDataloggerChannelNumber(event.target.value)
  }

  const handleSensorComponentChange = (event) => {
    setSensorComponent(event.target.value)
  }

  const handleInclinationChange = (event) => {
    setInclination(event.target.value)
  }

  const handleAzimuthChange = (event) => {
    setAzimuth(event.target.value)
  }

  const handleDepthChange = (event) => {
    setDepth(event.target.value)
  }

  const handleLocationCodeChange = (event) =>{
    setLocationCode(event.target.value)
  }

  //Funzione che ritorna true sè la verifica ha dato esito positivo
  const formVerify = (step) => {
    switch(step){
      case 0:
        if (sensorSerial === "" || dataloggerSerial === ""){
          return false
        }else{
          return true
        }
      case 1:
          return true
      default:
        return true
    }
  }

  const addChannel = () => {
    axios.post("api/Stazione/"+props.stationId+"/Canale",{
      seriale_sensore:sensorSerial,
      seriale_acquisitore:dataloggerSerial,
      n_canale_acquisitore:dataloggerChannelNumber,
      componente_sensore:sensorComponent,
      inclinazione:inclination,
      azimuth:azimuth,
      data_creazione_canale:channelCreationDate,
      profondita:depth,
      location_code:locationCode
    })
    .then((response) => {
      if (response.data.operationCode === 200){
        props.handleClose()
      }
    })
  }


  const getStepContent = (step) =>{
    var _sensors = [];
    var _dataloggers = [];
    switch (step) {
        case 0:
            if (props.sensors.length > 0){
                props.sensors.map((sensor) => {
                  _sensors.push({"key":sensor.componente.seriale,"value":sensor.componente.seriale})
                  return true
                })
            }
            props.dataloggers.map((datalogger) => {
              _dataloggers.push({"key":datalogger.componente.seriale,"value":datalogger.componente.seriale})
              return true
            })
          return(
              <Grid padded>
                  <Grid.Row columns={3}>
                    <Grid.Column >
                        <Typography variant="h4" align="center">Acquisitore</Typography>
                    </Grid.Column>
                    <Grid.Column>
                        <Selecter
                          properties = {{
                            labelId:"label-selecter-acquisitore-seriale",
                            id:"acquisitore-seriale-selecter",
                            inputLabel:"Seriale",
                            style:{flexGrow:1},
                            value:dataloggerSerial,
                            customHandler:handleDataloggerChange,
                            name:"dataloggersSerial",
                            error:false,
                            helperText:"*Campo Richiesto",
                            required:true}}
                          items={_dataloggers}/>
                    </Grid.Column>
                    <Grid.Column>
                      <TextField 
                        variant="outlined" 
                        id="n_canale_textfield"  
                        label="N. Canale" 
                        value={dataloggerChannelNumber} 
                        fullWidth 
                        onChange={handleChannelNumberChange}/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={3}>
                    <Grid.Column verticalAlign="center" textAlign="center">
                        <Typography variant="h4" align="center">Sensore</Typography>
                    </Grid.Column>
                    <Grid.Column>
                    <Selecter
                      properties = {{
                        labelId:"label-selecter-sensore-seriale",
                        id:"selecter-sensore-seriale",
                        inputLabel:"Seriale",
                        style:{flexGrow:1},
                        value:sensorSerial,
                        customHandler:handleSensorChange,
                        name:"sensorSerial",
                        error:false,
                        helperText:"*Campo Richiesto",
                        required:true}}
                      items={_sensors}/>
                    </Grid.Column>
                    <Grid.Column>
                        <TextField  
                          id="profondita_textfield" 
                          label="Componente Sensore" 
                          variant="outlined" 
                          value={sensorComponent}  
                          fullWidth 
                          onChange={handleSensorComponentChange}
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
                    <TextField  
                      id="loc_code_textfield" 
                      label="Location Code" 
                      variant="outlined" 
                      value={locationCode}  
                      fullWidth 
                      onChange={handleLocationCodeChange}
                      
                      required
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2} >
                    <Grid.Column width={5}>
                    <TextField  
                      id="inclinazione_textfield" 
                      label="Inclinazione" 
                      variant="outlined" 
                      value={inclination}  
                      fullWidth 
                      onChange={handleInclinationChange}
                      helperText="Espressa in gradi"
                    />
                    </Grid.Column>
                    <Grid.Column width={5}>
                    <TextField  
                      id="azimuth_textfield" 
                      label="Azimuth" 
                      variant="outlined" 
                      value={azimuth} 
                      fullWidth 
                      onChange={handleAzimuthChange}
                      helperText="Espresso in gradi"
                    />                          
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} >
                    <Grid.Column width={5} >
                    <TextField  
                      id="profondita_textfield" 
                      label="Profondità" 
                      variant="outlined" 
                      value={depth} 
                      fullWidth 
                      onChange={handleDepthChange}
                      helperText="Rispetto al piano della stazione Ex. -23" 
                    />                                               
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
                                  onChange={handleChannelCreationDate}/>
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
                      <Typography variant="h5">Seriale: {dataloggerSerial}</Typography>
                    </Grid.Column>
                    <Grid.Column>
                      <Typography variant="h5">N. Canale: {dataloggerChannelNumber}</Typography>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                    <Grid.Column>
                      <Typography variant="h4">Sensore</Typography>
                    </Grid.Column>
                    <Grid.Column>
                      <Typography variant="h5">Seriale: {sensorSerial}</Typography>
                    </Grid.Column>
                    <Grid.Column>
                      <Typography variant="h5">Componente: {sensorComponent}</Typography>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                    <Grid.Column>
                     <Typography variant="h5">Inclinazione: {inclination}°</Typography>
                    </Grid.Column>
                    <Grid.Column>
                      <Typography variant="h5">Azimuth: {azimuth}°</Typography>
                    </Grid.Column>
                    <Grid.Column>
                        <Typography variant="h5">Profondità: {depth} mt.</Typography>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Typography variant="h5">Data Creazione: {channelCreationDate}</Typography>
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
                    disabled={!formVerify(activeStep)}
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
                            onClick={addChannel}
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

// Componente per la gestione dell'inserimento di un nuovo canale
// Props: Attributi: stationId: codice della stazione
//        Metodi : callRender : Notifica una richiesta di rendering
export default class AddChannel extends Component {
    _isMounted=false;
    today=new Date();
    constructor(props){
        super(props);
       
        this.state={ 
            modalOpen:false, // attributo che indica lo stato del Modal di apertura form
            current: 0, // indice dello step iniziale
            sensors:[], // array dei sensori installati in stazione
            dataloggers:[] // array degli acquisitori installati in stazione
        }
    }
    
    handleOpen = () => {
      if (this.state.sensors.length > 0 && this.state.dataloggers.length > 0){
        this.setState({modalOpen:true})
      }
    }
    handleClose =() =>{
        this.setState({modalOpen:false})
        this.props.callRender()
    }

    componentDidUpdate(prevProps,prevState) {
        if (this.props.stationId !== prevProps.stationId) {
            axios.get("api/Stazione/"+this.props.stationId+"/Sensori")
            .then((response) => {
                console.log(response.data.items)
                if (response.data.operationCode !== 404){
                  this.setState({sensors:response.data.items})
                }   
            })
            //Invocazione chiamata alla web api per la lista degli acquisitori 
            axios.get("api/Stazione/"+this.props.stationId+"/Acquisitori")
            .then((response) => {
              if (response.data.operationCode !== 404){
                this.setState({dataloggers:response.data.items}) 
              } 
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
                <Tooltip title={this.state.sensors.length > 0 && this.state.dataloggers.length > 0?"Aggiungi canale":"Non è possibile aggiungere "+
                                  "un canale poichè a bordo della stazione mancano sensori o acquisitori, per il corretto funzionamento è necessario che ci "+
                                  "siano almeno un acquisitore ed un sensore"} interactive>
                  <IconButton aria-label="delete" color={!(this.state.sensors.length > 0 && this.state.dataloggers.length > 0)?"secondary":"primary"} onClick={this.handleOpen} >
                      <AddCircleIcon fontSize="large"/>
                  </IconButton>
                </Tooltip>
                <Modal   open={this.state.modalOpen}
                          centered={false} closeOnDimmerClick={false}>
                    <Modal.Header>Aggiungi Canale</Modal.Header>
                    <Modal.Content scrolling>
                    
                    <Modal.Description>
                        <VerticalLinearStepper handleClose={this.handleClose} stationId ={this.props.stationId} sensors={this.state.sensors} dataloggers={this.state.dataloggers}/>
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