import React,{ }  from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

// Componente che gestisce la mappa
//  Props:
//        stations : rappresenta tutte le stazioni da dover renderizzare
export default class StationMap extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 40.863,
      lng: 14.2767,
      zoom: 8
    }
  }

  render() {
    
    return (
      <Map center={[41.0842,14.3358]} zoom={this.state.zoom} >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {
          this.props.stations.map((station) => (
            <Marker position={[station["latitudine"],station["longitudine"]]} >
            <Popup zoomAnimation >
              {station["codice"]}
            </Popup>
          </Marker>
          ))
          
        }
        
      </Map>
    );
  }
}
