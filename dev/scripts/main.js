// Project Equueleus
// Trickcal Theme Theater Generator vNext
// by Acherium (acherium@pm.me)

import { $, append, create } from "./methods.js";
import { lget, lset } from "./local-storage.js";
const root = document.documentElement;
const body = document.body;
const head = document.headt;

(async () => {
  // 마스터 객체
  const app = {
    info: {
      app: {
        name: "Project Equuleus",
        author: "Acherium",
        contact: "acherium@pm.me",
        version: "3000.1",
        date: "25-11-29",
        watermark: true,
      },
      projectFile: {
        type: "Pictor Project File",
        version: 10,
      },
      language: {
        current: "en",
        supports: [ "en", "ko" ],
      },
    },
    dict: {},
  };


  // 로컬 환경에서 마스터 객체를 외부로 노출
  if ([ "127.0.0.1", "localhost" ].includes(location.hostname)) window.app = app;


  // 워터마크 표지
  if (app.info.app.watermark) {
    const $watermark = create("div", { id: "app-watermark" });
    $watermark.innerText =
      `${app.info.app.name}\n` +
      `Build ${app.info.app.version}@${app.info.app.date}`;
    append($watermark, body);
  };


  // 언어 인식
  const browserLanguage = Array.from(navigator.languages).shift();
  if (browserLanguage) {
    const browserLanguageUpper = browserLanguage.split("-")[0].trim();
    if (app.info.language.supports.includes(browserLanguage)) {
      app.info.language.current = browserLanguage;
    } else if (app.info.language.supports.includes(browserLanguageUpper)) {
      app.info.language.current = browserLanguageUpper;
    };
  };

  if (lget("equuleus-settings.language")) {
    const dbLanguage = `${lget("equuleus-settings.language")}`.trim();
    if (dbLanguage) {
      const dbLanguageUpper = dbLanguage.split("-")[0].trim();
      if (app.info.language.supports.includes(dbLanguage)) {
        app.info.language.current = dbLanguage;
      } else if (app.info.language.supports.includes(dbLanguageUpper)) {
        app.info.language.current = dbLanguageUpper;
      };
    };
  };

  lset("equuleus-settings.language", app.info.language.current);


  // 초기 로딩 화면
  const $initLoading = $("#init-loading-screen");
  const $initLoadingProgress = $("#init-loading-progress");
  const $initLoadingDescrpition = $("#init-loading-description");
  const initSteps = 2;
  let completedInitSteps = 0;
  $initLoadingProgress.dataset.max = initSteps;

  /**
   * @returns {number}
   */
  const addInitStep = () => {
    completedInitSteps++;
    $initLoadingProgress.dataset.value = completedInitSteps;
  };


  // --- 언어 초기화
  // 언어 파일 로딩
  /**
   * @param {string} language 
   * @returns {Promise<never>}
   */
  const loadLanguageJSON = async (language) => {
    const json = await fetch(`./locales/${language}.json`).then((response) => response.json());
    app.dict[language] = json;
    return;
  };

  for (const language of app.info.language.supports) await loadLanguageJSON(language);


  // 언어 변환 함수
  /**
   * @param {string} query
   * @param {object | Array<string | number>} [values]
   * @returns {string}
   */
  const t = (query, values) => {
    if (!query || typeof query !== "string") return;
    const tree = query.split(".");

    let obj = app.dict[app.info.language.current];
    let exceptionFlag = false;

    for (const key of tree) {
      if (typeof obj[key] !== "undefined") obj = obj[key];
      else exceptionFlag = true;
    };

    if (exceptionFlag || typeof obj !== "string") return query;

    if (values) {
      let replaced = `${obj}`;

      if (values.constructor === Array) {
        for (const i in values) replaced = replaced.replace(new RegExp(`\\{${i}\\}`, "g"), values[i]);
      } else {
        try {
          for (const key of Object.keys(values)) replaced = replaced.replace(new RegExp(`\\{${key}\\}`, "g"), values[key]);
        } catch(error) {
          return obj;
        };
      };

      return replaced;
    };

    return obj;
  };
  app.t = t;


  // --- 에셋 초기화
  $initLoadingDescrpition.innerText = t("init.assets");
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 500);
  });
  addInitStep();


  // --- 스크립트 초기화
  $initLoadingDescrpition.innerText = t("init.scripts");
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 500);
  });
  addInitStep();

  // 완료
  $initLoadingDescrpition.innerText = t("init.welcome");
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 500);
  });

  $initLoading.style["pointer-events"] = "none";
  $initLoading.animate([
    {
      opacity: 0,
    },
  ], {
    fill: "both",
    duration: 500,
  });
  setTimeout(() => {
    $initLoading.remove();
  }, 530);
})();