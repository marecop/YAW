export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>
        
        <p className="lead text-xl text-gray-600 mb-8">
          En Yellow Airlines, valoramos su privacidad y nos comprometemos a proteger sus datos personales. Esta política explica cómo recopilamos, utilizamos y compartimos su información.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Información que recopilamos</h2>
            <p className="text-gray-600">
              Recopilamos información que usted nos proporciona directamente al reservar un vuelo, crear una cuenta o contactarnos. Esto puede incluir:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-4 space-y-2">
              <li>Nombre, dirección, número de teléfono y correo electrónico.</li>
              <li>Información del pasaporte y documentos de viaje.</li>
              <li>Detalles de pago e historial de transacciones.</li>
              <li>Preferencias de viaje y solicitudes de asistencia especial.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Cómo utilizamos su información</h2>
            <p className="text-gray-600">
              Utilizamos su información para los siguientes fines:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-4 space-y-2">
              <li>Procesar sus reservas y pagos.</li>
              <li>Enviarle actualizaciones sobre su vuelo y tarjetas de embarque.</li>
              <li>Proporcionar servicio al cliente y soporte.</li>
              <li>Mejorar nuestros servicios y sitio web.</li>
              <li>Cumplir con las obligaciones legales y de seguridad.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Compartir información</h2>
            <p className="text-gray-600">
              No vendemos su información personal. Podemos compartirla con:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-4 space-y-2">
              <li>Autoridades gubernamentales y de inmigración según lo requiera la ley.</li>
              <li>Socios de servicios (como operadores de tierra y catering) para cumplir con su viaje.</li>
              <li>Proveedores de servicios de pago para procesar transacciones.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Seguridad de datos</h2>
            <p className="text-gray-600">
              Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos contra el acceso no autorizado, la pérdida o la alteración. Utilizamos cifrado SSL para todas las transacciones en línea.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Sus derechos</h2>
            <p className="text-gray-600">
              Usted tiene derecho a acceder, corregir o eliminar sus datos personales. También puede optar por no recibir comunicaciones de marketing en cualquier momento. Para ejercer estos derechos, contáctenos en privacy@yellowairlines.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
            <p className="text-gray-600">
              Utilizamos cookies para mejorar su experiencia en nuestro sitio web. Al utilizar nuestro sitio, usted acepta el uso de cookies de acuerdo con nuestra Política de Cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cambios en esta política</h2>
            <p className="text-gray-600">
              Podemos actualizar esta política ocasionalmente. La versión más reciente siempre estará disponible en nuestro sitio web.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Última actualización: 13 de Enero de 2026
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
