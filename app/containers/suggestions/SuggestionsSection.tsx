import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { SuggestionCard } from "~/components/SuggestionCard/SuggestionCard";
import SuggestionForm from "~/forms/SuggestionForm";

type Suggestion = {
    id: number;
    datasetId: number;
    author: string;
    title: string;
    type: 'improvement' | 'error';
    description: string;
    date: string;
    upvotes: number;
    status: 'open' | 'acknowledged';
};

// Typy dla state
type NewSuggestion = {
    title: string;
    description: string;
    type: 'improvement' | 'error';
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

type DatasetCardProps = {
    selectedDataset: Dataset | null;
}

export const SuggestionsSection: React.FC<DatasetCardProps> = ({ selectedDataset }) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [newSuggestion, setNewSuggestion] = useState<NewSuggestion>({ title: '', description: '', type: 'improvement' });

    const { data: datasetSuggestions = [], isLoading } = useQuery<Suggestion[]>({
        queryKey: ['suggestions', selectedDataset?.id],
        queryFn: async () => {
            if (!selectedDataset?.id) return [];
            console.log(selectedDataset.id);
            const res = await axios.get(`ui/api/suggestions/datasets/${selectedDataset.id}`);
            return res.data.data;
        },
        enabled: !!selectedDataset?.id, // tylko gdy wybrano zbiór
    });

    const queryClient = useQueryClient();
    const addSuggestionMutation = useMutation({
        mutationFn: async (newSuggestion) => {
            const res = await axios.post(`/ui/api/suggestions`, newSuggestion);
            return res.data.data;
        },
        onSuccess: (newSuggestion) => {
            // Aktualizacja cache bez refetch
            queryClient.setQueryData<Suggestion[]>(['suggestions', selectedDataset?.id], (old = []) => [
                ...old,
                newSuggestion,
            ]);
        },
    });
    useEffect(() => {
        setSuggestions(datasetSuggestions);
    }, [datasetSuggestions]);

    const handleAddSuggestion = (datasetId: number) => {
        if (newSuggestion.title.trim() && newSuggestion.description.trim()) {
            const newEntry = {
                id: suggestions.length + 1,
                datasetId,
                author: 'Moje konto',
                title: newSuggestion.title,
                type: newSuggestion.type,
                description: newSuggestion.description,
                date: new Date().toISOString().split('T')[0],
                upvotes: 0,
                status: 'open'
            };

            setSuggestions([...suggestions, newEntry]);
            addSuggestionMutation.mutate(newEntry);
            setNewSuggestion({ title: '', description: '', type: 'improvement' });
        }
    };

    return (
        <>
            <SuggestionForm
                newSuggestion={newSuggestion}
                setNewSuggestion={setNewSuggestion}
                handleAddSuggestion={() => handleAddSuggestion(selectedDataset.id)}
                selectedDataset={selectedDataset}
            />
            {isLoading ? (
                <p>Ładowanie sugestii...</p>
            ) : (
                suggestions
                    .filter(s => s.datasetId === selectedDataset.id)
                    .map(suggestion => (
                        <SuggestionCard
                            key={suggestion.id}
                            suggestion={suggestion}
                        />
                    ))
            )}
        </>
    );
}