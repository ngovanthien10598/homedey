import React, { useState, useEffect } from 'react';
import { Divider, Tabs, Button, Modal, Form } from 'antd';
import { getAllProjectCategoriesAPI } from 'services/user/project-category';
import { getAllProjectsAPI } from 'services/user/project';
import { getAllInvestorsAPI } from 'services/user/investor';
import { createProjectCategoryAPI, updateProjectCategoryAPI, deleteProjectCategoryAPI } from 'services/admin/project-category';
import { createInvestorAPI, updateInvestorAPI, deleteInvestorAPI, updateInvestorAvatarAPI } from 'services/admin/investor';
import ProjectCategoryTab from 'components/ProjectCategoryTab/ProjectCategoryTab';
import ProjectInvestorTab from 'components/ProjectInvestorTab/ProjectInvestorTab';
import ProjectTab from 'components/ProjectTab/ProjectTab';
import { PlusOutlined } from '@ant-design/icons';
import ProjectCategoryForm from 'forms/ProjectCategoryForm/ProjectCategoryForm';
import Cookies from 'js-cookie';
import InvestorForm from 'forms/InvestorForm/InvestorForm';
import UploadPictures from 'components/UploadPictures/UploadPictures';

const { useForm } = Form;

const AdminProjectsPage = props => {
  const [tab, setTab] = useState(1);

  const [categories, setCategories] = useState(null);
  const [projects, setProjects] = useState(null);
  const [investors, setInvestors] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedInvestor, setSelectedInvestor] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);

  const [object, setObject] = useState(null);
  const [action, setAction] = useState(null);

  const [projectCategoryForm] = useForm();
  const [projectForm] = useForm();
  const [investorForm] = useForm();

  const [imageList, setImageList] = useState([]);

  const accessToken = Cookies.get('access');


  async function getAllProjectCategories() {
    setIsLoading(true);
    try {
      const response = await getAllProjectCategoriesAPI();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function getAllProjects() {
    setIsLoading(true);
    try {
      const response = await getAllProjectsAPI();
      setProjects(response.data.results);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function getAllInvestors() {
    setIsLoading(true);
    try {
      const response = await getAllInvestorsAPI();
      setInvestors(response.data.results);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  const handleCreateClick = () => {
    setIsModalShow(true);
    switch (tab) {
      case 1:
        setObject('category');
        setAction('create');
        break;
      case 2:
        setObject('investor');
        setAction('create');
        break;
      case 3:
        setObject('project');
        setAction('create');
        break;
      default:
        setObject(null);
    }
  }

  const handleCreateCategory = async values => {
    setIsLoading(true);
    try {
      await createProjectCategoryAPI(accessToken, values);
      getAllProjectCategories();
      setIsModalShow(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const handleUpdateCategory = async values => {
    setIsLoading(true);
    try {
      await updateProjectCategoryAPI(accessToken, selectedCategory.id, values);
      getAllProjectCategories();
      setIsModalShow(false);
      setSelectedCategory(null);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const handleDeleteCategory = async id => {
    setIsLoading(true);
    try {
      await deleteProjectCategoryAPI(accessToken, id);
      getAllProjectCategories();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const handleCreateInvestor = async values => {
    setIsLoading(true);
    try {
      const body = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        website: values.website,
        detail: values.detail,
        ward_id: values.ward_id,
        street_id: values.street_id
      }
      const response = await createInvestorAPI(accessToken, body);
      const object = response.data.data;
      await updateInvestorAvatarAPI(accessToken, object.id, imageList[0].originFileObj);
      setIsModalShow(false);
      getAllInvestors();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    
  }

  const handleUpdateInvestor = async values => {
    setIsLoading(true);
    try {
      const body = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        website: values.website,
        detail: values.detail,
        ward_id: values.ward_id,
        street_id: values.street_id
      }
      await updateInvestorAPI(accessToken, selectedInvestor.id, body);

      if (imageList[0].originFileObj) {
        await updateInvestorAvatarAPI(accessToken, selectedInvestor.id, imageList[0].originFileObj);
      }

      getAllInvestors();
      setIsModalShow(false);
      setSelectedInvestor(null);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    
  }

  const handleDeleteInvestor = async id => {
    setIsLoading(true);
    try {
      await deleteInvestorAPI(accessToken, id);
      getAllInvestors();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const handleCreateProject = values => {
    console.log(values);
  }

  const handleUpdateProject = values => {

  }

  const handleDeleteProject = id => {

  }

  const handleEditProjectCategoryClick = category => {
    setSelectedCategory(category);
    setAction('update');
    setObject('category');
    setIsModalShow(true);
  }

  const handleEditInvestorClick = investor => {
    setSelectedInvestor(investor);
    setAction('update');
    setObject('investor');
    setIsModalShow(true);
  }

  const handleEditProjectClick = project => {

  }



  const onModalOK = () => {
    switch (tab) {
      case 1:
        if (action === 'create') {
          projectCategoryForm.validateFields().then(values => handleCreateCategory(values));
        } else if (action === 'update') {
          projectCategoryForm.validateFields().then(values => handleUpdateCategory(values));
        }
        break;
      case 2:
        if (action === 'create') {
          investorForm.validateFields().then(values => handleCreateInvestor(values));
        } else if (action === 'update') {
          investorForm.validateFields().then(values => handleUpdateInvestor(values));
        }
        break;
      case 3:
        if (action === 'create') {
          projectForm.validateFields().then(values => handleCreateProject(values));
        } else if (action === 'update') {
          projectForm.validateFields().then(values => handleUpdateProject(values));
        }
        break;
      default:
        return;
    }
  }

  const onModalCancel = () => {
    setIsModalShow(false);
  }

  const onModalAfterClose = () => {
    projectCategoryForm.resetFields();
    projectForm.resetFields();
    investorForm.resetFields();
    setImageList([]);
  }

  const handleImageChange = ({ fileList }) => {
    setImageList([...fileList]);
  }

  const handleBeforeUpload = file => {
    setImageList([...imageList, file]);
    return false;
  }

  useEffect(() => {
    getAllProjectCategories();
  }, []);

  const handleTabChange = key => {
    switch (key) {
      case "1":
        setTab(1);
        getAllProjectCategories();
        break;
      case "2":
        setTab(2);
        getAllInvestors();
        break;
      case "3":
        setTab(3);
        getAllProjects();
        break;
      default:
        getAllProjectCategories();
    }
  }

  return (
    <div className="admin-project-page">
      <h2>Quản lý dự án</h2>
      <Divider />
      <Tabs onChange={handleTabChange} tabBarExtraContent={
        <>
          {
            tab === 1 &&
            <Button icon={<PlusOutlined />} onClick={handleCreateClick}>Thêm loại dự án</Button>
          }
          {
            tab === 2 &&
            <Button icon={<PlusOutlined />} onClick={handleCreateClick}>Thêm chủ đầu tư</Button>
          }
          {
            tab === 3 &&
            <Button icon={<PlusOutlined />} onClick={handleCreateClick}>Thêm dự án</Button>
          }
        </>
      }>
        <Tabs.TabPane tab="Loại dự án" key="1">
          <ProjectCategoryTab
            loading={isLoading}
            categories={categories}
            onEditClick={handleEditProjectCategoryClick}
            onDeleteClick={handleDeleteCategory} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Chủ đầu từ" key="2">
          <ProjectInvestorTab
            loading={isLoading}
            investors={investors}
            onEditClick={handleEditInvestorClick}
            onDeleteClick={handleDeleteInvestor} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Dự án" key="3">
          <ProjectTab loading={isLoading} projects={projects} />
        </Tabs.TabPane>
      </Tabs>
      <Modal
        confirmLoading={isLoading}
        onOk={onModalOK}
        afterClose={onModalAfterClose}
        onCancel={onModalCancel}
        visible={isModalShow}
        destroyOnClose={true}
        width="80%">
        {
          tab === 1 &&
          <ProjectCategoryForm form={projectCategoryForm} category={selectedCategory} />
        }
        {
          tab === 2 &&
          <>
            <InvestorForm form={investorForm} investor={selectedInvestor} />
            <UploadPictures
              beforeUpload={handleBeforeUpload}
              onChange={handleImageChange}
              fileList={imageList}
              length={1} />
          </>
        }


      </Modal>
    </div>
  )
}

export default AdminProjectsPage;