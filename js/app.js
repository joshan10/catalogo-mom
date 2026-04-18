/* ============================================
   APP.JS — Catálogo de Regalos
   Product data, rendering, gallery, WhatsApp
   ============================================ */

const WHATSAPP_NUMBER = '573105216032';

// Detect if we're in a subfolder (template/) or at root
const BASE_PATH = window.location.pathname.includes('/template/') ? '../' : '';
const PRODUCT_PAGE = `${BASE_PATH}template/producto.html`;
const HOME_PAGE = `${BASE_PATH}index.html`;

const CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'cofres', label: '💎 Cofres de Rosas' },
  { id: 'corazones', label: '❤️ Cajas Corazón' },
  { id: 'desayunos', label: '🥐 Desayunos' },
  { id: 'ramos', label: '💐 Ramos & Flores' },
  { id: 'especiales', label: '✨ Especiales' },
];

const PRODUCTS = [
  {
    id: 'cofre-negro',
    name: 'Cofre Elegance Noir',
    category: 'cofres',
    price: 'Consultar',
    badge: 'Premium',
    shortDesc: 'Cofre negro desplegable con rosas rojas, chocolates Ferrero Rocher y vino rosé JP Chenet.',
    description: 'Un regalo sofisticado que sorprende al abrirse. Este elegante cofre negro se despliega revelando dos arreglos de rosas rojas artesanales enmarcando un corazón central con chocolates Ferrero Rocher, una corona dorada decorativa y vino espumoso JP Chenet Rosé. Decorado con delicadas mariposas doradas y un cartel temático. Perfecto para el Día de la Madre o cualquier ocasión especial.',
    includes: ['Rosas rojas artesanales', 'Chocolates Ferrero Rocher', 'Vino JP Chenet Rosé', 'Corona dorada', 'Mariposas decorativas'],
    images: ['cofre-negro-3.jpeg', 'cofre-negro-4.jpeg'],
  },
  {
    id: 'cofre-rosa',
    name: 'Cofre Rosa Encanto',
    category: 'cofres',
    price: 'Consultar',
    badge: 'Nuevo',
    shortDesc: 'Cofre rosa lila desplegable con rosas rosadas, chocolates Ferrero y vino rosé.',
    description: 'Delicadeza y elegancia se unen en este cofre en tonos rosa y lila. Al desplegarse revela hermosas rosas rosadas y blancas a los lados, con un corazón central lleno de chocolates Ferrero Rocher y una lata de vino espumoso JP Chenet Rosé. Coronado con una tiara dorada y decorado con mariposas y un cartel "Te Amo Mamá". Un regalo que derrite corazones.',
    includes: ['Rosas rosadas y blancas', 'Chocolates Ferrero Rocher', 'Vino JP Chenet Rosé', 'Corona dorada', 'Mariposas decorativas'],
    images: ['cofre-rosa-1.jpeg', 'cofre-rosa-2.jpeg'],
  },
  {
    id: 'cajita-mama',
    name: 'Cajita Feliz Día Mamá',
    category: 'especiales',
    price: 'Consultar',
    badge: 'Día de la Madre',
    shortDesc: 'Cajita roja con rosas, chocolates Ferrero y cartel "Feliz Día Mamá".',
    description: 'Un tierno regalo pensado especialmente para mamá. Esta cajita roja elegante con lazo rojo y mariposa dorada se abre para mostrar rosas artesanales rojas, chocolates Ferrero Rocher y un cartel con flores que dice "Feliz Día Mamá". Un detalle que expresa todo tu amor en un pequeño espacio lleno de significado.',
    includes: ['Rosas artesanales rojas', 'Chocolates Ferrero Rocher', 'Cartel "Feliz Día Mamá"', 'Mariposa dorada', 'Lazo rojo'],
    images: ['caja-sorpresa-2.jpeg'],
  },
  {
    id: 'corazon-oso',
    name: 'Corazón con Oso de Peluche',
    category: 'corazones',
    price: 'Consultar',
    badge: 'Favorito',
    shortDesc: 'Caja corazón roja con osito de peluche coronado, globo, rosas y chocolates.',
    description: 'El regalo más tierno y romántico de nuestra colección. Una hermosa caja en forma de corazón rojo alberga un adorable oso de peluche con corona dorada, rodeado de rosas artesanales, chocolates premium y delicadas mariposas. Coronado con un globo metalizado en forma de corazón. Disponible en diferentes presentaciones y tamaños.',
    includes: ['Oso de peluche con corona', 'Rosas artesanales', 'Chocolates premium', 'Globo corazón metalizado', 'Mariposas decorativas', 'Lazo de satén'],
    images: ['corazon-oso-1.jpeg']
  },
  {
    id: 'arreglo-mama',
    name: 'Arreglo Día de la Madre',
    category: 'especiales',
    price: 'Consultar',
    badge: 'Día de la Madre',
    shortDesc: 'Arreglo completo con oso, globos "Feliz Día Mamá", rosas, chocolates y decoración dorada.',
    description: 'El regalo más espectacular para celebrar a mamá. Un impresionante arreglo sobre base decorativa con oso de peluche abrazando un corazón "I Love You", rodeado de rosas artesanales en tonos burgundy y blanco, chocolates Ferrero Rocher, y coronado con globos metalizados "Feliz Día Mamá". Incluye cartel dorado y mariposas decorativas. Un regalo que dejará a mamá sin palabras.',
    includes: ['Oso de peluche "I Love You"', 'Globos metalizados', 'Rosas artesanales', 'Chocolates Ferrero Rocher', 'Cartel dorado', 'Mariposas decorativas', 'Base decorativa'],
    images: ['arreglo-mama-1.jpeg', 'arreglo-mama-2.jpeg'],
  },
  {
    id: 'victoria-secret',
    name: 'Set Victoria\'s Secret',
    category: 'especiales',
    price: 'Consultar',
    badge: '✨ Exclusivo',
    shortDesc: 'Set regalo con productos Victoria\'s Secret, chocolates Ferrero y globo corazón rosa.',
    description: 'Un regalo exclusivo que combina lujo y dulzura. Caja regalo con productos Victoria\'s Secret, chocolates Ferrero Rocher, y detalles premium envueltos en celofán con un elegante lazo blanco. Coronado con un globo metalizado en forma de corazón rosa y decorado con mariposa dorada. El regalo perfecto para una mujer que merece lo mejor.',
    includes: ['Productos Victoria\'s Secret', 'Chocolates Ferrero Rocher', 'Globo corazón rosa', 'Lazo blanco', 'Mariposa dorada', 'Envoltura premium'],
    images: ['victoria-secret-1.jpeg'],
  },
  {
    id: 'ramo-rosas',
    name: 'Ramo Royal Burgundy',
    category: 'ramos',
    price: 'Consultar',
    badge: 'Elegante',
    shortDesc: 'Bouquet de rosas burgundy con corona dorada, chocolates y envoltorio premium negro.',
    description: 'Un ramo que evoca la realeza. Hermosas rosas artesanales en tono burgundy profundo envueltas en elegante papel negro, coronadas con una tiara dorada con incrustaciones de perlas. En el centro, una esfera de chocolates premium y una mariposa dorada completan este ramo digno de una reina. Atado con un lazo fucsia que añade un toque vibrante.',
    includes: ['Rosas burgundy artesanales', 'Corona dorada con perlas', 'Chocolates premium', 'Mariposa dorada', 'Envoltorio papel negro', 'Lazo fucsia'],
    images: ['ramo-rosas-2.jpeg'],
  },
  {
    id: 'canasta-flores',
    name: 'Canasta Corazón Floral',
    category: 'ramos',
    price: 'Consultar',
    badge: 'Encantador',
    shortDesc: 'Canasta rosa en forma de corazón con arreglo floral, chocolates y tarjeta decorativa.',
    description: 'Un arreglo delicado y romántico en una encantadora canasta rosa con asa en forma de corazón. Llena de hermosas flores artificiales en tonos rosa, fuscia y blanco, complementada con una taza temática, chocolates y una tarjeta con forma de corazón que dice "Con cariño para ti hermosa, te amo". Decorada con una mariposa dorada. Un detalle lleno de ternura.',
    includes: ['Canasta corazón rosa', 'Flores artificiales mixtas', 'Taza decorativa', 'Tarjeta corazón', 'Chocolates', 'Mariposa dorada'],
    images: ['canasta-flores-1.jpeg', 'canasta-flores-2.jpeg'],
  },
  {
    id: 'bandeja-desayuno',
    name: 'Bandeja Desayuno "Te Amo"',
    category: 'desayunos',
    price: 'Consultar',
    badge: 'Romántico',
    shortDesc: 'Bandeja de madera con desayuno completo, oso peluche grande, globo "Te Amo" y dulces.',
    description: 'Despierta con una sonrisa de oreja a oreja. Esta generosa bandeja de madera sobre patas trae un desayuno completo: bowl de fresas frescas, bowl de granola con frutas, postre de torta tres leches, sándwich de jamón queso y vegetales acompañado con unos rollitos de queso jamón y dos tipos de carnes, jugo natural, chocolates Ferrero Rocher, frutos secos surtidos y un adorable oso de peluche grande con lazo burgundy. Coronado con un globo burbuja "Te Amo" con corazones. Un despertar mágico.',
    includes: ['Oso de peluche grande', 'Fresas frescas', 'Granola con frutas', 'Postre de torta tres leches', 'Pan artesanal', 'Jugo natural', 'Chocolates Ferrero Rocher', 'Frutos secos', 'Globo "Te Amo"', 'Lazos burgundy'],
    images: ['bandeja-desayuno-1.jpeg', 'bandeja-desayuno-2.jpeg'],
  },
  {
    id: 'cumple-crate',
    name: 'Cajón Feliz Cumpleaños',
    category: 'desayunos',
    price: 'Consultar',
    shortDesc: 'Cajón de madera con fresas, granola, té Hatsu, sandwiches y globo cumpleaños.',
    description: 'Celebra un cumpleaños de la forma más dulce. Este cajón de madera decorado con cinta turquesa incluye un sándwich de jamón y queso con vegetales, una porción de fruta, un te hatsu o jugo de naranja natural, chocolate Ferrero y frutos secos. Coronado con un colorido globo "Feliz Cumpleaños" en tono menta. Un desayuno sorpresa que hará de ese día uno inolvidable.',
    includes: ['Fresas con chocolate', 'Granola con frutas', 'Sandwiches artesanales', 'Té Hatsu', 'Jugo natural', 'Dulces variados', 'Globo "Feliz Cumpleaños"', 'Cajón decorado'],
    images: ['cumple-crate-1.jpeg', 'cumple-crate-2.jpeg', 'cumple-crate-3.jpeg'],
  },
  {
    id: 'caja-desayuno-rosa',
    name: 'Caja Desayuno Deluxe Rosa',
    category: 'desayunos',
    price: 'Consultar',
    badge: 'Deluxe',
    shortDesc: 'Caja rosa con desayuno gourmet: fresas, granola, jugo, pan corazón y Ferrero Rocher.',
    description: 'La presentación más elegante para un desayuno sorpresa. Una sofisticada caja rosa con ventana transparente contiene un desayuno gourmet cuidadosamente organizado: fresas frescas con lazo, granola con frutas del bosque, arroz con leche espolvoreado con canela, pan en forma de corazón, jugo natural, yogurt artesanal y chocolates Ferrero Rocher. Decorada con flores, lazos rosados y tarjeta "MADRE". Un regalo digno de una reina.',
    includes: ['Fresas frescas', 'Granola gourmet', 'Arroz con leche', 'Pan corazón', 'Jugo natural', 'Yogurt artesanal', 'Chocolates Ferrero Rocher', 'Caja premium rosa', 'Tarjeta "MADRE"'],
    images: ['caja-desayuno-rosa-1.jpeg', 'caja-desayuno-rosa-2.jpeg', 'caja-desayuno-rosa-3.jpeg'],
  },
  {
    id: 'bandeja-torta',
    name: 'Bandeja Feliz Día con Torta',
    category: 'desayunos',
    price: 'Consultar',
    badge: 'Especial',
    shortDesc: 'Bandeja "Feliz Día" con torta drip cake, vino rosé, chocolates y globo cumpleaños.',
    description: 'Una celebración completa en una sola bandeja. Base de madera calada con letras "Feliz Día" que contiene una deliciosa torta drip cake con cobertura roja, vino espumoso JP Chenet Rosé, chocolates Ferrero Rocher, dulces artesanales y detalles decorativos con lazos rosa. Coronado con un globo "Feliz Cumpleaños". Ideal para celebrar un cumpleaños o día especial con todo el estilo.',
    includes: ['Torta drip cake', 'Vino JP Chenet Rosé', 'Chocolates Ferrero Rocher', 'Dulces artesanales', 'Globo "Feliz Cumpleaños"', 'Bandeja "Feliz Día"', 'Lazos decorativos'],
    images: ['bandeja-torta-1.jpeg'],
  },
  {
    id: 'bandeja-spa',
    name: 'Bandeja Spa Relax',
    category: 'especiales',
    price: 'Consultar',
    shortDesc: 'Bandeja rosa con vela aromática, vino JP Chenet, flores, dulces y tarjeta "MADRE".',
    description: 'Un momento de relax y consentimiento para ella. Esta hermosa bandeja rosa con cintas de satén incluye una vela aromática rosa, vino espumoso JP Chenet Rosé, un delicado arreglo de flores artificiales, dulces artesanales, Ferrero Rocher y una tarjeta con acróstico "MADRE" (Maravillosa, Amorosa, Dedicada, Radiante, Ejemplar). Un regalo que invita a relajarse y disfrutar.',
    includes: ['Vela aromática rosa', 'Vino JP Chenet Rosé', 'Flores artificiales', 'Dulces artesanales', 'Ferrero Rocher', 'Tarjeta "MADRE"', 'Bandeja con cintas'],
    images: ['bandeja-spa-1.jpeg', 'bandeja-spa-2.jpeg'],
  },
];

