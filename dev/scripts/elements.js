import { $, append, create } from "./methods.js";

// 진행률 바
class ProgressBar extends HTMLElement {
  static observedAttributes = [ "data-max", "data-value" ];

  constructor() {
    super();

    this.max = null;
    this.value = null;
    this.percentage
    this.$gauge = $("div", this) || append(create("div"), this);

    this.draw = () => {
      const max = parseInt(this.max);
      const value = parseInt(this.value);
      if (Number.isNaN(max) || Number.isNaN(value)) return;

      if (!this.$gauge) this.$gauge = append(create("div"), this);
      if (!this.$gauge.isConnected || this.$gauge.parentElement !== this) append(this.$gauge, this);

      this.max = max;
      this.value = value;
      this.current = value / max;
      this.percentage = this.current * 100;
      this.$gauge.style["width"] = `${this.percentage}%`;

      const updateEvent = new Event("progressupdate", { bubbles: true });
      Object.defineProperties(updateEvent, {
        max: {
          value: this.max,
          writable: false,
        },
        value: {
          value: this.value,
          writable: false,
        },
        current: {
          value: this.current,
          writable: false,
        },
        percentage: {
          value: this.percentage,
          writable: false,
        },
      });

      this.dispatchEvent(updateEvent);
    };
  };

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data-max") this.max = parseInt(newValue);
    else if (name === "data-value") this.value = parseInt(newValue);

    this.draw();
  };
};
customElements.define("progress-bar", ProgressBar);