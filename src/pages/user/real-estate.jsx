import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Table, Tooltip, Modal, Popconfirm, Tag, Form } from 'antd';
import { getUserRealEstateAPI, uploadRealEstateImagesAPI, updateRealEstateAPI, deleteRealEstateAPI } from 'services/user/listing';
import { createRealEstateAPI } from 'services/user/real-estate';
import Cookies from 'js-cookie';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { getShortAddressString } from 'utils/string';
import RealEstateForm from 'forms/RealEstateForm/RealEstateForm';
import UploadPictures from 'components/UploadPictures/UploadPictures';
// import AdminLayout from 'layouts/AdminLayout/AdminLayout';
const { useForm } = Form;

const UserRealEstatePage = props => {
  const accessToken = Cookies.get('access');
  const [realEstateForm] = useForm();

  // Data states
  const [realEstate, setRealEstate] = useState(null);

  const [imageList, setImageList] = useState([]);
  const [imageIds, setImageIds] = useState(null);
  const [selectedRealEstate, setSelectedRealEstate] = useState(null);
  const [action, setAction] = useState('create');
  // Loading states
  const [isLoading, setIsLoading] = useState(null);

  const [isModalShow, setModalState] = useState(false);

  const tableColumns = [
    { title: 'Tiêu đề', dataIndex: 'title' },
    { title: 'Giá', dataIndex: 'price' },
    { title: 'Địa chỉ', dataIndex: 'address', render: (text, record) => getShortAddressString(record.address) },
    {
      title: 'Trạng thái', dataIndex: 'status', render: (text, { status }) => {
        return status === 'pending' ?
          <Tag color="processing">Đang đợi</Tag>
          :
          status === 'approved' ?
            <Tag color="success">Đã duyệt</Tag>
            :
            <Tag color="error">Từ chối</Tag>
      }
    },
    {
      title: 'Hành động', key: 'action', render: (text, record, index) => {
        return (
          <>
            <Tooltip title="Chỉnh sửa">
              <Button onClick={() => handleEditClick(record)} type="link" icon={<EditOutlined />} />
            </Tooltip>
            <Tooltip title="Xóa">
              <Popconfirm title="Bạn có muốn chắc muốn xóa tin này" onConfirm={() => handleDeleteRealEstate(record.id)}>
                <Button danger type="link" icon={<DeleteOutlined />} />
              </Popconfirm>
            </Tooltip>
          </>
        )
      }
    },
  ]

  async function getUserRealEstate() {
    setIsLoading(true);
    try {
      const response = await getUserRealEstateAPI(accessToken);
      setRealEstate(response.data.results);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  const handleBeforeUpload = file => {
    setImageList([...imageList, file]);
    return false;
  }

  const handleUploadChange = ({ fileList }) => {
    setImageList([...fileList]);
  }

  const handleCreateRealEstate = async values => {
    setIsLoading(true);
    try {

      const originFileList = imageList.map(image => image.originFileObj);
      let image_ids;
      if (!imageIds) {
        const response = await uploadRealEstateImagesAPI(accessToken, originFileList);
        image_ids = response.data.image_ids;
        setImageIds(image_ids);
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
        position: {
          lat,
          lng
        }
      } = values;

      const body = {
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
        longitude: lng,
        latitude: lat,
        image_ids: image_ids
      }
      await createRealEstateAPI(accessToken, body);

      getUserRealEstate();
      setModalState(false);
      setImageIds([]);
      setImageList(null);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const handleUpdateRealEstate = async values => {
    setIsLoading(true);
    try {
      const old_image_ids = imageList.filter(image => image.id).map(image => image.id);
      const originFileList = imageList.filter(image => image.originFileObj).map(image => image.originFileObj);
      let image_ids;

      if (originFileList.length > 0) {
        if (!imageIds) {
          const response = await uploadRealEstateImagesAPI(accessToken, originFileList);
          image_ids = response.data.image_ids;
          setImageIds(image_ids);
        }
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
        position: {
          lat,
          lng
        }
      } = values;

      const body = {
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
        longitude: lng,
        latitude: lat,
        image_ids: image_ids ? [...old_image_ids, ...image_ids] : [...old_image_ids]
      }
      await updateRealEstateAPI(accessToken, selectedRealEstate.id, body);

      getUserRealEstate();
      setModalState(false);
      setImageIds([]);
      setImageList(null);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const handleDeleteRealEstate = async id => {
    setIsLoading(true);
    try {
      await deleteRealEstateAPI(accessToken, id);
      getUserRealEstate();
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  }

  const handleCreateClick = () => {
    setAction('create');
    setModalState(true);
  }

  const handleEditClick = realEstate => {
    setAction('update');
    setSelectedRealEstate(realEstate);
    setModalState(true);
    setImageList(realEstate.images.map(image => {
      return {
        ...image,
        uid: image.id
      }
    }))
  }

  const handleModalAfterClose = () => {
    realEstateForm.resetFields();
    setSelectedRealEstate(null);
    setImageList([]);
  }

  const handleModalOk = () => {
    if (action === 'create') {
      realEstateForm.validateFields().then(values => handleCreateRealEstate(values));
    }

    if (action === 'update') {
      realEstateForm.validateFields().then(values => handleUpdateRealEstate(values));
    }
  }

  useEffect(() => {
    getUserRealEstate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="user-re-page">
      <section className="user-re-page_new">
        <Row>
          <Col flex="1">
            <h2><strong>Tin bất động sản</strong></h2>
          </Col>
          <Col>
            <Button icon={<PlusOutlined />} onClick={handleCreateClick}>
              Đăng tin
            </Button>
          </Col>
        </Row>
        {/* <Divider /> */}
      </section>
      <section className="user-re-page_list">
        <Table loading={isLoading} rowKey="id" columns={tableColumns} dataSource={realEstate} />
      </section>
      <Modal
        visible={isModalShow}
        afterClose={handleModalAfterClose}
        destroyOnClose={true}
        confirmLoading={isLoading}
        onOk={handleModalOk}
        onCancel={() => setModalState(false)}
        width="80%">
        <RealEstateForm form={realEstateForm} realEstate={selectedRealEstate} />
        <UploadPictures
          fileList={imageList}
          beforeUpload={handleBeforeUpload}
          onChange={handleUploadChange} />
      </Modal>
    </div>
  )
}

export default UserRealEstatePage;