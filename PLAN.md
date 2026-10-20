# Plan de mejora del portfolio

Origen: onboarding del `frontend-tutor`. Ejecuta: `frontend-coder` (solo cuando se le pida). Los números de línea vienen del análisis y hay que verificarlos antes de editar.

**Cómo usamos este plan:** un paso a la vez. Tú dices "haz el paso X", el `frontend-coder` lo implementa y te explica qué cambió y por qué; tú lo compruebas en el navegador y marcamos `[x]`.

**Cómo ver el sitio:** abre `index.html` con Live Server (VS Code) o corre `python -m http.server` en la raíz y entra a `http://localhost:8000`.

---

## Fase 0 — Base del proyecto (30 min)

- [ ] **0.1** Decidir la rama de publicación: existe `main` y `origin/master`. *Aprendes:* ramas locales vs remotas.
- [ ] **0.2** Crear `.gitignore` y un README real (qué es, cómo correrlo). *Aprendes:* qué va y qué no va en un repo.
- [ ] **0.3** Renombrar archivos de `pics/` sin espacios ni nombres de Figma y `Css/` → `css/`, actualizando las rutas. *Aprendes:* por qué GitHub Pages (Linux) distingue mayúsculas y rompe rutas. *Ojo:* el coder renombra con `git mv` y ajusta todas las rutas; no borra archivos.

## Fase 1 — Menú y enlaces (lo más pequeño, mucho aprendizaje)

- [ ] **1.1** Poner `id` a cada `<section>` y arreglar los `<li>`: `<li><a href="#sobre-mi">Sobre mí</a></li>`. *Aprendes:* anclas, por qué `href=""` recarga la página, enlace vacío vs enlace con texto.
- [ ] **1.2** Pasar el estilo hover de `li` a `a` y añadir `scroll-behavior: smooth` y `:focus-visible`. *Aprendes:* selectores, pseudo-clases, navegación por teclado.
- [ ] **1.3** Hacer reales el botón "¡Hablemos!" (`mailto:` o LinkedIn) y envolver los íconos sociales en `<a>` con `aria-label`. Los enlaces reales los pone el usuario; el coder deja `TODO`. *Aprendes:* `<a>` vs `<button>`, `target="_blank"` con `rel="noopener noreferrer"`.
- [ ] **1.4** Arreglar el logo (`src=""` / `href=""`): imagen real o texto. *Aprendes:* peticiones inútiles del navegador y `alt` correcto.

## Fase 2 — Semántica, accesibilidad y contenido

- [ ] **2.1** `<html lang="es">`, un solo `<h1>`, jerarquía de encabezados correcta, quitar `<h6>` usado como subtítulo. *Aprendes:* semántica vs apariencia; por qué importa para lectores de pantalla y SEO.
- [ ] **2.2** Reescribir los `alt` (`"pc"`, `"Imagen"`…) y corregir typos ("protafolio", "Poseeo", "suscompañeros"). El usuario aprueba el texto final. *Aprendes:* qué hace bueno a un `alt`.
- [ ] **2.3** `<title>` y `meta description` útiles, favicon y Open Graph básico. *Aprendes:* SEO on-page y cómo se ve el enlace al compartirlo.

## Fase 3 — CSS robusto y responsive (la mayor deuda)

- [ ] **3.1** Variables CSS (`:root`) para colores, espaciados y tipografías; reemplazar el `#8873ef` repetido. *Aprendes:* tokens de diseño y mantenibilidad.
- [ ] **3.2** Reemplazar alturas y anchos fijos (`height: 622px`, `588px`, `700px`, imágenes 600×600, `margin-left: 200px`) por `min-height`, `max-width: 100%`, `clamp()` y `gap`. *Aprendes:* por qué el tamaño fijo rompe en pantallas distintas.
- [ ] **3.3** Quitar `float` en el nav y valores inválidos (`align-self: left`, `justify-items` mal usado); limpiar el reset global `*`. *Aprendes:* flex vs grid vs float y qué reglas realmente se aplican.
- [ ] **3.4** Media query (~768px): grid a una columna, nav apilado o menú compacto. *Aprendes:* mobile-first vs desktop-first y breakpoints.
- [ ] **3.5** Renombrar clases con una convención única (p. ej. español o inglés, sin mayúsculas como `.Social`) y retirar bloques de CSS comentados sin uso. *Aprendes:* convenciones de nombres (BEM, opcional).

## Fase 4 — Secciones pendientes

- [ ] **4.1** Estilar "Educación y habilidades" (agregar clases, arreglar `src="./"`, usar los PNG de skills). *Aprendes:* componentes tipo tarjeta y rejillas con `auto-fit`/`minmax`.
- [ ] **4.2** Construir "Experiencia" (estructura + estilo). El contenido real lo da el usuario; el coder deja `TODO`.
- [ ] **4.3** Construir "Testimonial" y el footer. Mismo criterio de contenido.

## Fase 5 — JavaScript

- [ ] **5.1** Primer `main.js`: menú hamburguesa en móvil (alternar una clase y `aria-expanded`). *Aprendes:* DOM, `addEventListener`, estado visible vs estado accesible.
- [ ] **5.2** Renderizar íconos/skills/estudios desde un arreglo de datos en JS. *Aprendes:* separar datos de presentación, `map` y plantillas de string.
- [ ] **5.3** Resaltar en el nav la sección visible con `IntersectionObserver`. *Aprendes:* observers y eventos del scroll sin penalizar rendimiento.

## Fase 6 — Calidad, medición y publicación

- [ ] **6.1** Optimizar imágenes (tamaño/formato, `loading="lazy"`, `width`/`height`) para mejorar LCP y CLS. *Aprendes:* Core Web Vitals; medir con Lighthouse (lo corre el usuario en Chrome DevTools).
- [ ] **6.2** Eventos de analítica en "¡Hablemos!" y LinkedIn (p. ej. GA4 o Plausible). *Aprendes:* instrumentar eventos; encaja con tu perfil de Growth. Hipótesis a medir: ¿qué porcentaje de visitas hace clic en contacto?
- [ ] **6.3** Publicar en GitHub Pages o Netlify y revisar rutas y mayúsculas en producción.
- [ ] **6.4** Segunda pasada: pedir al `frontend-tutor` una revisión del resultado y comparar con el diagnóstico inicial.

---

## Reglas de trabajo

1. Un paso por pedido; el coder no avanza solo.
2. Después de cada paso: abrir el navegador, comprobar el efecto y revisar el cambio con `git diff` antes de marcar `[x]`.
3. Un commit por paso o fase, hecho por el usuario (el coder renombra archivos pero no hace commits).
4. Todo texto personal (experiencia, testimonios, enlaces) lo escribe el usuario; el coder deja `TODO`.

## Orden recomendado

Fase 1 → 2 → 3 → 4 → 5 → 6. La Fase 0 puede ir antes o en paralelo. La Fase 3 conviene antes de la 4 para no estilar secciones nuevas sobre una base rota.
