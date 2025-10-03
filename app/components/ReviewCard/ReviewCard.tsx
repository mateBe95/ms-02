import { Star, ThumbsUp, MessageSquare } from "lucide-react";

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
  
  export const ReviewCard = ({ review, setSelectedReview }: { review: Review, setSelectedReview: any }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-lg font-bold text-gray-800">{review.title}</h4>
          <p className="text-sm text-gray-600">
            {review.reviewer} • {review.date}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'fill-current' : ''}`} />
            ))}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${review.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
            {review.status === 'published' ? 'Opublikowana' : 'Szkic'}
          </span>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{review.content}</p>
      <div className="flex gap-4 text-sm">
        <button className="flex items-center text-blue-600 hover:text-blue-800">
          <ThumbsUp className="w-4 h-4 mr-1" />
          {review.upvotes}
        </button>
        <button
          className="flex items-center text-gray-600 hover:text-gray-800"
          onClick={() => setSelectedReview(review)}
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          {review.comments} komentarzy
        </button>
      </div>
    </div>
  );