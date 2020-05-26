import React from 'react';
import {AccountCircle,Button,Grid,Spacing,Box,Positions,Divider,AppBar,Toolbar,Menu,MenuItem,IconButton,Typography,ListItemIcon} from '@material-ui/core' ;
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';


import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import FullScreenDialog from './magazzino.js'

// const {MenuIcon} = MaterialUI.Menu;


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

export default class TopBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            menu:null,
            open_magazzino:false
        }
        
    }


    updateNrlCall = async () => {
        this.props.nrlUpdateEvent.putLock("Aggiornamento NRL in corso,attendere..");
        axios.get('api/update/NRL', {
          })
          .then((response) => {
            const {result} = response.data;
            if (result === 201){     //Aggiornamento già in corso
                this.props.nrlUpdateEvent.putLock("Aggiornamento NRL in corso,attendere..")         

            }else if (result === 199){
                //Errore
            }else{
                this.props.nrlUpdateEvent.releaseLock();
            }
            
          })
          .catch((error) => {
            //ERRORE
          });
    }
    
    openMagazzino = (value) =>{
      this.setState({open_magazzino:value})
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
                        <Typography variant="h5" >
                        INGV
                        </Typography>
                        <Typography variant="h2" style={{marginLeft:4}} spacing={2}>
                        {this.props.username}
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
                          <div>
                            { this.props.isMain
                              ?( 
                              <>
                                <StyledMenuItem  onClick={(e) => this.logout()}>
                                    <ListItemIcon>
                                        <ExitToAppIcon style={{fill: "#1a237e"}}  fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Log Out" />
                                </StyledMenuItem>
                                <StyledMenuItem  onClick={(e) => this.openMagazzino(true)}>
                                  <ListItemIcon>
                                      <ExitToAppIcon style={{fill: "#1a237e"}}  fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText primary="Gestisci Magazzino" />
                                </StyledMenuItem>
                                <FullScreenDialog open={this.state.open_magazzino} handleChange={this.openMagazzino}/>
                              </>
                              )
                              :<></>
                            } 
                          </div>
                            <StyledMenuItem onClick={(e) => this.updateNrlCall()}>
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