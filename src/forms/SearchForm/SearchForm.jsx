import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Select, Button, Input } from 'antd';
import { getAllCitiesAPI, getDistrictsByCityAPI } from 'services/user/address';
import { useHistory } from 'react-router-dom';

const { Option } = Select;

const SearchForm = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState(null);
  const [districts, setDistricts] = useState(null);
  const history = useHistory();

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

  const serialize = function(obj) {
    Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {});
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  const handleSubmit = values => {
    const searchParams = serialize(values);
    history.push(`/real-estate?${searchParams}`);
  }

  useEffect(() => {
    getAllCities();
  }, []);

  return (
    <Row justify="center">
      <Col sm={24} md={22} lg={18} xl={14} xxl={12}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Row gutter={8}>
            <Col>
              <Form.Item name="for_rent" initialValue={false}>
                <Select>
                  <Option value={false}>Bán</Option>
                  <Option value={true}>Cho thuê</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col flex={1}>
              <Form.Item name="search">
                <Input placeholder="Nhập từ khóa tìm kiếm" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">Tìm kiếm</Button>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter="8">
            <Col flex="1">
              <Form.Item label="Tỉnh/thành phố" name="address__ward__district__city_id">
                <Select loading={isLoading} disabled={!cities} onChange={getDistrictsByCity}>
                  {
                    cities?.map(city => {
                      return <Option key={city.id} value={city.id}>{city.prefix + " " + city.name}</Option>
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col flex="1">
              <Form.Item label="Quận/huyện" name="address__ward__district_id">
                <Select loading={isLoading} disabled={!districts}>
                  {
                    districts?.map(district => {
                      return <Option key={district.id} value={district.id}>{district.prefix + " " + district.name}</Option>
                    })
                  }
                </Select>
              </Form.Item>
            </Col>

            <Col flex="1">
              <Form.Item label="Phòng ngủ" name="bedroom">
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col flex="1">
              <Form.Item label="Phòng tắm" name="bathroom">
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8} align="bottom" justify="center">
            <Col flex="0 0 150px">
              <Form.Item label="Giá (min)" name="price__gte">
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col flex="0 0 150px">
              <Form.Item label="Giá (max)" name="price__lte">
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col flex="0 0 100px">
              <Form.Item label="Diện tích (min)" name="lot_size__gte">
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col flex="0 0 100px">
              <Form.Item label="Diện tích (max)" name="lot_size__lte">
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col flex="0 0 150px">
              <Form.Item label="Năm xây dựng" name="year_build">
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default SearchForm;