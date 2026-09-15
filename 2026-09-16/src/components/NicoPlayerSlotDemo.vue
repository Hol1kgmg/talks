<script setup lang="ts">
import { createTimeline, utils } from 'animejs'
import confetti from 'canvas-confetti'
import * as THREE from 'three'
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { REEL } from './slotIcons'
import 'animejs/adapters/three'

const FIRST_STOP = 5200 // 左リールが止まる時刻
const HOLD = 2000 // 前のリールが止まってから次が減速し始めるまで
const DECEL = 1500 // 減速にかける時間
const OMEGA = -360 / 700 // 等速で回っている間の角速度 (deg/ms)。符号が回転方向
const DECEL_DEG = (OMEGA * DECEL) / 5 // outQuint の入りが等速とつながる程度の角度

const stopAt = (k: number) => FIRST_STOP + k * (HOLD + DECEL)
const decelAt = (k: number) => stopAt(k) - DECEL
const REELS = 3
const FACES = REEL.length // 6面のドラム
const CELL = 256

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
const confettiCanvas = useTemplateRef<HTMLCanvasElement>('confettiCanvas')
const stage = useTemplateRef<HTMLElement>('stage')
const comments = useTemplateRef<HTMLElement[]>('comments')

const progress = ref(0)
const playing = ref(false)

let renderer: THREE.WebGLRenderer
let frame = 0
let resizeObserver: ResizeObserver
let tl: ReturnType<typeof createTimeline> | undefined
let fire: (() => void) | undefined
let fired = false

// 最後のリールが止まる瞬間 = 当たりの瞬間
const winAt = stopAt(REELS - 1)

// [流し始める時刻(ms), 本文]。開始直後と当たり直後は短い間隔で固めて弾幕っぽくする
const COMMENTS: [number, string][] = [
  [0, 'いきなりスロットw'],
  [180, 'なにこれwww'],
  [420, '回ってる回ってる'],
  [700, 'スロット回り始めたw'],
  [1000, 'スライドで回すなw'],
  [2600, 'animate() に Group 渡してるだけ'],
  [4200, 'まだ回ってるw'],
  [stopAt(0) + 200, '左…anime.js'],
  [stopAt(1) + 200, '揃いそう'],
  [winAt, '8888888888'],
  [winAt + 200, '88888888'],
  [winAt + 420, 'そろったwwww'],
  [winAt + 650, '888888888888'],
  [winAt + 900, '揃った'],
  [winAt + 1200, '8888888'],
]
const LANES = 7 // 縦の段数
const laneOf = (i: number) => (i * 3) % LANES // 3と7が互いに素なので7本ごとに全段を一巡する = 隣の段に並ばない

const toggle = () => {
  if (!tl)
    return
  if (playing.value) {
    tl.pause()
    playing.value = false
  }
  else {
    if (tl.progress >= 1)
      tl.progress = 0
    tl.play()
    playing.value = true
  }
}

const scrub = (e: Event) => {
  if (!tl)
    return
  tl.pause()
  tl.progress = Number((e.target as HTMLInputElement).value)
}

const release = () => {
  if (playing.value)
    tl?.play()
}

// アイコンを白パネルに contain で描いた CanvasTexture
const faceTexture = (src: string) => {
  const c = document.createElement('canvas')
  c.width = c.height = CELL
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, CELL, CELL)
  const tex = new THREE.CanvasTexture(c)
  const img = new Image()
  img.onload = () => {
    const pad = CELL * 0.18
    const box = CELL - pad * 2
    const scale = Math.min(box / img.width, box / img.height)
    const w = img.width * scale
    const h = img.height * scale
    ctx.drawImage(img, (CELL - w) / 2, (CELL - h) / 2, w, h)
    tex.needsUpdate = true
  }
  img.src = src
  return tex
}

