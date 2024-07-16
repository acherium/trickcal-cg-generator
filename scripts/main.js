(() => {
    const app = {
        name: "Project Pictor",
        author: "Acherium",
        contact: "acherium@pm.me",
        version: "1110",
        date: "24-07-11",
        watermark: false,
        isBeta: false
    };
    const SIZEMIN = 32;
    const WIDTHMIN = 1000;
    const HEIGHTMIN = 600;
    const WIDTHMAX = 2000;
    const HEIGHTMAX = 2000;
    const DATATEMPLATE = {
        version: 3,
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
        area: {
            width: 1280,
            height: 720
        },
        values: {
            style: 0,
            backgroundFit: "fit-height",
            color: "EEC375",
            colorId: 18
        },
        color: {
            namearea: {
                r: 238,
                g: 195,
                b: 117
            },
            background: {
                r: 0,
                g: 0,
                b: 0
            }
        },
        toggles: {
            title: false,
            location: false,
            namearea: true,
            content: true,
            select: false,
            photoButtons: true,
            boxCenter: false
        },
        imageLayer: {
            background: "",
            attachments: []
        },
        thumbnail: ""
    };
    THUMBNAIL_QUEUE_INTERVAL = 3000;
    const PALETTE = {
        "player": [ "player", "교주", "FBAC26" ],
        "youngchun": [ "youngchun", "영춘", "768964" ],
        "sub": [ "sub", "게스트", "A1AD88" ],
        
        "partition0": [ "partition", "요정" ],
        "chloe": [ "chloe", "클로에", "BB3626" ],
        "erpin": [ "erpin", "에르핀", "F09D7D" ],
        "ner": [ "ner", "네르", "847592" ],
        "ashur": [ "ashur", "에슈르", "E6838D" ],
        "kyarot": ["kyarot",  "캬롯", "F49C62" ],
        "shoupan": [ "shoupan", "슈팡", "FFE182" ],
        "marie": [ "marie", "마리", "E7BBBB" ],
        "mayo": [ "mayo", "마요", "A0B5D5" ],
    
        "partition1": [ "partition", "수인" ],
        "epica": [ "epica", "에피카", "BDD2F0" ],
        "diana": [ "diana", "디아나", "C19079" ],
        "tig": [ "tig", "티그", "9AAABF" ],
        "rufo": [ "rufo", "루포", "F69E72" ],
        "kommy": [ "kommy", "코미", "FFA8A7" ],
        "butter": [ "butter", "버터", "EEC375" ],
        "beni": [ "beni", "베니", "64443E" ],
        "mago": [ "mago", "마고", "B6BBCB" ],
        "bana": [ "bana", "바나", "EDB983" ],
    
        "partition2": [ "partition", "엘프" ],
        "ed": [ "ed", "이드", "808191" ],
        "llels": [ "llels", "나타", "635966" ],
        "elena": ["elena",  "엘레나", "DA9798" ],
        "amelia": [ "amelia", "아멜리아", "926F6E" ],
        "hilde": [ "hilde", "힐데", "CCE993" ],
        "risty": [ "risty", "리스티", "AE6D7F" ],
        "risty.glove": [ "risty.glove", "글러브", "A1AD88" ],
        "canna": [ "canna", "칸나", "B77148" ],
        "rohne": [ "rohne", "로네", "C1B4B7" ],
        "maestro": [ "maestro", "마에스트로 2호", "35B7AE" ],
        "festa": [ "festa", "페스타", "EC7A84" ],
        "renewa": [ "renewa", "리뉴아", "E8D7B7" ],
        "renewa2": [ "renewa2", "리뉴아", "43475D" ],
        "haley": [ "haley", "헤일리", "E83B92" ],
        
        "partition3": [ "partition", "정령" ],
        "ui": [ "ui", "우이", "FFDB5B" ],
        "sylla": [ "sylla", "실라", "C9DBBA" ],
        "naia": [ "naia", "나이아", "91D2EB" ],
        "meluna": [ "meluna", "멜루나", "BCD190" ],
        "blanchet": [ "blanchet", "블랑셰", "2660E1" ],
        "ifrit": ["ifrit",  "이프리트", "EE5C3A" ],
        "gabia": [ "gabia", "가비아", "8A5350" ],
        "jubee": [ "jubee", "쥬비", "D89E5A" ],
        "bigwood": [ "bigwood", "빅우드", "97A262" ],
    
        "partition4": [ "partition", "유령" ],
        "xion": [ "xion", "시온 더 다크불릿", "4C76AD" ],
        "shady": [ "shady", "셰이디", "9DBAC1" ],
        "rim": [ "rim", "림", "AB474A" ],
        "elice": [ "elice", "엘리스", "CAA4DD" ],
        "selline": [ "selline", "셀리네", "F7AFBB" ],
        "speaki": [ "speaki", "스피키", "71566C" ],
        "espi": [ "espi",  "에스피", "D4B9BA" ],
        "lethe": [ "lethe", "레테", "A8BCC7" ],
    
        "partition5": [ "partition", "용족" ],
        "vivi": [ "vivi", "비비", "B8AFB1" ],
        "daya": [ "daya", "다야", "A8BBC8" ],
        "rude": [ "rude", "루드", "C75B5C" ],
        "kidian": [ "kidian", "키디언", "604E65" ],
        "leets": [ "leets", "리츠", "8F868A" ],
        "sist": [ "sist", "시스트", "BD8CB7" ],
        "jade": [ "jade", "제이드", "85A491" ],
        "silphir": [ "silphir", "실피르", "8AA9CF" ],
    
        "partition6": [ "partition", "마녀" ],
        "aya": [ "aya", "아야", "F1F8FF" ],
        "belita": [ "belita", "벨리타", "D3A9A9" ],
        "fricle": [ "fricle", "프리클", "675359" ],
        "velvet": [ "velvet", "벨벳", "5C4F62" ],
        "posher": [ "posher", "포셔", "D67B8F" ],
        "rollett": [ "rollett", "롤렛", "C65A66" ],
        "picora": [ "picora", "피코라", "8DC9CA" ],
        "levi": [ "levi", "레비", "A0385A" ]
    };
    const BOXES = {
        0: {
            src: "./assets/images/scriptbox-0.svg",
            vignetting: false,
            sokmaeum: false,
            color: "dark"
        },
        1: {
            src: "./assets/images/scriptbox-1.svg",
            vignetting: false,
            sokmaeum: true,
            color: "dark"
        },
        2: {
            src: "./assets/images/scriptbox-2.svg",
            vignetting: true,
            sokmaeum: false,
            color: "light"
        },
        3: {
            src: "./assets/images/scriptbox-3.svg",
            vignetting: false,
            sokmaeum: false,
            color: "dark"
        },
        4: {
            src: "./assets/images/scriptbox-4.svg",
            vignetting: false,
            sokmaeum: false,
            color: "dark"
        },
        5: {
            src: "./assets/images/scriptbox-5.svg",
            vignetting: false,
            sokmaeum: false,
            color: "dark"
        }
    };
    const BG_FIT_OPTIONS = [ "fit-height", "fit-width", "stretch-height", "stretch-width", "fill" ];
    const SCRIPT_MARKDOWN = [
        [ /([\n\r]){1,2}/g, "<br>" ],
        [ /\\/g, "" ],
        [ /</g, "&lt;" ],
        [ />/g, "&gt;" ],
        [ /(\(\(\()/g, "<span class=\"s\">" ],
        [ /({{{)/g, "<span class=\"m\">" ],
        [ /(\[\[\[)/g, "<span class=\"b\">" ],
        [ /(>>>)/g, "<span class=\"cg\">" ],
        [ /(>>r>>)/g, "<span class=\"cr\">" ],
        [ /(>>g>>)/g, "<span class=\"cg\">" ],
        [ /(>>b>>)/g, "<span class=\"cb\">" ],
        [ /(>>y>>)/g, "<span class=\"cy\">" ],
        [ /(>>p>>)/g, "<span class=\"cp\">" ],
        [ /(\:\:\:)/g, "</span>" ]
    ];

    const $ = (x) => document.querySelector(x);
    const $a = (x) => document.querySelectorAll(x);

    let slide = [];
    let thumbnailQueue = {};
    let current = 0;
    let imageItemIdInt = 0;
    let flagMobileMenu = null;
    let imageLayer = {};
    const areaRect = {
        x: 0,
        y: 0
    };
    const imageController = {
        rect: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        selected: null
    };
    const touchManager = {
        x: 0,
        y: 0
    };

    const $logo = $("#logo-area");
    const $ver = $("#ver");
    const $main = $("main");
    const $left = $("#left");
    const $middle = $("#middle");
    const $right = $("#right");
    const $mBtnTglLeft = $("#m-button-toggle-slide");
    const $mBtnTglRight = $("#m-button-toggle-layer");
    const $namearea = $("#photo-script-box-namearea");
    const $nameOutline = $("#photo-script-box-namebox > span:nth-child(1)");
    const $name = $("#photo-script-box-namebox > span:nth-child(2)");
    const $nameBg = $("#photo-script-box-name-backdrop");
    const $inputName = $("#name");
    const $selNameBgCol = $("#name-color");
    const $pickerName = $("#colorpicker-namearea");
    const $pickerNamePrev = $("#colorpicker-namearea .colorpicker-preview");
    const $pickerNamePrevValue = $("#colorpicker-namearea .colorpicker-preview-value");
    const $pickerNameBars = $a("#colorpicker-namearea .colorpicker-bar");
    const $pickerNamePointers = $a("#colorpicker-namearea .colorpicker-pointer");
    const $pickerNameInputs = $a("#colorpicker-namearea .colorpicker-input");
    const $chkAutoName = $("#checkbox-toggle-auto-change-name");
    const $chkTglName = $("#checkbox-toggle-namearea");
    const $btnName = $("#photo-script-box-namebox > span:last-child");
    const $titleArea = $("#photo-title-box-area");
    const $title = $("#photo-title > span");
    const $titleOutline = $("#photo-title-box-namearea > span:nth-child(1)");
    const $titleName = $("#photo-title-box-namearea > span:nth-child(2)");
    const $inputTitleName = $("#input-title-name");
    const $inputTitle = $("#input-title-content");
    const $chkTglTitle = $("#checkbox-toggle-title");
    const $locArea = $("#photo-location-box-area");
    const $loc = $("#photo-location");
    const $inputLoc = $("#input-location");
    const $chkTglLoc = $("#checkbox-toggle-location");
    const $contentArea = $("#photo-script-box-area");
    const $content = $("#script-content");
    const $contentBox = $("#photo-script-box-backdrop");
    const $btnContent = $("#button-content");
    const $chkTglContentCenter = $("#checkbox-toggle-box-position-center");
    const $inputContent = $("#content");
    const $modalContent = $("#modal-content");
    const $chkTglContent = $("#checkbox-toggle-content");
    const $btnMdHelp = $("#button-markdown-help");
    const $box = $("#photo-script-box-backdrop");
    const $vignetting = $("#photo-vignetting");
    const $sokmaeum = $("#photo-button-sokmaeum");
    const $selectBoxStyle = $("#content-box-style");
    const $photozone = $("#photo-zone");
    const $bg = $("#photo-bg");
    const $prevBg = $("#preview-bg > img");
    const $btnConfigBg = $("#button-config-bg");
    const $selectBgFit = $("#select-bg-fit");
    const $pickerBg = $("#colorpicker-bg");
    const $pickerBgPrev = $("#colorpicker-bg .colorpicker-preview");
    const $pickerBgPrevValue = $("#colorpicker-bg .colorpicker-preview-value");
    const $pickerBgBars = $a("#colorpicker-bg .colorpicker-bar");
    const $pickerBgPointers = $a("#colorpicker-bg .colorpicker-pointer");
    const $pickerBgInputs = $a("#colorpicker-bg .colorpicker-input");
    const $btnConfigIndi = $("#button-config-indicators");
    const $uploader = $("#uploader");
    const $btnPhotoSet = $("#button-set-bg");
    const $btnPhotoRemove = $("#button-remove-bg");
    const $btnOutput = $("#button-download");
    const $btnOutputContent = $("#button-download-scriptbox");
    const $photoBtn = $("#photo-button-area");
    const $chkPhotoBtn = $("#checkbox-toggle-photo-button");
    const $chkKeyShortcut = $("#checkbox-toggle-shortcut");
    const $btnModalSlideSize = $("#button-slide-size");
    const $btnSlideSize = $a(".button-slide-size");
    const $inputSlideWidth = $("#input-slide-size-width");
    const $inputSlideHeight = $("#input-slide-size-height");
    const $selboxOption = $a(".photo-select-option");
    const $inputSelboxOption = $a(".select-option");
    const $selbox = $("#photo-select");
    const $chkSelbox = $("#checkbox-toggle-select");
    const $btnSelbox = $("#button-select-box");
    const $modalBgs = $a(".modal-area");
    const $imageLayer = $("#photo-layer");
    const $btnAddImage = $("#button-add-image");
    const $imageList = $("#image-item-list");
    const $controller = $("#photo-item-controller");
    const $controllerLayer = $("#photo-item-controller-area");
    const $controllerBar = $("#controller-bar");
    const $resizePoints = $a("#photo-item-controller > .resize-point");
    const $btnBottommost = $("#button-controller-bottommost");
    const $btnBottom = $("#button-controller-bottom");
    const $btnFront = $("#button-controller-front");
    const $btnFrontmost = $("#button-controller-frontmost");
    const $btnFlipHorizontal = $("#button-controller-flip-horizontal");
    const $btnFlipVertical = $("#button-controller-flip-vertical");
    const $chkTglDarker = $("#checkbox-toggle-controller-darker");
    const $btnTglDarker = $("#controller-toggle-darker");
    const $btnControllerReset = $("#button-controller-reset");
    const $btnControllerRemove = $("#button-controller-remove");
    const $btnControllerUnselect = $("#button-controller-unselect");
    const $btnResetImage = $("#button-reset-image");
    const $slideList = $("#slide-list");
    const $btnAddSlide = $("#button-add-slide");
    const $btnDuplicateSlide = $("#button-duplicate-slide");
    const $thumbQueueArea = $("#thumbnail-queue-area");
    const $alertDownload = $("#alert-downloading");
    const $btnOutputAll = $("#button-download-all");

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
    const HEXtoRGB = (hex) => {
        const r = Number(`0x${hex.substring(0, 2)}`);
        const g = Number(`0x${hex.substring(2, 4)}`);
        const b = Number(`0x${hex.substring(4, 6)}`);
        return { r: r, g: g, b: b };
    };
    const setBackgroundFit = (s) => {
        if (!BG_FIT_OPTIONS.includes(s)) return;
        slide[current].values.backgroundFit = s;
        $bg.className = `photo-bg-${s}`;
        Array.from($selectBgFit.querySelectorAll("option")).find(($n) => $n.value === slide[current].values.backgroundFit).selected = true;
    };
    const setAreaWidth = (w) => {
        if (Number.isNaN(w) || w < WIDTHMIN) w = WIDTHMIN;
        if (w > WIDTHMAX) w = WIDTHMAX;
        slide[current].area.width = w;
        $inputSlideWidth.value = w;
        $photozone.style["width"] = `${w}px`;
    };
    const setAreaHeight = (h) => {
        if (Number.isNaN(h) || h < HEIGHTMIN) h = HEIGHTMIN;
        if (h > HEIGHTMAX) h = HEIGHTMAX;
        slide[current].area.height = h;
        $inputSlideHeight.value = h;
        $photozone.style["height"] = `${h}px`;
    };
    const setAreaSize = (w, h) => {
        setAreaWidth(w);
        setAreaHeight(h);
    };
    const setName = (x) => {
        slide[current].strings.name = x;
        $nameOutline.innerText = x;
        $name.innerText = x;
        $inputName.value = x;
    };
    const setNameColor = (hex) => {
        const rgb = HEXtoRGB(hex);
        slide[current].color.namearea = rgb;
        const posper = Object.values(rgb).map((i) => i / 255 * 100);
        $nameBg.style["background-color"] = `#${hex}`;
        $pickerNamePrev.style["background-color"] = `#${hex}`;
        $pickerNamePrev.style["border-color"] = `#${hex}`;
        $pickerNamePrevValue.innerText = `#${hex}\n${Object.values(rgb).join(", ")}`;
        Array.from($pickerNamePointers).forEach(($n, i) => {
            $n.style["left"] = `${posper[i]}%`;
        });
        Array.from($pickerNameInputs).forEach(($n, i) => {
            $n.value = Object.values(rgb)[i];
        });
    };
    const setNameColorRGB = (rgb) => {
        slide[current].color.namearea = rgb;
        const posper = Object.values(rgb).map((i) => i / 255 * 100);
        const hex = RGBtoHEX(rgb);
        $nameBg.style["background-color"] = `#${hex}`;
        $pickerNamePrev.style["background-color"] = `#${hex}`;
        $pickerNamePrev.style["border-color"] = `#${hex}`;
        $pickerNamePrevValue.innerText = `#${hex}\n${Object.values(rgb).join(", ")}`;
        Array.from($pickerNamePointers).forEach(($n, i) => {
            $n.style["left"] = `${posper[i]}%`;
        });
        Array.from($pickerNameInputs).forEach(($n, i) => {
            $n.value = Object.values(rgb)[i];
        });

    };
    const setContent = (x) => {
        let res = x;
        for (const regxp of SCRIPT_MARKDOWN) res = res.replace(regxp[0], regxp[1]);
        slide[current].strings.contentRaw = x;
        slide[current].strings.content = res;
        $content.innerHTML = res;
        $inputContent.value = x;
    };
    const setBoxStyle = (i) => {
        const d = BOXES[i];
        if (!d) return;
        slide[current].values.style = i;
        $content.classList.remove("script-content-font-dark");
        $content.classList.remove("script-content-font-light");
        $content.classList.add(`script-content-font-${d.color}`);
        $box.src = d.src;
        $vignetting.style["display"] = d.vignetting ? "block" : "none";
        $sokmaeum.style["display"] = d.sokmaeum ? "block" : "none";
        $selectBoxStyle.querySelectorAll("option")[i].selected = true;
    };
    const setTitleName = (s) => {
        slide[current].strings.title.name = s;
        $titleOutline.innerText = s;
        $titleName.innerText = s;
        $inputTitleName.value = s;
    };
    const setTitle = (s) => {
        slide[current].strings.title.content = s;
        $title.innerText = s;
        $inputTitle.value =s;
    };
    const setLocation = (s) => {
        slide[current].strings.location = s;
        $loc.innerText = s;
        $inputLoc.value = s;
    };
    const toggleNamearea = (b) => {
        slide[current].toggles.namearea = b;
        $chkTglName.checked = b;
        $name.style["display"] = b ? "inline" : "none";
        $nameOutline.style["display"] = b ? "inline" : "none";
        $nameBg.style["display"] = b ? "block" : "none";
    };
    const toggleSelectBox = (b) => {
        slide[current].toggles.select = b;
        $chkSelbox.checked = b;
        $selbox.style["display"] = b ? "flex" : "none";
    };
    const togglePhotoButtons = (b) => {
        slide[current].toggles.photoButtons = b;
        $chkPhotoBtn.checked = b;
        $photoBtn.style["display"] = b ? "flex" : "none";
    };
    const toggleContentBoxCenter = (b) => {
        slide[current].toggles.boxCenter = b;
        $chkTglContentCenter.checked = b;
        if (b) {
            $contentArea.classList.add("content-box-center");
        } else {
            $contentArea.classList.remove("content-box-center");
        };
    };
    const toggleTitle = (b) => {
        slide[current].toggles.title = b;
        $chkTglTitle.checked = b;
        $titleArea.style["display"] = b ? "flex" : "none";
    };
    const toggleLocation = (b) => {
        slide[current].toggles.location = b;
        $chkTglLoc.checked = b;
        $locArea.style["display"] = b ? "flex" : "none";
    };
    const toggleContent = (b) => {
        slide[current].toggles.content = b;
        $chkTglContent.checked = b;
        $contentArea.style["display"] = b ? "flex" : "none";
    };
    const setBackground = (f) => {
        slide[current].imageLayer.background = f;
        $bg.src = f;
        $prevBg.src = f;
        refreshThumbnail(current, $photozone);
    };
    const addImageItem = (d) => {
        const item = JSON.parse(JSON.stringify(d));
        const $img = new Image();
        $img.src = item.data;
        $img.style["top"] = `${item.rect.y}px`;
        $img.style["left"] = `${item.rect.x}px`;
        $img.style["width"] = `${item.rect.width}px`;
        $img.style["height"] = `${item.rect.height}px`;
        $img.dataset.id = `${item.id}`;
        $img.onclick = () => {
            selectItem(item.id);
        };
        $img.style["transform"] = `${item.flip.horizontal ? "scaleX(-1)" : ""}${item.flip.vertical ? "scaleY(-1)" : ""}`;
        if (item.darker) {
            $img.classList.add("image-item-darker");
        };
        const $lab = document.createElement("div");
        $lab.classList.add("image-item");
        $lab.innerHTML += `<div class="thumb"><img src="${item.data}"></div>` +
            `<p>${item.name}</p>` +
            `<button class="remove"><div class="i i-trash"></div></button>`;
        $lab.querySelector("button.remove").onclick = () => {
            $img.remove();
            $lab.remove();
            delete imageLayer[imageController.selected];
            delete slide[current].imageLayer.attachments[slide[current].imageLayer.attachments.findIndex((x) => x.id === item.id)];
            slide[current].imageLayer.attachments = slide[current].imageLayer.attachments.filter((x) => x);
            unselectItem();
        };
        $lab.onclick = () => {
            if (imageController.selected !== item.id) {
                selectItem(item.id);
            } else {
                unselectItem();
            };
        };
        item.lab = $lab;
        item.img = $img;
        imageLayer[item.id] = item;
        $imageList.append($lab);
        $imageLayer.append($img);
        refreshThumbnail(current, $photozone);
    };
    const addImageItemIterable = (x) => {
        x.forEach((d) => {
            addImageItem(d);
        });
    };
    const selectItem = (i) => {
        Array.from($a(".active-image-item")).forEach(($n) => $n.classList.remove("active-image-item"));
        const t = imageLayer[i];
        if (!t) return;
        imageController.selected = i;
        t.lab.classList.add("active-image-item");

        setControllerPos(t.rect.x, t.rect.y);
        setControllerSize(0, 0, t.rect.width, t.rect.height);

        $controller.style["display"] = "flex";
        $controllerBar.style["display"] = "flex";
        $chkTglDarker.checked = t.darker ? "checked" : null;
    };
    const unselectItem = () => {
        imageController.selected = null;
        $controller.style["display"] = "none";
        $controllerBar.style["display"] = "none";
        Array.from($a(".active-image-item")).forEach(($n) => $n.classList.remove("active-image-item"));
    };
    const addImagePos = (n, x, y) => {
        const d = imageLayer[n];
        if (!d) return;
        const $img = d.img;
        // if (d.rect.x + x > slide[current].area.width - d.rect.width + 400 || d.rect.x + x < -400) return;
        // if (d.rect.y + y > slide[current].area.height - d.rect.height + 400 || d.rect.y + y < -400) return;
        d.rect.x += x;
        d.rect.y += y;
        $img.style["top"] = `${d.rect.y + y}px`;
        $img.style["left"] = `${d.rect.x + x}px`;
        slide[current].imageLayer.attachments[slide[current].imageLayer.attachments.findIndex((x) => x.id === n)] = d;
    };
    const setImagePos = (n, x, y) => {
        const d = imageLayer[n];
        if (!d) return;
        const $img = d.img;
        // if (x > slide[current].area.width - d.rect.width + 400 || x < -400) return;
        // if (y > slide[current].area.height - d.rect.height + 400 || y < -400) return;
        d.rect.x = x;
        d.rect.y = y;
        $img.style["top"] = `${d.rect.y}px`;
        $img.style["left"] = `${d.rect.x}px`;
        slide[current].imageLayer.attachments[slide[current].imageLayer.attachments.findIndex((x) => x.id === n)] = d;
    };
    const addControllerPos = (x, y) => {
        const originX = parseInt($controller.style["left"]);
        const originY = parseInt($controller.style["top"]);
        // if (originX + x > slide[current].area.width - imageController.rect.width + 400 || originX + x < -400) return;
        // if (originY + y > slide[current].area.height - imageController.rect.height + 400 || originY + y < -400) return;
        $controller.style["top"] = `${originY + y}px`;
        $controller.style["left"] = `${originX + x}px`;
    };
    const setControllerPos = (x, y) => {
        // if (x > slide[current].area.width - imageController.rect.width + 400 || x < -400) return;
        // if (y > slide[current].area.height - imageController.rect.height + 400 || y < -400) return;
        imageController.rect.x = x;
        imageController.rect.y = y;
        $controller.style["top"] = `${y}px`;
        $controller.style["left"] = `${x}px`;
    };
    const addImageSize = (n, x, y, w, h) => {
        const d = imageLayer[n];
        if (!d) return;
        const $img = d.img;
        // if (d.rect.x + x + d.rect.width + w > slide[current].area.width + 400 || d.rect.x + x + d.rect.width + w < -400) return;
        // if (d.rect.y + y + d.rect.height + h > slide[current].area.height + 400 || d.rect.y + y + d.rect.height + h < -400) return;
        d.rect.width += w;
        d.rect.height += h;
        addImagePos(n, x, y);
        $img.style["width"] = `${d.rect.width}px`;
        $img.style["height"] = `${d.rect.height}px`;
        slide[current].imageLayer.attachments[slide[current].imageLayer.attachments.findIndex((x) => x.id === n)] = d;
    };
    const setImageSize = (n, x, y, w, h) => {
        const d = imageLayer[n];
        if (!d) return;
        const $img = d.img;
        addImagePos(n, x, y);
        d.rect.width = w;
        d.rect.height = h;
        $img.style["width"] = `${w}px`;
        $img.style["height"] = `${h}px`;
        slide[current].imageLayer.attachments[slide[current].imageLayer.attachments.findIndex((x) => x.id === n)] = d;
    };
    const addControllerSize = (x, y, w, h) => {
        imageController.rect.width += w;
        imageController.rect.height += h;
        addControllerPos(x, y);
        $controller.style["width"] = `${imageController.rect.width}px`;
        $controller.style["height"] = `${imageController.rect.height}px`;
    };
    const setControllerSize = (x, y, w, h) => {
        imageController.rect.width = w;
        imageController.rect.height = h;
        addControllerPos(x, y);
        $controller.style["width"] = `${w}px`;
        $controller.style["height"] = `${h}px`;
    };
    const createSlide = () => {
        const d = JSON.parse(JSON.stringify(Object.assign({}, DATATEMPLATE)));
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
        unselectItem();
        current = i;
        applySlide();
    };
    const removeSlide = (i) => {
        delete slide[i];
        slide = slide.filter((x) => x);
        if (slide.length) {
            if (i === current && i > 0) {
                setSlide(i - 1);
            } else if (i === current && i === 0) {
                setSlide(0);
            } else if (i < current) {
                setSlide(current - 1);
            };
        } else {
            createSlide();
        };
        refreshSlideList();
    };
    const applySlide = () => {
        current = slide[current] ? current : current - 1;
        const x = slide[current];
        setBackgroundFit(x.values.backgroundFit);
        setBackgroundColor(x.color.background);
        setAreaSize(x.area.width, x.area.height);
        setName(x.strings.name);
        setNameColorRGB(x.color.namearea);
        setContent(x.strings.content);
        setBoxStyle(x.values.style);
        setTitleName(x.strings.title.name);
        setTitle(x.strings.title.content);
        setLocation(x.strings.location);
        toggleNamearea(x.toggles.namearea);
        toggleSelectBox(x.toggles.select);
        togglePhotoButtons(x.toggles.photoButtons);
        toggleContentBoxCenter(x.toggles.boxCenter);
        toggleTitle(x.toggles.title);
        toggleLocation(x.toggles.location);
        toggleContent(x.toggles.content);
        setBackground(x.imageLayer.background);
        imageLayer = {};
        $imageLayer.innerHTML = "";
        $imageList.innerHTML = "";
        addImageItemIterable(x.imageLayer.attachments);
        refreshSlideList();
        refreshThumbnail(current, $photozone);
    };
    const refreshSlideList = () => {
        $slideList.innerHTML = "";
        $slideList.innerHTML = slide.map((d, i) => {
            return `<div id="slide-item-${i}" class="slide-item"><div class="thumb"><img src="${d.thumbnail}"></div>` +
                `<div class="slide-item-menu"><p>${i+1}</p><button class="remove"><div class="i i-deny"></div></button></div></div>`;
        }).join("");
        Array.from($slideList.querySelectorAll(".slide-item")).forEach(($n, i) => {
            $n.onclick = (c) => {
                if (c.target !== $n) return;
                setSlide(i);
                refreshThumbnail(i, $photozone);
            };
        });
        Array.from($slideList.querySelectorAll("button.remove")).forEach(($n, i) => {
            $n.onpointerdown = () => {
                removeSlide(i);
            };
        });
        $(`.active-slide:not(#slide-item-${current})`)?.classList.remove("active-slide");
        $(`#slide-item-${current}`)?.classList.add("active-slide");
    };
    const refreshThumbnail = (i, $n) => {
        html2canvas($n, { logging: false, scale: 0.3 }).then((c) => {
            const src = `${c.toDataURL("image/png")}`;
            slide[current].thumbnail = src;
            const $thumb = $(`#slide-item-${i} div.thumb > img`);
            $thumb.src = src;
        });
    };
    const setAreaPos = (x, y) => {
        areaRect.x = x;
        areaRect.y = y;
        $main.style["transform"] = `translate(${x}px, ${y}px)`;
    };
    const setBackgroundColor = (rgb) => {
        slide[current].color.background = rgb;
        const posper = Object.values(rgb).map((i) => i / 255 * 100);
        const hex = RGBtoHEX(rgb);
        $photozone.style["background-color"] = `#${hex}`;
        $pickerBgPrev.style["background-color"] = `#${hex}`;
        $pickerBgPrev.style["border-color"] = `#${hex}`;
        $pickerBgPrevValue.innerText = `#${hex}\n${Object.values(rgb).join(", ")}`;
        Array.from($pickerBgPointers).forEach(($n, i) => {
            $n.style["left"] = `${posper[i]}%`;
        });
        Array.from($pickerBgInputs).forEach(($n, i) => {
            $n.value = Object.values(rgb)[i];
        });
    };
    const showModal = (t, c) => {
        const $m = document.createElement("div");
        $m.classList.add("modal-area");
        $m.innerHTML = `<div class="modal wm600"><div class="scroll-box-inner>` +
            `<div class="modal-title"><h1>${t}</h1></div>` +
            `<p style="user-select: text;">${c}</p>` +
            `<div class="flexlist-horizontal fjce wf"><button class="close"><div class="i i-accept"></div><p>확인</p></button></div>` +
            `</div></div>`;
        $m.querySelector("button.close").onclick = () => {
            $m.remove();
        };
        document.body.append($m);
    };

    document.addEventListener("keydown", (k) => {
        if (!Number.isNaN(parseInt(slide[current].imageLayer.selectedImageItem)) && k.shiftKey && k.keyCode === 82) {
            $btnControllerReset.click();
        } else if (k.target === document.body && k.keyCode === 27) {
            unselectItem();
        };
        if (!$chkKeyShortcut.checked) return;
        if (k.target !== document.body) return;
        if (k.keyCode === 49) {
            setBoxStyle(0);
        } else if (k.keyCode === 50) {
            setBoxStyle(1);
        } else if (k.keyCode === 51) {
            setBoxStyle(2);
        } else if (k.keyCode === 52) {
            setBoxStyle(3);
        } else if (k.keyCode === 53) {
            setBoxStyle(4);
        } else if (k.keyCode === 54) {
            setBoxStyle(5);
        } else if (k.keyCode === 65) {
            $contentBox.click();
            setTimeout(() => {
                $inputContent.focus();
            }, 30);
        } else if (k.keyCode === 83) {
            $btnSelbox.click();
        } else if (k.keyCode === 68) {
            $btnModalSlideSize.click();
        } else if (k.keyCode === 90) {
            $btnAddSlide.click();
        } else if (k.keyCode === 88) {
            $btnDuplicateSlide.click();
        } else if (k.keyCode === 81) {
            $btnPhotoSet.click();
        } else if (k.keyCode === 87) {
            $btnAddImage.click();
        } else if (k.keyCode === 219) {
            $btnOutput.click();
        } else if (k.keyCode === 221) {
            $btnOutputAll.click();
        };
    });

    Object.values(PALETTE).forEach((x, i) => {
        const $op = document.createElement("option");
        if (x[0] === "partition") {
            $op.innerText = `===== ${x[1]} ====`;
            $op.setAttribute("disabled", "true");
        } else {
            $op.value = `${x[1]}::${x[2]}`;
            $op.innerText = `${x[1]}`;
            $op.style["background-color"] = `#${x[2]}`;
        };
        $selNameBgCol.append($op);
    });
    $selNameBgCol.onchange = (c) => {
        const d = c.target.value.split("::");
        setNameColor(d[1]);
        if ($chkAutoName.checked) setName(d[0]);
    };

    createSlide();

    $btnAddSlide.onclick = () => {
        createSlide();
    };
    $btnDuplicateSlide.onclick = () => {
        duplicateSlide();
    };

    $middle.onpointerdown = (p) => {
        if (p.target !== $middle) return;
        $middle.setPointerCapture(p.pointerId);
        $middle.onpointermove = (m) => {
            setAreaPos(areaRect.x + m.movementX, areaRect.y + m.movementY);
        };
        $middle.onpointerup = () => {
            if ($middle.hasPointerCapture(p.pointerId)) $middle.releasePointerCapture(p.pointerId);
            $middle.onpointermove = null;
            $middle.onpointerup = null;
        };
    };
    $middle.ontouchstart = (t) => {
        if (t.touches[0].target !== $middle) return;
        let ox = t.touches[0].clientX;
        let oy = t.touches[0].clientY;
        $middle.ontouchmove = (m) => {
            const x = m.touches[0].clientX;
            const y = m.touches[0].clientY;
            const mx = x - ox;
            const my = y - oy;
            ox = x;
            oy = y;
            setAreaPos(areaRect.x + mx, areaRect.y + my);
        };
        $middle.ontouchend = () => {
            $middle.ontouchmove = null;
            $middle.ontouchend = null;
        };
    };

    $controller.onpointerdown = (p) => {
        if (p.target !== $controller) return;
        $controller.setPointerCapture(p.pointerId);
        let flag = true;
        $controller.onpointermove = (m) => {
            flag = false;
            const d = slide[current].imageLayer.attachments.find((x) => x.id === imageController.selected);
            if (!d) return;
            d.rect.x += m.movementX;
            d.rect.y += m.movementY;
            setImagePos(d.id, d.rect.x, d.rect.y);
            setControllerPos(d.rect.x, d.rect.y);
        };
        $controller.onpointerup = () => {
            if (flag) unselectItem();
            $controller.releasePointerCapture(p.pointerId);
            refreshThumbnail(current, $photozone);
            $controller.onpointermove = null;
            $controller.onpointerup = null;
        };
    };
    $controller.ontouchstart = (t) => {
        if (t.touches[0].target !== $controller) return;
        let ox = t.touches[0].clientX;
        let oy = t.touches[0].clientY;
        $controller.ontouchmove = (m) => {
            const d = slide[current].imageLayer.attachments.find((x) => x.id === imageController.selected);
            if (!d) return;
            const x = m.touches[0].clientX;
            const y = m.touches[0].clientY;
            const mx = x - ox;
            const my = y - oy;
            ox = x;
            oy = y;
            d.rect.x += mx;
            d.rect.y += my;
            setImagePos(d.id, d.rect.x, d.rect.y);
            setControllerPos(d.rect.x, d.rect.y);
        };
        $controller.ontouchend = () => {
            refreshThumbnail(current, $photozone);
            $controller.ontouchmove = null;
            $controller.ontouchend = null;
        };
    };
    Array.from($resizePoints).forEach(($n, i) => {
        $n.onpointerdown = (p) => {
            $n.setPointerCapture(p.pointerId);
            $n.onpointermove = (m) => {
                const d = slide[current].imageLayer.attachments.find((x) => x.id === imageController.selected);
                if (!d) return;
                const mx = m.movementX;
                const my = m.movementY;
                if (i === 0) {
                    if (d.rect.width + mx*-1 >= SIZEMIN) {
                        addImageSize(d.id, mx, 0, mx*-1, 0);
                        addControllerSize(mx, 0, mx*-1, 0);
                    };
                    if (d.rect.height + my*-1 >= SIZEMIN) {
                        addImageSize(d.id, 0, my, 0, my*-1);
                        addControllerSize(0, my, 0, my*-1);
                    };
                } else if (i === 1) {
                    if (d.rect.width + mx >= SIZEMIN) {
                        addImageSize(d.id, 0, 0, mx, 0);
                        addControllerSize(0, 0, mx, 0);
                    };
                    if (d.rect.height + my*-1 >= SIZEMIN) {
                        addImageSize(d.id, 0, my, 0, my*-1);
                        addControllerSize(0, my, 0, my*-1);
                    };
                } else if (i === 2) {
                    if (d.rect.width + mx*-1 >= SIZEMIN) {
                        addImageSize(d.id, mx, 0, mx*-1, 0);
                        addControllerSize(mx, 0, mx*-1, 0);
                    };
                    if (d.rect.height + my >= SIZEMIN) {
                        addImageSize(d.id, 0, 0, 0, my);
                        addControllerSize(0, 0, 0, my);
                    };
                } else if (i === 3) {
                    if (d.rect.width + mx >= SIZEMIN) {
                        addImageSize(d.id, 0, 0, mx, 0);
                        addControllerSize(0, 0, mx, 0);
                    };
                    if (d.rect.height + my >= SIZEMIN) {
                        addImageSize(d.id, 0, 0, 0, my);
                        addControllerSize(0, 0, 0, my);
                    };
                } else if (i === 4) {
                    if (d.rect.height + my*-1 >= SIZEMIN) {
                        addImageSize(d.id, 0, my, 0, my*-1);
                        addControllerSize(0, my, 0, my*-1);
                    };
                } else if (i === 5) {
                    if (d.rect.width + mx >= SIZEMIN) {
                        addImageSize(d.id, 0, 0, mx, 0);
                        addControllerSize(0, 0, mx, 0);
                    };
                } else if (i === 6) {
                    if (d.rect.height + my >= SIZEMIN) {
                        addImageSize(d.id, 0, 0, 0, my);
                        addControllerSize(0, 0, 0, my);
                    };
                } else if (i === 7) {
                    if (d.rect.width + mx*-1 >= SIZEMIN) {
                        addImageSize(d.id, mx, 0, mx*-1, 0);
                        addControllerSize(mx, 0, mx*-1, 0);
                    };
                };
            };
            $n.onpointerup = () => {
                $n.releasePointerCapture(p.pointerId);
                refreshThumbnail(current, $photozone);
                $n.onpointermove = null;
                $n.onpointerup = null;
            };
        };
        $n.ontouchstart = (t) => {
            $middle.classList.add("oh");
            let ox = t.touches[0].clientX;
            let oy = t.touches[0].clientY;
            $n.ontouchmove = (m) => {
                const d = slide[current].imageLayer.attachments.find((x) => x.id === imageController.selected);
                if (!d) return;
                const x = m.touches[0].clientX;
                const y = m.touches[0].clientY;
                const mx = x - ox;
                const my = y - oy;
                ox = x;
                oy = y;
                if (i === 0) {
                    if (d.rect.width + mx*-1 >= SIZEMIN) {
                        addImageSize(d.id, mx, 0, mx*-1, 0);
                        addControllerSize(mx, 0, mx*-1, 0);
                    };
                    if (d.rect.height + my*-1 >= SIZEMIN) {
                        addImageSize(d.id, 0, my, 0, my*-1);
                        addControllerSize(0, my, 0, my*-1);
                    };
                } else if (i === 1) {
                    if (d.rect.width + mx >= SIZEMIN) {
                        addImageSize(d.id, 0, 0, mx, 0);
                        addControllerSize(0, 0, mx, 0);
                    };
                    if (d.rect.height + my*-1 >= SIZEMIN) {
                        addImageSize(d.id, 0, my, 0, my*-1);
                        addControllerSize(0, my, 0, my*-1);
                    };
                } else if (i === 2) {
                    if (d.rect.width + mx*-1 >= SIZEMIN) {
                        addImageSize(d.id, mx, 0, mx*-1, 0);
                        addControllerSize(mx, 0, mx*-1, 0);
                    };
                    if (d.rect.height + my >= SIZEMIN) {
                        addImageSize(d.id, 0, 0, 0, my);
                        addControllerSize(0, 0, 0, my);
                    };
                } else if (i === 3) {
                    if (d.rect.width + mx >= SIZEMIN) {
                        addImageSize(d.id, 0, 0, mx, 0);
                        addControllerSize(0, 0, mx, 0);
                    };
                    if (d.rect.height + my >= SIZEMIN) {
                        addImageSize(d.id, 0, 0, 0, my);
                        addControllerSize(0, 0, 0, my);
                    };
                } else if (i === 4) {
                    if (d.rect.height + my*-1 >= SIZEMIN) {
                        addImageSize(d.id, 0, my, 0, my*-1);
                        addControllerSize(0, my, 0, my*-1);
                    };
                } else if (i === 5) {
                    if (d.rect.width + mx >= SIZEMIN) {
                        addImageSize(d.id, 0, 0, mx, 0);
                        addControllerSize(0, 0, mx, 0);
                    };
                } else if (i === 6) {
                    if (d.rect.height + my >= SIZEMIN) {
                        addImageSize(d.id, 0, 0, 0, my);
                        addControllerSize(0, 0, 0, my);
                    };
                } else if (i === 7) {
                    if (d.rect.width + mx*-1 >= SIZEMIN) {
                        addImageSize(d.id, mx, 0, mx*-1, 0);
                        addControllerSize(mx, 0, mx*-1, 0);
                    };
                };
            };
            $n.ontouchend = () => {
                $middle.classList.remove("oh");
                $n.ontouchmove = null;
                $n.ontouchend = null;
            };
        };
    });
    $btnBottommost.onclick = () => {
        const d = imageLayer[imageController.selected];
        const $img = d.img;
        $imageLayer.insertAdjacentElement("afterbegin", $img);
    };
    $btnBottom.onclick = () => {
        const d = imageLayer[imageController.selected];
        const $img = d.img;
        const $target = $img.previousSibling;
        if (!$target) return;
        $imageLayer.insertBefore($img, $target);
    };
    $btnFront.onclick = () => {
        const d = imageLayer[imageController.selected];
        const $img = d.img;
        const $target1 = $img.nextSibling;
        const $target2 = $target1?.nextSibling;
        if ($target1 && !$target2) {
            $imageLayer.insertAdjacentElement("beforeend", $img);
        } else if ($target2) {
            $imageLayer.insertBefore($img, $target2);
        };
    };
    $btnFrontmost.onclick = () => {
        const d = imageLayer[imageController.selected];
        const $img = d.img;
        $imageLayer.insertAdjacentElement("beforeend", $img);
    };
    $btnFlipHorizontal.onclick = () => {
        const d = imageLayer[imageController.selected];
        const $img = d.img;
        d.flip.horizontal = !d.flip.horizontal;
        slide[current].imageLayer.attachments[slide[current].imageLayer.attachments.findIndex((x) => x.id === imageController.selected)] = d;
        
        // slide[current].imageLayer.attachments[slide[current].imageLayer.attachments.findIndex((x) => x.id === imageController.selected)].flip = d.flip;
        $img.style["transform"] = `${d.flip.horizontal ? "scaleX(-1)" : ""}${d.flip.vertical ? "scaleY(-1)" : ""}`;
    };
    $btnFlipVertical.onclick = () => {
        const d = imageLayer[imageController.selected];
        const $img = d.img;
        d.flip.vertical = !d.flip.vertical;
        slide[current].imageLayer.attachments[slide[current].imageLayer.attachments.findIndex((x) => x.id === imageController.selected)].flip = d.flip;
        $img.style["transform"] = `${d.flip.horizontal ? "scaleX(-1)" : ""}${d.flip.vertical ? "scaleY(-1)" : ""}`;
    };
    $chkTglDarker.onchange = (c) => {
        slide[current].imageLayer.attachments[slide[current].imageLayer.attachments.findIndex((x) => x.id === imageController.selected)].darker = c.target.checked;
        if (c.target.checked) {
            imageLayer[imageController.selected].img.classList.add("image-item-darker");
            // slide[current].imageLayer.attachments[slide[current].imageLayer.attachments.findIndex((x) => x.id === imageController.selected)].nodes.img.classList.add("image-item-darker");
        } else {
            imageLayer[imageController.selected].img.classList.remove("image-item-darker");
            // slide[current].imageLayer.attachments[slide[current].imageLayer.attachments.findIndex((x) => x.id === imageController.selected)].nodes.img.classList.remove("image-item-darker");
        };
    };
    $btnTglDarker.onclick = () => {
        $chkTglDarker.click();
    };
    $btnControllerReset.onclick = () => {
        const rect = slide[current].imageLayer.attachments.find((x) => x.id === imageController.selected).rectOrigin;
        setImagePos(imageController.selected, rect.x, rect.y);
        setImageSize(imageController.selected, 0, 0, rect.width, rect.height);
        setControllerPos(rect.x, rect.y);
        setControllerSize(0, 0, rect.width, rect.height);
    };
    $btnControllerRemove.onclick = () => {
        imageLayer[imageController.selected].lab.querySelector("button.remove").click();
        // slide[current].imageLayer.attachments.find((x) => x.id === imageController.selected).nodes.lab.querySelector("button.remove").click();
    };
    $btnControllerUnselect.onclick = () => {
        unselectItem();
    };
    $btnResetImage.onclick = () => {
        Object.values(imageLayer).forEach((x) => {
            x.lab.querySelector("button.remove").click();
        });
        refreshThumbnail(current, $photozone);
    };

    $inputName.onkeydown = (k) => {
        console.log(true);
        if (k.keyCode === 13 && k.ctrlKey || k.keyCode === 27) __manager.modal.reserve["modal-content"].close();
    };
    $inputName.oninput = (x) => {
        setName(x.target.value);
    };
    $inputName.onchange = () => {
        refreshThumbnail(current, $photozone);
    };
    $chkTglName.onchange = (c) => {
        toggleNamearea(c.target.checked);
        refreshThumbnail(current, $photozone);
    };

    $contentBox.onclick = () => {
        __manager.modal.reserve["modal-content"].show();
    };
    $btnContent.onclick = () => {
        __manager.modal.reserve["modal-content"].show();
    };
    $inputContent.onkeydown = (k) => {
        if (k.keyCode === 13 && k.ctrlKey || k.keyCode === 27) __manager.modal.reserve["modal-content"].close();
    };
    $inputContent.oninput = (x) => {
        setContent(x.target.value);
    };
    $inputContent.onchange = () => {
        refreshThumbnail(current, $photozone);
    };
    $selectBoxStyle.onchange = (c) => {
        setBoxStyle(parseInt(c.target.value));
        refreshThumbnail(current, $photozone);
    };
    $chkTglContentCenter.onchange = (c) => {
        toggleContentBoxCenter(c.target.checked);
        refreshThumbnail(current, $photozone);
    };

    $btnPhotoSet.onclick = () => {
        $uploader.multiple = null;
        $uploader.onchange = (f) => {
            const file = f.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setBackground(reader.result);
                $uploader.onchange = null;
            };
        };
        $uploader.click();
    };
    $btnPhotoRemove.onclick = () => {
        slide[current].imageLayer.background = "";
        $uploader.value = null;
        $bg.src = "";
        $prevBg.src = "";
        refreshThumbnail(current, $photozone);
    };

    $btnOutput.onclick = () => {
        $alertDownload.style["display"] = "flex";
        html2canvas($photozone, { logging: false }).then((c) => {
            const l = document.createElement("a");
            const d = Date.now();
            const filename = `TCAG-${d}.png`;
            document.body.append(l);
            l.href = c.toDataURL("image/png");
            l.download = filename;
            l.click();
            l.remove();
            $alertDownload.style["display"] = "none";
        });
    };
    $btnOutputContent.onclick = () => {
        $alertDownload.style["display"] = "flex";
        html2canvas($contentArea, { scale: 2, backgroundColor: null, logging: false }).then((c) => {
            const l = document.createElement("a");
            const d = Date.now();
            const filename = `TCAG-${d}.png`;
            document.body.append(l);
            l.href = c.toDataURL("image/png");
            l.download = filename;
            l.click();
            l.remove();
            $alertDownload.style["display"] = "none";
        });
    };

    $chkTglTitle.onchange = (c) => {
        toggleTitle(c.target.checked);
        refreshThumbnail(current, $photozone);
    };
    $inputTitleName.oninput = (c) => {
        setTitleName(c.target.value);
    };
    $inputTitleName.onchange = () => {
        refreshThumbnail(current, $photozone);
    };
    $inputTitle.oninput = (c) => {
        setTitle(c.target.value);
    };
    $inputTitle.onchange = () => {
        refreshThumbnail(current, $photozone);
    };
    $inputLoc.oninput = (c) => {
        setLocation(c.target.value);
    };
    $inputLoc.onchange = () => {
        refreshThumbnail(current, $photozone);
    };
    $chkTglLoc.onchange = (c) => {
        toggleLocation(c.target.checked);
        refreshThumbnail(current, $photozone);
    };
    $chkTglContent.onchange = (c) => {
        toggleContent(c.target.checked);
        refreshThumbnail(current, $photozone);
    };
    $chkPhotoBtn.onchange = (c) => {
        togglePhotoButtons(c.target.checked);
        refreshThumbnail(current, $photozone);
    };

    $btnMdHelp.onclick = () => {
        __manager.modal.reserve["modal-markdown"].show();
    };

    $btnModalSlideSize.onclick = () => {
        __manager.modal.reserve["modal-slide-size"].show();
    };
    Array.from($btnSlideSize).forEach(($n) => {
        $n.onclick = () => {
            const w = parseInt($n.dataset.width);
            const h = parseInt($n.dataset.height);
            setAreaSize(w, h);
            refreshThumbnail(current, $photozone);
        };
    });
    $inputSlideWidth.onchange = (c) => {
        setAreaWidth(c.target.value);
        refreshThumbnail(current, $photozone);
    };
    $inputSlideHeight.onchange = (c) => {
        setAreaHeight(c.target.value);
        refreshThumbnail(current, $photozone);
    };

    $btnSelbox.onclick = () => {
        __manager.modal.reserve["modal-select"].show();
    };
    Array.from($inputSelboxOption).forEach(($n, i) => {
        const $t = $selboxOption[i];
        const $p = $t.querySelector("p");
        $n.value = slide[current].strings.select[i];
        $p.innerText = slide[current].strings.select[i];
        $n.oninput = (c) => {
            if (!c.target.value.length) {
                $t.style["display"] = "none";
            } else {
                $t.style["display"] = "flex";
                $p.innerText = c.target.value;
            };
        };
        $n.onkeydown = (k) => {
            if (k.keyCode === 13 && k.ctrlKey || k.keyCode === 27) __manager.modal.reserve["modal-select"].close();
        };
    });
    $chkSelbox.onchange = (c) => {
        toggleSelectBox(c.target.checked);
        refreshThumbnail(current, $photozone);
    };

    Array.from($modalBgs).forEach(($n) => {
        $n.onclick = (c) => {
            if (c.target.classList[0] === "modal-area") {
                $n.querySelector("button.close").click();
            };
        };
    });

    $btnAddImage.onclick = () => {
        $uploader.multiple = true;
        $uploader.onchange = (f) => {
            $uploader.multiple = null;
            Array.from(f.target.files).forEach((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    const id = imageItemIdInt++;
                    const $img = new Image();
                    $img.src = reader.result;
                    setTimeout(() => {
                        const d = {
                            id: id,
                            name: file.name,
                            visible: true,
                            data: reader.result,
                            rect: {
                                x: 0,
                                y: 0,
                                width: $img.width,
                                height: $img.height
                            },
                            rectOrigin: {
                                x: 0,
                                y: 0,
                                width: parseInt($img.width),
                                height: parseInt($img.height)
                            },
                            flip: {
                                horizontal: false,
                                vertical: false
                            },
                            rotate: 0,
                            darker: false,
                            sort: null
                        };
                        slide[current].imageLayer.attachments.push(d);
                        addImageItem(d);
                    }, 30);
                };
            });
        };
        $uploader.click();
    };

    $btnPhotoRemove.click();
    $chkAutoName.checked = true;
    $chkKeyShortcut.checked = true;

    $btnOutputAll.onclick = () => {
        let i = 0;
        $alertDownload.style["display"] = "flex";
        const l = document.createElement("a");
        document.body.append(l);
        const cb = () => {
            if (slide[i]) {
                setSlide(i);
                setTimeout(() => {
                    html2canvas($photozone, { logging: false }).then((c) => {
                        l.href = c.toDataURL("image/png");
                        const d = Date.now();
                        const filename = `TCAG-${d}-OUTPUT.png`;
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
                $alertDownload.style["display"] = "none";
            };
        };
        cb();
    };

    $mBtnTglLeft.onclick = () => {
        if (flagMobileMenu === "left") {
            flagMobileMenu = null;
            $left.classList.remove("m-menu-expand");
            $mBtnTglLeft.classList.remove("m-active-toggle-menu");
        } else {
            $right.classList.remove("m-menu-expand");
            $mBtnTglRight.classList.remove("m-active-toggle-menu");
            flagMobileMenu = "left";
            $left.classList.add("m-menu-expand");
            $mBtnTglLeft.classList.add("m-active-toggle-menu");
        };
    };
    $mBtnTglRight.onclick = () => {
        if (flagMobileMenu === "right") {
            flagMobileMenu = null;
            $right.classList.remove("m-menu-expand");
            $mBtnTglRight.classList.remove("m-active-toggle-menu");
        } else {
            $left.classList.remove("m-menu-expand");
            $mBtnTglLeft.classList.remove("m-active-toggle-menu");
            flagMobileMenu = "right";
            $right.classList.add("m-menu-expand");
            $mBtnTglRight.classList.add("m-active-toggle-menu");
        };
    };

    $btnConfigBg.onclick = () => {
        __manager.modal.reserve["modal-config-bg"].show();
    };
    $selectBgFit.onchange = (c) => {
        setBackgroundFit(c.target.value);
        refreshThumbnail(current, $photozone);
    };

    $btnConfigIndi.onclick = () => {
        __manager.modal.reserve["modal-config-indicators"].show();
    };
    
    Array.from($pickerBgPointers).forEach(($n, i) => {
        $n.onpointerdown = (p) => {
            $n.setPointerCapture(p.pointerId);
            const $dragarea = p.target.parentNode;
            const dragareaRect = $dragarea.getBoundingClientRect();
            $n.onpointermove = (m) => {
                const rgb = Object.values(slide[current].color.background);
                let per = Math.floor((m.clientX - dragareaRect.x) / dragareaRect.width * 100);
                per = per < 0 ? 0 : per > 100 ? 100 : per;
                rgb[i] = Math.floor(per / 100 * 255);
                setBackgroundColor(Object.fromEntries(rgb.map((x, j) => x = [ [ "r", "g", "b" ][j], x ])));
            };
            $n.onpointerup = () => {
                $n.releasePointerCapture(p.pointerId);
                $n.onpointermove = null;
                $n.onpointerup = null;
                refreshThumbnail(current, $photozone);
            };
        };
        $n.ontouchstart = (t) => {
            __manager.modal.reserve["modal-config-bg"].$content.style["overflow"] = "hidden";
            const $dragarea = t.target.parentNode;
            const dragareaRect = $dragarea.getBoundingClientRect();
            $n.ontouchmove = (m) => {
                const rgb = Object.values(slide[current].color.background);
                let per = Math.floor((m.touches[0].clientX - dragareaRect.x) / dragareaRect.width * 100);
                per = per < 0 ? 0 : per > 100 ? 100 : per;
                rgb[i] = Math.floor(per / 100 * 255);
                setBackgroundColor(Object.fromEntries(rgb.map((x, j) => x = [ [ "r", "g", "b" ][j], x ])));
            };
            $n.ontouchend = () => {
                __manager.modal.reserve["modal-config-bg"].$content.style["overflow"] = "hidden";
                $n.ontouchmove = null;
                $n.ontouchend = null;
                refreshThumbnail(current, $photozone);
            };
        };
    });
    Array.from($pickerBgInputs).forEach(($n, i) => {
        $n.onchange = (c) => {
            const rgb = Object.values(slide[current].color.background);
            let v = parseInt(c.target.value);
            v = Number.isNaN(v) ? 0 : v < 0 ? 0 : v > 255 ? 255 : v;
            rgb[i] = v;
            setBackgroundColor(Object.fromEntries(rgb.map((x, j) => x = [ [ "r", "g", "b" ][j], x ])));
        };
    });
    Array.from($pickerNamePointers).forEach(($n, i) => {
        $n.onpointerdown = (p) => {
            $n.setPointerCapture(p.pointerId);
            const $dragarea = p.target.parentNode;
            const dragareaRect = $dragarea.getBoundingClientRect();
            $n.onpointermove = (m) => {
                const rgb = Object.values(slide[current].color.namearea);
                let per = Math.floor((m.clientX - dragareaRect.x) / dragareaRect.width * 100);
                per = per < 0 ? 0 : per > 100 ? 100 : per;
                rgb[i] = Math.floor(per / 100 * 255);
                setNameColorRGB(Object.fromEntries(rgb.map((x, j) => x = [ [ "r", "g", "b" ][j], x ])));
            };
            $n.onpointerup = () => {
                $n.releasePointerCapture(p.pointerId);
                $n.onpointermove = null;
                $n.onpointerup = null;
                refreshThumbnail(current, $photozone);
            };
        };
        $n.ontouchstart = (t) => {
            __manager.modal.reserve["modal-content"].$content.style["overflow"] = "hidden";
            const $dragarea = t.target.parentNode;
            const dragareaRect = $dragarea.getBoundingClientRect();
            $n.ontouchmove = (m) => {
                const rgb = Object.values(slide[current].color.namearea);
                let per = Math.floor((m.touches[0].clientX - dragareaRect.x) / dragareaRect.width * 100);
                per = per < 0 ? 0 : per > 100 ? 100 : per;
                rgb[i] = Math.floor(per / 100 * 255);
                setNameColorRGB(Object.fromEntries(rgb.map((x, j) => x = [ [ "r", "g", "b" ][j], x ])));
            };
            $n.ontouchend = () => {
                __manager.modal.reserve["modal-content"].$content.style["overflow"] = "scroll";
                $n.ontouchmove = null;
                $n.ontouchend = null;
                refreshThumbnail(current, $photozone);
            };
        };
    });
    Array.from($pickerNameInputs).forEach(($n, i) => {
        $n.onchange = (c) => {
            const rgb = Object.values(slide[current].color.namearea);
            let v = parseInt(c.target.value);
            v = Number.isNaN(v) ? 0 : v < 0 ? 0 : v > 255 ? 255 : v;
            rgb[i] = v;
            setNameColorRGB(Object.fromEntries(rgb.map((x, j) => x = [ [ "r", "g", "b" ][j], x ])));
        };
    });

    $ver.innerText = `${app.name}\nBuild ${app.version}@${app.date}\n\nPowered by ${__lyra.meta.name}\nBuild ${__lyra.meta.version}@${__lyra.meta.date}`;
    $logo.onclick = () => {
        __manager.modal.reserve["modal-about"].show();
    };
})();