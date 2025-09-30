import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, theme, Typography, Card, Space, Upload, message } from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  DownloadOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';
import './App.css';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;
const { Dragger } = Upload;

const { ipc } = window.electron || {};

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const [filePaths, setFilePaths] = useState([]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleOpenFile = async () => {
    try {
      if (!ipc) {
        message.error('Electron IPC not available');
        return;
      }
      
      const result = await window.electron.openFile();
      if (!result.canceled && result.filePaths.length > 0) {
        setFilePaths(result.filePaths);
        message.success(`Selected file: ${result.filePaths[0]}`);
      }
    } catch (error) {
      message.error('Failed to open file dialog');
      console.error(error);
    }
  };

  const handleOpenDirectory = async () => {
    try {
      if (!ipc) {
        message.error('Electron IPC not available');
        return;
      }
      
      const result = await window.electron.openDirectory();
      if (!result.canceled && result.filePaths.length > 0) {
        setFilePaths(result.filePaths);
        message.success(`Selected directory: ${result.filePaths[0]}`);
      }
    } catch (error) {
      message.error('Failed to open directory dialog');
      console.error(error);
    }
  };

  const handleSaveFile = async () => {
    try {
      if (!ipc) {
        message.error('Electron IPC not available');
        return;
      }
      
      const result = await window.electron.saveFile();
      if (!result.canceled) {
        message.success(`File saved to: ${result.filePath}`);
      }
    } catch (error) {
      message.error('Failed to open save dialog');
      console.error(error);
    }
  };

  const menuItems = [
    {
      key: '1',
      icon: <PieChartOutlined />,
      label: 'Dashboard',
    },
    {
      key: '2',
      icon: <DesktopOutlined />,
      label: 'System Info',
    },
    {
      key: '3',
      icon: <UserOutlined />,
      label: 'User Management',
    },
    {
      key: '4',
      icon: <TeamOutlined />,
      label: 'Team Management',
    },
    {
      key: '5',
      icon: <FileOutlined />,
      label: 'File Operations',
    },
  ];

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu 
          theme="dark" 
          defaultSelectedKeys={['1']} 
          mode="inline" 
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            {selectedKey === '1' && (
              <div>
                <Title level={2}>Dashboard</Title>
                <Text>Welcome to the Electron React Antd Template!</Text>
                
                <Card title="Template Features" style={{ marginTop: 16 }}>
                  <ul>
                    <li>Electron with React integration</li>
                    <li>Ant Design components</li>
                    <li>File system operations</li>
                    <li>IPC communication between main and renderer processes</li>
                    <li>Separate deployment support for web version</li>
                    <li>Development and production environment handling</li>
                  </ul>
                </Card>
              </div>
            )}
            
            {selectedKey === '5' && (
              <div>
                <Title level={2}>File Operations</Title>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Card title="File Dialogs">
                    <Space>
                      <Button 
                        icon={<FolderOpenOutlined />} 
                        onClick={handleOpenFile}
                      >
                        Open File
                      </Button>
                      <Button 
                        icon={<FolderOpenOutlined />} 
                        onClick={handleOpenDirectory}
                      >
                        Open Directory
                      </Button>
                      <Button 
                        icon={<DownloadOutlined />} 
                        onClick={handleSaveFile}
                      >
                        Save File
                      </Button>
                    </Space>
                    
                    {filePaths.length > 0 && (
                      <Card title="Selected Paths" size="small" style={{ marginTop: 16 }}>
                        {filePaths.map((path, index) => (
                          <Text key={index} code>{path}</Text>
                        ))}
                      </Card>
                    )}
                  </Card>
                  
                  <Card title="File Upload">
                    <Dragger>
                      <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      <p className="ant-upload-hint">
                        Support for a single or bulk upload.
                      </p>
                    </Dragger>
                  </Card>
                </Space>
              </div>
            )}
            
            {['2', '3', '4'].includes(selectedKey) && (
              <div>
                <Title level={2}>
                  {menuItems.find(item => item.key === selectedKey)?.label}
                </Title>
                <Text>Feature coming soon...</Text>
              </div>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Electron React Antd Template ©{new Date().getFullYear()} Created for Enterprise Applications
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;