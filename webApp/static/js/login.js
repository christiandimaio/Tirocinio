const Form = ReactBootstrap.Form;
const Button = ReactBootstrap.Button;
const Image = ReactBootstrap.Image;
const Alert = ReactBootstrap.Alert;

class Sign_In_Form extends React.Component{
    render(){
        return (
                <div id="" class="jumbotron my-auto">
                        <h1>TEST</h1>
                </div>);
    }
}

class Login_Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password : "",
            rememberme: false,
            formErrors : {
                email:"",
                password:""
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.tryLogIn = this.tryLogIn.bind(this);
    }

    handleChange(event){
        let formErrors = this.state.formErrors;
        let {name,value} = event.target;
        switch(name){
            case "email":
                formErrors.email = value.length < 5 
                    ? "email troppo corta"
                    : "";
                break;
            case "password":
                formErrors.password = value.length <=0
                    ? "campo password vuoto"
                    : ""
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
        event.preventDefault();
        axios.post('/', {
            email : this.state.email,
            password: this.state.password,
            rememberME : this.state.rememberme
          })
          .then((response) => {
            if (response.data["operationCode"] != 200){
                console.log(response.data["operationCode"]);
                this.props.loginCheck(true);
            }else{
                console.log("LOGGED!");
            }
          })
          .catch((error) => {
            console.log(error);
          });
          
    }
    

    render(){
        const {disableButtonLogIn} = this.props;
        const {email,password} = this.state;
        const {formErrors} = this.state.formErrors;
        const messageErrorEmail = email.length >= 0 && email.length<5 
                                    ? (<Form.Control.Feedback type="invalid" className="d-block">Lunghezza campo non valida</Form.Control.Feedback>)
                                    : (<Form.Control.Feedback type="valid" className="d-block" >OK.</Form.Control.Feedback>);

        return  (<Form onSubmit = {this.tryLogIn}>
                    <Form.Group mb="4" controlId="formBasicEmail">
                        <Form.Label for = "validationCustomEmail">Email </Form.Label>
                        <Form.Control required id="validationCustomEmail" name="email" type="email" placeholder="Enter email" onChange={this.handleChange}
                            isvalid={email.length >= 0 && email.length >6}
                            isinvalid = {email.length >=0 && email.length <=6}
                            className ="rounded-pill"
                        />
                        {messageErrorEmail}
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required name="password" value={password} onChange={this.handleChange} type="password" placeholder="Password" className="rounded-pill"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check name="rememberme" type="checkbox" label="Ricordami." checked={this.state.rememberme} onChange={this.handleChange} />
                    </Form.Group>
                    <Button varant="primary" type="submit" size="lg" block className="rounded-pill" disabled={disableButtonLogIn ? 'true' : ''}>Entra</Button>
                    

                </Form>);
                
    }
}

class Login extends React.Component{
    constructor() {
        super();
        

        this.state = {
          nrlUpdating : false
        }
    }

    handleSignInClick = () => {
        this.setState(prevState => ({
            signUpClicked: !prevState.check
          }));
      }

    loginCheck = (result) => {
        this.setState({loginFailed : result});
    }  

    nrlChangeState = (state) => {
        this.setState({nrlUpdating : state});
    }
    
    render(){
        const nrlUpdating = this.state.nrlUpdating;
        return (    
                <div id="log_in" class="h-100"> 
                    <div class="row align-items-center h-100">
                        <div class="col-xl-4 col-sm-4 col-lg-4 col-md-4 mx-auto">
                                <NrlComponent nrlChangeState={this.nrlChangeState}></NrlComponent>
                                <div class="border rounded-top jumbotron ">
                                    <Login_Form loginCheck={this.loginCheck} disableButtonLogIn={nrlUpdating}></Login_Form> 
                                    <Button variant="outline-primary" className="rounded-pill mt-4" size="lg" block onClick={this.handleSignInClick} disabled={nrlUpdating ? 'true' : '' } >Registrati</Button>
                                </div>
                                {
                                    this.state.loginFailed ?
                                    <Alert variant="warning" className=" w-20 alert-dismissible fade show" >
                                        Accesso non riuscito, controllare email o password!
                                    </Alert> 
                                    : <div></div>
                                }            
                        </div> 
                    </div>
                </div>
        );
    }
}

ReactDOM.render(<Login></Login>,document.getElementById("root"));