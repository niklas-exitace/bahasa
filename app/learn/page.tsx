"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  words,
  categories,
  categoryLabels,
  shuffleWords,
  type Word,
} from "@/data/vocabulary";
import {
  gradeCard,
  getDueWordIds,
  getNewWordIds,
  getStats,
  loadProgress,
  type Grade,
} from "@/lib/srs";

type Mode = "review" | "browse";

export default function LearnPage() {
  const [mode, setMode] = useState<Mode>("review");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [deck, setDeck] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, correct: 0, wrong: 0 });
  const [srsStats, setSrsStats] = useState({ due: 0, new_: 0, learned: 0 });

  const allIds = words.map((w) => w.id);

  // Refresh SRS stats
  const refreshStats = useCallback(() => {
    const stats = getStats(allIds);
    setSrsStats({
      due: stats.dueCards,
      new_: stats.newCards,
      learned: stats.learnedCards,
    });
  }, []);

  // Build the review deck: due cards first, then some new cards
  const buildReviewDeck = useCallback(() => {
    const pool =
      selectedCategory === "all"
        ? words
        : words.filter((w) => w.category === selectedCategory);
    const poolIds = pool.map((w) => w.id);

    const dueIds = getDueWordIds(poolIds);
    const newIds = getNewWordIds(poolIds);

    // Take all due cards + up to 10 new cards
    const reviewIds = new Set([...dueIds, ...newIds.slice(0, 10)]);
    const reviewWords = pool.filter((w) => reviewIds.has(w.id));

    setDeck(shuffleWords(reviewWords));
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionStats({ reviewed: 0, correct: 0, wrong: 0 });
    refreshStats();
  }, [selectedCategory, refreshStats]);

  // Build browse deck (all words, no SRS)
  const buildBrowseDeck = useCallback(() => {
    const filtered =
      selectedCategory === "all"
        ? words
        : words.filter((w) => w.category === selectedCategory);
    setDeck(shuffleWords(filtered));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedCategory]);

  // Init and rebuild on mode/category change
  useEffect(() => {
    if (mode === "review") {
      buildReviewDeck();
    } else {
      buildBrowseDeck();
    }
  }, [mode, selectedCategory, buildReviewDeck, buildBrowseDeck]);

  // Initial stats load
  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
  };

  const handleGrade = (grade: Grade) => {
    const currentWord = deck[currentIndex];
    if (!currentWord) return;

    gradeCard(currentWord.id, grade);

    setSessionStats((s) => ({
      reviewed: s.reviewed + 1,
      correct: s.correct + (grade !== "again" ? 1 : 0),
      wrong: s.wrong + (grade === "again" ? 1 : 0),
    }));

    // If wrong, put the card back near the end of the deck
    if (grade === "again") {
      const reinsertPos = Math.min(
        currentIndex + 3 + Math.floor(Math.random() * 3),
        deck.length
      );
      const newDeck = [...deck];
      const [card] = newDeck.splice(currentIndex, 1);
      newDeck.splice(reinsertPos, 0, card);
      setDeck(newDeck);
      setIsFlipped(false);
      setDirection(1);
      // Don't increment index since we removed current card
    } else {
      // Move to next card
      setIsFlipped(false);
      setDirection(1);
      setCurrentIndex((i) => i + 1);
    }

    refreshStats();
  };

  const goNext = () => {
    if (currentIndex < deck.length - 1) {
      setDirection(1);
      setIsFlipped(false);
      setCurrentIndex((i) => i + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setIsFlipped(false);
      setCurrentIndex((i) => i - 1);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setIsFlipped((f) => !f);
      } else if (mode === "browse") {
        if (e.key === "ArrowRight") goNext();
        else if (e.key === "ArrowLeft") goPrev();
      } else if (mode === "review" && isFlipped) {
        if (e.key === "1") handleGrade("again");
        else if (e.key === "2") handleGrade("good");
        else if (e.key === "3") handleGrade("easy");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, deck.length, mode, isFlipped]);

  const currentWord = deck[currentIndex];
  const progress = currentWord ? loadProgress()[currentWord.id] : null;
  const isSessionDone = mode === "review" && currentIndex >= deck.length;

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Learn</h1>

      {/* Mode toggle */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setMode("review")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            mode === "review"
              ? "bg-brand-600 text-white shadow-sm"
              : "bg-white text-gray-600"
          }`}
        >
          Review{srsStats.due > 0 ? ` (${srsStats.due} due)` : ""}
        </button>
        <button
          onClick={() => setMode("browse")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            mode === "browse"
              ? "bg-brand-600 text-white shadow-sm"
              : "bg-white text-gray-600"
          }`}
        >
          Browse all
        </button>
      </div>

      {/* SRS stats bar (review mode) */}
      {mode === "review" && (
        <div className="flex items-center justify-between bg-white rounded-2xl p-3 mb-3 shadow-sm">
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-blue-500">{srsStats.due}</p>
            <p className="text-[10px] text-gray-400">Due</p>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-green-500">{srsStats.learned}</p>
            <p className="text-[10px] text-gray-400">Learned</p>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-gray-400">{srsStats.new_}</p>
            <p className="text-[10px] text-gray-400">New</p>
          </div>
        </div>
      )}

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 -mx-4 px-4">
        <button
          onClick={() => handleCategoryChange("all")}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            selectedCategory === "all"
              ? "bg-brand-600 text-white shadow-sm"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          All ({words.length})
        </button>
        {categories.map((cat) => {
          const count = words.filter((w) => w.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {categoryLabels[cat]} ({count})
            </button>
          );
        })}
      </div>

      {/* Session done state */}
      {isSessionDone && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <p className="text-2xl font-bold text-gray-900 mb-2">Session complete!</p>
            <p className="text-sm text-gray-500 mb-6">
              {sessionStats.reviewed === 0
                ? "No cards to review right now. Come back later or browse all cards."
                : `You reviewed ${sessionStats.reviewed} cards.`}
            </p>
            {sessionStats.reviewed > 0 && (
              <div className="flex justify-center gap-8 mb-6">
                <div>
                  <p className="text-3xl font-bold text-green-500">{sessionStats.correct}</p>
                  <p className="text-xs text-gray-400">Correct</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-400">{sessionStats.wrong}</p>
                  <p className="text-xs text-gray-400">Again</p>
                </div>
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={buildReviewDeck}
                className="flex-1 bg-brand-600 text-white py-3 rounded-2xl font-semibold text-sm hover:bg-brand-700 active:scale-95 transition-all"
              >
                Review again
              </button>
              <button
                onClick={() => setMode("browse")}
                className="flex-1 bg-white border-2 border-gray-200 text-gray-600 py-3 rounded-2xl font-semibold text-sm hover:bg-gray-50 active:scale-95 transition-all"
              >
                Browse all
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Card */}
      {!isSessionDone && deck.length > 0 && currentWord && (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              {currentIndex + 1} / {deck.length}
            </span>
            {mode === "review" && sessionStats.reviewed > 0 && (
              <span className="text-xs text-gray-400">
                {sessionStats.correct}/{sessionStats.reviewed} correct
              </span>
            )}
            {mode === "browse" && (
              <button
                onClick={() =>
                  mode === "browse" ? buildBrowseDeck() : buildReviewDeck()
                }
                className="text-sm text-brand-600 font-medium hover:text-brand-700 transition-colors"
              >
                Shuffle
              </button>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-gray-200 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-brand-500 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / deck.length) * 100}%`,
              }}
            />
          </div>

          {/* Flashcard */}
          <div className="flex justify-center mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentIndex}-${currentWord.id}`}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-sm"
              >
                <div
                  className="perspective cursor-pointer"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <motion.div
                    className="relative w-full h-56 preserve-3d"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    {/* Front - Indonesian */}
                    <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-lg flex flex-col items-center justify-center p-6 border border-gray-100">
                      <span className="text-[10px] uppercase tracking-wider text-brand-500 font-semibold mb-3">
                        {categoryLabels[currentWord.category]}
                      </span>
                      <span className="text-3xl font-bold text-gray-900 text-center leading-tight">
                        {currentWord.id}
                      </span>
                      {/* SRS status indicator */}
                      {mode === "review" && progress && (
                        <span className="text-[10px] text-gray-300 mt-3">
                          {progress.repetitions === 0
                            ? "Learning"
                            : progress.interval >= 21
                            ? "Mature"
                            : `Interval: ${progress.interval}d`}
                        </span>
                      )}
                      {mode === "review" && !progress && (
                        <span className="text-[10px] text-blue-400 mt-3 font-medium">
                          New card
                        </span>
                      )}
                      <span className="text-xs text-gray-300 mt-2">
                        tap to flip
                      </span>
                    </div>

                    {/* Back - English */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl shadow-lg flex flex-col items-center justify-center p-6">
                      <span className="text-[10px] uppercase tracking-wider text-brand-200 font-semibold mb-3">
                        English
                      </span>
                      <span className="text-3xl font-bold text-white text-center leading-tight">
                        {currentWord.en}
                      </span>
                      {currentWord.notes && (
                        <span className="text-sm text-brand-200 mt-3 text-center">
                          {currentWord.notes}
                        </span>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Grade buttons (review mode, after flip) */}
          {mode === "review" && isFlipped && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2"
            >
              <button
                onClick={() => handleGrade("again")}
                className="flex-1 py-3.5 rounded-2xl bg-red-50 border-2 border-red-200 text-red-600 font-semibold text-sm hover:bg-red-100 active:scale-[0.98] transition-all"
              >
                Again
                <span className="block text-[10px] font-normal text-red-400">
                  see it again
                </span>
              </button>
              <button
                onClick={() => handleGrade("good")}
                className="flex-1 py-3.5 rounded-2xl bg-green-50 border-2 border-green-200 text-green-600 font-semibold text-sm hover:bg-green-100 active:scale-[0.98] transition-all"
              >
                Good
                <span className="block text-[10px] font-normal text-green-400">
                  {!progress || progress.repetitions === 0 ? "1 day" : `${Math.round((progress?.interval || 1) * (progress?.ease || 2.5))}d`}
                </span>
              </button>
              <button
                onClick={() => handleGrade("easy")}
                className="flex-1 py-3.5 rounded-2xl bg-blue-50 border-2 border-blue-200 text-blue-600 font-semibold text-sm hover:bg-blue-100 active:scale-[0.98] transition-all"
              >
                Easy
                <span className="block text-[10px] font-normal text-blue-400">
                  {!progress || progress.repetitions === 0 ? "3 days" : `${Math.round((progress?.interval || 1) * (progress?.ease || 2.5) * 1.3)}d`}
                </span>
              </button>
            </motion.div>
          )}

          {/* Browse mode navigation */}
          {mode === "browse" && (
            <div className="flex justify-center gap-4">
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="w-14 h-14 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 active:scale-95 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={goNext}
                disabled={currentIndex === deck.length - 1}
                className="w-14 h-14 rounded-full bg-brand-600 shadow-md flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-700 active:scale-95 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          )}

          {/* Keyboard hint */}
          <p className="text-center text-[10px] text-gray-300 mt-6">
            {mode === "review"
              ? "Space to flip \u00b7 1 again \u00b7 2 good \u00b7 3 easy"
              : "Space to flip \u00b7 Arrows to navigate"}
          </p>
        </>
      )}

      {/* Empty deck state */}
      {!isSessionDone && deck.length === 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-4">No cards to review in this category.</p>
          <button
            onClick={() => setMode("browse")}
            className="text-brand-600 font-medium"
          >
            Browse all cards instead
          </button>
        </div>
      )}
    </div>
  );
}
