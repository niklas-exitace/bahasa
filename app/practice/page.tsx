"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  sentences,
  shuffleSentences,
  difficultyLabels,
  topicLabels,
  type Sentence,
} from "@/data/sentences";

type Direction = "id-to-en" | "en-to-id";

export default function PracticePage() {
  const [direction, setDirection] = useState<Direction>("id-to-en");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [deck, setDeck] = useState<Sentence[]>(() => shuffleSentences(sentences));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState({ got: 0, missed: 0 });

  const topics = Array.from(new Set(sentences.map((s) => s.topic)));
  const difficulties = Array.from(new Set(sentences.map((s) => s.difficulty)));

  const rebuildDeck = useCallback(
    (diff: string, topic: string) => {
      let filtered = sentences;
      if (diff !== "all") filtered = filtered.filter((s) => s.difficulty === diff);
      if (topic !== "all") filtered = filtered.filter((s) => s.topic === topic);
      setDeck(shuffleSentences(filtered));
      setCurrentIndex(0);
      setRevealed(false);
    },
    []
  );

  const handleDifficultyChange = (d: string) => {
    setSelectedDifficulty(d);
    rebuildDeck(d, selectedTopic);
  };

  const handleTopicChange = (t: string) => {
    setSelectedTopic(t);
    rebuildDeck(selectedDifficulty, t);
  };

  const handleShuffle = () => {
    rebuildDeck(selectedDifficulty, selectedTopic);
    setStats({ got: 0, missed: 0 });
  };

  const advance = (gotIt: boolean) => {
    setStats((s) => ({
      got: s.got + (gotIt ? 1 : 0),
      missed: s.missed + (gotIt ? 0 : 1),
    }));
    setRevealed(false);
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (!revealed) {
          setRevealed(true);
        }
      } else if (e.key === "ArrowRight" && revealed) {
        advance(true);
      } else if (e.key === "ArrowLeft" && revealed) {
        advance(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed, currentIndex, deck.length]);

  const current = deck[currentIndex];
  const prompt = current
    ? direction === "id-to-en"
      ? current.id
      : current.en
    : "";
  const answer = current
    ? direction === "id-to-en"
      ? current.en
      : current.id
    : "";
  const isFinished = currentIndex === deck.length - 1 && revealed;

  if (deck.length === 0) {
    return (
      <div className="pt-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Practice</h1>
        <p className="text-gray-500">No sentences match your filters.</p>
        <button
          onClick={() => {
            setSelectedDifficulty("all");
            setSelectedTopic("all");
            rebuildDeck("all", "all");
          }}
          className="mt-4 text-brand-600 font-medium"
        >
          Reset filters
        </button>
      </div>
    );
  }

  return (
    <div className="pt-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Practice</h1>
        <button
          onClick={handleShuffle}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Restart
        </button>
      </div>

      {/* Direction toggle */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setDirection("id-to-en")}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
            direction === "id-to-en"
              ? "bg-brand-600 text-white shadow-sm"
              : "bg-white text-gray-600"
          }`}
        >
          Indonesian → English
        </button>
        <button
          onClick={() => setDirection("en-to-id")}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
            direction === "en-to-id"
              ? "bg-brand-600 text-white shadow-sm"
              : "bg-white text-gray-600"
          }`}
        >
          English → Indonesian
        </button>
      </div>

      {/* Difficulty filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
        <button
          onClick={() => handleDifficultyChange("all")}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            selectedDifficulty === "all"
              ? "bg-warm-500 text-white shadow-sm"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          All levels
        </button>
        {difficulties.map((d) => (
          <button
            key={d}
            onClick={() => handleDifficultyChange(d)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedDifficulty === d
                ? "bg-warm-500 text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {difficultyLabels[d]}
          </button>
        ))}
      </div>

      {/* Topic filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 -mx-4 px-4">
        <button
          onClick={() => handleTopicChange("all")}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            selectedTopic === "all"
              ? "bg-brand-600 text-white shadow-sm"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          All topics
        </button>
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => handleTopicChange(t)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedTopic === t
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {topicLabels[t]}
          </button>
        ))}
      </div>

      {/* Progress + stats */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">
          {currentIndex + 1} / {deck.length}
        </span>
        <div className="flex gap-3 text-sm">
          <span className="text-green-600 font-medium">{stats.got} got it</span>
          <span className="text-red-400 font-medium">{stats.missed} missed</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-brand-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / deck.length) * 100}%` }}
        />
      </div>

      {/* Sentence card */}
      {current && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer"
              onClick={() => !revealed && setRevealed(true)}
            >
              {/* Prompt */}
              <div className="p-6 text-center">
                <div className="flex justify-center gap-2 mb-3">
                  <span
                    className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${
                      current.difficulty === "beginner"
                        ? "bg-green-100 text-green-700"
                        : current.difficulty === "elementary"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {difficultyLabels[current.difficulty]}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                    {topicLabels[current.topic]}
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-900 leading-relaxed">
                  {prompt}
                </p>
                {!revealed && (
                  <p className="text-xs text-gray-300 mt-4">
                    Think of the translation, then tap to reveal
                  </p>
                )}
              </div>

              {/* Answer (revealed) */}
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-100 bg-brand-50 p-6 text-center"
                >
                  <p className="text-lg font-bold text-brand-800 leading-relaxed">
                    {answer}
                  </p>
                  {current.notes && (
                    <p className="text-xs text-brand-500 mt-2">{current.notes}</p>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Action buttons */}
      {revealed && !isFinished && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 mt-6"
        >
          <button
            onClick={() => advance(false)}
            className="flex-1 py-3.5 rounded-2xl bg-white border-2 border-red-200 text-red-500 font-semibold text-sm hover:bg-red-50 active:scale-[0.98] transition-all"
          >
            Need practice
          </button>
          <button
            onClick={() => advance(true)}
            className="flex-1 py-3.5 rounded-2xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 active:scale-[0.98] transition-all shadow-sm"
          >
            Got it!
          </button>
        </motion.div>
      )}

      {/* Finished state */}
      {isFinished && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-lg font-bold text-gray-900 mb-2">Session complete!</p>
            <div className="flex justify-center gap-6 mb-4">
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.got}</p>
                <p className="text-xs text-gray-400">Got it</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-400">{stats.missed}</p>
                <p className="text-xs text-gray-400">Need practice</p>
              </div>
            </div>
            <button
              onClick={handleShuffle}
              className="bg-brand-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-brand-700 active:scale-95 transition-all"
            >
              Practice again
            </button>
          </div>
        </motion.div>
      )}

      {/* Keyboard hint */}
      <p className="text-center text-[10px] text-gray-300 mt-6">
        Space to reveal &middot; → got it &middot; ← need practice
      </p>
    </div>
  );
}
