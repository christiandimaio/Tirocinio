
import React from 'react';
import axios from 'axios';
import {FormControl,InputLabel,Select,FormHelperText,MenuItem} from '@material-ui/core';


{/* <Selecter
            properties = {{labelId:"label-selecter-id",
                            id:"selecter",
                            inputLabel:"Tipo Utente",
                            style:operatore_style,
                            value:this.state.tipo_utente,
            customHandler:this.handleChange,
            helperText:error.tipo_utente.message,
            name:"tipo_utente",
            error:error.tipo_utente.state}}
            item= '/database/select/user/type'/> */}

export default class Selecter extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            value:"",
            properties:{}
        };
        
        
                
    }

    valueChanged = (event,name) => {
        
        this.setState({value:event.target.value});
        this.props.properties.customHandler(event,name);

    }
    render(){
            const {properties} = this.props;
            let {items} = this.props;
                return(
                    <FormControl variant="outlined" error={properties.error} required fullWidth >
                                    <InputLabel id="selecter-id-label">{properties.inputLabel}</InputLabel>
                                    <Select fullWidth
                                        labelId={properties.labelId}
                                        id={properties.id}
                                        label={properties.inputLabel}
                                        onChange={(e) => this.valueChanged(e,properties.name)}
                                        style={properties.style}
                                        value={this.state.value}
                                        >
                                        {
                                            items.map(item => <MenuItem value={item}>{item}</MenuItem>)
                                        } 
                                    </Select>
                                    <FormHelperText>{properties.helperText}</FormHelperText>
                    </FormControl>
                )
            }

    }


