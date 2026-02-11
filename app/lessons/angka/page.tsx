"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  generateBasicQuestions,
  generateMediumQuestions,
  generatePriceQuestions,
  generateDialogueQuestions,
  numberToIndonesian,
  type NumberQuestion,
} from "@/lib/numbers";

// ─── Types ───

type Stage = "intro" | "basic" | "medium" | "prices" | "dialogues" | "transition" | "complete";

type Round = {
  stage: Stage;
  label: string;
  sublabel: string;
  color: string;
  nextStage: Stage;
  nextLabel: string;
};

const ROUNDS: Round[] = [
  { stage: "basic", label: "Basic Numbers", sublabel: "1 – 20", color: "from-brand-400 to-brand-500", nextStage: "medium", nextLabel: "Next: Tens & Hundreds" },
  { stage: "medium", label: "Tens & Hundreds", sublabel: "21 – 999", color: "from-violet-400 to-violet-500", nextStage: "prices", nextLabel: "Next: Prices" },
  { stage: "prices", label: "Prices", sublabel: "Rupiah amounts", color: "from-warm-400 to-warm-500", nextStage: "dialogues", nextLabel: "Next: Shopping Dialogues" },
  { stage: "dialogues", label: "Shopping Dialogues", sublabel: "Real conversations", color: "from-rose-400 to-rose-500", nextStage: "complete", nextLabel: "" },
];

// ─── Components ───

