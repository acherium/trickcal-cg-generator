import { $a, append, create, revoke } from "../../lyra/lyra-module.js";
const TOOLTIP_GAP = 4;

export default {
  init: async () => {
    const $tooltipTargets = $a("[data-tooltip]");
    
    for (const $target of $tooltipTargets) {
      const context = $target.dataset.tooltip;
      let $tooltip = create("div", { classes: [ "tooltip" ], properties: { innerHTML: context } });

      const show = () => {
        const rect = $target.getBoundingClientRect();
        let x = rect.left;
        let y = rect.top + rect.height + TOOLTIP_GAP;

        append($tooltip);
        $tooltip.style["opacity"] = "0";

        const tooltipRect = $tooltip.getBoundingClientRect();
        const width = tooltipRect.width;
        const height = tooltipRect.height;

        x -= width / 2 - rect.width / 2
        
        if (x + width + TOOLTIP_GAP >= innerWidth) {
          x -= ( x + width + TOOLTIP_GAP - innerWidth );
        };

        if (x <= TOOLTIP_GAP) {
          x = TOOLTIP_GAP;
        };

        if (y + TOOLTIP_GAP >= innerHeight) {
          y = rect.top - height - TOOLTIP_GAP;
        };

        if (y <= TOOLTIP_GAP) {
          y = TOOLTIP_GAP;
        };

        $tooltip.animate([
          {
            transform: `translate(${x}px, ${y}px)`,
          },
        ], {
          fill: "both",
        });

        $tooltip.style["opacity"] = "1";

        $target.addEventListener("pointerleave", hide);
        document.addEventListener("pointerdown", hide);
        document.addEventListener("pointercancel", hide);
      };

      const hide = () => {
        $tooltip = revoke($tooltip);

        $target.removeEventListener("pointerleave", hide);
        document.removeEventListener("pointerdown", hide);
        document.removeEventListener("pointercancel", hide);
      };

      $target.addEventListener("pointerover", show);
    };
  },
};