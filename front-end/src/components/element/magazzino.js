import React , { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ComponentCardInfo from './card_component.js';
import {Grid} from 'semantic-ui-react';
import DialogContent from '@material-ui/core/DialogContent';
import 'semantic-ui-css/semantic.min.css'
import AddSensor from './utils/add_sensor.js';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [sensori,setSensoriCounter] = React.useState(0);
  const [batterie,setBatterieCounter] = React.useState(0);
  const [acquisitori,setAcquisitoriCounter] = React.useState(0);
  const [regolatoriCarica,setRegolatoriCaricaCounter] = React.useState(0);
  const [pannelliSolari,setPannelliSolariCounter] = React.useState(0);
  const [cavi,setCaviCounter] = React.useState(0);
  const [memorieMassa,setMemorieMassaCounter] = React.useState(0);
  const [gps,setGpsCounter] = React.useState(0);

  const[addSensorModalShowing,setModalSensor] = React.useState(false);

  useEffect(() => {
    if (props.open){
      getMagazzino()
    }
  });

  function getMagazzino(){
    
    axios.get('api/Magazzino/Batterie')
      .then((response) => {
        console.log(response.data.operationCO);
        if (response.data['operationCode'] === 200){
          console.log(response.data);
          setBatterieCounter(response.data.items.length);
        }else{
          setBatterieCounter(0);
        }
    })
    axios.get('api/Magazzino/Sensori')
      .then((response) => {
        console.log(response.data.operationCO);
        if (response.data['operationCode'] === 200){
          console.log(response.data.items);
          setSensoriCounter(response.data.items.length);
        }else{
          setSensoriCounter(0);
        }
    })
    axios.get('api/Magazzino/Acquisitori')
      .then((response) => {
        console.log(response.data.operationCO);
        if (response.data['operationCode'] === 200){
          console.log(response.data.items);
          setAcquisitoriCounter(response.data.items.length);
        }else{
          setAcquisitoriCounter(0);
        }
    })
    axios.get('api/Magazzino/RegolatoriCarica')
      .then((response) => {
        console.log(response.data.operationCO);
        if (response.data['operationCode'] === 200){
          console.log(response.data.items);
          setRegolatoriCaricaCounter(response.data.items.length);
        }else{
          setRegolatoriCaricaCounter(0);
        }
    })
    axios.get('api/Magazzino/PannelliSolari')
      .then((response) => {
        console.log(response.data.operationCO);
        if (response.data['operationCode'] === 200){
          console.log(response.data.items);
          setPannelliSolariCounter(response.data.items.length);
        }else{
          setPannelliSolariCounter(0);
        }
    })
    axios.get('api/Magazzino/Cavi')
      .then((response) => {
        console.log(response.data.operationCO);
        if (response.data['operationCode'] === 200){
          console.log(response.data.items);
          setCaviCounter(response.data.items.length);
        }else{
          setCaviCounter(0);
        }
    })
    axios.get('api/Magazzino/MemorieMassa')
      .then((response) => {
        console.log(response.data.operationCO);
        if (response.data['operationCode'] === 200){
          console.log(response.data.items);
          setMemorieMassaCounter(response.data.items.length);
        }else{
          setMemorieMassaCounter(0);
        }
    })
    axios.get('api/Magazzino/Gps')
      .then((response) => {
        console.log(response.data.operationCO);
        if (response.data['operationCode'] === 200){
          console.log(response.data.items);
          setGpsCounter(response.data.items.length);
        }else{
          setGpsCounter(0);
        }
    })
  }

  function addSensore(){
    setModalSensor(true)
  }
  return (
    <div>
      <AddSensor open={addSensorModalShowing}/>
      <Dialog fullScreen open={props.open} TransitionComponent={Transition} scroll="paper" style={{zIndex:0}}>

        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => {props.handleChange(false)}} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Attrezzatura Osservatorio Vesuviano
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent dividers="paper">
          
          <Grid padded>
            <Grid.Row columns={5}>
              <Grid.Column>
                <ComponentCardInfo nomeComponente="Sensori"  componentiInMagazzino={sensori} addComponent={addSensore}/>
              </Grid.Column>
              <Grid.Column>
                <ComponentCardInfo nomeComponente="Acquisitori"  componentiInMagazzino={acquisitori}/>
              </Grid.Column>
              <Grid.Column>
                <ComponentCardInfo nomeComponente="Batterie"  componentiInMagazzino={batterie}/>
              </Grid.Column>
              <Grid.Column>
                <ComponentCardInfo nomeComponente="Regolatori carica"  componentiInMagazzino={regolatoriCarica}/>
              </Grid.Column>
              <Grid.Column>
                <ComponentCardInfo nomeComponente="Gps"  componentiInMagazzino={gps}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={5}>
              <Grid.Column>
                <ComponentCardInfo nomeComponente="Hard Disk"  componentiInMagazzino={memorieMassa}/>
              </Grid.Column>
              <Grid.Column>
                <ComponentCardInfo nomeComponente="Pannelli Solari"  componentiInMagazzino={pannelliSolari}/>
              </Grid.Column>
              <Grid.Column>
                <ComponentCardInfo nomeComponente="Cavi"  componentiInMagazzino={cavi}/>
              </Grid.Column>
            </Grid.Row>   
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
