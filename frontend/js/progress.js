/* ==========================================================
   BITÁCORA CFC
   Archivo: /frontend/js/progress.js
   Proyecto: Campus CFC Trading LITE
   Versión: V37.2 FULL — “Progreso Real & Flujo de Navegación”
   Fecha: 26-10-2025
   Modo: ⚙️ CFC FULL (sin omitir ninguna línea)
   ----------------------------------------------------------
   Funcionalidades implementadas en este archivo:
   5️⃣ Progreso persistente (localStorage)
   6️⃣ Barra de progreso global
   8️⃣ Bloqueo visual de módulos futuros
   ----------------------------------------------------------
   Autor: CFC + ChatGPT (Asistente IA de Campus)
   ========================================================== */


/* ==========================================================
   SECCIÓN BASE: Inicialización del sistema de progreso
   ========================================================== */

(function initLocksAndProgress() {

  // --------------------------------------------------------
  // 1️⃣ CREAR OBJETO GLOBAL DE PROGRESO (PERSISTENTE)
  // --------------------------------------------------------
  let progressData = JSON.parse(localStorage.getItem('progressData')) || {
    completed: [],
    lastModule: null
  };

  // Si es la primera vez que se abre el campus, desbloquear módulo 1
  if (!localStorage.getItem('mod1_unlocked')) {
    localStorage.setItem('mod1_unlocked', 'true');
  }

  // --------------------------------------------------------
  // 2️⃣ BLOQUEO VISUAL DE MÓDULOS FUTUROS
  // --------------------------------------------------------
  const allModules = document.querySelectorAll('[data-module]');
  allModules.forEach(link => {
    const mod = parseInt(link.getAttribute('data-module'), 10);
    const unlocked = localStorage.getItem(`mod${mod}_unlocked`) === 'true';

    if (!unlocked) {
      link.classList.add('locked');
      link.addEventListener('click', e => {
        e.preventDefault();
        alert('🔒 Este módulo está bloqueado. Aprobá el anterior para continuar.');
      });
    }
  });

  // --------------------------------------------------------
  // 3️⃣ CALCULAR PORCENTAJE DE PROGRESO REAL
  // --------------------------------------------------------
  let passed = 0;
  for (let m = 1; m <= 20; m++) {
    const sc = parseInt(localStorage.getItem(`mod${m}_score`) || '0', 10);
    if (sc >= 3) {
      passed++;
      if (!progressData.completed.includes(`mod${m}`)) {
        progressData.completed.push(`mod${m}`);
      }
    }
  }
  const pct = Math.round((passed / 20) * 100);
  localStorage.setItem('cfc_progress_pct', String(pct));

  // --------------------------------------------------------
  // 4️⃣ ACTUALIZAR BARRA VISUAL GLOBAL
  // --------------------------------------------------------
  const bar = document.getElementById('globalProgressFill');
  const txt = document.getElementById('globalProgressText');

  if (bar) bar.style.width = pct + '%';
  if (txt) txt.innerText = `Completado: ${pct}%`;

  // --------------------------------------------------------
  // 5️⃣ GUARDAR ÚLTIMO MÓDULO VISITADO
  // --------------------------------------------------------
  const currentPath = window.location.pathname;
  if (currentPath.includes('/modules/')) {
    progressData.lastModule = currentPath;
    localStorage.setItem('progressData', JSON.stringify(progressData));
  }

  // --------------------------------------------------------
  // 6️⃣ FUNCIONES DE CONSULTA GLOBAL
  // --------------------------------------------------------
  window.getProgressData = () =>
    JSON.parse(localStorage.getItem('progressData')) || progressData;

  window.getProgressPercent = () =>
    parseInt(localStorage.getItem('cfc_progress_pct') || '0', 10);

})();

/* ==========================================================
   FIN DE ARCHIVO — / frontend/js/progress.js
   Versión V37.2 FULL (Integridad garantizada)
   ========================================================== */
