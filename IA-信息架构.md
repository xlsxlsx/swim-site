# 游泳教学网站 · MVP 信息架构（站点地图）

> 技术形态：方案 A 静态站 ｜ 风格：清爽运动风 ｜ 语言：中英双语可切换

## 1. 站点地图（Site Map）

```
游泳教学站 (根)
├── 首页 / Home                      index.html
│   ├── Hero（主张 + 等级入口）
│   ├── 等级地图 L0–L3（可视化学习路径）
│   ├── 精选泳姿（4 张泳姿卡 → 详情）
│   └── 精选安全（安全要点入口）
│
├── 泳姿教程 / Strokes              strokes.html
│   ├── 蛙泳 Breaststroke   → stroke.html?id=breaststroke
│   ├── 自由泳 Freestyle    → stroke.html?id=freestyle
│   ├── 仰泳 Backstroke     → stroke.html?id=backstroke
│   └── 蝶泳 Butterfly      → stroke.html?id=butterfly
│
├── 泳姿详情 / Stroke Detail        stroke.html?id=<slug>
│   ├── 简介 / 动作分解 / 节奏与配合 / 常见错误
│   ├── 练习计划（按 level 分 L0–L3）
│   ├── B 站教学视频（点击封面内嵌）
│   └── 相关安全条目 + 下一步路径
│
├── 泳姿静态入口 / Stroke Landing    stroke-<slug>.html
│   ├── 蛙泳 / 自由泳 / 仰泳 / 蝶泳：独立 URL + 静态 meta + noscript 摘要
│   └── 共享 stroke-page.js 渲染，不复制数据
│
├── 安全注意事项 / Safety           safety.html
│   ├── 审核状态横幅 + 五类连续分组筛选（venue→contraindication→emergency→child→gear）
│   ├── 条目三段结构 + 待终审徽章 / 引用建议 / 特别提示
│   └── 相关条目互链 + #s-<id> 深链锚点
│
├── L0 零基础 5 课 / Basics         basics.html
│   └── 适应水 / 呼气 / 俯漂站立 / 仰漂呼救 / 扶边移动
│
├── 训练与装备 / Training & Gear    training.html
│   ├── L1–L3 周训练计划（周期 / 频率 / 量化指标）
│   └── 9 类装备选购判断标准与避坑
│
├── L3 进阶技术 / Advanced          advanced.html
│   └── 转身 / 出发 / 配速周期化 / 录制自查清单
│
├── 等级自测与学习路径 / Levels     levels.html
│   ├── L0–L3 可点击路径卡
│   └── 5 题问卷 → 计分 → 推荐等级 + 3 个内容入口
│
└── 页脚 Footer（免责声明 / 急救电话 / 内容状态 / 全站 7 个页面入口 / 语言切换）
```

## 2. 页面清单与字段（Page Inventory）

| 页面 | 类型 | 数据来源 | 关键模块 |
|------|------|----------|----------|
| 首页 | 聚合页 | content.js（精选） | Hero（零基础入口）、可点击等级地图、精选泳姿、精选安全 |
| 泳姿列表 | 列表页 | content.strokes[] | 4 张泳姿卡 + 1 张隐藏款彩蛋卡 |
| 泳姿详情 | 数据驱动页 | content.strokes[id]、strokeLinks | 简介/分解/节奏/纠错/分等级计划/视频 + 相关安全与下一步 |
| 泳姿静态入口 ×4 | 静态入口页 | content.strokes[id]、stroke-page.js | 独立 URL、静态 SEO meta 与 noscript 摘要，共享渲染逻辑 |
| 安全 | 列表+筛选 | content.safety[]、safetyLinks | 审核横幅、五分类、搜索、三段结构、待终审标记、互链与深链锚点 |
| L0 零基础 5 课 | 课程页 | content.basics | 5 课（目标/步骤/纠错/相关安全）+ 下一步 |
| 训练与装备 | 聚合页 | content.training | L1–L3 周计划 + 9 类装备选购 |
| L3 进阶 | 课程页 | content.advanced | 4 个技术模块 + 自查清单 + 下一步 |
| 等级自测与路径 | 交互页 | content.levels、content.quiz | L0–L3 路径卡、5 题、计分、推荐等级 + 3 个入口 |

## 3. 导航与全局组件
- **顶部导航**：Logo / 泳姿 / 安全 / 等级自测 / 语言切换（中⇄EN），保持 4 项不拥挤。
- **页脚入口**：在顶部 4 项之外追加「零基础 5 课 / 训练与装备 / L3 进阶」三个静态页链接。
- **语言切换**：全局状态，存 `localStorage`，默认 `zh`。
- **响应式**：移动端汉堡菜单；桌面横向导航。
- **页脚**：真实免责声明、急救电话、内容状态与日期、版权、全站 7 个页面入口。

## 4. URL 与 i18n 策略（静态、无构建）
- 多语言**不**用独立 URL（保持 SEO 简单），同一页面内通过 JS 切换 `zh/en` 文案。
- 内容以 JS 对象 `CONTENT` 内联（避免 `file://` 下 `fetch` 跨域问题），结构见《内容模板》。
- 泳姿详情用查询参数 `?id=`，前端按 slug 渲染，便于扩展新泳姿只需加数据。
- 安全条目用 `#s-<id>` 深链；因条目为 JS 动态渲染，`safety.html` 在渲染后按 hash 滚动并高亮目标卡片。
- 全站共 8 个 HTML 文件：`index / strokes / stroke / safety / levels / basics / training / advanced`，均为无构建静态页。

## 5. SEO 与可访问性（静态友好）
- 每页 `<title>` / `<meta description>` 双语动态写入。
- 语义化标签（header/nav/main/section/article/footer）。
- 图片 `alt`、按钮 `aria-label`、对比度达标（Lighthouse A11y ≥ 90）。
