'use client'

import Link from 'next/link'

export default function CareersPage() {
  
  const jobCategories = [
    {
      id: 'flight',
      title: 'Operaciones de Vuelo',
      positions: [
        { id: 1, title: 'Piloto', location: 'Múltiples Ubicaciones', type: 'Tiempo Completo' },
        { id: 2, title: 'Capitán', location: 'Múltiples Ubicaciones', type: 'Tiempo Completo' },
        { id: 3, title: 'Tripulante de Cabina', location: 'Múltiples Ubicaciones', type: 'Tiempo Completo' },
        { id: 4, title: 'Personal de Tierra', location: 'Múltiples Ubicaciones', type: 'Tiempo Completo' },
      ]
    },
    {
      id: 'technical',
      title: 'Técnica y Mantenimiento',
      positions: [
        { id: 5, title: 'Técnico de Mantenimiento de Aeronaves', location: 'Guangzhou', type: 'Tiempo Completo' },
        { id: 6, title: 'Técnico de Aviónica', location: 'Guangzhou', type: 'Tiempo Completo' },
        { id: 7, title: 'Especialista en Aseguramiento de Calidad', location: 'Guangzhou', type: 'Tiempo Completo' },
      ]
    },
    {
      id: 'business',
      title: 'Negocios y Gestión',
      positions: [
        { id: 8, title: 'Gerente de Planificación de Rutas', location: 'Guangzhou', type: 'Tiempo Completo' },
        { id: 9, title: 'Especialista en Marketing', location: 'Múltiples Ubicaciones', type: 'Tiempo Completo' },
        { id: 10, title: 'Supervisor de Servicio al Cliente', location: 'Múltiples Ubicaciones', type: 'Tiempo Completo' },
        { id: 11, title: 'Analista Financiero', location: 'Múltiples Ubicaciones', type: 'Tiempo Completo' },
      ]
    },
    {
      id: 'digital',
      title: 'Digital y Tecnología',
      positions: [
        { id: 12, title: 'Ingeniero de Software', location: 'Guangzhou', type: 'Tiempo Completo/Remoto' },
        { id: 13, title: 'Diseñador UI/UX', location: 'Guangzhou', type: 'Tiempo Completo/Remoto' },
        { id: 14, title: 'Analista de Datos', location: 'Guangzhou', type: 'Tiempo Completo' },
        { id: 15, title: 'Especialista en Soporte TI', location: 'Múltiples Ubicaciones', type: 'Tiempo Completo' },
      ]
    }
  ]

  const benefits = [
    { title: 'Boletos con Descuento', description: 'Los empleados y sus familias disfrutan de tarifas aéreas con descuento' },
    { title: 'Cobertura Médica Integral', description: 'Seguro médico completo y planes de chequeo de salud' },
    { title: 'Plan de Desarrollo Profesional', description: 'Amplios cursos de formación y planificación de carrera' },
    { title: 'Arreglos de Trabajo Flexible', description: 'Algunos puestos ofrecen opciones de trabajo remoto y flexible' },
    { title: 'Plan de Jubilación', description: 'Planes de pensiones y beneficios competitivos' },
    { title: 'Entorno de Trabajo Internacional', description: 'Entorno de trabajo multicultural y oportunidades de desarrollo global' },
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
            <span className="ml-2 text-gray-900 font-medium">Oportunidades de Empleo</span>
          </li>
        </ol>
      </nav>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Únase a Yellow Airlines</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Estamos comprometidos a brindar una experiencia de vuelo excepcional y damos la bienvenida a talentos apasionados para que se unan a nuestro equipo.
        </p>
      </div>

      <div className="bg-ya-yellow-50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Nuestra Cultura Corporativa</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-ya-yellow-600">Espíritu Innovador</h3>
            <p className="text-gray-600">Alentamos a los empleados a pensar de manera innovadora y buscar constantemente formas de mejorar y optimizar los servicios.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-ya-yellow-600">Trabajo en Equipo</h3>
            <p className="text-gray-600">Creemos que a través del trabajo en equipo podemos lograr mayores logros y brindar un mejor servicio.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-ya-yellow-600">Diversidad e Inclusión</h3>
            <p className="text-gray-600">Respetamos y valoramos los antecedentes y perspectivas únicos de cada individuo, creando un entorno de trabajo inclusivo.</p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Vacantes</h2>
        
        <div className="space-y-12">
          {jobCategories.map((category) => (
            <div key={category.id}>
              <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">
                {category.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.positions.map((job) => (
                  <div key={job.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-medium text-gray-900">{job.title}</h4>
                      <span className="bg-ya-yellow-100 text-ya-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        {job.type}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">Ubicación: {job.location}</p>
                    <div className="mt-4">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ya-yellow-600 hover:bg-ya-yellow-700">
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Beneficios para Empleados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Pasos para Unirse a Nosotros</h2>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-gray-50 text-lg font-medium text-gray-900">Proceso de Solicitud</span>
            </div>
          </div>
          
          <div className="mt-8 space-y-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-ya-yellow-500 text-white font-bold">
                  1
                </div>
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-medium">Solicitud en Línea</h3>
                <p className="mt-1 text-gray-600">Explore nuestras vacantes, encuentre el puesto adecuado para usted y envíe su solicitud</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-ya-yellow-500 text-white font-bold">
                  2
                </div>
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-medium">Selección Inicial</h3>
                <p className="mt-1 text-gray-600">Nuestro equipo de reclutamiento revisará su solicitud y contactará a los candidatos adecuados</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-ya-yellow-500 text-white font-bold">
                  3
                </div>
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-medium">Etapa de Entrevista</h3>
                <p className="mt-1 text-gray-600">Dependiendo del puesto, puede incluir entrevistas telefónicas, por video y presenciales</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-ya-yellow-500 text-white font-bold">
                  4
                </div>
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-medium">Oferta e Incorporación</h3>
                <p className="mt-1 text-gray-600">Tras el éxito en la entrevista, emitiremos una oferta y le ayudaremos con el proceso de incorporación</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-ya-yellow-600 hover:bg-ya-yellow-700">
            Solicitar Ahora
          </button>
        </div>
      </div>
    </main>
  )
}
