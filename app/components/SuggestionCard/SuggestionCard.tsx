import { ThumbsUp } from "lucide-react";

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

interface SuggestionCardProps {
    suggestion: Suggestion;
}

export const SuggestionCard = ({ suggestion }: SuggestionCardProps) => (
    <div className="bg-white rounded-lg shadow-md p-5 mb-3">
        <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${suggestion.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                        {suggestion.type === 'error' ? 'Błąd' : 'Usprawnienie'}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${suggestion.status === 'open' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                        {suggestion.status === 'open' ? 'Otwarte' : 'Potwierdzone'}
                    </span>
                </div>
                <h5 className="font-bold text-gray-800">{suggestion.title}</h5>
                <p className="text-sm text-gray-600 mb-2">{suggestion.author} • {suggestion.date}</p>
                <p className="text-gray-700 text-sm">{suggestion.description}</p>
            </div>
            <button className="flex items-center text-blue-600 hover:text-blue-800 ml-4">
                <ThumbsUp className="w-4 h-4 mr-1" />
                {suggestion.upvotes}
            </button>
        </div>
    </div>
);