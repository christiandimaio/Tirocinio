import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BatteryCard from './utils/card_battery.js';
import ChargeRegolatorCard from './utils/card_chargeregolator.js';
import DataloggerCard from './utils/card_datalogger.js';
import GpsCard from './utils/card_gps.js';
import HardDriveCard from './utils/card_harddrive.js';
import SensorCard from './utils/card_sensor.js';
import SolarPanelCard from './utils/card_solarpanel.js';
import WireCard from './utils/card_wire.js';
import { Box } from '@material-ui/core';
import axios from 'axios';
import { Divider } from 'semantic-ui-react'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

// Funzione che renderizza il pannello dedicato alle batterie
// props: 
//      1) items : il vettore di batterie
function RenderBatteries(props){
  const classes = useStyles();
  return(
    <Box  style={{borderColor:"green"}} >
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Batterie : {props.items.length}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{overflowX:"auto"}}>
          <Box display="flex" minWidth="65vw" flexDirection="row" maxHeight="20vh" flexWrap="wrap">
            {
              props.items.map((item) => {
                return(
                  <Box display="flex" width="25%" padding={2}>
                    <BatteryCard 
                      voltage={item.info.voltaggio} 
                      amp={item.info.amperaggio} 
                      serial={item.componente.seriale}
                      manufacter={item.componente.produttore}
                      name={item.componente.nome} 
                    />
                  </Box>
                )
              })
            }
          </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    </Box>
  )
}

// Funzione che renderizza il pannello dedicato ai Regolatori di carica
// props: 
//      1) items : il vettore di regolatori carica
function RenderChargeRegolator(props){
  const classes = useStyles();
  return(
    <Box  style={{borderColor:"green"}} >
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Regolatori di carica : {props.items.length}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{overflowX:"auto"}}>
          <Box display="flex" minWidth="65vw" flexDirection="row" maxHeight="20vh" flexWrap="wrap">
            {
              props.items.map((item) => {
                return(
                  <Box display="flex" width="25%" padding={2}>
                    <ChargeRegolatorCard 
                      voltage={item.info.volts_supportati} 
                      amp={item.info.ah_supportati} 
                      serial={item.componente.seriale}
                      manufacter={item.componente.produttore}
                      name={item.componente.nome} 
                    />
                  </Box>
                )
              })
            }
          </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    </Box>
  )
}

// Funzione che renderizza il pannello dedicato ai Dataloggers
// props: 
//      1) items : il vettore di dataloggers
function RenderDataloggers(props){
  const classes = useStyles();
  return(
    <Box  style={{borderColor:"green"}} >
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Acquisitori : {props.items.length}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{overflowX:"auto"}}>
          <Box display="flex" minWidth="65vw" flexDirection="row" maxHeight="20vh" flexWrap="wrap">
            {
              props.items.map((item) => {
                return(
                  <Box display="flex" width="25%" padding={2}>
                    <DataloggerCard 
                      serial={item.componente.seriale}
                      nChannel={item.info.n_canali}
                      manufacter={item.componente.produttore}
                      name={item.componente.nome} 
                    />
                  </Box>
                )
              })
            }
          </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    </Box>
  )
}

// Funzione che renderizza il pannello dedicato ai GPS
// props: 
//      1) items : il vettore di GPS
function RenderGps(props){
  const classes = useStyles();
  return(
    <Box  style={{borderColor:"green"}} >
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Gps : {props.items.length}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{overflowX:"auto"}}>
          <Box display="flex" minWidth="65vw" flexDirection="row" maxHeight="20vh" flexWrap="wrap">
            {
              props.items.map((item) => {
                return(
                  <Box display="flex" width="25%" padding={2}>
                    <GpsCard 
                      manufacter={item.componente.produttore}
                      name={item.componente.nome}
                      serial={item.componente.seriale}
                    />
                  </Box>
                )
              })
            }
          </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    </Box>
  )
}

// Funzione che renderizza il pannello dedicato alle Memorie di massa
// props: 
//      1) items : il vettore di hard disk
function RenderHardDrive(props){
  const classes = useStyles();
  return(
    <Box  style={{borderColor:"green"}} >
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Memorie di massa : {props.items.length} </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{overflowX:"auto"}}>
          <Box display="flex" minWidth="65vw" flexDirection="row" maxHeight="20vh" flexWrap="wrap">
            {
              props.items.map((item) => {
                return(
                  <Box display="flex" width="25%" padding={2}>
                    <HardDriveCard 
                      manufacter={item.componente.produttore}
                      name={item.componente.nome} 
                      size={item.info.dimensione}
                      type={item.info.tipologia}
                      serial={item.componente.seriale}
                    />
                  </Box>
                )
              })
            }
          </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    </Box>
  )
}

// Funzione che renderizza il pannello dedicato ao Sensori
// props: 
//      1) items : il vettore di sensori
function RenderSensors(props){
  const classes = useStyles();
  return(
    <Box  style={{borderColor:"green"}} >
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Sensori : {props.items.length}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{overflowX:"auto"}}>
          <Box display="flex" minWidth="65vw" flexDirection="row" maxHeight="20vh" flexWrap="wrap">
            {
              props.items.map((item) => {
                return(
                  <Box display="flex" width="25%" padding={2}>
                    <SensorCard 
                      manufacter={item.componente.produttore}
                      name={item.componente.nome} 
                      gain={item.info.gain}
                      samplingRate={item.info.sampling_rate}
                      serial={item.componente.seriale}
                    />
                  </Box>
                )
              })
            }
          </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    </Box>
  )
}

