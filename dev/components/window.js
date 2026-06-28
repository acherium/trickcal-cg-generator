export function initFxWindow(app) {
  class FxWindow extends HTMLElement {
    constructor() {
      super();
    };
  };

  customElements.define("fx-window", FxWindow);
  return FxWindow;
};