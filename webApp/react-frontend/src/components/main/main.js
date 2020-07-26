import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import {Box} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import StationCard from '../element/card_station.js';
import StationMap from './map.js';
import axios from 'axios';
import AddNewStation from '../element/add_station.js';
import { Divider } from 'semantic-ui-react'
import AddOperation from '../element/add_operation.js';
import StationViewer from './station_viewer.js';
import 'typeface-roboto';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import StreetviewIcon from '@material-ui/icons/Streetview';
import SearchIcon from '@material-ui/icons/Search';

// Componente con design Hooks innestato per la ricerca delle spazioni  ///////////////////
/// Material UI I'm in love with u :)
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "100%",
    borderTopColor:"green"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function CustomizedInputBase(props) {
  const classes = useStyles();
  const [value,setValue] = React.useState("")

  const handleChange = (event) => {
    setValue(event.target.value.toUpperCase())
    props.setFilter(event.target.value.toUpperCase())
  }
  return (
    <Paper className={classes.root} >
      <IconButton className={classes.iconButton} aria-label="menu">
        <StreetviewIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Cerca una stazione"
        inputProps={{ 'aria-label': 'Cerca una stazione' }}
        value = {value}
        onChange={handleChange}
      />
      <IconButton  className={classes.iconButton} aria-label="Cerca">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
/////////////////////////////////////////////////////////////////////
//  Componente che gestisce la parte vera e propria dell'applicazione,
//   ovvero la schermata principale dalla quale è possibile effettuare tutte le operazioni 

export default class Main extends React.Component{
  _isMounted=false;
  constructor(props){
    super(props);
    this.state={
      ...props,
      addStation:false, //Attributo per la gestione dell'inserimento di una nuova stazione
      stations:[], // Attributo che detiene tutte le stazioni da dover renderizzare
      addOperation:{  // Attributo che gestisce l'aggiunta di una nuova operazione per la stazione
        open:false,
        stationId:""
      },
      stationInfo:{ // Attributo che gestisce la visualizzazione delle informazioni della stazione
        open:false, // Booleano che mi permette di capire quando viene richiesta l'apertura della sezione "informazioni stazione"
        stationId:"" // Identificativo della stazione
      },
      stationFilter:"" // filtro sul codice della stazione
    }
  }

  // Funziona chiamata per aprire la sezione di "Visualizza Informazioni" della stazione
  // Come parametro prende l'identificativo della stazione Ex. "IOCA"
  openStationInfo = (id) => {
    this.closeStationInfo() // Necessario per forzare un rendering aggiuntivo del component con passaggio dei nuovi parametri
    this.setState(state => (state.stationInfo.open  = true));
    this.setState(state => (state.stationInfo.stationId  = id));
  }

  // Funzione duale di openStationInfo
  closeStationInfo = () => {
    this.setState(state => (state.stationInfo.open  = false));
    this.setState(state => (state.stationInfo.stationId  = ""));
  }

  // Funziona chiamata per aprire la sezione di "Aggiungi Operazione" della stazione
  // Come parametro prende l'identificativo della stazione Ex. "IOCA"
  openAddOperation = (id) => {
    this.setState(state => (state.addOperation.open  = true));
    this.setState(state => (state.addOperation.stationId  = id));
  }

  // Funzione duale di openAddOperation
  closeAddOperation = () => {
    this.setState(state => (state.addOperation.open  = false));
    this.setState(state => (state.addOperation.stationId  = ""));
    this.retrieveStationInfo("")
  }

  
  componentWillUnmount(){
    this._isMounted=false;
  }

  //Funzione che intercetta eventuali ricerca sulla textbox
  handleSearchCodeFilter = (value) => {
    this.retrieveStationInfo(value)
  }

  // Funzione che forza il component a renderizzarsi di nuovo
  forceReRender = () => {
    this.setState({state:this.state})
  }

  componentDidMount() {
    this._isMounted=true;
    this.retrieveStationInfo("")
  }

  // Funzione che interroga la web api ottenendo tutte le stazioni attualmente sul database
  retrieveStationInfo = (query) =>{
    console.log("reload UI")
    console.log(query)
    axios.get('api/Stazioni/info',{
        params:{
          q: query === ""?null:query
          }
        })
        .then((response) => {
          if(this._isMounted){
            console.log(response.data["data"]);
              this.setState({
                stations: response.data["data"]
              });
          }
      })
  }

  createStation = (state) => {
    if(this._isMounted){
      this.setState({addStation:state})
    }
  }


  render(){
    return (
            <React.Fragment>
              <Grid padded columns="1" centered style={{minWidth:"25vw", maxHeight:"90vh",overflow:"auto"}}>
                <Grid.Column mobile={16} tablet={5} computer={4} style={{flexGrow:1,maxHeight:"100%"}} >
                <CustomizedInputBase setFilter={this.handleSearchCodeFilter}/>
                <Divider />
                    {
                      this.state.stations.map((station) => 
                      <React.Fragment>
                        <Paper elevation={3} style={{padding:7}}>
                          <StationCard properties={{
                                        uid:station["id_univoco"],
                                        stationId:station["codice"],
                                        stationType:station["tipo_stazione"],
                                        startDate:station["data_messa_funzione"],
                                        operationCount:station["numero_operazioni"],
                                        isActive:station["is_attiva"],
                                        openStationInfo:this.openStationInfo,
                                        openAddOperation:this.openAddOperation
                                      }}
                          />
                        </Paper>
                        <Divider />
                      </React.Fragment>
                      )
                    }
                    <AddOperation open={this.state.addOperation.open} handleClose={this.closeAddOperation} stationId={this.state.addOperation.stationId}/>
                    <AddNewStation callReRender={this.retrieveStationInfo}/>
                </Grid.Column>
              </Grid>                            
              <Grid padded columns="1" style={{flexGrow:1,maxHeight:"100%"}}>
                <Grid.Column stretched mobile={16} tablet={16} computer={16}>
                  <Box display="flex" flexGrow={1}>
                    <Paper elevation={3} style={{flexGrow:1}}>
                      {
                        this.state.stationInfo.open
                          ?<StationViewer close={this.closeStationInfo} stationId={this.state.stationInfo.stationId}/>
                          :<StationMap stations={this.state.stations}/>
                      } 
                    </Paper>
                  </Box>              
                </Grid.Column>                 
              </Grid>
            </React.Fragment>
            );
    } 

}
