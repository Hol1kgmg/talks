<script setup lang="ts">
import { computed } from 'vue'
import defaultOrthoCsv from './default-ortho.csv?raw'
import myOrthoCsv from './my-ortho.csv?raw'

const props = withDefaults(defineProps<{
  // mine / normal: 静止表示。morph: step に応じてフルサイズ → my-ortho へ変形
  layout?: 'mine' | 'normal' | 'morph'
  step?: number
  width?: string
  // morph で中央寄せ(step 5)以降の幅(%)。静止表示の mine と同じ見た目にする
  endWidth?: number
}>(), {
  layout: 'mine',
  step: 0,
  width: 'w-full',
  endWidth: 80,
})

interface Key { id: string, label: string, x: number, y: number, w: number, h: number }
// unitCols: 1u の実寸をこの列数のレイアウトと同じにする(枠幅は cols/unitCols 倍になる)。省略時は cols
interface Layout { cols: number, rows: number, keys: Key[], unitCols?: number }
interface Box { x0: number, y0: number, x1: number, y1: number }

// 文字列は 1u キー(id = 刻印) / 数値は隙間(u) / タプルは [刻印, 幅u, 高さu, id]
type Spec = string | number | readonly [string, number?, number?, string?]

const build = (rows: Spec[][]): Key[] =>
  rows.flatMap((specs, y) => {
    let x = 0
    const keys: Key[] = []
    for (const s of specs) {
      if (typeof s === 'number') {
        x += s
        continue
      }
      const [label, w = 1, h = 1, id = label] = typeof s === 'string' ? [s] : s
      keys.push({ id, label, x, y, w, h })
      x += w
    }
    return keys
  })

const chars = (s: string): Spec[] => [...s]
const num = (s: string): Spec[] => [...s].map(c => [c, 1, 1, `n${c}`] as const)

// 22.5u × 6行。フルサイズ ANSI 104キー
const normal: Layout = {
  cols: 22.5,
  rows: 6,
  keys: build([
    ['Esc', 1, 'F1', 'F2', 'F3', 'F4', 0.5, 'F5', 'F6', 'F7', 'F8', 0.5, 'F9', 'F10', 'F11', 'F12', 0.25, 'PrtSc', 'ScrLk', 'Pause'],
    [...chars('`1234567890-='), ['Bksp', 2], 0.25, 'Ins', 'Home', 'PgUp', 0.25, 'Num', ['/', 1, 1, 'n/'], ['*', 1, 1, 'n*'], ['-', 1, 1, 'n-']],
    [['Tab', 1.5], ...chars('QWERTYUIOP[]'), ['\\', 1.5], 0.25, 'Del', 'End', 'PgDn', 0.25, ...num('789'), ['+', 1, 2, 'n+']],
    [['Caps', 1.75], ...chars('ASDFGHJKL;\''), ['Enter', 2.25], 0.25, 3, 0.25, ...num('456')],
    [['Shift', 2.25, 1, 'lshift'], ...chars('ZXCVBNM,./'), ['Shift', 2.75, 1, 'rshift'], 0.25, 1, '↑', 1, 0.25, ...num('123'), ['Enter', 1, 2, 'nEnter']],
    [['Ctrl', 1.25, 1, 'lctrl'], ['Win', 1.25, 1, 'lwin'], ['Alt', 1.25, 1, 'lalt'], ['', 6.25, 1, 'Space'], ['Alt', 1.25, 1, 'ralt'], ['Win', 1.25, 1, 'rwin'], ['Menu', 1.25], ['Ctrl', 1.25, 1, 'rctrl'], 0.25, '←', '↓', '→', 0.25, ['0', 2, 1, 'n0'], ['.', 1, 1, 'n.']],
  ]),
}

