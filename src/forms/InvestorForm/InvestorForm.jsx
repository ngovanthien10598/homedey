import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
import { getAllCitiesAPI, getDistrictsByCityAPI, getWardsByDistrictAPI, getStreetsByDistrictAPI } from 'services/user/address';
import Quill from 'react-quill';

const { Item } = Form;
const { Option } = Select;

const InvestorForm = props => {
  const investor = props.investor;

  const [cities, setCities] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [wards, setWards] = useState(null);
  const [streets, setStreets] = useState(null);

  const [isLoading, setIsLoading] = useState(null);

  async function getAllCities() {
    setIsLoading(true);
    try {
      const response = await getAllCitiesAPI();
      setCities(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function getDistrictsByCity(city_id) {
    setIsLoading(true);
    try {
      const response = await getDistrictsByCityAPI(city_id);
      setDistricts(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function getWardsAndStreetsByDistrict(district_id) {
    setIsLoading(true);
    try {
      const [wardRes, streetRes] = await Promise.all([
        getWardsByDistrictAPI(district_id),
        getStreetsByDistrictAPI(district_id)
      ]);
      setWards(wardRes.data);
      setStreets(streetRes.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getAllCities();

    if (investor) {
      getDistrictsByCity(investor.address.ward.district.city.id);
      getWardsAndStreetsByDistrict(investor.address.ward.district.id);
    }
  }, [investor]);

  return (
    <Form
      layout="vertical"
      form={props.form}>
      <img src={investor?.avatar} alt="" />
      <Row gutter="15">
        <Col flex="1">
          <Item label="Tên chủ đầu tư" name="name" initialValue={investor?.name}>
            <Input />
          </Item>
        </Col>
        <Col flex="1">
          <Item label="Số điện thoại" name="phone" initialValue={investor?.phone}>
            <Input />
          </Item>
        </Col>
      </Row>

      <Row gutter="15">
        <Col flex="1">
          <Item label="Địa chỉ email" name="email" initialValue={investor?.email}>
            <Input />
          </Item>
        </Col>
        <Col flex="1">
          <Item label="Website" name="website" initialValue={investor?.website}>
            <Input />
          </Item>
        </Col>
      </Row>
      <Item label="Thông tin chi tiết" name="detail" initialValue={investor?.detail || ""}>
        <Quill theme="snow" />
      </Item>
      <Row gutter="15">
        <Col flex="1">
          <Item label="Tỉnh/thành phố" name="city_id" initialValue={investor?.address.ward.district.city.id}>
            <Select loading={isLoading} onChange={getDistrictsByCity} disabled={!cities}>
              {
                cities &&
                cities.map(city => {
                  return <Option key={city.id} value={city.id}>{city.prefix + ' ' + city.name}</Option>
                })
              }
            </Select>
          </Item>
        </Col>
        <Col flex="1">
          <Item
            label="Quận/huyện"
            name="district_id"
            initialValue={investor?.address.ward.district.id}>
            <Select loading={isLoading} onChange={getWardsAndStreetsByDistrict} disabled={!districts}>
              {
                districts &&
                districts.map(district => {
                  return <Option key={district.id} value={district.id}>{district.prefix + ' ' + district.name}</Option>
                })
              }
            </Select>
          </Item>
        </Col>
        <Col flex="1">
          <Item
            label="Xã/phường/trị trấn"
            name="ward_id"
            initialValue={investor?.address.ward.id}>
            <Select loading={isLoading} disabled={!wards}>
              {
                wards &&
                wards.map(ward => {
                  return <Option key={ward.id} value={ward.id}>{ward.prefix + ' ' + ward.name}</Option>
                })
              }
            </Select>
          </Item>
        </Col>
        <Col flex="1">
          <Item
            label="Xã/phường/trị trấn"
            name="street_id"
            initialValue={investor?.address.street.id}>
            <Select loading={isLoading} disabled={!streets}>
              {
                streets &&
                streets.map(street => {
                  return <Option key={street.id} value={street.id}>{street.prefix + ' ' + street.name}</Option>
                })
              }
            </Select>
          </Item>
        </Col>
      </Row>
    </Form>
  )
}

export default InvestorForm;