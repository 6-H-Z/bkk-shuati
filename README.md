# 备考刷题站（GitHub Pages 发布目录）

线上地址：https://6-h-z.github.io/bkk-shuati/

## 两个分区

| 分区 | 谁用 | 内容 | 路径 |
|---|---|---|---|
| **1 区** | 媛媛 | 四川单招 2027：数学 / 英语 / 信息技术 / 通用技术，440 题 + 考点速记 | `danzhao/` |
| **2 区** | 我 | 自考本科四科 1018 题 + 简答题背诵（`zikao/`）；二建机电知识卡（`erjian/`） | `zikao/`、`erjian/` |

- 根目录 `index.html`：分区首页（手机上打开就是选 1 区 / 2 区）。
- `简答题背诵.html`：旧地址，自动跳到 `zikao/简答题背诵.html`（老链接不失效）。

## 怎么发布

**不要手动拖文件、也不要用 GitHub Desktop 推了**，统一用脚本：

```powershell
pwsh -File E:\Users\31202\Desktop\deeh\04_工具\网站发布\publish.ps1
```

脚本走 GitHub Git Data API，一个 commit 发完默认清单（分区首页、2 区、1 区、README），
30~90 秒后线上更新。只发某几个文件用 `-Files a.html,b.html`，删文件用 `-Delete old.html`。

- 1 区的 `danzhao/index.html`、`danzhao/bank/data.js` 是 `02_考试/单招2027/脚本/build.py` 生成的，别在这里手改。
- 2 区的 `zikao/index.html` 是 `02_考试/本科自考/本科刷题工具.html` 的发布副本，改源头再复制过来。
- 本目录里的 `.git` 是早期用 GitHub Desktop 时留下的，**已过时**，不要再用它 commit/push。

## 注意

- 两区的做题进度都存在各自浏览器（localStorage），服务器上没有数据。
- 1 区题目为自编练习，不是官方真题。
