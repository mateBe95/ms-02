import { ThumbsUp, ThumbsDown } from "lucide-react";
import React from 'react';

const CommentItem = ({ comment, onVote, canVote }) => {
    return (
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
                  <div className="mt-2 flex justify-end items-center gap-4 text-sm">
            <button
                onClick={() => onVote(comment.id, 'up')}
                disabled={!canVote}
                className="flex cursor-pointer items-center px-2 py-1 rounded 
          text-blue-600 
          hover:bg-blue-100 hover:text-blue-800
          active:bg-blue-200 active:scale-95
          transition-all duration-150
            disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400
        ">
                <ThumbsUp className="w-4 h-4 mr-1" />
                {comment.upvotes}
            </button>
            <button
                onClick={() => onVote(comment.id, 'down')}
                disabled={!canVote}
                className="flex cursor-pointer items-center px-2 py-1 rounded 
          text-red-600 
          hover:bg-red-100 hover:text-red-800
          active:bg-red-200 active:scale-95
          transition-all duration-150
            disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400
        ">
                <ThumbsDown className="w-4 h-4 mr-1" />
                {comment.downvotes}
            </button>
      </div>
        </div>
    );
};

export default CommentItem;