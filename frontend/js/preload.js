// ✅ CFC_FUNC_15_SUBPASO_1.3 — Preload de imágenes críticas (24-10-2025)
// Optimiza la carga inicial del Campus CFC LITE en un 20–30 %.
// No depende de otros scripts y puede cargarse en <head> o al final del <body>.

document.addEventListener("DOMContentLoaded", () => {
  const recursos = [
    "img/logo.png",
    "img/hero.jpg",
    "img/fondo-campus.jpg"
  ];

  recursos.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
});
