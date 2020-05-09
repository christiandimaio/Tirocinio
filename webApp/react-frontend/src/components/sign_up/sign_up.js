import React from 'react';
import Selecter from './selecter';
import {TextField,Box,Snackbar,InputAdornment,Grid,Button} from '@material-ui/core';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';

  
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import Alert from '@material-ui/lab/Alert';

const operatore_style = {
    borderColor:'green',
    color:'green',
    fullWidth:250
}

export default class Sign_Up extends React.Component{
    constructor(props){
        super(props);     
        this.state={
            sign_in:{
                called: false,
                successful:false,
                message:""
            },
            nome:"",
            cognome:"",
            email:"",
            password:"",
            password_conferma:"",
            tipo_utente:"",
            telefono_utente:"",
            error:{
                nome:{
                    state:true,
                    message:""
                },
                cognome:{
                    state:true,
                    message:""
                },
                tipo_utente:{
                    state:true,
                    message:"*Campo Richiesto"
                },
                email:{
                    state:true,
                    message:""
                },
                password:{
                    state:true,
                    message:""
                },
                password_conferma:{
                    state:true,
                    message:""
                }
            }
            
        };
    }

    handleChange = (event,name) => {
        event.preventDefault();
        let {value} = event.target;
        const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let error = this.state.error;
        switch(name){
            case "nome":
                if (value.length <= 0){
                    error.nome.state = true
                }else{
                    error.nome.state = false
                }
                break;
            case "cognome":
                if (value.length <= 0){
                    error.cognome.state = true
                }else{
                    error.cognome.state = false
                }
                break;
            case "email":
                if (value.match(email_regex)){
                    error.email.state = false;
                    error.email.message="ok!";
                }else{
                    error.email.state = true;
                    error.email.message="Email non corretta!";
                }
                break;
            case "password":
                if (value.length <=5){
                    error.password.state = true;
                    error.password.message="Password minore di 5 caratteri,troppo debole!";
                }else{
                    error.password.state = false;
                    error.password.message="ok!";
                }
                break;
            case "password_conferma":
                if (value == this.state.password){
                    error.password_conferma.state = false;
                    error.password_conferma.message="Password Confermata";
                }else{
                    error.password_conferma.state = true;
                    error.password_conferma.message="Password diversa";
                }
                break;
            case "tipo_utente":
                if (value != ""){
                    error.tipo_utente.state = false
                }

            default:
                break;
        }
        console.log(name,value);
        this.setState({error,[name]: value});
        console.log(this.state);
    }

    trySignIn = () => {
        
        let {error} = this.state;
        let {sign_in} = this.state;
        if (error.nome.state || error.cognome.state || error.password.state || error.password_conferma.state || error.tipo_utente.state){
            this.setState(state => (state.sign_in.called  = true, state));
            this.setState(state => (state.sign_in.successful=false, state));
            this.setState(state => (state.sign_in.message=
                "Completare tutti i campi Richiesti!", state));
            return
        }
        axios.post('/database/insert/user', {
            nome: this.state.nome,
            cognome: this.state.cognome,
            email : this.state.email,
            password: this.state.password,
            tipo_utente: this.state.tipo_utente,
            telefono_utente: this.state.telefono_utente
          })
          .then((response) => {
            if (response.data["operationCode"] != 200){
                this.setState(state => (state.sign_in.called  = true, state));
                this.setState(state => (state.sign_in.successful=false, state));
                this.setState(state => (state.sign_in.message=
                            "Registrazione non riuscita a causa di qualche errore, riprovare più tardi!", state));
            }else{
                this.setState(state => (state.sign_in.called  = true, state));
                this.setState(state => (state.sign_in.successful=true, state));
                this.setState(state => (state.sign_in.message = 
                    "Registrazione Avvenuta con successo, sarai re-indirizzato alla pagina di login tra 3 secondi!", state));
            }
          })
          .catch((error) => {
            this.setState(state => (state.sign_in.called  = true, state));
            this.setState(state => (state.sign_in.successful=false, state));
            this.setState(state => (state.sign_in.message=
                            "Registrazione non riuscita a causa di qualche errore, riprovare più tardi!", state));
            console.log(error);
          });
          
    }

