/* ============================================================
 * check.js — 内容审核闸门（零依赖，仅本地运行，不参与站点加载）
 * 用法：node check.js
 * 退出码：0 = 无 FAIL；1 = 存在 FAIL（禁止进入发布流程）
 * 覆盖：双语完整性 / id 唯一 / 三段结构 / 审核状态与留痕 /
 *       引用建议标注 / 警示清单 / 媒体字段 / UI 硬编码数字 / 自测分值 /
 *       L0–L3 内容结构 / 等级与计划对齐 / 内容互链 / 站内链接可达
 * ============================================================ */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const read = (f) => fs.readFileSync(path.join(__dirname, f), "utf8");
const contentSrc = read("content.js");
const CONTENT = vm.runInNewContext(contentSrc + ";CONTENT", {});
const APP = read("app.js");
const PAGES = ["index.html", "strokes.html", "stroke.html", "safety.html", "levels.html",
  "basics.html", "training.html", "advanced.html",
  "stroke-breaststroke.html", "stroke-freestyle.html", "stroke-backstroke.html", "stroke-butterfly.html"];
const HTML = PAGES.map(read).join("\n");
const policy = CONTENT.reviewPolicy || {};

const fails = [], warns = [], oks = [];
const fail = (m) => fails.push(m);
const warn = (m) => warns.push(m);
const ok = (m) => oks.push(m);
const nonEmpty = (v) => typeof v === "string" && v.trim().length > 0;

/* 1. 双语完整性：递归检查所有 {zh, en} 字段 */
const biErrors = [];
(function walk(node, trail) {
  if (!node || typeof node !== "object") return;
  if ("zh" in node || "en" in node) {
    if (!nonEmpty(node.zh) || !nonEmpty(node.en)) biErrors.push(trail);
  }
  Object.keys(node).forEach((k) => walk(node[k], trail + "." + k));
})(CONTENT, "CONTENT");
biErrors.length
  ? fail("双语字段缺失或为空：" + biErrors.join(", "))
  : ok("双语字段 zh/en 全部非空");

/* 2. id 唯一 + 数据模型预留字段 */
["safety", "strokes", "levels"].forEach((key) => {
  const ids = CONTENT[key].map((x) => x.id);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  dup.length ? fail(key + " 存在重复 id：" + dup.join(", ")) : ok(key + " id 唯一（" + ids.length + " 条）");
});
const noLevel = CONTENT.safety.filter((e) => !e.level).length;
noLevel ? fail("安全条目 " + noLevel + " 条缺 level 字段（方案 B 迁移预留）")
        : ok("安全条目 level 字段齐全（" + CONTENT.safety.length + " 条）");

/* 3. 审核闸门：状态真实、三段结构、终审留痕 */
const CATS = ["venue", "contraindication", "emergency", "child", "gear"];
const gateErrors = [];
CONTENT.safety.forEach((e) => {
  if (typeof e.reviewed !== "boolean") gateErrors.push(e.id + ": reviewed 非布尔值");
  if (!e.source || !nonEmpty(e.source.zh) || !nonEmpty(e.source.en)) gateErrors.push(e.id + ": source 双语缺失");
  if (CATS.indexOf(e.category) < 0) gateErrors.push(e.id + ": 未知分类 " + e.category);
  ["title", "risk", "prevention", "emergency"].forEach((k) => {
    if (!e[k]) gateErrors.push(e.id + ": 缺字段 " + k);
  });
  if (e.reviewed === true) {
    const r = e.review || {}, s = e.sourceRef || {};
    ["reviewer", "date"].forEach((k) => {
      if (!nonEmpty(r[k])) gateErrors.push(e.id + ": 标为已审但缺 review." + k);
    });
    ["org", "doc", "url", "checkedAt"].forEach((k) => {
      if (!nonEmpty(s[k])) gateErrors.push(e.id + ": 标为已审但缺 sourceRef." + k);
    });
  }
});
gateErrors.length
  ? fail("审核闸门未过：\n    - " + gateErrors.join("\n    - "))
  : ok(CONTENT.safety.length + " 条三段结构/分类/引用建议齐全，未审条目未伪造留痕");

