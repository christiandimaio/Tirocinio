import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Pagination from '@material-ui/lab/Pagination';
import { Box } from '@material-ui/core';
import { Grid,Icon,Divider,Header } from 'semantic-ui-react';
import AddChannel from './add_channel.js';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  }
}));
//Componente in versione Hook per la visualizzazione e gestione di tutti i canali
// afferenti alla stazione sismica 
//  Props:
//        Metodi:
//                  1) callRender: Notifica la richiesta di renderizzazione del padre
//        Attributi:
//                  1) channels : tutti i canali dismessi e non afferenti alla stazione
//                  2) station : informazioni della stazione in formato struct
export default function Channels(props) {
    const classes = useStyles();
    const [rowsPerPage] = React.useState(4);
    const [page, setPage] = React.useState(1);


    const handlePageChange = (event,newPage) => {
        setPage(newPage)
    } 

  return (
    <div className={classes.root}>
        <AddChannel callRender={props.callRender} stationId={props.station.codice_stazione} />
        <Box>
            {
                (
                    rowsPerPage > 0
                    ? props.channels.slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage)
                    : props.channels
                ).map((channel) => {
                    console.log(channel)
                    return (
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                                <Typography variant="h5" >{channel.info.location_code !== ""?channel.info.location_code + " - ":""}{channel.acquisitore.seriale} - {channel.sensore.seriale} - {channel.info.componente_sensore}
                                    <Typography variant="h6" color="secondary">{channel.info.data_dismessa_canale !== null?"Dismesso":""}</Typography>
                                </Typography>

                                
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                            <Icon name="calendar"/>
                                            Registro canale
                                        </Header>
                                    </Divider>
                                    <Grid.Row columns={2}>
                                        <Grid.Column width={8}>
                                            <h3>Data Creazione:</h3><h5>{channel.info.data_creazione_canale}</h5>
                                        </Grid.Column>
                                        <Grid.Column  width={8}>
                                            <h3>Data Dismessa:</h3><h5>{channel.info.data_dismessa_canale}</h5>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                            <Icon name="database"/>
                                            Componentistica
                                        </Header>
                                    </Divider>
                                    <Grid.Row columns={5}>
                                        <Grid.Column >
                                            <h3>Sensore:</h3>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <h4>Seriale: {channel.sensore.seriale}</h4>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <h4>Produttore: {channel.sensore.produttore}</h4>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <h4>Nome: {channel.sensore.nome}</h4>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <h4>Componente: {channel.info.componente_sensore}</h4>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={5}>
                                        <Grid.Column>
                                            <h3>Acquisitore:</h3>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <h4>Seriale: {channel.acquisitore.seriale}</h4>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <h4>Produttore: {channel.acquisitore.produttore}</h4>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <h4>Nome: {channel.acquisitore.nome}</h4>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <h4>Canale: {channel.info.n_canale_acquisitore}</h4>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                            <Icon name="setting"/>
                                            Informazioni
                                        </Header>
                                    </Divider>
                                    <Grid.Row columns={4}>
                                        <Grid.Column width={3}>
                                            <h3>Azimuth: {channel.info.azimuth}°</h3>
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            <h3>Inclinazione: {channel.info.inclinazione}°</h3>
                                        </Grid.Column >
                                        <Grid.Column width={5}>
                                            <h3>Profondità(rispetto al piano stazione): {channel.info.profondita} mt.</h3>
                                        </Grid.Column>
                                        <Grid.Column width={5}>
                                            <h3>Altezza lv mare: {props.station.altezza_lv_mare - channel.info.profondita} mt.</h3>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                })
            }
        </Box>
     
      <Box display="flex" justifyContent="center" alignItems="flexe-end" width={1} paddingTop={1}>
        <Pagination color="primary" onChange={handlePageChange} count={Math.ceil(props.channels.length /rowsPerPage) } //Approssimo per eccesso
                            rowsPerPage={rowsPerPage}
                            page={page}/>
      </Box>
      
    </div>
  );
}