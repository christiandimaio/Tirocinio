import React from 'react';
import SignUp from './components/sign_up/sign_up';
import Login from './components/log_in/login.js'
import {Box} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ParticlesBg from 'particles-bg'
import TopBar from './components/element/topbar.js';
import AnimatedLoader from './components/element/utils/loader.js'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import 'semantic-ui-css/semantic.min.css'
import {Grid} from 'semantic-ui-react';
import Request from 'axios-request-handler';
import Main from './components/main/main.js';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';


const styles = () => ({
	root: {
        flexGrow: 1,
    },
    
});

const reviews = new Request('api/NRL/update/status');


// Classe principale dell'applicazione, regola il log in, la registrazione degli utenti e la visualizzazione dell'app 
class App extends React.Component{
    _isMounted = false;
    constructor(){
        super();
        this.state = {
            modalFullScreenOpen:true,
            fullScreen:false,

            visibleSection : "logIN", //main - logIN - signIn : Rappresenta i tre stati in cui l'app può trovarsi all'apertura
            lockApp: {  //stato che permette di bloccare l'app nel caso di operazioni delicate lato server
                lockState:false,
                lockMessage:""
            }
        };
        
    }

    //Per capire la funzione di componentDidMount guardare la documentazione di react sui life cycle methods
    componentDidMount(){
        //Chiamata polling per conoscere lo stato di eventuale aggiornamento del database NRL
        reviews.poll(20000).get((response) => {
            const {result} = response.data;
            // Risposte - 200 Nessun aggiornamento
            //            201 Aggiornamento in corso
            //            199 Errore durante la richiesta
            if (result === 201){    
                this.lockAppRequest("Aggiornamento NRL in corso,attendere..")         

            }else if (result === 199){
                //Errore
            }else{
                this.releaseLockApp();
            }
            
          });
    }

    componentDidUpdate(prevProps,prevState){
        if (prevState.visibleSection === "logIN" && this.state.visibleSection === "main") {
            if (document.body.requestFullscreen) {
                document.body.requestFullscreen();
            } else if (document.body.mozRequestFullScreen) { /* Firefox */
                document.body.mozRequestFullScreen();
            } else if (document.body.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                document.body.webkitRequestFullscreen();
            } else if (document.body.msRequestFullscreen) { /* IE/Edge */
                document.body.msRequestFullscreen();
            }
        }else{
            if (document.body.exitFullscreen) {
                document.body.exitFullscreen();
            } else if (document.body.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.body.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.body.msExitFullscreen) {
                document.body.msExitFullscreen();
            }
        }
    }

    // Funzione chiamata quando è necessario bloccare l'interfaccia dell'app
    lockAppRequest = (message) => {
        this.setState(state => (state.lockApp.lockState  = true));
        this.setState(state => (state.lockApp.lockMessage  = message))
    }

    // Funzione chiamata quando bisogna sbloccare l'interfaccia dell'app
    releaseLockApp = () => {
        this.setState(state => (state.lockApp.lockState  = false));
        this.setState(state => (state.lockApp.lockMessage  = ""))
    }

    // Funzione cambiata quando viene richiesto di cambiare stato dell'app tra main - logIN e signUP
    changeView = (value) => { 
        this.setState({visibleSection:value});
    }

    // Funzione che renderizza tramite JSX la parte di html dedicata al contesto da dover visualizzare
    renderSwitch = () => {
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
                                            <SignUp changeView={this.changeView}/>           
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
                            <Grid.Column>
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
                    <>
                        <Modal open={this.state.modalFullScreenOpen} basic size='small'>
                            <Header icon='archive' content="Messaggio dall'app" />
                            <Modal.Content>
                            <p>
                                Questa applicazione richiede l'utilizzo del browser in modalità full screen,
                                procedere?
                            </p>
                            </Modal.Content>
                            <Modal.Actions>
                            <Button basic color='red' inverted onClick={() => {this.changeView("logIN")}}>
                                <Icon name='remove' /> No
                            </Button>
                            <Button color='green' inverted onClick={() => {this.setState({modalFullScreenOpen:false});this.setState({fullScreen:true})}}>
                                <Icon name='checkmark' /> Si
                            </Button>
                            </Modal.Actions>
                        </Modal>
                        <Main /> 
                        <AnimatedLoader properties={{message:this.state.lockApp.lockMessage,hidden:this.state.lockApp.lockState}}/>
                    </>
                );
            default:
                return(<div></div>);
        }
            
    }       
    
    // Funzione richiamata seguendo il life cycle della classe, renderizza il componente
    render(){

        return (
                    <Box display="flex" flexDirection="column" style={{height:"100vh",backgroundColor:this.state.visibleSection==="main"?"white":"transparent"}} overflow="hidden">
                        <Grid >
                            <Grid.Row >
                                <Grid.Column mobile={16} tablet={16} computer={16}>
                                    <TopBar changeView={this.changeView} isMain={this.state.visibleSection==="main"?true:false} nrlUpdateEvent={{lockState:this.state.lockApp.lockState,releaseLock:this.releaseLockApp,putLock:this.lockAppRequest}}/>
                                </Grid.Column>                     
                            </Grid.Row>
                        </Grid>
                        <Box display="flex" flexDirection="row" flexGrow={1} >
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


