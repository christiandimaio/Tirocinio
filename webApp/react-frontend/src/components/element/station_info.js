import React from 'react';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';


export default class StationInfo extends React.Component{
    _isMounted=false
    constructor(props){
        super(props);
        this.state={
            codice_stazione:""
        }
        
    }

    componentDidUpdate(prevProps,prevState) {
        if (this.props.id_station !== prevProps.id_station) {
            this.getStazione()
        }
    }

    getStazione = () => {
        axios.get('/api/Stazione/'+this.props.id_station)
        .then((response) => {
            console.log(response.data.item);
            if(this._isMounted){
                this.setState({
                    codice_stazione: response.data.item.codice_stazione
                  });
            }
        })
        .catch((error) => {
            
        }
        );
    }
    componentWillMount(){
        this._isMounted=true
        this.getStazione()
    }

    render(){
       console.log(this.state.codice_stazione)
        
        return(
            <Grid padded style={{width:"100%"}}>
                      <Grid.Row columns={1} >
                          <Grid.Column width={5} floated="left">
                              <h5>TEST</h5>
                          </Grid.Column>
                          <Grid.Column width={10} floated="right">
                            <h2>{this.state.codice_stazione}</h2>
                          </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns={1} >
                          <Grid.Column width={5} floated="left">
                          <h5>TEST</h5>
                          </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns={1} >
                          <Grid.Column width={5} floated="left">
                          <h5>TEST</h5>
                          </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns={1} >
                          <Grid.Column width={5} floated="left">
                          <h5>TEST</h5>
                          </Grid.Column>
                      </Grid.Row>
            </Grid>

        );
    }


}