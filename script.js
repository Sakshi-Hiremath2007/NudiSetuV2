"use strict";

const KEY = {
  lessons: "nudisetu-new-lessons",
  level: "nudisetu-new-highest-level",
  score: "nudisetu-new-quiz-score",
  total: "nudisetu-new-quiz-total",
  passed: "nudisetu-new-passed-levels",
  streak: "nudisetu-new-streak",
  visit: "nudisetu-new-last-visit",
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const categories = [
  {
    id: "greetings",
    title: "Greetings & Introductions",
    icon: "👋",
    desc: "Say hello and introduce yourself.",
    p: [
      ["ನಮಸ್ಕಾರ", "Hello", "Namaskara"],
      ["ನಿಮ್ಮ ಹೆಸರೇನು?", "What is your name?", "Nimma hesarenu?"],
      ["ನನ್ನ ಹೆಸರು…", "My name is…", "Nanna hesaru"],
      ["ನೀವು ಹೇಗಿದ್ದೀರಿ?", "How are you?", "Neevu hegiddiri"],
    ],
  },
  {
    id: "travel",
    title: "Getting Around",
    icon: "🚌",
    desc: "Ask for directions and travel.",
    p: [
      ["ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?", "Where is the bus stop?", "Bus nildana ellide"],
      ["ನೇರವಾಗಿ ಹೋಗಿ", "Go straight", "Neravagi hogi"],
      ["ಎಡಕ್ಕೆ ತಿರುಗಿ", "Turn left", "Edakke tirugi"],
      ["ಇದು ಎಷ್ಟು ದೂರ?", "How far is this?", "Idu eshtu doora"],
    ],
  },
  {
    id: "college",
    title: "College Life",
    icon: "🎓",
    desc: "Useful phrases for campus.",
    p: [
      ["ನಾನು ವಿದ್ಯಾರ್ಥಿ", "I am a student", "Naanu vidyarthi"],
      ["ತರಗತಿ ಎಲ್ಲಿದೆ?", "Where is the classroom?", "Taragati ellide"],
      ["ನನಗೆ ಅರ್ಥವಾಯಿತು", "I understood", "Nanage arthavaayitu"],
      ["ದಯವಿಟ್ಟು ಮತ್ತೆ ಹೇಳಿ", "Please say it again", "Dayavittu matte heli"],
    ],
  },
  {
    id: "shopping",
    title: "Shopping",
    icon: "🛍️",
    desc: "Ask prices and buy items.",
    p: [
      ["ಇದು ಎಷ್ಟು?", "How much is this?", "Idu eshtu"],
      ["ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ", "Please reduce it a little", "Swalpa kadime maadi"],
      ["ಬಿಲ್ ಕೊಡಿ", "Please give the bill", "Bill kodi"],
      ["ನನಗೆ ಇದು ಬೇಕು", "I want this", "Nanage idu beku"],
    ],
  },
  {
    id: "food",
    title: "Food & Dining",
    icon: "🍲",
    desc: "Order food and talk about meals.",
    p: [
      ["ನೀರು ಕೊಡಿ", "Please give me water", "Neeru kodi"],
      ["ಊಟ ಆಯಿತಾ?", "Have you eaten?", "Oota aayita"],
      ["ತುಂಬಾ ರುಚಿಯಾಗಿದೆ", "It is very tasty", "Tumba ruchiyaagide"],
      ["ಮೆನು ತೋರಿಸಿ", "Show me the menu", "Menu torisi"],
    ],
  },
  {
    id: "family",
    title: "Family & Friends",
    icon: "👨‍👩‍👧",
    desc: "Talk about people close to you.",
    p: [
      ["ಇವರು ನನ್ನ ಸ್ನೇಹಿತರು", "These are my friends", "Ivaru nanna snehitaru"],
      ["ನಿಮ್ಮ ಕುಟುಂಬ ಹೇಗಿದೆ?", "How is your family?", "Nimma kutumba hegide"],
      ["ನನ್ನ ಅಮ್ಮ", "My mother", "Nanna amma"],
      ["ನನ್ನ ಗೆಳೆಯ", "My friend", "Nanna geley"],
    ],
  },
  {
    id: "routine",
    title: "Time & Daily Routine",
    icon: "⏰",
    desc: "Talk about time and activities.",
    p: [
      ["ಈಗ ಸಮಯ ಎಷ್ಟು?", "What time is it?", "Eega samaya eshtu"],
      ["ನಾನು ಬೇಗ ಎದ್ದೇಳುತ್ತೇನೆ", "I wake up early", "Naanu bega eddeluttene"],
      ["ನಾಳೆ ಭೇಟಿಯಾಗೋಣ", "Let's meet tomorrow", "Naale bhetiyaagona"],
      ["ಈಗ ಹೊರಡುತ್ತೇನೆ", "I am leaving now", "Eega horaduttene"],
    ],
  },
  {
    id: "help",
    title: "Help & Emergencies",
    icon: "🆘",
    desc: "Ask for help when needed.",
    p: [
      ["ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ", "Please help me", "Dayavittu sahaaya maadi"],
      ["ನನಗೆ ಸಹಾಯ ಬೇಕು", "I need help", "Nanage sahaaya beku"],
      ["ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?", "Where is the hospital?", "Aaspatre ellide"],
      ["ಪೊಲೀಸರನ್ನು ಕರೆಸಿ", "Call the police", "Polis-annu karesi"],
    ],
  },
  {
    id: "places",
    title: "Places & Directions",
    icon: "📍",
    desc: "Find places around you.",
    p: [
      ["ಶೌಚಾಲಯ ಎಲ್ಲಿದೆ?", "Where is the restroom?", "Shauchalaya ellide"],
      ["ಹತ್ತಿರದಲ್ಲಿದೆಯೇ?", "Is it nearby?", "Hattiradallideye"],
      ["ಬಲಕ್ಕೆ ತಿರುಗಿ", "Turn right", "Balakke tirugi"],
      ["ನನಗೆ ದಾರಿ ತೋರಿಸಿ", "Show me the way", "Nanage daari torisi"],
    ],
  },
  {
    id: "feelings",
    title: "Feelings & Health",
    icon: "💚",
    desc: "Describe how you feel.",
    p: [
      ["ನನಗೆ ಹಸಿವಾಗಿದೆ", "I am hungry", "Nanage hasivaagide"],
      ["ನನಗೆ ಬಾಯಾರಿಕೆಯಾಗಿದೆ", "I am thirsty", "Nanage baayaarikeyagide"],
      ["ನನಗೆ ಚೆನ್ನಾಗಿದೆ", "I feel good", "Nanage chennagide"],
      ["ನನಗೆ ವಿಶ್ರಾಂತಿ ಬೇಕು", "I need rest", "Nanage vishraanti beku"],
    ],
  },
  {
    id: "weather",
    title: "Weather & Nature",
    icon: "🌦️",
    desc: "Talk about the weather.",
    p: [
      ["ಇಂದು ಬಿಸಿಲಿದೆ", "It is sunny today", "Indu bisilide"],
      ["ಮಳೆ ಬರುತ್ತಿದೆ", "It is raining", "Male baruttide"],
      ["ಹವಾಮಾನ ಚೆನ್ನಾಗಿದೆ", "The weather is nice", "Havaamaana chennagide"],
      ["ತುಂಬಾ ಚಳಿಯಾಗಿದೆ", "It is very cold", "Tumba chaliyaagide"],
    ],
  },
  {
    id: "polite",
    title: "Polite Expressions",
    icon: "🙏",
    desc: "Use kind, respectful phrases.",
    p: [
      ["ಧನ್ಯವಾದಗಳು", "Thank you", "Dhanyavaadagalu"],
      ["ದಯವಿಟ್ಟು", "Please", "Dayavittu"],
      ["ಕ್ಷಮಿಸಿ", "Excuse me / Sorry", "Kshamisi"],
      ["ಪರವಾಗಿಲ್ಲ", "It's okay", "Paravaagilla"],
    ],
  },
];

const quizzes = {
  1: [
    [
      'Which Kannada word means "Hello"?',
      ["ಧನ್ಯವಾದಗಳು", "ನಮಸ್ಕಾರ", "ನೀರು", "ಕ್ಷಮಿಸಿ"],
      1,
      '"ನಮಸ್ಕಾರ" means Hello.',
    ],
    [
      'Which Kannada word means "Water"?',
      ["ಹಾಲು", "ಊಟ", "ನೀರು", "ಮನೆ"],
      2,
      '"ನೀರು" means Water.',
    ],
    [
      'How do you say "Thank you" in Kannada?',
      ["ಬನ್ನಿ", "ಹೋಗಿ", "ನಮಸ್ಕಾರ", "ಧನ್ಯವಾದಗಳು"],
      3,
      '"ಧನ್ಯವಾದಗಳು" means Thank you.',
    ],
    [
      'Which phrase asks "How much is this?"',
      ["ಇದು ಎಷ್ಟು?", "ನಿಮ್ಮ ಹೆಸರೇನು?", "ನೀರು ಕೊಡಿ", "ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ"],
      0,
      '"ಇದು ಎಷ್ಟು?" is useful while shopping.',
    ],
    [
      "How do you politely ask for water?",
      ["ನಾನು ವಿದ್ಯಾರ್ಥಿ", "ನೀರು ಕೊಡಿ", "ನಮಸ್ಕಾರ", "ಎಲ್ಲಿ ಹೋಗುತ್ತೀರಿ?"],
      1,
      '"ನೀರು ಕೊಡಿ" means Please give me water.',
    ],
  ],
  2: [
    [
      'Which sentence means "I am going to college"?',
      [
        "ನಾನು ನಿನ್ನೆ ಕಾಲೇಜಿಗೆ ಹೋದೆ",
        "ನಾನು ಕಾಲೇಜಿಗೆ ಹೋಗುತ್ತಿದ್ದೇನೆ",
        "ನಾನು ಮನೆಯಲ್ಲಿ ಓದುತ್ತೇನೆ",
        "ನಾನು ಕಾಲೇಜಿನಿಂದ ಬರುತ್ತೇನೆ",
      ],
      1,
      '"ನಾನು ಕಾಲೇಜಿಗೆ ಹೋಗುತ್ತಿದ್ದೇನೆ" means I am going to college.',
    ],
    [
      'Which phrase means "Do you know Kannada?"',
      [
        "ನಿಮಗೆ ಕನ್ನಡ ಬರುತ್ತದೆಯೇ?",
        "ನೀವು ಎಲ್ಲಿದ್ದೀರಿ?",
        "ನೀವು ಮನೆಗೆ ಹೋಗುತ್ತೀರಾ?",
        "ನಿಮ್ಮ ಹೆಸರೇನು?",
      ],
      0,
      '"ನಿಮಗೆ ಕನ್ನಡ ಬರುತ್ತದೆಯೇ?" means Do you know Kannada?',
    ],
    [
      'Which sentence means "I am hungry"?',
      [
        "ನನಗೆ ಬಾಯಾರಿಕೆಯಾಗಿದೆ",
        "ನನಗೆ ನಿದ್ದೆ ಬರುತ್ತಿದೆ",
        "ನನಗೆ ಹಸಿವಾಗಿದೆ",
        "ನನಗೆ ಸಂತೋಷವಾಗಿದೆ",
      ],
      2,
      '"ನನಗೆ ಹಸಿವಾಗಿದೆ" means I am hungry.',
    ],
    [
      "How do you ask a shopkeeper to lower the price?",
      [
        "ದಯವಿಟ್ಟು ಇದನ್ನು ಪ್ಯಾಕ್ ಮಾಡಿ",
        "ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ",
        "ಬೇರೆ ವಸ್ತು ತೋರಿಸಿ",
        "ಬಿಲ್ ಕೊಡಿ",
      ],
      1,
      '"ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ" means Please reduce it a little.',
    ],
    [
      'Which sentence means "I will come tomorrow"?',
      [
        "ನಾನು ನಿನ್ನೆ ಬಂದೆ",
        "ನಾನು ಈಗ ಹೊರಡುತ್ತೇನೆ",
        "ನಾನು ನಾಳೆ ಬರುತ್ತೇನೆ",
        "ನಾನು ಪ್ರತಿದಿನ ಬರುತ್ತೇನೆ",
      ],
      2,
      '"ನಾನು ನಾಳೆ ಬರುತ್ತೇನೆ" means I will come tomorrow.',
    ],
  ],
  3: [
    [
      'Which sentence means "I understood"?',
      [
        "ನಾನು ಅರ್ಥಮಾಡಿಕೊಂಡೆ",
        "ನಾನು ಬರುತ್ತಿದ್ದೇನೆ",
        "ನನಗೆ ಹಸಿವಾಗಿದೆ",
        "ನಾನು ಮಲಗುತ್ತಿದ್ದೇನೆ",
      ],
      0,
      '"ನಾನು ಅರ್ಥಮಾಡಿಕೊಂಡೆ" means I understood.',
    ],
    [
      "How do you ask where someone is going?",
      [
        "ನಿಮ್ಮ ಹೆಸರೇನು?",
        "ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತಿದ್ದೀರಿ?",
        "ನೀವು ಹೇಗಿದ್ದೀರಿ?",
        "ನೀವು ಏನು ಮಾಡುತ್ತಿದ್ದೀರಿ?",
      ],
      1,
      '"ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತಿದ್ದೀರಿ?" means Where are you going?',
    ],
    [
      'Which sentence means "Please speak slowly"?',
      [
        "ಸ್ವಲ್ಪ ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ",
        "ನಾಳೆ ಬನ್ನಿ",
        "ದಯವಿಟ್ಟು ಕುಳಿತುಕೊಳ್ಳಿ",
        "ಅದನ್ನು ಬರೆಯಿರಿ",
      ],
      0,
      '"ಸ್ವಲ್ಪ ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ" asks someone to speak slowly.',
    ],
    [
      'Which sentence means "I am trying"?',
      [
        "ನಾನು ಕಾಯುತ್ತಿದ್ದೇನೆ",
        "ನಾನು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದೇನೆ",
        "ನಾನು ಹೊರಡುತ್ತಿದ್ದೇನೆ",
        "ನಾನು ಕೇಳುತ್ತಿದ್ದೇನೆ",
      ],
      1,
      '"ನಾನು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದೇನೆ" means I am trying.',
    ],
    [
      'Which sentence means "I am waiting"?',
      [
        "ನಾನು ಕಾಯುತ್ತಿದ್ದೇನೆ",
        "ನಾನು ಮಲಗುತ್ತಿದ್ದೇನೆ",
        "ನಾನು ಓಡುತ್ತಿದ್ದೇನೆ",
        "ನಾನು ನಗುತ್ತಿದ್ದೇನೆ",
      ],
      0,
      '"ನಾನು ಕಾಯುತ್ತಿದ್ದೇನೆ" means I am waiting.',
    ],
  ],
  4: [
    [
      'Which sentence means "I remember what you said"?',
      [
        "ನೀವು ಹೇಳಿದ್ದನ್ನು ನಾನು ಮರೆತಿದ್ದೇನೆ",
        "ನೀವು ಹೇಳಿದ ಮಾತು ನನಗೆ ನೆನಪಿದೆ",
        "ನನಗೆ ನಿಮ್ಮ ಮಾತು ಅರ್ಥವಾಗಲಿಲ್ಲ",
        "ನಾನು ನಿಮಗೆ ನಂತರ ಹೇಳುತ್ತೇನೆ",
      ],
      1,
      '"ನೀವು ಹೇಳಿದ ಮಾತು ನನಗೆ ನೆನಪಿದೆ" means I remember what you said.',
    ],
    [
      'Which sentence means "Although it was raining, we went outside"?',
      [
        "ಮಳೆ ಬರುತ್ತಿದ್ದರೂ, ನಾವು ಹೊರಗೆ ಹೋದೆವು",
        "ಮಳೆ ಬಂದಾಗ, ನಾವು ಮಲಗಿದೆವು",
        "ನಾವು ಹೊರಗೆ ಹೋಗುವುದಿಲ್ಲ",
        "ನಾಳೆ ಮಳೆ ಬರುತ್ತದೆ",
      ],
      0,
      "This sentence expresses going outside despite rain.",
    ],
    [
      'Which sentence means "If she had come, we could have met"?',
      [
        "ಅವಳು ಈಗ ಬರುತ್ತಿದ್ದಾಳೆ",
        "ನಾವು ಅವಳನ್ನು ನಿನ್ನೆ ಭೇಟಿಯಾದೆವು",
        "ಅವಳು ಬಂದಿದ್ದರೆ ನಾವು ಭೇಟಿಯಾಗಬಹುದಿತ್ತು",
        "ಅವಳು ನಮ್ಮನ್ನು ಭೇಟಿಯಾಗಲು ಬಯಸುವುದಿಲ್ಲ",
      ],
      2,
      "This sentence describes a hypothetical past situation.",
    ],
    [
      'Which sentence means "We should decide according to the situation"?',
      [
        "ನಾವು ಯಾವುದೇ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳಬಾರದು",
        "ನಾವು ಪರಿಸ್ಥಿತಿಗೆ ಅನುಗುಣವಾಗಿ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳಬೇಕು",
        "ನಾವು ಪರಿಸ್ಥಿತಿಯನ್ನು ತಕ್ಷಣ ಬದಲಾಯಿಸಬೇಕು",
        "ನಾವು ಎಲ್ಲರನ್ನೂ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳಲು ಕೇಳಬೇಕು",
      ],
      1,
      "This means deciding according to the situation.",
    ],
    [
      'Which sentence means "He completed the work on time"?',
      [
        "ಅವನು ಕೆಲಸವನ್ನು ತಡವಾಗಿ ಪ್ರಾರಂಭಿಸಿದನು",
        "ಅವನು ತನ್ನ ಕೆಲಸವನ್ನು ಮರೆತನು",
        "ಅವನು ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಕೆಲಸ ಮುಗಿಸಿದನು",
        "ಅವನು ಕೆಲಸವನ್ನು ಮುಂದೂಡಿದನು",
      ],
      2,
      "This means he completed the work on time.",
    ],
  ],
};

const vowels = [
  ["ಅ", "a"],
  ["ಆ", "aa"],
  ["ಇ", "i"],
  ["ಈ", "ee"],
  ["ಉ", "u"],
  ["ಊ", "oo"],
  ["ಋ", "ru"],
  ["ಎ", "e"],
  ["ಏ", "ē"],
  ["ಐ", "ai"],
  ["ಒ", "o"],
  ["ಓ", "ō"],
  ["ಔ", "au"],
  ["ಅಂ", "am"],
  ["ಅಃ", "aha"],
];

const consonants = [
  ["ಕ", "ka"],
  ["ಖ", "kha"],
  ["ಗ", "ga"],
  ["ಘ", "gha"],
  ["ಙ", "nga"],
  ["ಚ", "cha"],
  ["ಛ", "chha"],
  ["ಜ", "ja"],
  ["ಝ", "jha"],
  ["ಞ", "nya"],
  ["ಟ", "ṭa"],
  ["ಠ", "ṭha"],
  ["ಡ", "ḍa"],
  ["ಢ", "ḍha"],
  ["ಣ", "ṇa"],
  ["ತ", "ta"],
  ["ಥ", "tha"],
  ["ದ", "da"],
  ["ಧ", "dha"],
  ["ನ", "na"],
  ["ಪ", "pa"],
  ["ಫ", "pha"],
  ["ಬ", "ba"],
  ["ಭ", "bha"],
  ["ಮ", "ma"],
  ["ಯ", "ya"],
  ["ರ", "ra"],
  ["ಲ", "la"],
  ["ವ", "va"],
  ["ಶ", "sha"],
  ["ಷ", "ṣha"],
  ["ಸ", "sa"],
  ["ಹ", "ha"],
  ["ಳ", "ḷa"],
];

const numbers = [
  ["೦", "Zero", "ಶೂನ್ಯ"],
  ["೧", "One", "ಒಂದು"],
  ["೨", "Two", "ಎರಡು"],
  ["೩", "Three", "ಮೂರು"],
  ["೪", "Four", "ನಾಲ್ಕು"],
  ["೫", "Five", "ಐದು"],
  ["೬", "Six", "ಆರು"],
  ["೭", "Seven", "ಏಳು"],
  ["೮", "Eight", "ಎಂಟು"],
  ["೯", "Nine", "ಒಂಬತ್ತು"],
  ["೧೦", "Ten", "ಹತ್ತು"],
];
const speakingPhrases = [
  ["ನಮಸ್ಕಾರ", "Hello", "Namaskara"],
  ["ಧನ್ಯವಾದಗಳು", "Thank you", "Dhanyavaadagalu"],
  [
    "ನಿಮಗೆ ಕನ್ನಡ ಬರುತ್ತದೆಯೇ?",
    "Do you know Kannada?",
    "Nimage Kannada baruttadeye",
  ],
  ["ನೀರು ಕೊಡಿ", "Please give me water", "Neeru kodi"],
  ["ಇದು ಎಷ್ಟು?", "How much is this?", "Idu eshtu"],
  ["ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ", "Please help me", "Dayavittu sahaaya maadi"],
];
const words = [
  ["ಧನ್ಯವಾದಗಳು", "Thank you", "Dhanyavaadagalu"],
  ["ನೀರು", "Water", "Neeru"],
  ["ಮನೆ", "House", "Mane"],
  ["ಸ್ನೇಹಿತ", "Friend", "Snehita"],
  ["ಪುಸ್ತಕ", "Book", "Pustaka"],
  ["ಚೆನ್ನಾಗಿದೆ", "Good / Nice", "Chennagide"],
  ["ಬನ್ನಿ", "Come", "Banni"],
];

let currentCategory = null;
let currentLevel = 1;
let questionIndex = 0;
let score = 0;
let answered = false;
let speakingIndex = 0;
let wordIndex = 0;
let toastTimer;

function readJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}
function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2300);
}
function say(text) {
  if (!("speechSynthesis" in window)) {
    toast("Speech playback is not supported by this browser.");
    return;
  }
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = speechSynthesis
    .getVoices()
    .find((v) => v.lang && v.lang.toLowerCase().startsWith("kn"));
  utterance.lang = voice ? voice.lang : "kn-IN";
  utterance.rate = 0.82;
  if (voice) utterance.voice = voice;
  speechSynthesis.speak(utterance);
}
function getCompleted() {
  const list = readJSON(KEY.lessons, []);
  return Array.isArray(list)
    ? list.filter((id) => categories.some((c) => c.id === id))
    : [];
}

