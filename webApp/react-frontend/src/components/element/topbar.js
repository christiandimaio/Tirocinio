import React from 'react';
import {Button,Box,AppBar,Toolbar,Menu,MenuItem,Typography,ListItemIcon} from '@material-ui/core' ;
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import FullScreenDialog from './magazzino.js'
import StoreIcon from '@material-ui/icons/Store';
import INGVLogo from '../../images/logo.png';
import { Image } from 'semantic-ui-react';
// const {MenuIcon} = MaterialUI.Menu;

// Guardare la documentazione di material ui per la parte di gestione temi :)
const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

///////////////////////////////////////////////////////
// Componente per la gestione della top bar dell'applicazione
//  Props :
//          1)Metodi:
//                    nrlUpdateEvent.putLock(str:messaggio) : locka la UI con un messaggio passato come parametro
//                    nrlUpdateEvent.releaseLock() : rilascia lock dell'interfaccia 
//          2)Attributi:
//                    isMain : indica alla top bar quali funzioni deve abilitare o meno a seconda che sia nel main o no

export default class TopBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : "", // Attributo per far comparire l'username dell'operatore collegato, NON USATO!
            menu:null,  // Attributo per la gestione dell'apertura del menu contestuale
            openMagazzino:false //Attributo per l'apertura della gestione del magazzino
        }
        
    }

    // Procedura per chiamare un aggiornamento di NRL 
    updateNrlCall = async () => {
        this.props.nrlUpdateEvent.putLock("Aggiornamento NRL in corso,attendere..");
        axios.get('api/NRL/update', {
          })
          .then((response) => {
            const {result} = response.data;
            if (result === 201){     //Aggiornamento già in corso
              this.props.nrlUpdateEvent.putLock("Aggiornamento NRL in corso,attendere..")        
            }else{
              this.props.nrlUpdateEvent.releaseLock();
            }
          });
    }
    
    openMagazzino = (value) =>{
      this.setState({openMagazzino:value})
    }

    logout = () => {
        axios.get("api/logout"
                ).then((response) => {
                    console.log(response);
                    if (response.data["operationCode"]===200){
                        console.log("OK, Logout");
                        window.location = "/login";
                    }

                })

    }

    render(){
        return (
            <AppBar position="static" style={{background:"#3f51b5"}}>
              <Toolbar >
                <Box display="flex" style={{flexGrow:1}}>
                    <Image src={INGVLogo} size="mini" fluid/>
                    <Typography variant="h5" style={{paddingLeft:4}}>
                    Istituto Nazionale Geofisica e Vulcanologia
                    </Typography>
                </Box>
                <Button 
                      aria-controls="customized-menu"
                      aria-haspopup="true"
                      variant="contained"
                      color="inherit"
                      style={{background:"#1a237e"}}
                      onClick={(event) => {this.setState({menu:event.currentTarget})}}
                >
                    Open Menu
                </Button>
                <StyledMenu
                  id="customized-menu"
                  open={Boolean(this.state.menu)}
                  keepMounted
                  anchorEl={this.state.menu}
                  onClose={() => {this.setState({menu:null})}}
                    
                >
                  <React.Fragment>
                    { 
                      this.props.isMain
                        ? ( 
                            <React.Fragment>
                              <StyledMenuItem  onClick={() => this.logout()}>
                                <ListItemIcon>
                                    <ExitToAppIcon style={{fill: "#1a237e"}}  fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Log Out" />
                              </StyledMenuItem>
                              <StyledMenuItem  onClick={() => this.openMagazzino(true)}>
                                <ListItemIcon>
                                  <StoreIcon style={{fill: "#1a237e"}}  fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Gestisci Magazzino" />
                              </StyledMenuItem>
                              <FullScreenDialog open={this.state.openMagazzino} handleChange={this.openMagazzino}/>
                            </React.Fragment>
                          )
                        :<></>
                    } 
                  </React.Fragment>
                  <StyledMenuItem onClick={() => this.updateNrlCall()}>
                  <ListItemIcon>
                      <SystemUpdateAltIcon style={{fill: "#1a237e"}}  fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Aggiorna Database NRL" />
                  </StyledMenuItem>
                </StyledMenu>          
              </Toolbar>
            </AppBar>
        
        );
    }
}