const __lyra = {
    dir: document.currentScript.src.split("/").slice(0, -1).join("/"),
    env: {
        "ANIMATION-INTERVAL": 30,
        "WINDOW-ANIMATION-DURATION": 250,
        "DEFAULT-NOTIFICATION-DURATION": 5000,
        "LOREM": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut venenatis ipsum at neque lobortis faucibus. In et erat quis quam mattis malesuada nec eget quam. Nam congue, risus quis aliquet pharetra, quam nisl condimentum diam, eget consectetur velit est in nulla. Proin iaculis vestibulum nisl a pellentesque. Sed in magna ac sapien finibus pharetra. Curabitur vitae vehicula libero, ullamcorper faucibus eros. Ut gravida sem et ante aliquam, et pellentesque urna blandit. Aliquam ac accumsan nibh, ac ultrices ligula. Mauris tincidunt ullamcorper dignissim. Nullam euismod blandit justo, in finibus mauris fringilla sed. Fusce dolor ex, dictum id odio id, posuere finibus nulla. " +
            "Vivamus metus enim, euismod sit amet pretium in, eleifend at justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed quam arcu, malesuada eget fermentum ac, interdum nec ligula. Sed ac faucibus justo, quis consectetur lorem. Nam consectetur eleifend felis, eu ultricies ipsum viverra eget. Mauris ac risus ac orci consectetur varius. Nulla egestas, nulla non iaculis condimentum, nisl odio vehicula tortor, posuere dignissim neque ligula ut erat. Cras neque nibh, mollis vitae mauris vitae, venenatis elementum metus. Fusce vestibulum lacus a dapibus bibendum. Quisque dapibus dolor non placerat efficitur. Aliquam finibus est neque, at sagittis tortor suscipit et. Sed mollis mauris ex, a feugiat lorem faucibus non. Curabitur ac sollicitudin nibh. " +
            "Nunc pharetra sem eu porta sagittis. Nullam fringilla consequat tortor vel venenatis. Nulla facilisi. Curabitur quis mauris et tellus porttitor laoreet a et dolor. Integer odio urna, ultricies nec dolor eu, interdum dignissim lacus. Ut pellentesque lorem ante. Quisque vitae lacus nisl. Nulla sodales neque neque, vehicula pharetra tellus semper eget. Morbi vel nunc rhoncus quam condimentum porttitor. Sed vitae molestie lorem. Aliquam erat volutpat. Ut volutpat justo sit amet enim pharetra, vitae porttitor ipsum ultricies. Sed nisl nisl, volutpat sit amet pulvinar ut, finibus nec neque. Proin nec faucibus nibh. " +
            "Nunc sit amet ultricies lorem. Vivamus a risus quis purus euismod cursus vitae id felis. Suspendisse sodales consectetur urna id rhoncus. Morbi libero tortor, mattis et dui nec, mollis placerat tellus. Aliquam vitae tempus mauris, sit amet porttitor lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed a dolor tincidunt, rutrum est non, feugiat metus. Aliquam bibendum nulla non erat ultrices auctor. In eget pharetra nulla. Phasellus bibendum mattis ex eget cursus. " +
            "Nulla a magna vitae felis ultricies auctor nec eget ipsum. Sed ultrices risus sed nunc dictum maximus. Nullam vel sapien a magna laoreet malesuada. Ut nec sem cursus, accumsan libero sed, tincidunt magna. Aliquam eleifend urna quis mattis tincidunt. Vivamus consectetur vestibulum sapien, vitae luctus libero porta efficitur. Praesent id ipsum sit amet elit congue faucibus sed ut lacus. Curabitur lacinia leo at iaculis maximus. Mauris fermentum dignissim quam sit amet pretium. In nec ante a felis maximus imperdiet."
    },
    meta: {
        name: "Lyra Engine",
        author: "Acherium",
        contact: "acherium@pm.me",
        version: "1003",
        date: "24-07-27"
    }
};
const __manager = {
    modal: {
        area: null,
        reserve: {}
    },
    window: {
        area: null,
        reserve: {}
    },
    notification: {
        area: null,
        wrap: null,
        id: 0,
        reserve: {}
    }
};

function freeze(obj) {
    for (const key in obj) {
        const value = obj[key];
        if (value && typeof value === "object") freeze(value);
    };
    Object.freeze(obj);
    return;
};
function $(selectors, $target = document) {
    return $target.querySelector(selectors);
};
function $all(selectors, $target = document) {
    return $target.querySelectorAll(selectors);
};
function $create(tag, params = {}) {
    const _$res = document.createElement(tag);
    for (const _i in params) {
        if (_i === "id") _$res.id = params[_i];
        else if (_i === "class") _$res.className = params[_i].join(" ");
        else if (_i === "text") _$res.innerText = params[_i];
        else if (_i === "html") _$res.innerHTML = params[_i];
        else _$res[_i] = params[_i];
    };
    return _$res;
};
function $append($element, $target = document.body) {
    if ($element.constructor === Array) {
        for (const _i in $element) {
            if ($target.constructor === LyraElement) $target.$.append($element[_i]);
            else $target.append($element[_i]);
        };
    } else {
        if ($target.constructor === LyraElement) $target.$.append($element);
        else $target.append($element);
    };
    return $element;
};

