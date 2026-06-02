// 각종 변수들
// 내부 변수
export const LYRA_NAME = "Lyra Engine";
export const LYRA_AUTHOR = "Acherium";
export const LYRA_CONTACT = "acherium@pm.me";
export const LYRA_VERSION = "1123";
export const LYRA_DATE = "25-2-1";

export const COMMON_INTERVAL = 30;
export const ANIMATION_INTERVAL = 30;
export const TOOLTIP_DURATION = 10000;
export const TOOLTIP_ANIMATION_DURATION = 150;
export const WINDOW_ANIMATION_DURATION = 250;
export const WINDOW_ANIMATION_DURATION_LONG = 500;
export const DEFAULT_NOTIFICATION_DURATION = 5000;
export const DEFAULT_IMAGE_SLIDER_INTERVAL = 5000;
export const DEFAULT_IMAGE_SLIDER_DURATION = 500;
export const MINIMUM_WINDOW_WIDTH = 100;
export const MINIMUM_WINDOW_HEIGHT = 100;
export const DEFAULT_WINDOW_WIDTH = 600;
export const DEFAULT_WINDOW_HEIGHT = 400;
export const DEFAULT_WINDOW_X = 10;
export const DEFAULT_WINDOW_Y = 10;

export const TEMPLATE_CUBIC_BEZIER_0 = "cubic-bezier(.17, .67, .51, .98)";

/**
 * 문서 본문 요소입니다.
 * @see {@link https://developer.mozilla.org/ko/docs/Web/HTML/Element/body | MDN 레퍼런스> <body>: 문서 본문 요소}
 */
export const body = document.body;

// 환경 변수
export const lyraEnv = {
  theme: "auto"
};
export const DICT_LYRA_ENV = {
  theme: [ "auto", "light", "dark" ]
};


// 각종 함수들
/**
 * 입력받은 객체 형식의 값을 깊은 동결(Deep Freeze)처리합니다.
 * @param {*} obj 객체 형식의 값
 * @see {@link https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze | MDN 레퍼런스> Object.freeze()}
 */
export const freeze = (obj) => {
  for (const value of Object.values(obj)) if (typeof value === "object" && typeof value[Symbol.iterator] === "function") freeze(value);
  Object.freeze(obj);
  return;
};

/**
 * 입력받은 값을 깊은 복사(Deep Copy)하고 그 값을 반환합니다.
 * @param {*} val 아무 값, 변수, 배열, etc...
 * @returns {*} 복사된 값
 * @see {@link https://developer.mozilla.org/ko/docs/Glossary/Deep_copy | MDN 레퍼런스> 깊은 복사}
 */
export const copy = (val) => {
  return JSON.parse(JSON.stringify(val));
};

/**
 * 제공한 선택자와 일치하는 첫 번째 HTML 요소를 반환하고, 일치하는 개체가 없다면 null을 반환합니다.
 * @param {string} query 선택자.
 * @param {HTMLElement} [target] 탐색 대상 요소. 제공되지 않으면 기본적으로 Document에서 탐색합니다.
 * @returns {HTMLElement | null}
 * @see {@link https://developer.mozilla.org/ko/docs/Web/API/Document/querySelector | MDN 레퍼런스> Document.querySelector()}
 */
export const $ = (query, target = document) => target.querySelector(query);

/**
 * 제공한 선택자와 일치하는 모든 HTML 요소를 NodeList로 반환합니다.
 * @param {string} query 선택자.
 * @param {HTMLElement} [target] 탐색 대상 요소. 제공되지 않으면 기본적으로 document에서 탐색합니다.
 * @returns {NodeList}
 * @see {@link https://developer.mozilla.org/ko/docs/Web/API/Document/querySelectorAll | MDN 레퍼런스> Document.querySelectorAll()}
 */
export const $a = (query, target = document) => target.querySelectorAll(query);

/**
 * create 함수 매개변수 구조체
 * @typedef {object} LyraCreateParameters
 * @property {id} [id] 요소에 적용할 ID의 이름.
 * @property {array} [classes] 요소에 적용할 클래스의 목록.
 * @property {object} [attributes] 요소에 적용할 속성값(Attributes)의 객체 형식의 모음집.
 * @property {object} [properties] 요소에 적용할 속성값(Properties)의 객체 형식의 모음집.
 * @property {object} [events] 요소에 적용할 이벤트의 객체 형식의 모음집.
 */
/**
 * 지정한 태그명의 HTML 요소를 만들어 반환합니다. 매개변수가 지정된 경우 지정된 값에 따라 속성이나 이벤트를 설정하고 반환합니다.
 * @param {string} tag HTML 요소명.
 * @param {LyraCreateParameters} [params] 매개변수.
 * @returns {HTMLElement} 지정한 태그에 따라 반환합니다.
 * @see {@link https://developer.mozilla.org/ko/docs/Web/API/Document/createElement | MDN 레퍼런스> Document.createElement()}
 * @see {@link https://developer.mozilla.org/ko/docs/Web/API/Element/setAttribute | MDN 레퍼런스> Document.setAttribute()}
 * @see {@link https://developer.mozilla.org/ko/docs/Web/API/EventTarget/addEventListener | MDN 레퍼런스> EventTarget.addEventListener()}
 */
