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
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}));

export default function CardExampleFluid(props) {
    const classes = useStyles();
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const [page, setPage] = React.useState(1);

    const handlePageChange = (event,newPage) => {
        setPage(newPage)
    } 
  return (
    <div className={classes.root}>
        <Box>
            {
                (
                    rowsPerPage > 0
                    ? props.canali.slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage)
                    : props.canali
                ).map((canale) => {
                    return (
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography variant="h5" >{canale.info.location_code}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                            <Icon name="calendar"/>
                                            Registro canale
                                        </Header>
                                    </Divider>
                                    <Grid.Row >
                                        <Grid.Column width={8}>
                                            <h3>Data Creazione:</h3><h5>{canale.info.data_creazione_canale}</h5>
                                        </Grid.Column>
                                        <Grid.Column  width={8}>
                                            <h3>Data Dismessa:</h3><h5>{canale.info.data_dismessa_canale}</h5>
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
                                            <h4>Seriale: {canale.sensore.seriale}</h4>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <h4>Produttore: {canale.sensore.produttore}</h4>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <h4>Nome: {canale.sensore.nome}</h4>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <h4>Componente: {canale.info.componente_sensore}</h4>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={5}>
                                        <Grid.Column>
                                            <h3>Acquisitore:</h3>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <h4>Seriale: {canale.acquisitore.seriale}</h4>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <h4>Produttore: {canale.acquisitore.produttore}</h4>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <h4>Nome: {canale.acquisitore.nome}</h4>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <h4>Canale: {canale.info.n_canale_acquisitore}</h4>
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
                                            <h3>Azimuth: {canale.info.azimuth}°</h3>
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            <h3>Inclinazione: {canale.info.inclinazione}°</h3>
                                        </Grid.Column >
                                        <Grid.Column width={5}>
                                            <h3>Profondità(rispetto al piano stazione): {canale.info.profondita} mt.</h3>
                                        </Grid.Column>
                                        <Grid.Column width={5}>
                                            <h3>Altezza lv mare: {props.stazione.altezza_lv_mare - canale.info.profondita} mt.</h3>
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
        <Pagination color="primary" count={10} onChange={handlePageChange} count={props.canali.length % rowsPerPage}
                            rowsPerPage={rowsPerPage}
                            page={page}/>
      </Box>
      
    </div>
  );
}