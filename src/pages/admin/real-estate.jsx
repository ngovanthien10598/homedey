import React, { useState, useEffect } from 'react';
import { Divider, Table, Tooltip, Button, Modal, Popconfirm, Row, Col, Carousel } from 'antd';
import { EyeFilled, CheckOutlined, DeleteFilled } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { getPendingRealEstateAPI, approveRealEstateAPI, rejectRealEstateAPI } from 'services/admin/real-estate';
import { getShortAddressString, getAddressString } from 'utils/string';
import LLMap from 'components/LLMap/LLMap';
import { Marker } from 'react-leaflet';
// import AdminLayout from 'layouts/AdminLayout/AdminLayout';

const AdminRealestatePage = props => {
  // Data state
  const [realEstate, setRealEstate] = useState(null);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRealEstate, setSelectedRealEstate] = useState(null);
  const [isModalShow, setModalState] = useState(false);

  // Other
  const accessToken = Cookies.get('access');

  const tableColumns = [
    { title: 'Tiêu đề', dataIndex: 'title' },
    { title: 'Giá', dataIndex: 'price' },
    { title: 'Địa chỉ', key: 'address', render: (text, record) => getShortAddressString(record.address) },
    {
      title: 'Hành động', key: 'action', render: (text, record) => {
        return (
          <>
            <Tooltip title="Xem">
              <Button onClick={() => handleViewClick(record)} type="link" icon={<EyeFilled />} />
            </Tooltip>
            <Tooltip title="Duyệt bài">
              <Popconfirm title="Bạn có chắc muốn duyệt tin này?" onConfirm={() => handleApprove(record.id)}>
                <Button type="link" style={{ color: 'green' }} icon={<CheckOutlined />} />
              </Popconfirm>
            </Tooltip>
            <Tooltip title="Từ chối">
              <Popconfirm title="Bạn có chắc muốn từ chối tin này?" onConfirm={() => handleReject(record.id)}>
                <Button type="link" danger icon={<DeleteFilled />} />
              </Popconfirm>
            </Tooltip>
          </>
        )
      }
    },
  ]

  const getRealEstate = async () => {
    setIsLoading(true);
    try {
      const response = await getPendingRealEstateAPI(accessToken);
      setRealEstate(response.data.results);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getRealEstate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleViewClick = realEstate => {
    setSelectedRealEstate(realEstate);
    setModalState(true);
  }

  const handleApprove = async realEstateId => {
    setIsLoading(true);
    try {
      await approveRealEstateAPI(accessToken, realEstateId);
      await getRealEstate();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const handleReject = async id => {
    setIsLoading(true);
    try {
      await rejectRealEstateAPI(accessToken, id);
      await getRealEstate();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const closeModal = () => {
    setModalState(false);
    setSelectedRealEstate(null);
  }

  return (
    <div className="admin-re-page">
      <h2><strong>Tin đang chờ duyệt</strong></h2>
      <Divider />
      <Table loading={isLoading} rowKey="id" columns={tableColumns} dataSource={realEstate} />
      <Modal
        destroyOnClose={true}
        visible={isModalShow}
        onCancel={closeModal}
        onOk={closeModal}
        width="80%"
      >
        <div><strong>Tiêu đề</strong></div>
        <p>{selectedRealEstate?.title}</p>


        <Row gutter="15">
          <Col flex="1">
            <div><strong>Diện tích</strong></div>
            <p>{selectedRealEstate?.area}</p>
          </Col>
          <Col flex="1">
            <div><strong>Tổng diện tích</strong></div>
            <p>{selectedRealEstate?.lot_size}</p>
          </Col>
          <Col flex="1">
            <div><strong>Phòng ngủ</strong></div>
            <p>{selectedRealEstate?.bedroom}</p>
          </Col>
          <Col flex="1">
            <div><strong>Phòng tắm</strong></div>
            <p>{selectedRealEstate?.bathroom}</p>
          </Col>
        </Row>

        <Row gutter="15">
          <Col flex="1">
            <div><strong>Giá</strong></div>
            <p>{selectedRealEstate?.price}</p>
          </Col>
          <Col flex="1">
            <div><strong>Năm xây dựng</strong></div>
            <p>{selectedRealEstate?.year_build}</p>
          </Col>
          <Col flex="1">
            <div><strong>Hình thức</strong></div>
            <p>{selectedRealEstate?.real_estate_category.for_rent ? 'Cho thuê' : 'Bán'}</p>
          </Col>
          <Col flex="1">
            <div><strong>Loại tin</strong></div>
            <p>{selectedRealEstate?.real_estate_category.name}</p>
          </Col>
        </Row>

        <Row gutter="15">
          <Col flex="1">
            <div><strong>Địa chỉ</strong></div>
            <p>{getAddressString(selectedRealEstate?.address)}</p>
          </Col>
          <Col flex="1">
            <div><strong>Thuộc dự án</strong></div>
            <p>{selectedRealEstate?.project?.name || "Không"}</p>
          </Col>
        </Row>

        <div><strong>Nội dung</strong></div>
        <div dangerouslySetInnerHTML={{ __html: selectedRealEstate?.detail }}></div>

        <div><strong>Bản đồ</strong></div>
        {
          selectedRealEstate &&
          <LLMap zoom={12} style={{ height: 400 }} center={
            {
              lat: selectedRealEstate.address.latitude,
              lng: selectedRealEstate.address.longitude
            }
          }>
            <Marker position={{ lat: selectedRealEstate.address.latitude, lng: selectedRealEstate.address.longitude }} />
          </LLMap>
        }

        <div><strong>Hình ảnh</strong></div>
        <Carousel adaptiveHeight autoplay>
          {
            selectedRealEstate?.images.map(image => {
              return <div key={image.id}>
                <img src={image.url} alt={image.url} />
              </div>
            })
          }
        </Carousel>

      </Modal>
    </div>
  )
}

export default AdminRealestatePage;