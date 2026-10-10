import defaultOrthoCsv from './default-ortho.csv?raw'
import myOrthoCsv from './my-ortho.csv?raw'

export interface Key { id: string, label: string, x: number, y: number, w: number, h: number }
// unitCols: 1u の実寸をこの列数のレイアウトと同じにする(枠幅は cols/unitCols 倍になる)。省略時は cols
export interface Layout { cols: number, rows: number, keys: Key[], unitCols?: number }

// 文字列は 1u キー(id = 刻印) / 数値は隙間(u) / タプルは [刻印, 幅u, 高さu, id]
type Spec = string | number | readonly [string, number?, number?, string?]

export const build = (rows: Spec[][]): Key[] =>
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

export const chars = (s: string): Spec[] => [...s]
export const num = (s: string): Spec[] => [...s].map(c => [c, 1, 1, `n${c}`] as const)

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

export const mine = parseOrtho(myOrthoCsv)
export const defaultOrtho = parseOrtho(defaultOrthoCsv)
