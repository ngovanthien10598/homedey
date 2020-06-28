import React from 'react';
import { Link } from 'react-router-dom';
import './RealEstate.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faBorderAll, faMapMarkerAlt, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { priceWithThousandSpace } from 'utils/number';

const RealEstate = props => {
  const { thumbnail, realEstate } = props;
  let addressStr = "";
  if (realEstate) {
    const { address } = realEstate;
    const { ward } = address;
    const { district } = ward;
    const { city } = district;
    const districtStr = district.prefix + " " + district.name;
    const cityStr = city.prefix + " " + city.name;
    addressStr = districtStr + ", " + cityStr;
  }

  return (
    realEstate ?
      <li className={`real-estate${thumbnail ? ' real-estate--thumbnail' : ''}`}>
        <Link className="real-estate__image" to={`/real-estate/${realEstate.slug}`}>
          <img src={realEstate.images[0]?.url || "//via.placeholder.com/800x600"} alt={realEstate.images[0]?.url || "//via.placeholder.com/800x600"} />
        </Link>
        <div className="real-estate__content">
          <h3 className="real-estate__heading">
            <Link to={`/real-estate/${realEstate.slug}`}>{realEstate.title}</Link>
          </h3>
          <p className="real-estate__summary">{realEstate.detail.length > 120 ? realEstate.detail.substr(0, 120) + "..." : realEstate.detail}</p>
          <div className="real-estate__columns">
            <span className="real-estate__price"><FontAwesomeIcon icon={faCoins} /> {priceWithThousandSpace(realEstate.price)} VNĐ</span>
            <span className="real-estate__area"><FontAwesomeIcon icon={faBorderAll} /> {realEstate.area} m<sup>2</sup></span>
          </div>
          <div className="real-estate__address"><FontAwesomeIcon icon={faMapMarkerAlt} /> {addressStr}</div>
          <p className="real-estate__date"><FontAwesomeIcon icon={faCalendar} /> {new Date(realEstate.created_at).toLocaleDateString("vi-VN")}</p>
        </div>
      </li>
      :
      null
  )
}

export default RealEstate;