import { ThumbsDown, ThumbsUp } from 'lucide-react';

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

export const SuggestionCard = ({
  suggestion,
  onVote,
  canVote,
}: SuggestionCardProps) => (
  <div className="mb-3 rounded-lg bg-white p-5 shadow-md">
    <div className="mb-2 flex items-start justify-between">
      <div className="flex-1">
        <div className="mb-2 flex items-center gap-2">
          <span
            className={`rounded px-2 py-1 text-xs font-semibold ${
              suggestion.type === 'error'
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            {suggestion.type === 'error' ? 'Błąd' : 'Usprawnienie'}
          </span>
          <span
            className={`rounded px-2 py-1 text-xs font-semibold ${
              suggestion.status === 'open'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {suggestion.status === 'open' ? 'Otwarte' : 'Potwierdzone'}
          </span>
        </div>
        <h5 className="font-bold text-gray-800">{suggestion.title}</h5>
        <p className="mb-2 text-sm text-gray-600">
          {suggestion.author} • {suggestion.date}
        </p>
        <p className="text-sm text-gray-700">{suggestion.description}</p>
      </div>
      <button
        onClick={() => onVote(suggestion.id, 'up')}
        disabled={!canVote}
        className="flex cursor-pointer items-center rounded px-2 py-1 text-blue-600 transition-all duration-150 hover:bg-blue-100 hover:text-blue-800 active:scale-95 active:bg-blue-200 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
      >
        <ThumbsUp className="mr-1 h-4 w-4" />
        {suggestion.upvotes}
      </button>
      <button
        onClick={() => onVote(suggestion.id, 'down')}
        disabled={!canVote}
        className="flex cursor-pointer items-center rounded px-2 py-1 text-red-600 transition-all duration-150 hover:bg-red-100 hover:text-red-800 active:scale-95 active:bg-red-200 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
      >
        <ThumbsDown className="mr-1 h-4 w-4" />
        {suggestion.downvotes}
      </button>
    </div>
  </div>
);
