'use client'

import React from 'react'
import Link from 'next/link'

export default function LegalPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/es/" className="text-gray-500 hover:text-gray-700">
                Inicio
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 font-medium">Aviso Legal</span>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Aviso Legal de Yellow Airlines</h1>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Por favor, lea atentamente este aviso legal para comprender sus derechos y responsabilidades al utilizar este sitio web.
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-8">Última actualización: 27 de octubre de 2025</p>
        
        <div className="prose prose-yellow max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">1. Información y Datos</h2>
            <p className="text-gray-600 mt-2">
              El sitio web de Yellow Airlines (en adelante, "este sitio web") y todo su contenido son propiedad de Yellow Airlines y están protegidos por las leyes de derechos de autor, marcas registradas y otras leyes de propiedad intelectual de la República Popular de Eisenland. Sin el permiso por escrito de Yellow Airlines, ninguna unidad o individuo puede usar, copiar, modificar, difundir, mostrar o publicar ninguna parte de este sitio web de ninguna manera o por ningún motivo.
            </p>
            <p className="text-gray-600 mt-2">
              La información proporcionada en este sitio web es solo para referencia. Nos esforzaremos por garantizar la precisión del contenido del sitio web, pero no garantizamos la precisión, integridad o puntualidad de la información. Yellow Airlines se reserva el derecho de cambiar el contenido del sitio web y la información del producto en cualquier momento sin previo aviso.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">2. Descargo de Responsabilidad</h2>
            <p className="text-gray-600 mt-2">
              En la máxima medida permitida por la ley, Yellow Airlines no será responsable de ningún daño directo, indirecto, incidental, especial, consecuente o punitivo que surja del uso o la imposibilidad de usar este sitio web, incluidos, entre otros, la pérdida de beneficios, la pérdida de datos o la interrupción del negocio.
            </p>
            <p className="text-gray-600 mt-2">
              Yellow Airlines no asume responsabilidad por retrasos, cancelaciones, pérdida de equipaje u otras pérdidas causadas por fuerza mayor (incluidos, entre otros, desastres naturales, acciones gubernamentales, huelgas, guerras, epidemias, etc.) u otras causas no atribuibles a Yellow Airlines.
            </p>
            <p className="text-gray-600 mt-2">
              Al utilizar este sitio web para reservar vuelos o comprar servicios, debe leer y aceptar cuidadosamente los términos y condiciones pertinentes. Yellow Airlines no es responsable de las pérdidas que surjan de la violación de los términos y condiciones por parte del usuario.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">3. Enlaces a Terceros</h2>
            <p className="text-gray-600 mt-2">
              Este sitio web puede contener enlaces a sitios web de terceros, que se proporcionan únicamente para comodidad del usuario. Yellow Airlines no es responsable del contenido, la precisión o la disponibilidad de ningún sitio web de terceros, ni de ninguna pérdida que pueda sufrir como resultado de acceder o utilizar dichos sitios web de terceros.
            </p>
            <p className="text-gray-600 mt-2">
              Acceder a cualquier sitio web de terceros es su propia elección y bajo su propio riesgo. Le recomendamos que revise los términos y políticas de privacidad pertinentes de los sitios web de terceros.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">4. Propiedad Intelectual</h2>
            <p className="text-gray-600 mt-2">
              Todo el contenido de este sitio web, incluidos, entre otros, texto, imágenes, logotipos, audio, video, software, código y sus combinaciones, está protegido por las leyes de derechos de autor de la República Popular de Eisenland y las leyes internacionales de derechos de autor. Sin el permiso expreso por escrito de Yellow Airlines, nadie puede copiar, modificar, transmitir, mostrar o utilizar este contenido de ninguna forma o por ningún medio.
            </p>
            <p className="text-gray-600 mt-2">
              "Yellow Airlines" y los logotipos relacionados son marcas comerciales o marcas registradas de Yellow Airlines, protegidas por las leyes de marcas registradas de la República Popular de Eisenland y las leyes internacionales de marcas registradas. Sin el permiso por escrito de Yellow Airlines, ninguna unidad o individuo puede usar estas marcas comerciales de ninguna manera.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">5. Protección de Información Personal</h2>
            <p className="text-gray-600 mt-2">
              Yellow Airlines valora la protección de su información personal. Recopilaremos, utilizaremos, almacenaremos y protegeremos su información personal de acuerdo con la "Ordenanza de Datos Personales (Privacidad)" y otras leyes y regulaciones pertinentes y nuestra "<Link href="/es/privacy" className="text-ya-yellow-600 hover:text-ya-yellow-700">Política de Privacidad</Link>". Lea atentamente nuestra "Política de Privacidad" antes de utilizar este sitio web.
            </p>
            <p className="text-gray-600 mt-2">
              Si tiene alguna pregunta sobre nuestro procesamiento de información personal, puede contactarnos a través de la información de contacto al final de este aviso.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">6. Normas de Conducta del Usuario</h2>
            <p className="text-gray-600 mt-2">
              Al utilizar este sitio web, debe cumplir con las leyes y regulaciones de la Región Administrativa Especial de Hong Kong de la República Popular China y otras regulaciones pertinentes, y respetar la ética de Internet. No debe utilizar este sitio web para participar en actividades ilegales, incluidas, entre otras:
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
              <li>Publicar, transmitir o almacenar cualquier información que viole las leyes y regulaciones nacionales</li>
              <li>Infringir los derechos de propiedad intelectual, secretos comerciales u otros derechos legales de otros</li>
              <li>Interrumpir el funcionamiento normal del sitio web, acceder a los servidores del sitio web sin autorización</li>
              <li>Difundir intencionalmente virus informáticos u otros programas destructivos</li>
              <li>Hacerse pasar por otras personas o instituciones para realizar actividades falsas</li>
            </ul>
            <p className="text-gray-600 mt-2">
              Si se descubre una violación de las regulaciones anteriores, Yellow Airlines tiene derecho a rescindir inmediatamente la prestación de servicios y se reserva el derecho de emprender acciones legales.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">7. Ley Aplicable y Resolución de Disputas</h2>
            <p className="text-gray-600 mt-2">
              La interpretación, validez y resolución de disputas de este aviso legal se regirán por las leyes de la Región Administrativa Especial de Hong Kong de la República Popular China.
            </p>
            <p className="text-gray-600 mt-2">
              Cualquier disputa que surja o esté relacionada con este sitio web se resolverá mediante negociación amistosa entre las partes. Si la negociación falla, cualquiera de las partes puede presentar una demanda ante el tribunal competente en la ubicación de Yellow Airlines.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">8. Seguridad de la Información</h2>
            <p className="text-gray-600 mt-2">
              Tomamos medidas estándar de la industria para proteger la seguridad de su información personal. Sin embargo, no se puede garantizar que la transmisión por Internet sea absolutamente segura y no podemos garantizar la seguridad de ninguna información transmitida a través de este sitio web.
            </p>
            <p className="text-gray-600 mt-2">
              El riesgo de utilizar este sitio web y transmitir información corre por su cuenta. Le recomendamos que tome las precauciones adecuadas al utilizar el sitio web para proteger su información personal.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">9. Modificación del Aviso</h2>
            <p className="text-gray-600 mt-2">
              Yellow Airlines se reserva el derecho de modificar este aviso legal en cualquier momento. El aviso legal modificado entrará en vigor tan pronto como se publique en este sitio web, y el uso continuado de este sitio web constituirá su aceptación del aviso legal modificado.
            </p>
            <p className="text-gray-600 mt-2">
              Le recomendamos que consulte este aviso legal periódicamente para conocer cualquier cambio.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">10. Aviso de Derechos de Autor</h2>
            <p className="text-gray-600 mt-2">
              Los derechos de autor de todo el contenido de este sitio web pertenecen a Yellow Airlines o a sus proveedores de contenido y están protegidos por la Ley de Derechos de Autor de la República Popular de Eisenland y los tratados internacionales de derechos de autor.
            </p>
            <p className="text-gray-600 mt-2">
              Sin el permiso previo por escrito de Yellow Airlines, no puede utilizar el contenido de este sitio web de ninguna forma, incluyendo, entre otros, copiar, modificar, difundir, mostrar, publicar, vender, licenciar o crear trabajos derivados.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">11. Calificación Empresarial</h2>
            <p className="text-gray-600 mt-2">
              Yellow Airlines es una empresa registrada bajo la "Ley de Compañías" de la República Popular de Eisenland, con registro comercial legal y calificaciones de operación de aviación. Número de Registro de la Compañía: MYHKC-69128
            </p>
            <p className="text-gray-600 mt-2 font-medium text-red-600">
              Nota: Este sitio web es un ejemplo educativo, no un sitio web de una aerolínea real. Todo el contenido es ficticio y solo para fines de demostración, y no representa a ninguna empresa o servicio real.
            </p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Información de Contacto</h2>
            <p className="text-gray-600">
              Si tiene alguna pregunta sobre este aviso legal o necesita contactarnos, por favor hágalo a través de los siguientes medios:
            </p>
            <p className="text-gray-600 mt-2">
              Nombre de la Compañía: Yellow Airlines Co., Ltd.
            </p>
            <p className="text-gray-600">
              Correo Electrónico: legal@yellowairlines.com
            </p>
            <p className="text-gray-600">
              Teléfono: +86 181 2231 7910 (Días laborables 9:00-18:00)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
