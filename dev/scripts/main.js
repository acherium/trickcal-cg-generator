import { initFxWindow } from "../components/window.js";
import { create } from "./utils/domutils.js";
import { wait } from "./utils/miscutils.js";

// 앱 객체 초기화
const app = {
  name: "Project Fornax",
  displayName: "트릭컬 테마극장 생성기",
  description: "모바일 게임 '트릭컬: 리바이브'의 인게임 스토리(테마극장)에서의 대화창 및 CG 씬과 유사한 규격의 이미지를 쉽게 제작하도록 돕는 웹기반 어플리케이션입니다.",
  version: "3000.1",
  date: "26-06-28",
  author: "Acherium",
  contact: "acherium@pm.me",
  idb: {},
  components: {
    ["@components"]: {},
  },
  language: {
    ["@dictionary"]: {},
    current: null,
    supports: [ "ko" ],
  },
  templates: {
    ["@templates"]: {},
  },
  ui: {
    panel: {},
    window: {},
  },
};

// 개발 환경에서는 앱 객체를 노출
if ([ "127.0.0.1", "localhost" ].includes(location.hostname)) {
  window.app = app;
};

// 컴포넌트 초기화
app.components["@components"].window = initFxWindow(app);