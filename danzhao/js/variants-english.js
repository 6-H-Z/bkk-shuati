window.DZ_VARIANTS = window.DZ_VARIANTS || {};
/* 英语变式题模板（english-var 写）：11 个模板，覆盖 8 个考点。
   每个模板随机换主语/动词/名词/时间状语，正确答案唯一，3 个干扰项都是学生常见的错误形式。
   接口见 02_考试/单招2027/_变式规范.md */

/* 返回 3 个与正确答案不同、且互不重复的干扰项 */
function EV_three(correct, list) {
  var out = [], i, s;
  for (i = 0; i < list.length; i++) {
    s = String(list[i]);
    if (s !== String(correct) && out.indexOf(s) === -1) out.push(s);
  }
  return out.slice(0, 3);
}
/* 首字母大写 */
function EV_cap(s) {
  s = String(s);
  return s.charAt(0).toUpperCase() + s.slice(1);
}
/* 按难度取模板池：lv <= level 的词条可用；池子为空时退回全表 */
function EV_pool(list, level) {
  var out = [], i;
  for (i = 0; i < list.length; i++) {
    if (list[i].lv <= level) out.push(list[i]);
  }
  return out.length ? out : list;
}
/* 把不规范动词写成「加 -ed」的错形，作干扰项 */
function EV_regPast(b) {
  return /e$/.test(b) ? b + "d" : b + "ed";
}

/* ===================== 一、一般现在时第三人称单数 ===================== */
var EV_T1_SUBJ = ["He", "She", "My father", "My mother", "Tom", "Lucy", "My brother",
  "My sister", "The boy", "The girl", "Jack", "Anna", "Our teacher", "His friend"];
var EV_T1_ADV = ["every day", "every morning", "every evening", "every week",
  "after school", "on Sundays", "on weekdays", "each morning"];
var EV_T1_VERBS = [
  { b: "play", ok: "plays", bad: "playes", ing: "playing", kind: "reg", lv: 1, tail: "football" },
  { b: "read", ok: "reads", bad: "reades", ing: "reading", kind: "reg", lv: 1, tail: "books" },
  { b: "walk", ok: "walks", bad: "walkes", ing: "walking", kind: "reg", lv: 1, tail: "to school" },
  { b: "open", ok: "opens", bad: "openes", ing: "opening", kind: "reg", lv: 1, tail: "the window" },
  { b: "work", ok: "works", bad: "workes", ing: "working", kind: "reg", lv: 1, tail: "hard" },
  { b: "eat", ok: "eats", bad: "eates", ing: "eating", kind: "reg", lv: 1, tail: "fruit" },
  { b: "get", ok: "gets", bad: "getes", ing: "getting", kind: "reg", lv: 1, tail: "up early" },
  { b: "wait", ok: "waits", bad: "waites", ing: "waiting", kind: "reg", lv: 1, tail: "for the bus" },
  { b: "clean", ok: "cleans", bad: "cleanes", ing: "cleaning", kind: "reg", lv: 1, tail: "the room" },
  { b: "swim", ok: "swims", bad: "swimes", ing: "swimming", kind: "reg", lv: 1, tail: "in the river" },
  { b: "cook", ok: "cooks", bad: "cookes", ing: "cooking", kind: "reg", lv: 1, tail: "dinner" },
  { b: "draw", ok: "draws", bad: "drawes", ing: "drawing", kind: "reg", lv: 1, tail: "pictures" },
  { b: "watch", ok: "watches", bad: "watchs", ing: "watching", kind: "es", lv: 2, tail: "TV" },
  { b: "wash", ok: "washes", bad: "washs", ing: "washing", kind: "es", lv: 2, tail: "the clothes" },
  { b: "finish", ok: "finishes", bad: "finishs", ing: "finishing", kind: "es", lv: 2, tail: "the work" },
  { b: "teach", ok: "teaches", bad: "teachs", ing: "teaching", kind: "es", lv: 2, tail: "English" },
  { b: "pass", ok: "passes", bad: "passs", ing: "passing", kind: "es", lv: 2, tail: "the ball" },
  { b: "fix", ok: "fixes", bad: "fixs", ing: "fixing", kind: "es", lv: 2, tail: "the bike" },
  { b: "study", ok: "studies", bad: "studys", ing: "studying", kind: "y", lv: 2, tail: "English" },
  { b: "carry", ok: "carries", bad: "carrys", ing: "carrying", kind: "y", lv: 2, tail: "water" },
  { b: "fly", ok: "flies", bad: "flys", ing: "flying", kind: "y", lv: 2, tail: "kites" },
  { b: "go", ok: "goes", bad: "gos", ing: "going", kind: "o", lv: 2, tail: "to school" },
  { b: "do", ok: "does", bad: "dos", ing: "doing", kind: "o", lv: 2, tail: "the housework" },
  { b: "have", ok: "has", bad: "haves", ing: "having", kind: "have", lv: 3, tail: "lunch" }
];
var EV_T1_NOTE = {
  reg: "是规则动词，直接加 -s",
  es: "以 s/x/ch/sh 结尾，要加 -es",
  y: "以「辅音字母+y」结尾，变 y 为 i 再加 -es",
  o: "以 o 结尾，要加 -es",
  have: "的第三人称单数是不规则的 has"
};

/* ===================== 二、一般过去时（规则 + 不规则） ===================== */
var EV_T2_SUBJ = ["He", "She", "Tom", "Lucy", "My father", "My mother", "My brother",
  "We", "They", "The children", "I", "You", "Jack", "Anna", "Our class", "My friends"];
var EV_T2_TIME = ["yesterday", "last week", "last Sunday", "two days ago", "last night",
  "last year", "yesterday morning", "last month", "three years ago", "last weekend",
  "the day before yesterday"];
