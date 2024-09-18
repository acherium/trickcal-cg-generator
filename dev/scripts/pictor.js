import {
  LYRA_NAME, LYRA_AUTHOR, LYRA_VERSION, LYRA_DATE,
  $, $a, create, append
} from "../lyra/lyra-module.js";

(() => {
  // 앱 정보
  const APP = {
    name: "Project Pictor",
    author: "Acherium",
    contact: "acherium@pm.me",
    version: "2000.2",
    date: "24-09-18",
    watermark: true,
    isBeta: true
  };

  // 메뉴 접기/펼치기 기능 초기화
  const menus = $a(".menu");
  let currentMenu = null;
  const tglMenus = $a("button.toggle-menu");
  const btnCloseMenus = $a(".menu button.close");
  for (const tgl of tglMenus) {
    tgl.onclick = () => {
      const target = tgl.dataset.menu;
      const menu = $(`#${target}`);
      if (currentMenu === target) {
        tgl.classList.remove("active");
        menu.style["display"] = "none";
        currentMenu = null;
      } else {
        const prev = Array.from(tglMenus).find((x) => x.dataset.menu === currentMenu);
        if (prev) {
          prev.classList.remove("active");
          $(`#${currentMenu}`).style["display"] = "none";
        };
        tgl.classList.add("active");
        menu.style["display"] = "block";
        currentMenu = target;
      };
    };
  };
  for (const btn of btnCloseMenus) {
    btn.onclick = () => {
      const parent = btn.parentNode.parentElement;
      parent.style["display"] = "none";
      Array.from(tglMenus).find((x) => x.dataset.menu === parent.id)?.classList.remove("active");
      currentMenu = null;
    };
  };

  // 앱 정보 기록
  const aboutApp = $("#about-app");
  const aboutLyra = $("#about-lyra");
  const aboutDesc = $("#about-desc");
  const desc = $("#desc");
  aboutApp.innerText = `${APP.name}\nBuild ${APP.version}@${APP.date}`;
  aboutLyra.innerText = `${LYRA_NAME} by ${LYRA_AUTHOR}\nBuild ${LYRA_VERSION}@${LYRA_DATE}`;
  aboutDesc.innerText = desc.content;

  // 워터마크
  if (APP.watermark) {
    append(create("div", {
      id: "watermark",
      properties: {
        innerText: `${APP.name}\nBuild ${APP.version}@${APP.date}` +
          `${APP.isBeta ? "\n개발 테스트 빌드입니다. 기능이 불안정할 수 있습니다." : ""}`
      }
    }));
  };
})();