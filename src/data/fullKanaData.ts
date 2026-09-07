export interface FullKanaItem {
  hiragana: string
  katakana: string
  romaji: string
  row: string
  group: 'seion' | 'dakuon' | 'yoon'
  // Optional metadata for basic characters
  strokeCount?: number
  example?: {
    word: string
    romaji: string
    meaning: string
    emoji: string
  }
}

export interface KanaRowGroup {
  rowName: string
  group: 'seion' | 'dakuon' | 'yoon'
  items: (FullKanaItem | null)[] // null for empty cells in 5-column grid
}

// ── 1. Seion (46 Chữ cơ bản xếp theo ma trận 5 cột: a, i, u, e, o) ──
export const seionRows: KanaRowGroup[] = [
  {
    rowName: 'Hàng A (あ / ア)',
    group: 'seion',
    items: [
      { hiragana: 'あ', katakana: 'ア', romaji: 'a', row: 'Hàng A', group: 'seion', example: { word: 'あめ', romaji: 'ame', meaning: 'Cơn mưa / Kẹo', emoji: '🌧️' }, strokeCount: 3 },
      { hiragana: 'い', katakana: 'イ', romaji: 'i', row: 'Hàng A', group: 'seion', example: { word: 'いぬ', romaji: 'inu', meaning: 'Chú chó', emoji: '🐶' }, strokeCount: 2 },
      { hiragana: 'う', katakana: 'ウ', romaji: 'u', row: 'Hàng A', group: 'seion', example: { word: 'うみ', romaji: 'umi', meaning: 'Biển cả', emoji: '🌊' }, strokeCount: 2 },
      { hiragana: 'え', katakana: 'エ', romaji: 'e', row: 'Hàng A', group: 'seion', example: { word: 'えき', romaji: 'eki', meaning: 'Nhà ga', emoji: '🚉' }, strokeCount: 2 },
      { hiragana: 'お', katakana: 'オ', romaji: 'o', row: 'Hàng A', group: 'seion', example: { word: 'お茶', romaji: 'ocha', meaning: 'Trà xanh', emoji: '🍵' }, strokeCount: 3 },
    ],
  },
  {
    rowName: 'Hàng Ka (か / カ)',
    group: 'seion',
    items: [
      { hiragana: 'か', katakana: 'カ', romaji: 'ka', row: 'Hàng Ka', group: 'seion', example: { word: 'かさ', romaji: 'kasa', meaning: 'Cái ô / dù', emoji: '☂️' }, strokeCount: 3 },
      { hiragana: 'き', katakana: 'キ', romaji: 'ki', row: 'Hàng Ka', group: 'seion', example: { word: 'き', romaji: 'ki', meaning: 'Cái cây', emoji: '🌳' }, strokeCount: 4 },
      { hiragana: 'く', katakana: 'ク', romaji: 'ku', row: 'Hàng Ka', group: 'seion', example: { word: 'くるま', romaji: 'kuruma', meaning: 'Xe hơi', emoji: '🚗' }, strokeCount: 1 },
      { hiragana: 'け', katakana: 'ケ', romaji: 'ke', row: 'Hàng Ka', group: 'seion', example: { word: 'けむり', romaji: 'kemuri', meaning: 'Khói', emoji: '💨' }, strokeCount: 3 },
      { hiragana: 'こ', katakana: 'コ', romaji: 'ko', row: 'Hàng Ka', group: 'seion', example: { word: 'こども', romaji: 'kodomo', meaning: 'Trẻ em', emoji: '👶' }, strokeCount: 2 },
    ],
  },
  {
    rowName: 'Hàng Sa (さ / サ)',
    group: 'seion',
    items: [
      { hiragana: 'さ', katakana: 'サ', romaji: 'sa', row: 'Hàng Sa', group: 'seion', example: { word: 'さくら', romaji: 'sakura', meaning: 'Hoa anh đào', emoji: '🌸' }, strokeCount: 3 },
      { hiragana: 'し', katakana: 'シ', romaji: 'shi', row: 'Hàng Sa', group: 'seion', example: { word: 'しま', romaji: 'shima', meaning: 'Hòn đảo', emoji: '🏝️' }, strokeCount: 1 },
      { hiragana: 'す', katakana: 'ス', romaji: 'su', row: 'Hàng Sa', group: 'seion', example: { word: 'すし', romaji: 'sushi', meaning: 'Món Sushi', emoji: '🍣' }, strokeCount: 2 },
      { hiragana: 'せ', katakana: 'セ', romaji: 'se', row: 'Hàng Sa', group: 'seion', example: { word: 'せかい', romaji: 'sekai', meaning: 'Thế giới', emoji: '🌍' }, strokeCount: 3 },
      { hiragana: 'そ', katakana: 'ソ', romaji: 'so', row: 'Hàng Sa', group: 'seion', example: { word: 'そら', romaji: 'sora', meaning: 'Bầu trời', emoji: '☁️' }, strokeCount: 1 },
    ],
  },
  {
    rowName: 'Hàng Ta (た / タ)',
    group: 'seion',
    items: [
      { hiragana: 'た', katakana: 'タ', romaji: 'ta', row: 'Hàng Ta', group: 'seion', example: { word: 'たいよう', romaji: 'taiyou', meaning: 'Mặt trời', emoji: '☀️' }, strokeCount: 4 },
      { hiragana: 'ち', katakana: 'チ', romaji: 'chi', row: 'Hàng Ta', group: 'seion', example: { word: 'ちず', romaji: 'chizu', meaning: 'Bản đồ', emoji: '🗺️' }, strokeCount: 2 },
      { hiragana: 'つ', katakana: 'ツ', romaji: 'tsu', row: 'Hàng Ta', group: 'seion', example: { word: 'つき', romaji: 'tsuki', meaning: 'Mặt trăng', emoji: '🌙' }, strokeCount: 1 },
      { hiragana: 'て', katakana: 'テ', romaji: 'te', row: 'Hàng Ta', group: 'seion', example: { word: 'て', romaji: 'te', meaning: 'Bàn tay', emoji: '✋' }, strokeCount: 1 },
      { hiragana: 'と', katakana: 'ト', romaji: 'to', row: 'Hàng Ta', group: 'seion', example: { word: 'とり', romaji: 'tori', meaning: 'Con chim', emoji: '🐦' }, strokeCount: 2 },
    ],
  },
  {
    rowName: 'Hàng Na (な / ナ)',
    group: 'seion',
    items: [
      { hiragana: 'な', katakana: 'ナ', romaji: 'na', row: 'Hàng Na', group: 'seion', example: { word: 'なつ', romaji: 'natsu', meaning: 'Mùa hè', emoji: '🏖️' }, strokeCount: 4 },
      { hiragana: 'に', katakana: 'ニ', romaji: 'ni', row: 'Hàng Na', group: 'seion', example: { word: 'にじ', romaji: 'niji', meaning: 'Cầu vồng', emoji: '🌈' }, strokeCount: 3 },
      { hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu', row: 'Hàng Na', group: 'seion', example: { word: 'ぬいぐるみ', romaji: 'nuigurumi', meaning: 'Thú nhồi bông', emoji: '🧸' }, strokeCount: 2 },
      { hiragana: 'ね', katakana: 'ネ', romaji: 'ne', row: 'Hàng Na', group: 'seion', example: { word: 'ねこ', romaji: 'neko', meaning: 'Con mèo', emoji: '🐱' }, strokeCount: 2 },
      { hiragana: 'の', katakana: 'ノ', romaji: 'no', row: 'Hàng Na', group: 'seion', example: { word: 'のり', romaji: 'nori', meaning: 'Rong biển', emoji: '🍙' }, strokeCount: 1 },
    ],
  },
  {
    rowName: 'Hàng Ha (は / ハ)',
    group: 'seion',
    items: [
      { hiragana: 'は', katakana: 'ハ', romaji: 'ha', row: 'Hàng Ha', group: 'seion', example: { word: 'はな', romaji: 'hana', meaning: 'Bông hoa', emoji: '🌺' }, strokeCount: 3 },
      { hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi', row: 'Hàng Ha', group: 'seion', example: { word: 'ひ', romaji: 'hi', meaning: 'Ngọn lửa', emoji: '🔥' }, strokeCount: 1 },
      { hiragana: 'ふ', katakana: 'フ', romaji: 'fu', row: 'Hàng Ha', group: 'seion', example: { word: 'ふね', romaji: 'fune', meaning: 'Con thuyền', emoji: '⛵' }, strokeCount: 4 },
      { hiragana: 'へ', katakana: 'ヘ', romaji: 'he', row: 'Hàng Ha', group: 'seion', example: { word: 'へび', romaji: 'hebi', meaning: 'Con rắn', emoji: '🐍' }, strokeCount: 1 },
      { hiragana: 'ほ', katakana: 'ホ', romaji: 'ho', row: 'Hàng Ha', group: 'seion', example: { word: 'ほし', romaji: 'hoshi', meaning: 'Ngôi sao', emoji: '⭐' }, strokeCount: 4 },
    ],
  },
  {
    rowName: 'Hàng Ma (ま / マ)',
    group: 'seion',
    items: [
      { hiragana: 'ま', katakana: 'マ', romaji: 'ma', row: 'Hàng Ma', group: 'seion', example: { word: 'まつり', romaji: 'matsuri', meaning: 'Lễ hội', emoji: '🏮' }, strokeCount: 3 },
      { hiragana: 'み', katakana: 'ミ', romaji: 'mi', row: 'Hàng Ma', group: 'seion', example: { word: 'みず', romaji: 'mizu', meaning: 'Nước', emoji: '💧' }, strokeCount: 2 },
      { hiragana: 'む', katakana: 'ム', romaji: 'mu', row: 'Hàng Ma', group: 'seion', example: { word: 'むし', romaji: 'mushi', meaning: 'Côn trùng', emoji: '🐛' }, strokeCount: 3 },
      { hiragana: 'め', katakana: 'メ', romaji: 'me', row: 'Hàng Ma', group: 'seion', example: { word: 'め', romaji: 'me', meaning: 'Đôi mắt', emoji: '👀' }, strokeCount: 2 },
      { hiragana: 'も', katakana: 'モ', romaji: 'mo', row: 'Hàng Ma', group: 'seion', example: { word: 'もも', romaji: 'momo', meaning: 'Quả đào', emoji: '🍑' }, strokeCount: 3 },
    ],
  },
  {
    rowName: 'Hàng Ya (や / ヤ)',
    group: 'seion',
    items: [
      { hiragana: 'や', katakana: 'ヤ', romaji: 'ya', row: 'Hàng Ya', group: 'seion', example: { word: 'やま', romaji: 'yama', meaning: 'Ngọn núi', emoji: '⛰️' }, strokeCount: 3 },
      null, // trống vị trí yi
      { hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu', row: 'Hàng Ya', group: 'seion', example: { word: 'ゆき', romaji: 'yuki', meaning: 'Tuyết rơi', emoji: '❄️' }, strokeCount: 2 },
      null, // trống vị trí ye
      { hiragana: 'よ', katakana: 'ヨ', romaji: 'yo', row: 'Hàng Ya', group: 'seion', example: { word: 'よる', romaji: 'yoru', meaning: 'Ban đêm', emoji: '🌌' }, strokeCount: 2 },
    ],
  },
  {
    rowName: 'Hàng Ra (ら / ラ)',
    group: 'seion',
    items: [
      { hiragana: 'ら', katakana: 'ラ', romaji: 'ra', row: 'Hàng Ra', group: 'seion', example: { word: 'らいおん', romaji: 'raion', meaning: 'Sư tử', emoji: '🦁' }, strokeCount: 2 },
      { hiragana: 'り', katakana: 'リ', romaji: 'ri', row: 'Hàng Ra', group: 'seion', example: { word: 'りんご', romaji: 'ringo', meaning: 'Quả táo', emoji: '🍎' }, strokeCount: 2 },
      { hiragana: 'る', katakana: 'ル', romaji: 'ru', row: 'Hàng Ra', group: 'seion', example: { word: 'るす', romaji: 'rusu', meaning: 'Vắng nhà', emoji: '🏠' }, strokeCount: 1 },
      { hiragana: 'れ', katakana: 'レ', romaji: 're', row: 'Hàng Ra', group: 'seion', example: { word: 'れもん', romaji: 'remon', meaning: 'Quả chanh', emoji: '🍋' }, strokeCount: 2 },
      { hiragana: 'ろ', katakana: 'ロ', romaji: 'ro', row: 'Hàng Ra', group: 'seion', example: { word: 'ろうそく', romaji: 'rousoku', meaning: 'Cây nến', emoji: '🕯️' }, strokeCount: 1 },
    ],
  },
  {
    rowName: 'Hàng Wa & N (わ / ワ)',
    group: 'seion',
    items: [
      { hiragana: 'わ', katakana: 'ワ', romaji: 'wa', row: 'Hàng Wa', group: 'seion', example: { word: 'わに', romaji: 'wani', meaning: 'Cá sấu', emoji: '🐊' }, strokeCount: 2 },
      null,
      null,
      null,
      { hiragana: 'を', katakana: 'ヲ', romaji: 'wo', row: 'Hàng Wa', group: 'seion', example: { word: 'ほんをよむ', romaji: 'hon o yomu', meaning: 'Đọc sách', emoji: '📖' }, strokeCount: 3 },
    ],
  },
  {
    rowName: 'Âm Mũi N (ん / ン)',
    group: 'seion',
    items: [
      { hiragana: 'ん', katakana: 'ン', romaji: 'n', row: 'Hàng N', group: 'seion', example: { word: 'ほん', romaji: 'hon', meaning: 'Quyển sách', emoji: '📚' }, strokeCount: 1 },
      null,
      null,
      null,
      null,
    ],
  },
]

// ── 2. Dakuon & Handakuon (25 Âm đục & Bán đục) ──
export const dakuonRows: KanaRowGroup[] = [
  {
    rowName: 'Hàng Ga (が / ガ)',
    group: 'dakuon',
    items: [
      { hiragana: 'が', katakana: 'ガ', romaji: 'ga', row: 'Hàng Ga', group: 'dakuon' },
      { hiragana: 'ぎ', katakana: 'ギ', romaji: 'gi', row: 'Hàng Ga', group: 'dakuon' },
      { hiragana: 'ぐ', katakana: 'グ', romaji: 'gu', row: 'Hàng Ga', group: 'dakuon' },
      { hiragana: 'げ', katakana: 'ゲ', romaji: 'ge', row: 'Hàng Ga', group: 'dakuon' },
      { hiragana: 'ご', katakana: 'ゴ', romaji: 'go', row: 'Hàng Ga', group: 'dakuon' },
    ],
  },
  {
    rowName: 'Hàng Za (ざ / ザ)',
    group: 'dakuon',
    items: [
      { hiragana: 'ざ', katakana: 'ザ', romaji: 'za', row: 'Hàng Za', group: 'dakuon' },
      { hiragana: 'じ', katakana: 'ジ', romaji: 'ji', row: 'Hàng Za', group: 'dakuon' },
      { hiragana: 'ず', katakana: 'ズ', romaji: 'zu', row: 'Hàng Za', group: 'dakuon' },
      { hiragana: 'ぜ', katakana: 'ゼ', romaji: 'ze', row: 'Hàng Za', group: 'dakuon' },
      { hiragana: 'ぞ', katakana: 'ゾ', romaji: 'zo', row: 'Hàng Za', group: 'dakuon' },
    ],
  },
  {
    rowName: 'Hàng Da (だ / ダ)',
    group: 'dakuon',
    items: [
      { hiragana: 'だ', katakana: 'ダ', romaji: 'da', row: 'Hàng Da', group: 'dakuon' },
      { hiragana: 'ぢ', katakana: 'ヂ', romaji: 'ji', row: 'Hàng Da', group: 'dakuon' },
      { hiragana: 'づ', katakana: 'ヅ', romaji: 'zu', row: 'Hàng Da', group: 'dakuon' },
      { hiragana: 'で', katakana: 'デ', romaji: 'de', row: 'Hàng Da', group: 'dakuon' },
      { hiragana: 'ど', katakana: 'ド', romaji: 'to / do', row: 'Hàng Da', group: 'dakuon' },
    ],
  },
  {
    rowName: 'Hàng Ba (ば / バ)',
    group: 'dakuon',
    items: [
      { hiragana: 'ば', katakana: 'バ', romaji: 'ba', row: 'Hàng Ba', group: 'dakuon' },
      { hiragana: 'び', katakana: 'ビ', romaji: 'bi', row: 'Hàng Ba', group: 'dakuon' },
      { hiragana: 'ぶ', katakana: 'ブ', romaji: 'bu', row: 'Hàng Ba', group: 'dakuon' },
      { hiragana: 'べ', katakana: 'ベ', romaji: 'be', row: 'Hàng Ba', group: 'dakuon' },
      { hiragana: 'ぼ', katakana: 'ボ', romaji: 'bo', row: 'Hàng Ba', group: 'dakuon' },
    ],
  },
  {
    rowName: 'Hàng Pa - Bán đục (ぱ / パ)',
    group: 'dakuon',
    items: [
      { hiragana: 'ぱ', katakana: 'パ', romaji: 'pa', row: 'Hàng Pa', group: 'dakuon' },
      { hiragana: 'ぴ', katakana: 'ピ', romaji: 'pi', row: 'Hàng Pa', group: 'dakuon' },
      { hiragana: 'ぷ', katakana: 'プ', romaji: 'pu', row: 'Hàng Pa', group: 'dakuon' },
      { hiragana: 'ぺ', katakana: 'ペ', romaji: 'pe', row: 'Hàng Pa', group: 'dakuon' },
      { hiragana: 'ぽ', katakana: 'ポ', romaji: 'po', row: 'Hàng Pa', group: 'dakuon' },
    ],
  },
]

// ── 3. Yoon (Âm ghép / Ảo âm: 3 cột: -ya, -yu, -yo) ──
export const yoonRows: KanaRowGroup[] = [
  {
    rowName: 'Hàng Kya (きゃ / キャ)',
    group: 'yoon',
    items: [
      { hiragana: 'きゃ', katakana: 'キャ', romaji: 'kya', row: 'Hàng Kya', group: 'yoon' },
      { hiragana: 'きゅ', katakana: 'キュ', romaji: 'kyu', row: 'Hàng Kya', group: 'yoon' },
      { hiragana: 'きょ', katakana: 'キョ', romaji: 'kyo', row: 'Hàng Kya', group: 'yoon' },
    ],
  },
  {
    rowName: 'Hàng Sha (しゃ / シャ)',
    group: 'yoon',
    items: [
      { hiragana: 'しゃ', katakana: 'シャ', romaji: 'sha', row: 'Hàng Sha', group: 'yoon' },
      { hiragana: 'しゅ', katakana: 'シュ', romaji: 'shu', row: 'Hàng Sha', group: 'yoon' },
      { hiragana: 'しょ', katakana: 'ショ', romaji: 'sho', row: 'Hàng Sha', group: 'yoon' },
    ],
  },
  {
    rowName: 'Hàng Cha (ちゃ / チャ)',
    group: 'yoon',
    items: [
      { hiragana: 'ちゃ', katakana: 'チャ', romaji: 'cha', row: 'Hàng Cha', group: 'yoon' },
      { hiragana: 'ちゅ', katakana: 'チュ', romaji: 'chu', row: 'Hàng Cha', group: 'yoon' },
      { hiragana: 'ちょ', katakana: 'チョ', romaji: 'cho', row: 'Hàng Cha', group: 'yoon' },
    ],
  },
  {
    rowName: 'Hàng Nya (にゃ / ニャ)',
    group: 'yoon',
    items: [
      { hiragana: 'にゃ', katakana: 'ニャ', romaji: 'nya', row: 'Hàng Nya', group: 'yoon' },
      { hiragana: 'にゅ', katakana: 'ニュ', romaji: 'nyu', row: 'Hàng Nya', group: 'yoon' },
      { hiragana: 'にょ', katakana: 'ニョ', romaji: 'nyo', row: 'Hàng Nya', group: 'yoon' },
    ],
  },
  {
    rowName: 'Hàng Hya (ひゃ / ヒャ)',
    group: 'yoon',
    items: [
      { hiragana: 'ひゃ', katakana: 'ヒャ', romaji: 'hya', row: 'Hàng Hya', group: 'yoon' },
      { hiragana: 'ひゅ', katakana: 'ヒュ', romaji: 'hyu', row: 'Hàng Hya', group: 'yoon' },
      { hiragana: 'ひょ', katakana: 'ヒョ', romaji: 'hyo', row: 'Hàng Hya', group: 'yoon' },
    ],
  },
  {
    rowName: 'Hàng Mya (みゃ / ミャ)',
    group: 'yoon',
    items: [
      { hiragana: 'みゃ', katakana: 'ミャ', romaji: 'mya', row: 'Hàng Mya', group: 'yoon' },
      { hiragana: 'みゅ', katakana: 'ミュ', romaji: 'myu', row: 'Hàng Mya', group: 'yoon' },
      { hiragana: 'みょ', katakana: 'ミョ', romaji: 'myo', row: 'Hàng Mya', group: 'yoon' },
    ],
  },
  {
    rowName: 'Hàng Rya (りゃ / リャ)',
    group: 'yoon',
    items: [
      { hiragana: 'りゃ', katakana: 'リャ', romaji: 'rya', row: 'Hàng Rya', group: 'yoon' },
      { hiragana: 'りゅ', katakana: 'リュ', romaji: 'ryu', row: 'Hàng Rya', group: 'yoon' },
      { hiragana: 'りょ', katakana: 'リョ', romaji: 'ryo', row: 'Hàng Rya', group: 'yoon' },
    ],
  },
  {
    rowName: 'Hàng Gya (ぎゃ / ギャ)',
    group: 'yoon',
    items: [
      { hiragana: 'ぎゃ', katakana: 'ギャ', romaji: 'gya', row: 'Hàng Gya', group: 'yoon' },
      { hiragana: 'ぎゅ', katakana: 'ギュ', romaji: 'gyu', row: 'Hàng Gya', group: 'yoon' },
      { hiragana: 'ぎょ', katakana: 'ギョ', romaji: 'gyo', row: 'Hàng Gya', group: 'yoon' },
    ],
  },
  {
    rowName: 'Hàng Ja (じゃ / ジャ)',
    group: 'yoon',
    items: [
      { hiragana: 'じゃ', katakana: 'ジャ', romaji: 'ja', row: 'Hàng Ja', group: 'yoon' },
      { hiragana: 'じゅ', katakana: 'ジュ', romaji: 'ju', row: 'Hàng Ja', group: 'yoon' },
      { hiragana: 'じょ', katakana: 'ジョ', romaji: 'jo', row: 'Hàng Ja', group: 'yoon' },
    ],
  },
  {
    rowName: 'Hàng Bya (びゃ / ビャ)',
    group: 'yoon',
    items: [
      { hiragana: 'びゃ', katakana: 'ビャ', romaji: 'bya', row: 'Hàng Bya', group: 'yoon' },
      { hiragana: 'びゅ', katakana: 'ビュ', romaji: 'byu', row: 'Hàng Bya', group: 'yoon' },
      { hiragana: 'びょ', katakana: 'ビョ', romaji: 'byo', row: 'Hàng Bya', group: 'yoon' },
    ],
  },
  {
    rowName: 'Hàng Pya (ぴゃ / ピャ)',
    group: 'yoon',
    items: [
      { hiragana: 'ぴゃ', katakana: 'ピャ', romaji: 'pya', row: 'Hàng Pya', group: 'yoon' },
      { hiragana: 'ぴゅ', katakana: 'ピュ', romaji: 'pyu', row: 'Hàng Pya', group: 'yoon' },
      { hiragana: 'ぴょ', katakana: 'ピョ', romaji: 'pyo', row: 'Hàng Pya', group: 'yoon' },
    ],
  },
]

// All items flat list for search
export const allKanaItems: FullKanaItem[] = [
  ...seionRows.flatMap(r => r.items.filter((i): i is FullKanaItem => i !== null)),
  ...dakuonRows.flatMap(r => r.items.filter((i): i is FullKanaItem => i !== null)),
  ...yoonRows.flatMap(r => r.items.filter((i): i is FullKanaItem => i !== null)),
]
