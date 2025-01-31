import {
  $, $a
} from "../lyra-module.js";

(() => {
  // 선언부
  const VIEWDIR = `./views`;
  const INITIAL_VIEW = "init";

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
  
  // 해시 링크 처리
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
        const html = new DOMParser().parseFromString(res, "text/html");
        const title = $("title", html);
        const content = $("main", html);

        view.innerHTML = "";

        if (title) {
          view.innerHTML += `<h1 id="title">${title.innerHTML}</h1>`;
        };
        if (content) {
          view.innerHTML += `<div id="content">${content.innerHTML}</div>`;
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
  addEventListener("hashchange", (e) => {
    setView(location.hash);
  });

  // 초기화
  setView(location.hash || INITIAL_VIEW);
})();