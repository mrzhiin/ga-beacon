# ga-beacon

Google Analytics Beacon

## 安装

使用 NPM 或 Yarn

```shell
npm i @mrzhiin/ga-beacon

yarn add @mrzhiin/ga-beacon
```

## 使用

```js
import GaBeacon from "@mrzhiin/ga-beacon";

const gab = new GaBeacon({
  tid: "", // Google Analytics 跟踪 ID
  proxy: "", // 后端地址
});
```

## 方法

### pageview

```js
gab.pageview();
```

发送页面浏览记录。在使用 React、Vue 时可能无法正确获取页面信息，例如网页标题等，此时可以主动传入参数

| 选项 | 类型   | 描述             |
| ---- | ------ | ---------------- |
| sr   | string | 屏幕分辨率       |
| vp   | string | 视口大小         |
| de   | string | 文档编码         |
| sd   | string | 屏幕颜色         |
| ul   | string | 用户语言         |
| dl   | string | 文档位置网址     |
| dt   | string | 文档标题         |
| tid  | string | 跟踪 ID          |
| ua   | string | 用户代理         |
| dr   | string | 文档引荐来源网址 |
| t    | string | 匹配类型         |

```js
gab.pageview({
  dt: "",
});
```
