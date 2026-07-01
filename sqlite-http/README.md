# SQLite HTTP Range Streaming Search - Local Project

This project uses `sql.js-httpvfs` with local files only:

- `dist/sqlite.worker.js`
- `dist/sql-wasm.wasm`
- `db/search.db`
- `app.bundle.js`

No CDN is used at runtime.

## Run on Windows

Double click:

```bat
server\start.bat
```

Open:

```text
http://localhost:8080
```

## Run on Linux/Mac

```bash
./server/start.sh
```

## Search modes

- **Exact word**: uses indexed `words.word = ?`
- **Prefix**: uses indexed range `words.word >= ? AND words.word < ? || \uFFFF`
- **Partial**: uses indexed `grams.gram = ?`

## Streaming

The streaming is done by `sql.js-httpvfs` inside:

```text
dist/sqlite.worker.js
```

The app opens the DB with:

```js
createDbWorker([{ config: { serverMode: "full", requestChunkSize: 4096, url: DB_URL } }], WORKER_URL, WASM_URL)
```

Open DevTools > Network and search. You should see Range requests for `db/search.db`.
