# 📋 React19

React19 の Hooks を使用した認証付き DnD タスク管理アプリです。
React19、Clerk+Hono、Prisam+Supabase の学習のために作成しました。

---

## 🚀 デモ

![タスク管理アプリスクリーンショット](client/public/images/readme/title.png)

デモページ: [タスク管理アプリを試す](https://react19-task-app-client.vercel.app/)
説明資料： [GoogleSlide を開く](https://docs.google.com/presentation/d/1qkqk8Rfvsz4jDaKrkNyvebYhixklNKejIz509w7UMcA/edit?usp=sharing)

---

## ✨ 主な機能

- 🔐 ユーザ認証（サインアップ・ログイン・ログアウト機能）
- ✅ タスクの追加・編集・削除
- 📅 タスクの期限設定
- 🏷️ タグ付け機能
- 🔍 タスクの検索・フィルタリング
- 📈 完了タスクの進捗率表示
- 💡 データベースに保存

---

## 🛠️ 使用技術

- フロントエンド: React19 ()
- スタイリング: Tailwind CSS
- 状態管理: useState, useReducer
- ビルドツール: Vite

---

## ⚡ インストール方法

1. **リポジトリをクローン**

   ```bash
   git clone https://github.com/ShotaHayashi0601/React19TaskApp.git
   cd React19TaskApp
   ```

2. **依存関係をインストール**

   ```bash
   npm install
   ```

3. **環境変数の設定**
   client と server ディレクトリに `.env` ファイルを作成し、以下のように記述してください:

   - client/.env

   ```ini
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxx
   VITE_API_BASE_URL=backend_api_url/api
   ```

   - server/.env

   ```ini
   DATABASE_URL = supabase_db_url
   SIGNING_SECRET=clerk_sigining_secret
   CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
   CLERK_SECRET_KEY=sk_test_xxxx
   PORT=port_no
   ```

   ⚡ **注意:** `.env` ファイルは**絶対に Git にコミットしないでください**。`gitignore`に以下を追加して保護します。

4. **ローカルサーバーを起動**
   ```bash
   npm run dev
   ```

ブラウザで `http://localhost:5173` にアクセスして確認できます。

---

## 🎮 使用方法

- [タスクを追加] ボタンをクリックして新しいタスクを作成。
- タスクをクリックして編集。
- タスクをドラッグアンドドロップしてタスクを完了状態に変更。
- 検索バーでタスクを検索。

---

## 👨‍💻 作者

- **Shota Hayashi**
- 💼 [GitHub](https://github.com/yourusername)
- 📩 syota.hayashi@morimatsu.jp

---

✨ **このタスク管理アプリがあなたの生産性向上に役立つことを願っています！**
