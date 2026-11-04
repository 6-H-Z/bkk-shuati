window.DZ_VARIANTS = window.DZ_VARIANTS || {};

/* 数学变式题模板（11 个，覆盖题库 10 个考点）
   接口见 02_考试/单招2027/_变式规范.md；只依赖 variants-core.js 的 DZ_V */

/* ===== 公用小工具（mv 前缀，避免与其他科目脚本的重名冲突） ===== */
var mvSubDigits = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];

/* 数字转下标，如 10 -> ₁₀ */
function mvSub(n) {
  var s = String(n), out = "", i;
  for (i = 0; i < s.length; i++) out += mvSubDigits[s.charCodeAt(i) - 48];
  return out;
}

function mvGcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  var t;
  while (b) { t = a % b; a = b; b = t; }
  return a || 1;
}

/* 分数格式化：自动约分，分母为 1 时输出整数 */
function mvFrac(num, den) {
  if (den === 0) return "不存在";
  if (den < 0) { num = -num; den = -den; }
  var g = mvGcd(num, den);
  num = num / g;
  den = den / g;
  if (den === 1) return String(num);
  return num + "/" + den;
}

/* 干扰项兜底：保证 3 个互不相同、且都不等于正确答案 */
function mvBad3(correct, list) {
  var c = String(correct), out = [], i, s;
  for (i = 0; i < list.length; i++) {
    s = String(list[i]);
    if (!s || s === c || out.indexOf(s) >= 0) continue;
    if (/NaN|undefined|Infinity|\[object/.test(s)) continue;
    out.push(s);
    if (out.length === 3) return out;
  }
  var num = Number(c);
  if (isFinite(num)) {
    var offs = [1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6, -6, 7, -7, 8, -8];
    for (i = 0; i < offs.length && out.length < 3; i++) {
      s = DZ_V.fmt(num + offs[i]);
      if (s === c || out.indexOf(s) >= 0) continue;
      out.push(s);
    }
  }
  var fb = ["无法确定", "条件不足", "以上都不对", "其他值"];
  for (i = 0; i < fb.length && out.length < 3; i++) {
    if (fb[i] === c || out.indexOf(fb[i]) >= 0) continue;
    out.push(fb[i]);
  }
  return out;
}

/* 非零随机整数 */
function mvNz(a, b) {
  var v = DZ_V.R(a, b);
  if (v === 0) v = 1;
  return v;
}

window.DZ_VARIANTS.math = [
  /* 1. 集合与逻辑：交集 / 并集 / 补集 */
  {
    name: "集合的交并补",
    topic: "集合与逻辑",
    min: 1, max: 3,
    gen: function (level) {
      var pool = DZ_V.shuffle([1, 2, 3, 4, 5, 6, 7, 8]);
      var nA = DZ_V.R(3, 4), nB = DZ_V.R(3, 4);
      var k = DZ_V.R(1, Math.min(nA, nB) - 1);
      var A = pool.slice(0, nA);
      var B = A.slice(0, k).concat(pool.slice(nA, nA + nB - k));
      var as = "{" + DZ_V.shuffle(A).join(",") + "}";
      var bs = "{" + DZ_V.shuffle(B).join(",") + "}";
      var uni = nA + nB - k;
      var stem, correct, wrongs, explain;
      if (level === 1) {
        correct = k;
        stem = "已知集合 A=" + as + "，B=" + bs + "，则 A∩B 中元素的个数是（　）";
        wrongs = mvBad3(correct, [nA, nB, uni, nA + nB]);
        explain = "A 与 B 的公共元素共有 " + k + " 个，所以 A∩B 中元素的个数为 " + k + "。";
      } else if (level === 2) {
        correct = uni;
        stem = "已知集合 A=" + as + "，B=" + bs + "，则 A∪B 中元素的个数是（　）";
        wrongs = mvBad3(correct, [nA + nB, k, nA + nB + k, nA + nB - k + 1]);
        explain = "A 有 " + nA + " 个元素，B 有 " + nB + " 个元素，公共元素 " + k + " 个，由容斥原理得 " + nA + "+" + nB + "-" + k + "=" + uni + " 个。";
      } else {
        correct = 8 - uni;
        stem = "设全集 U={1,2,3,4,5,6,7,8}，A=" + as + "，B=" + bs + "，则 ∁U(A∪B) 中元素的个数是（　）";
        wrongs = mvBad3(correct, [uni, k, 8 - k, 9 - uni]);
        explain = "先求 A∪B 有 " + nA + "+" + nB + "-" + k + "=" + uni + " 个元素；全集有 8 个元素，所以补集有 8-" + uni + "=" + correct + " 个元素。";
      }
      return DZ_V.mk({
        topic: "集合与逻辑",
        stem: stem,
        correct: String(correct),
        wrongs: wrongs,
        explain: explain,
        level: level
      });
    }
  },

  /* 2. 不等式：一元一次 / 移项 / 一元二次整数解 */
  {
    name: "解不等式",
    topic: "不等式",
    min: 1, max: 3,
    gen: function (level) {
      if (level === 1) {
        var a = DZ_V.R(2, 6), b = DZ_V.R(1, 9), c = DZ_V.R(1, 9);
        var rhs = c + b;
        var xs = mvFrac(rhs, a);
        return DZ_V.mk({
          topic: "不等式",
          stem: "解不等式 " + a + "x - " + b + " ＞ " + c + "，得 x ＞（　）",
          correct: xs,
          wrongs: mvBad3(xs, [DZ_V.fmt((c - b) / a), DZ_V.fmt(rhs), DZ_V.fmt(a * rhs), DZ_V.fmt(rhs - a)]),
          explain: "移项得 " + a + "x ＞ " + rhs + "，两边同除以 " + a + "，得 x ＞ " + xs + "。",
          level: level
        });
      }
      if (level === 2) {
        var a2 = DZ_V.R(4, 8), c2 = DZ_V.R(1, 2);
        var b2 = DZ_V.R(1, 9), d2 = DZ_V.R(1, 9);
        var xs2 = mvFrac(d2 - b2, a2 - c2);
        var cTerm = c2 === 1 ? "x" : c2 + "x";
        return DZ_V.mk({
          topic: "不等式",
          stem: "解不等式 " + a2 + "x + " + b2 + " ＞ " + cTerm + " + " + d2 + "，得 x ＞（　）",
          correct: xs2,
          wrongs: mvBad3(xs2, [mvFrac(b2 - d2, a2 - c2), mvFrac(d2 + b2, a2 - c2), DZ_V.fmt(d2 - b2), mvFrac(d2, a2)]),
          explain: "移项得 (" + a2 + "-" + c2 + ")x ＞ " + d2 + "-" + b2 + "，即 " + (a2 - c2) + "x ＞ " + (d2 - b2) + "，两边同除以 " + (a2 - c2) + "，得 x ＞ " + xs2 + "。",
          level: level
        });
      }
      var p = DZ_V.R(1, 4), q = p + DZ_V.R(2, 5);
      var cnt = q - p - 1;
      return DZ_V.mk({
        topic: "不等式",
        stem: "不等式 x² - " + (p + q) + "x + " + (p * q) + " ＜ 0 的整数解共有（　）个",
        correct: String(cnt),
        wrongs: mvBad3(cnt, [q - p, q - p + 1, p + q, cnt + 2]),
        explain: "因式分解得 (x-" + p + ")(x-" + q + ")＜0，即 " + p + "＜x＜" + q + "，其中整数共有 " + cnt + " 个。",
        level: level
      });
    }
  },

  /* 3. 函数：一次函数 / 二次函数 / 待定系数 */
  {
    name: "函数求值",
    topic: "函数",
    min: 1, max: 3,
    gen: function (level) {
      if (level === 1) {
        var a = DZ_V.R(2, 6), b = DZ_V.R(-9, 9), x = DZ_V.R(-5, 5);
        var y = a * x + b;
        var bstr = b === 0 ? "" : (b > 0 ? "+" + b : String(b));
        return DZ_V.mk({
          topic: "函数",
          stem: "已知 f(x)=" + a + "x" + bstr + "，则 f(" + x + ")=（　）",
          correct: String(y),
          wrongs: mvBad3(y, [a * x, a + x + b, -y, a * x - b, a * b + x]),
          explain: "把 x=" + x + " 代入解析式：f(" + x + ")=" + a + "×(" + x + ")" + bstr + "=" + y + "。",
          level: level
        });
      }
      if (level === 2) {
        var a2 = DZ_V.R(1, 4), b2 = DZ_V.R(-6, 6), c2 = DZ_V.R(-9, 9), x2 = DZ_V.R(-4, 4);
        var y2 = a2 * x2 * x2 + b2 * x2 + c2;
        var a2s = a2 === 1 ? "" : String(a2);
        var b2str = b2 === 0 ? "" : (b2 > 0 ? "+" : "-") + (Math.abs(b2) === 1 ? "" : Math.abs(b2)) + "x";
        var c2str = c2 === 0 ? "" : (c2 > 0 ? "+" + c2 : String(c2));
        return DZ_V.mk({
          topic: "函数",
          stem: "已知 f(x)=" + a2s + "x²" + b2str + c2str + "，则 f(" + x2 + ")=（　）",
          correct: String(y2),
          wrongs: mvBad3(y2, [a2 * x2 * x2, a2 * x2 * x2 + b2 * x2, a2 * x2 * x2 - b2 * x2 + c2, a2 + b2 + c2]),
          explain: "代入得 f(" + x2 + ")=" + (a2 === 1 ? "" : a2 + "×") + "(" + x2 + ")²" + (b2 === 0 ? "" : (b2 > 0 ? "+" + b2 : String(b2)) + "×(" + x2 + ")") + c2str + "=" + y2 + "。",
          level: level
        });
      }
      var k1 = DZ_V.R(1, 5), k2 = DZ_V.R(-6, 6);
      var m = k1 + k2, n = 4 * k1 + k2, f3 = 9 * k1 + k2;
      return DZ_V.mk({
        topic: "函数",
        stem: "已知函数 f(x)=ax²+b 满足 f(1)=" + m + "，f(2)=" + n + "，则 f(3)=（　）",
        correct: String(f3),
        wrongs: mvBad3(f3, [m + n, n + (n - m), k1 + k2, 16 * k1 + k2]),
        explain: "由 a+b=" + m + "、4a+b=" + n + " 相减得 3a=" + (n - m) + "，即 a=" + k1 + "，b=" + k2 + "，所以 f(3)=9a+b=" + f3 + "。",
        level: level
      });
    }
  },

  /* 4. 指数与对数：对数求值 / 运算法则 / 换底 */
  {
    name: "对数运算",
    topic: "指数与对数",
    min: 1, max: 3,
    gen: function (level) {
      if (level === 1) {
        var a = DZ_V.R(2, 6), n = DZ_V.R(2, 4);
        var m = Math.pow(a, n);
        return DZ_V.mk({
          topic: "指数与对数",
          stem: "log" + mvSub(a) + " " + m + " 的值是（　）",
          correct: String(n),
          wrongs: mvBad3(n, [a, n + 1, n - 1, m / a, a + n, n * a]),
          explain: "因为 " + a + " 的 " + n + " 次方等于 " + m + "，所以 log" + mvSub(a) + " " + m + "=" + n + "。",
          level: level
        });
      }
      if (level === 2) {
        var a2 = DZ_V.pick([2, 3]);
        var plus = DZ_V.R(1, 2) === 1;
        var p, q;
        if (plus) { p = DZ_V.R(2, 4); q = DZ_V.R(1, 2); }
        else { p = DZ_V.R(3, 4); q = DZ_V.R(1, p - 1); }
        var m2 = Math.pow(a2, p), n2 = Math.pow(a2, q);
        var correct = plus ? p + q : p - q;
        var wrongs;
        if (plus) wrongs = mvBad3(correct, [p * q, p + q + 1, p - q, a2, m2 + n2]);
        else wrongs = mvBad3(correct, [p + q, p - q - 1, p * q, m2 / n2, a2]);
        return DZ_V.mk({
          topic: "指数与对数",
          stem: "log" + mvSub(a2) + " " + m2 + (plus ? " + " : " - ") + "log" + mvSub(a2) + " " + n2 + " 的值是（　）",
          correct: String(correct),
          wrongs: wrongs,
          explain: "同底对数相" + (plus ? "加" : "减") + "，真数" + (plus ? "相乘" : "相除") + "：原式=log" + mvSub(a2) + "(" + m2 + (plus ? "×" : "÷") + n2 + ")=log" + mvSub(a2) + " " + Math.pow(a2, correct) + "=" + correct + "。",
          level: level
        });
      }
      var a3 = DZ_V.pick([2, 3]);
      var b3 = DZ_V.pick(a3 === 2 ? [3, 4, 5] : [2, 4, 5]);
      var k3 = DZ_V.R(2, 4);
      var c3 = Math.pow(a3, k3);
      return DZ_V.mk({
        topic: "指数与对数",
        stem: "log" + mvSub(a3) + " " + b3 + " × log" + mvSub(b3) + " " + c3 + " 的值是（　）",
        correct: String(k3),
        wrongs: mvBad3(k3, [k3 + 1, k3 - 1, a3 * b3, b3]),
        explain: "由换底公式得原式=log" + mvSub(a3) + " " + c3 + "=" + k3 + "，两个对数相乘时中间的底数正好约去。",
        level: level
      });
    }
  },

  /* 5. 三角函数：特殊角 / 同角关系 / 二倍角 */
  {
    name: "三角函数值",
    topic: "三角函数",
    min: 1, max: 3,
    gen: function (level) {
      var TB = [
        { d: 30, s: "1/2", c: "√3/2", t: "√3/3" },
        { d: 45, s: "√2/2", c: "√2/2", t: "1" },
        { d: 60, s: "√3/2", c: "1/2", t: "√3" },
        { d: 120, s: "√3/2", c: "-1/2", t: "-√3" },
        { d: 135, s: "√2/2", c: "-√2/2", t: "-1" },
        { d: 150, s: "1/2", c: "-√3/2", t: "-√3/3" }
      ];
      if (level === 1) {
        var row = DZ_V.pick(TB);
        var one = DZ_V.pick([["sin", row.s], ["cos", row.c], ["tan", row.t]]);
        var pool = ["1/2", "√3/2", "√2/2", "1", "-1", "-1/2", "-√2/2", "-√3/2", "√3", "-√3", "√3/3", "-√3/3", "0", "2"];
        return DZ_V.mk({
          topic: "三角函数",
          stem: one[0] + " " + row.d + "° 的值是（　）",
          correct: one[1],
          wrongs: mvBad3(one[1], DZ_V.shuffle(pool)),
          explain: row.d + "° 是特殊角，其 " + one[0] + " 值为 " + one[1] + "，可直接由特殊角三角函数值得到。",
          level: level
        });
      }
      var TRI = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];
      var tri = DZ_V.pick(TRI);
      var A = tri[0], B = tri[1], C = tri[2];
      var sinV = A + "/" + C, cosV = B + "/" + C, tanV = A + "/" + B;
      if (level === 2) {
        var pr = DZ_V.pick([["sin", "cos"], ["cos", "sin"], ["sin", "tan"], ["cos", "tan"], ["tan", "sin"], ["tan", "cos"]]);
        var g = pr[0], ask = pr[1];
        var gv = g === "sin" ? sinV : (g === "cos" ? cosV : tanV);
        var av = ask === "sin" ? sinV : (ask === "cos" ? cosV : tanV);
        var cands;
        if (ask === "cos") cands = [sinV, tanV, mvFrac(C - A, C), mvFrac(C, B)];
        else if (ask === "sin") cands = [cosV, tanV, mvFrac(C - B, C), mvFrac(C, A)];
        else cands = [sinV, cosV, mvFrac(B, A), mvFrac(A + B, B)];
        return DZ_V.mk({
          topic: "三角函数",
          stem: "已知 α 为锐角，且 " + g + "α=" + gv + "，则 " + ask + "α=（　）",
          correct: av,
          wrongs: mvBad3(av, cands),
          explain: "由三边 " + A + "、" + B + "、" + C + " 的直角三角形得 " + ask + "α=" + av + "；α 为锐角，各三角函数值均为正。",
          level: level
        });
      }
      var g3 = DZ_V.pick(["sin", "cos", "tan"]);
      var gv3 = g3 === "sin" ? sinV : (g3 === "cos" ? cosV : tanV);
      var s2 = mvFrac(2 * A * B, C * C);
      var cands3 = [mvFrac(B * B - A * A, C * C), mvFrac(A * B, C * C), mvFrac(2 * A, C), mvFrac(2 * A * B, C)];
      return DZ_V.mk({
        topic: "三角函数",
        stem: "已知 α 为锐角，且 " + g3 + "α=" + gv3 + "，则 sin2α=（　）",
        correct: s2,
        wrongs: mvBad3(s2, cands3),
        explain: "先由 " + g3 + "α=" + gv3 + " 得三边 " + A + "、" + B + "、" + C + "，再由 sin2α=2sinαcosα 算得 " + s2 + "。",
        level: level
      });
    }
  },

  /* 6. 数列：等差数列通项 / 前 n 项和 / 由 Sn 求项 */
  {
    name: "等差数列",
    topic: "数列",
    min: 1, max: 3,
    gen: function (level) {
      if (level === 1) {
        var a1 = DZ_V.R(1, 9), d = DZ_V.R(2, 6), n = DZ_V.R(5, 12);
        var an = a1 + (n - 1) * d;
        return DZ_V.mk({
          topic: "数列",
          stem: "等差数列 {aₙ} 中，a₁=" + a1 + "，公差 d=" + d + "，则 a" + mvSub(n) + "=（　）",
          correct: String(an),
          wrongs: mvBad3(an, [a1 + n * d, a1 + (n - 2) * d, a1 * n, a1 + d]),
          explain: "由通项公式得 a" + mvSub(n) + "=a₁+(" + n + "-1)d=" + a1 + "+" + (n - 1) + "×" + d + "=" + an + "。",
          level: level
        });
      }
      if (level === 2) {
        var a12 = DZ_V.R(1, 6), d2 = DZ_V.R(2, 5), n2 = DZ_V.R(6, 10);
        var sn = n2 * a12 + n2 * (n2 - 1) / 2 * d2;
        return DZ_V.mk({
          topic: "数列",
          stem: "等差数列 {aₙ} 中，a₁=" + a12 + "，公差 d=" + d2 + "，则前 " + n2 + " 项和 S" + mvSub(n2) + "=（　）",
          correct: String(sn),
          wrongs: mvBad3(sn, [n2 * a12 + n2 * (n2 - 1) * d2, a12 + (n2 - 1) * d2, n2 * (n2 - 1) / 2 * d2, n2 * a12]),
          explain: "S" + mvSub(n2) + "=" + n2 + "×" + a12 + "+" + n2 + "×(" + n2 + "-1)÷2×" + d2 + "=" + (n2 * a12) + "+" + (n2 * (n2 - 1) / 2 * d2) + "=" + sn + "。",
          level: level
        });
      }
      var A = DZ_V.R(1, 4), B = DZ_V.R(-3, 5), n3 = DZ_V.R(3, 9);
      if (A * (2 * n3 - 1) + B <= 0) B = B + 4;
      var snA = A * n3 * n3 + B * n3;
      var snB = A * (n3 - 1) * (n3 - 1) + B * (n3 - 1);
      var an3 = snA - snB;
      var aTerm = (A === 1 ? "" : String(A)) + "n²";
      var bTerm = B === 0 ? "" : (B > 0 ? "+" + B : String(B)) + "n";
      return DZ_V.mk({
        topic: "数列",
        stem: "已知数列 {aₙ} 的前 n 项和 Sₙ=" + aTerm + bTerm + "，则 a" + mvSub(n3) + "=（　）",
        correct: String(an3),
        wrongs: mvBad3(an3, [snA, snB, A + B, an3 + A]),
        explain: "利用 aₙ=Sₙ-Sₙ₋₁，得 a" + mvSub(n3) + "=S" + mvSub(n3) + "-S" + mvSub(n3 - 1) + "=(" + snA + ")-(" + snB + ")=" + an3 + "。",
        level: level
      });
    }
  },

  /* 7. 数列：等比数列通项 / 前 n 项和 / 两项求第三项 */
  {
    name: "等比数列",
    topic: "数列",
    min: 1, max: 3,
    gen: function (level) {
      var a1 = DZ_V.R(1, 3), q = DZ_V.R(2, 3);
      if (level === 1) {
        var n = DZ_V.R(4, 6);
        var an = a1 * Math.pow(q, n - 1);
        return DZ_V.mk({
          topic: "数列",
          stem: "等比数列 {aₙ} 中，a₁=" + a1 + "，公比 q=" + q + "，则 a" + mvSub(n) + "=（　）",
          correct: String(an),
          wrongs: mvBad3(an, [a1 * Math.pow(q, n), a1 * Math.pow(q, n - 2), a1 + n * q, a1 * (n - 1) * q]),
          explain: "由通项公式得 a" + mvSub(n) + "=a₁q^" + (n - 1) + "=" + a1 + "×" + q + "^" + (n - 1) + "=" + an + "。",
          level: level
        });
      }
      if (level === 2) {
        var n2 = DZ_V.R(4, 5);
        var sn = a1 * (Math.pow(q, n2) - 1) / (q - 1);
        return DZ_V.mk({
          topic: "数列",
          stem: "等比数列 {aₙ} 中，a₁=" + a1 + "，公比 q=" + q + "，则前 " + n2 + " 项和 S" + mvSub(n2) + "=（　）",
          correct: String(sn),
          wrongs: mvBad3(sn, [a1 * (Math.pow(q, n2) - 1), a1 * Math.pow(q, n2), a1 * (Math.pow(q, n2 - 1) - 1) / (q - 1), a1 * n2]),
          explain: "S" + mvSub(n2) + "=a₁(qⁿ-1)/(q-1)=" + a1 + "×(" + q + "^" + n2 + "-1)/(" + q + "-1)=" + sn + "。",
          level: level
        });
      }
      var m = DZ_V.R(1, 3), gap = DZ_V.R(2, 3);
      var npos = m + gap, kpos = npos + gap;
      var am = a1 * Math.pow(q, m - 1);
      var an = a1 * Math.pow(q, npos - 1);
      var ak = a1 * Math.pow(q, kpos - 1);
      return DZ_V.mk({
        topic: "数列",
        stem: "等比数列 {aₙ} 中，a" + mvSub(m) + "=" + am + "，a" + mvSub(npos) + "=" + an + "，则 a" + mvSub(kpos) + "=（　）",
        correct: String(ak),
        wrongs: mvBad3(ak, [an * Math.pow(q, gap - 1), an * Math.pow(q, gap + 1), an * q, an + q * gap]),
        explain: "由 a" + mvSub(npos) + "/a" + mvSub(m) + "=q^" + gap + " 得 q^" + gap + "=" + (an / am) + "，即 q=" + q + "；a" + mvSub(kpos) + "=a" + mvSub(npos) + "×q^" + gap + "=" + an + "×" + Math.pow(q, gap) + "=" + ak + "。",
        level: level
      });
    }
  },

  /* 8. 平面向量：坐标加法 / 数量积 / 垂直求坐标 */
  {
    name: "平面向量运算",
    topic: "平面向量",
    min: 1, max: 3,
    gen: function (level) {
      if (level === 1) {
        var x1 = mvNz(-6, 6), y1 = mvNz(-6, 6), x2 = mvNz(-6, 6), y2 = mvNz(-6, 6);
        var sx = x1 + x2, sy = y1 + y2;
        var ans = "(" + sx + "," + sy + ")";
        return DZ_V.mk({
          topic: "平面向量",
          stem: "已知向量 a=(" + x1 + "," + y1 + ")，b=(" + x2 + "," + y2 + ")，则 a+b=（　）",
          correct: ans,
          wrongs: mvBad3(ans, ["(" + (x1 - x2) + "," + (y1 - y2) + ")", "(" + (x1 * x2) + "," + (y1 * y2) + ")", "(" + sx + "," + (y1 - y2) + ")", "(" + (x1 + y1) + "," + (x2 + y2) + ")"]),
          explain: "向量加法按坐标对应相加：a+b=(" + x1 + "+" + x2 + "," + y1 + "+" + y2 + ")=(" + sx + "," + sy + ")。",
          level: level
        });
      }
      if (level === 2) {
        var u1 = mvNz(-6, 6), v1 = mvNz(-6, 6), u2 = mvNz(-6, 6), v2 = mvNz(-6, 6);
        var dot = u1 * u2 + v1 * v2;
        return DZ_V.mk({
          topic: "平面向量",
          stem: "已知向量 a=(" + u1 + "," + v1 + ")，b=(" + u2 + "," + v2 + ")，则 a·b=（　）",
          correct: String(dot),
          wrongs: mvBad3(dot, [u1 * v2 + v1 * u2, u1 * u2 - v1 * v2, (u1 + u2) * (v1 + v2), u1 + u2 + v1 + v2]),
          explain: "数量积等于对应坐标乘积之和：a·b=(" + u1 + ")×(" + u2 + ")+(" + v1 + ")×(" + v2 + ")=" + dot + "。",
          level: level
        });
      }
      var p = DZ_V.R(1, 6), q = DZ_V.R(1, 6), kk = DZ_V.R(1, 3);
      var bx = q * kk, by = -p * kk;
      return DZ_V.mk({
        topic: "平面向量",
        stem: "已知向量 a=(" + p + "," + q + ")，b=(x," + by + ")，且 a⊥b，则 x=（　）",
        correct: String(bx),
        wrongs: mvBad3(bx, [p * kk, -q * kk, p * q, bx + p]),
        explain: "由 a⊥b 得 a·b=0，即 " + p + "x+" + q + "×(" + by + ")=0，解得 x=" + bx + "。",
        level: level
      });
    }
  },

  /* 9. 直线与圆：斜率 / 点到直线距离 / 圆的半径 */
  {
    name: "直线与圆",
    topic: "直线与圆",
    min: 1, max: 3,
    gen: function (level) {
      if (level === 1) {
        var ax = DZ_V.R(-5, 5), ay = DZ_V.R(-5, 5);
        var dx = mvNz(-5, 5), dy = mvNz(-5, 5);
        var bx = ax + dx, by = ay + dy;
        var kk = mvFrac(dy, dx);
        return DZ_V.mk({
          topic: "直线与圆",
          stem: "已知点 A(" + ax + "," + ay + ")，B(" + bx + "," + by + ")，则直线 AB 的斜率是（　）",
          correct: kk,
          wrongs: mvBad3(kk, [mvFrac(-dy, dx), mvFrac(dy, dx + 1), mvFrac(dy + dx, dx), mvFrac(dx, dy)]),
          explain: "由斜率公式得 k=(y₂-y₁)/(x₂-x₁)=(" + by + "-(" + ay + "))/(" + bx + "-(" + ax + "))=" + kk + "。",
          level: level
        });
      }
      if (level === 2) {
        var C2 = DZ_V.R(-9, 9), px = DZ_V.R(-6, 6), py = DZ_V.R(-6, 6);
        var num = Math.abs(3 * px + 4 * py + C2);
        if (num === 0) { C2 = C2 + 1; num = Math.abs(3 * px + 4 * py + C2); }
        var ds = DZ_V.fmt(num / 5);
        return DZ_V.mk({
          topic: "直线与圆",
          stem: "点 P(" + px + "," + py + ") 到直线 3x+4y" + (C2 >= 0 ? "+" + C2 : String(C2)) + "=0 的距离是（　）",
          correct: ds,
          wrongs: mvBad3(ds, [DZ_V.fmt(num / 25), DZ_V.fmt(num / 7), DZ_V.fmt(num * 5), DZ_V.fmt(-num / 5)]),
          explain: "由点到直线的距离公式得 d=|3×(" + px + ")+4×(" + py + ")" + (C2 >= 0 ? "+" + C2 : String(C2)) + "|/√(3²+4²)=" + num + "/5=" + ds + "。",
          level: level
        });
      }
      var LEGS = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [20, 21, 29], [7, 24, 25]];
      var lg = DZ_V.pick(LEGS);
      var lx = lg[0], ly = lg[1], r = lg[2];
      if (DZ_V.R(1, 2) === 2) lx = -lx;
      if (DZ_V.R(1, 2) === 2) ly = -ly;
      var cx = DZ_V.R(-5, 5), cy = DZ_V.R(-5, 5);
      var px2 = cx + lx, py2 = cy + ly;
      return DZ_V.mk({
        topic: "直线与圆",
        stem: "已知圆 C 的圆心为 (" + cx + "," + cy + ")，且经过点 (" + px2 + "," + py2 + ")，则圆 C 的半径是（　）",
        correct: String(r),
        wrongs: mvBad3(r, [Math.abs(lx) + Math.abs(ly), Math.abs(Math.abs(lx) - Math.abs(ly)), lx * lx + ly * ly, r + 1]),
        explain: "半径等于圆心到 (" + px2 + "," + py2 + ") 的距离：横坐标差 " + Math.abs(lx) + "、纵坐标差 " + Math.abs(ly) + "，故 r=√(" + Math.abs(lx) + "²+" + Math.abs(ly) + "²)=" + r + "。",
        level: level
      });
    }
  },

  /* 10. 概率与统计：古典概型 / 平均数 / 中位数 */
  {
    name: "概率与统计",
    topic: "概率与统计",
    min: 1, max: 3,
    gen: function (level) {
      if (level === 1) {
        var PAIRS = [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [2, 3], [2, 5], [2, 7], [3, 4], [3, 5], [3, 7], [3, 8], [4, 5], [4, 7], [5, 6], [5, 7], [5, 8]];
        var pr = DZ_V.pick(PAIRS);
        var a = pr[0], b = pr[1], tot = a + b;
        return DZ_V.mk({
          topic: "概率与统计",
          stem: "袋中装有 " + a + " 个红球和 " + b + " 个白球，除颜色外完全相同，从中随机摸出 1 个球，则摸到红球的概率是（　）",
          correct: a + "/" + tot,
          wrongs: mvBad3(a + "/" + tot, [b + "/" + tot, a + "/" + b, tot + "/" + a, "1/" + tot]),
          explain: "共有 " + tot + " 个球，其中红球 " + a + " 个，所以摸到红球的概率为 " + a + "/" + tot + "。",
          level: level
        });
      }
      if (level === 2) {
        var nums = [], sum = 0, i;
        for (i = 0; i < 5; i++) {
          var v = DZ_V.R(1, 20);
          nums.push(v);
          sum += v;
        }
        var ms = DZ_V.fmt(sum / 5);
        return DZ_V.mk({
          topic: "概率与统计",
          stem: "数据 " + nums.join(",") + " 的平均数是（　）",
          correct: ms,
          wrongs: mvBad3(ms, [DZ_V.fmt(sum), DZ_V.fmt(sum / 4), DZ_V.fmt((sum + 1) / 5), DZ_V.fmt(sum * 5)]),
          explain: "平均数等于各数之和除以个数：" + nums.join("+") + "=" + sum + "，" + sum + "÷5=" + ms + "。",
          level: level
        });
      }
      var pool2 = [], j;
      for (j = 1; j <= 30; j++) pool2.push(j);
      var picked = DZ_V.shuffle(pool2).slice(0, 5);
      var sorted = picked.slice().sort(function (x, y) { return x - y; });
      var med = sorted[2];
      var msum = 0;
      for (j = 0; j < 5; j++) msum += picked[j];
      return DZ_V.mk({
        topic: "概率与统计",
        stem: "数据 " + picked.join(",") + " 的中位数是（　）",
        correct: String(med),
        wrongs: mvBad3(med, [String(sorted[1]), String(sorted[3]), DZ_V.fmt(msum / 5), String(sorted[0])]),
        explain: "把 5 个数据从小到大排列为 " + sorted.join(",") + "，位于正中间（第 3 个）的 " + med + " 就是中位数。",
        level: level
      });
    }
  },

  /* 11. 立体几何初步：长方体体积 / 圆柱体积 / 外接球表面积 */
  {
    name: "立体几何体积",
    topic: "立体几何初步",
    min: 1, max: 3,
    gen: function (level) {
      if (level === 1) {
        var a = DZ_V.R(2, 9), b = DZ_V.R(2, 9), c = DZ_V.R(2, 9);
        var v = a * b * c;
        return DZ_V.mk({
          topic: "立体几何初步",
          stem: "长方体的长、宽、高分别为 " + a + "、" + b + "、" + c + "，则它的体积是（　）",
          correct: String(v),
          wrongs: mvBad3(v, [2 * (a * b + b * c + c * a), a * b, a + b + c, v * 3]),
          explain: "长方体体积等于长×宽×高：V=" + a + "×" + b + "×" + c + "=" + v + "。",
          level: level
        });
      }
      if (level === 2) {
        var r = DZ_V.R(3, 6), h = DZ_V.R(3, 10);
        var base = r * r * h;
        return DZ_V.mk({
          topic: "立体几何初步",
          stem: "圆柱的底面半径为 " + r + "，高为 " + h + "，则它的体积是（　）",
          correct: base + "π",
          wrongs: mvBad3(base + "π", [(2 * r * h) + "π", (2 * base) + "π", String(base), (r * r) + "π"]),
          explain: "圆柱体积公式为 V=πr²h=π×" + r + "²×" + h + "=" + base + "π。",
          level: level
        });
      }
      if (DZ_V.R(1, 2) === 1) {
        var s = DZ_V.R(2, 9);
        return DZ_V.mk({
          topic: "立体几何初步",
          stem: "棱长为 " + s + " 的正方体的外接球的表面积是（　）",
          correct: (3 * s * s) + "π",
          wrongs: mvBad3((3 * s * s) + "π", [(4 * s * s) + "π", (12 * s * s) + "π", (s * s) + "π", (6 * s * s) + "π"]),
          explain: "正方体外接球的直径等于体对角线 √3a，故 R=(√3/2)a，表面积 S=4πR²=3πa²=" + (3 * s * s) + "π。",
          level: level
        });
      }
      var la = DZ_V.R(2, 9), lb = DZ_V.R(2, 9), lc = DZ_V.R(2, 9);
      var pp = la * la + lb * lb + lc * lc;
      return DZ_V.mk({
        topic: "立体几何初步",
        stem: "长方体的长、宽、高分别为 " + la + "、" + lb + "、" + lc + "，它的外接球的表面积是（　）",
        correct: pp + "π",
        wrongs: mvBad3(pp + "π", [(2 * pp) + "π", (4 * pp) + "π", String(pp), (la * lb * lc) + "π"]),
        explain: "外接球的直径等于体对角线 √(" + la + "²+" + lb + "²+" + lc + "²)，故 R²=(" + la + "²+" + lb + "²+" + lc + "²)/4，表面积 S=4πR²=" + pp + "π。",
        level: level
      });
    }
  }
];
