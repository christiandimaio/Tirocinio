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
            menu:null
        }
        
    }


    updateNrlCall = async () => {
        this.props.nrlUpdateEvent.putLock("Aggiornamento NRL in corso,attendere..");
        axios.get('/update/NRL', {
          })
          .then((response) => {
            const {result} = response.data;
            if (result == 201){     //Aggiornamento già in corso
                this.props.nrlUpdateEvent.putLock("Aggiornamento NRL in corso,attendere..")         

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
    
    logout = () => {
        axios.get("/logout"
                ).then((response) => {
                    console.log(response);
                    if (response.data["operationCode"]==200){
                        console.log("OK, Logout");
                        window.location = "/login";
                    }

                })

    }

    render(){
        return (
        <div>
            <AppBar position="static" style={{background:"#3f51b5"}}>
            <Toolbar>
                    <Box display="flex" style={{flexGrow:1}}>
                        <Typography variant="h3" >
                        INGV
                        </Typography>
                        <Typography variant="h6" style={{marginLeft:4}} spacing={2}>
                        {this.props.username}
                        </Typography>
                    </Box>
                    
                        
                     <Button
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            variant="contained"
                            color="inherit"
                            style={{background:"#1a237e",minHeight:50}}
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
                            <StyledMenuItem hidden={this.props.isMain?false:true} onClick={(e) => this.logout()}>
                            <ListItemIcon>
                                <ExitToAppIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Log Out" />
                            </StyledMenuItem>
                            <StyledMenuItem onClick={(e) => this.updateNrlCall()}>
                            <ListItemIcon>
                                <SystemUpdateAltIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Aggiorna Database NRL" />
                            </StyledMenuItem>
                        </StyledMenu>
                        
                        
                        
            </Toolbar>
            </AppBar>
        </div>
        );
    }
}