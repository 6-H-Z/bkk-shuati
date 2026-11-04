/* 变式题核心工具：DZ_V.R / RF / pick / shuffle / mk / fmt
   加载顺序：bank/data.js → js/variants-core.js → js/variants-*.js → 主脚本 */
window.DZ_V = (function () {
  function R(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
  function RF(a, b) { return Math.round((a + Math.random() * (b - a)) * 100) / 100; }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function fmt(n) {
    if (typeof n !== "number") return String(n);
    if (!isFinite(n)) return String(n);
    return String(Math.round(n * 1000) / 1000);
  }
  /* 组装成标准题目：正确答案随机放到 A~D；k 字段只在自测里用，界面不显示 */
  function mk(o) {
    var correct = String(o.correct);
    var wrongs = (o.wrongs || []).map(String).slice(0, 3);
    var all = shuffle([correct].concat(wrongs));
    return {
      topic: o.topic,
      type: "single",
      stem: o.stem,
      options: all,
      answer: "ABCD"[all.indexOf(correct)],
      explain: o.explain,
      level: o.level || 1,
      k: correct
    };
  }
  return { R: R, RF: RF, pick: pick, shuffle: shuffle, mk: mk, fmt: fmt };
})();
