// Assets/tpl.es3.js
function tpl(html, data) {
  return html.replace(/\{\{(\w+)\}\}/g, function (_, k) {
    return data[k] != null ? data[k] : "";
  });
}