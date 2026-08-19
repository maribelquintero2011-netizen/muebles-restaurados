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

  if (!isOpen) return null;

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Hubo un error al procesar el pago.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión con la pasarela de pagos.');
      setIsLoading(false);
    }
  };

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
            onClick={handleCheckout}
            disabled={cart.length === 0 || isLoading}
            className={`w-full py-3 rounded-lg font-medium text-white transition flex items-center justify-center gap-2 ${
              cart.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Procesando...</span>
              </>
            ) : (
              "Finalizar Compra"
            )}
          </button>
        </div>
      </div>
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