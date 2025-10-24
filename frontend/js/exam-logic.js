/*
===============================================================
CFC Trading Campus LITE V37 FINAL — exam-logic.js
Autor: Cristian Fernando Choqui (CFC)
Función: Extiende la lógica de exámenes (exam.js) con corrección local,
feedback visual y control de aprobación mínima (3/4).
===============================================================
*/

/*
⚙️ FUNCIONALIDAD PRINCIPAL:
1. Detecta el formulario del examen actual.
2. Lee las respuestas seleccionadas.
3. Compara con las respuestas correctas definidas en los comentarios HTML.
4. Muestra el resultado y feedback visual por pregunta.
5. Informa si el alumno aprobó (3 o más correctas) o no.
6. Guarda el resultado en localStorage para referencia futura.
*/

// ===================== CONFIGURACIÓN BASE ===================== //
document.addEventListener("DOMContentLoaded", () => {
  const exams = document.querySelectorAll("form[id^='exam']");
  if (!exams.length) return;

  exams.forEach(form => {
    form.addEventListener("submit", e => e.preventDefault()); // Evita reload
  });
});

// ===================== FUNCIÓN PRINCIPAL ===================== //
function gradeExam(moduleNumber) {
  const form = document.getElementById(`exam${moduleNumber}`);
  if (!form) {
    alert("No se encontró el formulario del examen.");
    return;
  }

  // Buscar las respuestas correctas desde los comentarios del HTML
  const correctAnswers = extractCorrectAnswers(form);

  let correctCount = 0;
  const feedback = [];

  // Recorre todas las preguntas del formulario
  for (let i = 1; i <= 4; i++) {
    const question = form.querySelector(`input[name="q${i}"]:checked`);
    const answerFieldset = form.querySelector(`input[name="q${i}"]`)?.closest("fieldset");

    if (!question) {
      feedback.push(`❌ Pregunta ${i}: sin responder.`);
      if (answerFieldset) answerFieldset.style.border = "2px solid #ff6666";
      continue;
    }

    const userAnswer = question.value.trim().toUpperCase();
    const correctAnswer = correctAnswers[i - 1];

    if (userAnswer === correctAnswer) {
      correctCount++;
      feedback.push(`✅ Pregunta ${i}: correcta (${userAnswer}).`);
      if (answerFieldset) answerFieldset.style.border = "2px solid #66bb6a";
    } else {
      feedback.push(`❌ Pregunta ${i}: incorrecta. Respuesta correcta: ${correctAnswer}.`);
      if (answerFieldset) answerFieldset.style.border = "2px solid #ff6666";
    }
  }

  // Mostrar resultados
  showExamResults(moduleNumber, correctCount, feedback);
  saveExamResult(moduleNumber, correctCount);
}

// ===================== FUNCIÓN: EXTRAER RESPUESTAS CORRECTAS ===================== //
function extractCorrectAnswers(form) {
  const comments = [];
  const iterator = document.createNodeIterator(form, NodeFilter.SHOW_COMMENT);
  let currentNode;

  while ((currentNode = iterator.nextNode())) {
    const match = currentNode.nodeValue.match(/Correcta:\s*([A-D])/i);
    if (match) comments.push(match[1].toUpperCase());
  }

  // Si no se encuentran comentarios, definir por defecto (evita error)
  if (comments.length < 4) {
    console.warn("No se detectaron respuestas correctas en comentarios HTML.");
    return ["A", "B", "C", "D"];
  }

  return comments;
}

// ===================== FUNCIÓN: MOSTRAR RESULTADOS ===================== //
function showExamResults(moduleNumber, correctCount, feedback) {
  const total = 4;
  const aprobado = correctCount >= 3;
  const resultDivId = `examResult${moduleNumber}`;
  let resultDiv = document.getElementById(resultDivId);

  if (!resultDiv) {
    resultDiv = document.createElement("div");
    resultDiv.id = resultDivId;
    resultDiv.className = "exam-feedback";
    document.querySelector(`#exam${moduleNumber}`).appendChild(resultDiv);
  }

  // ✅ Mejora estética: línea separadora + estructura más limpia
  resultDiv.innerHTML = `
    <hr style="margin: 20px 0; border-color: #ccc;">
    <h3>Resultados del examen (Módulo ${moduleNumber})</h3>
    <p>Has respondido correctamente <b>${correctCount}</b> de ${total} preguntas.</p>
    <ul>${feedback.map(f => `<li>${f}</li>`).join("")}</ul>
    <p style="font-weight:bold; color:${aprobado ? "#2ecc71" : "#e74c3c"};">
      ${aprobado ? "✅ Aprobado — ¡Excelente trabajo!" : "❌ No aprobaste este módulo. Revisá el contenido antes de continuar."}
    </p>
  `;
}

// ===================== FUNCIÓN: GUARDAR RESULTADOS EN LOCALSTORAGE ===================== //
function saveExamResult(moduleNumber, correctCount) {
  const aprobado = correctCount >= 3;
  const key = `exam_result_module_${moduleNumber}`;

  localStorage.setItem(key, JSON.stringify({
    correctas: correctCount,
    fecha: new Date().toLocaleString(),
    aprobado: aprobado
  }));
}

// ===================== FUNCIÓN OPCIONAL: VERIFICAR PROGRESO ===================== //
function getExamProgress() {
  const results = [];
  for (let i = 1; i <= 20; i++) {
    const data = localStorage.getItem(`exam_result_module_${i}`);
    if (data) {
      results.push(JSON.parse(data));
    }
  }
  return results;
}

/*
===============================================================
✅ Instrucciones de integración:
1. Copiar este archivo en: /frontend/js/exam-logic.js
2. Agregar al final de cada exam.html:
   <script src="/frontend/js/exam-logic.js" defer></script>
3. No eliminar ni modificar exam.js (mantiene compatibilidad general).
4. Probar en Cloudflare Pages y verificar feedback visual y mensajes.
===============================================================
*/
