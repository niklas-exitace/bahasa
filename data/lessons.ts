export type LessonExpression = {
  id: string;
  en: string;
  example?: string;
  exampleEn?: string;
};

export type Lesson = {
  number: number;
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  vocabCategories: string[];
  vocabIds: string[];
  sentenceTopics: string[];
  readingSlugs: string[];
  expressions: LessonExpression[];
  grammarTips: Array<{ tip: string; detail: string }>;
};

// Special slugs that have their own custom quiz page (not the generic funnel)
export const customLessonSlugs = ["angka"];

export const lessons: Lesson[] = [
  {
    number: 1,
    slug: "perkenalan",
    title: "Bagian 1: Perkenalan",
    titleEn: "Introduction",
    description: "Pronouns, greetings, basic verbs, question words, and prepositions",
    vocabCategories: ["pronouns", "people_titles", "greetings_phrases", "question_words", "prepositions"],
    vocabIds: [],
    sentenceTopics: ["basics", "greetings"],
    readingSlugs: [],
    expressions: [
      { id: "Apa kabar?", en: "How are you?" },
      { id: "Siapa nama kamu?", en: "What is your name?" },
      { id: "Nama saya...", en: "My name is..." },
      { id: "Dari mana?", en: "Where are you from?" },
      { id: "Saya tinggal di...", en: "I live in..." },
    ],
    grammarTips: [
      { tip: "No verb conjugation", detail: "Indonesian verbs don't change form — saya makan, dia makan, mereka makan" },
      { tip: "Location words", detail: "di (at/in), ke (to), dari (from)" },
      { tip: "Formal vs informal", detail: "saya (formal I) vs aku (informal I), tidak (formal no) vs enggak (informal)" },
    ],
  },
  {
    number: 2,
    slug: "makanan",
    title: "Bagian 2: Makanan",
    titleEn: "Food & Ordering",
    description: "Food vocabulary, restaurant dialogues, time words, and daily sentences",
    vocabCategories: ["food_drinks", "time_words", "numbers"],
    vocabIds: ["pesan", "minta", "tunggu", "habis", "semua", "total", "warung", "porsi"],
    sentenceTopics: ["food", "daily", "time"],
    readingSlugs: ["di-restoran", "rumah-di-pererenan", "sanur-beach", "toni-pintuar"],
    expressions: [
      { id: "Mau pesan apa?", en: "What would you like to order?" },
      { id: "Saya mau pesan...", en: "I would like to order..." },
      { id: "Maaf, ... habis", en: "Sorry, ... is sold out" },
      { id: "Berapa semua?", en: "How much for everything?" },
      { id: "Minta bill", en: "Can I have the bill?" },
      { id: "Sedikit gula", en: "A little sugar" },
      { id: "Tanpa gula", en: "Without sugar" },
    ],
    grammarTips: [
      { tip: "\"Sekali\" = very", detail: "Comes AFTER adjective: enak sekali = very delicious" },
      { tip: "Sudah / Belum", detail: "already / not yet — Sudah makan? Belum." },
      { tip: "Sebelum / Sesudah", detail: "before / after — Sebelum kerja, saya makan pagi" },
    ],
  },
  {
    number: 3,
    slug: "belanja",
    title: "Bagian 3: Belanja",
    titleEn: "Shopping",
    description: "Shopping expressions, colors, clothing, haggling, and buying phone credit",
    vocabCategories: ["colors", "clothing"],
    vocabIds: [
      "permisi", "silahkan", "lumayan", "terlalu", "enggak", "saja",
      "bayar", "lihat", "kurang", "masuk",
      "toko", "kasir", "warna", "pulsa", "harga", "mahal", "murah",
      "besar", "panjang", "pendek",
    ],
    sentenceTopics: ["shopping"],
    readingSlugs: ["di-pasar", "di-toko-baju", "di-counter-hp"],
    expressions: [
      {
        id: "Permisi bu/mas",
        en: "Excuse me (ma'am/sir)",
        example: "Permisi bu, jual air?",
        exampleEn: "Excuse me, do you sell water?",
      },
      {
        id: "Tunggu sebentar",
        en: "Wait a moment",
        example: "Tunggu sebentar, saya mau lihat-lihat.",
        exampleEn: "Wait a moment, I want to look around.",
      },
      {
        id: "Bisa kurang?",
        en: "Can you reduce the price?",
      },
      {
        id: "Harga pas",
        en: "Fixed price (no bargaining)",
        example: "Yang ini harga pas.",
        exampleEn: "This one is fixed price.",
      },
      {
        id: "Ada lagi?",
        en: "Anything else?",
      },
      {
        id: "Itu saja",
        en: "Just that / That's all",
      },
      {
        id: "Silahkan masuk",
        en: "Please come in",
      },
      {
        id: "Terlalu mahal",
        en: "Too expensive",
        example: "Yang itu terlalu mahal.",
        exampleEn: "That one is too expensive.",
      },
      {
        id: "Lumayan",
        en: "Not bad / Pretty (modifier)",
        example: "Yang besar lumayan mahal.",
        exampleEn: "The big one is pretty expensive.",
      },
    ],
    grammarTips: [
      { tip: "Yang = which/the one", detail: "Yang ini = this one, Yang itu = that one, Yang merah = the red one" },
      { tip: "Terlalu vs lumayan", detail: "terlalu = too (negative), lumayan = pretty/not bad (softer)" },
      { tip: "Enggak = tidak (informal)", detail: "Enggak ada = there isn't any. Enggak apa-apa = it's okay" },
      { tip: "Colors after warna", detail: "warna hitam = black color. kemeja warna hitam = black shirt" },
    ],
  },
  {
    number: 4,
    slug: "angka",
    title: "Angka & Harga",
    titleEn: "Numbers & Prices",
    description: "Deep dive into numbers, composing big amounts, and using prices in shopping dialogues",
    vocabCategories: ["numbers"],
    vocabIds: ["harga", "mahal", "murah", "uang", "total", "berapa"],
    sentenceTopics: ["shopping"],
    readingSlugs: ["di-pasar", "di-toko-baju"],
    expressions: [],
    grammarTips: [
      { tip: "\"Se-\" prefix = one", detail: "seratus (100), seribu (1000), sebelas (11)" },
      { tip: "Read left to right", detail: "298.000 = dua ratus sembilan puluh delapan ribu" },
      { tip: "Prices drop \"ribu\"", detail: "Locals often say \"dua ratus\" for Rp 200.000" },
    ],
  },
];
