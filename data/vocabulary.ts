export type Word = {
  id: string;
  en: string;
  notes: string | null;
  category: string;
};

export type Phrase = {
  id: string;
  en: string;
  context: string;
};

export const categoryLabels: Record<string, string> = {
  pronouns: "Pronouns",
  people_titles: "People & Titles",
  greetings_phrases: "Greetings & Phrases",
  time_of_day: "Time of Day",
  time_words: "Time Words",
  question_words: "Question Words",
  prepositions: "Prepositions",
  numbers: "Numbers",
  adjectives: "Adjectives",
  verbs: "Verbs",
  nouns: "Nouns",
  food_drinks: "Food & Drinks",
  animals: "Animals",
  connectors_modifiers: "Connectors & Modifiers",
  possessives: "Possessives",
};

export const categories = Object.keys(categoryLabels);

export const words: Word[] = [
  // ── Pronouns ──
  { id: "saya", en: "I (formal)", notes: null, category: "pronouns" },
  { id: "aku", en: "I (informal)", notes: null, category: "pronouns" },
  { id: "kamu", en: "you", notes: null, category: "pronouns" },
  { id: "dia", en: "he/she", notes: null, category: "pronouns" },
  { id: "mereka", en: "they", notes: null, category: "pronouns" },
  { id: "kita", en: "we", notes: null, category: "pronouns" },

  // ── People & Titles ──
  { id: "bapak", en: "man/sir", notes: "shortened: Pak", category: "people_titles" },
  { id: "ibu", en: "woman/ma'am", notes: "shortened: Bu", category: "people_titles" },
  { id: "bli", en: "boy/brother (Balinese)", notes: "used in Bali", category: "people_titles" },
  { id: "mas", en: "boy/brother (Javanese)", notes: "used in Java", category: "people_titles" },
  { id: "mbak", en: "girl/sister (Javanese)", notes: "used in Java", category: "people_titles" },
  { id: "mbok", en: "girl/sister", notes: "older/rural", category: "people_titles" },
  { id: "orang", en: "person", notes: null, category: "people_titles" },
  { id: "teman", en: "friend", notes: null, category: "people_titles" },
  { id: "pembeli", en: "buyer/customer", notes: null, category: "people_titles" },
  { id: "penjual", en: "seller", notes: null, category: "people_titles" },
  { id: "pelayan", en: "waiter/server", notes: null, category: "people_titles" },

  // ── Greetings & Phrases ──
  { id: "apa kabar", en: "how are you?", notes: null, category: "greetings_phrases" },
  { id: "siapa nama kamu?", en: "what's your name?", notes: null, category: "greetings_phrases" },
  { id: "selamat", en: "greeting/congratulations", notes: "prefix for greetings", category: "greetings_phrases" },
  { id: "selamat pagi", en: "good morning", notes: null, category: "greetings_phrases" },
  { id: "selamat siang", en: "good afternoon", notes: null, category: "greetings_phrases" },
  { id: "selamat sore", en: "good evening", notes: null, category: "greetings_phrases" },
  { id: "selamat malam", en: "good night", notes: null, category: "greetings_phrases" },
  { id: "sampai jumpa", en: "see you/until we meet", notes: null, category: "greetings_phrases" },
  { id: "dada", en: "bye", notes: "informal", category: "greetings_phrases" },
  { id: "ayo", en: "let's go", notes: null, category: "greetings_phrases" },
  { id: "maaf", en: "sorry", notes: null, category: "greetings_phrases" },
  { id: "makasih", en: "thanks", notes: "informal for terima kasih", category: "greetings_phrases" },
  { id: "sama-sama", en: "you're welcome", notes: null, category: "greetings_phrases" },

  // ── Time of Day ──
  { id: "pagi", en: "morning", notes: null, category: "time_of_day" },
  { id: "siang", en: "afternoon", notes: null, category: "time_of_day" },
  { id: "sore", en: "evening", notes: null, category: "time_of_day" },
  { id: "malam", en: "night", notes: null, category: "time_of_day" },

  // ── Time Words ──
  { id: "besok", en: "tomorrow", notes: null, category: "time_words" },
  { id: "hari ini", en: "today", notes: null, category: "time_words" },
  { id: "hari", en: "day", notes: null, category: "time_words" },
  { id: "kemarin", en: "yesterday", notes: null, category: "time_words" },
  { id: "minggu", en: "week", notes: null, category: "time_words" },
  { id: "sebelum", en: "before", notes: null, category: "time_words" },
  { id: "sesudah", en: "after", notes: null, category: "time_words" },
  { id: "sudah", en: "already", notes: null, category: "time_words" },
  { id: "belum", en: "not yet", notes: null, category: "time_words" },
  { id: "sampai", en: "until", notes: null, category: "time_words" },
  { id: "lagi", en: "again", notes: null, category: "time_words" },
  { id: "kadang", en: "sometimes", notes: null, category: "time_words" },

  // ── Question Words ──
  { id: "apa", en: "what?", notes: null, category: "question_words" },
  { id: "siapa", en: "who?", notes: null, category: "question_words" },
  { id: "dimana", en: "where? (location)", notes: "di mana", category: "question_words" },
  { id: "ke mana", en: "where to?", notes: "direction", category: "question_words" },
  { id: "dari mana", en: "where from?", notes: "origin", category: "question_words" },
  { id: "mana", en: "where/which", notes: null, category: "question_words" },
  { id: "kapan", en: "when?", notes: null, category: "question_words" },
  { id: "mengapa", en: "why?", notes: "formal", category: "question_words" },
  { id: "kenapa", en: "why?", notes: "informal", category: "question_words" },
  { id: "bagaimana", en: "how?", notes: null, category: "question_words" },
  { id: "berapa", en: "how much?/how many?", notes: null, category: "question_words" },
  { id: "berapa harga", en: "how much does it cost?", notes: null, category: "question_words" },

  // ── Prepositions ──
  { id: "dari", en: "from", notes: null, category: "prepositions" },
  { id: "di", en: "in/at/on", notes: "location - static", category: "prepositions" },
  { id: "ke", en: "to (a place)", notes: "direction - movement", category: "prepositions" },
  { id: "sama", en: "with/same", notes: null, category: "prepositions" },
  { id: "untuk", en: "for", notes: null, category: "prepositions" },
  { id: "tanpa", en: "without", notes: null, category: "prepositions" },
  { id: "di sini", en: "here", notes: null, category: "prepositions" },

  // ── Numbers ──
  { id: "satu", en: "1 (one)", notes: null, category: "numbers" },
  { id: "dua", en: "2 (two)", notes: null, category: "numbers" },
  { id: "tiga", en: "3 (three)", notes: null, category: "numbers" },
  { id: "empat", en: "4 (four)", notes: null, category: "numbers" },
  { id: "lima", en: "5 (five)", notes: null, category: "numbers" },
  { id: "enam", en: "6 (six)", notes: null, category: "numbers" },
  { id: "tujuh", en: "7 (seven)", notes: null, category: "numbers" },
  { id: "delapan", en: "8 (eight)", notes: null, category: "numbers" },
  { id: "sembilan", en: "9 (nine)", notes: null, category: "numbers" },
  { id: "sepuluh", en: "10 (ten)", notes: null, category: "numbers" },
  { id: "sebelas", en: "11 (eleven)", notes: "se + belas", category: "numbers" },
  { id: "dua belas", en: "12 (twelve)", notes: "number + belas", category: "numbers" },
  { id: "dua puluh", en: "20 (twenty)", notes: "number + puluh", category: "numbers" },
  { id: "dua ratus", en: "200", notes: "number + ratus", category: "numbers" },
  { id: "dua ribu", en: "2,000", notes: "number + ribu", category: "numbers" },
  { id: "dua juta", en: "2,000,000", notes: "number + juta", category: "numbers" },
  { id: "belas", en: "teen (11-19)", notes: "suffix", category: "numbers" },
  { id: "puluh", en: "tens", notes: "suffix", category: "numbers" },
  { id: "ratus", en: "hundreds", notes: "suffix", category: "numbers" },
  { id: "ribu", en: "thousands", notes: "suffix", category: "numbers" },
  { id: "juta", en: "millions", notes: "suffix", category: "numbers" },

  // ── Adjectives ──
  { id: "bagus", en: "good (quality)", notes: "for things", category: "adjectives" },
  { id: "baik", en: "good (character)", notes: "for people", category: "adjectives" },
  { id: "enak", en: "good/delicious (taste)", notes: "for food", category: "adjectives" },
  { id: "cantik", en: "pretty/beautiful", notes: "for people", category: "adjectives" },
  { id: "indah", en: "beautiful", notes: "for places/things", category: "adjectives" },
  { id: "mahal", en: "expensive", notes: null, category: "adjectives" },
  { id: "murah", en: "cheap", notes: null, category: "adjectives" },
  { id: "gila", en: "crazy", notes: null, category: "adjectives" },
  { id: "banyak", en: "many/a lot", notes: null, category: "adjectives" },
  { id: "sedikit", en: "a little/few", notes: null, category: "adjectives" },
  { id: "pelan-pelan", en: "slowly", notes: null, category: "adjectives" },
  { id: "lokal", en: "local", notes: null, category: "adjectives" },

  // ── Verbs ──
  { id: "tau", en: "know", notes: "informal for tahu", category: "verbs" },
  { id: "suka", en: "like", notes: null, category: "verbs" },
  { id: "mau", en: "want", notes: null, category: "verbs" },
  { id: "punya", en: "have", notes: null, category: "verbs" },
  { id: "ada", en: "there is/are, exist", notes: null, category: "verbs" },
  { id: "bisa", en: "can/able to", notes: null, category: "verbs" },
  { id: "makan", en: "eat", notes: null, category: "verbs" },
  { id: "minum", en: "drink", notes: null, category: "verbs" },
  { id: "tidur", en: "sleep", notes: null, category: "verbs" },
  { id: "pergi", en: "go", notes: null, category: "verbs" },
  { id: "datang", en: "come", notes: null, category: "verbs" },
  { id: "jalan", en: "walk", notes: null, category: "verbs" },
  { id: "kerja", en: "work", notes: null, category: "verbs" },
  { id: "belajar", en: "study", notes: null, category: "verbs" },
  { id: "bicara", en: "speak", notes: null, category: "verbs" },
  { id: "beli", en: "buy", notes: null, category: "verbs" },
  { id: "jual", en: "sell", notes: null, category: "verbs" },
  { id: "tinggal", en: "live/stay", notes: null, category: "verbs" },
  { id: "baca", en: "read", notes: null, category: "verbs" },
  { id: "ketemu", en: "meet/run into", notes: "informal", category: "verbs" },
  { id: "jumpa", en: "meet", notes: "formal", category: "verbs" },
  { id: "pesan", en: "order", notes: "at restaurant", category: "verbs" },
  { id: "tunggu", en: "wait", notes: null, category: "verbs" },
  { id: "minta", en: "ask for/request", notes: null, category: "verbs" },
  { id: "renang", en: "swim", notes: null, category: "verbs" },

  // ── Nouns ──
  { id: "nama", en: "name", notes: null, category: "nouns" },
  { id: "makanan", en: "food", notes: null, category: "nouns" },
  { id: "minuman", en: "drink (noun)", notes: null, category: "nouns" },
  { id: "rumah", en: "house", notes: null, category: "nouns" },
  { id: "mobil", en: "car", notes: null, category: "nouns" },
  { id: "buku", en: "book", notes: null, category: "nouns" },
  { id: "HP", en: "phone", notes: "handphone", category: "nouns" },
  { id: "pulpen", en: "pen", notes: null, category: "nouns" },
  { id: "uang", en: "money", notes: null, category: "nouns" },
  { id: "uang pas", en: "exact change", notes: null, category: "nouns" },
  { id: "harga", en: "price", notes: null, category: "nouns" },
  { id: "laptop", en: "laptop", notes: null, category: "nouns" },
  { id: "kata kerja", en: "verb", notes: null, category: "nouns" },
  { id: "kelas", en: "class", notes: null, category: "nouns" },
  { id: "pantai", en: "beach", notes: null, category: "nouns" },
  { id: "warung", en: "small restaurant/food stall", notes: null, category: "nouns" },
  { id: "porsi", en: "portion", notes: null, category: "nouns" },

  // ── Food & Drinks ──
  { id: "nasi", en: "rice", notes: null, category: "food_drinks" },
  { id: "nasi goreng", en: "fried rice", notes: null, category: "food_drinks" },
  { id: "nasi campur", en: "mixed rice", notes: null, category: "food_drinks" },
  { id: "makan pagi", en: "breakfast", notes: null, category: "food_drinks" },
  { id: "makan siang", en: "lunch", notes: null, category: "food_drinks" },
  { id: "makan malam", en: "dinner", notes: null, category: "food_drinks" },
  { id: "kopi", en: "coffee", notes: null, category: "food_drinks" },
  { id: "teh", en: "tea", notes: null, category: "food_drinks" },
  { id: "es teh", en: "iced tea", notes: null, category: "food_drinks" },
  { id: "air", en: "water", notes: null, category: "food_drinks" },
  { id: "kelapa muda", en: "young coconut", notes: null, category: "food_drinks" },
  { id: "es kelapa muda", en: "iced young coconut", notes: null, category: "food_drinks" },
  { id: "gula", en: "sugar", notes: null, category: "food_drinks" },
  { id: "garam", en: "salt", notes: null, category: "food_drinks" },
  { id: "jeruk", en: "orange", notes: null, category: "food_drinks" },
  { id: "pisang", en: "banana", notes: null, category: "food_drinks" },
  { id: "apel", en: "apple", notes: null, category: "food_drinks" },
  { id: "pizza", en: "pizza", notes: null, category: "food_drinks" },
  { id: "alkohol", en: "alcohol", notes: null, category: "food_drinks" },

  // ── Animals ──
  { id: "anjing", en: "dog", notes: "also used as swear word", category: "animals" },
  { id: "babi", en: "pig", notes: null, category: "animals" },

  // ── Connectors & Modifiers ──
  { id: "ya", en: "yes", notes: null, category: "connectors_modifiers" },
  { id: "tidak", en: "not/no", notes: "formal", category: "connectors_modifiers" },
  { id: "dan", en: "and", notes: null, category: "connectors_modifiers" },
  { id: "tapi", en: "but", notes: null, category: "connectors_modifiers" },
  { id: "karena", en: "because", notes: null, category: "connectors_modifiers" },
  { id: "ini", en: "this", notes: null, category: "connectors_modifiers" },
  { id: "itu", en: "that/the", notes: null, category: "connectors_modifiers" },
  { id: "sekali", en: "very", notes: "placed after adjective", category: "connectors_modifiers" },
  { id: "hanya", en: "only", notes: null, category: "connectors_modifiers" },
  { id: "juga", en: "also/too", notes: null, category: "connectors_modifiers" },
  { id: "habis", en: "sold out/finished", notes: null, category: "connectors_modifiers" },
  { id: "semua", en: "all/everything", notes: null, category: "connectors_modifiers" },
  { id: "total", en: "total", notes: null, category: "connectors_modifiers" },

  // ── Possessives ──
  { id: "punya saya", en: "mine", notes: null, category: "possessives" },
  { id: "punya kamu", en: "yours", notes: null, category: "possessives" },
  { id: "punya dia", en: "his/hers", notes: null, category: "possessives" },
];

