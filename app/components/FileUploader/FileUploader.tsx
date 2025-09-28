import React, { useState } from 'react';
import { Upload, Button, message, Progress, Card, List, Typography, Space, Tag } from 'antd';
import { InboxOutlined, UploadOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { Title, Text } = Typography;

const FileUploadComponent = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Konfiguracja uploadu
  const uploadProps = {
    name: 'file',
    multiple: true,
    fileList,
    onChange(info: any) {
      let newFileList: any = [...info.fileList];
      
      // Limituj liczbę plików do 10
      newFileList = newFileList.slice(-10);
      
      // Czytaj z response i pokazuj link do pliku
      newFileList = newFileList.map((file: any) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });
      
      setFileList(newFileList);

      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} plik został przesłany pomyślnie.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} przesyłanie pliku nie powiodło się.`);
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    beforeUpload: (file: any) => {
      // Sprawdź typ pliku
      const isValidType = file.type === 'image/jpeg' || 
                         file.type === 'image/png' || 
                         file.type === 'application/pdf' ||
                         file.type === 'text/plain' ||
                         file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      
      if (!isValidType) {
        message.error('Możesz przesłać tylko pliki JPG/PNG/PDF/TXT/DOCX!');
        return false;
      }

      // Sprawdź rozmiar pliku (max 10MB)
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('Plik musi być mniejszy niż 10MB!');
        return false;
      }

      return true;
    },
    // Symulacja uploadu - w rzeczywistości tutaj byłby prawdziwy endpoint
    customRequest: ({ file, onSuccess, onError, onProgress }) => {
      // Symulacja uploadu z progress
      let progress = 0;
      const timer = setInterval(() => {
        progress += 10;
        onProgress({ percent: progress });
        
        if (progress >= 100) {
          clearInterval(timer);
          // Symulacja sukcesu
          setTimeout(() => {
            onSuccess({
              url: `https://example.com/files/${file.name}`,
              name: file.name,
              status: 'done'
            });
          }, 100);
        }
      }, 200);
    }
  };

  // Funkcja do usuwania wszystkich plików
  const clearAll = () => {
    setFileList([]);
    message.info('Wszystkie pliki zostały usunięte');
  };

  // Funkcja do przesłania wszystkich plików (jeśli używasz batch upload)
  const handleUpload = () => {
    setUploading(true);
    
    // Symulacja batch uploadu
    setTimeout(() => {
      setUploading(false);
      message.success('Wszystkie pliki zostały przesłane!');
    }, 2000);
  };

  // Formatowanie rozmiaru pliku
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Funkcja do określenia typu pliku
  const getFileTypeTag = (fileName: any) => {
    const ext = fileName.split('.').pop().toLowerCase();
    const typeColors = {
      'pdf': 'red',
      'doc': 'blue',
      'docx': 'blue',
      'jpg': 'green',
      'jpeg': 'green',
      'png': 'green',
      'txt': 'orange',
      'zip': 'purple'
    };
    
    return <Tag color={typeColors[ext] || 'default'}>{ext?.toUpperCase()}</Tag>;
  };

  return (
    <div className="p-6">
      <Card>
        <Title level={2}>Przesyłanie plików</Title>
        
        {/* Drag and Drop Upload Area */}
        <Dragger {...uploadProps} className="mb-4">
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
          </p>
          <p className="ant-upload-text">
            Kliknij lub przeciągnij pliki do tego obszaru aby je przesłać
          </p>
          <p className="ant-upload-hint">
            Obsługiwane formaty: PDF, TXT, DOCX (max 10MB)
          </p>
        </Dragger>

        {/* Upload Controls */}
        <Space className="mb-4 mt-4">
          <Button 
            onClick={clearAll}
            disabled={fileList.length === 0}
            icon={<DeleteOutlined />}
          >
            Usuń wszystkie
          </Button>
          
          <Text type="secondary">
            {fileList.length} plik(ów) w kolejce
          </Text>
        </Space>

        {/* File List */}
        {fileList.length > 0 && (
          <Card title="Lista plików" size="small">
            <List
              dataSource={fileList}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button 
                      type="link" 
                      icon={<EyeOutlined />}
                      onClick={() => {
                        if (item.url) {
                          window.open(item.url);
                        }
                      }}
                      disabled={!item.url}
                    >
                      Podgląd
                    </Button>,
                    <Button 
                      type="link" 
                      danger 
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        const newFileList = fileList.filter(file => file.uid !== item.uid);
                        setFileList(newFileList);
                      }}
                    >
                      Usuń
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        {item.name}
                        {getFileTypeTag(item.name)}
                        {item.status === 'done' && <Tag color="success">Przesłano</Tag>}
                        {item.status === 'error' && <Tag color="error">Błąd</Tag>}
                        {item.status === 'uploading' && <Tag color="processing">Przesyłanie...</Tag>}
                      </Space>
                    }
                    description={
                      <div>
                        <Text type="secondary">
                          Rozmiar: {formatFileSize(item.size)}
                        </Text>
                        {item.status === 'uploading' && (
                          <div className="mt-2">
                            <Progress 
                              percent={item.percent} 
                              size="small" 
                              status={item.percent === 100 ? 'success' : 'active'}
                            />
                          </div>
                        )}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        )}

        {/* Upload Statistics */}
        <Card title="Statystyki" size="small" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Text strong className="text-lg block">{fileList.length}</Text>
              <Text type="secondary">Pliki w kolejce</Text>
            </div>
            <div className="text-center">
              <Text strong className="text-lg block">
                {fileList.filter(f => f.status === 'done').length}
              </Text>
              <Text type="secondary">Przesłane</Text>
            </div>
            <div className="text-center">
              <Text strong className="text-lg block">
                {formatFileSize(fileList.reduce((acc, file) => acc + (file.size || 0), 0))}
              </Text>
              <Text type="secondary">Całkowity rozmiar</Text>
            </div>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default FileUploadComponent;