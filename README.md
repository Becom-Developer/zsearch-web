# zsearch-web

郵便番号から住所を検索する web アプリ

## Setup

事前に`nvm`を使えるようにしておき指定バージョンの`node.js`を使えるように

git clone にてソースコードを配置後プロジェクト配下にて指定のモジュールをインストール

```zsh
npm install
```

## Work

ローカル開発時の起動方法など

web, api ともにローカル起動

```zsh
npm run dev-local
```

リクエスト

```zsh
open 'http://localhost:4010/'
```

公開環境へデプロイ

```zsh
npm run generate-prod
scp -r ~/github/zsearch-web/dist/ becom2022@becom2022.sakura.ne.jp:~/www/zsearch-web/
```

公開環境(stg)

```zsh
npm run generate-stg
scp -r ~/github/zsearch-web/dist/ becom2022@becom2022.sakura.ne.jp:~/www/zsearch-web/
```

### HTTP

```text
https://zsearch-web.becom.co.jp/
```

## Memo

### Environment

初動時の環境構築に関するメモ

```text
ローカル環境 node.js / nvm が使える前提
echo '16.14.0' >> .nvmrc
npm init nuxt-app zsearch-web
mv -n zsearch-web/* .
mv -n zsearch-web/.[^\.]* .
rm -r zsearch-web
npm run dev
```

公開環境

```sh
npm run generate-prod
# 初回のみ公開環境でディレクトを作成しておく
ssh becom2022@becom2022.sakura.ne.jp
mkdir ~/www/zsearch-web
# 公開環境へ `scp` コマンドで送信
scp -r ~/github/zsearch-web/dist/ becom2022@becom2022.sakura.ne.jp:~/www/zsearch-web/
```

公開環境(stg)

```sh
npm run generate-stg
# 初回のみ公開環境でディレクトを作成しておく
ssh becom2022@becom2022.sakura.ne.jp
mkdir ~/www/zsearch-stg-web
# 公開環境へ `scp` コマンドで送信
scp -r ~/github/zsearch-web/dist/ becom2022@becom2022.sakura.ne.jp:~/www/zsearch-stg-web/
```

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
