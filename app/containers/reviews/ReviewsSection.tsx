import React, { useEffect, useState } from 'react';
import { ReviewCard } from "~/components/ReviewCard/ReviewCard";
import ReviewForm from "~/forms/ReviewForm";
import CommentsSection from "../comments/CommentsSection";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type NewReview = {
    title: string;
    content: string;
    rating: number;
    status: 'published' | 'draft';
};

type Review = {
    title: string;
    reviewer: string;
    date: string;
    rating: number;
    status: string;
    content: string;
    upvotes: number;
    comments: number;
};

const ReviewsSection = ({ userRole, selectedDataset }) => {
    const [newReview, setNewReview] = useState<NewReview>({ title: '', content: '', rating: 5, status: 'draft' });
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);

    const { data: datasetReviews = [], isLoading } = useQuery<Review[]>({
        queryKey: ['reviews', selectedDataset?.id],
        queryFn: async () => {
            if (!selectedDataset?.id) return [];
            console.log(selectedDataset.id);
            const res = await axios.get(`/ui/api/reviews/datasets/${selectedDataset.id}/reviews`);
            return res.data.data;
        },
        enabled: !!selectedDataset?.id, // tylko gdy wybrano zbiór
    });

    const queryClient = useQueryClient();
    const addSuggestionMutation = useMutation({
        mutationFn: async (newReview) => {
            const res = await axios.post(`/ui/api/reviews`, newReview);
            return res.data.data;
        },
        onSuccess: (newReview) => {
            // Aktualizacja cache bez refetch
            queryClient.setQueryData<Review[]>(['reviews', selectedDataset?.id], (old = []) => [
                ...old,
                newReview,
            ]);
        },
    });

    useEffect(() => {
        setReviews(datasetReviews);
    }, [datasetReviews]);

    const handleAddReview = (datasetId: number) => {
        if (newReview.title.trim() && newReview.content.trim()) {
            const newEntry = {
                id: reviews.length + 1,
                datasetId,
                reviewer: 'Moje konto (Recenzent)',
                title: newReview.title,
                rating: newReview.rating,
                date: new Date().toISOString().split('T')[0],
                status: newReview.status,
                content: newReview.content,
                upvotes: 0,
                comments: 0
            }
            setReviews([...reviews, newEntry]);
            addSuggestionMutation.mutate(newEntry);
            setNewReview({ title: '', content: '', rating: 5, status: 'draft' });
        }
    };
    const filteredReviews = reviews.filter(r => r.datasetId === selectedDataset.id);
    return (
        <div>
            {userRole === 'reviewer' && (
                <ReviewForm
                    handleAddReview={handleAddReview}
                    newReview={newReview}
                    setNewReview={setNewReview}
                    selectedDataset={selectedDataset} />
            )}
            {filteredReviews.length > 0 && <h3 className="text-xl font-bold text-gray-800 mb-4">Recenzje peer review</h3>}
            {filteredReviews
                .map(review => (
                    <ReviewCard
                        key={review.id}
                        review={review}
                        setSelectedReview={setSelectedReview} />
                ))}
            {selectedReview && <CommentsSection
                userRole={userRole}
                selectedReview={selectedReview} />
            }
        </div>
    );
};

export default ReviewsSection;