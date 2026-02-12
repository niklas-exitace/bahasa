export type DialogueLine = {
  speaker: string;
  text: string;
};

export type Question = {
  id: string;
  en: string;
};

export type Reading = {
  slug: string;
  title: string;
  titleEn: string;
  type: "dialogue" | "passage";
  vocabPreview: string[];
  lines: DialogueLine[] | null;
  paragraphs: string[] | null;
  questions: Question[];
  keyPhrases?: Array<{ id: string; en: string }>;
};

export const readings: Reading[] = [
  {
    slug: "di-pasar",
    title: "Di Pasar",
    titleEn: "At the Market",
    type: "dialogue",
    vocabPreview: ["pembeli", "penjual", "jeruk", "pisang", "harga", "kilo"],
    lines: [
      { speaker: "Pembeli", text: "Mbak, ada jeruk?" },
      { speaker: "Penjual", text: "Ya, mau jeruk apa?" },
      { speaker: "Pembeli", text: "Ini jeruk apa? Berapa harga?" },
      { speaker: "Penjual", text: "Itu jeruk Kintamani. Itu enak. Rp. 8.000 per kilo. Mau beli berapa kilo?" },
      { speaker: "Pembeli", text: "Saya mau beli 2 kilo. Ada pisang?" },
      { speaker: "Penjual", text: "Ada. Harga pisang Rp 20.000" },
      { speaker: "Pembeli", text: "Oke mbak. Saya beli" },
      { speaker: "Penjual", text: "Total Rp 36.000" },
      { speaker: "Pembeli", text: "Oke. Ini uangnya." },
    ],
    paragraphs: null,
    questions: [
      { id: "Pembeli beli apa?", en: "What does the buyer buy?" },
      { id: "Berapa harga jeruk 2 kilo?", en: "How much for 2 kg of oranges?" },
      { id: "Berapa harga pisang?", en: "How much are the bananas?" },
    ],
  },
  {
    slug: "di-restoran",
    title: "Di Restoran",
    titleEn: "At the Restaurant",
    type: "dialogue",
    vocabPreview: ["pelayan", "pesan", "nasi campur", "kelapa muda", "habis", "es teh", "gula"],
    lines: [
      { speaker: "Pelayan", text: "Selamat siang pak, mau pesan apa?" },
      { speaker: "Pembeli", text: "Saya mau pesan nasi campur porsi 20 ribu dan es kelapa muda." },
      { speaker: "Pelayan", text: "Maaf pak, kelapa muda habis." },
      { speaker: "Pembeli", text: "Oke. Ada es teh?" },
      { speaker: "Pelayan", text: "Ada pak." },
      { speaker: "Pembeli", text: "Pesan satu es teh sedikit gula." },
      { speaker: "Pelayan", text: "Ya pak." },
      { speaker: "Narrator", text: "Sesudah makan..." },
      { speaker: "Pembeli", text: "Berapa semua, bli?" },
      { speaker: "Pelayan", text: "Total Rp. 25.000" },
      { speaker: "Pembeli", text: "Ini, bli" },
      { speaker: "Pelayan", text: "Ada uang pas?" },
      { speaker: "Pembeli", text: "Tunggu... Oh ada. Ini bli." },
      { speaker: "Pelayan", text: "Makasih pak." },
      { speaker: "Pembeli", text: "Sama-sama." },
    ],
    paragraphs: null,
    questions: [
      { id: "Pembeli mau pesan apa?", en: "What does the buyer want to order?" },
      { id: "Kenapa tidak bisa pesan kelapa muda?", en: "Why can't they order young coconut?" },
      { id: "Berapa total?", en: "What is the total?" },
    ],
    keyPhrases: [
      { id: "Mau pesan apa?", en: "What would you like to order?" },
      { id: "...habis", en: "...is sold out" },
      { id: "Berapa semua?", en: "How much for everything?" },
      { id: "Ada uang pas?", en: "Do you have exact change?" },
    ],
  },
  {
    slug: "di-toko-baju",
    title: "Di Toko Baju",
    titleEn: "At the Clothing Store",
    type: "dialogue",
    vocabPreview: ["permisi", "baju", "kemeja", "warna", "hitam", "merah", "harga", "lumayan", "mahal", "kasir"],
    lines: [
      { speaker: "Pembeli", text: "Permisi bu, saya mau beli baju untuk kerja." },
      { speaker: "Penjual", text: "Iya mbak. Silahkan lihat-lihat." },
      { speaker: "Pembeli", text: "Makasi bu. Ada kemeja warna hitam?" },
      { speaker: "Penjual", text: "Ada mbak. Ini." },
      { speaker: "Pembeli", text: "Berapa harga yang ini?" },
      { speaker: "Penjual", text: "Yang ini Rp. 400.000." },
      { speaker: "Pembeli", text: "Lumayan mahal. Yang merah berapa bu?" },
      { speaker: "Penjual", text: "Yang itu?" },
      { speaker: "Pembeli", text: "Ya, yang itu." },
      { speaker: "Penjual", text: "Itu Rp. 200.000, mbak." },
      { speaker: "Pembeli", text: "Bisa kurang bu?" },
      { speaker: "Penjual", text: "Enggak mbak. Itu harga pas." },
      { speaker: "Pembeli", text: "Oke bu, saya beli itu." },
      { speaker: "Penjual", text: "Silahkan bayar di kasir, mbak." },
      { speaker: "Pembeli", text: "Oke." },
    ],
    paragraphs: null,
    questions: [
      { id: "Pembeli mau beli apa?", en: "What does the buyer want to buy?" },
      { id: "Berapa harga kemeja hitam?", en: "How much is the black shirt?" },
      { id: "Kenapa pembeli tidak beli yang hitam?", en: "Why doesn't the buyer buy the black one?" },
      { id: "Bisa kurang harga kemeja merah?", en: "Can the red shirt's price be reduced?" },
    ],
    keyPhrases: [
      { id: "Silahkan lihat-lihat", en: "Please look around" },
      { id: "Bisa kurang?", en: "Can you reduce the price?" },
      { id: "Harga pas", en: "Fixed price" },
      { id: "Silahkan bayar di kasir", en: "Please pay at the register" },
    ],
  },
  {
    slug: "di-counter-hp",
    title: "Di Counter HP",
    titleEn: "At the Phone Counter",
    type: "dialogue",
    vocabPreview: ["permisi", "pulsa", "enggak", "isi", "tunggu", "sudah", "uang", "sama-sama"],
    lines: [
      { speaker: "Pembeli", text: "Permisi mas, saya mau beli pulsa." },
      { speaker: "Penjual", text: "Mau pulsa apa?" },
      { speaker: "Pembeli", text: "Pulsa Telkomsel, mas." },
      { speaker: "Penjual", text: "Berapa?" },
      { speaker: "Pembeli", text: "Pulsa 75.000 ada?" },
      { speaker: "Penjual", text: "Enggak ada, mbak. Isi dua kali, 50 dan 25." },
      { speaker: "Pembeli", text: "Oke, enggak apa-apa." },
      { speaker: "Penjual", text: "Tunggu ya, mbak." },
      { speaker: "Narrator", text: "(Setelah beberapa waktu...)" },
      { speaker: "Penjual", text: "Pulsa sudah masuk?" },
      { speaker: "Pembeli", text: "Sudah mas. Ini uangnya." },
      { speaker: "Penjual", text: "Ini pas ya. Makasi, mbak." },
      { speaker: "Pembeli", text: "Sama-sama." },
    ],
    paragraphs: null,
    questions: [
      { id: "Pembeli mau beli apa?", en: "What does the buyer want to buy?" },
      { id: "Pulsa 75.000 ada?", en: "Is 75,000 credit available?" },
      { id: "Bagaimana isi pulsa?", en: "How do they top up the credit?" },
    ],
    keyPhrases: [
      { id: "Beli pulsa", en: "Buy phone credit" },
      { id: "Enggak apa-apa", en: "It's okay / No problem" },
      { id: "Tunggu ya", en: "Please wait" },
      { id: "Sudah masuk", en: "Already received/entered" },
    ],
  },
  {
    slug: "rumah-di-pererenan",
    title: "Rumah di Pererenan",
    titleEn: "House in Pererenan",
    type: "passage",
    vocabPreview: ["tinggal", "anjing", "sebelum", "teman", "kemarin", "baik", "nasi goreng", "tanpa", "indah", "renang", "pantai"],
    lines: null,
    paragraphs: [
      "Pertama, saya sangat suka tinggal di Pererenan karena sangat indah dan tidak ada banyak orang. Tapi tinggal di Pererenan sedikit mahal. Saya tinggal dengan 2 anjing. Sebelum saya pergi kerja, saya makan pagi di rumah dengan anjing saya. Di Pererenan kita bisa ketemu banyak orang lokal. Saya punya teman di Canggu tapi saya tidak tau siapa nama dia. Saya ketemu dia di Canggu kemarin. Dia sangat baik. Dia suka makan nasi goreng tapi tanpa gula.",
      "Kedua, ada banyak orang yang mau tinggal di Pererenan tapi tidak bisa karena ada banyak aturan. Di sini kita bisa pesan makanan di Gojek. Sebelum tinggal di sini, saya tinggal di Ubud. Saya juga suka Ubud karena sangat indah. Tapi kita tidak bisa renang karena tidak ada pantai. Saya suka minum kopi tanpa gula. Saya mau pergi ke Ubud lagi.",
    ],
    questions: [
      { id: "Dia tinggal dimana?", en: "Where does he/she live?" },
      { id: "Dia punya berapa anjing?", en: "How many dogs does he/she have?" },
      { id: "Kenapa dia tidak bisa renang di Ubud?", en: "Why can't he/she swim in Ubud?" },
    ],
  },
  {
    slug: "sanur-beach",
    title: "Sanur Beach",
    titleEn: "Sanur Beach",
    type: "passage",
    vocabPreview: ["pagi", "anjing", "pizza", "uang", "makan siang", "mahal", "pantai", "harga", "kerja", "alkohol", "besok"],
    lines: null,
    paragraphs: [
      "Saya mau pergi ke Sanur di pagi dengan anjing saya. Anjing saya suka makan pizza tapi saya tidak bisa beli karena saya tidak punya uang. Nama dia Kacang. Sesudah itu saya mau makan siang di Sanur karena makanan tidak mahal. Ada banyak anjing di pantai Sanur. Harga pizza di Sanur Rp 658.000. Sanur tidak sama dengan Ubud dan Canggu. Sebelum saya kerja di Sanur, saya kerja di Canggu.",
      "Kenapa banyak orang mau pergi ke Sanur? Karena di Sanur kita bisa juga beli alkohol. Saya juga suka kerja di Sanur. Saya mau pergi ke Sanur besok.",
    ],
    questions: [
      { id: "Siapa nama anjing dia?", en: "What is the dog's name?" },
      { id: "Berapa harga pizza di Sanur?", en: "How much is pizza in Sanur?" },
      { id: "Sebelum di Sanur, dia kerja dimana?", en: "Before Sanur, where did he/she work?" },
    ],
  },
  {
    slug: "toni-pintuar",
    title: "Toni Pintuar",
    titleEn: "Toni Pintuar",
    type: "passage",
    vocabPreview: ["suka", "kerja", "banyak", "warung", "beli", "alkohol", "mahal", "uang", "pantai", "anjing", "nama", "sebelum", "pagi", "kadang", "orang lokal", "gila"],
    lines: null,
    paragraphs: [
      "Toni suka kerja di Bali, dia tidak dari Jawa. Dia suka beli banyak makanan di warung di Canggu. Dia tinggal di Umalas. Toni tidak bisa beli alkohol karena alkohol mahal. Dia tidak punya uang karena dia tidak kerja. Dia suka pergi ke pantai dengan anjing dia. Apa nama anjing dia? Nama anjing dia Kacang. Sebelum tinggal di Umalas dia tinggal di Pererenan. Di pagi Toni kadang ketemu orang lokal. Ada banyak orang lokal di Pererenan dari Tabanan. Toni gila. Siapa Toni? Dan dia dari mana?",
    ],
    questions: [
      { id: "Toni tinggal dimana?", en: "Where does Toni live?" },
      { id: "Kenapa Toni tidak bisa beli alkohol?", en: "Why can't Toni buy alcohol?" },
      { id: "Sebelum di Umalas, Toni tinggal dimana?", en: "Before Umalas, where did Toni live?" },
    ],
  },
];
