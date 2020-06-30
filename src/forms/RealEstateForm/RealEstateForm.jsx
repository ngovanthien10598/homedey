import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Row, Col } from 'antd';
import Quill from 'react-quill';

// API
import { getAllRealEstateCategoriesAPI } from 'services/user/real-estate-category';
import { getAllCitiesAPI, getDistrictsByCityAPI, getWardsByDistrictAPI, getStreetsByDistrictAPI } from 'services/user/address';
import { getProjectsByDistrictAPI } from 'services/user/project';
import LLMap from 'components/LLMap/LLMap';

const { Item } = Form;
const { Option } = Select;

const RealEstateForm = props => {
  const { realEstate } = props;

  const [categories, setCategories] = useState(null);
  const [cities, setCities] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [wards, setWards] = useState(null);
  const [streets, setStreets] = useState(null);
  const [projects, setProjects] = useState(null);

  const [forRent, setForRent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function getAllProjectCategories() {
    setIsLoading(true);
    try {
      const response = await getAllRealEstateCategoriesAPI();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function getAllcities() {
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

  async function getWardsStreetsProjectsByDistrict(district_id) {
    setIsLoading(true);
    try {
      const [wardRes, streetRes, projectRes] = await Promise.all([
        getWardsByDistrictAPI(district_id),
        getStreetsByDistrictAPI(district_id),
        getProjectsByDistrictAPI(district_id)
      ])
      setWards(wardRes.data);
      setStreets(streetRes.data);
      setProjects(projectRes.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getAllProjectCategories();
    getAllcities();

    if (realEstate) {
      getDistrictsByCity(realEstate.address.ward.district.city.id);
      getWardsStreetsProjectsByDistrict(realEstate.address.ward.district.id);
    }

  }, [realEstate]);

  return (
    <Form
      form={props.form}
      layout="vertical">
      <Item label="Tiêu đề" name="title" initialValue={realEstate?.title}>
        <Input />
      </Item>
      <Row gutter="15">
        <Col flex="1">
          <Item label="Diện tích" name="area" initialValue={realEstate?.area}>
            <Input type="number" />
          </Item>
        </Col>
        <Col flex="1">
          <Item label="Tổng diện tích" name="lot_size" initialValue={realEstate?.lot_size}>
            <Input type="number" />
          </Item>
        </Col>
        <Col flex="1">
          <Item label="Số phòng ngủ" name="bedroom" initialValue={realEstate?.bedroom}>
            <Input type="number" />
          </Item>
        </Col>
        <Col flex="1">
          <Item label="Số phòng tắm" name="bathroom" initialValue={realEstate?.bathroom}>
            <Input type="number" />
          </Item>
        </Col>
      </Row>
      <Row gutter="15">
        <Col flex="1">
          <Item label="Giá" name="price" initialValue={realEstate?.price}>
            <Input type="number" />
          </Item>
        </Col>
        <Col flex="1">
          <Item label="Năm xây dựng" name="year_build" initialValue={realEstate?.year_build}>
            <Input type="number" />
          </Item>
        </Col>
        <Col flex="1">
          <Item label="Hình thức" initialValue={realEstate?.real_estate_category.for_rent || forRent} name="form">
            <Select onChange={(value) => setForRent(value)}>
              <Option value={false}>Bán</Option>
              <Option value={true}>Cho thuê</Option>
            </Select>
          </Item>
        </Col>
        <Col flex="1">
          <Item label="Loại tin" name="real_estate_category_id" initialValue={realEstate?.real_estate_category.id}>
            <Select loading={isLoading} disabled={!categories}>
              {
                categories?.filter(cat => cat.for_rent === forRent).map(cat => {
                  return <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                })
              }
            </Select>
          </Item>
        </Col>
      </Row>
      <Row gutter="15">
        <Col flex="1">
          <Item label="Tỉnh/thành phố" name="city_id" initialValue={realEstate?.address.ward.district.city.id}>
            <Select loading={isLoading} disabled={!cities} onChange={getDistrictsByCity}>
              {
                cities?.map(city => {
                  return <Option key={city.id} value={city.id}>{city.prefix + " " + city.name}</Option>
                })
              }
            </Select>
          </Item>
        </Col>
        <Col flex="1">
          <Item label="Quận/huyện" name="district_id" initialValue={realEstate?.address.ward.district.id}>
            <Select loading={isLoading} disabled={!districts} onChange={getWardsStreetsProjectsByDistrict}>
              {
                districts?.map(district => {
                  return <Option key={district.id} value={district.id}>{district.prefix + " " + district.name}</Option>
                })
              }
            </Select>
          </Item>
        </Col>
      </Row>
      <Row gutter="15">
        <Col flex="1">
          <Item label="Xã/phường/thị trấn" name="ward_id" initialValue={realEstate?.address.ward.id}>
            <Select loading={isLoading} disabled={!wards}>
              {
                wards?.map(ward => {
                  return <Option key={ward.id} value={ward.id}>{ward.prefix + " " + ward.name}</Option>
                })
              }
            </Select>
          </Item>
        </Col>
        <Col flex="1">
          <Item label="Đường" name="street_id" initialValue={realEstate?.address.street.id}>
            <Select loading={isLoading} disabled={!streets}>
              {
                streets?.map(street => {
                  return <Option key={street.id} value={street.id}>{street.prefix + " " + street.name}</Option>
                })
              }
            </Select>
          </Item>
        </Col>
        <Col flex="1">
          <Item label="Thuộc dự án" name="project_id" initialValue={realEstate?.project?.id}>
            <Select loading={isLoading} disabled={!projects}>
              {
                projects?.map(project => {
                  return <Option key={project.id} value={project.id}>{project.name}</Option>
                })
              }
            </Select>
          </Item>
        </Col>
      </Row>
      <Item label="Nội dung" name="detail" initialValue={realEstate?.detail || ""}>
        <Quill theme="snow" />
      </Item>
      <Item label="Vị trí (nhấp trên bản đồ để chọn)" name="position" initialValue={
        { lat: realEstate?.address.latitude, lng: realEstate?.address.longitude } || undefined
      }>
        {
          realEstate ?
            <LLMap zoom={10} center={{ lat: realEstate?.address.latitude, lng: realEstate?.address.longitude } || undefined} style={{ height: 400 }} />
            :
            <LLMap zoom={5} style={{ height: 400 }} />
        }
      </Item>
    </Form>
  )
}

export default RealEstateForm;