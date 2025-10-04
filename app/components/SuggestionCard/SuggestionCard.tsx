import { ThumbsDown, ThumbsUp } from "lucide-react";

type Suggestion = {
    id: number;
    datasetId: number;
    author: string;
    title: string;
    type: 'improvement' | 'error';
    description: string;
    date: string;
    upvotes: number;
    downvotes: number;
    status: 'open' | 'acknowledged';
};

interface SuggestionCardProps {
    suggestion: Suggestion;
    onVote?: (id: number, type: 'up' | 'down') => void;
    canVote?: boolean;
}

export const SuggestionCard = ({ suggestion, onVote, canVote }: SuggestionCardProps) => (
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
            <button
                onClick={() => onVote(suggestion.id, 'up')}
                disabled={!canVote}
                className="flex cursor-pointer items-center px-2 py-1 rounded 
          text-blue-600 
          hover:bg-blue-100 hover:text-blue-800
          active:bg-blue-200 active:scale-95
          transition-all duration-150
            disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400
        ">
                <ThumbsUp className="w-4 h-4 mr-1" />
                {suggestion.upvotes}
            </button>
            <button
                onClick={() => onVote(suggestion.id, 'down')}
                disabled={!canVote}
                className="flex cursor-pointer items-center px-2 py-1 rounded 
          text-red-600 
          hover:bg-red-100 hover:text-red-800
          active:bg-red-200 active:scale-95
          transition-all duration-150
            disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400
        ">
                <ThumbsDown className="w-4 h-4 mr-1" />
                {suggestion.downvotes}
            </button>
        </div>
    </div>
);