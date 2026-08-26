'use client';

import { useState, useEffect } from 'react';

// ==========================================
// BLOQUE 0: TIPOS Y DICCIONARIO DE IDIOMAS
// ==========================================
interface Product {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  price: number;
  category: string;
  images: string;
}

interface Partner {
  name: string;
  role: string;
  description: string;
  image: string;
}

interface Review {
  name: string;
  comment: string;
  rating: number;
}

const translations: Record<string, Record<string, string>> = {
  en: {
    catalog: "Catalog",
    aboutUs: "About Us",
    warehouse: "Warehouse",
    reviews: "Reviews",
    suggestions: "Suggestions",
    services: "Restoration & Orders",
    contact: "Contact",
    cart: "Cart",
    all: "All",
    chairs: "Chairs",
    tables: "Tables",
    backToCatalog: "← Back to catalog",
    viewDetails: "View Details",
    addToCart: "Add to cart",
    total: "Total:",
    checkout: "Proceed to Checkout",
    emptyCart: "Your cart is empty.",
    customerReviews: "Customer Reviews",
    shareExperience: "Share your experience about our products.",
    leaveReview: "Leave a Review",
    yourName: "Your Name",
    rating: "Rating",
    excellent: "★★★★★ (Excellent)",
    veryGood: "★★★★☆ (Very good)",
    regular: "★★★☆☆ (Regular)",
    bad: "★★☆☆☆ (Bad)",
    veryBad: "★☆☆☆☆ (Very bad)",
    yourComment: "Your Comment",
    publishReview: "Publish Review",
    requestsTitle: "Requests and Restorations",
    requestsDesc: "Do you want to restore your own furniture or request a custom design?",
    requestSuccess: "Request sent successfully! We will contact you soon.",
    email: "Email",
    serviceType: "Service Type",
    restoreOwn: "Restore own furniture",
    customFurniture: "Request custom furniture",
    detailsText: "Tell us the details",
    sendRequest: "Send Request",
    contactLocation: "Contact & Location",
    contactDesc: "Find us or contact our studio directly.",
    address: "Studio Address: Main Woodworking Street #123, City",
    phone: "Phone / WhatsApp: +1 (555) 123-4567",
    rights: "All rights reserved.",
    warehouseDesc: "Current stock management and inventory available in the workshop.",
    suggestionsDesc: "Send us your ideas or improvement proposals for the studio.",
  },
  es: {
    catalog: "Catálogo",
    aboutUs: "Quiénes somos",
    warehouse: "Almacén",
    reviews: "Opiniones",
    suggestions: "Sugerencias",
    services: "Restauración y Pedidos",
    contact: "Contacto",
    cart: "Carrito",
    all: "Todos",
    chairs: "Sillas",
    tables: "Mesas",
    backToCatalog: "← Volver al catálogo",
    viewDetails: "Ver Detalles",
    addToCart: "Añadir al carrito",
    total: "Total:",
    checkout: "Finalizar Compra (Pagar)",
    emptyCart: "Tu carrito está vacío.",
    customerReviews: "Opiniones de Clientes",
    shareExperience: "Comparte tu experiencia (positiva o negativa) sobre nuestros productos.",
    leaveReview: "Déjanos tu opinión",
    yourName: "Tu Nombre",
    rating: "Calificación",
    excellent: "★★★★★ (Excelente)",
    veryGood: "★★★★☆ (Muy bueno)",
    regular: "★★★☆☆ (Regular)",
    bad: "★★☆☆☆ (Malo)",
    veryBad: "★☆☆☆☆ (Muy malo)",
    yourComment: "Tu Comentario",
    publishReview: "Publicar Opinión",
    requestsTitle: "Solicitudes y Restauraciones",
    requestsDesc: "¿Quieres mandar a restaurar un mueble propio o solicitar un diseño específico a medida?",
    requestSuccess: "¡Solicitud enviada con éxito! Nos pondremos en contacto contigo para coordinar los detalles.",
    email: "Correo electrónico",
    serviceType: "Tipo de Servicio",
    restoreOwn: "Restauración de un mueble propio",
    customFurniture: "Solicitar un mueble personalizado / a medida",
    detailsText: "Cuéntanos los detalles",
    sendRequest: "Enviar Solicitud",
    contactLocation: "Contacto y Ubicación",
    contactDesc: "Encuéntranos o comunícate directamente con nuestro estudio.",
    address: "Dirección del Estudio: Calle Principal de Ebanistería #123, Ciudad",
    phone: "Teléfono / WhatsApp: +1 (555) 123-4567",
    rights: "Todos los derechos reservados.",
    warehouseDesc: "Gestión de stock e inventario actual de muebles disponibles en taller.",
    suggestionsDesc: "Envíanos tus ideas o propuestas de mejora para el estudio.",
  }
};

