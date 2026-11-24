# 泳道 · 游泳学院（MVP 静态站）

[简体中文](README.md) · [English](README.en.md)

按《PRD-游泳网站.md》《IA-信息架构.md》《内容模板.md》落地的方案 A 纯静态站点：零后端、零数据库、零账号系统。

## 打开方式
直接双击 `index.html`（支持 `file://`，内容数据以 `<script>` 内联加载，无 fetch 跨域问题），或放到任意静态托管（后续可平滑迁移）。

## 页面（对应 IA 站点地图）
| 文件 | 页面 | 关键模块 |
|------|------|----------|
| `index.html` | 首页 | Hero（含零基础入口）、可点击的等级地图 L0–L3、精选泳姿、精选安全（带待终审标记） |
| `strokes.html` | 泳姿列表 | 4 张泳姿卡 + 1 张隐藏款「？？？」上锁卡（彩蛋：狗刨 🐕，纯玩笑） |
| `stroke.html?id=…` | 泳姿详情（动态版） | 共享 `stroke-page.js` 渲染：简介 / 动作分解 / 节奏 / 纠错 / 分等级计划 / 视频 / 相关安全与下一步 |
| `stroke-breaststroke.html` | 蛙泳静态入口 | 独立 URL 与静态摘要，渲染逻辑与动态版共用 |
| `stroke-freestyle.html` | 自由泳静态入口 | 同上 |
| `stroke-backstroke.html` | 仰泳静态入口 | 同上 |
| `stroke-butterfly.html` | 蝶泳静态入口 | 同上 |
| `safety.html` | 安全注意事项 | 审核状态横幅、39 条条目、五类连续分组筛选、关键词搜索、风险+预防+紧急处理、待终审徽章 / 引用建议（未核实）/ 特别提示 / 相关条目互链与 `#s-<id>` 深链 |
| `levels.html` | 等级自测与学习路径 | L0–L3 完整路径卡 + 5 题问卷 → 计分 → 推荐起点等级 + 多个内容入口 |
| `basics.html` | L0 零基础 5 课 | 适应水 / 水中呼气 / 俯漂与站立 / 仰漂呼救 / 扶边移动，每课含目标、步骤、纠错、相关安全与下一步 |
| `training.html` | 训练计划与装备选购 | L1–L3 周训练计划（周期 / 频率 / 指标）+ 9 类装备选购判断标准与避坑 |
| `advanced.html` | L3 进阶技术 | 转身 / 出发 / 配速与周期化 / 录制自查清单，均为静态站可交付的自练内容 |

## 学习路径与内容互链
- 等级地图（首页与自测页）四张卡片可点击：L0 → `basics.html`、L1 → 蛙泳详情、L2 → `training.html`、L3 → `advanced.html`。
- 自测结果按等级给出 3 个内容入口；泳姿详情底部渲染「学这一泳姿先看」与「下一步」。
- 安全条目带 `#s-<id>` 锚点；泳姿 / 课程 / 装备 / 条目之间的互链由 `CONTENT.strokeLinks`、`CONTENT.safetyLinks` 集中维护，`check.js` 校验 id 与站内链接可达。
- L3 不再承诺社区投稿 / 助教（静态站非目标），改为录制自查 + 持证教练复盘。

## 双语
- 默认中文，导航栏「🌐」一键切换中⇄EN，偏好存 `localStorage`（键 `swim-lang`）。
- 同一页面内切换（不用独立 URL，保持 SEO 简单），每页 `title`/`meta description` 双语动态写入。

## 动态文案与数据一致性
- 会随内容变化的数字与日期不写死：安全条目数、题数、课程数、计划数用 `{n}` 占位符，媒体快照日期用 `{date}`；`app.js` 的 `fill()` 在渲染时从 `CONTENT` 注入。
- 自测满分由最后一档 `bands[].max` 推导，不再写死 `/ 14`。
- 39 条安全条目按 `venue → contraindication → emergency → child → gear` 连续分组，`check.js` 强制校验，避免后补条目插错组。

## SEO 与可访问性
- 12 个页面均有静态 `canonical` / OG / Twitter / JSON-LD 元信息，正文在 `<noscript>` 中保留可抓取摘要；不依赖 JS 也能读到核心内容。
- 4 款正式泳姿各有独立静态 URL（`stroke-*.html`），复用 `stroke-page.js`，避免 `?id=` 参数页无法被单独收录。
- 安全搜索支持多关键词 AND、标题优先的相关性排序、`<mark>` 命中高亮、`aria-live` 结果播报与可分享的 `?q=` 链接。
- 切换语言时保留自测答案/结果与已点开的视频；封面有尺寸、`referrerpolicy="no-referrer"`、双语 alt 与加载失败兜底；支持 `prefers-reduced-motion`。

