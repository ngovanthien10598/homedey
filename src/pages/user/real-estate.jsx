import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Tabs, Table, Tooltip, Modal } from 'antd';
import { Link, useRouteMatch } from 'react-router-dom';
import { getUserRealEstateAPI, getWaitingRealEstateAPI, getRejectedRealEstateAPI } from 'services/user/listing';
import { deleteRealEstateAPI } from 'services/user/listing';
import Cookies from 'js-cookie';
import { EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
// import AdminLayout from 'layouts/AdminLayout/AdminLayout';
const { TabPane } = Tabs;
const { confirm } = Modal;

const UserRealEstatePage = props => {
  const { path } = useRouteMatch();
  const accessToken = Cookies.get('access');
  const [currentTab, setCurrentTab] = useState(1);

  // Data states
  const [realEstate, setRealEstate] = useState(null);
  const [waitingRealEstate, setWaitingRealEstate] = useState(null);
  const [rejectedRealEstate, setRejectedRealEstate] = useState(null);

  // Loading states
  const [isLoadingRealEstate, setLoadingRealEstate] = useState(false);
  const [isLoadingWaitingRealEstate, setLoadingWaitingRealEstate] = useState(false);
  const [isLoadingRejectedRealEstate, setLoadingRejectedRealEstate] = useState(false);

  function getTableDataFromSource(dataSource) {
    if (!dataSource || dataSource.length === 0) return null;
    return dataSource.map(re => {
      const district = re.address.ward.district;
      const city = district.city;
      return {
        id: re.id,
        title: re.title,
        price: re.price,
        address: `${district.prefix} ${district.name}, ${city.prefix} ${city.name}`
      }
    })
  }

  const tableColumns = [
    { title: 'Tiêu đề', dataIndex: 'title' },
    { title: 'Giá', dataIndex: 'price' },
    { title: 'Địa chỉ', dataIndex: 'address' },
    {
      title: 'Hành động', key: 'action', render: (text, record, index) => {
        return (
          <>
            <Link to={`${path}/${record.id}`}>
              <Tooltip title="Xem">
                <Button type="link" icon={<EyeOutlined />} />
              </Tooltip>
            </Link>
            <Tooltip title="Chỉnh sửa">
              <Button type="link" icon={<EditOutlined />} />
            </Tooltip>
            <Tooltip title="Xóa">
              <Button onClick={() => handleDelete(record.id, index)} danger type="link" icon={<DeleteOutlined />} />
            </Tooltip>
          </>
        )
      }
    },
  ]

  async function getUserRealEstate() {
    setLoadingRealEstate(true);
    try {
      const response = await getUserRealEstateAPI(accessToken);
      setRealEstate(response.data.results);
    } catch (error) {
      console.log(error);
    }
    setLoadingRealEstate(false);
  }

  async function getWaitingRealEstate() {
    setLoadingWaitingRealEstate(true);
    try {
      const response = await getWaitingRealEstateAPI(accessToken);
      setWaitingRealEstate(response.data.results);
    } catch (error) {
      console.log(error);
    }
    setLoadingWaitingRealEstate(false);
  }

  async function getRejectedRealEstate() {
    setLoadingRejectedRealEstate(true);
    try {
      const response = await getRejectedRealEstateAPI(accessToken);
      setRejectedRealEstate(response.data.results);
    } catch (error) {
      console.log(error);
    }
    setLoadingRejectedRealEstate(false);
  }

  const handleTabsChange = tabKey => {
    const numTabKey = Number.parseInt(tabKey);
    setCurrentTab(tabKey);
    switch (numTabKey) {
      case 1:
        getUserRealEstate();
        break;
      case 2:
        getWaitingRealEstate();
        break;
      case 3:
        getRejectedRealEstate();
        break;
      default:
        return null;
    }
  }

  useEffect(() => {
    getUserRealEstate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (realEstateId, index) => {
    confirm({
      title: "Xóa tin",
      content: "Bạn có chắc muốn xóa tin này không?",
      onOk: async () => {
        try {
          await deleteRealEstateAPI(accessToken, realEstateId);
          let newState;
          if (currentTab === 1) {
            newState = realEstate.splice(index, 1);
            setRealEstate(newState);
          } else if (currentTab === 2) {
            newState = waitingRealEstate.splice(index, 1);
          } else if (currentTab === 3) {
            newState = rejectedRealEstate.splice(index, 3);
          }
        } catch (error) {
          console.log(error);
        }
      }
    })
  }

  return (
    <div className="user-re-page">
      <section className="user-re-page_new">
        <Row>
          <Col flex="1">
            <h2><strong>Tin bất động sản</strong></h2>
          </Col>
          <Col>
            <Button>
              <Link to={`${path}/create`}>Thêm mới</Link>
            </Button>
          </Col>
        </Row>
        {/* <Divider /> */}
      </section>
      <section className="user-re-page_list">
        <Tabs onChange={handleTabsChange}>
          <TabPane tab="Đã duyệt" key={1} >
            <Table
              rowKey="id"
              columns={tableColumns}
              dataSource={getTableDataFromSource(realEstate)}
              loading={isLoadingRealEstate} />
          </TabPane>
          <TabPane tab="Đang chờ duyệt" key={2}>
            <Table
              rowKey="id"
              columns={tableColumns}
              dataSource={getTableDataFromSource(waitingRealEstate)}
              loading={isLoadingWaitingRealEstate} />
          </TabPane>
          <TabPane tab="Từ chối" key={3}>
            <Table
              rowKey="id"
              columns={tableColumns}
              dataSource={rejectedRealEstate}
              loading={isLoadingRejectedRealEstate} />
          </TabPane>
        </Tabs>
      </section>
    </div>
  )
}

export default UserRealEstatePage;