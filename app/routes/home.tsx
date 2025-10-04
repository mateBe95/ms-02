import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import { FileText, User, Star, Send, Edit3 } from 'lucide-react';
import { DatasetCard } from "~/components/DatasetCard/DatasetCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ReviewCard } from "~/components/ReviewCard/ReviewCard";
import { SuggestionsSection } from "~/containers/suggestions/SuggestionsSection";
import ReviewForm from "~/forms/ReviewForm";
import ReviewsSection from "~/containers/reviews/ReviewsSection";
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

export default function Home() {
	const [activeTab, setActiveTab] = useState('datasets');
	const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
	const [userRole, setUserRole] = useState('user');
	const [search, setSearch] = useState("");

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

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<header className="bg-white shadow-md">
				<div className="max-w-7xl mx-auto px-4 py-6">
					<div className="flex justify-between items-center">
						<h1 className="text-3xl font-bold text-indigo-900">
							<FileText className="inline w-8 h-8 mr-2" />
							Podsystem ewaluacyjny PWNiB
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
								<ReviewsSection userRole={userRole} selectedDataset={selectedDataset}/>
							</div>
						</div>

						<div className="lg:col-span-1">
							<SuggestionsSection selectedDataset={selectedDataset} />
						</div>
					</div>
				)}
			</main>
		</div>
	);
};
