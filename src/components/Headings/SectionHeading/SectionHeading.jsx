import React from 'react';
import './SectionHeading.scss';

const SectionHeading = props => {
  return (
    <h2 className={`section-heading${props.center ? ' section-heading--center' : ''}`}>
      {props.children}
    </h2>
  )
}

export default SectionHeading;