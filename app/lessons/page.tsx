"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { lessons, type Lesson } from "@/data/lessons";
import { words } from "@/data/vocabulary";
import { sentences } from "@/data/sentences";
import { readings } from "@/data/readings";

function LessonCard({ lesson }: { lesson: Lesson }) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"expressions" | "vocab" | "dialogues" | "sentences" | "tips">("expressions");

  const lessonVocab = words.filter(
    (w) => lesson.vocabCategories.includes(w.category) || lesson.vocabIds.includes(w.id)
  );
  const lessonSentences = sentences.filter((s) => lesson.sentenceTopics.includes(s.topic));
  const lessonReadings = readings.filter((r) => lesson.readingSlugs.includes(r.slug));

  const tabs = [
    { key: "expressions" as const, label: "Expressions", count: lesson.expressions.length },
    { key: "vocab" as const, label: "Vocab", count: lessonVocab.length },
    { key: "dialogues" as const, label: "Dialogues", count: lessonReadings.length },
    { key: "sentences" as const, label: "Sentences", count: lessonSentences.length },
    { key: "tips" as const, label: "Tips", count: lesson.grammarTips.length },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-center gap-3 active:bg-gray-50 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
          {lesson.number}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-sm">{lesson.title}</h3>
          <p className="text-xs text-gray-500 truncate">{lesson.description}</p>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0 ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              {/* Tabs */}
              <div className="flex gap-1.5 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      activeTab === tab.key
                        ? "bg-brand-500 text-white"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[120px]">
                {/* Expressions Tab */}
                {activeTab === "expressions" && (
                  <div className="space-y-2">
                    {lesson.expressions.map((expr) => (
                      <div key={expr.id} className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-sm text-brand-700">{expr.id}</p>
                          <p className="text-xs text-gray-500 text-right">{expr.en}</p>
                        </div>
                        {expr.example && (
                          <div className="mt-1.5 pt-1.5 border-t border-gray-200">
                            <p className="text-xs text-gray-700 italic">{expr.example}</p>
                            <p className="text-xs text-gray-400">{expr.exampleEn}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Vocab Tab */}
                {activeTab === "vocab" && (
                  <div className="space-y-1">
                    {lessonVocab.map((w) => (
                      <div key={w.id} className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-gray-900">{w.id}</span>
                          {w.notes && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-brand-50 text-brand-600 rounded-full">{w.notes}</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{w.en}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Dialogues Tab */}
                {activeTab === "dialogues" && (
                  <div className="space-y-3">
                    {lessonReadings.length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-4">No dialogues for this lesson</p>
                    ) : (
                      lessonReadings.map((r) => (
                        <Link
                          key={r.slug}
                          href="/reading"
                          className="block bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-sm text-gray-900">{r.title}</p>
                              <p className="text-xs text-gray-500">{r.titleEn}</p>
                            </div>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              r.type === "dialogue"
                                ? "bg-brand-50 text-brand-600"
                                : "bg-violet-50 text-violet-600"
                            }`}>
                              {r.type}
                            </span>
                          </div>
                          {r.keyPhrases && r.keyPhrases.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {r.keyPhrases.slice(0, 3).map((kp) => (
                                <span key={kp.id} className="text-[10px] px-1.5 py-0.5 bg-white rounded-full text-gray-500">
                                  {kp.id}
                                </span>
                              ))}
                            </div>
                          )}
                        </Link>
                      ))
                    )}
                  </div>
                )}

                {/* Sentences Tab */}
                {activeTab === "sentences" && (
                  <div className="space-y-2">
                    {lessonSentences.slice(0, 15).map((s) => (
                      <SentenceItem key={s.id} sentence={s} />
                    ))}
                    {lessonSentences.length > 15 && (
                      <Link
                        href="/practice"
                        className="block text-center text-xs text-brand-600 font-semibold py-2 hover:underline"
                      >
                        +{lessonSentences.length - 15} more — Practice all
                      </Link>
                    )}
                  </div>
                )}

                {/* Tips Tab */}
                {activeTab === "tips" && (
                  <div className="space-y-2">
                    {lesson.grammarTips.map((tip) => (
                      <div key={tip.tip} className="bg-warm-50 rounded-xl p-3">
                        <p className="font-semibold text-sm text-warm-700">{tip.tip}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{tip.detail}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SentenceItem({ sentence }: { sentence: { id: string; en: string; difficulty: string; notes?: string } }) {
  const [showEn, setShowEn] = useState(false);

  return (
    <button
      onClick={() => setShowEn(!showEn)}
      className="w-full text-left bg-gray-50 rounded-xl p-3 active:bg-gray-100 transition-colors"
    >
      <p className="text-sm text-gray-900">{sentence.id}</p>
      {showEn && (
        <p className="text-xs text-gray-500 mt-1">{sentence.en}</p>
      )}
      {!showEn && (
        <p className="text-[10px] text-gray-400 mt-1">Tap to reveal</p>
      )}
    </button>
  );
}

export default function LessonsPage() {
  return (
    <div className="pt-8 pb-4">
      <div className="mb-6">
        <Link href="/" className="text-brand-600 text-sm font-medium mb-2 inline-block">&larr; Home</Link>
        <h1 className="text-2xl font-bold text-gray-900">Review Lessons</h1>
        <p className="text-gray-500 text-sm mt-1">Review vocabulary, expressions, and dialogues from each lesson</p>
      </div>

      <div className="space-y-3">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.slug} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
