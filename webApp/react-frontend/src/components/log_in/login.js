import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { sizing } from '@material-ui/system';
import MuiALert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar'
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
const paperStyle = {};
const styles = theme => ({
	root: {
		flexGrow: 1
	}
});

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password : "",
            rememberme: false,
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
                if(value.length >= 6){
                    formErrors.password.error=false;
                    formErrors.password.message="";
                }else{
                    formErrors.password.error=true;
                    formErrors.password.message="Caratteri insufficienti per il campo password, mancanti:"+(6-value.length)+"";
                }
                break;
            case "rememberme":
                console.log(event.target.checked);
                value = event.target.checked;
            default:
                break;
        }
        this.setState({formErrors, [name]: value});
    }

    tryLogIn(){
        let serverResponse = this.state.serverResponse;
        console.log(""+(this.state.formErrors.email.error || this.state.formErrors.password.error));
        if (this.state.formErrors.email.error || this.state.formErrors.password.error){
            serverResponse.response=true;
            serverResponse.error=true;
            serverResponse.message="Alcuni campi sono errati!"
            this.setState({serverResponse});
        }
        else{
            console.log("Try log in :"+this.state.email)
            axios.post('/login', {
                            email : this.state.email,
                            password: this.state.password,
                            rememberME : this.state.rememberme
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
                this.setState({serverResponse});
            })
            .catch((error) => {
                serverResponse.response=true;
                serverResponse.error=true;
                serverResponse.message=error;
            });
            

        }
        console.log(serverResponse);
          
          
    }
    
   

    render(){
        const {disableButtonLogIn} = this.props;
        const {email,password} = this.state;
        let {formErrors} = this.state.formErrors;
        const { classes } = this.props;
        return  (
                <div className={classes.xxx}>
                    <Grid container direction="column" spacing={3} justify="center" alignItems="center" style={{paddingTop:"10%",paddingBottom:"10%"}}>
                        
                            <Grid item style={{width:"60%"}}>
                                <FormControl fullWidth>
                                    <Paper>
                                        <TextField
                                            variant="outlined"
                                            id="input-with-icon-textfield"
                                            label="E-Mail"
                                            fullWidth
                                            
                                            onChange={e => this.handleChange(e,'email')} 
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                    <AccountCircle />
                                                    </InputAdornment>
                                                ),
                                                }}
                                    />
                                    </Paper>
                                    <FormHelperText>{this.state.formErrors.email.message}</FormHelperText>                
                                </FormControl>       
                            
                        </Grid>    
                        
                        <Grid item style={{width:"60%"}}>
                            <FormControl fullWidth>
                                <Paper>
                                    <TextField 
                                        variant="outlined" 
                                        id="standard-basic" 
                                        type={'password'} 
                                        label="Password" 
                                        fullWidth  
                                        onChange={e => this.handleChange(e,'password')} 
                                        
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <VpnKeyIcon />
                                                </InputAdornment>
                                            ),
                                            }}/>
                                </Paper>
                                    <FormHelperText>{this.state.formErrors.password.message}</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} xl={5} >
                                <FormControlLabel
                                control={<Checkbox checked={this.state.rememberme} onChange={e => this.handleChange(e,'rememberme')} name="rememberme" />}
                                label="Ricordami"
                            />
                        </Grid>
                        
                        <Grid item style={{width:"60%"}}>
                            <Button fullWidth variant="contained" fullWidth disabled={disableButtonLogIn ? 'true' : ''} onClick={() => {this.props.changeView("signUP")}}>Registrati</Button>
                        </Grid>
                        
                        <Grid item style={{width:"60%"}}>
                            <Button fullWidth variant="contained" color="primary" fullWidth disabled={disableButtonLogIn ? 'true' : ''} 
                                    onClick={() => {this.tryLogIn()}}>Entra</Button>
                        </Grid>

                    </Grid>

                    <Snackbar open={this.state.serverResponse.response} autoHideDuration={3000} onClose={() => { this.setState(state => (state.serverResponse.response  = false, state))}} >
                            <MuiALert elevation={9} variant="filled" severity={this.state.serverResponse.error?"error":"success"}>
                                {this.state.serverResponse.message}
                            </MuiALert>
                    </Snackbar>                    
                    

                
                </div>
                
                    
                    
                    
                   

        );
                
    }
}