## 文件结构
- `content.js` — 站点数据：4 泳姿 + 1 隐藏款狗刨（模板 A）、39 条安全条目（模板 B，`reviewed` 均为 `false`、均带 `level`）、`reviewPolicy`、`basics` / `advanced` / `training`（模板 C）、`strokeLinks` / `safetyLinks` 互链表、等级地图、自测题库。
- `app.js` — i18n、顶部导航/页脚（含 3 个新页入口）、卡片渲染（审核状态 + 锚点 + 互链）、`safetyLinksHtml` / `nextLinksHtml` 共享 helper。
- `styles.css` — 清爽运动风（蓝/青主色、卡片化、响应式：移动端汉堡菜单）+ 审核状态、课程 / 训练 / 装备模块与互链样式。
- `stroke-page.js` — 泳姿详情共享渲染逻辑（动态版与 4 个静态入口页共用，仍从 `content.js` 取数据）。
- `check.js` — 本地内容审核闸门（`node check.js`，零依赖，不参与页面加载），24 项校验含双语、审核留痕、等级计划对齐、互链、动态文案、SEO 静态元信息与 a11y 设施。
- `sitemap.xml` / `robots.txt` — 静态站点地图与抓取规则（部署时把 `example.com` 换成真实域名）。
- `REVIEW-审核记录.md` — 金标准大纲、39 条逐条终审表、来源补录规范与变更记录。

## 隐藏款 🐕
泳姿列表最后一张「？？？·已上锁」卡片就是彩蛋（狗刨 Dog Paddle）：点进去是完整模板结构的玩笑版（简介/动作分解/节奏/纠错/练习计划 + 3 条 B 站梗视频），详情页带「🥚 彩蛋泳姿 · 仅供娱乐」徽章；首页精选与「上一/下一泳姿」导航都不展示它（只在正式 4 条内循环），双语齐全。

## 媒体素材（已替换占位）
- 视频：B 站内嵌播放器（点击封面播放）+ 「在 B 站打开」外部链接。每个泳姿 3 条：主教程、分解/原理、纠错，均按点赞+收藏从 B 站搜索与作者合集中挑选；快照日期集中在 `CONTENT.mediaSnapshot`，页面文案通过 `{date}` 动态注入。
- 图片：卡片封面直接采用对应视频的 B 站封面（`i*.hdslb.com`），带尺寸、双语 alt、`referrerpolicy="no-referrer"` 与加载失败兜底。
- 新增泳姿时：在 `content.js` 的 `videos[]` 里加 `{bvid, pic, title, up, like, collect, min, label}`，并在 `strokeLinks` 里补齐该泳姿的相关安全与下一步。

## 内容审核状态（当前：AI 初稿，未终审）
- 39 条安全 / 医学条目 `reviewed` 全部为 `false`；`source` 是「引用方向建议（未核实）」，不是已核实出处。
- 页面展示「⚠ AI 初稿 · 待教练终审」徽章、安全页审核横幅、含数值 / 急救操作条目的「特别提示」，页脚为真实免责 + 急救电话（中国大陆 120）。
- L0 / L3 / 训练与装备页同为 AI 初稿，含安全前提提示并链接待审条目，终审时需一并核对。
- **上线前必须由持证教练（医学 / 急救类加医生）终审**：流程、金标准大纲与 39 条逐条记录见 `REVIEW-审核记录.md`。

## 上线前必过「审核闸门」
1. 运行 `node check.js`（零依赖，仅本地运行，不参与页面加载），退出码必须为 0。
2. 闸门强制：双语 `zh`/`en` 非空、id 唯一、三段结构齐全、`reviewed === true` 的条目必须补齐 `review{}` 与 `sourceRef{}` 留痕、渲染层不得伪造「已审核」、全部泳姿 `level` 与 `plan` 对齐、互链 id 与站内链接可达、五类连续分组、动态占位符与 `fill()` 存在、彩蛋不进入泳姿循环。
3. 与金标准大纲关键点覆盖率 ≥ 90%（人工核对，记录在 `REVIEW-审核记录.md`）。
4. 全部通过后，才能把 `CONTENT.reviewPolicy.status` 改为 `approved` 并填写 `owner`。

## 预留迁移字段
泳姿带 `id / level`，安全条目带 `id / level / category`（39 条 `level` 已按分类补齐）；满足 PRD 中「方案 B 平滑升级」的数据模型要求。
