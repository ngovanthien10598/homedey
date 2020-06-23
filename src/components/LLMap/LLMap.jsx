import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

const LLMap = props => {
  return (
    <Map className={props.className} id={props.id} center={{ lng: 106, lat: 16 }} zoom={5} onclick={props.onClick}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        props.children
      }
    </Map>
  )
}

export default LLMap;