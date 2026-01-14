export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Términos y Condiciones</h1>
        
        <p className="lead text-xl text-gray-600 mb-8">
          Bienvenido a Yellow Airlines. Al utilizar nuestros servicios y sitio web, usted acepta cumplir con los siguientes términos y condiciones.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Definiciones</h2>
            <p className="text-gray-600">
              "Nosotros", "nuestro" y "la aerolínea" se refieren a Yellow Airlines. "Usted" y "el pasajero" se refieren a cualquier persona que utilice nuestros servicios o posea un boleto válido.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Reservas y Boletos</h2>
            <ul className="list-disc pl-6 text-gray-600 mt-4 space-y-2">
              <li>Todos los boletos están sujetos a disponibilidad y confirmación de pago.</li>
              <li>Los nombres en la reserva deben coincidir exactamente con el documento de identidad del pasajero.</li>
              <li>Algunas tarifas pueden ser no reembolsables o tener cargos por cambios. Consulte las reglas de la tarifa al reservar.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Check-in y Embarque</h2>
            <ul className="list-disc pl-6 text-gray-600 mt-4 space-y-2">
              <li>Los pasajeros deben presentarse en el mostrador de check-in o puerta de embarque antes de la hora límite especificada.</li>
              <li>El incumplimiento de los horarios límite puede resultar en la cancelación de su asiento sin reembolso.</li>
              <li>Es responsabilidad del pasajero tener todos los documentos de viaje necesarios (pasaporte, visa, etc.).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Equipaje</h2>
            <p className="text-gray-600">
              Se aplican límites de peso y tamaño para el equipaje facturado y de mano. El exceso de equipaje está sujeto a cargos adicionales. No se permiten artículos peligrosos en el equipaje.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Conducta a Bordo</h2>
            <p className="text-gray-600">
              Los pasajeros deben seguir las instrucciones de la tripulación en todo momento. Nos reservamos el derecho de denegar el transporte a cualquier persona que se comporte de manera abusiva, violenta o que ponga en peligro la seguridad del vuelo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitación de Responsabilidad</h2>
            <p className="text-gray-600">
              Nuestra responsabilidad por daños, retrasos o pérdidas está limitada por los convenios internacionales aplicables (como el Convenio de Montreal). Recomendamos encarecidamente obtener un seguro de viaje adecuado.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Ley Aplicable</h2>
            <p className="text-gray-600">
              Estos términos se rigen por las leyes de la Región Administrativa Especial de Hong Kong.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
