import React from 'react';
import MainLayout from 'layouts/MainLayout/MainLayout';
import { Carousel, Row, Col, Divider } from 'antd';
import { Map, TileLayer } from 'react-leaflet';

const ProjectDetails = props => {

  const handleMapClick = e => {
    console.log(e);
  }

  return (
    <MainLayout>
      <div className="page-project-details">
        <Divider>
          <h2>Tên dự án</h2>
        </Divider>
        <Row gutter={15}>
          <Col xs={24} md={16}>
            <Carousel autoplay>
              {
                Array(4).fill().map((e, i) => (
                  <div key={i}>
                    <img src="http://via.placeholder.com/960x540" alt="slider" />
                  </div>
                ))
              }
            </Carousel>
            <div>
              <h3>Giới thiệu</h3>
              <p>Thông tin tổng quan dự án Oyster Gành Hào</p>
              <p>Oyster Gành Hào là dự án khách sạn nghỉ dưỡng đạt tiêu chuẩn 4 sao, nằm tại số 82 Trần Phú, phường 5, TP. Vũng Tàu. Dự án sau khi hoàn thiện sẽ cung cấp ra thị trường 277 căn hộ.</p>
              <p>Oyster Gành Hào sở hữu kiến trúc tân cổ điển, gồm 2 tòa tháp cao 17 tầng mang đậm hơi thở Châu Âu hiện đại cùng vị trí có phong thủy được đánh giá cao với thế "tọa sơn hướng thủy": lưng tựa Núi Lớn - biểu tượng của sự phù trợ và trước mặt là bờ biển trải dài - nơi hội tụ sinh khí của đất trời, tất cả mang đến nguồn tài lực dồi dào và cả sự bình yên cho các chủ nhân tương lai của Oyster Gành Hào.</p>
              <ul>
                <li>Tên dự án: Oyster Gành Hào</li>
                <li>Chủ đầu tư: Công ty CP Tập đoàn Vietpearl </li>
                <li>Vị trí: 82 Trần Phú, phường 5, TP. Vũng Tàu</li>
                <li>Tư vấn thiết kế: TTT</li>
                <li>Tổng thầu thi công: CC14</li>
                <li>Tư vấn giám sát: NAGECCO</li>
                <li>Quản lý vận hành: Ayres Hotel</li>
                <li>Tiêu chuẩn khách sạn 4 sao</li>
                <li>Tổng diện tích: 2.571m2</li>
              </ul>
            </div>
            <div className="project-details_map">
              <Map id="project-map" center={{lng: 106, lat: 16}} zoom={5} onclick={handleMapClick}>
                <TileLayer
                  url="https://maps.vnpost.vn/tm6/{z}/{x}/{y}{r}.png?apikey=f50f96fd875c023e6fd8acac6d9a7e0d15699071d3259542"
                />
              </Map>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <h3>Thông tin chung</h3>
            <table>
              <tbody>
                <tr>
                  <td>Tên dự án</td>
                  <td>Oyster Gành Hào</td>
                </tr>
                <tr>
                  <td>Chủ đầu tư</td>
                  <td>Công ty CP Tập đoàn VietPearl</td>
                </tr>
                <tr>
                  <td>Địa chỉ</td>
                  <td>82 đường Trần Phú, Phường 5, Vũng Tàu, Bà Rịa Vũng Tàu</td>
                </tr>
                <tr>
                  <td>Tổng diện tích</td>
                  <td>2.571 m²</td>
                </tr>
                <tr>
                  <td>Loại hình phát triển</td>
                  <td>Dự án khác</td>
                </tr>
                <tr>
                  <td>Bàn giao nhà</td>
                  <td>Quý II/2021</td>
                </tr>
                <tr>
                  <td>Quy mô dự án</td>
                  <td>277 căn hộ du lịch</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <br />

      </div>
    </MainLayout>
  )
}

export default ProjectDetails;