/* ==========================================================
   BITÁCORA CFC
   Archivo: /frontend/js/exam-logic.js
   Proyecto: Campus CFC Trading LITE
   Versión: V37.2 FULL — “Progreso Real & Flujo de Navegación”
   Fecha: 26-10-2025
   Modo: ⚙️ CFC-FULL-LOCK (Auditoría Real)
   ----------------------------------------------------------
   Funcionalidades implementadas en este archivo:
   5️⃣ Actualización automática del progreso (al aprobar examen)
   9️⃣ Feedback visual post-examen (modal verde/rojo)
   Integración con: motivationPlus.js y progress.js
   ----------------------------------------------------------
   Autor: CFC + ChatGPT (Asistente IA Campus)
   ========================================================== */


/* ==========================================================
   SECCIÓN BASE: SISTEMA DE EVALUACIÓN ORIGINAL
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const examForm = document.getElementById("examForm");
  const resultBox = document.getElementById("resultBox");

  if (!examForm) return;

  examForm.addEventListener("submit", e => {
    e.preventDefault();
    gradeExam();
  });

  /* --------------------------------------------------------
     SECCIÓN 1 — FUNCIÓN PRINCIPAL DE CALIFICACIÓN
     -------------------------------------------------------- */
  function gradeExam() {
    const answers = document.querySelectorAll("input[type='radio']:checked");
    let score = 0;

    answers.forEach(ans => {
      if (ans.value === "true") score++;
    });

    const total = document.querySelectorAll(".question").length;
    const percent = Math.round((score / total) * 100);

    // Guardar puntuación del módulo
    const moduleName = document.body.dataset.module || "modX";
    localStorage.setItem(`${moduleName}_score`, score);

    /* --------------------------------------------------------
       SECCIÓN 2 — MOSTRAR FEEDBACK VISUAL (MODAL)
       -------------------------------------------------------- */
    showModalResult(score, total, percent, moduleName);
  }

  /* --------------------------------------------------------
     SECCIÓN 3 — MOSTRAR MODAL VISUAL CON MOTIVACIÓN
     -------------------------------------------------------- */
  function showModalResult(score, total, percent, moduleName) {
    const modal = document.createElement("div");
    modal.id = "modalResult";
    modal.classList.add("modal-result");

    const aprobado = score >= Math.ceil(total * 0.6);
    const color = aprobado ? "#1fbf60" : "#bf1f1f";
    const estado = aprobado ? "APROBADO ✅" : "DESAPROBADO ❌";

    // Llamar motivación desde motivationPlus.js
    const frase = (typeof getMotivation === "function")
      ? getMotivation(aprobado)
      : (aprobado ? "¡Gran trabajo!" : "Seguí intentando, lo lograrás.");

    modal.innerHTML = `
      <div class="modal-content" style="background:${color}20;border:2px solid ${color};border-radius:12px;padding:25px;text-align:center;max-width:420px;margin:0 auto;">
        <h2 style="color:${color};font-weight:700;">${estado}</h2>
        <p>Resultado: ${score}/${total} — ${percent}%</p>
        <p class="motivation" style="margin-top:10px;">${frase}</p>
        <button id="closeModal" style="background:${color};color:#fff;border:none;border-radius:8px;padding:10px 22px;margin-top:15px;cursor:pointer;">Cerrar</button>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("closeModal").onclick = () => {
      modal.remove();
      if (aprobado) updateProgress(moduleName);
    };
  }

  /* --------------------------------------------------------
     SECCIÓN 4 — ACTUALIZAR PROGRESO GLOBAL
     -------------------------------------------------------- */
  function updateProgress(moduleName) {
    let progressData = JSON.parse(localStorage.getItem("progressData")) || {
      completed: [],
      lastModule: null
    };

    if (!progressData.completed.includes(moduleName)) {
      progressData.completed.push(moduleName);
    }

    // Desbloquear siguiente módulo
    const modNumber = parseInt(moduleName.replace("mod", ""), 10);
    const next = modNumber + 1;
    if (next <= 20) localStorage.setItem(`mod${next}_unlocked`, "true");

    // Actualizar último módulo
    progressData.lastModule = `/frontend/modules/mod${modNumber}/index.html`;
    localStorage.setItem("progressData", JSON.stringify(progressData));

    // Recalcular % y guardar
    let passed = progressData.completed.length;
    const pct = Math.round((passed / 20) * 100);
    localStorage.setItem("cfc_progress_pct", String(pct));

    // Actualizar barra de progreso si existe
    if (typeof updateGlobalProgressBar === "function") {
      updateGlobalProgressBar();
    }
  }

}); // FIN DOMContentLoaded


/* ==========================================================
   FIN DE ARCHIVO — /frontend/js/exam-logic.js
   Versión V37.2 FULL (Integridad garantizada)
   ========================================================== */
