import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MuiALert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar'
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const styles = () => ({
	root: {
		flexGrow: 1
	}
});

// COMPONENTE PER LA GESTIONE DEL LOGIN
// PROPS RICEVUTE :
//                  1)changeView : procedura che si occupa di avvisare il padre del componente che è stato generato un evento di cambio contesto
class Login extends React.Component{
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password : "",
            rememberMe: false,
            formErrors : {
                email:{
                    error:true,
                    message:''
                },
                password:{
                    error:true,
                    message:''
                }
            },
            serverResponse:{
                response:false,
                error:false,
                message:""
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.tryLogIn = this.tryLogIn.bind(this);
        }
    
        // Funzione che segue lo stesso criterio di funzionamento di quella nel componente sign_up
    handleChange(event,name){
        const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let formErrors = this.state.formErrors;
        
        let {value} = event.target;
        switch(name){
            case "email":
                if(value.match(email_regex)){
                    formErrors.email.error=false;
                    formErrors.email.message="";
                }else{
                    formErrors.email.error=true;
                    formErrors.email.message="Inserire una mail corretta";
                }
                break;
            case "password":
                if(value.length >=0){
                    formErrors.password.error=false;
                    formErrors.password.message="";
                }else{
                    formErrors.password.error=true;
                    formErrors.password.message="Caratteri insufficienti per il campo password, mancanti:"+(6-value.length)+"";
                }
                break;
            case "rememberMe":
                console.log(event.target.checked);
                value = event.target.checked;
            default:
                break;
        }
        this.setState({formErrors, [name]: value});
    }

    // Funzione che permette di effettuare la chiamata alla web api per verificare la correttezza dei valori di login
    tryLogIn(){
        this._isMounted = true;
        let serverResponse = this.state.serverResponse;
        console.log(""+(this.state.formErrors.email.error || this.state.formErrors.password.error));
        if (this.state.formErrors.email.error || this.state.formErrors.password.error){
            serverResponse.response=true;
            serverResponse.error=true;
            serverResponse.message="Alcuni campi sono errati!"
            if(this._isMounted){
                this.setState({serverResponse});
            }
        }
        else{
            console.log("Try log in :"+this.state.email)
            axios.post('api/login', {
                email : this.state.email,
                password: this.state.password,
                rememberMe : this.state.rememberMe
            })
            .then((response) => {
                if (response.data["operationCode"] != 200){
                    console.log(response.data["operationCode"]);
                    console.log(response.data["message"]);
                    serverResponse.response=true;
                    serverResponse.error=true;
                    serverResponse.message=response.data["message"];
                }else{
                    this.props.changeView("main");
                }
                if(this._isMounted){
                    this.setState({serverResponse});
                }
            })
            .catch((error) => {
                serverResponse.response=true;
                serverResponse.error=true;
                serverResponse.message=error;
            });
            

        }
        console.log(serverResponse);  
          
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }

    render(){
        return  (
            <React.Fragment>
                <Grid container direction="column" spacing={3} justify="center" alignItems="center" >
                    <Grid item style={{maxWidth:"100%"}}>
                        <FormControl fullWidth>
                            <Paper>
                                <TextField
                                    variant="outlined"
                                    id="email-textfield"
                                    label="E-Mail"
                                    fullWidth                                    
                                    onChange={e => this.handleChange(e,'email')} 
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <AccountCircle style={{fill: "#1a237e"}} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Paper>
                            <FormHelperText>{this.state.formErrors.email.message}</FormHelperText>                
                        </FormControl>       
                    </Grid>    
                    <Grid item style={{maxWidth:"100%"}}>
                        <FormControl fullWidth>
                            <Paper>
                                <TextField 
                                    variant="outlined" 
                                    id="password-basic" 
                                    type={'password'} 
                                    label="Password" 
                                    fullWidth  
                                    onChange={e => this.handleChange(e,'password')} 
                                    
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <VpnKeyIcon style={{fill: "#1a237e"}}  />
                                            </InputAdornment>
                                        ),
                                        }}
                                />
                            </Paper>
                            <FormHelperText>{this.state.formErrors.password.message}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item style={{maxWidth:"60%"}} >
                        <FormControlLabel
                            control={<Checkbox checked={this.state.rememberMe} onChange={e => this.handleChange(e,'rememberMe')} name="rememberMe" />}
                            label="Ricordami"
                        />
                    </Grid>
                    
                    <Grid item style={{maxWidth:"100%"}}>
                        <Button 
                            fullWidth 
                            variant="contained" 
                            fullWidth  
                            onClick={() => {this.props.changeView("signUP")}}
                        >
                            Registrati
                        </Button>
                    </Grid>
                    
                    <Grid item style={{maxWidth:"100%"}}>
                        <Button 
                            fullWidth 
                            variant="contained" 
                            color="primary" 
                            fullWidth 
                            onClick={() => {this.tryLogIn()}}
                        >
                            Entra
                        </Button>
                    </Grid>

                </Grid>

                <Snackbar open={this.state.serverResponse.response} autoHideDuration={3000} onClose={() => { this.setState(state => (state.serverResponse.response  = false, state))}} >
                        <MuiALert elevation={9} variant="filled" severity={this.state.serverResponse.error?"error":"success"}>
                            {this.state.serverResponse.message}
                        </MuiALert>
                </Snackbar>                    
            </React.Fragment>
        );
                
    }
}

Login.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);