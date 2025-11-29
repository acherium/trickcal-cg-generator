/**
 * @param {string} query 
 * @param {Element} [target] 
 * @returns {Element | null}
 */
export const $ = (query, target = document) => {
  if (!target) return null;
  return target.querySelector(query);
};

/**
 * @param {string} query
 * @param {Element} [target]
 * @returns {NodeList}
 */
export const $a = (query, target = document) => target.querySelectorAll(query);

/**
 * @typedef {object} CreateParameters
 * @property {string} [id] 
 * @property {array} [classes] 
 * @property {object} [attributes] 
 * @property {object} [properties] 
 * @property {object} [events] 
 */
/**
 * @param {string} tag 
 * @param {CreateParameters} [params] 
 * @returns {Element}
 */
export const create = (tag = "div", params = { id: null, classes: [], attributes: {}, properties: {}, events: {} }) => {
  const res = document.createElement(tag);
  if (params) {
    if (params.id && params.id !== null) res.id = params.id;
    if (params.classes?.length > 0) for (const value of params.classes) res.classList.add(value);
    if (params.attributes) for (const key in params.attributes) res.setAttribute(key, params.attributes[key]);
    if (params.properties) for (const key in params.properties) res[key] = params.properties[key];
    if (params.events) for (const key in params.events) res.addEventListener(key, params.events[key]);
  };
  return res;
};

/**
 * @param {Element} node 
 * @param {Element} [target] 
 * @returns {Element}
 */
export const append = (node, target = body) => target.appendChild(node);

/**
 * @param {Element} node 
 * @returns {Element}
 */
export const revoke = (node) => node.parentNode.removeChild(node);