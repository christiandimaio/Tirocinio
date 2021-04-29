//Componente per la visualizzazione delle informazioni stazione sotto forma di card 
import React from 'react';

import { Card } from 'semantic-ui-react'
import Typography from '@material-ui/core/Typography';

// Componente visualizzazione card componente : Acquisitore
// Props:
//          nChannel : numero canali supportati dal datalogger
//          manufacter : casa costruttrice
//          name : nome componente
export default function DataloggerCard(props){
    return(
        <Card>
            <Card.Content>
            <Card.Header>{props.serial}</Card.Header>
            <Card.Meta>
                <span className='info'>Acquisitore</span>
            </Card.Meta>
            <Card.Description>
                <Typography variant="body1">Produttore: {props.manufacter}</Typography>
                <Typography variant="body1">Nome: {props.name}</Typography>
                <Typography variant="body1">Numero canali sup.: {props.nChannel}</Typography>
            </Card.Description>
            </Card.Content>
        </Card>
    )
}
  