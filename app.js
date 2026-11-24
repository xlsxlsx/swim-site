/* ============================================================
 * app.js — 共享运行时：i18n（zh/en，localStorage）、顶部导航、
 * 页脚、卡片渲染helper。各页面调用 initChrome(active, pageRender)。
 * ============================================================ */

/* ---------- 语言状态（默认 zh，存 localStorage） ---------- */
/* 把文案里的 {n} / {date} 占位符替换为运行时数值，避免数量与快照日期写死 */
function fill(s, v) { return String(s).replace(/\{(?:n|date)\}/g, v); }

/* 搜索命中高亮：先转义，再用 <mark> 包裹关键词 */
function highlight(text, q) {
  var s = esc(text);
  if (!q) return s;
  String(q).trim().split(/\s+/).filter(Boolean).forEach(function (term) {
    var pattern = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    s = s.replace(new RegExp("(" + pattern + ")", "gi"), "<mark>$1</mark>");
  });
  return s;
}

function getLang() {
  try { return localStorage.getItem("swim-lang") || "zh"; }
  catch (e) { return "zh"; }
}
function setLang(l) {
  try { localStorage.setItem("swim-lang", l); } catch (e) {}
}

/* ---------- 界面文案 ---------- */
const UI = {
  brand:        { zh: "泳道 · 游泳学院", en: "SwimLane · Swim Academy" },
  nav_home:     { zh: "首页", en: "Home" },
  nav_strokes:  { zh: "泳姿教程", en: "Strokes" },
  nav_safety:   { zh: "安全注意事项", en: "Safety" },
  nav_levels:   { zh: "等级自测", en: "Level Quiz" },
  nav_label:    { zh: "主导航", en: "Main navigation" },
  lang_btn:     { zh: "EN", en: "中文" },
  lang_hint:    { zh: "切换英文", en: "Switch to Chinese" },
  menu_label:   { zh: "打开菜单", en: "Open menu" },

  hero_kicker:  { zh: "游泳教学 · L0–L3 全等级体系", en: "Swimming lessons · full L0–L3 system" },
  hero_title:   { zh: "从零到精通，把游泳学成一项可信的技能", en: "From zero to mastery — swimming learned the right way" },
  hero_sub:     { zh: "分泳姿、分等级的图文教程，加上 {n} 条安全条目（含游泳用品），按「动作分解 → 常见错误 → 练习计划」的路线，少走弯路、安全下水。",
                  en: "Stroke-by-stroke, level-by-level tutorials plus {n} safety entries including swim gear, following the path: breakdown → common mistakes → practice plan." },
  cta_strokes:  { zh: "开始学泳姿", en: "Start with strokes" },
  cta_quiz:     { zh: "测测我的等级", en: "Find my level" },

  sec_levels:   { zh: "等级地图 L0–L3", en: "Level map L0–L3" },
  sec_levels_sub:{ zh: "点击任一等级进入对应学习路径；不确定水平？{n} 题自测给出推荐起点。", en: "Click a level for its learning path; not sure where to start? A {n}-question quiz recommends your entry level." },
  sec_strokes:  { zh: "精选泳姿", en: "Featured strokes" },
  sec_safety:   { zh: "安全要点", en: "Safety highlights" },
  view_all_strokes: { zh: "查看全部泳姿教程 →", en: "See all stroke tutorials →" },
  view_all_safety:  { zh: "查看全部安全条目 →", en: "See all safety entries →" },
  quiz_cta:     { zh: "去自测 →", en: "Take the quiz →" },

  strokes_title:{ zh: "泳姿教程", en: "Stroke Tutorials" },
  strokes_sub:  { zh: "4 大泳姿：蛙泳 · 自由泳 · 仰泳 · 蝶泳，外加一只隐藏款……每篇含简介、动作分解、节奏要领、常见错误与练习计划。",
                  en: "Four strokes: breaststroke, freestyle, backstroke, butterfly — plus one hidden entry… Each has overview, breakdown, rhythm, mistakes, and a practice plan." },
  hidden_title: { zh: "？？？", en: "???" },
  hidden_desc:  { zh: "听说这泳姿无师自通、水花惊人……点击解锁（内含彩蛋，仅供娱乐）",
                  en: "A self-taught stroke with terrifying splashes… click to unlock (easter egg, for fun only)" },
  hidden_chip:  { zh: "隐藏款 · 已上锁", en: "Hidden · Locked" },
  egg_badge:    { zh: "🥚 彩蛋泳姿 · 仅供娱乐，不构成教学建议", en: "🥚 Easter-egg stroke · for fun only, not teaching advice" },

  overview:   { zh: "简介", en: "Overview" },
  breakdown:  { zh: "动作分解", en: "Breakdown" },
  rhythm:     { zh: "节奏与配合", en: "Rhythm & Timing" },
  mistakes:   { zh: "常见错误与纠正", en: "Common Mistakes & Fixes" },
  plan:       { zh: "练习计划", en: "Practice Plan" },
  fix:        { zh: "纠正", en: "Fix" },
  media_title:{ zh: "教学视频（B 站）", en: "Teaching videos (bilibili)" },
  media_note: { zh: "封面与「赞/收藏」为 B 站 {date} 数据快照，选取对应主题点赞与收藏最高的教学视频；点击封面内嵌播放，B 站视频页为外部链接。",
                en: "Covers and like/favorite counts are a bilibili snapshot ({date}); picks are the most-liked and most-bookmarked lessons for each topic. Click a cover to embed the player; the bilibili page is an external link." },
  play:       { zh: "▶ 点击播放", en: "▶ Click to play" },
  ext:        { zh: "在 B 站打开（外部链接）", en: "Open on bilibili (external)" },
  up_l:       { zh: "UP主", en: "UP" },
  likes_l:    { zh: "赞", en: "likes" },
  collect_l:  { zh: "收藏", en: "bookmarks" },
  snapshot:   { zh: "{date} 数据", en: "{date} data" },
  prev:       { zh: "← 上一泳姿", en: "← Previous stroke" },
  next:       { zh: "下一泳姿 →", en: "Next stroke →" },
  back_strokes:{ zh: "← 返回泳姿列表", en: "← Back to strokes" },
  levels_label:{ zh: "适用等级", en: "Levels" },
  not_found:  { zh: "未找到该泳姿，请从列表选择。", en: "Stroke not found — pick one from the list." },

  safety_title:{ zh: "安全注意事项", en: "Safety Notes" },
  safety_sub:  { zh: "按场景分类的 {n} 条安全条目（含游泳用品），每条含「风险说明 + 预防措施 + 紧急处理」，支持关键词搜索与分类筛选。",
                 en: "{n} entries by scenario, including swim gear, each with risk + prevention + emergency, with keyword search and category filters." },
  search_ph:   { zh: "搜索条目（如：抽筋 / 跳水 / 儿童 / 酒后 / 泳镜）", en: "Search entries (e.g. cramp, diving, kids, alcohol, goggles)" },
  cat_all:     { zh: "全部", en: "All" },
  cat_venue:   { zh: "场所安全", en: "Venue" },
  cat_contraindication: { zh: "身体禁忌", en: "Contraindications" },
  cat_emergency:{ zh: "突发应对", en: "Emergency" },
  cat_child:    { zh: "儿童防护", en: "Child safety" },
  cat_gear:     { zh: "游泳用品", en: "Gear & equipment" },
  risk_l:       { zh: "风险说明", en: "Risk" },
  prevention_l: { zh: "预防措施", en: "Prevention" },
  emergency_l:  { zh: "紧急处理", en: "Emergency response" },
  source_l:         { zh: "来源", en: "Source" },
  source_pending_l: { zh: "引用建议（未核实）", en: "Suggested source (unverified)" },
  reviewed:         { zh: "已审核", en: "Reviewed" },
  review_pending:   { zh: "AI 初稿 · 待教练终审", en: "AI draft · awaiting sign-off" },
  review_banner:    { zh: "内容审核状态", en: "Content review status" },
  entries_pending:  { zh: "条待终审条目", en: "entries awaiting sign-off" },
  caveat_l:         { zh: "特别提示", en: "Important" },
  results:      { zh: "相关条目", en: "matching entries" },
  no_results:   { zh: "没有匹配条目，试试其他关键词。", en: "No matching entries — try another keyword." },

  quiz_title:   { zh: "等级自测（{n} 题）", en: "Level Quiz ({n} questions)" },
  quiz_intro:   { zh: "如实作答，按总分给出推荐起点等级与学习路径。", en: "Answer honestly; your score maps to a recommended starting level and path." },
  submit:       { zh: "查看我的等级", en: "See my level" },
  retake:       { zh: "重新作答", en: "Retake" },
  result_title: { zh: "推荐起点等级", en: "Recommended starting level" },
  score_label:  { zh: "总分", en: "Score" },
  need_answer:  { zh: "还有问题未作答，请完成全部 {n} 题。", en: "Some questions are unanswered — complete all {n}." },

  /* P1：零基础 / 训练 / 进阶 / 互链 */
  nav_basics:      { zh: "零基础 {n} 课", en: "Basics ({n} lessons)" },
  nav_training:    { zh: "训练与装备", en: "Training & Gear" },
  nav_advanced:    { zh: "L3 进阶", en: "L3 Advanced" },
  cta_basics:      { zh: "零基础从这里开始", en: "Start here if you're new" },
  basics_title:    { zh: "下水前 {n} 课 · L0 零基础", en: "{n} lessons before swimming · L0" },
  safety_first:    { zh: "安全前提", en: "Safety first" },
  goal_l:          { zh: "本课目标", en: "Goal" },
  steps_l:         { zh: "怎么练", en: "How to practise" },
  related_l:       { zh: "相关安全条目", en: "Related safety notes" },
  next_steps:      { zh: "下一步", en: "Next steps" },
  training_title:  { zh: "训练计划与装备选购", en: "Training Plans & Gear Guide" },
  plans_title:     { zh: "分等级周训练计划", en: "Weekly plans by level" },
  gear_title:      { zh: "装备选购指南", en: "Gear buying guide" },
  cycle_l:         { zh: "周期", en: "Cycle" },
  frequency_l:     { zh: "频率", en: "Frequency" },
  measure_l:       { zh: "衡量指标", en: "Progress metric" },
  criteria_l:      { zh: "怎么选", en: "What to look for" },
  avoid_l:         { zh: "避坑", en: "Avoid" },
  drill_l:         { zh: "练习安排", en: "Drill set" },
  advanced_title:  { zh: "L3 进阶技术", en: "L3 Advanced Technique" },
  path_title:      { zh: "完整学习路径 L0–L3", en: "Full learning path L0–L3" },
  path_sub:        { zh: "按等级进入对应内容；每一段都有明确的下一步。", en: "Enter each level's content; every stage has a clear next step." },
  stroke_related:  { zh: "学这一泳姿先看", en: "Safety notes for this stroke" },

  disclaimer:   { zh: "内容仅供参考，不替代专业教练与医生的指导；安全/医学类条目均为 AI 初稿、尚未经持证教练与医生终审，条目中的「来源」为引用方向建议而非已核实出处。",
                  en: "Content is for reference only and does not replace professional coaching or medical advice. Safety/medical entries are AI drafts not yet signed off by a certified coach or physician; the 'source' field is a suggested citation direction, not a verified reference." },
  emergency_line:{ zh: "遇紧急情况请立即呼叫当地急救电话（中国大陆 120）并通知场馆救生员；本站不提供急救认证培训。",
                  en: "In an emergency, call your local emergency number (120 in mainland China) and alert the venue lifeguard. This site does not provide first-aid certification training." },
  content_status:{ zh: "内容状态：AI 初稿 · 待持证教练/医生终审 · 截至 ", en: "Content status: AI draft · awaiting coach/physician sign-off · as of " },
  copyright:    { zh: "© 2026 泳道·游泳学院 · 方案 A 静态站 · 中英双语", en: "© 2026 SwimLane · static site (Plan A) · bilingual" }
};

