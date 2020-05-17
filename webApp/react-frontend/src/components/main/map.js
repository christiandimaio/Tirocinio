import React,{ useState ,Component}  from 'react';
import ReactDOM from 'react-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

export default class StationMap extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 40.863,
      lng: 14.2767,
      zoom: 9
    }
  }

  render() {
    
    return (
      <Map center={[40.863,14.2767]} zoom={this.state.zoom} >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {
          this.props.stations_info.map((item) => (
            <Marker position={[item["latitudine"],item["longitudine"]]} >
            <Popup zoomAnimation >
              {item["codice"]}
            </Popup>
          </Marker>
          ))
          
        }
        
      </Map>
    );
  }
}
