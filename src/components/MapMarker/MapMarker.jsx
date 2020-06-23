import React from 'react';
import { Marker } from 'react-leaflet';

import './MapMarker.scss';

const MapMarker = props => {
  return (
    <Marker className="map-marker" position={props.position}></Marker>
  )
}

export default MapMarker;