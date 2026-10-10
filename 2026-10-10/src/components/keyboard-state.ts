// キーボードサイズの慣習値(キー数からの計算値ではない)
export const KeyboardSize = { Full: 100, TKL: 80, SeventyFive: 75, Sixty: 60, Forty: 40 } as const
type Size = typeof KeyboardSize[keyof typeof KeyboardSize]

export const KeyboardForm = { Unibody: '一体型' } as const
type Form = typeof KeyboardForm[keyof typeof KeyboardForm]

export const KeyLayout = { RowStagger: '通常配列', ColStagger: '縦ずれ配列', Ortho: '格子状配列' } as const
type Layout = typeof KeyLayout[keyof typeof KeyLayout]

export interface KeyboardState {
  form: Form
  size: Size
  layout?: Layout
  // 配列ラベルを枠で強調し、キーボード側に格子線を映す
  highlight?: boolean
}

// Keyboard.vue の morph の step と 1:1。removals やフレームを増減したらここも揃えること
const unibody = (size: Size, layout?: Layout, highlight?: boolean): KeyboardState => ({ form: KeyboardForm.Unibody, size, layout, highlight })
export const MORPH_STATES: KeyboardState[] = [
  unibody(KeyboardSize.Full), // 0 フルサイズ
  unibody(KeyboardSize.TKL), // 1 テンキー削除
  unibody(KeyboardSize.SeventyFive), // 2 ナビキー削除
  unibody(KeyboardSize.Sixty), // 3 F列削除
  unibody(KeyboardSize.Forty), // 4 数字列削除
  unibody(KeyboardSize.Forty), // 5 枠ごと縮小しつつ 1u の実寸を格子配列に合わせる
  unibody(KeyboardSize.Forty, KeyLayout.Ortho), // 6 デフォルトの格子配列
  unibody(KeyboardSize.Forty, KeyLayout.Ortho, true), // 7 格子状配列を強調(枠 + 格子線)
  unibody(KeyboardSize.Forty, KeyLayout.Ortho), // 8 強調を解除
  unibody(KeyboardSize.Forty, KeyLayout.Ortho), // 9 自分の配列
]
export const stateAt = (step: number): KeyboardState => MORPH_STATES[Math.min(Math.max(step, 0), MORPH_STATES.length - 1)]
