/* ==========================================================================
   main.js — JavaScript vanilla (sin librerías ni build).
   Se carga con `defer` en el <head>: el navegador lo ejecuta cuando el HTML
   ya está leído, así que podemos usar querySelector sin esperar eventos.
   Estructura: 1) DATOS  2) UTILIDADES  3) RENDER (5.2)  4) MENÚ (5.1)  5) NAV ACTIVO (5.3)
   ========================================================================== */

/* ==========================================================================
   1) DATOS
   Separar datos de lógica: para cambiar un curso o una skill solo tocas este
   bloque, sin entender el resto del código. Usa texto plano: aquí "&" se escribe
   "&"; ya se convierte a "&amp;" al pintar (ver escapeHtml).
   ========================================================================== */
const HABILIDADES = [
    'SQL',
    'Snowflake',
    'Claude',
    'Braze',
    'Power BI',
    'Python',
    'Amplitude',
    'Visual Studio Code',
    'Git y GitHub',
];

const IDIOMAS = ['Inglés'];

const INTERESES = [
    'Fórmula 1',
    'Programación',
    'Ciberseguridad',
    'Videojuegos',
    'Inversiones',
    'Viajes',
    'Gym',
    'Deportes americanos',
];

// Un objeto por institución; cada una tiene su arreglo de cursos (nombre + fecha MM/AAAA)
const CURSOS = [
    {
        institucion: 'Anthropic',
        cursos: [
            { nombre: 'AI Fluency Framework & Foundations', fecha: '05/2026' },
            { nombre: 'Claude Code 101', fecha: '04/2026' },
            { nombre: 'Introduction to agent skills', fecha: '05/2026' },
            { nombre: 'Introduction to subagents', fecha: '05/2026' },
        ],
    },
    {
        institucion: 'Platzi',
        cursos: [
            { nombre: 'Práctico de SQL', fecha: '11/2023' },
            { nombre: 'Fundamentos de Product Owner', fecha: '11/2023' },
            { nombre: 'Fundamentos de Python', fecha: '03/2023' },
            { nombre: 'Análisis de Datos con Power BI', fecha: '03/2023' },
            { nombre: 'Profesional de Git y GitHub', fecha: '07/2022' },
            { nombre: 'Comunicación efectiva para equipos de trabajo', fecha: '11/2022' },
        ],
    },
];

/* ==========================================================================
   2) UTILIDADES
   ========================================================================== */