/* 4. 全站审核状态 */
const approvedCount = CONTENT.safety.filter((e) => e.reviewed === true).length;
if (!nonEmpty(policy.asOf)) fail("reviewPolicy.asOf（核对日期）为空");
if (["draft", "in_review", "approved"].indexOf(policy.status) < 0) fail("reviewPolicy.status 非法");
["summary", "sourceRule", "caveatNote"].forEach((k) => {
  if (!policy[k] || !nonEmpty(policy[k].zh) || !nonEmpty(policy[k].en)) fail("reviewPolicy." + k + " 双语缺失");
});
if (policy.status === "approved") {
  if (approvedCount !== CONTENT.safety.length) fail("全站标为 approved，但仍有条目未终审");
  if (!nonEmpty(policy.owner)) fail("全站标为 approved，但 reviewPolicy.owner 为空");
  ok("全站已终审且负责人留痕");
} else {
  ok("全站状态 " + policy.status + "（" + approvedCount + "/" + CONTENT.safety.length + " 条已终审），对外不得宣称已审核");
}

/* 5. 引用建议必须明确标注「未核实」，防止伪造出处 */
const suspicious = CONTENT.safety.filter((e) => e.reviewed !== true &&
  !/需|待|建议|未核实|required|suggested|pending/i.test(e.source.zh + " " + e.source.en)).map((e) => e.id);
suspicious.length
  ? warn("以下未审条目的 source 未标注待核/建议语气，可能被误读为已核实出处：" + suspicious.join(", "))
  : ok("未审条目的 source 均标注为待终审的引用建议");

/* 6. 数值 / 急救操作警示清单 */
const ids = CONTENT.safety.map((e) => e.id);
const badCaveat = (policy.caveatIds || []).filter((id) => ids.indexOf(id) < 0);
badCaveat.length ? fail("caveatIds 含不存在的 id：" + badCaveat.join(", "))
                 : ok("警示清单 id 有效（" + (policy.caveatIds || []).length + " 条）");
const RISK_RE = /(\d+\s*(小时|分钟|秒|°C|岁|米|%))|心肺复苏|CPR|冰敷|热糖水|拍背|轻拍/;
const uncovered = CONTENT.safety.filter((e) =>
  RISK_RE.test([e.risk.zh, e.prevention.zh, e.emergency.zh].join(" ")) &&
  (policy.caveatIds || []).indexOf(e.id) < 0).map((e) => e.id);
uncovered.length
  ? warn("含数值/急救表述但未列入 caveatIds，请人工确认：" + uncovered.join(", "))
  : ok("数值 / 急救表述条目均已覆盖警示");

