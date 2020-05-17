import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Wrapper } from '@material-ui/pickers/wrappers/Wrapper';
import {Grid,Image} from 'semantic-ui-react';
import TopBar from '../element/topbar.js';
import 'semantic-ui-css/semantic.min.css'
import {Box} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Adder from '../element/adder.js';
import StationCard from '../element/station_card.js';
import StationMap from './map.js';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import AddNewStation from './add_station.js';
import Button from '@material-ui/core/Button';
export default class Main extends React.Component{
  _isMounted=false;
  constructor(props){
    super(props);
    this.state={
      ...props,
      openAddStation:false,
      station_summary:[]
    }

  }

  getStationInfo = (station_id) => {
    console.log("Richiesta visualizzazione info per stazione :" + station_id);
  }

  componentWillUnmount(){
    this._isMounted=false;
  }
  componentDidMount() {
    this._isMounted=true;
    axios.get('/api/stations/summary')
        .then((response) => {
          
          if(this._isMounted){
            console.log(response.data["data"]);
              this.setState({
                station_summary: response.data["data"]
              });
          }
          
      })
      .catch((error) => {
         
              
          
      }
    );
  }

  createStation = (state) => {
    if(this._isMounted){
      this.setState({openAddStation:state})
    }
  }


  render(){
    console.log(this.state.openAddStation);
    console.log(this.state.station_summary);
    return (
     
            <>
              <Grid padded columns="1" centered style={{minWidth:"25vw", maxHeight:"90vh",overflow:"auto"}}>
                <Grid.Column mobile={16} tablet={5} computer={4} style={{flexGrow:1,maxHeight:"100%"}} >
                    {
                      this.state.station_summary.map((item) => 
                      <StationCard properties={{id_stazione:item["id_univoco"],
                                              nome_stazione:item["codice"],
                                            tipo_stazione:item["tipo_stazione"],
                                            messa_funzione:item["data_messa_funzione"],
                                            numero_operazioni_svolte:item["numero_operazioni"],
                                            is_attiva:item["is_attiva"],
                                          getInfo:this.getStationInfo}}
                        />
                      )
                    } 
                    
                    <AddNewStation />
                </Grid.Column>
                
              </Grid>                       
                        
              <Grid padded columns="1" style={{flexGrow:1,maxHeight:"100%"}}>
                <Grid.Column stretched mobile={16} tablet={11} computer={16}>
                  <Box display="flex" flexGrow={1}>
                    <Paper elevation={3} style={{flexGrow:1}}>
                      <StationMap stations_info={this.state.station_summary}/>
                    </Paper>
                  </Box>              
                </Grid.Column>                 
              </Grid>
            
            </>
            );
    } 

}
