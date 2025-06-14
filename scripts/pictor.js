import {
  LYRA_NAME, LYRA_AUTHOR, LYRA_VERSION, LYRA_DATE,
  body, $, $a, create, append, copy, revoke,
  LyraButton, LyraModal, LyraModalManager, LyraNotification, LyraNotificationManager, LyraWindowManager,
  COMMON_INTERVAL, ANIMATION_INTERVAL,
} from "../lyra/lyra-module.js";

(() => {
  // 앱 정보
  const APP = {
    name: "Pictor",
    author: "Acherium",
    contact: "acherium@pm.me",
    version: "2053.4h",
    date: "25-06-15",
    docType: "Pictor Project File",
    docVersion: 9,
    watermark: false,
    isBeta: false
  };

  // 메뉴 접기/펼치기 기능 초기화
  let currentMenu = null;
  const menuzone = $("#menuzone");
  const tglMenus = $a("button.toggle-menu");
  const btnCloseMenus = $a(".menu button.close");
  const btnsSavePNGOnmenu = $a(".button-download-onmenu");
  const btnAbout = $("#button-about");
  const btnSaveFileOnmenu = $("#button-save-file-onmenu");
  const btnOpenFileOnmenu = $("#button-open-file-onmenu");
  const toggleMenu = (s) => {
    const target = $(`#${s}.menu`);
    if (!target) return;
    const targetBtns = Array.from(tglMenus).filter((x) => x.dataset.menu === s);
    if (currentMenu === s) {
      for (const btn of targetBtns) btn.classList.remove("active");
      target.style["display"] = "none";
      menuzone.style["display"] = "none";
      currentMenu = null;
    } else {
      const prevBtns = Array.from(tglMenus).filter((x) => x.dataset.menu === currentMenu);
      if (prevBtns.length) {
        for (const btn of prevBtns) btn.classList.remove("active");
        $(`#${currentMenu}.menu`).style["display"] = "none";
      };
      for (const btn of targetBtns) btn.classList.add("active");
      target.style["display"] = "flex";
      menuzone.style["display"] = "flex";
      currentMenu = s;
    };
  };
  for (const btn of tglMenus) {
    btn.onclick = () => {
      toggleMenu(btn.dataset.menu);
    };
  };
  for (const btn of btnCloseMenus) {
    btn.onclick = () => {
      const parent = btn.parentNode.parentNode;
      toggleMenu(parent.id);
    };
  };
  for (const btn of btnsSavePNGOnmenu) {
    btn.onclick = () => {
      btnSavePNG.click();
    };
  };
  btnAbout.onclick = () => {
    modalman.reserve["modal-about"].show();
  };
  btnSaveFileOnmenu.onclick = () => {
    btnSaveFile.click();
  };
  btnOpenFileOnmenu.onclick = () => {
    btnOpenFile.click();
  };

  // 앱 정보 기록
  const aboutApp = $a(".about-app");
  const aboutLyra = $a(".about-lyra");
  const aboutDesc = $a(".about-desc");
  const desc = $("#desc");
  for (const p of aboutApp) {
    p.innerText = `${APP.name}\nBuild ${APP.version}@${APP.date}`;
  };
  for (const p of aboutLyra) {
    p.innerText = `${LYRA_NAME} by ${LYRA_AUTHOR}\nBuild ${LYRA_VERSION}@${LYRA_DATE}`;
  };
  for (const p of aboutDesc) {
    p.innerText = desc.content;
  };

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

  // 선언부
  // 상수 선언
  // 공통 상수
  const SIZEMIN = 32;
  const WIDTHMIN = 1000;
  const HEIGHTMIN = 510;
  const WIDTHMAX = 2000;
  const HEIGHTMAX = 2000;
  const RATIOCHECKER = 1000;
  const THUMBNAIL_QUEUE_INTERVAL = 3000;
  const SCALEMIN = 0.2;
  const SCALEMAX = 2;
  const SCALESTEPS = 0.2;
  const OPACITYMIN = 0;
  const OPACITYMAX = 100;
  const DEFAULT_NAMEAREA_PALETTE_PRESET = "버터";
  const SPLASH_TIMEOUT = 10000;
  const SPLASH_TIMEOUT_ANIMATION_DURATION = 500;
  const CONTEXT_MENU_ANIMATION_DURATION = 200;
  const CONTEXT_MENU_AREA_INNER_PADDING = 8;
  const REGULATION_LINK = "https://epidgames.oqupie.com/portal/2399/article/73315";
  const INITIAL = "TTG";

  // 2차 창작 규정
  const regulationLinks = $a(".regulation-link");
  for (const a of regulationLinks) {
    a.href = REGULATION_LINK;
  };

  // 데이터 템플릿
  const SLIDE_TEMPLATE = {
    strings: {
      name: "버터",
      content: "나오라고.",
      contentRaw: "나오라고.",
      select: [
        "선택 1",
        "선택 2",
        "선택 3"
      ],
      location: "대충 망한 요정 마을",
      title: {
        name: "에피소드 1",
        content: "에피소드 제목"
      }
    },
    assets: {
      background: "",
      thumbnail: "",
      objects: []
    },
    assetOptions: {
      scriptbox: {
        theme: 0
      },
      namearea: {
        pos: 1,
        emotion: "none",
        reservedPreset: null
      },
      select: {
        theme: 0
      }
    },
    area: {
      width: 1280,
      height: 640
    },
    scriptbox: {
      style: 0,
      sokmaeum: 0,
      pos: 7,
      opacity: 100
    },
    values: {
      backgroundFit: "align-center",
      type: 1
    },
    color: {
      namearea: {
        r: 238,
        g: 195,
        b: 117,
        a: 100
      },
      background: {
        r: 0,
        g: 0,
        b: 0,
        a: 100
      },
      overlay: {
        r: 0,
        g: 0,
        b: 0,
        a: 0
      }
    },
    toggles: {
      title: false,
      location: false,
      namearea: true,
      content: true,
      select: false,
      photoButtons: true,
      boxCenter: false,
      backgroundImage: true,
      borderVignetting: true,
      borderVignettingHorizontal: true,
      borderVignettingVertical: false
    },
    thumbnail: ""
  };
  const OBJECT_TEMPLATE = {
    version: 7,
    uid: null,
    name: null,
    type: null,
    id: null,
    class: [],
    sort: null,
    assets: {
      body: null,
      label: null,
      image: null,
      data: {}
    },
    rect: {
      x: null,
      y: null,
      width: null,
      height: null,
      rotate: null,
      flip: {
        horizontal: null,
        vertical: null
      }
    },
    rectOrigin: {
      x: null,
      y: null,
      width: null,
      height: null,
      rotate: null,
      flip: {
        horizontal: null,
        vertical: null
      }
    },
    flags: {
      visible: null,
      darker: null,
      sizeAdjustable: null,
      movable: null
    },
    additionalMethod: null,
    opacity: null
  };
  const BG_FIT_OPTIONS = [ "align-center", "fit-height", "fit-width", "fill" ];
  const SCRIPT_MARKDOWN = [
    [ /\\/g, "" ],
    [ /</g, "&lt;" ],
    [ />/g, "&gt;" ],
    [ /(\(\(\()/g, "<span class=\"tm-s\">" ],
    [ /({{{)/g, "<span class=\"tm-m\">" ],
    [ /(\[\[\[)/g, "<span class=\"tm-b\">" ],
    [ /(&gt;&gt;&gt;)/g, "<span class=\"tm-cg\">" ],
    [ /(&gt;&gt;r&gt;&gt;)/g, "<span class=\"tm-cr\">" ],
    [ /(&gt;&gt;g&gt;&gt;)/g, "<span class=\"tm-cg\">" ],
    [ /(&gt;&gt;b&gt;&gt;)/g, "<span class=\"tm-cb\">" ],
    [ /(&gt;&gt;y&gt;&gt;)/g, "<span class=\"tm-cy\">" ],
    [ /(&gt;&gt;p&gt;&gt;)/g, "<span class=\"tm-cp\">" ],
    [ /([\n\r]){1,2}/g, "<br>" ],
    [ /(\:\:\:)/g, "</span>" ]
  ];
  const EMOTE_STICKERS = {
    "angry": "화남",
    "drop": "당황",
    "embarrassed": "실망",
    "good": "따봉",
    "love": "좋음",
    "question": "물음",
    "sparkle": "번뜩",
    "surprise": "놀람"
  };
  const EMOTE_STICKERS_REVAMPED = {
    "0-surprise": "느낌표",
    "1-question": "물음표",
    "2-surprise2a": "들뜸",
    "4-startle": "놀람",
    "5-sparkle": '반짝',
    "6-angry": "화남",
    "7-stun": "충격",
    "8-sweat": "땀",
    "9-dizzy": "어지러움",
    "10-star": "별",
    "11-silence": "침묵",
    "12-embarrassed": "당황",
    "13-sigh": "한숨",
    "14-panic": "공황",
    "15-disappoint": "실망",
    "16-idea": "아이디어"
  };
  const FILTER_NAMES = {
    "cinemascope": "시네마스코프 레터박스"
  };

  // 변수 선언
  // 쇼 데이터
  let show = {
    version: APP.docVersion,
    name: "무제",
    lastSlide: 0,
    lastUpdate: null
  };
  
  // 키보드 이벤트 처리
  const keys = {};
  document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
  });
  document.addEventListener("keyup", (e) => {
    if (keys[e.key]) delete keys[e.key];
  });
  
  // 공통 설정 처리
  const notiman = new LyraNotificationManager();
  const comOpsOrigin = {
    flags: {
      toggleWatermark: false
    },
    values: {
      watermarkString: "워터마크 내용",
      watermarkPosition: "0"
    }
  };
  const comOps = copy(comOpsOrigin);
  const comOpControlNodes = {
    flags: {},
    values: {}
  };
  const getComOps = () => {
    return JSON.parse(window.localStorage.getItem("option"));
  };
  const saveComOps = (alert = true, data = comOps) => {
    const res = JSON.stringify(data);
    window.localStorage.setItem("option", res);
    if (alert) {
      new LyraNotification({
        icon: "export",
        text: "공통 설정을 저장했습니다."
      }).show();
    };
  };
  const initComOps = () => {
    if (getComOps() === null) {
      saveComOps(false);
    };
    const res = getComOps();
    for (const key of Object.keys(comOps.flags)) {
      if (res.flags !== undefined && res.flags[key] !== undefined && res.flags[key] !== null) comOps.flags[key] = res.flags[key];
    };
    for (const key of Object.keys(comOps.values)) {
      if (res.values !== undefined && res.values[key] !== undefined && res.values[key] !== null) comOps.values[key] = res.values[key];
    };
    saveComOps(false);
  };
  initComOps();
  const tglsComOp = $a(".common-option-toggle");
  const inputsComOp = $a(".common-option-input");
  const btnSaveComOps = $("#button-save-common-option");
  const btnResetComOps = $("#button-reset-common-option");
  comOpControlNodes.flags = Object.fromEntries(Array.from(tglsComOp).map((x) => [ x.dataset.connectedOption, x ]));
  comOpControlNodes.values = Object.fromEntries(Array.from(inputsComOp).map((x) => [ x.dataset.connectedOption, x ]));
  for (const key of Object.keys(comOpControlNodes.flags)) {
    const node = comOpControlNodes.flags[key];
    node.onchange = (e) => {
      comOps.flags[key] = e.target.checked;
      saveComOps(false);
    };
    node.checked = comOps.flags[key];
  };
  for (const key of Object.keys(comOpControlNodes.values)) {
    const node = comOpControlNodes.values[key];
    node.onchange = (e) => {
      comOps.values[key] = e.target.value;
      saveComOps(false);
    };
    node.value = comOps.values[key];
  };
  btnSaveComOps.onclick = () => {
    saveComOps();
  };
  btnResetComOps.onclick = () => {
    saveComOps(false, comOpsOrigin);
    new LyraNotification({
      icon: "export",
      text: "초기화된 설정 값을 적용하려면 현재 페이지를 새로고침하세요.",
      autoClose: false,
      buttons: [
        new LyraButton({
          icon: "clockwise",
          text: "새로고침",
          events: {
            click: () => location.reload()
          }
        })
      ]
    }).show();
  };

  // 공통 설정 초기화
  const watermarkArea = $("#photo-watermark");
  const watermarks = $a(".photo-watermark-text");
  const chkTglWatermark = $("#checkbox-toggle-watermark");
  const inputWatermark = $("#input-watermark");
  const selWatermarkPos = $("#select-watermark-position");
  chkTglWatermark.addEventListener("change", (e) => {
    watermarkArea.style["display"] = e.target.checked ? null : "none";
  });
  inputWatermark.addEventListener("input", () => {
    for (const node of watermarks) {
      node.innerText = inputWatermark.value;
    };
  });
  selWatermarkPos.addEventListener("change", (e) => {
    watermarkArea.className = `p${e.target.value}`;
  });
  watermarkArea.style["display"] = comOps.flags.toggleWatermark ? null : "none";
  watermarkArea.className = `p${comOps.values.watermarkPosition}`;
  for (const node of watermarks) {
    node.innerText = comOps.values.watermarkString;
  };

  // 슬라이드 데이터
  let slide = [];
  let current = 0;

  // 공통 변수/플래그
  let scale = 1;
  let uniqueInt = 0;
  let multiplier = 2;
  let flagMobileMenu = null;
  let flagThumbnail = true;

  // 관리자 객체
  const areaRect = {
    x: 0,
    y: 0
  };
  const objManager = {
    rect: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    selected: null,
    current: {}
  };
  const touchManager = {
    x: 0,
    y: 0
  };

  // 워터마크 수정 여부 체크
  const chkWatermarkOrigin = $("#photo-tcag-watermark");
  const cwsOrigin = {
    "display": "block",
    "position": "absolute",
    "visibility": "visible",
    "overflow": "visible",
    "left": "10px",
    "top": "10px",
    "z-index": "9000",
    "width": "50px",
    "height": "50px",
    "background-image": `url("https://acherium.github.io/trickcal-cg-generator/assets/essentials/watermark.svg")`,
    "background-image-alt": `url("https://127.0.0.1:5500/assets/essentials/watermark.svg")`,
    "background-position": "50% 50%",
    "background-size": "80%",
    "background-repeat": "no-repeat",
    "opacity": "0.05",
    "animation-webkit": "0s ease 0s 1 normal none running none"
  };
  const parityChk = () => {
    return true;
    const chkWatermark = $("#photo-tcag-watermark");
    if (!chkWatermark) {
      callHalt("워터마크 요소가 삭제되었거나 찾을 수 없습니다.");
      return false;
    };
    const cws = getComputedStyle(chkWatermark);
    if (
      cws["display"] !== cwsOrigin["display"] ||
      cws["position"] !== cwsOrigin["position"] ||
      cws["visibility"] !== cwsOrigin["visibility"] ||
      cws["overflow"] !== cwsOrigin["overflow"] ||
      cws["margin"] !== "0px" ||
      cws["padding"] !== "0px" ||
      cws["left"] !== cwsOrigin["left"] ||
      cws["top"] !== cwsOrigin["top"] ||
      cws["right"] !== "0px" ||
      cws["bottom"] !== "0px" ||
      cws["z-index"] !== cwsOrigin["z-index"] ||
      cws["width"] !== cwsOrigin["width"] ||
      cws["height"] !== cwsOrigin["height"] ||
      (cws["background-image"] !== cwsOrigin["background-image"] && cws["background-image"] !== cwsOrigin["background-image-alt"]) ||
      cws["background-position"] !== cwsOrigin["background-position"] ||
      cws["background-size"] !== cwsOrigin["background-size"] ||
      cws["background-repeat"] !== cwsOrigin["background-repeat"] ||
      cws["opacity"] !== cwsOrigin["opacity"] ||
      cws["transform"] !== "none" ||
      cws["filter"] !== "none" ||
      (cws["animation"] !== "none" && cws["animation"] !== cwsOrigin["animation-webkit"])
    ) {
      callHalt("워터마크 요소의 속성이 훼손되었습니다.");
      return false;
    } else {
      return true;
    };
  };
  const callHalt = (reason) => {
    body.innerHTML = "";
    append(create("div", {
      id: "parity-check-failed",
      properties: {
        innerHTML: `<div class="wrap">` +
          `<h1>웹사이트가 수정되었거나<br>올바르게 불러오지 못했습니다.</h1>` +
          ( (typeof reason !== "undefined" && reason.constructor === String && reason.length > 0) ? `<p><strong>사유: ${reason}</strong></p>` : "" ) +
          `<p>계속하려면 새로고침하세요.<br>작업 중인 내용이 모두 초기화됩니다.</p>` +
          `<p>작동이 중지되었습니다.</p>` +
          `</div>`
      }
    }));
  };

  // 기능부
  // 기본 함수 선언
  const INTtoHEX = (i) => {
    let res = i.toString(16).toUpperCase();
    res = res.length === 1 ? `0${res}` : res;
    return res;
  };
  const RGBtoHEX = (rgb) => {
    let r = rgb.r.toString(16).toUpperCase();
    let g = rgb.g.toString(16).toUpperCase();
    let b = rgb.b.toString(16).toUpperCase();
    r = r.length === 1 ? `0${r}` : r;
    g = g.length === 1 ? `0${g}` : g;
    b = b.length === 1 ? `0${b}` : b;
    return `${r}${g}${b}`;
  };
  const RGBAtoHEX = (rgba) => {
    let r = rgba.r.toString(16).toUpperCase();
    let g = rgba.g.toString(16).toUpperCase();
    let b = rgba.b.toString(16).toUpperCase();
    let a = Math.floor(rgba.a/100*255).toString(16).toUpperCase();
    r = r.length === 1 ? `0${r}` : r;
    g = g.length === 1 ? `0${g}` : g;
    b = b.length === 1 ? `0${b}` : b;
    a = a.length === 1 ? `0${a}` : a;
    return `${r}${g}${b}${a}`;
  };
  const HEXtoRGB = (hex) => {
    const r = Number(`0x${hex.substring(0, 2)}`);
    const g = Number(`0x${hex.substring(2, 4)}`);
    const b = Number(`0x${hex.substring(4, 6)}`);
    return { r: r, g: g, b: b };
  };
  const getMarkdownContent = (str) => {
    for (const regxp of SCRIPT_MARKDOWN) str = str.replace(regxp[0], regxp[1]);
    return str;
  };
  const exportPNG = (node, scale = multiplier) => {
    chkWatermarkOrigin.style["opacity"] = null;
    if (!parityChk()) return;
    html2canvas(node, {
      scale: scale,
      backgroundColor: null,
      logging: false,
      onclone: (doc) => {
        $("#scale-layer", doc).style["transform"] = "scale(1)";
      }
    }).then((c) => {
      const l = document.createElement("a");
      const d = Date.now();
      const filename = `${INITIAL}-${d}.png`;
      document.body.append(l);
      l.href = c.toDataURL("image/png");
      l.download = filename;
      l.click();
      l.remove();
      alertDownload.style["display"] = "none";
      chkWatermarkOrigin.style["opacity"] = "0";
    });
  };
  const setRange = (node, i) => {
    node.value = i;
    if (node.parentNode.tagName === "LABEL") {
      const min = parseInt(node.min);
      const max = parseInt(node.max);
      const per = i / max * 100;
      const gauge = $(".gauge", node.parentNode);
      gauge.style["width"] = `${per}%`;
    };
  };

  // 파일 업로더
  const uploader = $("#uploader");
  const bgUploader = $("#bg-uploader");
  const imageUploader = $("#image-uploader");
  const imageFetcher = $("#image-fetcher");
  const projUploader = $("#project-uploader");
  bgUploader.onchange = (f) => {
    const file = f.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBackground(reader.result);
      bgUploader.value = null;

      const _$res = new Image();
      _$res.src = reader.result;
      _$res.onload = () => {
        const ratioRes = Math.floor(_$res.width / _$res.height * RATIOCHECKER) / RATIOCHECKER;
        const ratioArea = Math.floor(slide[current].area.width / slide[current].area.height * RATIOCHECKER) / RATIOCHECKER;
        if (ratioRes !== ratioArea) {
          new LyraNotification({
            icon: "notification",
            text: "슬라이드의 비율과 배경으로 설정한 이미지의 비율이 맞지 않습니다.\n슬라이드 비율을 이미지에 맞추시겠습니까?",
            buttons: [
              new LyraButton({
                icon: "arrow-e",
                text: "이미지 비율에 맞춤",
                events: {
                  click: () => btnFitToBg.click()
                }
              })
            ]
          }).show();
        } else if ((ratioRes === ratioArea || _$res.width !== slide[current].area.width) && slide[current].values.backgroundFit !== "fill") {
          new LyraNotification({
            icon: "notification",
            text: "슬라이드의 크기와 배경으로 설정한 이미지의 크기가 맞지 않습니다.\n슬라이드 크기를 이미지에 맞추시겠습니까?",
            buttons: [
              new LyraButton({
                icon: "arrow-e",
                text: "이미지 비율에 맞춤",
                events: {
                  click: () => btnFitToBg.click()
                }
              })
            ]
          }).show();
        };
      };

    };
  };
  imageUploader.onchange = (f) => {
    imageUploader.multiple = null;
    Array.from(f.target.files).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const $img = new Image();
        $img.src = reader.result;
        $img.onload = () => {
          addObject(current, "image", { name: file.name, image: $img });
          refreshThumbnail(current, photozone);
        };
      };
    });
  };
  projUploader.onchange = (f) => {
    const file = f.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      if (file.type !== "application/json") {
        new LyraNotification({ icon: "warning", text: "파일이 올바른 JSON 파일이 아닙니다." }).show();
        return;
      };
      const res = JSON.parse(reader.result);
      if (typeof res !== "object" || typeof res.info !== "object" || typeof res.data !== "object" || res.info.type !== APP.docType) {
        new LyraNotification({ icon: "warning", text: "파일이 올바른 프로젝트 파일이 아닙니다." }).show();
        return;
      };
      if (res.info.version !== APP.docVersion) {
        new LyraNotification({ icon: "warning", text: "파일 버전이 호환되지 않아 파일을 불러올 수 없습니다." }).show();
        return;
      };
      
      if (typeof res.data.show === "object" &&
        typeof res.data.show.version === "number" &&
        typeof res.data.show.name === "string" &&
        typeof res.data.show.lastSlide === "number") {
        show = res.data.show;
        setDocName(show.name);
        new LyraNotification({
          icon: "import",
          text: "문서 정보를 성공적으로 불러왔습니다."
        }).show();
        if (typeof res.data.slide === "object" || res.data.slide.constructor === Array) {
          slide = res.data.slide;
          setSlide(show.lastSlide);
          new LyraNotification({
            icon: "import",
            text: "슬라이드 정보를 성공적으로 불러왔습니다."
          }).show();
        };
      } else {
        new LyraNotification({
          icon: "warning",
          text: "불러올 문서가 없습니다."
        }).show();
      };
    };
  };

  // 배경 조작 기능
  const photozone = $("#photozone");
  const bg = $("#photo-bg");
  const selBgFit = $("#select-bg-fit");
  const btnColpicBg = $("#button-modal-colorpicker-bg");
  const colpicBgPrev = $("#colorpicker-bg .colorpicker-preview");
  const colpicBgPrevVal = $("#colorpicker-bg .colorpicker-preview-value");
  const colpicBgRanges = $a("#colorpicker-bg .colorpicker-range-input");
  const colpicBgInputs = $a("#colorpicker-bg .colorpicker-input");
  const btnBgSet = $("#button-set-bg");
  const btnBgRemove = $("#button-remove-bg");
  const setBackground = (f) => {
    slide[current].assets.background = f;
    bg.src = f || "";
    refreshThumbnail(current, photozone);
    if (slide[current].toggles.backgroundImage) {
      if (f) {
        bg.style["display"] = null;
      } else {
        bg.style["display"] = "none";
      };
    } else {
      bg.style["display"] = "none";
    };
  };
  const setBackgroundFit = (s) => {
    if (!BG_FIT_OPTIONS.includes(s)) return;
    slide[current].values.backgroundFit = s;
    bg.className = `photo-bg-${s}`;
    Array.from(selBgFit.querySelectorAll("option")).find((n) => n.value === slide[current].values.backgroundFit).selected = true;
  };
  const setBackgroundColor = (rgb) => {
    slide[current].color.background = rgb;
    const hex = RGBtoHEX(rgb);
    photozone.style["background-color"] = `#${hex}`;
    colpicBgPrev.style["background-color"] = `#${hex}`;
    colpicBgPrev.style["border-color"] = `#${hex}`;
    colpicBgPrevVal.innerText = `#${hex}\n${Object.values(rgb).join(", ")}`;
    for (const range of colpicBgRanges) {
      const type = range.className.toString().split(/ +/g)[1].trim();
      // range.value = `${rgb[type]}`;
      setRange(range, rgb[type]);
    };
    Array.from(colpicBgInputs).forEach((n, i) => {
      n.value = Object.values(rgb)[i];
    });
  };
  const setBackgroundColorRGBA = (rgba) => {
    slide[current].color.background = rgba;
    const hex = RGBAtoHEX(rgba);
    const col = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a/100})`;
    const afix = copy(rgba);
    afix.a /= 100;
    photozone.style["background-color"] = col;
    colpicBgPrev.style["background-color"] = col;
    colpicBgPrev.style["border-color"] = col;
    colpicBgPrevVal.innerText = `#${hex}\n${Object.values(afix).join(", ")}`;
    for (const range of colpicBgRanges) {
      const type = range.className.toString().split(/ +/g)[1].trim();
      setRange(range, rgba[type]);
    };
    Array.from(colpicBgInputs).forEach((n, i) => {
      n.value = Object.values(rgba)[i];
    });
  };
  btnColpicBg.onclick = () => {
    modalman.reserve["modal-colorpicker-bg"].show();
  };
  colpicBgRanges.forEach((range, i) => {
    range.oninput = (e) => {
        const type = range.className.toString().split(/ +/g)[1].trim();
        const newcol = copy(slide[current].color.background);
        newcol[type] = parseInt(e.target.value);
        setBackgroundColorRGBA(newcol);
    };
  });
  colpicBgInputs.forEach((input, i) => {
    input.onchange = (c) => {
      const rgba = Object.values(slide[current].color.background);
      let v = parseInt(c.target.value);
      if (input.classList.contains("colorpicker-input-a")) v = Number.isNaN(v) ? 0 : v < 0 ? 0 : v > 100 ? 100 : v;
      else v = Number.isNaN(v) ? 0 : v < 0 ? 0 : v > 255 ? 255 : v;
      rgba[i] = v;
      setBackgroundColorRGBA(Object.fromEntries(rgba.map((x, j) => x = [ [ "r", "g", "b", "a" ][j], x ])));
    };
  });
  btnBgSet.onclick = () => {
    bgUploader.value = null;
    bgUploader.click();
  };
  btnBgRemove.onclick = () => {
    slide[current].assets.background = "";
    bgUploader.value = null;
    bg.src = "";
    refreshThumbnail(current, photozone);
  };

  // 배경 오버레이 조작 기능
  const ov = $("#photo-overlay-bg");
  const btnColpicOv = $("#button-modal-colorpicker-overlay");
  const colpicOvPrev = $("#colorpicker-overlay .colorpicker-preview");
  const colpicOvPrevVal = $("#colorpicker-overlay .colorpicker-preview-value");
  const colpicOvRanges = $a("#colorpicker-overlay .colorpicker-range-input");
  const colpicOvInputs = $a("#colorpicker-overlay .colorpicker-input");
  const setOverlayColorRGBA = (rgba) => {
    slide[current].color.overlay = rgba;
    const hex = RGBAtoHEX(rgba);
    const col = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a/100})`;
    const afix = copy(rgba);
    afix.a /= 100;
    ov.style["background-color"] = col;
    colpicOvPrev.style["background-color"] = col;
    colpicOvPrev.style["border-color"] = col;
    colpicOvPrevVal.innerText = `#${hex}\n${Object.values(afix).join(", ")}`;
    for (const range of colpicOvRanges) {
      const type = range.className.toString().split(/ +/g)[1].trim();
      setRange(range, rgba[type]);
    };
    Array.from(colpicOvInputs).forEach((n, i) => {
      n.value = Object.values(rgba)[i];
    });
  };
  btnColpicOv.onclick = () => {
    modalman.reserve["modal-colorpicker-overlay"].show();
  };
  colpicOvRanges.forEach((range, i) => {
    range.oninput = (e) => {
        const type = range.className.toString().split(/ +/g)[1].trim();
        const newcol = copy(slide[current].color.overlay);
        newcol[type] = parseInt(e.target.value);
        setOverlayColorRGBA(newcol);
    };
  });
  colpicOvInputs.forEach((input, i) => {
    input.onchange = (c) => {
      const rgba = Object.values(slide[current].color.overlay);
      let v = parseInt(c.target.value);
      if (input.classList.contains("colorpicker-input-a")) v = Number.isNaN(v) ? 0 : v < 0 ? 0 : v > 100 ? 100 : v;
      else v = Number.isNaN(v) ? 0 : v < 0 ? 0 : v > 255 ? 255 : v;
      rgba[i] = v;
      setOverlayColorRGBA(Object.fromEntries(rgba.map((x, j) => x = [ [ "r", "g", "b", "a" ][j], x ])));
    };
  });

  // 대화창 기본 조작 기능
  const radTypes = $a("#script-box-type input[type=radio]");
  const conts0 = $a(".content-type-0");
  const conts1 = $a(".content-type-1");
  const sboxAreas = $a("#photo-script-box-area-revamped .area");
  const selSboxTheme = $("#select-scriptbox-theme");
  const sboxAlphaRange = $("#range-scriptbox-opacity");
  const sboxes = $a("#photo-script-box-area-revamped, #photo-script-box-area");
  const setType = (i) => {
    if (i === 0) {
      slide[current].values.type = i;
      for (const n of conts0) n.classList.remove("force-hide");
      for (const n of conts1) n.classList.add("force-hide");
      radTypes[0].checked = true;
    } else if (i === 1) {
      slide[current].values.type = i;
      for (const n of conts0) n.classList.add("force-hide");
      for (const n of conts1) n.classList.remove("force-hide");
      radTypes[1].checked = true;
    };
  };
  const setTheme = (i) => {
    i = parseInt(i);
    if (i >= 0 && i < sboxAreas.length) {
      slide[current].assetOptions.scriptbox.theme = i;
      const target = Array.from(sboxAreas).find((n) => n.id === `theme-${i}`);
      const outsiders = Array.from(sboxAreas).filter((n) => n !== target);
      for (const n of outsiders) n.style["display"] = "none";
      target.style["display"] = "grid";
      target.parentElement.dataset.theme = i;
      Array.from(selSboxTheme.querySelectorAll("option")).find((n) => n.value === `${i}`).selected = true;
    };
  };
  const setBoxOpacity = (i) => {
    i = (i > OPACITYMAX) ? OPACITYMAX : (i < OPACITYMIN) ? OPACITYMIN : i;
    slide[current].scriptbox.opacity = i;
    sboxes.forEach((node) => {
      node.style["opacity"] = `${i/100}`;
    });
    setRange(sboxAlphaRange, i);
  };
  radTypes.forEach((radio) => {
    radio.onclick = () => setType(parseInt(radio.value));
  });
  sboxAreas.forEach((data, i) => {
    const option = create("option", { properties: { value: `${i}`, innerText: data.dataset.themeName } });
    append(option, selSboxTheme);
  });
  selSboxTheme.onchange = (c) => {
    setTheme(parseInt(c.target.value));
    refreshThumbnail(current, photozone);
  };
  sboxAlphaRange.oninput = (c) => {
    setBoxOpacity(parseInt(c.target.value));
  };

  // 대화창 기본 조작 기능(구형)
  const rabSboxPos = $a("#script-box-position input[type=radio]");
  const rabSboxStyle = $a("#script-box-style input[type=radio]");
  const rabSokStyle = $a("#script-sokmaeum-style input[type=radio]");
  const contArea = $("#photo-script-box-area");
  const sbox = {
    shadow: $("#photo-script-box > .shadow"),
    bg: $("#photo-script-box > .bg")
  };
  const vig = $("#photo-vignetting");
  const sok = $("#photo-button-sokmaeum");
  const SCRIPTBOX_STYLES_OLD = [ "default", "thought", "shout", "square" ];
  const setBoxPos = (i) => {
    if (i < 0 && i > 8) return;
    slide[current].scriptbox.pos = i;
    rabSboxPos[i].click();
    contArea.className = `photo-script-box-pos-${i} photo-script-box-sokmaeum-${slide[current].scriptbox.sokmaeum}`;
  };
  const setBoxStyle = (i) => {
    slide[current].scriptbox.style = i;
    rabSboxStyle[i].click();
    sbox.shadow.src = `./assets/theater/scriptbox-old/scriptbox-${slide[current].scriptbox.sokmaeum === 2 ? "white" : "black"}-${SCRIPTBOX_STYLES_OLD[i]}.svg`;
    sbox.bg.src = `./assets/theater/scriptbox-old/scriptbox-${slide[current].scriptbox.sokmaeum === 2 ? "black" : "white"}-${SCRIPTBOX_STYLES_OLD[i]}.svg`;
  };
  const setSokmaeumStyle = (i) => {
    if (i === 0) {
      slide[current].scriptbox.sokmaeum = i;
      rabSokStyle[i].click();
      vig.style["display"] = "none";
      sok.style["display"] = "none";
      contArea.className = `photo-script-box-pos-${slide[current].scriptbox.pos} photo-script-box-sokmaeum-${i}`;
      sbox.shadow.src = `./assets/theater/scriptbox-old/scriptbox-${slide[current].scriptbox.sokmaeum === 2 ? "white" : "black"}-${SCRIPTBOX_STYLES_OLD[i]}.svg`;
      sbox.bg.src = `./assets/theater/scriptbox-old/scriptbox-${slide[current].scriptbox.sokmaeum === 2 ? "black" : "white"}-${SCRIPTBOX_STYLES_OLD[i]}.svg`;
    } else if (i === 1) {
      slide[current].scriptbox.sokmaeum = i;
      rabSokStyle[i].click();
      vig.style["display"] = "none";
      sok.style["display"] = "block";
      contArea.className = `photo-script-box-pos-${slide[current].scriptbox.pos} photo-script-box-sokmaeum-${i}`;
      sbox.shadow.src = `./assets/theater/scriptbox-old/scriptbox-${slide[current].scriptbox.sokmaeum === 2 ? "white" : "black"}-${SCRIPTBOX_STYLES_OLD[i]}.svg`;
      sbox.bg.src = `./assets/theater/scriptbox-old/scriptbox-${slide[current].scriptbox.sokmaeum === 2 ? "black" : "white"}-${SCRIPTBOX_STYLES_OLD[i]}.svg`;
    } else if (i === 2) {
      slide[current].scriptbox.sokmaeum = i;
      rabSokStyle[i].click();
      vig.style["display"] = "block";
      sok.style["display"] = "none";
      contArea.className = `photo-script-box-pos-${slide[current].scriptbox.pos} photo-script-box-sokmaeum-${i}`;
      sbox.shadow.src = `./assets/theater/scriptbox-old/scriptbox-${slide[current].scriptbox.sokmaeum === 2 ? "white" : "black"}-${SCRIPTBOX_STYLES_OLD[i]}.svg`;
      sbox.bg.src = `./assets/theater/scriptbox-old/scriptbox-${slide[current].scriptbox.sokmaeum === 2 ? "black" : "white"}-${SCRIPTBOX_STYLES_OLD[i]}.svg`;
    };
  };
  rabSboxPos.forEach((radio) => {
    radio.onclick = () => {
      setBoxPos(parseInt(radio.value));
      refreshThumbnail(current, photozone);
    };
  });
  rabSboxStyle.forEach((radio) => {
    radio.onclick = () => {
      setBoxStyle(parseInt(radio.value));
      refreshThumbnail(current, photozone);
    };
  });
  rabSokStyle.forEach((radio) => {
    radio.onclick = () => {
      setSokmaeumStyle(parseInt(radio.value));
      refreshThumbnail(current, photozone);
    };
  });

  // 대화창 이름표 조작 기능
  const btnColpicName = $("#button-modal-colorpicker-namearea");
  const colpicNamePrev = $("#colorpicker-namearea .colorpicker-preview");
  const colpicNamePrevValue = $("#colorpicker-namearea .colorpicker-preview-value");
  const colpicNameRanges = $a("#colorpicker-namearea .colorpicker-range-input");
  const colpicNameInputs = $a("#colorpicker-namearea .colorpicker-input");
  const comNames = $a("#photo-script-box-area-revamped .namearea .name, #photo-script-box-area-revamped .namearea .outline, #photo-script-box-namebox span");
  const comNameareas = $a("#photo-script-box-area-revamped .namearea");
  const comNameBgs = $a("#photo-script-box-area-revamped .namearea > div,#photo-script-box-name-backdrop");
  const selNamepos = $("#select-namearea-position");
  const selNameposOps = $a("#select-namearea-position option");
  const inputName = $("#input-name");
  const comNameEmotions = $a("#photo-script-box-area-revamped .emotion-wrap");
  const selNameEmotions = $("#select-namearea-emotion");
  const selNameEmotionOps = $a("#select-namearea-emotion option");
  const setName = (x) => {
    slide[current].strings.name = x;
    for (const n of comNames) n.innerText = x;
    inputName.value = x;
  };
  const setNameColor = (hex) => {
    const rgb = HEXtoRGB(hex);
    slide[current].color.namearea = rgb;
    for (const n of comNameBgs) n.style["background-color"] = `#${hex}`;
    colpicNamePrev.style["background-color"] = `#${hex}`;
    colpicNamePrev.style["border-color"] = `#${hex}`;
    colpicNamePrevValue.innerText = `#${hex}\n${Object.values(rgb).join(", ")}`;
    for (const range of colpicNameRanges) {
      const type = range.className.toString().split(/ +/g)[1].trim();
      setRange(range, rgb[type]);
      // range.value = `${rgb[type]}`;
      // $("div > div", range.parentNode).style["width"] = `${rgb[type] / 255 * 100}%`;
    };
    Array.from(colpicNameInputs).forEach((n, i) => {
      n.value = Object.values(rgb)[i];
    });
  };
  const setNameColorRGB = (rgb) => {
    slide[current].color.namearea = rgb;
    const hex = RGBtoHEX(rgb);
    for (const n of comNameBgs) n.style["background-color"] = `#${hex}`;
    colpicNamePrev.style["background-color"] = `#${hex}`;
    colpicNamePrev.style["border-color"] = `#${hex}`;
    colpicNamePrevValue.innerText = `#${hex}\n${Object.values(rgb).join(", ")}`;
    for (const range of colpicNameRanges) {
      const type = range.className.toString().split(/ +/g)[1].trim();
      setRange(range, rgb[type]);
      // range.value = `${rgb[type]}`;
    };
    Array.from(colpicNameInputs).forEach((n, i) => {
      n.value = Object.values(rgb)[i];
    });
  };
  const setNameColorRGBA = (rgba) => {
    slide[current].color.namearea = rgba;
    const hex = RGBAtoHEX(rgba);
    const col = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a/100})`;
    const afix = copy(rgba);
    afix.a /= 100;
    for (const n of comNameBgs) n.style["background-color"] = col;
    colpicNamePrev.style["background-color"] = col;
    colpicNamePrev.style["border-color"] = col;
    colpicNamePrevValue.innerText = `#${hex}\n${Object.values(afix).join(", ")}`;
    for (const range of colpicNameRanges) {
      const type = range.className.toString().split(/ +/g)[1].trim();
      setRange(range, rgba[type]);
    };
    Array.from(colpicNameInputs).forEach((n, i) => {
      n.value = Object.values(rgba)[i];
    });
  };
  const setNamePos = (i) => {
    i = parseInt(i);
    if (i >= 0 && i < 3) {
      slide[current].assetOptions.namearea.pos = i;
      for (const n of comNameareas) {
        const classes = Array.from(n.classList).filter((x) => x.startsWith("namearea-pos"));
        n.classList.remove(classes.length ? classes : null);
        n.classList.add(`namearea-pos-${i}`);
        selNameposOps[i].selected = true;
      };
    };
  };
  const setNameEmotion = (s) => {
    slide[current].assetOptions.namearea.emotion = s;
    for (const n of comNameEmotions) {
      const classes = Array.from(n.classList).filter((x) => x !== "emotion-wrap");
      n.classList.remove(classes.length ? classes : null);
      n.classList.add(s);
      Array.from(selNameEmotionOps).find((x) => x.value === s).selected = true;
    };
  };
  btnColpicName.onclick = () => {
    modalman.reserve["modal-colorpicker-namearea"].show();
  };
  colpicNameRanges.forEach((range) => {
    range.oninput = (e) => {
      const type = range.className.toString().split(/ +/g)[1].trim();
      const newcol = copy(slide[current].color.namearea);
      newcol[type] = parseInt(e.target.value);
      setNameColorRGBA(newcol);
    };
  });
  colpicNameInputs.forEach((input, i) => {
    input.onchange = (c) => {
      const rgba = Object.values(slide[current].color.namearea);
      let v = parseInt(c.target.value);
      if (input.classList.contains("colorpicker-input-a")) v = Number.isNaN(v) ? 0 : v < 0 ? 0 : v > 100 ? 100 : v;
      else v = Number.isNaN(v) ? 0 : v < 0 ? 0 : v > 255 ? 255 : v;
      rgba[i] = v;
      setNameColorRGBA(Object.fromEntries(rgba.map((x, j) => x = [ [ "r", "g", "b", "a" ][j], x ])));
    };
  });
  selNamepos.onchange = (c) => {
    setNamePos(parseInt(c.target.value));
    refreshThumbnail(current, photozone);
  };
  inputName.oninput = (x) => {
    setName(x.target.value);
  };
  inputName.onchange = (c) => {
    refreshThumbnail(current, photozone);
  };
  selNameEmotions.onchange = (c) => {
    setNameEmotion(c.target.value);
    refreshThumbnail(current, photozone);
  };

  // 사도 색상표 기능 초기화
  const btnsPreset = $a(".button-color-preset");
  const presetList = $("#color-preset-list");
  const chkAutoName = $("#checkbox-toggle-auto-change-name");
  (async() => {
    const RACEDATA = await fetch("https://acherium.github.io/trickcal-chardata/trace-all.json").then((res) => res.ok ? res.json() : {});
    if (Object.values(RACEDATA).length === 0) new LyraNotification({ icon: "critical", text: "RACEDATA 파일을 불러오지 못했습니다." }).show();
    const CHARDATA = await fetch("https://acherium.github.io/trickcal-chardata/tchar-all-min.json").then((res) => res.ok ? res.json() : {});
    if (Object.values(CHARDATA).length === 0) new LyraNotification({ icon: "critical", text: "CHARDATA 파일을 불러오지 못했습니다." }).show();
    const PALETTE = await Object.fromEntries(Object.values(RACEDATA).map((x) => [ x.id, { name: x.name.ko, char: Object.values(CHARDATA).filter((y) => y.data.race === x.id).map((y) => [ y.name.ko, y.data.color]).filter((y) => y[1])}]));

    for (const race of Object.values(PALETTE)) {
      const subdiv = append(create("div", { classes: [ "color-preset-subdiv" ] }), presetList);
      append(create("p", { properties: { innerText: race.name} }), subdiv);
      for (const char of race.char) {
        const item = append(create("div", {
          classes: [ "color-preset-item" ],
          properties: {
            style: `border-color: #${char[1]}`,
            innerHTML: `${char[0]}<br><span>#${char[1]}</span>`
          }
        }), subdiv);
        item.onclick = () => {
          setNameColor(char[1]);
          if (chkAutoName.checked) setName(char[0]);
          modalman.reserve["modal-color-preset"].nodes.defaultCloseButton.click();
          slide[current].assetOptions.namearea.reservedPreset = Array.from($a(".color-preset-item", presetList)).indexOf(item);
        };
      };
    };

    const k = Array.from($a(".color-preset-item", presetList)).findIndex((x) => x.innerText.startsWith(DEFAULT_NAMEAREA_PALETTE_PRESET));
    if (k !== -1) {
      slide[current].assetOptions.namearea.reservedPreset = k;
    };
  })();
  for (const btn of btnsPreset) {
    btn.onclick = () => {
      modalman.reserve["modal-color-preset"].show();
    };
  };

  // 대화창 내용 조작 기능
  const comConts = $a(`#script-content, #photo-script-box-area-revamped .content-area .main, #photo-script-box-area-revamped .content-area .outline`);
  const inputCont = $("#input-content");
  const setContent = (x) => {
    const res = getMarkdownContent(x);
    slide[current].strings.contentRaw = x;
    slide[current].strings.content = res;
    for (const n of comConts) n.innerHTML = res;
    inputCont.value = x;
  };
  inputCont.oninput = (x) => {
    setContent(x.target.value);
  };
  inputCont.onchange = () => {
    refreshThumbnail(current, photozone);
  };

  // 선택지 상자 조작 기능
  const selboxBgs = $a("#photo-select-revamped img");
  const selSelboxTheme = $("#select-select-theme");
  const selSelboxThemeOps = $a("#select-select-theme option");
  const setSelboxTheme = (i) => {
    i = parseInt(i);
    if (i >= 0 && i < 2) {
      slide[current].assetOptions.select.theme = i;
      for (const n of selboxBgs) n.src= `./assets/theater/option/option${i === 1 ? "-chat" : ""}.svg`;
      Array.from(selSelboxThemeOps).find((n) => n.value === `${i}`).selected = true;
    };
  };
  selSelboxTheme.onchange = (c) => {
    setSelboxTheme(parseInt(c.target.value));
    refreshThumbnail(current, photozone);
  };

  // 마크다운 문법 도움말 기능
  const btnMdHelps = $a(".button-markdown-help");
  btnMdHelps.forEach((button) => {
    button.onclick = () => {
      modalman.reserve["modal-markdown"].show();
    };
  });

  // 제목 표시기 기능
  const titleOutline = $("#photo-title-box-namearea > span:nth-child(1)");
  const titleName = $("#photo-title-box-namearea > span:nth-child(2)");
  const titles = $a(".photo-title");
  const inputTitleName = $("#input-title-name");
  const inputTitle = $("#input-title-content");
  const setTitleName = (s) => {
    slide[current].strings.title.name = s;
    titleOutline.innerText = s;
    titleName.innerText = s;
    inputTitleName.value = s;
  };
  const setTitle = (s) => {
    slide[current].strings.title.content = s;
    for (const n of titles) n.innerText = s;
    inputTitle.value =s;
  };
  inputTitle.oninput = (c) => {
    setTitle(c.target.value);
  };
  inputTitle.onchange = () => {
    refreshThumbnail(current, photozone);
  };

  // 위치 표시기 기능
  const loc = $a(".photo-location");
  const inputLoc = $("#input-location");
  const setLocation = (s) => {
    slide[current].strings.location = s;
    for (const n of loc) n.innerHTML = s.split("").map((x) => `<span>${x}</span>`).join("");
    inputLoc.value = s;
  };
  inputLoc.oninput = (c) => {
    setLocation(c.target.value);
  };
  inputLoc.onchange = () => {
    refreshThumbnail(current, photozone);
  };

  // 토글 기능
  const chkName = $("#checkbox-toggle-namearea");
  const chkSelbox = $("#checkbox-toggle-select");
  const comSelboxes = $a("#photo-select-area, #photo-select-area-revamped");
  const photoBtn = $("#photo-button-area");
  const chkPhotoBtn = $("#checkbox-toggle-photo-button");
  const titleAreas = $a("#photo-title-box-area, #photo-title-box-area-revamped");
  const chkTitle = $("#checkbox-toggle-title");
  const locAreas = $a("#photo-location-box-area, #photo-location-box-area-revamped");
  const chkLoc = $("#checkbox-toggle-location");
  const comContAreas = $a("#photo-script-box-area-revamped > .area, #photo-script-box-area");
  const chkContent = $("#checkbox-toggle-content");
  const chkTglBgImg = $("#checkbox-bg-image");
  const borderVignetting = $("#photo-border-vignetting-wrap");
  const chkBorderVignetting = $("#checkbox-border-vignetting");
  const borderVignettingHorizontal = $("#photo-border-vignetting-horizontal");
  const chkBorderVignettingHorizontal = $("#checkbox-border-vignetting-horizontal");
  const borderVignettingVertical = $("#photo-border-vignetting-vertical");
  const chkBorderVignettingVertical = $("#checkbox-border-vignetting-vertical");
  const toggleNamearea = (b) => {
    slide[current].toggles.namearea = b;
    chkName.checked = b;
    for (const n of comNameareas) n.style["display"] = b ? "flex" : "none";
  };
  const toggleSelectBox = (b) => {
    slide[current].toggles.select = b;
    chkSelbox.checked = b;
    for (const n of comSelboxes) n.style["display"] = b ? "flex" : "none";
  };
  const togglePhotoButtons = (b) => {
    slide[current].toggles.photoButtons = b;
    chkPhotoBtn.checked = b;
    photoBtn.style["display"] = b ? "flex" : "none";
  };
  const toggleTitle = (b) => {
    slide[current].toggles.title = b;
    chkTitle.checked = b;
    for (const n of titleAreas) n.style["display"] = b ? "flex" : "none";
  };
  const toggleLocation = (b) => {
    slide[current].toggles.location = b;
    chkLoc.checked = b;
    for (const n of locAreas) n.style["display"] = b ? "flex" : "none";
  };
  const toggleContent = (b) => {
    slide[current].toggles.content = b;
    chkContent.checked = b;
    for (const n of comContAreas) n.style["visibility"] = b ? "visible" : "hidden";
  };
  const toggleBackgroundImage = (b) => {
    slide[current].toggles.backgroundImage = b;
    chkTglBgImg.checked = b;
    bg.style["display"] = b ? null : "none";
  };
  const toggleBorderVignetting = (b) => {
    slide[current].toggles.borderVignetting = b;
    chkBorderVignetting.checked = b;
    borderVignetting.style["display"] = b ? "block" : "none";
  };
  const toggleBorderVignettingHorizontal = (b) => {
    slide[current].toggles.borderVignettingHorizontal = b;
    chkBorderVignettingHorizontal.checked = b;
    borderVignettingHorizontal.style["display"] = b ? "block" : "none";
  };
  const toggleBorderVignettingVertical = (b) => {
    slide[current].toggles.borderVignettingVertical = b;
    chkBorderVignettingVertical.checked = b;
    borderVignettingVertical.style["display"] = b ? "block" : "none";
  };
  chkName.onchange = (c) => {
    toggleNamearea(c.target.checked);
    refreshThumbnail(current, photozone);
  };
  chkSelbox.onchange = (c) => {
    toggleSelectBox(c.target.checked);
    refreshThumbnail(current, photozone);
  };
  chkPhotoBtn.onchange = (c) => {
    togglePhotoButtons(c.target.checked);
    refreshThumbnail(current, photozone);
  };
  chkTitle.onchange = (c) => {
    toggleTitle(c.target.checked);
    refreshThumbnail(current, photozone);
  };
  chkLoc.onchange = (c) => {
    toggleLocation(c.target.checked);
    refreshThumbnail(current, photozone);
  };
  chkContent.onchange = (c) => {
    toggleContent(c.target.checked);
    refreshThumbnail(current, photozone);
  };
  chkTglBgImg.onchange = (c) => {
    toggleBackgroundImage(c.target.checked);
    refreshThumbnail(current, photozone);
  };
  chkBorderVignetting.onchange = (c) => {
    toggleBorderVignetting(c.target.checked);
    refreshThumbnail(current, photozone);
  };
  chkBorderVignettingHorizontal.onchange = (c) => {
    toggleBorderVignettingHorizontal(c.target.checked);
    refreshThumbnail(current, photozone);
  };
  chkBorderVignettingVertical.onchange = (c) => {
    toggleBorderVignettingVertical(c.target.checked);
    refreshThumbnail(current, photozone);
  };
  
  // 개체 조작 기능
  const objLayer = $("#photo-layer");
  const objList = $("#image-item-list");
  const cont = $("#photo-item-controller");
  const contp = $("#photo-controller-point-area");
  const contBar = $("#controller-bar");
  const btnContBottommost = $("#button-controller-bottommost");
  const btnContBottom = $("#button-controller-bottom");
  const btnContFront = $("#button-controller-front");
  const btnContFrontmost = $("#button-controller-frontmost");
  const btnContFlipHori = $("#button-controller-flip-horizontal");
  const btnContFlipVert = $("#button-controller-flip-vertical");
  const btnContDarker = $("#controller-toggle-darker");
  const btnContReset = $("#button-controller-reset");
  const btnContRemove = $("#button-controller-remove");
  const btnContUnselect = $("#button-controller-unselect");
  const btnContAddon = $("#button-controller-additional");
  const btnContImgChange = $("#button-controller-change");
  const btnContRemoveAlt = $("#button-controller-remove-alt");
  const btnContUnselectAlt = $("#button-controller-unselect-alt");
  const movetoBar = $("#moveto-bar");
  const btnMovetoHoriLeft = $("#button-controller-moveto-horizontal-left");
  const btnMovetoHoriCenter = $("#button-controller-moveto-horizontal-center");
  const btnMovetoHoriRight = $("#button-controller-moveto-horizontal-right");
  const btnMovetoVertTop = $("#button-controller-moveto-vertical-top");
  const btnMovetoVertMiddle = $("#button-controller-moveto-vertical-middle");
  const btnMovetoVertBottom = $("#button-controller-moveto-vertical-bottom");
  const btnMovetoCenter = $("#button-controller-moveto-center");
  const inputDialogue = $("#input-dialogue-content");
  const selSticker = $("#select-sticker-style");
  const rangeOpacity = $("#controller-opacity");
  const selectItem = (i) => {
    Array.from($a(".active-image-item")).forEach((n) => n.classList.remove("active-image-item"));
    const item = slide[current].assets.objects.find((x) => x.uid === i);
    if (!item) return null;

    objManager.selected = i;
    refreshController();
    cont.style["display"] = "flex";
    item.assets.label.classList.add("active-image-item");

    setRange(rangeOpacity, Math.floor(item.opacity * 100));
    
    for (const item of contBar.querySelectorAll("button, input")) item.removeAttribute("disabled");
    if (item.flags.darker) btnContDarker.classList.add("controller-active");
    else btnContDarker.classList.remove("controller-active");
    if (item.additionalMethod) {
      btnContAddon.style["display"] = "flex";
      btnContAddon.onclick = item.additionalMethod;
    } else {
      btnContAddon.style["display"] = "none";
      btnContAddon.onclick = null;
    };
    if (item.type === "image") {
      btnContImgChange.style["display"] = "flex";
      btnContImgChange.onclick = () => {
        changeItemImage(current, i);
      };
    } else {
      btnContImgChange.style["display"] = "none";
      btnContImgChange.onclick = null;
    };

    contBar.style["display"] = null;
    movetoBar.style["display"] = null;
  };
  const unselectItem = () => {
    objManager.selected = null;
    cont.style["display"] = "none";
    for (const item of contBar.querySelectorAll("button, input")) item.setAttribute("disabled", "true");
    Array.from($a(".active-image-item")).forEach((n) => n.classList.remove("active-image-item"));
    btnContDarker.classList.remove("controller-active");
    btnContAddon.style["display"] = "none";
    btnContAddon.onclick = null;
    btnContImgChange.style["display"] = "none";
    btnContImgChange.onclick = null;

    contBar.style["display"] = "none";
    movetoBar.style["display"] = "none";
  };
  const fetchImageUploader = () => {
    return new Promise((resolve, reject) => {
      imageFetcher.onchange = (f) => {
        Array.from(f.target.files).forEach((file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const res = {
              name: file.name,
              image: reader.result
            };
            resolve(res);
          };
        });
      };
      imageFetcher.click();
    });
  };
  const callImageUploader = (i) => {
    imageUploader.click(i);
  };
  const addObject = (sid, t, params = {}, origin = null, select = true) => {
    const tslide = slide[sid];
    if (!tslide) return null;
    if (typeof t === "undefined" || t.constructor !== String) return null;
    const uid = uniqueInt++;
    const res = origin || JSON.parse(JSON.stringify(OBJECT_TEMPLATE));
    res.uid = uid;
    for (const k in params) {
      if (k === "id") res.id = params[k];
      else if (k === "class") res.class = params[k];
    };
    res.opacity = 1;

    if (t === "image") {
      if (origin === null && ( typeof params.name === "undefined" || params.name.constructor !== String ||
        typeof params.image === "undefined" || params.image.constructor !== HTMLImageElement )) return null;
      res.class.push("object-image");
      res.name = origin?.name || params.name;
      res.type = "image";
      res.sort = tslide.assets.objects.length;

      res.assets.image = origin?.assets.image || params.image.src;
      res.assets.data.fileName = origin?.assets.data.fileName || params.name;
      res.rectOrigin.x = origin ? origin.rectOrigin.x : 0;
      res.rectOrigin.y = origin ? origin.rectOrigin.y : 0;
      res.rectOrigin.width = origin ? origin.rectOrigin.width : params.image.width;
      res.rectOrigin.height = origin ? origin.rectOrigin.height : params.image.height;
      res.rectOrigin.rotate = origin ? origin.rectOrigin.rotate : 0;
      res.rectOrigin.flip.horizontal = origin ? origin.rectOrigin.flip.horizontal : false;
      res.rectOrigin.flip.vertical = origin ? origin.rectOrigin.flip.vertical : false;
      res.rect = JSON.parse(JSON.stringify(origin?.rect || res.rectOrigin));
      res.flags.visible = origin ? origin.flags.visible : true;
      res.flags.darker = origin ? origin.flags.darker : false;
      res.flags.sizeAdjustable = origin ? origin.flags.sizeAdjustable : true;
      res.flags.movable = origin ? origin.flags.movable : true;

      res.assets.body = create("img", { id: res.id || "", classes: res.class });
      res.assets.body.style["left"] = `${res.rectOrigin.x}px`;
      res.assets.body.style["top"] = `${res.rectOrigin.y}px`;
      res.assets.body.style["width"] = `${res.rect.width}px`;
      res.assets.body.style["height"] = `${res.rect.height}px`;
      res.assets.body.src = res.assets.image;
      res.assets.body.addEventListener("click", () => selectItem(res.uid));

      res.doRefresh = () => {
        res.assets.body.style["transform"] = `translate(${res.rect.x}px, ${res.rect.y}px) ` +
          `rotate(${res.rect.rotate}deg) ` +
          `scale(${res.rect.flip.horizontal ? -1 : 1}, ${res.rect.flip.vertical ? -1 : 1})`;
        res.assets.body.style["opacity"] = `${res.opacity}`;
      };
      res.doRefresh();

      res.assets.label = create("div", {
        classes: [ "image-item" ],
        properties: {
          innerHTML: `<button class="toggle"><div class="i i-toggle-on"></div></button>` +
            `<div class="thumb"><img src="${res.assets.image}"></div>` +
            `<p>#<span class="oid">${res.uid}</span>: <span class="name">${res.name}</span></p>` +
            `<button class="remove"><div class="i i-trash"></div></button>`
        }
      });

      if (origin === null) tslide.assets.objects.push(res);
      objLayer.append(res.assets.body);
      objList.append(res.assets.label);
    } else if (t === "dialogue") {
      res.class.push("object-dialogue");
      if (origin === null) {
        res.class.push("sizing-0");
        res.class.push("positioning-2");
        res.class.push("theme-0");
      };
      res.name = origin?.name || "말풍선";
      res.type = "dialogue";
      res.sort = tslide.assets.objects.length;

      res.assets.data.contentRaw = origin?.assets.data.contentRaw || "Hello, world!";
      res.assets.data.content = getMarkdownContent(origin?.assets.data.contentRaw || res.assets.data.contentRaw);
      res.assets.data.sizing = origin ? origin.assets.data.sizing : 0;
      res.assets.data.positioning = origin ? origin.assets.data.positioning : 2;
      res.assets.data.theme = origin ? origin.assets.data.theme : 0;
      res.rectOrigin.x = origin ? origin.rectOrigin.x : 0;
      res.rectOrigin.y = origin ? origin.rectOrigin.y : 0;
      res.rectOrigin.width = origin ? origin.rectOrigin.width : 200;
      res.rectOrigin.height = origin ? origin.rectOrigin.height : 200;
      res.rectOrigin.rotate = origin ? origin.rectOrigin.rotate : -3;
      res.rectOrigin.flip.horizontal = origin ? origin.rectOrigin.flip.horizontal : false;
      res.rectOrigin.flip.vertical = origin ? origin.rectOrigin.flip.vertical : false;
      res.rect = JSON.parse(JSON.stringify(origin?.rect || res.rectOrigin));
      res.flags.visible = origin ? origin.flags.visible : true;
      res.flags.darker = origin ? origin.flags.darker : false;
      res.flags.sizeAdjustable = origin ? origin.flags.sizeAdjustable : false;
      res.flags.movable = origin ? origin.flags.movable : true;

      res.assets.body = create("div", {
        id: res.id || "",
        classes: res.class,
        properties: {
          innerHTML: "<p></p>"
        }
      });
      res.assets.body.style["left"] = `${res.rectOrigin.x}px`;
      res.assets.body.style["top"] = `${res.rectOrigin.y}px`;
      res.assets.body.style["width"] = `${res.rect.width}px`;
      res.assets.body.style["height"] = `${res.rect.height}px`;
      res.assets.body.src = res.assets.image;
      res.assets.body.addEventListener("click", () => selectItem(res.uid));

      res.assets.data.bgs = append(create("div", { classes: [ "bg-area" ] }), res.assets.body);
      append(create("img", { classes: [ "bg-10" ], properties: { src: "./assets/theater/dialogue/dialogue-white-small.svg" } }), res.assets.data.bgs);
      append(create("img", { classes: [ "bg-11" ], properties: { src: "./assets/theater/dialogue/dialogue-white-medium.svg" } }), res.assets.data.bgs);
      append(create("img", { classes: [ "bg-12" ], properties: { src: "./assets/theater/dialogue/dialogue-white-long.svg" } }), res.assets.data.bgs);
      append(create("img", { classes: [ "bg-13" ], properties: { src: "./assets/theater/dialogue/dialogue-white-extralong.svg" } }), res.assets.data.bgs);
      append(create("img", { classes: [ "arrow-10" ], properties: { src: "./assets/theater/dialogue/dialogue-arrow-white.svg" } }), res.assets.data.bgs);
      append(create("img", { classes: [ "next-10" ], properties: { src: "./assets/theater/scriptbox/next-green.svg" } }), res.assets.data.bgs);
      append(create("img", { classes: [ "bg-20" ], properties: { src: "./assets/theater/dialogue/dialogue-purple-small.svg" } }), res.assets.data.bgs);
      append(create("img", { classes: [ "bg-21" ], properties: { src: "./assets/theater/dialogue/dialogue-purple-medium.svg" } }), res.assets.data.bgs);
      append(create("img", { classes: [ "bg-22" ], properties: { src: "./assets/theater/dialogue/dialogue-purple-long.svg" } }), res.assets.data.bgs);
      append(create("img", { classes: [ "bg-23" ], properties: { src: "./assets/theater/dialogue/dialogue-purple-extralong.svg" } }), res.assets.data.bgs);
      append(create("img", { classes: [ "arrow-20" ], properties: { src: "./assets/theater/dialogue/dialogue-arrow-purple.svg" } }), res.assets.data.bgs);
      append(create("img", { classes: [ "next-20" ], properties: { src: "./assets/theater/scriptbox/next-purple.svg" } }), res.assets.data.bgs);

      res.additionalMethod = () => {
        const tmodal = modalman.reserve["modal-dialogue-quick"];
        const tmtitle = tmodal.nodes.title.querySelector("h1");
        tmtitle.innerText = `#${res.uid}: ${res.name}@${sid}`;
        inputDialogue.value = res.assets.data.contentRaw;
        inputDialogue.oninput = (e) => {
          res.applyContent(e.target.value);
          const drect = e.target.getBoundingClientRect();
          res.rect.width = drect.width;
          res.rect.height = drect.height;
          refreshController();
        };

        const sizeRadios = Array.from($a("input.object-dialogue-sizing", tmodal.nodes.content));
        for (const i in sizeRadios) {
          sizeRadios[i].onchange = (e) => {
            if (!e.target.checked) return;
            res.assets.body.classList.replace(`sizing-${res.assets.data.sizing}`, `sizing-${i}`);
            res.class = Array.from(res.assets.body.classList);
            res.assets.data.sizing = parseInt(i);
            res.doRefresh();
            refreshThumbnail(current, photozone);
          };
        };
        sizeRadios[res.assets.data.sizing].checked = true;

        const posRadios = Array.from($a("input.object-dialogue-positioning", tmodal.nodes.content));
        const posDegs = [ -3, 3, -3, 3 ];
        for (const i in posRadios) {
          posRadios[i].onchange = (e) => {
            if (!e.target.checked) return;
            res.assets.body.classList.replace(`positioning-${res.assets.data.positioning}`, `positioning-${i}`);
            res.class = Array.from(res.assets.body.classList);
            res.assets.data.positioning = parseInt(i);
            res.rect.rotate = posDegs[i];
            res.doRefresh();
            refreshThumbnail(current, photozone);
          };
        };
        posRadios[res.assets.data.positioning].checked = true;

        const themeRadios = Array.from($a("input.object-dialogue-theme", tmodal.nodes.content));
        for (const i in themeRadios) {
          themeRadios[i].onchange = (e) => {
            if (!e.target.checked) return;
            res.assets.body.classList.replace(`theme-${res.assets.data.theme}`, `theme-${i}`);
            res.class = Array.from(res.assets.body.classList);
            res.assets.data.theme = parseInt(i);
            res.doRefresh();
            refreshThumbnail(current, photozone);
          };
        };
        themeRadios[res.assets.data.theme].checked = true;

        const btnSavePNGDialogue = $("button.object-download", tmodal.nodes.content);
        btnSavePNGDialogue.onclick = () => {
          exportPNG(res.assets.body, 3);
        };

        tmodal.show();
      };

      res.doRefresh = () => {
        const bound = res.assets.body.getBoundingClientRect();
        res.rect.width = bound.width;
        res.rect.height = bound.height;
        // setControllerSize(0, 0, res.rect.width, res.rect.height);
          
        if (res.assets.data.theme === 0) {
          res.assets.body.style["transform"] = `translate(${res.rect.x}px, ${res.rect.y}px) ` +
            `rotate(${res.rect.rotate}deg) ` +
            `scale(${res.rect.flip.horizontal ? -1 : 1}, ${res.rect.flip.vertical ? -1 : 1})`;
        } else {
          res.assets.body.style["transform"] = `translate(${res.rect.x}px, ${res.rect.y}px) ` +
            `scale(${res.rect.flip.horizontal ? -1 : 1}, ${res.rect.flip.vertical ? -1 : 1})`;
        };
        res.assets.body.style["opacity"] = `${res.opacity}`;
      };
      res.applyContent = (s) => {
        res.assets.data.contentRaw = s;
        res.assets.data.content = getMarkdownContent(s);
        res.assets.body.querySelector("p").innerHTML = res.assets.data.content;
      };
      res.applyContent(res.assets.data.contentRaw);
        
      res.assets.label = create("div", {
        classes: [ "image-item" ],
        properties: {
          innerHTML: `<button class="toggle"><div class="i i-toggle-on"></div></button>` +
            `<div class="thumb"><img src="./assets/theater/thumbnails/thumbnail-dialogue.svg"></div>` +
            `<p>#<span class="oid">${res.uid}</span>: <span class="name">${res.name}</span></p>` +
            `<button class="remove"><div class="i i-trash"></div></button>`
        }
      });
        
      if (origin === null) tslide.assets.objects.push(res);
      objLayer.append(res.assets.body);
      objList.append(res.assets.label);
      res.doRefresh();
    } else if (t === "sticker") {
      res.class.push("object-sticker");
      res.name = origin?.name || "스티커";
      res.type = origin?.type || "sticker",
      res.sort = tslide.assets.objects.length;

      res.assets.data.stickerStyle = origin ? origin.assets.data.stickerStyle : null;
      res.rectOrigin.x = origin ? origin.rectOrigin.x : 0;
      res.rectOrigin.y = origin ? origin.rectOrigin.y : 0;
      res.rectOrigin.width = origin ? origin.rect.width : 160;
      res.rectOrigin.height = origin ? origin.rect.height : 160;
      res.rectOrigin.rotate = origin ? origin.rect.rotate : 0;
      res.rectOrigin.flip.horizontal = origin ? origin.rect.flip.horizontal : false;
      res.rectOrigin.flip.vertical = origin ? origin.rect.flip.vertical : false;
      res.rect = JSON.parse(JSON.stringify(origin ? origin.rect : res.rectOrigin));
      res.flags.visible = origin ? origin.flags.visible : true;
      res.flags.darker = origin ? origin.flags.darker : false;
      res.flags.sizeAdjustable = origin ? origin.flags.sizeAdjustable : true;
      res.flags.movable = origin ? origin.flags.movable : true;

      res.assets.body = create("div", {
        id: res.id || "",
        classes: res.class,
        properties: {
          innerHTML: Object.keys(EMOTE_STICKERS_REVAMPED).map((x) => `<img src="./assets/theater/emotion/emotion-${x}.svg" class="${x}">`).join("")
        }
      });
      res.assets.body.style["left"] = `${res.rectOrigin.x}px`;
      res.assets.body.style["top"] = `${res.rectOrigin.y}px`;
      res.assets.body.style["width"] = `${res.rect.width}px`;
      res.assets.body.style["height"] = `${res.rect.height}px`;
      res.assets.body.addEventListener("click", () => selectItem(res.uid));
      res.assets.data.stickerNodes = res.assets.body.querySelectorAll("img");

      res.additionalMethod = () => {
        const tmodal = modalman.reserve["modal-sticker-quick"];
        const tmtitle = tmodal.nodes.title.querySelector("h1");
        tmtitle.innerText = `#${res.uid}: ${res.name}@${sid}`;
        Array.from(selSticker.querySelectorAll("option")).find((n) => n.value === res.assets.data.stickerStyle).selected = true;
        selSticker.onchange = (c) => res.applySticker(c.target.value);
        tmodal.show();
      };

      res.doRefresh = () => {
        res.assets.body.style["transform"] = `translate(${res.rect.x}px, ${res.rect.y}px) ` +
          `rotate(${res.rect.rotate}deg) ` +
          `scale(${res.rect.flip.horizontal ? -1 : 1}, ${res.rect.flip.vertical ? -1 : 1})`;
        res.assets.body.style["opacity"] = `${res.opacity}`;
      };
      res.applySticker = (s) => {
        if (!Object.keys(EMOTE_STICKERS_REVAMPED).includes(s)) return;
        res.assets.data.stickerStyle = s;
        for (const n of Array.from(res.assets.data.stickerNodes).filter((x) => !x.classList.contains(s))) n.style["display"] = "none";
        Array.from(res.assets.data.stickerNodes).find((x) => x.classList.contains(s)).style["display"] = "block";
      };
      res.doRefresh();
      res.applySticker(origin ? origin.assets.data.stickerStyle : Object.keys(EMOTE_STICKERS_REVAMPED)[0]);
        
      res.assets.label = create("div", {
        classes: [ "image-item" ],
        properties: {
          innerHTML: `<button class="toggle"><div class="i i-toggle-on"></div></button>` +
            `<div class="thumb"><img src="./assets/theater/thumbnails/thumbnail-sticker.svg"></div>` +
            `<p>#<span class="oid">${res.uid}</span>: <span class="name">${res.name}</span></p>` +
            `<button class="remove"><div class="i i-trash"></div></button>`
        }
      });

      if (origin === null) tslide.assets.objects.push(res);
      objLayer.append(res.assets.body);
      objList.append(res.assets.label);
    } else if (t === "filter") {
      res.class.push("object-filter");
      res.name = origin?.name || `필터${FILTER_NAMES[params?.type] ? ` - ${FILTER_NAMES[params.type]}` : ""}`;
      res.type = origin?.type || "filter",
      res.sort = tslide.assets.objects.length;

      res.rectOrigin.x = origin ? origin.rectOrigin.x : 0;
      res.rectOrigin.y = origin ? origin.rectOrigin.y : 0;
      res.rectOrigin.width = origin ? origin.rect.width : 160;
      res.rectOrigin.height = origin ? origin.rect.height : 160;
      res.rectOrigin.rotate = origin ? origin.rect.rotate : 0;
      res.rectOrigin.flip.horizontal = origin ? origin.rect.flip.horizontal : false;
      res.rectOrigin.flip.vertical = origin ? origin.rect.flip.vertical : false;
      res.rect = JSON.parse(JSON.stringify(origin ? origin.rect : res.rectOrigin));
      res.flags.visible = origin ? origin.flags.visible : true;
      res.flags.darker = origin ? origin.flags.darker : false;
      res.flags.sizeAdjustable = origin ? origin.flags.sizeAdjustable : false;
      res.flags.movable = origin ? origin.flags.movable : false;

      if (params && typeof params.type !== "undefined") {
        if (params.type === "cinemascope") {
          res.class.push("cinemascope");
        };
      };

      res.assets.body = create("div", {
          id: res.id || "",
          classes: res.class
      });
      res.assets.body.style["left"] = `${res.rectOrigin.x}px`;
      res.assets.body.style["top"] = `${res.rectOrigin.y}px`;
      res.assets.body.style["width"] = `${res.rect.width}px`;
      res.assets.body.style["height"] = `${res.rect.height}px`;
      res.assets.body.addEventListener("click", () => selectItem(res.uid));
      res.assets.data.stickerNodes = res.assets.body.querySelectorAll("img");

      res.additionalMethod = null;

      res.doRefresh = () => {
        res.assets.body.style["transform"] = `translate(${res.rect.x}px, ${res.rect.y}px) ` +
          `rotate(${res.rect.rotate}deg) ` +
          `scale(${res.rect.flip.horizontal ? -1 : 1}, ${res.rect.flip.vertical ? -1 : 1})`;
        res.assets.body.style["opacity"] = `${res.opacity}`;
      };
      res.doRefresh();
        
      res.assets.label = create("div", {
        classes: [ "image-item" ],
        properties: {
          innerHTML: `<button class="toggle"><div class="i i-toggle-on"></div></button>` +
            `<div class="thumb"><img src="./assets/theater/thumbnails/thumbnail-filter.svg"></div>` +
            `<p>#<span class="oid">${res.uid}</span>: <span class="name">${res.name}</span></p>` +
            `<button class="remove"><div class="i i-trash"></div></button>`
        }
      });

      if (origin === null) tslide.assets.objects.push(res);
      objLayer.append(res.assets.body);
      objList.append(res.assets.label);
    };

    res.assets.label.addEventListener("click", (e) => {
      if (e.target === res.assets.label && objManager.selected !== res.uid) selectItem(res.uid);
      else if (e.target === res.assets.label) unselectItem();
    });
    
    const btnObjRemove = res.assets.label.querySelector("button.remove");
    const btnObjToggle = res.assets.label.querySelector("button.toggle");
    btnObjRemove.addEventListener("click", () => removeObject(sid, uid));
    btnObjToggle.addEventListener("click", () => toggleObject(sid, uid, btnObjToggle));

    if (select && t !== "filter") selectItem(res.uid);
    if (origin === null) btnMovetoCenter.click();
    return res;
  };
  const addObjectIterable = (a) => {
    for (const obj of a) addObject(current, obj.type, {}, obj, false);
  };
  const changeItemImage = (sid, oid) => {
    const tslide = slide[sid];
    if (!tslide) return null;
    const item = tslide.assets.objects.find((x) => x.uid === oid);
    if (!item) return null;

    fetchImageUploader().then((res) => {
      item.assets.body.src = res.image;
      item.assets.image = res.image;
      $(".thumb > img", item.assets.label).src = res.image;
      changeObjectName(sid, oid, res.name);
    });
  };
  const changeObjectName = (sid, oid, s) => {
    const tslide = slide[sid];
    if (!tslide) return null;
    const item = tslide.assets.objects.find((x) => x.uid === oid);
    if (!item) return null;

    item.name = s;
    $(".name", item.assets.label).innerText = s;
  };
  const removeObject = (sid, oid) => {
    const tslide = slide[sid];
    if (!tslide) return null;
    const item = tslide.assets.objects.find((x) => x.uid === oid);
    if (!item) return null;
    unselectItem();
    item.assets.body.remove();
    item.assets.label.remove();
    tslide.assets.objects = tslide.assets.objects.filter((x) => x.uid !== item.uid);
    return item;
  };
  const toggleObject = (sid, oid, button) => {
    const tslide = slide[sid];
    if (!tslide) return null;
    const item = tslide.assets.objects.find((x) => x.uid === oid);
    if (!item) return null;
    item.flags.visible = !item.flags.visible;
    if (item.flags.visible) {
      $(".i", button).className = "i i-toggle-on";
      item.assets.body.classList.remove("force-transparent");
    } else {
      $(".i", button).className = "i i-toggle-off";
      item.assets.body.classList.add("force-transparent");
    };
    return item;
  };
  const addImagePos = (i, x, y) => {
    const item = slide[current].assets.objects.find((x) => x.uid === i);
    if (!item) return;
    if (!item.flags.movable) return;
    item.rect.x += x;
    item.rect.y += y;
    item.doRefresh();
    if (objManager.selected === i) refreshController();
  };
  const setImagePos = (i, x, y) => {
    const item = slide[current].assets.objects.find((x) => x.uid === i);
    if (!item) return;
    if (!item.flags.movable) return;
    if (x !== null) item.rect.x = x;
    if (y !== null) item.rect.y = y;
    item.doRefresh();
    if (objManager.selected === i) refreshController();
  };
  const setImageRotate = (i, d) => {
    const item = slide[current].assets.objects.find((x) => x.uid === i);
    if (!item) return;
    if (d !== null) item.rect.rotate = d;
    item.doRefresh();
    if (objManager.selected === i) refreshController();
  };
  const setImageOpacity = (i, x) => {
    const item = slide[current].assets.objects.find((x) => x.uid === i);
    if (!item) return;
    if (x !== null) item.opacity = x;
    item.doRefresh();
  };
  const addImageSize = (i, x, y, w, h) => {
    const item = slide[current].assets.objects.find((x) => x.uid === objManager.selected);
    if (!item || !item.flags.sizeAdjustable) return;
    item.rect.width += w;
    item.rect.height += h;
    addImagePos(i, x, y);
    item.assets.body.style["width"] = `${item.rect.width}px`;
    item.assets.body.style["height"] = `${item.rect.height}px`;
  };
  const setImageSize = (i, x, y, w, h) => {
    const item = slide[current].assets.objects.find((x) => x.uid === objManager.selected);
    if (!item || !item.flags.sizeAdjustable) return;
    addImagePos(i, x, y);
    item.rect.width = w;
    item.rect.height = h;
    item.assets.body.style["width"] = `${w}px`;
    item.assets.body.style["height"] = `${h}px`;
  };
  const refreshController = () => {
    const item = slide[current].assets.objects.find((x) => x.uid === objManager.selected);
    if (!item) return;
    objManager.rect = copy(item.rect);
    cont.style["width"] = `${objManager.rect.width}px`;
    cont.style["height"] = `${objManager.rect.height}px`;
    cont.style["transform"] = `translate(${objManager.rect.x}px, ${objManager.rect.y}px)`;
    contp.style["transform"] = `rotate(${objManager.rect.rotate}deg)`;
  };
  const moveToBottommost = (sid, oid) => {
    const list = slide[sid].assets.objects;
    const tobj = list.find((x) => x.uid === oid);
    if (!tobj) return null;

    const i = list.findIndex((x) => x.uid === oid);
    list.unshift(list.splice(i, 1)[0]);
    list.forEach((x, i) => x.sort = i);
    objLayer.insertAdjacentElement("afterbegin", tobj.assets.body);
    objList.insertAdjacentElement("afterbegin", tobj.assets.label);
  };
  const moveToBottom = (sid, oid) => {
    const list = slide[sid].assets.objects;
    const tobj = list.find((x) => x.uid === oid);
    if (!tobj) return null;

    const i = list.findIndex((x) => x.uid === oid);
    const prevBody = tobj.assets.body.previousSibling;
    if (!prevBody) return;
    list.splice(i - 1, 0, list.splice(i, 1)[0]);
    list.forEach((x, i) => x.sort = i);
    const prevLabel = tobj.assets.label.previousSibling;
    objLayer.insertBefore(tobj.assets.body, prevBody);
    objList.insertBefore(tobj.assets.label, prevLabel);
  };
  const moveToFront = (sid, oid) => {
    const list = slide[sid].assets.objects;
    const tobj = list.find((x) => x.uid === oid);
    if (!tobj) return null;
    
    const next1 = tobj.assets.body.nextSibling;
    const next2 = next1?.nextSibling;
    const i = list.findIndex((x) => x.uid === oid);
    if (next1 && !next2) {
      objLayer.insertAdjacentElement("beforeend", tobj.assets.body);
      objList.insertAdjacentElement("beforeend", tobj.assets.label);
    } else if (next2) {
      const next2Label = tobj.assets.label.nextSibling.nextSibling;
      objLayer.insertBefore(tobj.assets.body, next2);
      objList.insertBefore(tobj.assets.label, next2Label);
    };
    list.splice(i + 1, 0, list.splice(i, 1)[0]);
    list.forEach((x, i) => x.sort = i);
  };
  const moveToFrontmost = (sid, oid) => {
    const list = slide[sid].assets.objects;
    const tobj = list.find((x) => x.uid === oid);
    if (!tobj) return null;

    const i = list.findIndex((x) => x.uid === oid);
    list.push(list.splice(i, 1)[0]);
    list.forEach((x, i) => x.sort = i);
    objLayer.insertAdjacentElement("beforeend", tobj.assets.body);
    objList.insertAdjacentElement("beforeend", tobj.assets.label);
  };
  const flipHorizontal = (sid, oid) => {
    const item = slide[sid].assets.objects.find((x) => x.uid === oid);
    if (!item) return null;
    item.rect.flip.horizontal = !item.rect.flip.horizontal;
    item.doRefresh();
  };
  const flipVertical = (sid, oid) => {
    const item = slide[sid].assets.objects.find((x) => x.uid === oid);
    if (!item) return null;
    item.rect.flip.vertical = !item.rect.flip.vertical;
    item.doRefresh();
  };
  const toggleObjectDarker = (sid, oid) => {
    const item = slide[sid].assets.objects.find((x) => x.uid === oid);
    if (!item) return null;
    item.flags.darker = !item.flags.darker;
    if (item.flags.darker) {
      item.class.push("image-item-darker");
      item.assets.body.classList.add("image-item-darker");
      if (objManager.selected !== null) btnContDarker.classList.add("controller-active");
    } else {
      item.class = item.class.filter((x) => x !== "image-item-darker");
      item.assets.body.classList.remove("image-item-darker");
      if (objManager.selected !== null) btnContDarker.classList.remove("controller-active");
    };
  };
  const rescueObject = (sid, oid) => {
    const item = slide[sid].assets.objects.find((x) => x.uid === oid);
    if (!item) return null;
    setImagePos(oid, item.rectOrigin.x, item.rectOrigin.y);
    setImageSize(oid, 0, 0, item.rectOrigin.width, item.rectOrigin.height);
    setImageRotate(oid, item.rectOrigin.rotate);
    refreshController();
  };

  // 슬라이드 조작 기능
  const slideList = $("#slide-list");
  const pExportSize = $("#export-size-onmodal");
  const inputAreaWidth = $("#input-slide-size-width");
  const inputAreaHeight = $("#input-slide-size-height");
  const btnFitToBg = $("#button-fit-to-bg-size");
  const setAreaWidth = (w) => {
    if (Number.isNaN(w) || w < WIDTHMIN) w = WIDTHMIN;
    if (w > WIDTHMAX) w = WIDTHMAX;
    slide[current].area.width = w;
    inputAreaWidth.value = w;
    photozone.style["width"] = `${w}px`;
    refreshSize();
  };
  const setAreaHeight = (h) => {
    if (Number.isNaN(h) || h < HEIGHTMIN) h = HEIGHTMIN;
    if (h > HEIGHTMAX) h = HEIGHTMAX;
    slide[current].area.height = h;
    inputAreaHeight.value = h;
    photozone.style["height"] = `${h}px`;
    refreshSize();
  };
  const refreshSize = () => {
    const _res = `${slide[current].area.width * multiplier}×${slide[current].area.height * multiplier}px`;
    pExportSize.value = _res;
  };
  const setAreaSize = (w, h) => {
    setAreaWidth(w);
    setAreaHeight(h);
  };
  const createSlide = () => {
    const d = JSON.parse(JSON.stringify(Object.assign({}, SLIDE_TEMPLATE)));
    slide.push(d);
    current = slide.length - 1
    unselectItem();
    applySlide();
  };
  const duplicateSlide = () => {
    const d = JSON.parse(JSON.stringify(Object.assign({}, slide[current])));
    slide.push(d);
    current = slide.length - 1
    unselectItem();
    applySlide();
  };
  const setSlide = (i) => {
    if (!slide[i]) return;
    unselectItem();
    current = i;
    applySlide();
  };
  const removeSlide = (i) => {
    delete slide[i];
    slide = slide.filter((x) => x);
    if (slide.length) {
      if (i === current && i > 0)  setSlide(i - 1);
      else if (i === current && i === 0) setSlide(0);
      else if (i < current) setSlide(current - 1);
    } else {
      createSlide();
    };
    refreshSlideList();
  };
  const applySlide = () => {
    current = slide[current] ? current : current - 1;
    const x = slide[current];

    setAreaSize(x.area.width, x.area.height);

    setBackground(x.assets.background);
    setBackgroundFit(x.values.backgroundFit);
    setBackgroundColorRGBA(x.color.background);

    setOverlayColorRGBA(x.color.overlay);

    setTheme(x.assetOptions.scriptbox.theme);
    setSelboxTheme(x.assetOptions.select.theme);

    setName(x.strings.name);
    setNameColorRGBA(x.color.namearea);
    setNamePos(x.assetOptions.namearea.pos);
    setNameEmotion(x.assetOptions.namearea.emotion);

    setContent(x.strings.contentRaw);

    setBoxPos(x.scriptbox.pos);
    setBoxStyle(x.scriptbox.style);
    setSokmaeumStyle(x.scriptbox.sokmaeum);
    setBoxOpacity(x.scriptbox.opacity);

    setType(x.values.type);

    setTitleName(x.strings.title.name);
    setTitle(x.strings.title.content);
    setLocation(x.strings.location);

    toggleNamearea(x.toggles.namearea);
    toggleSelectBox(x.toggles.select);
    togglePhotoButtons(x.toggles.photoButtons);
    toggleTitle(x.toggles.title);
    toggleLocation(x.toggles.location);
    toggleContent(x.toggles.content);
    toggleBackgroundImage(x.toggles.backgroundImage);
    toggleBorderVignetting(x.toggles.borderVignetting);
    toggleBorderVignettingHorizontal(x.toggles.borderVignettingHorizontal);
    toggleBorderVignettingVertical(x.toggles.borderVignettingVertical);

    objManager.current = {};
    objLayer.innerHTML = "";
    objList.innerHTML = "";
    addObjectIterable(x.assets.objects);

    refreshSlideList();
    refreshThumbnail(current, photozone);
  };
  const refreshSlideList = () => {
    slideList.innerHTML = "";
    slideList.innerHTML = slide.map((d, i) => {
      return `<div id="slide-item-${i}" class="slide-item"><div class="thumb"><img src="${d.assets.thumbnail}"></div>` +
        `<div class="slide-item-menu"><p>${i+1}</p><button class="remove"><div class="i i-deny"></div></button></div></div>`;
    }).join("");
    Array.from(slideList.querySelectorAll(".slide-item")).forEach((n, i) => {
      n.onclick = (c) => {
        if (c.target !== n) return;
        setSlide(i);
        refreshThumbnail(i, photozone);
      };
    });
    Array.from(slideList.querySelectorAll("button.remove")).forEach((n, i) => {
      n.onpointerdown = () => {
        removeSlide(i);
      };
    });
    $(`.active-slide:not(#slide-item-${current})`)?.classList.remove("active-slide");
    $(`#slide-item-${current}`)?.classList.add("active-slide");
  };
  const refreshThumbnail = (i, n) => {
    // if (!flagThumbnail) return;
    // setTimeout(() => {
    //   html2canvas(n, { logging: false, scale: 0.3 }).then((c) => {
    //     const src = `${c.toDataURL("image/png")}`;
    //     slide[current].assets.thumbnail = src;
    //     const thumb = $(`#slide-item-${i} div.thumb > img`);
    //     thumb.src = src;
    //   });
    // }, COMMON_INTERVAL);
  };
  inputAreaWidth.onchange = (c) => {
    setAreaWidth(c.target.value);
    refreshThumbnail(current, photozone);
  };
  inputAreaHeight.onchange = (c) => {
    setAreaHeight(c.target.value);
    refreshThumbnail(current, photozone);
  };
  selBgFit.onchange = (c) => {
    setBackgroundFit(c.target.value);
    refreshThumbnail(current, photozone);
  };
  btnFitToBg.onclick = () => {
    if (!slide[current].assets.background) {
      new LyraNotification({
        icon: "warning",
        text: "배경 이미지가 설정되어있지 않습니다.",
        duration: 2000
      }).show();
    } else {
      const ratio = bg.height / bg.width;
      const width = 1280;
      setAreaWidth(width);
      setAreaHeight(Math.floor(width * ratio));
      setBackgroundFit("fill");
      refreshThumbnail(current, photozone);
    };
  };

  // 문서 저장/불러오기 기능
  const btnSave = $("#button-save");
  const btnLoad = $("#button-load");
  const btnSaveFile = $("#button-save-file");
  const btnOpenFile = $("#button-open-file");
  const inputDocName = $("#show-name");
  const initStore = () => {
    if (window.localStorage.getItem("show") === null ||
      window.localStorage.getItem("slide") === null) {
      window.localStorage.setItem("show", "{}");
      window.localStorage.setItem("slide", "[]");
      new LyraNotification({
        icon: "notification",
        text: "로컬 저장소가 초기화되었습니다."
      }).show();
    };
  };
  const saveCurrent = () => {
    show.lastUpdate = Date.now();
    const showData = JSON.stringify(show);
    const slideData = JSON.stringify(slide);
    window.localStorage.setItem("show", showData);
    window.localStorage.setItem("slide", slideData);
    new LyraNotification({
      icon: "export",
      text: "문서 정보를 로컬 저장소에 성공적으로 저장했습니다."
    }).show();
  };
  const loadLast = () => {
    const showRaw = window.localStorage.getItem("show");
    const slideRaw = window.localStorage.getItem("slide");
    if (!showRaw || !slideRaw) {
      initStore();
      new LyraNotification({
        icon: "critical",
        text: "로컬 저장소가 손상되었습니다. 초기값으로 복원합니다."
      }).show();
      return;
    };
    const showData = JSON.parse(showRaw);
    const slideData = JSON.parse(slideRaw);
    if (typeof showData === "object" &&
      typeof showData.version === "number" &&
      typeof showData.name === "string" &&
      typeof showData.lastSlide === "number") {
      show = showData;
      setDocName(show.name);
      new LyraNotification({
        icon: "import",
        text: "문서 정보를 성공적으로 불러왔습니다."
      }).show();
      if (typeof slideData === "object" || slideData.constructor === Array) {
        slide = slideData;
        setSlide(show.lastSlide);
        new LyraNotification({
          icon: "import",
          text: "슬라이드 정보를 성공적으로 불러왔습니다."
        }).show();
      };
    } else {
      new LyraNotification({
        icon: "warning",
        text: "불러올 문서가 없습니다."
      }).show();
    };
  };
  const saveFile = () => {
    const raw = {
      info: {
        type: APP.docType,
        version: APP.docVersion
      },
      data: {
        show: show,
        slide: slide
      }
    };
    raw.data.show.lastUpdate = Date.now();
    const res = JSON.stringify(raw, null, 2);

    const blob = new Blob([ res ], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const date = Date.now();

    const l = append(create("a"));
    l.href = url;
    l.download = `PICTORPROJ-${show.name}-${date}.json`;
    l.click();
    l.remove();
  };
  const openFile = () => {
    projUploader.click();
  };
  const setDocName = (s) => {
    show.name = s;
    inputDocName.value = s;
  };
  btnSave.onclick = () => {
    const showRaw = window.localStorage.getItem("show");
    if (!showRaw) initStore();
    const oldShowData = JSON.parse(showRaw);
    if (oldShowData.name) {
      new LyraModal({
        icon: "export",
        title: "덮어쓰기 경고",
        content: create("p", {
          properties: {
            innerHTML: `이미 저장된 문서가 있습니다.<br><br>` +
              `<b>제목: ${oldShowData.name}<br>` +
              `마지막 수정: ${new Intl.DateTimeFormat("kr", { dateStyle: "full", timeStyle: "full" }).format(oldShowData.lastUpdate)}</b><br><br>` +
              `이 문서의 내용을 무시하고 현재 내용을 덮어쓰시겠습니까? 이전 내용이 삭제됩니다.`
          }
        }),
        buttons: [
          new LyraButton({
            classes: [ "close" ],
            icon: "export",
            text: "덮어쓰기",
            events: {
                click: () => saveCurrent()
            }
          }),
          new LyraButton({
            classes: [ "close" ],
            icon: "deny",
            text: "취소"
          })
        ]
      }).show();
    } else {
      saveCurrent();
    };
  };
  btnLoad.onclick = () => {
    loadLast();
  };
  btnSaveFile.onclick = () => {
    saveFile();
  };
  btnOpenFile.onclick = () => {
    openFile();
  };
  inputDocName.onchange = (c) => {
    setDocName(c.target.value);
  };
  setDocName(show.name);

  // 슬라이드 목록 썸네일 생성 안함
  const chkDisabledThumbnail = $("#checkbox-disable-thumbnail-gen");
  chkDisabledThumbnail.onchange = (e) => {
    if (e.target.checked) {
      flagThumbnail = false;
      slideList.classList.add("no-thumbnail");
    } else {
      flagThumbnail = true;
      slideList.classList.remove("no-thumbnail");
    };
  };
  chkDisabledThumbnail.checked = true;
  flagThumbnail = false;
  slideList.classList.add("no-thumbnail");
  
  // 슬라이드 크기 템플릿 버튼
  const btnSlideSizePreset = $("#button-modal-slide-size-preset");
  btnSlideSizePreset.onclick = () => {
    modalman.reserve["modal-slide-size-preset"].show();
  };
  const btnsSlideSize = $a(".button-slide-size");
  Array.from(btnsSlideSize).forEach((n) => {
    n.onclick = () => {
      const w = parseInt(n.dataset.width);
      const h = parseInt(n.dataset.height);
      setAreaSize(w, h);
      refreshThumbnail(current, photozone);
    };
  });

  // 실험실
  const btnTest = $("#button-test-menu");
  document.addEventListener("keydown", (e) => {
    if (e.target === body && e.shiftKey && e.code === "Slash") {
      modalman.reserve["modal-experimental"].show();
    };
  });
  $("#test-checkbox-activate-script-box-type").onchange = (e) => {
    $("#container-script-box-type").style["display"] = e.target.checked ? null : "none";
  };
  $("#test-checkbox-activate-save-on-browser").onchange = (e) => {
    $("#container-save-on-browser").style["display"] = e.target.checked ? null : "none";
  };
  btnTest.onclick = () => { modalman.reserve["modal-experimental"].show(); };

  // 시작시 초기화
  const modalman = new LyraModalManager();
  createSlide();

  // PNG 이미지 출력
  const alertDownload = $("#alert-downloading");
  const btnSavePNG = $("#button-download");
  const btnSavePNGall = $("#button-download-all");
  btnSavePNG.onclick = () => {
    alertDownload.style["display"] = "flex";
    exportPNG(photozone);
    document.documentElement.focus();
  };
  btnSavePNGall.onclick = () => {
    let i = 0;
    alertDownload.style["display"] = "flex";
    chkWatermarkOrigin.style["opacity"] = null;
    const l = document.createElement("a");
    document.body.append(l);
    const cb = () => {
      if (slide[i]) {
        setSlide(i);
        setTimeout(() => {
          html2canvas(photozone, {
            scale: multiplier,
            backgroundColor: null,
            logging: false,
            onclone: (doc) => {
              $("#scale-layer", doc).style["transform"] = "scale(1)";
            }
          }).then((c) => {
            l.href = c.toDataURL("image/png");
            const d = Date.now();
            const filename = `${INITIAL}-${d}.png`;
            l.download = filename;
            l.click();
            setTimeout(() => {
              i++;
              cb();
            }, 2000);
          });
        }, 2000);
      } else {
        l.remove();
        alertDownload.style["display"] = "none";
        chkWatermarkOrigin.style["opacity"] = "0";
        document.documentElement.focus();
      };
    };
    cb();
  };

  // 출력 배율 설정
  const inputMultiplier = $("#export-multiplier");
  inputMultiplier.oninput = (c) => {
    const _i = Number(c.target.value);
    multiplier = Number.isNaN(_i) ? multiplier : _i;
    refreshSize();
  };
  inputMultiplier.value = multiplier;
  refreshSize();

  // 슬라이드 추가, 복제 기능
  const btnAddSlide = $("#button-add-slide");
  const btnDuplicateSlide = $("#button-duplicate-slide");
  btnAddSlide.onclick = () => {
    createSlide();
  };
  btnDuplicateSlide.onclick = () => {
    duplicateSlide();
  };

  // 선택지
  const inputSelboxOps = $a(".select-option");
  const comSelboxOps = [
    $a("#photo-select > .photo-select-option"),
    $a("#photo-select-revamped > .photo-select-option")
  ];
  const btnSaveSelboxOps = $a(".button-download-select");
  Array.from(inputSelboxOps).forEach((n, i) => {
    const t = [ comSelboxOps[0][i], comSelboxOps[1][i] ];
    const p = [ t[0].querySelector("p"), t[1].querySelector("p") ];
    n.value = slide[current].strings.select[i];
    for (const n of p) n.innerText = slide[current].strings.select[i];
    n.oninput = (c) => {
      if (!c.target.value.length) {
        for (const n of t) n.style["display"] = "none";
      } else {
        for (const n of t) n.style["display"] = "flex";
        for (const n of p) n.innerText = c.target.value;
      };
    };
    n.onchange = () => {
      refreshThumbnail(current, photozone);
    };
  });
  btnSaveSelboxOps.forEach((button, i) => {
    button.onclick = () => {
      if (slide[current].values.type === 0) {
        const target = $a("#photo-select-area .photo-select-option")[i];
        if (target.checkVisibility()) exportPNG(target, 3);
      } else if (slide[current].values.type === 1) {
        const target = $a("#photo-select-area-revamped .photo-select-option")[i];
        if (target.checkVisibility()) exportPNG(target, 3);
      };
    };
  });

  // 대화창 이미지로 저장
  const btnSavePNGSbox = $("#button-download-script-box");
  btnSavePNGSbox.onclick = () => {
    if (slide[current].values.type === 0) {
      const target = $("#photo-script-box-area");
      if (slide[current].toggles.content) exportPNG(target, 3);
    } else if (slide[current].values.type === 1) {
      const target = $("#photo-script-box-area-revamped");
      if (slide[current].toggles.content) exportPNG(target, 3);
    };
  };

  // 개체 메뉴 기능
  const btnAddImage = $("#button-add-image");
  const btnAddDialogue = $("#button-add-dialogue");
  const btnAddSticker = $("#button-add-sticker");
  const btnResetImage = $("#button-reset-image");
  btnAddImage.onclick = () => {
    callImageUploader(current);
  };
  btnAddDialogue.onclick = () => {
    addObject(current, "dialogue");
    refreshThumbnail(current, photozone);
  };
  btnAddSticker.onclick = () => {
    addObject(current, "sticker");
    refreshThumbnail(current, photozone);
  };
  btnResetImage.onclick = () => {
    for (const obj of slide[current].assets.objects) removeObject(current, obj.uid);
    refreshThumbnail(current, photozone);
  };
  for (const key in EMOTE_STICKERS_REVAMPED) {
    selSticker.append(create("option", { properties: { value: key, innerText: EMOTE_STICKERS_REVAMPED[key] } }));
  };

  // 개체 컨트롤러 이동&크기 변경 기능
  const resizePoints = $a("#photo-controller-point-area > .resize-point");
  const rotatePoint = $("#rotation-point");
  contp.onpointerdown = (p) => {
    if (p.target !== contp) return;
    if (p.pointerType === "mouse" && p.buttons !== 1) return;
    contp.setPointerCapture(p.pointerId);
    let flag = true;
    contp.onpointermove = (m) => {
      flag = false;
      const item = slide[current].assets.objects.find((x) => x.uid === objManager.selected);
      if (!item) return;
      if (!item.flags.movable) return;
      item.rect.x += m.movementX;
      item.rect.y += m.movementY;
      setImagePos(item.uid, item.rect.x, item.rect.y);
    };
    contp.onpointerup = () => {
      if (flag) unselectItem();
      if (contp.hasPointerCapture(p.pointerId)) contp.releasePointerCapture(p.pointerId);
      refreshThumbnail(current, photozone);
      contp.onpointermove = null;
      contp.onpointerup = null;
    };
  };
  contp.ontouchstart = (t) => {
    if (t.touches[0].target !== contp) return;
    let ox = t.touches[0].clientX;
    let oy = t.touches[0].clientY;
    contp.ontouchmove = (m) => {
      const item = slide[current].assets.objects.find((x) => x.uid === objManager.selected);
      if (!item) return;
      if (!item.flags.movable) return;
      const x = m.touches[0].clientX;
      const y = m.touches[0].clientY;
      const mx = x - ox;
      const my = y - oy;
      ox = x;
      oy = y;
      item.rect.x += mx;
      item.rect.y += my;
      setImagePos(item.uid, item.rect.x, item.rect.y);
    };
    contp.ontouchend = () => {
      refreshThumbnail(current, photozone);
      contp.ontouchmove = null;
      contp.ontouchend = null;
    };
  };
  Array.from(resizePoints).forEach(($n, i) => {
    $n.onpointerdown = (p) => {
      if (p.pointerType === "mouse" && p.buttons !== 1) return;
      $n.setPointerCapture(p.pointerId);
      $n.onpointermove = (m) => {
        const item = slide[current].assets.objects.find((x) => x.uid === objManager.selected);
        if (!item || !item.flags.sizeAdjustable) return;
        const mx = m.movementX;
        const my = m.movementY;
        if (i === 0) {
          if (item.rect.width + mx*-1 >= SIZEMIN) addImageSize(item.uid, mx, 0, mx*-1, 0);
          if (item.rect.height + my*-1 >= SIZEMIN) addImageSize(item.uid, 0, my, 0, my*-1);
        } else if (i === 1) {
          if (item.rect.width + mx >= SIZEMIN) addImageSize(item.uid, 0, 0, mx, 0);
          if (item.rect.height + my*-1 >= SIZEMIN) addImageSize(item.uid, 0, my, 0, my*-1);
        } else if (i === 2) {
          if (item.rect.width + mx*-1 >= SIZEMIN) addImageSize(item.uid, mx, 0, mx*-1, 0);
          if (item.rect.height + my >= SIZEMIN) addImageSize(item.uid, 0, 0, 0, my);
        } else if (i === 3) {
          if (item.rect.width + mx >= SIZEMIN) addImageSize(item.uid, 0, 0, mx, 0);
          if (item.rect.height + my >= SIZEMIN) addImageSize(item.uid, 0, 0, 0, my);
        } else if (i === 4) {
          if (item.rect.height + my*-1 >= SIZEMIN) addImageSize(item.uid, 0, my, 0, my*-1);
        } else if (i === 5) {
          if (item.rect.width + mx >= SIZEMIN) addImageSize(item.uid, 0, 0, mx, 0);
        } else if (i === 6) {
          if (item.rect.height + my >= SIZEMIN) addImageSize(item.uid, 0, 0, 0, my);
        } else if (i === 7) {
          if (item.rect.width + mx*-1 >= SIZEMIN) addImageSize(item.uid, mx, 0, mx*-1, 0);
        };
      };
      $n.onpointerup = () => {
        $n.releasePointerCapture(p.pointerId);
        refreshThumbnail(current, photozone);
        $n.onpointermove = null;
        $n.onpointerup = null;
      };
    };
    $n.ontouchstart = (t) => {
        main.classList.add("oh");
        let ox = t.touches[0].clientX;
        let oy = t.touches[0].clientY;
        $n.ontouchmove = (m) => {
          const item = slide[current].assets.objects.find((x) => x.uid === objManager.selected);
          if (!item || !item.flags.sizeAdjustable) return;
          const x = m.touches[0].clientX;
          const y = m.touches[0].clientY;
          const mx = x - ox;
          const my = y - oy;
          ox = x;
          oy = y;
          if (i === 0) {
            if (item.rect.width + mx*-1 >= SIZEMIN) addImageSize(item.uid, mx, 0, mx*-1, 0);
            if (item.rect.height + my*-1 >= SIZEMIN) addImageSize(item.uid, 0, my, 0, my*-1);
          } else if (i === 1) {
            if (item.rect.width + mx >= SIZEMIN) addImageSize(item.uid, 0, 0, mx, 0);
            if (item.rect.height + my*-1 >= SIZEMIN) addImageSize(item.uid, 0, my, 0, my*-1);
          } else if (i === 2) {
            if (item.rect.width + mx*-1 >= SIZEMIN) addImageSize(item.uid, mx, 0, mx*-1, 0);
            if (item.rect.height + my >= SIZEMIN) addImageSize(item.uid, 0, 0, 0, my);
          } else if (i === 3) {
            if (item.rect.width + mx >= SIZEMIN) addImageSize(item.uid, 0, 0, mx, 0);
            if (item.rect.height + my >= SIZEMIN) addImageSize(item.uid, 0, 0, 0, my);
          } else if (i === 4) {
            if (item.rect.height + my*-1 >= SIZEMIN) addImageSize(item.uid, 0, my, 0, my*-1);
          } else if (i === 5) {
            if (item.rect.width + mx >= SIZEMIN) addImageSize(item.uid, 0, 0, mx, 0);
          } else if (i === 6) {
            if (item.rect.height + my >= SIZEMIN) addImageSize(item.uid, 0, 0, 0, my);
          } else if (i === 7) {
            if (item.rect.width + mx*-1 >= SIZEMIN) addImageSize(item.uid, mx, 0, mx*-1, 0);
          };
        };
        $n.ontouchend = () => {
          main.classList.remove("oh");
          $n.ontouchmove = null;
          $n.ontouchend = null;
        };
    };
  });
  rotatePoint.onpointerdown = (p) => {
    if (p.pointerType === "mouse" && p.buttons !== 1) return;
    rotatePoint.setPointerCapture(p.pointerId);
    rotatePoint.onpointermove = (m) => {
      const item = slide[current].assets.objects.find((x) => x.uid === objManager.selected);
      if (!item || !item.flags.sizeAdjustable) return;
      const ppos = photozone.getBoundingClientRect();
      const offsetX = item.rect.x + item.rect.width / 2;
      const offsetY = item.rect.y + item.rect.height / 2;
      const x = m.clientX - offsetX - ppos.x;
      const y = m.clientY - offsetY - ppos.y;
      const d = Math.atan2(y, x) * 180 / Math.PI + 180;
      setImageRotate(item.uid, d - 90);
    };
    rotatePoint.onpointerup = () => {
      refreshThumbnail(current, photozone);
      rotatePoint.onpointermove = null;
      rotatePoint.onpointerup = null;
    };
  };
  rangeOpacity.oninput = (e) => {
    const item = slide[current].assets.objects.find((x) => x.uid === objManager.selected);
    if (!item) return;
    setImageOpacity(item.uid, parseInt(e.target.value)/100);
  };

  // 개체 컨트롤 바 기능
  btnContBottommost.onclick = () => {
    moveToBottommost(current, objManager.selected);
    refreshThumbnail(current, photozone);
  };
  btnContBottom.onclick = () => {
    moveToBottom(current, objManager.selected);
    refreshThumbnail(current, photozone);
  };
  btnContFront.onclick = () => {
    moveToFront(current, objManager.selected);
    refreshThumbnail(current, photozone);
  };
  btnContFrontmost.onclick = () => {
    moveToFrontmost(current, objManager.selected);
    refreshThumbnail(current, photozone);
  };
  btnContFlipHori.onclick = () => {
    flipHorizontal(current, objManager.selected);
    refreshThumbnail(current, photozone);
  };
  btnContFlipVert.onclick = () => {
    flipVertical(current, objManager.selected);
    refreshThumbnail(current, photozone);
  };
  btnContDarker.onclick = () => {
    toggleObjectDarker(current, objManager.selected);
    refreshThumbnail(current, photozone);
  };
  btnContReset.onclick = () => {
    rescueObject(current, objManager.selected);
    refreshThumbnail(current, photozone);
  };
  btnContRemove.onclick = () => {
    removeObject(current, objManager.selected);
    refreshThumbnail(current, photozone);
  };
  btnContUnselect.onclick = () => {
    unselectItem();
  };
  btnMovetoHoriLeft.onclick = () => {
    const tslide = slide[current];
    const item = tslide.assets.objects.find((x) => x.uid === objManager.selected);
    if (!item) return;
    setImagePos(item.uid, 0, null);
  };
  btnMovetoHoriCenter.onclick = () => {
    const tslide = slide[current];
    const item = tslide.assets.objects.find((x) => x.uid === objManager.selected);
    if (!item) return;
    setImagePos(item.uid, (tslide.area.width - item.rect.width)/2, null);
  };
  btnMovetoHoriRight.onclick = () => {
    const tslide = slide[current];
    const item = tslide.assets.objects.find((x) => x.uid === objManager.selected);
    if (!item) return;
    setImagePos(item.uid, tslide.area.width - item.rect.width, null);
  };
  btnMovetoVertTop.onclick = () => {
    const tslide = slide[current];
    const item = tslide.assets.objects.find((x) => x.uid === objManager.selected);
    if (!item) return;
    setImagePos(item.uid, null, 0);
  };
  btnMovetoVertMiddle.onclick = () => {
    const tslide = slide[current];
    const item = tslide.assets.objects.find((x) => x.uid === objManager.selected);
    if (!item) return;
    setImagePos(item.uid, null, (tslide.area.height - item.rect.height)/2);
  };
  btnMovetoVertBottom.onclick = () => {
    const tslide = slide[current];
    const item = tslide.assets.objects.find((x) => x.uid === objManager.selected);
    if (!item) return;
    setImagePos(item.uid, null, tslide.area.height - item.rect.height);
  };
  btnMovetoCenter.onclick = () => {
    btnMovetoHoriCenter.click();
    btnMovetoVertMiddle.click();
  };
  btnContRemoveAlt.onclick = () => {
    removeObject(current, objManager.selected);
    refreshThumbnail(current, photozone);
  };
  btnContUnselectAlt.onclick = () => {
    unselectItem();
  };

  // 화면 이동
  const main = $("main");
  const layerPos = $("#pos-layer")
  const setAreaPos = (x, y) => {
    areaRect.x = x;
    areaRect.y = y;
    layerPos.style["transform"] = `translate(${x}px, ${y}px)`;
  };
  main.onpointerdown = (p) => {
    if (p.target !== main) return;
    if (p.pointerType === "mouse" && p.buttons !== 1) return;
    main.setPointerCapture(p.pointerId);
    main.onpointermove = (m) => {
      setAreaPos(areaRect.x + m.movementX, areaRect.y + m.movementY);
    };
    main.onpointerup = () => {
      if (main.hasPointerCapture(p.pointerId)) main.releasePointerCapture(p.pointerId);
      main.onpointermove = null;
      main.onpointerup = null;
    };
  };
  main.ontouchstart = (t) => {
    if (t.touches[0].target !== main) return;
    let ox = t.touches[0].clientX;
    let oy = t.touches[0].clientY;
    main.ontouchmove = (m) => {
      const x = m.touches[0].clientX;
      const y = m.touches[0].clientY;
      const mx = x - ox;
      const my = y - oy;
      ox = x;
      oy = y;
      setAreaPos(areaRect.x + mx, areaRect.y + my);
    };
    main.ontouchend = () => {
      main.ontouchmove = null;
      main.ontouchend = null;
    };
  };
  setAreaPos(0, 0);

  // 화면 확대/축소
  const layerScale = $("#scale-layer");
  const pScales = $a(".scale");
  const setScale = (i) => {
    if (Number.isNaN(parseInt(i))) return;
    scale = i;
    applyScale();
  };
  const addScale = (i) => {
    if (Number.isNaN(parseInt(i))) return;
    scale += i;
    applyScale();
  };
  const applyScale = () => {
    if (scale > SCALEMAX) scale = SCALEMAX;
    else if (scale < SCALEMIN) scale = SCALEMIN;
    layerScale.style["transform"] = `scale(${scale})`;
    for (const node of pScales) node.innerText = `${Math.floor(1*scale*100)}%`;
    // pScale.innerText = `${Math.floor(1*scale*100)}%`;
  };
  main.onwheel = (e) => {
    // deltaY: 휠 내림 === 양수값, 휠 올림 === 음수값
    if (e.deltaY > 0) {
      addScale(SCALESTEPS*-1);
    } else if (e.deltaY < 0) {
      addScale(SCALESTEPS);
    };
  };
  setScale(1);

  // 화면 우클릭 메뉴
  const conxMenu = $("#main-context-menu");
  const conxMenuSecrets = $a(`*[data-secret="true"]`, conxMenu);
  const btnConxMenuAddImage = $("#button-cm-add-image");
  const btnConxMenuAddDialogue = $("#button-cm-add-dialogue");
  const btnConxMenuAddSticker = $("#button-cm-add-sticker");
  const btnConxMenuCreateSlide = $("#button-cm-create-slide");
  const btnConxMenuSetBg = $("#button-cm-set-bg");
  const openContextMenu = (e) => {
    append(conxMenu);
    const rect = conxMenu.getBoundingClientRect();
    let x = e.clientX;
    let y = e.clientY;

    x = ((x + rect.width) > (window.innerWidth - CONTEXT_MENU_AREA_INNER_PADDING)) ? (window.innerWidth - CONTEXT_MENU_AREA_INNER_PADDING - rect.width) :
    (x < CONTEXT_MENU_AREA_INNER_PADDING) ? CONTEXT_MENU_AREA_INNER_PADDING : x;
    y = ((y + rect.height) > (window.innerHeight - CONTEXT_MENU_AREA_INNER_PADDING)) ? (window.innerHeight - CONTEXT_MENU_AREA_INNER_PADDING - rect.height) :
    (y < CONTEXT_MENU_AREA_INNER_PADDING) ? CONTEXT_MENU_AREA_INNER_PADDING : y;
    
    document.addEventListener("click", closeContextMenu);
    for (const node of conxMenuSecrets) {
      node.style["display"] = keys["Control"] ? null : "none";
    };

    conxMenu.animate([
      {
        "transform": `translate(${x - 20}px, ${y - 20}px) scale(0.9)`,
        "opacity": "0"
      },
      {
        "transform": `translate(${x}px, ${y}px) scale(1)`,
        "opacity": "1"
      }
    ], {
      duration: CONTEXT_MENU_ANIMATION_DURATION,
      fill: "both",
      easing: "cubic-bezier(0.17, 0.67, 0.49, 0.99)"
    });
    conxMenu.style["pointer-events"] = "auto";
  };
  const closeContextMenu = (e) => {
    if (
      e.target === conxMenu ||
      (typeof e.target.dataset.contextMenu !== "undefined" && e.target.dataset.contextMenu === "maintain")
    ) return;
    document.removeEventListener("click", closeContextMenu);

    conxMenu.animate([
      {
        "transform": "translate(0px, 0px) scale(1)"
      },
      {
        "transform": "translate(-20px, -20px) scale(0.9)"
      }
    ], {
      duration: CONTEXT_MENU_ANIMATION_DURATION,
      fill: "both",
      easing: "cubic-bezier(0.55, 0.02, 0.76, 0.53)",
      composite: "add"
    });
    conxMenu.animate([
      {
        "opacity": "1"
      },
      {
        "opacity": "0"
      }
    ], {
      duration: CONTEXT_MENU_ANIMATION_DURATION,
      fill: "both",
      easing: "cubic-bezier(0.55, 0.02, 0.76, 0.53)"
    });
    conxMenu.style["pointer-events"] = "none";
  };
  main.oncontextmenu = (e) => {
    openContextMenu(e);
    return false;
  };
  conxMenu.oncontextmenu = (e) => {
    openContextMenu(e);
    return false;
  };
  btnConxMenuAddImage.onclick = () => {
    btnAddImage.click();
  };
  btnConxMenuAddDialogue.onclick = () => {
    btnAddDialogue.click();
  };
  btnConxMenuAddSticker.onclick = () => {
    btnAddSticker.click();
  };
  btnConxMenuCreateSlide.onclick = () => {
    btnAddSlide.click();
  };
  btnConxMenuSetBg.onclick = () => {
    btnBgSet.click();
  };

  // 화면 컨트롤러 기능
  const btnsZoomOut = $a(".button-zoom-out");
  const btnsZoomReset = $a(".button-zoom-reset");
  const btnsZoomIn = $a(".button-zoom-in");
  for (const btn of btnsZoomOut) {
    btn.onclick = () => {
      addScale(SCALESTEPS*-1);
    };
  };
  for (const btn of btnsZoomIn) {
    btn.onclick = () => {
      addScale(SCALESTEPS);
    };
  };
  for (const btn of btnsZoomReset) {
    btn.onclick = () => {
      setAreaPos(0, 0);
      setScale(1);
    };
  };

  // 대화창 클릭시 메뉴 열림
  sboxes.forEach((node) => {
    node.onclick = () => {
      if (currentMenu !== "menu-scriptbox") {
        toggleMenu("menu-scriptbox");
        setTimeout(inputCont.focus());
      };
    };
  });

  // 검색 기능
  const btnsSearch = $a(".button-search");
  const search = $("#search-area");
  const searchBar = $("#search");
  const sresList = $("#search-result-list");
  const sres = $("#search-result-list > .slist");
  const pSresLength = $("#search-result-list > .num");
  const inputSearch = $("#input-search");
  const toggleSearch = () => {
    setTimeout(() => {
      search.style["display"] = "flex";
      sresList.style["display"] = "none";
      $a("*", sres).forEach((x) => x.remove());
      setTimeout(() => inputSearch.focus(), COMMON_INTERVAL);
    });
  };
  for (const btn of btnsSearch) {
    btn.onclick = () => {
      toggleSearch();
    };
  };
  inputSearch.onkeydown = (e) => {
    if ((e.code === "Enter" || e.key === "Enter") && e.target.value?.length > 0) {
      const raw = e.target.value;
      const index = Object.keys(slide).map((x) => {
        return {
          id: parseInt(x),
          items: {
            content: `${slide[x].toggles.namearea ? `${slide[x].strings.name}: ` : ""}${slide[x].strings.contentRaw}`,
            dialogues: slide[x].assets.objects.filter((y) => y.type === "dialogue").map((y) => {
              return {
                uid: y.uid,
                content: y.assets.data.contentRaw
              };
            })
          }
        };
      });
      const checked = index.filter((x) => (new RegExp(`(${raw})`, "gi").exec(x.items.content) || x.items.dialogues.filter((y) => new RegExp(`(${raw})`, "gi").exec(y.content)).length));
      if (checked.length === 1) {
        setSlide(checked[0].id);
        e.target.value = null;
        search.style["display"] = "none";
      } else if (checked.length > 1) {
        checked.forEach((x) => {
          const btn = create("button", {
            classes: [ "item" ],
            properties: {
              innerHTML: `<h3>슬라이드 ${x.id+1}</h3>` +
                `<p>"${x.items.content}"</p>` +
                (x.items.dialogues.length ? `<p>${x.items.dialogues.map((y) => `말풍선 ${y.uid} "${y.content}"`).join("<br>")}</p>` : "")
            }
          });
          btn.onclick = () => setSlide(x.id);
          append(btn, sres);
        });
        sresList.style["display"] = "flex";
        pSresLength.innerText = `${checked.length}개의 결과`;
        setTimeout(() => {
          $("button.item", sres).focus();
        }, COMMON_INTERVAL);
      };
    } else if (e.code === "Enter") {
      e.target.value = null;
      search.style["display"] = "none";
    };
  };
  document.addEventListener("click", (e) => {
    if (e.target !== searchBar
        && e.target !== inputSearch
        && e.target !== sresList
        && e.target !== pSresLength) {
      search.style["display"] = "none";
      inputSearch.value = null;
    };
  });

  // 빠른 대사입력 기능
  const quick = $("#quick-input-area");
  const quickBar = $("#quick");
  const inputQuick = $("#input-quick");
  const quickName = $a(".name", quick);
  const quickIndex = $a(".index", quick);
  const toggleQuick = () => {
    setTimeout(() => {
      const id = slide[current].assetOptions.namearea.reservedPreset;
      for (const n of quickIndex) {
        n.innerText = (id !== null) ? `${id}` : "초기화되지 않음";
      };
      for (const n of quickName) {
        n.innerText = `${slide[current].strings.name}`;
      };
      quick.style["display"] = "flex";
      setTimeout(() => inputQuick.focus(), COMMON_INTERVAL);
    });
  };
  const cycleNameColor = (i) => {
    const pid = slide[current].assetOptions.namearea.reservedPreset;
    if (pid === null) {
      new LyraNotification({ "icon": "warning", "text": "사도 색상표가 초기화되지 않았거나 문제가 발생하여 기능을 수행할 수 없습니다." }).show();
      return;
    };

    const cp = $a(".color-preset-item", presetList);
    if (cp[pid+i]) {
      cp[pid+i].click();
      setTimeout(() => inputQuick.focus());
      
      for (const n of quickIndex) {
        n.innerText = (pid !== null) ? `${pid}` : "초기화되지 않음";
      };
      for (const n of quickName) {
        n.innerText = `${slide[current].strings.name}`;
      };
    };
  };
  inputQuick.onkeydown = (e) => {
    if (e.code === "Enter") {
      if (e.target.value?.length > 0) {
        setContent(e.target.value);
      };
      quick.style["display"] = "none";
      inputQuick.value = null;
    } else if (e.code === "PageUp") {
      cycleNameColor(-1);
    } else if (e.code === "PageDown") {
      cycleNameColor(1);
    };
  };
  document.addEventListener("click", (e) => {
    if (e.target !== quick
        && e.target !== quickBar
        && e.target !== inputQuick ) {
      quick.style["display"] = "none";
      inputQuick.value = null;
    };
  });

  // 리소스 갤러리 기능
  const btnsGallery = $a(".button-resource-gallery");
  const gallery = modalman.reserve["modal-resource-gallery"];
  const gbtnImage = $("#rg-image", gallery.nodes.main);
  const gbtnSbox = $("#rg-scriptbox", gallery.nodes.main);
  const gbtnDialogue = $("#rg-dialogue", gallery.nodes.main);
  const gbtnSticker = $("#rg-sticker", gallery.nodes.main);
  const gbtnFtDefault = $("#rg-filter-default", gallery.nodes.main);
  const gbtnFtCinemascope = $("#rg-filter-cinemascope", gallery.nodes.main);
  const btnCloseGallery = $("button.close", gallery.nodes.main);
  for (const btn of btnsGallery) {
    btn.onclick = () => {
      gallery.show();
    };
  };
  gbtnImage.onclick = () => {
    unselectItem();
    callImageUploader(current);
    btnCloseGallery.click();
  };
  gbtnSbox.onclick = () => {
    unselectItem();
    addObject(current, "dialogue");
    refreshThumbnail(current, photozone);
    btnCloseGallery.click();
  };
  gbtnDialogue.onclick = () => {
    unselectItem();
    addObject(current, "dialogue");
    refreshThumbnail(current, photozone);
    btnCloseGallery.click();
  };
  gbtnSticker.onclick = () => {
    unselectItem();
    addObject(current, "sticker");
    refreshThumbnail(current, photozone);
    btnCloseGallery.click();
  };
  gbtnFtDefault.onclick = () => {
    unselectItem();
    addObject(current, "filter");
    refreshThumbnail(current, photozone);
    btnCloseGallery.click();
  };
  gbtnFtCinemascope.onclick = () => {
    unselectItem();
    addObject(current, "filter", { type: "cinemascope" });
    refreshThumbnail(current, photozone);
    btnCloseGallery.click();
  };

  // 메뉴바 툴팁 기능
  const menuTip = $("#float-menu-area .tip");
  document.addEventListener("mousemove", (e) => {
    if (e.target.dataset?.menuTip) {
      menuTip.innerHTML = `${e.target.dataset.menuTip}${e.target.dataset.menuShortcut ? `<span class="key-hint">${e.target.dataset.menuShortcut}</span>` : ""}`;
    } else {
      menuTip.innerText = null;
    };
  });

  // 키보드 바로가기 기능
  document.addEventListener("keydown", (e) => {
    if (e.target === body) {
      // 메뉴 바로가기
      if (e.code === "KeyA") {
        toggleMenu("menu-doc");
      } else if (e.code === "KeyS") {
        toggleMenu("menu-slide");
      } else if (e.code === "KeyD") {
        toggleMenu("menu-scriptbox");
      } else if (e.code === "KeyF") {
        toggleMenu("menu-elements");
      } else if (e.code === "KeyG") {
        toggleMenu("menu-object");
      } else if (e.code === "KeyH") {
        // toggleMenu("menu-about");
        btnAbout.click();
      } else if (e.code === "Delete") {
        toggleMenu("menu-config");
      }
      // 확대/축소
      else if (e.code === "Minus") {
        addScale(SCALESTEPS*-1);
      } else if (e.code === "Equal") {
        addScale(SCALESTEPS);
      } else if (e.code === "Backspace") {
        setAreaPos(0, 0);
        setScale(1);
      }
      // PNG 이미지로 저장
      else if (e.code === "KeyK") {
        btnSavePNG.click();
      } else if (e.code === "KeyL") {
        btnSavePNGall.click();
      }
      // 검색
      else if (!e.ctrlKey && !e.altKey && e.code === "Space") {
        toggleSearch();
      }
      // 빠른 대사입력
      else if (e.code === "Enter") {
        toggleQuick();
      }
      // 리소스 갤러리
      else if (e.code === "Backslash") {
        gallery.show();
      }
      // 슬라이드 이동
      else if (e.code === "PageUp") {
        setSlide(current-1);
      } else if (e.code === "PageDown") {
        setSlide(current+1);
      } else if (e.code === "Home") {
        setSlide(0);
      } else if (e.code === "End") {
        setSlide(Object.keys(slide).length-1);
      };
    };
    // 메뉴 닫기 & 선택 취소
    if (e.code === "Escape") {
      if (search.checkVisibility()) search.style["display"] = "none";
      else if (quick.checkVisibility()) quick.style["display"] = "none";
      else if (objManager.selected !== null) unselectItem();
      else if (currentMenu !== null) Array.from(tglMenus).find((x) => x.dataset.menu === currentMenu)?.click();
    };
    // 사이트 중지 테스트용
    if (currentMenu === "menu-about") {
      if (e.ctrlKey && e.altKey && e.code === "Space") {
        callHalt("사용자의 호출로 사이트가 중지되었습니다.");
      };
    };
  });

  // 버전 텍스트 적용
  $a(".ver").forEach((node) => {
    node.innerText = APP.version;
  });

  // 스플래시 화면
  const splash = $("#immersive-splash");
  const btnOpenOnSplash = $("#button-splash-open");
  const btnCloseSplash = $("#button-splash-close");
  const closeSplash = () => {
    splash.style["pointer-events"] = "none";
    splash.animate([
      {
        "transform": "translateY(0%) scale(1)",
        "opacity": "1"
      },
      {
        "transform": "translateY(-10%) scale(0.9)",
        "opacity": "0"
      }
    ], {
      duration: SPLASH_TIMEOUT_ANIMATION_DURATION,
      fill: "both",
      easing: "cubic-bezier(0.55, 0.02, 0.76, 0.53)"
    });
    setTimeout(() => {
      splash.parentNode.remove();
    }, SPLASH_TIMEOUT_ANIMATION_DURATION + COMMON_INTERVAL);
  };
  btnOpenOnSplash.onclick = () => {
    closeSplash();
    openFile();
  };
  btnCloseSplash.onclick = () => {
    closeSplash();
  };
  setTimeout(closeSplash, SPLASH_TIMEOUT);
})();