export const create = (tag = "div", params = { id: null, classes: [], attributes: {}, properties: {}, events: {} }) => {
  const res = document.createElement(tag);
  if (params) {
    if (params.id && params.id !== null) res.id = params.id;
    if (params.classes?.length > 0) for (const value of params.classes) res.classList.add(value);
    if (params.attributes) for (const key in params.attributes) res.setAttribute(key, params.attributes[key]);
    if (params.properties) for (const key in params.properties) res[key] = params.properties[key];
    if (params.events) for (const key in params.events) res.addEventListener(key, params.events[key]);
  };
  return res;
};

/**
 * 지정한 HTML 요소를 특정 HTML 요소에 자식으로 추가하고, 추가한 요소를 반환합니다.
 * @param {HTMLElement} node 추가할 HTML 요소.
 * @param {HTMLElement} [target] 추가할 목적지인 HTML 요소. 제공되지 않으면 기본적으로 문서 본문 요소(Body)에 추가합니다.
 * @returns {HTMLElement} 추가한 요소를 반환합니다.
 * @see {@link https://developer.mozilla.org/ko/docs/Web/API/Node/appendChild | MDN 레퍼런스> Node.appendChild()}
 */
export const append = (node, target = body) => target.appendChild(node);

/**
 * 지정한 HTML 요소를 부모 요소로부터 회수합니다. 회수된 요소는 삭제되지 않고 DOM에 남아있으므로 재사용이 가능해집니다.
 * @param {HTMLElement} node
 * @returns {HTMLElement} 회수한 자손 요소.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild | MDN 레퍼런스(영문)> Node: removeChild() method}
 */
export const revoke = (node) => node.parentNode.removeChild(node);

/**
 * 시간을 문자열로 출력합니다.
 * @param {string | Date} [time] 시간.
 * @param {string} [format] 시간 형식. 제공되지 않으면 기본적으로 "YYYY-MM-DD HH:mm:ss.i" 형식으로 출력합니다.
 * @returns {string}
 */
export const time = (time, format = "YYYY-MM-DD HH:mm:ss.i") => {
  const d = time ? new Date(time) : new Date();

  const exps = {
    "YYYY": `${d.getFullYear()}`,
    "MM": `${d.getMonth() + 1}`.padStart(2, "0"),
    "DD": `${d.getMonth() + 1}`.padStart(2, "0"),
    "M": `${d.getMonth() + 1}`,
    "D": `${d.getDate()}`,
    "HH": `${d.getHours()}`.padStart(2, "0"),
    "H": `${d.getHours()}`,
    "hh": `${d.getHours() / 12 >= 1 ? d.getHours() - 12 : d.getHours()}`.padStart(2, "0"),
    "h": `${d.getHours() / 12 >= 1 ? d.getHours() - 12 : d.getHours()}`,
    "mm": `${d.getMinutes()}`.padStart(2, "0"),
    "m": `${d.getMinutes()}`,
    "ss": `${d.getSeconds()}`.padStart(2, "0"),
    "s": `${d.getSeconds()}`,
    "i": `${d.getMilliseconds()}`,
    "A": `${d.getHours() / 12 >= 1 ? "PM" : "AM"}`
  };

  for (const exp of Object.keys(exps)) {
    format = `${format}`.replace(new RegExp(exp, "g"), exps[exp]);
  };

  return format;
};

/**
 * 현재 시간을 출력합니다.
 * @param {string} [format] 시간 형식. 제공되지 않으면 기본적으로 "YYYY-MM-DD HH:mm:ss.i" 형식으로 출력합니다.
 * @returns {string}
 */
export const now = (format) => {
  return time(new Date(), format);
};


// 각종 클래스들
export class LyraElement {
  /**
   * 원래 쓰던건데 아마 필요 없어질 듯
   * @param {string} tag HTML 요소명.
   * @param {LyraCreateParameters} [params] 매개변수.
   * @return {LyraElement}
   */
  constructor(tag, params = { attributes: {}, events: {} }) {
    this.$ = create(tag, params);
    return this;
  };
};

export class LyraStateManager {
  constructor() {
    this.storage = {};

    return this;
  };

  set = (name, value) => {
    this.storage[name] = value;
    const regex = new RegExp(`%${name}%`, "g");

    for (const node of $a("*:not(script)", body)) {
      if (regex.exec(node.innerHTML)) {
        node.innerHTML = node.innerHTML.replace(regex, `<span class="__${name}">${value}</span>`);
      };
    };

    for (const node of $a(`span.__${name}`,  body)) {
      node.innerText = `${value}`;
    };

    return this;
  };

  remove = (name) => {
    delete this.storage[name];
    return this;
  };

