const {TextField} = MaterialUI;
class DateTimePicker extends React.Component{
    constructor(props){
        super(props);
        this.state = props;
    }
    


    render(){
        
        return (
            <TextField
                id="date"
                label="Birthday"
                type="date"
                variant="outlined"
                defaultValue="2017-05-24"
                style={{width:200}}
                InputLabelProps={{
                shrink: true,
                }}
            />
        );
    }
}