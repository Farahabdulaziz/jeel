// هذا هو الملف اللي تعدلين فيه لإضافة أو حذف قنوات وفيديوهات وألعاب
//
// كل قناة لها:
//   id     -> بدون مسافات، معرف داخلي
//   name   -> اسم القناة اللي يظهر تحت عنوان الفيديو وبصفحة القناة
//   color  -> لون دائرة القناة (يُستخدم فقط إذا ما فيه avatar)
//   avatar -> (اختياري) رابط صورة للقناة. خليه فاضي "" عشان يظهر دائرة ملونة بأول حرف
//   videos -> قائمة الفيديوهات
//
// كل فيديو له:
//   id         -> بدون مسافات
//   title      -> العنوان
//   youtubeId  -> الجزء اللي بعد v= في رابط يوتيوب
//   category   -> اسم التصنيف اللي يظهر بشريط التصفية فوق بالرئيسية (كل فيديو يقدر يكون بتصنيف مختلف حتى لو بنفس القناة)

const CHANNELS = [
  {
    id: "bandora",
    name: "اكتشف العالم مع بندورة",
    color: "#F2704A",
    avatar: "",
    videos: [
      { id: "planets", title: "الكواكب - المجموعة الشمسية - عالم الفضاء - تعليم أسماء الكواكب للأطفال", youtubeId: "mkC0lhvJQnc", category: "الفضاء" }
    ]
  },
  {
    id: "zad-alhroof",
    name: "زاد الحروف",
    color: "#1F6F63",
    avatar: "",
    videos: [
      { id: "jana1", title: "جنى - قصص للأطفال قبل النوم - الحلقة 1 - الأمل بالله", youtubeId: "bdqVPFyMFxU", category: "قصص" },
      { id: "jana2", title: "جنى - قصص للأطفال قبل النوم - الحلقة 2 - الرزاق", youtubeId: "UT1W2bo14xs", category: "قصص" },
      { id: "jana3", title: "جنى - قصص للأطفال قبل النوم - الحلقة 3 - الإحسان", youtubeId: "s4aerXrhj20", category: "قصص" },
      { id: "salem2", title: "مساعدة المحتاجين - مغامرات سالم - قصص أطفال إسلامية", youtubeId: "HYkFIEkeLIE", category: "قصص" }
    ]
  },
  {
    id: "ahlan-simsim",
    name: "أهلاً سمسم",
    color: "#F6C445",
    avatar: "",
    videos: [
      { id: "amira-colors", title: "أهلاً سمسم: تجربة الألوان مع أميرة 🧪", youtubeId: "RNasMhK7srQ", category: "تعليمي" },
      { id: "basma-football", title: "أهلاً سمسم: الموسم 6، الحلقة 18 - بسمة نجمة كرة القدم", youtubeId: "cJRHBhd4s_E", category: "تعليمي" }
    ]
  },
  {
    id: "mansour-adventures",
    name: "مغامرات منصور",
    color: "#2E6E8C",
    avatar: "",
    videos: [
      { id: "survive-wild", title: "كيف تعيش في البرية؟ تحدي البقاء 🌲", youtubeId: "jdWPcKmAnVc", category: "قصص" },
      { id: "wild-danger", title: "مغامرة خطيرة في البرية! 🌵", youtubeId: "thgWtU2nGOc", category: "قصص" },
      { id: "wadi-rum", title: "مغامرة مذهلة في وادي رم! 🏜️", youtubeId: "wCGDvQ26V5k", category: "قصص" }
    ]
  },
  {
    id: "asal-kids",
    name: "Asal Kids",
    color: "#E8927C",
    avatar: "",
    videos: [
      { id: "المجموعة-الكواكب", title: "المجموعة الشمسية --- كواكب المجموعة الشمسية ---- لنتعرف على الكواكب", youtubeId: "twu3srJrzZ4", category: "الفضاء" }
    ]
  },
  {
    id: "taallam-maa-noor",
    name: "تعلم مع نور",
    color: "#7C6FF0",
    avatar: "",
    videos: [
      { id: "أطوار-نور", title: "أطوار القمر | لماذا يتغير شكل القمر كل يوم ؟ | اين يختفي القمر | تعلم مع نور", youtubeId: "jSe7pm823xg", category: "الفضاء" },
      { id: "درس-للأطفال", title: "درس تعليمي عن مفهوم الزمن والوقت والساعة للأطفال", youtubeId: "q39eyNTE3g0" },
      { id: "تعليم-نور", title: "تعليم الفصول الاربعة للأطفال تعلم مع نور", youtubeId: "6d9AaRhqpCg", category: "الطبيعة" }
    ]
  },
  {
    id: "azooz-jude",
    name: "Azooz & Jude",
    color: "#4C9F70",
    avatar: "",
    videos: [
      { id: "قصة-مش", title: "قصة قصيرة - إلى الفضاء مع مش", youtubeId: "2X_CNjTAUYs", category: "الفضاء" }
    ]
  },
  {
    id: "tunes-kids",
    name: "Tunes Kids",
    color: "#B85450",
    avatar: "",
    videos: [
      { id: "قصص-kids", title: "قصص سلاف - الفضاء | قناة تيونز كيدز - Tunes Kids", youtubeId: "Cqg6lrbpEdE", category: "الفضاء" },
      { id: "قصص-kids2", title: "قصص سلاف - الحذر | قناة تيونز كيدز - Tunes Kids", youtubeId: "Dv7nfzhqmHM", category: "قصص" },
      { id: "قصص-kids3", title: "قصص سلاف - عدم الاستئذان | قناة تيونز كيدز - Tunes Kids", youtubeId: "kWQGRctFvTc", category: "قصص" }
    ]
  },
  {
    id: "madrasa",
    name: "Madrasa",
    color: "#3F7CAC",
    avatar: "",
    videos: [
      { id: "قصص-والفضاء", title: "قصص مدرسة | فصيل والفضاء", youtubeId: "QV_mYWx66Ds", category: "الفضاء" }
    ]
  },
  {
    id: "atfalna-today",
    name: "أطفالنا تو داي",
    color: "#E0A458",
    avatar: "",
    videos: [
      { id: "كيف-سهله", title: "كيف يصنع النحل العسل؟ مغامرة تعليمية للأطفال بطريقة سهله", youtubeId: "5XYHt6dbYKw", category: "الطبيعة" }
    ]
  },
  {
    id: "learn-zakaria",
    name: "Learn with Zakaria",
    color: "#6C9BCF",
    avatar: "",
    videos: [
      { id: "what-2", title: "What are bees? How do bees make honey? | Facts about bees for kids - How, What, Why (Episode 2)", youtubeId: "fWarA3WXavE", category: "الطبيعة" },
      { id: "why-1", title: "Why Do Mosquitoes Bite Humans? | Mosquito Information for Kids - How, What, and Why (Episode 1)", youtubeId: "YTjBQCfZ50M", category: "الطبيعة" },
      { id: "memory-zakaria", title: "Memory Card Game | Family Member - brain exercise for family, Learn with Zakaria", youtubeId: "7Q7xzKReviI" },
      { id: "wild-للاطفال", title: "Wild Animals in Arabic for Kids - الحيوانات للأطفال - حيوانات الغابة باللغة العربية للاطفال", youtubeId: "bJvzjM0uLwI", category: "الحيوانات" },
      { id: "aquatic-للاطفال", title: "Aquatic Animals for Kids in Arabic - الحيوانات للأطفال - حيوانات البحر باللغة العربية للاطفال", youtubeId: "dmAb6XbJmF8", category: "الحيوانات" },
      { id: "farm-للاطفال", title: "Farm Animals in Arabic for Kids - الحيوانات للأطفال - حيوانات المزرعة باللغة العربية للاطفال", youtubeId: "d-AcSjaM-dU", category: "الحيوانات" },
      { id: "animal-العربية", title: "Animal Sounds in Arabic for Kids - أصوات الحيوانات للاطفال باللغة العربية", youtubeId: "I3YnXSeUAto", category: "الحيوانات" }
    ]
  },
  {
    id: "siraj",
    name: "سراج - SIRAJ",
    color: "#2F6B4F",
    avatar: "",
    videos: [
      { id: "سراج-الغفور", title: "سراج سلسلة أسماء الله الحسنى - الغفور", youtubeId: "ncy-T7OMAo0", category: "قصص" },
      { id: "سراج-الرحيم", title: "سراج سلسلة أسماء الله الحسنى - الرحيم", youtubeId: "CRc4QoozSz0", category: "قصص" },
      { id: "سراج-الرزاق", title: "سراج سلسلة أسماء الله الحسنى - الرزاق", youtubeId: "kkaXP2ixNIE", category: "قصص" },
      { id: "سراج-الشافي", title: "سراج سلسلة أسماء الله الحسنى - الشافي", youtubeId: "t7TP8o9cvr0", category: "قصص" },
      { id: "سراج-السميع", title: "سراج سلسلة أسماء الله الحسنى - السميع", youtubeId: "2uBEKNtRpIA", category: "قصص" },
      { id: "الحلقة-السلام", title: "الحلقة الأولى: موقف من قصة النبي موسى عليه السلام", youtubeId: "Z9c2pHDqA9U", category: "قصص" },
      { id: "الحلقة-السلام2", title: "الحلقة الثانية: موقف من قصة النبي يوسف عليه السلام", youtubeId: "YsTD2TFLVwc", category: "قصص" },
      { id: "الحلقة-وسلم", title: "الحلقة الثالثة: موقف من قصة النبي محمد صلى الله عليه وسلم", youtubeId: "Hl1Ju0GuhVs", category: "قصص" },
      { id: "الحلقة-السلام3", title: "الحلقة الرابعة: موقف من قصة النبي نوح عليه السلام", youtubeId: "8s84VUkT2IM", category: "قصص" },
      { id: "الحلقة-السلام4", title: "الحلقة الخامسة: قصة الهدهد مع النبي سليمان عليه السلام", youtubeId: "_gyzDSRugTI", category: "قصص" },
      { id: "الحلقة-السلام5", title: "الحلقة السادسة: موقف من قصة النبي شعيب عليه السلام", youtubeId: "-yDe7EmcLQI", category: "قصص" }
    ]
  },
  {
    id: "adam-mishmish",
    name: "آدم ومشمش",
    color: "#F4A259",
    avatar: "",
    videos: [
      { id: "arabic", title: "Arabic Alphabet for Kids — Learn Arabic Letters | Adam & Mishmish ✏️📚", youtubeId: "zr9RaXlMEP8", category: "أغاني" },
      { id: "shapes-mishmish", title: "Shapes in Arabic for Kids — Learn Arabic Shapes 🔺🟢| Adam & Mishmish", youtubeId: "PId1Ea81i6k", category: "أغاني" },
      { id: "action-mishmish", title: "Action & Movement Song in Arabic for Kids🕺👯 | Adam & Mishmish", youtubeId: "2LaIBgvzIRY", category: "أغاني" },
      { id: "count-mishmish", title: "Count to 10 in Arabic for Kids — Arabic Numbers 🔢 9️⃣| Adam & Mishmish", youtubeId: "eZmQ-SnSD8Y", category: "أغاني" },
      { id: "finger-mishmish", title: "Finger Family Song in Arabic for Kids✋☝️ | Adam & Mishmish", youtubeId: "wq4VJ_B4Z0A", category: "أغاني" },
      { id: "clean-mishmish", title: "Clean Up Song in Arabic for Kids — Tidy Your Room 🧸🪀| Adam & Mishmish", youtubeId: "eoHvGHPf26g", category: "أغاني" },
      { id: "نلعب،-sharing", title: "نلعب، نشارك، نسامح ونتعاون - مجموعة جديدة من آدم ومشمش | Arabic Songs for Kids about sharing", youtubeId: "KDzW70EKvvI", category: "أغاني" },
      { id: "آدم-songs", title: "آدم يسافر مع مشمش بالطائرة ✈️ - Kids Arabic Travel Songs", youtubeId: "zwzHeaM9nNc", category: "أغاني" },
      { id: "أغاني-kids", title: "أغاني أطفال للطريق 🚗 | آدم ومشمش | Arabic Songs for Kids", youtubeId: "oi5XiSgimIk", category: "أغاني" },
      { id: "treasure-mishmish", title: "Treasure Chest & Transportation Songs for Kids 22 Min 🚗🚂 | Adam Wa Mishmish", youtubeId: "v4dR0HWKcxE", category: "أغاني" }
    ]
  },
  {
    id: "saud-sara",
    name: "سعود وسارة",
    color: "#8C5E58",
    avatar: "",
    videos: [
      { id: "التبسط-سعود-وسارة", title: "التبسط والتلطف | الحلقة الأولى | سعود وسارة في رحاب النبوة #سعود_وسارة", youtubeId: "gRh_hzwOaIg", category: "قصص" }
    ]
  },
  {
    id: "adnan-quran",
    name: "عدنان - أدعية وأذكار",
    color: "#5B7C99",
    avatar: "",
    videos: [
      { id: "ألوان-العربية", title: "ألوان جنان و عدنان | تلوين الحروف العربية", youtubeId: "bZQ9xEaF8Zc" },
      { id: "٢٥-عدنان", title: "٢٥ دعاء سهل الحفظ للأطفال - سلسلة الأدعية والأذكار مع عدنان", youtubeId: "yRydlWbD2dY" },
      { id: "أذكار-عدنان", title: "أذكار الصباح والمساء - سلسلة الأدعية والأذكار مع عدنان", youtubeId: "KxNoWofJTZc" },
      { id: "دعاء-عدنان", title: "دعاء الدخول والخروج من المنزل - سلسلة الأدعية والأذكار مع عدنان", youtubeId: "G-MFbLtHSqE" },
      { id: "دعاء-عدنان2", title: "دعاء الدخول إلى الخلاء - سلسلة الأدعية والأذكار مع عدنان", youtubeId: "-RIbhavaZP8" },
      { id: "أذكار-عدنان2", title: "أذكار النوم - سلسلة الأدعية والأذكار مع عدنان", youtubeId: "j-1gQZywECM" }
    ]
  },
  {
    id: "dawood-kids",
    name: "قناة داوود للأطفال",
    color: "#7D8C4C",
    avatar: "",
    videos: [
      { id: "سورة-repetition", title: "سورة الفاتحة ٣٠ دقيقة تكرار-أحلى طريقة لحفظ القرآن للأطفال Quran for Kids-Al Fatihah 30' Repetition", youtubeId: "Uufkkk6D2lk", category: "قرآن" },
      { id: "سورة-repetition2", title: "سورة الإخلاص ٣٠ دقيقة تكرار-أحلى طريقة لحفظ القرآن للأطفال Quran for Kids-Al Ikhlas 30' Repetition", youtubeId: "OquUdWeXbVc", category: "قرآن" },
      { id: "سورة-repetition3", title: "سورة الفلق ٣٠ دقيقة تكرار-أحلى طريقة لحفظ القرآن للأطفال Quran for Kids-Al Falaq 30' Repetition", youtubeId: "kVoDlXwPMqc", category: "قرآن" },
      { id: "سورة-repetition4", title: "سورة الناس ٣٠ دقيقة تكرار-أحلى طريقة لحفظ القرآن للأطفال Quran for Kids-Al Nas 30' Repetition", youtubeId: "jggjZMf3PNc", category: "قرآن" },
      { id: "قصة-fish", title: "قصة السمكة العجيبة قصص نوم - احلى قصص اطفال - Best Kid's story The story of the strange fish", youtubeId: "fSN_8GF5iBI", category: "قصص" },
      { id: "سورة-al-nas", title: "سورة الناس -تعليم القرآن للأطفال -أحلى قرائة لسورة الناس - قناة داوود Quran for Kids - Al-Nas", youtubeId: "TyKwwVemYhw", category: "قرآن" },
      { id: "سورة-al-nasr", title: "سورة النصر -تعليم القرآن للأطفال -أحلى قرائة لسورة النصر - قناة داوود Quran for Kids - Al-Nasr", youtubeId: "vDGwQD6cZd8", category: "قرآن" },
      { id: "سورة-kawthar", title: "سورة الكوثر -تعليم القرآن للأطفال -أحلى قرائة لسورة الكوثر - قناة داوود Quran for Kids - Al Kawthar", youtubeId: "Kz7_R4YtQBw", category: "قرآن" },
      { id: "سورة-al-ikhlas", title: "سورة الإخلاص -تعليم القرآن للأطفال -أحلى قرائة لسورة الإخلاص - قناة داوود Quran for Kids - Al-Ikhlas", youtubeId: "OH74taV8wRE", category: "قرآن" },
      { id: "سورة-al-qadr", title: "سورة القدر -تعليم القرآن للأطفال -أحلى قرائة لسورة القدر - قناة داوود Quran for Kids - Al-Qadr", youtubeId: "9PvY3j74xV4", category: "قرآن" }
    ]
  },
];

// قائمة الألعاب اللي تظهر بقسم "ألعاب" بالصفحة الرئيسية (دائرة بلون + رمز)
// "memory": بطاقات مقلوبة/تذكّر الأزواج - ألوانها تتناوب بين 4 ألوان كل جولة
// "puzzle": تركيبة (بازل) بصور حقيقية لمعالم مشهورة - تتناوب بين 4 صور كل جولة
const GAMES = [
  { id: "memory", title: "لعبة الذاكرة", emoji: "🧠", color: "#1F6F4A" },
  { id: "puzzle", title: "تركيبة", emoji: "🧩", color: "#2E6E8C" }
];
