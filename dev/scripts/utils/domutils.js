/**
 * @param {string} selectors 
 * @param {Document | Element} [parent] 
 * @returns {Element | null}
 */
export function $(selectors, parent = document.body) {
  return parent?.querySelector(selectors) || null;
};

/**
 * @param {*} selectors 
 * @param {Document | Element} [parent] 
 * @returns {Element[]}
 */
export function $a(selectors, parent = document.body) {
  return Array.from(parent?.querySelectorAll(selectors) || []);
};

/**
 * @param {string} localName 
 * @returns {HTMLElement}
 */
export function create(localName) {
  return document.createElement(localName);
};