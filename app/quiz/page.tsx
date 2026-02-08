"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { words, categories, categoryLabels, type Word } from "@/data/vocabulary";

type Direction = "id-to-en" | "en-to-id";
type QuizMode = "multiple-choice" | "type-answer";
type QuizQuestion = {
  prompt: string;
  correctAnswer: string;
  options: string[];
  word: Word;
};

function generateQuestion(pool: Word[], direction: Direction): QuizQuestion {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const correct = shuffled[0];
  const distractors = shuffled.slice(1, 4);
  const allOptions = [...distractors, correct].sort(() => Math.random() - 0.5);

  if (direction === "id-to-en") {
    return {
      prompt: correct.id,
      correctAnswer: correct.en,
      options: allOptions.map((w) => w.en),
      word: correct,
    };
  } else {
    return {
      prompt: correct.en,
      correctAnswer: correct.id,
      options: allOptions.map((w) => w.id),
      word: correct,
    };
  }
}

function normalizeAnswer(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[?.!,]/g, "")
    .replace(/\s+/g, " ");
}

function isCloseMatch(input: string, correct: string): boolean {
  const a = normalizeAnswer(input);
  const b = normalizeAnswer(correct);
  if (a === b) return true;

  // Check if it matches any part before "/" or "(" - e.g. "I (formal)" matches "I"
  const parts = b.split(/[/()]/);
  for (const part of parts) {
    if (normalizeAnswer(part) === a) return true;
  }

  // Simple Levenshtein for typo tolerance (1 char off for short words, 2 for longer)
  const maxDist = b.length <= 4 ? 1 : 2;
  return levenshtein(a, b) <= maxDist;
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

export default function QuizPage() {
  const [quizMode, setQuizMode] = useState<QuizMode>("multiple-choice");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [direction, setDirection] = useState<Direction>("id-to-en");
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [question, setQuestion] = useState<QuizQuestion | null>(null);

  // Type mode state
  const [typedAnswer, setTypedAnswer] = useState("");
  const [typeResult, setTypeResult] = useState<"correct" | "wrong" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pool =
    selectedCategory === "all"
      ? words
      : words.filter((w) => w.category === selectedCategory);

  const nextQuestion = useCallback(() => {
    if (pool.length < 4) return;
    setSelected(null);
    setTypedAnswer("");
    setTypeResult(null);
    setQuestion(generateQuestion(pool, direction));
    // Focus input in type mode
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [pool, direction]);

  useEffect(() => {
    if (pool.length >= 4) {
      nextQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, direction, quizMode]);

  const handleCorrect = () => {
    setScore((s) => s + 1);
    setStreak((s) => {
      const newStreak = s + 1;
      setBestStreak((b) => Math.max(b, newStreak));
      return newStreak;
    });
  };

  const handleWrong = () => {
    setStreak(0);
  };

  // Multiple choice handler
  const handleMCAnswer = (answer: string) => {
    if (selected) return;
    setSelected(answer);
    setTotal((t) => t + 1);

    if (answer === question?.correctAnswer) {
      handleCorrect();
      setTimeout(() => nextQuestion(), 800);
    } else {
      handleWrong();
    }
  };

  // Type answer handler
  const handleTypeSubmit = () => {
    if (!question || typeResult) return;
    setTotal((t) => t + 1);

    if (isCloseMatch(typedAnswer, question.correctAnswer)) {
      setTypeResult("correct");
      handleCorrect();
      setTimeout(() => nextQuestion(), 1000);
    } else {
      setTypeResult("wrong");
      handleWrong();
    }
  };

  const handleSkip = () => {
    setStreak(0);
    nextQuestion();
  };

  const resetQuiz = () => {
    setScore(0);
    setTotal(0);
    setStreak(0);
    setBestStreak(0);
    nextQuestion();
  };

  if (pool.length < 4) {
    return (
      <div className="pt-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz</h1>
        <p className="text-gray-500">
          Need at least 4 words in a category for quiz mode.
        </p>
        <button
          onClick={() => setSelectedCategory("all")}
          className="mt-4 text-brand-600 font-medium"
        >
          Use all words
        </button>
      </div>
    );
  }

  return (
    <div className="pt-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Quiz</h1>
        <button
          onClick={resetQuiz}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Quiz mode toggle */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setQuizMode("multiple-choice")}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
            quizMode === "multiple-choice"
              ? "bg-warm-500 text-white shadow-sm"
              : "bg-white text-gray-600"
          }`}
        >
          Multiple Choice
        </button>
        <button
          onClick={() => setQuizMode("type-answer")}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
            quizMode === "type-answer"
              ? "bg-warm-500 text-white shadow-sm"
              : "bg-white text-gray-600"
          }`}
        >
          Type Answer
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

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 -mx-4 px-4">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            selectedCategory === "all"
              ? "bg-gray-800 text-white shadow-sm"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          All
        </button>
        {categories.map((cat) => {
          const count = words.filter((w) => w.category === cat).length;
          if (count < 4) return null;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-gray-800 text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          );
        })}
      </div>

      {/* Score bar */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-3 mb-6 shadow-sm">
        <div className="text-center flex-1">
          <p className="text-lg font-bold text-brand-600">
            {score}/{total}
          </p>
          <p className="text-[10px] text-gray-400">Score</p>
        </div>
        <div className="w-px h-8 bg-gray-100" />
        <div className="text-center flex-1">
          <p className="text-lg font-bold text-warm-500">{streak}</p>
          <p className="text-[10px] text-gray-400">Streak</p>
        </div>
        <div className="w-px h-8 bg-gray-100" />
        <div className="text-center flex-1">
          <p className="text-lg font-bold text-rose-500">{bestStreak}</p>
          <p className="text-[10px] text-gray-400">Best</p>
        </div>
      </div>

      {question && (
        <>
          {/* Question prompt */}
          <div className="bg-white rounded-3xl p-6 shadow-sm mb-4 text-center border border-gray-100">
            <p className="text-xs text-gray-400 mb-2">
              {direction === "id-to-en"
                ? "What does this mean?"
                : "How do you say this?"}
            </p>
            <p className="text-2xl font-bold text-gray-900">{question.prompt}</p>
            <p className="text-[10px] text-gray-300 mt-2">
              {categoryLabels[question.word.category]}
            </p>
          </div>

          {/* Multiple Choice Options */}
          {quizMode === "multiple-choice" && (
            <div className="grid grid-cols-1 gap-2">
              {question.options.map((option) => {
                const isCorrect = option === question.correctAnswer;
                const isSelected = option === selected;
                let bg = "bg-white hover:bg-gray-50 border-gray-100";
                if (selected) {
                  if (isCorrect)
                    bg = "bg-green-50 border-green-400 text-green-800";
                  else if (isSelected)
                    bg = "bg-red-50 border-red-400 text-red-800";
                  else bg = "bg-white border-gray-100 opacity-50";
                }

                return (
                  <motion.button
                    key={option}
                    onClick={() => handleMCAnswer(option)}
                    disabled={!!selected}
                    whileTap={!selected ? { scale: 0.98 } : undefined}
                    className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 font-medium text-sm transition-all ${bg}`}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Type Answer Input */}
          {quizMode === "type-answer" && (
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleTypeSubmit();
                }}
              >
                <div
                  className={`relative rounded-2xl border-2 overflow-hidden transition-all ${
                    typeResult === "correct"
                      ? "border-green-400 bg-green-50"
                      : typeResult === "wrong"
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-white focus-within:border-brand-400"
                  }`}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    disabled={!!typeResult}
                    placeholder={
                      direction === "id-to-en"
                        ? "Type the English translation..."
                        : "Ketik terjemahan Indonesia..."
                    }
                    autoComplete="off"
                    autoCapitalize="off"
                    className="w-full px-4 py-4 bg-transparent text-base font-medium focus:outline-none disabled:text-gray-600"
                  />
                </div>

                {!typeResult && (
                  <div className="flex gap-2 mt-3">
                    <button
                      type="submit"
                      disabled={!typedAnswer.trim()}
                      className="flex-1 py-3 rounded-2xl bg-brand-600 text-white font-semibold text-sm disabled:opacity-40 hover:bg-brand-700 active:scale-[0.98] transition-all"
                    >
                      Check
                    </button>
                    <button
                      type="button"
                      onClick={handleSkip}
                      className="px-4 py-3 rounded-2xl bg-white border-2 border-gray-200 text-gray-500 font-semibold text-sm hover:bg-gray-50 active:scale-[0.98] transition-all"
                    >
                      Skip
                    </button>
                  </div>
                )}
              </form>

              {/* Type result feedback */}
              {typeResult === "correct" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-center"
                >
                  <p className="text-green-600 font-semibold">Correct!</p>
                </motion.div>
              )}

              {typeResult === "wrong" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-center"
                >
                  <p className="text-sm text-gray-500 mb-1">
                    Correct answer:{" "}
                    <span className="font-bold text-green-700">
                      {question.correctAnswer}
                    </span>
                  </p>
                  {question.word.notes && (
                    <p className="text-xs text-gray-400">
                      {question.word.notes}
                    </p>
                  )}
                  <button
                    onClick={nextQuestion}
                    className="mt-3 bg-brand-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-brand-700 active:scale-95 transition-all"
                  >
                    Next
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {/* MC wrong answer: show correct + next button */}
          {quizMode === "multiple-choice" &&
            selected &&
            selected !== question.correctAnswer && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Correct answer:{" "}
                  <span className="font-semibold text-green-700">
                    {question.correctAnswer}
                  </span>
                  {question.word.notes && (
                    <span className="text-gray-400">
                      {" "}
                      &middot; {question.word.notes}
                    </span>
                  )}
                </p>
                <button
                  onClick={nextQuestion}
                  className="bg-brand-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-brand-700 active:scale-95 transition-all"
                >
                  Next
                </button>
              </div>
            )}
        </>
      )}
    </div>
  );
}
