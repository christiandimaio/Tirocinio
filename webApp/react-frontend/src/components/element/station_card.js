import React from 'react';

import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import DefaultStationImage from '../../images/stations/default.png'


// Proprietà componente 
// id_stazione = identificativo della stazione
// image_scr = Path immagine principale stazione
// nome_stazione = Codice della stazione
// tipo_stazione = tipologia stazione (Analogica - Digitale)
// messa_funzione = Data di messa in funzione stazione sismica
// numero_operazioni_svolte = Numero delle operazioni svolte sulla stazione
// is_attiva (Stringa) = Indica sé la stazione è attiva o meno
// getInfo (Funzione) = Funzione per avvisare il padre che è stato cliccato il bottone per vedere le info della stazione
export default class StationCard extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    const {properties} = this.props;
    return(
      <Item.Group divided>
        <Item>
          <Item.Image  size='tiny'  src={DefaultStationImage} />
          <Item.Content>
            <Item.Header as='a'>{properties.nome_stazione}</Item.Header>
            <Item.Meta>
              <span className='cinema'>Data messa in funzione : {properties.messa_funzione}</span>
              <Label>{properties.tipo_stazione}</Label>
              <Label>{properties.is_attiva}</Label>
            </Item.Meta>
            <Item.Description>Numero Operazioni effettuate: {properties.numero_operazioni_svolte}</Item.Description>
            <Item.Extra>
            
              <Button primary floated='center' onClick={() => {properties.getInfo(properties.id_stazione)}}>
                Visualizza Info
                <Icon name='right chevron'  />
              </Button>
              <Button primary floated='center' onClick={() => {properties.getInfo(properties.id_stazione)}}>
                Aggiungi Operazione
                <Icon name='right chevron'  />
              </Button>
              
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group >
    );
  }
}
