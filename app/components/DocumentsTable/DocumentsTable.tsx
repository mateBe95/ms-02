import React, { useState, useMemo } from 'react';
import { 
  Table, 
  Input, 
  Card, 
  Typography, 
  Space, 
  Tag, 
  Button, 
  Drawer, 
  Descriptions,
  Divider,
  Badge
} from 'antd';
import { 
  SearchOutlined, 
  FileOutlined, 
  EyeOutlined, 
  DownloadOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FilePptOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const { Search } = Input;
const { Title, Text, Paragraph } = Typography;

interface Document {
  id: string;
  name: string;
  uploadDate: string;
  size: string;
  type: string;
  status: string;
  keywords: string[];
  summary: string;
  analysisDate?: string;
}

const DocumentsAnalysisComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  // Przykładowe dane dokumentów z analizą
  const documents: Document[] = [
    {
      id: '1',
      name: 'Raport sprzedażowy Q3 2024.pdf',
      uploadDate: '2024-03-15',
      size: '2.1 MB',
      type: 'PDF',
      status: 'Przeanalizowany',
      analysisDate: '2024-03-15 10:45',
      keywords: [
        'sprzedaż', 'wzrost', 'kwartał', 'przychody', 
        'klienci', 'analiza', 'trend', 'rynek', 'strategia'
      ],
      summary: 'Raport przedstawia wyniki sprzedażowe za trzeci kwartał 2024 roku. Odnotowano wzrost przychodów o 15% w porównaniu do poprzedniego kwartału. Główne obszary wzrostu to sprzedaż produktów premium oraz ekspansja na nowe rynki. Liczba nowych klientów wzrosła o 23%, co wskazuje na skuteczność nowej strategii marketingowej. Dokument zawiera szczegółowe analizy trendów rynkowych oraz rekomendacje na kolejny kwartał.'
    },
    {
      id: '2', 
      name: 'Prezentacja wyników.pdf',
      uploadDate: '2024-03-14',
      size: '5.2 MB',
      type: 'PowerPoint',
      status: 'Przeanalizowany',
      analysisDate: '2024-03-14 16:30',
      keywords: [
        'prezentacja', 'wyniki', 'cele', 'osiągnięcia', 
        'KPI', 'metryki', 'performance', 'zespół'
      ],
      summary: 'Prezentacja podsumowująca kluczowe wyniki zespołu za ostatni okres. Pokazuje realizację celów, główne KPI oraz metryki performance. Większość celów została przekroczona o średnio 8%. Prezentacja zawiera wykresy, infografiki oraz plany na następny okres. Szczególny nacisk położono na współpracę zespołową i innowacyjne podejście do realizacji projektów.'
    },
    {
      id: '3',
      name: 'Umowa partnerska.docx',
      uploadDate: '2024-03-13',
      size: '856 KB',
      type: 'Word',
      status: 'Przetwarzany',
      keywords: [],
      summary: ''
    }
  ];

  // Filtrowanie dokumentów
  const filteredDocuments = useMemo(() => {
    if (!searchQuery) return documents;
    
    return documents.filter(doc => 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Funkcja otwierania szczegółów
  const showDocumentDetails = (document: Document) => {
    setSelectedDocument(document);
    setDrawerVisible(true);
  };

  // Ikona pliku według typu
  const getFileIcon = (type: string) => {
    switch(type) {
      case 'PDF': return <FilePdfOutlined style={{ color: '#ff4d4f' }} />;
      case 'PowerPoint': return <FilePptOutlined style={{ color: '#fa8c16' }} />;
      case 'Word': return <FileWordOutlined style={{ color: '#1890ff' }} />;
      default: return <FileOutlined />;
    }
  };

  // Definicja kolumn tabeli
  const columns = [
    {
      title: 'Dokument',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: (name: string, record: Document) => (
        <Space>
          {getFileIcon(record.type)}
          <div>
            <div style={{ fontWeight: 500 }}>{name}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.size} • {record.uploadDate}
            </Text>
          </div>
        </Space>
      )
    },
    {
      title: 'Słowa kluczowe',
      dataIndex: 'keywords',
      key: 'keywords',
      width: '25%',
      render: (keywords: string[], record: Document) => (
        <div>
          {record.status === 'Przeanalizowany' ? (
            <Space wrap>
              {keywords.slice(0, 3).map((keyword, index) => (
                <Tag key={index} color="blue" style={{ fontSize: '11px' }}>
                  {keyword}
                </Tag>
              ))}
              {keywords.length > 3 && (
                <Tag color="default" style={{ fontSize: '11px' }}>
                  +{keywords.length - 3} więcej
                </Tag>
              )}
            </Space>
          ) : (
            <Text type="secondary" italic>
              {record.status === 'Przetwarzany' ? 'Analizowanie...' : 'Brak analizy'}
            </Text>
          )}
        </div>
      )
    },
    {
      title: 'Streszczenie',
      dataIndex: 'summary',
      key: 'summary',
      width: '30%',
      render: (summary: string, record: Document) => (
        <div>
          {record.status === 'Przeanalizowany' && summary ? (
            <Text ellipsis style={{ maxWidth: 250 }}>
              {summary.length > 120 ? `${summary.substring(0, 120)}...` : summary}
            </Text>
          ) : (
            <Text type="secondary" italic>
              {record.status === 'Przetwarzany' ? 'Generowanie streszczenia...' : 'Brak streszczenia'}
            </Text>
          )}
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (status: string) => {
        const colors: { [key: string]: string } = {
          'Przeanalizowany': 'green',
          'Przetwarzany': 'orange',
          'Przesłany': 'blue'
        };
        return <Tag color={colors[status] || 'default'}>{status}</Tag>;
      }
    },
    {
      title: 'Akcje',
      key: 'actions',
      width: '15%',
      render: (_: any, record: Document) => (
        <Space>
          <Button 
            type="text" 
            icon={<InfoCircleOutlined />} 
            title="Szczegóły"
            onClick={() => showDocumentDetails(record)}
          />
          <Button type="text" icon={<EyeOutlined />} title="Podgląd" />
          <Button type="text" icon={<DownloadOutlined />} title="Pobierz" />
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ marginBottom: '24px' }}>
          <Title level={3} style={{ marginBottom: '8px' }}>
            Przesłane dokumenty
          </Title>
          <Text type="secondary">
            Przeglądaj dokumenty wraz z automatycznie wygenerowanymi słowami kluczowymi i streszczeniami
          </Text>
        </div>
        
        {/* Wyszukiwanie */}
        <div style={{ marginBottom: '16px' }}>
          <Search
            placeholder="Szukaj po nazwie, słowach kluczowych, treści..."
            allowClear
            enterButton={<SearchOutlined />}
            size="middle"
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={setSearchQuery}
            style={{ maxWidth: 500 }}
          />
        </div>

        {/* Statystyki */}
        <div style={{ marginBottom: '16px' }}>
          <Space size="large">
            <Badge count={documents.filter(d => d.status === 'Przeanalizowany').length} color="green">
              <Text>Przeanalizowane</Text>
            </Badge>
            <Badge count={documents.filter(d => d.status === 'Przetwarzany').length} color="orange">
              <Text>W trakcie analizy</Text>
            </Badge>
            <Badge count={documents.filter(d => d.status === 'Przesłany').length} color="blue">
              <Text>Oczekujące</Text>
            </Badge>
          </Space>
        </div>

        {/* Tabela */}
        <Table
          columns={columns}
          dataSource={filteredDocuments}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} z ${total} dokumentów`
          }}
          size="middle"
        />

        {/* Drawer ze szczegółami */}
        <Drawer
          title={
            <Space>
              {selectedDocument && getFileIcon(selectedDocument.type)}
              Szczegóły dokumentu
            </Space>
          }
          placement="right"
          closable={true}
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          width={600}
        >
          {selectedDocument && (
            <div>
              <Descriptions title="Informacje podstawowe" bordered size="small">
                <Descriptions.Item label="Nazwa" span={3}>
                  {selectedDocument.name}
                </Descriptions.Item>
                <Descriptions.Item label="Rozmiar">
                  {selectedDocument.size}
                </Descriptions.Item>
                <Descriptions.Item label="Typ">
                  <Tag color={selectedDocument.type === 'PDF' ? 'red' : selectedDocument.type === 'PowerPoint' ? 'orange' : 'blue'}>
                    {selectedDocument.type}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag color={
                    selectedDocument.status === 'Przeanalizowany' ? 'green' :
                    selectedDocument.status === 'Przetwarzany' ? 'orange' : 'blue'
                  }>
                    {selectedDocument.status}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Data przesłania">
                  {selectedDocument.uploadDate}
                </Descriptions.Item>
                {selectedDocument.analysisDate && (
                  <Descriptions.Item label="Data analizy" span={2}>
                    {selectedDocument.analysisDate}
                  </Descriptions.Item>
                )}
              </Descriptions>

              <Divider />

              {selectedDocument.status === 'Przeanalizowany' ? (
                <>
                  <Title level={4}>Słowa kluczowe</Title>
                  <div style={{ marginBottom: '24px' }}>
                    <Space wrap>
                      {selectedDocument.keywords.map((keyword, index) => (
                        <Tag key={index} color="processing" style={{ margin: '2px' }}>
                          {keyword}
                        </Tag>
                      ))}
                    </Space>
                  </div>

                  <Title level={4}>Streszczenie</Title>
                  <Card size="small" style={{ backgroundColor: '#f9f9f9' }}>
                    <Paragraph style={{ margin: 0, lineHeight: 1.6 }}>
                      {selectedDocument.summary}
                    </Paragraph>
                  </Card>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <Text type="secondary" style={{ fontSize: '16px' }}>
                    {selectedDocument.status === 'Przetwarzany' 
                      ? '🔄 Dokument jest obecnie analizowany...' 
                      : '⏳ Dokument oczekuje na analizę'
                    }
                  </Text>
                </div>
              )}

              <Divider />
              
              <Space>
                <Button type="primary" icon={<EyeOutlined />}>
                  Podgląd dokumentu
                </Button>
                <Button icon={<DownloadOutlined />}>
                  Pobierz
                </Button>
              </Space>
            </div>
          )}
        </Drawer>
      </Card>
    </div>
  );
};

export default DocumentsAnalysisComponent;