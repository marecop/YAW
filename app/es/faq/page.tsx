'use client'

import Link from 'next/link'

export default function FAQPage() {
  
  const faqCategories = [
    {
      id: 'booking',
      title: 'Reserva y Pago',
      questions: [
        {
          question: '¿Cómo puedo encontrar las mejores tarifas aéreas?',
          answer: 'Yellow Airlines ofrece una búsqueda flexible de tarifas. Puede utilizar nuestra función de "Calendario de Precios" para ver tarifas en diferentes fechas o suscribirse a nuestros correos electrónicos para recibir notificaciones de tarifas especiales. Generalmente, reservar con antelación y elegir volar fuera de las horas pico puede resultar en mejores precios.'
        },
        {
          question: '¿Hay algún cargo por cancelar o cambiar una reserva?',
          answer: 'Esto depende del tipo de boleto que compró y del momento de la cancelación/cambio. Las tarifas Economy Basic pueden no ser reembolsables, pero se pueden cambiar por una tarifa. Las tarifas Flex y Business generalmente ofrecen políticas de cambio más flexibles. Consulte las reglas específicas de la tarifa al reservar o contacte a nuestro servicio al cliente para obtener ayuda.'
        },
        {
          question: '¿Puedo reservar boletos para otras personas?',
          answer: 'Sí, puede reservar boletos para familiares, amigos o colegas. Durante el proceso de reserva, deberá proporcionar información detallada para cada pasajero, incluido el nombre (que debe coincidir exactamente con el nombre en el pasaporte), fecha de nacimiento e información de contacto.'
        },
        {
          question: '¿Dónde puedo encontrar la confirmación de mi reserva?',
          answer: 'Una vez completada la reserva, enviaremos un correo de confirmación a la dirección de correo electrónico que proporcionó. También puede iniciar sesión en nuestro sitio web o aplicación y ver los detalles de su itinerario en la sección "Mis Reservas".'
        }
      ]
    },
    {
      id: 'baggage',
      title: 'Equipaje',
      questions: [
        {
          question: '¿Cuál es la franquicia de equipaje para diferentes tipos de boletos?',
          answer: 'La franquicia de equipaje varía según la ruta y el tipo de boleto. En general, las tarifas Economy Basic incluyen 7 kg de equipaje de mano, mientras que las tarifas Economy Flex y Business suelen incluir 23 kg o 32 kg de equipaje facturado. Puede consultar los límites específicos al reservar o en la página de política de equipaje de nuestro sitio web.'
        },
        {
          question: '¿Cómo compro franquicia de equipaje adicional?',
          answer: 'Puede comprar franquicia de equipaje adicional al reservar o iniciando sesión en su cuenta en línea. Comprar en línea con antelación es más barato que comprar en el aeropuerto. También puede ponerse en contacto con nuestro servicio al cliente para que le ayuden con esto.'
        },
        {
          question: '¿Cómo se maneja el equipaje especial (como equipo deportivo, instrumentos musicales, etc.)?',
          answer: 'El equipaje especial debe solicitarse con antelación. La mayoría de los equipos deportivos (como palos de golf, equipo de esquí) se pueden facturar como equipaje estándar, pero pueden incurrir en cargos adicionales. Los instrumentos musicales pueden transportarse como equipaje de mano o facturado según su tamaño, o pueden requerir la compra de un asiento adicional. Póngase en contacto con nuestro servicio al cliente con al menos 48 horas de antelación para obtener orientación específica sobre equipaje especial.'
        }
      ]
    },
    {
      id: 'checkin',
      title: 'Check-in y Servicio a Bordo',
      questions: [
        {
          question: '¿Cuándo abre el check-in online?',
          answer: 'El check-in online generalmente abre 24 horas antes de la salida y cierra 60 minutos antes de la salida. Recomendamos hacer el check-in temprano para elegir su asiento preferido.'
        },
        {
          question: '¿Qué pasa si pierdo mi vuelo?',
          answer: 'Si pierde su vuelo, comuníquese con nuestro servicio al cliente de inmediato o vaya al mostrador de servicio de Yellow Airlines en el aeropuerto. Dependiendo de su tipo de boleto y las circunstancias, le ayudaremos a cambiar al siguiente vuelo disponible, pero es posible que se apliquen cargos por cambio.'
        },
        {
          question: '¿Qué opciones de comidas especiales ofrece Yellow Airlines?',
          answer: 'Ofrecemos una variedad de opciones de comidas especiales, incluidas vegetarianas, halal, sin gluten, sin lactosa y más. Solicite comidas especiales a través de su reserva o contactando al servicio al cliente al menos 48 horas antes de la salida.'
        },
        {
          question: '¿Hay servicio de WiFi a bordo?',
          answer: 'Sí, la mayoría de nuestros vuelos ofrecen servicio de WiFi a bordo. Algunos vuelos de corta distancia pueden ofrecer navegación básica gratuita, mientras que los vuelos de larga distancia suelen ofrecer una variedad de paquetes de internet para elegir. El precio específico y la disponibilidad dependen de su ruta.'
        }
      ]
    },
    {
      id: 'special',
      title: 'Servicios Especiales',
      questions: [
        {
          question: '¿Cómo organizo asistencia para pasajeros con necesidades especiales?',
          answer: 'Estamos comprometidos a brindar una experiencia de viaje conveniente para todos los pasajeros. Si necesita servicio de silla de ruedas, asistencia de embarque u otra asistencia especial, comuníquese con nuestro servicio al cliente al reservar o al menos 48 horas antes de la salida. El personal del aeropuerto brindará asistencia completa a los pasajeros que lo necesiten.'
        },
        {
          question: '¿Pueden las mujeres embarazadas volar con Yellow Airlines?',
          answer: 'Las mujeres embarazadas generalmente pueden volar con nosotros, pero existen algunas restricciones. Las pasajeras con menos de 28 semanas de embarazo no necesitan certificado médico. Las pasajeras con 28-36 semanas de embarazo deben proporcionar un certificado de aptitud para volar emitido por un médico. Generalmente no se recomienda volar a pasajeras con más de 36 semanas de embarazo por razones de seguridad. Consulte a su médico y comuníquese con nuestro servicio al cliente antes de reservar.'
        },
        {
          question: '¿Qué arreglos se necesitan para que los niños viajen solos?',
          answer: 'Los niños de 5 a 12 años pueden utilizar nuestro servicio de "Menor no acompañado" para viajar solos. Este servicio debe reservarse con antelación y conlleva un cargo adicional. Nuestro personal cuidará de la seguridad del niño durante todo el viaje, desde la salida en el aeropuerto hasta el encuentro con la persona designada para recogerlo en el destino. Los menores de 12 a 16 años pueden elegir este servicio opcionalmente.'
        },
        {
          question: '¿Puedo viajar con mascotas?',
          answer: 'Las mascotas pequeñas (gatos, perros pequeños) pueden llevarse en la cabina como equipaje de mano en vuelos elegibles, utilizando un transportín que cumpla con los requisitos de la aerolínea. Las mascotas más grandes deben facturarse. Todo transporte de mascotas debe solicitarse con antelación y pagarse. Tenga en cuenta que los animales de servicio siguen reglas diferentes. Comuníquese con nuestro servicio al cliente con antelación para obtener más detalles.'
        }
      ]
    },
    {
      id: 'rewards',
      title: 'Membresía y Recompensas',
      questions: [
        {
          question: '¿Cómo me uno al programa de viajero frecuente de Yellow Airlines?',
          answer: 'Puede registrarse gratis como miembro de "Yellow Miles" de Yellow Airlines en nuestro sitio web o aplicación. El proceso de registro es simple y solo requiere información personal básica y datos de contacto. Una vez que sea miembro, cada vuelo acumulará millas que se pueden canjear por boletos gratis y otras recompensas.'
        },
        {
          question: '¿Cuánto tiempo son válidos los puntos de millas?',
          answer: 'Los puntos de millas para miembros estándar son válidos por 2 años. Los puntos de millas para miembros Silver son válidos por 3 años, y los puntos de millas para miembros Gold y Platinum no tienen fecha de vencimiento. Cualquier actividad en la cuenta (vuelo o canje) restablecerá la validez de las millas.'
        },
        {
          question: '¿Cómo verifico mi saldo de millas?',
          answer: 'Puede iniciar sesión en nuestro sitio web o aplicación y ver su saldo de millas, historial de actividad y millas que vencen pronto en el Centro de Miembros. También puede ver la información actualizada de millas en el correo electrónico que recibe después de cada vuelo.'
        }
      ]
    }
  ]

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/es/" className="text-gray-500 hover:text-gray-700">
              Inicio
            </Link>
          </li>
          <li className="flex items-center">
            <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 text-gray-900 font-medium">Preguntas Frecuentes</span>
          </li>
        </ol>
      </nav>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Preguntas Frecuentes</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Encuentre respuestas a sus preguntas sobre los servicios de Yellow Airlines
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Categories */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-4 sticky top-20">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Categorías</h2>
            <nav className="space-y-2">
              {faqCategories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="block w-full text-left px-4 py-2 rounded hover:bg-ya-yellow-100 text-gray-700 transition-colors"
                >
                  {category.title}
                </a>
              ))}
            </nav>
            
            <div className="mt-8 p-4 bg-ya-yellow-50 rounded-lg">
              <h3 className="font-medium text-ya-yellow-800 mb-2">¿Necesita más ayuda?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Si no encontró la respuesta que buscaba, comuníquese con nuestro equipo de servicio al cliente.
              </p>
              <a
                href="mailto:support@yellowairlines.com"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ya-yellow-600 hover:bg-ya-yellow-700"
              >
                Contáctenos
              </a>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="lg:col-span-3">
          {faqCategories.map((category) => (
            <div
              id={category.id}
              key={category.id}
              className="mb-8 scroll-mt-24"
            >
              <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-gray-200">
                {category.title}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, index) => (
                  <details key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group">
                    <summary className="px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <h3 className="text-lg font-medium text-gray-900 pr-4">{faq.question}</h3>
                      <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-4 pt-2">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">¿Aún tiene preguntas?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Nuestro equipo de servicio al cliente está listo para ayudarlo. Contáctenos a través de los siguientes métodos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-lg">
            <svg className="w-8 h-8 text-ya-yellow-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="font-medium text-gray-900 mb-1">Correo Electrónico</h3>
            <a href="mailto:support@yellowairlines.com" className="text-ya-yellow-600 hover:underline">
              support@yellowairlines.com
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg">
            <svg className="w-8 h-8 text-ya-yellow-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <h3 className="font-medium text-gray-900 mb-1">Teléfono de Servicio</h3>
            <a href="tel:+8618122317910" className="text-ya-yellow-600 hover:underline">
              +86 181 2231 7910
            </a>
            <p className="text-sm text-gray-500 mt-1">Lunes a Domingo 9:00-21:00</p>
          </div>
        </div>
      </div>
    </main>
  )
}
