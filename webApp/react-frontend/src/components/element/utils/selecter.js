
import React from 'react';
import {FormControl,InputLabel,Select,FormHelperText,MenuItem} from '@material-ui/core';



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
                    <FormControl variant="outlined" error={properties.error} required={properties.required} fullWidth >
                                    <InputLabel id="selecter-id-label">{properties.inputLabel}</InputLabel>
                                    <Select fullWidth
                                        labelId={properties.labelId}
                                        id={properties.id}
                                        label={properties.inputLabel}
                                        onChange={(e) => this.valueChanged(e,properties.name)}
                                        style={properties.style}
                                        value={properties.value}
                                        >
                                        {
                                            items.map((item,i) => <MenuItem value={item.key}>{item.value}</MenuItem>)
                                        } 
                                    </Select>
                                    <FormHelperText>{properties.helperText}</FormHelperText>
                    </FormControl>
                )
            }

    }


