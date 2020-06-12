import React,{} from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import itLocale from "date-fns/locale/it";
  
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker  } from '@material-ui/pickers';



export default class DateTimePicker extends React.Component {
    constructor(props){
        super(props);

        this.state= {
            selectedDate: new Date()
        }

    }

    handleDateChange = (value) => {
        this.setState({selectedDate:value})
        this.props.onChange(value);
      };

    render(){
        const {properties} = this.props;

        return(
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={itLocale}>
                                            <KeyboardDatePicker       
                                            
                                                margin="normal"
                                                name={properties.name}
                                                id= {properties.id}
                                                label= {properties.label}
                                                format="dd/MM/yyyy"
                                                value={this.state.selectedDate}
                                                onChange={(value) => this.handleDateChange(value)}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'Cambia Data',
                                                }}
                                                style={{width:properties.width}}
                                                invalidDateMessage="Inserire una data Corretta"
                                            />
                </MuiPickersUtilsProvider>
            );


    }

}