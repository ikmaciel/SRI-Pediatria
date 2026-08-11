const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const html = fs.readFileSync("index.html", "utf8");
const start = html.indexOf("function median(");
const end = html.indexOf("async function acquireWakeLock", start);
assert.ok(start >= 0 && end > start, "Funções de análise respiratória não encontradas");

const context = { RESPIRATION_DURATION_MS: 60000 };
vm.createContext(context);
vm.runInContext(html.slice(start, end), context);

function syntheticBreathing(bpm, noise = 0.004, durationMs = 60000) {
  const samples = [];
  let seed = 123456;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296 - 0.5;
  };
  for (let time = 0; time <= durationMs; time += 20) {
    const phase = 2 * Math.PI * (bpm / 60) * (time / 1000);
    const breath = 0.07 * Math.sin(phase) + 0.018 * Math.sin(2 * phase);
    const jitter = noise * random();
    const x = 0.01 * Math.sin(phase + 0.5) + jitter;
    const y = 0.015 * Math.sin(phase - 0.3) + jitter * 0.7;
    const z = 9.81 + breath + jitter;
    samples.push({ time, t: time, x, y, z, magnitude: Math.hypot(x, y, z) });
  }
  return samples;
}

for (const expected of [18, 24, 36, 48, 72]) {
  const result = context.analyzeRespirationSignal(syntheticBreathing(expected));
  assert.ok(result, `Sem resultado para ${expected} irpm`);
  assert.ok(Math.abs(result.bpm - expected) <= 2, `Esperado ${expected}, obtido ${result.bpm}`);
  assert.ok(result.quality >= 0.5, `Qualidade inesperadamente baixa para ${expected} irpm`);
}

const tooShort = context.analyzeRespirationSignal(syntheticBreathing(30, 0.004, 10000));
assert.equal(tooShort, null, "Uma coleta de 10 segundos deveria ser rejeitada");

const randomMotion = [];
let randomSeed = 98765;
for (let time = 0; time <= 60000; time += 20) {
  randomSeed = (randomSeed * 1664525 + 1013904223) >>> 0;
  const x = (randomSeed / 4294967296 - 0.5) * 0.8;
  randomSeed = (randomSeed * 1664525 + 1013904223) >>> 0;
  const y = (randomSeed / 4294967296 - 0.5) * 0.8;
  randomSeed = (randomSeed * 1664525 + 1013904223) >>> 0;
  const z = 9.81 + (randomSeed / 4294967296 - 0.5) * 0.8;
  randomMotion.push({ t: time, x, y, z, magnitude: Math.hypot(x, y, z) });
}
const noiseResult = context.analyzeRespirationSignal(randomMotion);
assert.ok(!noiseResult || noiseResult.quality < 0.2, "Movimento aleatório não deveria produzir leitura aceitável");

console.log("Análise respiratória: sinais de 18–72 irpm reconhecidos; coleta curta e movimento aleatório rejeitados.");
