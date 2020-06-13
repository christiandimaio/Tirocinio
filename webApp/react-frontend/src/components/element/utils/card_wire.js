//Componente per la visualizzazione delle informazioni stazione sotto forma di card 
import React from 'react';

import { Card } from 'semantic-ui-react'
import Typography from '@material-ui/core/Typography';

// Componente visualizzazione card componente : Cavo
// Props:
//          section : sezione cavo
//          type :   tipo cavo
//          lung : lunghezza cavo
//          manufacter : casa costruttrice
//          name : nome componente
export default function WireCard(props){
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
                <Typography variant="body1">Tipo cavo: {props.type}</Typography>
                <Typography variant="body1">Sezione: {props.section} mm</Typography>
                <Typography variant="body1">Lunghezza: {props.lung} mt</Typography>
            </Card.Description>
            </Card.Content>
        </Card>
        
    )
}