// Funzione che renderizza il pannello dedicato ai Pannelli solari
// props: 
//      1) items : il vettore di pannelli solari
function RenderSolarPanels(props){
  const classes = useStyles();
  return(
    <Box  style={{borderColor:"green"}} >
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Pannelli Solari : {props.items.length}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{overflowX:"auto"}}>
          <Box display="flex" minWidth="65vw" flexDirection="row" maxHeight="20vh" flexWrap="wrap">
            {
              props.items.map((item) => {
                return(
                  <Box display="flex" width="25%" padding={2}>
                    <WireCard 
                      manufacter={item.componente.produttore}
                      name={item.componente.nome} 
                      power={item.info.potenza_pannello}
                      amp={item.info.ah_pannello}
                    />
                  </Box>
                )
              })
            }
          </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    </Box>
  )
}

// Funzione che renderizza il pannello dedicato ai Cavi
// props: 
//      1) items : il vettore di cavi
function RenderWires(props){
  const classes = useStyles();
  return(
    <Box  style={{borderColor:"green"}} >
    <ExpansionPanel >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{borderColor:"green"}}
        
      >
        <Typography className={classes.heading}>Cavi : {props.items.length}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{overflowX:"auto"}}>
          <Box display="flex" minWidth="65vw" flexDirection="row" maxHeight="20vh" flexWrap="wrap">
            {
              props.items.map((item) => {
                return(
                  <Box display="flex" width="25%" padding={2}>
                    <SolarPanelCard 
                      manufacter={item.componente.produttore}
                      name={item.componente.nome} 
                      type={item.info.tipo}
                      section={item.info.sezione}
                      lung={item.info.lunghezza}
                      serial={item.componente.seriale}
                    />
                  </Box>
                )
              })
            }
          </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    </Box>
  )
}

export default function ComponentTab(props) {
  const [dataloggers,setDataloggers] = React.useState([])
  const [sensors,setSensors] = React.useState([])
  const [batteries,setBatteries] = React.useState([])
  const [chargeRegolator,setChargeRegolator] = React.useState([])
  const [gps,setGps] = React.useState([])
  const [hardDrive,setHardDrive] = React.useState([])
  const [solarPanel,setSolarPanel] = React.useState([])
  const [wires,setWires] = React.useState([])

  useEffect(() => {
    function getSensors() {
      axios.get("api/Stazione/"+props.stationId+"/Sensori")
        .then((response) => {
          setSensors(response.data.items)
        });
    };
    function getDataloggers() {
      axios.get("api/Stazione/"+props.stationId+"/Acquisitori")
        .then((response) => {
          setDataloggers(response.data.items)
        });
    }
    function getBatteries(){
      axios.get("api/Stazione/"+props.stationId+"/Batterie")
        .then((response) => {
          setBatteries(response.data.items)
        });
    }
    function getChargeRegolator() {
      axios.get("api/Stazione/"+props.stationId+"/RegolatoriCarica")
        .then((response) => {
          setChargeRegolator(response.data.items)
        });
    }
    function getGps(){
      axios.get("api/Stazione/"+props.stationId+"/Gps")
        .then((response) => {
          setGps(response.data.items)
        });
    }
    function getHardDrive(){
      axios.get("api/Stazione/"+props.stationId+"/MemorieMassa")
        .then((response) => {
          setHardDrive(response.data.items)
        });
    }
    function getSolarPanels(){
      axios.get("api/Stazione/"+props.stationId+"/PannelliSolari")
        .then((response) => {
          setSolarPanel(response.data.items)
        });
    }
    function getWires () {
      axios.get("api/Stazione/"+props.stationId+"/Cavi")
        .then((response) => {
          setWires(response.data.items)
        });
    }
    getSensors()
    getDataloggers()
    getBatteries()
    getChargeRegolator()
    getGps()
    getHardDrive()
    getSolarPanels()
    getWires()
  }, [props.stationId]);

  



  return (
    <React.Fragment>
      <Box display="flex" padding={1}>
      <RenderBatteries items={batteries}/>
      </Box>
      <Divider/>
      <Box display="flex"   padding={1}>
      <RenderSensors items={sensors}/>
      </Box>
      <Divider/>
      <Box display="flex"  padding={1}>
      <RenderDataloggers items={dataloggers}/>
      </Box>
      <Divider/>
      <Box display="flex"  padding={1}>
      <RenderGps items={gps}/>
      </Box>
      <Divider/>
      <Box display="flex" padding={1}>
      <RenderHardDrive items={hardDrive}/>
      </Box>
      <Divider/>
      <Box display="flex" padding={1}>
      <RenderWires items={wires}/>
      </Box>
      <Divider/>
      <Box display="flex" padding={1}>
      <RenderChargeRegolator items={chargeRegolator}/>
      </Box>
      <Divider/>
      <Box display="flex" padding={1}>
      <RenderSolarPanels items={solarPanel} />
      </Box>
      </React.Fragment>

  );
}