// 13u × 4行の格子配列を CSV(row,col,label) から組む。4行目の 5〜8 列目だけ 1.25u
// ponytail: 幅の例外は row/col のベタ書き。別形状の格子を増やすなら CSV に width 列を足す
const orthoIds: Record<string, string> = { '<': ',', '>': '.', 'shift': 'lshift', 'Shift': 'lshift', 'control': 'lctrl', 'alt': 'lalt' }
const orthoWidth = (row: number, col: number) => (row === 4 && col >= 5 && col <= 8 ? 1.25 : 1)
const parseOrtho = (csv: string): Layout => {
  const rows: Spec[][] = []
  for (const line of csv.trim().split(/\r?\n/).slice(1)) {
    const [r, c, ...rest] = line.split(',')
    const row = Number(r)
    const col = Number(c)
    const label = rest.join(',').replace(/^"(.*)"$/, '$1')
    const id = label ? orthoIds[label] ?? label : `blank-${row}-${col}`
    ;(rows[row - 1] ??= []).push([label, orthoWidth(row, col), 1, id])
  }
  return { cols: 13, rows: 4, keys: build(rows) }
}

const mine = parseOrtho(myOrthoCsv)
const defaultOrtho = parseOrtho(defaultOrthoCsv)

// morph の各ステップ。1〜4 はフルサイズから id を順に消す。5 で中央寄せしつつ 1u の実寸を格子配列に合わせ、6, 7 は格子配列
// 各 step の説明(サイズ% / 配列)は keyboard-state.ts の MORPH_STATES。フレームを増減したらそちらも揃えること
// 各グループの名前と色は、morph 中にキーボード上へ重ねるエリア枠に使う
const removalAreas = [
  { name: 'テンキー', class: 'border-blue-500 bg-blue-500/15 text-blue-700', ids: ['Num', 'n/', 'n*', 'n-', 'n7', 'n8', 'n9', 'n+', 'n4', 'n5', 'n6', 'n1', 'n2', 'n3', 'nEnter', 'n0', 'n.'] },
  { name: 'ナビキー', class: 'border-amber-500 bg-amber-500/15 text-amber-700', ids: ['PrtSc', 'ScrLk', 'Pause', 'Ins', 'Home', 'PgUp', 'Del', 'End', 'PgDn', '↑', '↓', '←', '→'] },
  { name: 'F列', class: 'border-green-600 bg-green-500/15 text-green-700', ids: ['Esc', ...Array.from({ length: 12 }, (_, i) => `F${i + 1}`)] },
  { name: '数字列', class: 'border-purple-500 bg-purple-500/15 text-purple-700', ids: [...chars('`1234567890-=') as string[], 'Bksp'] },
]
const bboxOf = (ks: Key[]): Box => ({
  x0: Math.min(...ks.map(k => k.x)),
  y0: Math.min(...ks.map(k => k.y)),
  x1: Math.max(...ks.map(k => k.x + k.w)),
  y1: Math.max(...ks.map(k => k.y + k.h)),
})
// 外接矩形ぴったりの枠に詰め直す(枠ごと縮んで mine と同じ見た目になる)
const fit = (keys: Key[]): Layout => {
  const b = bboxOf(keys)
  return { cols: b.x1 - b.x0, rows: b.y1 - b.y0, keys: keys.map(k => ({ ...k, x: k.x - b.x0, y: k.y - b.y0 })) }
}
const morphFrames: Layout[] = [normal]
for (const { ids } of removalAreas) {
  const gone = new Set(ids)
  morphFrames.push({ ...normal, keys: morphFrames.at(-1)!.keys.filter(k => !gone.has(k.id)) })
}
// 削り終えた状態を枠ごと縮めて中央に寄せる。配置はそのまま、1u の実寸は格子配列(13u 幅)に合わせる(1 回の transition で同時に動く)
// 格子配列は 3 step 続く(表示 → 格子線で強調 → 強調解除)。キー配置は同じで、GRID_STEP の時だけ格子線を重ねる
morphFrames.push({ ...fit(morphFrames.at(-1)!.keys), unitCols: defaultOrtho.cols }, defaultOrtho, defaultOrtho, defaultOrtho, mine)
const SHRINK_STEP = removalAreas.length + 1
const GRID_STEP = SHRINK_STEP + 2

const frames = computed<Layout[]>(() =>
  props.layout === 'morph' ? morphFrames : [props.layout === 'mine' ? mine : normal],
)
const step = computed(() => Math.min(Math.max(props.step, 0), frames.value.length - 1))
const base = computed(() => frames.value[step.value])
const shrunkWidth = computed(() => props.layout === 'morph' && step.value >= SHRINK_STEP)
const widthStyle = computed(() => shrunkWidth.value
  ? { width: `${props.endWidth * base.value.cols / (base.value.unitCols ?? base.value.cols)}%` }
  : undefined)

