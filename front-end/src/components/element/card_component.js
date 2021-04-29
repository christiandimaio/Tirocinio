
//Componente per la visualizzazione delle informazioni stazione sotto forma di card 
import { OmitProps } from 'antd/lib/transfer/renderListBody';
import React from 'react';

import { Button, Icon, Image } from 'semantic-ui-react'

import { Card,Grid } from 'semantic-ui-react'
import DefaultComponentImage from '../../images/components/default.png'

const ComponentCard = (props) => (
  <Card>
    <Image src={DefaultComponentImage} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{props.className}</Card.Header>
      <Card.Meta>
        <span className='date'>{props.classShortInfo}</span>
      </Card.Meta>
      <Card.Description>
        {props.classDescription}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Grid>
            <Grid.Row>
                <Grid.Column>
                  <Icon name='setting' />
                  {props.classNumberElement}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                  <Icon name='setting' />
                  {props.classNumberElement}
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <Button floated='right'>
                Aggiungi
                <Icon name='add'  />
        </Button>
    </Card.Content>
  </Card>
)


//Props :
// classImagePath: immagine di default del componente
//  
export default function ComponentCardInfo(props){
  

    return(
        <ComponentCard classImagePath="../../images/stations/default.png"
                        className= {props.nomeComponente}
                        classShortInfo= {"Gestione "+props.nomeComponente}
                        classNumberElement={props.componentiInMagazzino}/>
    )
}
