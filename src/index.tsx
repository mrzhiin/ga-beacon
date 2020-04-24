interface PageviewPayload {
  // 屏幕分辨率
  sr: string;
  // 视口大小
  vp: string;
  // 文档编码
  de: string;
  // 屏幕颜色
  sd: string;
  // 用户语言
  ul: string;
  // 文档位置网址
  dl: string;
  // 文档标题
  dt: string;
  // 跟踪 ID
  tid: string;
  // 用户代理
  ua: string;
  // 文档引荐来源网址
  dr: string;
  // 匹配类型
  t: "pageview";
}

interface Options {
  tid: string;
  proxy: string;
  type?: "formData" | "textJson";
}

export default class GaBeacon {
  // 跟踪 ID
  tid: string;
  // 代理地址
  proxy: string;
  // 内容类型
  type: "formData" | "textJson";

  constructor({ tid, proxy, type = "textJson" }: Options) {
    this.tid = tid;
    this.proxy = proxy;
    this.type = type;
  }

  pageview(
    props: { [prop in keyof PageviewPayload]?: PageviewPayload[prop] } = {}
  ) {
    const payload: PageviewPayload = {
      tid: this.tid,
      t: "pageview",
      sr: `${window.screen.width}x${window.screen.height}`,
      vp: `${window.innerWidth}x${window.innerHeight}`,
      de: document.characterSet,
      sd: `${window.screen.colorDepth}-bits`,
      ul: `${window.navigator.language}`,
      dl: `${document.location.origin}${document.location.pathname}${document.location.search}`,
      dt: document.title,
      ua: `${navigator.userAgent}`,
      dr: `${document.referrer}`,
      ...props,
    };

    this.send(payload);
  }

  send(preload: PageviewPayload) {
    let data: FormData | string;

    if (this.type === "textJson") {
      data = JSON.stringify(preload);
    } else {
      const formData = new FormData();

      for (let [key, value] of Object.entries(preload)) {
        formData.append(key, value);
      }

      data = formData;
    }

    navigator.sendBeacon(this.proxy, data);
  }
}

export { GaBeacon };
