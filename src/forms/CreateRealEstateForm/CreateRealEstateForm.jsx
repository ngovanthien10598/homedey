import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Col, Select, Button } from 'antd';
import { getAllRealEstateCategories } from 'services/user/real-estate-category';
import { getAllCities, getDistrictsByCity, getWardsByDistrict, getStreetsByDistrict } from 'services/user/address';
import { getAllProjects } from 'services/user/project';
import { uploadImages, createRealEstate } from 'services/user/real-estate';
import GoogleMapReact from 'google-map-react';
import MapMarker from 'components/MapMarker/MapMarker';
import UploadButton from 'components/UploadButton/UploadButton';
import { useRef } from 'react';
import UploadPreview from 'components/UploadPreview/UploadPreview';
import './CreateRealEstateForm.scss';
import { useSelector } from 'react-redux';

const { Option } = Select;
const { TextArea } = Input;

const CreateRealEstateForm = props => {
  // Loading states
  const [isLoadingRECategories, setLoadingRECategories] = useState(false);
  const [isLoadingCities, setLoadingCities] = useState(false);
  const [isLoadingDistricts, setLoadingDistricts] = useState(false);
  const [isLoadingWards, setLoadingWards] = useState(false);
  const [isLoadingStreets, setLoadingStreets] = useState(false);
  const [isLoadingProjects, setLoadingProjects] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Data states
  const [RECategories, setRECategories] = useState(null);
  const [cities, setCities] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [wards, setWards] = useState(null);
  const [streets, setStreets] = useState(null);
  const [projects, setProjects] = useState(null);
  const [fileList, setFileList] = useState([]);

  // Others states
  const [clickedPosition, setClickedPosition] = useState({ lat: 10.029948, lng: 105.770615 });

  // Other hooks
  const fileRef = useRef();
  const userState = useSelector(state => state.userState);

  // Get all cateogries from API
  const getRealEstateCategories = async () => {
    setLoadingRECategories(true);
    try {
      const RECategoriesResponse = await getAllRealEstateCategories()
      setRECategories(RECategoriesResponse.data);
    } catch (error) {
      console.log({ error });
    }
    setLoadingRECategories(false);
  }

  // Get cities from API
  const getCities = async () => {
    setLoadingCities(true);
    try {
      const getAllCitiesReponse = await getAllCities()
      setCities(getAllCitiesReponse.data);
    } catch (error) {
      console.log({ error });
    }
    setLoadingCities(false);
  }


  // Get districts by city
  const handleCityChange = async cityId => {
    setLoadingDistricts(true);
    setDistricts(null);
    setWards(null);
    try {
      const getDistrictsResponse = await getDistrictsByCity(cityId);
      setDistricts(getDistrictsResponse.data);
    } catch (error) {
      console.log({ error });
    }
    setLoadingDistricts(false);
  }

  // Get wards and streets by district
  const handleDistrictChange = async districtId => {
    setLoadingWards(true);
    setLoadingStreets(true);
    setWards(null);
    setStreets(null);
    try {
      const [getWardsResponse, getStreetsResponse] = await Promise.all([
        getWardsByDistrict(districtId),
        getStreetsByDistrict(districtId)
      ]);
      setWards(getWardsResponse.data);
      setStreets(getStreetsResponse.data);
    } catch (error) {
      console.log({ error });
    }
    setLoadingWards(false);
    setLoadingStreets(false);
  }


  // Get projects
  const getProjects = async () => {
    setLoadingProjects(true);
    try {
      const getProjectsResponse = await getAllProjects();
      setProjects(getProjectsResponse.data.results);
    } catch (error) {
      console.log({ error });
    }
    setLoadingProjects(false);
  }


  const handleMapClick = e => {
    const newPosition = {
      lat: e.lat,
      lng: e.lng
    }
    setClickedPosition(newPosition);
  }

  const handleImageChange = e => {
    const files = e.target.files;
    if (files.length > 0) {
      setFileList(prevValue => [...files, ...prevValue]);
      fileRef.current.value = null;
    }
  }

  const handleSubmit = async values => {
    let image_ids = [];
    setIsLoading(true);
    try {
      const uploadResponse = await uploadImages(fileList);
      image_ids = uploadResponse.data.image_ids;
    } catch (error) {
      console.log({ error });
    }

    const {
      title,
      price,
      bedroom,
      bathroom,
      area,
      lot_size,
      year_build,
      detail,
      real_estate_category_id,
      ward_id,
      street_id,
      project_id
    } = values;
    const body = {
      title: title,
      price: price,
      bedroom: bedroom,
      bathroom: bathroom,
      area: area,
      lot_size: lot_size,
      year_build: year_build,
      detail: detail,
      real_estate_category_id: real_estate_category_id,
      ward_id: ward_id,
      street_id: street_id,
      latitude: clickedPosition.lat,
      longitude: clickedPosition.lng,
      project_id: project_id,
      image_ids: image_ids
    }

    try {
      await createRealEstate(userState.accessToken, body);
    } catch (error) {
      console.log({ error });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    const getData = async () => {
      await Promise.all([
        getRealEstateCategories(),
        getCities(),
        getProjects()
      ])
    }
    getData();
  }, []);

  return (

    <Form
      className="create-re-form"
      layout="vertical"
      onFinish={handleSubmit} scrollToFirstError={true}
      noValidate>
      <Row gutter={20}>
        <Col xs={24} lg={12}>
          <Form.Item label="Tiêu đề" name="title" rules={[
            { required: true, message: 'Vui lòng nhập tiêu đề' }
          ]}>
            <Input />
          </Form.Item>
          <Row gutter={10}>
            <Col flex="1">
              <Form.Item label="Giá"
                name="price"
                rules={[
                  { required: true, message: 'Vui lòng nhập giá' },
                  { pattern: /^[1-9][0-9]*$/g, message: "Giá không hợp lệ" }
                ]}>
                <Input defaultValue={1} type="number" suffix="VNĐ" min={1} />
              </Form.Item>
            </Col>
            <Col flex="1">
              <Form.Item label="Năm xây dựng"
                name="year_build"
                rules={[
                  { required: true, message: 'Vui lòng nhập năm xây dựng' },
                  { pattern: /^\d{4}$/g, message: "Năm không hợp lệ" }
                ]}>
                <Input min={0} defaultValue={2000} type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col flex="1">
              <Form.Item label="Số phòng ngủ"
                name="bedroom"
                rules={[
                  { required: true, message: 'Vui lòng nhập phòng ngủ' },
                  { pattern: /^[0-9]+$/g, message: "Số không hợp lệ" }
                ]}>
                <Input defaultValue={0} type="number" suffix="Phòng" min={0} />
              </Form.Item>
            </Col>
            <Col flex="1">
              <Form.Item label="Số phòng tắm"
                name="bathroom"
                rules={[
                  { required: true, message: 'Vui lòng nhập phòng tắm' },
                  { pattern: /^[0-9]+$/g, message: "Số không hợp lệ" }
                ]}>
                <Input defaultValue={0} type="number" suffix="Phòng" min={0} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col flex="1">
              <Form.Item label="Diện tích nền nhà" name="area">
                <Input type="number" suffix={<span>m<sup>2</sup></span>} />
              </Form.Item>
            </Col>
            <Col flex="1">
              <Form.Item label="Tổng diện tích" name="lot_size">
                <Input type="number" suffix={<span>m<sup>2</sup></span>} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col flex="1">
              <Form.Item label="Loại tin" name="real_estate_category_id">
                <Select loading={isLoadingRECategories} defaultValue="Chọn loại tin">
                  <Option disabled value="Chọn loại tin">Chọn loại tin</Option>
                  {
                    RECategories &&
                    RECategories.map(category => (
                      <Option
                        key={category.id}
                        value={category.id}>
                        {`${category.name.charAt(0).toUpperCase()}${category.name.substr(1)} ${category.for_rent ? '(cho thuê)' : ''}`}
                      </Option>
                    )
                    )
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col flex="1">
              <Form.Item label="Dự án">
                <Select loading={isLoadingProjects} name="project" defaultValue="Chọn dự án">
                  <Option value="Chọn dự án" disabled>Chọn dự án</Option>
                  {
                    projects &&
                    projects.map(p => {
                      return (
                        <Option key={p.id} value={p.id}>{p.name}</Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Nội dung" name="detail">
            <TextArea placeholder="Nhập nội dung bài viết..." rows="10" />
          </Form.Item>
        </Col>

        {/* Col 2 */}
        <Col xs={24} lg={12}>
          <Form.Item label="Bản đồ">
            <div className="create-re-form_map">
              <GoogleMapReact
                defaultZoom={11}
                defaultCenter={{ lat: 10.029948, lng: 105.770615 }}
                bootstrapURLKeys={{ key: 'AIzaSyAfOlOJJlejZjLTcM6RDZMUc3OGGuLCX7Y' }}
                onClick={handleMapClick}
                yesIWantToUseGoogleMapApiInternals>
                <MapMarker lat={clickedPosition.lat} lng={clickedPosition.lng} />
              </GoogleMapReact>
            </div>
          </Form.Item>
          <Row gutter={10}>
            <Col flex="1">
              <Form.Item label="Tỉnh / thành phố" name="city_id" rules={[
                { required: true, message: 'Vui lòng chọn tỉnh / thành phố' }
              ]}>
                <Select
                  loading={isLoadingCities}
                  disabled={isLoadingCities}
                  defaultValue={null}
                  onChange={handleCityChange}
                  showSearch>
                  <Option disabled value={null}>Chọn tỉnh/thành phố</Option>
                  {
                    cities &&
                    cities.map(city => (
                      <Option
                        key={city.id}
                        value={city.id}>
                        {city.prefix + ' ' + city.name}
                      </Option>
                    )
                    )
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col flex="1">
              <Form.Item label="Quận / huyện" name="district_id" rules={[
                { required: true, message: 'Vui lòng chọn quận / huyện' }
              ]}>
                <Select
                  loading={isLoadingDistricts}
                  disabled={isLoadingDistricts}
                  onChange={handleDistrictChange}
                  defaultValue="null">
                  <Option disabled value="null">Chọn quận / huyện</Option>
                  {
                    districts &&
                    districts.map(district => (
                      <Option
                        key={district.id}
                        value={district.id}>
                        {district.prefix + ' ' + district.name}
                      </Option>
                    )
                    )
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col flex="1">
              <Form.Item label="Xã / phường / thị trấn" name="ward_id" rules={[
                { required: true, message: 'Vui lòng chọn xã / phường / thị trấn' }
              ]}>
                <Select
                  loading={isLoadingWards}
                  disabled={isLoadingWards}
                  defaultValue="null">
                  <Option disabled value="null">Chọn xã / phường / thị trấn</Option>
                  {
                    wards &&
                    wards.map(ward => (
                      <Option
                        key={ward.id}
                        value={ward.id}>
                        {ward.prefix + ' ' + ward.name}
                      </Option>
                    )
                    )
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col flex="1">
              <Form.Item label="Đường" name="street_id">
                <Select
                  loading={isLoadingStreets}
                  disabled={isLoadingStreets}
                  defaultValue="null">
                  <Option disabled value="null">Chọn đường</Option>
                  {
                    streets &&
                    streets.map(str => (
                      <Option
                        key={str.id}
                        value={str.id}>
                        {str.prefix + ' ' + str.name}
                      </Option>
                    )
                    )
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Form.Item label="Hình ảnh">
        {
          fileList.length > 0 &&
          fileList.map((file, index) => {
            return <UploadPreview key={index} file={file} />
          })
        }
        <UploadButton inputRef={fileRef} onChange={handleImageChange} />
      </Form.Item>
      <Form.Item>
        <Button loading={isLoading} type="primary" htmlType="submit" size="large">Xác nhận</Button>
      </Form.Item>
    </Form>
  )
}

export default CreateRealEstateForm;