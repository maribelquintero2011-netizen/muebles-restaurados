'use client';

import { useState } from 'react';

// Definición del tipo de producto según tu estructura
interface Product {
  title: string;
  price: number;
  images: string;
}

// Componente del Carrito Lateral con la pasarela de pagos integrada
export function CarritoLateral({ 
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
  const [isLoading, setIsLoading] = useState(false);

import { useState } from 'react';

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

export default function Home() {
  const [products] = useState<Product[]>([
    {
      id: 1,
      title: "Silla Luis XV Restaurada",
      description: "Silla de madera de haya restaurada y tapizada.",
      fullDescription: "Esta exquisita silla estilo Luis XV ha sido cuidadosamente restaurada a mano. El marco de madera de haya maciza ha sido lijado y teñido en un tono nogal oscuro, y tapizada con un lujoso terciopelo azul marino. Ideal para dar un toque de elegancia clásica a cualquier rincón de tu hogar.",
      price: 120.00,
      category: "Sillas",
      images: "/silla-restaurada.jpg"
    },
    {
      id: 2,
      title: "Consola de entrada",
      description: "Mueble consola de estilo moderno, perfecto para el recibidor.",
      fullDescription: "Consola minimalista de líneas rectas, fabricada en madera de roble macizo con acabado natural. Cuenta con dos cajones frontales sin tiradores para mantener un diseño limpio. Perfecta para colocar en la entrada y organizar llaves y correo con estilo.",
      price: 150.00,
      category: "Mesas",
      images: "/consola.jpg"
    },
    {
      id: 3,
      title: "Mesa de Centro Industrial",
      description: "Mesa elaborada con madera recuperada y estructura de metal.",
      fullDescription: "Robusta mesa de centro estilo industrial. El tablero está hecho de madera de pino recuperada con marcas e imperfecciones naturales que le dan carácter, sostenida por una estructura geométrica de acero negro mate. Un mueble con personalidad propia para tu salón.",
      price: 250.00,
      category: "Mesas",
      images: "/mesita.jpg"
    }
  ]);

  const partners: Partner[] = [
    {
      name: "Ana Martínez",
      role: "Co-fundadora & Restauradora Principal",
      description: "Especialista en ebanistería clásica y recuperación de texturas originales. Apasionada por mantener la esencia histórica de cada mueble adaptándolo a la estética contemporánea.",
      image: "/ana.jpg"
    },
    {
      name: "Carlos Ruiz",
      role: "Co-fundador & Diseñador Estructural",
      description: "Arquitecto enfocado en la integración de mobiliario dentro del espacio arquitectónico. Defiende el minimalismo funcional y la durabilidad de los materiales nobles.",
      image: "/carlos.jpg"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Estado para el formulario de diseño personalizado
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredProducts = selectedCategory === "Todos" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  const handleRemoveFromCart = (indexToRemove: number) => {
    setCart(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const viewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo(0, 0);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setFormSubmitted(true);
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between relative">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-40">
        <button onClick={closeProductDetails} className="text-2xl font-bold text-indigo-600 hover:text-indigo-700">
          Maravillería Studio
        </button>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-4">
            <a 
              href="#catalogo" 
              onClick={closeProductDetails} 
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
            >
              Catálogo
            </a>
            <a 
              href="#quienes-somos" 
              onClick={closeProductDetails} 
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
            >
              Quiénes somos
            </a>
            <a 
              href="#contacto" 
              onClick={closeProductDetails} 
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
            >
              Contacto
            </a>
          </nav>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Carrito ({cart.length})</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 flex-grow w-full">
        {selectedProduct ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <button onClick={closeProductDetails} className="text-indigo-600 hover:text-indigo-800 mb-8 flex items-center gap-2 font-medium">
              &larr; Volver al catálogo
            </button>
            
            <div className="grid md:grid-cols-2 gap-12">
              <img src={selectedProduct.images} alt={selectedProduct.title} className="w-full h-auto object-cover rounded-xl shadow-md" />
              
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-sm text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full font-medium">{selectedProduct.category}</span>
                  <h2 className="text-4xl font-extrabold text-gray-900 mt-3 mb-5">{selectedProduct.title}</h2>
                  <p className="text-gray-700 text-lg leading-relaxed">{selectedProduct.fullDescription}</p>
                </div>

                <div className="mt-10 border-t pt-8 flex items-center justify-between">
                  <p className="text-5xl font-extrabold text-indigo-600">${selectedProduct.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition transform hover:scale-105 shadow-md"
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Sección Quiénes somos / Los Socios */}
            <section id="quienes-somos" className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 mb-16 scroll-mt-24">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <span className="text-sm font-semibold tracking-wider text-indigo-600 uppercase">Filosofía y Estudio</span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">Los Socios y Arquitectos</h2>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                    Combinamos la precisión arquitectónica con el rescate artesanal para devolver la vida a piezas con historia, creando espacios y objetos atemporales.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  {partners.map((partner, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col items-center text-center justify-between">
                      <div className="w-full flex flex-col items-center">
                        <div className="w-32 h-32 mb-6 rounded-full overflow-hidden shadow-md border-4 border-white bg-gray-200">
                          <img 
                            src={partner.image} 
                            alt={partner.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{partner.name}</h3>
                        <p className="text-sm text-indigo-600 font-medium mb-4">{partner.role}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {partner.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Sección del Catálogo de Muebles */}
            <div id="catalogo" className="text-center mb-8 scroll-mt-24">
              <h2 className="text-3xl font-extrabold text-gray-900">Nuestros Muebles Restaurados</h2>
              <p className="mt-2 text-gray-600">Piezas únicas restauradas a mano para darle vida a tus espacios.</p>
            </div>

            <div className="flex justify-center gap-3 mb-10">
              {["Todos", "Sillas", "Mesas"].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white text-gray-600 border hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between transition hover:shadow-lg">
                  <div className="cursor-pointer" onClick={() => viewProductDetails(product)}>
                    <img src={product.images} alt={product.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-800">{product.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                      <p className="text-indigo-600 font-semibold mt-4 text-lg">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
                    >
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sección de Diseño Personalizado */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto my-12">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">¿Buscas un diseño personalizado?</h3>
              <p className="text-gray-600 text-center mb-6 text-sm">Contáctanos para restauraciones a medida o consultas especiales.</p>
              
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-center font-medium">
                  ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
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
                  <button 
                    type="submit" 
                    className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              )}
            </div>

            {/* Sección de Contacto (Teléfono y Dirección) */}
            <section id="contacto" className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-2xl mx-auto my-12 scroll-mt-24 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Información de Contacto</h3>
              <p className="text-gray-600 text-sm mb-6">Visítanos en nuestro estudio o comunícate con nosotros directamente.</p>
              
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center justify-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="font-medium">Calle Principal #123, Colonia Centro, Ciudad</p>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <p className="font-medium">+34 900 123 456</p>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Carrito Lateral */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end transition-opacity duration-300">
          <div className="bg-white w-full max-w-md h-full shadow-xl flex flex-col p-6 transform transition-transform duration-300">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xl font-bold text-gray-800">Tu Carrito</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700 text-lg font-bold">✕</button>
            </div>

            <div className="flex-grow overflow-y-auto py-4 space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-10">Tu carrito está vacío.</p>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <img src={item.images} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                      <div>
                        <h4 className="font-medium text-sm text-gray-800">{item.title}</h4>
                        <p className="text-indigo-600 font-semibold text-sm">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <button onClick={() => handleRemoveFromCart(index)} className="text-gray-400 hover:text-red-500 p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
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
      )}

      {/* Footer Completo */}
      <footer className="bg-white border-t py-8 px-6 text-gray-500 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
            <p className="font-bold text-gray-800 text-base">Maravillería Studio</p>
            <p className="text-xs text-gray-500 mt-1">Dando una segunda oportunidad a piezas únicas con historia.</p>
          </div>
          <div className="flex gap-6 font-medium">
            <a href="#catalogo" onClick={closeProductDetails} className="hover:text-indigo-600 transition">Catálogo</a>
            <button onClick={closeProductDetails} className="hover:text-indigo-600 transition">Inicio</button>
            <a href="#contacto" onClick={closeProductDetails} className="hover:text-indigo-600 transition">Contacto</a>
          </div>
          <div className="text-xs text-gray-400">
            &copy; 2026 Maravillería Studio. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Página Principal (Manteniendo toda tu estructura original de la tienda)
export default function Home() {
  // Aquí puedes dejar tu lógica de la tienda, estados del carrito principal, productos, etc.
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Tu barra de navegación o encabezado existente */}
      <header className="flex justify-between items-center p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Estudio Maravillería</h1>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium"
        >
          Carrito ({cart.length})
        </button>
      </header>

      {/* Contenido de la tienda / galería de muebles restaurados */}
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Catálogo</h2>
        {/* Aquí va el despliegue de tus productos de muebles restaurados */}
      </div>

      {/* Carrito Lateral Desplegable */}
      <CarritoLateral 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        onRemoveFromCart={handleRemoveFromCart} 
      />
    </main>
  );
}