// ==========================================
// BLOQUE 1: COMPONENTE CARRITO LATERAL
// ==========================================
function CarritoLateral({ 
  isOpen, 
  onClose, 
  cart, 
  onRemoveFromCart,
  t
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  cart: Product[]; 
  onRemoveFromCart: (index: number) => void;
  t: Record<string, string>;
}) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end transition-opacity duration-300">
      <div className="bg-white w-full max-w-md h-full shadow-xl flex flex-col p-6 transform transition-transform duration-300">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-xl font-bold text-gray-800">{t.cart}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-lg font-bold">✕</button>
        </div>

        <div className="flex-grow overflow-y-auto py-4 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-10">{t.emptyCart}</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-3">
                  <img src={item.images} alt={item.title} className="w-16 h-16 object-contain rounded-md bg-gray-50" />
                  <div>
                    <h4 className="font-medium text-sm text-gray-800">{item.title}</h4>
                    <p className="text-indigo-600 font-semibold text-sm">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button onClick={() => onRemoveFromCart(index)} className="text-gray-400 hover:text-red-500 p-2">✕</button>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4 space-y-4">
          <div className="flex justify-between font-bold text-lg">
            <span>{t.total}</span>
            <span className="text-indigo-600">${totalPrice.toFixed(2)}</span>
          </div>
          <button 
            onClick={async () => {
              try {
                const response = await fetch('/api/checkout', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ items: cart }),
                });
                const data = await response.json();
                if (data.url) {
                  window.location.href = data.url;
                } else {
                  alert(data.error || 'Hubo un error al crear la sesión de pago.');
                }
              } catch (error) {
                console.error('Error:', error);
                alert('Ocurrió un error de red al procesar el pago.');
              }
            }}
            disabled={cart.length === 0}
            className={`w-full py-3 rounded-lg font-medium text-white transition ${
              cart.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {t.checkout}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// BLOQUE 2: COMPONENTE PRINCIPAL (HOME)
// ==========================================
export default function Home() {
  const [lang, setLang] = useState('en'); // Inglés por defecto
  const [activeSection, setActiveSection] = useState<string>('catalogo');
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Inicializar idioma predeterminado en inglés o recuperar preferencia
  useEffect(() => {
    const savedLang = localStorage.getItem('site_lang');
    if (!savedLang) {
      localStorage.setItem('site_lang', 'en');
      setLang('en');
    } else {
      setLang(savedLang);
    }
  }, []);

  const changeLanguage = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem('site_lang', newLang);
  };

  const t = translations[lang] || translations.en;

  const navigateTo = (section: string) => {
    setSelectedProduct(null);
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const [products] = useState<Product[]>([
    {
      id: 1,
      title: "Silla Luis XV Restaurada",
      description: "Silla de madera de haya restaurada y tapizada.",
      fullDescription: "Esta exquisita silla estilo Luis XV ha sido cuidadosamente restaurada a mano.",
      price: 120.00,
      category: "Sillas",
      images: "/imagen1.jpg.jfif"
    },
    {
      id: 2,
      title: "Consola de entrada",
      description: "Mueble consola de estilo moderno, perfecto para el recibidor.",
      fullDescription: "Consola minimalista de líneas rectas, fabricada en madera de roble macizo.",
      price: 150.00,
      category: "Mesas",
      images: "imagen2.jpg.jfif"
    }
  ]);

  const partners: Partner[] = [
    { name: "Emil Carrasquel", role: "Co-fundador", description: "Especialista en ebanistería.", image: "/emil.jpg" },
    { name: "Federica Delcuratolo", role: "Co-fundadora", description: "Arquitecta enfocada en diseño.", image: "/federica.jpg" }
  ];

  const [reviews, setReviews] = useState<Review[]>([
    { name: "Sofía Martínez", comment: "Excelente calidad en cada detalle.", rating: 5 }
  ]);

  const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 5 });
  const [requestForm, setRequestForm] = useState({ name: '', email: '', type: 'Restauración', message: '' });
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const filteredProducts = selectedCategory === "Todos" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => setCart(prev => [...prev, product]);
  const handleRemoveFromCart = (indexToRemove: number) => setCart(prev => prev.filter((_, index) => index !== indexToRemove));
  
  const viewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between relative">
      
      {/* ========================================== */}
      {/* BLOQUE 3: CABECERA Y SELECTOR DE IDIOMA     */}
      {/* ========================================== */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-40">
        <button onClick={() => navigateTo('catalogo')} className="flex items-center gap-2">
           <img src="/logo.jpg" alt="Logo" className="h-16 w-auto object-contain" />
        </button>

        <div className="flex items-center gap-6">
          {/* Navegación por clics fijos sin scroll */}
          <nav className="hidden md:flex items-center gap-2">
            <button onClick={() => navigateTo('catalogo')} className={`text-sm font-medium px-3 py-1.5 rounded-lg transition ${activeSection === 'catalogo' && !selectedProduct ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-600 hover:text-indigo-600'}`}>{t.catalog}</button>
            <button onClick={() => navigateTo('quienes-somos')} className={`text-sm font-medium px-3 py-1.5 rounded-lg transition ${activeSection === 'quienes-somos' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-600 hover:text-indigo-600'}`}>{t.aboutUs}</button>
            <button onClick={() => navigateTo('almacen')} className={`text-sm font-medium px-3 py-1.5 rounded-lg transition ${activeSection === 'almacen' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-600 hover:text-indigo-600'}`}>{t.warehouse}</button>
            <button onClick={() => navigateTo('comentarios')} className={`text-sm font-medium px-3 py-1.5 rounded-lg transition ${activeSection === 'comentarios' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-600 hover:text-indigo-600'}`}>{t.reviews}</button>
            <button onClick={() => navigateTo('sugerencias')} className={`text-sm font-medium px-3 py-1.5 rounded-lg transition ${activeSection === 'sugerencias' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-600 hover:text-indigo-600'}`}>{t.suggestions}</button>
            <button onClick={() => navigateTo('solicitudes')} className={`text-sm font-medium px-3 py-1.5 rounded-lg transition ${activeSection === 'solicitudes' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-600 hover:text-indigo-600'}`}>{t.services}</button>
            <button onClick={() => navigateTo('contacto')} className={`text-sm font-medium px-3 py-1.5 rounded-lg transition ${activeSection === 'contacto' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-600 hover:text-indigo-600'}`}>{t.contact}</button>
          </nav>

          {/* Selector de Idioma */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg text-xs font-bold">
            <button 
              onClick={() => changeLanguage('en')} 
              className={`px-2 py-1 rounded transition ${lang === 'en' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}
            >
              EN
            </button>
            <button 
              onClick={() => changeLanguage('es')} 
              className={`px-2 py-1 rounded transition ${lang === 'es' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}
            >
              ES
            </button>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition relative"
          >
            <span>{t.cart} ({cart.length})</span>
          </button>
        </div>
      </header>

      {/* ========================================== */}
      {/* BLOQUE 4: CONTENIDO DINÁMICO POR CLICS     */}
      {/* ========================================== */}
      <main className="max-w-6xl mx-auto px-4 py-12 flex-grow w-full">
        {selectedProduct ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <button onClick={() => setSelectedProduct(null)} className="text-indigo-600 hover:text-indigo-800 font-medium mb-8 flex items-center gap-2 transition">
              {t.backToCatalog}
            </button>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="rounded-xl overflow-hidden shadow-md bg-gray-50 p-6 flex items-center justify-center border">
                <img src={selectedProduct.images} alt={selectedProduct.title} className="w-full h-80 object-contain rounded-lg" />
              </div>
              <div>
                <span className="text-sm text-indigo-600 font-semibold uppercase tracking-wider">{selectedProduct.category}</span>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">{selectedProduct.title}</h1>
                <p className="text-2xl font-bold text-indigo-600 mt-4">${selectedProduct.price.toFixed(2)}</p>
                <p className="text-gray-600 mt-6 leading-relaxed">{selectedProduct.fullDescription}</p>
                <button onClick={() => handleAddToCart(selectedProduct)} className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition">
                  {t.addToCart}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {activeSection === 'catalogo' && (
              <section className="mb-16">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-gray-900">{t.catalog}</h2>
                  <div className="flex justify-center gap-2 mt-6">
                    {["Todos", "Sillas", "Mesas"].map((category) => (
                      <button key={category} onClick={() => setSelectedCategory(category)} className={`px-5 py-2 rounded-full text-sm font-medium transition ${selectedCategory === category ? "bg-indigo-600 text-white" : "bg-white text-gray-600 border"}`}>
                        {category === "Todos" ? t.all : category === "Sillas" ? t.chairs : t.tables}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border p-6 flex flex-col justify-between">
                      <div className="h-64 overflow-hidden bg-gray-50 cursor-pointer p-4 flex items-center justify-center" onClick={() => viewProductDetails(product)}>
                        <img src={product.images} alt={product.title} className="w-full h-full object-contain" />
                      </div>
                      <h3 onClick={() => viewProductDetails(product)} className="font-bold text-xl text-gray-900 cursor-pointer mt-4">{product.title}</h3>
                      <p className="text-indigo-600 font-bold text-xl mt-2">${product.price.toFixed(2)}</p>
                      <button onClick={() => handleAddToCart(product)} className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-xl font-medium">{t.addToCart}</button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeSection === 'quienes-somos' && (
              <section className="bg-white rounded-2xl p-8 shadow-sm mb-16">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">{t.aboutUs}</h2>
                <div className="grid md:grid-cols-2 gap-10">
                  {partners.map((partner, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-6 border rounded-2xl">
                      <img src={partner.image} alt={partner.name} className="w-32 h-32 rounded-full object-cover mb-4" />
                      <h3 className="text-xl font-bold text-gray-900">{partner.name}</h3>
                      <p className="text-indigo-600 font-medium text-sm">{partner.role}</p>
                      <p className="text-gray-600 text-sm mt-3">{partner.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeSection === 'almacen' && (
              <section className="bg-white rounded-2xl p-8 shadow-sm mb-16 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.warehouse}</h2>
                <p className="text-gray-600">{t.warehouseDesc}</p>
              </section>
            )}

            {activeSection === 'comentarios' && (
              <section className="my-16 bg-white p-8 rounded-2xl shadow-sm border">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t.customerReviews}</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {reviews.map((rev, idx) => (
                    <div key={idx} className="p-6 bg-gray-50 rounded-xl border">
                      <p className="italic text-gray-700 mb-2">"{rev.comment}"</p>
                      <p className="font-bold text-sm">— {rev.name}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeSection === 'sugerencias' && (
              <section className="bg-white rounded-2xl p-8 shadow-sm mb-16 max-w-xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.suggestions}</h2>
                <p className="text-gray-600 mb-4">{t.suggestionsDesc}</p>
              </section>
            )}

            {activeSection === 'solicitudes' && (
              <section className="bg-white rounded-2xl p-8 shadow-sm border max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">{t.requestsTitle}</h2>
                <p className="text-center text-gray-600 mb-6">{t.requestsDesc}</p>
                <form onSubmit={(e) => { e.preventDefault(); setRequestSubmitted(true); }} className="space-y-4">
                  {requestSubmitted && <div className="p-3 bg-green-50 text-green-700 rounded-lg text-center">{t.requestSuccess}</div>}
                  <input type="text" placeholder={t.yourName} required value={requestForm.name} onChange={e => setRequestForm({...requestForm, name: e.target.value})} className="w-full border p-2.5 rounded-xl" />
                  <input type="email" placeholder={t.email} required value={requestForm.email} onChange={e => setRequestForm({...requestForm, email: e.target.value})} className="w-full border p-2.5 rounded-xl" />
                  <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium">{t.sendRequest}</button>
                </form>
              </section>
            )}

            {activeSection === 'contacto' && (
              <section className="bg-white rounded-2xl p-8 shadow-sm border max-w-2xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.contactLocation}</h2>
                <p className="text-gray-600 mb-2"><strong>{t.address}</strong></p>
                <p className="text-gray-600 mb-2"><strong>{t.phone}</strong></p>
              </section>
            )}
          </>
        )}
      </main>

      {/* ========================================== */}
      {/* BLOQUE 5: PIE DE PÁGINA                    */}
      {/* ========================================== */}
      <footer className="bg-white border-t py-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Muebles Restaurados. {t.rights}</p>
      </footer>

      <CarritoLateral 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        onRemoveFromCart={handleRemoveFromCart}
        t={t}
      />
    </div>
  );
}