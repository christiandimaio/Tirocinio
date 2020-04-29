
const Form = ReactBootstrap.Form;
const Button = ReactBootstrap.Button;
const Image = ReactBootstrap.Image;
const Alert = ReactBootstrap.Alert;
const {TextField,Box,Snackbar,IconButton,FormHelperText,InputLabel,InputAdornment,Visibility,VisibilityOff,Input,Checkbox,FormControlLabel,Icon,Grid,Select,MenuItem,FormControl,makeStyles,spacing} = MaterialUI;
const Button_MUI = MaterialUI.Button;

class Selecter extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            items:[],
            properties:{}
        };
        
        axios.get(this.props.server_uri)
          .then((response) => {
            console.log(response.data);
            this.setState({
                items: response.data.items
            });
        });
                
    }

    render(){
            const {properties} = this.props;
            let {items} = this.state;
            console.log(properties);
                return(
                    <FormControl variant="outlined" error={properties.error} required style={{minWidth: 250}} >
                                    <InputLabel id="selecter-id-label">{properties.inputLabel}</InputLabel>
                                    <Select fullWidth
                                        labelId={properties.labelId}
                                        id={properties.id}
                                        label={properties.inputLabel}
                                        onChange={(e) => properties.customHandler(e,properties.name)}
                                        style={properties.style}
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


