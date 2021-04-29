//Componente per la visualizzazione delle informazioni stazione sotto forma di card 
import React from 'react';

import { Card } from 'semantic-ui-react'
import Typography from '@material-ui/core/Typography';

// Componente visualizzazione card componente : Gps
// Props:
//          waterproof :   indica se il gps è impermeabile
//          autoCalibration : indica se il gps è autocalibrande
//          manufacter : casa costruttrice
//          name : nome componente
export default function GpsCard(props){
    return(
        <Card>
            <Card.Content>
            <Card.Header>{props.serial}</Card.Header>
            <Card.Meta>
                <span className='info'>GPS</span>
            </Card.Meta>
            <Card.Description>
                <Typography variant="body1">Produttore: {props.manufacter}</Typography>
                <Typography variant="body1">Nome: {props.name}</Typography>
            </Card.Description>
            </Card.Content>
        </Card>
    )
}
  