  get = (name) => {
    return this.storage[name];
  };
};

export class LyraButton {
  /**
   * @typedef {object} LyraButtonParametersRaw
   * @property {string} [text] 버튼 텍스트.
   * 
   * @typedef {LyraCreateParameters & LyraButtonParametersRaw} LyraButtonParameters
   */
  /**
   * 내 스타일의 버튼 생성
   * @param {LyraButtonParameters} [params]
   * @returns 
   */
  constructor(params) {
    const button = create("button", params);
    if (params.icon && params.icon.length > 0) append(create("div", { classes: [ "i", `i-${params.icon}` ] }), button);
    if (params.text && params.text.length > 0) append(create("p", { properties: { innerText: params.text} }), button);
    return button;
  };
};

export class LyraModalManager {
  /**
   * HTML 문서 원본에 생성된 LyraModal 규격의 모든 요소를 불러오고, 이 모달창들의 동작을 통제하는 객체를 생성하여 반환합니다.
   * @returns {LyraModalManager}
   */
  constructor() {
    const res = {
      area: append(create("div", { id: "lyra-modal-area" })),
      reserve: {}
    };
    freeze(res.area);

    for (const modal of $a(".modal")) {
      if (!modal.id || modal.id.length < 0) continue;
      res.reserve[modal.id] = new LyraModal({}, modal);
    };

    return res;
  };
};

export class LyraModal {
  /**
   * @typedef {object} LyraModalParameters
   * @property {string} [bg] 모달 뒷배경 효과.
   * @property {string} [icon] 제목 아이콘 이름.
   * @property {string} [title] 모달창 제목.
   * @property {HTMLElement} [content] 모달 내용 부분에 삽입할 HTML 요소.
   * @property {Array.<HTMLButtonElement>} [buttons] 모달 하단에 삽입할 HTML 버튼 요소.
   * @property {boolean} [defaultCloseButton] 기본 닫기(확인) 버튼 삽입 여부.
   * @property {number} [zIndex] 모달 요소의 z-index 값.
   */
  /**
   * 모달 클래스를 생성하고 반환합니다. 규격에 맞는 원본 HTML 요소가 제공된 경우에 해당 요소를 이 클래스에 연결시킵니다.
   * @param {LyraModalParameters} [params] 매개변수.
   * @param {HTMLElement} [origin] 원본 HTML 요소.
   * @returns {LyraModal}
   */
  constructor(params = {}, origin = null) {
    this.nodes = {
      main: null,
      bg: null,
      body: null,
      title: null,
      titleIcon: null,
      titleText: null,
      content: null,
      controller: null,
      buttons: [],
      defaultCloseButton: new LyraButton({ icon: "accept", text: "확인", events: { click: () => {
        document.removeEventListener("click", this.detectBlur);
        this.close();
      } } }),
    };
    this._closeButtonIndex = -1;

    if (origin && origin.classList.contains("modal") && origin.constructor === HTMLDivElement) {
      this.nodes.main = revoke(origin);
      this.nodes.bg = this.nodes.main.querySelector(".bg");
      this.nodes.body = this.nodes.main.querySelector(".body");
      this.nodes.title = this.nodes.body.querySelector(".title");
      this.nodes.titleIcon = this.nodes.title.querySelector(".icon");
      this.nodes.titleText = this.nodes.title.querySelector("h1");
      this.nodes.content = this.nodes.body.querySelector(".content");
      this.nodes.controller = this.nodes.body.querySelector(".controller");
      this.nodes.buttons = Array.from(this.nodes.controller.querySelectorAll("button"));
      this._closeButtonIndex = this.nodes.buttons.findIndex((x) => x.classList.contains("close"));

      if (this._closeButtonIndex > -1) {
        this.nodes.buttons.splice(this._closeButtonIndex, 0, this.nodes.defaultCloseButton);
        this.nodes.buttons = this.nodes.buttons.filter((x) => x.classList.contains("close") ? x.remove() : x).filter((x) => x);
        this.nodes.defaultCloseButton.classList.add("close");
      };

      this.nodes.bg.addEventListener("click", () => this.close());
    } else {
      this.nodes.main = create("div", { classes: [ "modal" ] });
      this.nodes.bg = append(create("div", { classes: [ "bg" ] }), this.nodes.main);
      this.nodes.body = append(create("div", { classes: [ "body" ]}), this.nodes.main);
      this.nodes.title = append(create("div", { classes: [ "title" ]}), this.nodes.body);
      this.nodes.content = append(create("div", { classes: [ "content" ]}), this.nodes.body);
      this.nodes.controller = append(create("div", { classes: [ "controller" ]}), this.nodes.body);

      if (params.bg) this.nodes.bg.classList.add(`bg-${params.bg}`);
      if (params.icon) this.nodes.titleIcon = append(create("div", { classes: [ "icon", "il", `i-${params.icon}` ] }), this.nodes.title);
      if (params.title) this.nodes.titleText = append(create("h1", { properties: { innerText: `${params.title}` } }), this.nodes.title);
      if (params.content && params.content instanceof HTMLElement) append(params.content, this.nodes.content);
      if (params.buttons && params.buttons.constructor === Array) this.nodes.buttons = params.buttons;
      if (params.defaultCloseButton == true) this._closeButtonIndex = this.nodes.buttons.push(this.nodes.defaultCloseButton) - 1;
      if (params.zIndex) this.nodes.main.style["z-index"] = `${params.zIndex}`;
    };

    for (const button of this.nodes.buttons) {
      append(button, this.nodes.controller);
      if (button.classList.contains("close")) button.addEventListener("click", () => {
        document.removeEventListener("click", this.detectBlur);
        this.close();
      });
    };

    return this;
  };

