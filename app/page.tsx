"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { words, categories } from "@/data/vocabulary";
import { sentences } from "@/data/sentences";
import { readings } from "@/data/readings";
import { lessons } from "@/data/lessons";
import { getStats } from "@/lib/srs";

const studyModes = [
  {
    href: "/learn",
    title: "Flashcards",
    description: "SRS-powered spaced repetition",
    color: "from-brand-500 to-brand-600",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    href: "/quiz",
    title: "Quiz",
    description: "Multiple choice & type answers",
    color: "from-warm-400 to-warm-500",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
    ),
  },
  {
    href: "/practice",
    title: "Sentences",
    description: "Translate full sentences both ways",
    color: "from-violet-400 to-violet-500",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  },
  {
    href: "/reading",
    title: "Reading",
    description: "Dialogues & reading passages",
    color: "from-rose-400 to-rose-500",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const [dueCount, setDueCount] = useState(0);
  const [learnedCount, setLearnedCount] = useState(0);

  useEffect(() => {
    const stats = getStats(words.map((w) => w.id));
    setDueCount(stats.dueCards);
    setLearnedCount(stats.learnedCards);
  }, []);

  return (
    <div className="pt-8 pb-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Bahasa Belajar</h1>
        <p className="text-gray-500 mt-1">Belajar Bahasa Indonesia</p>
      </div>

      {/* Review prompt */}
      {dueCount > 0 && (
        <Link
          href="/learn"
          className="block bg-gradient-to-r from-brand-600 to-brand-500 rounded-2xl p-4 mb-6 text-white shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
        >
          <p className="font-bold text-lg">{dueCount} cards due for review</p>
          <p className="text-sm opacity-80 mt-0.5">Tap to start your review session</p>
        </Link>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <p className="text-xl font-bold text-brand-600">{words.length}</p>
          <p className="text-[10px] text-gray-500">Words</p>
        </div>
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <p className="text-xl font-bold text-green-500">{learnedCount}</p>
          <p className="text-[10px] text-gray-500">Learned</p>
        </div>
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <p className="text-xl font-bold text-violet-500">{sentences.length}</p>
          <p className="text-[10px] text-gray-500">Sentences</p>
        </div>
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <p className="text-xl font-bold text-rose-500">{readings.length}</p>
          <p className="text-[10px] text-gray-500">Readings</p>
        </div>
      </div>

      {/* Study Modes */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Study</h2>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {studyModes.map((mode) => (
          <Link
            key={mode.href}
            href={mode.href}
            className={`bg-gradient-to-br ${mode.color} rounded-2xl p-5 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]`}
          >
            <div className="mb-3 opacity-90">{mode.icon}</div>
            <h3 className="font-bold text-base">{mode.title}</h3>
            <p className="text-[11px] opacity-80 mt-0.5 leading-tight">
              {mode.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Review Lessons */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Review Lessons</h2>
      <div className="space-y-2 mb-8">
        {lessons.map((lesson) => (
          <Link
            key={lesson.slug}
            href="/lessons"
            className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {lesson.number}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900">{lesson.title}</p>
              <p className="text-[11px] text-gray-500 truncate">{lesson.titleEn} — {lesson.description}</p>
            </div>
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        ))}
      </div>

      {/* Quick Tips */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Quick Tips</h2>
      <div className="space-y-2">
        {[
          { tip: 'Three types of "good"', detail: "bagus (things), baik (people), enak (food)" },
          { tip: "Location words", detail: "di (at/in), ke (to), dari (from)" },
          { tip: '"Sekali" = very', detail: "Comes AFTER adjective: mahal sekali" },
          { tip: "Sudah / Belum", detail: "already / not yet" },
        ].map((item) => (
          <div key={item.tip} className="bg-white rounded-xl p-3 shadow-sm">
            <p className="font-semibold text-sm text-brand-700">{item.tip}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
