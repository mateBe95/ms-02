import React from 'react';
import { Menu } from 'antd';
import {
  UserOutlined,
  UploadOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const selectedKey = location.pathname;

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKey]}
      items={[
        { key: '/', icon: <UserOutlined />, label: <Link to="/">Strona główna</Link> },
        { key: '/upload', icon: <UploadOutlined />, label: <Link to="/upload">Dodaj plik</Link> },
        { key: '/settings', icon: <SettingOutlined />, label: <Link to="/settings">Ustawienia</Link> },
      ]}
    />
  );
};

export default Sidebar;