  detectBlur = (e) => {
    if (!Array.from($a(".body *, .body", this.nodes.main)).includes(e.target)) {
      // this.close();
      document.removeEventListener("click", this.detectBlur);
    };
  };

  show() {
    // this.nodes.main.style["pointer-events"] = "auto";
    this.nodes.bg.style["animation-name"] = "ani-fade-in";
    this.nodes.body.style["animation-timing-function"] = "var(--af-sweep-in)";
    this.nodes.body.style["animation-name"] = "ani-window-in";
    append(this.nodes.main, $("#lyra-modal-area"));

    if (this._closeButtonIndex > -1) this.nodes.defaultCloseButton.focus();
    else if (this.nodes.buttons.length > 0) this.nodes.buttons[this.nodes.buttons.length - 1].focus();
    else document.activeElement?.blur();

    setTimeout(() => {
      document.addEventListener("click", this.detectBlur);
    });

    return this;
  };

  close() {
    // this.nodes.main.style["pointer-events"] = "none";
    this.nodes.bg.style["animation-name"] = "ani-fade-out";
    this.nodes.body.style["animation-timing-function"] = "var(--af-sweep-out)";
    this.nodes.body.style["animation-name"] = "ani-window-out";
    setTimeout(() => {
      if (this.nodes.main.isConnected) this.nodes.main = revoke(this.nodes.main);
    }, WINDOW_ANIMATION_DURATION + ANIMATION_INTERVAL);

    document.documentElement.focus();
    return this;
  };
};

export class LyraNotificationManager {
  /**
   * HTML 문서 원본에 생성된 LyraNotification 규격의 모든 요소를 불러오고, 이 알림창들의 동작을 통제하는 객체를 생성하여 반환합니다.
   * @returns {LyraNotificationManager}
   */
  constructor() {
    const res = {
      area: null,
      wrap: null,
      reserve: {}
    };
    res.area = append(create("div", { id: "lyra-notification-area" }));
    res.wrap = append(create("div", { classes: [ "wrap" ]}), res.area);
    freeze(res.area);

    for (const notification of $a(".notification")) {
      if (!notification.id || notification.id.length < 0) continue;
      res.reserve[notification.id] = new LyraNotification({}, notification);
    };

    return res;
  };
};

