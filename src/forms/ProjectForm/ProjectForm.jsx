import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Col, Select } from 'antd';
import Quill from 'react-quill';
import { getAllCitiesAPI, getDistrictsByCityAPI, getWardsByDistrictAPI, getStreetsByDistrictAPI } from 'services/user/address';
import LLMap from 'components/LLMap/LLMap';
import { getAllProjectCategoriesAPI } from 'services/user/project-category';
import { getAllInvestorsAPI } from 'services/user/investor';

const { Item } = Form;
const { Option } = Select;

const ProjectForm = props => {
  const { project } = props;
  console.log(project);

  const [cities, setCities] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [wards, setWards] = useState(null);
  const [streets, setStreets] = useState(null);

  const [categories, setCategories] = useState(null);
  const [investors, setInvestors] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

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
      const [wardsRes, streetsRes] = await Promise.all([
        getWardsByDistrictAPI(district_id),
        getStreetsByDistrictAPI(district_id)
      ]);
      setWards(wardsRes.data);
      setStreets(streetsRes.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const [cityRes, categoryRes, investorRes] = await Promise.all([
          getAllCitiesAPI(),
          getAllProjectCategoriesAPI(),
          getAllInvestorsAPI()
        ]);
        setCities(cityRes.data);
        setCategories(categoryRes.data);
        setInvestors(investorRes.data.results);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }

    getData();

    if (project) {
      const {
        address: {
          ward: {
            district,
            district: {
              city
            }
          }
        }
      } = project;
      getDistrictsByCity(city.id);
      getWardsAndStreetsByDistrict(district.id);
    }
  }, [project]);

  return (
    <Form
      layout="vertical"
      form={props.form}>
      <Item label="Tên dự án" name="name" initialValue={project?.name}>
        <Input />
      </Item>
      <Row gutter="15">
        <Col flex="1">
          <Item label="Giá" name="price" initialValue={project?.price}>
            <Input />
          </Item>
        </Col>
        <Col flex="1">
          <Item label="Diện tích" name="area" initialValue={project?.area}>
            <Input type="number" />
          </Item>
        </Col>
      </Row>

      <Row gutter="15">
        <Col flex="1">
          <Item label="Tỉnh/thành phố" name="citi_id" initialValue={project?.address.ward.district.city.id}>
            <Select
              loading={isLoading}
              disabled={!cities}
              onChange={getDistrictsByCity}>
              {
                cities?.map(city => {
                  return <Option key={city.id} value={city.id}>{city.prefix + " " + city.name}</Option>
                })
              }
            </Select>
          </Item>
        </Col>
        <Col flex="1">
          <Item label="Quận/huyện" name="district_id" initialValue={project?.address.ward.district.id}>
            <Select
              loading={isLoading}
              disabled={!districts}
              onChange={getWardsAndStreetsByDistrict}>
              {
                districts?.map(district => {
                  return <Option key={district.id} value={district.id}>{district.prefix + " " + district.name}</Option>
                })
              }
            </Select>
          </Item>
        </Col>
        <Col flex="1">
          <Item label="Xã/phường/thị trấn" name="ward_id" initialValue={project?.address.ward.id}>
            <Select
              loading={isLoading}
              disabled={!wards}>
              {
                wards?.map(ward => {
                  return <Option key={ward.id} value={ward.id}>{ward.prefix + " " + ward.name}</Option>
                })
              }
            </Select>
          </Item>
        </Col>
        <Col flex="1">
          <Item label="Đường" name="street_id" initialValue={project?.address.street.id}>
            <Select
              loading={isLoading}
              disabled={!streets}>
              {
                streets?.map(street => {
                  return <Option key={street.id} value={street.id}>{street.prefix + " " + street.name}</Option>
                })
              }
            </Select>
          </Item>
        </Col>
      </Row>

      <Row gutter="15">
        <Col flex="1">
          <Item label="Loại dự án" name="project_category_id" initialValue={project?.project_category.id}>
            <Select loading={isLoading} disabled={!categories}>
              {
                categories?.map(cat => {
                  return <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                })
              }
            </Select>
          </Item>
        </Col>
        <Col flex="1">
          <Item label="Chủ đầu tư" name="project_investor_id" initialValue={project?.project_investor.id}>
            <Select loading={isLoading} disabled={!investors}>
              {
                investors?.map(investor => {
                  return <Option key={investor.id} value={investor.id}>{investor.name}</Option>
                })
              }
            </Select>
          </Item>
        </Col>
      </Row>

      <Item label="Thông tin chi tiết" name="detail" initialValue={project?.detail || ""}>
        <Quill theme="snow" />
      </Item>

      <Item label="Vị trí" name="position" initialValue={project ? { lat: project.address.latitude, lng: project.address.longitude } : null}>
        <LLMap style={{ height: 400 }} />
      </Item>
    </Form>
  )
}

export default ProjectForm;