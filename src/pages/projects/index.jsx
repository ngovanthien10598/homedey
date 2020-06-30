import React, { useState, useEffect } from 'react';
import MainLayout from 'layouts/MainLayout/MainLayout';
import { Divider, Tag } from 'antd';
import Project from 'components/Project/Project';
import LayoutWithAside from 'layouts/LayoutWithAside/LayoutWithAside';
import { getAllProjectCategoriesAPI } from 'services/user/project-category';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from 'store/actions/loading.action';
import { getAllProjectsAPI, getProjectsByCategoryAPI } from 'services/user/project';
import { Link } from 'react-router-dom';

const ProjectsPage = props => {

  const [projectCategories, setProjectCategories] = useState(null);
  const [projects, setProjects] = useState(null);
  const { pathname } = useLocation();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const category = searchParams.get('category');
  const dispatch = useDispatch();

  async function getProjectCategories() {
    try {
      const response = await getAllProjectCategoriesAPI();
      setProjectCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllProjects() {
    dispatch(setLoading(true));
    try {
      const response = await getAllProjectsAPI();
      setProjects(response.data.results);
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  }

  async function getProjectsByCategory(categorySlug) {
    dispatch(setLoading(true));
    try {
      const response = await getProjectsByCategoryAPI(categorySlug);
      setProjects(response.data.results);
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  }

  useEffect(() => {
    getProjectCategories();
  }, []);

  useEffect(() => {
    if (category && category.length > 0) {
      getProjectsByCategory(category);
    } else {
      getAllProjects();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <MainLayout>
      <LayoutWithAside>
        <div className="page-projects">
          <h2>Dự án</h2>

          <div>
            <Tag color={(pathname === '/project' && !category) ? '#2db7f5' : ''}>
              <Link to="/project">Tất cả</Link>
            </Tag>
            {
              projectCategories?.map(c => {
                return <Tag color={c.slug === category ? '#2db7f5' : ''} key={c.id}>
                  <Link to={`/project?category=${c.slug}`}>{c.name}</Link>
                </Tag>
              })
            }
          </div>
          <Divider />
          <section className="projects-wrapper">
            {
              projects?.map(project => {
                return (
                  <Project key={project.id} project={project} />
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