export class LyraNotification {
  /**
   * @typedef {object} LyraNotificationParameters
   * @property {string} [icon] 알림창 아이콘 이름.
   * @property {string} [text] 알림 내용.
   * @property {number} [duration] 알림창 유지시간(ms).
   * @property {boolean} [autoShow] 알림창 생성시 즉시 자동 표시 여부.
   * @property {boolean} [autoClose] 유지시간에 따른 자동 닫힘 여부.
   * @property {boolean} [autoDestroy] 유지시간에 따른 자동 닫힘시 객체, 요소 완전 삭제 여부.
   * @property {boolean} [defaultCloseButton] 기본 알림창 닫기 버튼 삽입 여부.
   */
  /**
   * 알림창 클래스를 생성하고 반환합니다. 규격에 맞는 원본 HTML 요소가 제공된 경우에 해당 요소를 이 클래스에 연결시킵니다.
   * @param {LyraNotificationParameters} [params] 매개변수.
   * @param {HTMLElement} [origin] 원본 HTML 요소.
   * @returns {LyraNotification}
   */
  constructor(params = {}, origin = null) {
    this.nodes = {
      main: null,
      icon: null,
      text: null,
      gauge: create("div", { classes: [ "gauge" ]}),
      buttonArea: create("div", { classes: [ "button-area" ]}),
      buttons: [],
      defaultCloseButton: new LyraButton({ icon: "deny", events: { click: () => this.close() }})
    };
    this._options = {
      duration: typeof params.duration !== "undefined" ? parseInt(params["duration"]) : DEFAULT_NOTIFICATION_DURATION,
      autoShow: typeof params.autoShow !== "undefined" ? Boolean(params.autoShow) : false,
      autoClose: typeof params.autoClose !== "undefined" ? Boolean(params.autoClose) : true,
      autoDestroy: typeof params.autoDestroy !== "undefined" ? Boolean(params.autoDestroy) : true,
      defaultCloseButton: typeof params.defaultCloseButton !== "undefined" ? Boolean(params.defaultCloseButton) : true
    };
    this._timeoutHandler = null;

    if (origin && origin.classList.contains("notification") && origin.constructor === HTMLDivElement) {
      this.nodes.main = revoke(origin);
      this.nodes.icon = this.nodes.main.querySelector(".icon");
      this.nodes.text = this.nodes.main.querySelector("p");
      this.nodes.buttons = Array.from(this.nodes.main.querySelectorAll("button")).map((x) => revoke(x));

      const op = {
        duration: this.nodes.main.getAttribute("lyra-duration"),
        autoShow: this.nodes.main.getAttribute("lyra-autoShow"),
        autoClose: this.nodes.main.getAttribute("lyra-autoClose"),
        autoDestroy: this.nodes.main.getAttribute("lyra-autoDestroy"),
        defaultCloseButton: this.nodes.main.getAttribute("lyra-defaultCloseButton"),
      };

      this._options.duration = op.duration !== null ? parseInt(op.duration) : this._options.duration;
      this._options.autoShow = op.autoShow !== null ? (op.autoShow === "true" ? true : false) : this._options.autoShow;
      this._options.autoClose = op.autoClose !== null ? (op.autoClose === "false" ? false : true) : this._options.autoClose;
      this._options.autoDestroy = op.autoDestroy !== null ? (op.autoDestroy === "false" ? false : true) : this._options.autoDestroy;
      this._options.defaultCloseButton = op.defaultCloseButton !== null ? (op.defaultCloseButton === "false" ? false : true) : this._options.defaultCloseButton;
    } else {
      this.nodes.main = create("div", { classes: [ "notification" ] });
      if (params.icon) this.nodes.icon = append(create("div", { classes: [ "icon", "i", `i-${params.icon}` ] }), this.nodes.main);
      if (params.text) this.nodes.text = append(create("p", { properties: { innerText: params.text } }), this.nodes.main);
      if (params.buttons && params.buttons.constructor === Array) this.nodes.buttons = params.buttons;
    };

    this.nodes.main.addEventListener("pointerover", () => {
      if (!this._options.autoClose) return;
      this.offTimer();
    });
    this.nodes.main.addEventListener("pointerleave", () => {
      if (!this._options.autoClose) return;
      this.onTimer();
    });

    if (this._options.defaultCloseButton) this.nodes.buttons.push(this.nodes.defaultCloseButton);
    if (this.nodes.buttons.length > 0) append(this.nodes.buttonArea, this.nodes.main);
    if (this.nodes.buttons.length > 1) this.nodes.main.classList.add("notification-two-track");
    for (const button of this.nodes.buttons) {
      append(button, this.nodes.buttonArea);
      button.addEventListener("click", () => this.close());
    };

    append(this.nodes.gauge, this.nodes.main);
    if (this._options.autoShow) setTimeout(() => this.show());

    // console.log(this);
    // append(this.nodes.main, $("#lyra-notification-area > div"));
    return this;
  };

  show() {
    this.nodes.main.style["pointer-events"] = "auto";
    this.nodes.main.style["animation-timing-function"] = "var(--af-sweep-in)";
    this.nodes.main.style["animation-name"] = "ani-window-in";
    append(this.nodes.main, $("#lyra-notification-area > .wrap"));

    if (this._options.defaultCloseButton) this.nodes.defaultCloseButton.focus();
    if (this._options.autoClose) this.onTimer();

    return this;
  };

  close() {
    this.nodes.main.style["pointer-events"] = "none";
    this.nodes.main.style["animation-timing-function"] = "var(--af-sweep-out)";
    this.nodes.main.style["animation-name"] = "ani-window-out";

    if (this._options.autoDestroy) setTimeout(() => this.destroy(), WINDOW_ANIMATION_DURATION + ANIMATION_INTERVAL);
    
    return this;
  };

  destroy() {
    if (this._timeoutHandler !== null) clearTimeout(this._timeoutHandler);
    this.nodes.main.remove();
    return null;
  };

  onTimer() {
    this._timeoutHandler = setTimeout(() => this.close(), this._options.duration + ANIMATION_INTERVAL);
    this.nodes.gauge.style["animation"] = `${this._options.duration/1000}s linear ani-notification-gauge both`;
    return this;
  };

  offTimer() {
    if (this._timeoutHandler !== null) clearTimeout(this._timeoutHandler);
    this.nodes.gauge.style["animation"] = null;
    return this;
  };
};

export class LyraWindowManager {
  /**
   * HTML 문서 원본에 생성된 LyraWindow 규격의 모든 요소를 불러오고, 이 창들의 동작을 통제하는 객체를 생성하여 반환합니다.
   * @returns {LyraWindowManager}
   */
  constructor() {
    const res = {
      area: null,
      taskbar: null,
      reserve: {},
      active: null
    };
    res.area = append(create("div", { id: "lyra-window-area" }));
    res.taskbar = append(create("div", { id: "lyra-window-taskbar" }), res.area);
    freeze(res.area);

    for (const window of $a(".window")) {
      if (!window.id || window.id.length < 0) continue;
      res.reserve[window.id] = new LyraWindow({}, res, window);
    };

    return res;
  };
};

