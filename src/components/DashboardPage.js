import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "./ThemeContext";
import { Select, Modal, Form, Input, Button, Table } from 'antd';
import DarkModeToggle from './DarkModeToggle';

const { Option } = Select;

const DashboardPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('active');
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]); // State to store selected products
  const [editingFormData, setEditingFormData] = useState(null); // State to store the data of the form being edited
  const [formSubmissions, setFormSubmissions] = useState([]); // State to store form submissions
  const [form] = Form.useForm();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  const handleSaleOrderClick = () => {
    setEditingFormData(null);
    setSelectedProducts([]);
    form.resetFields();
    setShowFormModal(true);
  };

  const handleFormSubmit = () => {
    form.validateFields()
      .then(values => {
        // Calculate total price
        const totalPrice = selectedProducts.reduce((acc, product, index) => {
          const sellingRate = values.sellingRate[index];
          const totalItems = values.totalItems[index];
          return acc + (sellingRate * totalItems);
        }, 0);

        if (editingFormData) {
          // Update existing form submission
          const updatedSubmissions = formSubmissions.map(submission =>
            submission.key === editingFormData.key
              ? { ...submission, totalPrice, lastModified: new Date().toLocaleString(), formData: values }
              : submission
          );
          setFormSubmissions(updatedSubmissions);
        } else {
          // Add new form submission
          setFormSubmissions([
            ...formSubmissions,
            {
              key: formSubmissions.length + 1,
              userName: 'User', // Static username for demonstration
              totalPrice,
              lastModified: new Date().toLocaleString(),
              formData: values
            }
          ]);
        }
        
        setShowFormModal(false);
      })
      .catch(errorInfo => {
        console.error('Validation failed:', errorInfo);
      });
  };

  const handleProductSelectChange = (selectedValues) => {
    setSelectedProducts(selectedValues); // Update selected products
  };

  const handleEditForm = (formData, products) => {
    setEditingFormData(formData);
    setSelectedProducts(products);
    form.setFieldsValue(formData.formData);
    setShowFormModal(true);
  };

  const columns = [
    {
      title: 'Serial Number',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text) => `$${text}`,
    },
    {
      title: 'Last Modified',
      dataIndex: 'lastModified',
      key: 'lastModified',
    },
    {
      title: 'Form',
      dataIndex: 'formData',
      key: 'formData',
      render: (text, record) => (
        <Button type="link" onClick={() => handleEditForm(record, record.formData.products)}>..</Button>
      )
    }
  ];

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <DarkModeToggle />
      <h2>Dashboard</h2>
      <div className="tabs">
        <button onClick={() => handleTabClick('active')} className={activeTab === 'active' ? 'active' : ''}>Active Orders</button>
        <button onClick={() => handleTabClick('completed')} className={activeTab === 'completed' ? 'active' : ''}>Completed Orders</button>
        <button onClick={handleSaleOrderClick}>+ Sale Order</button>
      </div>
      <div className="orders">
        {activeTab === 'active' && <h3>Active Sale Orders</h3>}
        {activeTab === 'completed' && <h3>Completed Sale Orders</h3>}
      </div>

      <Table dataSource={formSubmissions} columns={columns} />

      <button onClick={handleLogoutClick}>Logout</button>

      <Modal
        title="Sale Order"
        visible={showFormModal}
        maskClosable={false}
        onCancel={() => setShowFormModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowFormModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleFormSubmit} disabled={activeTab === 'completed'}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            label="All Products"
            name="products"
            rules={[{ required: true, message: 'Please select products!' }]}
          >
            <Select
              mode="multiple"
              placeholder="Select products"
              onChange={handleProductSelectChange} // Handle selection change
              value={selectedProducts}
              disabled={activeTab === 'completed'}
            >
              {/* Replace this with your actual product options */}
              <Option value="product1">Product 1</Option>
              <Option value="product2">Product 2</Option>
              <Option value="product3">Product 3</Option>
              {/* Add more Option components for each product */}
            </Select>
          </Form.Item>

          {/* Display selected products */}
          <Form.Item label="Selected Products">
            {selectedProducts.map((product, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <div className="product-info" style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>{index + 1}. {product} </p>
                  <p>Price: $10</p>
                </div>
                <Input.Group compact style={{ marginBottom: '5px' }}>
                  <Form.Item label="Selling Rate" name={['sellingRate', index]} noStyle>
                    <Input style={{ width: '50%' }} placeholder="Selling Rate" disabled={activeTab === 'completed'} />
                  </Form.Item>
                  <Form.Item label="Total Items" name={['totalItems', index]} noStyle>
                    <Input style={{ width: '50%' }} placeholder="Total Items" disabled={activeTab === 'completed'} />
                  </Form.Item>
                </Input.Group>
                <div className="remaining-items" style={{ display: "flex", justifyContent: "center", float: "right", width: "30%", backgroundColor: "lightgreen", color: "darkgreen" }}>2 items remaining</div>
              </div>
            ))}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DashboardPage;
