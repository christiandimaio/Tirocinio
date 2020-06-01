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
import { Divider,Header,Icon } from 'semantic-ui-react'
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
export default class StationInfo extends React.Component{
    _isMounted=false
    constructor(props){
        super(props);
        this.state={
            codice_stazione:"",
            altezza_lv_mare:"",
            freq_manutenzione:"",
            tipo_stazione:"",
            nota_stazione:"",
            responsabili:[],
            storico_coordinate:[]
        }
        
    }

    componentDidUpdate(prevProps,prevState) {
        if (this.props.id_station !== prevProps.id_station) {
            this.getStazione()
        }
    }

    getStazione = () => {
        axios.get('/api/Stazione/'+this.props.id_station)
        .then((response) => {
            console.log(response.data.item);
            if(this._isMounted){
                this.setState({
                    codice_stazione: response.data.item.codice_stazione,
                    altezza_lv_mare:response.data.item.altezza_lv_mare,
                    freq_manutenzione:response.data.item.frequenza_manutenzione,
                    tipo_stazione:response.data.item.tipo_stazione,
                    nota_stazione:response.data.nota,
                    responsabili:response.data.responsabili,
                    storico_coordinate:response.data.storico_coordinate
                  });
            }
        })
        .catch((error) => {
            
        }
        );
    }
    componentWillMount(){
        this._isMounted=true
        this.getStazione()
    }

    render(){
       console.log(this.state.codice_stazione)
        
        return(
            <React.Fragment>
                <Grid padded >
                    <Grid.Row columns={1} >
                        <Grid.Column width={5} floated="right">
                            <h1>{this.state.codice_stazione}</h1>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1} >
                        <Grid.Column width={3}>
                            <h4>Altezza livello mare:</h4>
                        </Grid.Column>
                        <Grid.Column width={13} >
                            <h5>{this.state.altezza_lv_mare} mt.</h5>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1} >
                        <Grid.Column width={3} >
                            <h4>Frequenza manutenzione:</h4>
                        </Grid.Column>
                        <Grid.Column width={13} >
                            <h5>{this.state.freq_manutenzione} mese/i</h5>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1} >
                        <Grid.Column width={3}>
                            <h4>Tipologia stazione:</h4>
                        </Grid.Column>
                        <Grid.Column width={13} >
                            <h5>{this.state.tipo_stazione}</h5>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} >
                        <Grid.Column width={3} >
                            <h4>Nota stazione:</h4>
                        </Grid.Column>
                        <Grid.Column width={13} >
                            <h5>{this.state.nota_stazione}</h5>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1+this.state.responsabili.length} >
                        <Grid.Column width={3} >
                        <h4>Responsabili:</h4>
                        </Grid.Column>
                        {
                            this.state.responsabili.map((responsabile) => {
                                return(<Grid.Column width={3} >
                                    <h5>{responsabile}</h5>
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
                                        {this.state.storico_coordinate.map((localizzazione) => (
                                            <TableRow key={localizzazione.id}>
                                            <TableCell >{localizzazione.ultimo_aggiornamento}</TableCell>
                                            <TableCell >{localizzazione.latitudine}</TableCell>
                                            <TableCell >{localizzazione.longitudine}</TableCell>
                                            <TableCell>{localizzazione.ellissoide}</TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid.Column>
                    </Grid.Row>
                   
                </Grid>
                
        </React.Fragment>
        );
    }


}