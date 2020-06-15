import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import './MapMarker.scss';

const MapMarker = () => {
  return (
    <div className="map-marker">
      <FontAwesomeIcon color={'#ff2222'} icon={faMapMarkerAlt} />
    </div>
  )
}

export default MapMarker;