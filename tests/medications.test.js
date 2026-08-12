const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const html = fs.readFileSync("index.html", "utf8");
const medicationsStart = html.indexOf("const MEDICATIONS = [");
const medicationsEnd = html.indexOf("const PREPARATION_SETTINGS_KEY", medicationsStart);
const functionsStart = html.indexOf("function roundClinical(");
const functionsEnd = html.indexOf("function doseDescription(", functionsStart);
assert.ok(medicationsStart >= 0 && medicationsEnd > medicationsStart, "Catálogo de medicamentos não encontrado");
assert.ok(functionsStart >= 0 && functionsEnd > functionsStart, "Motor de cálculo não encontrado");

const context = {};
vm.createContext(context);
vm.runInContext(
  `${html.slice(medicationsStart, medicationsEnd)}\n${html.slice(functionsStart, functionsEnd)}\nthis.MEDICATIONS = MEDICATIONS; this.calculateMedication = calculateMedication;`,
  context
);

const medications = Array.from(context.MEDICATIONS);
assert.equal(medications.length, 25, "O catálogo clínico mudou; revise e atualize os testes conscientemente");
assert.equal(new Set(medications.map(med => med.id)).size, medications.length, "IDs de medicamentos devem ser únicos");

for (const med of medications) {
  assert.ok(med.id && med.name && med.route && med.stage, `Metadados incompletos em ${med.id || "medicamento sem ID"}`);
  assert.ok(Array.isArray(med.categories) && med.categories.length, `Categoria ausente em ${med.id}`);
  assert.ok(Number.isFinite(med.doseMin) && Number.isFinite(med.doseMax), `Dose inválida em ${med.id}`);
  assert.ok(med.doseMin > 0 && med.doseMax >= med.doseMin, `Faixa de dose inválida em ${med.id}`);
  assert.ok(Number.isFinite(med.concentration) && med.concentration > 0, `Concentração inválida em ${med.id}`);
}

function med(id) {
  const result = medications.find(item => item.id === id);
  assert.ok(result, `Medicamento ${id} não encontrado`);
  return result;
}

function approximately(actual, expected, tolerance = 1e-12) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `Esperado ${expected}, obtido ${actual}`);
}

let result = context.calculateMedication(med("fentanil"), 10);
approximately(result.totalMin, 10);
approximately(result.totalMax, 20);
approximately(result.stockMin, 0.2);
approximately(result.stockMax, 0.4);

result = context.calculateMedication(med("adrenalina-pcr"), 10);
approximately(result.totalMin, 0.1);
approximately(result.stockMin, 0.1);
approximately(result.diluentMin, 0.9);
approximately(result.preparedMin, 1);

result = context.calculateMedication(med("glicose"), 10);
approximately(result.totalMin, 2);
approximately(result.stockMin, 4);
approximately(result.diluentMin, 16);
approximately(result.preparedMin, 20);

result = context.calculateMedication(med("atropina"), 1);
approximately(result.totalMin, 0.1);
approximately(result.stockMin, 0.4);
result = context.calculateMedication(med("atropina"), 100);
approximately(result.totalMin, 0.5);
approximately(result.stockMin, 2);

result = context.calculateMedication(med("adrenalina-anafilaxia"), 100);
approximately(result.totalMin, 0.5);
approximately(result.stockMin, 0.5);

result = context.calculateMedication(med("calcio"), 100);
approximately(result.stockMin, 20);
approximately(result.stockMax, 20);

for (const weight of [0.5, 1, 3, 10, 25, 50, 100, 200]) {
  for (const medication of medications) {
    const calculation = context.calculateMedication(medication, weight);
    assert.ok(calculation, `Sem cálculo para ${medication.id} em ${weight} kg`);
    for (const [field, value] of Object.entries(calculation)) {
      if (value === null) continue;
      assert.ok(Number.isFinite(value) && value >= 0, `${medication.id}/${weight} kg: ${field} inválido`);
    }
    assert.ok(calculation.totalMin <= calculation.totalMax, `${medication.id}/${weight} kg: dose mínima maior que máxima`);
    assert.ok(calculation.stockMin <= calculation.stockMax, `${medication.id}/${weight} kg: volume mínimo maior que máximo`);
  }
}

assert.equal(context.calculateMedication(med("fentanil"), 0), null);
assert.equal(context.calculateMedication(med("fentanil"), NaN), null);

assert.match(html, /function calculationGateMessage\(\)/);
assert.match(html, /Informe a idade para liberar os cálculos/);
assert.match(html, /Catálogo neonatal não homologado/);
assert.match(html, /stockMax < 0\.1/);
assert.match(html, /Microvolume abaixo de 0,1 mL/);
assert.match(html, /const LOCAL_PREPARATION_EDITING_ENABLED = false/);
assert.match(html, /sessionStorage\.setItem\(HISTORY_STORAGE_KEY/);
assert.doesNotMatch(html, /localStorage\.setItem\(HISTORY_STORAGE_KEY/);
assert.equal((html.match(/data-checklist/g) || []).length, 10, "Esperados 9 campos e um seletor de consulta do checklist");
assert.match(html, /data-med-plan="\$\{med\.id\}"/);
assert.match(html, /prescribedDoses: new Map\(\)/);
assert.match(html, /Dose exata prescrita pendente/);
assert.match(html, /planned\.has\("lidocaina-sri"\)/);
assert.match(html, /planned\.has\("lidocaina-arritmia"\)/);

console.log("Catálogo farmacológico: 25 medicamentos, cálculos, limites e barreiras estruturais verificados.");
