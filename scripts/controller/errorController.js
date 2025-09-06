import { append, create, revoke } from "../../lyra/lyra-module.js";

export default {
  init: async () => {
    window.addEventListener("error", (event) => {
      const error = event.error;

      const $area = create("div", { classes: [ "error-alert-area" ] });
      const $backdrop = append(create("div", { classes: [ "backdrop" ] }), $area);
      const $wrap = append(create("div", { classes: [ "wrap" ] }), $area);
      const $alert = append(create("div", { classes: [ "error-alert" ] }), $wrap);
      const $top = append(create("div", { classes: [ "top" ] }), $alert);
      const $title = append(create("div", { classes: [ "title" ] }), $top);
      const $icon = append(create("i", { classes: [ "warning" ] }), $title);
      const $titleText = append(create("h1", { properties: { innerText: "문제가 발생했습니다" } }), $title);
      const $content = append(create("div", { classes: [ "content" ] }), $top);
      const $bottom = append(create("div", { classes: [ "bottom" ] }), $alert);
      const $btn = append(create("button", { properties: { innerText: "확인" } }), $bottom);

      $content.innerText = `${error.message}\n\n` +
       `Location: ${error.fileName || "_"}:${error.lineNumber || "_"}:${error.columnNumber || "_"}\n\n` +
       `${error.stack || "No stack data."}`;

      $backdrop.addEventListener("click", () => {
        revoke($area);
      });

      $btn.addEventListener("click", () => {
        revoke($area);
      });

      append($area);
    });
  },
};