/* ---------- 语言 helpers ---------- */
function t(obj) { return obj[getLang()]; }
function u(key) { return UI[key][getLang()]; }
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function levelChips(levels) {
  return '<div class="chips">' + levels.map(function (l) {
    return '<span class="chip lv-' + l + '">' + l + "</span>";
  }).join("") + "</div>";
}

function catChip(cat) {
  return '<span class="chip cat-' + cat + '">' + u("cat_" + cat) + "</span>";
}

function strokeCard(s) {
  if (s.hidden) {
    return '<a class="card stroke-card hidden-card" href="stroke.html?id=' + s.id + '">' +
      '<div class="stroke-emoji" aria-hidden="true">🔒</div>' +
      '<h3>' + esc(u("hidden_title")) + '</h3>' +
      '<p>' + esc(u("hidden_desc")) + '</p>' +
      '<span class="chip lv-彩蛋">' + esc(u("hidden_chip")) + '</span></a>';
  }
  return '<a class="card stroke-card" href="stroke.html?id=' + s.id + '">' +
    '<div class="stroke-emoji" aria-hidden="true">' + s.emoji + "</div>" +
    "<h3>" + esc(t(s.name)) + "</h3>" +
    "<p>" + esc(t(s.tagline)) + "</p>" +
    levelChips(s.level) + "</a>";
}

