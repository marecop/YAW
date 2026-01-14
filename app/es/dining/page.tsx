import React from 'react';
import { Utensils, Coffee, Wine, ChefHat, Leaf, Clock } from 'lucide-react';
import Image from 'next/image';

export default function DiningPage() {
  const menuCategories = [
    {
      title: "Clase Económica",
      description: "Sabores del mundo con ingredientes frescos y locales.",
      features: ["Opción de plato principal caliente", "Bebidas de cortesía", "Menú infantil disponible"],
      image: "/images/dining-economy.jpg",
      color: "bg-blue-50"
    },
    {
      title: "Premium Economy",
      description: "Una experiencia culinaria mejorada con más opciones y presentación.",
      features: ["Bebida de bienvenida", "Selección de 3 platos principales", "Vajilla de porcelana"],
      image: "/images/dining-premium.jpg",
      color: "bg-purple-50"
    },
    {
      title: "Business Class",
      description: "Alta cocina en el cielo, diseñada por chefs con estrellas Michelin.",
      features: ["Servicio a la carta 'Cene cuando quiera'", "Amplia selección de vinos premium", "Platos exclusivos de autor"],
      image: "/images/dining-business.jpg",
      color: "bg-ya-yellow-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/images/dining-hero.jpg')" }} 
        >
             {/* Fallback color */}
             <div className="w-full h-full bg-gray-800" />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-semibold mb-6 border border-white/20">
            <ChefHat className="w-4 h-4" />
            Cocina Global
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-serif italic">
            Sabor en las Nubes
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Un viaje culinario que comienza mucho antes de llegar a su destino.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Filosofía Culinaria</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Creemos que la comida a bordo debe ser una experiencia memorable. Trabajamos con agricultores locales y chefs de renombre para crear menús que reflejen la cultura de nuestros destinos, utilizando siempre ingredientes de temporada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fresco y Sostenible</h3>
              <p className="text-gray-600">Ingredientes de origen responsable, priorizando productos locales y orgánicos.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wine className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Maridaje Perfecto</h3>
              <p className="text-gray-600">Nuestros sommeliers seleccionan vinos que mantienen su carácter en altitud.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Coffee className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Café de Especialidad</h3>
              <p className="text-gray-600">Disfrute de granos recién molidos y mezclas exclusivas preparadas por baristas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {menuCategories.map((cat, index) => (
              <div key={cat.title} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 space-y-6">
                  <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase ${cat.color.replace('bg-', 'text-').replace('50', '600')}`}>
                    {cat.title}
                  </span>
                  <h2 className="text-4xl font-bold text-gray-900">{cat.title}</h2>
                  <p className="text-xl text-gray-600 leading-relaxed">{cat.description}</p>
                  <ul className="space-y-3">
                    {cat.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-ya-yellow-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-4 text-ya-yellow-600 font-bold hover:text-ya-yellow-700 transition-colors">
                    Ver Menú de Ejemplo →
                  </button>
                </div>
                <div className="flex-1 relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl group">
                   <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                     [Imagen: Comida {cat.title}]
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Order Section */}
      <section className="py-24 bg-ya-navy-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
            <Clock className="w-10 h-10 text-ya-yellow-400" />
          </div>
          <h2 className="text-4xl font-bold mb-6">Reserve su Comida con Antelación</h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Asegure su primera elección o seleccione de nuestro menú exclusivo "Book the Cook", disponible solo mediante pedido anticipado hasta 24 horas antes del vuelo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-ya-yellow-500 text-black font-bold rounded-xl hover:bg-ya-yellow-400 transition-colors">
              Gestionar mi Reserva
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
              Ver Opciones de Menú
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
