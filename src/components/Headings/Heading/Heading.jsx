import React from 'react';
import './Heading.scss';

const Heading = props => {
  return (
    <h2 className={`heading${props.center ? ' heading--center' : ''}`}>
      {props.children}
    </h2>
  )
}

export default Heading;