/* ---------- Utilities ---------- */
function getWhatsAppUrl(productName) {
  const msg = encodeURIComponent(
    `¡Hola! 🌸 Estoy interesad@ en el producto "${productName}" del catálogo. ¿Me podrías dar más información sobre disponibilidad y precio? ¡Gracias! ✨`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

function getWhatsAppGeneral() {
  const msg = encodeURIComponent(
    `¡Hola! 🌸 Estoy viendo su catálogo de regalos y me gustaría más información. ✨`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

/* WhatsApp SVG icon (reusable) */
function whatsappIcon(size = 20) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
}

/* ---------- Render: Catalog Grid ---------- */
function renderCatalog() {
  const grid = document.getElementById('products-grid');
  const filterContainer = document.getElementById('filter-buttons');
  if (!grid) return;

  // Render filter buttons
  if (filterContainer) {
    filterContainer.innerHTML = CATEGORIES.map(cat =>
      `<button class="filter-btn ${cat.id === 'todos' ? 'active' : ''}" data-category="${cat.id}">${cat.label}</button>`
    ).join('');

    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.category);
    });
  }

  renderProducts('todos');
}

function renderProducts(category) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const filtered = category === 'todos'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === category);

  grid.innerHTML = filtered.map((p, i) => `
    <article class="product-card fade-in" style="animation-delay:${i * 0.08}s" onclick="window.location.href='${PRODUCT_PAGE}?id=${p.id}'">
      <div class="product-card-img">
        <img src="${BASE_PATH}img/${p.images[0]}" alt="${p.name}" loading="lazy" width="400" height="533">
        ${p.badge ? `<span class="product-card-badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-card-body">
        <h3 class="product-card-name">${p.name}</h3>
        <p class="product-card-desc">${p.shortDesc}</p>
        <div class="product-card-footer">
          <span class="product-card-price">${p.price}</span>
          <a href="${getWhatsAppUrl(p.name)}" class="product-card-btn" title="Pedir por WhatsApp" onclick="event.stopPropagation()" target="_blank" rel="noopener">
            ${whatsappIcon(18)}
          </a>
        </div>
      </div>
    </article>
  `).join('');

  // Re-trigger intersection observer for fade-in
  observeFadeElements();
}

/* ---------- Render: Product Detail ---------- */
function renderProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const container = document.getElementById('product-detail');
  if (!container || !productId) return;

  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) {
    container.innerHTML = '<p style="text-align:center;padding:40px;">Producto no encontrado.</p>';
    return;
  }

  // Update page title
  document.title = `${product.name} — Detalles con Amor`;

  container.innerHTML = `
    <div class="container">
      <a href="${HOME_PAGE}" class="back-link">← Volver al catálogo</a>

      <div class="product-detail-layout">
        <!-- Gallery -->
        <div class="product-gallery" id="product-gallery">
          <div class="gallery-main">
            <img id="gallery-main-img" src="${BASE_PATH}img/${product.images[0]}" alt="${product.name}" width="600" height="800">
          </div>
          ${product.images.length > 1 ? `
            <button class="gallery-arrow gallery-arrow--prev" onclick="galleryPrev()" aria-label="Imagen anterior">‹</button>
            <button class="gallery-arrow gallery-arrow--next" onclick="galleryNext()" aria-label="Imagen siguiente">›</button>
            <div class="gallery-dots" id="gallery-dots">
              ${product.images.map((_, i) => `<button class="gallery-dot ${i === 0 ? 'active' : ''}" onclick="galleryGoTo(${i})" aria-label="Ver imagen ${i + 1}"></button>`).join('')}
            </div>
          ` : ''}
          ${product.images.length > 1 ? `
            <div class="gallery-thumbs">
              ${product.images.map((img, i) => `
                <button class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="galleryGoTo(${i})">
                  <img src="${BASE_PATH}img/${img}" alt="${product.name} vista ${i + 1}" width="56" height="56" loading="lazy">
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- Info -->
        <div class="product-info">
          <span class="product-category-tag">${CATEGORIES.find(c => c.id === product.category)?.label || ''}</span>
          <h1>${product.name}</h1>
          <p class="product-price">${product.price}</p>
          <p class="product-description">${product.description}</p>

          <div class="product-includes">
            <h3>¿Qué incluye?</h3>
            <ul>
              ${product.includes.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>

          <a href="${getWhatsAppUrl(product.name)}" class="whatsapp-cta" target="_blank" rel="noopener">
            ${whatsappIcon(22)}
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <div class="related-section">
      <div class="container">
        <h2>También te puede gustar</h2>
        <div class="related-scroll" id="related-scroll"></div>
      </div>
    </div>
  `;

  // Related products
  const related = PRODUCTS.filter(p => p.id !== productId).sort(() => Math.random() - 0.5).slice(0, 6);
  const relatedContainer = document.getElementById('related-scroll');
  if (relatedContainer) {
    relatedContainer.innerHTML = related.map(p => `
      <article class="product-card" onclick="window.location.href='${PRODUCT_PAGE}?id=${p.id}'">
        <div class="product-card-img">
          <img src="${BASE_PATH}img/${p.images[0]}" alt="${p.name}" loading="lazy" width="220" height="293">
        </div>
        <div class="product-card-body">
          <h3 class="product-card-name">${p.name}</h3>
          <div class="product-card-footer">
            <span class="product-card-price">${p.price}</span>
          </div>
        </div>
      </article>
    `).join('');
  }

  // Setup gallery swipe
  setupGallerySwipe(product.images);
}

/* ---------- Gallery Controls ---------- */
let currentSlide = 0;
let galleryImages = [];

function galleryGoTo(index) {
  if (index < 0 || index >= galleryImages.length) return;
  currentSlide = index;
  const mainImg = document.getElementById('gallery-main-img');
  if (mainImg) {
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = `${BASE_PATH}img/${galleryImages[index]}`;
      mainImg.style.opacity = '1';
    }, 200);
  }
  // Update dots
  document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  // Update thumbs
  document.querySelectorAll('.gallery-thumb').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

function galleryPrev() {
  galleryGoTo(currentSlide <= 0 ? galleryImages.length - 1 : currentSlide - 1);
}

function galleryNext() {
  galleryGoTo(currentSlide >= galleryImages.length - 1 ? 0 : currentSlide + 1);
}

function setupGallerySwipe(images) {
  galleryImages = images;
  currentSlide = 0;

  const gallery = document.getElementById('product-gallery');
  if (!gallery) return;

  let startX = 0;
  let endX = 0;

  gallery.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].screenX;
  }, { passive: true });

  gallery.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].screenX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? galleryNext() : galleryPrev();
    }
  }, { passive: true });
}

/* ---------- Intersection Observer for Animations ---------- */
function observeFadeElements() {
  const els = document.querySelectorAll('.fade-in:not(.visible)');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ---------- Mobile Nav ---------- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');
  const closeBtn = document.querySelector('.nav-close-btn');

  if (!toggle || !links) return;

  function closeNav() {
    links.classList.remove('open');
    overlay?.classList.remove('open');
  }

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    overlay?.classList.toggle('open');
  });

  closeBtn?.addEventListener('click', closeNav);
  overlay?.addEventListener('click', closeNav);

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeNav);
  });
}

/* ---------- Floating WhatsApp ---------- */
function initFloatingWhatsApp() {
  const btn = document.querySelector('.floating-whatsapp');
  if (btn) {
    btn.href = getWhatsAppGeneral();
  }
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  renderProductDetail();
  initMobileNav();
  initFloatingWhatsApp();
  observeFadeElements();
});
