import React, { useState } from 'react';
import CommentForm from "~/forms/CommentForm";

const CommentsSection = ({ userRole, selectedReview }) => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState<Comment[]>([
        {
            id: 1,
            reviewId: 1,
            author: 'Tomasz Lewandowski',
            content: 'Zgadzam się z oceną. Czy autor planuje uzupełnić dokumentację metodologiczną?',
            date: '2024-09-21',
            isReviewer: false
        },
        {
            id: 2,
            reviewId: 1,
            author: 'Dr Anna Kowalska',
            content: 'Dziękuję za recenzję. Pracuję nad rozszerzeniem dokumentacji metodologicznej i planuje opublikować aktualizację do końca miesiąca.',
            date: '2024-09-22',
            isReviewer: false
        },
        {
            id: 3,
            reviewId: 1,
            author: 'Maria Zielińska',
            content: 'Bardzo pomocna recenzja! Zastanawiam się, czy dane są dostępne również w formacie FASTA?',
            date: '2024-09-23',
            isReviewer: false
        }
    ]);

    const handleAddComment = (reviewId: number) => {
        if (newComment.trim()) {
            setComments([...comments, {
                id: comments.length + 1,
                reviewId,
                author: userRole === 'reviewer' ? 'Moje konto (Recenzent)' : 'Moje konto',
                content: newComment,
                date: new Date().toISOString().split('T')[0],
                isReviewer: userRole === 'reviewer'
            }]);
            setNewComment('');
        }
    };
    return (
        <div>
            <CommentForm
                selectedReview={selectedReview}
                setNewComment={setNewComment}
                handleAddComment={handleAddComment}
                newComment={newComment}
                comments={comments} />
        </div>
    );
};

export default CommentsSection;