import React from 'react';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';
import 'typeface-roboto';


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
                    responsabili:response.data.responsabili
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
                <Grid.Row  >
                    
                    
                </Grid.Row>
            </Grid>

        );
    }


}