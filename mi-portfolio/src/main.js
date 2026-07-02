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