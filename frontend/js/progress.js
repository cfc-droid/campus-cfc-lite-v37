/**
 * Progress & Lock CFC LITE v37.2
 * BITÁCORA CFC — Subpunto 2/7 “Progreso real y flujo de navegación”
 * Fecha: 26-10-2025
 * Modo: Reescritura completa con persistencia + barra + control + lastModule
 */

(function initLocksAndProgress(){
  // ========================================
  // 1️⃣ INICIALIZAR OBJETO GLOBAL DE PROGRESO
  // ========================================
  let progressData = JSON.parse(localStorage.getItem('progressData')) || {
    completed: [],
    lastModule: null
  };

  // ========================================
  // 2️⃣ ASEGURAR MÓDULO 1 DESBLOQUEADO
  // ========================================
  if (!localStorage.getItem('mod1_unlocked')) {
    localStorage.setItem('mod1_unlocked', 'true');
  }

  // ========================================
  // 3️⃣ BLOQUEAR VISUALMENTE MÓDULOS FUTUROS
  // ========================================
  document.querySelectorAll('[data-module]').forEach(a => {
    const mod = parseInt(a.getAttribute('data-module'), 10);
    const unlocked = localStorage.getItem(`mod${mod}_unlocked`) === 'true';

    if (!unlocked) {
      a.classList.add('locked');
      a.addEventListener('click', (e) => {
        e.preventDefault();
        alert('🔒 Este módulo está bloqueado. Aprobá el anterior para continuar.');
      });
    }
  });

  // ========================================
  // 4️⃣ ACTUALIZAR PORCENTAJE DE PROGRESO REAL
  // ========================================
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

  // ========================================
  // 5️⃣ ACTUALIZAR BARRA VISUAL GLOBAL
  // ========================================
  const bar = document.getElementById('globalProgressFill');
  const txt = document.getElementById('globalProgressText');

  if (bar) bar.style.width = pct + '%';
  if (txt) txt.innerText = `Completado: ${pct}%`;

  // ========================================
  // 6️⃣ GUARDAR ÚLTIMO MÓDULO VISITADO
  // ========================================
  const currentPath = window.location.pathname;
  if (currentPath.includes('/modules/')) {
    progressData.lastModule = currentPath;
    localStorage.setItem('progressData', JSON.stringify(progressData));
  }

  // ========================================
  // 7️⃣ EXPONER FUNCIÓN GLOBAL DE CONSULTA
  // ========================================
  window.getProgressData = () => JSON.parse(localStorage.getItem('progressData')) || progressData;
  window.getProgressPercent = () => parseInt(localStorage.getItem('cfc_progress_pct') || '0', 10);

})();
