export type Sentence = {
  id: string;
  en: string;
  difficulty: "beginner" | "elementary" | "intermediate";
  topic: string;
  notes?: string;
};

export const difficultyLabels: Record<string, string> = {
  beginner: "Beginner",
  elementary: "Elementary",
  intermediate: "Intermediate",
};

export const topicLabels: Record<string, string> = {
  basics: "Basics",
  greetings: "Greetings",
  food: "Food & Ordering",
  shopping: "Shopping",
  directions: "Directions & Places",
  daily: "Daily Life",
  descriptions: "Descriptions",
  time: "Time & Schedule",
  conversation: "Conversation",
};

export const sentences: Sentence[] = [
  // ── Basics (beginner) ──
  { id: "Saya makan.", en: "I eat.", difficulty: "beginner", topic: "basics" },
  { id: "Dia tidur.", en: "He/She sleeps.", difficulty: "beginner", topic: "basics" },
  { id: "Kamu minum.", en: "You drink.", difficulty: "beginner", topic: "basics" },
  { id: "Mereka kerja.", en: "They work.", difficulty: "beginner", topic: "basics" },
  { id: "Kita belajar.", en: "We study.", difficulty: "beginner", topic: "basics" },
  { id: "Saya tau.", en: "I know.", difficulty: "beginner", topic: "basics" },
  { id: "Dia bisa.", en: "He/She can.", difficulty: "beginner", topic: "basics" },
  { id: "Ada air.", en: "There is water.", difficulty: "beginner", topic: "basics" },
  { id: "Saya punya buku.", en: "I have a book.", difficulty: "beginner", topic: "basics" },
  { id: "Dia suka kopi.", en: "He/She likes coffee.", difficulty: "beginner", topic: "basics" },
  { id: "Ini rumah.", en: "This is a house.", difficulty: "beginner", topic: "basics" },
  { id: "Itu mobil.", en: "That is a car.", difficulty: "beginner", topic: "basics" },
  { id: "Saya mau makan.", en: "I want to eat.", difficulty: "beginner", topic: "basics" },
  { id: "Kamu bisa bicara?", en: "Can you speak?", difficulty: "beginner", topic: "basics" },

  // ── Greetings (beginner) ──
  { id: "Selamat pagi!", en: "Good morning!", difficulty: "beginner", topic: "greetings" },
  { id: "Apa kabar?", en: "How are you?", difficulty: "beginner", topic: "greetings" },
  { id: "Siapa nama kamu?", en: "What is your name?", difficulty: "beginner", topic: "greetings" },
  { id: "Nama saya Niklas.", en: "My name is Niklas.", difficulty: "beginner", topic: "greetings" },
  { id: "Sampai jumpa!", en: "See you!", difficulty: "beginner", topic: "greetings" },
  { id: "Maaf, saya tidak tau.", en: "Sorry, I don't know.", difficulty: "beginner", topic: "greetings" },
  { id: "Makasih!", en: "Thanks!", difficulty: "beginner", topic: "greetings" },
  { id: "Sama-sama.", en: "You're welcome.", difficulty: "beginner", topic: "greetings" },
  { id: "Selamat malam, Bu.", en: "Good night, ma'am.", difficulty: "beginner", topic: "greetings" },

  // ── Food & Ordering (elementary) ──
  { id: "Saya suka makan nasi goreng.", en: "I like to eat fried rice.", difficulty: "elementary", topic: "food" },
  { id: "Dia minum es teh.", en: "He/She drinks iced tea.", difficulty: "elementary", topic: "food" },
  { id: "Saya mau pesan kopi.", en: "I want to order coffee.", difficulty: "elementary", topic: "food" },
  { id: "Nasi goreng enak sekali.", en: "The fried rice is very delicious.", difficulty: "elementary", topic: "food", notes: "sekali comes after adjective" },
  { id: "Saya mau kopi tanpa gula.", en: "I want coffee without sugar.", difficulty: "elementary", topic: "food" },
  { id: "Ada nasi campur?", en: "Do you have mixed rice?", difficulty: "elementary", topic: "food" },
  { id: "Saya mau pesan dua es teh.", en: "I want to order two iced teas.", difficulty: "elementary", topic: "food" },
  { id: "Sedikit gula, ya.", en: "A little sugar, please.", difficulty: "elementary", topic: "food" },
  { id: "Makan pagi di rumah.", en: "Breakfast at home.", difficulty: "elementary", topic: "food" },
  { id: "Kita makan siang di warung.", en: "We eat lunch at a warung.", difficulty: "elementary", topic: "food" },
  { id: "Minta bill.", en: "Can I have the bill?", difficulty: "elementary", topic: "food" },
  { id: "Maaf, kelapa muda habis.", en: "Sorry, young coconut is sold out.", difficulty: "elementary", topic: "food" },
  { id: "Saya tidak suka garam.", en: "I don't like salt.", difficulty: "elementary", topic: "food" },
  { id: "Dia mau makan pisang dan jeruk.", en: "He/She wants to eat banana and orange.", difficulty: "elementary", topic: "food" },

  // ── Shopping (elementary) ──
  { id: "Berapa harga ini?", en: "How much is this?", difficulty: "elementary", topic: "shopping" },
  { id: "Saya mau beli buku.", en: "I want to buy a book.", difficulty: "elementary", topic: "shopping" },
  { id: "Ini mahal sekali!", en: "This is very expensive!", difficulty: "elementary", topic: "shopping", notes: "sekali = very, after adjective" },
  { id: "Ada yang murah?", en: "Is there a cheap one?", difficulty: "elementary", topic: "shopping" },
  { id: "Berapa harga satu kilo jeruk?", en: "How much is one kilo of oranges?", difficulty: "elementary", topic: "shopping" },
  { id: "Saya tidak punya uang pas.", en: "I don't have exact change.", difficulty: "elementary", topic: "shopping" },
  { id: "Total berapa?", en: "What is the total?", difficulty: "elementary", topic: "shopping" },
  { id: "Ini uangnya.", en: "Here is the money.", difficulty: "elementary", topic: "shopping" },
  { id: "Saya mau beli tiga kilo pisang.", en: "I want to buy three kilos of bananas.", difficulty: "elementary", topic: "shopping" },

  // ── Directions & Places (elementary) ──
  { id: "Saya tinggal di Bali.", en: "I live in Bali.", difficulty: "elementary", topic: "directions" },
  { id: "Dia dari Jawa.", en: "He/She is from Java.", difficulty: "elementary", topic: "directions" },
  { id: "Saya mau pergi ke Ubud.", en: "I want to go to Ubud.", difficulty: "elementary", topic: "directions" },
  { id: "Kamu tinggal dimana?", en: "Where do you live?", difficulty: "elementary", topic: "directions" },
  { id: "Dari mana?", en: "Where are you from?", difficulty: "elementary", topic: "directions" },
  { id: "Ke mana kamu mau pergi?", en: "Where do you want to go?", difficulty: "elementary", topic: "directions" },
  { id: "Pantai di Sanur indah.", en: "The beach in Sanur is beautiful.", difficulty: "elementary", topic: "directions" },
  { id: "Saya di sini.", en: "I am here.", difficulty: "elementary", topic: "directions" },
  { id: "Ada warung di Canggu.", en: "There is a warung in Canggu.", difficulty: "elementary", topic: "directions" },

  // ── Daily Life (intermediate) ──
  { id: "Sebelum kerja, saya makan pagi di rumah.", en: "Before work, I eat breakfast at home.", difficulty: "intermediate", topic: "daily" },
  { id: "Sesudah makan siang, saya mau tidur.", en: "After lunch, I want to sleep.", difficulty: "intermediate", topic: "daily" },
  { id: "Saya sudah makan.", en: "I already ate.", difficulty: "intermediate", topic: "daily" },
  { id: "Dia belum datang.", en: "He/She hasn't come yet.", difficulty: "intermediate", topic: "daily" },
  { id: "Saya kerja di Canggu tapi tinggal di Pererenan.", en: "I work in Canggu but live in Pererenan.", difficulty: "intermediate", topic: "daily" },
  { id: "Kita bisa ketemu banyak orang lokal di sini.", en: "We can meet many local people here.", difficulty: "intermediate", topic: "daily" },
  { id: "Saya suka jalan di pagi.", en: "I like to walk in the morning.", difficulty: "intermediate", topic: "daily" },
  { id: "Dia kadang pergi ke pantai dengan teman.", en: "He/She sometimes goes to the beach with a friend.", difficulty: "intermediate", topic: "daily" },
  { id: "Saya tidak bisa renang.", en: "I can't swim.", difficulty: "intermediate", topic: "daily" },
  { id: "Dia baca buku di sore.", en: "He/She reads a book in the evening.", difficulty: "intermediate", topic: "daily" },

  // ── Descriptions (intermediate) ──
  { id: "Pererenan sangat indah tapi sedikit mahal.", en: "Pererenan is very beautiful but a little expensive.", difficulty: "intermediate", topic: "descriptions" },
  { id: "Teman saya sangat baik.", en: "My friend is very kind.", difficulty: "intermediate", topic: "descriptions" },
  { id: "Makanan di warung ini enak sekali.", en: "The food at this warung is very delicious.", difficulty: "intermediate", topic: "descriptions" },
  { id: "Ada banyak orang di pantai.", en: "There are many people at the beach.", difficulty: "intermediate", topic: "descriptions" },
  { id: "Hanya sedikit orang tinggal di sini.", en: "Only a few people live here.", difficulty: "intermediate", topic: "descriptions" },
  { id: "Ubud tidak sama dengan Canggu.", en: "Ubud is not the same as Canggu.", difficulty: "intermediate", topic: "descriptions" },
  { id: "Dia cantik sekali.", en: "She is very pretty.", difficulty: "intermediate", topic: "descriptions" },
  { id: "Rumah ini bagus.", en: "This house is good (quality).", difficulty: "intermediate", topic: "descriptions" },

  // ── Time & Schedule (intermediate) ──
  { id: "Besok saya mau pergi ke Sanur.", en: "Tomorrow I want to go to Sanur.", difficulty: "intermediate", topic: "time" },
  { id: "Kemarin saya ketemu dia di Canggu.", en: "Yesterday I ran into him/her in Canggu.", difficulty: "intermediate", topic: "time" },
  { id: "Hari ini saya tidak kerja.", en: "Today I don't work.", difficulty: "intermediate", topic: "time" },
  { id: "Sebelum tinggal di Bali, saya tinggal di Jawa.", en: "Before living in Bali, I lived in Java.", difficulty: "intermediate", topic: "time" },
  { id: "Saya mau pergi lagi besok.", en: "I want to go again tomorrow.", difficulty: "intermediate", topic: "time" },
  { id: "Tunggu, saya belum siap.", en: "Wait, I'm not ready yet.", difficulty: "intermediate", topic: "time", notes: "siap = ready (new word)" },

  // ── Conversation (intermediate) ──
  { id: "Kenapa kamu suka Bali?", en: "Why do you like Bali?", difficulty: "intermediate", topic: "conversation" },
  { id: "Karena Bali sangat indah.", en: "Because Bali is very beautiful.", difficulty: "intermediate", topic: "conversation" },
  { id: "Kamu mau pesan apa?", en: "What do you want to order?", difficulty: "intermediate", topic: "conversation" },
  { id: "Saya juga mau pergi ke sana.", en: "I also want to go there.", difficulty: "intermediate", topic: "conversation" },
  { id: "Bagaimana makanan di Ubud?", en: "How is the food in Ubud?", difficulty: "intermediate", topic: "conversation" },
  { id: "Saya tidak tau kenapa dia tidak datang.", en: "I don't know why he/she didn't come.", difficulty: "intermediate", topic: "conversation" },
  { id: "Kamu punya teman di Bali?", en: "Do you have friends in Bali?", difficulty: "intermediate", topic: "conversation" },
  { id: "Saya mau belajar Bahasa Indonesia karena saya tinggal di Bali.", en: "I want to learn Indonesian because I live in Bali.", difficulty: "intermediate", topic: "conversation" },
  { id: "Dia minta saya tunggu di sini.", en: "He/She asked me to wait here.", difficulty: "intermediate", topic: "conversation" },
  { id: "Saya punya dua anjing. Nama mereka Kacang.", en: "I have two dogs. Their name is Kacang.", difficulty: "intermediate", topic: "conversation" },
  { id: "Sebelum pergi, saya mau minum kopi.", en: "Before going, I want to drink coffee.", difficulty: "intermediate", topic: "conversation" },
  { id: "Ini punya saya, itu punya kamu.", en: "This is mine, that is yours.", difficulty: "intermediate", topic: "conversation" },
  { id: "Semua makanan di sini enak.", en: "All the food here is delicious.", difficulty: "intermediate", topic: "conversation" },
  { id: "Kapan kamu mau pergi ke Kintamani?", en: "When do you want to go to Kintamani?", difficulty: "intermediate", topic: "conversation" },
  { id: "Saya bisa bicara Bahasa Indonesia sedikit.", en: "I can speak Indonesian a little.", difficulty: "intermediate", topic: "conversation" },
  { id: "Pelan-pelan, saya tidak bisa bicara cepat.", en: "Slowly, I can't speak fast.", difficulty: "intermediate", topic: "conversation", notes: "cepat = fast (new word)" },
];

export function shuffleSentences(arr: Sentence[]): Sentence[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