class LyraElement {
    constructor(tag, params = {}, $origin = null) {
        if (!tag && !$origin) return null;

        this.$ = null;
        this.$parent = null;
        if ($origin && $origin instanceof HTMLElement) {
            this.$ = $origin;
        } else {
            this.$ = $create(tag, params);
            this.$parent = null;
        };
        this.style = this.$.style;
        return this;
    };
    into($target = document.body) {
        if (typeof $target !== "string" && typeof $target !== "object") return;
        if (typeof $target === "string") $target = $($target);
        if ($target === null) return;
        this.$parent = $target;
        $append(this.$, $target);
        return this;
    };
    revoke() {
        if (this.$parent !== null) {
            this.$ = this.$parent.removeChild(this.$);
            this.$parent = null;
        };
        return this;
    };
    remove() {
        this.$.remove();
        return;
    };
    addClass(token) {
        this.$.classList.add(token);
        return this;
    };
    removeClass(token) {
        this.$.classList.remove(token);
        return this;
    };
    replaceClass(oldToken, newToken) {
        this.$.classList.replace(oldToken, newToken);
        return this;
    };
    hasClass(token) {
        return this.$.classList.contains(token);
    };
    append($element) {
        this.$.append($element);
        return this;
    };
    get(tag) {
        const $res = new LyraElement(null, {}, this.$.querySelector(tag));
        return $res.$ ? $res : null;
    };
    getAll(tag) {
        return Array.from(this.$.querySelectorAll(tag)).map(($x) => new LyraElement(null, {}, $x));  
    };
    click() {
        this.$.click();
        return this;
    };
    focus() {
        this.$.focus();
        return this;
    };
};
class LyraButton extends LyraElement {
    constructor(params = {}, $origin = null) {
        if ($origin && $origin instanceof HTMLElement) {
            super(null, {}, $origin);
        } else if ($origin && $origin instanceof LyraElement) {
            super(null, {}, $origin.$);
        } else {
            super("button");
            for (const _i in params) {
                if (_i === "id") this.$.id = params[_i];
                else if (_i === "class") this.$.className = params[_i].join(" ");
                else if (_i === "icon") this.$.append($create("div", { class: [ "i", `i-${params[_i]}` ] }));
                else if (_i === "text") this.$.append($create("p", { text: params[_i] }));
                else if (_i === "onclick" && typeof params[_i] === "function") this.$.onclick = params[_i];
                else this.$[_i] = params[_i];
            };
        };
        return this;
    };
};
class LyraModal {
    constructor(params = {}, $origin = null) {
        this.$ = null;
        this.$bg = null;
        this.$body = null;
        this.$title = null;
        this.$titleIcon = null;
        this.$titleText = null;
        this.$content = null;
        this.$controller = null;
        this.$buttons = [];
        this.$closeButton = new LyraButton({ icon: "accept", text: "확인", onclick: () => this.close() });
        this._closeButtonIndex = -1;

        if ($origin && $origin.constructor === HTMLDivElement && $origin.classList.contains("modal")) {
            this.$ = new LyraElement(null, {}, $origin.parentNode.removeChild($origin));
            this.$bg = this.$.get(".bg");
            this.$bg.$.onclick = () => this.close();
            this.$body = this.$.get(".body");
            this.$title = this.$body.get(".title");
            this.$titleIcon = this.$title.get(".icon");
            this.$titleText = this.$title.get("h1");
            this.$content  = this.$body.get(".content");
            this.$controller = this.$body.get(".controller");
            this.$buttons = this.$controller.getAll("button").map(($x) => new LyraButton({}, $x));
            this._closeButtonIndex = this.$buttons.findIndex(($x) => $x.hasClass("close"));
            if (this._closeButtonIndex > -1) {
                this.$buttons.splice(this._closeButtonIndex, 0, this.$closeButton);
                this.$buttons = this.$buttons.map(($x) => $x.hasClass("close") ? $x.remove() : $x).filter(($x) => $x);
            };
        } else {
            this.$ = new LyraElement("div", { class: [ "modal" ] });
            this.$bg = new LyraElement("div", { class: [ "bg" ], onclick: () => this.close() }).into(this.$);
            this.$body = new LyraElement("div", { class: [ "body" ] }).into(this.$);
            this.$title = new LyraElement("div", { class: [ "title" ] }).into(this.$body);
            this.$content = new LyraElement("div", { class: [ "content" ] }).into(this.$body);
            this.$controller = new LyraElement("div", { class: [ "controller" ] }).into(this.$body);
            for (const _i in params) {
                if (_i === "bg") {
                    if (params[_i] === "blur") this.$bg.addClass("bg-blur");
                    else if (params[_i] === "acrylic") this.$bg.addClass("bg-acrylic");
                } else if (_i === "icon") {
                    this.$titleIcon = new LyraElement("div", { class: [ "icon", "il", `i-${params[_i]}` ] }).into(this.$title);
                } else if (_i === "title") {
                    this.$titleText = new LyraElement("h1", { text: params[_i] }).into(this.$title);
                } else if (_i === "content") {
                    this.$content.append(params[_i]);
                } else if (_i === "buttons" && params[_i].constructor === Array && params[_i].length > 0) {
                    for (const $btn of params[_i]) {
                        if ($btn.constructor !== LyraButton) continue;
                        this.$buttons.push($btn);
                    };
                } else if (_i === "closeButton" && params[_i]) {
                    this._closeButtonIndex = this.$buttons.push(this.$closeButton) - 1;
                };
            };
            if (typeof params.bg === "undefined") this.$bg.addClass("bg-acrylic");
        };
        if (params && params["z"]) this.$.style["z-index"] = `${params["z"]}`;
        for (const $btn of this.$buttons) {
            $btn.into(this.$controller);
        };
        return this;
    };
    show() {
        this.$.style["pointer-events"] = "auto";
        this.$bg.style["animation-name"] = "ani-fade-in";
        this.$body.style["animation-timing-function"] = "var(--af-sweep-in)";
        this.$body.style["animation-name"] = "ani-window-in";
        this.$.into(__manager.modal.area);
        if (this._closeButtonIndex > -1) {
            this.$buttons[this._closeButtonIndex].focus();
        } else if (this.$buttons.length > 0) {
            this.$buttons[this.$buttons.length - 1].focus();
        } else {
            document.activeElement?.blur();
        };
        return this;
    };
    close() {
        this.$.style["pointer-events"] = "none";
        this.$bg.style["animation-name"] = "ani-fade-out";
        this.$body.style["animation-timing-function"] = "var(--af-sweep-out)";
        this.$body.style["animation-name"] = "ani-window-out";
        setTimeout(() => {
            this.$.revoke();
        }, __lyra.env["WINDOW-ANIMATION-DURATION"] + __lyra.env["ANIMATION-INTERVAL"]);
        return this;
    };
};
class LyraNotification {
    constructor(params = {}, $origin = null) {
        this.$ = null;
        this.$icon = null;
        this.$text = null;
        this.$gauge = new LyraElement("div", { class: [ "gauge" ] });
        this.$buttonArea = new LyraElement("div", { class: [ "button-area" ]});
        this.buttons = [];
        this.$closeButton = new LyraButton({ icon: "deny", onclick: () => this.close() });
        this.options = {
            duration: typeof params["duration"] !== "undefined" ? parseInt(params["duration"]) : parseInt(__lyra.env["DEFAULT-NOTIFICATION-DURATION"]),
            autoShow: typeof params["autoShow"] !== "undefined" ? Boolean(params["autoShow"]) : false,
            autoClose: typeof params["autoClose"] !== "undefined" ? Boolean(params["autoClose"]) : true,
            autoDestroy: typeof params["autoDestroy"] !== "undefined" ? Boolean(params["autoDestroy"]) : true,
            closeButton: typeof params["closeButton"] !== "undefined" ? Boolean(params["closeButton"]) : true,
            timeoutId: null
        };

        if ($origin && $origin.constructor === HTMLDivElement && $origin.classList.contains("notification")) {
            this.$ = new LyraElement(null, {}, $origin.parentNode.removeChild($origin));
            this.$.$.onpointerover = () => {
                if (!this.options["autoClose"]) return;
                this.offTimer();
                this.$.$.onpointerleave = () => {
                    this.onTimer();
                    this.$.$.onpointerleave = null;
                };
            };
            this.$icon = this.$.get(".icon");
            this.$text = this.$.get("p");
            const _rawParams = {
                duration: this.$.$.getAttribute("lyra-duration"),
                autoShow: this.$.$.getAttribute("lyra-autoShow"),
                autoClose: this.$.$.getAttribute("lyra-autoClose"),
                autoDestroy: this.$.$.getAttribute("lyra-autoDestroy"),
                closeButton: this.$.$.getAttribute("lyra-closeButton")
            };
            this.options["duration"] = _rawParams["duration"] !== null ? parseInt(_rawParams["duration"]) : this.options["duration"];
            this.options["autoShow"] = _rawParams["autoShow"] !== null ? (_rawParams["autoShow"] === "true" ? true : false) : this.options["autoShow"];
            this.options["autoClose"] = _rawParams["autoClose"] !== null ? (_rawParams["autoClose"] === "false" ? false : true) : this.options["autoClose"];
            this.options["autoDestroy"] = _rawParams["autoDestroy"] !== null ? (_rawParams["autoDestroy"] === "false" ? false : true) : this.options["autoDestroy"];
            this.options["closeButton"] = _rawParams["closeButton"] !== null ? (_rawParams["closeButton"] === "false" ? false : true) : this.options["closeButton"];
        } else {
            this.$ = new LyraElement("div", {
                class: [ "notification", "bg-acrylic" ],
                onpointerover: () => {
                    if (!this.options["autoClose"]) return;
                    this.offTimer();
                    this.$.$.onpointerleave = () => {
                        this.onTimer();
                        this.$.$.onpointerleave = null;
                    };
                }
            });
            for (const _i in params) {
                if (_i === "icon") this.$icon = new LyraElement("div", { class: [ "icon", "i", `i-${params[_i]}` ] }).into(this.$);
                if (_i === "text") this.$text = new LyraElement("p", { text: params[_i] }).into(this.$);
                if (_i === "buttons") {
                    this.buttons = params[_i];
                };
            };
        };
        if (typeof params["duration"] !== "undefined") this.options["duration"] = parseInt(params["duration"]);
        if (this.options["closeButton"]) this.buttons.push(this.$closeButton);
        if (this.buttons.length > 0) this.$buttonArea.into(this.$);
        for (const $btn of this.buttons) {
            $btn.into(this.$buttonArea);
            $btn.$.addEventListener("click", () => {
                this.close();
            });
        };
        this.$gauge.into(this.$);
        if (this.options["autoShow"]) {
            setTimeout(() => {
                this.show();
            });
        };
        return this;
    };
    show() {
        this.$.style["pointer-events"] = "auto";
        this.$.style["animation-timing-function"] = "var(--af-sweep-in)";
        this.$.style["animation-name"] = "ani-window-in";
        this.$.into(__manager.notification.wrap);
        this.$closeButton.focus();
        if (this.options["autoClose"]) {
            this.onTimer();
            return this;
        };
    };
    close() {
        this.$.style["pointer-events"] = "none";
        this.$.style["animation-timing-function"] = "var(--af-sweep-out)";
        this.$.style["animation-name"] = "ani-window-out";
        if (this.options["autoDestroy"]) {
            setTimeout(() => {
                this.destroy();
            }, __lyra.env["WINDOW-ANIMATION-DURATION"] + __lyra.env["ANIMATION-INTERVAL"]);
        };
        return this;
    };
    destroy() {
        if (this.timeoutId !== null) clearTimeout(this.timeoutId);
        this.$.remove();
        return null;
    };
    onTimer() {
        this.timeoutId = setTimeout(() => {
            this.close();
        }, this.options.duration + __lyra.env["ANIMATION-INTERVAL"]);
        this.$gauge.style["animation"] = `${this.options.duration/1000}s linear ani-notification-gauge both`;
        return this;
    };
    offTimer() {
        if (this.timeoutId) clearTimeout(this.timeoutId);
        this.$gauge.style["animation"] = null;
        return this;
    };
};