onMounted(() => {
  const el = canvas.value!

  renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.z = 4.0 // リールが画面いっぱいに見えるところまで寄せる

  const size = 1.5
  const radius = size / (2 * Math.tan(Math.PI / FACES)) // 正6角柱の apothem
  const geometry = new THREE.PlaneGeometry(size, size)
  const textures = REEL.map(faceTexture)

  // 1リール = 6面を X 軸まわりに並べた Group。Group ごと rotateX で回す
  const groups = Array.from({ length: REELS }, (_, k) => {
    const group = new THREE.Group()
    textures.forEach((map, i) => {
      const a = Math.PI / 2 + (i * 2 * Math.PI) / FACES
      const face = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map }))
      face.position.set(0, radius * Math.cos(a), radius * Math.sin(a))
      face.rotation.x = a - Math.PI / 2
      group.add(face)
    })
    group.position.x = (k - 1) * (size + 0.35)
    scene.add(group)
    return group
  })

  // コメントの開始位置はステージ幅に依存するので、実サイズが付いてから組み立てる
  const build = (stageWidth: number) => {
    tl = createTimeline({
      autoplay: false,
      onUpdate: (self) => {
        progress.value = self.progress
        if (self.currentTime >= winAt) {
          if (!fired) {
            fired = true
            fire?.()
          }
        }
        else {
          fired = false // シークで戻したら再び鳴らせる
        }
      },
      onComplete: () => (playing.value = false),
    })

    comments.value!.forEach((commentEl, i) => {
      const at = COMMENTS[i][0]
      utils.set(commentEl, { x: stageWidth, opacity: 1 })
      // 同じ位置指定 (at) に DOM と 3D を並べる = 拍が揃う
      tl!.add(commentEl, {
        x: [stageWidth, -commentEl.offsetWidth],
        duration: 4200,
        ease: 'linear',
      }, at)
    })

    // 3本とも 0 から等速で回り続け、減速フェーズに入る時刻だけをずらす。
    // 角度は度のまま書ける (adapter がラジアンに変換)
    groups.forEach((group, k) => {
      const start = DECEL_DEG + OMEGA * decelAt(k)
      utils.set(group, { rotateX: start })
      // 等速フェーズ: 減速開始時刻まで一定速度で回す
      tl!.add(group, {
        rotateX: [start, DECEL_DEG],
        duration: decelAt(k),
        ease: 'linear',
      }, 0)
      // 減速フェーズ: 0 (= 360 の倍数) で 1面目 (anime.js) が正面。逆回転しない ease
      tl!.add(group, {
        rotateX: [DECEL_DEG, 0],
        duration: DECEL,
        ease: 'outQuint',
      }, decelAt(k))
    })
  }

  resizeObserver = new ResizeObserver(() => {
    const { width, height } = el.getBoundingClientRect()
    if (!width || !height)
      return
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    if (!tl) {
      fire = () => {
        confetti.create(confettiCanvas.value!, { resize: true })({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.65 },
        })
      }
      build(stage.value!.getBoundingClientRect().width)
    }
  })
  resizeObserver.observe(el)

  const tick = () => {
    frame = requestAnimationFrame(tick)
    renderer.render(scene, camera)
  }
  tick()
})

onUnmounted(() => {
  cancelAnimationFrame(frame)
  resizeObserver?.disconnect()
  tl?.pause()
  renderer?.dispose()
})
</script>

<template>
  <div>
    <div ref="stage" class="relative overflow-hidden rounded bg-black/80">
      <canvas ref="canvas" class="block w-full h-72" />
      <canvas ref="confettiCanvas" class="pointer-events-none absolute inset-0 w-full h-full" />
      <div class="pointer-events-none absolute inset-0">
        <div
          v-for="([, text], i) in COMMENTS"
          ref="comments"
          :key="i"
          class="absolute whitespace-nowrap text-lg font-bold text-red-300 opacity-0"
          :style="{ top: `${4 + laneOf(i) * 13}%` }"
        >
          {{ text }}
        </div>
      </div>
    </div>

    <div class="mt-2 flex items-center gap-3">
      <button class="w-8 text-xl" @click="toggle">
        {{ playing ? '⏸' : '▶' }}
      </button>
      <input
        class="flex-1"
        type="range" min="0" max="1" step="0.001"
        :value="progress"
        @input="scrub"
        @change="release"
      >
    </div>
  </div>
</template>
