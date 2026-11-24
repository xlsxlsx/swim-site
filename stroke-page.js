/* ============================================================
 * stroke-page.js — 泳姿详情共享渲染逻辑（方案 A 静态站）
 * stroke.html 从 URL ?id= 读取；stroke-*.html 通过 window.STROKE_ID 固定泳姿。
 * 不依赖构建工具，直接以 <script> 加载；数据仍来自 content.js。
 * ============================================================ */
function pageRender() {
  var params = new URLSearchParams(location.search);
  var id = window.STROKE_ID || params.get("id") || "breaststroke";
  var idx = -1;
  for (var i = 0; i < CONTENT.strokes.length; i++) if (CONTENT.strokes[i].id === id) idx = i;

  if (idx < 0) {
    document.title = u("strokes_title") + " · " + u("brand");
    document.getElementById("main").innerHTML =
      '<section class="section"><p class="sub">' + u("not_found") + '</p>' +
      '<div class="grid">' + CONTENT.strokes.map(strokeCard).join("") + '</div></section>';
    return;
  }
  var s = CONTENT.strokes[idx];
  // 彩蛋泳姿不进入正式泳姿的上一/下一循环
  var formal = CONTENT.strokes.filter(function (x) { return !x.hidden; });
  var fi = -1;
  for (var j = 0; j < formal.length; j++) if (formal[j].id === id) fi = j;
  var prev = fi >= 0 ? formal[(fi - 1 + formal.length) % formal.length] : null;
  var next = fi >= 0 ? formal[(fi + 1) % formal.length] : null;
  var strokeNav = prev ? '<nav class="stroke-nav" aria-label="' + u("nav_strokes") + '">' +
    '<a href="stroke.html?id=' + prev.id + '">' + u("prev") + ' · ' + esc(t(prev.name)) + '</a>' +
    '<a href="stroke.html?id=' + next.id + '">' + u("next") + ' · ' + esc(t(next.name)) + '</a>' +
    '</nav>' : "";

  document.title = t(s.name) + (getLang() === "zh" ? " 教程" : " Tutorial") + " · " + u("brand");
  setMetaDesc(t(s.overview));

  var breakdown = '<ol class="breakdown">' + s.breakdown.map(function (b) {
    return '<li>' + esc(t(b)) + '</li>';
  }).join("") + '</ol>';

  var mediaSection = '<div class="media-grid">' + s.videos.map(function (v) {
    return '<div class="media-tile video-tile" data-bvid="' + v.bvid + '">' +
      '<button class="media-cover" aria-label="' + esc(t(v.label)) + '">' +
      '<img src="' + v.pic + '" alt="' + (getLang() === "zh" ? "教学视频封面：" : "Tutorial cover: ") + esc(v.title) +
      '" loading="lazy" width="480" height="270" referrerpolicy="no-referrer">' +
      '<span class="play">' + u("play") + '</span></button>' +
      '<p class="media-label">' + esc(t(v.label)) + '</p>' +
      '<p class="media-meta">' + esc(v.title) + ' · ' + u("up_l") + ' ' + esc(v.up) + ' · ' + v.min + ' min</p>' +
      '<p class="media-meta stats"><span>♥ ' + v.like + ' ' + u("likes_l") + '</span><span>★ ' + v.collect + ' ' + u("collect_l") + '</span><span>' + fill(u("snapshot"), t(CONTENT.mediaSnapshot.label)) + '</span></p>' +
      '<p class="media-meta link"><a href="https://www.bilibili.com/video/' + v.bvid + '/" target="_blank" rel="noopener noreferrer">' + u("ext") + '</a></p>' +
      '</div>';
  }).join("") + '</div>' +
  '<p class="media-note">' + fill(u("media_note"), t(CONTENT.mediaSnapshot.label)) + '</p>';

  var mistakes = s.mistakes.map(function (m) {
    return '<div class="card mistake"><p>' + esc(t(m)) + '</p>' +
      '<div class="fix"><strong>' + u("fix") + '：</strong>' + esc(t(m.fix)) + '</div></div>';
  }).join("");

  var planBlocks = Object.keys(s.plan).map(function (lv) {
    return '<div class="card plan-block"><h3>' + lv + '</h3><p>' + esc(t(s.plan[lv])) + '</p></div>';
  }).join("");

  var heroBadge = s.hidden ? '<p class="egg-badge">' + u("egg_badge") + '</p>' : "";

  var links = CONTENT.strokeLinks[s.id] || {};
  var relatedSection = '<section class="mod"><h2>' + u("stroke_related") + '</h2>' +
    '<div class="card">' + safetyLinksHtml(links.safety) +
    '<h3 class="sub-label">' + u("next_steps") + '</h3>' +
    nextLinksHtml(links.next) + '</div></section>';

  document.getElementById("main").innerHTML =
    '<section class="stroke-hero">' +
    '<div class="emoji" aria-hidden="true">' + s.emoji + '</div>' +
    '<h1>' + esc(t(s.name)) + '</h1>' +
    '<p class="tagline">' + esc(t(s.tagline)) + '</p>' +
    '<div class="chips">' + s.level.map(function (l) {
      return '<span class="chip lv-' + l + '">' + l + '</span>';
    }).join("") + '</div>' + heroBadge + '</section>' +

    '<p class="sub"><a href="strokes.html">' + u("back_strokes") + '</a></p>' +

    '<section class="mod"><h2>' + u("overview") + '</h2>' +
    '<div class="card"><p>' + esc(t(s.overview)) + '</p></div></section>' +

    '<section class="mod"><h2>' + u("breakdown") + '</h2>' + breakdown + '</section>' +

    '<section class="mod"><h2>' + u("rhythm") + '</h2>' +
    '<div class="card"><p>' + esc(t(s.rhythm)) + '</p></div></section>' +

    '<section class="mod"><h2>' + u("mistakes") + '</h2>' + mistakes + '</section>' +

    '<section class="mod"><h2>' + u("plan") + '</h2>' + planBlocks + '</section>' +

    '<section class="mod"><h2>' + u("media_title") + '</h2>' + mediaSection + '</section>' +

    relatedSection +

    strokeNav;

  Array.prototype.forEach.call(document.querySelectorAll(".video-tile .media-cover"), function (btn) {
    btn.addEventListener("click", function () {
      var tile = btn.parentNode;
      var iframe = document.createElement("iframe");
      iframe.src = "https://player.bilibili.com/player.html?bvid=" + tile.getAttribute("data-bvid") + "&page=1&highend=1";
      iframe.allowFullscreen = true;
      iframe.title = u("media_title");
      iframe.loading = "lazy";
      iframe.setAttribute("frameborder", "0");
      tile.replaceChild(iframe, btn);
    });
  });

  // 封面加载失败时给出可读兜底，避免空白占位
  Array.prototype.forEach.call(document.querySelectorAll(".media-cover img"), function (img) {
    img.addEventListener("error", function () {
      img.style.display = "none";
      var span = document.createElement("span");
      span.className = "media-fallback";
      span.textContent = getLang() === "zh" ? "封面暂不可用" : "Cover unavailable";
      img.parentNode.insertBefore(span, img.nextSibling);
    });
  });
}
// 语言切换重绘 main 后，恢复已点开的教学视频
window.capturePageState = function () {
  return {
    played: Array.prototype.map.call(document.querySelectorAll(".video-tile iframe"), function (f) {
      var m = /[?&]bvid=([^&]+)/.exec(f.src);
      return m ? decodeURIComponent(m[1]) : null;
    }).filter(Boolean)
  };
};
window.restorePageState = function (s) {
  if (!s || !s.played) return;
  Array.prototype.forEach.call(document.querySelectorAll(".video-tile"), function (tile) {
    if (s.played.indexOf(tile.getAttribute("data-bvid")) < 0) return;
    var btn = tile.querySelector(".media-cover");
    if (!btn) return;
    var iframe = document.createElement("iframe");
    iframe.src = "https://player.bilibili.com/player.html?bvid=" + tile.getAttribute("data-bvid") + "&page=1&highend=1";
    iframe.allowFullscreen = true;
    iframe.title = u("media_title");
    iframe.loading = "lazy";
    iframe.setAttribute("frameborder", "0");
    tile.replaceChild(iframe, btn);
  });
};

initChrome("strokes", pageRender);
