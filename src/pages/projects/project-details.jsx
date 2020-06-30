import React, { useState, useEffect } from 'react';
import MainLayout from 'layouts/MainLayout/MainLayout';
import { Carousel, Row, Col, Divider, Empty } from 'antd';
import LLMap from 'components/LLMap/LLMap';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { setLoading } from 'store/actions/loading.action';
import { getProjectDetailsAPI } from 'services/user/project';
import { getAddressString } from 'utils/string';
import { Marker } from 'react-leaflet';

const ProjectDetails = props => {

  const [projectDetails, setProjectDetails] = useState(null);
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const slug = params.slug;

  async function getProjectDetails(slug) {
    dispatch(setLoading(true));
    try {
      const response = await getProjectDetailsAPI(slug);
      setProjectDetails(response.data.data);
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  }

  useEffect(() => {
    if (slug && slug.length > 0) {
      getProjectDetails(slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <MainLayout>
      <div className="page-project-details">
        {
          projectDetails &&
          <Divider>
            <h2>{projectDetails.name}</h2>
          </Divider>
        }

        {
          projectDetails ?
            <Row gutter={60}>
              <Col xs={24} md={16}>
                <Carousel autoplay>
                  {
                    projectDetails.images?.map(image => (
                      <div key={image.id}>
                        <img src={image.url} width="100%" alt="slider" />
                      </div>
                    ))
                  }
                </Carousel>
                <div>
                  <h3><strong>GIỚI THIỆU</strong></h3>
                  <div dangerouslySetInnerHTML={{ __html: projectDetails.detail }}></div>
                </div>
                <div className="project-details_map">
                <h3><strong>BẢN ĐỒ</strong></h3>
                  <LLMap
                    id="project-map"
                    zoom={13}
                    center={{
                      lat: projectDetails.address.latitude,
                      lng: projectDetails.address.longitude
                    }}>
                    <Marker position={{
                      lat: projectDetails.address.latitude,
                      lng: projectDetails.address.longitude
                    }} />
                  </LLMap>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <h3><strong>Thông tin chung</strong></h3>

                <div><strong>Tên dự án</strong></div>
                <p>{projectDetails.name}</p>

                <div><strong>Chủ đầu tư</strong></div>
                <p>{projectDetails.project_investor?.name || "Đang cập nhật"}</p>

                <div><strong>Địa chỉ</strong></div>
                <p>{getAddressString(projectDetails.address)}</p>

                <div><strong>Tổng diện tích</strong></div>
                <p>{projectDetails.area ? <span>{projectDetails.area} m<sup>2</sup></span> : "Đang cập nhật"}</p>

                {
                  projectDetails.project_investor?.avatar &&
                  <img src={projectDetails.project_investor.avatar} alt={projectDetails.project_investor.avatar} />
                }
              </Col>
            </Row>
            :
            <Empty />
        }

      </div>
    </MainLayout>
  )
}

export default ProjectDetails;