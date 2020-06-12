// const Button = ReactBootstrap.Button;
const Spinner = ReactBootstrap.Spinner;
const {Button} = MaterialUI;
const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const styles = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
}

// Componente per la gestione delle operazioni di aggiornamento di NRL
class NrlComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            callRequest: false,
            inWaitingResponseState : false,
            result: undefined,
            waitingAnimation: undefined,
        }
    }

    onShowAlert = ()=>{
          window.setTimeout(()=>{
            this.setState({callRequest:false})
          },3000)

      }
    updateNrlCall = async () => {
        event.preventDefault();
        this.setState({callRequest:true});
        axios.get('/api/NRL/update', {
          })
          .then((response) => {
            const {result} = response.data;
            if (result == 201){     //Aggiornamento già in corso
                this.setState({result : (
                                        <Alert variant="warning" >
                                            Already in progress!
                                        </Alert>
                                        )
                            });              

            }else if (result == 199){
                this.setState({result : (
                                        <Alert variant="danger">
                                            Error!
                                        </Alert>
                                        )
                            });
            }else{
                this.setState({result : (
                                        <Alert variant="secondary" >
                                           All Done!
                                        </Alert>
                                        )
                            });
            }
            console.log("Update NRL Respose: " & result);
            this.onShowAlert();
            this.setState({inWaitingResponseState : false}, () => { this.props.nrlChangeState(this.state.inWaitingResponseState); });
          })
          .catch((error) => {
            this.setState({inWaitingResponseState : false}, () => { this.props.nrlChangeState(this.state.inWaitingResponseState); });
            this.setState({result : (
                                    <Alert variant="danger" >
                                        <Alert.Heading>{error}</Alert.Heading>
                                    </Alert>
                                    )
                        });
          });
        this.setState({inWaitingResponseState : true}, () => { this.props.nrlChangeState(this.state.inWaitingResponseState); });
        this.setState({ 
                        waitingAnimation : (<div>
                            <Spinner animation="grow" variant="success" />
                            <Spinner animation="grow" variant="danger" />
                            <Spinner animation="grow" variant="warning" /></div>)
                        });
    }

    render() {
        const {result,waitingAnimation,callRequest} = this.state;
        const waiting = this.state.inWaitingResponseState;
        return (
                <div class="container">
                    <div class="row h-10">
                        <div class="col-xl-8 col-sm-8">
                            <Button variant="secondary" style={styles} className="mb-2 " name="buttonNRLCALL" onClick ={this.updateNrlCall}>Aggiorna Database NRL</Button>
                        </div>
                        <div class="col-xl-4 col-sm-4">
                        {
                            callRequest ?
                              waiting?  
                                waitingAnimation
                                :result
                            : <div></div>
                        }
                        </div>
                </div>
            </div>
        );
    }
}