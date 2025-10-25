/*
===============================================================
CFC Trading Campus LITE V37.2 — exam-logic.js
Extiende la lógica con feedback visual y motivación post-examen
===============================================================
*/

document.addEventListener("DOMContentLoaded", () => {
  const exams = document.querySelectorAll("form[id^='exam']");
  if (!exams.length) return;
  exams.forEach(form => form.addEventListener("submit", e => e.preventDefault()));
});

function gradeExam(moduleNumber) {
  const form = document.getElementById(`exam${moduleNumber}`);
  if (!form) {
    alert("No se encontró el formulario del examen.");
    return;
  }

  const correctAnswers = extractCorrectAnswers(form);
  let correctCount = 0;
  const feedback = [];

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

  showExamResults(moduleNumber, correctCount, feedback);
  saveExamResult(moduleNumber, correctCount);
}

// ===================== FUNCIONES AUXILIARES ===================== //
function extractCorrectAnswers(form) {
  const comments = [];
  const iterator = document.createNodeIterator(form, NodeFilter.SHOW_COMMENT);
  let currentNode;
  while ((currentNode = iterator.nextNode())) {
    const match = currentNode.nodeValue.match(/Correcta:\s*([A-D])/i);
    if (match) comments.push(match[1].toUpperCase());
  }
  return comments.length < 4 ? ["A", "B", "C", "D"] : comments;
}

// ===================== RESULTADOS VISUALES ===================== //
function showExamResults(moduleNumber, correctCount, feedback) {
  const total = 4;
  const aprobado = correctCount >= 3;
  const modal = document.getElementById("modalResult");

  if (modal) {
    modal.style.display = "flex";
    modal.innerHTML = `
      <div class="modal-content ${aprobado ? 'ok' : 'fail'}">
        <h2>${aprobado ? "✅ ¡Aprobado!" : "❌ No aprobado"}</h2>
        <p>Has respondido ${correctCount} de ${total} correctamente.</p>
        <p class="motivation">${getMotivation(aprobado)}</p>
        <button id="closeModal">Cerrar</button>
      </div>
    `;
    document.getElementById("closeModal").onclick = () => modal.style.display = "none";
  }
  if (aprobado) {
    localStorage.setItem(`mod${moduleNumber}_unlocked`, 'true');
  }
}

function saveExamResult(moduleNumber, correctCount) {
  const aprobado = correctCount >= 3;
  localStorage.setItem(`mod${moduleNumber}_score`, correctCount);
  const progressData = JSON.parse(localStorage.getItem('progressData')) || { completed: [], lastModule: null };
  if (aprobado && !progressData.completed.includes(`mod${moduleNumber}`)) {
    progressData.completed.push(`mod${moduleNumber}`);
  }
  progressData.lastModule = `/frontend/modules/${moduleNumber}/index.html`;
  localStorage.setItem('progressData', JSON.stringify(progressData));
  localStorage.setItem(`exam_result_module_${moduleNumber}`, JSON.stringify({
    correctas: correctCount,
    aprobado,
    fecha: new Date().toLocaleString()
  }));
  alert(aprobado ? "✅ Módulo completado con éxito" : "❌ No aprobaste. Reintentá.");
}
