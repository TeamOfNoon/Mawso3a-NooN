// Assets/tpl.es6.js
function tpl(html, data = {}) {
  return html.replace(/\{\{(\w+)\}\}/g, (_, k) =>
    data[k] != null ? data[k] : ""
  );
}
