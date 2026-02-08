"use client";

import { useState } from "react";
import { words, categories, categoryLabels } from "@/data/vocabulary";
import { phrases } from "@/data/vocabulary";

export default function VocabularyPage() {
  const [search, setSearch] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories)
  );

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const filteredWords = search.trim()
    ? words.filter(
        (w) =>
          w.id.toLowerCase().includes(search.toLowerCase()) ||
          w.en.toLowerCase().includes(search.toLowerCase())
      )
    : words;

  const groupedWords = categories
    .map((cat) => ({
      category: cat,
      label: categoryLabels[cat],
      words: filteredWords.filter((w) => w.category === cat),
    }))
    .filter((g) => g.words.length > 0);

  const phraseContexts = ["shopping", "restaurant", "daily"] as const;
  const phraseLabels: Record<string, string> = {
    shopping: "Shopping",
    restaurant: "Restaurant",
    daily: "Daily Conversation",
  };

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Vocabulary</h1>

      {/* Search */}
      <div className="relative mb-4">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search words..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Word count */}
      <p className="text-xs text-gray-400 mb-4">
        {filteredWords.length} {filteredWords.length === 1 ? "word" : "words"}
        {search && ` matching "${search}"`}
      </p>

      {/* Word list grouped by category */}
      <div className="space-y-2">
        {groupedWords.map((group) => (
          <div key={group.category} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button
              onClick={() => toggleCategory(group.category)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-gray-800">
                  {group.label}
                </span>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {group.words.length}
                </span>
              </div>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  expandedCategories.has(group.category) ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {expandedCategories.has(group.category) && (
              <div className="border-t border-gray-50">
                {group.words.map((word, i) => (
                  <div
                    key={word.id}
                    className={`px-4 py-2.5 flex items-start justify-between ${
                      i > 0 ? "border-t border-gray-50" : ""
                    }`}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{word.id}</p>
                      <p className="text-xs text-gray-500">{word.en}</p>
                    </div>
                    {word.notes && (
                      <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full ml-2 shrink-0">
                        {word.notes}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Useful Phrases section */}
      {!search && (
        <>
          <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-3">
            Useful Phrases
          </h2>
          <div className="space-y-2">
            {phraseContexts.map((ctx) => {
              const contextPhrases = phrases.filter((p) => p.context === ctx);
              return (
                <div key={ctx} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-50">
                    <span className="font-semibold text-sm text-warm-600">
                      {phraseLabels[ctx]}
                    </span>
                  </div>
                  {contextPhrases.map((phrase, i) => (
                    <div
                      key={phrase.id}
                      className={`px-4 py-2.5 ${i > 0 ? "border-t border-gray-50" : ""}`}
                    >
                      <p className="font-medium text-sm text-gray-900">{phrase.id}</p>
                      <p className="text-xs text-gray-500">{phrase.en}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