var EV_T2_VERBS = [
  { b: "play", p: "played", ing: "playing", kind: "reg", lv: 1, tail: "football" },
  { b: "watch", p: "watched", ing: "watching", kind: "reg", lv: 1, tail: "TV" },
  { b: "finish", p: "finished", ing: "finishing", kind: "reg", lv: 1, tail: "the work" },
  { b: "help", p: "helped", ing: "helping", kind: "reg", lv: 1, tail: "others" },
  { b: "clean", p: "cleaned", ing: "cleaning", kind: "reg", lv: 1, tail: "the room" },
  { b: "talk", p: "talked", ing: "talking", kind: "reg", lv: 1, tail: "with friends" },
  { b: "call", p: "called", ing: "calling", kind: "reg", lv: 1, tail: "the doctor" },
  { b: "visit", p: "visited", ing: "visiting", kind: "reg", lv: 1, tail: "the museum" },
  { b: "study", p: "studied", ing: "studying", kind: "y", lv: 1, tail: "English" },
  { b: "walk", p: "walked", ing: "walking", kind: "reg", lv: 1, tail: "to school" },
  { b: "stop", p: "stopped", ing: "stopping", kind: "double", lv: 1, tail: "the car" },
  { b: "plan", p: "planned", ing: "planning", kind: "double", lv: 1, tail: "a trip" },
  { b: "go", p: "went", ing: "going", kind: "irr", lv: 2, tail: "to school" },
  { b: "have", p: "had", ing: "having", kind: "irr", lv: 2, tail: "lunch" },
  { b: "do", p: "did", ing: "doing", kind: "irr", lv: 2, tail: "the housework" },
  { b: "see", p: "saw", ing: "seeing", kind: "irr", lv: 2, tail: "a film" },
  { b: "eat", p: "ate", ing: "eating", kind: "irr", lv: 2, tail: "fruit" },
  { b: "buy", p: "bought", ing: "buying", kind: "irr", lv: 2, tail: "a book" },
  { b: "take", p: "took", ing: "taking", kind: "irr", lv: 2, tail: "a photo" },
  { b: "come", p: "came", ing: "coming", kind: "irr", lv: 2, tail: "back home" },
  { b: "get", p: "got", ing: "getting", kind: "irr", lv: 2, tail: "up early" },
  { b: "make", p: "made", ing: "making", kind: "irr", lv: 2, tail: "a cake" },
  { b: "give", p: "gave", ing: "giving", kind: "irr", lv: 2, tail: "me a book" },
  { b: "run", p: "ran", ing: "running", kind: "irr", lv: 2, tail: "in the park" },
  { b: "swim", p: "swam", ing: "swimming", kind: "irr", lv: 2, tail: "in the river" },
  { b: "write", p: "wrote", ing: "writing", kind: "irr", lv: 3, tail: "a letter" },
  { b: "teach", p: "taught", ing: "teaching", kind: "irr", lv: 3, tail: "English" },
  { b: "find", p: "found", ing: "finding", kind: "irr", lv: 3, tail: "the key" },
  { b: "tell", p: "told", ing: "telling", kind: "irr", lv: 3, tail: "a story" },
  { b: "know", p: "knew", ing: "knowing", kind: "irr", lv: 3, tail: "the answer" },
  { b: "drink", p: "drank", ing: "drinking", kind: "irr", lv: 3, tail: "milk" },
  { b: "sing", p: "sang", ing: "singing", kind: "irr", lv: 3, tail: "a song" },
  { b: "ride", p: "rode", ing: "riding", kind: "irr", lv: 3, tail: "a bike" },
  { b: "speak", p: "spoke", ing: "speaking", kind: "irr", lv: 3, tail: "English" }
];
var EV_T2_NOTE = {
  reg: "是规则动词，过去式直接加 -ed",
  y: "是规则动词，变 y 为 i 再加 -ed",
  e: "以 e 结尾，过去式直接加 -d",
  double: "是重读闭音节，双写末尾辅音字母再加 -ed"
};
/* ===================== 三、现在进行时（be + doing） ===================== */
var EV_T3_SUBJ = [
  { s: "He", be: "is" }, { s: "She", be: "is" }, { s: "Tom", be: "is" },
  { s: "Lucy", be: "is" }, { s: "My mother", be: "is" }, { s: "My father", be: "is" },
  { s: "The cat", be: "is" }, { s: "The boy", be: "is" },
  { s: "They", be: "are" }, { s: "We", be: "are" }, { s: "You", be: "are" },
  { s: "The students", be: "are" }, { s: "My parents", be: "are" },
  { s: "The children", be: "are" }, { s: "I", be: "am" }
];
var EV_T3_TRIG = ["Look!", "Listen!", "Look!", "Listen!"];
var EV_T3_VERBS = [
  { b: "play", ing: "playing", kind: "reg", lv: 1, tail: "football" },
  { b: "read", ing: "reading", kind: "reg", lv: 1, tail: "a book" },
  { b: "cook", ing: "cooking", kind: "reg", lv: 1, tail: "dinner" },
  { b: "sing", ing: "singing", kind: "reg", lv: 1, tail: "a song" },
  { b: "clean", ing: "cleaning", kind: "reg", lv: 1, tail: "the room" },
  { b: "wait", ing: "waiting", kind: "reg", lv: 1, tail: "for the bus" },
  { b: "talk", ing: "talking", kind: "reg", lv: 1, tail: "with a friend" },
  { b: "watch", ing: "watching", kind: "reg", lv: 1, tail: "TV" },
  { b: "draw", ing: "drawing", kind: "reg", lv: 1, tail: "a picture" },
  { b: "drink", ing: "drinking", kind: "reg", lv: 1, tail: "water" },
  { b: "dance", ing: "dancing", kind: "e", lv: 1, tail: "" },
  { b: "sleep", ing: "sleeping", kind: "reg", lv: 1, tail: "" },
  { b: "run", ing: "running", kind: "double", lv: 2, tail: "in the park" },
  { b: "swim", ing: "swimming", kind: "double", lv: 2, tail: "in the river" },
  { b: "sit", ing: "sitting", kind: "double", lv: 2, tail: "under the tree" },
  { b: "get", ing: "getting", kind: "double", lv: 2, tail: "up" },
  { b: "shop", ing: "shopping", kind: "double", lv: 2, tail: "in the supermarket" },
  { b: "write", ing: "writing", kind: "e", lv: 2, tail: "a letter" },
  { b: "make", ing: "making", kind: "e", lv: 2, tail: "a cake" },
  { b: "ride", ing: "riding", kind: "e", lv: 2, tail: "a bike" },
  { b: "take", ing: "taking", kind: "e", lv: 2, tail: "a photo" },
  { b: "come", ing: "coming", kind: "e", lv: 2, tail: "to the party" }
];
var EV_T3_NOTE = {
  reg: "直接加 -ing",
  double: "要双写末尾辅音字母再加 -ing",
  e: "要去掉词尾 e 再加 -ing"
};
/* ===================== 四、形容词比较级 ===================== */
var EV_T4_ADJ = [
  { a: "tall", cmp: "taller", sup: "tallest", kind: "one", lv: 1, pair: ["Tom", "his brother"] },
  { a: "old", cmp: "older", sup: "oldest", kind: "one", lv: 1, pair: ["This house", "that one"] },
  { a: "long", cmp: "longer", sup: "longest", kind: "one", lv: 1, pair: ["This street", "that street"] },
  { a: "small", cmp: "smaller", sup: "smallest", kind: "one", lv: 1, pair: ["This bag", "that one"] },
  { a: "fast", cmp: "faster", sup: "fastest", kind: "one", lv: 1, pair: ["A car", "a bike"] },
  { a: "cold", cmp: "colder", sup: "coldest", kind: "one", lv: 1, pair: ["Today", "yesterday"] },
  { a: "young", cmp: "younger", sup: "youngest", kind: "one", lv: 1, pair: ["Lucy", "her sister"] },
  { a: "cheap", cmp: "cheaper", sup: "cheapest", kind: "one", lv: 1, pair: ["The blue pen", "the red one"] },
  { a: "slow", cmp: "slower", sup: "slowest", kind: "one", lv: 1, pair: ["A bike", "a car"] },
  { a: "warm", cmp: "warmer", sup: "warmest", kind: "one", lv: 1, pair: ["Today", "yesterday"] },
  { a: "high", cmp: "higher", sup: "highest", kind: "one", lv: 1, pair: ["This wall", "that one"] },
  { a: "short", cmp: "shorter", sup: "shortest", kind: "one", lv: 1, pair: ["This ruler", "that one"] },
  { a: "nice", cmp: "nicer", sup: "nicest", kind: "e", lv: 1, pair: ["This room", "that room"] },
  { a: "large", cmp: "larger", sup: "largest", kind: "e", lv: 1, pair: ["This room", "that one"] },
  { a: "late", cmp: "later", sup: "latest", kind: "e", lv: 1, pair: ["Tom", "his brother"] },
  { a: "easy", cmp: "easier", sup: "easiest", kind: "y", lv: 2, pair: ["This test", "the last one"] },
  { a: "happy", cmp: "happier", sup: "happiest", kind: "y", lv: 2, pair: ["Lucy", "her sister"] },
  { a: "busy", cmp: "busier", sup: "busiest", kind: "y", lv: 2, pair: ["My father", "my mother"] },
  { a: "early", cmp: "earlier", sup: "earliest", kind: "y", lv: 2, pair: ["Tom", "his brother"] },
  { a: "heavy", cmp: "heavier", sup: "heaviest", kind: "y", lv: 2, pair: ["This box", "that one"] },
  { a: "dirty", cmp: "dirtier", sup: "dirtiest", kind: "y", lv: 2, pair: ["This room", "that one"] },
  { a: "big", cmp: "bigger", sup: "biggest", kind: "double", lv: 2, pair: ["This apple", "the orange"] },
  { a: "hot", cmp: "hotter", sup: "hottest", kind: "double", lv: 2, pair: ["Today", "yesterday"] },
  { a: "fat", cmp: "fatter", sup: "fattest", kind: "double", lv: 2, pair: ["This cat", "that one"] },
  { a: "thin", cmp: "thinner", sup: "thinnest", kind: "double", lv: 2, pair: ["This cat", "that one"] },
  { a: "interesting", cmp: "more interesting", sup: "most interesting", kind: "more", lv: 3, pair: ["This book", "that one"] },
  { a: "beautiful", cmp: "more beautiful", sup: "most beautiful", kind: "more", lv: 3, pair: ["This garden", "that one"] },
  { a: "expensive", cmp: "more expensive", sup: "most expensive", kind: "more", lv: 3, pair: ["This bike", "that one"] },
  { a: "difficult", cmp: "more difficult", sup: "most difficult", kind: "more", lv: 3, pair: ["This test", "the last one"] },
  { a: "important", cmp: "more important", sup: "most important", kind: "more", lv: 3, pair: ["This meeting", "the last one"] },
  { a: "popular", cmp: "more popular", sup: "most popular", kind: "more", lv: 3, pair: ["This song", "that one"] },
  { a: "careful", cmp: "more careful", sup: "most careful", kind: "more", lv: 3, pair: ["Tom", "his brother"] },
  { a: "delicious", cmp: "more delicious", sup: "most delicious", kind: "more", lv: 3, pair: ["This cake", "that one"] },
  { a: "comfortable", cmp: "more comfortable", sup: "most comfortable", kind: "more", lv: 3, pair: ["This chair", "that one"] },
  { a: "exciting", cmp: "more exciting", sup: "most exciting", kind: "more", lv: 3, pair: ["This film", "that one"] }
];
var EV_T4_NOTE = {
  one: "是单音节词，比较级直接加 -er",
  e: "以 e 结尾，比较级直接加 -r",
  y: "以「辅音字母+y」结尾，变 y 为 i 再加 -er",
  double: "是重读闭音节，双写末尾辅音字母再加 -er",
  more: "是多音节词，比较级用 more + 原级"
};
/* ===================== 五、名词复数 ===================== */
var EV_T5_NOUNS = [
  { b: "book", p: "books", kind: "s", lv: 1 },
  { b: "desk", p: "desks", kind: "s", lv: 1 },
  { b: "bag", p: "bags", kind: "s", lv: 1 },
  { b: "cup", p: "cups", kind: "s", lv: 1 },
  { b: "chair", p: "chairs", kind: "s", lv: 1 },
  { b: "table", p: "tables", kind: "s", lv: 1 },
  { b: "pen", p: "pens", kind: "s", lv: 1 },
  { b: "map", p: "maps", kind: "s", lv: 1 },
  { b: "car", p: "cars", kind: "s", lv: 1 },
  { b: "dog", p: "dogs", kind: "s", lv: 1 },
  { b: "cat", p: "cats", kind: "s", lv: 1 },
  { b: "bike", p: "bikes", kind: "s", lv: 1 },
  { b: "day", p: "days", kind: "s", lv: 1 },
  { b: "key", p: "keys", kind: "s", lv: 1 },
  { b: "boy", p: "boys", kind: "s", lv: 1 },
  { b: "girl", p: "girls", kind: "s", lv: 1 },
  { b: "room", p: "rooms", kind: "s", lv: 1 },
  { b: "tree", p: "trees", kind: "s", lv: 1 },
  { b: "egg", p: "eggs", kind: "s", lv: 1 },
  { b: "school", p: "schools", kind: "s", lv: 1 },
  { b: "box", p: "boxes", kind: "es", lv: 2 },
  { b: "bus", p: "buses", kind: "es", lv: 2 },
  { b: "watch", p: "watches", kind: "es", lv: 2 },
  { b: "class", p: "classes", kind: "es", lv: 2 },
  { b: "dish", p: "dishes", kind: "es", lv: 2 },
  { b: "tomato", p: "tomatoes", kind: "es", lv: 2 },
  { b: "potato", p: "potatoes", kind: "es", lv: 2 },
  { b: "hero", p: "heroes", kind: "es", lv: 2 },
  { b: "brush", p: "brushes", kind: "es", lv: 2 },
  { b: "glass", p: "glasses", kind: "es", lv: 2 },
  { b: "bench", p: "benches", kind: "es", lv: 2 },
  { b: "fox", p: "foxes", kind: "es", lv: 2 },
  { b: "baby", p: "babies", kind: "ies", lv: 2 },
  { b: "city", p: "cities", kind: "ies", lv: 2 },
  { b: "story", p: "stories", kind: "ies", lv: 2 },
  { b: "family", p: "families", kind: "ies", lv: 2 },
  { b: "country", p: "countries", kind: "ies", lv: 2 },
  { b: "party", p: "parties", kind: "ies", lv: 2 },
  { b: "study", p: "studies", kind: "ies", lv: 2 },
  { b: "body", p: "bodies", kind: "ies", lv: 2 },
  { b: "activity", p: "activities", kind: "ies", lv: 2 },
  { b: "factory", p: "factories", kind: "ies", lv: 2 },
  { b: "child", p: "children", kind: "irr", lv: 3 },
  { b: "man", p: "men", kind: "irr", lv: 3 },
  { b: "woman", p: "women", kind: "irr", lv: 3 },
  { b: "foot", p: "feet", kind: "irr", lv: 3 },
  { b: "tooth", p: "teeth", kind: "irr", lv: 3 },
  { b: "mouse", p: "mice", kind: "irr", lv: 3 },
  { b: "knife", p: "knives", kind: "irr", lv: 3 },
  { b: "leaf", p: "leaves", kind: "irr", lv: 3 },
  { b: "wife", p: "wives", kind: "irr", lv: 3 },
  { b: "half", p: "halves", kind: "irr", lv: 3 },
  { b: "sheep", p: "sheep", kind: "sp", lv: 3 }
];
var EV_T5_FRAME = [
  ["I can see many ____ ( ", " )."],
  ["How many ____ ( ", " ) are there?"],
  ["These ____ ( ", " ) are very nice."],
  ["There are three ____ ( ", " ) over there."],
  ["Look at those ____ ( ", " )!"]
];
/* ===================== 六、时间介词 in / on / at ===================== */
var EV_T6_PREPS = [
  { e: "seven o'clock", p: "at", lv: 1 },
  { e: "six thirty", p: "at", lv: 1 },
  { e: "noon", p: "at", lv: 1 },
  { e: "night", p: "at", lv: 1 },
  { e: "the morning", p: "in", lv: 1 },
  { e: "the afternoon", p: "in", lv: 1 },
  { e: "May", p: "in", lv: 1 },
  { e: "2027", p: "in", lv: 1 },
  { e: "Monday", p: "on", lv: 1 },
  { e: "Sunday", p: "on", lv: 1 },
  { e: "spring", p: "in", lv: 1 },
  { e: "September", p: "in", lv: 1 },
  { e: "half past six", p: "at", lv: 2 },
  { e: "midnight", p: "at", lv: 2 },
  { e: "lunchtime", p: "at", lv: 2 },
  { e: "Tuesday afternoon", p: "on", lv: 2 },
  { e: "May 1st", p: "on", lv: 2 },
  { e: "winter", p: "in", lv: 2 },
  { e: "December", p: "in", lv: 2 },
  { e: "my birthday", p: "on", lv: 2 },
  { e: "eight o'clock", p: "at", lv: 2 },
  { e: "summer", p: "in", lv: 2 },
  { e: "the morning of May 1st", p: "on", lv: 3 },
  { e: "weekdays", p: "on", lv: 3 },
  { e: "New Year's Day", p: "on", lv: 3 },
  { e: "the evening", p: "in", lv: 3 },
  { e: "ten past nine", p: "at", lv: 3 },
  { e: "Monday evening", p: "on", lv: 3 },
  { e: "Children's Day", p: "on", lv: 3 },
  { e: "autumn", p: "in", lv: 3 },
  { e: "four thirty", p: "at", lv: 3 },
  { e: "Saturday", p: "on", lv: 3 }
];
var EV_T6_FRAME = ["We will meet ____ ", "See you ____ ", "School begins ____ ",
  "I will be free ____ ", "Let's meet ____ "];
