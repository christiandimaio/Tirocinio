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
import { Divider,Header } from 'semantic-ui-react'
import Button from '@material-ui/core/Button';
import AddOperation from '../element/add_operation.js';
import StationViewer from './station_viewer.js';
import 'typeface-roboto';
export default class Main extends React.Component{
  _isMounted=false;
  constructor(props){
    super(props);
    this.state={
      ...props,
      openAddStation:false,
      station_summary:[],
      openAddOperationModal:false,
      addOperation_StationId:null,
      open_station_info:{
        open:false,
        id_station:""
      }
    }
  }

  openStationInfo = (id_stazione) => {
    this.closeStationInfo()
    this.setState(state => (state.open_station_info.open  = true, state));
    this.setState(state => (state.open_station_info.id_station  = id_stazione, state));
  }

  closeStationInfo = () => {
    this.setState(state => (state.open_station_info.open  = false, state));
    this.setState(state => (state.open_station_info.id_station  = "", state));
  }

  addOperationDialogOpen = (nome_stazione) => {
    this.setState({openAddOperationModal:true,addOperation_StationId:nome_stazione});
  }
  addOperationDialogClose = () => {
    this.setState({openAddOperationModal:false,addOperation_StationId:""});
    this.retrieveStationInfo()
  }

  
  componentWillUnmount(){
    this._isMounted=false;
  }

  forceReRender = () => {
    
    this.setState({state:this.state})
  }

  componentDidMount() {
    this._isMounted=true;
    this.retrieveStationInfo()
  }

  retrieveStationInfo = () =>{
    console.log("reload UI")
    axios.get('/api/Stazioni/info')
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
    console.log(this.state.openAddOperationModal);
    console.log(this.state.station_summary);
    return (
     
            <>
              <Grid padded columns="1" centered style={{minWidth:"25vw", maxHeight:"90vh",overflow:"auto"}}>
                <Grid.Column mobile={16} tablet={5} computer={4} style={{flexGrow:1,maxHeight:"100%"}} >
                    {
                      this.state.station_summary.map((item) => 
                      <>
                      <Paper elevation={3} style={{padding:7}}>
                        <StationCard properties={{id_stazione:item["id_univoco"],
                                                nome_stazione:item["codice"],
                                              tipo_stazione:item["tipo_stazione"],
                                              messa_funzione:item["data_messa_funzione"],
                                              numero_operazioni_svolte:item["numero_operazioni"],
                                              is_attiva:item["is_attiva"],
                                            getInfo:this.openStationInfo,
                                            openAddOperationModal:this.addOperationDialogOpen}}
                          />
                      </Paper>
                      <Divider />
                      
                    </>
                      )
                    }
                    <AddOperation open={this.state.openAddOperationModal} handleClose={this.addOperationDialogClose} station_id={this.state.addOperation_StationId}/>
                    <AddNewStation callReRender={this.retrieveStationInfo}/>
                </Grid.Column>
              </Grid>                       
                        
              <Grid padded columns="1" style={{flexGrow:1,maxHeight:"100%"}}>
                <Grid.Column stretched mobile={16} tablet={16} computer={16}>
                  <Box display="flex" flexGrow={1}>
                    <Paper elevation={3} style={{flexGrow:1}}>
                      {
                        this.state.open_station_info.open
                        ?<StationViewer close={this.closeStationInfo} id_station={this.state.open_station_info.id_station}></StationViewer>
                        :<StationMap stations_info={this.state.station_summary}/>
                      }
                      
                    </Paper>
                  </Box>              
                </Grid.Column>                 
              </Grid>
              
            
            </>
            );
    } 

}
