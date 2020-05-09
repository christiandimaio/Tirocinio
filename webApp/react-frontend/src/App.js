import React,{ useState }  from 'react';
import ReactDOM from 'react-dom';
import Sign_Up from './components/sign_up/sign_up';
import {Box,Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';


export default class App extends React.Component{

    constructor(){
        super();
        this.state = {
            visibleSection : "signUP",
        }
    }

    changeView = (value) => {
        this.setState({visibleSection:value});
    }

    render(){
       
        switch(this.state.visibleSection){
            case "signUP" :
                return (
                    
                        <Box display="flex" bgcolor="black" justifyContent="center"
                    alignItems="center"
                    minHeight="100vh">
                        <Container maxWidth="sm" >
                                            <Sign_Up dadProps={this.state} >
                                            </Sign_Up>
                        </Container>
                        </Box>
                        );
            case "logIn":
                return (
                    <Box display="flex" width={1} height={1}>
                                <Grid container direction="row" alignItems="center" justify="center" style={{width:"50%",margin:"auto"}}>
                                    <Grid item >
                                        <Sign_Up dadProps={this.state} changeView={this.changeView()}>
                                        </Sign_Up>
                                    </Grid>     
                                </Grid>
                    </Box>
                );
            case "main":
                    return(<div></div>);
            default:
                    return(<div></div>);

            
        }
        
    }
}
ReactDOM.render(<App/>,document.getElementById('root'))
