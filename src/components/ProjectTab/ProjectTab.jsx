import React from 'react';
import { Table, Tooltip, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getShortAddressString } from 'utils/string';

const ProjectTab = props => {
  const projects = props.projects;
  const tableColumns = [
    { title: '#', key: '#', render: (text, record, index) => (index + 1) },
    { title: 'Tên', dataIndex: 'name' },
    { title: 'Địa chỉ', key: 'address', render: (text, record) => getShortAddressString(record.address) },
    {
      title: 'Hành động', key: 'action', render: (text, record) => {
        return (
          <>
            <Tooltip title="Chỉnh sửa">
              <Button onClick={() => props.onEditClick(record)} type="link" icon={<EditOutlined />} />
            </Tooltip>
            <Tooltip title="Xóa">
              <Popconfirm title="Bạn có chắc muốn xóa dự án này không?" onConfirm={() => props.onDeleteClick(record.id)}>
                <Button danger type="link" icon={<DeleteOutlined />} />
              </Popconfirm>
            </Tooltip>
          </>
        )
      }
    }
  ]
  return (
    <Table loading={props.loading} rowKey="id" dataSource={projects} columns={tableColumns} />
  )
}

export default ProjectTab;