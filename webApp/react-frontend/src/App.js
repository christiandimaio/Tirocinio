import React,{ useState ,Component}  from 'react';
import ReactDOM from 'react-dom';
import Sign_Up from './components/sign_up/sign_up';
import Login from './components/log_in/login.js'
import {Box,Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import ParticlesBg from 'particles-bg'
import TopBar from './components/element/topbar.js';
import AnimatedLoader from './components/element/loader.js'
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

export default class App extends React.Component{

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
        axios.get('/check/directory/nrl', {
          })
          .then((response) => {
            const {result} = response.data;
            if (result == 201){     //Aggiornamento già in corso
                this.lockAppRequest("Aggiornamento NRL in corso,attendere..")         

            }else if (result == 199){
                //Errore
            }else{
                //Concluso
            }
            
          })
          .catch((error) => {
            //ERRORE
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
        switch(this.state.visibleSection){
            case "signUP" :
                return (<Box display="flex" style={{opacity:"99%"}} justifyContent="center"
                            alignItems="center"
                            minHeight="90vh">     
                            <Container maxWidth="sm" >
                                <Paper elevation={3} >
                                    <Sign_Up changeView={this.changeView}  dadProps={this.state} />           
                                </Paper>
                            </Container> 
                        </Box>
                );
            case "logIN":
                return(
                    <Box display="flex" justifyContent="center"
                            minHeight="90vh"
                            alignItems="center">
                        <Box style={{minWidth:"35%"}}>
                            <Paper elevation={3} style={{backgroundColor:"#f5f5f5"}}>
                                <Login changeView={this.changeView}/>
                    
                            </Paper> 
                        </Box>
                    </Box>
                );
            case "main":
                return(<div><Paper elevation={3} ></Paper></div>);
            case "default":
                return(<div></div>);
        }
            
    }           
    render(){
        return (
            <div>
                <Box displpay="flex" minHeight="10vh">
                    <TopBar isMain={false} nrlUpdateEvent={{lockState:this.state.lockApp.lockState,releaseLock:this.releaseLockApp,putLock:this.lockAppRequest}}/>
                </Box>
                <div>
                {
                    this.renderSwitch()
                }
                </div>
                    
                    <ParticlesBg type="cobweb"  color="#1a237e" bg={true} /> 
                    <AnimatedLoader properties={{message:this.state.lockApp.lockMessage,hidden:!(this.state.lockApp.lockState)}}/>
            </div>
            );
    }
}
ReactDOM.render(<App/>,document.getElementById('root'))
