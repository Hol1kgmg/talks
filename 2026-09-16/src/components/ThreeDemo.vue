<script setup lang="ts">
import { animate } from 'animejs'
import * as THREE from 'three'
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import 'animejs/adapters/three'

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

let renderer: THREE.WebGLRenderer
let frame = 0
let resizeObserver: ResizeObserver
let animation: ReturnType<typeof animate>

onMounted(() => {
  const el = canvas.value!

  renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.z = 5

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

  scene.add(new THREE.AmbientLight(0xFFFFFF, 1.5))
  const dir = new THREE.DirectionalLight(0xFFFFFF, 2)
  dir.position.set(2, 3, 4)
  scene.add(dir)

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    // opacity を動かすので transparent は自分で立てておく
    new THREE.MeshStandardMaterial({ color: 0x4080FF, transparent: true }),
  )
  scene.add(mesh)

  animation = animate(mesh, {
    x: [-3, 3], // [from, to]
    rotateY: 360,
    opacity: 0.3,
    duration: 1200,
    ease: 'inOutSine',
    loop: true,
    alternate: true,
  })

  const tick = () => {
    frame = requestAnimationFrame(tick)
    renderer.render(scene, camera)
  }
  tick()
})

onUnmounted(() => {
  cancelAnimationFrame(frame)
  resizeObserver?.disconnect()
  animation?.pause()
  renderer?.dispose()
})
</script>

<template>
  <canvas ref="canvas" class="w-full h-40" />
</template>
