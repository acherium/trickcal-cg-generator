import {
  $
} from "../../lyra/lyra-module.js";

(() => {
  // 창 닫기
  const btnClose = $("#button-close");
  btnClose.onclick = () => {
    window.close();
  };
})();