function findSafety(id) {
  for (var i = 0; i < CONTENT.safety.length; i++) if (CONTENT.safety[i].id === id) return CONTENT.safety[i];
  return null;
}

function safetyLinksHtml(ids) {
  if (!ids || !ids.length) return "";
  var links = ids.map(function (id) {
    var e = findSafety(id);
    return e ? '<a class="rel-link" href="safety.html#s-' + id + '">' + esc(t(e.title)) + "</a>" : "";
  }).filter(Boolean).join("");
  return links ? '<div class="rel-row"><span class="rel-label">' + u("related_l") + "：</span>" + links + "</div>" : "";
}

function nextLinksHtml(items) {
  if (!items || !items.length) return "";
  return '<div class="next-row">' + items.map(function (n) {
    return '<a class="btn btn-plain" href="' + n.href + '">' + esc(t(n.label)) + " →</a>";
  }).join("") + "</div>";
}

function safetyCard(e, q) {
  var approved = e.reviewed === true;
  var badge = approved
    ? '<span class="badge-ok">✓ ' + u("reviewed") + "</span>"
    : '<span class="badge-pending">⚠ ' + u("review_pending") + "</span>";
  var caveat = CONTENT.reviewPolicy.caveatIds.indexOf(e.id) >= 0
    ? '<p class="safety-caveat"><strong>' + u("caveat_l") + "：</strong>" + esc(t(CONTENT.reviewPolicy.caveatNote)) + "</p>"
    : "";
  return '<article class="card safety-card" id="s-' + e.id + '">' +
    '<div class="safety-head">' + catChip(e.category) +
    "<h3>" + highlight(t(e.title), q) + "</h3></div>" +
    '<p class="sec"><strong>' + u("risk_l") + "：</strong>" + highlight(t(e.risk), q) + "</p>" +
    '<p class="sec"><strong>' + u("prevention_l") + "：</strong>" + highlight(t(e.prevention), q) + "</p>" +
    '<p class="sec"><strong>' + u("emergency_l") + "：</strong>" + highlight(t(e.emergency), q) + "</p>" +
    caveat +
    safetyLinksHtml(CONTENT.safetyLinks[e.id]) +
    '<div class="safety-foot">' + badge +
    "<span class=\"src\">" + u(approved ? "source_l" : "source_pending_l") + "：" + esc(t(e.source)) + "</span></div>" +
    "</article>";
}

