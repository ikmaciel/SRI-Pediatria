const assert = require("node:assert/strict");
const fs = require("node:fs");

const source = fs.readFileSync("sw.js", "utf8");
assert.match(source, /const CACHE_PREFIX = "sri-pediatrica-fro-"/);
assert.match(source, /key\.startsWith\(CACHE_PREFIX\)/);
assert.match(source, /event\.request\.mode === "navigate"/);
assert.match(source, /url\.searchParams\.has\("__health"\)/);
assert.match(source, /response\.ok && response\.type === "basic"/);
assert.doesNotMatch(source, /cached \|\| caches\.match\("\.\/index\.html"\)/);
assert.match(source, /VALIDACAO_E_GOVERNANCA\.md/);
assert.match(source, /CHANGELOG_CLINICO\.md/);
console.log("Service worker: cache isolado, health check e fallbacks por tipo verificados.");
