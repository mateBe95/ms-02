import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import { ThumbsUp, MessageSquare, AlertCircle, FileText, User, Star, Send, Edit3 } from 'lucide-react';
import { DatasetCard } from "~/components/DatasetCard/DatasetCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ReviewCard } from "~/components/ReviewCard/ReviewCard";
import { SuggestionCard } from "~/components/SuggestionCard/SuggestionCard";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

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

type Review = {
  id: number;
  datasetId: number;
  reviewer: string;
  title: string;
  rating: number;
  date: string;
  status: 'published' | 'draft';
  content: string;
  upvotes: number;
  comments: number;
};

type Comment = {
  id: number;
  reviewId: number;
  author: string;
  content: string;
  date: string;
  isReviewer: boolean;
};

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

type NewReview = {
  title: string;
  content: string;
  rating: number;
  status: 'published' | 'draft';
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('datasets');
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [userRole, setUserRole] = useState('user');
  const [search, setSearch] = useState("");

  const [newComment, setNewComment] = useState('');
  const [newSuggestion, setNewSuggestion] = useState<NewSuggestion>({ title: '', description: '', type: 'improvement' });
  const [newReview, setNewReview] = useState<NewReview>({ title: '', content: '', rating: 5, status: 'draft' });
  const { data: datasets = [], isLoading, error } = useQuery<Dataset[]>({
    queryKey: ['datasets'],
    queryFn: async () => {
      const res = await axios.get('ui/api/datasets');
      return res.data.data;
    },
  });
  const filteredDatasets = datasets.filter(
    (dataset) =>
      dataset.title.toLowerCase().includes(search.toLowerCase()) ||
      dataset.description.toLowerCase().includes(search.toLowerCase())
  );

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      datasetId: 1,
      reviewer: 'Dr Marek Wiśniewski',
      title: 'Solidny zbiór z drobnymi brakami dokumentacji',
      rating: 4,
      date: '2024-09-20',
      status: 'published',
      content: 'Zbiór danych jest bardzo kompletny i dobrze zorganizowany. Dane są czyste i gotowe do analiz. Jedynym mankamentem jest brak szczegółowego opisu metodyki pobierania próbek oraz informacji o warunkach przechowywania materiału biologicznego.',
      upvotes: 12,
      comments: 3
    },
    {
      id: 2,
      datasetId: 1,
      reviewer: 'Prof. Ewa Mazur',
      title: 'Wartościowe dane, wymaga standaryzacji',
      rating: 3.5,
      date: '2024-09-25',
      status: 'published',
      content: 'Dataset zawiera cenne informacje genomiczne, jednak format danych nie jest zgodny ze standardami FAIR. Sugeruję dodanie metadanych w formacie JSON-LD oraz przygotowanie pliku README zgodnego z wytycznymi DataCite.',
      upvotes: 8,
      comments: 5
    },
    {
      id: 3,
      datasetId: 2,
      reviewer: 'Dr Piotr Kowalczyk',
      title: 'Wzorcowy zbiór danych klimatycznych',
      rating: 5,
      date: '2024-09-10',
      status: 'published',
      content: 'Doskonale przygotowany dataset z kompletnymi metadanymi, dokumentacją oraz skryptami do przetwarzania. Dane są wysokiej jakości i łatwe w użyciu. Idealny do badań zmian klimatu.',
      upvotes: 28,
      comments: 2
    }
  ]);

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

  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: 1,
      datasetId: 1,
      author: 'Piotr Zieliński',
      title: 'Dodanie checksumów MD5',
      type: 'improvement',
      description: 'Proponuję dodanie sum kontrolnych MD5 dla każdego pliku w zbiorze, aby umożliwić weryfikację integralności pobranych danych. To standard w repozytoriach naukowych.',
      date: '2024-09-18',
      upvotes: 15,
      status: 'open'
    },
    {
      id: 2,
      datasetId: 1,
      author: 'Katarzyna Nowacka',
      title: 'Błąd w nazewnictwie kolumn',
      type: 'error',
      description: 'W pliku "samples_batch2.csv" kolumna "temprature" powinna być "temperature". Literówka może powodować problemy przy automatycznym przetwarzaniu.',
      date: '2024-09-22',
      upvotes: 23,
      status: 'acknowledged'
    },
    {
      id: 3,
      datasetId: 1,
      author: 'Jan Nowicki',
      title: 'Brakujące informacje o licencji',
      type: 'improvement',
      description: 'Zbiór nie zawiera wyraźnej informacji o licencji. Sugeruję dodanie pliku LICENSE z jasnym określeniem warunków użytkowania (np. CC BY 4.0).',
      date: '2024-09-25',
      upvotes: 19,
      status: 'open'
    }
  ]);

  const handleAddComment = (reviewId) => {
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

  const handleAddSuggestion = (datasetId) => {
    if (newSuggestion.title.trim() && newSuggestion.description.trim()) {
      setSuggestions([...suggestions, {
        id: suggestions.length + 1,
        datasetId,
        author: 'Moje konto',
        title: newSuggestion.title,
        type: newSuggestion.type,
        description: newSuggestion.description,
        date: new Date().toISOString().split('T')[0],
        upvotes: 0,
        status: 'open'
      }]);
      setNewSuggestion({ title: '', description: '', type: 'improvement' });
    }
  };

  const handleAddReview = (datasetId) => {
    if (newReview.title.trim() && newReview.content.trim()) {
      setReviews([...reviews, {
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
      }]);
      setNewReview({ title: '', content: '', rating: 5, status: 'draft' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-indigo-900">
              <FileText className="inline w-8 h-8 mr-2" />
              DataReview - System Recenzji Zbiorów Danych
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setUserRole(userRole === 'user' ? 'reviewer' : 'user')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${userRole === 'reviewer'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700'
                  }`}
              >
                {userRole === 'reviewer' ? 'Tryb recenzenta' : 'Tryb użytkownika'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('datasets')}
              className={`py-4 px-2 font-semibold border-b-2 transition-colors ${activeTab === 'datasets'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
            >
              Zbiory danych
            </button>
            {selectedDataset && (
              <button
                onClick={() => setActiveTab('dataset-detail')}
                className={`py-4 px-2 font-semibold border-b-2 transition-colors ${activeTab === 'dataset-detail'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
              >
                Szczegóły zbioru
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'datasets' && (
          <div>
            {/* SEARCH INPUT */}
            <div className="mb-6 flex">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Szukaj zbioru danych..."
                className="bg-white px-4 py-2 border border-gray-300 rounded-lg w-full max-w-md"
              />
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <svg className="animate-spin h-8 w-8 text-indigo-600" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Dostępne zbiory danych</h2>
                {filteredDatasets.length === 0 ? (
                  <div className="text-gray-500">Brak wyników.</div>
                ) : (
                  filteredDatasets.map(dataset => (
                    <DatasetCard
                      key={dataset.id}
                      dataset={dataset}
                      setSelectedDataset={setSelectedDataset}
                      setActiveTab={setActiveTab}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'dataset-detail' && selectedDataset && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{selectedDataset.title}</h2>
                <p className="text-gray-600 mb-4">
                  <User className="inline w-4 h-4 mr-1" />
                  {selectedDataset.author} • {selectedDataset.date}
                </p>
                <p className="text-gray-700 mb-4">{selectedDataset.description}</p>
                <div className="flex gap-4">
                  <span className="flex items-center text-lg">
                    <Star className="w-5 h-5 mr-1 text-yellow-500" />
                    <strong>{selectedDataset.avgRating.toFixed(1)}</strong>/5
                  </span>
                  <span className="text-gray-600">
                    ({selectedDataset.reviews} recenzji)
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recenzje peer review</h3>

                {userRole === 'reviewer' && (
                  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <h4 className="font-bold text-gray-800 mb-3">Dodaj recenzję</h4>
                    <input
                      type="text"
                      placeholder="Tytuł recenzji"
                      value={newReview.title}
                      onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
                    />
                    <textarea
                      placeholder="Treść recenzji"
                      value={newReview.content}
                      onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 h-32"
                    />
                    <div className="flex gap-4 mb-3">
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Ocena</label>
                        <select
                          value={newReview.rating}
                          onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="5">5 - Doskonały</option>
                          <option value="4">4 - Bardzo dobry</option>
                          <option value="3">3 - Dobry</option>
                          <option value="2">2 - Dostateczny</option>
                          <option value="1">1 - Słaby</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                        <select
                          value={newReview.status}
                          onChange={(e) => setNewReview({ ...newReview, status: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="draft">Szkic</option>
                          <option value="published">Opublikuj</option>
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddReview(selectedDataset.id)}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Send className="inline w-4 h-4 mr-2" />
                      Dodaj recenzję
                    </button>
                  </div>
                )}

                {reviews
                  .filter(r => r.datasetId === selectedDataset.id)
                  .map(review => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      setSelectedReview={setSelectedReview} />
                  ))}
              </div>

              {selectedReview && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h4 className="font-bold text-gray-800 mb-4">
                    Komentarze do recenzji: "{selectedReview.title}"
                  </h4>

                  {comments
                    .filter(c => c.reviewId === selectedReview.id)
                    .map(comment => (
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
                      </div>
                    ))}

                  <div className="mt-4">
                    <textarea
                      placeholder="Dodaj komentarz..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                      rows="3"
                    />
                    <button
                      onClick={() => handleAddComment(selectedReview.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Send className="inline w-4 h-4 mr-2" />
                      Dodaj komentarz
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  <AlertCircle className="inline w-5 h-5 mr-2" />
                  Sugestie i zgłoszenia
                </h3>

                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">Zgłoś sugestię</h4>
                  <input
                    type="text"
                    placeholder="Tytuł"
                    value={newSuggestion.title}
                    onChange={(e) => setNewSuggestion({ ...newSuggestion, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 text-sm"
                  />
                  <select
                    value={newSuggestion.type}
                    onChange={(e) => setNewSuggestion({ ...newSuggestion, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 text-sm"
                  >
                    <option value="improvement">Usprawnienie</option>
                    <option value="error">Błąd</option>
                  </select>
                  <textarea
                    placeholder="Opis sugestii"
                    value={newSuggestion.description}
                    onChange={(e) => setNewSuggestion({ ...newSuggestion, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 text-sm"
                    rows={3}
                  />
                  <button
                    onClick={() => handleAddSuggestion(selectedDataset.id)}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <Edit3 className="inline w-4 h-4 mr-1" />
                    Wyślij sugestię
                  </button>
                </div>

                {suggestions
                  .filter(s => s.datasetId === selectedDataset.id)
                  .map(suggestion => (
                    <SuggestionCard key={suggestion.id} suggestion={suggestion} />
                  ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