function renderBasics() {
  $("#vowels").innerHTML = vowels
    .map(
      ([kannada, english]) =>
        `<button type="button" class="basic-letter" data-speak="${kannada}">
          <strong>${kannada}</strong>
          <small>${english}</small>
        </button>`,
    )
    .join("");

  $("#consonants").innerHTML = consonants
    .map(
      ([kannada, english]) =>
        `<button type="button" class="basic-letter" data-speak="${kannada}">
          <strong>${kannada}</strong>
          <small>${english}</small>
        </button>`,
    )
    .join("");

  $("#numbers").innerHTML = numbers
    .map(
      ([number, english, kannadaWord]) =>
        `<button type="button" class="basic-letter" data-speak="${kannadaWord}">
          <strong>${number}</strong>
          <small>${english}</small>
          <small class="kannada-word">${kannadaWord}</small>
        </button>`,
    )
    .join("");
}

function renderCategories() {
  $("#category-grid").innerHTML = categories
    .map(
      (c) => `
    <button class="category" type="button" data-category="${c.id}">
      <span class="cat-icon">${c.icon}</span><b>${c.title}</b><p>${c.desc}</p>
      <small>${getCompleted().includes(c.id) ? "✓ Explored" : "Explore lesson →"}</small>
    </button>`,
    )
    .join("");
}
function openLesson(id) {
  currentCategory = categories.find((c) => c.id === id);
  if (!currentCategory) return;
  $("#lesson-title").textContent = currentCategory.title;
  $("#lesson-description").textContent = currentCategory.desc;
  $("#lesson-phrases").innerHTML = currentCategory.p
    .map(
      ([kn, en, tr]) => `
    <div class="phrase"><div><strong lang="kn">${kn}</strong><small>${en} · ${tr}</small></div>
    <button type="button" data-speak="${kn}" aria-label="Listen to ${en}">🔊</button></div>`,
    )
    .join("");
  $("#lesson-panel").hidden = false;
  $("#lesson-panel").scrollIntoView({ behavior: "smooth", block: "start" });
}
function updateDashboard() {
  const count = getCompleted().length;
  $("#learning-progress").textContent = `${count} of 12`;
  $("#progress-label").textContent =
    `${Math.round((count / 12) * 100)}% complete`;
  $("#progress-fill").style.width = `${(count / 12) * 100}%`;
  renderCategories();
  const scoreSaved = localStorage.getItem(KEY.score);
  const totalSaved = localStorage.getItem(KEY.total);
  $("#quiz-score").textContent =
    scoreSaved !== null && totalSaved !== null
      ? `${scoreSaved}/${totalSaved}`
      : "Not attempted";
  updateStreak();
}
function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const last = localStorage.getItem(KEY.visit);
  let count = Number(localStorage.getItem(KEY.streak) || 0);
  if (last !== today) {
    count =
      last && Math.round((new Date(today) - new Date(last)) / 86400000) === 1
        ? count + 1
        : 1;
    localStorage.setItem(KEY.streak, String(count));
    localStorage.setItem(KEY.visit, today);
  }
  $("#streak").textContent = `${count} ${count === 1 ? "day" : "days"}`;
}
function updateBadges() {
  const count = getCompleted().length;
  const passed = readJSON(KEY.passed, []);
  const states = {
    first: count >= 1,
    five: count >= 5,
    all: count >= 12,
    quiz: Array.isArray(passed) && passed.length > 0,
  };
  Object.entries(states).forEach(([name, earned]) => {
    const badge = $(`[data-badge="${name}"]`);
    badge.classList.toggle("earned", earned);
    badge.querySelector("em").textContent = earned ? "✓ Earned" : "Locked";
  });
  $("#badge-count").textContent = Object.values(states).filter(Boolean).length;
}
function highestLevel() {
  const value = Number(localStorage.getItem(KEY.level) || 1);
  return Math.max(1, Math.min(4, Number.isFinite(value) ? value : 1));
}
function renderLevels() {
  const highest = highestLevel();
  for (let n = 1; n <= 4; n++) {
    const card = $(`#level-card-${n}`);
    const button = card.querySelector("button");
    const unlocked = n <= highest;
    card.classList.toggle("locked", !unlocked);
    button.disabled = !unlocked;
    button.textContent = unlocked ? "Start Quiz →" : "Locked";
    card.querySelector(".level-status").textContent = unlocked
      ? n === 1
        ? "🔓 Available now"
        : "🔓 Level unlocked!"
      : `🔒 Solve Level ${n - 1} to unlock`;
  }
}
function startQuiz(level) {
  if (level > highestLevel()) {
    toast("Pass the previous level to unlock this quiz.");
    return;
  }
  currentLevel = level;
  questionIndex = 0;
  score = 0;
  answered = false;
  $("#quiz-box").hidden = false;
  $("#quiz-level-label").textContent =
    `LEVEL ${level} · ${["", "BEGINNER", "ELEMENTARY", "INTERMEDIATE", "ADVANCED"][level]}`;
  renderQuestion();
  $("#quiz-box").scrollIntoView({ behavior: "smooth", block: "start" });
}
function renderQuestion() {
  const question = quizzes[currentLevel][questionIndex];
  answered = false;
  $("#quiz-progress").textContent =
    `QUESTION ${questionIndex + 1} OF ${quizzes[currentLevel].length}`;
  $("#question-fill").style.width =
    `${((questionIndex + 1) / quizzes[currentLevel].length) * 100}%`;
  $("#quiz-question").textContent = question[0];
  $("#quiz-feedback").textContent = "";
  $("#next-question").hidden = true;
  $("#next-question").textContent = "Next Question →";
  $("#quiz-options").innerHTML = question[1]
    .map(
      (option, index) => `
    <button class="option" type="button" data-option="${index}">
      <span class="option-letter">${String.fromCharCode(65 + index)}</span><span lang="kn">${option}</span>
    </button>`,
    )
    .join("");
}
function answerQuestion(index) {
  if (answered) return;
  answered = true;
  const question = quizzes[currentLevel][questionIndex];
  const buttons = $$(".option");
  buttons.forEach((button) => (button.disabled = true));
  if (index === question[2]) {
    score++;
    buttons[index].classList.add("correct");
    $("#quiz-feedback").textContent = `Correct! 🎉 ${question[3]}`;
  } else {
    buttons[index].classList.add("incorrect");
    buttons[question[2]].classList.add("correct");
    $("#quiz-feedback").textContent =
      `Not quite. Correct answer: ${question[1][question[2]]}. ${question[3]}`;
  }
  $("#next-question").hidden = false;
  $("#next-question").textContent =
    questionIndex === quizzes[currentLevel].length - 1
      ? "See My Score →"
      : "Next Question →";
}
function showResults() {
  const total = quizzes[currentLevel].length;
  const passed = score >= 3;
  localStorage.setItem(KEY.score, String(score));
  localStorage.setItem(KEY.total, String(total));
  if (passed) {
    const passedLevels = readJSON(KEY.passed, []);
    if (!passedLevels.includes(currentLevel)) passedLevels.push(currentLevel);
    localStorage.setItem(KEY.passed, JSON.stringify(passedLevels));
    if (currentLevel < 4) {
      localStorage.setItem(
        KEY.level,
        String(Math.max(highestLevel(), currentLevel + 1)),
      );
    }
  }
  $("#quiz-progress").textContent = "QUIZ COMPLETED";
  $("#question-fill").style.width = "100%";
  $("#quiz-question").textContent = passed
    ? "Well done! You passed! 🎉"
    : "Keep practising — you can do it!";
  $("#quiz-options").replaceChildren();
  $("#quiz-feedback").textContent =
    `Your score: ${score} out of ${total}. ` +
    (passed
      ? currentLevel < 4
        ? `Level ${currentLevel + 1} is now unlocked!`
        : "You completed all four levels!"
      : "You need at least 3 correct answers to unlock the next level. Try again!");
  $("#next-question").textContent = "Try Again ↻";
  $("#next-question").hidden = false;
  renderLevels();
  updateDashboard();
  updateBadges();
  if (passed)
    toast(
      currentLevel < 4
        ? `Level ${currentLevel + 1} unlocked!`
        : "All four levels completed! 🏆",
    );
}
function nextQuestion() {
  if ($("#quiz-progress").textContent === "QUIZ COMPLETED") {
    startQuiz(currentLevel);
    return;
  }
  if (!answered) return;
  if (questionIndex < quizzes[currentLevel].length - 1) {
    questionIndex++;
    renderQuestion();
  } else {
    showResults();
  }
}
function renderSpeaking() {
  const phrase = speakingPhrases[speakingIndex];
  $("#speak-kannada").textContent = phrase[0];
  $("#speak-english").textContent = phrase[1];
  $("#speak-transliteration").textContent = phrase[2];
}
function renderWord() {
  const word = words[wordIndex % words.length];
  $("#word-kannada").textContent = word[0];
  $("#word-english").textContent = word[1];
  $("#word-transliteration").textContent = word[2];
}
function resetProgress() {
  if (
    !confirm(
      "Reset lesson progress, quiz unlocks, scores and badges on this device?",
    )
  )
    return;
  [KEY.lessons, KEY.score, KEY.total, KEY.passed].forEach((key) =>
    localStorage.removeItem(key),
  );
  localStorage.setItem(KEY.level, "1");
  renderLevels();
  updateDashboard();
  updateBadges();
  $("#lesson-panel").hidden = true;
  $("#quiz-box").hidden = true;
  toast("Progress reset. Level 1 is ready!");
}

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = $("#menu-toggle");
  const menu = $("#site-menu");
  menuToggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuToggle.textContent = open ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    }),
  );

  renderBasics();
  renderCategories();
  renderLevels();
  updateDashboard();
  updateBadges();
  renderSpeaking();
  renderWord();

  document.addEventListener("click", (event) => {
    const speechButton = event.target.closest("[data-speak]");
    if (speechButton) say(speechButton.dataset.speak);
    const categoryButton = event.target.closest("[data-category]");
    if (categoryButton) openLesson(categoryButton.dataset.category);
    const optionButton = event.target.closest("[data-option]");
    if (optionButton) answerQuestion(Number(optionButton.dataset.option));
  });

  $("#close-lesson").addEventListener(
    "click",
    () => ($("#lesson-panel").hidden = true),
  );
  $("#complete-lesson").addEventListener("click", () => {
    if (!currentCategory) return;
    const list = getCompleted();
    if (!list.includes(currentCategory.id)) {
      list.push(currentCategory.id);
      localStorage.setItem(KEY.lessons, JSON.stringify(list));
      toast("Lesson explored! Progress saved.");
    } else {
      toast("You've already explored this lesson.");
    }
    updateDashboard();
    updateBadges();
  });

  $$(".start-level").forEach((button) =>
    button.addEventListener("click", () =>
      startQuiz(Number(button.dataset.level)),
    ),
  );
  $("#next-question").addEventListener("click", nextQuestion);
  $("#exit-quiz").addEventListener(
    "click",
    () => ($("#quiz-box").hidden = true),
  );

  $("#previous-phrase").addEventListener("click", () => {
    speakingIndex =
      (speakingIndex - 1 + speakingPhrases.length) % speakingPhrases.length;
    renderSpeaking();
  });
  $("#next-phrase").addEventListener("click", () => {
    speakingIndex = (speakingIndex + 1) % speakingPhrases.length;
    renderSpeaking();
  });
  $("#listen-phrase").addEventListener("click", () =>
    say(speakingPhrases[speakingIndex][0]),
  );
  $("#new-word").addEventListener("click", () => {
    wordIndex = (wordIndex + 1) % words.length;
    renderWord();
  });
  $("#reset-progress").addEventListener("click", resetProgress);
});

