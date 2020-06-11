import React from 'react';
import './Subheading.scss';

const Subheading = props => {
  return (
    <p className={`subheading${props.center ? ' subheading--center' : ''}`}>
      {props.children}
    </p>
  )
}

export default Subheading;