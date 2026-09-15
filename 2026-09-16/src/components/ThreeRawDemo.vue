<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, onUnmounted, useTemplateRef } from 'vue'

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

let renderer: THREE.WebGLRenderer
let frame = 0
let resizeObserver: ResizeObserver

onMounted(() => {
  const el = canvas.value!

  renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.z = 5

  // 非アクティブなスライドは display:none で描画サイズが 0 になるため実サイズを待つ
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
    new THREE.MeshStandardMaterial({ color: 0x4080FF }),
  )
  scene.add(mesh)

  // anime.js を使わず、毎フレーム自分で値を更新する
  const tick = () => {
    frame = requestAnimationFrame(tick)
    mesh.rotation.y += 0.01
    renderer.render(scene, camera)
  }
  tick()
})

onUnmounted(() => {
  cancelAnimationFrame(frame)
  resizeObserver?.disconnect()
  renderer?.dispose()
})
</script>

<template>
  <canvas ref="canvas" class="h-40 w-full" />
</template>
