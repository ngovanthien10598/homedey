import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserRealEstateDetailsAPI } from 'services/user/listing';
import { getRealEstateDetailsAPI } from 'services/admin/real-estate';
import Cookies from 'js-cookie';
import { Skeleton, Divider } from 'antd';
import LLMap from 'components/LLMap/LLMap';
import { Marker } from 'react-leaflet';

const RealEstateDetails = props => {
  const { params } = useRouteMatch();
  const { realEstateId } = params;
  const userState = useSelector(state => state.userState);
  const { user } = userState;
  const accessToken = Cookies.get('access');

  const [realEstateDetails, setRealEstateDetails] = useState(null);
  const [isLoadingRealEstateDetails, setLoadingRealEstateDetails] = useState(null);

  async function getRealEstateDetails(realEstateId) {
    setLoadingRealEstateDetails(true);
    try {
      const response = user && user.is_staff ?
        await getRealEstateDetailsAPI(accessToken, realEstateId) :
        await getUserRealEstateDetailsAPI(accessToken, realEstateId);
      setRealEstateDetails(response.data.data);
      console.log(response.data.data.address);
    } catch (error) {
      console.log(error);
    }
    setLoadingRealEstateDetails(false);
  }

  useEffect(() => {
    if (realEstateId) {
      getRealEstateDetails(realEstateId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getAddressString(realEstate) {
    const street = realEstate.address.street;
    const ward = realEstate.address.ward;
    const district = ward.district;
    const city = district.city;

    const streetStr = (street && (street.prefix + ' ' + street.name + ', ')) || '';
    const wardStr = ward.prefix + ' ' + ward.name;
    const districtStr = district.prefix + ' ' + district.name;
    const cityStr = city.prefix + ' ' + city.name;
    return `${streetStr}${wardStr}, ${districtStr}, ${cityStr}`;
  }

  return (
    realEstateDetails ?
      <div className="re-details-page">
        <h2><strong>{realEstateDetails.title}</strong></h2>
        <Divider />

        <div className="re-details-page_summary">
          <p><strong>Thông tin chung</strong></p>
          <table>
            <tbody>
              <tr>
                <td>Giá</td>
                <td>{realEstateDetails.price} VND</td>
                <td>Năm xây dựng</td>
                <td>{realEstateDetails.year_build}</td>
              </tr>
              <tr>
                <td>Diện tích nền nhà</td>
                <td>{realEstateDetails.area} m<sup>2</sup></td>
                <td>Tổng diện tích</td>
                <td>{realEstateDetails.lot_size} m<sup>2</sup></td>
              </tr>
              <tr>
                <td>Phòng ngủ</td>
                <td>{realEstateDetails.bedroom}</td>
                <td>Phòng tắm</td>
                <td>{realEstateDetails.bathroom}</td>
              </tr>
              <tr>
                <td>Hình thức</td>
                <td>{realEstateDetails.real_estate_category.for_rent ? 'Cho thuê' : 'Bán'}</td>
                <td>Loại</td>
                <td>{realEstateDetails.real_estate_category.name.charAt(0).toUpperCase() + realEstateDetails.real_estate_category.name.substr(1)}</td>
              </tr>
              <tr>
                <td>Địa chỉ</td>
                <td colSpan="3">{getAddressString(realEstateDetails)}</td>
              </tr>
              <tr>
                <td>Dự án</td>
                <td>{realEstateDetails.project?.name}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="re-details-page_details">
          <p><strong>Thông tin chi tiết</strong></p>
          <div dangerouslySetInnerHTML={{ __html: realEstateDetails.detail }}></div>
        </div>

        <div className="re-details-page_images">
          {
            realEstateDetails.images.map(image => <img key={image.id} src={image.url} alt={image.url} />)
          }
        </div>

        <div className="re-details-page_map">
          <LLMap id="real-estate-map">
            <Marker position={{lat: realEstateDetails.address.latitude, lng: realEstateDetails.address.longitude}} />
          </LLMap>
        </div>
      </div>
      :
      <Skeleton
        active
        title={{ width: 800 }}
        paragraph={{ rows: 10, width: [500, 700, 400, 500, 600, 400, 500, 700, 400, 200] }}
        loading={isLoadingRealEstateDetails} />
  )
}

export default RealEstateDetails;