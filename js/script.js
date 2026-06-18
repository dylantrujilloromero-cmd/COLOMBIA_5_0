/**
 * SISTEMA LOGÍSTICO Y OPERACIONAL DE LA INTERFAZ
 * Portafolio de Memoria Técnica — Dylan Trujillo
 */

document.addEventListener('DOMContentLoaded', () => {

  // === 1. GESTIÓN DE SCROLL INTERACTIVO (HEADER & FLOATING BUTTON) ===
  const appHeader = document.getElementById('site-header');
  const returnTopArrow = document.getElementById('floating-btt-lever');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      appHeader?.classList.add('sticky-state');
    } else {
      appHeader?.classList.remove('sticky-state');
    }

    if (window.scrollY > 300) {
      returnTopArrow?.classList.add('active-lever');
    } else {
      returnTopArrow?.classList.remove('active-lever');
    }
  });

  returnTopArrow?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // === 2. CONTROLADOR DE TRADUCCIÓN (CRÓNICA DE EXPERIENCIA) ===
  const languageLevers = document.querySelectorAll('.lang-toggle-btn');
  const temporalBlocks = document.querySelectorAll('.timeline-block');

  languageLevers.forEach(lever => {
    lever.addEventListener('click', () => {
      // Remover clase activa de los botones
      languageLevers.forEach(btn => btn.classList.remove('active-lang'));
      lever.classList.add('active-lang');

      const targetBlockId = lever.getAttribute('data-target');

      // Ocultar todos y mostrar solo el seleccionado
      temporalBlocks.forEach(block => {
        if (block.id === targetBlockId) {
          block.style.display = 'flex';
          block.classList.add('active-block');
        } else {
          block.style.display = 'none';
          block.classList.remove('active-block');
        }
      });
    });
  });

  // === 3. PESTAÑAS MODULARES PARA CONFERENCIAS BILINGÜES ===
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  const conferenceWrappers = document.querySelectorAll('.conference-wrapper');

  tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      // Remover clase activa de las pestañas
      tabTriggers.forEach(t => t.classList.remove('active-tab'));
      trigger.classList.add('active-tab');

      const targetConfId = trigger.getAttribute('data-lang');

      // Ocultar todos los bloques y mostrar el seleccionado
      conferenceWrappers.forEach(wrapper => {
        if (wrapper.id === targetConfId) {
          wrapper.style.display = 'block';
          wrapper.classList.add('active-conf');
        } else {
          wrapper.style.display = 'none';
          wrapper.classList.remove('active-conf');
        }
      });
    });
  });

  // === 4. MOTOR LÓGICO DE FILTRADO INTELIGENTE (GLOSARIO TÉCNICO) ===
  const searchField = document.getElementById('filter-input-field');
  const datasetRows = document.querySelectorAll('.glossary-row');
  const resultsCounter = document.getElementById('filter-counter-badge');
  const emptyFeedback = document.getElementById('no-matches-message');

  function processGlossaryFiltering() {
    const rawQuery = searchField.value.toLowerCase().trim();
    let trackingMatches = 0;

    datasetRows.forEach(row => {
      const rowTextContent = row.textContent.toLowerCase();
      if (!rawQuery || rowTextContent.includes(rawQuery)) {
        row.style.display = '';
        trackingMatches++;
      } else {
        row.style.display = 'none';
      }
    });

    if (resultsCounter) {
      resultsCounter.textContent = `${trackingMatches} de ${datasetRows.length}`;
    }

    if (emptyFeedback) {
      emptyFeedback.style.display = trackingMatches === 0 ? 'block' : 'none';
    }
  }

  searchField?.addEventListener('input', processGlossaryFiltering);
  
  if (datasetRows.length > 0 && resultsCounter) {
    resultsCounter.textContent = `${datasetRows.length} términos`;
  }

  // === 5. VENTANA INTERACTIVA OVERLAY (LIGHTBOX) ===
  const mainOverlay = document.getElementById('interactive-overlay');
  const overlayCanvas = document.getElementById('lightbox-display-area');
  const overlayCaption = document.getElementById('lightbox-text-caption');
  const overlayCloseBtn = document.getElementById('lightbox-close-trigger');
  const mosaicElements = document.querySelectorAll('.mosaico-item');

  function clearAndDisplayOverlay(captionText) {
    if (!mainOverlay) return;
    if (overlayCaption) overlayCaption.textContent = captionText || 'Detalle de Registro';
    if (overlayCanvas) {
      overlayCanvas.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:0.85rem;font-family:monospace;color:#999;background:#f4f5f7;">[ Vista Detallada de Evidencia ]</div>`;
    }
    mainOverlay.classList.add('active-view');
    document.body.style.overflow = 'hidden';
  }

  function shutdownOverlay() {
    if (!mainOverlay) return;
    mainOverlay.classList.remove('active-view');
    document.body.style.overflow = '';
  }

  mosaicElements.forEach(item => {
    item.addEventListener('click', () => {
      const labelValue = item.getAttribute('data-caption');
      clearAndDisplayOverlay(labelValue);
    });
  });

  overlayCloseBtn?.addEventListener('click', shutdownOverlay);

  // === 6. MENÚ COLAPSABLE CONMUTADOR RESPONSIVE ===
  const burgerBtn = document.getElementById('burger-toggle');
  const navigationMenu = document.getElementById('main-navigation');

  if (burgerBtn && navigationMenu) {
    burgerBtn.addEventListener('click', () => {
      navigationMenu.classList.toggle('mobile-open');
    });
  }
});