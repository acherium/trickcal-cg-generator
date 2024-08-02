(() => {
    const app = {
        name: "Project Pictor",
        author: "Acherium",
        contact: "acherium@pm.me",
        version: "24w31.9",
        date: "24-08-02",
        watermark: false,
        isBeta: false
    };
    const SIZEMIN = 32;
    const WIDTHMIN = 1000;
    const HEIGHTMIN = 600;
    const WIDTHMAX = 2000;
    const HEIGHTMAX = 2000;
    const RATIOCHECKER = 1000;
    const DATATEMPLATE = {
        version: 6,
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
        assetOptions: {
            scriptbox: {
                theme: 0
            },
            namearea: {
                pos: 1
            },
            select: {
                theme: 0
            }
        },
        area: {
            width: 1280,
            height: 720
        },
        scriptbox: {
            style: 0,
            sokmaeum: 0,
            pos: 7
        },
        values: {
            backgroundFit: "align-center",
            type: 1
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
    const BG_FIT_OPTIONS = [ "align-center", "fit-height", "fit-width", "fill" ];
    const SCRIPT_MARKDOWN = [
        [ /([\n\r]){1,2}/g, "<br>" ],
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
        [ /(\:\:\:)/g, "</span>" ]
    ];

    const $ = (x) => document.querySelector(x);
    const $a = (x) => document.querySelectorAll(x);

    let show = {
        version: 6,
        name: "무제",
        lastSlide: 0,
        lastUpdate: null
    };
    let slide = [];
    let current = 0;
    let imageItemIdInt = 0;
    let flagMobileMenu = null;
    let imageLayer = {};
    let multiplier = 1;
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
    const $middle = $("#middle-top");
    const $right = $("#right");
    const $mBtnTglLeft = $("#m-button-toggle-slide");
    const $mBtnTglRight = $("#m-button-toggle-layer");
    const $nameOutline = $("#photo-script-box-namebox > span:nth-child(1)");
    const $name = $("#photo-script-box-namebox > span:nth-child(2)");
    const $nameBg = $("#photo-script-box-name-backdrop");
    const $pickerNamePrev = $("#colorpicker-namearea .colorpicker-preview");
    const $pickerNamePrevValue = $("#colorpicker-namearea .colorpicker-preview-value");
    const $pickerNamePointers = $a("#colorpicker-namearea .colorpicker-pointer");
    const $pickerNameInputs = $a("#colorpicker-namearea .colorpicker-input");
    const $chkAutoName = $("#checkbox-toggle-auto-change-name");
    const $chkTglName = $("#checkbox-toggle-namearea");
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
    const $scriptBox = {
        shadow: $("#photo-script-box > .shadow"),
        bg: $("#photo-script-box > .bg")
    };
    const $rblScriptBoxPos = $a("#script-box-position input[type=radio]");
    const $rblScriptBoxStyle = $a("#script-box-style input[type=radio]");
    const $rblSokmaeumStyle = $a("#script-sokmaeum-style input[type=radio]");
    const $btnContent = $("#button-content");
    const $chkTglContent = $("#checkbox-toggle-content");
    const $box = $("#photo-script-box-backdrop");
    const $vignetting = $("#photo-vignetting");
    const $sokmaeum = $("#photo-button-sokmaeum");
    const $photozone = $("#photo-zone");
    const $bg = $("#photo-bg");
    const $prevBg = $("#preview-bg > img");
    const $btnConfigBg = $("#button-config-bg");
    const $selectBgFit = $("#select-bg-fit");
    const $pickerBgPrev = $("#colorpicker-bg .colorpicker-preview");
    const $pickerBgPrevValue = $("#colorpicker-bg .colorpicker-preview-value");
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
    const $btnFitToBg = $("#button-fit-to-bg-size");
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
    const $alertDownload = $("#alert-downloading");
    const $btnOutputAll = $("#button-download-all");
    const $splash = $("#splash-screen");
    // const $btnModalColPreset = $("#button-color-preset");
    const $colPresetList = $("#color-preset-list");
    const $btnModalConfigExport = $("#button-config-export");
    const $inputMultiplier = $("#export-multiplier");
    const $pExportSizeMenu = $("#export-size-onmenu");
    const $pExportSizeModal = $("#export-size-onmodal");
    const $btnSearch = $("#button-search");
    const $inputShowName = $("#show-name");
    const $btnSave = $("#button-save");
    const $btnLoad = $("#button-load");
    const $tglType = $a("#script-box-type input[type=radio]");
    const $type0Conts = $a(".content-type-0");
    const $type1Conts = $a(".content-type-1");

    const $nameInput = $("#input-name");
    const $contInput = $("#input-content");

    const $comNameareas = $a("#photo-script-box-namearea, #photo-script-box-area-revamped .namearea")
    const $comNames = $a("#photo-script-box-area-revamped .namearea .name, #photo-script-box-area-revamped .namearea .outline, #photo-script-box-namebox span");
    const $comNameBgs = $a("#photo-script-box-area-revamped .namearea > div,#photo-script-box-name-backdrop");
    const $comContAreas = $a("#photo-script-box-area-revamped > .area, #photo-script-box-area");
    const $comConts = $a(`#script-content, #photo-script-box-area-revamped .content-area .main, #photo-script-box-area-revamped .content-area .outline`);
    const $comSelboxes = $a("#photo-select-area, #photo-select-area-revamped");

    const $sbox = $("#photo-script-box-area-revamped");
    const $sboxAreas = $a("#photo-script-box-area-revamped .area");
    const $sboxNameareas = $a("#photo-script-box-area-revamped .namearea");
    const $sboxNames = $a("#photo-script-box-area-revamped .namearea span");
    const $sboxNamePosSel = $("#select-namearea-position");
    const $sboxNamePosOps = $a("#select-namearea-position option");
    const $sboxThemeSel = $("#select-theme");
    const $selboxOps = [
        $a("#photo-select > .photo-select-option"),
        $a("#photo-select-revamped > .photo-select-option")
    ];
    const $selboxBgs = $a("#photo-select-revamped img");
    const $selboxThemeSel = $a("#select-theme");
    const $selboxThemeOps = $a("#select-theme option");

    const eventConn = [
        [
            "click", $sbox,
            () => __manager.modal.reserve["modal-content"].show()
        ],
        [
            "click", $("#button-color-preset"),
            () => __manager.modal.reserve["modal-color-preset"].show()
        ],
        [
            "keydown", $nameInput,
            (k) => {
                if (k.ctrlKey && k.keyCode === 13 || k.keyCode === 27) {
                    __manager.modal.reserve["modal-content"].close();
                }
            }
        ],
        [
            "input", $nameInput,
            (x) => setName(x.target.value)
        ],
        [
            "change", $nameInput,
            () => refreshThumbnail(current, $photozone)
        ],
        [
            "click", $("#button-markdown-help"),
            () => __manager.modal.reserve["modal-markdown"].show()
        ],
        [
            "keydown", $contInput,
            (k) => {
                if (k.ctrlKey && k.keyCode === 13 || k.keyCode === 27) {
                    __manager.modal.reserve["modal-content"].close();
                }
            }
        ],
        [
            "input", $contInput,
            (x) => setContent(x.target.value)
        ],
        [
            "change", $contInput,
            () => refreshThumbnail(current, $photozone)
        ],
        [
            "change", $sboxNamePosSel,
            (c) => {
                setNamePos(parseInt(c.target.value));
                refreshThumbnail(current, $photozone);
            }
        ],
        [
            "change", $sboxThemeSel,
            (c) => {
                setTheme(parseInt(c.target.value));
                refreshThumbnail(current, $photozone);
            }
        ],
        [
            "change", $selboxThemeSel,
            (c) => {
                console.log(true);
                setSelboxTheme(parseInt(c.target.value));
                refreshThumbnail(current, $photozone);
            }
        ]
    ];

    const setNamePos = (i) => {
        i = parseInt(i);
        if (i >= 0 && i < 3) {
            slide[current].assetOptions.namearea.pos = i;
            for (const $n of $sboxNameareas) {
                const classes = Array.from($n.classList).filter((x) => x.startsWith("namearea-pos"));
                $n.classList.remove(classes.length ? classes : null);
                $n.classList.add(`namearea-pos-${i}`);
                $sboxNamePosOps[i].selected = true;
            };
        };
    };
    const setTheme = (i) => {
        i = parseInt(i);
        if (i >= 0 && i < $sboxAreas.length) {
            slide[current].assetOptions.scriptbox.theme = i;
            const $target = Array.from($sboxAreas).find(($n) => $n.id === `theme-${i}`);
            const $outsiders = Array.from($sboxAreas).filter(($n) => $n !== $target);
            for (const $n of $outsiders) $n.style["display"] = "none";
            $target.style["display"] = "grid";
            Array.from($sboxThemeSel.querySelectorAll("option")).find(($n) => $n.value === `${i}`).selected = true;
        };
    };
    const setSelboxTheme = (i) => {
        i = parseInt(i);
        if (i >= 0 && i < 2) {
            slide[current].assetOptions.select.theme = i;
            for (const $n of $selboxBgs) $n.src= `./assets/images/option-${i}.svg`;
            Array.from($selboxThemeOps).find(($n) => $n.value === `${i}`).selected = true;
        };
    };

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
        refreshSize();
    };
    const setAreaHeight = (h) => {
        if (Number.isNaN(h) || h < HEIGHTMIN) h = HEIGHTMIN;
        if (h > HEIGHTMAX) h = HEIGHTMAX;
        slide[current].area.height = h;
        $inputSlideHeight.value = h;
        $photozone.style["height"] = `${h}px`;
        refreshSize();
    };
    const refreshSize = () => {
        const _res = `${slide[current].area.width * multiplier}×${slide[current].area.height * multiplier}px`;
        $pExportSizeMenu.value = _res;
        $pExportSizeModal.value = _res;
    };
    const setAreaSize = (w, h) => {
        setAreaWidth(w);
        setAreaHeight(h);
    };
    const setName = (x) => {
        slide[current].strings.name = x;
        for (const _$n of $comNames) _$n.innerText = x;
        $nameInput.value = x;
    };
    const setNameColor = (hex) => {
        const rgb = HEXtoRGB(hex);
        slide[current].color.namearea = rgb;
        const posper = Object.values(rgb).map((i) => i / 255 * 100);
        for (const _$n of $comNameBgs) _$n.style["background-color"] = `#${hex}`;
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
        for (const _$n of $comNameBgs) _$n.style["background-color"] = `#${hex}`;
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
        for (const _$n of $comConts) _$n.innerHTML = res;
        $contInput.value = x;
    };
    const setBoxPos = (i) => {
        if (i < 0 && i > 8) return;
        slide[current].scriptbox.pos = i;
        $rblScriptBoxPos[i].click();
        $contentArea.className = `photo-script-box-pos-${i} photo-script-box-sokmaeum-${slide[current].scriptbox.sokmaeum}`;
    };
    const setBoxStyle = (i) => {
        // if (!$scriptBoxes[i]) return;
        // for (const $box of Object.values($scriptBoxes)) {
        //     $box.className = "photo-script-box";
        //     $box.style["display"] = "none";
        // };
        slide[current].scriptbox.style = i;
        $rblScriptBoxStyle[i].click();
        $scriptBox.shadow.src = `./assets/images/scriptbox${i}-${slide[current].scriptbox.sokmaeum === 2 ? "light" : "dark"}.svg`;
        $scriptBox.bg.src = `./assets/images/scriptbox${i}-${slide[current].scriptbox.sokmaeum === 2 ? "dark" : "light"}.svg`;
        // $scriptBoxes[i].style["display"] = "block";
    };
    const setSokmaeumStyle = (i) => {
        if (i === 0) {
            slide[current].scriptbox.sokmaeum = i;
            $rblSokmaeumStyle[i].click();
            $vignetting.style["display"] = "none";
            $sokmaeum.style["display"] = "none";
            $contentArea.className = `photo-script-box-pos-${slide[current].scriptbox.pos} photo-script-box-sokmaeum-${i}`;
            $scriptBox.shadow.src = `./assets/images/scriptbox${slide[current].scriptbox.style}-dark.svg`;
            $scriptBox.bg.src = `./assets/images/scriptbox${slide[current].scriptbox.style}-light.svg`;
        } else if (i === 1) {
            slide[current].scriptbox.sokmaeum = i;
            $rblSokmaeumStyle[i].click();
            $vignetting.style["display"] = "none";
            $sokmaeum.style["display"] = "block";
            $contentArea.className = `photo-script-box-pos-${slide[current].scriptbox.pos} photo-script-box-sokmaeum-${i}`;
            $scriptBox.shadow.src = `./assets/images/scriptbox${slide[current].scriptbox.style}-dark.svg`;
            $scriptBox.bg.src = `./assets/images/scriptbox${slide[current].scriptbox.style}-light.svg`;
        } else if (i === 2) {
            slide[current].scriptbox.sokmaeum = i;
            $rblSokmaeumStyle[i].click();
            $vignetting.style["display"] = "block";
            $sokmaeum.style["display"] = "none";
            $contentArea.className = `photo-script-box-pos-${slide[current].scriptbox.pos} photo-script-box-sokmaeum-${i}`;
            $scriptBox.shadow.src = `./assets/images/scriptbox${slide[current].scriptbox.style}-light.svg`;
            $scriptBox.bg.src = `./assets/images/scriptbox${slide[current].scriptbox.style}-dark.svg`;
        };
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
        for (const $n of $comNameareas) $n.style["display"] = b ? "flex" : "none";
    };
    const toggleSelectBox = (b) => {
        slide[current].toggles.select = b;
        $chkSelbox.checked = b;
        for (const $n of $comSelboxes) $n.style["display"] = b ? "flex" : "none";
    };
    const togglePhotoButtons = (b) => {
        slide[current].toggles.photoButtons = b;
        $chkPhotoBtn.checked = b;
        $photoBtn.style["display"] = b ? "flex" : "none";
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
        for (const $n of $comContAreas) $n.style["visibility"] = b ? "visible" : "hidden";
    };
    const setBackground = (f) => {
        slide[current].imageLayer.background = f;
        $bg.src = f;
        $prevBg.src = f;
        refreshThumbnail(current, $photozone);
        if (f) {
            const _$res = new Image();
            _$res.src = f;
            _$res.onload = () => {
                const ratioRes = Math.floor(_$res.width / _$res.height * RATIOCHECKER) / RATIOCHECKER;
                const ratioArea = Math.floor(slide[current].area.width / slide[current].area.height * RATIOCHECKER) / RATIOCHECKER;
                if (ratioRes !== ratioArea) {
                    new LyraNotification({
                        icon: "notification",
                        text: "슬라이드의 비율과 배경으로 설정한 이미지의 비율이 맞지 않습니다.\n배경 설정으로 이동하여 이미지 맞춤 설정을 조정하거나 슬라이드 비율을 이미지에 맞추시겠습니까?",
                        buttons: [
                            new LyraButton({
                                icon: "arrow-e",
                                text: "이미지 비율에 맞춤",
                                onclick: () => {
                                    $btnFitToBg.click();
                                }
                            }),
                            new LyraButton({
                                icon: "config",
                                text: "설정으로 이동",
                                onclick: () => {
                                    __manager.modal.reserve["modal-config-bg"].show();
                                    setTimeout(() => {
                                        $selectBgFit.focus();
                                    });
                                }
                            })
                        ]
                    }).show();
                } else if ((ratioRes === ratioArea || _$res.width !== slide[current].area.width) && slide[current].values.backgroundFit !== "fill") {
                    new LyraNotification({
                        icon: "notification",
                        text: "슬라이드의 크기와 배경으로 설정한 이미지의 크기가 맞지 않습니다.\n배경 설정으로 이동하여 이미지 맞춤 설정을 조정하거나 슬라이드 크기를 이미지에 맞추시겠습니까?",
                        buttons: [
                            new LyraButton({
                                icon: "arrow-e",
                                text: "이미지 비율에 맞춤",
                                onclick: () => {
                                    $btnFitToBg.click();
                                }
                            }),
                            new LyraButton({
                                icon: "config",
                                text: "설정으로 이동",
                                onclick: () => {
                                    __manager.modal.reserve["modal-config-bg"].show();
                                    setTimeout(() => {
                                        $selectBgFit.focus();
                                    });
                                }
                            })
                        ]
                    }).show();
                };
            };
        };
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
            refreshThumbnail(current, $photozone);
        };
        $lab.onclick = (c) => {
            if (c.target === $lab && imageController.selected !== item.id) {
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
        for (const _$item of $controllerBar.querySelectorAll("button, input")) _$item.removeAttribute("disabled");
        if (t.darker) {
            $chkTglDarker.checked = true;
            $btnTglDarker.classList.add("controller-active");
        } else {
            $chkTglDarker.checked = false;
            $btnTglDarker.classList.remove("controller-active");
        };
    };
    const unselectItem = () => {
        imageController.selected = null;
        $controller.style["display"] = "none";
        for (const _$item of $controllerBar.querySelectorAll("button, input")) _$item.setAttribute("disabled", "true");
        Array.from($a(".active-image-item")).forEach(($n) => $n.classList.remove("active-image-item"));
        $btnTglDarker.classList.remove("controller-active");
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
        setBoxPos(x.scriptbox.pos);
        setBoxStyle(x.scriptbox.style);
        setSokmaeumStyle(x.scriptbox.sokmaeum);
        setTitleName(x.strings.title.name);
        setTitle(x.strings.title.content);
        setLocation(x.strings.location);
        toggleNamearea(x.toggles.namearea);
        toggleSelectBox(x.toggles.select);
        togglePhotoButtons(x.toggles.photoButtons);
        toggleTitle(x.toggles.title);
        toggleLocation(x.toggles.location);
        toggleContent(x.toggles.content);
        setBackground(x.imageLayer.background);
        setType(x.values.type);
        setNamePos(x.assetOptions.namearea.pos);
        setTheme(x.assetOptions.scriptbox.theme);
        setSelboxTheme(x.assetOptions.select.theme);
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
    const exportPNG = ($node) => {
        html2canvas($node, {
            scale: multiplier,
            backgroundColor: null,
            logging: false
        }).then((c) => {
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
    const setShowName = (s) => {
        show.name = s;
        $inputShowName.value = s;
    };
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
            setShowName(show.name);
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
    const setType = (i) => {
        if (i === 0) {
            slide[current].values.type = i;
            for (const _$n of $type0Conts) _$n.classList.remove("force-hide");
            for (const _$n of $type1Conts) _$n.classList.add("force-hide");
            $tglType[0].checked = true;
        } else if (i === 1) {
            slide[current].values.type = i;
            for (const _$n of $type0Conts) _$n.classList.add("force-hide");
            for (const _$n of $type1Conts) _$n.classList.remove("force-hide");
            $tglType[1].checked = true;
        };
    };

    initStore();
    $btnSave.onclick = () => {
        const showRaw = window.localStorage.getItem("show");
        if (!showRaw) initStore();
        const oldShowData = JSON.parse(showRaw);
        if (oldShowData.name) {
            new LyraModal({
                icon: "export",
                title: "덮어쓰기 경고",
                content: $create("p", {
                    html: `이미 저장된 문서가 있습니다.<br><br>` +
                        `<b>제목: ${oldShowData.name}<br>` +
                        `마지막 수정: ${new Intl.DateTimeFormat("kr", { dateStyle: "full", timeStyle: "full" }).format(oldShowData.lastUpdate)}</b><br><br>` +
                        `이 문서의 내용을 무시하고 현재 내용을 덮어쓰시겠습니까? 이전 내용이 삭제됩니다.`
                }),
                buttons: [
                    new LyraButton({
                        class: [ "close" ],
                        icon: "export",
                        text: "덮어쓰기",
                        onclick: () => {
                            saveCurrent();
                        }
                    }),
                    new LyraButton({
                        class: [ "close" ],
                        icon: "deny",
                        text: "취소"
                    })
                ]
            }).show();
        } else {
            saveCurrent();
        };
    };
    $btnLoad.onclick = loadLast;
    $inputShowName.onchange = (c) => {
        setShowName(c.target.value);
    };
    setShowName(show.name);

    for (const $radio of $tglType) {
        $radio.onclick = () => setType(parseInt($radio.value));
    };

    for (const i in Array.from($sboxAreas)) {
        $sboxThemeSel.append($create("option", { value: `${i}`, text: $sboxAreas[i].dataset.themeName }));
    };

    document.addEventListener("keydown", (k) => {
        if (!Number.isNaN(parseInt(slide[current].imageLayer.selectedImageItem)) && k.shiftKey && k.keyCode === 82) {
            $btnControllerReset.click();
        } else if (k.target === document.body && k.keyCode === 27) {
            unselectItem();
        };
        if (!$chkKeyShortcut.checked) return;
        if (k.target !== document.body) return;
    });

    $bg.onerror = (e) => e.target.style["display"] = "none";
    $bg.onload = (e) => e.target.style["display"] = "block";
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
        slide[current].imageLayer.attachments.find((x) => x.id === imageController.selected).flip = d.flip;
        $img.style["transform"] = `${d.flip.horizontal ? "scaleX(-1)" : ""}${d.flip.vertical ? "scaleY(-1)" : ""}`;
        refreshThumbnail(current, $photozone);
    };
    $btnFlipVertical.onclick = () => {
        const d = imageLayer[imageController.selected];
        const $img = d.img;
        d.flip.vertical = !d.flip.vertical;
        slide[current].imageLayer.attachments.find((x) => x.id === imageController.selected).flip = d.flip;
        $img.style["transform"] = `${d.flip.horizontal ? "scaleX(-1)" : ""}${d.flip.vertical ? "scaleY(-1)" : ""}`;
        refreshThumbnail(current, $photozone);
    };
    $chkTglDarker.onchange = (c) => {
        slide[current].imageLayer.attachments.find((x) => x.id === imageController.selected).darker = c.target.checked;
        if (c.target.checked) {
            imageLayer[imageController.selected].img.classList.add("image-item-darker");
            $btnTglDarker.classList.add("controller-active");
            console.log(slide[current].imageLayer.attachments.find((x) => x.id === imageController.selected));
        } else {
            imageLayer[imageController.selected].img.classList.remove("image-item-darker");
            $btnTglDarker.classList.remove("controller-active");
        };
        // refreshThumbnail(current, $photozone);
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

    $chkTglName.onchange = (c) => {
        toggleNamearea(c.target.checked);
        refreshThumbnail(current, $photozone);
    };

    $contentArea.onclick = () => {
        __manager.modal.reserve["modal-content"].show();
    };
    $btnContent.onclick = () => {
        __manager.modal.reserve["modal-content"].show();
    };
    for (const _$r of Array.from($rblScriptBoxPos)) {
        _$r.onclick = () => {
            setBoxPos(parseInt(_$r.value));
            refreshThumbnail(current, $photozone);
        };
    };
    for (const _$r of Array.from($rblScriptBoxStyle)) {
        _$r.onclick = () => {
            setBoxStyle(parseInt(_$r.value));
            refreshThumbnail(current, $photozone);
        };
    };
    for (const _$r of Array.from($rblSokmaeumStyle)) {
        _$r.onclick = () => {
            setSokmaeumStyle(parseInt(_$r.value));
            refreshThumbnail(current, $photozone);
        };
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
        exportPNG($photozone);
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
    $btnFitToBg.onclick = () => {
        if (!slide[current].imageLayer.background) {
            new LyraNotification({
                icon: "warning",
                text: "배경 이미지가 설정되어있지 않습니다.",
                duration: 2000
            }).show();
        } else {
            const ratio = $bg.height / $bg.width;
            const width = 1280;
            setAreaWidth(width);
            setAreaHeight(Math.floor(width * ratio));
            setBackgroundFit("fill");
            __manager.modal.reserve["modal-slide-size"].close();
            refreshThumbnail(current, $photozone);
        };
    };

    $btnSelbox.onclick = () => {
        __manager.modal.reserve["modal-select"].show();
    };
    Array.from($inputSelboxOption).forEach(($n, i) => {
        const $t = [ $selboxOps[0][i], $selboxOps[1][i] ];
        const $p = [ $t[0].querySelector("p"), $t[1].querySelector("p") ];
        $n.value = slide[current].strings.select[i];
        for (const $n of $p) $n.innerText = slide[current].strings.select[i];
        $n.oninput = (c) => {
            if (!c.target.value.length) {
                for (const $n of $t) $n.style["display"] = "none";
            } else {
                for (const $n of $t) $n.style["display"] = "flex";
                for (const $n of $p) $n.innerText = c.target.value;
            };
        };
        $n.onchange = () => {
            refreshThumbnail(current, $photozone);
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

    // $btnModalColPreset.onclick = () => {
    //     __manager.modal.reserve["modal-color-preset"].show();
    // };
    (async() => {
        const RACEDATA = await fetch("https://acherium.github.io/trickcal-chardata/trace-all.json").then((res) => res.ok ? res.json() : {});
        if (Object.values(RACEDATA).length === 0) new LyraNotification({ icon: "critical", text: "RACEDATA 파일을 불러오지 못했습니다." }).show();
        const CHARDATA = await fetch("https://acherium.github.io/trickcal-chardata/tchar-race-min.json").then((res) => res.ok ? res.json() : {});
        if (Object.values(CHARDATA).length === 0) new LyraNotification({ icon: "critical", text: "CHARDATA 파일을 불러오지 못했습니다." }).show();
        const PALETTE_FROMREP = await Object.fromEntries(Object.values(RACEDATA).map((x) => [ x.id, { name: x.name.ko, char: Object.values(CHARDATA[x.id] || {}).map((y) => [ y.name.ko, y.data.color ]).filter((y) => y[1]) } ]));
    
        for (const _race of Object.values(PALETTE_FROMREP)) {
            const _$subdiv = new LyraElement("div", { class: [ "color-preset-subdiv" ] }).into($colPresetList);
            new LyraElement("p", { text: _race.name }).into(_$subdiv);
            for (const _char of _race.char) {
                const _$item = new LyraElement("div", {
                    class: [ "color-preset-item" ],
                    style: `border-color: #${_char[1]}`,
                    html: `${_char[0]}<br><span>#${_char[1]}</span>`
                }).into(_$subdiv);
                _$item.$.onclick = () => {
                    setNameColor(_char[1]);
                    if ($chkAutoName.checked) setName(_char[0]);
                    __manager.modal.reserve["modal-color-preset"].close();
                };
            };
        };
    })();

    $btnModalConfigExport.onclick = () => {
        __manager.modal.reserve["modal-config-export"].show();
    };
    $inputMultiplier.onchange = (c) => {
        const _i = Number(c.target.value);
        multiplier = Number.isNaN(_i) ? multiplier : _i;
        refreshSize();
    };
    $inputMultiplier.value = multiplier;
    refreshSize();
    
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

    $ver.innerText = `${app.name}\nVersion ${app.version}@${app.date}\n\nPowered by ${__lyra.meta.name}\nBuild ${__lyra.meta.version}@${__lyra.meta.date}`;
    $logo.onclick = () => {
        __manager.modal.reserve["modal-about"].show();
    };

    $btnSearch.onclick = () => {
        __manager.modal.reserve["modal-search"].show();
    };

    for (const x of eventConn) {
        if (
            typeof x[1][Symbol.iterator] === "function" &&
            x[1].constructor !== HTMLSelectElement
        ) for (const y of x[1]) y.addEventListener(x[0], x[2]);
        else x[1].addEventListener(x[0], x[2]);
    };

    setTimeout(() => {
        $splash.classList.add("splash-out");
        setTimeout(() => {
            $splash.remove();
        }, 1000 + __lyra.env["ANIMATION-INTERVAL"]);
    }, 1000 + __lyra.env["ANIMATION-INTERVAL"]);
})();