function setMetaDesc(text) {
  var m = document.querySelector('meta[name="description"]');
  if (m) m.setAttribute("content", text);
}

/* ---------- 页面骨架：header + footer ---------- */
var _active = "home", _pageRender = null;

function initChrome(active, pageRender) {
  _active = active;
  _pageRender = pageRender;
  paintChrome();
  pageRender();
}

function paintChrome() {
  document.documentElement.lang = getLang();

  var links = [
    ["index.html",  "home",    u("nav_home")],
    ["strokes.html","strokes", u("nav_strokes")],
    ["safety.html", "safety",  u("nav_safety")],
    ["levels.html", "levels",  u("nav_levels")]
  ];

  var header = document.getElementById("site-header");
  header.innerHTML =
    '<nav class="nav" aria-label="' + u("nav_label") + '">' +
    '<a class="brand" href="index.html" aria-label="' + u("brand") + '">🌊 ' + u("brand") + "</a>" +
    '<button class="burger" id="burger" aria-label="' + u("menu_label") + '" aria-expanded="false">☰</button>' +
    '<ul class="nav-links" id="navLinks">' +
    links.map(function (l) {
      return '<li><a href="' + l[0] + '"' + (l[1] === _active ? ' class="active" aria-current="page"' : "") + ">" + l[2] + "</a></li>";
    }).join("") +
    "</ul>" +
    '<button class="lang-btn" id="langBtn" aria-label="' + u("lang_hint") + '">🌐 ' + u("lang_btn") + "</button>" +
    "</nav>";

  var footerLinks = links.concat([
    ["basics.html", "", fill(u("nav_basics"), CONTENT.basics.lessons.length)],
    ["training.html", "", u("nav_training")],
    ["advanced.html", "", u("nav_advanced")]
  ]);

  var footer = document.getElementById("site-footer");
  footer.innerHTML =
    '<div class="footer-inner">' +
    '<p class="disclaimer">⚠️ ' + u("disclaimer") + "</p>" +
    '<p class="disclaimer emergency-line">🚨 ' + u("emergency_line") + "</p>" +
    '<p class="content-status">' + u("content_status") + esc(CONTENT.reviewPolicy.asOf) + "</p>" +
    '<nav class="footer-links" aria-label="' + u("nav_label") + '">' +
    footerLinks.map(function (l) { return '<a href="' + l[0] + '">' + l[2] + "</a>"; }).join(" · ") +
    "</nav>" +
    '<p class="copy">' + u("copyright") + "</p>" +
    "</div>";

  document.getElementById("burger").addEventListener("click", function () {
    var open = document.getElementById("navLinks").classList.toggle("open");
    this.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.getElementById("langBtn").addEventListener("click", function () {
    setLang(getLang() === "zh" ? "en" : "zh");
    var snapshot = window.capturePageState ? window.capturePageState() : null;
    paintChrome();
    _pageRender();
    if (snapshot && window.restorePageState) window.restorePageState(snapshot);
  });
}
