const {makeStyles} = MaterialUI;
const{AppBar,Toolbar,Menu,MenuItem,IconButton,Typography} = MaterialUI;
const {AccountCircle,Button,Grid,Spacing,Box,Positions,Divider} = MaterialUI;
// const {MenuIcon} = MaterialUI.Menu;



class TopBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : ""
        }
        
    }
    
    logout = () => {
        event.preventDefault();
        axios.get("/logout"
                ).then((response) => {
                    console.log(response);
                    if (response.data["operationCode"]==200){
                        console.log("OK, Logout");
                        window.location = "/login";
                    }

                })

    }

    render(){
        return (
        <div>
            <AppBar position="static" style={{background:"#3f51b5"}}>
            <Toolbar>
                    <Box display="flex" style={{flexGrow:1}}>
                        <Typography variant="h3" >
                        INGV
                        </Typography>
                        <Typography variant="h6" style={{marginLeft:4}} spacing={2}>
                        {this.props.username}
                        </Typography>
                    </Box>
                        <Button color="inherit" mt={10} style={{marginLeft:2,minHeight:50,miWidth:200,background:"#1a237e"}}
                                onClick={(e) => this.logout()}>LOGOUT</Button>
                        
            </Toolbar>
            </AppBar>
        </div>
        );
    }
}