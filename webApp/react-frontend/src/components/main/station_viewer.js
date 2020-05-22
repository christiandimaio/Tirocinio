import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import SettingsIcon from '@material-ui/icons/Settings';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import { Grid } from 'semantic-ui-react';
import {TextField, FormControl,Snackbar} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import OperazioniTable from '../element/operazioni_table.js';
import axios from 'axios';

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
      maxWidth: '100%',
      backgroundColor: theme.palette.background.paper,
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
        <AppBar position="relative" color="default" >
          <Tabs
            style={{flexGrow:1}}
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab label="Operazioni" icon={<AirportShuttleIcon />} {...a11yProps(0)} />
            <Tab label="Componenti" icon={<SettingsIcon />} {...a11yProps(1)} />
            <Tab label="Canali" icon={<PermDataSettingIcon />} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <Box diplay="flex" style={{maxHeight:"60%",overflow:"auto"}}>
                <OperazioniTable operazioni = {props.operazioni}/>
            </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
            In costruzione
        </TabPanel>
        <TabPanel value={value} index={2}>
            In costruzione
        </TabPanel>

      </div>
    );
  }

export default class StationViewer extends React.Component{
    _isMounted=false
    constructor(props){
        super(props)
        this.state={
            operazioni_stazione : []
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
                <Box display="flex"   width="100%">
                    <Paper elevation={3} style={{padding:6,width:"100%"}}>
                        <Grid padded style={{width:"100%"}}>
                            <Grid.Row columns={1} >
                                <Grid.Column width={5} floated="left">
                                    <h5>TEST</h5>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={1} >
                                <Grid.Column width={5} floated="left">
                                <h5>TEST</h5>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={1} >
                                <Grid.Column width={5} floated="left">
                                <h5>TEST</h5>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={1} >
                                <Grid.Column width={5} floated="left">
                                <h5>TEST</h5>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Paper>
                </Box>
                <Box display="flex" flexGrow={1} paddingTop={2} >
                    <ScrollableTabsButtonForce operazioni = {this.state.operazioni_stazione}></ScrollableTabsButtonForce>
                </Box>
                
                    <Fab variant="extended" style={{width:"5%",marginLeft:6,marginBottom:9}} onClick={() => this.props.close()}>
                        <ArrowBackIosIcon  />
                        Map
                    </Fab>
                
            </Box>
        );
    }

}


