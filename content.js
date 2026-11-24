/* ============================================================
 * content.js — 游泳教学网站内容数据（方案 A 静态站）
 * 按《内容模板.md》结构化；双语字段 zh/en 一致。
 * AI 初稿：安全/医学条目尚未经人工终审，reviewed 均为 false；
 * source 仅为「引用方向建议」，不是已核实出处（终审规范见 REVIEW-审核记录.md）。
 * 审核状态与闸门由 CONTENT.reviewPolicy 与 check.js 管理。
 * 以 <script> 内联加载，避免 file:// 下 fetch 跨域问题。
 * ============================================================ */
const CONTENT = {

  homeMeta: {
    zh: "系统化游泳教学：蛙泳/自由泳/仰泳/蝶泳分步教程，{n} 条安全注意事项（含游泳用品），等级自测与 L0–L3 学习路径。",
    en: "Systematic swimming lessons: step-by-step breaststroke, freestyle, backstroke & butterfly tutorials, {n} safety notes including swim gear, and an L0–L3 level quiz."
  },

  /* 媒体快照日期集中维护，避免写死在各页文案里 */
  mediaSnapshot: { date: "2026-10", label: { zh: "2026-10", en: "Oct 2026" } },

  /* ---------- 内容审核政策（真实状态 + 留痕） ----------
   * status: draft（AI 初稿，未终审）| in_review | approved
   * 逐条发布：reviewed 置 true 并补 review{} 与 sourceRef{} → 跑 node check.js
   * 全站 approved 前必须全部条目通过，详见 REVIEW-审核记录.md。
   */
  reviewPolicy: {
    status: "draft",
    asOf: "2026-11-05",
    owner: "",
    summary: {
      zh: "本站安全与医学类条目均为 AI 结构化初稿，尚未经持证教练与医生终审；条目中的「来源」目前只是引用方向建议，不是已核实的出处。终审前内容仅供学习参考，不构成急救或医疗建议。",
      en: "All safety and medical entries here are AI-generated structured drafts, not yet signed off by a certified coach or physician. The 'source' field is a suggested citation direction, not a verified reference. Until sign-off, this content is for learning only and is not first-aid or medical advice."
    },
    sourceRule: {
      zh: "终审要求：每条补录机构 + 指南/文件名 + 版本或年份 + 链接 + 核对日期；含具体数值或急救操作的条目须由医生复核。",
      en: "Sign-off requires, per entry: organisation + guideline/document name + edition or year + URL + verification date. Entries containing numeric thresholds or first-aid procedures require physician review."
    },
    caveatNote: {
      zh: "本条含具体数值或急救操作，须以持证教练、医生及场馆现场规定为准；遇紧急情况立即呼叫当地急救电话（中国大陆 120）并通知救生员。",
      en: "This entry contains numeric thresholds or first-aid procedures; defer to a certified coach, physician, and venue rules. In an emergency, call your local emergency number (120 in mainland China) and alert the lifeguard."
    },
    caveatIds: [
      "venue_diving", "venue_storm",
      "contra_alcohol", "contra_food", "contra_illness", "contra_heart", "contra_knee",
      "choking", "cramp", "hypothermia", "exhaustion", "drowning_rescue",
      "child_supervision", "child_floaties", "child_skills", "child_age", "child_zones",
      "gear_lifejacket", "gear_prescription"
    ]
  },

  /* ---------- 等级地图 L0–L3（PRD 用户画像） ---------- */
  levels: [
    { id: "L0",
      name: { zh: "零基础", en: "Zero base" },
      href: "basics.html",
      focus: { zh: "克服恐水、建立水中安全感：水中呼吸、漂浮、扶边移动",
               en: "Overcome fear of water: breathing in water, floating, wall-held movement" },
      next: { zh: "先完成「下水前 5 课」，再进入蛙泳 L0 计划；全程浅水区有人陪同",
              en: "Finish the 5 pre-swim basics lessons, then start the breaststroke L0 plan — always with a companion in shallow water" } },
    { id: "L1",
      name: { zh: "入门", en: "Beginner" },
      href: "stroke.html?id=breaststroke",
      focus: { zh: "完整学会一种泳姿：动作分解、换气连贯、连续游 50m+",
               en: "Finish one complete stroke: step breakdown, continuous breathing, 50m+ swims" },
      next: { zh: "按蛙泳分步教程学习，配合 L1 周训练计划，4–6 周掌握第一个泳姿",
              en: "Follow the breaststroke course with the L1 weekly plan; 4–6 weeks to your first stroke" } },
    { id: "L2",
      name: { zh: "进阶", en: "Intermediate" },
      href: "training.html",
      focus: { zh: "动作效率与训练计划：连续游、提速、减脂、装备选购",
               en: "Efficiency & training plans: swim longer, faster, burn fat, gear picks" },
      next: { zh: "深化自由泳/仰泳技术，按 L2 周计划做配速与间歇训练",
              en: "Deepen freestyle/backstroke technique with the L2 weekly plan: pacing and interval sets" } },
    { id: "L3",
      name: { zh: "精通", en: "Advanced" },
      href: "advanced.html",
      focus: { zh: "高阶技术（蝶泳、转身、出发）、配速与周期化训练、动作自查",
               en: "Advanced technique (butterfly, turns, starts), pacing & periodisation, self-review" },
      next: { zh: "专攻蝶泳与转身出发，用录制对照做自查，并把视频带给持证教练复盘",
              en: "Focus on butterfly, turns & starts; self-review with video footage and bring it to a certified coach" } }
  ],

  /* ---------- 首页精选安全条目 id ---------- */
  featuredSafety: ["cramp", "drowning_rescue", "child_supervision"],

  /* ---------- 泳姿教程（模板 A） ---------- */
  strokes: [
    {
      id: "breaststroke",
      emoji: "🐸",
      name: { zh: "蛙泳", en: "Breaststroke" },
      tagline: { zh: "最容易入门的泳姿，也是水中自救的核心技能",
                 en: "The easiest stroke to learn, and a core self-rescue skill" },
      level: ["L0", "L1", "L2"],
      overview: {
        zh: "蛙泳头部周期性露出水面，呼吸从容、节奏分明，适合零基础与健身人群。它的滑行段让体力消耗最省，学会蛙泳后你可以在深水区更从容地应对突发情况。",
        en: "In breaststroke the head emerges periodically, so breathing is relaxed and the rhythm is clear. It suits beginners and fitness swimmers, and its glide phase saves the most energy — after learning it, you can handle deep-water situations far more calmly."
      },
      breakdown: [
        { zh: "身体姿势：俯卧、肩部放松，脸入水，换气时头自然抬起，视线略前下方，滑行时保持流线型。",
          en: "Body position: prone with relaxed shoulders, face in the water; the head lifts naturally to breathe, gaze slightly forward-down; keep streamlined while gliding." },
        { zh: "腿部动作（收-翻-蹬-夹）：收腿时脚跟向臀部靠近；翻脚——脚尖外翻、小腿内侧对水；蹬夹是一次向后外发力，随后双腿并拢伸直。",
          en: "Legs (gather–rotate–sweep–squeeze): heels draw toward the hips; rotate the feet outward so the inner shins face the water; sweep outward-back in one power, then squeeze the legs straight together." },
        { zh: "臂部动作（外划-抱水-前伸）：双手前伸略宽于肩，向外下方轻划，在胸前抱水后主动前伸打直；肘不高过肩，不划向身体后方。",
          en: "Arms (out-sweep–press–forward): hands start in front, slightly wider than shoulders; sweep gently out and down, press water in front of the chest, then extend forward actively; elbows stay below shoulders, never sweep past the body." },
        { zh: "呼吸配合：外划时抬头吸气；前伸与蹬腿时低头，在水中呼气。换气与蹬腿不要在同一瞬间发力。",
          en: "Breathing: inhale as the arms sweep out and the head lifts; bow the head and exhale in the water during the forward extension and kick. Never breathe and kick in the same instant." },
        { zh: "节奏口诀：划手腿不动，收手再收腿，先伸胳膊后蹬腿，并拢伸直漂一会儿。",
          en: "Rhythm rhyme: arms pull while legs stay still; hands return before legs gather; extend arms before kicking; then glide straight for a moment." }
      ],
      rhythm: {
        zh: "蛙泳是 1:1:1 的节奏：一次划臂、一次蹬腿、一次呼吸，配合完成后有一个明显的滑行段。速度来自蹬腿推进加流线型滑行，而不是拼命划频。",
        en: "Breaststroke runs on a 1:1:1 rhythm: one arm pull, one kick, one breath, followed by a clear glide. Speed comes from the leg drive plus a streamlined glide, not from a frantic arm rate."
      },
      mistakes: [
        { zh: "蹬腿不翻脚，蹬水时小腿内侧不对着水，推进力很弱",
          en: "Kicking without rotating the feet out — the inner shins never face the water, so the kick barely propels",
          fix: { zh: "收腿后刻意勾脚尖、脚尖外翻，感受小腿内侧对水；先在池边扶杆单独练「收-翻」，再配蹬夹。",
                en: "After gathering, deliberately flex the ankles and turn the toes out; feel the inner shins facing the water. Practise gather-rotate holding the wall first, then add the sweep-squeeze." } },
        { zh: "换气抬头过高，头抬起时腰腹塌陷、身体下沉",
          en: "Lifting the head too high to breathe, so the hips drop and the body sinks",
          fix: { zh: "换气幅度最小化，下颌微收，头与脊柱保持在一条线上；练「换气后立刻低头前伸」。",
                en: "Minimise the head lift, tuck the chin, keep the head in line with the spine; drill 'bow immediately and extend forward after every breath'." } },
        { zh: "收腿幅度过大、双脚拖水，阻力大于推进",
          en: "Gathering the legs too wide, dragging the feet and creating more drag than propulsion",
          fix: { zh: "收腿时脚跟贴近臀部、幅度小；快蹬快夹，缩短回收时间，蹬完立刻并拢滑行。",
                en: "Keep heels close to the hips with a small range; kick and squeeze quickly, cut recovery time short, and glide with legs together right after." } },
        { zh: "手臂划过肩线以下、划向身体后方，抱水变「压水」",
          en: "Arms sweeping below the shoulder line and past the body, turning the press into pushing water backwards",
          fix: { zh: "双手只在肩前与胸前活动；想象「在胸前合上一本书」，前伸主动打直。",
                en: "Keep the hands only in front of and between the shoulders; imagine closing a book in front of your chest, and extend forward actively." } },
        { zh: "手腿同时发力，动作挤成一团，越游越累",
          en: "Arms and legs firing at the same time, cramming the stroke together and exhausting quickly",
          fix: { zh: "严格分时序：划手→收手→收腿→蹬夹→滑行；用「2 次蹬腿 + 1 次划手」的分解练习固化节奏。",
                en: "Enforce the sequence: pull, hands return, legs gather, sweep-squeeze, glide. Use the drill 'two kicks per arm pull' to lock the rhythm in." } }
      ],
      plan: {
        L0: { zh: "前置：完成「下水前 5 课」。1) 浅区扶边俯漂与自主站立 8 次；2) 扶边轻打腿 3×15 秒；3) 岸上坐姿模仿「收-翻-蹬-夹」2 组；4) 只在浅区活动，全程有人陪同。",
              en: "Prerequisite: finish the 5 pre-swim basics lessons. 1) 8 wall floats with independent standing; 2) 3×15 s gentle wall kick; 3) 2 sets of seated gather-rotate-sweep-squeeze mimicry on deck; 4) shallow water only, always accompanied." },
        L1: { zh: "1) 扶板蛙泳腿 2×25m（体会收-翻-蹬-夹）；2) 蛙泳腿+呼吸分解 4×15m；3) 完整配合 2×15m，每次滑行默数 2 秒。每周 2–3 次。",
              en: "1) Kick with a board 2×25m (feel gather-rotate-sweep-squeeze); 2) kick + breathing drill 4×15m; 3) full coordination 2×15m, counting 2 seconds of glide each cycle. 2–3 sessions per week." },
        L2: { zh: "计数蛙泳 8×50m（每动作周期数划水次数，记录每 50m 用几次动作）；每 4 组插入 25m「长滑行」冲刺；计时 100m 记录配速并逐周缩短。",
              en: "Counted breaststroke 8×50m (count pulls per cycle, log pulls per 50m); insert a 25m long-glide sprint every 4 sets; time a 100m and shorten the pace week by week." }
      },
      videos: [
        { bvid: "BV15k4y1i7hg", pic: "https://i0.hdslb.com/bfs/archive/e1c6de511bafc57a2fb6fdace1fe8f3f8a0ffdc0.jpg",
          title: "零基础教你6步学会蛙泳", up: "游泳宋浩林", like: 49843, collect: 63468, min: 5,
          label: { zh: "完整教程：6 步学会蛙泳", en: "Full tutorial: 6 steps to breaststroke" } },
        { bvid: "BV1TM4y1279h", pic: "https://i1.hdslb.com/bfs/archive/9173b24abc27fe222c526a5d2ae7eafcb8087bb0.jpg",
          title: "蛙泳前进动力的秘密（小腿外翻原理）", up: "思南是只游泳的喵大厨", like: 24907, collect: 31181, min: 8,
          label: { zh: "分解示意：蛙泳腿收-翻-蹬-夹原理", en: "Diagram: whip-kick rotation & drive" } },
        { bvid: "BV1fp4y167mD", pic: "https://i1.hdslb.com/bfs/archive/a22a9082996a1509099f31f5a0278818baf22124.jpg",
          title: "蛙泳腿的常见错误动作", up: "梦觉教游泳", like: 26849, collect: 20825, min: 10,
          label: { zh: "常见错误逐条纠正", en: "Common mistakes, fixed one by one" } }
      ]
    },

    {
      id: "freestyle",
      emoji: "🏊",
      name: { zh: "自由泳（爬泳）", en: "Freestyle (Front Crawl)" },
      tagline: { zh: "最快的泳姿，健身与长距离游泳的主力",
                 en: "The fastest stroke, the workhorse of fitness swimming" },
      level: ["L1", "L2", "L3"],
      overview: {
        zh: "自由泳速度来自连续推进：身体绕纵轴滚动、高频小幅度打水、高肘划水。换气是「侧头」而不是「抬头」，这一条决定了 80% 新手的成败。适合从蛙泳过渡到效率型泳姿的 L1–L2 泳者。",
        en: "Freestyle speed comes from continuous propulsion: body roll along the axis, a fast small-amplitude kick, and a high-elbow pull. Breathing means turning the head, not lifting it — this single point decides 80% of beginner outcomes. Ideal for L1–L2 swimmers moving from breaststroke to an efficiency stroke."
      },
      breakdown: [
        { zh: "身体姿势：俯卧，头部与脊柱在一条线上，视线朝向池底，髋部保持在水面高度，不塌腰不翘臀。",
          en: "Body position: prone, head in line with the spine, gaze toward the pool floor, hips at water level — no sagging lower back, no puffed butt." },
        { zh: "打腿：髋部驱动，大腿带动小腿，膝盖放松、幅度小、频率快，脚面放松像鞭梢；常见六次打腿。",
          en: "Kick: hip-driven, legs from the thigh with relaxed knees, small amplitude, fast rate, ankle loose like a whip tip; the common 6-beat kick." },
        { zh: "划水：手在肩延长线上入水→前伸→高肘（肘高于手）抱水→沿身体推水到髋线→出水移臂，移臂放松。",
          en: "Pull: hand enters on the shoulder line, extends forward, catches water with a high elbow (elbow above hand), pushes back to the hip line, then a relaxed recovery swing." },
        { zh: "换气：身体滚动时侧转头，一只耳朵贴近水面，嘴微张吸一口，随后脸入水连续呼气；新手建议每 3 次划手换气（双侧平衡）。",
          en: "Breathing: as the body rolls, turn the head sideways, one ear skimming the surface, inhale through slightly open mouth, then face back in the water and exhale continuously; beginners should breathe every 3 strokes for bilateral balance." },
        { zh: "节奏配合：入水点决定方向，推水决定推进；划手与打腿的节拍稳定，全程像「滚动着前进的圆木」。",
          en: "Timing: the entry point sets direction, the push creates propulsion; keep a stable arm-leg cadence and feel like 'a rolling log moving forward'." }
      ],
      rhythm: {
        zh: "标准六拍：两次划手周期内身体左右各滚动一次；短距离冲刺可每 2 次划手换气，长距离用每 3 次划手换气保持双侧对称，配速以「每 50m 划手数」衡量效率。",
        en: "Standard 6-beat: the body rolls left and right once per two arm cycles. Sprint can breathe every 2 strokes; distance swims use every 3 strokes for bilateral symmetry; measure efficiency as stroke count per 50m."
      },
      mistakes: [
        { zh: "抬头换气，头一加高，髋和腿立刻下沉，阻力大增",
          en: "Lifting the head to breathe: raise the head and the hips and legs sink instantly, spiking drag",
          fix: { zh: "水中用鼻嘴持续呼气，脸保持朝下，只把下巴「转」到池底一侧露出水；练「侧脸贴水面呼吸」的扶板单臂练习。",
                en: "Exhale through nose and mouth in the water, keep the face down, and only 'turn' the chin to one side of the pool floor; drill side-face-at-surface breathing with a kickboard, one arm." } },
        { zh: "入水点越过身体中线（crossing over），身体蛇形摆动",
          en: "Hand entry crossing the body midline, making the body snake sideways",
          fix: { zh: "入水点落在肩的延长线上，前伸指向正前方；想象胸前有两条泳道线，手不出线。",
                en: "Land the hand on the shoulder's extension line pointing straight ahead; imagine two lane lines on your chest and never cross them." } },
        { zh: "膝式打水：膝盖过弯、小腿乱摆，越打越不前进",
          en: "Knee-kicking: knees bend excessively and the lower legs flutter without driving",
          fix: { zh: "髋部发力，腿相对伸直，幅度小频率快；扶板只练打腿 25m×4 找「鞭梢感」。",
                en: "Drive from the hips with a relatively straight leg, small and fast; drill kickboard-only 25m×4 to find the whip-tip feel." } },
        { zh: "沉肘划水、推水不到髋就出水，动作短而浅",
          en: "Dropping the elbow during the pull and exiting the water before reaching the hip — short, shallow strokes",
          fix: { zh: "前伸后保持高肘，用小臂和手掌「对」住水向后推，推水掌心扫过髋线才出水移臂。",
                en: "After extension keep the elbow high and 'hold' water with forearm and palm pushing back; the palm must brush past the hip line before recovery." } },
        { zh: "屏息游泳：出水吸一大口、水中憋气，越游越喘",
          en: "Holding your breath: gulping big air above water and holding it below, gasping harder each lap",
          fix: { zh: "脸入水就连续呼气（鼻嘴并用），出水瞬间只吸气，气量小、节奏稳。",
                en: "Exhale continuously the moment the face is in the water (nose and mouth together); inhale only in the split second above water — small breaths, steady rhythm." } }
      ],
      plan: {
        L1: { zh: "1) 扶板打腿 2×25m；2) 单臂划手+侧换气 左右各 4×25m；3) 完整游 4×25m，每 3 次划手换气；重点：入水点与换气不抬头。每周 3 次。",
              en: "1) Kickboard 2×25m; 2) one-arm drill with side breathing, 4×25m per side; 3) full swim 4×25m breathing every 3 strokes. Focus: entry line and no head lift. 3 sessions per week." },
        L2: { zh: "8×50m 计数游（目标：每 50m 划手数逐周减少 1–2 次）；2×「前伸滑行+单臂分解」25m；加入 fist drill（握拳划手）练高肘抱水；记录 400m 配速。",
              en: "8×50m counted swims (cut 1–2 strokes per 50m each week); 2× extension glide + one-arm drill 25m; add fist drill to train the high-elbow catch; log your 400m pace." },
        L3: { zh: "按目标配速分段游 10×50m（记录每 50m 划手数与用时）；双侧换气每 2 次划手切换一次；加入蹬壁转身预练 8×25m；按 L3 周期化计划做 3 周加量 + 1 周减量。",
              en: "10×50 m at goal pace (log strokes and time per 50 m); switch bilateral breathing every 2 strokes; add 8×25 m turn drills; follow the L3 periodised plan of 3 build weeks plus 1 deload." }
      },
      videos: [
        { bvid: "BV1bx411L7sA", pic: "https://i0.hdslb.com/bfs/archive/d6b47eb18fd5db8c32c3e08c13e9b998897b3dab.jpg",
          title: "【合集】自由泳入门（第二版）", up: "梦觉教游泳", like: 84944, collect: 164237, min: 281,
          label: { zh: "入门合集（内嵌第一集）", en: "Beginner series (embeds part 1)" } },
        { bvid: "BV1um42157S5", pic: "https://i2.hdslb.com/bfs/archive/62da9198bf8f547f8f5b8956d9b7a1fd0b6e4759.jpg",
          title: "20分钟系统教学步骤（自由泳）", up: "凌昊Dylan", like: 62292, collect: 103122, min: 22,
          label: { zh: "20 分钟系统步骤", en: "20-min systematic course" } },
        { bvid: "BV1Ts411W7Y5", pic: "https://i1.hdslb.com/bfs/archive/ad88b070b252aa015355ecf608e49265f9c11ab9.jpg",
          title: "自由泳腿的基本动作和练习", up: "梦觉教游泳", like: 8927, collect: 10630, min: 17,
          label: { zh: "分解：自由泳打腿", en: "Breakdown: the freestyle kick" } }
      ]
    },

    {
      id: "backstroke",
      emoji: "⭐",
      name: { zh: "仰泳", en: "Backstroke" },
      tagline: { zh: "脸部始终离水、呼吸自由的放松泳姿",
                 en: "Face always out of the water, breathing free — the relaxing stroke" },
      level: ["L1", "L2", "L3"],
      overview: {
        zh: "仰泳是唯一仰卧于水面的泳姿：不用换气技巧，视野安全，适合放松游、长距离休闲与伤后恢复。难点不在呼吸，而在保持直线与头部中立——头一沉，全身就沉。",
        en: "Backstroke is the only supine stroke: no breathing technique is needed, visibility is safe, and it suits relaxed swimming, long easy distance, and recovery after injury. The challenge is not breathing but staying straight and keeping the head neutral — when the head sinks, the whole body sinks."
      },
      breakdown: [
        { zh: "身体姿势：仰卧，头部中立、视线朝向脚的方向（看天），髋部贴近水面，像躺在「水中吊床」。",
          en: "Body position: supine, head neutral with gaze toward the feet (looking at the sky), hips close to the surface, lying on a 'water hammock'." },
        { zh: "打腿：连续上打水，幅度小、频率快，脚尖向下压（绷脚），水花不出水面；髋部下沉多因打腿过深。",
          en: "Kick: continuous upward flutter, small and fast, toes pointed down; keep spray below the surface — sinking hips usually mean the kick is too deep." },
        { zh: "臂部：交替直臂划圈；拇指先入水（入水点在肩延长线），沿身体两侧下压，出水时屈肘放松移臂。",
          en: "Arms: alternating straight-arm circles; the thumb enters first, on the shoulder's extension line; press down along the sides of the body, bend the elbow only in the relaxed recovery." },
        { zh: "呼吸：脸部离水，按节奏呼吸即可（如每两次划臂一次吸气），不要屏息。",
          en: "Breathing: the face is out of the water, so simply breathe on a rhythm (e.g. inhale every two arm cycles) — never hold your breath." },
        { zh: "路线控制：用池中线、天花灯光或天空做参照；到两端用脚触壁，练习转身时屈膝抱小腿翻面。",
          en: "Line control: use the lane line, ceiling lights, or the sky as reference; touch the wall with your feet at each end; on turns, bend the knee toward the chest to flip." }
      ],
      rhythm: {
        zh: "仰泳是均匀连续的节奏：六次打腿配一循环两次划臂；每次入水在身体正侧方肩延长线上，全程保持头部中立、下颌微收，像「压着一条直线滑行」。",
        en: "Backstroke is an even, continuous rhythm: six beats per two-arm cycle, each entry on the shoulder line at your side, head neutral with chin tucked — 'slicing along a straight line'."
      },
      mistakes: [
        { zh: "头部下沉、下巴前引，导致髋与腿一起下沉、走不动",
          en: "Head sinking with the chin leading forward, dragging hips and legs down so you stall",
          fix: { zh: "头放中立，目视脚的方向，想象「后脑勺轻轻搁在水面」；下颌微收，练仰漂 30 秒找头位。",
                en: "Keep the head neutral looking at your feet; imagine resting the back of your skull on the water; tuck the chin, and practise a 30-second float to find the position." } },
        { zh: "划水中途屈肘「折手」，推进变成压水花",
          en: "Bending the elbow mid-stroke, 'folding the arm', so the pull becomes splashing, not propulsion",
          fix: { zh: "入水后手臂伸直向下压水，直到髋侧才屈肘出水；扶板仰泳单臂分解 4×25m。",
                en: "After entry keep the arm straight and press down until the hip side; bend the elbow only to recover; drill single-arm backstroke with a board, 4×25m." } },
        { zh: "入水越过身体中线，身体左右摆动呈「S」形路线",
          en: "Entries crossing the midline, weaving an S-shaped path sideways",
          fix: { zh: "入水点严格落在肩的延长线上，拇指朝向正外侧；对中线游 25m 慢速找直线。",
                en: "Land exactly on the shoulder's extension line, thumb pointing straight out; swim 25m slowly along the lane line to feel the straight path." } },
        { zh: "髋部下沉、拖腿游泳，像「半坐在椅子里」",
          en: "Hips sinking and legs dragging, like sitting halfway into a chair",
          fix: { zh: "核心轻收、髋上浮；打腿幅度小频率快；仰姿扶板打腿 4×25m 练髋位。",
                en: "Brace the core lightly to lift the hips; kick small and fast; drill supine kickboard 4×25m to build hip position." } }
      ],
      plan: {
        L1: { zh: "1) 仰漂+小幅打腿 2×25m；2) 单臂仰泳划手左右各 4×25m；3) 完整仰泳 2×25m，用池中线控制路线；每周 2–3 次。",
              en: "1) Float + small kick 2×25m; 2) single-arm pull 4×25m per side; 3) full backstroke 2×25m steering by the lane line; 2–3 sessions per week." },
        L2: { zh: "6×50m 直线控制（数每 25m 划手数，追求划距稳定）；加「九点换气」（头位 12 点方向）；计时 200m 仰泳配速。",
              en: "6×50m line control (count strokes per 25m, aim for stable distance per stroke); add '12-o'clock head position' checks; time a 200m backstroke pace." },
        L3: { zh: "仰泳转身规则与翻面时机 8×25m；水下反蝶泳腿 6×10m；200m 配速游记录划距曲线；用侧面录制核对头位是否中立。",
              en: "8×25 m backstroke turns and legal roll timing; 6×10 m underwater dolphin kick on the back; log distance-per-stroke over a 200 m pace swim; check head neutrality with side-view footage." }
      },
      videos: [
        { bvid: "BV1Ts411h7r6", pic: "https://i0.hdslb.com/bfs/archive/69f46dfe751b23067cfa19f4a102aad98d622897.jpg",
          title: "【合集】仰泳入门", up: "梦觉教游泳", like: 9803, collect: 19759, min: 58,
          label: { zh: "仰泳入门合集（内嵌第一集）", en: "Backstroke beginner series" } },
        { bvid: "BV184411d7Cq", pic: "https://i2.hdslb.com/bfs/archive/e68bb5bf5aab9bf2d5c92db3abc98f9e3fa140a0.jpg",
          title: "仰泳漂浮基础练习（初学者第一课）", up: "双旭教游泳", like: 6832, collect: 7490, min: 12,
          label: { zh: "漂浮基础第一课", en: "Floating basics, lesson 1" } },
        { bvid: "BV1Nf4y1874K", pic: "https://i0.hdslb.com/bfs/archive/a52b2cbf64ced095e69eef3a25038f88103518f1.jpg",
          title: "鞭状打腿的本质（自由泳/仰泳/蝶泳腿部通用）", up: "梦觉教游泳", like: 13006, collect: 12418, min: 7,
          label: { zh: "腿部原理：鞭状打腿", en: "Whip-kick mechanics" } }
      ]
    },

    {
      id: "butterfly",
      emoji: "🦋",
      name: { zh: "蝶泳", en: "Butterfly" },
      tagline: { zh: "最具观赏性、对核心要求最高的泳姿",
                 en: "The most spectacular stroke, demanding the strongest core" },
      level: ["L2", "L3"],
      overview: {
        zh: "蝶泳靠「躯干波动」推进：胸腰的波浪带动海豚腿，双臂对称划水。它对核心、肩髋柔韧与节奏要求最高，建议自由泳熟练（连续 400m+）后再学。新手最常见的失败是只用手臂划水、核心不参与。",
        en: "Butterfly moves by 'trunk undulation': the chest-and-hip wave drives the dolphin kick while both arms pull symmetrically. It demands the most core strength, shoulder-hip flexibility and rhythm. Learn it after freestyle is solid (400m+ continuous). The classic beginner failure is arms-only pulling with the core doing nothing."
      },
      breakdown: [
        { zh: "身体姿势：俯卧，肩放松微含，胸部入水，像「弓背入水」；脊柱保持弹性，不塌腰。",
          en: "Body position: prone, shoulders relaxed and slightly rounded, chest entering the water 'bow-backed'; keep the spine elastic, no sag." },
        { zh: "海豚腿：髋→膝→踝依次波动（wave），每个动作周期两次打水（入水一次、推水一次）；幅度来自髋，不是膝盖乱弹。",
          en: "Dolphin kick: a hip→knee→ankle wave, two kicks per stroke cycle (one at entry, one at push); amplitude comes from the hips, not from knee-bouncing." },
        { zh: "划水：双臂对称外划-内划-前推；从大腿后方推水到位后，双臂同时经空中前摆，落回前伸。",
          en: "Pull: both arms sweep out, sweep in, push forward; the push finishes behind the thighs, then both arms swing forward through the air together and re-enter extended." },
        { zh: "呼吸：在推水末端抬头向前吸气（收下巴、视线略前），随即迅速把脸带回水面；吸气要短，避免抬头过高。",
          en: "Breathing: at the end of the push, lift the head forward to inhale (chin tucked, gaze slightly ahead), then bring the face straight back; keep the inhale short — never lift high." },
        { zh: "节奏配合：口诀「一划手两次腿」；推水与第二次打水同步完成，移臂时身体借波动前送，手入水借滑行。",
          en: "Timing: the rhyme is 'one pull, two kicks'; the second kick fires at the end of the push, the body surges forward on the wave during recovery, and the hands glide in at entry." }
      ],
      rhythm: {
        zh: "蝶泳是「波-推-摆-落」的循环节奏：入水时第一次打水，推水到髋时第二次打水与抬头吸气，移臂靠波的前送落手。节奏稳，才游得长；节奏乱，两圈就力竭。",
        en: "Butterfly cycles through wave–push–swing–land: the first kick fires at entry, the second kick plus the breath happens at the push past the hips, and the arms land on the forward surge of the wave. A steady rhythm swims long; a broken rhythm dies in two cycles."
      },
      mistakes: [
        { zh: "只靠手臂拉水、核心不波动，越游越像「平推」，快速力竭",
          en: "Arm-pulling only with no core wave, flattening into 'pressing' and gassing out fast",
          fix: { zh: "先练岸上俯卧 dolphin 波动与仰姿打腿；水中用胸腰起伏带动腿，划手力度减 30%，优先保节奏。",
                en: "Drill prone dolphin undulation on the pool edge and supine kicking first; in the water drive the kick from the chest-hip wave, cut arm force by 30%, protect the rhythm first." } },
        { zh: "呼吸抬头过高，髋立刻下沉，下一次入水变形",
          en: "Lifting the head too high to breathe, so the hips drop and the next entry is distorted",
          fix: { zh: "收下巴前看，吸气只用 0.5 秒；推水时手顺势「压」头抬起，脸快速回位。",
                en: "Tuck the chin and look forward; inhale in only half a second; let the push lift the head, and snap the face straight back." } },
        { zh: "双臂不对称（左右划水幅度/时序不一），路线歪斜",
          en: "Asymmetric arms (unequal pull size/timing), veining off the lane",
          fix: { zh: "池边俯卧练双臂同步「外划-内划-推水」；水中做「双臂前伸同时推水到髋」的镜像分解。",
                en: "Drill the out-in-push sequence prone on the wall with both arms in sync; in the water do mirror drills: extended entry, push to the hips with both arms at once." } },
        { zh: "推水不完整，手从胸前就前伸，等于只做了一半划水",
          en: "Cutting the push short and recovering from the chest, so half the stroke is wasted",
          fix: { zh: "推水终点在大腿后方（掌心扫髋后）；用「推水触腿」口令分解练习固化终点。",
                en: "Finish the push behind the thighs (palm brushing past the hip); use the cue 'push past the legs' in drill sets to lock the endpoint." } }
      ],
      plan: {
        L2: { zh: "前置条件：自由泳连续 400m。1) 池边 dolphin 波动+仰姿打腿各 2 组；2) 蝶泳腿扶板 4×25m；3) 单臂蝶泳左右各 4×25m；4) 完整游（不换气/每 2 圈换气）2×15m。",
              en: "Prerequisite: 400m continuous freestyle. 1) Prone dolphin wave + supine kick, 2 sets each; 2) kickboard butterfly 4×25m; 3) single-arm fly 4×25m per side; 4) full swim (no breath, or breathe every 2 cycles) 2×15m." },
        L3: { zh: "6×50m 节奏游（呼吸每 2 圈，配速 1:2:1）；2×「长划水」追求每动作推进；加转身与出发预练；按 L3 周期化计划记录每 50m 划频与配速。",
              en: "6×50m rhythm swims (breath every 2 cycles, pace pattern 1:2:1); 2× long-stroke sets chasing distance per pull; add turn & start drills; log stroke rate and pace per 50m under the L3 periodised plan." }
      },
      videos: [
        { bvid: "BV17vgQ6qE4i", pic: "https://i0.hdslb.com/bfs/archive/d1120ffbf4ea43fe9a07b40502a9d91fa777b8d0.jpg",
          title: "Fami 教你学蝶泳（啊源教游泳）", up: "啊源教游泳", like: 6336, collect: 7548, min: 8,
          label: { zh: "蝶泳主教学", en: "Main butterfly lesson" } },
        { bvid: "BV1Ju4m1K72S", pic: "https://i1.hdslb.com/bfs/archive/61e540e68d027375fab637b799318a7421dd5a5d.jpg",
          title: "蝶泳入门（3）海豚踢腿陆上模拟（分解动作、常见错误）", up: "思南是只游泳的喵大厨", like: 1875, collect: 2283, min: 14,
          label: { zh: "分解：海豚踢陆上训练", en: "Breakdown: dolphin-kick land drill" } },
        { bvid: "BV1zZ4y1174w", pic: "https://i2.hdslb.com/bfs/archive/d24e4a29ffe1561eb7ea724b93cb3740ed32e770.jpg",
          title: "水下蝶泳腿方向的控制示范", up: "梦觉教游泳", like: 825, collect: 199, min: 1,
          label: { zh: "示范：水下蝶泳腿方向", en: "Demo: underwater dolphin kick line" } }
      ]
    },

    /* ---------- 隐藏款彩蛋（仅供娱乐，非教学建议） ---------- */
    {
      id: "dogpaddle",
      emoji: "🐕",
      hidden: true,
      name: { zh: "狗刨", en: "Dog Paddle" },
      tagline: { zh: "无师自通的远古泳姿：气势满分，推进为零",
                 en: "The self-taught ancient stroke: all vibes, zero propulsion" },
      level: ["彩蛋"],
      overview: {
        zh: "狗刨是人类出厂自带泳姿：无需学习、无师自通，四肢高频乱抓、水花气势拉满，前进量主要看情绪。各大游泳协会均未把它列入正式泳姿——本页面为彩蛋，不构成任何教学建议，请以正规教程为准。",
        en: "The dog paddle is humanity's factory-default stroke: no lessons required, hands scrambling, splashes magnificent, forward motion determined by panic. No swimming authority has ever recognised it — this page is an easter egg, not teaching advice. Real swimming starts with the proper tutorials."
      },
      breakdown: [
        { zh: "身体姿势：头颈高昂，视线锁定岸上观众，下巴与水面呈 45°，气势拉满。",
          en: "Posture: head high, gaze locked on the shore audience, chin 45° above the surface, drama fully loaded." },
        { zh: "手部动作：双掌高频乱抓，水花越大越像会游。官方推进力：以气氛计。",
          en: "Arms: palms scramble at high frequency; the bigger the splash, the more it looks like swimming. Official propulsion rating: measured in vibes." },
        { zh: "腿部动作：双腿在池底疯狂寻找存在感，效率随水深递减，浅水区称王。",
          en: "Legs: feet search the pool floor for validation; efficiency drops with depth — undefeated champion of the shallow end." },
        { zh: "呼吸配合：全靠勇气。水花越响，喊声越大，围观群众越多。",
          en: "Breathing: entirely courage-based. The louder the splashing, the louder the shouting, the bigger the crowd." },
        { zh: "前进节奏：实测手速×10，前进≈1。建议配合救生圈使用效果更佳（玩笑，游泳请找教练）。",
          en: "Rhythm: field-tested — arm speed ×10 yields forward ≈1. Pair with a life ring for better results (joke: for real swimming, hire a coach)." }
      ],
      rhythm: {
        zh: "狗刨没有节奏，只有情绪：越慌越扑腾，越扑腾越慢，越慢越慌——一个完美的负反馈闭环。",
        en: "Dog paddle has no rhythm, only emotion: panic → thrashing → slowing → more panic. A perfectly closed negative-feedback loop."
      },
      mistakes: [
        { zh: "抬头过高，颈椎很累，前进为零",
          en: "Head too high: the cervical spine is exhausted, forward motion is nil",
          fix: { zh: "纠正：改学蛙泳。抬头蛙都比它快。", en: "Fix: switch to breaststroke. Even head-up breaststroke is faster." } },
        { zh: "水花四溅，岸上观众受伤",
          en: "Splash zone extends beyond the pool, audience casualties",
          fix: { zh: "纠正：选择无人的时段练习，或向场馆申请「表演区」。", en: "Fix: practise in off-peak hours, or petition the venue for a designated performance zone." } },
        { zh: "腿不踢水，专踢池底，越踢越沉",
          en: "Kicks target the pool floor, not the water; deeper and deeper",
          fix: { zh: "纠正：报名正规游泳班，从漂浮课开始。", en: "Fix: enrol in a real swim class, starting with floating lessons." } },
        { zh: "体力消耗巨大，收益极低，性价比为负",
          en: "Enormous energy cost, negligible return, negative value-for-money",
          fix: { zh: "纠正：把力气花在报课上——学费比卡路里便宜。", en: "Fix: spend the effort on class fees — tuition is cheaper than calories." } }
      ],
      plan: {
        L1: { zh: "1) 池边围观蛙泳学员 10 分钟，产生学习动机；2) 下水扑腾 15 秒，确认人生理想；3) 上岸，报名游泳班。",
              en: "1) Watch breaststroke students from the deck for 10 minutes to build motivation; 2) thrash in the water for 15 seconds to confirm your life goals; 3) get out and sign up for a swim class." },
        L2: { zh: "退练计划：蛙泳 4 周 → 自由泳 4 周；狗刨仅保留为「落水表情包」，情绪稳定时使用。",
              en: "De-escalation plan: 4 weeks breaststroke → 4 weeks freestyle; keep the dog paddle only as a water meme sticker, for emotional-stable moments." }
      },
      videos: [
        { bvid: "BV1854y1T7Cu", pic: "https://i0.hdslb.com/bfs/archive/4d7f800b5f5874ecd0401ad9e2afcf981305922f.jpg",
          title: "游泳教练千万人，唯独抬头蛙与狗刨式可无师自通", up: "游你开始", like: 1507, collect: 893, min: 2,
          label: { zh: "无师自通篇：抬头蛙与狗刨式", en: "Self-taught edition: head-up & dog paddle" } },
        { bvid: "BV1uG411H7K9", pic: "https://i2.hdslb.com/bfs/archive/417f6bab476a7168ed0071303aad840f2a26280c.jpg",
          title: "平静的泳池，跑跳潜过去，蝶泳游回来", up: "梦觉教游泳", like: 2405, collect: 170, min: 1,
          label: { zh: "氛围组：入水靠跑跳", en: "Vibes edition: enter by sprint-jump" } },
        { bvid: "BV1sb411P7ae", pic: "https://i1.hdslb.com/bfs/vc/i181102ws3bbrbjp3qls04162mhdbp0r_0022.jpg",
          title: "关于蛙泳对游泳初学者的作用", up: "梦觉教游泳", like: 10317, collect: 17399, min: 6,
          label: { zh: "正经对照：学完蛙泳，告别狗刨", en: "Serious reference: learn breaststroke, say goodbye" } }
      ]
    }
  ],

  /* ---------- 安全条目（模板 B，数量以 CONTENT.safety.length 为准，≥ 20 KPI） ---------- */
  safety: [
    /* --- 场所安全 venue --- */
    {
      id: "venue_select", category: "venue",
      level: ["L0", "L1"],
      title: { zh: "选择正规游泳场所", en: "Choose a Legit Facility" },
      risk: { zh: "无资质场所常缺救生员与急救预案，水质不达标；事故发生时救援与就医链条长，小事故易变大事故。",
             en: "Unlicensed venues often lack lifeguards and emergency plans, with substandard water quality; when accidents happen the rescue and medical chain is long, and small incidents turn big." },
      prevention: { zh: "查看营业执照与救生员执照公示；下水前确认当班救生员在池边巡视；留意深浅区标识、淋浴与水质公示；记下场馆急救电话。",
                    en: "Check the posted business and lifeguard licences; confirm an on-duty lifeguard patrols before you enter the water; note depth-zone signs, hygiene notices; record the venue's emergency number." },
      emergency: { zh: "遇险优先向救生员示意与呼救；同伴失踪立即请场馆启动泳池搜救，记录其下水时间与最后出现位置。",
                   en: "In trouble, signal the lifeguard first; if a companion disappears, ask the venue to launch a pool search immediately and log when they went under and where they were last seen." },
      reviewed: false,
      source: { zh: "参考公开救生指南，需持证教练终审", en: "Based on public lifeguard guidelines; final sign-off by a certified coach required" }
    },
    {
      id: "venue_slip", category: "venue",
      level: ["L0", "L1"],
      title: { zh: "池边防滑：不奔跑、不推挤", en: "Deck Safety: No Running, No Pushing" },
      risk: { zh: "泳池周边地面湿滑，奔跑、推挤极易滑倒撞伤，或跌向池边造成入水失控与二次伤害。",
             en: "Pool decks are slippery; running and horseplay cause slips, collisions, and falls onto the pool edge with loss of entry control and secondary injury." },
      prevention: { zh: "穿防滑拖鞋小步行走；进入池边区域前放下随身物品；不在池边玩追逐游戏；儿童由成人牵行。",
                    en: "Wear non-slip sandals and walk; stash belongings before entering the deck area; no chase games near the water; children walk holding an adult's hand." },
      emergency: { zh: "滑倒后先离开水边检查伤处；出血用干净布压迫止血；疑颈背疼痛按脊柱损伤处理，不搬动、立即呼叫场馆急救。",
                   en: "After a slip, move away from the water and check injuries; press a clean cloth on bleeding; if neck/back pain is suspected treat as spinal injury — do not move the person, call venue emergency response." },
      reviewed: false,
      source: { zh: "场馆安全通则，需持证教练终审", en: "Standard venue safety rules; final sign-off by a certified coach required" }
    },
    {
      id: "venue_diving", category: "venue",
      level: ["L0", "L1"],
      title: { zh: "跳水安全：浅水禁止头先入水", en: "Diving Safety: No Head-First Dives in Shallow Water" },
      risk: { zh: "跳水对水深、姿态要求苛刻；在浅水、陌生水域或拥挤区域头先入水可造成颈椎、脊髓损伤，后果往往不可逆。",
             en: "Diving demands strict depth and body line; a head-first entry in shallow, unknown, or crowded water can fracture the cervical spine and damage the cord, often irreversibly." },
      prevention: { zh: "只在场馆允许跳水的深区跳水；跳水前确认水深 ≥ 场馆标示标准且落点无他人；头先入水、双臂贴耳；儿童与新手不跳水。",
                    en: "Dive only in the designated deep diving zone; before each dive confirm the posted depth and that the landing zone is clear; enter head-first with arms locked by the ears; children and beginners do not dive." },
      emergency: { zh: "怀疑头颈受伤时严禁移动伤者，保持其头颈固定，立即拨打急救电话并在现场等待专业救援。",
                   en: "If head/neck injury is suspected, never move the victim; stabilise head and neck, call emergency services immediately, and wait for professional rescue on site." },
      reviewed: false,
      source: { zh: "跳水安全公开指南，需持证教练终审", en: "Public diving-safety guidelines; final sign-off by a certified coach required" }
    },
    {
      id: "venue_storm", category: "venue",
      level: ["L0", "L1"],
      title: { zh: "雷雨天气远离户外水域", en: "Storms: Stay Away from Outdoor Water" },
      risk: { zh: "雷电击中水面与岸边金属设施；暴雨引发水位骤涨、能见度下降。户外水域在雷暴前后是高危时段。",
             en: "Lightning strikes water and metal on the shore; storms raise water levels and kill visibility. Outdoor water is high-risk before, during, and after storms." },
      prevention: { zh: "看天出门：雷暴预报生效期间不去户外水域；听到雷声即开始撤离；上岸后远离大树、金属栏杆与水面。",
                    en: "Check the sky before going out: skip outdoor water while storm warnings are active; start evacuating the moment thunder is heard; after landing, stay away from tall trees, metal rails, and the shoreline." },
      emergency: { zh: "雷击伤者在安全环境下立即评估呼吸与脉搏，需要时开始心肺复苏并拨打急救电话；同时记录受击时间与位置供医护参考。",
                   en: "For a lightning strike victim, assess breathing and pulse in a safe place; start CPR if needed and call emergency services; log the strike time and location for the medical team." },
      reviewed: false,
      source: { zh: "雷电安全公开指南，需持证教练终审", en: "Public lightning-safety guidelines; final sign-off by a certified coach required" }
    },
    {
      id: "venue_openwater", category: "venue",
      level: ["L0", "L1"],
      title: { zh: "陌生自然水域的隐形风险", en: "Hidden Risks in Unknown Natural Water" },
      risk: { zh: "河道、湖泊、水库的水下地形、暗流、水草缠绕、船运与温差都不可预知；「会游泳」在陌生水域不等于安全。",
             en: "River, lake and reservoir bottoms, currents, weed tangles, boat traffic, and temperature drops are all unpredictable; 'knowing how to swim' does not make unknown water safe." },
      prevention: { zh: "不进无救生员、无标识的陌生自然水域；下水前观察水流、船只与上岸点；使用浮球（跟屁虫）并结伴；告知岸上的人路线与返回时间。",
                    en: "Skip natural water without lifeguards or signage; scout currents, boats, and exit points first; tow a swim buoy and swim with a buddy; tell someone on shore your route and return time." },
      emergency: { zh: "遇到暗流不硬顶，斜向朝岸边绕行并大声求援；被水草缠绕时停止蹬踏，用双手缓慢解开。",
                   en: "When caught by a current, do not fight it head-on: swim diagonally toward shore and call for help loudly; if tangled in weeds, stop kicking and gently free yourself with hands." },
      reviewed: false,
      source: { zh: "公开水域安全指南，需持证教练终审", en: "Open-water safety guidelines; final sign-off by a certified coach required" }
    },
    {
      id: "venue_hygiene", category: "venue",
      level: ["L0", "L1"],
      title: { zh: "泳池卫生与眼耳防护", en: "Pool Hygiene: Eyes & Ears" },
      risk: { zh: "氯与微生物刺激眼结膜与外耳道；不戴泳镜易红眼，进水后耳道潮湿易发外耳道炎。",
             en: "Chlorine and microbes irritate the eye conjunctiva and ear canal; without goggles red eyes are common, and trapped water invites outer-ear infection." },
      prevention: { zh: "全程佩戴泳镜，必要时用游泳耳塞；入水前淋浴减少氯接触；泳后清水洗脸、冲洗耳鼻；红眼流行期不去公共泳池。",
                    en: "Wear goggles throughout, ear plugs if needed; shower before entering to reduce chlorine contact; rinse face, ears and nose with fresh water after swimming; skip public pools during red-eye outbreaks." },
      emergency: { zh: "眼红肿持续超过一天、分泌物增多或视力模糊时就医；耳痛、听力下降疑外耳道炎，及时耳鼻喉科处理。",
                   en: "See a doctor if eye redness lasts beyond a day, discharge increases, or vision blurs; for ear pain and muffled hearing, suspect outer-ear infection and see an ENT promptly." },
      reviewed: false,
      source: { zh: "公共卫生参考，需持证教练终审", en: "Public hygiene reference; final sign-off by a certified coach required" }
    },

    /* --- 身体禁忌 contraindication --- */
    {
      id: "contra_alcohol", category: "contraindication",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "饮酒后禁止下水", en: "No Swimming After Alcohol" },
      risk: { zh: "酒精降低反应速度、平衡与判断，并加速脱水与热量流失；酒后下水的呛水、抽筋与溺水概率显著上升。",
             en: "Alcohol slows reaction, balance and judgement and accelerates dehydration and heat loss; choking, cramp and drowning risks rise sharply after drinking." },
      prevention: { zh: "饮酒后 24 小时内不下水；泳池派对先游泳后喝酒；发现同伴酒后下水立即劝止并通知救生员。",
                    en: "Do not swim within 24 hours of drinking; at pool parties, swim first, drink later; if you see a buddy entering the water drunk, stop them and alert the lifeguard." },
      emergency: { zh: "酒后游泳者出现呼叫反应迟钝、漂浮姿势异常时立即协助上岸、保暖并观察呼吸，必要时呼叫急救。",
                   en: "If a swimmer who has been drinking responds sluggishly or floats oddly, help them ashore, keep them warm, watch breathing, and call emergency services if needed." },
      reviewed: false,
      source: { zh: "急救共识，需持证教练终审", en: "First-aid consensus; final sign-off by a certified coach required" }
    },
    {
      id: "contra_food", category: "contraindication",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "过饱与过饿都不要下水", en: "Neither Full nor Empty Stomachs" },
      risk: { zh: "餐后立刻剧烈运动影响消化、易腹胀痉挛；空腹低血糖时水中头晕、乏力，在深水区极危险。",
             en: "Intense exercise right after a meal disturbs digestion and invites cramps and bloating; swimming fasting risks low-blood-sugar dizziness and weakness — deadly in deep water." },
      prevention: { zh: "正餐后休息 60–90 分钟再下水；游泳前 1 小时可加餐香蕉等小食；长距离训练随身携带糖块。",
                    en: "Rest 60–90 minutes after a full meal before swimming; eat a light snack (e.g. a banana) an hour before long swims; keep glucose candy for long sessions." },
      emergency: { zh: "水中出现头晕、冷汗、手抖等低血糖表现，立即就近上岸、补充糖分并平卧休息；不缓解时就医。",
                   en: "On dizziness, cold sweat, shaking hands — low blood sugar signs — get out at the nearest exit, take sugar, and lie down; if symptoms persist, seek medical care." },
      reviewed: false,
      source: { zh: "运动健康常识，需持证教练终审", en: "Sports-health basics; final sign-off by a certified coach required" }
    },
    {
      id: "contra_illness", category: "contraindication",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "感冒发烧、中耳炎、皮肤病不进公共泳池", en: "Sick? Stay Out of Public Pools" },
      risk: { zh: "发烧时体力与判断下降，呛水风险升高；中耳炎、红眼病、皮肤病（真菌/疣）在泳池环境会传染给他人，也可能加重自身感染。",
             en: "Fever lowers stamina and judgement, raising choking risk; ear infections, conjunctivitis, and skin infections (fungal/warts) spread through pools to others and can worsen for you." },
      prevention: { zh: "感冒发烧痊愈后 48 小时再游泳；耳部感染、眼红、皮肤破损期间不进公共泳池；泳池前后淋浴。",
                    en: "Return 48 hours after fever clears; skip public pools during ear infections, red eyes, and open skin; shower before and after any swim." },
      emergency: { zh: "泳中突发发热寒战、呼吸急促立即上岸停止运动；泳后耳痛流脓、皮疹扩散及时就医。",
                   en: "If chills, fever, or fast breathing start mid-swim, get out and stop; see a doctor for ear pain with discharge, or spreading rashes after swimming." },
      reviewed: false,
      source: { zh: "公共卫生参考，需持证教练终审", en: "Public hygiene reference; final sign-off by a certified coach required" }
    },
    {
      id: "contra_heart", category: "contraindication",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "心脏病、癫痫、严重高血压：先评估再下水", en: "Heart Disease, Epilepsy, Severe Hypertension: Get Evaluated First" },
      risk: { zh: "水中发作心源性猝死、癫痫等可在数秒内导致失去意识与溺水；公共泳池对此类发作的即时救援能力有限。",
             en: "Cardiac events or seizures in water cause unconsciousness and drowning within seconds; public pools have limited immediate rescue capacity for them." },
      prevention: { zh: "下水前由医生评估运动许可；确定疾病等级与泳池救生配置匹配；避免单独进入深水区；随身（池边）放置急救卡。",
                    en: "Get physician clearance before swimming; match your condition with the pool's rescue setup; never enter the deep end alone; keep an emergency card poolside." },
      emergency: { zh: "发现疑似发病（突然静止漂浮、呼之不应）立即救上岸、呼叫急救，需要时开始心肺复苏。",
                   en: "If a swimmer goes suddenly silent/still or is unresponsive, get them out, call emergency services, and start CPR if required." },
      reviewed: false,
      source: { zh: "医学建议条目，需持证教练与医生复核", en: "Medical-advice entry; sign-off by certified coach and physician required" }
    },
    {
      id: "contra_fatigue", category: "contraindication",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "疲劳与睡眠不足不要下水", en: "No Swimming When Exhausted" },
      risk: { zh: "疲劳状态下协调与判断下降，抽筋与呛水概率升高；熬夜后冷水刺激更易诱发心律异常。",
             en: "Fatigue degrades coordination and judgement, raising cramp and choking risk; after all-nighters, cold-water stress more easily triggers heart-rhythm trouble." },
      prevention: { zh: "剧烈运动、长途熬夜后先休息再游泳；游泳强度按「能正常说话」控制；感觉明显困倦时取消当次下水。",
                    en: "Rest after hard workouts and sleepless nights before swimming; keep intensity at a level where you can talk; cancel the swim when you feel clearly drained." },
      emergency: { zh: "泳中出现心慌、胸闷、单侧无力等异常，立即上岸并平卧观察，持续不缓解拨打急救电话。",
                   en: "On palpitations, chest tightness, or one-sided weakness mid-swim, get out, lie down, observe; call emergency services if symptoms persist." },
      reviewed: false,
      source: { zh: "运动安全常识，需持证教练终审", en: "Sports-safety basics; final sign-off by a certified coach required" }
    },
    {
      id: "contra_meds", category: "contraindication",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "服用易嗜睡药物后不游泳", en: "Drowsy Medication: No Swimming" },
      risk: { zh: "抗过敏药、镇静类感冒药、部分止痛药会引起嗜睡与反应变慢；水中反应延迟一秒，风险成倍放大。",
             en: "Antihistamines, sedating cold medicines, and some painkillers cause drowsiness and slower reaction; a one-second delay in water multiplies the risk." },
      prevention: { zh: "查看药品说明书「嗜睡/驾驶注意」警示；服药当日不下水；长期服药者咨询医生是否适合游泳。",
                    en: "Check the label for drowsiness/driving warnings; skip swimming on medication days; ask your doctor if long-term meds make swimming safe." },
      emergency: { zh: "发现服药游泳者漂浮反应变慢、动作变形，立即陪同上岸；出现嗜睡加深、呼之不应按昏迷流程急救。",
                   en: "If a swimmer on meds floats sluggishly with distorted strokes, escort them ashore immediately; deep drowsiness with no response follows the unconscious-first-aid protocol." },
      reviewed: false,
      source: { zh: "用药安全参考，需持证教练与医生复核", en: "Medication-safety reference; sign-off by certified coach and physician required" }
    },
    {
      id: "contra_pregnancy", category: "contraindication",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "孕期游泳：可以游，但要知道边界", en: "Swimming in Pregnancy: Yes, Within Limits" },
      risk: { zh: "孕期平衡与关节松弛易跌滑；高温水（温泉池）持续过热对胎儿不利；跳水、剧烈翻转有撞击风险。",
             en: "Pregnancy loosens joints and shifts balance, raising slip risk; sustained hot-tub-level heat is harmful to the fetus; diving and violent flips risk impact." },
      prevention: { zh: "经产科医生同意后选择温和游；避免热水池与跳水；孕中晚期避免仰泳长时间平躺压迫（仰卧位低血压）；池边慢行。",
                    en: "Get OB clearance and keep swims gentle; avoid hot pools and diving; in late pregnancy avoid long flat supine rests (supine hypotension); walk slowly on the deck." },
      emergency: { zh: "泳中出现腹痛、出血、眩晕立即上岸就医；羊水破裂后禁止继续在水中。",
                   en: "On abdominal pain, bleeding, or dizziness during a swim, go ashore and see a doctor immediately; after membrane rupture, get out of the water." },
      reviewed: false,
      source: { zh: "孕期运动参考，需持证教练与医生复核", en: "Pregnancy-exercise reference; sign-off by certified coach and physician required" }
    },
    {
      id: "contra_knee", category: "contraindication",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "膝伤、腰伤期游泳：选泳姿、控强度", en: "Swimming with Knee & Back Injuries: Pick the Stroke, Cap the Load" },
      risk: { zh: "蛙泳蹬夹对膝内侧副韧带与半月板压力显著；蝶泳与高频率仰泳对腰椎旋转要求高，伤期复制动作会加重损伤。",
             en: "Breaststroke's whip kick loads the knee's medial ligaments and meniscus; butterfly and high-rate backstroke demand lumbar rotation; repeating damaged patterns makes injuries worse." },
      prevention: { zh: "膝伤期改自由泳/仰泳直线打腿，暂停蛙泳蹬夹；腰伤期避免蝶泳与剧烈滚转；以「无疼痛」为强度上限，教练定制替代动作。",
                    en: "During knee injury switch to straight-leg freestyle/backstroke, pause the whip kick; during back injury avoid butterfly and violent rolls; keep intensity under 'zero pain'; let a coach build alternatives." },
      emergency: { zh: "泳中伤处突发肿胀、卡压感或活动受限，立即停止游泳冰敷休息；持续疼痛就医影像检查。",
                   en: "On sudden swelling, catching, or limited motion at the injury site, stop, ice, rest; see a doctor for imaging if pain persists." },
      reviewed: false,
      source: { zh: "运动医学参考，需持证教练与医生复核", en: "Sports-medicine reference; sign-off by certified coach and physician required" }
    },

    /* --- 突发应对 emergency --- */
    {
      id: "cramp", category: "emergency",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "水中抽筋应对", en: "Cramp Management" },
      risk: { zh: "抽筋导致对应肢体瞬间失去推进能力，小腿抽筋最典型；在深区抽筋易引发恐慌、呛水甚至溺水。",
             en: "A cramp kills propulsion of the affected limb instantly; calf cramps are the classic case. In deep water a cramp triggers panic, choking, and drowning." },
      prevention: { zh: "下水前充分热身（踝、小腿、大腿各 2 分钟）；避免冷水骤入（先淋水适应）；训练量渐进；及时补充电解质与水分；泳后拉伸。",
                    en: "Warm up thoroughly (ankles, calves, thighs, 2 min each); avoid plunging into cold water (rinse and acclimatise first); build volume gradually; replenish electrolytes and water; stretch after swimming." },
      emergency: { zh: "停止游动→翻身仰漂→抽筋侧腿伸直、用手勾脚尖向身体方向拉伸→缓解后慢速靠边，上岸拉伸保暖；复发或持续疼痛就医。",
                   en: "Stop swimming → roll onto your back and float → extend the cramping leg, pull toes toward you to stretch the calf → once relieved, move slowly to the wall, get out, stretch, keep warm; see a doctor for recurrence or persistent pain." },
      reviewed: false,
      source: { zh: "公开救生指南，需持证教练终审", en: "Public lifeguard guidelines; final sign-off by a certified coach required" }
    },
    {
      id: "choking", category: "emergency",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "呛水与呛咳处理", en: "Water Choking & Coughing" },
      risk: { zh: "水进入气道引发剧烈呛咳，严重时喉痉挛致呼吸困难；连续呛水会快速耗尽体力。",
             en: "Water entering the airway triggers violent coughing; a severe laryngospasm blocks breathing; repeated choking drains energy fast." },
      prevention: { zh: "在水中用鼻嘴持续呼气，不用鼻子吸水；换气时机按泳姿节奏练熟；浅水区先练「水中吐泡泡」；浪大时减少换气幅度。",
                    en: "Exhale through nose and mouth continuously in the water, never inhale through the nose; drill stroke-timed breathing in shallow water; start with 'bubble blowing'; reduce breath size in waves." },
      emergency: { zh: "立即扶池站立或上岸→身体前倾轻拍背部助排→深呼吸稳定；喘息声（喉鸣）持续、嘴唇发紫、说话困难时立即就医。",
                   en: "Stand at the wall or get out → lean forward, pat the back to clear → steady deep breaths; seek care immediately for persistent wheeze/stridor, blue lips, or trouble speaking." },
      reviewed: false,
      source: { zh: "急救常识，需持证教练终审", en: "First-aid basics; final sign-off by a certified coach required" }
    },
    {
      id: "ear_water", category: "emergency",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "耳朵进水的处理", en: "Water in the Ear" },
      risk: { zh: "耳道积水引发闷堵、听力下降，潮湿环境易发外耳道炎；鼓膜穿孔者进水有内耳感染风险。",
             en: "Trapped water causes fullness and muffled hearing; dampness breeds outer-ear infection; with a perforated eardrum, water risks inner-ear infection." },
      prevention: { zh: "佩戴游泳耳塞；跳水后检查耳感；中耳炎、鼓膜穿孔者不跳水并遵医嘱防护。",
                    en: "Wear swim ear plugs; check your ears after dives; with ear infections or a perforated eardrum, avoid diving and follow medical advice on protection." },
      emergency: { zh: "单脚跳＋侧头拉耳廓，让水自然流出；毛巾吸干外耳；不要掏挖耳道；持续闷堵、疼痛或流液就医。",
                   en: "Hop on one foot with the head tilted, tug the auricle, let water drain; blot the outer ear with a towel; never dig inside the canal; see a doctor for persistent blockage, pain, or discharge." },
      reviewed: false,
      source: { zh: "耳鼻喉公开科普，需持证教练终审", en: "Public ENT guidance; final sign-off by a certified coach required" }
    },
    {
      id: "dizziness", category: "emergency",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "水中眩晕（内耳/颈椎）应对", en: "In-Water Dizziness (Inner Ear / Neck)" },
      risk: { zh: "快速转头换气、水温骤变或颈椎问题可诱发眩晕，失去方向感后易恐慌、呛水、下沉。",
             en: "Fast head turns to breathe, sudden cold, and neck issues can trigger vertigo; losing orientation leads to panic, choking, and sinking." },
      prevention: { zh: "换气动作小而连贯，避免猛然抬头转头；泳前活动颈肩；有眩晕史者选择浅区并告知同伴。",
                    en: "Keep breath turns small and smooth — no violent head lifts; mobilise neck and shoulders before swimming; swimmers with vertigo history stay in shallow zones and tell their buddy." },
      emergency: { zh: "立即扶住池壁或抓住浮具→头位固定、缓慢呼吸→呼叫同伴或救生员→上岸后闭眼静坐，反复眩晕就医。",
                   en: "Grab the wall or a float immediately → fix the head position, breathe slowly → call your buddy or the lifeguard → ashore, sit with eyes closed; see a doctor for repeated vertigo." },
      reviewed: false,
      source: { zh: "急救常识，需持证教练终审", en: "First-aid basics; final sign-off by a certified coach required" }
    },
    {
      id: "hypothermia", category: "emergency",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "冷水失温识别与自救", en: "Cold-Water Hypothermia: Signs and Self-Rescue" },
      risk: { zh: "冷水持续带走热量，出现寒战、动作变慢、说话含糊即为失温前兆；失温后判断力骤降，自救能力迅速消失。",
             en: "Cold water strips heat continuously; shivering, slowing strokes, and slurred speech are precursors; judgement collapses fast once hypothermia sets in, and self-rescue ability vanishes." },
      prevention: { zh: "冷水（<20°C）游泳控制时长，遵循场馆时长提示；下水前淋水适应；感到寒战、指尖发麻立即结束游泳。",
                    en: "Limit time in cold water (<20°C), follow venue duration guidelines; acclimatise by rinsing before entry; end the swim the moment you shiver or feel numb fingertips." },
      emergency: { zh: "立即就近上岸→脱湿衣、擦干保暖（从躯干开始）→热糖水→伴寒战不止、言语混乱、嗜睡者按重度失温处理，平卧就医。",
                   en: "Get out at the nearest exit → strip wet clothes, dry, warm starting from the trunk → warm sugary drink → for unstoppable shivering, confusion, drowsiness treat as severe hypothermia: lie down and get medical care." },
      reviewed: false,
      source: { zh: "公开低温急救指南，需持证教练终审", en: "Public cold-emergency guidelines; final sign-off by a certified coach required" }
    },
    {
      id: "exhaustion", category: "emergency",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "体力透支：先漂浮，再呼救", en: "Exhaustion: Float First, Then Call" },
      risk: { zh: "长距离游后肌肉力竭，换气动作变形，腿部无法维持漂浮位，是深水区最常见的险情之一。",
             en: "After long swims the muscles fail, breathing form breaks, and legs can no longer keep the float position — a top deep-water emergency." },
      prevention: { zh: "长距离游泳前先做「连续 400m 无休息」自测；公开水域佩戴浮球；强度按可对话控制；疲劳期不做冲刺训练。",
                    en: "Test yourself at '400m continuous, no rest' before big distances; tow a buoy in open water; keep intensity at conversational level; no sprint sets when tired." },
      emergency: { zh: "立即翻身仰漂（省力的最后姿态）→保持呼吸道向上→大声呼救→同伴/救生员支援拖带上岸→上岸后平卧保暖。",
                   en: "Roll onto your back immediately (the most economical last posture) → keep the airway up → shout for help → buddy/lifeguard tows you ashore → lie down and keep warm on land." },
      reviewed: false,
      source: { zh: "公开救生指南，需持证教练终审", en: "Public lifeguard guidelines; final sign-off by a certified coach required" }
    },
    {
      id: "drowning_rescue", category: "emergency",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "发现他人溺水：呼救优先，不盲目下水", en: "Spotting a Drowning Person: Call First, Never Jump In Blind" },
      risk: { zh: "溺水是无声的（直立、点头、不动）；施救者被恐慌的溺水者拖入水中是二次事故主因；延误 4 分钟即可造成脑损伤。",
             en: "Drowning is silent (vertical body, head bobs, no waving); panic-driven rescuers dragging bystanders into the water is the top cause of secondary accidents; four minutes of delay can mean brain injury." },
      prevention: { zh: "在池边保持「救援视角」：留意直立踩水、脸朝下静止、抓池壁不动的人；公共场所熟悉抛绳、救生杆位置。",
                    en: "Keep a lifeguard's view at the deck: watch for vertical treading, faces down and motionless, swimmers clinging to walls; know where ring buoys, ropes, and poles are in your venue." },
      emergency: { zh: "第一秒大声呼叫救生员并拨打急救电话→抛漂浮物/伸竹竿/船桨，施救者保持岸边低位→救上岸立即评估呼吸，无呼吸即开始心肺复苏，持续至专业医护接手。",
                   en: "In the first second, shout for the lifeguard and call emergency services → throw a float, extend a pole/oar, keeping yourself low on the bank → on land, assess breathing; no breathing means start CPR immediately, continue until professionals take over." },
      reviewed: false,
      source: { zh: "国际救生共识，需持证教练与急救人员复核", en: "International lifeguard consensus; sign-off by certified coach and paramedic required" }
    },
    {
      id: "rash", category: "emergency",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "泳后皮疹、眼红与呼吸不适", en: "Post-Swim Rash, Red Eyes, Breathing Discomfort" },
      risk: { zh: "氯浓度过高刺激皮肤与呼吸道；公共泳池传播红眼病与真菌感染；泳后数小时的迟发皮疹可能是刺激或过敏信号。",
             en: "Excess chlorine irritates skin and airways; public pools spread conjunctivitis and fungal infections; rashes appearing hours after a swim can signal irritation or allergy." },
      prevention: { zh: "泳后立即淡水淋浴、洗头；泳后保湿；泳镜贴合减少眼刺激；泳中出现眼痒、咳喘提前上岸。",
                    en: "Shower with fresh water and wash hair right after swimming; moisturise afterwards; well-fitted goggles reduce eye irritation; if eyes itch or coughing starts in the pool, get out early." },
      emergency: { zh: "红眼伴大量分泌物、怕光就医；皮疹扩散、瘙痒剧烈就医；泳后喘息不止（疑氯诱发气道反应）尽快就医。",
                   en: "See a doctor for red eyes with heavy discharge and light sensitivity; see a doctor for spreading, intense-itch rashes; see a doctor promptly for post-swim wheezing (suspected chlorine airway reaction)." },
      reviewed: false,
      source: { zh: "公共卫生参考，需持证教练终审", en: "Public hygiene reference; final sign-off by a certified coach required" }
    },

    /* --- 儿童防护 child --- */
    {
      id: "child_supervision", category: "child",
      level: ["L0", "L1"],
      title: { zh: "儿童游泳须成人「一臂之内」全程看护", en: "Children Need Touch Supervision, Always Within Arm's Reach" },
      risk: { zh: "儿童溺水常发生在成人视线离开数十秒内，且过程无声：在浅水滑入深区、呛水后站立不起来都发生在几秒之间。",
             en: "Child drownings typically happen within tens of seconds of adult distraction, silently: sliding from shallow into deep, choking and failing to stand up — all within seconds." },
      prevention: { zh: "指定一位成人放下手机专职看护，位置在「一臂之内」；看池深浅区划，孩子先待在浅区；多人聚会轮流交接看护人并口头确认。",
                    en: "Assign one adult as watcher, phone down, positioned within arm's reach; know the shallow/deep lines, keep kids in the shallow zone; at gatherings, pass the watcher role explicitly and confirm out loud." },
      emergency: { zh: "发现孩子不见立即同时检查水下（池底、排水口附近）与池外；捞起后无呼吸即开始心肺复苏并拨打急救电话；持续观察数小时（迟发肺水肿）。",
                   en: "A missing child means checking underwater (bottom, drains) and outside the pool at once; if not breathing after recovery, start CPR and call emergency services; keep observing for hours (delayed pulmonary oedema)." },
      reviewed: false,
      source: { zh: "儿科与救生共识，需持证教练与医生复核", en: "Pediatric & lifeguard consensus; sign-off by certified coach and physician required" }
    },
    {
      id: "child_floaties", category: "child",
      level: ["L0", "L1"],
      title: { zh: "充气浮具不能替代监管", en: "Inflatable Toys Are Not Supervision" },
      risk: { zh: "充气圈漏气、侧翻、翻面卡住；套圈使孩子离地高度与倾斜失控；「戴了浮具」制造虚假安全感，看护注意力下降。",
             en: "Air rings leak, capsize, and trap kids face-down; rings tilt and raise children unstably; 'wearing floaties' creates false safety and drops supervision vigilance." },
      prevention: { zh: "浮具只是玩具与辅助，看护人保持一臂之内；改用浮板学游泳、练漂浮；不让孩子独自戴浮具入水。",
                    en: "Floaties are toys, not protection: the watcher stays within arm's reach; switch to kickboards for floating skills; never let a child enter the water alone wearing floaties." },
      emergency: { zh: "发现孩子套圈倾覆、脸朝下，立即捞扶并抱离水面，检查呼吸；无呼吸开始心肺复苏并呼叫急救。",
                   en: "If a child capsizes face-down inside a ring, lift and hold them out of the water at once and check breathing; start CPR if not breathing and call emergency services." },
      reviewed: false,
      source: { zh: "儿童安全共识，需持证教练终审", en: "Child-safety consensus; final sign-off by a certified coach required" }
    },
    {
      id: "child_skills", category: "child",
      level: ["L0", "L1"],
      title: { zh: "先教孩子三件保命技能：仰漂、呼救、找浮具", en: "Teach Kids Three Life Skills: Back Float, Calling, Grabbing Floats" },
      risk: { zh: "儿童遇险本能是「直立挣扎+安静屏息」，不会呼救；未训练自救动作的孩子几乎只能依赖成人。",
             en: "Children's instinct in trouble is vertical thrashing with silent breath-holding, not calling for help; untrained kids can only rely on adults." },
      prevention: { zh: "浅区系统练三件事：翻身仰漂 10 秒、大声呼救的演练、抓住最近浮具/池壁；把「呛水=先漂浮」变成条件反射。",
                    en: "In shallow water, drill three things systematically: a 10-second back float, shouting practice, grabbing the nearest float or wall; turn 'choking = float first' into reflex." },
      emergency: { zh: "孩子遇险时家长先冷静：指定一个呼救、一个抛浮具、一个下水救援（受训者）；捞起后侧头引流、评估呼吸，无呼吸即心肺复苏。",
                   en: "Parents stay calm: one person shouts for help, one throws a float, one trained enters the water to rescue; after recovery, tilt the head to drain, assess breathing, and start CPR if not breathing." },
      reviewed: false,
      source: { zh: "儿童水上安全科普，需持证教练终审", en: "Child water-safety guidance; final sign-off by a certified coach required" }
    },
    {
      id: "child_zones", category: "child",
      level: ["L0", "L1"],
      title: { zh: "戏水区与深区的界限，入水顺序", en: "Play Zone vs Deep End, and Order of Entry" },
      risk: { zh: "儿童误入深区、从滑道高速冲入拥挤浅区、跳水区进入儿童都是泳池高频事故场景。",
             en: "Kids wandering into the deep end, high-speed slides into crowded shallow pools, and children entering diving zones are high-frequency pool accidents." },
      prevention: { zh: "下水先让孩子进入浅区站稳，大人随后；明确「越过深浅线须牵成人手」；滑道、跳水区的进入顺序：大人先入水稳定后孩子再进。",
                    en: "Let the child enter the shallow zone first and stand firm, adults after; set the rule 'crossing the depth line means holding an adult's hand'; on slides and diving zones, adults enter first and stabilise, kids follow." },
      emergency: { zh: "儿童被浪/滑道冲入深区时立即大声请求救生员拦截；捞起后评估呼吸与体温（冷水应激），无呼吸开始心肺复苏。",
                   en: "If a child is swept into the deep end, shout for the lifeguard to intercept immediately; after recovery, assess breathing and temperature (cold shock); start CPR if not breathing." },
      reviewed: false,
      source: { zh: "泳池运营安全规则，需持证教练终审", en: "Pool-operations safety rules; final sign-off by a certified coach required" }
    },
    {
      id: "child_age", category: "child",
      level: ["L0", "L1"],
      title: { zh: "儿童学游泳的年龄与节奏", en: "Ages and Pace for Kids Learning to Swim" },
      risk: { zh: "过早高强度「学泳」易建立恐惧与错误动作；低龄儿童在水中疲劳与体温流失快，家长常低估。",
             en: "High-intensity 'swim lessons' too early build fear and bad mechanics; young children cool and tire in water faster than parents estimate." },
      prevention: { zh: "学龄前以亲水游戏、漂浮与呼救为主；正式泳姿学习约 6 岁后开始；单次下水时长按年龄递减（约每岁 10 分钟量级，遵循教练建议）。",
                    en: "Before school age: water play, floating, and calling drills; formal stroke learning starts around age 6; keep session length age-scaled (about 10 minutes per year, per your coach's advice)." },
      emergency: { zh: "孩子出现嘴唇发紫、持续寒战、嗜睡即体温/体力警报，立即上岸保暖就医。",
                   en: "Blue lips, persistent shivering, or sleepiness in a child are temperature/energy alarms — get out, keep warm, seek medical care." },
      reviewed: false,
      source: { zh: "儿童发展参考，需持证教练与医生复核", en: "Child-development reference; sign-off by certified coach and physician required" }
    },

    {
      id: "child_buddy", category: "child",
      level: ["L0", "L1"],
      title: { zh: "教会儿童入水前检查：深度、同伴、救生员", en: "Teach Kids the Pre-Swim Check: Depth, Buddy, Lifeguard" },
      risk: { zh: "儿童对「深浅区」「跳水区」无概念，常从伙伴示范中学危险动作；无人看管时段的好奇入水是事故温床。",
             en: "Children have no concept of depth lines and diving zones, and learn dangerous moves by copying peers; curiosity during unwatched hours breeds accidents." },
      prevention: { zh: "把三步检查变成口头禅：有无救生员？深浅线在哪？今天允许什么动作？儿童互相约定「看到危险动作先喊大人」。",
                    en: "Turn three checks into a chant: Is a lifeguard on duty? Where is the depth line? What moves are allowed today? Kids agree with each other: dangerous moves get shouted to an adult first." },
      emergency: { zh: "儿童模仿危险动作后出现不适（耳、颈、头），即使表面没事也应当天告知家长并就医评估。",
                   en: "If a child copies a dangerous move and feels anything off (ear, neck, head), tell parents that day and get a medical check even if they seem fine." },
      reviewed: false,
      source: { zh: "儿童安全教育共识，需持证教练终审", en: "Child-safety education consensus; final sign-off by a certified coach required" }
    },

    /* --- 游泳用品 gear --- */
    {
      id: "gear_goggles", category: "gear",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "泳镜佩戴与防雾", en: "Goggles: Fit and Anti-Fog" },
      risk: { zh: "系带过紧压迫眼眶引发酸痛；镜片刮花破损入水刺激眼睛；起雾后视线模糊，深水区方向感下降。",
             en: "Over-tight straps strain the eye sockets; scratched or cracked lenses irritate eyes in water; fog blurs vision and weakens orientation in the deep end." },
      prevention: { zh: "系带松紧以不压出红印为准；下水前滴防雾液或清水，手指不摸内镜片；泳后清水冲洗，阴凉处晾干，专用盒存放。",
                    en: "Tighten straps only to the point of no red marks; apply anti-fog drops or plain water before entering, never touch the inner lens; rinse with fresh water after swimming, dry in shade, store in its case." },
      emergency: { zh: "水中镜片破裂：闭眼保持漂浮，摸到池边请救生员协助上岸；眼内异物感持续，就医处理。",
                   en: "If a lens cracks mid-swim: keep eyes closed, feel your way to the wall, get ashore with lifeguard help; see a doctor for persistent grit in the eye." },
      reviewed: false,
      source: { zh: "器材使用常识，需持证教练终审", en: "Equipment basics; final sign-off by a certified coach required" }
    },
    {
      id: "gear_prescription", category: "gear",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "近视者选泳镜：配处方泳镜，不戴隐形眼镜", en: "Myopia: Prescription Goggles, Not Contacts" },
      risk: { zh: "隐形眼镜在氯水与微生物中吸附于眼表，感染与角膜损伤风险显著升高；度数不合的镜片压在泳镜下会加重视疲劳。",
             en: "Contacts trap chlorinated water and microbes against the eye surface, sharply raising infection and corneal injury risk; mismatched lenses under goggles add eye strain." },
      prevention: { zh: "按验光度数配正规品牌处方泳镜；游泳一律不戴隐形眼镜；泳后清水洗脸护眼。",
                    en: "Buy prescription goggles matched to your optometry numbers from a legit brand; never swim in contacts; rinse face and eyes with fresh water after swimming." },
      emergency: { zh: "戴隐形入水后眼痛、发红、异物感：当场摘除，滴人工泪液，24 小时内看眼科。",
                   en: "On pain, redness, or grit after swimming in contacts: remove them at once, use artificial tears, see an eye doctor within 24 hours." },
      reviewed: false,
      source: { zh: "眼科公开科普，需持证教练与医生复核", en: "Public eye-care guidance; sign-off by certified coach and physician required" }
    },
    {
      id: "gear_earplugs", category: "gear",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "游泳耳塞的正确使用", en: "Using Swim Ear Plugs Properly" },
      risk: { zh: "脏耳塞把细菌直接送进耳道；过深塞入压迫鼓膜；不戴耳塞者外耳道炎高发。",
             en: "Dirty plugs deliver bacteria straight into the ear canal; deep insertion presses the eardrum; plugless swimmers get outer-ear infections far more often." },
      prevention: { zh: "自带个人耳塞，用前清水冲洗；优先选外塞式（封住耳廓、不进耳道）；泳后擦干外耳；耳塞定期晾晒更换。",
                    en: "Carry your own plugs, rinse before use; prefer outer-cap style that seals the auricle without entering the canal; dry outer ears after swimming; air and replace plugs regularly." },
      emergency: { zh: "泳后耳闷、疼痛、流液：停止游泳，不掏挖耳道，耳鼻喉科处理。",
                   en: "Fullness, pain, or discharge after swimming: stop swimming, never dig inside the canal, see an ENT doctor." },
      reviewed: false,
      source: { zh: "耳鼻喉公开科普，需持证教练终审", en: "Public ENT guidance; final sign-off by a certified coach required" }
    },
    {
      id: "gear_noseclip", category: "gear",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "鼻夹：防呛辅助，不可依赖", en: "Nose Clips: Helpful, Not a Crutch" },
      risk: { zh: "长期依赖鼻夹会延迟学会水中平稳呼气，一旦取下鼻腔进水引发呛咳；夹子过紧压迫鼻翼。",
             en: "Long-term reliance on nose clips delays learning smooth in-water exhaling; once off, water floods the nose and triggers choking; over-tight clips squeeze the nostrils." },
      prevention: { zh: "当初学辅助用，设定「脱鼻夹也能水中用鼻嘴平稳呼气」的毕业目标；选弹性适中的鼻夹，间歇取下休息。",
                    en: "Use as a beginner aid with a graduation target: exhale smoothly through nose and mouth in water without it; pick a mid-elasticity clip, take it off on breaks." },
      emergency: { zh: "呛水后剧烈呛咳：上岸前倾排液、稳定呼吸；喉鸣、嘴唇发紫立即就医。",
                   en: "Violent coughing after choking: get out, lean forward to drain, steady the breath; stridor or blue lips means immediate medical care." },
      reviewed: false,
      source: { zh: "教学共识，需持证教练终审", en: "Coaching consensus; final sign-off by a certified coach required" }
    },
    {
      id: "gear_cap", category: "gear",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "泳帽：材质选择与乳胶过敏", en: "Swim Caps: Material and Latex Allergy" },
      risk: { zh: "乳胶泳帽可致头皮颈部红疹过敏；过紧勒出头痛；长发未束起入水堵塞过滤系统、缠绕他人。",
             en: "Latex caps can trigger scalp and neck rashes; over-tight ones squeeze out headaches; unbound long hair clogs filters and tangles other swimmers." },
      prevention: { zh: "敏感者选硅胶或布泳帽；长发先束起再戴帽；泳后及时洗头；泳帽内侧定期清洗晾干。",
                    en: "Sensitive skin: silicone or cloth caps; tie hair up before capping; wash hair right after swimming; rinse and dry the cap's inner side regularly." },
      emergency: { zh: "红疹蔓延、瘙痒不止就医；出现呼吸急促（疑重度过敏）立即上岸呼叫急救。",
                   en: "See a doctor for spreading rash or unrelenting itch; get out and call emergency services for breathing difficulty (suspected severe allergy)." },
      reviewed: false,
      source: { zh: "皮肤健康参考，需持证教练终审", en: "Skin-health reference; final sign-off by a certified coach required" }
    },
    {
      id: "gear_kickboard", category: "gear",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "浮板使用：扶板打腿的安全边界", en: "Kickboards: Safe Boundaries for Kick Drills" },
      risk: { zh: "深水区抱板依赖等于没练自救；长期压扶肩颈造成姿势性酸痛；疲劳时一放手，浮力瞬间归零。",
             en: "Hugging a board in the deep end means zero self-rescue practice; years of pressing shoulders and neck build postural ache; the moment you let go when tired, buoyancy drops to nil." },
      prevention: { zh: "扶板练习安排在浅区、池边起止；肩颈酸痛即结束当组；进阶目标是脱离浮板的完整配合游。",
                    en: "Run board drills in the shallow zone, start and finish at the wall; end the set on shoulder/neck pain; the next level is full coordinated swimming without the board." },
      emergency: { zh: "深区脱板后体力告急：翻身仰漂呼救，请同伴或救生员拖带。",
                   en: "Exhausted after letting go of the board in deep water: roll to a back float, call for help, buddy or lifeguard tows you in." },
      reviewed: false,
      source: { zh: "教学共识，需持证教练终审", en: "Coaching consensus; final sign-off by a certified coach required" }
    },
    {
      id: "gear_snorkel", category: "gear",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "游泳呼吸管：训练器械，不是呼吸保障", en: "Swim Snorkels: Training Gear, Not Breathing Insurance" },
      risk: { zh: "训练管无浪涌保护，水花与呛咳时管内倒灌；用呼吸管掩盖换气缺陷，到公开水域就是隐患。",
             en: "Training tubes have no splash protection; spray and coughing cause backflow up the tube; hiding breathing flaws behind a snorkel becomes a hazard in open water." },
      prevention: { zh: "仅在泳池训练使用，同时坚持侧换气练习；下水前检查咬带与管托；有呛咳史者不单独使用。",
                    en: "Use in pool training only, while still drilling side breathing; check bite strap and tube mount before entering; swimmers with a choking history never use one solo." },
      emergency: { zh: "水中呛咳立即吐管、换正常换气，靠边休息观察。",
                   en: "On coughing in the water, spit the tube out, switch to normal breathing, head to the wall and rest." },
      reviewed: false,
      source: { zh: "训练器材共识，需持证教练终审", en: "Training-gear consensus; final sign-off by a certified coach required" }
    },
    {
      id: "gear_buoy", category: "gear",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "跟屁虫浮球：公开水域的标配", en: "Swim Buoys: Standard Kit for Open Water" },
      risk: { zh: "无浮球时抽筋与透支没有支撑点；系带不紧或浮球过重会拖拽身体；充气不足直接失效。",
             en: "Without a buoy, cramp and exhaustion leave no support point; loose straps or over-heavy buoys drag the body; under-inflated ones fail outright." },
      prevention: { zh: "选带反光条的充气浮球，下水前检查气密；系带绕腰松紧适度；挂信号旗，与同伴互相可视。",
                    en: "Choose an inflatable buoy with reflective strips, check airtightness before entry; strap around the waist snug not tight; fly the signal flag and keep buddies in sight." },
      emergency: { zh: "抱住浮球翻身仰漂，保存体力，朝最近岸缓行并呼救。",
                   en: "Hug the buoy, roll onto your back, conserve energy, drift slowly toward the nearest shore, shout for help." },
      reviewed: false,
      source: { zh: "公开水域安全指南，需持证教练终审", en: "Open-water guidelines; final sign-off by a certified coach required" }
    },
    {
      id: "gear_lifejacket", category: "gear",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "儿童浮力衣：浮力≠救生，监管不缺位", en: "Kids' Life Jackets: Buoyancy Is Not Rescue; Keep Watching" },
      risk: { zh: "劣质浮力衣漏气、侧翻、脸朝下卡住；穿上后家长放松监管——事故恰恰常在「有装备」时发生。",
             en: "Cheap buoyancy vests leak, capsize, trap faces down; parents relax supervision once gear is on — accidents happen precisely with the gear on." },
      prevention: { zh: "选符合国标的浮力衣，泡沫型优于充气型，尺码贴腋下不松动；浮力衣 + 一臂内的成人看护，一个都不能少。",
                    en: "Pick a national-standard buoyancy vest, foam over inflatable, fitted snug at the armpits; vest plus an adult within arm's reach — you need both." },
      emergency: { zh: "发现倾覆脸朝下立即捞扶抱离水面，检查呼吸；无呼吸开始心肺复苏并拨打急救电话。",
                   en: "On a face-down capsize, lift the child out of the water at once and check breathing; start CPR if not breathing and call emergency services." },
      reviewed: false,
      source: { zh: "儿童安全共识，需持证教练与医生复核", en: "Child-safety consensus; sign-off by certified coach and physician required" }
    },
    {
      id: "gear_shared", category: "gear",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "共享游泳用品的卫生风险", en: "Hygiene Risks of Shared Swim Gear" },
      risk: { zh: "共用耳塞、鼻夹、泳镜把细菌真菌直接送入口鼻眼与皮肤；公共拖鞋传播足部真菌（脚气）。",
             en: "Shared plugs, nose clips, and goggles pass bacteria and fungi straight to mouth, nose, eyes, and skin; shared poolside flip-flops spread foot fungus." },
      prevention: { zh: "个人装备自带；场馆公共夹镜用前独立包装消毒、用后冲洗；不穿公共拖鞋，自带拖鞋入馆。",
                    en: "Bring your own kit; venue shared clips/goggles must be individually sealed and disinfected, rinsed after use; skip shared flip-flops, carry your own." },
      emergency: { zh: "共用后出现红眼、皮疹、足部瘙痒，就医并告知共用史。",
                   en: "For red eyes, rash, or itchy feet after sharing gear, seek care and mention the shared use." },
      reviewed: false,
      source: { zh: "公共卫生参考，需持证教练终审", en: "Public hygiene reference; final sign-off by a certified coach required" }
    },
    {
      id: "gear_swimsuit", category: "gear",
      level: ["L0", "L1", "L2", "L3"],
      title: { zh: "泳衣选择：紧身速干，拒绝棉质", en: "Swimwear: Tight and Quick-Dry, No Cotton" },
      risk: { zh: "棉质衣裤吸水增重、下垂缠绕，深水区成倍消耗体力；宽松饰物勾挂池壁与扶梯。",
             en: "Cotton clothes soak up water, sag and tangle, multiplying energy drain in the deep end; loose accessories snag on walls and stairs." },
      prevention: { zh: "选贴身速干泳衣（连体/紧身面料）；摘掉手表项链手链；儿童避免裙式泳装，专池专用。",
                    en: "Wear fitted quick-dry swimwear (one-piece/tight fabric); strip watches, necklaces, bracelets; kids avoid dress-style swimwear, use pool-appropriate suits." },
      emergency: { zh: "衣物增重致体力告急：抓最近浮具仰漂呼救；被勾挂卡住时冷静缓慢解脱，向池边移动。",
                   en: "When soaked clothes exhaust you: grab the nearest float, back-float, call for help; if snagged, stay calm, work free slowly, move toward the wall." },
      reviewed: false,
      source: { zh: "泳装使用常识，需持证教练终审", en: "Swimwear basics; final sign-off by a certified coach required" }
    }
  ],

  /* ---------- L0 零基础：下水前 5 课（P1） ---------- */
  basics: {
    meta: {
      zh: "零基础下水前 {n} 课：适应水、水中呼气、扶边漂浮、仰漂呼救、扶边移动，附相关安全条目与蛙泳 L0 计划。",
      en: "{n} pre-swim lessons for absolute beginners: water adjustment, exhaling in water, wall floating, back float & calling for help, and wall movement, with linked safety notes and a breaststroke L0 plan."
    },
    intro: {
      zh: "不会游泳、怕水、不敢把脸入水，都从这一页开始。{n} 课按顺序练，全部在浅水区完成，目标是「能在水里放松呼吸、能自己站起来」，而不是马上学泳姿。",
      en: "Start here if you cannot swim, fear water, or cannot put your face in. Do the {n} lessons in order, all in shallow water. The goal is relaxed breathing and standing up on your own — not learning a stroke yet."
    },
    note: {
      zh: "全程浅水区、有成人或教练陪同；出现心慌、呛咳不止或站立不稳，立即扶边起身休息。安全/医学类条目的审核状态见安全页。",
      en: "Stay in shallow water with an adult or coach present. If you panic, keep coughing, or cannot stand steadily, hold the wall and rest. See the Safety page for the review status of safety/medical entries."
    },
    lessons: [
      {
        id: "basics_adapt",
        title: { zh: "适应水与扶边", en: "Water adjustment & holding the wall" },
        goal: { zh: "让身体接受水压与浮力，建立「随时能抓到池边」的安全感。", en: "Get used to water pressure and buoyancy, and build the confidence of always having the wall within reach." },
        steps: [
          { zh: "双手扶池边，在浅区慢慢蹲下，让水依次到腰、到肩，全程用嘴正常呼吸。", en: "Hold the wall in shallow water and slowly squat until water reaches your waist, then shoulders, breathing normally through your mouth." },
          { zh: "扶边沿池壁横向走 5 米，感受水的阻力；不奔跑、不闭眼。", en: "Walk 5 metres sideways along the wall to feel the drag; no running, eyes open." },
          { zh: "单手交替松开 1 秒再抓回，确认自己随时能站直。", en: "Let go with one hand for a second, then re-grip; confirm you can stand up at any moment." }
        ],
        mistake: { zh: "一上来就去深水区或憋气硬撑——先做到「随时能站、随时能抓边」再进下一课。", en: "Heading to deep water or holding your breath on day one — master 'stand and grab the wall anytime' before moving on." },
        related: ["venue_select", "venue_slip"]
      },
      {
        id: "basics_breath",
        title: { zh: "水中呼气与吐泡", en: "Exhaling in water & blowing bubbles" },
        goal: { zh: "把「脸入水就憋气」改成「脸入水持续呼气」，这是所有泳姿换气的地基。", en: "Replace 'hold your breath when your face goes in' with 'exhale continuously underwater' — the foundation of breathing in every stroke." },
        steps: [
          { zh: "扶边蹲至下巴齐水，用嘴吸一小口，把脸埋入水中用鼻嘴缓慢吐气 3 秒，看气泡。", en: "Squat chin-deep holding the wall, take a small breath, put your face in and exhale slowly through nose and mouth for 3 seconds; watch the bubbles." },
          { zh: "抬头时只吸气、不刻意擦脸，重复 10 次，节奏保持均匀。", en: "Lift the head to inhale only, do not wipe your face; repeat 10 times at an even rhythm." },
          { zh: "进阶：脸入水时睁眼，看清池底瓷砖，降低对水的紧张感。", en: "Progress: open your eyes underwater and look at the pool tiles to reduce tension." }
        ],
        mistake: { zh: "出水猛吸一大口、水下憋气——会越练越喘；气量要小，呼气要连续。", en: "Gulping air above water and holding it below makes you gasp harder; keep breaths small and exhalation continuous." },
        related: ["choking", "child_skills"]
      },
      {
        id: "basics_float",
        title: { zh: "扶边俯漂与自主站立", en: "Wall float & standing up on your own" },
        goal: { zh: "体会「身体自己会浮」，并练会最主要的自救动作：从漂浮稳稳站起来。", en: "Feel that your body floats by itself, and drill the key self-rescue move: standing up steadily from a float." },
        steps: [
          { zh: "双手轻扶池边、吸气后低头，让腿慢慢离底向后伸直，身体呈一字俯漂 5 秒。", en: "Hold the wall lightly, inhale, bow your head and let your legs lift and extend behind you into a 5-second prone float." },
          { zh: "收膝、双脚向身体下方收回，同时双手向下压水，抬头站直——把这一串练成条件反射。", en: "Bring knees toward the chest, plant the feet underneath you, press down with both hands and lift the head to stand — drill this until it is reflex." },
          { zh: "每次漂浮后都自己站起，不靠同伴拉，重复 8 次。", en: "Stand up on your own after every float, without a buddy pulling you; repeat 8 times." }
        ],
        mistake: { zh: "抬头找人、腰部用力拱起导致腿下沉——头越低、身体越放松，腿越容易浮。", en: "Lifting the head to look for help and arching the back sinks the legs — the lower the head and the looser the body, the easier the legs float." },
        related: ["child_skills", "venue_select"]
      },
      {
        id: "basics_backfloat",
        title: { zh: "仰漂、呼救与抓浮具", en: "Back float, calling for help & grabbing a float" },
        goal: { zh: "掌握省力的最后姿态：仰漂保住呼吸道，并能大声呼救、抓住最近的浮具。", en: "Learn the most economical survival posture: a back float that keeps the airway up, plus shouting and grabbing the nearest float." },
        steps: [
          { zh: "浅区由同伴托住后脑，头后仰、耳朵入水、髋部上顶，腹部微露水面，缓慢呼吸 10 秒。", en: "In shallow water, with a buddy supporting the back of your head, tilt the head back, ears in, hips up, belly near the surface; breathe slowly for 10 seconds." },
          { zh: "保持仰漂姿势大声喊「救命」，练习在不乱蹬腿的情况下发声。", en: "Stay in the back float and shout for help; practise speaking without thrashing your legs." },
          { zh: "同伴把浮板递到手边，睁眼伸手抓住并抱在胸前，再慢速收腿站起。", en: "Have a buddy pass a kickboard to your hand; reach, hold it to your chest, then slowly bring your legs down and stand." }
        ],
        mistake: { zh: "下巴抬高、腹部刻意挺起反而沉髋——想象「后脑勺搁在水面上」，让水托住身体。", en: "Raising the chin and forcing the belly up sinks the hips — imagine resting the back of your skull on the surface and let the water hold you." },
        related: ["exhaustion", "drowning_rescue", "gear_lifejacket"]
      },
      {
        id: "basics_move",
        title: { zh: "扶边移动与轻打腿", en: "Wall movement & a gentle kick" },
        goal: { zh: "从「静止漂浮」过渡到「能移动」，为扶板打腿和蛙泳 L0 计划做准备。", en: "Move from a static float to actual movement, preparing for kickboard drills and the breaststroke L0 plan." },
        steps: [
          { zh: "双手扶边俯漂，双腿伸直、脚踝放松，做小幅上下交替打水 15 秒。", en: "From a prone float holding the wall, keep legs straight and ankles loose; do a small alternating flutter kick for 15 seconds." },
          { zh: "一侧手扶边、另一侧沿池壁轻推，身体保持水平横向移动 3 米。", en: "Keep one hand on the wall and gently push with the other, travelling 3 metres sideways while staying horizontal." },
          { zh: "能连续完成 3 组后，再引入扶板打腿；仍不进入深水区。", en: "After 3 clean sets, introduce kickboard drills — still no deep water." }
        ],
        mistake: { zh: "膝盖大幅弯曲「骑自行车」式踢水——幅度来自髋、膝盖放松，水花留在水面下。", en: "Bending the knees into a 'cycling' kick — drive from the hips with relaxed knees and keep the splash under the surface." },
        related: ["gear_kickboard", "exhaustion"]
      }
    ],
    next: [
      { label: { zh: "读场所与身体禁忌", en: "Read venue & health notes" }, href: "safety.html" },
      { label: { zh: "进入蛙泳 L0 计划", en: "Go to the breaststroke L0 plan" }, href: "stroke.html?id=breaststroke" }
    ]
  },

  /* ---------- L3 进阶技术（P1） ---------- */
  advanced: {
    meta: {
      zh: "L3 进阶技术：转身、出发、配速与周期化训练、动作自查清单，全部为静态站可交付的自练内容。",
      en: "Advanced L3 technique: turns, starts, pacing and periodised training, plus a self-review checklist — all self-study content a static site can actually deliver."
    },
    intro: {
      zh: "L3 的目标不是「游得更多」，而是把每个技术环节量化、可复查。本页不含账号、投稿或社区功能；想获得反馈，用下面的录制自查清单，并把视频带给持证教练复盘。",
      en: "L3 is not about swimming more, but making every technical detail measurable and reviewable. This page has no accounts, submissions or community features; use the recording checklist below and bring the footage to a certified coach for review."
    },
    note: {
      zh: "转身与出发须在场馆允许的深水区域、有救生员在场时练习；任何头颈不适立即停止。本站无教练在线纠错，内容不替代现场指导。",
      en: "Practise turns and starts only in designated deep-water areas with a lifeguard present; stop at any neck or head discomfort. This site offers no live coaching and does not replace on-deck instruction."
    },
    modules: [
      {
        id: "adv_turns",
        title: { zh: "转身：触壁到蹬壁的一条线", en: "Turns: one line from touch to push-off" },
        points: [
          { zh: "触壁前不减速、不抬头找墙；最后 3 米保持正常划频与流线型。", en: "Do not slow down or lift the head to find the wall; keep normal stroke rate and a streamlined line over the last 3 metres." },
          { zh: "触壁瞬间收膝、团身侧翻，双脚贴壁、双手过头并拢，转动时间越短越好。", en: "At the touch, tuck the knees and roll, plant both feet on the wall with arms united overhead; keep rotation time short." },
          { zh: "蹬壁后保持流线型滑行，用海豚腿或打腿过渡，出水前不急于划手。", en: "Push off into a streamlined glide, transition with dolphin or flutter kicks, and do not rush the first pull." },
          { zh: "仰泳转身须按规则在触壁前翻成俯卧，避免违规与肩颈扭伤。", en: "In backstroke, roll to prone before the touch as the rules require, avoiding disqualification and shoulder/neck strain." }
        ],
        drills: { zh: "池边团身翻滚 10 次 → 蹬壁流线型滑行 6×10 米 → 完整转身 8×25 米，记录每次蹬壁后的滑行距离。", en: "10 tuck rolls at the wall → 6×10 m streamlined push-offs → 8×25 m full turns, logging glide distance after each push-off." },
        related: ["venue_diving", "contra_knee"]
      },
      {
        id: "adv_starts",
        title: { zh: "出发：安全边界优先", en: "Starts: safety boundaries first" },
        points: [
          { zh: "只在场馆明确允许跳水的深区练习；浅水、陌生水域、拥挤泳道一律禁止头先入水。", en: "Practise only in designated deep diving zones; no head-first entry in shallow, unfamiliar or crowded water." },
          { zh: "新手从池边坐姿或蹲姿出发开始，先练「双臂贴耳、头藏于臂间」的入水线。", en: "Begin with a seated or crouched poolside start, drilling the entry line with arms locked by the ears and head tucked between them." },
          { zh: "入水后保持流线型，用水下海豚腿维持速度，浮出水面第一动作不破坏身体线。", en: "Hold the streamline after entry, keep speed with underwater dolphin kicks, and let the first surface stroke preserve body line." },
          { zh: "有颈椎、腰椎或肩伤史者不做跳发，改用水中蹬壁出发。", en: "With a history of neck, lower-back or shoulder injury, skip dive starts and use a wall push-off instead." }
        ],
        drills: { zh: "陆上流线型定型 10 次 → 池边坐姿入水 8 次 → 水下海豚腿 6×10 米；全程由同伴确认落点无人。", en: "10 dry-land streamline holds → 8 seated entries → 6×10 m underwater dolphin kicks; a buddy confirms the landing zone is clear every time." },
        related: ["venue_diving", "contra_knee"]
      },
      {
        id: "adv_pacing",
        title: { zh: "配速与周期化：把训练量化", en: "Pacing & periodisation: quantify the training" },
        points: [
          { zh: "用「每 50m 划手数 + 用时」两个指标记录效率，比单纯看秒数更能反映技术变化。", en: "Track stroke count per 50 m plus time; together they reveal technical change far better than time alone." },
          { zh: "一周内交替安排技术课、耐力课、速度课与恢复课，不连续两天高强度。", en: "Alternate technique, endurance, speed and recovery sessions across the week; never two high-intensity days in a row." },
          { zh: "每 3 周加量后安排 1 周减量，观察划距是否回升，避免长期疲劳堆积。", en: "After 3 building weeks, take 1 deload week and watch whether distance per stroke recovers; avoid accumulated fatigue." },
          { zh: "训练日志只记三项：组数、每 50m 划手数、主观疲劳度，便于逐周对比。", en: "Keep the log to three fields: sets, strokes per 50 m, perceived effort — easy to compare week over week." }
        ],
        drills: { zh: "按训练计划页的 L3 周表执行，每周复盘一次划距曲线；连续两周下降就降低强度。", en: "Follow the L3 weekly table on the Training page, review the distance-per-stroke curve weekly, and cut intensity after two consecutive declines." },
        related: ["contra_fatigue", "exhaustion"]
      },
      {
        id: "adv_selfcheck",
        title: { zh: "动作自查：录制对照清单", en: "Self-review: a recording checklist" },
        points: [
          { zh: "侧面与正面各录 2 趟 25 米，镜头固定、与水面的高度保持一致。", en: "Record two 25 m lengths from the side and two from the front, with a fixed camera at a consistent height above the water." },
          { zh: "逐项核对：入水点是否过中线、换气是否抬头、推水是否到髋、打腿是否来自髋。", en: "Check four items: entry crossing the midline, head lifting to breathe, push finishing past the hip, kick driven from the hip." },
          { zh: "把视频与本站「常见错误与纠正」逐条比对，一次只改一个动作。", en: "Compare footage against the 'Common Mistakes & Fixes' section, and change only one mechanic at a time." },
          { zh: "把仍有疑问的片段带给持证教练复盘；本站不提供在线动作纠错。", en: "Take unresolved clips to a certified coach for review; this site offers no online stroke correction." }
        ],
        drills: { zh: "每次课后填一份自查表：保留项、待改项、下次目标；4 周后回看第一期视频对比。", en: "After each session, fill a short form: keep, fix, next goal; revisit the first clip after 4 weeks." },
        related: ["contra_fatigue", "gear_goggles"]
      }
    ],
    next: [
      { label: { zh: "查看 L3 周训练计划", en: "See the L3 weekly plan" }, href: "training.html" },
      { label: { zh: "专攻蝶泳教程", en: "Focus on butterfly" }, href: "stroke.html?id=butterfly" }
    ]
  },

  /* ---------- 训练计划与装备选购（P1 / PRD v1.1） ---------- */
  training: {
    meta: {
      zh: "L1–L3 跨泳姿训练计划与装备选购指南：周安排、量化指标、常见选购误区，并链接对应安全条目。",
      en: "Cross-stroke L1–L3 training plans and a gear-buying guide: weekly structure, measurable metrics, common buying mistakes, with links to the matching safety entries."
    },
    intro: {
      zh: "泳姿教程解决「怎么游」，这一页解决「怎么安排」。{n} 份周计划按等级递进，装备部分只讲选购判断标准，不推荐品牌与商品。",
      en: "Stroke tutorials answer 'how to swim'; this page answers 'how to structure it'. {n} weekly plans progress by level, and the gear section gives selection criteria only — no brands or products."
    },
    note: {
      zh: "训练量需按个人体能与教练建议调整；任何胸闷、眩晕、持续疼痛立即停止。装备相关的医学/安全条目状态见安全页。",
      en: "Adjust volume to your fitness and your coach's advice; stop at chest tightness, dizziness or persistent pain. See the Safety page for the review status of gear-related medical/safety entries."
    },
    plans: [
      {
        level: "L1",
        title: { zh: "第一个完整泳姿", en: "Your first complete stroke" },
        cycle: { zh: "4–6 周", en: "4–6 weeks" },
        frequency: { zh: "每周 2–3 次，每次 40 分钟", en: "2–3 sessions a week, 40 min each" },
        blocks: [
          { zh: "热身与水中呼气 10 分钟（零基础课第 2 课）。", en: "10 min warm-up and in-water exhalation (Basics lesson 2)." },
          { zh: "蛙泳分解 20 分钟：扶板腿、腿+呼吸、单臂配合，按该页 L1 计划推进。", en: "20 min breaststroke drills: board kick, kick + breath, one-arm coordination, following the stroke's L1 plan." },
          { zh: "完整游 2×15 米 + 放松 10 分钟，记录能否连续换气。", en: "2×15 m full swim plus 10 min easy work; log whether breathing stays continuous." }
        ],
        measure: { zh: "结业标准：连续游 50 米且换气不慌、能自主站立。", en: "Completion: 50 m continuous with calm breathing and confident standing up." }
      },
      {
        level: "L2",
        title: { zh: "效率、提速与减脂", en: "Efficiency, speed & fat loss" },
        cycle: { zh: "8 周", en: "8 weeks" },
        frequency: { zh: "每周 3–4 次，每次 45–60 分钟", en: "3–4 sessions a week, 45–60 min each" },
        blocks: [
          { zh: "技术课：自由泳入水点与高肘、仰泳直线控制，各 8×50 米计数游。", en: "Technique: freestyle entry line and high elbow, backstroke line control, 8×50 m counted swims each." },
          { zh: "耐力课：200 米 ×4 匀速，组间休息控制在可对话强度。", en: "Endurance: 4×200 m even pace, resting at conversational effort." },
          { zh: "速度课：25 米 ×8 快速 + 50 米慢速恢复，每周只安排一次。", en: "Speed: 8×25 m fast with 50 m easy recovery, once a week only." }
        ],
        measure: { zh: "每周记录每 50 米划手数与 400 米配速，目标划手数逐周下降 1–2 次。", en: "Log strokes per 50 m and 400 m pace weekly; aim to cut 1–2 strokes per 50 m each week." }
      },
      {
        level: "L3",
        title: { zh: "周期化与专项", en: "Periodisation & specialisation" },
        cycle: { zh: "3 周加量 + 1 周减量，循环", en: "3 build weeks + 1 deload week, repeated" },
        frequency: { zh: "每周 4–5 次，含 1 次恢复课", en: "4–5 sessions a week including 1 recovery session" },
        blocks: [
          { zh: "专项课：蝶泳节奏、转身与出发（见 L3 进阶技术页），每次只练一个环节。", en: "Specialisation: butterfly rhythm, turns and starts (see the L3 technique page), one element per session." },
          { zh: "配速课：按目标配速分段游，记录每 50 米划手数与主观疲劳度。", en: "Pace work: goal-pace sets logging strokes per 50 m and perceived effort." },
          { zh: "恢复课：低强度技术游 + 自查录制，不做计时冲刺。", en: "Recovery: low-intensity technique swimming plus self-review recording, no timed sprints." }
        ],
        measure: { zh: "减量周结束后对比划距曲线；连续两周下降即下调强度并咨询教练。", en: "Compare distance-per-stroke after each deload week; two straight declines mean cut intensity and consult a coach." }
      }
    ],
    gear: [
      {
        id: "gear_buy_goggles",
        name: { zh: "泳镜", en: "Goggles" },
        criteria: { zh: "看贴合：轻压眼眶能吸附 1–2 秒不掉落；鼻桥可换或可调；镜片选透明/浅色 indoor、镀膜 outdoor。防雾优先选原厂涂层，别用唾液反复擦。", en: "Fit: gentle pressure on the eye sockets should hold 1–2 seconds; choose a swappable/adjustable nose bridge; clear or light lenses indoors, mirrored outdoors. Prefer factory anti-fog coating over repeated saliva wiping." },
        avoid: { zh: "勒得过紧求「绝对不进水」会头痛并压迫眼周；儿童不选成人款。", en: "Over-tightening for a 'perfect seal' causes headaches and eye pressure; do not buy adult sizes for kids." },
        related: ["gear_goggles", "gear_shared"]
      },
      {
        id: "gear_buy_prescription",
        name: { zh: "近视 / 处方泳镜", en: "Prescription goggles" },
        criteria: { zh: "按验光度数选接近值（通常略低于框架镜），左右眼度数不同可分体定制；先确认能否试戴与退换。", en: "Pick a dioptre close to your prescription (usually slightly below glasses); different left/right powers can be custom-ordered. Check trial/return options first." },
        avoid: { zh: "戴隐形眼镜下水：镜片易被池水污染或丢失，风险远高于这点便利。", en: "Wearing contact lenses in the pool: lenses are easily contaminated or lost — the risk far outweighs the inconvenience." },
        related: ["gear_prescription", "venue_hygiene"]
      },
      {
        id: "gear_buy_cap",
        name: { zh: "泳帽", en: "Swim caps" },
        criteria: { zh: "敏感头皮选硅胶或布帽，避免乳胶；长发先束起再戴，尺寸以不勒太阳穴为准。", en: "Sensitive scalps: silicone or cloth, avoid latex; tie long hair up first, and pick a size that does not squeeze the temples." },
        avoid: { zh: "只看花色忽略材质，乳胶过敏与过紧头痛最常见。", en: "Buying on colour alone and ignoring material — latex allergy and over-tight headaches are the most common complaints." },
        related: ["gear_cap"]
      },
      {
        id: "gear_buy_suit",
        name: { zh: "泳衣", en: "Swimwear" },
        criteria: { zh: "贴身速干面料，抬手、下蹲不移位；训练用耐氯材质；儿童避免裙式与松动饰物。", en: "Fitted quick-dry fabric that stays put when you raise your arms or squat; chlorine-resistant for training; no skirts or loose decorations for kids." },
        avoid: { zh: "棉质衣裤吸水增重、宽松款勾挂池壁扶梯。", en: "Cotton soaks up weight and loose styles snag on walls and ladders." },
        related: ["gear_swimsuit"]
      },
      {
        id: "gear_buy_board",
        name: { zh: "浮板与训练浮具", en: "Kickboards & training floats" },
        criteria: { zh: "浮力以「扶板能保持髋部接近水面」为准，边缘圆润不磨手；新手选一块基础浮板即可。", en: "Enough buoyancy to keep hips near the surface, with rounded, hand-friendly edges; beginners need one basic board only." },
        avoid: { zh: "把浮板当救生设备、在深水区长期依赖；它只是分解练习工具。", en: "Treating a kickboard as lifesaving gear or depending on it in deep water — it is a drill tool only." },
        related: ["gear_kickboard", "gear_buoy"]
      },
      {
        id: "gear_buy_earnose",
        name: { zh: "耳塞与鼻夹", en: "Ear plugs & nose clips" },
        criteria: { zh: "耳塞选可塑形硅胶、不深入耳道；鼻夹弹性适中，能间歇取下。", en: "Mouldable silicone ear plugs that do not enter the canal; nose clips with moderate tension that can be removed between sets." },
        avoid: { zh: "长期依赖鼻夹会拖延学会水中平稳呼气；耳痛、流液史先问医生。", en: "Long-term nose-clip reliance delays smooth in-water exhalation; ask a doctor first if you have ear pain or discharge." },
        related: ["gear_earplugs", "gear_noseclip", "ear_water"]
      },
      {
        id: "gear_buy_buoy",
        name: { zh: "公开水域浮球", en: "Open-water swim buoy" },
        criteria: { zh: "选带反光条的充气浮球，检查气密与单向阀；系带绕腰、松紧适度，可挂信号旗。", en: "Inflatable with reflective strips, check airtightness and the one-way valve; waist strap snug but not tight, with room for a signal flag." },
        avoid: { zh: "用充气玩具替代浮球；下水前不检查漏气等于没带。", en: "Substituting an inflatable toy for a buoy; skipping the leak check means you brought nothing." },
        related: ["gear_buoy", "venue_openwater"]
      },
      {
        id: "gear_buy_kids",
        name: { zh: "儿童浮力衣", en: "Kids' buoyancy vests" },
        criteria: { zh: "认符合国家标准的泡沫型，尺码贴腋下不松动；必须有成人在一臂之内看护。", en: "National-standard foam type, snug at the armpits; always paired with an adult within arm's reach." },
        avoid: { zh: "把浮力衣当「免看护凭证」；充气型易漏气侧翻，风险最高。", en: "Treating the vest as a substitute for supervision; inflatable types leak and capsize most easily." },
        related: ["gear_lifejacket", "child_supervision", "child_floaties"]
      },
      {
        id: "gear_buy_snorkel",
        name: { zh: "训练呼吸管", en: "Front-mount swim snorkel" },
        criteria: { zh: "选前置式、管托贴合额头、咬嘴可更换；仅用于泳池技术训练。", en: "Front-mount with a comfortable forehead bracket and replaceable mouthpiece; for pool technique work only." },
        avoid: { zh: "用它掩盖换气缺陷或带去公开水域；管内倒灌时无浪涌保护。", en: "Using it to hide breathing flaws or taking it to open water — there is no splash protection against backflow." },
        related: ["gear_snorkel", "choking"]
      }
    ],
    next: [
      { label: { zh: "查看全部泳姿教程", en: "See all stroke tutorials" }, href: "strokes.html" },
      { label: { zh: "查看安全条目", en: "See safety entries" }, href: "safety.html" }
    ]
  },

  /* ---------- 内容互链（P1）：集中维护，check.js 校验 id ---------- */
  strokeLinks: {
    breaststroke: {
      safety: ["cramp", "contra_knee", "gear_kickboard"],
      next: [
        { label: { zh: "零基础先练入门课", en: "Start with the basics lessons" }, href: "basics.html" },
        { label: { zh: "看 L1 周训练计划", en: "See the L1 weekly plan" }, href: "training.html" }
      ]
    },
    freestyle: {
      safety: ["choking", "contra_fatigue", "gear_goggles"],
      next: [
        { label: { zh: "看 L2 提速计划", en: "See the L2 speed plan" }, href: "training.html" },
        { label: { zh: "练仰泳作为互补", en: "Add backstroke as a complement" }, href: "stroke.html?id=backstroke" }
      ]
    },
    backstroke: {
      safety: ["dizziness", "venue_diving", "ear_water"],
      next: [
        { label: { zh: "看 L2 周训练计划", en: "See the L2 weekly plan" }, href: "training.html" },
        { label: { zh: "转身技术（L3）", en: "Turn technique (L3)" }, href: "advanced.html" }
      ]
    },
    butterfly: {
      safety: ["contra_knee", "exhaustion", "contra_fatigue"],
      next: [
        { label: { zh: "看 L3 进阶技术", en: "See L3 advanced technique" }, href: "advanced.html" },
        { label: { zh: "看 L3 周期化计划", en: "See the L3 periodised plan" }, href: "training.html" }
      ]
    },
    dogpaddle: {
      safety: ["child_supervision", "exhaustion"],
      next: [
        { label: { zh: "回去学正规蛙泳", en: "Back to real breaststroke" }, href: "stroke.html?id=breaststroke" }
      ]
    }
  },
  safetyLinks: {
    cramp: ["exhaustion", "hypothermia", "gear_buoy"],
    exhaustion: ["drowning_rescue", "cramp", "contra_fatigue"],
    drowning_rescue: ["child_supervision", "exhaustion", "venue_select"],
    child_supervision: ["child_floaties", "gear_lifejacket", "drowning_rescue"],
    gear_goggles: ["gear_prescription", "gear_shared", "venue_hygiene"],
    gear_prescription: ["gear_goggles", "venue_hygiene"],
    gear_lifejacket: ["child_floaties", "child_supervision"],
    venue_openwater: ["gear_buoy", "venue_storm", "exhaustion"],
    choking: ["child_skills", "gear_snorkel"],
    contra_knee: ["cramp", "contra_fatigue"],
    gear_kickboard: ["gear_buoy", "exhaustion", "child_skills"]
  },

  /* ---------- 等级自测（5 题，AC：≤5 题→推荐起点） ---------- */
  quiz: {
    questions: [
      { q: { zh: "在水中的安全感如何？", en: "How safe do you feel in the water?" },
        opts: [
          { label: { zh: "怕水，不敢把脸入水", en: "Afraid of water; my face can't go in" }, score: 0 },
          { label: { zh: "扶池边能漂浮、换气", en: "I can float and breathe holding the wall" }, score: 1 },
          { label: { zh: "深水区能独立漂浮/踩水", en: "I float or tread water in the deep end on my own" }, score: 2 }
        ] },
      { q: { zh: "连续游泳距离？", en: "How far can you swim continuously?" },
        opts: [
          { label: { zh: "无法连续游", en: "I can't swim continuously" }, score: 0 },
          { label: { zh: "50 米以内", en: "Under 50 metres" }, score: 1 },
          { label: { zh: "50–400 米", en: "50–400 metres" }, score: 2 },
          { label: { zh: "400 米以上", en: "More than 400 metres" }, score: 3 }
        ] },
      { q: { zh: "掌握哪些泳姿？", en: "Which strokes do you know?" },
        opts: [
          { label: { zh: "没有完整的泳姿", en: "No complete stroke yet" }, score: 0 },
          { label: { zh: "会 1 种（通常是蛙泳）", en: "One stroke (usually breaststroke)" }, score: 1 },
          { label: { zh: "会 2–3 种", en: "Two to three strokes" }, score: 2 },
          { label: { zh: "会 4 种，且会转身/出发", en: "All four, plus turns and starts" }, score: 3 }
        ] },
      { q: { zh: "换气与节奏？", en: "Breathing and rhythm?" },
        opts: [
          { label: { zh: "换气紧张，抬头过高", en: "Breathing is tense; head lifts too high" }, score: 0 },
          { label: { zh: "能连续换气", en: "I breathe continuously" }, score: 1 },
          { label: { zh: "有节奏意识（滑行/划频）", en: "I'm aware of rhythm (glide, stroke rate)" }, score: 2 },
          { label: { zh: "能按配速训练", en: "I can train by pace" }, score: 3 }
        ] },
      { q: { zh: "训练与知识？", en: "Training and knowledge?" },
        opts: [
          { label: { zh: "偶尔玩水", en: "Occasional play in water" }, score: 0 },
          { label: { zh: "每周游泳，有健身目标", en: "I swim weekly with fitness goals" }, score: 1 },
          { label: { zh: "有系统训练计划", en: "I follow a structured training plan" }, score: 2 },
          { label: { zh: "带过人游泳 / 有教练经验", en: "I've coached / led swimmers" }, score: 3 }
        ] }
    ],
    bands: [
      { max: 2, level: "L0",
        text: { zh: "建议从 L0 开始：先完成「下水前 5 课」（适应水、呼气、漂浮、仰漂呼救），再进蛙泳 L0 计划；同时先看场所安全与身体禁忌，全程有人陪同。",
                en: "Start at L0: finish the 5 pre-swim basics lessons (water adjustment, exhaling, floating, back float & calling), then the breaststroke L0 plan. Read venue & health notes first, always with a companion." },
        links: [
          { label: { zh: "开始下水前课程", en: "Start the basics lessons" }, href: "basics.html" },
          { label: { zh: "先看安全条目", en: "Read safety entries first" }, href: "safety.html" },
          { label: { zh: "蛙泳 L0 计划", en: "Breaststroke L0 plan" }, href: "stroke.html?id=breaststroke" }
        ] },
      { max: 5, level: "L1",
        text: { zh: "建议从 L1 开始：按蛙泳分步教程学习（动作分解→常见错误→练习计划），配合 L1 周训练计划，每周 2–3 次，4–6 周完成第一个完整泳姿。",
                en: "Start at L1: follow the breaststroke course (breakdown → mistakes → practice plan) with the L1 weekly plan, 2–3 sessions a week; 4–6 weeks to your first complete stroke." },
        links: [
          { label: { zh: "开始蛙泳教程", en: "Start breaststroke tutorial" }, href: "stroke.html?id=breaststroke" },
          { label: { zh: "看 L1 周训练计划", en: "See the L1 weekly plan" }, href: "training.html" },
          { label: { zh: "装备怎么选", en: "How to pick gear" }, href: "training.html" }
        ] },
      { max: 9, level: "L2",
        text: { zh: "建议从 L2 开始：深化自由泳技术（入水点、高肘、配速），同时练习仰泳；按 L2 周计划训练，把「每 50m 划手数」作为效率指标。",
                en: "Start at L2: deepen freestyle (entry line, high elbow, pacing) and practise backstroke; follow the L2 weekly plan and track stroke count per 50m as your efficiency metric." },
        links: [
          { label: { zh: "开始自由泳深化", en: "Deepen freestyle" }, href: "stroke.html?id=freestyle" },
          { label: { zh: "看 L2 提速计划", en: "See the L2 speed plan" }, href: "training.html" },
          { label: { zh: "看仰泳教程", en: "See backstroke" }, href: "stroke.html?id=backstroke" }
        ] },
      { max: 14, level: "L3",
        text: { zh: "建议从 L3 开始：专攻蝶泳的躯干波动与呼吸时机，练转身与出发，按周期化计划推进；用侧面录制对照做动作自查，并把视频带给持证教练复盘。",
                en: "Start at L3: focus on butterfly trunk wave and breathing timing, drill turns and starts, and follow a periodised plan. Self-review with side-view footage and bring it to a certified coach." },
        links: [
          { label: { zh: "开始蝶泳教程", en: "Start butterfly tutorial" }, href: "stroke.html?id=butterfly" },
          { label: { zh: "看 L3 进阶技术", en: "See L3 advanced technique" }, href: "advanced.html" },
          { label: { zh: "看 L3 周期化计划", en: "See the L3 periodised plan" }, href: "training.html" }
        ] }
    ]
  }
};
