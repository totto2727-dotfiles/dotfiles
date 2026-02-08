---
name: branch-split-and-pr
description: Splits current changes into multiple branches, commits per plan, pushes, and creates PRs. Outputs a markdown list of PR URLs. Use when splitting work into multiple branches for separate PRs, when following a branch-split plan, or when the user requests multi-branch PR workflow. References git-commit-granular for commit message rules.
---

# Branch Split and PR Workflow

複数ブランチに分割してコミット・PR提出するフロー。計画書は本スキル内の [plan-template.md](plan-template.md) を大元に厳守する。

## 参照スキル

- **コミットメッセージ・粒度**: [git-commit-granular](../git-commit-granular/SKILL.md) に従う
- **stash / unstage**: [git-operations-rules](../git-operations-rules/SKILL.md) に従う

## フェーズ1: 計画の作成・確認

1. 変更ファイルと依存関係を分析する
2. ルールを適用する:
   - 新規追加のテスト（または対象単位）はブランチを分ける
   - 既存修正は関連する新規のPRに含める（コミットは分ける）
3. 計画書に以下を記載する:
   - ファイル依存関係の表（グループ・種別: 新規/既存修正）
   - 作成するブランチ一覧（ブランチ名・新規/既存修正・依存関係）
   - 各ブランチの「準備」と「コミット」手順（ファイルパスとコミットメッセージ）
   - 除外ファイル一覧
   - エラー時は作業中断し指示を仰ぐ旨

計画書のひな形は本スキル内の [plan-template.md](plan-template.md) を参照し、プロジェクトの変更内容に合わせて編集する。

## フェーズ2: ブランチごとの実行（厳守）

各ブランチで次の順序を厳守する。**コンフリクト・エラー時は即中断し、状態を報告して指示を仰ぐ。**

### 共通ワークフロー（1ブランチあたり）

```bash
# 1. 全変更をステージ（未追跡を含めるため必須）
git add .

# 2. スタッシュ（どの作業用か分かるメッセージ）
git stash push -m "wip: <ブランチ名>用の変更"

# 3. ベースブランチへ移動 & 新規ブランチ作成
git switch -f <ベースブランチ>
git switch -c <ブランチ名>

# 4. スタッシュ復元
git stash apply stash@{0}

# 5. 全アンステージ
git unstage

# 6. 計画書の「コミット」に従い、該当ファイルのみ add して commit
git add <ファイル1> <ファイル2> ...
git commit -m "<コミットメッセージ>"
```

- `git checkout` は使わず `git switch` を使う
- stash メッセージは `wip: <ブランチ名>用の変更` のように作業単位が分かるようにする
- 復元は `git stash apply stash@{0}` で最新スタッシュを明示
- コミットは [git-commit-granular](../git-commit-granular/SKILL.md) の Conventional Commits と粒度に従う

### 注意

- 削除ファイルも `git add <削除されたファイルパス>` でステージする
- 計画書に「除外ファイル」がある場合はコミットに含めない

## フェーズ3: Push と PR 作成

各ブランチについて:

1. `git push -u origin <ブランチ名>`
2. `gh pr create --base develop --title "<タイトル>" --body "<本文>" --assignee @me`

PR 本文はリポジトリの PR テンプレートに合わせる。タイトルは変更内容から分かる簡潔な文言にする。

## フェーズ4: PR URL リストの提示

全 PR 作成後、ユーザーに次の形式のマークダウンで提示する（クリックでジャンプできるようにする）:

```markdown
## 作成したPR一覧

- [PR #<番号> - <ブランチ名>](<PRのURL>)
- [PR #<番号> - <ブランチ名>](<PRのURL>)
...
```

## エラー時

- コンフリクト・push 失敗・gh エラーなどが起きたら作業を止める
- 現在のブランチ・スタッシュの有無・エラーメッセージを報告する
- 自己判断で解決しない

## 計画書テンプレート

詳細なひな形・手順例は本スキル内の [plan-template.md](plan-template.md) を参照する。構成は以下。

- 概要・ルール（新規はブランチ分け、既存修正は関連PRに、エラー時は中断）
- ファイル依存関係表（グループ・対象ファイル・依存モック・種別）
- ブランチ一覧表（#・ブランチ名・新規/既存修正・依存関係）
- Git ワークフロー（共通ワークフローのコードブロック）
- 各ブランチの「準備」と「コミット」手順（コマンド例）
- 除外ファイル・エラー時の対応
