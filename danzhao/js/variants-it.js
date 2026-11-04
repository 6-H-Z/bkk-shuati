window.DZ_VARIANTS = window.DZ_VARIANTS || {};

/* 信息技术变式题模板（it-var）
   依赖 variants-core.js 的 DZ_V：R / pick / shuffle / mk / fmt
   每个模板 {name, topic, min:1, max:3, gen(level)}；level 1 基础 / 2 进阶 / 3 较难 */

/* 去重干扰项：保证 3 个、互不相同、且不等于正确答案；不足时用数值偏移兜底 */
function dvUq(correct, list) {
  var out = [], cs = String(correct), i, s;
  for (i = 0; i < list.length; i++) {
    s = String(list[i]);
    if (s.indexOf("NaN") >= 0 || s.indexOf("Infinity") >= 0 || s.indexOf("undefined") >= 0) continue;
    if (s !== cs && out.indexOf(s) < 0) out.push(s);
    if (out.length >= 3) return out;
  }
  var n = Number(cs);
  if (!isFinite(n)) n = 0;
  var step = 1;
  while (out.length < 3) {
    var cand = String(n + step * 7);
    if (cand !== cs && out.indexOf(cand) < 0) out.push(cand);
    step++;
  }
  return out;
}

function dvHex(n) { return n.toString(16).toUpperCase(); }
function dvF2(x) { return String(Math.round(x * 100) / 100); }

