import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import CommentForm from "~/forms/CommentForm";

const CommentsSection = ({ userRole, selectedReview }) => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState<Comment>([])

    const { data: reviewComments = [], isLoading } = useQuery<Comments[]>({
        queryKey: ['comments', selectedReview?.id],
        queryFn: async () => {
            if (!selectedReview?.id) return [];
            console.log(selectedReview.id);
            const res = await axios.get(`/ui/api/comments/reviews/${selectedReview.id}`);
            return res.data.data;
        },
        enabled: !!selectedReview?.id, // tylko gdy wybrano zbiór
    });

    const queryClient = useQueryClient();
    const addCommentMutation = useMutation({
        mutationFn: async (newComment) => {
            const res = await axios.post(`/ui/api/comments`, newComment);
            return res.data.data;
        },
        onSuccess: (newReview) => {
            // Aktualizacja cache bez refetch
            queryClient.setQueryData<Comment[]>(['reviews', selectedReview?.id], (old = []) => [
                ...old,
                newReview,
            ]);
        },
    });

    useEffect(() => {
        setComments(reviewComments);
    }, [reviewComments]);

    const handleAddComment = (reviewId: number) => {
        if (newComment.trim()) {
            const newEntry = {
                id: comments.length + 1,
                reviewId,
                author: userRole === 'reviewer' ? 'Moje konto (Recenzent)' : 'Moje konto',
                content: newComment,
                date: new Date().toISOString().split('T')[0],
                isReviewer: userRole === 'reviewer'
            }
            setComments([...comments, newEntry]);
            addCommentMutation.mutate(newEntry);
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