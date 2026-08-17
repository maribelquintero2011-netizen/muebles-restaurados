'use client';

import { useState, useEffect } from 'react';

// ==========================================
// 1. TIPOS Y DATOS ESTÁTICOS
// ==========================================
type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
  fullDescription: string;
  images: string;
};

type Partner = {
  name: string;
  role: string;
  description: string;
  image: string;
};

type Testimonial = {
  id: number;
  name: string;
  comment: string;
  rating: number;
  role: string;
};

const products: Product[] = [
  {
    id: 2,
    title: "Mesita Auxiliar",
    category: "Mesas",
    price: 120.00,
    description: "Mesita auxiliar compacta ideal para espacios minimalistas.",
    fullDescription: "Diseñada con líneas limpias y funcionales, esta mesita rescata materiales tradicionales para integrarlos perfectamente en ambientes modernos y sofisticados.",
    images: "/imagen2.jpg.jfif"
  },
  {
    id: 1,
    title: "Consola de Diseño",
    category: "Muebles",
    price: 280.00,
    description: "Consola elegante para recibidores o salas de estar.",
    fullDescription: "Pieza de mobiliario exclusiva que destaca por sus acabados artesanales y proporciones arquitectónicas cuidadosamente estudiadas.",
    images: "/imagen1.jpg.jfif"
  }
];

const partners: Partner[] = [
  {
    name: "Federica Delcuratolo",
    role: "Diseñadora & Co-fundadora",
    description: "Enfocada en el detalle, el diseño de objetos con alma y la integración armónica de la artesanía.",
    image: ""
  },
  {
    name: "Emilmar Carrasquel",
    role: "Arquitecta & Co-fundadora",
    description: "Especialista en proporciones espaciales, concepto arquitectónico y dirección creativa del estudio.",
    image: ""
  }
];

const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sofía Martínez",
    comment: "La calidad de la consola de diseño superó por completo mis expectativas. Le dio un toque arquitectónico increíble a la entrada de mi casa.",
    rating: 5,
    role: "Cliente verificada"
  },
  {
    id: 2,
    name: "Carlos Gómez",
    comment: "Excelente atención y los detalles de las piezas son únicos. Se nota el trabajo artesanal y el cuidado en cada proporción.",
    rating: 5,
    role: "Arquitecto"
  }
];

// ==========================================
// 2. COMPONENTES INDEPENDIENTES POR SECCIÓN
// ==========================================

