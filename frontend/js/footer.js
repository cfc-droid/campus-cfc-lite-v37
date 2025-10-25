/* ==========================================
   ✅ BITÁCORA CFC
   Funcionalidad: Footer Dinámico Premium
   Subpaso: 3.3 — Automatización de año
   Tipo: Inserción nueva
   Fecha: 25-10-2025
   Autor: ChatGPT + CFC
   ControlVisual: true
========================================== */

// 🔹 INICIO CFC_FUNC_3.3_FOOTER

document.addEventListener("DOMContentLoaded", () => {
  const footer = document.createElement("footer");
  footer.innerHTML = `
    <p>© <span id="year"></span> Campus CFC LITE V37 — Cristian F. Choqui</p>
  `;
  document.body.appendChild(footer);

  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

// 🔹 FIN CFC_FUNC_3.3_FOOTER