var EV_T6_EXTRA = ["for", "to", "with", "by"];
/* ===================== 七、情景对话应答 ===================== */
var EV_T7 = [
  { q: "—Thank you for your help.", ok: "You're welcome.", ws: ["That's right.", "Yes, please.", "No, thanks."], lv: 1, why: "回答别人的感谢用 You're welcome。" },
  { q: "—Nice to meet you.", ok: "Nice to meet you, too.", ws: ["You're right.", "I'm fine, thank you.", "That's all right."], lv: 1, why: "初次见面的问候要用 Nice to meet you, too 回应。" },
  { q: "—How are you?", ok: "I'm fine, thank you.", ws: ["I'm fourteen.", "It's Monday today.", "You're fine, too."], lv: 1, why: "How are you 问身体或近况，回答 I'm fine, thank you。" },
  { q: "—Happy birthday!", ok: "Thank you.", ws: ["The same to you.", "Happy birthday, too.", "That's right."], lv: 1, why: "生日只属于一个人，收到祝福回答 Thank you，不能用 The same to you。" },
  { q: "—What's the weather like today?", ok: "It's sunny and warm.", ws: ["It's Monday today.", "I like it very much.", "It's five o'clock."], lv: 1, why: "问天气要用描述天气的句子回答，如 It's sunny and warm。" },
  { q: "—How do you go to school?", ok: "By bike.", ws: ["At seven.", "In the morning.", "It's very nice."], lv: 1, why: "How 问方式，用 by + 交通工具回答。" },
  { q: "—What does your father do?", ok: "He is a doctor.", ws: ["He is fine.", "He is forty.", "He is at home."], lv: 1, why: "What does ... do 问职业，要回答职业名称。" },
  { q: "—Where are you from?", ok: "I'm from Chengdu.", ws: ["I'm in Class Two.", "I'm going to Chengdu.", "Chengdu is very far."], lv: 1, why: "Where are you from 问来自哪里，答 I'm from + 地点。" },
  { q: "—Would you like some tea?", ok: "Yes, please.", ws: ["Yes, I like.", "No, I don't.", "You're welcome."], lv: 1, why: "Would you like ... 的肯定回答常为 Yes, please。" },
  { q: "—May I use your pen?", ok: "Sure, here you are.", ws: ["Yes, I can.", "You're welcome.", "No, I'm not."], lv: 1, why: "别人借东西，同意时递上东西说 Here you are。" },
  { q: "—Can I help you?", ok: "Yes, I'd like a cup of coffee.", ws: ["That's right.", "You're welcome.", "No, I can't."], lv: 1, why: "店员问 Can I help you，顾客应说出自己想要什么。" },
  { q: "—How much is the shirt?", ok: "It's thirty yuan.", ws: ["It's thirty o'clock.", "There are thirty.", "It's Monday."], lv: 1, why: "How much 问价钱，回答要用货币单位 yuan。" },
  { q: "—Would you like to go to the movies with me?", ok: "I'd love to.", ws: ["Yes, I do.", "No, I don't.", "That's all right."], lv: 2, why: "Would you like to ... 的接受回答是 I'd love to。" },
  { q: "—Excuse me, where is the library?", ok: "It's next to the school gate.", ws: ["Yes, it is.", "I'm going there.", "That's a good idea."], lv: 2, why: "问路要告诉对方具体位置，答 It's next to ...。" },
  { q: "—Sorry, I'm late.", ok: "That's all right.", ws: ["You're welcome.", "Nice to meet you.", "Thank you."], lv: 2, why: "别人道歉时回答 That's all right，表示「没关系」。" },
  { q: "—What about going swimming tomorrow?", ok: "Good idea.", ws: ["Yes, I do.", "That's all right.", "You're welcome."], lv: 2, why: "What about ... 是提建议，赞同就说 Good idea。" },
  { q: "—I'm sorry I broke your cup.", ok: "Never mind.", ws: ["You're welcome.", "That's right.", "Thank you."], lv: 2, why: "别人道歉用 Never mind 或 That's all right 表示不介意。" },
  { q: "—Help yourself to some fish.", ok: "Thank you.", ws: ["I can help you.", "Yes, please.", "You're right."], lv: 2, why: "Help yourself 是请客用语，接受时道谢。" },
  { q: "—Would you mind opening the window?", ok: "Of course not.", ws: ["Yes, please.", "No, I don't.", "You're welcome."], lv: 3, why: "Would you mind ...? 表示请求，同意做某事答 Of course not。" },
  { q: "—Must I finish the work now?", ok: "No, you needn't.", ws: ["No, you mustn't.", "Yes, you need.", "No, you can't."], lv: 3, why: "must 提问的否定回答用 needn't，表示「不必」。" },
  { q: "—May I speak to Tom?", ok: "This is Tom speaking.", ws: ["I am Tom.", "Who are you?", "Yes, please."], lv: 3, why: "打电话说「我就是」用 This is ... speaking。" },
  { q: "—Have a good trip!", ok: "Thank you.", ws: ["You're welcome.", "The same to you.", "That's right."], lv: 3, why: "别人祝旅途愉快，道谢即可，The same to you 用错场合。" }
];
/* ===================== 八、情态动词 ===================== */
var EV_T8 = [
  { st: "§ ____ swim when he was five.", subs: ["He", "Tom", "Jack", "My brother", "Ben"], ok: "could", ws: ["can", "must", "may"], lv: 1, why: "when he was five 是过去时间，表示过去的能力用 could。" },
  { st: "§ ____ smoke here. It's a hospital.", subs: ["You", "Students", "We", "Visitors"], ok: "mustn't", ws: ["needn't", "can", "may"], lv: 1, why: "医院里禁止吸烟，mustn't 表示「禁止、不允许」。" },
  { st: "§ ____ finish it today. There is no hurry.", subs: ["You", "We"], ok: "needn't", ws: ["mustn't", "can't", "must"], lv: 1, why: "There is no hurry 说明「不必着急」，用 needn't 表示不必。" },
  { st: "—Must I go now? —No, you ____.", ok: "needn't", ws: ["mustn't", "can't", "must"], lv: 1, why: "must 开头的一般疑问句，否定回答用 needn't，不能用 mustn't。" },
  { st: "It's raining. § ____ take an umbrella.", subs: ["You", "We", "Students"], ok: "should", ws: ["can't", "needn't", "mustn't"], lv: 1, why: "下雨了，建议对方带伞，should 表示「应该」。" },
  { st: "—Can you speak English? —Yes, I ____.", ok: "can", ws: ["do", "am", "could"], lv: 1, why: "can 提问就用 can 回答，could 是过去式，不适合回答现在的能力。" },
  { st: "§ ____ be tired after the long trip.", subs: ["He", "She", "Tom", "They", "My parents"], ok: "must", ws: ["needn't", "mustn't", "can't"], lv: 1, why: "must 可表示肯定推测，意为「一定」，符合「长途旅行后一定累了」。" },
  { st: "____ I have a look at your new book?", ok: "May", ws: ["Do", "Am", "Must"], lv: 1, why: "May I ...? 用于礼貌地请求允许，意为「我可以……吗」。" },
  { st: "§ ____ keep quiet in the library.", subs: ["We", "Students", "You"], ok: "must", ws: ["needn't", "mustn't", "can't"], lv: 1, why: "图书馆里必须保持安静，must 表示「必须」。" },
  { st: "—Could I use your phone? —Yes, you ____.", ok: "can", ws: ["could", "must", "need"], lv: 1, why: "Could I ...? 是请求允许，肯定回答用 can。" },
  { st: "§ ____ get up so early tomorrow. It's Sunday.", subs: ["You", "We"], ok: "needn't", ws: ["mustn't", "can't", "must"], lv: 1, why: "明天是星期天，不用早起，needn't 表示「不必」。" },
  { st: "The light is on. § ____ be in the room.", subs: ["He", "She", "Tom", "Someone"], ok: "must", ws: ["needn't", "mustn't", "can"], lv: 1, why: "must be 表示肯定推测，灯还亮着说明「一定在房间里」。" },
  { st: "—Need I finish the work today? —No, you ____.", ok: "needn't", ws: ["mustn't", "can't", "don't"], lv: 2, why: "Need I ...? 的否定回答用 needn't，表示「不必」。" },
  { st: "§ ____ play with fire. It's dangerous.", subs: ["You", "Children", "We"], ok: "mustn't", ws: ["needn't", "can", "may"], lv: 2, why: "玩火很危险，mustn't 表示「禁止、千万不能」。" },
  { st: "§ ____ have finished the work, but I'm not sure.", subs: ["He", "She", "Tom"], ok: "may", ws: ["must", "can", "need"], lv: 3, why: "may have done 表示对过去的推测「可能已经做完」，与 I'm not sure 呼应。" },
  { st: "This book ____ be Tom's. His name is on it.", ok: "must", ws: ["may", "can't", "needn't"], lv: 3, why: "书上有 Tom 的名字，是肯定的推测，用 must be 表示「一定是」。" }
];
/* ===================== 九、非谓语动词 ===================== */
var EV_T9 = [
  { st: "It's important ____ ( learn ) English well.", ok: "to learn", ws: ["learn", "learning", "learns"], lv: 1, why: "It's + adj + to do sth 句型，真正的主语是不定式，用 to learn。" },
  { st: "He decided ____ ( go ) home at once.", ok: "to go", ws: ["go", "going", "went"], lv: 1, why: "decide 后面接动词不定式，用 to go。" },
  { st: "Thank you for ____ ( help ) me.", ok: "helping", ws: ["help", "to help", "helps"], lv: 1, why: "介词 for 后面接动名词，用 helping。" },
  { st: "He is good at ____ ( play ) basketball.", ok: "playing", ws: ["play", "to play", "plays"], lv: 1, why: "be good at 中 at 是介词，后面接动名词，用 playing。" },
  { st: "Let's ____ ( go ) swimming this afternoon.", ok: "go", ws: ["to go", "going", "goes"], lv: 1, why: "Let's 后面接动词原形，用 go。" },
  { st: "You'd better ____ ( see ) a doctor.", ok: "see", ws: ["to see", "seeing", "saw"], lv: 1, why: "had better 后面接动词原形，用 see。" },
  { st: "Why not ____ ( ask ) the teacher for help?", ok: "ask", ws: ["to ask", "asking", "asked"], lv: 1, why: "Why not ...? 后面接动词原形，用 ask。" },
  { st: "Would you like ____ ( have ) a cup of tea?", ok: "to have", ws: ["have", "having", "has"], lv: 1, why: "would like 后面接动词不定式，用 to have。" },
  { st: "It's time ____ ( have ) lunch.", ok: "to have", ws: ["have", "having", "has"], lv: 1, why: "It's time to do sth 句型，用 to have。" },
  { st: "He kept ____ ( work ) until midnight.", ok: "working", ws: ["work", "to work", "works"], lv: 1, why: "keep 后面接动名词，kept working 表示「一直工作」。" },
  { st: "The teacher asked us ____ ( hand ) in the homework.", ok: "to hand", ws: ["hand", "handing", "handed"], lv: 1, why: "ask sb to do sth 句型，用 to hand。" },
  { st: "She enjoys ____ ( listen ) to music.", ok: "listening", ws: ["listen", "to listen", "listens"], lv: 1, why: "enjoy 后面接动名词，用 listening。" },
  { st: "I'm looking forward to ____ ( see ) you again.", ok: "seeing", ws: ["see", "to see", "saw"], lv: 2, why: "look forward to 中 to 是介词，后面接动名词，用 seeing。" },
  { st: "We should try ____ ( help ) others.", ok: "to help", ws: ["help", "helping", "helps"], lv: 2, why: "try to do sth 表示「努力做某事」，用 to help。" },
  { st: "He would rather ____ ( stay ) at home.", ok: "stay", ws: ["to stay", "staying", "stayed"], lv: 3, why: "would rather 后面接动词原形，用 stay。" },
  { st: "I can't help ____ ( laugh ) when I see him.", ok: "laughing", ws: ["laugh", "to laugh", "laughed"], lv: 3, why: "can't help 意为「忍不住」，后面接动名词，用 laughing。" }
];
/* ===================== 十、词汇辨析 ===================== */
var EV_T10 = [
  { st: "I ____ a book from the library yesterday.", ok: "borrowed", ws: ["lent", "returned", "bought"], lv: 1, why: "borrow 表示「借入」，从图书馆借书用 borrowed；lend 是「借出」。" },
  { st: "Could you ____ me your bike?", ok: "lend", ws: ["borrow", "return", "keep"], lv: 1, why: "lend sb sth 表示「把某物借给某人」，borrow 是「借入」。" },
  { st: "Please ____ the book to the library on time.", ok: "return", ws: ["borrow", "lend", "keep"], lv: 1, why: "return 表示「归还」，把书还给图书馆用 return。" },
  { st: "He ____ two hours doing his homework.", ok: "spent", ws: ["took", "cost", "paid"], lv: 1, why: "sb spends time doing sth，主语是人，用 spent。" },
  { st: "It ____ me two hours to finish the work.", ok: "took", ws: ["spent", "cost", "paid"], lv: 1, why: "It takes sb some time to do sth，过去式用 took。" },
  { st: "The bike ____ me 500 yuan.", ok: "cost", ws: ["spent", "took", "paid"], lv: 1, why: "sth costs sb money，主语是物，用 cost。" },
  { st: "I ____ 500 yuan for the bike.", ok: "paid", ws: ["cost", "spent", "took"], lv: 1, why: "sb pays money for sth，用 paid for。" },
  { st: "Don't ____ a noise in class.", ok: "make", ws: ["do", "take", "give"], lv: 1, why: "make a noise 是固定搭配，意为「发出声音」。" },
  { st: "I often ____ the bus to school.", ok: "take", ws: ["make", "do", "drive"], lv: 1, why: "take a bus 表示「乘公交车」。" },
  { st: "____! The bus is coming.", ok: "Look", ws: ["See", "Watch", "Hear"], lv: 1, why: "提醒别人看，用 Look!；see 强调看见的结果。" },
  { st: "I ____ a bird in the tree just now.", ok: "saw", ws: ["watched", "looked", "listened"], lv: 1, why: "see 表示「看见」，强调结果，just now 用过去式 saw。" },
  { st: "He can ____ English very well.", ok: "speak", ws: ["say", "tell", "talk"], lv: 1, why: "speak 后接语言，表示「说某种语言」。" },
  { st: "Can you ____ me the way to the station?", ok: "tell", ws: ["say", "speak", "talk"], lv: 2, why: "tell sb sth 表示「告诉某人某事」。" },
  { st: "I didn't ____ what he said.", ok: "hear", ws: ["listen", "sound", "listened"], lv: 2, why: "hear 强调「听见」的结果，listen 强调「听」的动作。" },
  { st: "The soup ____ delicious.", ok: "tastes", ws: ["eats", "drinks", "taste"], lv: 2, why: "taste 是感官动词，主语 the soup 是第三人称单数，用 tastes。" },
  { st: "It's cold outside. ____ your coat, please.", ok: "Put on", ws: ["Wear", "Dress", "Take off"], lv: 2, why: "put on 表示「穿上」的动作，wear 表示「穿着」的状态。" },
  { st: "The teacher is ____ our homework.", ok: "checking", ws: ["watching", "looking", "seeing"], lv: 2, why: "check 表示「检查」，老师批改作业用 check。" },
  { st: "The shoes are too small. Please ____ me a bigger pair.", ok: "bring", ws: ["take", "carry", "lend"], lv: 2, why: "bring 表示「带来」，朝说话人的方向；take 是「带走」。" },
  { st: "He ____ a red shirt today.", ok: "is wearing", ws: ["is putting on", "dresses", "puts on"], lv: 2, why: "wear 表示「穿着」的状态，今天穿着红衬衫用 is wearing。" },
  { st: "____ to the tape carefully, please.", ok: "Listen", ws: ["Hear", "Sound", "See"], lv: 2, why: "listen to 表示有意识地听，hear 强调听见的结果。" },
  { st: "He often ____ his bike to school.", ok: "rides", ws: ["drives", "by", "on"], lv: 2, why: "ride a bike 表示「骑自行车」；drive 是开汽车。" },
  { st: "My mother ____ the room every morning.", ok: "cleans", ws: ["washes", "does", "makes"], lv: 2, why: "clean the room 表示「打扫房间」，用 cleans。" },
  { st: "Could you ____ my dog while I'm away?", ok: "look after", ws: ["look for", "look at", "look up"], lv: 3, why: "look after 意为「照顾」，look for 是「寻找」。" },
  { st: "If you don't know the word, you can ____ it up in the dictionary.", ok: "look", ws: ["take", "make", "put"], lv: 3, why: "look up 表示「查阅」，查字典用 look up。" },
  { st: "She ____ up late to finish her homework.", ok: "stayed", ws: ["kept", "took", "made"], lv: 3, why: "stay up 表示「熬夜」，用 stayed up。" },
  { st: "Please ____ your homework on time.", ok: "hand in", ws: ["hand out", "give up", "take off"], lv: 3, why: "hand in 表示「上交」；hand out 是「分发」。" }
];
/* ===================== 十一、阅读理解（短短文） ===================== */
var EV_T11_NAMES_B = ["Tom", "Mike", "Jack", "Peter", "Sam", "Ben"];
var EV_T11_NAMES_G = ["Lucy", "Lily", "Anna", "Kate", "Mary", "Amy"];
var EV_T11_CITIES = ["Chengdu", "Beijing", "Shanghai", "Chongqing", "Guangzhou", "Xi'an", "Kunming", "Harbin"];
var EV_T11_TIMES = ["six thirty", "seven o'clock", "eight o'clock", "six o'clock", "seven thirty", "five thirty"];
var EV_T11_TRANS = ["bus", "bike", "car", "subway", "train"];
var EV_T11_SUBJECTS = ["English", "Chinese", "math", "music", "art", "PE", "history", "science"];
var EV_T11_ACTS = ["playing football", "reading books", "drawing pictures", "listening to music",
  "playing basketball", "singing songs", "playing games", "riding a bike"];

