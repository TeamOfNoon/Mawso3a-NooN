// ★★★ FAST CONFIG - LOAD MORE CHUNKS PER WAVE ★★★
var CHUNK_SIZE = 65536; // 64KB chunks (was 4KB) - fewer requests
var MAX_READ_HEADS = 10; // More concurrent read heads (was 3)
var MAX_READ_SPEED = 104857600; // 100 MB/s (was 5 MB/s)
var BUFFER_SIZE = 256 * 1024 * 1024; // 256MB buffer (was 64MB)
var PAGE_SIZE = 5; // More results per page

var db = "https://pub-05c91ed29edd448284ad6e77d2a261f6.r2.dev/search.sqlite";
//var db = "db/search.sqlite";

(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ================================================================
  // SQL.JS-HTTPVFS LIBRARY (FULL BUNDLED CODE)
  // ================================================================
  var require_dist = __commonJS({
    "mnt/data/sqlite-http-demo2/node_modules/sql.js-httpvfs/dist/index.js"(exports, module) {
      !function(e, t) {
        if ("object" == typeof exports && "object" == typeof module) module.exports = t();
        else if ("function" == typeof define && define.amd) define([], t);
        else {
          var n = t();
          for (var r in n) ("object" == typeof exports ? exports : e)[r] = n[r];
        }
      }(exports, function() {
        return (() => {
          "use strict";
          var e = { 870: (e2, t2, n2) => {
            n2.r(t2), n2.d(t2, { createEndpoint: () => o, expose: () => l, proxy: () => v, proxyMarker: () => r, releaseProxy: () => a, transfer: () => y, transferHandlers: () => c, windowEndpoint: () => g, wrap: () => f });
            const r = Symbol("Comlink.proxy"), o = Symbol("Comlink.endpoint"), a = Symbol("Comlink.releaseProxy"), i = Symbol("Comlink.thrown"), s = (e3) => "object" == typeof e3 && null !== e3 || "function" == typeof e3, c = /* @__PURE__ */ new Map([["proxy", { canHandle: (e3) => s(e3) && e3[r], serialize(e3) {
              const { port1: t3, port2: n3 } = new MessageChannel();
              return l(e3, t3), [n3, [n3]];
            }, deserialize: (e3) => (e3.start(), f(e3)) }], ["throw", { canHandle: (e3) => s(e3) && i in e3, serialize({ value: e3 }) {
              let t3;
              return t3 = e3 instanceof Error ? { isError: true, value: { message: e3.message, name: e3.name, stack: e3.stack } } : { isError: false, value: e3 }, [t3, []];
            }, deserialize(e3) {
              if (e3.isError) throw Object.assign(new Error(e3.value.message), e3.value);
              throw e3.value;
            } }]]);
            function l(e3, t3 = self) {
              t3.addEventListener("message", function n3(r2) {
                if (!r2 || !r2.data) return;
                const { id: o2, type: a2, path: s2 } = Object.assign({ path: [] }, r2.data), c2 = (r2.data.argumentList || []).map(w);
                let f2;
                try {
                  const t4 = s2.slice(0, -1).reduce((e4, t5) => e4[t5], e3), n4 = s2.reduce((e4, t5) => e4[t5], e3);
                  switch (a2) {
                    case 0:
                      f2 = n4;
                      break;
                    case 1:
                      t4[s2.slice(-1)[0]] = w(r2.data.value), f2 = true;
                      break;
                    case 2:
                      f2 = n4.apply(t4, c2);
                      break;
                    case 3:
                      f2 = v(new n4(...c2));
                      break;
                    case 4:
                      {
                        const { port1: t5, port2: n5 } = new MessageChannel();
                        l(e3, n5), f2 = y(t5, [t5]);
                      }
                      break;
                    case 5:
                      f2 = void 0;
                  }
                } catch (e4) {
                  f2 = { value: e4, [i]: 0 };
                }
                Promise.resolve(f2).catch((e4) => ({ value: e4, [i]: 0 })).then((e4) => {
                  const [r3, i2] = b(e4);
                  t3.postMessage(Object.assign(Object.assign({}, r3), { id: o2 }), i2), 5 === a2 && (t3.removeEventListener("message", n3), u(t3));
                });
              }), t3.start && t3.start();
            }
            function u(e3) {
              (function(e4) {
                return "MessagePort" === e4.constructor.name;
              })(e3) && e3.close();
            }
            function f(e3, t3) {
              return d(e3, [], t3);
            }
            function p(e3) {
              if (e3) throw new Error("Proxy has been released and is not useable");
            }
            function d(e3, t3 = [], n3 = function() {
            }) {
              let r2 = false;
              const i2 = new Proxy(n3, { get(n4, o2) {
                if (p(r2), o2 === a) return () => E(e3, { type: 5, path: t3.map((e4) => e4.toString()) }).then(() => {
                  u(e3), r2 = true;
                });
                if ("then" === o2) {
                  if (0 === t3.length) return { then: () => i2 };
                  const n5 = E(e3, { type: 0, path: t3.map((e4) => e4.toString()) }).then(w);
                  return n5.then.bind(n5);
                }
                return d(e3, [...t3, o2]);
              }, set(n4, o2, a2) {
                p(r2);
                const [i3, s2] = b(a2);
                return E(e3, { type: 1, path: [...t3, o2].map((e4) => e4.toString()), value: i3 }, s2).then(w);
              }, apply(n4, a2, i3) {
                p(r2);
                const s2 = t3[t3.length - 1];
                if (s2 === o) return E(e3, { type: 4 }).then(w);
                if ("bind" === s2) return d(e3, t3.slice(0, -1));
                const [c2, l2] = m(i3);
                return E(e3, { type: 2, path: t3.map((e4) => e4.toString()), argumentList: c2 }, l2).then(w);
              }, construct(n4, o2) {
                p(r2);
                const [a2, i3] = m(o2);
                return E(e3, { type: 3, path: t3.map((e4) => e4.toString()), argumentList: a2 }, i3).then(w);
              } });
              return i2;
            }
            function m(e3) {
              const t3 = e3.map(b);
              return [t3.map((e4) => e4[0]), (n3 = t3.map((e4) => e4[1]), Array.prototype.concat.apply([], n3))];
              var n3;
            }
            const h = /* @__PURE__ */ new WeakMap();
            function y(e3, t3) {
              return h.set(e3, t3), e3;
            }
            function v(e3) {
              return Object.assign(e3, { [r]: true });
            }
            function g(e3, t3 = self, n3 = "*") {
              return { postMessage: (t4, r2) => e3.postMessage(t4, n3, r2), addEventListener: t3.addEventListener.bind(t3), removeEventListener: t3.removeEventListener.bind(t3) };
            }
            function b(e3) {
              for (const [t3, n3] of c) if (n3.canHandle(e3)) {
                const [r2, o2] = n3.serialize(e3);
                return [{ type: 3, name: t3, value: r2 }, o2];
              }
              return [{ type: 0, value: e3 }, h.get(e3) || []];
            }
            function w(e3) {
              switch (e3.type) {
                case 3:
                  return c.get(e3.name).deserialize(e3.value);
                case 0:
                  return e3.value;
              }
            }
            function E(e3, t3, n3) {
              return new Promise((r2) => {
                const o2 = new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
                e3.addEventListener("message", function t4(n4) {
                  n4.data && n4.data.id && n4.data.id === o2 && (e3.removeEventListener("message", t4), r2(n4.data));
                }), e3.start && e3.start(), e3.postMessage(Object.assign({ id: o2 }, t3), n3);
              });
            }
          }, 162: function(e2, t2, n2) {
            var r = this && this.__createBinding || (Object.create ? function(e3, t3, n3, r2) {
              void 0 === r2 && (r2 = n3), Object.defineProperty(e3, r2, { enumerable: true, get: function() {
                return t3[n3];
              } });
            } : function(e3, t3, n3, r2) {
              void 0 === r2 && (r2 = n3), e3[r2] = t3[n3];
            }), o = this && this.__setModuleDefault || (Object.create ? function(e3, t3) {
              Object.defineProperty(e3, "default", { enumerable: true, value: t3 });
            } : function(e3, t3) {
              e3.default = t3;
            }), a = this && this.__importStar || function(e3) {
              if (e3 && e3.__esModule) return e3;
              var t3 = {};
              if (null != e3) for (var n3 in e3) "default" !== n3 && Object.prototype.hasOwnProperty.call(e3, n3) && r(t3, e3, n3);
              return o(t3, e3), t3;
            };
            Object.defineProperty(t2, "__esModule", { value: true }), t2.createDbWorker = void 0;
            const i = a(n2(870));
            async function s(e3) {
              if (e3.data && "eval" === e3.data.action) {
                const t3 = new Int32Array(e3.data.notify, 0, 2), n3 = new Uint8Array(e3.data.notify, 8);
                let r2;
                try {
                  r2 = { ok: await u(e3.data.request) };
                } catch (t4) {
                  console.error("worker request error", e3.data.request, t4), r2 = { err: String(t4) };
                }
                const o2 = new TextEncoder().encode(JSON.stringify(r2));
                n3.set(o2, 0), t3[1] = o2.length, Atomics.notify(t3, 0);
              }
            }
            function c(e3) {
              if ("BODY" === e3.tagName) return "body";
              const t3 = [];
              for (; e3.parentElement && "BODY" !== e3.tagName; ) {
                if (e3.id) {
                  t3.unshift("#" + e3.id);
                  break;
                }
                {
                  let n3 = 1, r2 = e3;
                  for (; r2.previousElementSibling; ) r2 = r2.previousElementSibling, n3++;
                  t3.unshift(e3.tagName.toLowerCase() + ":nth-child(" + n3 + ")");
                }
                e3 = e3.parentElement;
              }
              return t3.join(" > ");
            }
            function l(e3) {
              return Object.keys(e3);
            }
            async function u(e3) {
              if (console.log("dom vtable request", e3), "select" === e3.type) return [...document.querySelectorAll(e3.selector)].map((t3) => {
                const n3 = {};
                for (const r2 of e3.columns) "selector" === r2 ? n3.selector = c(t3) : "parent" === r2 ? t3.parentElement && (n3.parent = t3.parentElement ? c(t3.parentElement) : null) : "idx" === r2 || (n3[r2] = t3[r2]);
                return n3;
              });
              if ("insert" === e3.type) {
                if (!e3.value.parent) throw Error('"parent" column must be set when inserting');
                const t3 = document.querySelectorAll(e3.value.parent);
                if (0 === t3.length) throw Error(`Parent element ${e3.value.parent} could not be found`);
                if (t3.length > 1) throw Error(`Parent element ${e3.value.parent} ambiguous (${t3.length} results)`);
                const n3 = t3[0];
                if (!e3.value.tagName) throw Error("tagName must be set for inserting");
                const r2 = document.createElement(e3.value.tagName);
                for (const t4 of l(e3.value)) if (null !== e3.value[t4]) {
                  if ("tagName" === t4 || "parent" === t4) continue;
                  if ("idx" === t4 || "selector" === t4) throw Error(`${t4} can't be set`);
                  r2[t4] = e3.value[t4];
                }
                return n3.appendChild(r2), null;
              }
              if ("update" === e3.type) {
                const t3 = document.querySelector(e3.value.selector);
                if (!t3) throw Error(`Element ${e3.value.selector} not found!`);
                const n3 = [];
                for (const r2 of l(e3.value)) {
                  const o2 = e3.value[r2];
                  if ("parent" !== r2) {
                    if ("idx" !== r2 && "selector" !== r2 && o2 !== t3[r2]) {
                      if (console.log("SETTING ", r2, t3[r2], "->", o2), "tagName" === r2) throw Error("can't change tagName");
                      n3.push(r2);
                    }
                  } else if (o2 !== c(t3.parentElement)) {
                    const e4 = document.querySelectorAll(o2);
                    if (1 !== e4.length) throw Error(`Invalid target parent: found ${e4.length} matches`);
                    e4[0].appendChild(t3);
                  }
                }
                for (const r2 of n3) t3[r2] = e3.value[r2];
                return null;
              }
              throw Error(`unknown request ${e3.type}`);
            }
            i.transferHandlers.set("WORKERSQLPROXIES", { canHandle: (e3) => false, serialize(e3) {
              throw Error("no");
            }, deserialize: (e3) => (e3.start(), i.wrap(e3)) }), t2.createDbWorker = async function(e3, t3, n3, r2 = 1 / 0) {
              const o2 = new Worker(t3), a2 = i.wrap(o2), c2 = await a2.SplitFileHttpDatabase(n3, e3, void 0, r2);
              return o2.addEventListener("message", s), { db: c2, worker: a2, configs: e3 };
            };
          }, 432: function(e2, t2, n2) {
            var r = this && this.__createBinding || (Object.create ? function(e3, t3, n3, r2) {
              void 0 === r2 && (r2 = n3), Object.defineProperty(e3, r2, { enumerable: true, get: function() {
                return t3[n3];
              } });
            } : function(e3, t3, n3, r2) {
              void 0 === r2 && (r2 = n3), e3[r2] = t3[n3];
            }), o = this && this.__exportStar || function(e3, t3) {
              for (var n3 in e3) "default" === n3 || Object.prototype.hasOwnProperty.call(t3, n3) || r(t3, e3, n3);
            };
            Object.defineProperty(t2, "__esModule", { value: true }), o(n2(162), t2);
          } }, t = {};
          function n(r) {
            var o = t[r];
            if (void 0 !== o) return o.exports;
            var a = t[r] = { exports: {} };
            return e[r].call(a.exports, a, a.exports, n), a.exports;
          }
          return n.d = (e2, t2) => {
            for (var r in t2) n.o(t2, r) && !n.o(e2, r) && Object.defineProperty(e2, r, { enumerable: true, get: t2[r] });
          }, n.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), n.r = (e2) => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
          }, n(432);
        })();
      });
    }
  });

  // ================================================================
  // APPLICATION CODE
  // ================================================================
  var import_dist = __toESM(require_dist());
  
  // State
  var worker = null;
  var currentOffset = 0;
  var lastQuery = "";
  var lastMode = "exact";
  var loading = false;
  var initPromise = null;
  var totalResults = 0;
  var currentPage = 1;
  var allResults = [];
  
  // DOM Helpers
  var $ = (id) => document.getElementById(id);
  var abs = (path) => new URL(path, window.location.href).href;
  var DB_URL = abs(db);
  var WORKER_URL = abs("dist/sqlite.worker.js");
  var WASM_URL = abs("dist/sql-wasm.wasm");
  
  function escapeHtml(s) {
    return String(s ?? "").replace(/[&<>\"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  }
  
  function normalizeArabic(s) {
    return String(s || "")
      .replace(/[\u064B-\u065F\u0670]/g, "")
      .replace(/\u0640/g, "")
      .replace(/[إأآٱ]/g, "\u0627")
      .replace(/ة/g, "\u0647")
      .replace(/ى/g, "\u064A")
      .replace(/ؤ/g, "\u0648")
      .replace(/ئ/g, "\u064A")
      .toLowerCase()
      .trim();
  }
  
  function makeGrams(s, n = 3) {
    s = normalizeArabic(s).replace(/\s+/g, "");
    if (!s) return [];
    if (s.length <= n) return [s];
    const out = [];
    for (let i = 0; i <= s.length - n; i++) out.push(s.slice(i, i + n));
    return [...new Set(out)];
  }
  
  function rowsFromResult(res) {
    if (!res || !res.length) return [];
    const cols = res[0].columns;
    return res[0].values.map((row) => Object.fromEntries(cols.map((c, i) => [c, row[i]])));
  }
  
  // ================================================================
  // ★★★ QUERIES ★★★
  // ================================================================
  
  function buildSearchSql(mode, q, offset, limit) {
    limit = limit || PAGE_SIZE;
    offset = offset || 0;
    
    if (mode === "exact") {
      return {
        sql: `
          SELECT p.id, p.title, p.body, p.url
          FROM posts p
          WHERE p.id IN (
            SELECT wp.post_id
            FROM words w
            JOIN word_posts wp ON wp.word_id = w.word_id
            WHERE w.word = ?
            ORDER BY wp.post_id
            LIMIT ? OFFSET ?
          )
          ORDER BY p.rank DESC, p.id ASC
        `,
        params: [q, limit, offset]
      };
    }
    
    if (mode === "prefix") {
      return {
        sql: `
          SELECT p.id, p.title, p.body, p.url
          FROM posts p
          WHERE p.id IN (
            SELECT wp.post_id
            FROM words w
            JOIN word_posts wp ON wp.word_id = w.word_id
            WHERE w.word >= ? AND w.word < ?
            ORDER BY wp.post_id
            LIMIT ? OFFSET ?
          )
          ORDER BY p.rank DESC, p.id ASC
        `,
        params: [q, q + "\uFFFF", limit, offset]
      };
    }
    
    const grams = makeGrams(q, 3);
    const placeholders = grams.map(() => "?").join(",");
    
    return {
      sql: `
        SELECT p.id, p.title, p.body, p.url
        FROM posts p
        WHERE p.id IN (
          SELECT g.post_id
          FROM grams g
          WHERE g.gram IN (${placeholders})
          GROUP BY g.post_id
          HAVING COUNT(DISTINCT g.gram) = ?
          ORDER BY g.post_id
          LIMIT ? OFFSET ?
        )
        ORDER BY p.rank DESC, p.id ASC
      `,
      params: [...grams, grams.length, limit, offset]
    };
  }
  
  // ================================================================
  // ★★★ COUNT QUERY ★★★
  // ================================================================
  
  function buildCountSql(mode, q) {
    if (mode === "exact") {
      return {
        sql: `
          SELECT COUNT(DISTINCT wp.post_id) as total
          FROM words w
          JOIN word_posts wp ON wp.word_id = w.word_id
          WHERE w.word = ?
        `,
        params: [q]
      };
    }
    
    if (mode === "prefix") {
      return {
        sql: `
          SELECT COUNT(DISTINCT wp.post_id) as total
          FROM words w
          JOIN word_posts wp ON wp.word_id = w.word_id
          WHERE w.word >= ? AND w.word < ?
        `,
        params: [q, q + "\uFFFF"]
      };
    }
    
    const grams = makeGrams(q, 3);
    const placeholders = grams.map(() => "?").join(",");
    
    return {
      sql: `
        SELECT COUNT(DISTINCT g.post_id) as total
        FROM grams g
        WHERE g.gram IN (${placeholders})
        GROUP BY g.post_id
        HAVING COUNT(DISTINCT g.gram) = ?
      `,
      params: [...grams, grams.length]
    };
  }
  
async function init() {
  var pathsEl = $("paths");
  if (pathsEl) {
    pathsEl.textContent = "DB: " + DB_URL + "\nWorker: " + WORKER_URL + "\nWASM: " + WASM_URL;
  }

  // ★★★ FAST CONFIG: Bigger chunks, more read heads ★★★
  worker = await (0, import_dist.createDbWorker)([
    {
      from: "inline",
      config: {
        serverMode: "range",
        requestChunkSize: CHUNK_SIZE,  // 64KB instead of 4KB
        url: DB_URL,
        maxReadHeads: MAX_READ_HEADS,   // 10 instead of 3
        maxReadSpeed: MAX_READ_SPEED,   // 100MB/s instead of 5MB/s
        logPageReads: false             // Disable logging for speed
      }
    }
  ], WORKER_URL, WASM_URL, BUFFER_SIZE);

  var statusEl = $("status");
  if (statusEl) {
    statusEl.textContent = "✅ Fast mode: " + CHUNK_SIZE/1024 + "KB chunks, " + MAX_READ_HEADS + " read heads";
  }
}
  function ensureInit() {
    if (worker) return Promise.resolve();
    if (!initPromise) {
      initPromise = init();
    }
    return initPromise;
  }
  
  function renderRows(rows, append) {
    var resultsEl = $("results");
    if (!resultsEl) return;
    
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      html += '<div class="item">';
      html += '  <div class="title">' + escapeHtml(r.title) + '</div>';
      html += '  <div class="meta">ID ' + escapeHtml(r.id) + ' — ' + escapeHtml(r.url) + '</div>';
      html += '  <div class="body">' + escapeHtml(r.body) + '</div>';
      html += '</div>';
    }
    
    if (append) {
      resultsEl.insertAdjacentHTML("beforeend", html);
    } else {
      resultsEl.innerHTML = html || "<p>No results.</p>";
    }
  }
  
  // ================================================================
  // ★★★ PAGINATION BAR RENDERER ★★★
  // ================================================================
  
  function renderPagination(totalPages, currentPage) {
    var paginationDiv = $("pagination");
    if (!paginationDiv) return;
    
    if (totalPages <= 1) {
      paginationDiv.innerHTML = '';
      paginationDiv.style.display = 'none';
      return;
    }
    
    paginationDiv.style.display = 'flex';
    
    var html = '';
    
    // Previous button
    html += '<button class="page-btn" data-page="' + (currentPage - 1) + '" ' + (currentPage <= 1 ? 'disabled' : '') + '>‹</button>';
    
    // Page numbers
    var startPage = Math.max(1, currentPage - 3);
    var endPage = Math.min(totalPages, currentPage + 3);
    
    if (startPage > 1) {
      html += '<button class="page-btn" data-page="1">1</button>';
      if (startPage > 2) {
        html += '<span class="page-dots">…</span>';
      }
    }
    
    for (var i = startPage; i <= endPage; i++) {
      var active = i === currentPage ? 'active' : '';
      html += '<button class="page-btn ' + active + '" data-page="' + i + '">' + i + '</button>';
    }
    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        html += '<span class="page-dots">…</span>';
      }
      html += '<button class="page-btn" data-page="' + totalPages + '">' + totalPages + '</button>';
    }
    
    // Next button
    html += '<button class="page-btn" data-page="' + (currentPage + 1) + '" ' + (currentPage >= totalPages ? 'disabled' : '') + '>›</button>';
    
    paginationDiv.innerHTML = html;
    
    // Add event listeners to page buttons
    var buttons = paginationDiv.querySelectorAll('.page-btn');
    for (var j = 0; j < buttons.length; j++) {
      (function(btn) {
        btn.addEventListener('click', async function() {
          if (btn.disabled) return;
          var page = parseInt(btn.dataset.page);
          if (page && page !== currentPage) {
            await goToPage(page);
          }
        });
      })(buttons[j]);
    }
  }
  
  // ================================================================
  // ★★★ GO TO SPECIFIC PAGE ★★★
  // ================================================================
  
  async function goToPage(page) {
    if (!worker || loading) return;
    if (page < 1) return;
    
    var totalPages = Math.ceil(totalResults / PAGE_SIZE);
    if (page > totalPages) return;
    
    currentPage = page;
    var offset = (page - 1) * PAGE_SIZE;
    
    var statusEl = $("status");
    if (statusEl) statusEl.textContent = "Loading page " + page + "...";
    
    try {
      var q = normalizeArabic(lastQuery);
      var mode = lastMode;
      
      var query = buildSearchSql(mode, q, offset);
      var res = await worker.db.exec(query.sql, query.params);
      var rows = rowsFromResult(res);
      
      renderRows(rows, false);
      
      var totalPages2 = Math.ceil(totalResults / PAGE_SIZE);
      renderPagination(totalPages2, currentPage);
      
      var bytes = 0;
      try {
        bytes = await worker.worker.bytesRead;
      } catch (_) {}
      
      var sizeStr = bytes ? " | 📊 " + (bytes / 1024 / 1024).toFixed(2) + " MB loaded" : "";
      if (statusEl) {
        statusEl.textContent = "Page " + currentPage + "/" + totalPages2 + " - " + rows.length + " results shown" + sizeStr;
      }
      
      var moreBtn = $("more");
      if (moreBtn) {
        moreBtn.hidden = true;
      }
      
    } catch (err) {
      console.error(err);
      if (statusEl) statusEl.textContent = "Error loading page: " + err.message;
    }
  }
  
  // ================================================================
  // SEARCH EXECUTION
  // ================================================================
  async function runSearch(append) {
    if (append === undefined) append = false;
    
    if (!worker || loading) return;
    loading = true;
    
    var qInput = $("q");
    var modeSelect = $("mode");
    var statusEl = $("status");
    var moreBtn = $("more");
    
    if (!qInput || !modeSelect) {
      loading = false;
      return;
    }
    
    var raw = qInput.value.trim();
    var q = normalizeArabic(raw);
    var mode = modeSelect.value;
    
    if (!q) {
      var resultsEl = $("results");
      if (resultsEl) resultsEl.innerHTML = "";
      if (statusEl) statusEl.textContent = "Type search text.";
      if (moreBtn) moreBtn.hidden = true;
      var paginationDiv = $("pagination");
      if (paginationDiv) paginationDiv.style.display = 'none';
      loading = false;
      return;
    }
    
    // Reset for new search
    if (q !== lastQuery || mode !== lastMode) {
      currentOffset = 0;
      currentPage = 1;
      totalResults = 0;
      var resultsEl2 = $("results");
      if (resultsEl2) resultsEl2.innerHTML = "";
    }
    
    lastQuery = q;
    lastMode = mode;
    
    var t0 = performance.now();
    
    try {
      // Get total count
      if (!append) {
        var countSql = buildCountSql(mode, q);
        var countRes = await worker.db.exec(countSql.sql, countSql.params);
        if (countRes && countRes.length > 0 && countRes[0].values.length > 0) {
          totalResults = countRes[0].values[0][0] || 0;
        } else {
          totalResults = 0;
        }
      }
      
      // Get actual results with current offset
      var query2 = buildSearchSql(mode, q, currentOffset);
      var res2 = await worker.db.exec(query2.sql, query2.params);
      var rows2 = rowsFromResult(res2);
      
      // Render results
      if (append) {
        renderRows(rows2, true);
      } else {
        renderRows(rows2, false);
      }
      
      // Update offset for next page
      currentOffset += rows2.length;
      
      // Update more button
      var hasMore = rows2.length > 0 && (currentOffset < totalResults);
      if (moreBtn) {
        moreBtn.hidden = !hasMore;
      }
      
      // Render pagination bar
      var totalPages3 = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
      renderPagination(totalPages3, currentPage);
      
      var bytes2 = 0;
      try {
        bytes2 = await worker.worker.bytesRead;
      } catch (_) {}
      
      var ms = Math.round(performance.now() - t0);
      var sizeStr2 = bytes2 ? " | 📊 " + (bytes2 / 1024 / 1024).toFixed(2) + " MB loaded" : "";
      if (statusEl) {
        statusEl.textContent = mode + " search: " + rows2.length + " results, " + totalResults.toLocaleString() + " total in " + ms + " ms. Page " + currentPage + "/" + totalPages3 + sizeStr2;
      }
      
    } catch (err) {
      console.error(err);
      if (statusEl) statusEl.textContent = "Search error: " + err.message;
    } finally {
      loading = false;
    }
  }
  
  // ================================================================
  // UI SETUP
  // ================================================================
  function setupUI() {
    var pathsEl = $("paths");
    if (pathsEl) {
      pathsEl.textContent = "\n      DB: " + DB_URL + "\n      Worker: " + WORKER_URL + "\n      WASM: " + WASM_URL + "\n    ";
    }
    
    var statusEl = $("status");
    if (statusEl) {
      statusEl.textContent = "🔍 Ready. Type a search and press Enter or click Search. (On-demand HTTP streaming)";
    }
    
    var moreBtn = $("more");
    if (moreBtn) moreBtn.hidden = true;
    
    var paginationDiv = $("pagination");
    if (paginationDiv) paginationDiv.style.display = 'none';
  }
  
  // ================================================================
  // EVENT BINDING
  // ================================================================
  setupUI();
  
  var btn = $("btn");
  if (btn) {
    btn.addEventListener("click", async function() {
      await ensureInit();
      runSearch(false);
    });
  }
  
  var moreBtn2 = $("more");
  if (moreBtn2) {
    moreBtn2.addEventListener("click", async function() {
      await ensureInit();
      runSearch(true);
    });
  }
  
  var qInput2 = $("q");
  if (qInput2) {
    qInput2.addEventListener("keydown", async function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        await ensureInit();
        runSearch(false);
      }
    });
  }
  
  var modeSelect2 = $("mode");
  if (modeSelect2) {
    modeSelect2.addEventListener("change", async function() {
      if (worker) {
        await ensureInit();
        runSearch(false);
      }
    });
  }

  // ================================================================
  // ★★★ PAGINATION CSS ★★★
  // ================================================================
  
  var style = document.createElement('style');
  style.textContent = `
    #pagination {
      display: none;
      justify-content: center;
      align-items: center;
      gap: 5px;
      margin: 20px 0;
      flex-wrap: wrap;
    }
    .page-btn {
      padding: 8px 14px;
      border: 1px solid #ddd;
      background: #fff;
      cursor: pointer;
      border-radius: 4px;
      font-size: 14px;
      transition: all 0.2s;
      min-width: 36px;
    }
    .page-btn:hover:not(:disabled) {
      background: #f0f0f0;
      border-color: #999;
    }
    .page-btn.active {
      background: #007bff;
      color: #fff;
      border-color: #007bff;
    }
    .page-btn.active:hover {
      background: #0056b3;
    }
    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .page-dots {
      padding: 8px 6px;
      color: #999;
    }
    #results {
      min-height: 100px;
    }
    .item {
      border-bottom: 1px solid #eee;
      padding: 10px 0;
    }
    .item:last-child {
      border-bottom: none;
    }
    .title {
      font-weight: bold;
      font-size: 16px;
    }
    .meta {
      color: #666;
      font-size: 12px;
    }
    .body {
      margin-top: 5px;
      font-size: 14px;
    }
  `;
  document.head.appendChild(style);
  
  // ================================================================
  // RECOMMENDED INDEXES
  // ================================================================
  /*
  CREATE UNIQUE INDEX idx_words_word ON words(word);
  CREATE INDEX idx_word_posts_word_post ON word_posts(word_id, post_id);
  CREATE INDEX idx_grams_gram_post ON grams(gram, post_id);
  CREATE INDEX idx_posts_rank ON posts(rank DESC, id);
  */
  
  // Expose for debugging
  window.__debug = {
    worker: function() { return worker; },
    currentOffset: function() { return currentOffset; },
    currentPage: function() { return currentPage; },
    totalResults: function() { return totalResults; },
    runSearch: runSearch,
    ensureInit: ensureInit,
    goToPage: goToPage,
    normalizeArabic: normalizeArabic,
    makeGrams: makeGrams
  };

})();