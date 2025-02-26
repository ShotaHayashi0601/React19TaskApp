# 📋 タスク管理アプリ

React で作成したシンプルかつ効率的なタスク管理アプリです。日々のタスクを簡単に追加、編集、削除、完了状態に変更でき、タスクの進捗を視覚的に管理できます。**ユーザ認証機能**を追加し、各ユーザごとにタスクを安全に管理できます。

---

## 🚀 デモ

![タスク管理アプリスクリーンショット](./screenshot.png)

デモページ: [タスク管理アプリを試す](https://your-demo-link.com)

---

## ✨ 主な機能

- ✅ タスクの追加・編集・削除
- 📅 タスクの期限設定
- 🏷️ タグ付け機能
- 🔍 タスクの検索・フィルタリング
- 📈 完了タスクの進捗率表示
- 💡 ローカルストレージにデータ保存
- 🔐 ユーザ認証（サインアップ・ログイン・ログアウト機能）

---

## 🛠️ 使用技術

- フロントエンド: React (Hooks, Context API)
- スタイリング: Tailwind CSS
- 状態管理: useState, useReducer
- 認証: Firebase Authentication
- ビルドツール: Vite

---

## ⚡ インストール方法

1. **リポジトリをクローン**

   ```bash
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager
   ```

2. **依存関係をインストール**

   ```bash
   npm install
   ```

3. **Firebase の設定**

   - Firebase プロジェクトを作成し、Firebase Authentication を有効化。
   - `.env` ファイルを作成し、Firebase 構成を追加:
     ```bash
     VITE_API_KEY=your_api_key
     VITE_AUTH_DOMAIN=your_project.firebaseapp.com
     VITE_PROJECT_ID=your_project_id
     ```

4. **ローカルサーバーを起動**
   ```bash
   npm run dev
   ```

ブラウザで `http://localhost:5173` にアクセスして確認できます。

---

## 🎮 使用方法

- **サインアップ/ログイン**: 初回アクセス時にアカウントを作成またはログイン。
- **タスク管理**: ログイン後、タスクを追加、編集、削除、完了状態に変更。
- **ログアウト**: ユーザメニューからログアウト可能。
- **タスクの検索・フィルタリング**: 検索バーでタスクを絞り込み。

---

## 📂 フォルダ構成

```
├── public
│   └── index.html
├── src
│   ├── components  # Reactコンポーネント
│   ├── context     # Context API用ファイル
│   ├── hooks       # カスタムフック
│   ├── firebase    # Firebase設定ファイル
│   ├── styles      # スタイルファイル
│   ├── App.jsx     # メインアプリケーションファイル
│   └── main.jsx    # エントリーポイント
├── .env            # Firebase構成ファイル
├── package.json
└── README.md
```

---

## 🤝 コントリビューション

1. Fork してください。
2. 新しいブランチを作成 (`git checkout -b feature/新機能名`)。
3. 変更をコミット (`git commit -m 'Add 新機能'`)。
4. ブランチにプッシュ (`git push origin feature/新機能名`)。
5. プルリクエストを作成。

---

## 📜 ライセンス

[MIT](https://opensource.org/licenses/MIT)

---

## 👨‍💻 作者

- **Shota Hayashi**
- 💼 [GitHub](https://github.com/yourusername)
- 📩 syota.hayashi@morimatsu.jp

---

✨ **このタスク管理アプリがあなたの生産性向上に役立つことを願っています！** 🔐
