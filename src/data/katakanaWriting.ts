import type { KanaWritingItem } from './hiraganaWriting'

export const katakanaWritingData: KanaWritingItem[] = [
  // ── Hàng A ──
  {
    character: 'ア',
    romaji: 'a',
    row: 'Hàng A',
    strokeCount: 2,
    strokeTips: [
      '1. Nét ngang gập cong sang trái',
      '2. Nét phẩy cong dài từ trên xuống bên trái'
    ],
    example: { word: 'アイス', romaji: 'aisu', meaning: 'Kem', emoji: '🍦' },
    strokePositions: [
      { x: 30, y: 32, label: 1 },
      { x: 50, y: 35, label: 2 }
    ]
  },
  {
    character: 'イ',
    romaji: 'i',
    row: 'Hàng A',
    strokeCount: 2,
    strokeTips: [
      '1. Nét phẩy chéo từ phải sang trái',
      '2. Nét sổ thẳng đứng ở giữa nét 1 kéo xuống'
    ],
    example: { word: 'インク', romaji: 'inku', meaning: 'Mực in', emoji: '🖋️' },
    strokePositions: [
      { x: 45, y: 25, label: 1 },
      { x: 48, y: 45, label: 2 }
    ]
  },
  {
    character: 'ウ',
    romaji: 'u',
    row: 'Hàng A',
    strokeCount: 3,
    strokeTips: [
      '1. Nét chấm ngắn trên đỉnh',
      '2. Nét phẩy ngắn bên trái',
      '3. Nét ngang gập cong kéo dài sang trái'
    ],
    example: { word: 'ウクレレ', romaji: 'ukurere', meaning: 'Đàn Ukulele', emoji: '🎸' },
    strokePositions: [
      { x: 50, y: 22, label: 1 },
      { x: 30, y: 40, label: 2 },
      { x: 35, y: 40, label: 3 }
    ]
  },
  {
    character: 'エ',
    romaji: 'e',
    row: 'Hàng A',
    strokeCount: 3,
    strokeTips: [
      '1. Nét ngang trên',
      '2. Nét sổ thẳng đứng ở giữa',
      '3. Nét ngang dưới dài hơn nét trên'
    ],
    example: { word: 'エレベーター', romaji: 'erebeetaa', meaning: 'Thang máy', emoji: '🛗' },
    strokePositions: [
      { x: 32, y: 28, label: 1 },
      { x: 50, y: 35, label: 2 },
      { x: 26, y: 72, label: 3 }
    ]
  },
  {
    character: 'オ',
    romaji: 'o',
    row: 'Hàng A',
    strokeCount: 3,
    strokeTips: [
      '1. Nét ngang từ trái sang phải',
      '2. Nét sổ có móc sang trái',
      '3. Nét phẩy chéo từ giao điểm kéo xuống trái'
    ],
    example: { word: 'オレンジ', romaji: 'orenji', meaning: 'Quả cam', emoji: '🍊' },
    strokePositions: [
      { x: 25, y: 35, label: 1 },
      { x: 62, y: 25, label: 2 },
      { x: 55, y: 45, label: 3 }
    ]
  },

  // ── Hàng Ka ──
  {
    character: 'カ',
    romaji: 'ka',
    row: 'Hàng Ka',
    strokeCount: 2,
    strokeTips: [
      '1. Nét ngang gập có móc hất vào trong',
      '2. Nét phẩy xiên dài cắt qua thân'
    ],
    example: { word: 'カメラ', romaji: 'kamera', meaning: 'Máy ảnh', emoji: '📷' },
    strokePositions: [
      { x: 28, y: 35, label: 1 },
      { x: 58, y: 24, label: 2 }
    ]
  },
  {
    character: 'キ',
    romaji: 'ki',
    row: 'Hàng Ka',
    strokeCount: 3,
    strokeTips: [
      '1. Nét ngang trên',
      '2. Nét ngang dưới dài hơn nét trên một chút',
      '3. Nét sổ xiên chéo cắt qua 2 nét ngang và vuốt nhọn'
    ],
    example: { word: 'ギター', romaji: 'gitaa', meaning: 'Đàn Guitar', emoji: '🎸' },
    strokePositions: [
      { x: 30, y: 33, label: 1 },
      { x: 26, y: 48, label: 2 },
      { x: 60, y: 22, label: 3 }
    ]
  },
  {
    character: 'ク',
    romaji: 'ku',
    row: 'Hàng Ka',
    strokeCount: 2,
    strokeTips: [
      '1. Nét phẩy ngắn bên trái',
      '2. Nét ngang gập chéo vuốt dài sang trái'
    ],
    example: { word: 'クラス', romaji: 'kurasu', meaning: 'Lớp học', emoji: '🏫' },
    strokePositions: [
      { x: 42, y: 25, label: 1 },
      { x: 35, y: 42, label: 2 }
    ]
  },
  {
    character: 'ケ',
    romaji: 'ke',
    row: 'Hàng Ka',
    strokeCount: 3,
    strokeTips: [
      '1. Nét phẩy chéo góc trên bên trái',
      '2. Nét ngang từ thân nét 1 sang phải',
      '3. Nét cong vuốt dài từ giữa nét ngang xuống'
    ],
    example: { word: 'ケーキ', romaji: 'keeki', meaning: 'Bánh kem', emoji: '🍰' },
    strokePositions: [
      { x: 42, y: 24, label: 1 },
      { x: 32, y: 48, label: 2 },
      { x: 62, y: 35, label: 3 }
    ]
  },
  {
    character: 'コ',
    romaji: 'ko',
    row: 'Hàng Ka',
    strokeCount: 2,
    strokeTips: [
      '1. Nét ngang gập thẳng đứng xuống',
      '2. Nét ngang đáy từ trái sang phải nối liền'
    ],
    example: { word: 'コーヒー', romaji: 'koohii', meaning: 'Cà phê', emoji: '☕' },
    strokePositions: [
      { x: 30, y: 32, label: 1 },
      { x: 30, y: 72, label: 2 }
    ]
  },

  // ── Hàng Sa ──
  {
    character: 'サ',
    romaji: 'sa',
    row: 'Hàng Sa',
    strokeCount: 3,
    strokeTips: [
      '1. Nét ngang dài',
      '2. Nét sổ ngắn bên trái',
      '3. Nét sổ vuốt cong dài bên phải'
    ],
    example: { word: 'サラダ', romaji: 'sarada', meaning: 'Món Salad', emoji: '🥗' },
    strokePositions: [
      { x: 25, y: 36, label: 1 },
      { x: 42, y: 24, label: 2 },
      { x: 64, y: 24, label: 3 }
    ]
  },
  {
    character: 'シ',
    romaji: 'shi',
    row: 'Hàng Sa',
    strokeCount: 3,
    strokeTips: [
      '1. Nét chấm trên',
      '2. Nét chấm dưới thẳng hàng dọc',
      '3. Nét hất dài từ dưới chéo vuốt lên trên bên phải'
    ],
    example: { word: 'シャツ', romaji: 'shatsu', meaning: 'Áo sơ mi', emoji: '👔' },
    strokePositions: [
      { x: 34, y: 32, label: 1 },
      { x: 30, y: 52, label: 2 },
      { x: 32, y: 78, label: 3 }
    ]
  },
  {
    character: 'ス',
    romaji: 'su',
    row: 'Hàng Sa',
    strokeCount: 2,
    strokeTips: [
      '1. Nét ngang gập chéo dài sang trái',
      '2. Nét phẩy chéo từ giữa nét 1 kéo xuống bên phải'
    ],
    example: { word: 'スポーツ', romaji: 'supootsu', meaning: 'Thể thao', emoji: '⚽' },
    strokePositions: [
      { x: 28, y: 34, label: 1 },
      { x: 55, y: 50, label: 2 }
    ]
  },
  {
    character: 'セ',
    romaji: 'se',
    row: 'Hàng Sa',
    strokeCount: 2,
    strokeTips: [
      '1. Nét ngang gập sổ xuống uốn cong nhẹ sang phải',
      '2. Nét sổ gập ngang nối sang nét 1'
    ],
    example: { word: 'セーター', romaji: 'seetaa', meaning: 'Áo len', emoji: '🧥' },
    strokePositions: [
      { x: 26, y: 38, label: 1 },
      { x: 66, y: 24, label: 2 }
    ]
  },
  {
    character: 'ソ',
    romaji: 'so',
    row: 'Hàng Sa',
    strokeCount: 2,
    strokeTips: [
      '1. Nét chấm ngắn bên trái',
      '2. Nét phẩy vuốt dài từ trên xuống bên trái'
    ],
    example: { word: 'ソファ', romaji: 'sofa', meaning: 'Ghế sofa', emoji: '🛋️' },
    strokePositions: [
      { x: 36, y: 30, label: 1 },
      { x: 66, y: 26, label: 2 }
    ]
  },

  // ── Hàng Ta ──
  {
    character: 'タ',
    romaji: 'ta',
    row: 'Hàng Ta',
    strokeCount: 3,
    strokeTips: [
      '1. Nét phẩy ngắn bên trái',
      '2. Nét ngang gập cong kéo dài sang trái (như chữ ク)',
      '3. Nét phẩy ngắn ở giữa'
    ],
    example: { word: 'タクシー', romaji: 'takushii', meaning: 'Xe Taxi', emoji: '🚕' },
    strokePositions: [
      { x: 38, y: 24, label: 1 },
      { x: 32, y: 44, label: 2 },
      { x: 44, y: 55, label: 3 }
    ]
  },
  {
    character: 'チ',
    romaji: 'chi',
    row: 'Hàng Ta',
    strokeCount: 3,
    strokeTips: [
      '1. Nét phẩy ngang từ phải sang trái trên đỉnh',
      '2. Nét ngang ở giữa',
      '3. Nét cong vuốt dài từ đỉnh cắt qua nét ngang'
    ],
    example: { word: 'チーズ', romaji: 'chiizu', meaning: 'Phô mai', emoji: '🧀' },
    strokePositions: [
      { x: 62, y: 22, label: 1 },
      { x: 28, y: 44, label: 2 },
      { x: 46, y: 35, label: 3 }
    ]
  },
  {
    character: 'ツ',
    romaji: 'tsu',
    row: 'Hàng Ta',
    strokeCount: 3,
    strokeTips: [
      '1. Nét chấm bên trái',
      '2. Nét chấm ở giữa hơi chếch lên',
      '3. Nét phẩy vuốt dài từ trên bên phải xuống dưới bên trái'
    ],
    example: { word: 'ツアー', romaji: 'tsuaa', meaning: 'Chuyến du lịch', emoji: '✈️' },
    strokePositions: [
      { x: 30, y: 30, label: 1 },
      { x: 48, y: 34, label: 2 },
      { x: 72, y: 26, label: 3 }
    ]
  },
  {
    character: 'テ',
    romaji: 'te',
    row: 'Hàng Ta',
    strokeCount: 3,
    strokeTips: [
      '1. Nét ngang ngắn trên',
      '2. Nét ngang dài ở giữa',
      '3. Nét cong vuốt từ giữa nét 2 sang trái'
    ],
    example: { word: 'テレビ', romaji: 'terebi', meaning: 'Tivi', emoji: '📺' },
    strokePositions: [
      { x: 34, y: 28, label: 1 },
      { x: 26, y: 48, label: 2 },
      { x: 50, y: 48, label: 3 }
    ]
  },
  {
    character: 'ト',
    romaji: 'to',
    row: 'Hàng Ta',
    strokeCount: 2,
    strokeTips: [
      '1. Nét sổ thẳng đứng ở giữa',
      '2. Nét xiên chéo từ thân nét sổ hướng sang phải xuống dưới'
    ],
    example: { word: 'トマト', romaji: 'tomato', meaning: 'Quả cà chua', emoji: '🍅' },
    strokePositions: [
      { x: 44, y: 24, label: 1 },
      { x: 46, y: 44, label: 2 }
    ]
  },

  // ── Hàng Na ──
  {
    character: 'ナ',
    romaji: 'na',
    row: 'Hàng Na',
    strokeCount: 2,
    strokeTips: [
      '1. Nét ngang từ trái sang phải',
      '2. Nét phẩy cong dài từ trên xuống bên trái'
    ],
    example: { word: 'ナイフ', romaji: 'naifu', meaning: 'Con dao', emoji: '🔪' },
    strokePositions: [
      { x: 26, y: 36, label: 1 },
      { x: 50, y: 22, label: 2 }
    ]
  },
  {
    character: 'ニ',
    romaji: 'ni',
    row: 'Hàng Na',
    strokeCount: 2,
    strokeTips: [
      '1. Nét ngang ngắn phía trên',
      '2. Nét ngang dài hơn ở phía dưới'
    ],
    example: { word: 'ニュース', romaji: 'nyuusu', meaning: 'Tin tức', emoji: '📰' },
    strokePositions: [
      { x: 32, y: 35, label: 1 },
      { x: 26, y: 68, label: 2 }
    ]
  },
  {
    character: 'ヌ',
    romaji: 'nu',
    row: 'Hàng Na',
    strokeCount: 2,
    strokeTips: [
      '1. Nét ngang gập cong kéo dài sang trái',
      '2. Nét phẩy ngắn cắt qua góc gập'
    ],
    example: { word: 'ヌードル', romaji: 'nuudoru', meaning: 'Mì', emoji: '🍜' },
    strokePositions: [
      { x: 28, y: 34, label: 1 },
      { x: 54, y: 48, label: 2 }
    ]
  },
  {
    character: 'ネ',
    romaji: 'ne',
    row: 'Hàng Na',
    strokeCount: 4,
    strokeTips: [
      '1. Nét chấm ngắn trên đỉnh',
      '2. Nét gập zic-zac kéo xuống',
      '3. Nét sổ thẳng ở giữa',
      '4. Nét chấm bên phải'
    ],
    example: { word: 'ネクタイ', romaji: 'nekutai', meaning: 'Cà vạt', emoji: '👔' },
    strokePositions: [
      { x: 42, y: 22, label: 1 },
      { x: 30, y: 42, label: 2 },
      { x: 50, y: 42, label: 3 },
      { x: 68, y: 62, label: 4 }
    ]
  },
  {
    character: 'ノ',
    romaji: 'no',
    row: 'Hàng Na',
    strokeCount: 1,
    strokeTips: [
      '1. Nét phẩy cong nhẹ vuốt dài từ trên bên phải sang dưới bên trái'
    ],
    example: { word: 'ノート', romaji: 'nooto', meaning: 'Quyển vở / Ghi chú', emoji: '📓' },
    strokePositions: [
      { x: 64, y: 24, label: 1 }
    ]
  },

  // ── Hàng Ha ──
  {
    character: 'ハ',
    romaji: 'ha',
    row: 'Hàng Ha',
    strokeCount: 2,
    strokeTips: [
      '1. Nét phẩy ngắn bên trái vuốt xuống',
      '2. Nét phẩy dài bên phải vuốt nhọn sang phải'
    ],
    example: { word: 'ハンバーガー', romaji: 'hanbaagaa', meaning: 'Hamburger', emoji: '🍔' },
    strokePositions: [
      { x: 36, y: 32, label: 1 },
      { x: 62, y: 32, label: 2 }
    ]
  },
  {
    character: 'ヒ',
    romaji: 'hi',
    row: 'Hàng Ha',
    strokeCount: 2,
    strokeTips: [
      '1. Nét ngang ngắn gập xuống',
      '2. Nét sổ gập ngang đáy kéo dài sang phải'
    ],
    example: { word: 'ピアノ', romaji: 'piano', meaning: 'Đàn Piano', emoji: '🎹' },
    strokePositions: [
      { x: 32, y: 35, label: 1 },
      { x: 32, y: 22, label: 2 }
    ]
  },
  {
    character: 'フ',
    romaji: 'fu',
    row: 'Hàng Ha',
    strokeCount: 1,
    strokeTips: [
      '1. Nét ngang gập cong vuốt dài sang trái'
    ],
    example: { word: 'フォーク', romaji: 'fooku', meaning: 'Cái dĩa', emoji: '🍴' },
    strokePositions: [
      { x: 30, y: 34, label: 1 }
    ]
  },
  {
    character: 'ヘ',
    romaji: 'he',
    row: 'Hàng Ha',
    strokeCount: 1,
    strokeTips: [
      '1. Nét xiên lên rồi dốc dài xuống tạo hình chóp núi'
    ],
    example: { word: 'ヘルメット', romaji: 'herumetto', meaning: 'Mũ bảo hiểm', emoji: '⛑️' },
    strokePositions: [
      { x: 22, y: 55, label: 1 }
    ]
  },
  {
    character: 'ホ',
    romaji: 'ho',
    row: 'Hàng Ha',
    strokeCount: 4,
    strokeTips: [
      '1. Nét ngang từ trái sang phải',
      '2. Nét sổ thẳng có móc sang trái',
      '3. Nét phẩy bên trái',
      '4. Nét phẩy bên phải'
    ],
    example: { word: 'ホテル', romaji: 'hoteru', meaning: 'Khách sạn', emoji: '🏨' },
    strokePositions: [
      { x: 26, y: 32, label: 1 },
      { x: 50, y: 22, label: 2 },
      { x: 32, y: 52, label: 3 },
      { x: 68, y: 52, label: 4 }
    ]
  },

  // ── Hàng Ma ──
  {
    character: 'マ',
    romaji: 'ma',
    row: 'Hàng Ma',
    strokeCount: 2,
    strokeTips: [
      '1. Nét ngang gập chéo sang trái',
      '2. Nét chấm/phẩy ngắn ở góc dưới'
    ],
    example: { word: 'マスク', romaji: 'masuku', meaning: 'Khẩu trang', emoji: '😷' },
    strokePositions: [
      { x: 28, y: 34, label: 1 },
      { x: 52, y: 58, label: 2 }
    ]
  },
  {
    character: 'ミ',
    romaji: 'mi',
    row: 'Hàng Ma',
    strokeCount: 3,
    strokeTips: [
      '1. Nét xiên ngắn trên',
      '2. Nét xiên ở giữa',
      '3. Nét xiên dưới dài nhất'
    ],
    example: { word: 'ミルク', romaji: 'miruku', meaning: 'Sữa tươi', emoji: '🥛' },
    strokePositions: [
      { x: 35, y: 28, label: 1 },
      { x: 32, y: 48, label: 2 },
      { x: 28, y: 68, label: 3 }
    ]
  },
  {
    character: 'ム',
    romaji: 'mu',
    row: 'Hàng Ma',
    strokeCount: 2,
    strokeTips: [
      '1. Nét gập chéo rồi ngang sang phải',
      '2. Nét phẩy ngắn ở góc dưới'
    ],
    example: { word: 'ムービー', romaji: 'muubii', meaning: 'Bộ phim', emoji: '🎬' },
    strokePositions: [
      { x: 48, y: 24, label: 1 },
      { x: 65, y: 52, label: 2 }
    ]
  },
  {
    character: 'メ',
    romaji: 'me',
    row: 'Hàng Ma',
    strokeCount: 2,
    strokeTips: [
      '1. Nét phẩy cong từ trên xuống trái',
      '2. Nét xiên chéo cắt qua nét 1'
    ],
    example: { word: 'メガネ', romaji: 'megane', meaning: 'Mắt kính', emoji: '👓' },
    strokePositions: [
      { x: 55, y: 24, label: 1 },
      { x: 35, y: 38, label: 2 }
    ]
  },
  {
    character: 'モ',
    romaji: 'mo',
    row: 'Hàng Ma',
    strokeCount: 3,
    strokeTips: [
      '1. Nét ngang trên',
      '2. Nét ngang dưới',
      '3. Nét sổ gập ngang uốn lượn'
    ],
    example: { word: 'モノレール', romaji: 'monoreeru', meaning: 'Tàu một ray', emoji: '🚝' },
    strokePositions: [
      { x: 30, y: 32, label: 1 },
      { x: 26, y: 48, label: 2 },
      { x: 46, y: 22, label: 3 }
    ]
  },

  // ── Hàng Ya ──
  {
    character: 'ヤ',
    romaji: 'ya',
    row: 'Hàng Ya',
    strokeCount: 2,
    strokeTips: [
      '1. Nét gập uốn cong sang phải',
      '2. Nét phẩy dài cắt qua nét 1'
    ],
    example: { word: 'ヤシ', romaji: 'yashi', meaning: 'Cây cọ / Dừa', emoji: '🌴' },
    strokePositions: [
      { x: 30, y: 35, label: 1 },
      { x: 62, y: 22, label: 2 }
    ]
  },
  {
    character: 'ユ',
    romaji: 'yu',
    row: 'Hàng Ya',
    strokeCount: 2,
    strokeTips: [
      '1. Nét ngang gập sổ đứng xuống',
      '2. Nét ngang đáy dài từ thân nét 1 sang phải'
    ],
    example: { word: 'ユニフォーム', romaji: 'yunifoomu', meaning: 'Đồng phục', emoji: '🎽' },
    strokePositions: [
      { x: 32, y: 32, label: 1 },
      { x: 30, y: 68, label: 2 }
    ]
  },
  {
    character: 'ヨ',
    romaji: 'yo',
    row: 'Hàng Ya',
    strokeCount: 3,
    strokeTips: [
      '1. Nét ngang gập thẳng đứng xuống',
      '2. Nét ngang ở giữa',
      '3. Nét ngang đáy nối lại'
    ],
    example: { word: 'ヨット', romaji: 'yotto', meaning: 'Du thuyền', emoji: '⛵' },
    strokePositions: [
      { x: 32, y: 28, label: 1 },
      { x: 34, y: 48, label: 2 },
      { x: 32, y: 68, label: 3 }
    ]
  },

  // ── Hàng Ra ──
  {
    character: 'ラ',
    romaji: 'ra',
    row: 'Hàng Ra',
    strokeCount: 2,
    strokeTips: [
      '1. Nét ngang ngắn trên',
      '2. Nét cong vuốt dài xuống dưới'
    ],
    example: { word: 'ラジオ', romaji: 'rajio', meaning: 'Đài Radio', emoji: '📻' },
    strokePositions: [
      { x: 34, y: 28, label: 1 },
      { x: 30, y: 46, label: 2 }
    ]
  },
  {
    character: 'リ',
    romaji: 'ri',
    row: 'Hàng Ra',
    strokeCount: 2,
    strokeTips: [
      '1. Nét sổ ngắn bên trái',
      '2. Nét cong dài bên phải vuốt nhọn xuống'
    ],
    example: { word: 'リンゴ', romaji: 'ringo', meaning: 'Quả táo', emoji: '🍎' },
    strokePositions: [
      { x: 36, y: 30, label: 1 },
      { x: 62, y: 24, label: 2 }
    ]
  },
  {
    character: 'ル',
    romaji: 'ru',
    row: 'Hàng Ra',
    strokeCount: 2,
    strokeTips: [
      '1. Nét phẩy cong bên trái',
      '2. Nét sổ cong bên phải có móc hất nhẹ lên'
    ],
    example: { word: 'ルビー', romaji: 'rubii', meaning: 'Đá Ruby', emoji: '💎' },
    strokePositions: [
      { x: 38, y: 26, label: 1 },
      { x: 58, y: 24, label: 2 }
    ]
  },
  {
    character: 'レ',
    romaji: 're',
    row: 'Hàng Ra',
    strokeCount: 1,
    strokeTips: [
      '1. Nét sổ thẳng từ trên xuống rồi gập hất chéo lên bên phải'
    ],
    example: { word: 'レモン', romaji: 'remon', meaning: 'Quả chanh', emoji: '🍋' },
    strokePositions: [
      { x: 36, y: 24, label: 1 }
    ]
  },
  {
    character: 'ロ',
    romaji: 'ro',
    row: 'Hàng Ra',
    strokeCount: 3,
    strokeTips: [
      '1. Nét sổ đứng bên trái',
      '2. Nét ngang gập thẳng đứng xuống bên phải',
      '3. Nét ngang đáy đóng khung hình vuông'
    ],
    example: { word: 'ロボット', romaji: 'robotto', meaning: 'Người máy', emoji: '🤖' },
    strokePositions: [
      { x: 30, y: 32, label: 1 },
      { x: 32, y: 32, label: 2 },
      { x: 30, y: 72, label: 3 }
    ]
  },

  // ── Hàng Wa & N ──
  {
    character: 'ワ',
    romaji: 'wa',
    row: 'Hàng Wa',
    strokeCount: 2,
    strokeTips: [
      '1. Nét sổ ngắn bên trái',
      '2. Nét ngang gập cong kéo dài sang trái'
    ],
    example: { word: 'ワイン', romaji: 'wain', meaning: 'Rượu vang', emoji: '🍷' },
    strokePositions: [
      { x: 30, y: 34, label: 1 },
      { x: 32, y: 34, label: 2 }
    ]
  },
  {
    character: 'ヲ',
    romaji: 'wo',
    row: 'Hàng Wa',
    strokeCount: 3,
    strokeTips: [
      '1. Nét ngang trên',
      '2. Nét ngang dưới ngắn hơn',
      '3. Nét phẩy cong cắt qua cả 2 nét ngang'
    ],
    example: { word: 'ヲ', romaji: 'wo', meaning: 'Trợ từ Katakana', emoji: '📌' },
    strokePositions: [
      { x: 30, y: 30, label: 1 },
      { x: 30, y: 48, label: 2 },
      { x: 55, y: 22, label: 3 }
    ]
  },
  {
    character: 'ン',
    romaji: 'n',
    row: 'Hàng N',
    strokeCount: 2,
    strokeTips: [
      '1. Nét chấm ngắn bên trái',
      '2. Nét hất cong từ dưới vuốt chéo lên trên bên phải'
    ],
    example: { word: 'パン', romaji: 'pan', meaning: 'Bánh mì', emoji: '🍞' },
    strokePositions: [
      { x: 34, y: 34, label: 1 },
      { x: 34, y: 75, label: 2 }
    ]
  }
]
