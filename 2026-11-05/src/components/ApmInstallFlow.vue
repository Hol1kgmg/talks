<script setup lang="ts">
defineProps<{ active: number }>()

// 座標は 860x380 のコンテナ基準（ボックスの absolute 配置と共通）
// delay: そのクリック内で矢印が伸び始めるまでの秒数。伸びきるのは delay + DRAW 秒後
const DRAW = 0.6
const arrows = [
  { step: 1, delay: 0, d: 'M110 56 V120' },
  { step: 2, delay: 0, d: 'M200 150 H630' },
  { step: 2, delay: 1, d: 'M750 180 V230 H550' },
  { step: 3, delay: 0, d: 'M430 260 V300' },
  { step: 4, delay: 0, d: 'M310 230 H110 V300' },
]

// 現在のクリックで出る要素だけ遅延させる（戻る操作では即座に消す）
const later = (active: number, step: number, s: number) => ({ transitionDelay: active === step ? `${s}s` : '0s' })
</script>

<template>
  <div class="h-9/10 flex items-center justify-center">
    <div class="relative h-[380px] w-[860px] font-mono text-sm">
      <!-- 最後のクリックで lock 以外を暗くする -->
      <div class="absolute inset-0 transition-opacity duration-700" :class="active > 4 ? 'opacity-20' : ''">
        <!-- ローカルのリポジトリ -->
        <div class="absolute left-0 top-[90px] h-[290px] w-[560px] rounded-xl border-2 border-dashed border-gray-400">
          <span class="absolute -top-3 left-4 bg-white px-2 text-gray-500">my-project/</span>
        </div>

        <div class="absolute left-0 top-0 w-[220px] rounded-lg bg-gray-900 px-4 py-3 text-base text-gray-100 shadow-lg">
          <span class="text-green-400">$ </span><span class="typed">apm install</span><span v-if="active === 0" class="cursor">▌</span>
        </div>

        <div class="box left-[20px] top-[125px] w-[180px]" :class="active === 1 ? 'current' : active > 1 ? '' : 'opacity-40'" :style="later(active, 1, DRAW)">
          📄 apm.yml
          <div class="sub">
            依存の宣言
          </div>
        </div>

        <div class="box left-[630px] top-[110px] w-[230px]" :class="active === 2 ? 'current' : active > 2 ? '' : 'opacity-0'" :style="later(active, 2, DRAW)">
          🌐 GitHub: owner/repo
          <div class="sub">
            skills/&lt;name&gt;/SKILL.md
          </div>
        </div>

        <div class="box left-[310px] top-[200px] w-[240px]" :class="active === 2 ? 'current' : active > 2 ? '' : 'opacity-0 scale-50'" :style="later(active, 2, 1 + DRAW)">
          📁 apm_modules/
          <div class="sub">
            取得物から生成（gitignore）
          </div>
        </div>

        <div class="box left-[310px] top-[300px] w-[240px]" :class="active === 3 ? 'current' : active > 3 ? '' : 'opacity-0 scale-50'" :style="later(active, 3, DRAW)">
          📁 .agents/skills/&lt;name&gt;/
          <div class="sub">
            エージェントが読む場所
          </div>
        </div>

        <svg class="pointer-events-none absolute inset-0" width="860" height="380" viewBox="0 0 860 380">
          <defs>
            <marker id="apm-head" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" fill="#0ea5e9" />
            </marker>
          </defs>
          <g v-for="(a, i) in arrows" :key="i">
            <!-- 線を伸ばす: dashoffset 100 → 0 -->
            <path
              :d="a.d" pathLength="100" class="shaft" fill="none" stroke="#0ea5e9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"
              :style="{ strokeDashoffset: active >= a.step ? 0 : 100, opacity: active >= a.step ? 1 : 0, ...later(active, a.step, a.delay) }"
            />
            <!-- 矢じりは線が伸びきってから出す -->
            <path
              :d="a.d" fill="none" stroke="none" marker-end="url(#apm-head)" class="transition-opacity duration-200"
              :class="active >= a.step ? 'opacity-100' : 'opacity-0'" :style="later(active, a.step, a.delay + DRAW)"
            />
            <!-- 矢印の中を流れる光 -->
            <path
              v-if="active === a.step" :d="a.d" pathLength="100" class="light" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
              :style="{ animationDelay: `${a.delay + DRAW}s` }"
            />
          </g>
        </svg>

        <span class="label left-[124px] top-[78px]" :class="active >= 1 ? 'opacity-100' : 'opacity-0'">① 読む</span>
        <span class="label left-[380px] top-[124px]" :class="active >= 2 ? 'opacity-100' : 'opacity-0'">② ref を解決</span>
        <span class="label left-[620px] top-[238px]" :class="active >= 2 ? 'opacity-100' : 'opacity-0'" :style="later(active, 2, 1)">② 取得</span>
        <span class="label left-[450px] top-[270px]" :class="active >= 3 ? 'opacity-100' : 'opacity-0'">③ 連携</span>
        <span class="label left-[140px] top-[236px]" :class="active >= 4 ? 'opacity-100' : 'opacity-0'">④ 記録</span>
      </div>

      <div class="box left-[20px] top-[300px] w-[180px]" :class="active === 4 ? 'current' : active > 4 ? 'focus' : 'opacity-0 scale-50'" :style="later(active, 4, DRAW)">
        🔒 apm.lock.yaml
        <div class="sub">
          commit SHA + sha256
        </div>
      </div>

      <div class="absolute bottom-0 right-0 font-sans text-2xl font-bold transition-all duration-700" :class="active > 4 ? 'opacity-100' : 'opacity-0 translate-y-4'" :style="later(active, 5, 0.5)">
        ここを <span class="text-red-500">Dependabot</span> が<br>更新できるようになった
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  position: absolute;
  border: 1px solid #d1d5db;
  border-radius: 0.6rem;
  background: #fff;
  padding: 0.5rem 0.8rem;
  font-weight: bold;
  white-space: nowrap;
  box-shadow: 0 4px 10px rgb(0 0 0 / 0.08);
  transition: all 0.6s;
}
.box.current {
  border-color: #0ea5e9;
  box-shadow:
    0 0 0 3px #bae6fd,
    0 10px 20px rgb(0 0 0 / 0.12);
}
.box.focus {
  border-color: #ef4444;
  box-shadow:
    0 0 0 4px #ef4444,
    0 10px 24px rgb(0 0 0 / 0.2);
  transform: scale(1.15);
}
.sub {
  margin-top: 0.2rem;
  font-size: 0.7rem;
  font-weight: normal;
  color: #6b7280;
}
.label {
  position: absolute;
  font-family: sans-serif;
  font-size: 0.8rem;
  font-weight: bold;
  color: #0369a1;
  transition: opacity 0.5s;
}

.shaft {
  stroke-dasharray: 100;
  transition: stroke-dashoffset 0.6s ease-out; /* DRAW と揃える */
}
.light {
  stroke-dasharray: 10 100;
  filter: drop-shadow(0 0 3px #7dd3fc) drop-shadow(0 0 6px #fff);
  animation: flow 1.2s linear infinite both;
}
@keyframes flow {
  /* 端で round cap の点が残らないよう、線の外側から外側まで流す */
  from {
    stroke-dashoffset: 13;
  }
  to {
    stroke-dashoffset: -103;
  }
}

.typed {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: bottom;
  animation: type 0.8s 0.3s steps(11) both;
}
@keyframes type {
  from {
    width: 0;
  }
  to {
    width: 11ch;
  }
}
.cursor {
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