    render(){
        const {error} = this.state;
        return (
            <div>
                <Box border={3} borderColor="#3f51b5" borderRadius="2%" bgcolor="white">
                    <Box display="flex">
                        <Grid container spacing={2} justify="flex-start" alignItems="flex-start">
                            <Grid item xl={4} xs={6}>
                            <Button
                                variant="outline-primary" className="rounded-pill " 
                                onClick={()=>{ this.props.logInFormCaller()}}
                            >
                                Return to Login
                            </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid
                        container
                        direction="row"
                        spacing={2}
                        justify="center"
                        alignItems="baseline"
                    >
                        <Grid item xl={5} xs={5}>
                            <TextField id="nome_textfield" error={error.nome.state} onChange={(e) => this.handleChange(e,'nome')} label="Nome" variant="outlined" required fullWidth
                            helperText="*Campo Richiesto">

                            </TextField>
                        </Grid>
                        <Grid item xl={5} xs={6}>
                            <TextField id="cognome_textfield" error={error.cognome.state} onChange={(e) => this.handleChange(e,'cognome')} label="Cognome" variant="outlined" required fullWidth
                            helperText="*Campo Richiesto">

                            </TextField>
                        </Grid>
                        
                        <Grid item xl={11} xs={11}>
                            <TextField id="email_textfield" error={error.email.state} name="email" onChange={(e) => this.handleChange(e,'email')} label="Indirizzo Email" variant="outlined" required fullWidth
                             helperText={error.email.message}>

                            </TextField>
                        </Grid>

                        <Grid item xl={5} xs={5}>
                            <TextField id="password_textfield" error={error.password.state} onChange={(e) => this.handleChange(e,'password')} type="text" label="Password" variant="outlined" required fullWidth
                            helperText={error.password.message}>
                            </TextField>
                        </Grid>
                        <Grid item xl={5} xs={6}>

                            <TextField id="password_conferma_textfield"  error={error.password_conferma.state} onChange={(e) => this.handleChange(e,'password_conferma')} type="text" label="Conferma Password" variant="outlined" required fullWidth
                            helperText={error.password_conferma.message}>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Box mt={1}>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={2}
                        >   
                            <Grid  mt={2} item xl={5} xs={5} spacing={2}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Date picker dialog"
                                        format="MM/dd/yyyy"
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid mt={2} xl={7} xs={6} item  spacing={2}>
                            <Selecter
                                        properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Tipo Utente",minWidth:270,style:operatore_style,value:this.state.tipo_utente,
                                        customHandler:this.handleChange,helperText:error.tipo_utente.message,name:"tipo_utente",error:error.tipo_utente.state}}
                                        server_uri= '/database/select/user/type'>
                                        
                            </Selecter>
                                
                            </Grid>
                            <Grid item xl={11} xs={11}>
                            <TextField id="outlined-full-width" onChange={(e) => this.handleChange(e,'telefono_utente')} label="Telefono" variant="outlined" fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position="start">+39</InputAdornment>,
                                }}>

                            </TextField>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box mt={3}>
                        <Grid container item direction="row" justify="flex-end" alignItems="baseline">
                            <Button variant="contained" color="primary" fullWidth onClick={() => this.trySignIn()}>
                                Registrati
                            </Button>
                        </Grid>
                    </Box>
                    
                </Box>
                <div> 
                    {
                        this.state.sign_in.called
                        ?<Snackbar open={this.state.sign_in.called} autoHideDuration={3000} onClose={()=>{ this.props.logInFormCaller()}}>
                            <Alert severity="error">
                                {this.state.sign_in.message}
                            </Alert>
                        </Snackbar>
                        :<div></div>
                    }   
                </div>
                
            </div>
                );
    }
}
