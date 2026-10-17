import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css'


document.addEventListener('DOMContentLoaded', () => {
  const indicator = document.getElementById('nav-indicator');
  const items = document.querySelectorAll('.nav-item');
  const container = document.querySelector('.nav-pill-container');

  let activeItem = document.querySelector('.nav-item.active');

  function moveIndicator(element) {
    if (!element) return;
    
    // 1. Calculamos tamaño y posición del bloque amarillo
    indicator.style.width = `${element.offsetWidth}px`;
    indicator.style.transform = `translateX(${element.offsetLeft}px)`;
    
    // 2. MAGIA DEL COLOR: Quitamos la letra oscura a todos
    items.forEach(nav => nav.classList.remove('indicator-active'));
    
    // 3. Y se la ponemos SOLO al elemento que acabamos de iluminar
    element.classList.add('indicator-active');
  }

  // Al cargar la página
  if (activeItem) {
    moveIndicator(activeItem);
  }

  items.forEach(item => {
    // Al pasar el ratón
    item.addEventListener('mouseenter', (e) => {
      moveIndicator(e.target);
    });

    // Al hacer clic
    item.addEventListener('click', (e) => {
      items.forEach(nav => nav.classList.remove('active'));
      e.target.classList.add('active');
      activeItem = e.target; // Actualizamos la "base" a la que volver
      moveIndicator(activeItem);
    });
  });

  // Al sacar el ratón de la barra completa
  container.addEventListener('mouseleave', () => {
    moveIndicator(activeItem);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const projectItems = document.querySelectorAll('.project-item');
  const mainImg = document.getElementById('main-project-img');
  const mainLink = document.getElementById('main-project-link');

  projectItems.forEach(item => {
    // Cuando el cursor entra en el elemento de la lista
    item.addEventListener('mouseenter', () => {
      // 1. Quitamos la clase 'active' de todos y se la ponemos al actual
      projectItems.forEach(p => p.classList.remove('active'));
      item.classList.add('active');

      // 2. Extraemos la info oculta en los data-attributes
      const newImgSrc = item.getAttribute('data-image');
      const newLinkUrl = item.getAttribute('data-link');

      // 3. Hacemos un efecto de "fundido"
      mainImg.style.opacity = 0; // Ocultamos la imagen actual
      
      setTimeout(() => {
        // Cambiamos la fuente y el enlace en mitad del fundido
        mainImg.src = newImgSrc;
        mainLink.href = newLinkUrl;
        
        // Volvemos a mostrar la nueva imagen
        mainImg.style.opacity = 1;
      }, 200); // 200 milisegundos de transición
    });
  });
});

// --- FUNCIONALIDAD: COPIAR EMAIL AL PORTAPAPELES ---
document.addEventListener("DOMContentLoaded", () => {
  const emailLink = document.getElementById('copy-email');

  if (emailLink) {
    emailLink.addEventListener('click', (e) => {
      e.preventDefault(); // Evitamos que la página salte hacia arriba al hacer clic
      
      // Cogemos el correo que has puesto en el HTML
      const email = emailLink.getAttribute('data-email');
      
      // La API moderna del navegador para copiar al portapapeles
      navigator.clipboard.writeText(email).then(() => {
        // Guardamos el texto original
        const originalText = emailLink.innerText;
        
        // Cambiamos el texto y el color para dar feedback al usuario
        emailLink.innerText = '¡Copiado al portapapeles!';
        emailLink.style.color = '#00cab9';
        
        // A los 2 segundos, lo devolvemos a la normalidad
        setTimeout(() => {
          emailLink.innerText = originalText;
          emailLink.style.color = ''; // Quita el color forzado y vuelve al del CSS
        }, 2000);
      }).catch(err => {
        console.error('Error al copiar el email: ', err);
      });
    });
  }
});

// --- FUNCIONALIDAD: REVEAL ON SCROLL ---
// 1. Configuramos el vigilante (Observer)
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15 // Se activa cuando el 15% de la sección es visible en pantalla
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // Si la sección entra en la pantalla...
    if (entry.isIntersecting) {
      // Le añadimos la clase que la hace visible
      entry.target.classList.add('show-section');
      
      // Dejamos de observarla para que la animación solo ocurra una vez (queda más profesional)
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// 2. Buscamos todas las secciones ocultas y les ponemos el vigilante
const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right');
hiddenElements.forEach((el) => observer.observe(el));

document.addEventListener('DOMContentLoaded', () => {
  // Capturamos todos los elementos de tu HTML
  const navMenu = document.getElementById('nav-menu');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const indicator = document.getElementById('nav-indicator');
  const navItems = document.querySelectorAll('.nav-item');

  // --- 1. FUNCIÓN MAESTRA QUE MUEVE EL INDICADOR CIAN ---
  function moveIndicator(element, instant = false) {
    if (!element || !indicator) return;
    
    // En móviles, el indicador está oculto por CSS, no calculamos nada
    if (window.innerWidth <= 768) return;

    // Limpiamos cualquier "transform" residual que pudiera estar causando el desvío
    indicator.style.transform = 'none';

    if (instant) {
      // Movimiento instantáneo (para cuando redimensionas la pantalla, evita bugs)
      indicator.style.transition = 'none';
      indicator.style.width = `${element.offsetWidth}px`;
      indicator.style.left = `${element.offsetLeft}px`;
      
      // Forzamos al navegador a aplicar el cambio de golpe
      void indicator.offsetWidth; 
      
      // Restauramos la animación suave de tu CSS original
      indicator.style.transition = 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
    } else {
      // Movimiento suave normal (para cuando pasas el ratón)
      indicator.style.width = `${element.offsetWidth}px`;
      indicator.style.left = `${element.offsetLeft}px`;
    }
  }

  // --- 2. INICIALIZAR ---
  // Al cargar la página, ponemos el cian en el botón activo
  const activeItem = document.querySelector('.nav-item.active');
  moveIndicator(activeItem, true);

  // --- 3. EVENTOS DE RATÓN (HOVER Y CLICK) ---
  navItems.forEach(item => {
    // Cuando el ratón pasa por encima
    item.addEventListener('mouseenter', function() {
      moveIndicator(this);
    });

    // Cuando haces click
    item.addEventListener('click', function() {
      // Quitamos la clase 'active' de todos y se la ponemos al que tocaste
      navItems.forEach(i => i.classList.remove('active', 'indicator-active'));
      this.classList.add('active', 'indicator-active');
      
      moveIndicator(this);

      // Si el menú del móvil estaba abierto, lo cerramos automáticamente
      if (navMenu && navMenu.classList.contains('active-menu')) {
        navMenu.classList.remove('active-menu');
        if (hamburgerBtn) hamburgerBtn.classList.remove('open');
      }
    });
  });

  // Cuando el ratón sale de toda la barra, el cian vuelve a su sitio
  if (navMenu) {
    navMenu.addEventListener('mouseleave', () => {
      const currentActive = document.querySelector('.nav-item.active');
      moveIndicator(currentActive);
    });
  }

  // --- 4. BOTÓN HAMBURGUESA (MÓVILES) ---
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('open');
      navMenu.classList.toggle('active-menu');
    });
  }

  // --- 5. EL ARREGLO AL REDIMENSIONAR LA PANTALLA ---
  let resizeTimer;
  window.addEventListener('resize', () => {
    // 1. Apagamos todas las animaciones instantáneamente
    document.body.classList.add('no-transition');

    // 2. Si pasamos de móvil a PC, cerramos el menú
    if (window.innerWidth > 900 && navMenu.classList.contains('active-menu')) {
      navMenu.classList.remove('active-menu');
      if (hamburgerBtn) hamburgerBtn.classList.remove('open');
    }

    clearTimeout(resizeTimer);
    
    // 3. Volvemos a la normalidad cuando el usuario deja de redimensionar
    resizeTimer = setTimeout(() => {
      // Volvemos a encender las animaciones
      document.body.classList.remove('no-transition');
      
      const currentActive = document.querySelector('.nav-item.active');
      moveIndicator(currentActive, true); 
    }, 200); // 200ms es suficiente aquí
  });
});