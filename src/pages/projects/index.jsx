import React from 'react';
import MainLayout from 'layouts/MainLayout/MainLayout';
import { Divider, Row, Col } from 'antd';
import Project from 'components/Project/Project';
import LayoutWithAside from 'layouts/LayoutWithAside/LayoutWithAside';

const ProjectsPage = props => {
  return (
    <MainLayout>
      <LayoutWithAside>
        <div className="page-projects">
          <h2>DỰ ÁN</h2>
          <Divider />

          <section className="projects-wrapper">
            {
              Array(10).fill().map((e, i) => {
                return (
                  <Project key={i} />
                )
              })
            }
          </section>
        </div>
      </LayoutWithAside>
    </MainLayout>
  )
}

export default ProjectsPage;