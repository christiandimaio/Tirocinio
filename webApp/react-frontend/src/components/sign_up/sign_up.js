import React,{Component} from 'react';
import Selecter from '../element/selecter';
import DateTimePicker from '../element/date_picker';
import {TextField,Box,Snackbar,InputAdornment,Grid,Button} from '@material-ui/core';
import axios from 'axios';
import Paper from '@material-ui/core/Paper'
  import MuiALert from '@material-ui/lab/Alert';

const operatore_style = {
    borderColor:'green',
    color:'green',
    fullWidth:200
}

export default class Sign_Up extends React.Component{
    constructor(props){
        super(props);   
        this.getTipiOperatore();  
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
            data_nascita:null,
            error:{
                nome:{
                    status:null,
                    message:""
                },
                cognome:{
                    status:null,
                    message:""
                },
                tipo_utente:{
                    status:null,
                    message:""
                },
                email:{
                    status:null,
                    message:""
                },
                password:{
                    status:null,
                    message:""
                },
                password_conferma:{
                    status:null,
                    message:""
                }
            },
            database_operatori:[]
            
        };
    }

    handleChange = (event,name) => {

        let {value} = event.target;
        const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let error = this.state.error;
        switch(name){
            case "nome":
                if (value.length <= 0){
                    error.nome.status = true
                }else{
                    error.nome.status = false
                }
                break;
            case "cognome":
                if (value.length <= 0){
                    error.cognome.status = true
                }else{
                    error.cognome.status = false
                }
                break;
            case "email":
                if (value.match(email_regex)){
                    error.email.status = false;
                    error.email.message="ok!";
                }else{
                    error.email.status = true;
                    error.email.message="Email non corretta!";
                }
                break;
            case "password":
                if (value.length <=5){
                    error.password.status = true;
                    error.password.message="Password minore di 5 caratteri,troppo debole!";
                }else{
                    error.password.status = false;
                    error.password.message="ok!";
                }
                break;
            case "password_conferma":
                if (value == this.state.password){
                    error.password_conferma.status = false;
                    error.password_conferma.message="Password Confermata";
                }else{
                    error.password_conferma.status = true;
                    error.password_conferma.message="Password diversa";
                }
                break;
            case "tipo_utente":
                if (value != ""){
                    error.tipo_utente.status = false
                }

            default:
                break;
        }
        this.setState({error,[name]: value},(name,value) => {console.log(name+":"+value)});
    }

    handleDateChange = (value) => {
        this.setState({data_nascita:(value.getDate()+"/"+(value.getMonth()+1)+"/"+value.getFullYear())});
    }
    trySignUp = () => {
        console.log(this.state);
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
            tipo_utente: this.state.tipo_utente[0],
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

    switchToLogIn = () => {
        this.props.changeView("logIN");
    }
    
    getTipiOperatore = () => {
        console.log("Richieste le tipologie di operatori disponibili al server");
        axios.get("/database/select/user/type")
            .then((response) => {
                console.log(response.data);
                this.setState({
                    database_operatori: response.data.items
                })
            })
            .catch((error) => {
               this.setState({database_operatori:["Default"]})
            });
    }
    
  
    render(){
        const {error} = this.state;
        return (
            <div>
                <Box >
                    <Box display="flex" my={2}>
                        <Grid container spacing={2} justify="flex-start" alignItems="flex-start">
                            <Grid item xl={4} xs={6}>
                            <Button
                                variant="contained" 
                                onClick={this.switchToLogIn}
                                
                            >
                                Ritorna al login
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
                                <TextField id="nome_textfield" error={error.nome.status} onChange={(e) => this.handleChange(e,'nome')} label="Nome" variant="outlined" required fullWidth
                                helperText="*Campo Richiesto">

                                </TextField>
                            
                        </Grid>
                        <Grid item xl={5} xs={6}>
                            <TextField id="cognome_textfield" error={error.cognome.status} onChange={(e) => this.handleChange(e,'cognome')} label="Cognome" variant="outlined" required fullWidth
                            helperText="*Campo Richiesto">

                            </TextField>
                        </Grid>
                        
                        <Grid item xl={11} xs={11}>
                            <TextField id="email_textfield" error={error.email.status} name="email" onChange={(e) => this.handleChange(e,'email')} label="Indirizzo Email" variant="outlined" required fullWidth
                             helperText={error.email.message}>

                            </TextField>
                        </Grid>

                        <Grid item xl={5} xs={5}>
                            <TextField id="password_textfield" error={error.password.status} onChange={(e) => this.handleChange(e,'password')} type="text" label="Password" variant="outlined" required fullWidth
                            helperText={error.password.message}>
                            </TextField>
                        </Grid>
                        <Grid item xl={5} xs={6}>

                            <TextField id="password_conferma_textfield"  error={error.password_conferma.status} onChange={(e) => this.handleChange(e,'password_conferma')} type="text" label="Conferma Password" variant="outlined" required fullWidth
                            helperText={error.password_conferma.message}>
                            </TextField>
                        </Grid>

                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid   item xl={5} xs={5}>
                                <DateTimePicker properties={{
                                                            id:"data-nascita_picker",
                                                            label:"seleziona data di nascita",
                                                            name:"data_nascita"
                                                            }}
                                                onChange={this.handleDateChange}/>
                            </Grid>
                        </Grid>               

                        <Grid xl={5} xs={5} item  >
                            <Selecter
                                        properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Tipo Utente",style:operatore_style,value:this.state.tipo_utente,
                                        customHandler:this.handleChange,helperText:error.tipo_utente.message,name:"tipo_utente",error:error.tipo_utente.status}}
                                        items={this.state.database_operatori}/>
                        </Grid>
                        <Grid item xl={5} xs={6}>
                                <TextField id="outlined-full-width" onChange={(e) => this.handleChange(e,'telefono_utente')} label="Telefono" variant="outlined" fullWidth
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">+39</InputAdornment>,
                                    }}>

                                </TextField>
                        </Grid>
                    </Grid>
                    <Box mt={3}>
                        <Grid container item direction="row" justify="flex-end" alignItems="baseline">
                            <Button variant="contained" color="primary" fullWidth onClick={() => this.trySignUp()}>
                                Registrati
                            </Button>
                        </Grid>
                    </Box>
                    
                </Box>
                <div> 
                    {
                        this.state.sign_in.called
                        ?<Snackbar open={this.state.sign_in.called} autoHideDuration={3000} onClose={() => { if(this.state.sign_in.successful){this.switchToLogIn()}else{this.setState(state => (state.sign_in.called  = false, state))} }}>
                            <MuiALert elevation={9} variant="filled" severity={this.state.sign_in.successful?"success":"error"}>
                                {this.state.sign_in.message}
                            </MuiALert>
                        </Snackbar>
                        :<div></div>
                    }   
                </div>
                
            </div>
                );
    }
}
