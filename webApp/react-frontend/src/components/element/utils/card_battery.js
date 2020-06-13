//Componente per la visualizzazione delle informazioni stazione sotto forma di card 
import React from 'react';

import { Card } from 'semantic-ui-react'
import { Typography } from '@material-ui/core';


// Componente visualizzazione card componente : Batteria
// Props:
//          voltage : voltaggio batteria
//          amp :   amperaggio batteria
//          serial : seriale componente
//          manufacter : casa costruttrice
//          name : nome componente
export default function BatteryCard(props){
    return(
        <Card>
            <Card.Content>
            <Card.Header>{props.serial}</Card.Header>
            <Card.Meta>
                <span className='info'>Batteria</span>
            </Card.Meta>
            <Card.Description>
                <Typography variant="body1">Produttore: {props.manufacter}</Typography>
                <Typography variant="body1">Nome: {props.name}</Typography>
                <Typography variant="body1">Voltaggio: {props.voltage}v</Typography>
                <Typography variant="body1">Amperaggio: {props.amp}aH</Typography>
            </Card.Description>
            </Card.Content>
        </Card>
    )
}
  
