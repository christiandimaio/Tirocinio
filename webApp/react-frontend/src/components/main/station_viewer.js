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
import StationInfo from '../element/station_info.js';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import OperazioniTab from '../element/operazioni_tab.js';
import axios from 'axios';
import zIndex from '@material-ui/core/styles/zIndex';
import HomeIcon from '@material-ui/icons/Home';
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
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow:1,
      maxWidth: '100%'
    },
  }));
  
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
          <Box display="flex" flexGrow={1} height={1}>
              <Paper elevation={3} style={{padding:6,flexGrow:1,width:"100%",height:"100%"}}>
                  <StationInfo id_station={props.id_station}/>
              </Paper>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} >
          <OperazioniTab operazioni = {props.operazioni}/>             
        </TabPanel>
        <TabPanel value={value} index={2}>
            In costruzione
        </TabPanel>
        <TabPanel value={value} index={3}>
            In costruzione
        </TabPanel>
     
        </Grid.Column>
      </Grid.Row>
     
      </Grid>
      </div>
    );
  }

export default class StationViewer extends React.Component{
    _isMounted=false
    constructor(props){
        super(props)
        this.state={
            operazioni_stazione : [],
            info_stazione: null
        }
    }

    componentDidUpdate(prevProps,prevState) {
        if (this.props.id_station !== prevProps.id_station) {
            this.getOperazioniStazione()
            
        }
    }

    componentDidMount(){
        console.log("-------------------------------------------------");
        this.getOperazioniStazione()
        
    }

    getOperazioniStazione = () => {
        axios.get('/api/Stazione/'+this.props.id_station+'/Operazioni')
        .then((response) => {
            console.log(response.data["data"]);
                this.setState({
                    operazioni_stazione: response.data["data"]
                }); 
        })
        .catch((error) => {
            
        }
        );
    }

    

    render(){
        return(
            <Box display="flex" width="100%" height="100%" flexDirection="column">
                
                <Box display="flex" flexGrow={1}  >
                    <ScrollableTabsButtonForce operazioni = {this.state.operazioni_stazione} id_station={this.props.id_station}></ScrollableTabsButtonForce>
                </Box>
                
                    <Fab variant="extended" style={{width:"5%",marginLeft:6,marginBottom:9}} onClick={() => this.props.close()}>
                        <ArrowBackIosIcon  />
                        Map
                    </Fab>
                
            </Box>
        );
    }

}


