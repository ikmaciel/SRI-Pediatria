const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const html = fs.readFileSync("index.html", "utf8");
assert.doesNotMatch(html, /syncBreathingPhase|Sincronizar durante inspiração|Inspiração provável|Expiração provável/);
assert.match(html, /Amplitude relativa do sensor; não identifica inspiração, expiração ou ventilação\./);
assert.match(html, /id="respirationSessionDialog"/);
assert.match(html, /id="chooseManualRespiration"/);
assert.match(html, /id="chooseAutomaticRespiration"/);
assert.match(html, /data-mode="automatic"\] \.vitals-entry \{ display: none; \}/);
assert.match(html, /Salvar paciente para acompanhamento/);
assert.match(html, /id="movementAmplitudeBar"/);
assert.match(html, /id="sensorCycleCount"/);
assert.match(html, /FR provisória \(irpm\)/);
assert.match(html, /min-height: min\(52dvh, 480px\)/);
assert.doesNotMatch(html, /id="useRespiratoryAudio"|useRespiratoryAudio\.checked/);
assert.match(html, /data-mode="automatic"\] \.sensor-warning \{ order: 2/);
assert.match(html, /Nova versão disponível — atualizar agora/);
assert.match(html, /id="respirationTimelineChart"/);
assert.match(html, /function buildRespiratoryRateTimeline\(/);
assert.match(html, /Gráfico temporal da frequência respiratória estimada/);
assert.match(html, /respirationResultEvents\.hidden = mode === "automatic"/);
assert.match(html, /const allNoises = technical\.abrupt\?\.audio/);
assert.match(html, /Tosses candidatas/);
assert.match(html, /const coughs = technical\.abrupt\?\.combined/);
assert.match(html, /function assessRespiratoryAudioEnvironment\(/);
assert.match(html, /const useAudio = audioWasAvailable && audioEnvironment\.usable/);
assert.match(html, /function playMeasurementCompleteTone\(\)/);
const start = html.indexOf("function median(");
const end = html.indexOf("async function acquireWakeLock", start);
assert.ok(start >= 0 && end > start, "Funções de análise respiratória não encontradas");

const context = { RESPIRATION_DURATION_MS: 60000, TECHNICAL_PAUSE_NOTICE_MS: 10000 };
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

function syntheticAudio(bpm, amplitude = 0.012, noise = 0.0008, durationMs = 60000) {
  const samples = [];
  let seed = 654321;
  const random = () => {
    seed = (seed * 1103515245 + 12345) >>> 0;
    return seed / 4294967296 - 0.5;
  };
  for (let time = 0; time <= durationMs; time += 50) {
    const phase = 2 * Math.PI * (bpm / 60) * (time / 1000);
    const rms = Math.max(0, 0.004 + amplitude * (0.5 + 0.5 * Math.sin(phase)) + noise * random());
    samples.push({ t: time, rms, peak: Math.min(0.9, rms * 4) });
  }
  return samples;
}

function syntheticSnoreAudio(bpm, durationMs = 60000) {
  const samples = [];
  const cycleMs = 60000 / bpm;
  for (let time = 0; time <= durationMs; time += 50) {
    const withinCycle = time % cycleMs;
    const active = withinCycle >= 250 && withinCycle <= 700;
    samples.push({
      t: time,
      rms: active ? 0.035 : 0.003,
      peak: active ? 0.2 : 0.012,
      lowBand: active ? 0.82 : 0.08,
      midBand: active ? 0.13 : 0.27,
      highBand: active ? 0.05 : 0.65
    });
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

const aboveSensorRange = context.analyzeRespirationSignal(syntheticBreathing(100));
assert.equal(aboveSensorRange, null, "O limite de busca de 100 irpm não pode aparecer como resultado automático");

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

const motion24 = context.analyzeRespirationSignal(syntheticBreathing(24));
const audio24 = context.analyzeAudioRespiration(syntheticAudio(24), motion24);
assert.equal(audio24.confirmed, true, "Áudio periódico concordante deveria confirmar o movimento");
assert.ok(Math.abs(audio24.fusedBpm - 24) <= 2, `Fusão esperada próxima de 24, obtida ${audio24.fusedBpm}`);

const noisyAudio = Array.from({ length: 1200 }, (_, index) => ({
  t: index * 50,
  rms: 0.06 + (index % 3) * 0.001,
  peak: index % 5 === 0 ? 0.99 : 0.8,
  lowBand: 1,
  midBand: 1,
  highBand: 1
}));
const noisyEnvironment = context.assessRespiratoryAudioEnvironment(noisyAudio);
assert.equal(noisyEnvironment.usable, false, "Ambiente muito ruidoso não deve fornecer áudio utilizável");
assert.equal(noisyEnvironment.state, "noisy", "Ruído alto deve ser identificado como ambiente ruidoso");
assert.equal(context.analyzeAudioRespiration(noisyAudio, motion24, noisyEnvironment).confirmed, false, "Áudio ruidoso não deve confirmar o movimento");

const discordantAudio = context.analyzeAudioRespiration(syntheticAudio(35), motion24);
assert.equal(discordantAudio.confirmed, false, "Áudio discordante não deveria alterar o movimento");

const lowAudio = context.analyzeAudioRespiration(syntheticAudio(24, 0.00005, 0.00001), motion24);
assert.equal(lowAudio.confirmed, false, "Som muito baixo não deveria confirmar o movimento");
assert.match(lowAudio.reason, /baixo/i);

const ageReferences = [
  [0, 25, 60],
  [5.9, 25, 60],
  [6, 20, 55],
  [12, 20, 45],
  [24, 20, 40],
  [48, 17, 30],
  [72, 16, 30],
  [120, 15, 25],
  [168, 14, 25],
  [216, 14, 25]
];
for (const [months, min, max] of ageReferences) {
  const reference = context.respiratoryReferenceForAge(months);
  assert.deepEqual([reference.min, reference.max], [min, max], `Faixa incorreta para ${months} meses`);
  assert.equal(context.assessRespiratoryRate(min, months).classification, "within");
  assert.equal(context.assessRespiratoryRate(max, months).classification, "within");
  assert.equal(context.assessRespiratoryRate(min - 1, months).classification, "below");
  assert.equal(context.assessRespiratoryRate(max + 1, months).classification, "above");
}
assert.equal(context.respiratoryReferenceForAge(-1), null);
assert.equal(context.respiratoryReferenceForAge(217), null);

const liveMotion = context.analyzeRealtimeMotion(syntheticBreathing(30).slice(-300));
assert.ok(liveMotion, "A animação deveria encontrar movimento respiratório recente");
assert.ok(Number.isFinite(liveMotion.normalized) && Number.isFinite(liveMotion.trend));
const smoothEvents = context.analyzeAbruptRespiratoryEvents(syntheticAudio(24), syntheticBreathing(24));
assert.equal(smoothEvents.combined.length, 0, "Respiração sintética regular não deveria virar evento abrupto combinado");
assert.equal(context.detectMotionSignalPauses(syntheticBreathing(24), "z").count, 0, "Respiração regular não deveria gerar pausa técnica");

const abruptAudioSamples = syntheticAudio(24);
const abruptMotionSamples = syntheticBreathing(24);
for (const sample of abruptAudioSamples) {
  if (sample.t >= 10000 && sample.t <= 10100) {
    sample.rms = 0.22;
    sample.peak = 0.85;
  }
}
for (const sample of abruptMotionSamples) {
  if (sample.t === 10000) {
    sample.x += 1.5;
    sample.y += 1.2;
    sample.z += 1.8;
  }
}
const abruptEvents = context.analyzeAbruptRespiratoryEvents(abruptAudioSamples, abruptMotionSamples);
assert.equal(abruptEvents.combined.length, 1, "Pico simultâneo de som e movimento deveria gerar um candidato abrupto");

const pausedMotion = syntheticBreathing(24);
for (const sample of pausedMotion) {
  if (sample.t >= 20000 && sample.t <= 34000) {
    sample.x = 0;
    sample.y = 0;
    sample.z = 9.81;
    sample.magnitude = 9.81;
  }
}
const technicalPauses = context.detectMotionSignalPauses(pausedMotion, "z");
assert.ok(technicalPauses.count >= 1, "Pausa sintética prolongada deveria ser marcada como pausa técnica");
assert.ok(technicalPauses.longestSec >= 10);

const possibleSnore = context.analyzeSnorePattern(syntheticSnoreAudio(24), { bpm: 24 });
assert.equal(possibleSnore.possible, true, "Padrão acústico repetitivo de baixa frequência deveria gerar observação de possível ronco");
assert.ok(possibleSnore.burstTimes.length >= 3, "Os episódios candidatos de ronco devem manter sua posição temporal");
const nonSnoreAudio = syntheticSnoreAudio(24).map(sample => ({ ...sample, lowBand: 0.08, midBand: 0.27, highBand: 0.65 }));
assert.equal(context.analyzeSnorePattern(nonSnoreAudio, { bpm: 24 }).possible, false, "Som sem predominância de baixa frequência não deveria sugerir ronco");

const timeline24 = context.buildRespiratoryRateTimeline(syntheticBreathing(24));
assert.ok(timeline24.length >= 5, "O gráfico deveria conter vários pontos temporais");
assert.ok(timeline24.every(point => Math.abs(point.bpm - 24) <= 3), "A linha temporal deveria acompanhar a frequência sintética");

const manifest = JSON.parse(fs.readFileSync("manifest.webmanifest", "utf8"));
assert.equal(manifest.display, "standalone");
assert.equal(manifest.start_url, "./");
assert.ok(manifest.icons.some(icon => icon.sizes.includes("192x192")));
assert.ok(manifest.icons.some(icon => icon.sizes.includes("512x512")));

console.log("Análise respiratória: frequência, áudio, ronco, faixa etária, animação, eventos, pausas e manifesto PWA verificados.");