export class LyraWindow {
  /**
   * @typedef {object} LyraWindowParameters
   * @property {string} [icon] 창 아이콘.
   * @property {string} [name] 창 이름.
   * @property {boolean} [movable] 창 이동 가능 여부.
   * @property {boolean} [resizable] 창 크기 조절 가능 여부.
   * @property {boolean} [defaultCloseButton] 기본 창 닫기 버튼 삽입 여부.
   * @property {boolean} [defaultMaximizeButton] 기본 창 최대화 버튼 삽입 여부.
   * @property {boolean} [defaultMinimizeButton] 기본 창 최소화 버튼 삽입 여부.
   */
  /**
   * 창 클래스를 생성하고 반환합니다. 규격에 맞는 원본 HTML 요소가 제공된 경우에 해당 요소를 이 클래스에 연결시킵니다.
   * @param {LyraWindowParameters} [params] 매개변수.
   * @param {HTMLElement} [origin] 원본 HTML 요소.
   * @returns {LyraWindow}
   */
  constructor(params = {}, manager, origin = null) {
    this.connectedManager = manager;
    this.nodes = {
      main: null,
      titleBar: null,
      nameArea: null,
      nameIcon: null,
      name: null,
      buttonArea: null,
      defaultCloseButton: new LyraButton({ classes: [ "close" ], icon: "window-close" }),
      defaultMaximizeButton: new LyraButton({ classes: [ "close" ], icon: "window-maximize" }),
      defaultMinimizeButton: new LyraButton({ classes: [ "close" ], icon: "window-minimize" }),
      menu: null,
      menuNodes: {},
      contents: null,
      taskbarItem: null
    };
    this.options = {
      defaultWidth: typeof params.width !== "undefined" ? (parseInt(params["width"]) < MINIMUM_WINDOW_WIDTH ? MINIMUM_WINDOW_WIDTH : parseInt(params["width"])) : DEFAULT_WINDOW_WIDTH,
      defaultHeight: typeof params.height !== "undefined" ? (parseInt(params["height"]) < MINIMUM_WINDOW_HEIGHT ? MINIMUM_WINDOW_HEIGHT : parseInt(params["height"])) : DEFAULT_WINDOW_HEIGHT,
      defaultX: typeof params.x !== "undefined" ? parseInt(params["x"]) : DEFAULT_WINDOW_X,
      defaultY: typeof params.y !== "undefined" ? parseInt(params["y"]) : DEFAULT_WINDOW_Y,
      movable: typeof params.movable !== "undefined" ? Boolean(params.movable) : true,
      resizable: typeof params.resizable !== "undefined" ? Boolean(params.resizable) : true,
      defaultCloseButton: typeof params.defaultCloseButton !== "undefined" ? Boolean(params.defaultCloseButton) : true,
      defaultMaximizeButton: typeof params.defaultMaximizeButton !== "undefined" ? Boolean(params.defaultMaximizeButton) : true,
      defaultMinimizeButton: typeof params.defaultMinimizeButton !== "undefined" ? Boolean(params.defaultMinimizeButton) : true
    };

    if (origin && origin.classList.contains("window") && origin.constructor === HTMLDivElement) {
      this.nodes.main = revoke(origin);
      this.nodes.body = $(".body", this.nodes.main);
      this.nodes.titleBar = $(".body > .title-bar", this.nodes.main);
      this.nodes.nameArea = $(".body > .title-bar > .name-area", this.nodes.main);
      this.nodes.nameIcon = $(".body > .title-bar > .name-area > .i", this.nodes.main);
      this.nodes.name = $(".body > .title-bar > .name-area > p", this.nodes.main);
      this.nodes.buttonArea = $(".body > .title-bar > .button-area", this.nodes.main);
      this.nodes.defaultCloseButton = $(".body > .title-bar > .button-area > button.close", this.nodes.main) || this.nodes.defaultCloseButton;
      this.nodes.defaultMaximizeButton = $(".body > .title-bar > .button-area > button.maximize", this.nodes.main) || this.nodes.defaultMaximizeButton;
      this.nodes.defaultMinimizeButton = $(".body > .title-bar > .button-area > button.minimize", this.nodes.main) || this.nodes.defaultMinimizeButton;
      this.nodes.menu = append(create("ul"), append(create("div", { classes: [ "menu" ] }), this.nodes.body));
      this.nodes.contents = $(".body > .contents", this.nodes.main);

      this.connectMenu(revoke($(".body > .menu", this.nodes.main)));

      const op = {
        width: this.nodes.main.getAttribute("lyra-width"),
        height: this.nodes.main.getAttribute("lyra-height"),
        x: this.nodes.main.getAttribute("lyra-x"),
        y: this.nodes.main.getAttribute("lyra-y"),
        movable: this.nodes.main.getAttribute("lyra-movable"),
        resizable: this.nodes.main.getAttribute("lyra-resizable"),
        defaultCloseButton: this.nodes.main.getAttribute("lyra-defaultCloseButton"),
        defaultMaximizeButton: this.nodes.main.getAttribute("lyra-defaultMaximizeButton"),
        defaultMinimizeButton: this.nodes.main.getAttribute("lyra-defaultMinimizeButton")
      };

      this.options.defaultWidth = op.width !== null ? (parseInt(op.width) < MINIMUM_WINDOW_WIDTH ? MINIMUM_WINDOW_HEIGHT : parseInt(op.width)) : this.options.defaultWidth;
      this.options.defaultHeight = op.height !== null ? (parseInt(op.height) < MINIMUM_WINDOW_HEIGHT ? MINIMUM_WINDOW_HHEIGHT : parseInt(op.height)) : this.options.defaultHeight;
      this.options.defaultX = op.x !== null ? parseInt(op.x) : this.options.defaultX;
      this.options.defaultY = op.y !== null ? parseInt(op.y) : this.options.defaultY;
      this.options.movable = op.movable !== null ? (op.movable === "false" ? false : true) : this.options.movable;
      this.options.resizable = op.resizable !== null ? (op.resizable === "false" ? false : true) : this.options.resizable;
      this.options.defaultCloseButton = op.defaultCloseButton !== null ? (op.defaultCloseButton === "true" ? true : false) : this.options.defaultCloseButton;
      this.options.defaultMaximizeButton = op.defaultMaximizeButton !== null ? (op.defaultMaximizeButton === "true" ? true : false) : this.options.defaultMaximizeButton;
      this.options.defaultMinimizeButton = op.defaultMinimizeButton !== null ? (op.defaultMinimizeButton === "true" ? true : false) : this.options.defaultMinimizeButton;
    } else {

    };

    this.rectOrigin = {
      width: copy(this.options.defaultWidth),
      height: copy(this.options.defaultHeight),
      x: copy(this.options.defaultX),
      y: copy(this.options.defaultY)
    };
    this.rect = copy(this.rectOrigin);

    this.nodes.main.style["width"] = `${this.rect.width}px`;
    this.nodes.main.style["left"] = `0`;
    this.nodes.main.style["top"] = `0`;
    this.nodes.main.style["transform"] = `translate(${this.rect.x}px, ${this.rect.y}px)`;
    this.nodes.contents.style["width"] = `${this.rect.width}px`;
    this.nodes.contents.style["height"] = `${this.rect.height}px`;

    if (this.nodes.defaultCloseButton) this.nodes.defaultCloseButton.onclick = () => this.close();
    if (this.nodes.defaultMaximizeButton) this.nodes.defaultMaximizeButton.onclick = () => this.maximize();
    if (this.nodes.defaultMinimizeButton) this.nodes.defaultMinimizeButton.onclick = () => this.minimize();

    if (this.options.movable && this.nodes.titleBar) {
      this.nodes.titleBar.onpointerdown = (e) => {
        if (e.target !== this.nodes.titleBar || e.pointerType === "mouse" && e.buttons !== 1) return;
        this.activate();
        e.target.setPointerCapture(e.pointerId);

        this.nodes.titleBar.onpointermove = (m) => {
          if (this.nodes.main.classList.contains("maximize")) {
            this.rect.x = e.clientX - this.rect.width / 2;
            this.rect.y = e.clientY - 20;
            this.maximize();
          };
          this.rect.x += m.movementX;
          this.rect.y += m.movementY;
          this.applyPosition();
        };
        this.nodes.titleBar.onpointerup = () => {
          this.nodes.titleBar.onpointermove = null;
          this.nodes.titleBar.onpointerup = null;
        };
      };
    };

    this.nodes.main.addEventListener("click", () => {
      this.activate();
    });

    this.nodes.taskbarItem = create("div", {
      classes: [ "taskbar-item" ],
      properties: { innerHTML: `<p>${this.nodes.name.innerText || "Window"}</p>` },
      events: { click: () => {
        if (this.nodes.main.isConnected) {
          this.minimize()
        } else {
          this.show();
        };
      } }
    });

    return this;
  };

