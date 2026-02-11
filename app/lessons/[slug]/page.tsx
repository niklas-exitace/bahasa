"use client";

import { useState, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { lessons } from "@/data/lessons";
import { words, type Word } from "@/data/vocabulary";
import { sentences, type Sentence } from "@/data/sentences";
import { readings, type Reading, type DialogueLine } from "@/data/readings";

// ─── Types ───

type QuizQuestion = {
  prompt: string;
  correct: string;
  options: string[];
  direction: "id-to-en" | "en-to-id";
  hint?: string;
};

type Stage = "intro" | "vocab" | "stage-transition" | "sentences" | "reading" | "complete";

// ─── Helpers ───

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickDistractors(correct: string, pool: string[], count: number): string[] {
  const filtered = pool.filter((x) => x !== correct);
  return shuffle(filtered).slice(0, count);
}

function buildVocabQuestions(lessonVocab: Word[], allWords: Word[], count: number): QuizQuestion[] {
  const picked = shuffle(lessonVocab).slice(0, count);
  const allEn = Array.from(new Set(allWords.map((w) => w.en)));
  const allId = Array.from(new Set(allWords.map((w) => w.id)));

  return picked.map((w, i) => {
    const direction = i % 2 === 0 ? "id-to-en" : "en-to-id";
    if (direction === "id-to-en") {
      const distractors = pickDistractors(w.en, allEn, 3);
      return {
        prompt: w.id,
        correct: w.en,
        options: shuffle([w.en, ...distractors]),
        direction,
        hint: w.notes || undefined,
      };
    } else {
      const distractors = pickDistractors(w.id, allId, 3);
      return {
        prompt: w.en,
        correct: w.id,
        options: shuffle([w.id, ...distractors]),
        direction,
        hint: w.notes || undefined,
      };
    }
  });
}

function buildSentenceQuestions(lessonSentences: Sentence[], allSentences: Sentence[], count: number): QuizQuestion[] {
  const picked = shuffle(lessonSentences).slice(0, count);
  const allEn = Array.from(new Set(allSentences.map((s) => s.en)));
  const allId = Array.from(new Set(allSentences.map((s) => s.id)));

  return picked.map((s, i) => {
    const direction = i % 2 === 0 ? "id-to-en" : "en-to-id";
    if (direction === "id-to-en") {
      const distractors = pickDistractors(s.en, allEn, 3);
      return {
        prompt: s.id,
        correct: s.en,
        options: shuffle([s.en, ...distractors]),
        direction,
        hint: s.notes || undefined,
      };
    } else {
      const distractors = pickDistractors(s.id, allId, 3);
      return {
        prompt: s.en,
        correct: s.id,
        options: shuffle([s.id, ...distractors]),
        direction,
        hint: s.notes || undefined,
      };
    }
  });
}

// ─── Components ───

function ProgressBar({ current, total, stage }: { current: number; total: number; stage: string }) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{stage}</span>
        <span className="text-xs font-semibold text-gray-400">{current}/{total}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-400 to-brand-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

function QuizCard({
  question,
  onAnswer,
  questionNumber,
}: {
  question: QuizQuestion;
  onAnswer: (correct: boolean) => void;
  questionNumber: number;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    const isCorrect = option === question.correct;
    setTimeout(() => onAnswer(isCorrect), 800);
  };

  return (
    <motion.div
      key={questionNumber}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">
          {question.direction === "id-to-en" ? "Translate to English" : "Translate to Indonesian"}
        </p>
        <p className="text-xl font-bold text-gray-900 leading-snug">{question.prompt}</p>
        {question.hint && (
          <p className="text-xs text-gray-400 mt-1 italic">{question.hint}</p>
        )}
      </div>

      <div className="space-y-2.5">
        {question.options.map((option) => {
          let style = "bg-white border-gray-200 text-gray-800";
          if (answered) {
            if (option === question.correct) {
              style = "bg-green-50 border-green-400 text-green-800 ring-2 ring-green-400";
            } else if (option === selected && option !== question.correct) {
              style = "bg-red-50 border-red-400 text-red-700 ring-2 ring-red-400";
            } else {
              style = "bg-gray-50 border-gray-200 text-gray-400";
            }
          } else {
            style = "bg-white border-gray-200 text-gray-800 active:bg-brand-50 active:border-brand-300";
          }
          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={answered}
              className={`w-full text-left px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition-all ${style}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-center"
        >
          {selected === question.correct ? (
            <p className="text-green-600 font-bold text-sm">Correct!</p>
          ) : (
            <p className="text-red-500 font-bold text-sm">
              Not quite — <span className="text-gray-700">{question.correct}</span>
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

function ReadingStage({
  lessonReadings,
  onComplete,
}: {
  lessonReadings: Reading[];
  onComplete: (score: number, total: number) => void;
}) {
  const [readingIdx, setReadingIdx] = useState(0);
  const [phase, setPhase] = useState<"read" | "questions">("read");
  const [questionIdx, setQuestionIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQs, setTotalQs] = useState(0);

  const reading = lessonReadings[readingIdx];
  if (!reading) {
    onComplete(score, totalQs);
    return null;
  }

  const question = phase === "questions" ? reading.questions[questionIdx] : null;
  const totalQuestions = lessonReadings.reduce((sum, r) => sum + r.questions.length, 0);
  const completedQuestions = lessonReadings
    .slice(0, readingIdx)
    .reduce((sum, r) => sum + r.questions.length, 0) + (phase === "questions" ? questionIdx : 0);

  const handleSelfRate = (gotIt: boolean) => {
    const newScore = gotIt ? score + 1 : score;
    const newTotal = totalQs + 1;
    setScore(newScore);
    setTotalQs(newTotal);
    setRevealed(false);

    if (questionIdx + 1 < reading.questions.length) {
      setQuestionIdx(questionIdx + 1);
    } else if (readingIdx + 1 < lessonReadings.length) {
      setReadingIdx(readingIdx + 1);
      setPhase("read");
      setQuestionIdx(0);
    } else {
      onComplete(newScore, newTotal);
    }
  };

  return (
    <div>
      <ProgressBar current={completedQuestions} total={totalQuestions} stage="Reading" />

      <AnimatePresence mode="wait">
        {phase === "read" && (
          <motion.div
            key={`read-${readingIdx}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
          >
            <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">{reading.title}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-50 text-brand-600 font-semibold">
                  {reading.titleEn}
                </span>
              </div>

              {reading.lines && (
                <div className="space-y-2 max-h-[340px] overflow-y-auto">
                  {reading.lines.map((line: DialogueLine, i: number) => (
                    <div key={i} className={`text-sm ${line.speaker === "Narrator" ? "text-gray-400 italic text-center text-xs" : ""}`}>
                      {line.speaker !== "Narrator" && (
                        <span className={`font-semibold ${
                          line.speaker === "Pembeli" || line.speaker === "Pelayan"
                            ? "text-brand-600"
                            : "text-warm-600"
                        }`}>
                          {line.speaker}:{" "}
                        </span>
                      )}
                      <span className="text-gray-700">{line.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {reading.paragraphs && (
                <div className="space-y-3 max-h-[340px] overflow-y-auto">
                  {reading.paragraphs.map((p: string, i: number) => (
                    <p key={i} className="text-sm text-gray-700 leading-relaxed">{p}</p>
                  ))}
                </div>
              )}
            </div>

            {reading.keyPhrases && reading.keyPhrases.length > 0 && (
              <div className="bg-warm-50 rounded-xl p-3 mb-4">
                <p className="text-xs font-semibold text-warm-700 mb-2">Key Phrases</p>
                <div className="space-y-1">
                  {reading.keyPhrases.map((kp) => (
                    <div key={kp.id} className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-800">{kp.id}</span>
                      <span className="text-xs text-gray-500">{kp.en}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setPhase("questions")}
              className="w-full bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold py-3.5 rounded-xl shadow-md active:scale-[0.98] transition-transform"
            >
              I&apos;ve read it — Quiz me!
            </button>
          </motion.div>
        )}

        {phase === "questions" && question && (
          <motion.div
            key={`q-${readingIdx}-${questionIdx}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
          >
            <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Comprehension — {reading.title}
              </p>
              <p className="text-lg font-bold text-gray-900">{question.id}</p>
              <p className="text-sm text-gray-500 mt-1">{question.en}</p>
            </div>

            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                className="w-full bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl active:bg-gray-50 transition-colors"
              >
                Think about it... then tap to check
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-brand-50 rounded-xl p-4 mb-3 border border-brand-200">
                  <p className="text-sm text-brand-800 font-medium">
                    Look back at the dialogue to find the answer. Did you get it right?
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSelfRate(true)}
                    className="flex-1 bg-green-500 text-white font-semibold py-3.5 rounded-xl active:scale-[0.98] transition-transform"
                  >
                    Got it!
                  </button>
                  <button
                    onClick={() => handleSelfRate(false)}
                    className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl active:scale-[0.98] transition-transform"
                  >
                    Not yet
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StageTransition({
  title,
  subtitle,
  score,
  total,
  nextLabel,
  onNext,
  color,
}: {
  title: string;
  subtitle: string;
  score: number;
  total: number;
  nextLabel: string;
  onNext: () => void;
  color: string;
}) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-4`}>
        <span className="text-3xl font-bold text-white">{pct}%</span>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-1">{subtitle}</p>
      <p className="text-sm font-semibold text-gray-700 mb-6">{score}/{total} correct</p>
      <button
        onClick={onNext}
        className="bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md active:scale-[0.98] transition-transform"
      >
        {nextLabel}
      </button>
    </motion.div>
  );
}

// ─── Main Page ───

export default function LessonReviewPage() {
  const params = useParams();
  const slug = params.slug as string;
  const lesson = lessons.find((l) => l.slug === slug);

  const [stage, setStage] = useState<Stage>("intro");
  const [vocabIdx, setVocabIdx] = useState(0);
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [vocabScore, setVocabScore] = useState(0);
  const [sentenceScore, setSentenceScore] = useState(0);
  const [readingScore, setReadingScore] = useState(0);
  const [readingTotal, setReadingTotal] = useState(0);

  const lessonVocab = useMemo(
    () => lesson ? words.filter((w) => lesson.vocabCategories.includes(w.category) || lesson.vocabIds.includes(w.id)) : [],
    [lesson]
  );
  const lessonSentences = useMemo(
    () => lesson ? sentences.filter((s) => lesson.sentenceTopics.includes(s.topic)) : [],
    [lesson]
  );
  const lessonReadings = useMemo(
    () => lesson ? readings.filter((r) => lesson.readingSlugs.includes(r.slug)) : [],
    [lesson]
  );

  const vocabQuestions = useMemo(
    () => buildVocabQuestions(lessonVocab, words, Math.min(10, lessonVocab.length)),
    [lessonVocab]
  );
  const sentenceQuestions = useMemo(
    () => buildSentenceQuestions(lessonSentences, sentences, Math.min(6, lessonSentences.length)),
    [lessonSentences]
  );

  const hasReadings = lessonReadings.length > 0;

  const handleVocabAnswer = useCallback((correct: boolean) => {
    if (correct) setVocabScore((s) => s + 1);
    if (vocabIdx + 1 < vocabQuestions.length) {
      setVocabIdx((i) => i + 1);
    } else {
      setStage("stage-transition");
    }
  }, [vocabIdx, vocabQuestions.length]);

  const handleSentenceAnswer = useCallback((correct: boolean) => {
    if (correct) setSentenceScore((s) => s + 1);
    if (sentenceIdx + 1 < sentenceQuestions.length) {
      setSentenceIdx((i) => i + 1);
    } else {
      if (hasReadings) {
        setStage("reading");
      } else {
        setStage("complete");
      }
    }
  }, [sentenceIdx, sentenceQuestions.length, hasReadings]);

  const handleReadingComplete = useCallback((score: number, total: number) => {
    setReadingScore(score);
    setReadingTotal(total);
    setStage("complete");
  }, []);

  if (!lesson) {
    return (
      <div className="pt-8 pb-4 text-center">
        <p className="text-gray-500">Lesson not found</p>
        <Link href="/lessons" className="text-brand-600 text-sm font-medium mt-2 inline-block">Back to lessons</Link>
      </div>
    );
  }

  const totalScore = vocabScore + sentenceScore + readingScore;
  const totalQuestions = vocabQuestions.length + sentenceQuestions.length + readingTotal;

  return (
    <div className="pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Link href="/lessons" className="text-brand-600 text-sm font-medium">&larr; Back</Link>
        {stage !== "intro" && stage !== "complete" && (
          <span className="text-xs text-gray-400 font-semibold">
            {lesson.title}
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* ─── INTRO ─── */}
        {stage === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">{lesson.number}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{lesson.title}</h1>
            <p className="text-gray-500 text-sm mb-6">{lesson.description}</p>

            <div className="flex justify-center gap-3 mb-8">
              <div className="bg-white rounded-xl px-4 py-2.5 shadow-sm text-center">
                <p className="text-lg font-bold text-brand-600">{vocabQuestions.length}</p>
                <p className="text-[10px] text-gray-500">Vocab</p>
              </div>
              <div className="bg-white rounded-xl px-4 py-2.5 shadow-sm text-center">
                <p className="text-lg font-bold text-violet-500">{sentenceQuestions.length}</p>
                <p className="text-[10px] text-gray-500">Sentences</p>
              </div>
              {hasReadings && (
                <div className="bg-white rounded-xl px-4 py-2.5 shadow-sm text-center">
                  <p className="text-lg font-bold text-rose-500">{lessonReadings.length}</p>
                  <p className="text-[10px] text-gray-500">Dialogues</p>
                </div>
              )}
            </div>

            <div className="space-y-2 mb-8 text-left max-w-xs mx-auto">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xs font-bold">1</div>
                <p className="text-sm text-gray-700">Vocabulary quiz</p>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-xs font-bold">2</div>
                <p className="text-sm text-gray-700">Sentence translations</p>
              </div>
              {hasReadings && (
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold">3</div>
                  <p className="text-sm text-gray-700">Reading comprehension</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setStage("vocab")}
              className="bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold px-10 py-4 rounded-xl shadow-lg text-lg active:scale-[0.98] transition-transform"
            >
              Let&apos;s go!
            </button>
          </motion.div>
        )}

        {/* ─── VOCAB QUIZ ─── */}
        {stage === "vocab" && vocabQuestions[vocabIdx] && (
          <motion.div key={`vocab-${vocabIdx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProgressBar current={vocabIdx} total={vocabQuestions.length} stage="Vocabulary" />
            <QuizCard
              question={vocabQuestions[vocabIdx]}
              onAnswer={handleVocabAnswer}
              questionNumber={vocabIdx}
            />
          </motion.div>
        )}

        {/* ─── STAGE TRANSITION (vocab → sentences) ─── */}
        {stage === "stage-transition" && (
          <motion.div key="transition" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <StageTransition
              title="Vocabulary done!"
              subtitle="Nice work on the words"
              score={vocabScore}
              total={vocabQuestions.length}
              nextLabel="Next: Sentences"
              onNext={() => setStage("sentences")}
              color="from-brand-400 to-brand-500"
            />
          </motion.div>
        )}

        {/* ─── SENTENCE QUIZ ─── */}
        {stage === "sentences" && sentenceQuestions[sentenceIdx] && (
          <motion.div key={`sent-${sentenceIdx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProgressBar current={sentenceIdx} total={sentenceQuestions.length} stage="Sentences" />
            <QuizCard
              question={sentenceQuestions[sentenceIdx]}
              onAnswer={handleSentenceAnswer}
              questionNumber={sentenceIdx}
            />
          </motion.div>
        )}

        {/* ─── READING ─── */}
        {stage === "reading" && (
          <motion.div key="reading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ReadingStage
              lessonReadings={lessonReadings}
              onComplete={handleReadingComplete}
            />
          </motion.div>
        )}

        {/* ─── COMPLETE ─── */}
        {stage === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-4xl font-bold text-white">
                {totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0}%
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Lesson complete!</h2>
            <p className="text-gray-500 text-sm mb-6">{lesson.title}</p>

            <div className="grid grid-cols-3 gap-2 mb-8 max-w-xs mx-auto">
              <div className="bg-white rounded-xl p-3 shadow-sm text-center">
                <p className="text-lg font-bold text-brand-600">{vocabScore}/{vocabQuestions.length}</p>
                <p className="text-[10px] text-gray-500">Vocab</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm text-center">
                <p className="text-lg font-bold text-violet-500">{sentenceScore}/{sentenceQuestions.length}</p>
                <p className="text-[10px] text-gray-500">Sentences</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm text-center">
                <p className="text-lg font-bold text-rose-500">
                  {readingTotal > 0 ? `${readingScore}/${readingTotal}` : "—"}
                </p>
                <p className="text-[10px] text-gray-500">Reading</p>
              </div>
            </div>

            {/* Grammar tips as a reward */}
            {lesson.grammarTips.length > 0 && (
              <div className="text-left mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Grammar tips from this lesson</h3>
                <div className="space-y-2">
                  {lesson.grammarTips.map((tip) => (
                    <div key={tip.tip} className="bg-warm-50 rounded-xl p-3">
                      <p className="font-semibold text-xs text-warm-700">{tip.tip}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{tip.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Link
                href="/lessons"
                className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3.5 rounded-xl text-center active:scale-[0.98] transition-transform"
              >
                All lessons
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold py-3.5 rounded-xl active:scale-[0.98] transition-transform"
              >
                Try again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
