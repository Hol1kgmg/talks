<script setup lang="ts">
import { animate, stagger } from 'animejs'
import * as THREE from 'three'
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import { mine } from './keyboard-layout'
import 'animejs/adapters/three'

// 0: 真上から(2D のキーボードと同じ見え方) / 1: 傾けてから基板・スイッチ・キーキャップの 3 層に分解(連続再生)
// 2: 基板を点滅させ「今回の話はここ」のラベル / 3: 残り 2 層にもラベルを出して奥に話が続くことを示す
const props = withDefaults(defineProps<{ step?: number, width?: string }>(), { step: 0, width: 'w-full' })

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

// 1u = 1 の座標系。各層の厚みと、分解時に浮かせる高さ(u)
const PCB_T = 0.1
const HOLE = 0.73
const SWITCH = { size: 0.6, h: 0.45 }
const CAP = { inset: 0.08, h: 0.35 }
const LIFT = { switch: 1.2, cap: 2.4 }
// カメラは原点を見下ろす球面上を動く。el: 真上からの傾き(rad) / az: 手前(+z)からの回り込み(rad、負で左側)
const DIST = 18
// 注視点を基板より少し上(分解後の層の中ほど)にして、浮いたキーキャップが画面上端で切れないようにする
const LOOK_Y = 1.0
const VIEW = { front: { el: 0, az: 0 }, oblique: { el: 1.2, az: 0 } }
const DURATION = 1000

let renderer: THREE.WebGLRenderer
let frame = 0
let resizeObserver: ResizeObserver

const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
// 上方向を -z(奥)にすると、真上から見た時に上段のキーが画面上側に来る
camera.up.set(0, 0, -1)
const view = { ...VIEW.front }
const placeCamera = () => {
  camera.position.set(
    DIST * Math.sin(view.el) * Math.sin(view.az),
    LOOK_Y + DIST * Math.cos(view.el),
    DIST * Math.sin(view.el) * Math.cos(view.az),
  )
  camera.lookAt(0, LOOK_Y, 0)
}

const box = (w: number, h: number, d: number, color: number) =>
  new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color }))

const scene = new THREE.Scene()
scene.add(new THREE.AmbientLight(0xFFFFFF, 1.2))
const dir = new THREE.DirectionalLight(0xFFFFFF, 2)
dir.position.set(4, 8, 6)
scene.add(dir)

const { cols, rows, keys } = mine
const pcb = box(cols, PCB_T, rows, 0x15803D) // green-700
scene.add(pcb)
const PCB_COLOR = pcb.material.color.clone()
const BLINK = new THREE.Color(0x86EFAC) // green-300
let blink: ReturnType<typeof animate> | undefined

const switches: THREE.Mesh[] = []
const caps: THREE.Mesh[] = []
for (const k of keys) {
  // 2D の (x, y) を 3D の (x, z) に写し、基板中央を原点にする
  const cx = k.x + k.w / 2 - cols / 2
  const cz = k.y + k.h / 2 - rows / 2

  const hole = box(HOLE, 0.01, HOLE, 0x052E16) // green-950
  hole.position.set(cx, PCB_T / 2, cz)
  scene.add(hole)

  const sw = box(SWITCH.size, SWITCH.h, SWITCH.size, 0x78350F) // amber-900
  sw.position.set(cx, PCB_T / 2 + SWITCH.h / 2, cz)
  scene.add(sw)
  switches.push(sw)

  const cap = box(k.w - CAP.inset, CAP.h, k.h - CAP.inset, 0xF3F4F6) // gray-100
  cap.position.set(cx, PCB_T / 2 + SWITCH.h + CAP.h / 2, cz)
  scene.add(cap)
  caps.push(cap)
}
const baseY = { switch: switches[0].position.y, cap: caps[0].position.y }

// 層ラベル: 各層の右端(x = cols/2)を毎フレーム画面座標に投影し、その右側に HTML で置く(矢印は文字)
// step: ラベルが出る最小 step。y は現在のメッシュ位置を参照するので分解アニメに追従する
const LABELS = [
  { text: '今回の話はここ(基板)', step: 2, y: () => pcb.position.y, class: 'text-green-700 font-bold' },
  { text: 'キースイッチ', step: 3, y: () => switches[0].position.y, class: 'text-gray-500' },
  { text: 'キーキャップ', step: 3, y: () => caps[0].position.y, class: 'text-gray-500' },
]
const LABEL_X = cols / 2 + 0.4
const labelPos = ref(LABELS.map(() => ({ left: '0%', top: '0%' })))
const v = new THREE.Vector3()
const projectLabels = () => {
  labelPos.value = LABELS.map((l) => {
    v.set(LABEL_X, l.y(), 0).project(camera)
    return { left: `${(v.x + 1) * 50}%`, top: `${(1 - v.y) * 50}%` }
  })
}

// step が変わるたびに「その step のあるべき姿」へ現在値からアニメーションする(戻る操作にも追従)
watch(() => props.step, (step) => {
  // 傾け → 分解 を 1 クリックで連続再生する。戻る時は 分解を戻す → 傾きを戻す の逆順
  const open = step >= 1
  const target = open ? VIEW.oblique : VIEW.front
  animate(view, { ...target, duration: DURATION, ease: 'inOutCubic', delay: open ? 0 : DURATION, onUpdate: placeCamera })

  const lift = open ? 1 : 0
  const common = { duration: DURATION, ease: 'inOutCubic', delay: stagger(12, { start: open ? DURATION : 0 }) }
  animate(switches, { y: baseY.switch + LIFT.switch * lift, ...common })
  animate(caps, { y: baseY.cap + LIFT.cap * lift, ...common })

  // 点滅: 基板色を明るい緑との間で往復させ続ける。step を外れたら止めて元の色に戻す
  blink?.cancel()
  blink = undefined
  if (step >= 2)
    blink = animate(pcb.material.color, { r: BLINK.r, g: BLINK.g, b: BLINK.b, duration: 400, ease: 'inOutSine', alternate: true, loop: true })
  else
    pcb.material.color.copy(PCB_COLOR)
}, { immediate: true })

onMounted(() => {
  const el = canvas.value!
  renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)

  // 非アクティブなスライドは display:none で描画サイズが 0 になるため、ResizeObserver で実サイズを待つ
  resizeObserver = new ResizeObserver(() => {
    const { width, height } = el.getBoundingClientRect()
    if (!width || !height)
      return
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  })
  resizeObserver.observe(el)

  const tick = () => {
    frame = requestAnimationFrame(tick)
    projectLabels()
    renderer.render(scene, camera)
  }
  tick()
})

onUnmounted(() => {
  cancelAnimationFrame(frame)
  blink?.cancel()
  resizeObserver?.disconnect()
  renderer?.dispose()
})
</script>

<template>
  <div class="relative mx-auto" :class="width">
    <canvas ref="canvas" class="w-full aspect-video" />
    <div
      v-for="(l, i) in LABELS"
      :key="l.text"
      class="absolute -translate-y-1/2 whitespace-nowrap text-xl transition-opacity duration-500"
      :class="[l.class, step >= l.step ? 'opacity-100' : 'opacity-0']"
      :style="labelPos[i]"
    >
      ← {{ l.text }}
    </div>
  </div>
</template>
