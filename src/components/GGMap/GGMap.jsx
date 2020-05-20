import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const GGMap = props => {

  return <Map mapTypeId="SATELLITE" initialCenter={props.center} centerAroundCurrentLocation={true} google={props.google}>
    {
      props.positionList.length > 0 &&
      props.positionList.map(p => {
        return <Marker onClick={props.onMarkerClick} title={p.name} key={p.id} position={{ lat: p.latitude, lng: p.longitude }} />
      })
    }
    <InfoWindow visible={true} marker={props.selectedMarker} ><h1>Haha</h1></InfoWindow>
  </Map>
}

export default GoogleApiWrapper({ apiKey: 'AIzaSyAfOlOJJlejZjLTcM6RDZMUc3OGGuLCX7Y' })(GGMap);