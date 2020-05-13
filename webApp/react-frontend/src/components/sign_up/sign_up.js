import React,{Component} from 'react';
import Selecter from '../element/selecter';
import DateTimePicker from '../element/date_picker';
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
            nome:"",
            cognome:"",
            email:"",
            password:"",
            password_conferma:"",
            tipo_utente:"",
            provenienza_esterno:"",
            telefono_utente:"",
            data_nascita:null,
            visibility:{
                provenienza_esterno:false
            },
            error:{
                nome:{
                    status:true,
                    message:""
                },
                cognome:{
                    status:true,
                    message:""
                },
                tipo_utente:{
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
                password_conferma:{
                    status:true,
                    message:""
                },
                data_nascita:{
                    status:false,
                    message:""
                },
                provenienza_esterno:{
                    status:true,
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
        let visibility = this.state.visibility;
        console.log(name);
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
                    error.tipo_utente.status = false
                if ( value == "Esterno"){
                    visibility.provenienza_esterno=true;
                }else{
                    visibility.provenienza_esterno=false;
                }
                break;
            case "provenienza_esterno":
                console.log(value);
                if (value.length <=1){
                    error.provenienza_esterno.status = true;
                    error.provenienza_esterno.message="Campo Richiesto per un utente Esterno!";
                }else{
                    error.provenienza_esterno.status = false;
                    error.provenienza_esterno.message="ok!";
                }
                break;
            default:
                break;
        }
        this.setState({error,visibility,[name]: value},(name,value) => {console.log(name+":"+value)});
    }

    handleDateChange = (value) => {
        
        if(value instanceof Date && !isNaN(value)){
            console.log(value);
            this.setState({data_nascita:(value.getDate()+"/"+(value.getMonth()+1)+"/"+value.getFullYear())});
            this.setState(state => (state.error.data_nascita.status=false,state));
        }else{
            this.setState(state => (state.error.data_nascita.status=true,state));
        }
    }
    trySignUp = () => {
        this._isMounted=true;
        console.log(this.state);
        let {error} = this.state;
        let {sign_in} = this.state;

        if (error.nome.status || error.cognome.status || error.password.status || error.password_conferma.status || error.tipo_utente.status || error.data_nascita.status
            || (this.state.tipo_utente=="Esterno" && error.provenienza_esterno.status)){
            if(this._isMounted){
                this.setState(state => (state.sign_in.called  = true, state));
                this.setState(state => (state.sign_in.successful=false, state));
                this.setState(state => (state.sign_in.message=
                    "Non posso proseguire, c'è qualche errore sui campi!", state));
            }
            return
        }
        axios.post('api/database/insert/user', {
            nome: this.state.nome,
            cognome: this.state.cognome,
            email : this.state.email,
            password: this.state.password,
            tipo_utente: this.state.tipo_utente,
            provenienza_esterno: this.state.visibility.provenienza_esterno?this.state.provenienza_esterno:"",
            data_nascita: this.state.data_nascita,
            telefono_utente: this.state.telefono_utente
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

    switchToLogIn = () => {
        this.props.changeView("logIN");
    }
    
    componentDidMount(){
        this._isMounted=true;
        console.log("Richieste le tipologie di operatori disponibili al server");
        axios.get("api/database/select/user/type")
            .then((response) => {
                console.log(response.data);
                if(this._isMounted){
                    this.setState({
                        database_operatori: response.data.items
                    })
                }
            })
            .catch((error) => {
                if(this._isMounted){
                    this.setState({database_operatori:["Default"]})
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
                                <TextField id="nome_textfield" error={error.nome.status} onChange={(e) => this.handleChange(e,'nome')} label="Nome" variant="outlined" required fullWidth
                                helperText="*Campo Richiesto">

                                </TextField>
                            
                        </Grid>
                        <Grid item xl={5} xs={6}>
                            <TextField id="cognome_textfield" error={error.cognome.status} onChange={(e) => this.handleChange(e,'cognome')} label="Cognome" variant="outlined" required fullWidth
                            helperText="*Campo Richiesto">

                            </TextField>
                        </Grid>
                        
                        <Grid item xl={10} xs={11}>
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
                           <Grid item xl={2} xs={2} container alignItems="center" style={{marginTop:"3%"}}>
                                <InputLabel>Data Nascita</InputLabel>
                           </Grid>
                            <Grid   item xl={5} xs={5} >
                                
                                    <DateTimePicker properties={{
                                                                width:"90%",
                                                                id:"data-nascita_picker",
                                                                label:"",
                                                                name:"data_nascita"
                                                                }}
                                                    onChange={this.handleDateChange}/>
                                
                            </Grid>
                        </Grid>               

                        <Grid xl={5} xs={5} item  container direction="row">
                            <Grid item xl={12} xs={12}>
                               
                                    <Selecter
                                                properties = {{labelId:"label-selecter-id",id:"selecter",inputLabel:"Tipo Utente",style:operatore_style,value:this.state.tipo_utente,
                                                customHandler:this.handleChange,helperText:error.tipo_utente.message,name:"tipo_utente",error:error.tipo_utente.status}}
                                                items={this.state.database_operatori}/>
                            </Grid>
                            <Fade in={this.state.visibility.provenienza_esterno} timeout={1000}>
                            {
                                this.state.visibility.provenienza_esterno?
                                <Grid item xl={12} xs={12}>
                                    <TextField  value={this.state.provenienza_esterno} id="provenienza_esterno_textfield" error={error.provenienza_esterno.status} onChange={(e) => this.handleChange(e,'provenienza_esterno')} label="Provenienza" variant="standard" required fullWidth
                                    helperText={error.provenienza_esterno.message}>

                                    </TextField>
                                </Grid>
                                :<div></div>
                                
                            }
                            </Fade>         
                            
                            
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
