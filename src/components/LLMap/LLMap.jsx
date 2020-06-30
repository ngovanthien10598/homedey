import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { Marker } from 'react-leaflet';

const LLMap = props => {
  const { value = {}, onChange } = props; // Value for antd form

  const handleOnClick = e => {
    if (onChange) {
      onChange(e.latlng);
    }

    if (props.onclick) {
      props.onClick(e);
    }
  }

  return (
    <Map className={props.className} style={props.style} id={props.id} center={{ lng: 106, lat: 16 }} zoom={5} onclick={handleOnClick}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        props.children
      }
      {
        value && value.lat && value.lng &&
        <Marker position={value} />
      }
    </Map>
  )
}

export default LLMap;