<script setup lang="ts">
// active: APM のマークを表示する / nix: settings.json 以下を Nix で管理可能な範囲として枠で囲む / nixLabel: 枠にラベルを重ねる
defineProps<{ active: boolean, nix?: boolean, nixLabel?: boolean }>()

const rows = [
  { tree: '.claude/', mark: '' },
  { tree: '├── skills/<name>/       ', mark: '✅ skills（同梱のスクリプトや references も丸ごと）' },
  { tree: '├── rules/<name>.md      ', mark: '✅ instructions' },
  { tree: '├── commands/<name>.md   ', mark: '✅ prompts' },
  { tree: '├── agents/<name>.md     ', mark: '✅ agents' },
  { tree: '├── settings.json', mark: '' },
  { tree: '│   ├── hooks            ', mark: '△  APM が書いたエントリだけマージ' },
  { tree: '│   └── permissions / statusLine / env   ', mark: '❌' },
  { tree: '├── settings.local.json  ', mark: '❌' },
  { tree: '└── statusline.sh        ', mark: '❌ 任意のファイルは置けない' },
]
const NIX_FROM = 5 // settings.json の行
</script>

<template>
  <div class="slidev-code w-fit whitespace-pre" style="background-color: #1f2430; color: #cccac2; padding-left: 1.25rem !important">
    <template v-for="(group, g) in [rows.slice(0, NIX_FROM), rows.slice(NIX_FROM)]" :key="g">
      <!-- ring は box-shadow なので表示しても行の位置がずれない -->
      <div class="relative -ml-1 w-fit rounded pl-1 pr-6 ring-sky-300 transition-shadow duration-500" :class="g === 1 && nix ? 'ring-2' : 'ring-0'">
        <!-- ラベルは背景色で枠を隠すので、非表示中は opacity-0 で枠を欠けさせない -->
        <span v-if="g === 1" class="absolute -top-3 right-2 px-2 text-sky-300 transition-opacity duration-500" style="background-color: #1f2430" :class="nixLabel ? 'opacity-100' : 'opacity-0'">❄️ Nix で管理可能</span>
        <!-- テンプレート上の改行が空白にならないよう tree は開始タグと同じ行に書く -->
        <div v-for="(row, i) in group" :key="i">
          {{ row.tree }}<span class="transition-opacity duration-300" :class="active ? 'opacity-100' : 'opacity-0'" :style="{ transitionDelay: `${(g * NIX_FROM + i) * 100}ms` }">{{ row.mark }}</span>
        </div>
      </div>
    </template>
  </div>
</template>
