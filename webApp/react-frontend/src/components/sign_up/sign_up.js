import React,{Component} from 'react';
import Selecter from '../element/utils/selecter';
import DateTimePicker from '../element/utils/date_picker';
import {TextField,Box,Snackbar,InputAdornment,Grid,Button, FormControl} from '@material-ui/core';
import axios from 'axios';
import Paper from '@material-ui/core/Paper'
  import MuiALert from '@material-ui/lab/Alert';
  import itLocale from "date-fns/locale/it";
  import InputLabel from '@material-ui/core/InputLabel';
  import Fade from '@material-ui/core/Fade';

const operatore_style = {
    borderColor:'green',
    color:'green',
    fullWidth:200
}

// COMPONENTE PER LA GESTIONE DI NUOVE REGISTRAZIONI OPERATORI
// PROPS RICEVUTE :
//                  1)changeView : procedura che si occupa di avvisare il padre del componente che è stato generato un evento di cambio contesto

export default class Sign_Up extends React.Component{
    _isMounted = false;
    constructor(props){
        super(props);   
        this.state={
            sign_in:{
                called: false,
                successful:false,
                message:""
            },
            name:"", // Nome utente
            surname:"", // Cognome utente
            email:"", // Email utente
            password:"", // Password utente
            password_confirm:"", // Conferma della password assert(Deve essere uguale a password)
            userType:"", // Tipologia di operatore Semplice-Autorizzato-Esterno
            externalUserCompany:"", // Azienda di provenienza operatore esterno - se userType != "Esterno" allora campo VUOTO
            userTelephone:"", // Numero telefono utente, non obbligatorio
            birthday:null, // Data nascita operatore
            visibility:{ // Stato che verifica sè un campo debba essere visualizzato
                externalUserCompany:false // Stato di verifica per lo stato azienda operatore
            },
            error:{ // Stato che tiene traccia di tutti i possibili errori negli stati necessari alla registrazione di un utente
                name:{
                    status:true, // Stato del campo
                    message:"" // Eventuale messaggio di errore associato
                },
                surname:{
                    status:true,
                    message:""
                },
                userType:{
                    status:true,
                    message:""
                },
                email:{
                    status:true,
                    message:""
                },
                password:{
                    status:true,
                    message:""
                },
                password_confirm:{
                    status:true,
                    message:""
                },
                birthday:{
                    status:false,
                    message:""
                },
                externalUserCompany:{
                    status:true,
                    message:""
                }

            },
            operatorType:[] // Lista di tutti i possibili tipi di operatore
            
        };
    }

