import { Send } from "lucide-react";
import React from 'react';

type Review = {
    title: string;
    content: string;
    rating: number;
    status: 'published' | 'draft';
};

type Dataset = {
    id: number;
    title: string;
    author: string;
    date: string;
    reviews: number;
    avgRating: number;
    suggestions: number;
    description: string;
};

type ReviewFormProps = {
    newReview: Review;
    setNewReview: React.Dispatch<React.SetStateAction<Review>>;
    handleAddReview: any;
    selectedDataset: Dataset
};

const ReviewForm: React.FC<ReviewFormProps> = ({ newReview, setNewReview, handleAddReview, selectedDataset }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h4 className="font-bold text-gray-800 mb-3">Dodaj recenzję</h4>
            <input
                type="text"
                placeholder="Tytuł recenzji"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
            />
            <textarea
                placeholder="Treść recenzji"
                value={newReview.content}
                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 h-32"
            />
            <div className="flex gap-4 mb-3">
                <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Ocena</label>
                    <select
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="5">5 - Doskonały</option>
                        <option value="4">4 - Bardzo dobry</option>
                        <option value="3">3 - Dobry</option>
                        <option value="2">2 - Dostateczny</option>
                        <option value="1">1 - Słaby</option>
                    </select>
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                    <select
                        value={newReview.status}
                        onChange={(e) => setNewReview({ ...newReview, status: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="draft">Szkic</option>
                        <option value="published">Opublikuj</option>
                    </select>
                </div>
            </div>
            <button
                onClick={() => handleAddReview(selectedDataset.id)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
                <Send className="inline w-4 h-4 mr-2" />
                Dodaj recenzję
            </button>
        </div>
    );
};

export default ReviewForm;