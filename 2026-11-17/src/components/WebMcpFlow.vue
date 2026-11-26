<script setup lang="ts">
// step: スライドのクリック数。コードの行ハイライト {0|*|3|6} と同じ順で進める
// 0（なし）: チップは薄い / 1（全体）: 登録されてチップが濃くなる / 2（name）: add_to_cart の文字が赤くなる / 3（execute）: チップに太枠 → カートに 1 のバッジが付く → 通知が出る
// signal は実行とは無関係にツールを使える期間だけを決めるので、解除の場面は図に入れない
// 1クリックの中の順番は delay でずらす。delay は光らせるときだけ付け、戻るときは即座に戻す
const props = defineProps<{ step: number }>()

// ツールのチップ。0 では薄く、1 で登録されて濃くなる。太枠（ring）はエージェントに呼ばれて実行される 3 だけ
// font-bold は文字幅が一瞬で変わってチップの位置がずれる（カクつく）ので使わず、ring だけで強調する
const chip = () => {
  if (props.step === 0)
    return 'opacity-30 ring-transparent'
  return props.step === 3 ? 'ring-sky-500' : 'ring-transparent'
}

// チップの中の add_to_cart の文字。2（name の行）でだけ赤くする
const name = () => props.step === 2 ? 'text-red-500' : ''
</script>

<template>
  <!-- 右半分（約 434px）に余白を残して収まる幅。広げるとコードの枠に接する -->
  <div class="w-96 flex flex-col items-center gap-6">
    <!-- ブラウザ: 左が画面（ユーザーに見える）、右が DevTools（登録済みのツールが見える） -->
    <div class="w-full overflow-hidden rounded-xl border-2 border-gray-500 bg-white shadow">
      <div class="flex items-center gap-2 bg-gray-100 px-3 py-1 text-xs">
        <span class="text-red-400">●</span><span class="-ml-1 text-yellow-400">●</span><span class="-ml-1 text-green-400">●</span>
        <code class="flex-1 rounded bg-white px-2">/home</code>
      </div>
      <div class="flex">
        <!-- EC サイトの画面。3（execute）で add_to_cart が実行され、カートに 1 のバッジが付き、通知が出る -->
        <div class="relative flex flex-1 flex-col justify-center gap-2 px-3 py-10">
          <div class="absolute right-3 top-2 text-xl">
            <ph-shopping-cart />
            <!-- バッジは実行（3）で初めて付く。leading-none は親の text-xl の行の高さを受け継いで数字が下にずれるのを防ぐ -->
            <span v-if="step === 3" class="pop absolute -right-2 -top-1 h-4 min-w-4 flex items-center justify-center rounded-full bg-red-500 px-1 text-[10px] leading-none text-white">1</span>
          </div>
          <div class="flex items-center gap-2">
            <ph-sneaker class="text-3xl" />
            <div>
              <div class="whitespace-nowrap font-bold">
                スニーカー
              </div>
              <div class="text-xs opacity-60">
                ¥8,800
              </div>
            </div>
          </div>
          <div class="flex items-center gap-1 text-xs text-green-600 transition duration-500" :class="step === 3 ? 'delay-600' : 'translate-y-1 opacity-0'">
            <ph-check-circle-bold />カートに追加しました
          </div>
        </div>
        <!-- Chrome の DevTools の Application タブにある WebMCP の欄。中身は登録済みのツールだけに絞る -->
        <div class="w-40 flex flex-col border-l-2 border-gray-300 bg-gray-50">
          <div class="border-b border-gray-300 bg-gray-100 px-2 py-0.5 text-xs opacity-70">
            DevTools › Application › WebMCP
          </div>
          <div class="flex flex-1 items-center justify-center p-2 text-xs">
            <span class="flex items-center gap-1 rounded-full border border-sky-500 bg-white px-2 ring-2 transition duration-500" :class="chip()">
              <ph-wrench /><span class="transition-colors duration-300" :class="name()">add_to_cart</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- エージェントは箱にせず、ブラウザの右下の角に立たせる。DevTools の真下に置くと DevTools からツールを読んでいるように見えるため、ウィンドウ全体の角に寄せる -->
    <div class="-mt-4 flex flex-col items-center self-end">
      <ph-robot-duotone class="text-4xl" />
      <div class="text-xs font-bold">
        エージェント
      </div>
    </div>
  </div>
</template>

<style scoped>
/* カートのバッジが 0.4秒後に、大きめに現れてから元の大きさに戻る */
@keyframes pop {
  0% {
    transform: scale(0);
  }
  60% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.pop {
  animation: pop 0.4s ease-out 0.4s both;
}
</style>
