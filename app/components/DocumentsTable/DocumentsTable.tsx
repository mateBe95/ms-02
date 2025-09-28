
import React, { useState, useMemo } from 'react';
import { Table, Input, Card, Typography, Space, Tag, Button } from 'antd';
import { SearchOutlined, FileOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Title } = Typography;

interface Document {
    id: string;
    name: string;
    uploadDate: string;
    size: string;
    type: string;
    status: string;
}

const DocumentsTableComponent: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Przykładowe dane dokumentów
    const documents: Document[] = [
        {
            id: '1',
            name: 'DNA_sekwencje_mutacje.pdf',
            uploadDate: '2025-03-15',
            size: '2.1 MB',
            type: 'PDF',
            status: 'Przeanalizowany'
        },
        {
            id: '2',
            name: 'Chem_kinetyka_reakcji.pdf',
            uploadDate: '2025-03-14',
            size: '5.2 MB',
            type: 'PowerPoint',
            status: 'Przetwarzany'
        },
        {
            id: '3',
            name: 'Neuro_stres_aktywnosc_mozgu.docx',
            uploadDate: '2025-03-13',
            size: '856 KB',
            type: 'Word',
            status: 'Przesłany'
        }
    ];

    // Filtrowanie dokumentów na podstawie wyszukiwania
    const filteredDocuments = useMemo(() => {
        if (!searchQuery) return documents;

        return documents.filter(doc =>
            doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.status.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    // Definicja kolumn tabeli
    const columns = [
        {
            title: 'Nazwa dokumentu',
            dataIndex: 'name',
            key: 'name',
            render: (name: string) => (
                <Space>
                    <FileOutlined />
                    {name}
                </Space>
            )
        },
        {
            title: 'Data przesłania',
            dataIndex: 'uploadDate',
            key: 'uploadDate'
        },
        {
            title: 'Rozmiar',
            dataIndex: 'size',
            key: 'size'
        },
        {
            title: 'Typ',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) => {
                const colors: { [key: string]: string } = {
                    'PDF': 'red',
                    'PowerPoint': 'orange',
                    'Word': 'blue'
                };
                return <Tag color={colors[type] || 'default'}>{type}</Tag>;
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
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
            render: () => (
                <Space>
                    <Button type="text" icon={<EyeOutlined />} title="Podgląd" />
                    <Button type="text" icon={<DownloadOutlined />} title="Pobierz" />
                </Space>
            )
        }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <Title level={3} style={{ marginBottom: '16px' }}>
                    Przesłane pliki
                </Title>

                {/* Wyszukiwanie */}
                <div style={{ marginBottom: '16px' }}>
                    <Search
                        placeholder="Szukaj dokumentów..."
                        allowClear
                        enterButton={<SearchOutlined />}
                        size="middle"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onSearch={setSearchQuery}
                        style={{ maxWidth: 400 }}
                    />
                </div>

                {/* Tabela */}
                <Table
                    columns={columns}
                    dataSource={filteredDocuments}
                    rowKey="id"
                    pagination={false}
                    size="middle"
                />

                {/* Informacja o liczbie wyników */}
                <div style={{ marginTop: '16px', textAlign: 'right', color: '#8c8c8c' }}>
                    Pokazano {filteredDocuments.length} z {documents.length} dokumentów
                </div>
            </Card>
        </div>
    );
};

export default DocumentsTableComponent;