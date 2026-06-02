import {
  $, $a, create, append,
  time, now,
  LyraStateManager,
  LYRA_NAME, LYRA_AUTHOR, LYRA_CONTACT, LYRA_VERSION, LYRA_DATE
} from "../lyra-module.js";

(() => {
  // 선언부
  const VIEWDIR = `./views`;
  const INITIAL_VIEW = "main";

  // 표현식 값
  const EXPRESSIONS = {
    "app": () => LYRA_NAME,
    "author": () => LYRA_AUTHOR,
    "contact": () => LYRA_CONTACT,
    "version": () => LYRA_VERSION,
    "verdate": () => LYRA_DATE,
    "now": () => now(),
    "date": () => now("YYYY-MM-DD"),
    "time": () => now("HH:mm:ss"),
    "time12": () => now("hh:mm:ss A"),
    "time24": () => now("HH:mm:ss"),
    "datetime": () => now("YYYY-MM-DD HH:mm:ss"),
    "datetime12": () => now("YYYY-MM-DD hh:mm:ss A"),
    "datetime24": () => now("YYYY-MM-DD HH:mm:ss"),
    "YYYY": () => now("YYYY"),
    "MM": () => now("MM"),
    "DD": () => now("DD"),
    "HH": () => now("HH"),
    "H": () => now("H"),
    "hh": () => now("hh"),
    "h": () => now("h"),
    "mm": () => now("mm"),
    "m": () => now("m"),
    "ss": () => now("ss"),
    "s": () => now("s"),
    "i": () => now("i"),
    "A": () => now("A")
  };

  // 모바일 메뉴 토글 기능
  const btnMenu = $("#button-menu");
  const menu = $("#menu");
  btnMenu.onclick = () => {
    if (menu.classList.contains("show")) {
      menu.classList.remove("show");
    } else {
      menu.classList.add("show");
    };
  };
  for (const node of $a("a", menu)) {
    node.addEventListener("click", () => {
      menu.classList.remove("show");
    });
  };

  // 뷰 처리
  const view = $("article > .wrap");
  const setView = (s) => {
    s = s.replace(/#/g, "") || INITIAL_VIEW;
    view.innerHTML = `<div class="loading"><div></div><div></div><div></div></div>`;

    fetch(`${VIEWDIR}/${s}.html`).then((res) => {
      if (res.status === 200) {
        return res.text();
      } else {
        return res;
      };
    }).then((res) => {
      if (typeof res === "string") {
        for (const exp of Object.keys(EXPRESSIONS)) {
          res = res.replace(new RegExp(`%${exp}%`, "g"), EXPRESSIONS[exp]());
        };
        view.textContent = "";
        view.insertAdjacentHTML("beforeend", res);

        for (const node of $a("img:not([nofig])", view)) {
          if (node.parentNode.nodeName !== "FIGURE") {
            const fig = create("figure");
            node.parentNode.insertBefore(fig, node);
            append(node, fig);

            if (node.getAttribute("nocaption") === null) {
              const caption = node.getAttribute("caption") || node.alt;
              if (caption) {
                const figcaption = create("figcaption", { properties: { innerText: caption } });
                append(figcaption, fig);
              };
            };
          };
        };

        for (const img of $a("img:not([noanchor])", view)) {
          if (img.parentNode.nodeName !== "A") {
            const anchor = create("a", { properties: { href: img.src, target: "_blank" } });
            img.parentNode.insertBefore(anchor, img);
            append(img, anchor);
          };
        };
      } else {
        view.innerHTML = `<h1 id="title">문제가 발생했습니다</h1>` +
          `<div id="content"><p>문제 종류: ${res.status} ${res.statusText}</p></div>`;
      };
    });

    for (const node of $a("a", menu)) {
      node.classList.remove("active");
    };
    for (const node of $a(`a[href="#${s}"]`, menu)) {
      node.classList.add("active");
    };
  };
  
  // 해시 링크, 뷰 처리
  addEventListener("hashchange", (e) => {
    setView(location.hash);
  });

  // 초기화
  const copyYear = $("#copy-year");
  const copyAuthor = $("#copy-author");
  setView(location.hash || INITIAL_VIEW);
  copyYear.innerText = now("YYYY");
  copyAuthor.innerText = LYRA_AUTHOR;
})();