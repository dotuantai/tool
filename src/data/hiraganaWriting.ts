export interface StrokePosition {
  x: number // percentage 0 - 100
  y: number // percentage 0 - 100
  label: number
}

export interface KanaWritingItem {
  character: string
  romaji: string
  row: string
  strokeCount: number
  strokeTips: string[]
  example: {
    word: string
    romaji: string
    meaning: string
    emoji: string
  }
  strokePositions?: StrokePosition[]
}

export const hiraganaWritingData: KanaWritingItem[] = [
  // ── Hàng A ──
  {
    character: 'あ',
    romaji: 'a',
    row: 'Hàng A',
    strokeCount: 3,
    strokeTips: [
      '1. Nét ngang ngắn từ trái sang phải ở phần trên',
      '2. Nét sổ hơi cong dọc xuống qua chính giữa nét ngang',
      '3. Nét xoắn vòng cung rộng từ trái qua phải và kéo xuống dưới'
    ],
    example: { word: 'あめ', romaji: 'ame', meaning: 'Cơn mưa / Kẹo', emoji: '🌧️' },
    strokePositions: [
      { x: 30, y: 32, label: 1 },
      { x: 50, y: 22, label: 2 },
      { x: 38, y: 55, label: 3 }
    ]
  },
  {
    character: 'い',
    romaji: 'i',
    row: 'Hàng A',
    strokeCount: 2,
    strokeTips: [
      '1. Nét cong bên trái kéo xuống rồi móc nhẹ hướng lên trên',
      '2. Nét cong ngắn hơn ở bên phải vuốt nhẹ xuống dưới'
    ],
    example: { word: 'いぬ', romaji: 'inu', meaning: 'Chú chó', emoji: '🐶' },
    strokePositions: [
      { x: 28, y: 35, label: 1 },
      { x: 72, y: 40, label: 2 }
    ]
  },
  {
    character: 'う',
    romaji: 'u',
    row: 'Hàng A',
    strokeCount: 2,
    strokeTips: [
      '1. Nét phẩy ngắn xiên nhẹ ở phần trên cùng',
      '2. Nét uốn cong hình vòm lớn ôm xuống bên dưới'
    ],
    example: { word: 'うみ', romaji: 'umi', meaning: 'Biển cả', emoji: '🌊' },
    strokePositions: [
      { x: 48, y: 25, label: 1 },
      { x: 36, y: 46, label: 2 }
    ]
  },
  {
    character: 'え',
    romaji: 'e',
    row: 'Hàng A',
    strokeCount: 2,
    strokeTips: [
      '1. Nét phẩy ngắn xiên nhẹ ở trên đỉnh',
      '2. Nét zic-zac kéo chéo xuống, hất ngang sang phải rồi uốn sóng lượn'
    ],
    example: { word: 'えき', romaji: 'eki', meaning: 'Nhà ga', emoji: '🚉' },
    strokePositions: [
      { x: 48, y: 24, label: 1 },
      { x: 32, y: 46, label: 2 }
    ]
  },
  {
    character: 'お',
    romaji: 'o',
    row: 'Hàng A',
    strokeCount: 3,
    strokeTips: [
      '1. Nét ngang ngắn ở phần trên',
      '2. Nét sổ xuống, uốn vòng cung tròn sang phải rồi kéo đuôi',
      '3. Nét phẩy nhỏ ở góc trên bên phải'
    ],
    example: { word: 'おにぎり', romaji: 'onigiri', meaning: 'Cơm nắm', emoji: '🍙' },
    strokePositions: [
      { x: 26, y: 36, label: 1 },
      { x: 48, y: 25, label: 2 },
      { x: 78, y: 35, label: 3 }
    ]
  },

  // ── Hàng Ka ──
  {
    character: 'か',
    romaji: 'ka',
    row: 'Hàng Ka',
    strokeCount: 3,
    strokeTips: [
      '1. Nét ngang gập cong có móc nhọn hướng vào trong',
      '2. Nét sổ hơi cong cắt qua nét đầu tiên',
      '3. Nét phẩy xiên bên phải'
    ],
    example: { word: 'かさ', romaji: 'kasa', meaning: 'Chiếc ô', emoji: '🌂' },
    strokePositions: [
      { x: 28, y: 40, label: 1 },
      { x: 42, y: 28, label: 2 },
      { x: 75, y: 35, label: 3 }
    ]
  },
  {
    character: 'き',
    romaji: 'ki',
    row: 'Hàng Ka',
    strokeCount: 4,
    strokeTips: [
      '1. Nét ngang trên hơi xiên lên',
      '2. Nét ngang dưới dài hơn nét trên một chút',
      '3. Nét sổ xiên chéo cắt qua hai nét ngang và móc nhẹ',
      '4. Nét vòng cung hở bên dưới'
    ],
    example: { word: 'き', romaji: 'ki', meaning: 'Cây cối', emoji: '🌳' },
    strokePositions: [
      { x: 30, y: 33, label: 1 },
      { x: 28, y: 48, label: 2 },
      { x: 62, y: 22, label: 3 },
      { x: 42, y: 78, label: 4 }
    ]
  },
  {
    character: 'く',
    romaji: 'ku',
    row: 'Hàng Ka',
    strokeCount: 1,
    strokeTips: [
      '1. Nét gập góc nhọn < từ trên chéo xuống rồi bẻ góc hướng sang trái xuống dưới'
    ],
    example: { word: 'くるま', romaji: 'kuruma', meaning: 'Ô tô', emoji: '🚗' },
    strokePositions: [
      { x: 62, y: 25, label: 1 }
    ]
  },
  {
    character: 'け',
    romaji: 'ke',
    row: 'Hàng Ka',
    strokeCount: 3,
    strokeTips: [
      '1. Nét sổ đứng bên trái hơi cong có móc hất nhẹ lên',
      '2. Nét ngang ngắn ở góc trên bên phải',
      '3. Nét sổ cong nhẹ từ trên xuống vắt qua nét ngang'
    ],
    example: { word: 'けむし', romaji: 'kemushi', meaning: 'Sâu bướm', emoji: '🐛' },
    strokePositions: [
      { x: 26, y: 30, label: 1 },
      { x: 55, y: 36, label: 2 },
      { x: 68, y: 25, label: 3 }
    ]
  },
  {
    character: 'こ',
    romaji: 'ko',
    row: 'Hàng Ka',
    strokeCount: 2,
    strokeTips: [
      '1. Nét ngang trên từ trái sang phải rồi móc nhẹ vào',
      '2. Nét cong ngang ở dưới đối xứng với nét trên'
    ],
    example: { word: 'こども', romaji: 'kodomo', meaning: 'Trẻ em', emoji: '👶' },
    strokePositions: [
      { x: 30, y: 34, label: 1 },
      { x: 32, y: 68, label: 2 }
    ]
  },

  // ── Hàng Sa ──
  {
    character: 'さ',
    romaji: 'sa',
    row: 'Hàng Sa',
    strokeCount: 3,
    strokeTips: [
      '1. Nét ngang hơi xiên chếch lên trên',
      '2. Nét sổ xiên chéo cắt qua nét ngang có móc nhẹ sang trái',
      '3. Nét vòng cung hở đối xứng bên dưới'
    ],
    example: { word: 'さくら', romaji: 'sakura', meaning: 'Hoa anh đào', emoji: '🌸' },
    strokePositions: [
      { x: 28, y: 36, label: 1 },
      { x: 64, y: 24, label: 2 },
      { x: 42, y: 78, label: 3 }
    ]
  },
  {
    character: 'し',
    romaji: 'shi',
    row: 'Hàng Sa',
    strokeCount: 1,
    strokeTips: [
      '1. Nét sổ thẳng từ trên xuống rồi uốn cong móc tròn lên như chiếc lưỡi câu'
    ],
    example: { word: 'しろ', romaji: 'shiro', meaning: 'Màu trắng', emoji: '⚪' },
    strokePositions: [
      { x: 46, y: 24, label: 1 }
    ]
  },
  {
    character: 'す',
    romaji: 'su',
    row: 'Hàng Sa',
    strokeCount: 2,
    strokeTips: [
      '1. Nét ngang từ trái sang phải',
      '2. Nét sổ dọc cắt qua, thắt một vòng xoay tròn rồi kéo đuôi xuống dưới'
    ],
    example: { word: 'すし', romaji: 'sushi', meaning: 'Món Sushi', emoji: '🍣' },
    strokePositions: [
      { x: 26, y: 35, label: 1 },
      { x: 55, y: 20, label: 2 }
    ]
  },
  {
    character: 'せ',
    romaji: 'se',
    row: 'Hàng Sa',
    strokeCount: 3,
    strokeTips: [
      '1. Nét ngang dài từ trái sang phải',
      '2. Nét sổ bên phải có móc hất vào trong',
      '3. Nét sổ bên trái kéo xuống rồi bẻ cong sang phải ôm dưới'
    ],
    example: { word: 'せんせい', romaji: 'sensei', meaning: 'Thầy cô giáo', emoji: '🧑‍🏫' },
    strokePositions: [
      { x: 22, y: 44, label: 1 },
      { x: 74, y: 26, label: 2 },
      { x: 40, y: 30, label: 3 }
    ]
  },
  {
    character: 'そ',
    romaji: 'so',
    row: 'Hàng Sa',
    strokeCount: 1,
    strokeTips: [
      '1. Một nét liền duy nhất: ngang ngắn -> chéo xuống -> ngang phải -> uốn cong tròn đáy như chữ C'
    ],
    example: { word: 'そら', romaji: 'sora', meaning: 'Bầu trời', emoji: '☁️' },
    strokePositions: [
      { x: 34, y: 28, label: 1 }
    ]
  },

  // ── Hàng Ta ──
  {
    character: 'た',
    romaji: 'ta',
    row: 'Hàng Ta',
    strokeCount: 4,
    strokeTips: [
      '1. Nét ngang ngắn ở phần trên bên trái',
      '2. Nét sổ xiên chéo cắt qua nét ngang',
      '3. Nét ngang nhỏ ở bên phải',
      '4. Nét cong ngang nhỏ bên dưới'
    ],
    example: { word: 'たいよう', romaji: 'taiyou', meaning: 'Mặt trời', emoji: '☀️' },
    strokePositions: [
      { x: 24, y: 34, label: 1 },
      { x: 38, y: 24, label: 2 },
      { x: 62, y: 46, label: 3 },
      { x: 62, y: 68, label: 4 }
    ]
  },
  {
    character: 'ち',
    romaji: 'chi',
    row: 'Hàng Ta',
    strokeCount: 2,
    strokeTips: [
      '1. Nét ngang ngắn hơi chếch lên',
      '2. Nét sổ chéo cắt qua nét ngang, thắt nút nhẹ rồi uốn vòng cung lớn sang phải'
    ],
    example: { word: 'ちず', romaji: 'chizu', meaning: 'Bản đồ', emoji: '🗺️' },
    strokePositions: [
      { x: 26, y: 34, label: 1 },
      { x: 50, y: 22, label: 2 }
    ]
  },
  {
    character: 'つ',
    romaji: 'tsu',
    row: 'Hàng Ta',
    strokeCount: 1,
    strokeTips: [
      '1. Nét uốn cong hình vòm lưỡi liềm / sóng vỗ từ trái qua phải rồi kéo lượn xuống dưới'
    ],
    example: { word: 'つき', romaji: 'tsuki', meaning: 'Mặt trăng', emoji: '🌙' },
    strokePositions: [
      { x: 28, y: 38, label: 1 }
    ]
  },
  {
    character: 'て',
    romaji: 'te',
    row: 'Hàng Ta',
    strokeCount: 1,
    strokeTips: [
      '1. Nét ngang từ trái sang phải rồi gập uốn vòng cung lớn như chữ C lật ngược'
    ],
    example: { word: 'て', romaji: 'te', meaning: 'Bàn tay', emoji: '✋' },
    strokePositions: [
      { x: 26, y: 34, label: 1 }
    ]
  },
  {
    character: 'と',
    romaji: 'to',
    row: 'Hàng Ta',
    strokeCount: 2,
    strokeTips: [
      '1. Nét xiên ngắn từ trên chéo xuống',
      '2. Nét vòng cung lớn bắt đầu từ nét 1 uốn cong xuống dưới'
    ],
    example: { word: 'とり', romaji: 'tori', meaning: 'Con chim', emoji: '🐦' },
    strokePositions: [
      { x: 42, y: 26, label: 1 },
      { x: 30, y: 52, label: 2 }
    ]
  },

  // ── Hàng Na ──
  {
    character: 'な',
    romaji: 'na',
    row: 'Hàng Na',
    strokeCount: 4,
    strokeTips: [
      '1. Nét ngang ngắn ở bên trái',
      '2. Nét sổ chéo cắt qua nét ngang',
      '3. Nét phẩy nhỏ ở góc trên bên phải',
      '4. Nét sổ xuống thắt nút xoay đuôi ở góc dưới bên phải'
    ],
    example: { word: 'なつ', romaji: 'natsu', meaning: 'Mùa hè', emoji: '🌻' },
    strokePositions: [
      { x: 24, y: 34, label: 1 },
      { x: 38, y: 24, label: 2 },
      { x: 74, y: 34, label: 3 },
      { x: 62, y: 55, label: 4 }
    ]
  },
  {
    character: 'に',
    romaji: 'ni',
    row: 'Hàng Na',
    strokeCount: 3,
    strokeTips: [
      '1. Nét sổ đứng bên trái hơi cong có móc hất',
      '2. Nét ngang trên ở bên phải',
      '3. Nét ngang cong dưới ở bên phải'
    ],
    example: { word: 'にほん', romaji: 'nihon', meaning: 'Nhật Bản', emoji: '🇯🇵' },
    strokePositions: [
      { x: 26, y: 28, label: 1 },
      { x: 58, y: 38, label: 2 },
      { x: 58, y: 66, label: 3 }
    ]
  },
  {
    character: 'ぬ',
    romaji: 'nu',
    row: 'Hàng Na',
    strokeCount: 2,
    strokeTips: [
      '1. Nét xiên chéo từ trái sang phải',
      '2. Nét sổ cong từ trái qua, uốn lượn bao quanh và thắt một vòng nhỏ ở đuôi'
    ],
    example: { word: 'ぬいぐるみ', romaji: 'nuigurumi', meaning: 'Gấu bông', emoji: '🧸' },
    strokePositions: [
      { x: 36, y: 26, label: 1 },
      { x: 44, y: 20, label: 2 }
    ]
  },
  {
    character: 'ね',
    romaji: 'ne',
    row: 'Hàng Na',
    strokeCount: 2,
    strokeTips: [
      '1. Nét sổ thẳng đứng ở bên trái',
      '2. Nét zic-zac kéo sang phải rồi uốn cong xoắn thắt nút ở đuôi'
    ],
    example: { word: 'ねこ', romaji: 'neko', meaning: 'Con mèo', emoji: '🐱' },
    strokePositions: [
      { x: 30, y: 24, label: 1 },
      { x: 40, y: 36, label: 2 }
    ]
  },
  {
    character: 'の',
    romaji: 'no',
    row: 'Hàng Na',
    strokeCount: 1,
    strokeTips: [
      '1. Nét xiên nhẹ ở giữa rồi lượn vòng cung tròn bao quanh từ phải sang trái'
    ],
    example: { word: 'のり', romaji: 'nori', meaning: 'Rong biển', emoji: '🍙' },
    strokePositions: [
      { x: 52, y: 30, label: 1 }
    ]
  },

  // ── Hàng Ha ──
  {
    character: 'は',
    romaji: 'ha',
    row: 'Hàng Ha',
    strokeCount: 3,
    strokeTips: [
      '1. Nét sổ dọc bên trái có móc nhẹ',
      '2. Nét ngang ngắn ở góc trên bên phải',
      '3. Nét sổ thẳng xuống thắt nút xoay đuôi sang phải'
    ],
    example: { word: 'はな', romaji: 'hana', meaning: 'Bông hoa', emoji: '🌷' },
    strokePositions: [
      { x: 26, y: 26, label: 1 },
      { x: 52, y: 34, label: 2 },
      { x: 65, y: 24, label: 3 }
    ]
  },
  {
    character: 'ひ',
    romaji: 'hi',
    row: 'Hàng Ha',
    strokeCount: 1,
    strokeTips: [
      '1. Nét ngang ngắn -> vòng xuống uốn cong hình lòng chảo -> kéo đuôi sang phải'
    ],
    example: { word: 'ひかり', romaji: 'hikari', meaning: 'Ánh sáng', emoji: '💡' },
    strokePositions: [
      { x: 25, y: 40, label: 1 }
    ]
  },
  {
    character: 'ふ',
    romaji: 'fu',
    row: 'Hàng Ha',
    strokeCount: 4,
    strokeTips: [
      '1. Nét phẩy ngắn trên đỉnh',
      '2. Nét móc chính ở giữa uốn cong',
      '3. Nét phẩy nhỏ bên trái',
      '4. Nét phẩy nhỏ bên phải'
    ],
    example: { word: 'ふね', romaji: 'fune', meaning: 'Con thuyền', emoji: '⛵' },
    strokePositions: [
      { x: 48, y: 20, label: 1 },
      { x: 48, y: 42, label: 2 },
      { x: 26, y: 58, label: 3 },
      { x: 74, y: 58, label: 4 }
    ]
  },
  {
    character: 'へ',
    romaji: 'he',
    row: 'Hàng Ha',
    strokeCount: 1,
    strokeTips: [
      '1. Nét chéo ngắn hướng lên rồi dốc dài xuống tạo hình chóp núi'
    ],
    example: { word: 'へや', romaji: 'heya', meaning: 'Căn phòng', emoji: '🏠' },
    strokePositions: [
      { x: 22, y: 55, label: 1 }
    ]
  },
  {
    character: 'ほ',
    romaji: 'ho',
    row: 'Hàng Ha',
    strokeCount: 4,
    strokeTips: [
      '1. Nét sổ dọc bên trái có móc',
      '2. Nét ngang trên bên phải',
      '3. Nét ngang dưới bên phải',
      '4. Nét sổ xuống (không vượt quá nét ngang trên) thắt nút xoay tròn'
    ],
    example: { word: 'ほし', romaji: 'hoshi', meaning: 'Ngôi sao', emoji: '⭐' },
    strokePositions: [
      { x: 26, y: 26, label: 1 },
      { x: 50, y: 32, label: 2 },
      { x: 50, y: 48, label: 3 },
      { x: 65, y: 32, label: 4 }
    ]
  },

  // ── Hàng Ma ──
  {
    character: 'ま',
    romaji: 'ma',
    row: 'Hàng Ma',
    strokeCount: 3,
    strokeTips: [
      '1. Nét ngang trên dài hơn',
      '2. Nét ngang dưới ngắn hơn một chút',
      '3. Nét sổ thẳng cắt qua cả hai nét ngang và thắt nút xoay đuôi'
    ],
    example: { word: 'まち', romaji: 'machi', meaning: 'Thành phố', emoji: '🏙️' },
    strokePositions: [
      { x: 28, y: 34, label: 1 },
      { x: 30, y: 48, label: 2 },
      { x: 50, y: 24, label: 3 }
    ]
  },
  {
    character: 'み',
    romaji: 'mi',
    row: 'Hàng Ma',
    strokeCount: 2,
    strokeTips: [
      '1. Nét ngang ngắn, sổ chéo xuống thắt nút xoay sang phải',
      '2. Nét cong chéo vắt qua đuôi của nét thứ nhất'
    ],
    example: { word: 'みず', romaji: 'mizu', meaning: 'Nước uống', emoji: '💧' },
    strokePositions: [
      { x: 28, y: 32, label: 1 },
      { x: 68, y: 38, label: 2 }
    ]
  },
  {
    character: 'む',
    romaji: 'mu',
    row: 'Hàng Ma',
    strokeCount: 3,
    strokeTips: [
      '1. Nét ngang ngắn từ trái sang phải',
      '2. Nét sổ xuống thắt một vòng cung tròn rồi hất đuôi lên trên',
      '3. Nét phẩy nhỏ ở góc trên bên phải'
    ],
    example: { word: 'むし', romaji: 'mushi', meaning: 'Côn trùng', emoji: '🐞' },
    strokePositions: [
      { x: 26, y: 38, label: 1 },
      { x: 46, y: 24, label: 2 },
      { x: 76, y: 32, label: 3 }
    ]
  },
  {
    character: 'め',
    romaji: 'me',
    row: 'Hàng Ma',
    strokeCount: 2,
    strokeTips: [
      '1. Nét chéo ngắn từ trên xiên xuống',
      '2. Nét sổ cong từ trái qua, uốn vòng rộng ôm lấy nét đầu tiên'
    ],
    example: { word: 'め', romaji: 'me', meaning: 'Đôi mắt', emoji: '👁️' },
    strokePositions: [
      { x: 42, y: 28, label: 1 },
      { x: 48, y: 20, label: 2 }
    ]
  },
  {
    character: 'も',
    romaji: 'mo',
    row: 'Hàng Ma',
    strokeCount: 3,
    strokeTips: [
      '1. Nét cong lưỡi câu dài từ trên xuống rồi uốn cong sang phải',
      '2. Nét ngang trên cắt qua thân nét chính',
      '3. Nét ngang dưới cắt qua thân nét chính'
    ],
    example: { word: 'もも', romaji: 'momo', meaning: 'Quả đào', emoji: '🍑' },
    strokePositions: [
      { x: 48, y: 22, label: 1 },
      { x: 30, y: 38, label: 2 },
      { x: 30, y: 52, label: 3 }
    ]
  },

  // ── Hàng Ya ──
  {
    character: 'や',
    romaji: 'ya',
    row: 'Hàng Ya',
    strokeCount: 3,
    strokeTips: [
      '1. Nét móc uốn cong dài từ trái qua phải',
      '2. Nét phẩy nhỏ ở góc trên',
      '3. Nét sổ chéo cắt qua nét cong chính'
    ],
    example: { word: 'やま', romaji: 'yama', meaning: 'Ngọn núi', emoji: '⛰️' },
    strokePositions: [
      { x: 26, y: 44, label: 1 },
      { x: 62, y: 26, label: 2 },
      { x: 45, y: 22, label: 3 }
    ]
  },
  {
    character: 'ゆ',
    romaji: 'yu',
    row: 'Hàng Ya',
    strokeCount: 2,
    strokeTips: [
      '1. Nét sổ xuống rồi uốn vòng cung lớn hất ngược lên trên',
      '2. Nét sổ cong dọc cắt qua vòng cung'
    ],
    example: { word: 'ゆき', romaji: 'yuki', meaning: 'Tuyết rơi', emoji: '❄️' },
    strokePositions: [
      { x: 32, y: 28, label: 1 },
      { x: 62, y: 20, label: 2 }
    ]
  },
  {
    character: 'よ',
    romaji: 'yo',
    row: 'Hàng Ya',
    strokeCount: 2,
    strokeTips: [
      '1. Nét ngang ngắn ở phần trên',
      '2. Nét sổ thẳng từ trên xuống thắt nút xoay đuôi sang phải'
    ],
    example: { word: 'よる', romaji: 'yoru', meaning: 'Ban đêm', emoji: '🌙' },
    strokePositions: [
      { x: 34, y: 34, label: 1 },
      { x: 55, y: 22, label: 2 }
    ]
  },

  // ── Hàng Ra ──
  {
    character: 'ら',
    romaji: 'ra',
    row: 'Hàng Ra',
    strokeCount: 2,
    strokeTips: [
      '1. Nét phẩy ngắn trên đỉnh',
      '2. Nét vòng cung uốn lượn mềm mại ở bên dưới'
    ],
    example: { word: 'らいおん', romaji: 'raion', meaning: 'Sư tử', emoji: '🦁' },
    strokePositions: [
      { x: 44, y: 22, label: 1 },
      { x: 34, y: 44, label: 2 }
    ]
  },
  {
    character: 'り',
    romaji: 'ri',
    row: 'Hàng Ra',
    strokeCount: 2,
    strokeTips: [
      '1. Nét sổ ngắn bên trái có móc nhẹ lên',
      '2. Nét cong dài bên phải vuốt nhọn xuống dưới'
    ],
    example: { word: 'りんご', romaji: 'ringo', meaning: 'Quả táo', emoji: '🍎' },
    strokePositions: [
      { x: 34, y: 32, label: 1 },
      { x: 64, y: 24, label: 2 }
    ]
  },
  {
    character: 'る',
    romaji: 'ru',
    row: 'Hàng Ra',
    strokeCount: 1,
    strokeTips: [
      '1. Nét ngang -> gập chéo xuống -> uốn vòng cung tròn và thắt một vòng nhỏ ở đuôi'
    ],
    example: { word: 'るす', romaji: 'rusu', meaning: 'Vắng nhà', emoji: '🚪' },
    strokePositions: [
      { x: 32, y: 28, label: 1 }
    ]
  },
  {
    character: 'れ',
    romaji: 're',
    row: 'Hàng Ra',
    strokeCount: 2,
    strokeTips: [
      '1. Nét sổ thẳng đứng ở bên trái',
      '2. Nét zic-zac kéo sang phải rồi uốn lượn hất đuôi ra ngoài'
    ],
    example: { word: 'れいぞうこ', romaji: 'reizouko', meaning: 'Tủ lạnh', emoji: '🧊' },
    strokePositions: [
      { x: 30, y: 24, label: 1 },
      { x: 40, y: 36, label: 2 }
    ]
  },
  {
    character: 'ろ',
    romaji: 'ro',
    row: 'Hàng Ra',
    strokeCount: 1,
    strokeTips: [
      '1. Nét ngang -> gập chéo xuống -> uốn vòng cung tròn đáy (không thắt vòng tròn)'
    ],
    example: { word: 'ろうそく', romaji: 'rousoku', meaning: 'Cây nến', emoji: '🕯️' },
    strokePositions: [
      { x: 32, y: 28, label: 1 }
    ]
  },

  // ── Hàng Wa & N ──
  {
    character: 'わ',
    romaji: 'wa',
    row: 'Hàng Wa',
    strokeCount: 2,
    strokeTips: [
      '1. Nét sổ thẳng đứng ở bên trái',
      '2. Nét zic-zac kéo sang phải rồi uốn vòng cung tròn lớn sang phải'
    ],
    example: { word: 'わたし', romaji: 'watashi', meaning: 'Tôi / Bản thân', emoji: '🙋' },
    strokePositions: [
      { x: 30, y: 24, label: 1 },
      { x: 40, y: 36, label: 2 }
    ]
  },
  {
    character: 'を',
    romaji: 'wo',
    row: 'Hàng Wa',
    strokeCount: 3,
    strokeTips: [
      '1. Nét ngang ngắn ở phần trên',
      '2. Nét sổ xiên gập ngang uốn lượn',
      '3. Nét vòng cung hình chữ C cắt qua thân'
    ],
    example: { word: 'ほんをよむ', romaji: 'hon o yomu', meaning: 'Đọc sách', emoji: '📖' },
    strokePositions: [
      { x: 26, y: 32, label: 1 },
      { x: 46, y: 24, label: 2 },
      { x: 44, y: 55, label: 3 }
    ]
  },
  {
    character: 'ん',
    romaji: 'n',
    row: 'Hàng N',
    strokeCount: 1,
    strokeTips: [
      '1. Nét sổ xiên ngắn rồi uốn lượn hình chữ n kéo dài vút đuôi lên trên'
    ],
    example: { word: 'にほん', romaji: 'nihon', meaning: 'Nhật Bản', emoji: '🗻' },
    strokePositions: [
      { x: 34, y: 28, label: 1 }
    ]
  }
]
