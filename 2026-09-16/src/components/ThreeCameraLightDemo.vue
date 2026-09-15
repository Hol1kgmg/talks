<script setup lang="ts">
import { animate, utils } from 'animejs'
import * as THREE from 'three'
import { onMounted, onUnmounted, useTemplateRef, watch } from 'vue'
import 'animejs/adapters/three'

// $clicks を markdown から受け取る。0=全部 / 1=camera / 2=light
const props = defineProps<{ step?: number }>()

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

let renderer: THREE.WebGLRenderer
let frame = 0
let resizeObserver: ResizeObserver
const animations: ReturnType<typeof animate>[] = []

onMounted(() => {
  const el = canvas.value!

  renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.set(0, 1, 3.6)
  camera.lookAt(0, -0.3, 0)

  // 非アクティブなスライドは display:none で描画サイズが 0 になるため、
  // onMounted 時点のサイズは当てにせず ResizeObserver で実サイズを待つ
  resizeObserver = new ResizeObserver(() => {
    const { width, height } = el.getBoundingClientRect()
    if (!width || !height)
      return
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  })
  resizeObserver.observe(el)

  // 奥行きのある床。fov の変化がパースの付き方として読める
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({ color: 0x33445A }),
  )
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -1.5
  floor.receiveShadow = true
  scene.add(floor)

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xDDDDDD }),
  )
  mesh.position.y = -0.4
  mesh.castShadow = true
  scene.add(mesh)

  scene.add(new THREE.AmbientLight(0xFFFFFF, 0.12))

  const light = new THREE.SpotLight(0xFFFFFF, 150, 0, Math.PI / 7, 0.4)
  light.position.set(0, 5, 2)
  light.castShadow = true
  scene.add(light)

  const opts = { duration: 1200, loop: true, alternate: true } as const

  animations.push(
    animate(camera, { fov: [50, 30], ...opts }),
    animate(light, { intensity: [30, 150], color: ['#0af', '#f0a'], ...opts }),
  )

  // 止めた側は utils.set() で初期値に戻す（set も adapter を通る）
  const resets = [
    () => utils.set(camera, { fov: 50 }),
    () => utils.set(light, { intensity: 150, color: '#0af' }),
  ]

  watch(() => props.step ?? 0, (step) => {
    animations.forEach((a, i) => {
      // step 0 は全部、以降はその1つだけ
      if (step === 0 || step === i + 1) {
        a.restart()
      }
      else {
        a.pause()
        resets[i]()
      }
    })
  }, { immediate: true })

  const tick = () => {
    frame = requestAnimationFrame(tick)
    renderer.render(scene, camera)
  }
  tick()
})

onUnmounted(() => {
  cancelAnimationFrame(frame)
  resizeObserver?.disconnect()
  animations.forEach(a => a.pause())
  renderer?.dispose()
})
</script>

<template>
  <canvas ref="canvas" class="w-full h-40" />
</template>