export const phrases: Phrase[] = [
  // Shopping
  { id: "Berapa harga?", en: "How much does it cost?", context: "shopping" },
  { id: "Berapa harga 1 kg apel?", en: "How much for 1 kg of apples?", context: "shopping" },
  { id: "Mau beli berapa kilo?", en: "How many kilos do you want to buy?", context: "shopping" },
  { id: "Saya mau beli", en: "I want to buy", context: "shopping" },
  { id: "Ada uang pas?", en: "Do you have exact change?", context: "shopping" },
  { id: "Ini uangnya", en: "Here's the money", context: "shopping" },
  // Restaurant
  { id: "Mau pesan apa?", en: "What would you like to order?", context: "restaurant" },
  { id: "Saya mau pesan...", en: "I would like to order...", context: "restaurant" },
  { id: "Maaf, ... habis", en: "Sorry, ... is sold out", context: "restaurant" },
  { id: "Ada ...?", en: "Do you have ...?", context: "restaurant" },
  { id: "Sedikit gula", en: "A little sugar", context: "restaurant" },
  { id: "Tanpa gula", en: "Without sugar", context: "restaurant" },
  { id: "Berapa semua?", en: "How much for everything?", context: "restaurant" },
  { id: "Minta bill", en: "Can I have the bill?", context: "restaurant" },
  // Daily
  { id: "Aku suka makan...", en: "I like to eat...", context: "daily" },
  { id: "Aku mau pergi ke...", en: "I want to go to...", context: "daily" },
  { id: "Dimana kamu tinggal?", en: "Where do you live?", context: "daily" },
  { id: "Dari mana?", en: "Where are you from?", context: "daily" },
  { id: "Ke mana?", en: "Where are you going?", context: "daily" },
];

/** Helper: get words filtered by category */
export function getWordsByCategory(cat: string): Word[] {
  return words.filter((w) => w.category === cat);
}

/** Helper: get a shuffled copy of words */
export function shuffleWords(arr: Word[]): Word[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
