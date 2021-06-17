# 使用 Next.js 開發網站

我個人的 [Next.js](https://nextjs.org/) 學習與練習紀錄。

**參考資料：**

- [Next.js Crash Course 2021](https://www.youtube.com/watch?v=mTz0GXj8NN0)
- [Next.js Setup With Redux and Scss](https://www.youtube.com/watch?v=UXMGGI3TSs4)
## 安裝 Nuxt

在終端機輸入

```bash
npx create-next-app 專案資料夾名稱 --use-npm
```

若要讓 Nuxt 輸出靜態網頁，則要在 `package.json` 設定修改 build 指令

```json
"scripts": {
  "build": "next build && next export"
}
```

### 安裝 SASS

在 Next 使用 sass 很簡單，只要安裝 `sass` 就可以了。

```bash
npm install sass
```

## NPM 指令

- `npm run dev`（本機端開啟 Next 專案）
- `npm run build`（輸出 Next 專案）
- `npm run start`

## 資料夾結構

### 階層結構

Next 頁面的 HTML 架構由上而下依序是這樣引入。

1. Document（`pages/_document.js`）
2. Layout（`components/Layout.js`）
3. App（`pages/_app.js`）
4. Page Component（`pages/*.js`）
5. Normal Component（`components/*.js`）

## CSS & SCSS

使用 CSS Module 並搭配 SASS/SCSS 來開發。

## 圖片

### Image Component

Next 有提供一個 Image Component 來幫我們處理圖片的問題，如果專案是產出靜態網站的話則無法使用這個的功能，只能自己寫 `<img>` 標籤。

```jsx
import Image from 'next/image'
```

[參考資料](https://nextjs.org/docs/basic-features/image-optimization#loader)

### 圖片路徑問題

一般來說在網站呈現圖片有兩種方式，一種是直接添加 `<img>` 標籤，另一種是使用 CSS Background 的方式來添加。

#### Image Tag

`<img>` 標籤的 src 路徑是直接依照 public 資料夾為主的相對路徑來做添加。

#### CSS Background

CSS 則是直接依照 `module.scss` 所在位置的相對路徑來做添加，不需要考慮他所 import 的位置。

## Server 端的生命週期

Next 在 Server Side Render 的生命週期可以用 `getInitialProps` 帶過，意思是在 Props 傳入 component 之前，這邊可以分成 `getStaticProps（SSG）` 和 `getServerSideProps（SSR）` 兩個生命週期。

Next 針對 SSR 有這三種 function 可以來做使用：

- getStaticProps
- getStaticPaths
- getServerSideProps

### getStaticProps

`getStaticProps` 會在 Static Site Generation (SSG) 的時候被執行，意思是指進入網頁時就會去做 Render，他是一個非同步的函式。這個函式會需要回傳一個 Props，並從 Page Component 的 Props 取得到回傳的資料，一般通常會在 getStaticProps 取得需要 SSR 的資料來做渲染的動作。

- 頁面載入與頁面切換時都會被執行
- 需要回傳一個 Props 物件
- （不確定）只有在 Page Component 才會被執行，一般的 Component 無法使用
- 使用 async / await 來實作

```jsx
import axios from 'axios';

export const getStaticProps = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=6');
  const articles = await res.data;

  return {
    props: {
      articles
    }
  }
};
```

### getServerSideProps

`getServerSideProps` 跟 getStaticProps 基本上差不多，主要的差別在於他是在 Server-side Rendering (SSR) 的時候被執行，且會在每次頁面載入時動態的去取得資料。

getServerSideProps 無法適用於產出靜態網站，因為靜態網站在頁面切換時，不可能即時去取得資料並做 SSR，只能夠預先把全部的網頁內容都產出來，所以靜態網站只能用 SSG。若是使用`getStaticPaths` 跟 `getStaticProps` 做搭配，使用起來就有點等同於 getServerSideProps。

### getStaticPaths

`getStaticPaths` 需要跟 `getStaticProps` 來做搭配，使用起來的效果等同於 getServerSideProps，但會建議用在產出靜態網站時才去做使用。`getStaticPaths` 會回傳 paths 和 fallback 兩個參數，並在 getStaticProps 的 context 參數接受來做使用。

- paths：預先建構好的 params 陣列，產出靜態網頁時會針對這邊的內容產生對應的頁面。
- fallback：若 router 導向為定義的頁面，`false` 會指向 404，`true` 會直接錯誤，一般來說都會設定為 false。

```jsx
// 在 getStaticPaths 產生預計會指向的頁面陣列
// 這邊產生 6 個頁面，並將頁面編號寫進 Params ID
export const getStaticPaths = () => {
  let paths = [];

  for (let i = 0; i < 6; i++) {
    paths.push({
      params: {
        id: `${i + 1}`
      }
    })
  }

  return {
    paths,
    fallback: false // false 會導向 404 頁面，true 會直接報錯誤
  }
};

// getStaticPaths 回傳的 paths 可以在 getStaticProps 的 context 取得
export const getStaticProps = async (context) => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`);
  const article = await res.data;

  return {
    props: {
      article
    }
  }
};

// getStaticPaths 和 getStaticProps 搭配使用等同於 getServerSideProps 的功能
// 若是專案為輸出靜態網站的話則不能使用 getServerSideProps
```

**SSG 與 SSR 的差別**

實際上，Pre-rendering 分成兩種形式，分別式 Static Generation（SSG / Static Site Generation）和 Server-side Rendering（SSR），這兩者間最重要的差別是靜態頁面（HTML）產生的時間點。

- Static Generation：靜態頁面是在 build-time 時就產生，伺服器收到 request 時重複使用這些已經生成好的靜態頁面。
- Server-side Rendering：伺服器每次收到請求時在產生對應的靜態頁面。

**SSG 和 SSR 的選擇**

一般來說，不論頁面中有沒有資料存在，都會建議使用 Static Generation（SSG），因為頁面只需要建立一次後，就可以透過 CDN 來提供，速度會比 SSR 來得更快。

只要你認為這個頁面可以是在瀏覽器發送請求前就先產生好的話，就使用 SSG。除非你的頁面的資料會有頻繁的更新，且內容會根據每次的請求而有不同時，在這種情況下就可以選擇使用 SSR。

[參考資料-1](https://pjchender.dev/react/nextjs-getting-started/)
[參考資料-2](https://medium.com/starbugs/%E5%88%9D%E6%8E%A2-server-side-rendering-%E8%88%87-next-js-%E6%8E%A8%E5%9D%91%E8%A8%88%E7%95%AB-d7a9fb48a964)

## Router

### Query String

Router 參數可以使用 useRouter 來取得。

巢狀路由的參數（如 `article/123` 的 `123`），可以透過的 `router.query.id` 來取得，而 query string 同樣也是使用 `router.query` 來取得（會修飾字串），若 query string 的名稱同樣也是 id 的話，則是會以巢狀路由為優先。

```jsx
import { useRouter } from 'next/router';

const router = useRouter();
const id = router.query.id;
```

## Redux

在 Next 使用 Redux 需要安裝以下幾個套件。

- redux
- react-redux
- redux-devtools-extension
- next-redux-wrapper
- redux-thunk

```bash
npm install redux react-redux next-redux-wrapper redux-devtools-extension redux-thunk
```
