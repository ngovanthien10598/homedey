import React from 'react';
import MainLayout from 'layouts/MainLayout/MainLayout';
import { Divider, Row, Col } from 'antd';
import Project from 'components/Project/Project';

const ProjectsPage = props => {
  return (
    <MainLayout>
      <div className="page-projects">
        <Divider>
          <h2>DỰ ÁN MỚI</h2>
        </Divider>

        <section className="projects-wrapper">
          <Row gutter={20}>
            {
              Array(10).fill().map((e, i) => {
                return (
                  <Col key={i} xs={24} sm={12} md={8} lg={6} xxl={4}>
                    <Project />
                  </Col>
                )
              })
            }
          </Row>
        </section>
      </div>
    </MainLayout>
  )
}

export default ProjectsPage;