/* 7. 媒体字段完整 */
const mediaErrors = [];
CONTENT.strokes.forEach((s) => {
  if (!Array.isArray(s.videos) || !s.videos.length) mediaErrors.push(s.id + ": videos 为空");
  (s.videos || []).forEach((v, i) => {
    ["bvid", "pic", "title", "up", "min", "like", "collect"].forEach((k) => {
      if (v[k] === undefined || v[k] === "") mediaErrors.push(s.id + ".videos[" + i + "] 缺 " + k);
    });
    if (!v.label || !nonEmpty(v.label.zh) || !nonEmpty(v.label.en)) mediaErrors.push(s.id + ".videos[" + i + "] label 双语缺失");
    if (v.pic && !/^https:\/\//.test(v.pic)) mediaErrors.push(s.id + ".videos[" + i + "] pic 非 https");
  });
});
mediaErrors.length ? fail("媒体字段：\n    - " + mediaErrors.join("\n    - ")) : ok("视频字段与 https 封面齐全");

/* 8. 数量/日期动态化：无残留硬编码，占位符与 fill() 必须存在 */
const claims = [];
let m;
const claimRe = /(\d+)\s*(?:条|entries)/g;
while ((m = claimRe.exec(APP + contentSrc)) !== null) claims.push(Number(m[1]));
const wrong = claims.filter((n) => n !== CONTENT.safety.length);
wrong.length ? fail("UI/文案中的条目数与数据不符：" + wrong.join(", ") + " != " + CONTENT.safety.length)
             : ok(claims.length
                 ? "UI 硬编码条目数与数据一致（" + CONTENT.safety.length + "，" + claims.length + " 处）"
                 : "UI 文案无硬编码条目数，由 {n} 动态注入（" + CONTENT.safety.length + " 条）");

const placeholders = (APP + contentSrc).match(/\{(?:n|date)\}/g) || [];
placeholders.length >= 8 ? ok("动态数量/日期占位符已覆盖文案（" + placeholders.length + " 处）")
                         : fail("动态文案占位符不足，数量或日期可能再次写死");
APP.indexOf("function fill(") >= 0 ? ok("渲染层提供 fill() 动态替换")
                                   : fail("缺少 fill() 动态替换函数");

const dynamicKeys = [];
const uiBlock = APP.match(/const UI = \{[\s\S]*?\n\};/);
if (uiBlock) {
  uiBlock[0].split("\n").forEach((line) => {
    const km = line.match(/^\s{2}(\w+):/);
    if (km && /\{(?:n|date)\}/.test(line)) dynamicKeys.push(km[1]);
  });
}
const renderSrc = HTML + APP;
const unfilled = dynamicKeys.filter((k) => {
  const raw = (renderSrc.match(new RegExp('u\\("' + k + '"\\)', "g")) || []).length;
  const wrapped = (renderSrc.match(new RegExp('fill\\(u\\("' + k + '"\\)', "g")) || []).length;
  return raw > wrapped;
});
unfilled.length ? fail("含占位符的文案未经 fill() 渲染：" + unfilled.join(", "))
                : ok("含占位符的文案全部经 fill() 渲染（" + dynamicKeys.length + " 个 key）");

const maxScore = CONTENT.quiz.questions.reduce((a, q) => a + Math.max.apply(null, q.opts.map((o) => o.score)), 0);
const bandMax = Math.max.apply(null, CONTENT.quiz.bands.map((b) => b.max));
bandMax === maxScore ? ok("自测满分与 bands 上限一致（" + maxScore + "）")
                     : fail("自测满分 " + maxScore + " 与 bands 上限 " + bandMax + " 不一致");
const scoreClaims = [];
const scoreRe = /\/ (\d+)</g;
while ((m = scoreRe.exec(HTML)) !== null) scoreClaims.push(Number(m[1]));
scoreClaims.length
  ? (scoreClaims.some((n) => n !== maxScore)
      ? fail("levels.html 硬编码总分与实际不符：" + scoreClaims.join(", "))
      : ok("levels.html 总分显示与实际一致（" + maxScore + "）"))
  : ok("levels.html 总分由 bands 动态推导，无硬编码");

/* 9. 渲染层不得无条件显示「已审核」 */
APP.indexOf("e.reviewed") >= 0 ? ok("渲染层按 reviewed 分支显示审核状态")
                               : fail("app.js 缺少 reviewed 分支，可能对外伪造已审状态");

/* 10. level 与 plan 全等级对齐（含 L0 / L3） */
const misaligned = CONTENT.strokes.filter((s) => !s.hidden &&
  s.level.some((l) => !(l in s.plan))).map((s) => s.id);
misaligned.length ? fail("level 与 plan 未对齐：" + misaligned.join(", "))
                  : ok("全部正式泳姿 level 与 plan 对齐（含 L0 / L3）");

/* 11. L0–L3 内容结构、互链与站内链接可达 */
const p1 = [];
const safetyIds = new Set(CONTENT.safety.map((e) => e.id));
const refSafety = (label, id) => {
  if (!safetyIds.has(id)) p1.push(label + " 引用了不存在的 safety id: " + id);
};
[
  ["basics.lessons", CONTENT.basics && CONTENT.basics.lessons],
  ["advanced.modules", CONTENT.advanced && CONTENT.advanced.modules],
  ["training.plans", CONTENT.training && CONTENT.training.plans],
  ["training.gear", CONTENT.training && CONTENT.training.gear]
].forEach((b) => {
  if (!Array.isArray(b[1]) || !b[1].length) p1.push(b[0] + " 缺失或为空");
});
if (CONTENT.basics && CONTENT.basics.lessons) {
  CONTENT.basics.lessons.forEach((l) => (l.related || []).forEach((id) => refSafety("basics:" + l.id, id)));
}
if (CONTENT.advanced && CONTENT.advanced.modules) {
  CONTENT.advanced.modules.forEach((x) => (x.related || []).forEach((id) => refSafety("advanced:" + x.id, id)));
}
if (CONTENT.training && CONTENT.training.gear) {
  CONTENT.training.gear.forEach((g) => (g.related || []).forEach((id) => refSafety("gear:" + g.id, id)));
}
CONTENT.strokes.filter((s) => !s.hidden).forEach((s) => {
  const link = CONTENT.strokeLinks && CONTENT.strokeLinks[s.id];
  if (!link) p1.push("泳姿缺互链配置：" + s.id);
  else (link.safety || []).forEach((id) => refSafety("stroke:" + s.id, id));
});
Object.keys(CONTENT.safetyLinks || {}).forEach((k) => {
  if (!safetyIds.has(k)) p1.push("safetyLinks 键无效：" + k);
  (CONTENT.safetyLinks[k] || []).forEach((id) => refSafety("safetyLinks:" + k, id));
});
(CONTENT.quiz.bands || []).forEach((b) => {
  if (!b.links || b.links.length < 2) p1.push("自测 " + b.level + " 结果缺少多个路径入口");
});
CONTENT.levels.forEach((l) => { if (!l.href) p1.push("等级 " + l.id + " 缺 href"); });
const hrefs = [];
CONTENT.levels.forEach((l) => hrefs.push(l.href));
(CONTENT.quiz.bands || []).forEach((b) => (b.links || []).forEach((n) => hrefs.push(n.href)));
["basics", "advanced", "training"].forEach((k) => {
  if (CONTENT[k] && CONTENT[k].next) CONTENT[k].next.forEach((n) => hrefs.push(n.href));
});
Object.keys(CONTENT.strokeLinks || {}).forEach((k) => {
  (CONTENT.strokeLinks[k].next || []).forEach((n) => hrefs.push(n.href));
});
hrefs.filter(Boolean).forEach((h) => {
  const f = String(h).split("?")[0];
  if (!fs.existsSync(path.join(__dirname, f))) p1.push("站内链接指向不存在的文件：" + h);
});
["basics.html", "training.html", "advanced.html"].forEach((f) => {
  if (!fs.existsSync(path.join(__dirname, f))) p1.push("缺少静态页 " + f);
});
p1.length ? fail("P1 内容结构 / 互链：\n    - " + p1.join("\n    - "))
          : ok("L0–L3 内容结构、互链 id 与站内链接全部有效");

/* 12. 安全条目按分类连续分组 */
const groupOrder = [];
CONTENT.safety.forEach((e) => {
  if (groupOrder[groupOrder.length - 1] !== e.category) groupOrder.push(e.category);
});
groupOrder.length === CATS.length && groupOrder.every((c, i) => c === CATS[i])
  ? ok("安全条目按五类连续分组：" + groupOrder.join(" → "))
  : fail("安全条目分类分组被打乱：" + groupOrder.join(" → "));

/* 13. 媒体快照日期集中维护 */
const snap = CONTENT.mediaSnapshot || {};
nonEmpty(snap.date) && nonEmpty(snap.label && snap.label.zh) && nonEmpty(snap.label && snap.label.en)
  ? ok("媒体快照日期集中维护：" + snap.date)
  : fail("mediaSnapshot 缺失或双语 label 不完整");

/* 14. 彩蛋泳姿不进入上一/下一循环 */
const strokeSrc = read("stroke-page.js");
strokeSrc.indexOf("!x.hidden") >= 0 && strokeSrc.indexOf("strokeNav") >= 0
  ? ok("彩蛋泳姿不进入上一/下一泳姿循环")
  : fail("stroke-page.js 的上一/下一导航仍可能包含彩蛋");

/* 15. P3：SEO 静态可发现性与可访问性 */
const p3 = [];
PAGES.forEach((f) => {
  let src;
  try { src = read(f); } catch (e) { p3.push("缺少页面 " + f); return; }
  if (!/rel="canonical"/.test(src)) p3.push(f + " 缺 canonical");
  if (!/property="og:title"/.test(src)) p3.push(f + " 缺 og:title");
  if (!/application\/ld\+json/.test(src)) p3.push(f + " 缺 JSON-LD");
  if (!/<noscript>/.test(src)) p3.push(f + " 缺 noscript 摘要");
});
let sitemap = "";
try { sitemap = read("sitemap.xml"); } catch (e) { p3.push("缺少 sitemap.xml"); }
PAGES.forEach((f) => {
  if (sitemap.indexOf(f === "index.html" ? "/" : f) < 0) p3.push("sitemap 未列出 " + f);
});
try {
  if (!/Sitemap:/.test(read("robots.txt"))) p3.push("robots.txt 缺 Sitemap 声明");
} catch (e) { p3.push("缺少 robots.txt"); }
const strokeJs = read("stroke-page.js");
if (!/window\.STROKE_ID/.test(strokeJs)) p3.push("stroke-page.js 未支持 STROKE_ID");
["breaststroke", "freestyle", "backstroke", "butterfly"].forEach((id) => {
  const src = read("stroke-" + id + ".html");
  if (src.indexOf('window.STROKE_ID = "' + id + '"') < 0) p3.push("静态入口页缺 STROKE_ID: " + id);
  if (src.indexOf('src="stroke-page.js"') < 0) p3.push("静态入口页缺共享脚本: " + id);
});
const safetySrc = read("safety.html");
if (safetySrc.indexOf('aria-live="polite"') < 0) p3.push("safety.html 结果区缺 aria-live");
if (safetySrc.indexOf('class="sr-only"') < 0) p3.push("safety.html 搜索框缺隐藏 label");
if (APP.indexOf("function highlight(") < 0) p3.push("缺搜索高亮 helper");
if (APP.indexOf("window.capturePageState") < 0 || APP.indexOf("window.restorePageState") < 0) p3.push("语言切换缺状态保留钩子");
if (read("styles.css").indexOf("prefers-reduced-motion") < 0) p3.push("缺 reduced-motion 支持");
if (!/referrerpolicy="no-referrer"/.test(strokeJs) || !/width="480"/.test(strokeJs)) p3.push("视频封面缺 referrerpolicy 或尺寸");
p3.length ? fail("P3 SEO / A11y：\n    - " + p3.join("\n    - "))
          : ok("12 页 SEO 元信息、站点地图、4 个静态入口页与 a11y 设施齐全");

/* ---------- 汇总 ---------- */
console.log("泳道 · 内容审核闸门 (check.js)");
console.log("数据：" + CONTENT.strokes.length + " 泳姿 / " + CONTENT.safety.length + " 安全条目 / " +
  CONTENT.quiz.questions.length + " 题（满分 " + maxScore + "）");
oks.forEach((x) => console.log("  [PASS] " + x));
warns.forEach((x) => console.log("  [WARN] " + x));
fails.forEach((x) => console.log("  [FAIL] " + x));
console.log("结果：" + fails.length + " FAIL / " + warns.length + " WARN / " + oks.length + " PASS");
console.log(policy.status === "approved"
  ? "结论：全站已终审。"
  : "结论：全站状态 " + policy.status + "，" + (CONTENT.safety.length - approvedCount) + " 条待终审；对外不得宣称「已审核」。");
process.exit(fails.length ? 1 : 0);
