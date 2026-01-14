import React from 'react';
import { Armchair, Utensils, Wifi, Monitor } from 'lucide-react';

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-ya-navy-900 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Lieblingsflugzeug-Erlebnis</h1>
          <p className="text-xl max-w-2xl text-gray-300">
            Von dem Moment, in dem Sie in den Flugzeug einsteigen, genießen Sie alle Details, die wir für Sie vorbereitet haben.
          </p>
        </div>
      </section>

      {/* Classes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {/* Business Class */}
            <div className="flex flex-col md:flex-row items-center gap-12 bg-white rounded-3xl overflow-hidden shadow-xl">
              <div className="md:w-1/2 h-80 bg-gray-200 relative">
                 {/* Placeholder for Business Class Image */}
                 <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
                    <span className="text-2xl font-light">Business Class Erlebnis</span>
                 </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="uppercase tracking-wide text-sm text-ya-yellow-600 font-bold mb-2">Business Class</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Luxus Business Class</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Vollrechter Sitzplatz ermöglicht Ihnen, in den Wolken zu schlafen. Genießen Sie exklusive Zugänge, VIP-Zimmer und Michelin-Sternen-Gastronomie.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <Armchair className="w-5 h-5 mr-3 text-ya-yellow-600" />
                    180° Vollrechter Sitzplatz
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Utensils className="w-5 h-5 mr-3 text-ya-yellow-600" />
                    Gourmet-Multiperspektive
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Wifi className="w-5 h-5 mr-3 text-ya-yellow-600" />
                    Hochgeschwindigkeits-In-Flight-Wi-Fi
                  </li>
                </ul>
              </div>
            </div>

            {/* Economy Class */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 bg-white rounded-3xl overflow-hidden shadow-xl">
              <div className="md:w-1/2 h-80 bg-gray-200 relative">
                 {/* Placeholder for Economy Class Image */}
                 <div className="absolute inset-0 flex items-center justify-center bg-blue-900 text-white">
                    <span className="text-2xl font-light">Comfort Economy Class</span>
                 </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="uppercase tracking-wide text-sm text-blue-600 font-bold mb-2">Economy Class</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Comfort Economy Class</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Größere Beinraum, menschliche Werkstatt-Sitze und ein umfangreiches Inflight-Entertainment-System machen lange Flüge nicht mehr mühsam.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <Monitor className="w-5 h-5 mr-3 text-blue-600" />
                    13-Zoll-HD-Touchscreen
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Utensils className="w-5 h-5 mr-3 text-blue-600" />
                    Kostenlose Catering-Service
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

