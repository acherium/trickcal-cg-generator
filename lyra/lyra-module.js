// 내부 상수들
export const COMMON_INTERVAL = 30;
export const ANIMATION_INTERVAL = 30;
export const WINDOW_ANIMATION_INTERVAL = 250;
export const DEFAULT_NOTIFICATION_DURATION = 5000;
export const DEFAULT_IMAGE_SLIDER_INTERVAL = 5000;
export const DEFAULT_IMAGE_SLIDER_DURATION = 500;

// 각종 변수들
/**
 * 문서 본문 요소입니다.
 * @see {@link https://developer.mozilla.org/ko/docs/Web/HTML/Element/body | MDN 레퍼런스> <body>: 문서 본문 요소}
 */
export const body = document.body;


// 각종 함수들
/**
 * 입력받은 객체 형식의 값을 깊은 동결(Deep Freeze)처리합니다.
 * @param {*} obj 객체 형식의 값
 * @see {@link https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze | MDN 레퍼런스> Object.freeze()}
 */
export const freeze = (obj) => {
  for (const value of Object.values(obj)) freeze(value);
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
      defaultCloseButton: new LyraButton({ icon: "accept", text: "확인", events: { click: () => this.close() } }),
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
      };

      this.nodes.bg.addEventListener("click", () => this.close());
    } else {
      this.nodes.main = create("div", { classes: [ "modal" ] });
      this.nodes.bg = append(create("div", { classes: [ "bg" ], events: { click: () => this.close() } }), this.nodes.main);
      this.nodes.body = append(create("div", { classes: [ "body" ]}), this.nodes.main);
      this.nodes.title = append(create("div", { classes: [ "title" ]}), this.nodes.body);
      this.nodes.content = append(create("div", { classes: [ "content" ]}), this.nodes.body);
      this.nodes.controller = append(create("div", { classes: [ "controller" ]}), this.nodes.body);

      if (params.bg) this.nodes.bg.classList.add(`bg-${params.bg}`);
      else this.nodes.bg.classList.add("bg-acrylic");
      if (params.icon) this.nodes.titleIcon = append(create("div", { classes: [ "icon", "il", `i-${params.icon}` ] }), this.nodes.title);
      if (params.title) this.nodes.titleText = append(create("h1", { properties: { innerText: `${params.title}` } }), this.nodes.title);
      if (params.content && params.content instanceof HTMLElement) append(params.content, this.nodes.content);
      if (params.buttons && params.buttons.constructor === Array) this.nodes.buttons = params.buttons;
      if (params.defaultCloseButton == true) this._closeButtonIndex = this.nodes.buttons.push(this.nodes.defaultCloseButton) - 1;
      if (params.zIndex) this.nodes.main.style["z-index"] = `${params.zIndex}`;
    };

    for (const button of this.nodes.buttons) append(button, this.nodes.controller);

    return this;
  };

  show() {
    this.nodes.main.style["pointer-events"] = "auto";
    this.nodes.bg.style["animation-name"] = "ani-fade-in";
    this.nodes.body.style["animation-timing-function"] = "var(--af-sweep-in)";
    this.nodes.body.style["animation-name"] = "ani-window-in";
    append(this.nodes.main, $("#lyra-modal-area"));

    if (this._closeButtonIndex > -1) this.nodes.defaultCloseButton.focus();
    else if (this.nodes.buttons.length > 0) this.nodes.buttons[this.nodes.buttons.length - 1].focus();
    else document.activeElement?.blur();

    return this;
  };

  close() {
    this.nodes.main.style["pointer-events"] = "none";
    this.nodes.bg.style["animation-name"] = "ani-fade-out";
    this.nodes.body.style["animation-timing-function"] = "var(--af-sweep-out)";
    this.nodes.body.style["animation-name"] = "ani-window-out";
    setTimeout(() => {
      this.nodes.main = revoke(this.nodes.main);
    }, WINDOW_ANIMATION_INTERVAL + ANIMATION_INTERVAL);

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
      this.nodes.main = create("div", { classes: [ "notification", "bg-acrylic" ] });
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

    if (this._options.autoDestroy) setTimeout(() => this.destroy(), WINDOW_ANIMATION_INTERVAL + ANIMATION_INTERVAL);
    
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