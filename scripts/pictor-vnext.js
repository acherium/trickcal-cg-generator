(async () => {
  // Assign master object
  const master = {
    controller: {},
  };

  // Load controller modules
  master.controller.error = (await import("./controller/errorController.js")).default;
  master.controller.tooltip = (await import("./controller/tooltipController.js")).default;
  master.controller.resource = (await import("./controller/resourceController.js")).default;

  // Initiate modules
  await master.controller.error.init();
  await master.controller.tooltip.init();
  await master.controller.resource.init();

  // End loading
  window.dispatchEvent(new CustomEvent("pictor-loadend"));
})();