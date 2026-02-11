const units = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

/** Convert an integer (0 – 999 999 999) to Indonesian words. */
export function numberToIndonesian(n: number): string {
  if (n === 0) return "nol";
  if (n < 0) return "minus " + numberToIndonesian(-n);
  if (n < 10) return units[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return units[n - 10] + " belas";
  if (n < 100) {
    const tens = Math.floor(n / 10);
    const rem = n % 10;
    return units[tens] + " puluh" + (rem ? " " + units[rem] : "");
  }
  if (n < 1000) {
    const h = Math.floor(n / 100);
    const rem = n % 100;
    const prefix = h === 1 ? "seratus" : units[h] + " ratus";
    return prefix + (rem ? " " + numberToIndonesian(rem) : "");
  }
  if (n < 1_000_000) {
    const k = Math.floor(n / 1000);
    const rem = n % 1000;
    const prefix = k === 1 ? "seribu" : numberToIndonesian(k) + " ribu";
    return prefix + (rem ? " " + numberToIndonesian(rem) : "");
  }
  const m = Math.floor(n / 1_000_000);
  const rem = n % 1_000_000;
  return numberToIndonesian(m) + " juta" + (rem ? " " + numberToIndonesian(rem) : "");
}

/** Format number as Rupiah string: Rp 298.000 */
export function formatRupiah(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}

// ─── Quiz question generation ───

export type NumberQuestion = {
  prompt: string;
  correct: string;
  options: string[];
  hint?: string;
  context?: string;
};

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandom<T>(arr: T[], count: number): T[] {
  return shuffle(arr).slice(0, count);
}

function nearbyDistractors(n: number, pool: number[], count: number): number[] {
  return shuffle(pool.filter((x) => x !== n)).slice(0, count);
}

// ── Round 1: Basic 1–20 ──

const BASIC_NUMBERS = Array.from({ length: 20 }, (_, i) => i + 1);

export function generateBasicQuestions(count: number): NumberQuestion[] {
  const picked = pickRandom(BASIC_NUMBERS, count);
  return picked.map((n, i) => {
    const indo = numberToIndonesian(n);
    if (i % 2 === 0) {
      // Number → Indonesian
      const distractors = nearbyDistractors(n, BASIC_NUMBERS, 3).map(numberToIndonesian);
      return {
        prompt: n.toString(),
        correct: indo,
        options: shuffle([indo, ...distractors]),
        hint: "What is this number in Indonesian?",
      };
    } else {
      // Indonesian → Number
      const distractors = nearbyDistractors(n, BASIC_NUMBERS, 3).map((x) => x.toString());
      return {
        prompt: indo,
        correct: n.toString(),
        options: shuffle([n.toString(), ...distractors]),
        hint: "What number is this?",
      };
    }
  });
}

// ── Round 2: Tens & Hundreds (21–999) ──

const MEDIUM_NUMBERS = [
  21, 25, 30, 35, 42, 48, 50, 55, 67, 75, 80, 88, 99,
  100, 125, 150, 175, 200, 250, 300, 350, 400, 450, 500,
  600, 750, 800, 999,
];

export function generateMediumQuestions(count: number): NumberQuestion[] {
  const picked = pickRandom(MEDIUM_NUMBERS, count);
  return picked.map((n, i) => {
    const indo = numberToIndonesian(n);
    if (i % 2 === 0) {
      const distractors = nearbyDistractors(n, MEDIUM_NUMBERS, 3).map(numberToIndonesian);
      return {
        prompt: n.toString(),
        correct: indo,
        options: shuffle([indo, ...distractors]),
        hint: "Compose the Indonesian number",
      };
    } else {
      const distractors = nearbyDistractors(n, MEDIUM_NUMBERS, 3).map((x) => x.toString());
      return {
        prompt: indo,
        correct: n.toString(),
        options: shuffle([n.toString(), ...distractors]),
        hint: "What number is this?",
      };
    }
  });
}

// ── Round 3: Big Numbers / Prices ──

const PRICE_NUMBERS = [
  5_000, 8_000, 10_000, 15_000, 20_000, 25_000, 35_000,
  50_000, 65_000, 70_000, 75_000, 100_000, 140_000, 150_000,
  180_000, 200_000, 250_000, 298_000, 320_000, 400_000,
  500_000, 650_000, 750_000, 1_000_000, 1_500_000, 2_000_000,
  2_500_000, 5_000_000,
];

export function generatePriceQuestions(count: number): NumberQuestion[] {
  const picked = pickRandom(PRICE_NUMBERS, count);
  return picked.map((n, i) => {
    const indo = numberToIndonesian(n);
    const rupiah = formatRupiah(n);
    if (i % 2 === 0) {
      // Rupiah → Indonesian words
      const distractors = nearbyDistractors(n, PRICE_NUMBERS, 3).map(numberToIndonesian);
      return {
        prompt: rupiah,
        correct: indo,
        options: shuffle([indo, ...distractors]),
        hint: "How do you say this price?",
      };
    } else {
      // Indonesian words → Rupiah
      const distractors = nearbyDistractors(n, PRICE_NUMBERS, 3).map(formatRupiah);
      return {
        prompt: indo + " rupiah",
        correct: rupiah,
        options: shuffle([rupiah, ...distractors]),
        hint: "Which price is this?",
      };
    }
  });
}

// ── Round 4: Price Dialogues ──

type DialogueScenario = {
  setup: string;
  dialogue: Array<{ speaker: string; text: string }>;
  question: string;
  correctPrice: number;
  distractorPrices: number[];
};

const DIALOGUE_SCENARIOS: DialogueScenario[] = [
  {
    setup: "Di Toko Baju",
    dialogue: [
      { speaker: "Pembeli", text: "Berapa harga kemeja ini?" },
      { speaker: "Penjual", text: "Yang ini Rp 150.000, mbak." },
      { speaker: "Pembeli", text: "Bisa kurang?" },
      { speaker: "Penjual", text: "Enggak mbak, harga pas." },
    ],
    question: "Berapa harga kemeja?",
    correctPrice: 150_000,
    distractorPrices: [100_000, 200_000, 180_000],
  },
  {
    setup: "Di Pasar",
    dialogue: [
      { speaker: "Pembeli", text: "Berapa harga jeruk satu kilo?" },
      { speaker: "Penjual", text: "Rp 8.000 per kilo, mbak." },
      { speaker: "Pembeli", text: "Saya mau tiga kilo." },
    ],
    question: "Berapa total harga tiga kilo jeruk?",
    correctPrice: 24_000,
    distractorPrices: [8_000, 16_000, 32_000],
  },
  {
    setup: "Di Counter HP",
    dialogue: [
      { speaker: "Pembeli", text: "Saya mau beli pulsa Telkomsel." },
      { speaker: "Penjual", text: "Mau berapa?" },
      { speaker: "Pembeli", text: "Pulsa 75.000 ada?" },
      { speaker: "Penjual", text: "Enggak ada. Isi dua kali, 50 dan 25." },
    ],
    question: "Berapa total pulsa yang dibeli?",
    correctPrice: 75_000,
    distractorPrices: [50_000, 25_000, 100_000],
  },
  {
    setup: "Di Restoran",
    dialogue: [
      { speaker: "Pembeli", text: "Saya mau pesan nasi campur dan es teh." },
      { speaker: "Pelayan", text: "Nasi campur Rp 20.000, es teh Rp 5.000." },
      { speaker: "Pembeli", text: "Berapa semua?" },
    ],
    question: "Berapa total harga makanan dan minuman?",
    correctPrice: 25_000,
    distractorPrices: [20_000, 15_000, 30_000],
  },
  {
    setup: "Di Toko Baju",
    dialogue: [
      { speaker: "Pembeli", text: "Berapa harga celana panjang?" },
      { speaker: "Penjual", text: "Rp 180.000, mas." },
      { speaker: "Pembeli", text: "Dan baju kaos?" },
      { speaker: "Penjual", text: "Baju kaos Rp 65.000." },
    ],
    question: "Berapa total kalau beli celana panjang dan baju kaos?",
    correctPrice: 245_000,
    distractorPrices: [180_000, 265_000, 215_000],
  },
  {
    setup: "Di Pasar",
    dialogue: [
      { speaker: "Pembeli", text: "Ada pisang?" },
      { speaker: "Penjual", text: "Ada. Rp 20.000." },
      { speaker: "Pembeli", text: "Dan jeruk dua kilo?" },
      { speaker: "Penjual", text: "Jeruk Rp 8.000 per kilo. Total semua Rp 36.000." },
    ],
    question: "Berapa harga dua kilo jeruk saja?",
    correctPrice: 16_000,
    distractorPrices: [8_000, 20_000, 36_000],
  },
  {
    setup: "Di Toko",
    dialogue: [
      { speaker: "Pembeli", text: "Berapa harga kaca mata ini?" },
      { speaker: "Penjual", text: "Rp 70.000, mas." },
      { speaker: "Pembeli", text: "Terlalu mahal. Yang itu?" },
      { speaker: "Penjual", text: "Yang itu Rp 35.000." },
    ],
    question: "Berapa harga kaca mata yang lebih murah?",
    correctPrice: 35_000,
    distractorPrices: [70_000, 50_000, 45_000],
  },
  {
    setup: "Di Toko Baju",
    dialogue: [
      { speaker: "Pembeli", text: "Saya mau beli jaket. Berapa harga?" },
      { speaker: "Penjual", text: "Rp 320.000, mbak." },
      { speaker: "Pembeli", text: "Lumayan mahal! Bisa kurang?" },
      { speaker: "Penjual", text: "Oke, Rp 280.000." },
    ],
    question: "Berapa harga jaket sesudah kurang?",
    correctPrice: 280_000,
    distractorPrices: [320_000, 250_000, 300_000],
  },
];

export function generateDialogueQuestions(count: number): {
  scenario: DialogueScenario;
  question: NumberQuestion;
}[] {
  const picked = pickRandom(DIALOGUE_SCENARIOS, Math.min(count, DIALOGUE_SCENARIOS.length));
  return picked.map((s) => ({
    scenario: s,
    question: {
      prompt: s.question,
      correct: formatRupiah(s.correctPrice),
      options: shuffle([formatRupiah(s.correctPrice), ...s.distractorPrices.map(formatRupiah)]),
      context: s.setup,
    },
  }));
}