  connectMenu(node) {
    const menu = {};

    const main = $("ul", node);
    if (main) {
      const f = (n) => {
        const x = {
          id: null,
          type: null,
          string: null,
          node: null,
          submenuArea: null,
          children: null,
          onclick: () => {}
        };

        x.node = n;
        x.id = x.node.id;
        x.string = $("span", x.node)?.innerText || "null";
        x.node.onclick = (e) => x.onclick(e);

        if ($a("ul > li", x.node).length) {
          x.type = "folder";
          x.children = {};
          x.onclick = (e) => {
            if (e.target === x.node && !x.node.classList.contains("active")) {
              Array.from($a(".active", x.node.parentNode)).forEach((y) => y.classList.remove("active"));
              x.node.classList.add("active");
            } else if (!Array.from($a("li", x.node)).find((y) => y === e.target)) {
              x.node.classList.remove("active");
              Array.from($a(".active", x.node)).forEach((y) => y.classList.remove("active"));
            };
          };
          for (const y of $a("ul > li", x.node)) {
            x.children[y.id] = f(y);
          };
        } else {
          x.type = "single";
          x.node.addEventListener("click", () => {
            Array.from($a(".active", this.nodes.menu)).forEach((y) => y.classList.remove("active"));
          });
        };

        return x;
      };

      for(const x of main.children) {
        menu[x.id] = f(x);
      };
    };

    this.nodes.menuNodes = menu;
    for (const x of Object.values(this.nodes.menuNodes)) {
      append(x.node, this.nodes.menu);
    };

    return this;
  };

