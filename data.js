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
//   duration   -> مدة الفيديو بصيغة "دقائق:ثواني" مثل "07:32" (شوفي المدة تحت الفيديو بيوتيوب وانسخيها).
//                 اتركيه فاضي "" لو ما عندك وقت تعبينه الحين - ببساطة ما تظهر شارة المدة على ذاك الفيديو.

const CHANNELS = [
  {
    id: "zad-alhroof",
    name: "زاد الحروف",
    color: "#1F6F63",
    avatar: "",
    videos: [
      { id: "jana1", title: "جنى - قصص للأطفال قبل النوم - الحلقة 1 - الأمل بالله", youtubeId: "bdqVPFyMFxU", category: "قصص", duration: "" },
      { id: "jana2", title: "جنى - قصص للأطفال قبل النوم - الحلقة 2 - الرزاق", youtubeId: "UT1W2bo14xs", category: "قصص", duration: "" },
      { id: "jana3", title: "جنى - قصص للأطفال قبل النوم - الحلقة 3 - الإحسان", youtubeId: "s4aerXrhj20", category: "قصص", duration: "" },
      { id: "salem2", title: "مساعدة المحتاجين - مغامرات سالم - قصص أطفال إسلامية", youtubeId: "HYkFIEkeLIE", category: "قصص", duration: "" }
    ]
  },
  {
    id: "ahlan-simsim",
    name: "أهلاً سمسم",
    color: "#F6C445",
    avatar: "",
    videos: [
      { id: "amira-colors", title: "أهلاً سمسم: تجربة الألوان مع أميرة 🧪", youtubeId: "RNasMhK7srQ", category: "تعليمي", duration: "" },
      { id: "basma-football", title: "أهلاً سمسم: الموسم 6، الحلقة 18 - بسمة نجمة كرة القدم", youtubeId: "cJRHBhd4s_E", category: "تعليمي", duration: "" }
    ]
  },
  {
    id: "mansour-adventures",
    name: "مغامرات منصور",
    color: "#2E6E8C",
    avatar: "",
    videos: [
      { id: "survive-wild", title: "كيف تعيش في البرية؟ تحدي البقاء 🌲", youtubeId: "jdWPcKmAnVc", category: "قصص", duration: "" },
      { id: "wild-danger", title: "مغامرة خطيرة في البرية! 🌵", youtubeId: "thgWtU2nGOc", category: "قصص", duration: "" },
      { id: "wadi-rum", title: "مغامرة مذهلة في وادي رم! 🏜️", youtubeId: "wCGDvQ26V5k", category: "قصص", duration: "" }
    ]
  },
  {
    id: "asal-kids",
    name: "Asal Kids",
    color: "#E8927C",
    avatar: "",
    videos: [
      { id: "المجموعة-الكواكب", title: "المجموعة الشمسية --- كواكب المجموعة الشمسية ---- لنتعرف على الكواكب", youtubeId: "twu3srJrzZ4", category: "الفضاء", duration: "" }
    ]
  },
  {
    id: "taallam-maa-noor",
    name: "تعلم مع نور",
    color: "#7C6FF0",
    avatar: "",
    videos: [
      { id: "أطوار-نور", title: "أطوار القمر | لماذا يتغير شكل القمر كل يوم ؟ | اين يختفي القمر | تعلم مع نور", youtubeId: "jSe7pm823xg", category: "الفضاء", duration: "" },
      { id: "درس-للأطفال", title: "درس تعليمي عن مفهوم الزمن والوقت والساعة للأطفال", youtubeId: "q39eyNTE3g0", duration: "" },
      { id: "تعليم-نور", title: "تعليم الفصول الاربعة للأطفال تعلم مع نور", youtubeId: "6d9AaRhqpCg", category: "الطبيعة", duration: "" }
    ]
  },
  {
    id: "azooz-jude",
    name: "Azooz & Jude",
    color: "#4C9F70",
    avatar: "",
    videos: [
      { id: "قصة-مش", title: "قصة قصيرة - إلى الفضاء مع مش", youtubeId: "2X_CNjTAUYs", category: "الفضاء", duration: "" }
    ]
  },
  {
    id: "tunes-kids",
    name: "Tunes Kids",
    color: "#B85450",
    avatar: "",
    videos: [
      { id: "قصص-kids", title: "قصص سلاف - الفضاء | قناة تيونز كيدز", youtubeId: "Cqg6lrbpEdE", category: "الفضاء", duration: "" },
      { id: "قصص-kids2", title: "قصص سلاف - الحذر | قناة تيونز كيدز", youtubeId: "Dv7nfzhqmHM", category: "قصص", duration: "" },
      { id: "قصص-kids3", title: "قصص سلاف - عدم الاستئذان | قناة تيونز كيدز", youtubeId: "kWQGRctFvTc", category: "قصص", duration: "" }
    ]
  },
  {
    id: "madrasa",
    name: "Madrasa",
    color: "#3F7CAC",
    avatar: "",
    videos: [
      { id: "قصص-والفضاء", title: "قصص مدرسة | فصيل والفضاء", youtubeId: "QV_mYWx66Ds", category: "الفضاء", duration: "" }
    ]
  },
  {
    id: "atfalna-today",
    name: "أطفالنا تو داي",
    color: "#E0A458",
    avatar: "",
    videos: [
      { id: "كيف-سهله", title: "كيف يصنع النحل العسل؟ مغامرة تعليمية للأطفال بطريقة سهله", youtubeId: "5XYHt6dbYKw", category: "الطبيعة", duration: "" }
    ]
  },
  {
    id: "learn-zakaria",
    name: "Learn with Zakaria",
    color: "#6C9BCF",
    avatar: "",
    videos: [
      { id: "what-2", title: "ما هو النحل؟ كيف يصنع النحل العسل؟ | حقائق عن النحل للأطفال - كيف، ماذا، ولماذا (الحلقة 2)", youtubeId: "fWarA3WXavE", category: "الطبيعة", duration: "" },
      { id: "why-1", title: "لماذا تلدغ البعوضُ البشرَ؟ | معلومات عن البعوض للأطفال - كيف، وماذا، ولماذا (الحلقة 1)", youtubeId: "YTjBQCfZ50M", category: "الطبيعة", duration: "" },
      { id: "memory-zakaria", title: "Memory Card Game | Family Member - brain exercise for family, Learn with Zakaria", youtubeId: "7Q7xzKReviI", duration: "" },
      { id: "wild-للاطفال", title: "الحيوانات للأطفال - حيوانات الغابة باللغة العربية للاطفال", youtubeId: "bJvzjM0uLwI", category: "الحيوانات", duration: "" },
      { id: "aquatic-للاطفال", title: "الحيوانات للأطفال - حيوانات البحر باللغة العربية للاطفال", youtubeId: "dmAb6XbJmF8", category: "الحيوانات", duration: "" },
      { id: "farm-للاطفال", title: "الحيوانات للأطفال - حيوانات المزرعة باللغة العربية للاطفال", youtubeId: "d-AcSjaM-dU", category: "الحيوانات", duration: "" },
      { id: "animal-العربية", title: "أصوات الحيوانات للاطفال باللغة العربية", youtubeId: "I3YnXSeUAto", category: "الحيوانات", duration: "" }
    ]
  },
  {
    id: "siraj",
    name: "سراج - SIRAJ",
    color: "#2F6B4F",
    avatar: "",
    videos: [
      { id: "سراج-الغفور", title: "سراج سلسلة أسماء الله الحسنى - الغفور", youtubeId: "ncy-T7OMAo0", category: "قصص", duration: "" },
      { id: "سراج-الرحيم", title: "سراج سلسلة أسماء الله الحسنى - الرحيم", youtubeId: "CRc4QoozSz0", category: "قصص", duration: "" },
      { id: "سراج-الرزاق", title: "سراج سلسلة أسماء الله الحسنى - الرزاق", youtubeId: "kkaXP2ixNIE", category: "قصص", duration: "" },
      { id: "سراج-الشافي", title: "سراج سلسلة أسماء الله الحسنى - الشافي", youtubeId: "t7TP8o9cvr0", category: "قصص", duration: "" },
      { id: "سراج-السميع", title: "سراج سلسلة أسماء الله الحسنى - السميع", youtubeId: "2uBEKNtRpIA", category: "قصص", duration: "" },
      { id: "الحلقة-السلام", title: "الحلقة الأولى: موقف من قصة النبي موسى عليه السلام", youtubeId: "Z9c2pHDqA9U", category: "قصص", duration: "" },
      { id: "الحلقة-السلام2", title: "الحلقة الثانية: موقف من قصة النبي يوسف عليه السلام", youtubeId: "YsTD2TFLVwc", category: "قصص", duration: "" },
      { id: "الحلقة-وسلم", title: "الحلقة الثالثة: موقف من قصة النبي محمد صلى الله عليه وسلم", youtubeId: "Hl1Ju0GuhVs", category: "قصص", duration: "" },
      { id: "الحلقة-السلام3", title: "الحلقة الرابعة: موقف من قصة النبي نوح عليه السلام", youtubeId: "8s84VUkT2IM", category: "قصص", duration: "" },
      { id: "الحلقة-السلام4", title: "الحلقة الخامسة: قصة الهدهد مع النبي سليمان عليه السلام", youtubeId: "_gyzDSRugTI", category: "قصص", duration: "" },
      { id: "الحلقة-السلام5", title: "الحلقة السادسة: موقف من قصة النبي شعيب عليه السلام", youtubeId: "-yDe7EmcLQI", category: "قصص", duration: "" }
    ]
  },
  {
    id: "adam-mishmish",
    name: "آدم ومشمش",
    color: "#F4A259",
    avatar: "",
    videos: [
      { id: "arabic", title: "الأبجدية العربية للأطفال — تعلّم الحروف العربية | آدم ومشمش ✏️📚", youtubeId: "zr9RaXlMEP8", category: "أغاني", duration: "" },
      { id: "shapes-mishmish", title: "الأشكال باللغة العربية للأطفال — تعلّم الأشكال بالعربية 🔺🟢 | آدم ومشمش", youtubeId: "PId1Ea81i6k", category: "أغاني", duration: "" },
      { id: "action-mishmish", title: "أغنية حركية للأطفال باللغة العربية 🕺👯 | آدم ومشمش", youtubeId: "2LaIBgvzIRY", category: "أغاني", duration: "" },
      { id: "count-mishmish", title: "عدّ من 1 إلى 10 بالعربية للأطفال — الأرقام العربية 🔢 9️⃣ | آدم ومشمش", youtubeId: "eZmQ-SnSD8Y", category: "أغاني", duration: "" },
      { id: "finger-mishmish", title: "أغنية عائلة الأصابع للأطفال باللغة العربية ✋☝️ | آدم ومشمش", youtubeId: "wq4VJ_B4Z0A", category: "أغاني", duration: "" },
      { id: "clean-mishmish", title: "أغنية الترتيب للأطفال — رتّب غرفتك 🧸🪀 | آدم ومشمش", youtubeId: "eoHvGHPf26g", category: "أغاني", duration: "" },
      { id: "نلعب،-sharing", title: "نلعب، نشارك، نسامح ونتعاون - مجموعة جديدة من آدم ومشمش | Arabic Songs for Kids about sharing", youtubeId: "KDzW70EKvvI", category: "أغاني", duration: "" },
      { id: "آدم-songs", title: "آدم يسافر مع مشمش بالطائرة ✈️", youtubeId: "zwzHeaM9nNc", category: "أغاني", duration: "" },
      { id: "أغاني-kids", title: "أغاني أطفال للطريق 🚗 | آدم ومشمش", youtubeId: "oi5XiSgimIk", category: "أغاني", duration: "" },
      { id: "treasure-mishmish", title: "صندوق الكنز وأغاني وسائل النقل للأطفال - 22 دقيقة 🚗🚂 | آدم ومشمش", youtubeId: "v4dR0HWKcxE", category: "أغاني", duration: "" }
    ]
  },
  {
    id: "saud-sara",
    name: "سعود وسارة",
    color: "#8C5E58",
    avatar: "",
    videos: [
      { id: "التبسط-سعود-وسارة", title: "التبسط والتلطف | الحلقة الأولى | سعود وسارة في رحاب النبوة #سعود_وسارة", youtubeId: "gRh_hzwOaIg", category: "قصص", duration: "" }
    ]
  },
  {
    id: "adnan-quran",
    name: "عدنان - أدعية وأذكار",
    color: "#5B7C99",
    avatar: "",
    videos: [
      { id: "ألوان-العربية", title: "ألوان جنان و عدنان | تلوين الحروف العربية", youtubeId: "bZQ9xEaF8Zc", duration: "" },
      { id: "٢٥-عدنان", title: "٢٥ دعاء سهل الحفظ للأطفال - سلسلة الأدعية والأذكار مع عدنان", youtubeId: "yRydlWbD2dY", duration: "" },
      { id: "أذكار-عدنان", title: "أذكار الصباح والمساء - سلسلة الأدعية والأذكار مع عدنان", youtubeId: "KxNoWofJTZc", duration: "" },
      { id: "دعاء-عدنان", title: "دعاء الدخول والخروج من المنزل - سلسلة الأدعية والأذكار مع عدنان", youtubeId: "G-MFbLtHSqE", duration: "" },
      { id: "دعاء-عدنان2", title: "دعاء الدخول إلى الخلاء - سلسلة الأدعية والأذكار مع عدنان", youtubeId: "-RIbhavaZP8", duration: "" },
      { id: "أذكار-عدنان2", title: "أذكار النوم - سلسلة الأدعية والأذكار مع عدنان", youtubeId: "j-1gQZywECM", duration: "" }
    ]
  },
  {
    id: "dawood-kids",
    name: "قناة داوود للأطفال",
    color: "#7D8C4C",
    avatar: "",
    videos: [
      { id: "سورة-repetition", title: "سورة الفاتحة ٣٠ دقيقة تكرار-أحلى طريقة لحفظ القرآن للأطفال'", youtubeId: "Uufkkk6D2lk", category: "قرآن", duration: "" },
      { id: "سورة-repetition2", title: "سورة الإخلاص ٣٠ دقيقة تكرار-أحلى طريقة لحفظ القرآن للأطفال'", youtubeId: "OquUdWeXbVc", category: "قرآن", duration: "" },
      { id: "سورة-repetition3", title: "سورة الفلق ٣٠ دقيقة تكرار-أحلى طريقة لحفظ القرآن للأطفال'", youtubeId: "kVoDlXwPMqc", category: "قرآن", duration: "" },
      { id: "سورة-repetition4", title: "سورة الناس ٣٠ دقيقة تكرار-أحلى طريقة لحفظ القرآن للأطفال'", youtubeId: "jggjZMf3PNc", category: "قرآن", duration: "" },
      { id: "قصة-fish", title: "قصة السمكة العجيبة قصص نوم - احلى قصص اطفال", youtubeId: "fSN_8GF5iBI", category: "قصص", duration: "" },
      { id: "سورة-al-nas", title: "سورة الناس -تعليم القرآن للأطفال -أحلى قرائة لسورة الناس - قناة داوود", youtubeId: "TyKwwVemYhw", category: "قرآن", duration: "" },
      { id: "سورة-al-nasr", title: "سورة النصر -تعليم القرآن للأطفال -أحلى قرائة لسورة النصر - قناة داوود", youtubeId: "vDGwQD6cZd8", category: "قرآن", duration: "" },
      { id: "سورة-kawthar", title: "سورة الكوثر -تعليم القرآن للأطفال -أحلى قرائة لسورة الكوثر - قناة داوود", youtubeId: "Kz7_R4YtQBw", category: "قرآن", duration: "" },
      { id: "سورة-al-ikhlas", title: "سورة الإخلاص -تعليم القرآن للأطفال -أحلى قرائة لسورة الإخلاص - قناة داوود", youtubeId: "OH74taV8wRE", category: "قرآن", duration: "" },
      { id: "سورة-al-qadr", title: "سورة القدر -تعليم القرآن للأطفال -أحلى قرائة لسورة القدر - قناة داوود", youtubeId: "9PvY3j74xV4", category: "قرآن", duration: "" }
    ]
  },
];

// قائمة الألعاب اللي تظهر بقسم "ألعاب" بالصفحة الرئيسية (دائرة بلون + رمز)
// "memory": بطاقات مقلوبة/تذكّر الأزواج - ألوانها تتناوب بين 4 ألوان كل جولة
// "puzzle": تركيبة (بازل) بصور حقيقية لمعالم مشهورة - تتناوب بين 4 صور كل جولة
const GAMES = [
  { id: "memory", title: "لعبة الذاكرة", emoji: "🧠", color: "#ffe9d1" },
  { id: "puzzle", title: "تركيبة", emoji: "🧩", color: "#375021" }
];
