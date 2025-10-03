import React, { useState, useMemo } from 'react';
import { AlertCircle, FileText, Star, User } from "lucide-react";

type Dataset = {
    title: string;
    author: string;
    date: string;
    description: string;
    reviews: number;
    avgRating: number;
    suggestions: number;
};

type DatasetCardProps = {
    dataset: Dataset;
    setSelectedDataset: (dataset: Dataset) => void;
    setActiveTab: (tab: string) => void;
};

export const DatasetCard: React.FC<DatasetCardProps> = ({ dataset, setSelectedDataset, setActiveTab }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => { setSelectedDataset(dataset); setActiveTab('dataset-detail'); }}>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{dataset.title}</h3>
        <p className="text-sm text-gray-600 mb-3">
            <User className="inline w-4 h-4 mr-1" />
            {dataset.author} • {dataset.date}
        </p>
        <p className="text-gray-700 mb-4">{dataset.description}</p>
        <div className="flex gap-4 text-sm text-gray-600">
            <span className="flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                {dataset.reviews} recenzji
            </span>
            <span className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                {dataset.avgRating.toFixed(1)}
            </span>
            <span className="flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {dataset.suggestions} sugestii
            </span>
        </div>
    </div>
);