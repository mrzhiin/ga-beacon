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

export default class GaBeacon {
  // 跟踪 ID
  tid: string;
  // 代理地址
  proxy: string;

  constructor({ tid = "", proxy = "" }) {
    this.tid = tid;
    this.proxy = proxy;
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

  send(data: PageviewPayload) {
    navigator.sendBeacon(this.proxy, JSON.stringify(data));
  }
}

export { GaBeacon };
