import { Send } from "lucide-react";
import React from 'react';
import CommentItem from "~/components/CommentItem/CommentItem";

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
    handleVote,
    canVote,
    comments }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h4 className="font-bold text-gray-800 mb-4">
                Komentarze do recenzji: "{selectedReview.title}"
            </h4>

            {comments
                .filter(c => c.reviewId === selectedReview.id)
                .map(comment => (
                    <CommentItem
                        onVote={handleVote}
                        canVote={canVote}
                        key={comment.id}
                        comment={comment} />
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