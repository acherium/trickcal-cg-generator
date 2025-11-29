/**
 * @param {string} query 
 * @returns {* | null}
 */
export function lget(query) {
  if (!query || typeof query !== "string") return;
  const tree = query.split(".");

  try {
    const storage = JSON.parse(localStorage.getItem(tree[0]));
    if (!storage) return null;
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

    if (exceptionFlag) return null;
    return obj;
  } catch(error) {
    console.error(error);
    return null;
  };
};

/**
 * @param {string} query 
 * @param {*} data 
 * @returns {boolean}
 */
export function lset(query, data) {
  if (!query || typeof query !== "string" || typeof data === "undefined") return false;
  const tree = query.split(".");
  const storageName = tree.shift();

  if (!localStorage.getItem(storageName)) {
    localStorage.setItem(storageName, "{}");
  };

  try {
    const storage = JSON.parse(localStorage.getItem(storageName));
    if (!storage) return false;

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
    return true;
  } catch(error) {
    console.error(error);
    return false;
  };
};