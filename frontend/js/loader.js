/* ==========================================
   ✅ BITÁCORA CFC
   Funcionalidad: Loader Premium CFC
   Subpaso: 1.3 — HTML + JS + CSS + Preload
   Tipo: Extensión parcial
   Fecha: 25-10-2025
   ========================================== */

// ===================================
// LOADER CFC — DESAPARICIÓN AUTOMÁTICA
// ===================================

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const hero = document.getElementById("inicio");

  // Ocultar loader después de 3 segundos
  setTimeout(() => {
    if (loader) {
      loader.style.transition = "opacity 0.8s ease-in-out";
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
        if (hero) hero.classList.add("fade-in-hero");
      }, 800);
    }
  }, 3000);
});

// ✅ CFC_FUNC_15_SUBPASO_1.3 — Frases + botón + fadeOut extra (25-10-2025)
const frases = [
  "El control emocional es tu mejor estrategia 🎯",
  "Respirá, analizá y ejecutá 🧠",
  "Perder una operación no es perder el camino 💡",
  "La paciencia paga más que la euforia 💎",
  "El trader disciplinado vence al impulsivo ⚖️",
  "Tu mente calma es tu mejor ventaja 🌙",
  "La constancia supera al talento cuando el talento no es constante 🔁",
  "El control es la verdadera libertad 🧩",
  "El mercado recompensa la paciencia, no la ansiedad ⏳",
  "Menos es más: elegí calidad sobre cantidad 🎯",
  "Tu progreso es acumulativo, no inmediato 🧱",
  "Ganás cuando mantenés la calma en el caos 🌊",
  "Cada jornada es un entrenamiento mental 💪",
  "Tu límite es tu emoción, no el mercado 🧠",
  "El éxito se construye paso a paso 🧩",
  "Controlá lo controlable: tu reacción 💬",
  "El que domina su mente, domina el mercado 🌀",
  "Tu fortaleza es volver con más foco 🔁",
  "En trading, menos ruido, más propósito 🔇",
  "No necesitás más indicadores, necesitás más calma 💭",
  "Respirá: el mercado no se va a ningún lado 🌍",
  "Tu proceso es más importante que tu resultado 📊"
];

document.addEventListener("DOMContentLoaded", () => {
  const quote = document.getElementById("quote");
  if (quote) quote.textContent = frases[Math.floor(Math.random() * frases.length)];

  const enterBtn = document.getElementById("enterBtn");
  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      const loader = document.getElementById("loader");
      if (loader) loader.style.display = "none";
      window.location.href = "modules/index.html";
    });
  }
});
