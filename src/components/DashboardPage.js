import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "./ThemeContext";
import { Modal, Select } from 'antd'; // Import Modal and Select from antd
import DarkModeToggle from './DarkModeToggle';

const { Option } = Select; // Destructure Option from Select

const DashboardPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('active');
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [selectedProducts, setSelectedProducts] = useState([]); // State for selected products

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleProductSelect = (value) => {
    setSelectedProducts(value);
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(product => product !== productId));
  };

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <DarkModeToggle />
      <h2>Dashboard</h2>
      <div className="tabs">
        <button onClick={() => handleTabClick('active')} className={activeTab === 'active' ? 'active' : ''}>Active Orders</button>
        <button onClick={() => handleTabClick('completed')} className={activeTab === 'completed' ? 'active' : ''}>Completed Orders</button>
        <button onClick={showModal}>+ Sale Order</button> {/* Open modal on button click */}
      </div>
      <div className="orders">
        {activeTab === 'active' && <h3>Active Sale Orders</h3>}
        {activeTab === 'completed' && <h3>Completed Sale Orders</h3>}
        {/* Content for active and completed sale orders */}
      </div>

      {/* Modal Form */}
      <Modal title="Add Sale Order" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} maskClosable={false}>
        <Select
          mode="multiple"
          placeholder="Select products"
          style={{ width: '100%' }}
          onChange={handleProductSelect}
          value={selectedProducts}
        >
          <Option value="product1">Product 1</Option>
          <Option value="product2">Product 2</Option>
          <Option value="product3">Product 3</Option>
          {/* Add more options as needed */}
        </Select>
        <div>
          {selectedProducts.map(product => (
            <span key={product} className="selected-product">
              {product} 
              <button onClick={() => handleRemoveProduct(product)}>X</button> {/* Button to remove selected product */}
            </span>
          ))}
        </div>
      </Modal>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default DashboardPage;