function GoogleAnalyticsScript() {
  // Reemplaza "G-3YSV55FZ5" con tu ID de Google Analytics cuando crees tu cuenta
  const GA_MEASUREMENT_ID = "G-TUS-CODIGO";

  useEffect(() => {
    // Inyectar script de Google Analytics de forma dinámica en el navegador
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}');
    `;
    document.head.appendChild(script2);
  }, []);

  return null;
}

function Header({ cartCount, onOpenCart, onCloseDetails }: { cartCount: number; onOpenCart: () => void; onCloseDetails: () => void }) {
  return (
    <header className="bg-white shadow-sm py-3 px-6 flex justify-between items-center sticky top-0 z-40">
      <button onClick={onCloseDetails} className="flex items-center hover:opacity-80 transition">
        <img src="/logo.jpg" alt="Maravillería Studio" className="h-16 w-auto object-contain" />
      </button>

      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-4">
          <a href="#catalogo" onClick={onCloseDetails} className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">Catálogo</a>
          <a href="#quienes-somos" onClick={onCloseDetails} className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">Quiénes somos</a>
          <a href="#opiniones" onClick={onCloseDetails} className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">Opiniones</a>
          <a href="#contacto" onClick={onCloseDetails} className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">Contacto</a>
        </nav>
        

        <button 
          onClick={onOpenCart}
          className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition relative"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Carrito ({cartCount})</span>
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-white rounded-2xl p-8 md:p-16 shadow-sm border border-gray-100 mb-16 grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6 text-center md:text-left">
        <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full">
          Estudio de Arquitectura y Diseño
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Arquitectura, diseño y objetos reimaginados.
        </h1>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          Piezas exclusivas creadas con alma, visión artesanal y proporciones arquitectónicas cuidadosamente estudiadas para transformar tus espacios.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
          <a 
            href="#catalogo" 
            className="bg-indigo-600 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-indigo-700 transition shadow-md text-center"
          >
            Ver Catálogo
          </a>
          <a 
            href="#quienes-somos" 
            className="bg-gray-100 text-gray-700 font-medium px-8 py-3.5 rounded-xl hover:bg-gray-200 transition text-center"
          >
            Conócenos
          </a>
        </div>
      </div>
      
      <div className="relative w-full h-80 md:h-[400px] rounded-2xl overflow-hidden shadow-md bg-gray-100 flex items-center justify-center">
        <img 
          src="/imagen1.jpg.jfif" 
          alt="Maravillería Studio Portada" 
          className="w-full h-full object-contain p-4" 
        />
      </div>
    </section>
  );
}

function QuienesSomos() {
  return (
    <section id="quienes-somos" className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 mb-16 scroll-mt-24">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="text-sm font-semibold tracking-wider text-indigo-600 uppercase">Filosofía y Estudio</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">Las Arquitectas y Fundadoras</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        {partners.map((partner, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col items-center text-center">
            <div className="w-32 h-32 mb-6 rounded-full overflow-hidden shadow-md border-4 border-white bg-gray-200 flex items-center justify-center">
              {partner.image ? (
                <img src={partner.image} alt={partner.name} className="w-full h-full object-cover rounded-full" />
              ) : (
                <span className="text-gray-400 text-xs font-medium">Espacio para foto</span>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{partner.name}</h3>
            <p className="text-sm text-indigo-600 font-medium mb-4">{partner.role}</p>
            <p className="text-gray-600 text-sm">{partner.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Catalogo({ 
  selectedCategory, 
  setSelectedCategory, 
  filteredProducts, 
  onViewDetails, 
  onAddToCart 
}: { 
  selectedCategory: string; 
  setSelectedCategory: (cat: string) => void; 
  filteredProducts: Product[]; 
  onViewDetails: (p: Product) => void; 
  onAddToCart: (p: Product) => void; 
}) {
  return (
    <div id="catalogo" className="scroll-mt-24">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Objetos, Reimaginados</h2>
        <p className="mt-2 text-gray-600">Explora nuestras colecciones exclusivas de diseño y objetos reimaginados.</p>
      </div>

      <div className="flex justify-center gap-3 mb-10">
        {["Todos", "Mesas", "Muebles"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === category ? "bg-indigo-600 text-white shadow-md" : "bg-white text-gray-600 border hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="cursor-pointer" onClick={() => onViewDetails(product)}>
              <img src={product.images} alt={product.title} className="w-full h-64 object-contain bg-gray-50 p-2" />
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800">{product.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                <p className="text-indigo-600 font-semibold mt-4 text-xl">${product.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button onClick={() => onAddToCart(product)} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition">
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SeccionOpiniones() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', comment: '', role: 'Cliente' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const reviewToAdd: Testimonial = {
      id: Date.now(),
      name: newReview.name,
      comment: newReview.comment,
      rating: 5,
      role: newReview.role
    };

    setTestimonials([reviewToAdd, ...testimonials]);
    setNewReview({ name: '', comment: '', role: 'Cliente' });
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="opiniones" className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-4xl mx-auto my-16 scroll-mt-24">
      <div className="text-center mb-10">
        <span className="text-sm font-semibold tracking-wider text-indigo-600 uppercase">Testimonios</span>
        <h2 className="text-3xl font-extrabold text-gray-900 mt-2 mb-2">Lo que dicen nuestros clientes</h2>
        <p className="text-gray-600 text-sm">Experiencias y opiniones sobre nuestras piezas de diseño.</p>
      </div>

      {submitted && (
        <div className="mb-8 bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-center font-medium">
          ¡Muchas gracias por tu opinión! Se ha publicado correctamente.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-gray-50 border border-gray-100 p-6 rounded-xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex text-yellow-400 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm italic mb-4">&quot;{t.comment}&quot;</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
              <p className="text-xs text-indigo-600 font-medium">{t.role}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        {!showForm ? (
          <button 
            onClick={() => setShowForm(true)}
            className="bg-indigo-50 text-indigo-600 border border-indigo-200 font-medium px-6 py-2.5 rounded-xl hover:bg-indigo-100 transition text-sm"
          >
            Dejar una opinión
          </button>
        ) : (
          <form onSubmit={handleSubmitReview} className="bg-gray-50 border border-gray-200 p-6 rounded-xl max-w-lg mx-auto text-left space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-900">Escribe tu reseña</h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-sm">✕ Cancelar</button>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Tu Nombre</label>
              <input 
                type="text" 
                required
                value={newReview.name}
                onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                placeholder="Ej. Ana Pérez"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Tu Opinión</label>
              <textarea 
                rows={3} 
                required
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                placeholder="¿Qué te pareció el producto?"
              />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition text-sm">
              Publicar Opinión
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function DetalleProducto({ product, onClose, onAddToCart }: { product: Product; onClose: () => void; onAddToCart: (p: Product) => void }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <button onClick={onClose} className="text-indigo-600 hover:text-indigo-800 mb-8 font-medium">
        &larr; Volver al catálogo
      </button>
      <div className="grid md:grid-cols-2 gap-12">
        <img src={product.images} alt={product.title} className="w-full h-auto object-contain bg-gray-50 p-4 rounded-xl shadow-md" />
        <div>
          <span className="text-sm text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full font-medium">{product.category}</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-3 mb-5">{product.title}</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{product.fullDescription}</p>
          <div className="mt-10 border-t pt-8 flex items-center justify-between">
            <p className="text-5xl font-extrabold text-indigo-600">${product.price.toFixed(2)}</p>
            <button onClick={() => onAddToCart(product)} className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition">
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DisenoPersonalizado() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto my-12">
      <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">¿Buscas un diseño personalizado?</h3>
      <p className="text-gray-600 text-center mb-6 text-sm">Contáctanos para proyectos de arquitectura, restauraciones a medida o consultas especiales.</p>
      
      {formSubmitted ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-center font-medium">
          ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input 
              type="text" 
              required
              value={contactForm.name}
              onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input 
              type="email" 
              required
              value={contactForm.email}
              onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="tu@correo.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
            <textarea 
              rows={3} 
              required
              value={contactForm.message}
              onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Cuéntanos sobre tu proyecto o duda..."
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition">
            Enviar Mensaje
          </button>
        </form>
      )}
    </div>
  );
}

function Contacto() {
  return (
    <section id="contacto" className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-2xl mx-auto my-12 scroll-mt-24 text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Información de Contacto</h3>
      <p className="text-gray-600 text-sm mb-6">Visítanos en nuestro estudio o comunícate con nosotros directamente.</p>
      
      <div className="space-y-4 text-gray-700">
        <div className="flex items-center justify-center gap-3">
          <p className="font-medium">Calle Principal #123, Colonia Centro, Ciudad</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <p className="font-medium">+34 900 123 456</p>
        </div>
      </div>
    </section>
  );
}

function BotonWhatsApp() {
  const numeroWhatsApp = "34900123456";
  const mensajePredeterminado = "Hola, me interesa obtener más información sobre las piezas de Maravillería Studio.";
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajePredeterminado)}`;

  return (
    <a
      href={urlWhatsApp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 flex items-center justify-center hover:scale-110 group"
      aria-label="Contactar por WhatsApp"
    >
      <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out text-sm font-semibold px-0 group-hover:px-2">
        ¡Escríbenos!
      </span>
    </a>
  );
}

function CarritoLateral({ 
  isOpen, 
  onClose, 
  cart, 
  onRemoveFromCart 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  cart: Product[]; 
  onRemoveFromCart: (index: number) => void; 
}) {
  if (!isOpen) return null;

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end transition-opacity duration-300">
      <div className="bg-white w-full max-w-md h-full shadow-xl flex flex-col p-6 transform transition-transform duration-300">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-xl font-bold text-gray-800">Tu Carrito</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-lg font-bold">✕</button>
        </div>

        <div className="flex-grow overflow-y-auto py-4 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Tu carrito está vacío.</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-3">
                  <img src={item.images} alt={item.title} className="w-16 h-16 object-contain bg-gray-50 rounded-md" />
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

        <div className="border-t pt-4">
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total:</span>
            <span className="text-indigo-600">${totalPrice.toFixed(2)}</span>
          </div>
          <button 
            onClick={() => alert('¡Gracias por su compra en Maravillería Studio!')}
            disabled={cart.length === 0}
            className={`w-full py-3 rounded-lg font-medium text-white transition ${
              cart.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t py-8 px-6 text-gray-500 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div>
          <p className="font-bold text-gray-800 text-base">Maravillería Studio</p>
          <p className="text-xs text-gray-500 mt-1">Objects, Reimagined.</p>
        </div>
        <div className="text-xs text-gray-400">
          &copy; 2026 Maravillería Studio. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

// ==========================================
// 3. COMPONENTE PRINCIPAL (HOME)
// ==========================================
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);

  const filteredProducts = selectedCategory === "Todos" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  const handleRemoveFromCart = (indexToRemove: number) => {
    setCart(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const viewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo(0, 0);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between relative">
      {/* Script de analíticas integrado */}
      <GoogleAnalyticsScript />

      <Header 
        cartCount={cart.length} 
        onOpenCart={() => setIsCartOpen(true)} 
        onCloseDetails={closeProductDetails} 
      />

      <main className="max-w-6xl mx-auto px-4 py-12 flex-grow w-full">
        {selectedProduct ? (
          <DetalleProducto 
            product={selectedProduct} 
            onClose={closeProductDetails} 
            onAddToCart={handleAddToCart} 
          />
        ) : (
          <>
            <Hero />
            <QuienesSomos />
            <Catalogo 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              filteredProducts={filteredProducts}
              onViewDetails={viewProductDetails}
              onAddToCart={handleAddToCart}
            />
            <SeccionOpiniones />
            <DisenoPersonalizado />
            <Contacto />
          </>
        )}
      </main>

      <CarritoLateral 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        onRemoveFromCart={handleRemoveFromCart} 
      />

      <BotonWhatsApp />

      <Footer />
    </div>
  );
}