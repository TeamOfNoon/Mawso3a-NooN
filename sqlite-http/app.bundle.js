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
  
  // ★★★ CONFIGURATION ★★★
  var PAGE_SIZE = 10;
  
  // State
  var worker = null;
  var currentOffset = 0;
  var lastId = 0;
  var lastQuery = "";
  var lastMode = "exact";
  var loading = false;
  var initPromise = null;
  var useKeysetPagination = true;
  
  // DOM Helpers
  var $ = (id) => document.getElementById(id);
  var abs = (path) => new URL(path, window.location.href).href;
  var DB_URL = abs("db/search.db");
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
  // ★★★ QUERIES FOR NEW 3-TABLE SCHEMA ★★★
  // Schema: words(word_id, word) → word_posts(word_id, post_id) → posts(id, title, body, url, rank)
  // ================================================================
  
  function buildSearchSql(mode, q) {
    // Exact match - uses words → word_posts → posts
    if (mode === "exact") {
      if (useKeysetPagination) {
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
              LIMIT ?
            )
            ORDER BY p.rank DESC, p.id ASC
          `,
          params: [q, PAGE_SIZE]
        };
      } else {
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
          params: [q, PAGE_SIZE, currentOffset]
        };
      }
    }
    
    // Prefix match - uses words → word_posts → posts
    if (mode === "prefix") {
      if (useKeysetPagination) {
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
              LIMIT ?
            )
            ORDER BY p.rank DESC, p.id ASC
          `,
          params: [q, q + "\uFFFF", PAGE_SIZE]
        };
      } else {
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
          params: [q, q + "\uFFFF", PAGE_SIZE, currentOffset]
        };
      }
    }
    
    // ★★★ FUZZY / GRAM SEARCH - uses grams table ★★★
    const grams = makeGrams(q, 3);
    const placeholders = grams.map(() => "?").join(",");
    
    if (useKeysetPagination) {
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
            LIMIT ?
          )
          ORDER BY p.rank DESC, p.id ASC
        `,
        params: [...grams, grams.length, PAGE_SIZE]
      };
    } else {
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
        params: [...grams, grams.length, PAGE_SIZE, currentOffset]
      };
    }
  }
  
  // ================================================================
  // DATABASE INITIALIZATION - LAZY LOAD
  // ================================================================
  async function init() {
    $("paths").textContent = `DB: ${DB_URL}
Worker: ${WORKER_URL}
WASM: ${WASM_URL}`;

    worker = await (0, import_dist.createDbWorker)([
      {
        from: "inline",
        config: {
          serverMode: "range",
          requestChunkSize: 4096,
          url: DB_URL
        }
      }
    ], WORKER_URL, WASM_URL, 64 * 1024 * 1024);

    $("status").textContent = `✅ Ready. On-demand HTTP streaming enabled. Search to load data.`;
  }
  
  function ensureInit() {
    if (worker) return Promise.resolve();
    if (!initPromise) {
      initPromise = init();
    }
    return initPromise;
  }
  
  function renderRows(rows, append) {
    const html = rows.map((r) => `
    <div class="item">
      <div class="title">${escapeHtml(r.title)}</div>
      <div class="meta">ID ${escapeHtml(r.id)} — ${escapeHtml(r.url)}</div>
      <div class="body">${escapeHtml(r.body)}</div>
    </div>`).join("");
    if (append) $("results").insertAdjacentHTML("beforeend", html);
    else $("results").innerHTML = html || "<p>No results.</p>";
  }
  
  // ================================================================
  // SEARCH EXECUTION
  // ================================================================
  async function runSearch(append = false) {
    if (!worker || loading) return;
    loading = true;
    
    const raw = $("q").value.trim();
    const q = normalizeArabic(raw);
    const mode = $("mode").value;
    
    if (!q) {
      $("results").innerHTML = "";
      $("status").textContent = "Type search text.";
      $("more").hidden = true;
      loading = false;
      return;
    }
    
    if (!append || q !== lastQuery || mode !== lastMode) {
      currentOffset = 0;
      lastId = 0;
      $("results").innerHTML = "";
    }
    
    lastQuery = q;
    lastMode = mode;
    
    const t0 = performance.now();
    
    try {
      const { sql, params } = buildSearchSql(mode, q);
      const res = await worker.db.exec(sql, params);
      const rows = rowsFromResult(res);
      
      if (rows.length > 0) {
        lastId = rows[rows.length - 1].id;
      }
      
      renderRows(rows, append);
      currentOffset += rows.length;
      $("more").hidden = rows.length < PAGE_SIZE;
      
      let bytes = null;
      try {
        bytes = await worker.worker.bytesRead;
      } catch (_) {}
      
      const ms = Math.round(performance.now() - t0);
      const sizeStr = bytes ? ` | 📊 ${(bytes / 1024 / 1024).toFixed(2)} MB loaded` : "";
      const pageType = useKeysetPagination ? "keyset" : "offset";
      $("status").textContent = `${mode} search: ${rows.length} result(s) in ${ms} ms. ${pageType} pagination. Offset=${currentOffset}${sizeStr}`;
      
    } catch (err) {
      console.error(err);
      $("status").textContent = "Search error: " + err.message;
    } finally {
      loading = false;
    }
  }
  
  // ================================================================
  // UI SETUP - NOTHING LOADS ON PAGE LOAD
  // ================================================================
  function setupUI() {
    $("paths").textContent = `
      DB: ${DB_URL}
      Worker: ${WORKER_URL}
      WASM: ${WASM_URL}
    `;
    $("status").textContent = "🔍 Ready. Type a search and press Enter or click Search. (On-demand HTTP streaming)";
    $("more").hidden = true;
  }
  
  // ================================================================
  // EVENT BINDING WITH LAZY INIT
  // ================================================================
  setupUI();
  
  $("btn").addEventListener("click", async () => {
    await ensureInit();
    runSearch(false);
  });
  
  $("more").addEventListener("click", async () => {
    await ensureInit();
    runSearch(true);
  });
  
  $("q").addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await ensureInit();
      runSearch(false);
    }
  });
  
  $("mode").addEventListener("change", async () => {
    if (worker) {
      await ensureInit();
      runSearch(false);
    }
  });

  // ================================================================
  // ★★★ RECOMMENDED INDEXES FOR NEW 3-TABLE SCHEMA ★★★
  // ================================================================
  /*
  
  -- Unique index on words for fast lookup
  CREATE UNIQUE INDEX idx_words_word ON words(word);
  
  -- Indexes for word_posts junction table
  CREATE INDEX idx_word_posts_word ON word_posts(word_id);
  CREATE INDEX idx_word_posts_post ON word_posts(post_id);
  CREATE INDEX idx_word_posts_word_post ON word_posts(word_id, post_id);
  
  -- Index for grams table
  CREATE INDEX idx_grams_gram_post ON grams(gram, post_id);
  
  -- Index for posts sorting
  CREATE INDEX idx_posts_rank ON posts(rank DESC, id);
  
  -- Composite index for faster JOIN performance
  CREATE INDEX idx_posts_id_rank ON posts(id, rank DESC);
  
  */
  
  // Expose for debugging
  window.__debug = {
    worker: () => worker,
    currentOffset: () => currentOffset,
    lastId: () => lastId,
    useKeysetPagination: () => useKeysetPagination,
    runSearch,
    ensureInit,
    normalizeArabic,
    makeGrams
  };

})();