Login.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);



// <div>
//                 <Box minHeight={1} my={2}>
//                     <Grid containter direction="column" alignItems="center" justify="center" spacing={2} >
//                         <Grid item xs={9} xl={9} >
//                             <Paper>
//                                 <TextField
//                                 fullWidth
//                                 variant="outlined"
//                                 id="input-with-icon-textfield"
//                                 label="TextField"
//                                 InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                     <AccountCircle />
//                                     </InputAdornment>
//                                 ),
//                                 }}
//                             />
//                             </Paper>
//                         </Grid>    
                        
//                         <Grid item xs={6} xl={5} >
//                             <TextField variant="outlined" id="standard-basic" type={'password'} label="Password" fullWidth  onChange={e => this.handleChange(e,'password')} helperText={this.state.formErrors.email_error} autoComplete></TextField>
//                         </Grid>

//                         <Grid item xs={6} xl={5} >
//                                 <FormControlLabel
//                                 control={<Checkbox checked={this.state.rememberme} onChange={e => this.handleChange(e,'rememberme')} name="rememberme" />}
//                                 label="Ricordami"
//                             />
//                         </Grid>
//                         <Grid container spacing={4}>

//                                     <Grid item xs={6} xl={5}>

//             <Button variant="contained" color="primary" fullWidth disabled={disableButtonLogIn ? 'true' : ''}>Entra</Button>

//             </Grid>

//                         </Grid>
                        
//                     </Grid>
//                     </Box>
//                 </div>   

// class Login_SignIn extends React.Component{
//     constructor() {
//         super();
        

//         this.state = {
//           nrlUpdating : false,
//           signUpClicked:false
//         }
//     }

//     handleSignInClick = () => {
//         console.log(this.state.signUpClicked)
//         this.setState({
//             signUpClicked: !this.state.signUpClicked
//           });
//       }

//     loginCheck = (result) => {
//         this.setState({loginFailed : result});
//     }  

//     nrlChangeState = (state) => {
//         this.setState({nrlUpdating : state});
//     }
    
//     render(){
//         const nrlUpdating = this.state.nrlUpdating;
//         return (    
//                 <div id="log_in" class="h-100"> 
//                     <div class="row align-items-center h-100">
//                         {   this.state.signUpClicked
//                             ?   <div class="col-xl-6 col-sm-5 col-lg-4 col-md-4 mx-auto">
//                                     <Sign_In_Form logInFormCaller={this.handleSignInClick} >
                                        
//                                     </Sign_In_Form>
//                                 </div>

//                             :    <div class="col-xl-4 col-sm-4 col-lg-4 col-md-4 mx-auto">
//                                         <Grow in={true} style={{transitionDelay:"10000ms"}}>
//                                             <NrlComponent nrlChangeState={this.nrlChangeState}></NrlComponent>
//                                         </Grow>
//                                         <div class="border rounded-top jumbotron ">
//                                             <Login_Form loginCheck={this.loginCheck} disableButtonLogIn={nrlUpdating}></Login_Form> 
//                                             <Button variant="outline-primary" className="rounded-pill mt-4" size="lg" block onClick={this.handleSignInClick} disabled={nrlUpdating ? 'true' : '' } >Registrati</Button>
//                                         </div>
//                                         {
//                                             this.state.loginFailed ?
//                                             <Alert variant="warning" className=" w-20 alert-dismissible fade show" >
//                                                 Accesso non riuscito, controllare email o password!
//                                             </Alert> 
//                                             : <div></div>
//                                         }            
//                                 </div> 
                              
//                         }
//                     </div>
//                 </div>
//         );
//     }
// }

// export default Login_SignIn