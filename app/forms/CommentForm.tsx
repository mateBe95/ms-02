import { Send } from "lucide-react";
import React from 'react';

type Comment = {
    id: number;
    reviewId: number;
    author: string;
    content: string;
    date: string;
    isReviewer: boolean;
};

type Review = {
    id: number;
    datasetId: number;
    reviewer: string;
    title: string;
    rating: number;
    date: string;
    status: 'published' | 'draft';
    content: string;
    upvotes: number;
    comments: number;
};

type CommentFormProps = {
    selectedReview: Review | null;
    newComment: string;
    setNewComment: React.Dispatch<React.SetStateAction<string>>;
    handleAddComment: () => void;
    comments: Comment[];
};

const CommentForm: React.FC<CommentFormProps> = ({
    selectedReview,
    setNewComment,
    handleAddComment,
    newComment,
    comments }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h4 className="font-bold text-gray-800 mb-4">
                Komentarze do recenzji: "{selectedReview.title}"
            </h4>

            {comments
                .filter(c => c.reviewId === selectedReview.id)
                .map(comment => (
                    <div key={comment.id} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-gray-800">{comment.author}</span>
                            {comment.isReviewer && (
                                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                                    Recenzent
                                </span>
                            )}
                            <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                    </div>
                ))}

            <div className="mt-4">
                <textarea
                    placeholder="Dodaj komentarz..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                    rows={3}
                />
                <button
                    onClick={() => handleAddComment(selectedReview.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Send className="inline w-4 h-4 mr-2" />
                    Dodaj komentarz
                </button>
            </div>
        </div>
    );
};

export default CommentForm;