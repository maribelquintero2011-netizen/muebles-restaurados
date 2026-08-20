'use client';

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

interface Review {
  name: string;
  comment: string;
  rating: number;
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
                  <img src={item.images} alt={item.title} className="w-16 h-16 object-contain rounded-md bg-gray-50" />
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

        <div className="border-t pt-4 space-y-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
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
            Finalizar Compra (Pagar)
          </button>
        </div>
      </div>
    </div>
  );
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

  const [reviews, setReviews] = useState<Review[]>([
    { name: "Sofía Martínez", comment: "La silla Luis XV superó mis expectativas. Se nota el amor y la dedicación en cada detalle.", rating: 5 },
    { name: "Carlos Ruiz", comment: "El acabado fue bueno, aunque el envío tardó un poco más de lo esperado.", rating: 3 }
  ]);

  const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 5 });
  const [requestForm, setRequestForm] = useState({ name: '', email: '', type: 'Restauración', message: '' });
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requestForm.name && requestForm.email && requestForm.message) {
      setRequestSubmitted(true);
      setRequestForm({ name: '', email: '', type: 'Restauración', message: '' });
      setTimeout(() => setRequestSubmitted(false), 5000);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      setReviews([newReview, ...reviews]);
      setNewReview({ name: '', comment: '', rating: 5 });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between relative">
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-40">
        <button onClick={closeProductDetails} className="flex items-center gap-2">
           <img src="/logo.jpg" alt="Logo" className="h-16 w-auto object-contain" />
        </button>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-4">
            <a href="#catalogo" onClick={closeProductDetails} className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">Catálogo</a>
            <a href="#quienes-somos" onClick={closeProductDetails} className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">Quiénes somos</a>
            <a href="#comentarios" onClick={closeProductDetails} className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">Opiniones</a>
            <a href="#solicitudes" onClick={closeProductDetails} className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">Restauración y Pedidos</a>
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
              <div className="rounded-xl overflow-hidden shadow-md bg-gray-50 p-6 flex items-center justify-center border">
                <img src={selectedProduct.images} alt={selectedProduct.title} className="w-full h-80 object-contain rounded-lg" />
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
                      {/* Contenedor con object-contain y fondo gris claro sutil para que la imagen se vea completa perfectamente */}
                      <div className="h-64 overflow-hidden bg-gray-50 cursor-pointer p-4 flex items-center justify-center" onClick={() => viewProductDetails(product)}>
                        <img src={product.images} alt={product.title} className="w-full h-full object-contain hover:scale-105 transition duration-500" />
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

            <section id="comentarios" className="my-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Opiniones de Clientes</h2>
              <p className="text-center text-gray-600 mb-10">Comparte tu experiencia (positiva o negativa) sobre nuestros productos.</p>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {reviews.map((rev, idx) => (
                  <div key={idx} className="p-6 bg-gray-50 rounded-xl border border-gray-100 flex flex-col justify-between shadow-sm">
                    <div>
                      <div className="text-yellow-500 mb-2">
                        {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                      </div>
                      <p className="italic text-gray-700 text-sm mb-4">"{rev.comment}"</p>
                    </div>
                    <p className="font-bold text-gray-900 text-sm">— {rev.name}</p>
                  </div>
                ))}
              </div>

              <div className="max-w-xl mx-auto bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Déjanos tu opinión</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tu Nombre</label>
                    <input 
                      type="text"
                      required
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="Ej. Roberto Sánchez"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Calificación</label>
                    <select 
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value={5}>★★★★★ (Excelente)</option>
                      <option value={4}>★★★★☆ (Muy bueno)</option>
                      <option value={3}>★★★☆☆ (Regular)</option>
                      <option value={2}>★★☆☆☆ (Malo)</option>
                      <option value={1}>★☆☆☆☆ (Muy malo)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tu Comentario</label>
                    <textarea 
                      rows={3}
                      required
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="Cuéntanos qué te pareció el producto..."
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition shadow-sm"
                  >
                    Publicar Opinión
                  </button>
                </form>
              </div>
            </section>

            <section id="solicitudes" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Solicitudes y Restauraciones</h2>
              <p className="text-center text-gray-600 mb-8">¿Quieres mandar a restaurar un mueble propio o solicitar un diseño específico a medida?</p>
              
              {requestSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-center">
                  ¡Solicitud enviada con éxito! Nos pondremos en contacto contigo para coordinar los detalles.
                </div>
              )}

              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input 
                    type="text" 
                    required
                    value={requestForm.name}
                    onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                    className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                  <input 
                    type="email" 
                    required
                    value={requestForm.email}
                    onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                    className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="tucorreo@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Servicio</label>
                  <select 
                    value={requestForm.type}
                    onChange={(e) => setRequestForm({ ...requestForm, type: e.target.value })}
                    className="w-full border rounded-xl px-4 py-2.5 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Restauración">Restauración de un mueble propio</option>
                    <option value="Personalizado">Solicitar un mueble personalizado / a medida</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cuéntanos los detalles</label>
                  <textarea 
                    rows={4}
                    required
                    value={requestForm.message}
                    onChange={(e) => setRequestForm({ ...requestForm, message: e.target.value })}
                    className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Describe las medidas, el estado del mueble o lo que necesitas..."
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition shadow-md shadow-indigo-100"
                >
                  Enviar Solicitud
                </button>
              </form>
            </section>

            <section id="contacto" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Contacto y Ubicación</h2>
              <p className="text-gray-600 mb-8">Encuéntranos o comunícate directamente con nuestro estudio.</p>
              
              <div className="space-y-4 text-gray-700">
                <p><strong>Dirección del Estudio:</strong> Calle Principal de Ebanistería #123, Ciudad</p>
                <p><strong>Teléfono / WhatsApp:</strong> +1 (555) 123-4567</p>
                <p><strong>Correo electrónico:</strong> contacto@maravilleria.com</p>
                <div className="pt-4 flex justify-center gap-6">
                  <a href="#" className="text-indigo-600 font-medium hover:underline">Instagram</a>
                  <a href="#" className="text-indigo-600 font-medium hover:underline">Facebook</a>
                  <a href="#" className="text-indigo-600 font-medium hover:underline">Pinterest</a>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 py-8 mt-16 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Muebles Restaurados. Todos los derechos reservados.</p>
      </footer>

      <CarritoLateral 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        onRemoveFromCart={handleRemoveFromCart} 
      />
    </div>
  );
}