// 全ステップに登場する id ごとに、各フレームでの位置を持つ。登場しないフレームでは直前に居た位置(初登場前は初登場位置)
const tracks = computed(() => {
  const ids = [...new Set(frames.value.flatMap(f => f.keys.map(k => k.id)))]
  return ids.map((id) => {
    const seen = frames.value.map(f => f.keys.find(k => k.id === id))
    let last = seen.find(Boolean)!
    return { shown: seen.map(Boolean), at: seen.map(k => (last = k ?? last)) }
  })
})
// morph の削除ステップ中は、消したキーを薄く残して元の配列が分かるようにする(枠が縮む step 以降は完全に消す)
const allKeys = computed(() => {
  const i = step.value
  return tracks.value.map(({ shown, at }) => {
    const wasShown = shown.slice(0, i + 1).includes(true)
    const state = shown[i] ? 'on' : (wasShown && i < SHRINK_STEP ? 'dim' : 'off')
    return { ...at[i], state }
  })
})

// ケースは表示中のキーの外接矩形に追従する
const bbox = computed(() => bboxOf(base.value.keys))

// ステージ内側の 8px をケースの padding、キー同士の 4px 隙間はキー四辺の 2px で作る
const PAD = 8
const GAP = 2
const px = (u: number) => `calc((100% - ${PAD * 2}px) * ${u / base.value.cols})`
const py = (u: number) => `calc((100% - ${PAD * 2}px) * ${u / base.value.rows})`
// u 座標の矩形を絶対配置の style にする。shift は位置、grow は幅・高さに足す px
const rect = (x: number, y: number, w: number, h: number, shift = 0, grow = 0) => ({
  left: `calc(${px(x)} + ${shift}px)`,
  top: `calc(${py(y)} + ${shift}px)`,
  width: `calc(${px(w)} + ${grow}px)`,
  height: `calc(${py(h)} + ${grow}px)`,
})
const boxRect = (b: Box, shift = 0, grow = 0) => rect(b.x0, b.y0, b.x1 - b.x0, b.y1 - b.y0, shift, grow)
const keyStyle = (k: Key) => rect(k.x, k.y, k.w, k.h, PAD + GAP, -GAP * 2)
const caseStyle = computed(() => boxRect(bbox.value, 0, PAD * 2))

// エリア枠: 消えたエリアをエリア色の実線+塗り+名前で累積表示する。枠が縮む step 以降は全て非表示
const areas = computed(() => {
  if (props.layout !== 'morph' || step.value >= SHRINK_STEP)
    return []
  return removalAreas.slice(0, step.value).map(a => ({
    name: a.name,
    class: a.class,
    style: boxRect(bboxOf(normal.keys.filter(k => a.ids.includes(k.id))), PAD),
  }))
})

// 格子配列の強調 step だけ、1u 間隔の格子線を上 3 段のキー面に重ねる(1.25u が混ざる 4 段目は対象外)
// 線はケースを貫通させる: 横線は左右へ、縦線は上へ、それぞれ GRID_EXT u はみ出す
const GRID_ROWS = 3
const GRID_EXT = 1
const showGrid = computed(() => props.layout === 'morph' && step.value === GRID_STEP)
const gridStyle = computed(() => {
  const { x0, y0, x1 } = bbox.value
  const cols = x1 - x0
  return {
    ...rect(x0 - GRID_EXT, y0 - GRID_EXT, cols + GRID_EXT * 2, GRID_ROWS + GRID_EXT, PAD),
    // 以下は自身のサイズ基準。::before(縦線)は左右のはみ出し分を、::after(横線)は上のはみ出し分を除いた範囲に敷く
    '--ext-x': `${100 * GRID_EXT / (cols + GRID_EXT * 2)}%`,
    '--ext-y': `${100 * GRID_EXT / (GRID_ROWS + GRID_EXT)}%`,
    '--cell-x': `${100 / cols}%`,
    '--cell-y': `${100 / GRID_ROWS}%`,
  }
})

