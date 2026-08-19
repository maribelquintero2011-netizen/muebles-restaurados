'use client';

import { useState } from 'react';

// Definición de tipos
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

// Componente del Carrito Lateral
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
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  if (!isOpen) return null;

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
                  <img src={item.images} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <h4 className="font-medium text-sm text-gray-800">{item.title}</h4>
                    <p className="text-indigo-600 font-semibold text-sm">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button onClick={() => onRemoveFromCart(index)} className="text-gray-400 hover:text-red-500 p-2">
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
            onClick={() => window.location.href = 'https://wa.me/34600123456'}
            disabled={cart.length === 0}
            className={`w-full py-3 rounded-lg font-medium text-white transition ${
              cart.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Finalizar Compra (Pagar)
          </button>
        </div>
      </div>
    </div>
  );
}

// Página Principal
export default function Home() {
  // Productos (Se eliminó la Mesa de Centro Industrial)
  const [products] = useState<Product[]>([
    {
      id: 1,
      title: "Silla Luis XV Restaurada",
      description: "Silla de madera de haya restaurada y tapizada.",
      fullDescription: "Esta exquisita silla estilo Luis XV ha sido cuidadosamente restaurada a mano. El marco de madera de haya maciza ha sido lijado y teñido en un tono nogal oscuro, y tapizada con un lujoso terciopelo azul marino. Ideal para dar un toque de elegancia clásica a cualquier rincón de tu hogar.",
      price: 120.00,
      category: "Sillas",
      images: "/imagen1.jpg.jfif"
    },
    {
      id: 2,
      title: "Consola de entrada",
      description: "Mueble consola de estilo moderno, perfecto para el recibidor.",
      fullDescription: "Consola minimalista de líneas rectas, fabricada en madera de roble macizo con acabado natural. Cuenta con dos cajones frontales sin tiradores para mantener un diseño limpio. Perfecta para colocar en la entrada y organizar llaves y correo con estilo.",
      price: 150.00,
      category: "Mesas",
      images: "imagen2.jpg.jfif"
    }
  ]);

  // Socios con los nuevos nombres
  const partners: Partner[] = [
    {
      name: "Emil Carrasquel",
      role: "Co-fundador & Restaurador Principal",
      description: "Especialista en ebanistería clásica y recuperación de texturas originales. Apasionado por mantener la esencia histórica de cada mueble adaptándolo a la estética contemporánea.",
      image: "/emil.jpg"
    },
    {
      name: "Federica Delcuratolo",
      role: "Co-fundadora & Diseñadora Estructural",
      description: "Arquitecta enfocada en la integración de mobiliario dentro del espacio arquitectónico. Defiende el minimalismo funcional y la durabilidad de los materiales nobles.",
      image: "/federica.jpg"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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
      {/* Header modificado: Logo más grande, sin el texto de la marca */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-40">
        <button onClick={closeProductDetails} className="flex items-center gap-2">
           <img src="/logo.jpg" alt="Logo" className="h-16 w-auto object-contain" />
        </button>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-4">
            <a href="#catalogo" onClick={closeProductDetails} className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">Catálogo</a>
            <a href="#quienes-somos" onClick={closeProductDetails} className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">Quiénes somos</a>
            <a href="#contacto" onClick={closeProductDetails} className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">Contacto</a>
          </nav>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition relative"
          >
            <span>Carrito ({cart.length})</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 flex-grow w-full">
        {selectedProduct ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <button 
              onClick={closeProductDetails}
              className="text-indigo-600 hover:text-indigo-800 font-medium mb-8 flex items-center gap-2 transition"
            >
              &larr; Volver al catálogo
            </button>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="rounded-xl overflow-hidden shadow-md bg-gray-100">
                <img src={selectedProduct.images} alt={selectedProduct.title} className="w-full h-96 object-cover" />
              </div>
              <div>
                <span className="text-sm text-indigo-600 font-semibold uppercase tracking-wider">{selectedProduct.category}</span>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">{selectedProduct.title}</h1>
                <p className="text-2xl font-bold text-indigo-600 mt-4">${selectedProduct.price.toFixed(2)}</p>
                
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800">Descripción detallada</h3>
                  <p className="text-gray-600 mt-2 leading-relaxed">{selectedProduct.fullDescription}</p>
                </div>

                <button 
                  onClick={() => handleAddToCart(selectedProduct)}
                  className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition shadow-lg shadow-indigo-100"
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Sección Quiénes Somos con Nuevos Nombres */}
            <section id="quienes-somos" className="bg-white rounded-2xl p-8 shadow-sm mb-16">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">Filosofía y Estudio</span>
                <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Los Socios y Arquitectos</h2>
                <p className="text-gray-600 mt-4">Combinamos la precisión arquitectónica con el rescate artesanal para devolver la vida a piezas con historia, creando espacios y objetos atemporales.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-10 mt-12">
                {partners.map((partner, index) => (
                  <div key={index} className="flex flex-col items-center text-center p-6 border rounded-2xl hover:shadow-md transition">
                    <img src={partner.image} alt={partner.name} className="w-32 h-32 rounded-full object-cover shadow-md mb-4" />
                    <h3 className="text-xl font-bold text-gray-900">{partner.name}</h3>
                    <p className="text-indigo-600 font-medium text-sm mt-1">{partner.role}</p>
                    <p className="text-gray-600 text-sm mt-3 leading-relaxed">{partner.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Sección de Catálogo */}
            <section id="catalogo" className="mb-16">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900">Nuestros Muebles Restaurados</h2>
                <p className="text-gray-600 mt-2">Piezas únicas restauradas a mano para darle vida a tus espacios.</p>
                
                <div className="flex justify-center gap-2 mt-6">
                  {["Todos", "Sillas", "Mesas"].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                        selectedCategory === category
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                          : "bg-white text-gray-600 border hover:bg-gray-50"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
                    <div>
                      <div className="h-64 overflow-hidden bg-gray-100 cursor-pointer" onClick={() => viewProductDetails(product)}>
                        <img src={product.images} alt={product.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                      </div>
                      <div className="p-6">
                        <h3 onClick={() => viewProductDetails(product)} className="font-bold text-xl text-gray-900 cursor-pointer hover:text-indigo-600 transition">{product.title}</h3>
                        <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                        <p className="text-indigo-600 font-bold text-xl mt-4">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="p-6 pt-0">
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition shadow-sm"
                      >
                        Añadir al carrito
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Nueva Sección de Opiniones */}
            <section className="my-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Lo que dicen nuestros clientes</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 italic text-gray-700">
                  "La silla Luis XV superó mis expectativas. Se nota el amor y la dedicación en cada detalle de restauración."
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 italic text-gray-700">
                  "Excelente atención y piezas con una personalidad única que transformaron por completo la estética de mi recibidor."
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 italic text-gray-700">
                  "Gran profesionalismo por parte del equipo. Envío seguro y producto impecable. Totalmente recomendados."
                </div>
              </div>
            </section>

            {/* Sección de Contacto */}
            <section id="contacto" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Contacto</h2>
              <p className="text-center text-gray-600 mb-8">¿Tienes alguna duda o buscas una pieza personalizada? Escríbenos.</p>
              
              {formSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-center">
                  ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input 
                    type="text" 
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                  <input 
                    type="email" 
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="tucorreo@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                  <textarea 
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Cuéntanos qué necesitas..."
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition shadow-md shadow-indigo-100"
                >
                  Enviar mensaje
                </button>
              </form>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 mt-16 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Muebles Restaurados. Todos los derechos reservados.</p>
      </footer>

      {/* Carrito Lateral */}
      <CarritoLateral 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        onRemoveFromCart={handleRemoveFromCart} 
      />
    </div>
  );
}