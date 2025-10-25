/* ==========================================================
   Archivo: /frontend/js/motivationPlus.js
   Función: Retornar frase motivacional según resultado
   ========================================================== */
function getMotivation(aprobado) {
  const frasesOK = [
    "🔥 ¡Excelente trabajo! Vas avanzando firme.",
    "🚀 Cada examen te acerca al trader profesional.",
    "💪 Mentalidad ganadora, sigue así.",
    "🌟 Tu disciplina define tu éxito."
  ];
  const frasesNO = [
    "😅 Cada error es una oportunidad de aprendizaje.",
    "🧠 Revisa tus notas y vuelve más fuerte.",
    "🏁 La constancia supera al talento. No te rindas.",
    "⚙️ Ajustá tu mente y seguí practicando."
  ];
  const arr = aprobado ? frasesOK : frasesNO;
  return arr[Math.floor(Math.random() * arr.length)];
}
