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
          console.log(response.data.items);
          setBatterieCounter(response.data.items.length);
        }
    })
  }

  return (
    <div>
      
      <Dialog fullScreen open={props.open} TransitionComponent={Transition} scroll="paper" style={{zIndex:0}}>
      <AddSensor open={false}/>
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
                <ComponentCardInfo nomeComponente="Sensori"  componentiInMagazzino={23}/>
              </Grid.Column>
              <Grid.Column>
                <ComponentCardInfo nomeComponente="Acquisitori"  componentiInMagazzino={22}/>
              </Grid.Column>
              <Grid.Column>
                <ComponentCardInfo nomeComponente="Batterie"  componentiInMagazzino={batterie}/>
              </Grid.Column>
              <Grid.Column>
                <ComponentCardInfo nomeComponente="Regolatori carica"  componentiInMagazzino={22}/>
              </Grid.Column>
              <Grid.Column>
                <ComponentCardInfo nomeComponente="Gps"  componentiInMagazzino={22}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={5}>
              <Grid.Column>
                <ComponentCardInfo nomeComponente="Hard Disk"  componentiInMagazzino={22}/>
              </Grid.Column>
              <Grid.Column>
                <ComponentCardInfo nomeComponente="Pannelli Solari"  componentiInMagazzino={22}/>
              </Grid.Column>
              <Grid.Column>
                <ComponentCardInfo nomeComponente="Cavi"  componentiInMagazzino={22}/>
              </Grid.Column>
            </Grid.Row>   
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
