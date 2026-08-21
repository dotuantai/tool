export interface JapaneseWord {
  id: number
  japanese: string   // Kanji or kana display form
  romaji: string     // Romanization (for reference)
  vietnamese: string // Vietnamese meaning
}

export const japaneseVocab: JapaneseWord[] = [
  // Greetings & basics
  { id: 1,  japanese: 'こんにちは',  romaji: 'konnichiwa',  vietnamese: 'Xin chào' },
  { id: 2,  japanese: 'ありがとう',  romaji: 'arigatou',    vietnamese: 'Cảm ơn' },
  { id: 3,  japanese: 'すみません',  romaji: 'sumimasen',   vietnamese: 'Xin lỗi' },
  { id: 4,  japanese: 'おはよう',    romaji: 'ohayou',      vietnamese: 'Chào buổi sáng' },
  { id: 5,  japanese: 'さようなら',  romaji: 'sayounara',   vietnamese: 'Tạm biệt' },
  { id: 6,  japanese: 'はい',        romaji: 'hai',         vietnamese: 'Vâng / Có' },
  { id: 7,  japanese: 'いいえ',      romaji: 'iie',         vietnamese: 'Không' },
  { id: 8,  japanese: 'おやすみ',    romaji: 'oyasumi',     vietnamese: 'Chúc ngủ ngon' },

  // Numbers & time
  { id: 9,  japanese: 'いち',        romaji: 'ichi',        vietnamese: 'Một' },
  { id: 10, japanese: 'に',          romaji: 'ni',          vietnamese: 'Hai' },
  { id: 11, japanese: 'さん',        romaji: 'san',         vietnamese: 'Ba' },
  { id: 12, japanese: 'きょう',      romaji: 'kyou',        vietnamese: 'Hôm nay' },
  { id: 13, japanese: 'あした',      romaji: 'ashita',      vietnamese: 'Ngày mai' },
  { id: 14, japanese: 'きのう',      romaji: 'kinou',       vietnamese: 'Hôm qua' },

  // Colors
  { id: 15, japanese: 'あか',        romaji: 'aka',         vietnamese: 'Màu đỏ' },
  { id: 16, japanese: 'あお',        romaji: 'ao',          vietnamese: 'Màu xanh' },
  { id: 17, japanese: 'しろ',        romaji: 'shiro',       vietnamese: 'Màu trắng' },
  { id: 18, japanese: 'くろ',        romaji: 'kuro',        vietnamese: 'Màu đen' },
  { id: 19, japanese: 'き',          romaji: 'ki',          vietnamese: 'Màu vàng' },

  // Nature & places
  { id: 20, japanese: 'やま',        romaji: 'yama',        vietnamese: 'Núi' },
  { id: 21, japanese: 'かわ',        romaji: 'kawa',        vietnamese: 'Sông' },
  { id: 22, japanese: 'うみ',        romaji: 'umi',         vietnamese: 'Biển' },
  { id: 23, japanese: 'そら',        romaji: 'sora',        vietnamese: 'Bầu trời' },
  { id: 24, japanese: 'はな',        romaji: 'hana',        vietnamese: 'Hoa' },

  // Food & drink
  { id: 25, japanese: 'みず',        romaji: 'mizu',        vietnamese: 'Nước' },
  { id: 26, japanese: 'ごはん',      romaji: 'gohan',       vietnamese: 'Cơm / Bữa ăn' },
  { id: 27, japanese: 'さかな',      romaji: 'sakana',      vietnamese: 'Cá' },
  { id: 28, japanese: 'にく',        romaji: 'niku',        vietnamese: 'Thịt' },
  { id: 29, japanese: 'たまご',      romaji: 'tamago',      vietnamese: 'Trứng' },

  // Common adjectives
  { id: 30, japanese: 'おおきい',    romaji: 'ookii',       vietnamese: 'To lớn' },
  { id: 31, japanese: 'ちいさい',    romaji: 'chiisai',     vietnamese: 'Nhỏ bé' },
  { id: 32, japanese: 'あたらしい',  romaji: 'atarashii',   vietnamese: 'Mới' },
  { id: 33, japanese: 'ふるい',      romaji: 'furui',       vietnamese: 'Cũ / Cổ' },
  { id: 34, japanese: 'たかい',      romaji: 'takai',       vietnamese: 'Đắt / Cao' },
  { id: 35, japanese: 'やすい',      romaji: 'yasui',       vietnamese: 'Rẻ' },

  // Common verbs
  { id: 36, japanese: 'たべる',      romaji: 'taberu',      vietnamese: 'Ăn' },
  { id: 37, japanese: 'のむ',        romaji: 'nomu',        vietnamese: 'Uống' },
  { id: 38, japanese: 'みる',        romaji: 'miru',        vietnamese: 'Nhìn / Xem' },
  { id: 39, japanese: 'きく',        romaji: 'kiku',        vietnamese: 'Nghe' },
  { id: 40, japanese: 'はなす',      romaji: 'hanasu',      vietnamese: 'Nói chuyện' },
  { id: 41, japanese: 'よむ',        romaji: 'yomu',        vietnamese: 'Đọc' },
  { id: 42, japanese: 'かく',        romaji: 'kaku',        vietnamese: 'Viết' },
  { id: 43, japanese: 'あるく',      romaji: 'aruku',       vietnamese: 'Đi bộ' },
  { id: 44, japanese: 'はしる',      romaji: 'hashiru',     vietnamese: 'Chạy' },

  // Family
  { id: 45, japanese: 'おかあさん',  romaji: 'okaasan',     vietnamese: 'Mẹ' },
  { id: 46, japanese: 'おとうさん',  romaji: 'otousan',     vietnamese: 'Bố / Cha' },
  { id: 47, japanese: 'おにいさん',  romaji: 'oniisan',     vietnamese: 'Anh trai' },
  { id: 48, japanese: 'いもうと',    romaji: 'imouto',      vietnamese: 'Em gái' },
  { id: 49, japanese: 'ともだち',    romaji: 'tomodachi',   vietnamese: 'Bạn bè' },

  // School & work
  { id: 50, japanese: 'がっこう',    romaji: 'gakkou',      vietnamese: 'Trường học' },
]
