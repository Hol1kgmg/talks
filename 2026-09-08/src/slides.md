---
layout: center
highlighter: shiki
css: unocss
colorSchema: light
transition: fade-out
mdc: true
lang: ja
title: herdrから考えるターミナルとターミナルマルチプレクサの位置付け
---

# herdrから考える<br>ターミナルとターミナルマルチプレクサの位置付け

2026.09.08

Hol1kgmg(ほりかわ)

---
layout: default
---

# 自己紹介

<SlideBody height="h-4/5">
  <template #left>
    <div class="flex flex-col gap-8 justify-start h-full mt-5">
      <h2 class="text-lg">Hol1kgmg(ほりかわ)</h2>
      <ul class="text-lg list-disc pl-5 flex flex-col gap-2">
        <li>WebアプリのFE・BEエンジニア</li>
        <li>キーボード、nixが好き</li>
        <li>Weztermユーザー</li>
        <div class="flex items-center mt-4 gap-2">
          <SharedImage src="images/shared/X_logo.svg" img-class="w-10 h-10" />
          <a href="https://x.com/Hol1kgmg" target="_blank" class="text-2xl">@Hol1kgmg</a>
        </div>
        <div class="flex items-center pl-1 mt-4 gap-2">
          <SharedImage src="images/shared/GitHub_Invertocat_Black.svg" img-class="w-8 h-8" />
          <a href="https://github.com/Hol1kgmg" target="_blank" class="text-2xl">Hol1kgmg</a>
        </div>
      </ul>
    </div>
  </template>
  <template #right>
    <div class="flex flex-col items-center justify-center h-full w-full">
      <CenterImage src="images/shared/Hol1kgmg_prof_img.webp" img-class="w-48 h-48 rounded-full object-cover ring-8 ring-blue-300 my-0" />
    </div>
  </template>
</SlideBody>

---
layout: default
---

# herdrは使ってますか？

- ターミナル上に「作業場所」を作ってくれるツール
- **AIエージェントとの相性がかなり良い**

<CenterImage src="/images/herdr-sample.webp" img-class="mt-5 h-80" />


---
layout: default
---

# 問題が起きた


- `$HERDR_ENV`がリセットされなくなった。
    - ずっとHERDR内にいる状態から変わらなくなる
- herdrを起動するたびに環境変数を手動で上書きする手間が発生

<CenterImage src="/images/herdr-use-faild.webp" img-class="my-5 h-60" />
<CornerComment>
使い辛くなり、治るまでherdr引退
</CornerComment>



---
layout: section
---

# 使用感だけ引き継ぎたかった

---
layout: default
---

# 理想のターミナル環境

- 1つのworkspaceに対して、1つのリポジトリを担当

<TerminalLayers class="mt-10" />

---
layout: section
---

# Weztermだけでもできそう


---
layout: default
---

# 結果 1



- 異なるwindow間でworkspaceが共有され、別々のworkspaceを個別に操作できない
    - workspaceを切り替える度にウィンドウが出たり消えたりする...

<CenterImage src="/gif/wezterm-native-use.gif" img-class="my-5 h-80" />

---
layout: default
---

# 結果 2


- 稼働するアプリのプロセス単位で繋がってしまうなら分離させてみた
    - 今度はアプリが複数表示されてしまう(アプリの切り替え操作に支障)

<CenterImage src="/images/wezterm-another-process.webp" img-class="my-3 h-85" />

---
layout: section
---

# Wezterm単体では難しそう

---
layout: default
---

# tmuxに落ち着いた

- herdrの登場前からずっとエンジニアに愛用されていたtmuxを初めて導入
- 使用感が維持されたから移行後の操作にすぐに慣れた

<CenterImage src="/images/tmux-use.webp" img-class="my-3 h-85" />
---
layout: default
---

# ターミナルマルチプレクサの位置付け

<div class="flex flex-col gap-6 mt-12">
  <div class="flex-1 rounded-xl border-2 border-blue-200 bg-white/80 p-6 shadow-sm">
    <div class="mb-2 text-m font-bold text-blue-400">結論</div>
    <div class="text-2xl">自分にとっての快適な作業環境を実現するためのツール</div>
  </div>
  <div class="flex-1 rounded-xl border-2 border-blue-200 bg-white/80 p-6 shadow-sm">
    <div class="mb-2 text-m font-bold text-blue-400">方針</div>
    <div class="text-2xl">使いにくいなと感じたら、とりあえず他のツールを試してみる</div>
  </div>
</div>

---
layout: section
---

# 意思決定を記録する

---
layout: default
---

# ADRとは

<div class="flex flex-col h-9/10">

<div>

Architecture Decision Record（意思決定記録）
Michael Nygardが2011年のブログ記事で提唱。

</div>

<div class="flex my-5">

- なぜその選択をしたか
- 何が問題だったか
- なぜ次へ移ったか

</div>

<div>
を記録に残す手法。

</div>

<CornerComment height="flex-1">
  <span class="text-sm opacity-70">
    出典: <a href="https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions" target="_blank">Documenting Architecture Decisions — cognitect.com</a>
  </span>
</CornerComment>

</div>

---
layout: default
---

# コンフィグ管理リポジトリにADRを導入

<div class="flex items-center justify-center gap-8 h-4/5">
  <img src="/images/dotfiles-logo.webp" class="w-80" />
  <div class="text-8xl font-bold text-blue-400">+</div>
  <div class="flex items-center justify-center w-40 h-40 rounded-2xl border-4 border-blue-300 bg-white/80 shadow-sm">
    <span class="text-5xl text-blue-500">ADR</span>
  </div>
</div>
---
layout: default
---

# AIとdotfilesを育てる

個人の開発環境は、時間が経つと分からなくなる。

- なぜこの設定にしたのか
- なぜこのツールを選び、なぜ別のツールを捨てたのか
- 過去に何を試したのか

**AIと一緒にdotfilesを管理・開発する際のコンテキスト**としてもADRを利用している。

---
layout: default
---

# まとめ

- 自分が欲しい作業場所を先に定義しておけば、ツールに問題があったときも、そのモデルを維持したまま別のツールへ移れる
- その「なぜ」をADRに残しておくと、将来の自分やAIに環境の意図を引き継げる
