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
    
    indicator.style.width = `${element.offsetWidth}px`;
    indicator.style.transform = `translateX(${element.offsetLeft}px)`;
    
    items.forEach(nav => nav.classList.remove('indicator-active'));
    
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
      activeItem = e.target;
      moveIndicator(activeItem);
    });
  });

  // Sacar ratón de la barra completa
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
      
      projectItems.forEach(p => p.classList.remove('active'));
      item.classList.add('active');

      const newImgSrc = item.getAttribute('data-image');
      const newLinkUrl = item.getAttribute('data-link');

      mainImg.style.opacity = 0; // 0 imagen actual
      
      setTimeout(() => {
        mainImg.src = newImgSrc;
        mainLink.href = newLinkUrl;
        
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
      e.preventDefault();
      
      const email = emailLink.getAttribute('data-email');
      
      navigator.clipboard.writeText(email).then(() => {
        const originalText = emailLink.innerText;
        
        emailLink.innerText = '¡Copiado al portapapeles!';
        emailLink.style.color = '#00cab9';
        
        setTimeout(() => {
          emailLink.innerText = originalText;
          emailLink.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Error al copiar el email: ', err);
      });
    });
  }
});

// --- FUNCIONALIDAD: REVEAL ON SCROLL ---
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15 // 15% de la sección es visible en pantalla
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show-section');
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right');
hiddenElements.forEach((el) => observer.observe(el));

document.addEventListener('DOMContentLoaded', () => {
  const navMenu = document.getElementById('nav-menu');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const indicator = document.getElementById('nav-indicator');
  const navItems = document.querySelectorAll('.nav-item');

  function moveIndicator(element, instant = false) {
    if (!element || !indicator) return;
    
    if (window.innerWidth <= 768) return;

    indicator.style.transform = 'none';

    if (instant) {
      // Bugs
      indicator.style.transition = 'none';
      indicator.style.width = `${element.offsetWidth}px`;
      indicator.style.left = `${element.offsetLeft}px`;
      
      void indicator.offsetWidth; 
      
      indicator.style.transition = 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
    } else {
      indicator.style.width = `${element.offsetWidth}px`;
      indicator.style.left = `${element.offsetLeft}px`;
    }
  }


  const activeItem = document.querySelector('.nav-item.active');
  moveIndicator(activeItem, true);

  navItems.forEach(item => {

    item.addEventListener('mouseenter', function() {
      moveIndicator(this);
    });

    // Cuando haces click
    item.addEventListener('click', function() {
      navItems.forEach(i => i.classList.remove('active', 'indicator-active'));
      this.classList.add('active', 'indicator-active');
      
      moveIndicator(this);

      if (navMenu && navMenu.classList.contains('active-menu')) {
        navMenu.classList.remove('active-menu');
        if (hamburgerBtn) hamburgerBtn.classList.remove('open');
      }
    });
  });

  if (navMenu) {
    navMenu.addEventListener('mouseleave', () => {
      const currentActive = document.querySelector('.nav-item.active');
      moveIndicator(currentActive);
    });
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('open');
      navMenu.classList.toggle('active-menu');
    });
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    document.body.classList.add('no-transition');

    if (window.innerWidth > 900 && navMenu.classList.contains('active-menu')) {
      navMenu.classList.remove('active-menu');
      if (hamburgerBtn) hamburgerBtn.classList.remove('open');
    }

    clearTimeout(resizeTimer);
    
    resizeTimer = setTimeout(() => {
      // Volvemos a encender las animaciones
      document.body.classList.remove('no-transition');
      
      const currentActive = document.querySelector('.nav-item.active');
      moveIndicator(currentActive, true); 
    }, 200); // 200ms es suficiente aquí
  });
});