import React from 'react';
import { Baby, Heart, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function FamilyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-orange-500 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Familienreise, mit Freude begleitet</h1>
          <p className="text-xl max-w-2xl text-white/90">
            Egal, ob Sie mit einem Baby oder einem Kind reisen, wir haben Ihnen passende Service, um die Reise für die ganze Familie angenehm zu machen.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600">
                <Baby className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Baby-Pflege</h3>
              <p className="text-gray-600">
                Wir bieten Baby-Korb, Baby-Essen und Priorität-Check-In-Service. Das Flugtoilette hat einen Urinale mit Baby-Change-Table, um Ihnen beim Umgang mit dem Baby zu helfen.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kinder-Essen</h3>
              <p className="text-gray-600">
                Nahrungsgleiches, hübsches Kinder-Essen, das die Kinder liebt. Bitte bestellen Sie es 24 Stunden vor dem Flug.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Unbegleitete Kinder</h3>
              <p className="text-gray-600">
                Professionelle Bodenpersonal und Flugbegleiter sorgen für die Betreuung von Kindern, die alleine reisen, und sorgen dafür, dass sie sicher am Zielort ankommen.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-orange-50 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benötigen Sie besondere Unterstützung?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Wenn Sie Unterstützung für unbegleitete Kinder benötigen oder andere besondere Anforderungen haben, besuchen Sie unsere Seite für besondere Unterstützung.
            </p>
            <Link 
              href="/de/special-assistance" 
              className="inline-block bg-orange-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-orange-600 transition-colors shadow-lg"
            >
              Zur Seite für besondere Unterstützung
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