(() => {
    document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="${__lyra.dir}/style.css">`);
    if (!Array.from($all("link")).find(($x) => $x.rel === "icon")) {
        document.head.insertAdjacentHTML("beforeend", `<link rel="icon" href="${__lyra.dir}/assets/essentials/favicon.svg" type="image/x-icon">`);
    };
})();
window.addEventListener("error", (e, s) => {
    new LyraModal({ title: "Error", content: new LyraElement("p", { text: `${e.message}\n${e.filename}@${e.lineno}:${e.colno}` }).$, closeButton: true, z: 10001 }).show();
});
document.addEventListener("DOMContentLoaded", () => {
    __manager.modal.area = $append($create("div", { id: "lyra-modal-area" }));
    __manager.window.area = $append($create("div", { id: "lyra-window-area" }));
    __manager.notification.area = $append($create("div", { id: "lyra-notification-area" }));
    __manager.notification.wrap = $append($create("div", { class: [ "wrap" ] }), __manager.notification.area);
    Object.freeze(__manager);
    Object.keys(__manager).forEach((x) => Object.freeze(__manager[x]));
    freeze(__lyra);

    for (const $node of $all(".modal")) {
        if (!$node.id) continue;
        __manager.modal.reserve[$node.id] = new LyraModal({}, $node);
    };
    for (const $node of $all(".notification")) {
        if (!$node.id) continue;
        __manager.notification.reserve[$node] = new LyraNotification({}, $node);
    }
});