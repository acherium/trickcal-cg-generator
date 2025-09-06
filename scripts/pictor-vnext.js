(async () => {
  // Assign master object
  const master = {
    controller: {},
  };

  // Load controller modules
  master.controller.tooltip = (await import("./controller/tooltipController.js")).default;

  // Initiate modules
  await master.controller.tooltip.init();

  // End loading
  window.dispatchEvent(new CustomEvent("pictor-loadend"));
})();