window.DZ_VARIANTS.english = [
  /* 1 —— 一般现在时第三人称单数 */
  {
    name: "一般现在时三单",
    topic: "时态与语态",
    min: 1, max: 3,
    gen: function (level) {
      var v = DZ_V.pick(EV_pool(EV_T1_VERBS, level));
      var subj = DZ_V.pick(EV_T1_SUBJ);
      var adv = DZ_V.pick(EV_T1_ADV);
      return DZ_V.mk({
        topic: "时态与语态",
        stem: "选择正确形式：" + subj + " ____ ( " + v.b + " ) " + v.tail + " " + adv + ".",
        correct: v.ok,
        wrongs: EV_three(v.ok, [v.b, v.bad, v.ing]),
        explain: "主语 " + subj + " 是第三人称单数，一般现在时谓语动词要加 -s/-es；" + v.b + " " + EV_T1_NOTE[v.kind] + "，所以选 " + v.ok + "。",
        level: level
      });
    }
  },
  /* 2 —— 一般过去时 */
  {
    name: "一般过去时",
    topic: "时态与语态",
    min: 1, max: 3,
    gen: function (level) {
      var v = DZ_V.pick(EV_pool(EV_T2_VERBS, level));
      var subj = DZ_V.pick(EV_T2_SUBJ);
      var t = DZ_V.pick(EV_T2_TIME);
      var note = v.kind === "irr" ? (v.b + " 是不规则动词，过去式是 " + v.p) : (v.b + " " + EV_T2_NOTE[v.kind]);
      var wrongs = v.kind === "irr" ? [v.b, EV_regPast(v.b), v.ing] : [v.b, v.b + "s", v.ing];
      return DZ_V.mk({
        topic: "时态与语态",
        stem: "选择正确形式：" + subj + " ____ ( " + v.b + " ) " + v.tail + " " + t + ".",
        correct: v.p,
        wrongs: EV_three(v.p, wrongs),
        explain: "时间状语 " + t + " 表示过去，谓语要用一般过去时；" + note + "，所以选 " + v.p + "。",
        level: level
      });
    }
  },
  /* 3 —— 现在进行时 */
  {
    name: "现在进行时",
    topic: "时态与语态",
    min: 1, max: 3,
    gen: function (level) {
      var v = DZ_V.pick(EV_pool(EV_T3_VERBS, level));
      var s = DZ_V.pick(EV_T3_SUBJ);
      var trig = DZ_V.pick(EV_T3_TRIG);
      var be = s.be;
      var wrongBe = be === "is" ? DZ_V.pick(["am", "are"]) : "is";
      var ok = be + " " + v.ing;
      return DZ_V.mk({
        topic: "时态与语态",
        stem: "选择正确形式：" + trig + " " + s.s + " ____ ( " + v.b + " ) " + (v.tail ? v.tail + " " : "") + "now.",
        correct: ok,
        wrongs: EV_three(ok, [v.b, v.ing, wrongBe + " " + v.ing]),
        explain: trig + " 和 now 提示动作正在进行，用现在进行时 be + doing；主语 " + s.s + " 搭配 " + be + "，" + v.b + " " + EV_T3_NOTE[v.kind] + "，所以选 " + ok + "。",
        level: level
      });
    }
  },
  /* 4 —— 形容词比较级 */
  {
    name: "形容词比较级",
    topic: "形容词副词",
    min: 1, max: 3,
    gen: function (level) {
      var a = DZ_V.pick(EV_pool(EV_T4_ADJ, level));
      var pair = a.pair;
      var much = (level >= 2 && DZ_V.R(0, 1) === 1) ? "much " : "";
      var wrongs = a.kind === "more" ? [a.a, a.sup, a.a + "er"] : [a.a, a.sup, "more " + a.a];
      return DZ_V.mk({
        topic: "形容词副词",
        stem: "选择正确形式：" + pair[0] + " is " + much + "____ ( " + a.a + " ) than " + pair[1] + ".",
        correct: a.cmp,
        wrongs: EV_three(a.cmp, wrongs),
        explain: "than 提示用比较级；" + a.a + " " + EV_T4_NOTE[a.kind] + "，得 " + a.cmp + "。",
        level: level
      });
    }
  },
  /* 5 —— 名词复数 */
  {
    name: "名词复数",
    topic: "名词代词冠词",
    min: 1, max: 3,
    gen: function (level) {
      var n = DZ_V.pick(EV_pool(EV_T5_NOUNS, level));
      var frame = DZ_V.pick(EV_T5_FRAME);
      var wrongs;
      if (n.kind === "s") wrongs = [n.b, n.b + "es", n.b + "'s"];
      else if (n.kind === "es") wrongs = [n.b, n.b + "s", n.b + "'s"];
      else if (n.kind === "ies") wrongs = [n.b, n.b + "s", n.b + "es"];
      else if (n.kind === "sp") wrongs = ["sheeps", "sheepes", "sheepe"];
      else wrongs = [n.b, n.b + "s", n.b + "es"];
      var note;
      if (n.kind === "s") note = n.b + " 是规则名词，复数直接加 -s";
      else if (n.kind === "es") note = n.b + " 以 s/x/ch/sh/o 结尾，复数加 -es";
      else if (n.kind === "ies") note = n.b + " 以「辅音字母+y」结尾，变 y 为 i 再加 -es";
      else if (n.kind === "sp") note = n.b + " 单复数同形";
      else note = n.b + " 的复数是不规则形式";
      return DZ_V.mk({
        topic: "名词代词冠词",
        stem: "选择正确形式：" + frame[0] + n.b + frame[1],
        correct: n.p,
        wrongs: EV_three(n.p, wrongs),
        explain: "本题考查名词复数：" + note + "，得 " + n.p + "。",
        level: level
      });
    }
  },
  /* 6 —— 时间介词 in / on / at */
  {
    name: "时间介词",
    topic: "介词与连词",
    min: 1, max: 3,
    gen: function (level) {
      var it = DZ_V.pick(EV_pool(EV_T6_PREPS, level));
      var frame = DZ_V.pick(EV_T6_FRAME);
      var others = EV_three(it.p, ["in", "on", "at"]);
      var extra = DZ_V.pick(EV_T6_EXTRA);
      var wrongs = others;
      if (wrongs.indexOf(extra) === -1) wrongs = wrongs.concat([extra]);
      return DZ_V.mk({
        topic: "介词与连词",
        stem: "选择正确介词：" + frame + it.e + ".",
        correct: it.p,
        wrongs: EV_three(it.p, wrongs),
        explain: "时间介词：具体时刻、正午、夜间前用 at；具体某天（星期几、日期）用 on；月份、年份、季节或泛指的上午下午用 in。故 " + it.e + " 前用 " + it.p + "。",
        level: level
      });
    }
  },
  /* 7 —— 情景对话应答 */
  {
    name: "情景对话应答",
    topic: "情景对话",
    min: 1, max: 3,
    gen: function (level) {
      var it = DZ_V.pick(EV_pool(EV_T7, level));
      return DZ_V.mk({
        topic: "情景对话",
        stem: "选择恰当应答：" + it.q + " — ____",
        correct: it.ok,
        wrongs: EV_three(it.ok, it.ws),
        explain: it.why + "其他三项与问句不搭配。",
        level: level
      });
    }
  },
  /* 8 —— 情态动词 */
  {
    name: "情态动词",
    topic: "情态动词与非谓语",
    min: 1, max: 3,
    gen: function (level) {
      var it = DZ_V.pick(EV_pool(EV_T8, level));
      var st = it.st;
      if (it.subs && st.indexOf("§") !== -1) st = st.replace("§", DZ_V.pick(it.subs));
      return DZ_V.mk({
        topic: "情态动词与非谓语",
        stem: "选择正确形式：" + st,
        correct: it.ok,
        wrongs: EV_three(it.ok, it.ws),
        explain: it.why + "故选 " + it.ok + "。",
        level: level
      });
    }
  },
  /* 9 —— 非谓语动词 */
  {
    name: "非谓语动词",
    topic: "情态动词与非谓语",
    min: 1, max: 3,
    gen: function (level) {
      var it = DZ_V.pick(EV_pool(EV_T9, level));
      return DZ_V.mk({
        topic: "情态动词与非谓语",
        stem: "选择正确形式：" + it.st,
        correct: it.ok,
        wrongs: EV_three(it.ok, it.ws),
        explain: it.why + "故选 " + it.ok + "。",
        level: level
      });
    }
  },
  /* 10 —— 词汇辨析 */
  {
    name: "词汇辨析",
    topic: "词汇辨析",
    min: 1, max: 3,
    gen: function (level) {
      var it = DZ_V.pick(EV_pool(EV_T10, level));
      return DZ_V.mk({
        topic: "词汇辨析",
        stem: "选择恰当的词：" + it.st,
        correct: it.ok,
        wrongs: EV_three(it.ok, it.ws),
        explain: it.why + "故选 " + it.ok + "。",
        level: level
      });
    }
  },
  /* 11 —— 阅读理解（短文 + 细节题） */
  {
    name: "阅读理解",
    topic: "阅读理解",
    min: 1, max: 3,
    gen: function (level) {
      var isBoy = DZ_V.R(0, 1) === 0;
      var name = isBoy ? DZ_V.pick(EV_T11_NAMES_B) : DZ_V.pick(EV_T11_NAMES_G);
      var pro = isBoy ? "He" : "She";
      var pos = isBoy ? "His" : "Her";
      var city = DZ_V.pick(EV_T11_CITIES);
      var time = DZ_V.pick(EV_T11_TIMES);
      var trans = DZ_V.pick(EV_T11_TRANS);
      var subj = DZ_V.pick(EV_T11_SUBJECTS);
      var act = DZ_V.pick(EV_T11_ACTS);
      var passage = name + " lives in " + city + ". " + pro + " gets up at " + time + ". " +
        pro + " goes to school by " + trans + ". " + pos + " favourite subject is " + subj + ". " +
        "After school " + pro.toLowerCase() + " likes " + act + ".";
      var qs = [];
      var i, others, w;
      others = EV_three(trans, EV_T11_TRANS); w = [];
      for (i = 0; i < others.length; i++) w.push("By " + others[i] + ".");
      qs.push({ lv: 1, q: "How does " + name + " go to school?", ok: "By " + trans + ".", ws: w, why: "短文说 " + pro.toLowerCase() + " goes to school by " + trans + "，" });
      others = EV_three(time, EV_T11_TIMES); w = [];
      for (i = 0; i < others.length; i++) w.push("At " + others[i] + ".");
      qs.push({ lv: 1, q: "What time does " + name + " get up?", ok: "At " + time + ".", ws: w, why: "短文说 " + pro.toLowerCase() + " gets up at " + time + "，" });
      others = EV_three(subj, EV_T11_SUBJECTS); w = [];
      for (i = 0; i < others.length; i++) w.push(EV_cap(others[i]) + ".");
      qs.push({ lv: 1, q: "What is " + name + "'s favourite subject?", ok: EV_cap(subj) + ".", ws: w, why: "短文说 " + pos.toLowerCase() + " favourite subject is " + subj + "，" });
      others = EV_three(city, EV_T11_CITIES); w = [];
      for (i = 0; i < others.length; i++) w.push("In " + others[i] + ".");
      qs.push({ lv: 2, q: "Where does " + name + " live?", ok: "In " + city + ".", ws: w, why: "短文说 " + pro.toLowerCase() + " lives in " + city + "，" });
      others = EV_three(act, EV_T11_ACTS); w = [];
      for (i = 0; i < others.length; i++) w.push(EV_cap(others[i]) + ".");
      qs.push({ lv: 3, q: "What does " + name + " like doing after school?", ok: EV_cap(act) + ".", ws: w, why: "短文说 after school " + pro.toLowerCase() + " likes " + act + "，" });
      var pool = [], it;
      for (i = 0; i < qs.length; i++) {
        if (qs[i].lv <= level) pool.push(qs[i]);
      }
      if (!pool.length) pool = qs;
      it = DZ_V.pick(pool);
      return DZ_V.mk({
        topic: "阅读理解",
        stem: "阅读短文，回答问题：" + passage + " " + it.q,
        correct: it.ok,
        wrongs: EV_three(it.ok, it.ws),
        explain: it.why + "所以选 " + it.ok,
        level: level
      });
    }
  }
];
