const Form = ReactBootstrap.Form;
const Button = ReactBootstrap.Button;
const Image = ReactBootstrap.Image;


class Sign_In_Form extends React.Component{
    render(){
        return (
                <div id="sign_in" class="jumbotron my-auto">
                        <h1>TEST</h1>
                </div>);
    }
}
class Login_Form extends React.Component{
    constructor(props){
        super(props);
        const {tryLogIn} = this.props;
        this.state = {
            email: "",
            password : "",
            formErrors : {
                email:"",
                password:""
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.tryLogIn = this.tryLogIn.bind(this);
    }

    handleChange(event){
        event.preventDefault();
        let formErrors = this.state.formErrors;
        const {name,value} = event.target;
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
            default:
                break;
        }
        this.setState({formErrors, [name]: value},()=> console.log(this.state));
    }

   

    tryLogIn(){
        
    }
    render(){
        const {tryLogIn} = this.props;
        const {email,password} = this.state;
        const {formErrors} = this.state.formErrors;
        const messageErrorEmail = email.length >= 0 && email.length<5 
                                    ? (<Form.Control.Feedback type="invalid" className="d-block">Lunghezza campo non valida</Form.Control.Feedback>)
                                    : (<Form.Control.Feedback type="valid" className="d-block" >OK.</Form.Control.Feedback>);
        console.log(messageErrorEmail)
        return  (<Form onSubmit = {this.tryLogIn}>
                    <Form.Group mb="4" controlId="formBasicEmail">
                        <Form.Label for = "validationCustomEmail">Email </Form.Label>
                        <Form.Control id="validationCustomEmail" name="email" type="email" placeholder="Enter email" onChange={this.handleChange}
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
                        <Form.Check type="checkbox" label="Ricordami" />
                    </Form.Group>
                    <Button varant="primary" type="submit" className="rounded-pill">Entra</Button>
                </Form>);
                
    }
}

class Login extends React.Component{
    constructor() {
        super();
        this.handleSignInClick = this.handleSignInClick.bind(this)
        this.state = {
          signUpClicked: false,
          email:'',
          password:''
        }
    }

    handleSignInClick() {
        this.setState({
                signUpClicked: not(signUpClicked)
            });
      }



    makeNewUser(){

    }

    
    
    render(){
        return (
                <div id="log_in" class="container h-100 d-flex justify-content-center">
                    <div class="border border-dark rounded-top jumbotron my-auto">
                        <Login_Form tryLogIn={(event) => this.tryLogIn()}></Login_Form> 
                        <Button variant="outline-primary" className="rounded-pill mt-2" size="lg" block onClick={this.handleSignInClick}>Registrati</Button>
                    </div>
                    {
                        this.state.signUpClicked?
                        <Sign_In_Form/>
                        :
                        <div></div>
                    }
                </div>
        );
    }
}

ReactDOM.render(<Login></Login>,document.getElementById("root"));