  applyPosition() {
    this.nodes.main.animate([ { "transform": `translate(${this.rect.x}px, ${this.rect.y}px)` } ], { fill: "both" });

    return this;
  };

  resetPosition() {
    this.rect = copy(this.rectOrigin);
    this.applyPosition();

    return this;
  };

  activate() {
    if (!this.nodes.main.isConnected) return this;
    if ($(".window.active") && $(".window.active") === this.nodes.main) return this;
    Array.from($a(".window.active, .taskbar-item.active", this.connectedManager.area)).forEach((x) => x.classList.remove("active"));
    append(this.nodes.main, this.connectedManager.area);
    this.nodes.main.classList.add("active");
    this.nodes.taskbarItem.classList.add("active");

    return this;
  };

  inactivate() {
    this.nodes.main.classList.remove("active");
    this.nodes.taskbarItem.classList.remove("active");

    return this;
  };

  show() {
    if (this.nodes.main.isConnected) {
      this.activate();
      return this;
    };
    this.nodes.main.style["opacity"] = "0";
    
    append(this.nodes.main, this.connectedManager.area);
    append(this.nodes.taskbarItem, this.connectedManager.taskbar);
    this.activate();

    setTimeout(() => {
      this.nodes.main.animate([
        {
          "transform": `translate(${this.rectOrigin.x}px, ${this.rectOrigin.y+20}px) scale(0.9)`,
          "opacity": "0"
        },
        {
          "transform": `translate(${this.rectOrigin.x}px, ${this.rectOrigin.y}px) scale(1)`,
          "opacity": "1"
        }
      ], {
        duration: WINDOW_ANIMATION_DURATION,
        easing: TEMPLATE_CUBIC_BEZIER_0,
        fill: "both"
      });
    }, COMMON_INTERVAL);

    return this;
  };

  maximize() {
    if (!this.options.resizable) return;

    if (this.nodes.main.classList.contains("maximize")) {
      this.nodes.main.classList.remove("maximize");
    } else {
      this.nodes.main.classList.add("maximize");
    };

    return this;
  };

  minimize() {
    this.nodes.main.animate([
      { "transform": "translate(0px, 0px) scale(1)" },
      { "transform": "translate(0px, 20px) scale(0.9)" }
    ], {
      duration: WINDOW_ANIMATION_DURATION,
      easing: TEMPLATE_CUBIC_BEZIER_0,
      fill: "both",
      composite: "add"
    });
    this.nodes.main.animate([
      { "opacity": "1" },
      { "opacity": "0" }
    ], {
      duration: WINDOW_ANIMATION_DURATION,
      easing: TEMPLATE_CUBIC_BEZIER_0,
      fill: "both"
    });

    setTimeout(() => this.inactivate());

    setTimeout(() => {
      this.resetPosition();
      if (this.nodes.main.isConnected) this.nodes.main = revoke(this.nodes.main);
    }, WINDOW_ANIMATION_DURATION + COMMON_INTERVAL);

    return this;
  };

  close() {
    if (this.nodes.taskbarItem.isConnected) this.nodes.taskbarItem = revoke(this.nodes.taskbarItem);

    this.nodes.main.animate([
      { "transform": "translate(0px, 0px) scale(1)" },
      { "transform": "translate(0px, 20px) scale(0.9)" }
    ], {
      duration: WINDOW_ANIMATION_DURATION,
      easing: TEMPLATE_CUBIC_BEZIER_0,
      fill: "both",
      composite: "add"
    });
    this.nodes.main.animate([
      { "opacity": "1" },
      { "opacity": "0" }
    ], {
      duration: WINDOW_ANIMATION_DURATION,
      easing: TEMPLATE_CUBIC_BEZIER_0,
      fill: "both"
    });

    setTimeout(() => {
      this.resetPosition();
      if (this.nodes.main.isConnected) this.nodes.main = revoke(this.nodes.main);
    }, WINDOW_ANIMATION_DURATION + COMMON_INTERVAL);

    return this;
  };
};

// 환경변수 고정
Object.seal(lyraEnv);
freeze(DICT_LYRA_ENV);