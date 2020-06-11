import React from 'react';
import { Row, Col, Form, Select, Button, Input } from 'antd';

const { Option } = Select;

const SearchForm = props => {
  return (
    <Row justify="center">
      <Col sm={24} md={22} lg={18} xl={14} xxl={12}>
        <Form layout="vertical">
          <Row gutter={8}>
            <Col>
              <Form.Item>
                <Select defaultValue="1">
                  <Option value="1">Nhà</Option>
                  <Option value="2">Đất</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col flex={1}>
              <Form.Item>
                <Input placeholder="Nhập từ khóa tìm kiếm" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button type="primary">Tìm kiếm</Button>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter="8">
            <Col flex="1">
              <Form.Item label="Tỉnh/thành phố">
                <Select defaultValue="1">
                  <Option value="1">Cần Thơ</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col flex="1">
              <Form.Item label="Quận/huyện">
                <Select defaultValue="1">
                  <Option value="1">Ninh Kiều</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col flex="1">
              <Form.Item label="Phòng ngủ">
                <Input type="number" defaultValue="1" />
              </Form.Item>
            </Col>
            <Col flex="1">
              <Form.Item label="Phòng tắm">
                <Input type="number" defaultValue="1" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8} align="bottom" justify="center">
            <Col flex="0 0 150px">
              <Form.Item label="Giá">
                <Input type="number" defaultValue={0} min={0} />
              </Form.Item>
            </Col>
            <Col flex="0 0 150px">
              <Form.Item>
                <Input type="number" defaultValue={0} min={0} />
              </Form.Item>
            </Col>
            <Col flex="0 0 100px">
              <Form.Item label="Diện tích">
                <Input type="number" defaultValue={0} min={0} />
              </Form.Item>
            </Col>
            <Col flex="0 0 100px">
              <Form.Item>
                <Input type="number" defaultValue={0} min={0} />
              </Form.Item>
            </Col>
            <Col flex="0 0 150px">
              <Form.Item label="Năm xây dựng">
                <Input type="number" defaultValue={new Date().getFullYear()} min={0} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default SearchForm;