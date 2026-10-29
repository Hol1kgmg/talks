# 登壇ネタ（構想）の管理ルール

登壇スライドの構想・ネタは、このリポジトリの**GitHub Issue**で管理する。リポジトリ内のメモファイル（`docs/ideas.md`等）は作らない。移動中にスマホから積めることを優先しているため。

## 運用

- ネタ1件につきIssue1件。ラベル `talk-idea` を付け、**自分（`Hol1kgmg`）をassign**する
- 一覧・進捗の確認は `gh-dash`（`flake.nix` のdevShellに含まれる）。デフォルト設定が自分にassignされたIssue/PRを拾うため、assignを省略すると`gh-dash`に出てこない
- 登壇が決まったら `YYYY-MM-DD/` ディレクトリを作るコミット/PRで `Closes #<番号>` を書いて閉じる。ネタ→登壇→closeが1本のライフサイクルになる

```bash
gh issue create --label talk-idea --assignee @me   # ネタを積む
gh-dash                                            # 一覧
```

## Claude側の振る舞い

- 会話の中で「今度これを話したい」「こういうスライドを作りたい」といった構想が出てきて、まだIssueが無さそうな場合は、Issue化を提案する（勝手に作らない）
- 新しいトークのディレクトリを作る作業を頼まれたら、対応する `talk-idea` Issueがあるか `gh issue list --label talk-idea` で確認し、あればコミットメッセージに `Closes #<番号>` を含める
