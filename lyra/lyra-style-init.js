for (const label of document.querySelectorAll("label:has(input[type=range])")) {
  const slider = label.querySelector("input[type=range]");
  const gauge = label.querySelector("div > div");
  const tipSlider = label.querySelector("div > span");
  const tip = tipSlider.querySelector("span");
  if (!slider || !gauge || !tipSlider || !tip) continue;

  const setSliderStyles = () => {
    gauge.style["width"] = `${slider.value / slider.max * 100}%`;
    tipSlider.style["left"] = `${(slider.value / slider.max * 100)}%`;
    tip.innerText = slider.value;
  };
  slider.addEventListener("input", setSliderStyles);
  setSliderStyles();

  slider.addEventListener("mouseover", () => {
    tip.style["opacity"] = "1";
    tip.style["transform"] = "translateY(0px) scale(1)";
  });
  slider.addEventListener("mouseleave", () => {
    tip.style["opacity"] = "0";
    tip.style["transform"] = "translateY(3px) scale(0.95)";
  });
};