// Hábito de seguridad: cuando metes texto dentro de una plantilla que luego va a
// innerHTML, el navegador lo interpreta como HTML. Si el texto viniera de afuera
// (un formulario, una API) y contuviera "<script>", se ejecutaría (ataque XSS).
// Aquí los datos son tuyos, pero escapar SIEMPRE evita olvidarlo el día que no lo sean.
// (Alternativa: textContent, que nunca interpreta HTML, pero obliga a crear nodos uno a uno.)
function escapeHtml(texto) {
    return String(texto)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Escribe el HTML en un contenedor por su id. Si el id no existe (p. ej. se borró del HTML)
// no hacemos nada en vez de lanzar un error que frenaría el resto del script.
function pintar(idContenedor, html) {
    const contenedor = document.getElementById(idContenedor);
    if (contenedor) {
        contenedor.innerHTML = html;
    }
}

/* ==========================================================================
   3) RENDER DESDE ARREGLOS (paso 5.2)
   Patrón: arreglo.map(elemento => plantilla).join('')
   - map transforma cada dato en un string de HTML (devuelve un arreglo nuevo).
   - join('') pega esos strings en uno solo (si no, el arreglo se imprimiría con comas).
   - Las plantillas (template literals, con acentos graves) permiten ${variable}.
   El marcado generado es idéntico al que antes estaba escrito a mano en el HTML.
   ========================================================================== */
function plantillaPildora(texto) {
    return `<li class="pildora">${escapeHtml(texto)}</li>`;
}

function plantillaCurso({ nombre, fecha }) {
    return `<li><span>${escapeHtml(nombre)}</span> <span class="meta">${escapeHtml(fecha)}</span></li>`;
}

function plantillaInstitucion({ institucion, cursos }) {
    return `
        <article class="card-content">
            <h4 class="tarjeta-titulo">${escapeHtml(institucion)}</h4>
            <ul class="lista-compacta">${cursos.map(plantillaCurso).join('')}</ul>
        </article>`;
}

function renderizarContenido() {
    pintar('lista-habilidades', HABILIDADES.map(plantillaPildora).join(''));
    pintar('lista-idiomas', IDIOMAS.map(plantillaPildora).join(''));
    pintar('lista-intereses', INTERESES.map(plantillaPildora).join(''));
    pintar('lista-cursos', CURSOS.map(plantillaInstitucion).join(''));
}

// Experiencia y las tarjetas de Educación NO se generan aquí a propósito: son el contenido
// principal de la página, y mantenerlas en el HTML estático garantiza que buscadores,
// lectores de pantalla y quien tenga JS desactivado las vean sin depender de este script.

/* ==========================================================================
   4) MENÚ HAMBURGUESA (paso 5.1)
   Dos estados que deben ir sincronizados:
   - Visible: la clase .menu-abierto en el <header> (el CSS decide qué se ve).
   - Accesible: aria-expanded y aria-label del botón (lo que anuncia un lector de pantalla).
   Si solo cambias la clase, el menú se ve pero un lector de pantalla no sabe que está abierto.
   ========================================================================== */
function iniciarMenu() {
    const header = document.querySelector('header');
    const boton = document.querySelector('.menu-toggle');
    const menu = document.getElementById('menu-principal');
    if (!header || !boton || !menu) return;

    function establecerMenu(abierto) {
        header.classList.toggle('menu-abierto', abierto);
        boton.setAttribute('aria-expanded', String(abierto)); // los atributos ARIA son texto: "true"/"false"
        boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    }

    boton.addEventListener('click', () => {
        // Leemos el estado real desde aria-expanded para tener una sola fuente de verdad
        const estaAbierto = boton.getAttribute('aria-expanded') === 'true';
        establecerMenu(!estaAbierto);
    });

    // Escape cierra y devuelve el foco al botón: si no, el foco quedaría en un enlace
    // que acaba de desaparecer y quien navega con teclado se "perdería".
    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && boton.getAttribute('aria-expanded') === 'true') {
            establecerMenu(false);
            boton.focus();
        }
    });

    // Un solo listener en el <nav> (delegación de eventos) en vez de uno por enlace:
    // el clic "sube" desde el <a> hasta el menú, y comprobamos de dónde vino.
    menu.addEventListener('click', (evento) => {
        if (evento.target.closest('a')) {
            establecerMenu(false);
        }
    });

    // Si la ventana crece a escritorio con el menú abierto, lo reseteamos para que
    // el estado accesible no quede en "abierto" con el botón oculto.
    window.matchMedia('(min-width: 768px)').addEventListener('change', (evento) => {
        if (evento.matches) establecerMenu(false);
    });
}

/* ==========================================================================
   5) NAV ACTIVO CON IntersectionObserver (paso 5.3)
   En vez de escuchar 'scroll' (se dispara cientos de veces y obliga a medir posiciones
   en el hilo principal), el navegador nos avisa SOLO cuando una sección entra o sale
   de la zona observada.
   ========================================================================== */
function iniciarNavActivo() {
    // Degradación elegante: navegadores sin soporte simplemente no resaltan nada
    if (!('IntersectionObserver' in window)) return;

    // Mapa id de sección -> enlace del menú que apunta a ella
    const enlaces = new Map();
    document.querySelectorAll('.navegacion a[href^="#"]').forEach((enlace) => {
        enlaces.set(enlace.getAttribute('href').slice(1), enlace);
    });

    function marcarActivo(idActivo) {
        enlaces.forEach((enlace, id) => {
            const esActivo = id === idActivo;
            enlace.classList.toggle('activo', esActivo);
            if (esActivo) {
                enlace.setAttribute('aria-current', 'true'); // lo anuncia el lector de pantalla
            } else {
                enlace.removeAttribute('aria-current');
            }
        });
    }

    // rootMargin recorta el "área de visión" (viewport): ignora el 40% superior y el 55% inferior,
    // dejando una franja fina cerca del centro-arriba. La sección que cruza esa franja es la
    // "actual". El 40% arriba también compensa el header sticky.
    const observador = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) marcarActivo(entrada.target.id);
            });
        },
        { rootMargin: '-40% 0px -55% 0px' }
    );

    // Solo observamos las secciones que tienen enlace en el menú
    document.querySelectorAll('main > section[id]').forEach((seccion) => {
        if (enlaces.has(seccion.id)) observador.observe(seccion);
    });
}

/* ==========================================================================
   Arranque
   ========================================================================== */
renderizarContenido();
iniciarMenu();
iniciarNavActivo();
