import React,{ useState ,Component}  from 'react';
import ReactDOM from 'react-dom';
import Sign_Up from './components/sign_up/sign_up';
import Login from './components/log_in/login.js'
import {Box} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import ParticlesBg from 'particles-bg'
import TopBar from './components/element/topbar.js';
import AnimatedLoader from './components/element/loader.js'
import axios from 'axios';
import GridList from '@material-ui/core/GridList';
import { sizing } from '@material-ui/system';
import ImageGridList from './components/main/main.js'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import 'semantic-ui-css/semantic.min.css'
import {Grid,Image} from 'semantic-ui-react';
import SimpleCard from './components/element/station_card.js';
import Request from 'axios-request-handler';
const paperStyle = {};
const styles = theme => ({
	root: {
        flexGrow: 1,
    },
    
});

const reviews = new Request('api/check/directory/nrl');



class App extends React.Component{
    _isMounted = false;
    constructor(){
        super();
        this.state = {
            visibleSection : "logIN",
            lockApp: {
                lockState:false,
                lockMessage:""
            }
        };
        
    }
    componentWillMount(){
        reviews.poll(5000).get((response) => {
            const {result} = response.data;
            console.log(result);
            if (result == 201){     //Aggiornamento già in corso
                this.lockAppRequest("Aggiornamento NRL in corso,attendere..")         

            }else if (result == 199){
                //Errore
            }else{
                this.releaseLockApp();
            }
            
          });
        
    }

    lockAppRequest = (message) => {
        this.setState(state => (state.lockApp.lockState  = true, state));
        this.setState(state => (state.lockApp.lockMessage  = message, state))
    }

    releaseLockApp = () => {
        this.setState(state => (state.lockApp.lockState  = false, state));
        this.setState(state => (state.lockApp.lockMessage  = "", state))
    }

    changeView = (value) => { 
        this.setState({visibleSection:value});
    }

    renderSwitch = () => {
        const { classes } = this.props;
        switch(this.state.visibleSection){
            case "signUP" :
                return (
                    <>
                        <Box display="flex" flexDirection="row" flexGrow={1} style={{opacity:"99%"}} justifyContent="center"
                            alignItems="center"
                            >     
                            <Grid centered columns="1">
                                <Grid.Row>
                                    <Grid.Column mobile={16} tablet={8} computer={6} >
                                        <Paper elevation={3} >
                                            <Sign_Up changeView={this.changeView}  dadProps={this.state} />           
                                        </Paper>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Box>
                        <>
                        <ParticlesBg type="cobweb"  color="#1a237e" bg={true} /> 
                        </>
                        
                        <AnimatedLoader properties={{message:this.state.lockApp.lockMessage,hidden:this.state.lockApp.lockState}}/>
                    </>
                );
            case "logIN":
                return(
                    <Box  display="flex" width="100%" height="100%" flexDirection="column"  alignItems="center" justifyContent="center" >
                    
                    <Grid centered  >
                        
                            <Grid.Column  >
                                <Paper elevation={3} style={{backgroundColor:"#f5f5f5",padding:"15%"}}>
                                    
                                    <Login changeView={this.changeView}/>
                                    
                        
                                </Paper> 
                            </Grid.Column >
                          
                    </Grid>
                    <ParticlesBg type="cobweb"  color="#1a237e" bg={true} /> 
                    <AnimatedLoader properties={{message:this.state.lockApp.lockMessage,hidden:this.state.lockApp.lockState}}/>
                    </Box>
                   
                );
            case "main":
                return(
                    // <Grid container direction="row" className={classes.root}>

                    //         <Grid item xl={3} xs={3} style={{height:"93vh"}} spacing={2} >
                               
                    //         <ImageGridList></ImageGridList>
                    //         </Grid>
                        
                    //     <Grid item xl={9} xs={9} style={{height:"93vh"}} spacing={2}>
                    //       <Paper style={{height:"90%",width:"90%"}}></Paper>
                    //     </Grid>
                    // </Grid>
                    // <div className={classes.root}>
                    //     <Grid container direction="row" spacing={2}>

                    //             <Grid item xl={3} xs={3} spacing={2} >
                                
                    //             <ImageGridList></ImageGridList>
                    //             </Grid>
                            
                    //         <Grid item xl={9} xs={9} spacing={2}>
                    //         <Paper ></Paper>
                    //         </Grid>
                    //     </Grid>
                    // </div>
                    <>
                    <Grid padded columns="1" centered style={{flexGrow:1,maxHeight:"92vh",overflow:"auto"}}>
                                <Grid.Column mobile={16} tablet={5} computer={4} style={{flexGrow:1,maxHeight:"100%"}} >
                                <SimpleCard/>
                                <SimpleCard/>
                                <SimpleCard/>
                                <SimpleCard/>
                                <SimpleCard/>
                                <SimpleCard/>
                                </Grid.Column>
                        </Grid>
                        <Grid padded columns="1" style={{flexGrow:1,maxHeight:"100%"}}>
                            <Grid.Column stretched mobile={16} tablet={11} computer={16}>
                                <Box display="flex" flexGrow={1}>
                                <Paper elevation={3} style={{flexGrow:1}}>
                                <Image fluid src='https://mcdn.wallpapersafari.com/medium/27/89/JuICQz.jpg'></Image>
                                </Paper>
                                </Box>
                                
                                
                                </Grid.Column>
                            
                        </Grid>
                    </>
                );
            case "default":
                return(<div></div>);
        }
            
    }           
    render(){
        const { classes } = this.props;
        return (
                    // <Grid containter direction="column" className={classes.root}>

                    //         <Grid item style={{width:"100%",height:"6vh"}} >
                    //                 <TopBar isMain={false}  nrlUpdateEvent={{lockState:this.state.lockApp.lockState,releaseLock:this.releaseLockApp,putLock:this.lockAppRequest}}/>   
                    //         </Grid>

                    //         <Grid item style={{width:"100%",height:"100%",paddingTop:"4vh"}} container className={classes.root}>
                    //             {
                    //                 this.renderSwitch()
                    //             } 
                    //         </Grid>

                    // </Grid> 
                    // <Grid direction="row" contatiner className={classes.root}>
                    //     <Grid item xl={12} xs={12}>
                            
                    //             <TopBar isMain={false}  nrlUpdateEvent={{lockState:this.state.lockApp.lockState,releaseLock:this.releaseLockApp,putLock:this.lockAppRequest}}/>  
                        
                    //     </Grid>
                    //     <Grid item xl={12} xs={12} container>

                    //     {
                    //                     this.renderSwitch()
                    //                 } 
                    //     </Grid>       
                                    
                               

                        
                    // </Grid>

                    <Box display="flex" flexDirection="column" style={{height:"100vh"}}>
                        <Grid >
                        <Grid.Row >
                            <Grid.Column mobile={16} tablet={16} computer={16}>
                            <TopBar isMain={this.state.visibleSection=="main"?true:false} nrlUpdateEvent={{lockState:this.state.lockApp.lockState,releaseLock:this.releaseLockApp,putLock:this.lockAppRequest}}/>
                            </Grid.Column>                     
                        </Grid.Row>
                        </Grid>
                        <Box display="flex" flexWrap="wrap" flexGrow={1} >
                        {
                                        this.renderSwitch()
                                    } 
                        </Box>
                        
                    </Box>
                  
            

                
            );
    }
}
App.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);


