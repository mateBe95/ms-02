import { ThumbsUp, ThumbsDown } from 'lucide-react';
import React from 'react';

const CommentItem = ({ comment, onVote, canVote }) => {
  return (
    <div
      key={comment.id}
      className="mb-4 border-b border-gray-200 pb-4 last:border-b-0"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="font-semibold text-gray-800">{comment.author}</span>
        {comment.isReviewer && (
          <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-800">
            Recenzent
          </span>
        )}
        <span className="text-sm text-gray-500">{comment.date}</span>
      </div>
      <p className="text-gray-700">{comment.content}</p>
      <div className="mt-2 flex items-center justify-end gap-4 text-sm">
        <button
          onClick={() => onVote(comment.id, 'up')}
          disabled={!canVote}
          className="flex cursor-pointer items-center rounded px-2 py-1 text-blue-600 transition-all duration-150 hover:bg-blue-100 hover:text-blue-800 active:scale-95 active:bg-blue-200 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
        >
          <ThumbsUp className="mr-1 h-4 w-4" />
          {comment.upvotes}
        </button>
        <button
          onClick={() => onVote(comment.id, 'down')}
          disabled={!canVote}
          className="flex cursor-pointer items-center rounded px-2 py-1 text-red-600 transition-all duration-150 hover:bg-red-100 hover:text-red-800 active:scale-95 active:bg-red-200 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
        >
          <ThumbsDown className="mr-1 h-4 w-4" />
          {comment.downvotes}
        </button>
      </div>
    </div>
  );
};

export default CommentItem;
