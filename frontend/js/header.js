/* ==========================================
   ✅ BITÁCORA CFC
   Funcionalidad: Header Global Premium
   Subpaso: 2.3 — Creación componente navegación
   Tipo: Inserción nueva
   Fecha: 25-10-2025
   Autor: ChatGPT + CFC
   ControlVisual: true
========================================== */

// 🔹 INICIO CFC_FUNC_2.3_HEADER

document.addEventListener("DOMContentLoaded", () => {
  const header = document.createElement("header");
  header.innerHTML = `
    <nav class="navbar">
      <div class="logo">Campus CFC LITE V37</div>
      <ul class="nav-links">
        <li><a href="/frontend/index.html">Inicio</a></li>
        <li><a href="/frontend/modules/index.html">Módulos</a></li>
        <li><a href="/frontend/pages/resultados.html">Resultados</a></li>
        <li><a href="/frontend/pages/perfil.html">Perfil</a></li>
      </ul>
    </nav>
  `;

  // Insertar al inicio del body
  document.body.insertBefore(header, document.body.firstChild);
});

// 🔹 FIN CFC_FUNC_2.3_HEADER
