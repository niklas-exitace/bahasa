"use client";

import { useState } from "react";
import { readings, type Reading } from "@/data/readings";

function ReadingCard({ reading }: { reading: Reading }) {
  const [expanded, setExpanded] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => {
          setExpanded(!expanded);
          if (expanded) setShowAnswers(false);
        }}
        className="w-full text-left px-4 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${
                  reading.type === "dialogue"
                    ? "bg-brand-100 text-brand-700"
                    : "bg-warm-100 text-warm-600"
                }`}
              >
                {reading.type}
              </span>
            </div>
            <h3 className="font-bold text-base text-gray-900 mt-1">
              {reading.title}
            </h3>
            <p className="text-xs text-gray-400">{reading.titleEn}</p>
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0 ${
              expanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-50 px-4 py-4">
          {/* Vocab preview */}
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
              Vocabulary Preview
            </p>
            <div className="flex flex-wrap gap-1.5">
              {reading.vocabPreview.map((word) => (
                <span
                  key={word}
                  className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full font-medium"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="mb-4">
            {reading.type === "dialogue" && reading.lines ? (
              <div className="space-y-2">
                {reading.lines.map((line, i) => (
                  <div key={i} className="flex gap-2">
                    <span
                      className={`text-xs font-bold shrink-0 w-16 text-right pt-0.5 ${
                        line.speaker === "Narrator"
                          ? "text-gray-400 italic"
                          : line.speaker === "Pembeli"
                          ? "text-brand-600"
                          : line.speaker === "Pelayan" || line.speaker === "Penjual"
                          ? "text-warm-600"
                          : "text-gray-600"
                      }`}
                    >
                      {line.speaker}
                    </span>
                    <p
                      className={`text-sm leading-relaxed ${
                        line.speaker === "Narrator"
                          ? "text-gray-400 italic"
                          : "text-gray-800"
                      }`}
                    >
                      {line.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : reading.paragraphs ? (
              <div className="space-y-3">
                {reading.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm text-gray-800 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ) : null}
          </div>

          {/* Key phrases */}
          {reading.keyPhrases && (
            <div className="mb-4 bg-warm-50 rounded-xl p-3">
              <p className="text-[10px] uppercase tracking-wider text-warm-600 font-semibold mb-2">
                Key Phrases
              </p>
              {reading.keyPhrases.map((kp) => (
                <div key={kp.id} className="flex justify-between items-start py-1">
                  <span className="text-sm font-medium text-gray-800">{kp.id}</span>
                  <span className="text-xs text-gray-500 ml-2">{kp.en}</span>
                </div>
              ))}
            </div>
          )}

          {/* Questions */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                Comprehension Questions
              </p>
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                className="text-[10px] text-brand-600 font-semibold"
              >
                {showAnswers ? "Hide English" : "Show English"}
              </button>
            </div>
            <div className="space-y-2">
              {reading.questions.map((q, i) => (
                <div
                  key={q.id}
                  className="bg-gray-50 rounded-xl px-3 py-2.5"
                >
                  <p className="text-sm font-medium text-gray-800">
                    {i + 1}. {q.id}
                  </p>
                  {showAnswers && (
                    <p className="text-xs text-gray-400 mt-0.5 italic">
                      {q.en}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ReadingPage() {
  const dialogues = readings.filter((r) => r.type === "dialogue");
  const passages = readings.filter((r) => r.type === "passage");

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Reading Practice</h1>
      <p className="text-sm text-gray-400 mb-6">
        Tap to expand. Read the Indonesian text, then check comprehension.
      </p>

      {/* Dialogues */}
      <h2 className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">
        Dialogues
      </h2>
      <div className="space-y-3 mb-8">
        {dialogues.map((r) => (
          <ReadingCard key={r.slug} reading={r} />
        ))}
      </div>

      {/* Passages */}
      <h2 className="text-sm font-semibold text-warm-600 uppercase tracking-wider mb-2">
        Reading Passages
      </h2>
      <div className="space-y-3">
        {passages.map((r) => (
          <ReadingCard key={r.slug} reading={r} />
        ))}
      </div>
    </div>
  );
}
