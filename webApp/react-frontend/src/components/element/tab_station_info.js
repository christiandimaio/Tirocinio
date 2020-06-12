import React from 'react';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';
import 'typeface-roboto';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Divider,Header } from 'semantic-ui-react'
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import DateTimePicker from './utils/date_picker';
import { Button } from 'semantic-ui-react'

// Componente per la visualizzazione della scheda riassuntiva della stazione sismica
// Props:
//      Attributi:
//              1) stationId : codice della stazione sismica in oggetto

export default class StationInfo extends React.Component{
    _isMounted=false
    constructor(props){
        super(props);
        var today=new Date();
        this.state={
            stationxml_filter:{
                from:today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate(),
                to:today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate()
            }, // Attributo di stato che conserva il limite inferiore e superiore del filtro su stationXml
            heightAboveSeaLevel:"", // altezza livello mare stazione
            maintenancePeriod:"", // Frequenza di manutenzione stazione
            stationType:"", // Tipologia stazione
            note:"", // Eventuali note relative alla stazione
            supervisors:[], // Responsabili -> array di struct
            geoLocationsHistory:[] // Storico delle coordinate della stazione -> array di struct
        }
        
    }

    // Metodi di controllo dati 
    handleDataStationXmlLowBound = (value) => {
        let {stationxml_filter} = this.state;
        stationxml_filter.from =value.getFullYear()+"/"+(value.getMonth()+1)+"/"+value.getDate()
        this.setState({stationxml_filter})
    }

    handleDataStationXmlUpperBound = (value) => {
        let {stationxml_filter} = this.state;
        stationxml_filter.to =value.getFullYear()+"/"+(value.getMonth()+1)+"/"+value.getDate()
        this.setState({stationxml_filter})
    }
    ///

    componentDidUpdate(prevProps,prevState) {
        if (this.props.stationId !== prevProps.stationId) {
            this.getStazione()
        }
    }

    // Metodo per il download dello station xml 
    getStationXml = () => {
        var fileDownload = require('js-file-download');
        axios.get('/api/Stazione/'+this.props.stationId+'/StationXml',{
            params:{
                data_creazione_canale:this.state.stationxml_filter.from,
                data_dismessa_canale:this.state.stationxml_filter.to
            }
          })
            .then((response) => {
              console.log(response)
                if (response.headers["content-type"] == "application/xml; charset=utf-8"){
                  fileDownload(response.data, 'filename.xml');
                }else{
                  this.setState({errore_download:true});
                }
          })
      }
    

    getStazione = () => {
        axios.get('/api/Stazione/'+this.props.stationId)
        .then((response) => {
            console.log(response.data.item);
            if(this._isMounted){
                this.setState({
                    heightAboveSeaLevel:response.data.item.altezza_lv_mare,
                    maintenancePeriod:response.data.item.frequenza_manutenzione,
                    stationType:response.data.item.tipo_stazione,
                    note:response.data.nota,
                    supervisors:response.data.responsabili,
                    geoLocationsHistory:response.data.storico_coordinate
                  });
            }
        })
    }
    componentWillMount(){
        this._isMounted=true
        this.getStazione()
    }

    render(){
        return(
            <React.Fragment>
                <Grid padded >
                    <Grid.Row columns={1} >
                        <Grid.Column width={5} floated="right">
                            <h1>{this.props.stationId}</h1>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1} >
                        <Grid.Column width={3}>
                            <h4>Altezza livello mare:</h4>
                        </Grid.Column>
                        <Grid.Column width={13} >
                            <h5>{this.state.heightAboveSeaLevel} mt.</h5>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1} >
                        <Grid.Column width={3} >
                            <h4>Frequenza manutenzione:</h4>
                        </Grid.Column>
                        <Grid.Column width={13} >
                            <h5>{this.state.maintenancePeriod} mese/i</h5>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1} >
                        <Grid.Column width={3}>
                            <h4>Tipologia stazione:</h4>
                        </Grid.Column>
                        <Grid.Column width={13} >
                            <h5>{this.state.stationType}</h5>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} >
                        <Grid.Column width={3} >
                            <h4>Nota stazione:</h4>
                        </Grid.Column>
                        <Grid.Column width={13} >
                            <h5>{this.state.note}</h5>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1+this.state.supervisors.length} >
                        <Grid.Column width={3} >
                        <h4>Responsabili:</h4>
                        </Grid.Column>
                        {
                            this.state.supervisors.map((supervisor) => {
                                return(<Grid.Column width={3} >
                                    <h5>{supervisor}</h5>
                                </Grid.Column>
                                )
                            })
                        }
                    </Grid.Row>
                    <Divider horizontal>
                        <Header as='h4'>
                            <GpsFixedIcon style={{paddingRight:3}}/>
                            Storico Coordinate
                        </Header>
                    </Divider>
                    <Grid.Row centered>
                        <Grid.Column width={13} textAlign="center">
                            <Paper>
                                
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Rilevazione</TableCell>
                                                <TableCell>Latitudine</TableCell>
                                                <TableCell>Longitudine</TableCell>
                                                <TableCell>Ellissoide rif.</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {this.state.geoLocationsHistory.map((geoLoc) => (
                                            <TableRow key={geoLoc.id}>
                                            <TableCell >{geoLoc.ultimo_aggiornamento}</TableCell>
                                            <TableCell >{geoLoc.latitudine}</TableCell>
                                            <TableCell >{geoLoc.longitudine}</TableCell>
                                            <TableCell>{geoLoc.ellissoide}</TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider horizontal>
                        <Header as='h4'>
                            <GpsFixedIcon style={{paddingRight:3}}/>
                            Storico StationXml
                        </Header>
                    </Divider>
                    <Grid.Row centered columns={3}>
                        <Grid.Column textAlign="center">
                            <DateTimePicker properties={{
                                                            width:"90%",
                                                            id:"da_picker",
                                                            label:"Da",
                                                            name:"stationxml_da"
                                                        }}
                                                        onChange={this.handleDataStationXmlLowBound}
                                                        />
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            <DateTimePicker properties={{
                                                            width:"90%",
                                                            id:"a_picker",
                                                            label:"A",
                                                            name:"stationxml_a"
                                                        }}
                                                            onChange={this.handleDataStationXmlUpperBound}
                                                        />
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                        <Button style={{marginTop:"4%",backgroundColor:"#3f51b5",color:"white",}} onClick={this.getStationXml}>
                            <h4 color="white">Scarica StationXml</h4>
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                
                
        </React.Fragment>
        );
    }


}