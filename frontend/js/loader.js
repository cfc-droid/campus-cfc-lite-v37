// ===================================
// LOADER CFC — DESAPARICIÓN AUTOMÁTICA
// ===================================

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const progressBar = document.getElementById("progress");
  const hero = document.getElementById("inicio");

  let progress = 0;
  const interval = setInterval(() => {
    if (progress < 100) {
      progress += 5;
      if (progressBar) progressBar.style.width = progress + "%";
    } else {
      clearInterval(interval);
    }
  }, 100);

  // Ocultar loader después de 2.5 segundos
  setTimeout(() => {
    if (loader) {
      loader.style.transition = "opacity 0.8s ease";
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
        if (hero) hero.classList.add("fade-in-hero");
      }, 800);
    }
  }, 2500);
});

// ✅ CFC_FUNC_15_SUBPASO_1.3 — Frases + botón + fadeOut extra (24-10-2025)
const frases = [
  "El control emocional es tu mejor estrategia 🎯",
  "Respirá, analizá y ejecutá 🧠",
  "Perder una operación no es perder el camino 💡",
  "La paciencia paga más que la euforia 💎",
  "El trader disciplinado vence al impulsivo ⚖️",
  "Cada error es una lección más 📘",
  "Tu mente calma es tu mejor ventaja 🌙",
  "No se trata de ganar siempre, sino de no perderte a vos mismo 💭",
  "La constancia supera al talento cuando el talento no es constante 🔁",
  "El control es la verdadera libertad 🧩",
  "El mercado recompensa la paciencia, no la ansiedad ⏳",
  "Tu enfoque vale más que tu entrada 💡",
  "Menos es más: elegí calidad sobre cantidad 🎯",
  "Tu progreso es acumulativo, no inmediato 🧱",
  "Un día de claridad vale más que una semana de dudas ☀️",
  "El trader sabio deja pasar oportunidades por disciplina ⚖️",
  "Ganás cuando mantenés la calma en el caos 🌊",
  "El miedo es información, no enemigo 📈",
  "Cada jornada es un entrenamiento mental 💪",
  "Aprender a esperar también es operar 🕰️",
  "Tu límite es tu emoción, no el mercado 🧠",
  "El éxito no se persigue, se construye paso a paso 🧩",
  "Controlá lo controlable: tu reacción 💬",
  "El que domina su mente, domina el mercado 🌀",
  "Tu fortaleza no es no caer, sino volver con más foco 🔁",
  "En trading, menos ruido, más propósito 🔇",
  "No necesitás más indicadores, necesitás más calma 💭",
  "Respirá: el mercado no se va a ningún lado 🌍",
  "Perder una operación no te define 💔",
  "Tu proceso es más importante que tu resultado 📊"
];

document.addEventListener("DOMContentLoaded", () => {
  const quote = document.getElementById("quote");
  if (quote) {
    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
    quote.textContent = fraseAleatoria;
  }

  const enterBtn = document.getElementById("enterBtn");
  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      const loader = document.getElementById("loader");
      if (loader) loader.style.display = "none";
      window.location.href = "modules/index.html";
    });
  }

  // Preload opcional de imágenes
  const preloadImages = () => {
    const imgs = ["img/logo.png"];
    imgs.forEach(src => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
  };
  preloadImages();
});