    // Funzione che si occupa di gestire tutti gli eventi di interazione con l'interfaccia da parte dell'utente 
    handleChange = (event,name) => {
        let {value} = event.target;
        // Espressione regolare per verificare la correttezza di una mail
        const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let error = this.state.error;
        let visibility = this.state.visibility;
        console.log(name);
        switch(name){
            case "name":
                if (value.length <= 0){
                    error.name.status = true
                }else{
                    error.name.status = false
                }
                break;
            case "surname":
                if (value.length <= 0){
                    error.surname.status = true
                }else{
                    error.surname.status = false
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
            case "password_confirm":
                if (value == this.state.password){
                    error.password_confirm.status = false;
                    error.password_confirm.message="Password Confermata";
                }else{
                    error.password_confirm.status = true;
                    error.password_confirm.message="Password diversa";
                }
                break;
            case "userType":
                    error.userType.status = false
                if ( value == "Esterno"){
                    visibility.externalUserCompany=true;
                }else{
                    visibility.externalUserCompany=false;
                }
                break;
            case "externalUserCompany":
                console.log(value);
                if (value.length <=1){
                    error.externalUserCompany.status = true;
                    error.externalUserCompany.message="Campo Richiesto per un utente Esterno!";
                }else{
                    error.externalUserCompany.status = false;
                    error.externalUserCompany.message="ok!";
                }
                break;
            default:
                break;
        }
        this.setState({error,visibility,[name]: value},(name,value) => {console.log(name+":"+value)});
    }

    // Funzione che rileva sè il datetimepicker è stato invocato
    handleDateChange = (value) => {
        if(value instanceof Date && !isNaN(value)){
            console.log(value);
            this.setState({birthday:(value.getFullYear()+"/"+(value.getMonth()+1)+"/"+value.getDate())});
            this.setState(state => (state.error.birthday.status=false,state));
        }else{
            this.setState(state => (state.error.birthday.status=true,state));
        }
    }

    // Funzione invocata quando viene cliccato il tasto di registrazione
    trySignUp = () => {
        this._isMounted=true;
        console.log(this.state);
        let {error} = this.state;
        let {sign_in} = this.state;

        // Verifico sè tutti i campi necessari sono stati inizializzati
        if (error.name.status || error.surname.status || error.password.status || error.password_confirm.status || error.userType.status || error.birthday.status
            || (this.state.userType=="Esterno" && error.externalUserCompany.status)){
            if(this._isMounted){
                this.setState(state => (state.sign_in.called  = true, state));
                this.setState(state => (state.sign_in.successful=false, state));
                this.setState(state => (state.sign_in.message=
                    "Non posso proseguire, c'è qualche errore sui campi!", state));
            }
            return
        }
        // Chiamata alla web api 
        axios.post('/api/Operatore/insert', {
            name: this.state.name,
            surname: this.state.surname,
            email : this.state.email,
            password: this.state.password,
            userType: this.state.userType,
            externalUserCompany: this.state.visibility.externalUserCompany?this.state.externalUserCompany:"",
            birthday: this.state.birthday,
            userTelephone: this.state.userTelephone
          })
          .then((response) => {
            if (response.data["operationCode"] != 200 && this._isMounted){
                this.setState(state => (state.sign_in.called  = true, state));
                this.setState(state => (state.sign_in.successful=false, state));
                this.setState(state => (state.sign_in.message=
                            response.data["message"], state));
            }else{
                if(this._isMounted){
                    this.setState(state => (state.sign_in.called  = true, state));
                    this.setState(state => (state.sign_in.successful=true, state));
                    this.setState(state => (state.sign_in.message = 
                        "Registrazione Avvenuta con successo, sarai re-indirizzato alla pagina di login tra 3 secondi!", state));
                }
            }
          })
          .catch((error) => {
              if(this._isMounted){
                    this.setState(state => (state.sign_in.called  = true, state));
                    this.setState(state => (state.sign_in.successful=false, state));
                    this.setState(state => (state.sign_in.message=
                                    "Registrazione non riuscita a causa di qualche errore, riprovare più tardi!", state));
                }
            console.log(error);
          });
          
    }

    // Funzione che invoca il metodo del padre per richiedere una nuova pagina
    switchToLogIn = () => {
        this.props.changeView("logIN");
    }
    

    componentDidMount(){
        this._isMounted=true;
        console.log("Richieste le tipologie di operatori disponibili al server");
        axios.get("api/Operatori/type")
            .then((response) => {
                console.log(response.data);
                if(this._isMounted){
                    this.setState({
                        operatorType: response.data.items
                    })
                }
            })
            .catch((error) => {
                if(this._isMounted){
                    this.setState({operatorType:["Default"]})
                }
               
            });
    }
    
    componentWillUnmount(){
        this._isMounted=false
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
                                <TextField 
                                    id="name_textfield" 
                                    error={error.name.status} 
                                    onChange={(e) => this.handleChange(e,'name')} 
                                    label="Nome" 
                                    variant="outlined" 
                                    required 
                                    fullWidth
                                    helperText="*Campo Richiesto"
                                />
                        </Grid>
                        <Grid item xl={5} xs={6}>
                            <TextField 
                                id="surname_textfield" 
                                error={error.surname.status} 
                                onChange={(e) => this.handleChange(e,'surname')} 
                                label="Cognome" 
                                variant="outlined" 
                                required 
                                fullWidth
                                helperText="*Campo Richiesto"
                            />
                        </Grid>
                        
                        <Grid item xl={10} xs={11}>
                            <TextField 
                                id="email_textfield" 
                                error={error.email.status} 
                                name="email" 
                                onChange={(e) => this.handleChange(e,'email')} 
                                label="Indirizzo Email" 
                                variant="outlined" 
                                required 
                                fullWidth
                                helperText={error.email.message}
                            />
                        </Grid>

                        <Grid item xl={5} xs={5}>
                            <TextField 
                                id="password_textfield" 
                                error={error.password.status} 
                                onChange={(e) => this.handleChange(e,'password')} 
                                type="text" 
                                label="Password" 
                                variant="outlined" 
                                required 
                                fullWidth
                                helperText={error.password.message}
                            />
                        </Grid>
                        <Grid item xl={5} xs={6}>
                            <TextField 
                                id="password_confirm_textfield"  
                                error={error.password_confirm.status} 
                                onChange={(e) => this.handleChange(e,'password_confirm')} 
                                type="text" 
                                label="Conferma Password" 
                                variant="outlined" 
                                required fullWidth
                                helperText={error.password_confirm.message}
                            />
                        </Grid>

                        <Grid container direction="row" justify="center" alignItems="center">
                           <Grid item xl={2} xs={2} container alignItems="center" style={{marginTop:"3%"}}>
                                <InputLabel>Data Nascita</InputLabel>
                           </Grid>
                            <Grid item xl={5} xs={5} >
                                <DateTimePicker 
                                    properties={{
                                                width:"90%",
                                                id:"data-nascita_picker",
                                                label:"",
                                                name:"birthday"
                                                }}
                                    onChange={this.handleDateChange}/>
                            </Grid>
                        </Grid>               
                        <Grid xl={5} xs={5} item container direction="row">
                            <Grid item xl={12} xs={12}>
                                <Selecter
                                    properties ={{
                                                labelId:"label-selecter-id",
                                                id:"selecter",
                                                inputLabel:"Tipo Utente",
                                                style:operatore_style,
                                                value:this.state.userType,
                                                customHandler:this.handleChange,
                                                helperText:error.userType.message,
                                                name:"userType",
                                                error:error.userType.status
                                                }}
                                    items={this.state.operatorType}/>
                            </Grid>
                            <Fade in={this.state.visibility.externalUserCompany} timeout={1000}>
                            {
                                this.state.visibility.externalUserCompany?
                                <Grid item xl={12} xs={12}>
                                    <TextField 
                                        value={this.state.externalUserCompany} 
                                        id="externalUserCompany_textfield" 
                                        error={error.externalUserCompany.status} 
                                        onChange={(e) => this.handleChange(e,'externalUserCompany')} 
                                        label="Ente Appartenenza" 
                                        variant="standard" 
                                        required 
                                        fullWidth
                                        helperText={error.externalUserCompany.message}
                                    />
                                </Grid>
                                :<div></div>  
                            }
                            </Fade>         
                            
                            
                        </Grid>
                        <Grid item xl={5} xs={6}>
                            <TextField 
                                id="outlined-full-width" 
                                onChange={(e) => this.handleChange(e,'userTelephone')} 
                                label="Telefono" 
                                variant="outlined" 
                                fullWidth
                                InputProps={{
                                            startAdornment: <InputAdornment position="start">+39</InputAdornment>,
                                            }}
                            />
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
                        ?<Snackbar open={this.state.sign_in.called} autoHideDuration={2000} onClose={() => { if(this.state.sign_in.successful){this.switchToLogIn()}else{this.setState(state => (state.sign_in.called  = false, state))} }}>
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