/* ===== NudiSetu AI Chatbot Logic ===== */

document.addEventListener("DOMContentLoaded", () => {
  const chatToggle = document.querySelector("#chat-toggle");
  const chatWidget = document.querySelector("#chat-widget");
  const chatClose = document.querySelector("#chat-close");
  const chatForm = document.querySelector("#chat-form");
  const chatInput = document.querySelector("#chat-input");
  const chatMessages = document.querySelector("#chat-messages");
  const chatSend = document.querySelector("#chat-send");

  if (
    !chatToggle ||
    !chatWidget ||
    !chatClose ||
    !chatForm ||
    !chatInput ||
    !chatMessages ||
    !chatSend
  ) {
    console.error("NudiSetu chat HTML elements were not found.");
    return;
  }

  chatToggle.addEventListener("click", () => {
    chatWidget.hidden = !chatWidget.hidden;

    if (!chatWidget.hidden) {
      chatInput.focus();
    }
  });

  chatClose.addEventListener("click", () => {
    chatWidget.hidden = true;
  });

  function addMessage(text, sender) {
    const message = document.createElement("div");
    message.className =
      sender === "user"
        ? "chat-message user-message"
        : "chat-message bot-message";

    // Use textContent so replies are displayed safely as text.
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return message;
  }

  chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = chatInput.value.trim();
    if (!message || chatSend.disabled) return;

    addMessage(message, "user");
    chatInput.value = "";
    chatSend.disabled = true;

    const waitingMessage = addMessage("Thinking… 🌿", "bot");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "The assistant could not reply.");
      }

      waitingMessage.textContent =
        data.reply || "Sorry, I couldn't generate a reply. Try again.";
    } catch (error) {
      waitingMessage.textContent =
        "Sorry, I couldn't connect to the AI assistant. Please check that the NudiSetu server is running and try again.";

      console.error("NudiSetu chat error:", error);
    } finally {
      chatSend.disabled = false;
      chatInput.focus();
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });
});