function ProgressBar({ current, total, label }: { current: number; total: number; label: string }) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
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
  qKey,
}: {
  question: NumberQuestion;
  onAnswer: (correct: boolean) => void;
  qKey: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    setTimeout(() => onAnswer(option === question.correct), 900);
  };

  return (
    <motion.div
      key={qKey}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        {question.hint && (
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">{question.hint}</p>
        )}
        <p className="text-2xl font-bold text-gray-900">{question.prompt}</p>
      </div>

      <div className="space-y-2.5">
        {question.options.map((option) => {
          let style = "bg-white border-gray-200 text-gray-800 active:bg-brand-50 active:border-brand-300";
          if (answered) {
            if (option === question.correct) {
              style = "bg-green-50 border-green-400 text-green-800 ring-2 ring-green-400";
            } else if (option === selected && option !== question.correct) {
              style = "bg-red-50 border-red-400 text-red-700 ring-2 ring-red-400";
            } else {
              style = "bg-gray-50 border-gray-200 text-gray-400";
            }
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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-center">
          {selected === question.correct ? (
            <p className="text-green-600 font-bold text-sm">Correct!</p>
          ) : (
            <p className="text-red-500 font-bold text-sm">
              Answer: <span className="text-gray-700">{question.correct}</span>
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

function DialogueQuizCard({
  scenario,
  question,
  onAnswer,
  qKey,
}: {
  scenario: { setup: string; dialogue: Array<{ speaker: string; text: string }> };
  question: NumberQuestion;
  onAnswer: (correct: boolean) => void;
  qKey: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    setTimeout(() => onAnswer(option === question.correct), 900);
  };

  return (
    <motion.div
      key={qKey}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      {/* Dialogue card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-3">
        <p className="text-[10px] font-bold text-brand-500 uppercase tracking-wider mb-2">{scenario.setup}</p>
        <div className="space-y-1.5">
          {scenario.dialogue.map((line, i) => (
            <div key={i} className="text-sm">
              <span className={`font-semibold ${line.speaker === "Pembeli" ? "text-brand-600" : "text-warm-600"}`}>
                {line.speaker}:
              </span>{" "}
              <span className="text-gray-700">{line.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="bg-warm-50 rounded-xl p-3 mb-4 border border-warm-200">
        <p className="font-bold text-sm text-gray-900">{question.prompt}</p>
      </div>

      <div className="space-y-2.5">
        {question.options.map((option) => {
          let style = "bg-white border-gray-200 text-gray-800 active:bg-brand-50 active:border-brand-300";
          if (answered) {
            if (option === question.correct) {
              style = "bg-green-50 border-green-400 text-green-800 ring-2 ring-green-400";
            } else if (option === selected && option !== question.correct) {
              style = "bg-red-50 border-red-400 text-red-700 ring-2 ring-red-400";
            } else {
              style = "bg-gray-50 border-gray-200 text-gray-400";
            }
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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-center">
          {selected === question.correct ? (
            <p className="text-green-600 font-bold text-sm">Correct!</p>
          ) : (
            <p className="text-red-500 font-bold text-sm">
              Answer: <span className="text-gray-700">{question.correct}</span>
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

function Transition({
  title,
  score,
  total,
  nextLabel,
  onNext,
  color,
}: {
  title: string;
  score: number;
  total: number;
  nextLabel: string;
  onNext: () => void;
  color: string;
}) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-4`}>
        <span className="text-3xl font-bold text-white">{pct}%</span>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">{title} done!</h2>
      <p className="text-sm font-semibold text-gray-500 mb-6">{score}/{total} correct</p>
      <button
        onClick={onNext}
        className="bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md active:scale-[0.98] transition-transform"
      >
        {nextLabel}
      </button>
    </motion.div>
  );
}

// ─── Main ───

const BASIC_COUNT = 6;
const MEDIUM_COUNT = 6;
const PRICE_COUNT = 6;
const DIALOGUE_COUNT = 5;

export default function AngkaQuizPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState({ basic: 0, medium: 0, prices: 0, dialogues: 0 });

  const basicQs = useMemo(() => generateBasicQuestions(BASIC_COUNT), []);
  const mediumQs = useMemo(() => generateMediumQuestions(MEDIUM_COUNT), []);
  const priceQs = useMemo(() => generatePriceQuestions(PRICE_COUNT), []);
  const dialogueQs = useMemo(() => generateDialogueQuestions(DIALOGUE_COUNT), []);

  const currentRound = ROUNDS.find((r) => r.stage === stage);

  const handleAnswer = useCallback(
    (correct: boolean) => {
      const scoreKey = stage as "basic" | "medium" | "prices" | "dialogues";
      if (correct) setScores((s) => ({ ...s, [scoreKey]: s[scoreKey] + 1 }));

      let questions: unknown[];
      if (stage === "basic") questions = basicQs;
      else if (stage === "medium") questions = mediumQs;
      else if (stage === "prices") questions = priceQs;
      else questions = dialogueQs;

      if (idx + 1 < questions.length) {
        setIdx((i) => i + 1);
      } else {
        setIdx(0);
        setStage("transition");
      }
    },
    [stage, idx, basicQs, mediumQs, priceQs, dialogueQs]
  );

  const handleTransitionNext = useCallback(() => {
    if (!currentRound) return;
    setStage(currentRound.nextStage);
    setIdx(0);
  }, [currentRound]);

  const totalScore = scores.basic + scores.medium + scores.prices + scores.dialogues;
  const totalQs = BASIC_COUNT + MEDIUM_COUNT + PRICE_COUNT + DIALOGUE_COUNT;

  return (
    <div className="pt-6 pb-4">
      <div className="flex items-center justify-between mb-4">
        <Link href="/lessons" className="text-brand-600 text-sm font-medium">&larr; Back</Link>
        {stage !== "intro" && stage !== "complete" && (
          <span className="text-xs text-gray-400 font-semibold">Numbers Quiz</span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* ── INTRO ── */}
        {stage === "intro" && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-warm-400 to-warm-500 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">#</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Angka & Harga</h1>
            <p className="text-gray-500 text-sm mb-6">Numbers & Prices — from basics to shopping</p>

            {/* Number system cheat sheet */}
            <div className="text-left bg-white rounded-2xl p-4 shadow-sm mb-6">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">How Indonesian numbers work</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">1–10</span><span className="font-medium text-gray-800">satu, dua, ... sepuluh</span></div>
                <div className="flex justify-between"><span className="text-gray-500">11</span><span className="font-medium text-gray-800">se<span className="text-brand-600">belas</span></span></div>
                <div className="flex justify-between"><span className="text-gray-500">12–19</span><span className="font-medium text-gray-800">dua <span className="text-brand-600">belas</span>, tiga belas...</span></div>
                <div className="flex justify-between"><span className="text-gray-500">20, 30...</span><span className="font-medium text-gray-800">dua <span className="text-brand-600">puluh</span>, tiga puluh</span></div>
                <div className="flex justify-between"><span className="text-gray-500">100</span><span className="font-medium text-gray-800">se<span className="text-brand-600">ratus</span></span></div>
                <div className="flex justify-between"><span className="text-gray-500">1,000</span><span className="font-medium text-gray-800">se<span className="text-brand-600">ribu</span></span></div>
                <div className="flex justify-between"><span className="text-gray-500">1,000,000</span><span className="font-medium text-gray-800">satu <span className="text-brand-600">juta</span></span></div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Examples:</p>
                <p className="text-sm"><span className="text-gray-500">298,000 = </span><span className="font-medium text-gray-800">dua ratus sembilan puluh delapan ribu</span></p>
                <p className="text-sm"><span className="text-gray-500">1,500,000 = </span><span className="font-medium text-gray-800">satu juta lima ratus ribu</span></p>
              </div>
            </div>

            <div className="space-y-2 mb-6 text-left max-w-xs mx-auto">
              {ROUNDS.map((r, i) => (
                <div key={r.stage} className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center text-white text-xs font-bold`}>{i + 1}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{r.label}</p>
                    <p className="text-[10px] text-gray-400">{r.sublabel}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStage("basic")}
              className="bg-gradient-to-r from-warm-400 to-warm-500 text-white font-bold px-10 py-4 rounded-xl shadow-lg text-lg active:scale-[0.98] transition-transform"
            >
              Let&apos;s count!
            </button>
          </motion.div>
        )}

        {/* ── BASIC / MEDIUM / PRICES ── */}
        {(stage === "basic" || stage === "medium" || stage === "prices") && (
          <motion.div key={`${stage}-${idx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProgressBar
              current={idx}
              total={stage === "basic" ? BASIC_COUNT : stage === "medium" ? MEDIUM_COUNT : PRICE_COUNT}
              label={currentRound?.label || ""}
            />
            {stage === "basic" && basicQs[idx] && (
              <QuizCard question={basicQs[idx]} onAnswer={handleAnswer} qKey={`basic-${idx}`} />
            )}
            {stage === "medium" && mediumQs[idx] && (
              <QuizCard question={mediumQs[idx]} onAnswer={handleAnswer} qKey={`medium-${idx}`} />
            )}
            {stage === "prices" && priceQs[idx] && (
              <QuizCard question={priceQs[idx]} onAnswer={handleAnswer} qKey={`prices-${idx}`} />
            )}
          </motion.div>
        )}

        {/* ── DIALOGUES ── */}
        {stage === "dialogues" && dialogueQs[idx] && (
          <motion.div key={`dialogue-${idx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProgressBar current={idx} total={DIALOGUE_COUNT} label="Shopping Dialogues" />
            <DialogueQuizCard
              scenario={dialogueQs[idx].scenario}
              question={dialogueQs[idx].question}
              onAnswer={handleAnswer}
              qKey={`dialogue-${idx}`}
            />
          </motion.div>
        )}

        {/* ── TRANSITION ── */}
        {stage === "transition" && currentRound && (
          <motion.div key="transition" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Transition
              title={currentRound.label}
              score={scores[currentRound.stage as keyof typeof scores] ?? 0}
              total={
                currentRound.stage === "basic" ? BASIC_COUNT :
                currentRound.stage === "medium" ? MEDIUM_COUNT :
                currentRound.stage === "prices" ? PRICE_COUNT : DIALOGUE_COUNT
              }
              nextLabel={currentRound.nextLabel}
              onNext={handleTransitionNext}
              color={currentRound.color}
            />
          </motion.div>
        )}

        {/* ── COMPLETE ── */}
        {stage === "complete" && (
          <motion.div key="complete" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-warm-400 to-warm-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-4xl font-bold text-white">
                {Math.round((totalScore / totalQs) * 100)}%
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Numbers mastered!</h2>
            <p className="text-gray-500 text-sm mb-6">Angka & Harga quiz complete</p>

            <div className="grid grid-cols-2 gap-2 mb-6 max-w-xs mx-auto">
              <div className="bg-white rounded-xl p-3 shadow-sm text-center">
                <p className="text-lg font-bold text-brand-600">{scores.basic}/{BASIC_COUNT}</p>
                <p className="text-[10px] text-gray-500">Basic (1–20)</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm text-center">
                <p className="text-lg font-bold text-violet-500">{scores.medium}/{MEDIUM_COUNT}</p>
                <p className="text-[10px] text-gray-500">Tens & Hundreds</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm text-center">
                <p className="text-lg font-bold text-warm-500">{scores.prices}/{PRICE_COUNT}</p>
                <p className="text-[10px] text-gray-500">Prices</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm text-center">
                <p className="text-lg font-bold text-rose-500">{scores.dialogues}/{DIALOGUE_COUNT}</p>
                <p className="text-[10px] text-gray-500">Dialogues</p>
              </div>
            </div>

            {/* Number tips */}
            <div className="text-left mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Number tips</h3>
              <div className="space-y-2">
                <div className="bg-warm-50 rounded-xl p-3">
                  <p className="font-semibold text-xs text-warm-700">&quot;Se-&quot; prefix = one</p>
                  <p className="text-xs text-gray-600">seratus (100), seribu (1000), sebelas (11), sepuluh (10)</p>
                </div>
                <div className="bg-warm-50 rounded-xl p-3">
                  <p className="font-semibold text-xs text-warm-700">Read left to right, big to small</p>
                  <p className="text-xs text-gray-600">298.000 = dua ratus (200) + sembilan puluh (90) + delapan (8) + ribu (×1000)</p>
                </div>
                <div className="bg-warm-50 rounded-xl p-3">
                  <p className="font-semibold text-xs text-warm-700">Prices drop the last 3 zeros</p>
                  <p className="text-xs text-gray-600">Indonesians often say &quot;dua ratus&quot; for Rp 200.000 (dropping &quot;ribu&quot;)</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/lessons"
                className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3.5 rounded-xl text-center active:scale-[0.98] transition-transform"
              >
                All lessons
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-gradient-to-r from-warm-400 to-warm-500 text-white font-semibold py-3.5 rounded-xl active:scale-[0.98] transition-transform"
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