window.DZ_VARIANTS.it = [

  /* 1. 二进制与十进制互转（数制与编码） */
  {
    name: "二进制与十进制",
    topic: "数制与编码",
    min: 1, max: 3,
    gen: function (level) {
      if (level === 1) {
        var n1 = DZ_V.R(5, 63);
        var b1 = n1.toString(2);
        var r1 = 0, i1;
        for (i1 = 0; i1 < b1.length; i1++) r1 = r1 * 2 + Number(b1.charAt(b1.length - 1 - i1));
        return DZ_V.mk({
          topic: "数制与编码",
          stem: "二进制数 " + b1 + " 转换为十进制数是（　）",
          correct: String(n1),
          wrongs: dvUq(n1, [Number(b1), r1, n1 * 2, n1 - 1, n1 + 1]),
          explain: "二进制按权展开：各位从右往左依次乘 1、2、4、8…，再把各项相加，即 " + b1 + " 等于 " + n1 + "。",
          level: level
        });
      }
      if (level === 2) {
        var n2 = DZ_V.R(20, 255);
        var b2 = n2.toString(2);
        var flip2 = b2.charAt(b2.length - 1) === "1" ? "0" : "1";
        return DZ_V.mk({
          topic: "数制与编码",
          stem: "十进制数 " + n2 + " 转换为二进制数是（　）",
          correct: b2,
          wrongs: dvUq(b2, [dvHex(n2), n2.toString(8), b2.slice(0, -1) + flip2, String(n2), b2 + "0", (n2 + 1).toString(2)]),
          explain: "用除 2 取余法：不断除以 2 并记录余数，直到商为 0，再把余数从下往上排列，得到 " + b2 + "。",
          level: level
        });
      }
      var n3 = DZ_V.R(21, 255);
      var b3 = n3.toString(2);
      var ones3 = 0, i3;
      for (i3 = 0; i3 < b3.length; i3++) if (b3.charAt(i3) === "1") ones3++;
      return DZ_V.mk({
        topic: "数制与编码",
        stem: "十进制数 " + n3 + " 写成二进制后，数字 1 出现的次数是（　）",
        correct: String(ones3),
        wrongs: dvUq(ones3, [ones3 + 1, ones3 - 1, b3.length - ones3, b3.length, ones3 + 2]),
        explain: "先除 2 取余把 " + n3 + " 转成二进制 " + b3 + "，再数其中 1 的个数，共 " + ones3 + " 个。",
        level: level
      });
    }
  },

  /* 2. 十进制与十六进制互转（数制与编码） */
  {
    name: "十进制与十六进制",
    topic: "数制与编码",
    min: 1, max: 3,
    gen: function (level) {
      if (level === 1) {
        var n1 = DZ_V.R(26, 255);
        var h1 = dvHex(n1);
        var d1 = 0, i1;
        for (i1 = 0; i1 < h1.length; i1++) d1 = d1 * 10 + "0123456789ABCDEF".indexOf(h1.charAt(i1));
        return DZ_V.mk({
          topic: "数制与编码",
          stem: "十六进制数 " + h1 + " 转换为十进制数是（　）",
          correct: String(n1),
          wrongs: dvUq(n1, [d1, n1 + 16, n1 - 16, n1 * 2, n1 + 1]),
          explain: "十六进制按权展开：A~F 分别表示 10~15，各位从右往左乘 1、16、256…，相加得 " + n1 + "。",
          level: level
        });
      }
      if (level === 2) {
        var n2 = DZ_V.R(30, 400);
        var h2 = dvHex(n2);
        var last2 = h2.charAt(h2.length - 1);
        var alt2 = "0123456789ABCDEF".charAt(("0123456789ABCDEF".indexOf(last2) + 1) % 16);
        var wr2 = [String(n2), n2.toString(8), h2.slice(0, -1) + alt2, dvHex(n2 + 16), dvHex(n2 - 16)];
        var rev2 = h2.split("").reverse().join("");
        if (rev2.charAt(0) !== "0") wr2.push(rev2);
        return DZ_V.mk({
          topic: "数制与编码",
          stem: "十进制数 " + n2 + " 转换为十六进制数是（　）",
          correct: h2,
          wrongs: dvUq(h2, wr2),
          explain: "用除 16 取余法：反复除以 16 记录余数（10~15 记作 A~F），余数从下往上排列，得到 " + h2 + "。",
          level: level
        });
      }
      var a3 = DZ_V.R(16, 127), b3 = DZ_V.R(16, 127);
      var ha3 = dvHex(a3), hb3 = dvHex(b3);
      var sum3 = a3 + b3, hs3 = dvHex(sum3);
      var wr3 = [String(sum3), dvHex(sum3 + 1), dvHex(sum3 - 1), dvHex(sum3 + 16)];
      var rev3 = hs3.split("").reverse().join("");
      if (rev3.charAt(0) !== "0") wr3.push(rev3);
      return DZ_V.mk({
        topic: "数制与编码",
        stem: "十六进制数 " + ha3 + " 与 " + hb3 + " 相加，结果用十六进制表示为（　）",
        correct: hs3,
        wrongs: dvUq(hs3, wr3),
        explain: ha3 + " 即 " + a3 + "，" + hb3 + " 即 " + b3 + "，和为 " + sum3 + "，再除 16 取余转成十六进制 " + hs3 + "。",
        level: level
      });
    }
  },

  /* 3. 存储容量换算（计算机基础） */
  {
    name: "存储容量换算",
    topic: "计算机基础",
    min: 1, max: 3,
    gen: function (level) {
      if (level === 1) {
        var n1 = DZ_V.R(2, 16);
        var k1 = n1 * 1024;
        return DZ_V.mk({
          topic: "计算机基础",
          stem: "一个文件大小为 " + n1 + " MB，相当于（　）KB",
          correct: String(k1),
          wrongs: dvUq(k1, [n1 * 1000, n1 * 1024 * 1024, n1, n1 * 512]),
          explain: "1 MB = 1024 KB，所以 " + n1 + " MB = " + n1 + "×1024 = " + k1 + " KB。",
          level: level
        });
      }
      if (level === 2) {
        var dir = DZ_V.R(1, 2);
        if (dir === 1) {
          var g2 = DZ_V.R(2, 16);
          var m2 = g2 * 1024;
          return DZ_V.mk({
            topic: "计算机基础",
            stem: "一块容量为 " + g2 + " GB 的硬盘，相当于（　）MB",
            correct: String(m2),
            wrongs: dvUq(m2, [g2 * 1000, g2 * 1024 * 1024, g2, g2 * 512]),
            explain: "1 GB = 1024 MB，所以 " + g2 + " GB = " + g2 + "×1024 = " + m2 + " MB。",
            level: level
          });
        }
        var s2 = DZ_V.R(2, 20);
        var b2 = s2 * 1024;
        return DZ_V.mk({
          topic: "计算机基础",
          stem: "容量 " + s2 + " KB 的存储空间等于（　）字节",
          correct: String(b2),
          wrongs: dvUq(b2, [s2 * 1000, s2 * 1024 * 1024, s2, s2 * 512]),
          explain: "1 KB = 1024 B，所以 " + s2 + " KB = " + s2 + "×1024 = " + b2 + " 字节。",
          level: level
        });
      }
      var c3 = DZ_V.pick([8, 16, 32, 64]);
      var p3 = DZ_V.pick([2, 4, 8, 16]);
      var cnt3 = c3 * 1024 / p3;
      return DZ_V.mk({
        topic: "计算机基础",
        stem: "一个 " + c3 + " GB 的 U 盘，每张照片约 " + p3 + " MB，最多可存储（　）张照片",
        correct: String(cnt3),
        wrongs: dvUq(cnt3, [c3 * 1000 / p3, c3 * 1024, c3 * 1024 * p3, c3 / p3]),
        explain: c3 + " GB 合 " + (c3 * 1024) + " MB，再除以每张 " + p3 + " MB，得 " + cnt3 + " 张。",
        level: level
      });
    }
  },

  /* 4. ASCII 码推算（数制与编码） */
  {
    name: "ASCII 码推算",
    topic: "数制与编码",
    min: 1, max: 3,
    gen: function (level) {
      if (level === 1) {
        var o1 = DZ_V.R(2, 25);
        var ch1 = String.fromCharCode(65 + o1);
        return DZ_V.mk({
          topic: "数制与编码",
          stem: "已知大写字母 A 的 ASCII 码是 65，则大写字母 " + ch1 + " 的 ASCII 码是（　）",
          correct: String(65 + o1),
          wrongs: dvUq(65 + o1, [65 - o1, 64 + o1, 66 + o1, 97 + o1]),
          explain: "大写字母按顺序编码，A=65、B=66…从 A 往后数 " + o1 + " 个字母，编码为 65+" + o1 + "=" + (65 + o1) + "。",
          level: level
        });
      }
      if (level === 2) {
        var o2 = DZ_V.R(2, 25);
        var ch2 = String.fromCharCode(97 + o2);
        return DZ_V.mk({
          topic: "数制与编码",
          stem: "已知小写字母 a 的 ASCII 码是 97，则小写字母 " + ch2 + " 的 ASCII 码是（　）",
          correct: String(97 + o2),
          wrongs: dvUq(97 + o2, [65 + o2, 96 + o2, 98 + o2, 97 - o2]),
          explain: "小写字母按顺序编码，a=97、b=98…从 a 往后数 " + o2 + " 个字母，编码为 97+" + o2 + "=" + (97 + o2) + "。",
          level: level
        });
      }
      var o3 = DZ_V.R(1, 25);
      var ch3 = String.fromCharCode(97 + o3);
      var dec3 = 97 + o3;
      var hx3 = dvHex(dec3);
      var wr3 = [(65 + o3).toString(16).toUpperCase(), String(dec3), dvHex(dec3 + 1), dvHex(dec3 - 1)];
      return DZ_V.mk({
        topic: "数制与编码",
        stem: "已知 A 的 ASCII 码是 65，小写字母比对应大写字母大 32。小写字母 " + ch3 + " 的 ASCII 码用十六进制表示是（　）",
        correct: hx3,
        wrongs: dvUq(hx3, wr3),
        explain: "对应大写的码是 " + (65 + o3) + "，小写再加 32 得 " + dec3 + "，把 " + dec3 + " 转十六进制为 " + hx3 + "。",
        level: level
      });
    }
  },

  /* 5. Excel 求和与平均（Excel） */
  {
    name: "Excel 求和平均",
    topic: "Excel",
    min: 1, max: 3,
    gen: function (level) {
      if (level === 1) {
        var a1 = DZ_V.R(5, 99), b1 = DZ_V.R(5, 99), c1 = DZ_V.R(5, 99), d1 = DZ_V.R(5, 99);
        var s1 = a1 + b1 + c1 + d1;
        return DZ_V.mk({
          topic: "Excel",
          stem: "Excel 中 A1:A4 的值依次为 " + a1 + "、" + b1 + "、" + c1 + "、" + d1 + "，公式 =SUM(A1:A4) 的结果是（　）",
          correct: String(s1),
          wrongs: dvUq(s1, [s1 - a1, s1 - d1, s1 + a1, dvF2(s1 / 4), a1 * b1]),
          explain: "SUM 函数把区域内的数相加：" + a1 + "+" + b1 + "+" + c1 + "+" + d1 + "=" + s1 + "。",
          level: level
        });
      }
      if (level === 2) {
        var x2 = DZ_V.R(5, 35), y2 = DZ_V.R(5, 35), z2 = DZ_V.R(5, 35);
        var low2 = Math.ceil((x2 + y2 + z2 + 5) / 4);
        var high2 = Math.floor((x2 + y2 + z2 + 99) / 4);
        var t2 = DZ_V.R(low2, high2);
        var w2 = 4 * t2 - x2 - y2 - z2;
        var sum2 = x2 + y2 + z2 + w2;
        return DZ_V.mk({
          topic: "Excel",
          stem: "Excel 中 B1:B4 的值依次为 " + x2 + "、" + y2 + "、" + z2 + "、" + w2 + "，公式 =AVERAGE(B1:B4) 的结果是（　）",
          correct: String(t2),
          wrongs: dvUq(t2, [sum2, t2 + 1, t2 - 1, t2 * 2]),
          explain: "四个数之和为 " + sum2 + "，AVERAGE 即总和除以个数 4，" + sum2 + "÷4=" + t2 + "。",
          level: level
        });
      }
      var a3 = DZ_V.R(10, 35), b3 = DZ_V.R(10, 35), c3 = DZ_V.R(10, 35), d3 = DZ_V.R(10, 35);
      var low3 = Math.ceil((a3 + b3 + c3 + d3 + 5) / 5);
      var high3 = Math.floor((a3 + b3 + c3 + d3 + 99) / 5);
      var t3 = DZ_V.R(low3, high3);
      var e3 = 5 * t3 - a3 - b3 - c3 - d3;
      var sum3 = 5 * t3;
      var ans3 = sum3 - t3;
      return DZ_V.mk({
        topic: "Excel",
        stem: "Excel 中 C1:C5 的值依次为 " + a3 + "、" + b3 + "、" + c3 + "、" + d3 + "、" + e3 + "，公式 =SUM(C1:C5)-AVERAGE(C1:C5) 的结果是（　）",
        correct: String(ans3),
        wrongs: dvUq(ans3, [sum3, t3, sum3 + t3, ans3 - t3]),
        explain: "五个数之和为 " + sum3 + "，平均数为 " + t3 + "，两者相减 " + sum3 + "-" + t3 + "=" + ans3 + "。",
        level: level
      });
    }
  },

  /* 6. 网络速率换算（网络与Internet） */
  {
    name: "网络速率换算",
    topic: "网络与Internet",
    min: 1, max: 3,
    gen: function (level) {
      if (level === 1) {
        var bw1 = DZ_V.pick([40, 50, 80, 100, 150, 200, 300, 400, 500, 600, 800, 1000]);
        var k1 = dvF2(bw1 / 8);
        return DZ_V.mk({
          topic: "网络与Internet",
          stem: "某宽带标称速率为 " + bw1 + " Mbps，理论最大下载速度约为（　）MB/s",
          correct: k1,
          wrongs: dvUq(k1, [String(bw1), dvF2(bw1 * 8), dvF2(bw1 / 4), dvF2(bw1 / 2), dvF2(bw1 / 16)]),
          explain: "1 字节等于 8 位，所以 " + bw1 + " Mbps = " + bw1 + "÷8 = " + k1 + " MB/s。",
          level: level
        });
      }
      if (level === 2) {
        var k2 = DZ_V.pick([5, 10, 20, 25]);
        var bw2 = k2 * 8;
        var t2 = DZ_V.R(5, 60);
        var sz2 = k2 * t2;
        return DZ_V.mk({
          topic: "网络与Internet",
          stem: "在 " + bw2 + " Mbps 的带宽下，理论上传完一个 " + sz2 + " MB 的文件需要（　）秒",
          correct: String(t2),
          wrongs: dvUq(t2, [dvF2(sz2 / bw2), sz2 * 8, t2 * 8, t2 * 4]),
          explain: "文件 " + sz2 + " MB 合 " + (sz2 * 8) + " Mbit，再除以速率 " + bw2 + " Mbps，得 " + t2 + " 秒。",
          level: level
        });
      }
      var k3 = DZ_V.pick([5, 10, 20, 25]);
      var bw3 = k3 * 8;
      var t3 = DZ_V.R(5, 40);
      var rest3 = k3 * t3;
      var done3 = k3 * DZ_V.R(10, 60);
      var all3 = rest3 + done3;
      return DZ_V.mk({
        topic: "网络与Internet",
        stem: "带宽 " + bw3 + " Mbps，正在下载 " + all3 + " MB 的文件，已下载 " + done3 + " MB。剩余部分理论上还需（　）秒",
        correct: String(t3),
        wrongs: dvUq(t3, [done3 / k3, all3 / k3, t3 * 8, dvF2(rest3 / bw3), t3 + 1]),
        explain: "剩余 " + rest3 + " MB 合 " + (rest3 * 8) + " Mbit，除以 " + bw3 + " Mbps，得 " + t3 + " 秒。",
        level: level
      });
    }
  },

  /* 7. 图像文件大小估算（计算机基础） */
  {
    name: "图像大小估算",
    topic: "计算机基础",
    min: 1, max: 3,
    gen: function (level) {
      var res = DZ_V.pick([[320, 240], [640, 480], [800, 600], [1024, 600], [1024, 768], [1280, 720], [1280, 800], [1280, 1024], [1366, 768], [1440, 900], [1600, 900], [1920, 1080], [2560, 1440], [3840, 2160]]);
      var W = res[0], H = res[1];
      if (level === 1) {
        var raw1 = W * H * 3;
        var mb1 = raw1 / 1048576;
        return DZ_V.mk({
          topic: "计算机基础",
          stem: "一幅 " + W + "×" + H + " 像素的 24 位真彩色图像，未压缩时大小约为（　）MB",
          correct: dvF2(mb1),
          wrongs: dvUq(dvF2(mb1), [dvF2(raw1 / 1024), dvF2(W * H / 1048576), dvF2(mb1 * 8), dvF2(mb1 / 8)]),
          explain: "24 位真彩色每像素占 3 字节：" + W + "×" + H + "×3=" + raw1 + " 字节，再除以 1024×1024 得约 " + dvF2(mb1) + " MB。",
          level: level
        });
      }
      if (level === 2) {
        var bytes2 = W * H;
        var kb2 = bytes2 / 1024;
        return DZ_V.mk({
          topic: "计算机基础",
          stem: "一幅 " + W + "×" + H + " 像素的 256 色图像，未压缩时大小约为（　）KB",
          correct: dvF2(kb2),
          wrongs: dvUq(dvF2(kb2), [dvF2(bytes2 * 3 / 1024), dvF2(kb2 * 8), dvF2(bytes2 / 1048576), dvF2(bytes2 / 1000)]),
          explain: "256 色即 8 位，每像素占 1 字节：" + W + "×" + H + "=" + bytes2 + " 字节，除以 1024 得约 " + dvF2(kb2) + " KB。",
          level: level
        });
      }
      var ratio = DZ_V.pick([4, 8, 10, 16, 20, 32]);
      var raw3 = W * H * 3;
      var mbRaw = raw3 / 1048576;
      var mb3 = raw3 / ratio / 1048576;
      return DZ_V.mk({
        topic: "计算机基础",
        stem: "一幅 " + W + "×" + H + " 像素的 24 位真彩色图像，若按 " + ratio + ":1 压缩，压缩后大小约为（　）MB",
        correct: dvF2(mb3),
        wrongs: dvUq(dvF2(mb3), [dvF2(mbRaw), dvF2(raw3 / ratio / 1024), String(raw3), dvF2(mbRaw * ratio)]),
        explain: "未压缩为 " + W + "×" + H + "×3=" + raw3 + " 字节约 " + dvF2(mbRaw) + " MB，压缩比 " + ratio + ":1 即再除以 " + ratio + "，得约 " + dvF2(mb3) + " MB。",
        level: level
      });
    }
  },

  /* 8. Python 表达式输出（算法与Python） */
  {
    name: "Python 表达式",
    topic: "算法与Python",
    min: 1, max: 3,
    gen: function (level) {
      if (level === 1) {
        var a1 = DZ_V.R(10, 99), b1 = DZ_V.R(2, 9);
        var f1 = DZ_V.R(1, 3);
        if (f1 === 1) {
          var q1 = Math.floor(a1 / b1);
          return DZ_V.mk({
            topic: "算法与Python",
            stem: "Python 表达式 " + a1 + " // " + b1 + " 的值是（　）",
            correct: String(q1),
            wrongs: dvUq(q1, [dvF2(a1 / b1), a1 % b1, q1 + 1, q1 - 1, b1]),
            explain: "// 是整除运算符，只取商的整数部分：" + a1 + "÷" + b1 + " 的整数商为 " + q1 + "，余数为 " + (a1 % b1) + "。",
            level: level
          });
        }
        if (f1 === 2) {
          var m1 = a1 % b1;
          return DZ_V.mk({
            topic: "算法与Python",
            stem: "Python 表达式 " + a1 + " % " + b1 + " 的值是（　）",
            correct: String(m1),
            wrongs: dvUq(m1, [Math.floor(a1 / b1), dvF2(a1 / b1), a1 - b1, b1 - m1, m1 + 1]),
            explain: "% 是求余运算符：" + a1 + "÷" + b1 + " 的商是 " + Math.floor(a1 / b1) + "、余数是 " + m1 + "，所以结果为 " + m1 + "。",
            level: level
          });
        }
        var a2 = DZ_V.R(2, 9), b2 = DZ_V.R(2, 3);
        var p1 = Math.pow(a2, b2);
        return DZ_V.mk({
          topic: "算法与Python",
          stem: "Python 表达式 " + a2 + " ** " + b2 + " 的值是（　）",
          correct: String(p1),
          wrongs: dvUq(p1, [a2 * b2, a2 + b2, a2 * a2 * b2, p1 - a2, p1 + a2]),
          explain: "** 是乘方运算符：" + a2 + " 的 " + b2 + " 次方，即 " + b2 + " 个 " + a2 + " 相乘，结果是 " + p1 + "。",
          level: level
        });
      }
      if (level === 2) {
        var x2 = DZ_V.R(2, 9), y2 = DZ_V.R(2, 9), z2 = DZ_V.R(2, 9);
        var f2 = DZ_V.R(1, 4);
        if (f2 === 1) {
          var k1 = x2 + y2 * z2;
          return DZ_V.mk({
            topic: "算法与Python",
            stem: "Python 表达式 " + x2 + " + " + y2 + " * " + z2 + " 的值是（　）",
            correct: String(k1),
            wrongs: dvUq(k1, [(x2 + y2) * z2, x2 + y2 + z2, x2 * y2 + z2, x2 * y2 * z2, k1 + 1]),
            explain: "乘法优先于加法：" + y2 + "×" + z2 + "=" + (y2 * z2) + "，再加 " + x2 + "，得 " + k1 + "。",
            level: level
          });
        }
        if (f2 === 2) {
          var k2 = (x2 + y2) * z2;
          return DZ_V.mk({
            topic: "算法与Python",
            stem: "Python 表达式 (" + x2 + " + " + y2 + ") * " + z2 + " 的值是（　）",
            correct: String(k2),
            wrongs: dvUq(k2, [x2 + y2 * z2, x2 + y2 + z2, x2 * y2 + z2, k2 + z2]),
            explain: "括号优先：" + x2 + "+" + y2 + "=" + (x2 + y2) + "，再乘以 " + z2 + "，得 " + k2 + "。",
            level: level
          });
        }
        if (f2 === 3) {
          var z3 = DZ_V.R(2, x2 * y2);
          var k3 = x2 * y2 - z3;
          return DZ_V.mk({
            topic: "算法与Python",
            stem: "Python 表达式 " + x2 + " * " + y2 + " - " + z3 + " 的值是（　）",
            correct: String(k3),
            wrongs: dvUq(k3, [x2 * (y2 + z3), x2 * y2 + z3, k3 + z3, k3 + 1]),
            explain: "先算乘法 " + x2 + "×" + y2 + "=" + (x2 * y2) + "，再减去 " + z3 + "，得 " + k3 + "。",
            level: level
          });
        }
        var k4 = x2 * x2 + y2;
        return DZ_V.mk({
          topic: "算法与Python",
          stem: "Python 表达式 " + x2 + " ** 2 + " + y2 + " 的值是（　）",
          correct: String(k4),
          wrongs: dvUq(k4, [(x2 + y2) * (x2 + y2), x2 * 2 + y2, x2 * x2 * y2, k4 - x2]),
          explain: "先算乘方 " + x2 + " 的平方得 " + (x2 * x2) + "，再加 " + y2 + "，得 " + k4 + "。",
          level: level
        });
      }
      var f3 = DZ_V.R(1, 3);
      if (f3 === 1) {
        var n1 = DZ_V.R(5, 20);
        var sum1 = n1 * (n1 + 1) / 2;
        return DZ_V.mk({
          topic: "算法与Python",
          stem: "执行代码 s = 0；for i in range(1, " + (n1 + 1) + "): s = s + i；print(s)。输出结果是（　）",
          correct: String(sum1),
          wrongs: dvUq(sum1, [n1 * n1, n1 * (n1 + 1), sum1 - n1, sum1 + n1]),
          explain: "range(1, " + (n1 + 1) + ") 产生 1~" + n1 + "，累加和为 " + n1 + "×" + (n1 + 1) + "÷2 = " + sum1 + "。",
          level: level
        });
      }
      if (f3 === 2) {
        var m3 = DZ_V.R(3, 12);
        var odd3 = m3 * m3;
        return DZ_V.mk({
          topic: "算法与Python",
          stem: "执行代码 s = 0；for i in range(1, " + (2 * m3) + ", 2): s = s + i；print(s)。输出结果是（　）",
          correct: String(odd3),
          wrongs: dvUq(odd3, [m3 * (m3 + 1), odd3 + m3, odd3 - 1, m3 * (m3 - 1)]),
          explain: "range(1, " + (2 * m3) + ", 2) 产生 1、3、…、" + (2 * m3 - 1) + " 共 " + m3 + " 个奇数，和为 " + odd3 + "。",
          level: level
        });
      }
      var n4 = DZ_V.R(3, 7);
      var fac = 1, i4;
      for (i4 = 2; i4 <= n4; i4++) fac = fac * i4;
      return DZ_V.mk({
        topic: "算法与Python",
        stem: "执行代码 s = 1；for i in range(1, " + (n4 + 1) + "): s = s * i；print(s)。输出结果是（　）",
        correct: String(fac),
        wrongs: dvUq(fac, [fac + n4, fac * n4, fac / n4, fac - n4]),
        explain: "循环让 s 依次乘 1、2、…、" + n4 + "，即 " + n4 + " 的阶乘，结果为 " + fac + "。",
        level: level
      });
    }
  }

];
