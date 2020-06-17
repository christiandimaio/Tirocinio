import React from 'react';
import Box from '@material-ui/core/Box';
import Channels from './card_channel.js';
import axios from 'axios';

// Componente per la gestione del tab canale della sezione info
//  Props:
//        Attributi:
//                  1) stationId : codice della stazione
export default class CanaliTab extends React.Component {
    _isMounted=false
    constructor(props){
        super(props)
        this.state={
            channels:[],
            station:[]
        }
    }
    // Verificare i life-cycle methods per capire l'evoluzione di componentWillMound,
    //  comunque questo metodo permette di recuperare tutti i cananli della stazione
    componentWillMount(){
        this._isMounted=true
        this.getChannels()
    }

    forceReRender = () => {
        this.getChannels()
    }
    getChannels = () => {
        axios.get('/api/Stazione/'+this.props.stationId+"/Canali")
        .then((response) => {
            console.log(response.data.item);
            if(this._isMounted){
                this.setState({
                    channels: response.data.items,
                    station: response.data.stazione
                });
            }  
        })
    }

    
    render(){
        return(
            <React.Fragment>
                <Box display="flex" flexGrow={1} width={1} height={1}>
                    <Channels callRender={this.forceReRender} station={this.state.station} channels={this.state.channels}/>
                </Box>
            </React.Fragment>
            
        );
    }
}