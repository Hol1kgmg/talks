# talks

個人の登壇資料・スライド管理リポジトリ。[Slidev](https://sli.dev) を使用。

詳しい使い方（セットアップ・ビルド・新しいトークの追加方法）は [HOWTO.md](./HOWTO.md) を参照。

## 登壇一覧

###### 2026

- `ja` [このPJ（キーボード）の技術選定についてレビューしてください](https://talks.hol1kgmg.com/2026/keyboard-tech-stack-review/) - 新卒N年目の勉強会&交流会！#6 ([ソース](./2026-10-10))
- `ja` [anime.js v4.5.0 の adapter で three.js を動かす](https://talks.hol1kgmg.com/2026/animejs-v4/) - Web UI 実装勉強会 ([ソース](./2026-09-16))
- `ja` [herdrから考えるターミナルとターミナルマルチプレクサの位置付け](https://talks.hol1kgmg.com/2026/herdr-terminal-multiplexer/) - みんなの「もう戻れない」ターミナル環境LT会〜開発効率化の工夫を大公開〜 ([ソース](./2026-09-08))
- `ja` [このリポジトリについて](https://talks.hol1kgmg.com/2026/talks-repo-intro/) - リポジトリ紹介 ([ソース](./2026-08-10))
- `ja` [dotfilesの世界から覗くランチャーアプリ](https://talks.hol1kgmg.com/2026/dotfile-launcher-lt/) - 新卒N年目の勉強会&交流会 ([ソース](./2026-08-06))

## テンプレート同期

生成直後は `init-from-template` スキルで README / AGENTS.md のプレースホルダを埋めてください。同期対象のファイルは削除しないこと（[adr/from-template/0001](adr/from-template/0001-sync-template-via-merge-commit.md)）。

テンプレート元が更新されると、`template-sync` workflow が毎週土曜 09:00 に draft PR（`template-sync` ブランチ）を用意します。手元で `just sync-pr` を実行すると、PR が取り込みの差分に置き換わり ready for review になります。

```bash
just sync-pr   # テンプレート元の変更を取り込む PR を作る
just sync      # テンプレート元の変更を現在のブランチに取り込む
just update    # flake.lock を更新して検証する
```

- PR は **Create a merge commit** でマージしてください（squash / rebase は共通祖先を壊します）
- テンプレート元に open の Dependabot PR が残っていると、`just sync` / `just sync-pr` は止まります。処理が終わってから実行するか、`SYNC_IGNORE_OPEN_PRS=1` を付けて実行してください
- `flake.lock` の衝突は、テンプレートの input をテンプレート側、`flake = false` の project inputs を派生先側の値で解消します。それ以外の衝突では止まるので、手で解消してください
- テンプレートの input や workflow だけを更新する Dependabot PR は、取り込み PR と重複するため `template-dependabot-close` workflow が閉じます
- draft PR の作成には、リポジトリ設定の **Allow GitHub Actions to create and approve pull requests** が必要です（`init-from-template` スキルが有効にします）

設計: [adr/from-template/0006](adr/from-template/0006-automate-template-sync-pr.md)

- 設計判断の記録: [adr/](adr/)