// morph の最終 step で、刻印ありキー数の変化(デフォルト格子配列 → 自分の配列)をキーボードの下に出す
const showCount = computed(() => props.layout === 'morph' && step.value === frames.value.length - 1)
const labeled = (l: Layout) => l.keys.filter(k => k.label).length
const keyCount = { from: labeled(defaultOrtho), to: labeled(mine) }
</script>

<template>
  <!-- 外枠: 縁の幅は全幅の約1%。% padding は幅基準なので上下左右同じ太さになる -->
  <!-- キー数表示を下に並べるため複数ルート。親は flex-col で置くこと(slides.md 参照) -->
  <div class="mx-auto rounded-xl border border-gray-400 bg-white p-[1%] shadow transition-all duration-700" :class="shrunkWidth ? '' : width" :style="widthStyle">
    <div class="relative transition-all duration-700" :style="{ aspectRatio: `${base.cols} / ${base.rows}` }">
      <div class="absolute rounded-lg border border-gray-400 bg-gray-300 transition-all duration-700" :style="caseStyle" />
      <div
        v-for="k in allKeys"
        :key="k.id"
        class="absolute flex items-center justify-center rounded border border-gray-400 bg-white text-[10px] font-mono shadow-sm transition-all duration-700"
        :class="{ on: 'opacity-100', dim: 'opacity-20', off: 'opacity-0' }[k.state]"
        :style="keyStyle(k)"
      >
        {{ k.label }}
      </div>
      <div
        v-for="a in areas"
        :key="a.name"
        class="absolute rounded border-2 transition-all duration-700 pointer-events-none"
        :class="a.class"
        :style="a.style"
      >
        <span class="absolute -top-2.5 left-1 px-1 rounded bg-white text-[10px] font-bold leading-none">{{ a.name }}</span>
      </div>
      <div v-if="showGrid" class="grid-flash absolute pointer-events-none" :style="gridStyle" />
    </div>
  </div>
  <!-- 高さ 0 の枠に absolute で置き、表示されてもキーボードの位置がずれないようにする -->
  <div class="relative h-0">
    <Transition name="count">
      <div v-if="showCount" class="absolute inset-x-0 top-6 flex items-center justify-center gap-4 font-mono text-3xl font-bold text-gray-700">
        <span>{{ keyCount.from }}<span class="ml-1 text-xl font-normal">キー</span></span>
        <span class="text-2xl font-normal text-gray-400">→</span>
        <span>{{ keyCount.to }}<span class="ml-1 text-xl font-normal">キー</span></span>
        <!-- キーボードサイズの慣習値(40% の下)。キー数からの計算値ではないので固定文言 -->
        <span class="text-xl font-normal text-gray-500">(30%相当)</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* 強調 step の間だけ表示。出現はパッと、消えるのは v-if で即時 */
.grid-flash {
  --line: rgb(100 116 139 / 0.45); /* slate-500 を薄く */
  --half: 1.5px; /* 線幅の半分(3px 線) */
  animation: grid-flash 0.15s ease-out;
}
.grid-flash::before,
.grid-flash::after {
  content: '';
  position: absolute;
}
/* 線は 1u の中央(キーの真上)を通す。境界(溝)に置くとキーの隙間に隠れて見えない */
.grid-flash::before {
  inset: 0 var(--ext-x);
  background-image: linear-gradient(
    to right,
    transparent calc(50% - var(--half)),
    var(--line) calc(50% - var(--half)) calc(50% + var(--half)),
    transparent calc(50% + var(--half))
  );
  background-size: var(--cell-x) 100%;
}
.grid-flash::after {
  inset: var(--ext-y) 0 0 0;
  background-image: linear-gradient(
    to bottom,
    transparent calc(50% - var(--half)),
    var(--line) calc(50% - var(--half)) calc(50% + var(--half)),
    transparent calc(50% + var(--half))
  );
  background-size: 100% var(--cell-y);
}
@keyframes grid-flash {
  from {
    opacity: 0;
  }
}

/* キーの変形(0.7s)が終わってからフェードイン */
.count-enter-active {
  transition: opacity 0.4s ease-out 0.7s;
}
.count-enter-from {
  opacity: 0;
}
.count-leave-active {
  transition: opacity 0.2s;
}
.count-leave-to {
  opacity: 0;
}
</style>
