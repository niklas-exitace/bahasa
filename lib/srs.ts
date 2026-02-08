/**
 * Spaced Repetition System (simplified SM-2 algorithm)
 *
 * Each card tracks:
 * - interval: days until next review
 * - ease: easiness factor (multiplier for intervals)
 * - repetitions: consecutive correct answers
 * - nextReview: when the card is due
 *
 * Grading:
 * - "again": wrong answer → reset to beginning, see again soon
 * - "good": correct → increase interval
 * - "easy": knew it instantly → larger interval boost
 */

const STORAGE_KEY = "bahasa-srs-progress";

export type Grade = "again" | "good" | "easy";

export type CardProgress = {
  wordId: string;
  interval: number; // days
  ease: number; // starts at 2.5
  repetitions: number;
  nextReview: string; // ISO date
  lastReview: string; // ISO date
};

export type SRSStats = {
  totalCards: number;
  learnedCards: number; // reviewed at least once
  dueCards: number;
  newCards: number; // never reviewed
  matureCards: number; // interval >= 21 days
};

function today(): string {
  return new Date().toISOString().split("T")[0];
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

/** Load all progress from localStorage */
export function loadProgress(): Record<string, CardProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Save all progress to localStorage */
function saveProgress(progress: Record<string, CardProgress>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

/** Get progress for a single card (or create default) */
export function getCardProgress(wordId: string): CardProgress | null {
  const all = loadProgress();
  return all[wordId] || null;
}

/** Grade a card and update its schedule */
export function gradeCard(wordId: string, grade: Grade): CardProgress {
  const all = loadProgress();
  const existing = all[wordId];
  const now = today();

  let card: CardProgress;

  if (!existing) {
    // First time seeing this card
    card = {
      wordId,
      interval: 0,
      ease: 2.5,
      repetitions: 0,
      nextReview: now,
      lastReview: now,
    };
  } else {
    card = { ...existing };
  }

  if (grade === "again") {
    // Wrong: reset repetitions, short interval
    card.repetitions = 0;
    card.interval = 0; // due again today (will show again in session)
    card.ease = Math.max(1.3, card.ease - 0.2);
    card.nextReview = now; // due immediately
  } else if (grade === "good") {
    card.repetitions += 1;
    if (card.repetitions === 1) {
      card.interval = 1; // 1 day
    } else if (card.repetitions === 2) {
      card.interval = 3; // 3 days
    } else {
      card.interval = Math.round(card.interval * card.ease);
    }
    card.nextReview = addDays(now, card.interval);
  } else if (grade === "easy") {
    card.repetitions += 1;
    if (card.repetitions === 1) {
      card.interval = 3;
    } else if (card.repetitions === 2) {
      card.interval = 7;
    } else {
      card.interval = Math.round(card.interval * card.ease * 1.3);
    }
    card.ease = Math.min(3.0, card.ease + 0.15);
    card.nextReview = addDays(now, card.interval);
  }

  card.lastReview = now;
  all[wordId] = card;
  saveProgress(all);

  return card;
}

/** Get all word IDs that are due for review today */
export function getDueWordIds(allWordIds: string[]): string[] {
  const all = loadProgress();
  const now = today();

  return allWordIds.filter((id) => {
    const progress = all[id];
    if (!progress) return false; // new card, not "due"
    return progress.nextReview <= now;
  });
}

/** Get word IDs that have never been studied */
export function getNewWordIds(allWordIds: string[]): string[] {
  const all = loadProgress();
  return allWordIds.filter((id) => !all[id]);
}

/** Get stats for the dashboard */
export function getStats(allWordIds: string[]): SRSStats {
  const all = loadProgress();
  const now = today();

  let learnedCards = 0;
  let dueCards = 0;
  let matureCards = 0;

  for (const id of allWordIds) {
    const progress = all[id];
    if (progress) {
      learnedCards++;
      if (progress.nextReview <= now) dueCards++;
      if (progress.interval >= 21) matureCards++;
    }
  }

  return {
    totalCards: allWordIds.length,
    learnedCards,
    dueCards,
    newCards: allWordIds.length - learnedCards,
    matureCards,
  };
}

/** Reset all progress (for testing) */
export function resetAllProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
