import { body, $, $a, copy,
  create, append, revoke,
  LyraButton,
  ANIMATION_INTERVAL,
  TOOLTIP_DURATION, TOOLTIP_ANIMATION_DURATION,
  DEFAULT_IMAGE_SLIDER_INTERVAL, DEFAULT_IMAGE_SLIDER_DURATION
} from "./lyra-module.js";

(() => {
  // input:range 스타일, 기능 생성
  for (const label of document.querySelectorAll("label:has(input[type=range])")) {
    const slider = label.querySelector("input[type=range]");
    if (!slider) continue;

    const rail = append(create("div", { classes: [ "rail" ] }), label);
    const gauge = append(create("div", { classes: [ "gauge" ]}), rail);
    const tip = append(create("div", { classes: [ "tip" ]}), rail);
    const text = append(create("p", { classes: [ "text" ]}), tip);

    const setSliderStyles = () => {
      gauge.style["width"] = `${slider.value / slider.max * 100}%`;
      tip.style["left"] = `${(slider.value / slider.max * 100)}%`;
      text.innerText = slider.value;
    };
    slider.addEventListener("input", setSliderStyles);
    setSliderStyles();

    slider.addEventListener("mouseover", () => {
      text.style["opacity"] = "1";
      text.style["transform"] = "translateY(0px) scale(1)";
    });
    slider.addEventListener("mouseleave", () => {
      text.style["opacity"] = "0";
      text.style["transform"] = "translateY(3px) scale(0.98)";
    });
  };

  // image slider 스타일, 기능 생성
  for (const area of document.querySelectorAll("div.slider")) {
    const images = Array.from(area.childNodes).filter((x) => x instanceof HTMLElement).map((x) => {
      const capsule = create("div", { classes: [ "capsule" ], properties: { style: "z-index:0;animation-name:ani-slider-out-left" } });
      append(revoke(x), capsule);
      return capsule;
    });
    if (images.length < 0) continue;

    for (const image of images) append(image, area);
    const length = images.length;
    const options = {
      autoNext: area.getAttribute("lyra-autoNext") !== null ? (area.getAttribute("lyra-autoNext") === "false" ? false : true) : true,
      controller: area.getAttribute("lyra-controller") !== null ? (area.getAttribute("lyra-controller") === "false" ? false : true) : true,
      interval: Number.isNaN(parseInt(area.getAttribute("lyra-interval"))) ? DEFAULT_IMAGE_SLIDER_INTERVAL : parseInt(area.getAttribute("lyra-interval"))
    };
    let previous = null;
    let current = null;
    let timeoutHandler = null;

    const controller = append(create("div", { classes: [ "controller" ] }), area);
    const radios = [];
    for (let i = 0; i < length; i++) radios.push(append(create("input", {
      attributes: { "lyra-tip": `${i+1}` },
      properties: { type: "radio", name: "page", value: `${i}` },
      events: { click: () => setSlide(current, i) }
    }), controller));
    
    const initSlide = () => {
      previous = length-1;
      current = 0;

      images[current].style["z-index"] = "1";
      images[current].style["animation-name"] = null;

      radios[current].checked = true;
    };
    const setSlide = (a, b) => {
      previous = a;
      current = b;
      
      images[previous].animate({
        transform: [ "scale(1)", "scale(0.75)" ]
      }, {
        duration: DEFAULT_IMAGE_SLIDER_DURATION,
        easing: "ease-in",
        composite: "add"
      });

      images[current].animate({
        transform: [ "scale(0.75)", "scale(1)" ]
      }, {
        duration: DEFAULT_IMAGE_SLIDER_DURATION,
        easing: "ease-out",
        composite: "add"
      });

      if (previous < current) {
        images[previous].style["z-index"] = "0";
        images[previous].style["animation-name"] = "ani-slider-out-left";
        
        images[current].style["z-index"] = "1";
        images[current].style["animation-name"] = "ani-slider-in-right";
      } else {
        images[previous].style["z-index"] = "0";
        images[previous].style["animation-name"] = "ani-slider-out-right";
        
        images[current].style["z-index"] = "1";
        images[current].style["animation-name"] = "ani-slider-in-left";
      };

      radios[current].checked = true;
      
      if (options.autoNext) {
        clearTimeout(timeoutHandler);
        timeoutHandler = setTimeout(goNext, options.interval);
      };
    };
    const goPrevious = () => {
      previous = copy(current);
      current = current-1 < 0 ? length-1 : current-1;

      images[previous].style["z-index"] = "0";
      images[previous].style["animation-name"] = "ani-slider-out-right";
      images[previous].animate({
        transform: [ "scale(1)", "scale(0.75)" ]
      }, {
        duration: DEFAULT_IMAGE_SLIDER_DURATION,
        easing: "ease-in",
        composite: "add"
      });

      images[current].style["z-index"] = "1";
      images[current].style["animation-name"] = "ani-slider-in-left";
      images[current].animate({
        transform: [ "scale(0.75)", "scale(1)" ]
      }, {
        duration: DEFAULT_IMAGE_SLIDER_DURATION,
        easing: "ease-out",
        composite: "add"
      });

      radios[current].checked = true;
      
      if (options.autoNext) {
        clearTimeout(timeoutHandler);
        timeoutHandler = setTimeout(goNext, options.interval);
      };
    };
    const goNext = () => {
      previous = copy(current);
      current = current+1 >= length ? 0 : current+1;

      images[previous].style["z-index"] = "0";
      images[previous].style["animation-name"] = "ani-slider-out-left";
      images[previous].animate({
        transform: [ "scale(1)", "scale(0.75)" ]
      }, {
        duration: DEFAULT_IMAGE_SLIDER_DURATION,
        easing: "ease-in",
        composite: "add"
      });

      images[current].style["z-index"] = "1";
      images[current].style["animation-name"] = "ani-slider-in-right";
      images[current].animate({
        transform: [ "scale(0.75)", "scale(1)" ]
      }, {
        duration: DEFAULT_IMAGE_SLIDER_DURATION,
        easing: "ease-out",
        composite: "add"
      });

      radios[current].checked = true;

      if (options.autoNext) {
        clearTimeout(timeoutHandler);
        timeoutHandler = setTimeout(goNext, options.interval);
      };
    };

    const btnPrevious = append(new LyraButton({ icon: "arrow-w", classes: [ "previous" ], attributes: { "lyra-tip": "이전" }, events: { click: goPrevious } }), area);
    const btnNext = append(new LyraButton({ icon: "arrow-e", classes: [ "next" ], attributes: { "lyra-tip": "다음" }, events: { click: goNext } }), area);

    initSlide();

    if (!options.controller) {
      controller.style["display"] = "none";
      btnPrevious.style["display"] = "none";
      btnNext.style["display"] = "none";
    } else {
      area.ontouchstart = (e) => {
        if (e.target instanceof HTMLButtonElement || e.target instanceof HTMLInputElement) return;
        clearTimeout(timeoutHandler);
    
        const ox = e.touches[0].pageX;
        let dx = 0;
    
        area.ontouchmove = (m) => {
          const x = m.touches[0].pageX;
          dx = x - ox;
        };
    
        area.ontouchend = () => {
          if (dx > 200) goPrevious();
          if (dx < -200) goNext();
          clearTimeout(timeoutHandler);
          timeoutHandler = setTimeout(goNext, DEFAULT_IMAGE_SLIDER_INTERVAL);
          area.ontouchmove = null;
          area.ontouchend = null;
          area.ontoucherror = null;
        };
        area.ontoucherror = () => {
          if (dx > 200) goPrevious();
          if (dx < -200) goNext();
          clearTimeout(timeoutHandler);
          timeoutHandler = setTimeout(goNext, DEFAULT_IMAGE_SLIDER_INTERVAL);
          area.ontouchmove = null;
          area.ontouchend = null;
          area.ontoucherror = null;
        };
      };  
    };

    if (options.autoNext) timeoutHandler = setTimeout(goNext, options.interval);
  };

  // 마우스 툴팁 스타일, 기능 생성
  const tipArea = append(create("div", { id: "lyra-tooltip-area" }));
  const tipOffset = { x: 10, y: 10 };
  let activeTip = null;
  document.addEventListener("mousemove", (e) => {
    if (!(e.target instanceof HTMLElement) || e.target.getAttribute("lyra-tip") === null) return;
    const node = e.target;
    if (activeTip === node || activeTip !== null) return;
    activeTip = node;
    const tip = append(create("p", { classes: [ "tip" ], properties: { innerHTML: node.getAttribute("lyra-tip") } }), tipArea);
    tip.animate({
      transform: [ "translateY(3px) scale(0.98)", "translateY(0px) scale(1)" ]
    }, {
      duration: TOOLTIP_ANIMATION_DURATION,
      easing: "ease-in-out",
      fill: "both",
      composite: "accumulate"
    });
    tip.animate({
      opacity: [ "0", "1" ]
    }, {
      duration: TOOLTIP_ANIMATION_DURATION,
      easing: "ease-in-out",
      fill: "both",
      composite: "replace"
    });

    const nodeBound = node.getBoundingClientRect();
    const tipBound = tip.getBoundingClientRect();
    let x = nodeBound.x + tipOffset.x;
    let y = nodeBound.y + nodeBound.height + tipOffset.y;
    if (x + tipBound.width > window.innerWidth - tipOffset.x) x = nodeBound.x + nodeBound.width - tipBound.width - tipOffset.x;
    if (y + tipBound.height > window.innerHeight - tipOffset.y) y = nodeBound.y - tipBound.height - tipOffset.y;
    tip.style["transform"] = `translate(${x}px, ${y}px)`;

    const over = () => {
      tip.animate({
        transform: [ "translateY(0px) scale(1)", "translateY(3px) scale(0.98)" ]
      }, {
        duration: TOOLTIP_ANIMATION_DURATION,
        easing: "ease-in-out",
        fill: "both",
        composite: "accumulate"
      });
      tip.animate({
        opacity: [ "1", "0" ]
      }, {
        duration: TOOLTIP_ANIMATION_DURATION,
        easing: "ease-in-out",
        fill: "both",
        composite: "replace"
      });
      setTimeout(() => tip.remove(), TOOLTIP_ANIMATION_DURATION + ANIMATION_INTERVAL);
    };  

    const timeoutHandler = setTimeout(() => {
      over();
    }, TOOLTIP_DURATION);

    node.addEventListener("mouseleave", () => {
      activeTip = null;
      over();
      clearTimeout(timeoutHandler);
    });
  });
})();