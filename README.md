# TongWen Dict

這是一個開放的簡體正體轉換辭庫，主要基於 [tongwen-core](https://github.com/tongwentang/tongwen-core) 的演算法所設計的辭庫。

## 貢獻請求

- 新增更多的轉換詞彙
- 維護轉換表，糾正錯誤、新增過度轉換修正等

## 貢獻說明

- 單字轉換表位於 `src/charater/*.json` 。
- 詞彙轉換表位於 `src/word/*.{s2t,t2s}.ts` 。
- 新增詞彙時：
  - 注意分類說明。
  - 進行全域搜尋，確保新增的詞彙沒有衝突或重複。
  - 注意是否有過度轉換的可能，若是危險的詞彙，請註明 [WARNING] 並新增相關修正 [PATCH] 。
  - 若無法確認，請先於[討論區](https://github.com/tongwentang/tongwen-dict/discussions)進行討論。
- 雙向轉換詞彙
  - 雙向轉換詞彙表示可適用簡體轉正體及正體轉簡體，譬如：芯片 <=> 晶片。
  - 雙向詞彙一律放在 `*.s2t.ts` （簡體轉正體）轉換表的 `shareable` 物件中。
- 新增轉換分類表
  - 請確保該分類具備較高獨立性、互斥性，若無法確認，請先到討論區發起討論。
  - 分類表檔案規範：
    - 檔名必須滿足 `type.{s2t,t2s}.ts` 。
    - 檔案必須有預設輸出（ `export default {...}` ）物件。
    - 雙向轉換表必須由 `s2t.ts` 檔案中匯出，並在對應分類的 `t2s.ts` 當中匯入且用 `createRevertDict` 產生反向物件。

## 圖示說明

- [DANGER] ：激進、高機率過度傳換，預設關閉，未來會思考如何輸出這類詞彙。
- [WARNING] ：危險、可能過度傳換，預設開啟但需要透過 [PATCH] 進行修正過度轉換
- [PATCH] ：作為修正 [WARNING] 的過度轉換

## 分類說明

為了便於管理，劃分了若干個分類表，但也會因此衍生一些問題。

- [PATCH] 修正過度轉換縱然與 [WARNING] 轉換詞彙分屬不同分類，仍應放在相同的轉換表中。

## Usage

There are several ways to get the dictionary JSON files:

### Self Building

Clone this repo, install dependencies, then run the `build` command, you will get the dictionaries in `./dist` folder.

```sh
# clone this repo
git clone git@github.com:tongwentang/tongwen-dict.git
# install dependencies with npm
npm install
# run the build command
npm run build
```

### Via Installation

We also publish the dictionaries to the NPM, so you can simply install the `tongwen-dict` package.

```sh
npm install tongwen-dict
```

If you using the dictionaries with TypeScript, here is an example:

```typescript
// ESModule
import s2tChar from 'tongwen-dict/dist/s2t-char.json';

// CommonJS
const s2tChar = require('tongwen-dict/s2t-char.json');
```

### Via Download

If you want to programmatically download the dictionary files, you can download them on unpkg:

```typescript
interface Manifest {
  name: string;
  version: string;
  dicts: {
    direction: string;
    type: string;
    min: boolean;
    filename: string;
    md5: string;
  }[];
}

// you can replace the `@1.0.0` to any version you like or simply `@latest` to get the latest version
const url = (filename: string) => `https://www.unpkg.com/tongwen-dict@1.0.0/dist/${filename}.json`;

// get every minified dictionaries
fetch(url('manifest'))
  .then<Manifest>(res => res.json())
  .then(manifest => Promise.all(manifest.dicts.filter(d => d.min).map(d => fetch(url(d.filename)))));
```

We also released the dictionaries on github, so you can manually download them on [release page](https://github.com/tongwentang/tongwen-dict/releases).
