"use client";

import Link from "next/link";
import { lessons } from "@/data/lessons";
import { words } from "@/data/vocabulary";
import { sentences } from "@/data/sentences";
import { readings } from "@/data/readings";

export default function LessonsPage() {
  return (
    <div className="pt-8 pb-4">
      <div className="mb-6">
        <Link href="/" className="text-brand-600 text-sm font-medium mb-2 inline-block">&larr; Home</Link>
        <h1 className="text-2xl font-bold text-gray-900">Review Lessons</h1>
        <p className="text-gray-500 text-sm mt-1">Quiz yourself on vocabulary, sentences, and dialogues</p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => {
          const vocabCount = words.filter(
            (w) => lesson.vocabCategories.includes(w.category) || lesson.vocabIds.includes(w.id)
          ).length;
          const sentenceCount = sentences.filter((s) => lesson.sentenceTopics.includes(s.topic)).length;
          const readingCount = readings.filter((r) => lesson.readingSlugs.includes(r.slug)).length;

          return (
            <Link
              key={lesson.slug}
              href={`/lessons/${lesson.slug}`}
              className="block bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all active:scale-[0.99]"
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {lesson.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900">{lesson.title}</h3>
                    <p className="text-xs text-gray-500">{lesson.titleEn}</p>
                  </div>
                  <svg className="w-5 h-5 text-brand-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
                <div className="flex gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-brand-50 text-brand-600 font-semibold">
                    {vocabCount} words
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-violet-50 text-violet-600 font-semibold">
                    {sentenceCount} sentences
                  </span>
                  {readingCount > 0 && (
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 font-semibold">
                      {readingCount} dialogues
                    </span>
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2.5">
                <p className="text-white text-sm font-semibold text-center">Start Review</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
