//Componente per la visualizzazione delle informazioni stazione sotto forma di card 
import React from 'react';

import { Card } from 'semantic-ui-react'
import Typography from '@material-ui/core/Typography';

// Componente visualizzazione card componente : Memoria di massa
// Props:
//          size : dimensione in GB
//          type :   tipo memoria di massa
//          serial : seriale componente
//          manufacter : casa costruttrice
//          name : nome componente
export default function HardDriveCard(props){
    return(
        <Card>
            <Card.Content>
            <Card.Header>{props.serial}</Card.Header>
            <Card.Meta>
                <span className='info'>Memoria di masssa</span>
            </Card.Meta>
            <Card.Description>
                <Typography variant="body1">Produttore: {props.manufacter}</Typography>
                <Typography variant="body1">Nome: {props.name}</Typography>
                <Typography variant="body1">Dimensione: {props.size} GB</Typography>
                <Typography variant="body1">Tipologia: {props.type} </Typography>
            </Card.Description>
            </Card.Content>
        </Card>
    )
}
  
