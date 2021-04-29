//Componente per la visualizzazione delle informazioni stazione sotto forma di card 
import React from 'react';

import { Card } from 'semantic-ui-react'
import Typography from '@material-ui/core/Typography';

// Componente visualizzazione card componente : Sensore
// Props:
//          gain : guadagno
//          samplingRate :   frequenza campionamento
//          serial : seriale componente
//          manufacter : casa costruttrice
//          name : nome componente
export default function SensorCard(props){
    return(
        <Card>
            <Card.Content>
            <Card.Header>{props.serial}</Card.Header>
            <Card.Meta>
                <span className='info'>Batteria</span>
            </Card.Meta>
            <Card.Description>
                <Typography variant="body1">Produttore: {props.manufacter}</Typography>
                <Typography variant="body1"> Nome: {props.name}</Typography>
                <Typography variant="body1">Guadagno: {props.gain} dB</Typography>
                <Typography variant="body1">Sampling Rage: {props.samplingRate} Hz</Typography>
            </Card.Description>
            </Card.Content>
        </Card>
    )
}
  
