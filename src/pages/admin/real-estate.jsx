import React, { useState, useEffect } from 'react';
import { Divider, Table, Tooltip, Button, Modal } from 'antd';
import { EyeFilled, CheckOutlined, DeleteFilled } from '@ant-design/icons';
import { Link, useRouteMatch } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getPendingRealEstateAPI, approveRealEstateAPI, rejectRealEstateAPI } from 'services/admin/real-estate';
// import AdminLayout from 'layouts/AdminLayout/AdminLayout';

const { confirm } = Modal;

const AdminRealestatePage = props => {
  // Data state
  const [realEstate, setRealEstate] = useState(null);

  // Loading state
  const [isLoadingRealEstate, setLoadingRealEstate] = useState(false);
  const [isLoadingAapproveRealEstate, setLoadingApproveRealEstate] = useState(false);

  // Other
  const { path } = useRouteMatch();
  const accessToken = Cookies.get('access');

  const tableData = realEstate && realEstate.map(r => {
    const district = r.address.ward.district;
    const city = district.city;
    return {
      id: r.id,
      title: r.title,
      price: r.price,
      address: `${district.prefix} ${district.name}, ${city.prefix} ${city.name}`
    }
  });

  const tableColumns = [
    { title: 'Tiêu đề', dataIndex: 'title' },
    { title: 'Giá', dataIndex: 'price' },
    { title: 'Địa chỉ', dataIndex: 'address' },
    {
      title: 'Hành động', key: 'action', render: (text, record) => {
        return (
          <>
            <Link to={`${path}/${record.id}`}>
              <Tooltip title="Xem">
                <Button type="link" icon={<EyeFilled />} />
              </Tooltip>
            </Link>
            <Tooltip title="Duyệt bài">
              <Button onClick={() => handleApproveClick(record.id)} type="link" style={{ color: 'green' }} icon={<CheckOutlined />} />
            </Tooltip>
            <Tooltip title="Từ chối">
              <Button type="link" danger icon={<DeleteFilled />} />
            </Tooltip>
          </>
        )
      }
    },
  ]

  useEffect(() => {
    const getPendingRealEstate = async () => {
      setLoadingRealEstate(true);
      try {
        const response = await getPendingRealEstateAPI(accessToken);
        setRealEstate(response.data.results);
      } catch (error) {
        console.log(error);
      }
      setLoadingRealEstate(false);
    }
    getPendingRealEstate();
  }, []);

  const handleApproveClick = realEstateId => {
    confirm({
      title: "Duyệt bài viết",
      content: "Bạn có chắc muốn duyệt tin này?",
      onOk: async () => {
        setLoadingApproveRealEstate(true);
        try {
          await approveRealEstateAPI(accessToken, realEstateId);
        } catch (error) {
          console.log(error);
        }
        setLoadingApproveRealEstate(false);
      },
      
    })
  }

  return (
    <div className="admin-re-page">
      <h2><strong>Tin đang chờ duyệt</strong></h2>
      <Divider />
      <Table loading={isLoadingRealEstate} rowKey="id" columns={tableColumns} dataSource={tableData} />
    </div>
  )
}

export default AdminRealestatePage;