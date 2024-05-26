import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "./ThemeContext";
import { Modal, Select, Input } from 'antd'; // Import Modal, Select, and Input from antd
import DarkModeToggle from './DarkModeToggle';

const { Option } = Select; // Destructure Option from Select

const DashboardPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('active');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sellingRate, setSellingRate] = useState('');
  const [totalItems, setTotalItems] = useState('');

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
        <button onClick={showModal}>+ Sale Order</button>
      </div>
      <div className="orders">
        {activeTab === 'active' && <h3>Active Sale Orders</h3>}
        {activeTab === 'completed' && <h3>Completed Sale Orders</h3>}
      </div>

      <Modal title="Add Sale Order" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
        </Select>
        {selectedProducts.map(product => (
          <div key={product} className="selected-product">
            <div>
              <span>{product}</span>
              <span>Price: $10</span> {/* Example price */}
            </div>
            <hr />
            <div>
              <Input
                placeholder="Selling Rate"
                value={sellingRate}
                onChange={(e) => setSellingRate(e.target.value)}
              />
              <Input
                placeholder="Total Items"
                value={totalItems}
                onChange={(e) => setTotalItems(e.target.value)}
              />
              <div className="items-left">10 items left</div>
            </div>
            <button onClick={() => handleRemoveProduct(product)}>Remove</button>
          </div>
        ))}
      </Modal>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default DashboardPage;
