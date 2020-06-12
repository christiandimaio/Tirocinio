import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import SettingsIcon from '@material-ui/icons/Settings';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import { Grid } from 'semantic-ui-react';
import StationInfo from '../element/tab_station_info.js';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import OperazioniTab from '../element/tab_operation.js';
import axios from 'axios';
import HomeIcon from '@material-ui/icons/Home';
import CanaliTab from '../element/tab_channel.js';

// Componente con design Hooks per la renderizzazione del pannello tab nella schermata di informazione stazione
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles(() => ({
    root: {
      flexGrow:1,
      maxWidth: '100%'
    },
  }));

// Componente design Hooks per la renderizzazione di tutte le sezioni del tab
//  Props:
//        Attributi:
//                  1) stationId : codice identificativo stazione
//                  2) stationOperations : operazioni su stazione -> array di struct
function ScrollableTabsButtonForce(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
      <Grid>
      <Grid.Row columns={1}>
        <Grid.Column width={16}>
        <AppBar style={{zIndex:0}} position="relative" color="default" >
          <Tabs
            style={{maxHeight:"100%"}}
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab label="Informazioni Stazione" icon={<HomeIcon />} {...a11yProps(0)} />
            <Tab label="Operazioni" icon={<AirportShuttleIcon />} {...a11yProps(1)} />
            <Tab label="Componenti" icon={<SettingsIcon />} {...a11yProps(2)} />
            <Tab label="Canali" icon={<PermDataSettingIcon />} {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Box display="flex" flexGrow={1} height={0.5}>
              <Paper elevation={3} style={{padding:6,flexGrow:1,width:"100%",height:"100%"}}>
                  <StationInfo stationId={props.stationId}/>
              </Paper>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} >
          <OperazioniTab stationOperations = {props.stationOperations}/>             
        </TabPanel>
        <TabPanel value={value} index={2}>
            In costruzione
        </TabPanel>
        <TabPanel value={value} index={3}>
            <Box display="flex" flexGrow={1} width={1}>
              <CanaliTab stationId={props.stationId}/>
            </Box>
        </TabPanel>
     
        </Grid.Column>
      </Grid.Row> 
      </Grid>
      </div>
    );
  }


// Componente che si occupa della gestione e visualizzazione delle informazioni della stazione
//  Props:
//        Metodi:
//              1) close : metodo per richiedere della chiusura della sezione informazioni della stazione in question
//        Attributi:
//              1) stationId : codice univoco della stazione della quale visualizzare le informazioni
export default class StationViewer extends React.Component{
    _isMounted=false
    constructor(props){
      super(props)
      this.state={
          stationOperations : [], // Attributo di stato circa tutte le operazioni svolte sulla stazione
          stationInfo: null
      }
    }

    componentDidUpdate(prevProps,prevState) {
      if (this.props.stationId !== prevProps.stationId) {
          this.getOperazioniStazione()
          
      }
    }

    componentDidMount(){
        console.log("-------------------------------------------------");
        this.getOperazioniStazione()
    }

    getOperazioniStazione = () => {
        axios.get('/api/Stazione/'+this.props.stationId+'/Operazioni')
        .then((response) => {
            console.log(response.data["data"]);
                this.setState({
                  stationOperations: response.data["data"]
                }); 
        })
    }

    

    render(){
        return(
            <Box display="flex" width="100%" height="100%" flexDirection="column">             
              <Box display="flex" flexGrow={1}  >
                <ScrollableTabsButtonForce stationOperations = {this.state.stationOperations} stationId={this.props.stationId}/>
              </Box>
              <Fab variant="extended" style={{width:"5%",marginLeft:6,marginBottom:9}} onClick={() => this.props.close()}>
                <ArrowBackIosIcon  />
                Map
              </Fab>
            </Box>
        );
    }

}


