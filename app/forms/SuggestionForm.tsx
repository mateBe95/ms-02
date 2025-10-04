import { AlertCircle, Edit3 } from "lucide-react";
import React from 'react';
import { SuggestionCard } from "~/components/SuggestionCard/SuggestionCard";

type NewSuggestion = {
    title: string;
    description: string;
    type: 'improvement' | 'error';
};

const SuggestionForm = ({ selectedDataset, newSuggestion, setNewSuggestion, handleAddSuggestion }
    : { newSuggestion: NewSuggestion, setNewSuggestion: any, handleAddSuggestion: any, selectedDataset: any }) => {
    return (
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
        </div>
    );
};

export default SuggestionForm;