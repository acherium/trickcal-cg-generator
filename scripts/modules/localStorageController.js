export function lget(query) {
  if (!query || typeof query !== "string") return;
  const tree = query.split(".");

  try {
    const storage = JSON.parse(localStorage.getItem(tree[0]));
    if (!storage) return;
    tree.shift();

    let obj = storage;
    let exceptionFlag = false;

    for (const key of tree) {
      if (typeof obj[key] !== "undefined") {
        obj = obj[key];
      } else {
        exceptionFlag = true;
      };
    };

    if (exceptionFlag) return;
    return obj;
  } catch(error) {
    console.error(error);
    return;
  };
};

export function lset(query, data) {
  if (!query || typeof query !== "string" || typeof data === "undefined") return;
  const tree = query.split(".");
  const storageName = tree.shift();

  if (!localStorage.getItem(storageName)) {
    localStorage.setItem(storageName, "{}");
  };

  try {
    const storage = JSON.parse(localStorage.getItem(storageName));
    if (!storage) return;

    let obj = storage;

    tree.forEach((key, i) => {
      if (i === tree.length - 1) {
        obj[key] = data;
      } else {
        if (typeof obj[key] === "undefined") {
          obj[key] = {};
        };

        obj = obj[key];
      };
    });

    localStorage.setItem(storageName, JSON.stringify(storage));
  } catch(error) {
    console.error(error);
    return;
  };
};