import React from 'react';
import { Button, Icon, Image, Item, Label,Grid } from 'semantic-ui-react'
import DefaultStationImage from '../../images/stations/default.png'
import {Box,Snackbar} from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import MuiALert from '@material-ui/lab/Alert';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
var fileDownload = require('js-file-download');
// Proprietà componente 
// id_stazione = identificativo della stazione
// image_scr = Path immagine principale stazione
// nome_stazione = Codice della stazione
// tipo_stazione = tipologia stazione (Analogica - Digitale)
// messa_funzione = Data di messa in funzione stazione sismica
// numero_operazioni_svolte = Numero delle operazioni svolte sulla stazione
// is_attiva (Stringa) = Indica sé la stazione è attiva o meno
// getInfo (Funzione) = Funzione per avvisare il padre che è stato cliccato il bottone per vedere le info della stazione

// Componente che gestisce la visualizzazione delle stazioni sotto forma di card
// Props:
//        Metodi:
//                1) openStationInfo : metodo da chiamare per invocare la visualizzazione del pannello di informativa
//                2) openAddOperation : metodo da chiamare per invocare il modal per l'inseirmento di un intervento/operazione
//        Attributi:
//                1) uid : identificativo univoco numerico  della stazione
//                2) stationId : codice stazione
//                3) stationType : rappresenta il tipo della stazione "analogica" - "digitale"
//                4) startDate : data di messa in funzione della stazione
//                5) operationCount : indicatore numero di operazioni svolte in stazione
//                6) isActive : indica se la stazione è attiva o meno -> str

export default class StationCard extends React.Component {

  constructor(props){
    super(props);
  }

  state={
    downloadError:false //Stato che indica di un eventuale errore nello scaricare lo stationXml
  }
  // Metodo non necessaria ma utile nel caso di cambio modalità di acquisizione del codice della stazione
  componentWillReceiveProps(nextProps){
    if(nextProps.properties.stationId!==this.state.stationId){
      this.setState({nome_stazione:nextProps.stationId})
    } 
  }

  // Metodo per scaricare il file station xml dal server 
  getStationXml = (stationId) => {
    axios.get('/api/Stazione/'+stationId+'/StationXml')
        .then((response) => {
          console.log(response)
            if (response.headers["content-type"] == "application/xml; charset=utf-8"){
              fileDownload(response.data, 'station.xml');
            }else{
              this.setState({downloadError:true});
            }
        })
  }
  

  render(){
    const {properties} = this.props;
    return(
      <React.Fragment>
        <Item.Group divided>
          <Item>
            <Item.Image  size='tiny'  src={DefaultStationImage} />
            <Item.Content>
              <Item.Header as='a'>{properties.stationId}</Item.Header>
              <Item.Meta>
                <span className='cinema'>Data messa in funzione : {properties.startDate}</span>
                <Label>{properties.stationType}</Label>
                <Label>{properties.isActive}</Label>
              </Item.Meta>
              <Item.Description>Numero Operazioni effettuate: {properties.operationCount}</Item.Description>
              <Item.Extra>
                <ExpansionPanel style={{backgroundColor:"#eceff1"}}>
                  <ExpansionPanelSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <ListOutlinedIcon  style={{color:"black",marginTop:2}}/>
                    <Typography align="center" variant="h5" style={{color:"black",paddingLeft:5}}>Attività</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                  <Box display="flex" flexDirection="column" flexGrow={1} >
                    <Button  basic color='blue' style={{margin:2}} onClick={() => {this.getStationXml(properties.stationId)}}>
                      <h4 style={{color:"#3f51b5"}}>Scarica Station Xml</h4> 
                    </Button>
                    <Button basic color='blue' style={{margin:2}} onClick={() => {properties.openStationInfo(properties.stationId)}}>
                      <h4 style={{color:"#3f51b5"}}>Visualizza Info</h4> 
                    </Button>
                    <Button basic color='blue' style={{margin:2}} onClick={() => {properties.openAddOperation(properties.stationId)}}>
                      <h4 style={{color:"#3f51b5"}}>Aggiungi Operazione</h4> 
                    </Button>
                  </Box>             
                  </ExpansionPanelDetails>
              </ExpansionPanel>
              </Item.Extra>
            </Item.Content>
          </Item>
        
        </Item.Group >
        <div> 
          {
            this.state.downloadError
            ?<Snackbar open={this.state.downloadError} autoHideDuration={2000} onClose={() => { this.setState({downloadError:false})}}>
                <MuiALert elevation={9} variant="filled" severity="error">
                    Non è stato possibile scaricare lo StationXml, controllare i canali della stazione!
                </MuiALert>
            </Snackbar>
            :<div></div>
          }   
        </div>
      </React.Fragment>
    );
  }
}
