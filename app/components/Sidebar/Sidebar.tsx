import React from 'react';
import { Menu, Typography } from 'antd';
import {
  UserOutlined,
  UploadOutlined,
  SettingOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const selectedKey = location.pathname;

  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        className={styles.sidebar}
        selectedKeys={[selectedKey]}
        items={[
          { key: '/', icon: <UserOutlined />, label: <Link to="/">Strona główna</Link> },
          { key: '/upload', icon: <UploadOutlined />, label: <Link to="/upload">Dodaj plik</Link> },
          { key: '/documents', icon: <FilePdfOutlined />, label: <Link to="/documents">Przesłane pliki</Link> },
          { key: '/settings', icon: <SettingOutlined />, label: <Link to="/settings">Ustawienia</Link> },

        ]}
      />
      <div style={{ padding: '10px 10px' }}>
        <Typography.Text style={{ color: '#ffffffb3' }} type="secondary">Wersja v0.0.1</Typography.Text>
      </div>
    </>
  );
};

export default Sidebar;