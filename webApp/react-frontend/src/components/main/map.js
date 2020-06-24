import React,{ }  from 'react';
import { Map, TileLayer, Marker, Popup,LayersControl } from 'react-leaflet';
const { BaseLayer } = LayersControl

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
        {/* <LayersControl position="topright">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png' //'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' //'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        </LayersControl>  https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png*/}
        <LayersControl position="bottomright">
          <BaseLayer checked name="Base">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer checked name="Topografica">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png' //'https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="Satellite">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </BaseLayer>
        </LayersControl>
        
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
